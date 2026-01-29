import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from '../shared/components/ui/Header';

import LoadingScreen from './components/LoadingScreen';

// Lazy Load Pages
const ChatPage = React.lazy(() => import('./ChatPage'));
const Analytics = React.lazy(() => import('./components/analytics'));
const History = React.lazy(() => import('./components/history'));
import { StorageService } from '../services/StorageService';
import { AuthService } from '../services/AuthService';
import Icon from '../shared/components/AppIcon'; // Re-adding Icon import as it was used in original BottomNav

const App = () => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Initialize Auth Session
        const init = async () => {
            await AuthService.init();

            // Load and apply theme globally
            const settings = await StorageService.get('general_settings');
            const theme = settings?.theme || 'dark';
            const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
            if (isDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            setIsReady(true);
        };
        init();
    }, []);

    if (!isReady) return <LoadingScreen />;

    return (
        <Router>
            <div className="flex flex-col h-screen bg-background overflow-hidden text-foreground">
                <div className="flex-1 h-full overflow-hidden relative">
                    <Routes>
                        <Route path="/" element={
                            <React.Suspense fallback={<LoadingScreen />}>
                                <ChatPage />
                            </React.Suspense>
                        } />
                        <Route path="/analytics" element={
                            <React.Suspense fallback={<LoadingScreen />}>
                                <Analytics />
                            </React.Suspense>
                        } />
                        <Route path="/history" element={
                            <React.Suspense fallback={<LoadingScreen />}>
                                <History />
                            </React.Suspense>
                        } />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
