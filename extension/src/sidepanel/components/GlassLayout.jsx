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
const GlassLayout = ({ children, level = 12, xp = 75, showBackButton = false }) => {
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

            {/* Main Content Layer (The "Glass" Panel now contains the video) */}
            <div className={`
                relative z-20 flex flex-col h-full m-2 rounded-xl overflow-hidden box-border transition-all duration-300
                ${isDark ? 'border border-neon-cyan/20 bg-black/40' : 'bg-white/80 border border-gray-200 shadow-xl backdrop-blur-md'}
            `}>
                {/* Internal Video Background (Visible in both modes now) */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        style={{ filter: 'none' }}
                    >
                        <source src={chrome.runtime.getURL('chat_bg.mp4')} type="video/mp4" />
                    </video>
                    {/* Minimal overlay for text readability */}
                    <div className={`absolute inset-0 ${isDark ? 'bg-black/10' : 'bg-white/10'}`}></div>
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
                    <div className="flex items-center gap-2 w-1/2 justify-end">
                        <XPBar level={level} progress={xp} />

                        <div className="h-6 w-[1px] bg-gray-500/20 mx-1"></div>

                        <button
                            onClick={() => navigate('/analytics')}
                            className={`p-1.5 rounded-lg border transition-all hover:scale-105 active:scale-95
                                ${isDark
                                    ? 'bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                                    : 'bg-white hover:bg-gray-50 text-slate-600 border-gray-200 shadow-sm'}
                            `}
                            title="Open Analytics"
                        >
                            <BarChart3 size={16} />
                        </button>

                        <button
                            onClick={toggleTheme}
                            className={`p-1.5 rounded-lg border transition-all hover:scale-105 active:scale-95
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
                            className={`p-1.5 rounded-lg border transition-all hover:scale-105 active:scale-95
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

                {/* Decorative Tech Corners (Only in Dark Mode) */}
                {isDark && (
                    <>
                        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-neon-cyan/50 rounded-tl-xl pointer-events-none z-20"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-neon-cyan/50 rounded-br-xl pointer-events-none z-20"></div>
                    </>
                )}
            </div>
        </div>
    );
};

export default GlassLayout;
