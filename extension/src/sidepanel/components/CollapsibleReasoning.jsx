import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../shared/components/AppIcon';

const CollapsibleReasoning = ({ isExpanded: initialExpanded, logs = [], status, estimatedTime = 12 }) => {
    const [isExpanded, setIsExpanded] = useState(initialExpanded);
    const [elapsedTime, setElapsedTime] = useState(0);

    const currentStatus = status || 'idle';
    const isProcessing = ['thinking', 'navigating', 'planning', 'validating', 'extracting', 'active'].includes(currentStatus);
    const isSuccess = currentStatus === 'completed' || currentStatus === 'idle';

    useEffect(() => {
        let timer;
        if (isProcessing) {
            timer = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);
        }
        // Don't auto-collapse on success — logs should remain visible
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isProcessing]);

    // Reassuring message when elapsed time exceeds estimate
    const getTimeMessage = () => {
        if (!isProcessing) return null;
        const overtime = elapsedTime - estimatedTime;
        if (overtime <= 0) return null;
        if (overtime < 15) return 'Almost there, hang tight...';
        if (overtime < 45) return 'Still working on it, please wait...';
        if (overtime < 90) return 'Taking a bit longer than usual, almost done...';
        return 'Please wait a few more moments, we\'re close...';
    };

    const timeMessage = getTimeMessage();

    return (
        <div className="my-3 border border-white/10 rounded-xl overflow-hidden bg-black/40 backdrop-blur-md">
            {/* Header: Clickable to toggle expansion */}
            <div
                className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3">
                    {/* Status Icon & Glow */}
                    <div className="relative flex items-center justify-center w-6 h-6">
                        {isProcessing ? (
                            <>
                                <span className="absolute inset-0 border-2 border-neon-cyan/30 rounded-full animate-ping"></span>
                                <Icon name="Cpu" className="w-4 h-4 text-neon-cyan animate-pulse" />
                            </>
                        ) : isSuccess ? (
                            <Icon name="CheckCircle2" className="w-5 h-5 text-green-500" />
                        ) : (
                            <Icon name="AlertCircle" className="w-5 h-5 text-red-500" />
                        )}
                    </div>

                    {/* Shimmering Text for Active State */}
                    <div className="flex flex-col">
                        <span className={`text-sm font-semibold tracking-wide ${isProcessing ? 'animate-shimmer bg-[linear-gradient(110deg,#00f0ff,45%,#fff,55%,#00f0ff)] bg-[length:200%_100%] bg-clip-text text-transparent' : 'text-white/80'}`}>
                            {isProcessing ? 'Agent Reasoning...' : isSuccess ? 'Task Completed' : 'Issue Detected'}
                        </span>

                        {/* Timers */}
                        {isProcessing && (
                            <div className="flex flex-col gap-0.5 mt-0.5">
                                <div className="flex items-center gap-2 text-[10px] font-mono text-neon-cyan/70">
                                    <span>Thought for {elapsedTime}s</span>
                                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                    <span>Est: {estimatedTime < 60 ? `${estimatedTime}s` : `${Math.floor(estimatedTime / 60)}m ${estimatedTime % 60}s`}</span>
                                </div>
                                {timeMessage && (
                                    <span className="text-[10px] font-mono text-amber-400/80 animate-pulse">
                                        ⏳ {timeMessage}
                                    </span>
                                )}
                            </div>
                        )}
                        {isSuccess && elapsedTime > 0 && (
                            <div className="text-[10px] font-mono text-green-500/70 mt-0.5">
                                Finished in {elapsedTime}s
                            </div>
                        )}
                    </div>
                </div>

                {/* Chevron */}
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Icon name="ChevronDown" className="w-4 h-4 text-white/40" />
                </motion.div>
            </div>

            {/* Collapsible Logs Content */}
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="border-t border-white/10"
                    >
                        <div className="p-4 bg-black/60 font-mono text-xs max-h-[300px] overflow-y-auto space-y-2 custom-scrollbar">
                            {logs.length === 0 ? (
                                <div className="text-white/30 italic">Initializing cognitive modules...</div>
                            ) : (
                                logs.map((log, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`flex gap-3 ${log.type === 'thought' ? 'pl-2 border-l-2 border-amber-400/30' : ''}`}
                                    >
                                        <span className="text-white/30 shrink-0">
                                            {log.timestamp || new Date().toLocaleTimeString()}
                                        </span>
                                        <span className={`flex-1 ${log.type === 'thought'
                                                ? 'text-amber-300/80 italic'
                                                : index === logs.length - 1 && isProcessing
                                                    ? 'text-neon-cyan'
                                                    : 'text-white/70'
                                            }`}>
                                            {log.type !== 'thought' && <span className="text-neon-magenta/50 mr-2">➜</span>}
                                            {log.message}
                                            {log.url && <div className="text-[10px] text-white/30 truncate mt-1 max-w-[200px]">{log.url}</div>}
                                        </span>
                                    </motion.div>
                                ))
                            )}

                            {/* Blinking Cursor at the end if processing */}
                            {isProcessing && (
                                <div className="flex gap-3">
                                    <span className="text-white/30 shrink-0 opacity-0">00:00:00</span>
                                    <span className="w-2 h-3 bg-neon-cyan animate-pulse mt-0.5"></span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CollapsibleReasoning;
