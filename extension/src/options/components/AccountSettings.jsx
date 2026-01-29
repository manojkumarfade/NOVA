
import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { AuthHelper } from '../../services/AuthHelper';
import Button from '../../shared/components/ui/Button';

const AccountSettings = () => {
    const [user, setUser] = useState(null);
    const [view, setView] = useState('loading'); // loading, profile, login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setView(session?.user ? 'profile' : 'login');
        });

        return () => subscription.unsubscribe();
    }, []);

    const checkSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        setView(session?.user ? 'profile' : 'login');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) throw error;
            setError("Check your email for confirmation link (if enabled), or sign in.");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            await AuthHelper.loginWithGoogle();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        // View auto-updates via onAuthStateChange
    };

    if (view === 'loading') return <div className="p-4 text-muted-foreground">Loading account...</div>;

    if (view === 'profile') {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
                        {(user.email || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-foreground">{user.email}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-xs text-muted-foreground">Cloud Sync Active</span>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-4">
                        Your settings and preferences are synchronized with your account.
                    </p>
                    <Button
                        onClick={handleLogout}
                        variant="destructive"
                        className="w-full sm:w-auto"
                    >
                        Sign Out
                    </Button>
                </div>
            </div>
        );
    }

    // Login / Signup View
    return (
        <div className="space-y-6 max-w-sm">
            <div className="flex gap-4 border-b border-border pb-2 mb-4">
                <button className={`pb-2 text-sm font-medium text-primary border-b-2 border-primary -mb-2.5`}>
                    Sign In / Sign Up
                </button>
            </div>

            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm">
                    {error}
                </div>
            )}

            <form className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-muted border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-muted border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex gap-3 pt-2">
                    <Button
                        onClick={handleLogin}
                        disabled={loading}
                        className="flex-1"
                    >
                        {loading ? 'Processing...' : 'Log In'}
                    </Button>
                    <Button
                        onClick={handleSignup}
                        disabled={loading}
                        variant="outline"
                        className="flex-1"
                    >
                        Sign Up
                    </Button>
                </div>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-600"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-2 bg-card text-gray-400">Or</span></div>
            </div>

            <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
            </button>
        </div>
    );
};

export default AccountSettings;
