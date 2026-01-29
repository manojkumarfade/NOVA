
import { StorageService } from './StorageService';

export const AuthService = {
    // Initialize session on app load
    async init() {
        const currentUser = await StorageService.getGlobal('current_session_user', null);
        if (currentUser) {
            StorageService.setPrefix(`user_${currentUser.id}_`);
            console.log("AuthService: Restored session for", currentUser.username);
        } else {
            StorageService.setPrefix('guest_');
            console.log("AuthService: Guest session");
        }

        // Listen for auth changes from other contexts (e.g. login in Options page)
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
            chrome.storage.onChanged.addListener((changes, area) => {
                if (area === 'local' && changes.current_session_user) {
                    const newUser = changes.current_session_user.newValue;
                    if (newUser) {
                        StorageService.setPrefix(`user_${newUser.id}_`);
                    } else {
                        StorageService.setPrefix('guest_');
                    }
                    // Reload to refresh UI with new data context
                    window.location.reload();
                }
            });
        }

        return currentUser;
    },

    async getCurrentUser() {
        return await StorageService.getGlobal('current_session_user', null);
    },

    async login(email, password) {
        const users = await StorageService.getGlobal('registered_users', []);

        // Simple plain text check for local extension (No backend)
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            await StorageService.setGlobal('current_session_user', user);
            StorageService.setPrefix(`user_${user.id}_`);
            return { success: true, user };
        }

        return { success: false, error: "Invalid email or password" };
    },

    async signup(username, email, password) {
        const users = await StorageService.getGlobal('registered_users', []);

        if (users.find(u => u.email === email)) {
            return { success: false, error: "Email already registered" };
        }

        const newUser = {
            id: Date.now().toString(),
            username,
            email,
            password, // Storing password locally is not secure for real apps, but requested for this local extension demo.
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        await StorageService.setGlobal('registered_users', users);

        // Auto login
        await StorageService.setGlobal('current_session_user', newUser);
        StorageService.setPrefix(`user_${newUser.id}_`);

        return { success: true, user: newUser };
    },

    async logout() {
        await StorageService.removeGlobal('current_session_user');
        StorageService.setPrefix('guest_');
        return true;
    },

    async updateProfile(updates) {
        const currentUser = await this.getCurrentUser();
        if (!currentUser) return false;

        const updatedUser = { ...currentUser, ...updates };

        // Update in session
        await StorageService.setGlobal('current_session_user', updatedUser);

        // Update in DB
        const users = await StorageService.getGlobal('registered_users', []);
        const idx = users.findIndex(u => u.id === currentUser.id);
        if (idx !== -1) {
            users[idx] = updatedUser;
            await StorageService.setGlobal('registered_users', users);
        }

        return updatedUser;
    }
};
