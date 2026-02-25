import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Sun, Moon, ArrowLeft, Settings } from 'lucide-react';
import XPBar from './XPBar';

/**
 * GlassLayout - The main shell for the agentic UI
 * 
 * Features:
 * - Fullscreen video background with overlay
 * - Main glass container
 * - Integrated XP/Leveling system
 */
const GlassLayout = ({ children, level = 12, xp = 75, showBackButton = false, onToggleSidebar, onNewChat }) => {
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(true);

    // Initialize Theme
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    const openSettingsPage = () => {
        if (chrome && chrome.runtime && chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            // Fallback for non-extension environment or if API missing
            console.log("Opening settings page fallback");
            window.open('options.html', '_blank');
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-background text-foreground font-body transition-colors duration-500">
            {/* Outer Background (Dark/Static) */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-black">
                {/* Optional subtle grid/texture for the outer area */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] opacity-20"></div>
            </div>

            {/* Main Content Layer (Full Bleed for Side Panel) */}
            <div className={`
                relative z-20 flex flex-col h-full w-full
                ${isDark ? 'bg-black/80' : 'bg-white/90 backdrop-blur-md'}
            `}>
                {/* Internal Video Background - Restored with User's provided file */}
                <div className="absolute inset-0 z-0 bg-black">
                    <video
                        key="chat-bg-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                    >
                        <source src="/chat_bg.mp4" type="video/mp4" />
                    </video>
                    {/* Readability Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10"></div>
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] z-20"></div>
                </div>

                {/* Top Header / HUD */}
                <header className={`
                    relative z-10 flex-none h-16 border-b flex items-center justify-between px-4 transition-colors
                    ${isDark ? 'border-neon-cyan/20 bg-black/20' : 'border-gray-200 bg-white/50'}
                `}>
                    <div className="flex items-center gap-3">
                        {showBackButton ? (
                            <button
                                onClick={() => navigate(-1)}
                                className={`p-1.5 rounded-lg border transition-all hover:scale-105 active:scale-95 group
                                    ${isDark
                                        ? 'bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                                        : 'bg-white hover:bg-gray-50 text-slate-600 border-gray-200 shadow-sm'}
                                `}
                                title="Go Back"
                            >
                                <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                            </button>
                        ) : (
                            <div className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-neon-cyan shadow-neon-cyan' : 'bg-blue-500'}`}></div>
                        )}

                        <h1 className="font-heading text-lg tracking-widest font-bold">
                            <span className={isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-violet' : 'text-slate-800'}>
                                NOVA
                            </span>
                            <span className={`text-xs font-mono ml-2 ${isDark ? 'text-neon-cyan/70' : 'text-slate-500'}`}>v.0.9</span>
                        </h1>
                    </div>

                    {/* XP System integration & Analytics & Theme Toggle */}
                    <div className="flex items-center gap-2 w-full justify-end max-w-[70%]">
                        <XPBar level={level} progress={xp} />

                        <div className="h-6 w-[1px] bg-gray-500/20 mx-1 flex-none"></div>

                        {/* New Chat Button */}
                        <button
                            onClick={onNewChat}
                            className={`p-1.5 rounded-lg border transition-all hover:scale-110 active:scale-95 flex-none
                                ${isDark
                                    ? 'bg-neon-cyan/10 hover:bg-neon-cyan/30 text-neon-cyan border-neon-cyan/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                                    : 'bg-white hover:bg-gray-100 text-blue-600 border-gray-300 shadow-sm'}
                            `}
                            title="New Chat"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>

                        <button
                            onClick={() => navigate('/analytics')}
                            className={`p-1.5 rounded-lg border transition-all hover:scale-105 active:scale-95 flex-none
                                ${isDark
                                    ? 'bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                                    : 'bg-white hover:bg-gray-50 text-slate-600 border-gray-200 shadow-sm'}
                            `}
                            title="Open Analytics"
                        >
                            <BarChart3 size={16} />
                        </button>

                        {/* Chat History Toggle */}
                        <button
                            onClick={onToggleSidebar}
                            className={`p-1.5 rounded-lg border transition-all hover:scale-105 active:scale-95 flex-none
                                ${isDark
                                    ? 'bg-neon-violet/10 hover:bg-neon-violet/20 text-neon-violet border-neon-violet/30 hover:shadow-[0_0_10px_rgba(139,92,246,0.25)]'
                                    : 'bg-white hover:bg-gray-50 text-slate-600 border-gray-200 shadow-sm'}
                            `}
                            title="Chat History"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V12L15 15"></path><circle cx="12" cy="12" r="9"></circle></svg>
                        </button>

                        <button
                            onClick={toggleTheme}
                            className={`p-1.5 rounded-lg border transition-all hover:scale-105 active:scale-95 flex-none
                                ${isDark
                                    ? 'bg-neon-violet/10 hover:bg-neon-violet/20 text-neon-violet border-neon-violet/30 hover:shadow-[0_0_10px_rgba(139,92,246,0.3)]'
                                    : 'bg-white hover:bg-gray-50 text-slate-600 border-gray-200 shadow-sm'}
                            `}
                            title="Toggle Theme"
                        >
                            {isDark ? <Sun size={16} /> : <Moon size={16} />}
                        </button>

                        <button
                            onClick={openSettingsPage}
                            className={`p-1.5 rounded-lg border transition-all hover:scale-105 active:scale-95 flex-none
                                ${isDark
                                    ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-200 border-gray-600/30 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]'
                                    : 'bg-white hover:bg-gray-50 text-slate-600 border-gray-200 shadow-sm'}
                            `}
                            title="Settings"
                        >
                            <Settings size={16} />
                        </button>
                    </div>
                </header>

                {/* Scrollable Content Area */}
                <main className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden scroll-smooth p-4">
                    {children}
                </main>


            </div>
        </div>
    );
};

export default GlassLayout;
