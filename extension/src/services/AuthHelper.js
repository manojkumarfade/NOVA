import { supabase } from './supabase';

export const AuthHelper = {
    /**
     * Initiates Google OAuth flow using Chrome Identity API
     * @returns {Promise<void>}
     */
    loginWithGoogle: async () => {
        try {
            const redirectUrl = chrome.identity.getRedirectURL();
            console.log("AuthHelper: Expected Redirect URL:", redirectUrl);

            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: redirectUrl,
                    skipBrowserRedirect: true, // Crucial to prevent double windows
                },
            });

            if (error) throw error;

            const authUrl = data?.url;
            if (!authUrl) throw new Error("No auth URL returned from Supabase");

            console.log("AuthHelper: Launching Web Auth Flow with:", authUrl);

            await new Promise((resolve, reject) => {
                chrome.identity.launchWebAuthFlow(
                    {
                        url: authUrl,
                        interactive: true,
                    },
                    async (redirectedTo) => {
                        if (chrome.runtime.lastError) {
                            return reject(new Error(chrome.runtime.lastError.message));
                        }
                        if (!redirectedTo) {
                            return reject(new Error("Authentication failed: No redirect URL received"));
                        }

                        console.log("AuthHelper: Redirected to:", redirectedTo);

                        try {
                            const url = new URL(redirectedTo);
                            const fragment = url.hash.startsWith('#') ? url.hash.slice(1) : url.hash;
                            const params = new URLSearchParams(fragment);
                            const access_token = params.get('access_token');
                            const refresh_token = params.get('refresh_token');

                            if (access_token) {
                                const { error: sessionError } = await supabase.auth.setSession({
                                    access_token,
                                    refresh_token,
                                });
                                if (sessionError) throw sessionError;
                                resolve();
                            } else {
                                const errorDesc = params.get('error_description') || "No tokens found in redirect";
                                reject(new Error(errorDesc));
                            }
                        } catch (err) {
                            reject(err);
                        }
                    }
                );
            });
        } catch (error) {
            console.error("AuthHelper Error:", error);
            throw error;
        }
    }
};
