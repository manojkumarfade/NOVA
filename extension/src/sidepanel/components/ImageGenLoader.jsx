import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ImageGenLoader = ({ status = 'active', currentMessage = 'Generating Image...' }) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const isProcessing = status === 'active' || status === 'generating_image';

    useEffect(() => {
        let timer;
        if (isProcessing) {
            timer = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);
        }
        return () => { if (timer) clearInterval(timer); };
    }, [isProcessing]);

    // Cycle through ambient status messages
    const getAmbientMessage = () => {
        if (!isProcessing) return 'Synthesis Complete';
        const cycle = Math.floor(elapsedTime / 4) % 5;
        const messages = [
            'Synthesizing visual lattice...',
            'Weaving photonic threads...',
            'Aligning quantum pixels...',
            'Crystallizing neural patterns...',
            'Rendering dimensional layers...'
        ];
        return messages[cycle];
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="my-4 relative"
        >
            {/* Main Container with Glow */}
            <div className="nova-image-loader relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl">

                {/* Loader Image */}
                <div className="relative flex justify-center items-center p-6">
                    <div className="nova-loader-glow relative w-48 h-48 rounded-xl overflow-hidden">
                        <img
                            src="/nova_loader.png"
                            alt="Nova Intelligence"
                            className="w-full h-full object-cover rounded-xl"
                            style={{ filter: isProcessing ? 'brightness(1.1) saturate(1.2)' : 'brightness(0.8) saturate(0.7)' }}
                        />

                        {/* Animated Overlay Shimmer */}
                        {isProcessing && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer-sweep rounded-xl" />
                        )}
                    </div>
                </div>

                {/* Status Text */}
                <div className="px-6 pb-5 text-center">
                    {/* Brand */}
                    <div className="text-[10px] font-mono tracking-[0.4em] text-neon-cyan/50 uppercase mb-2">
                        Nova Intelligence
                    </div>

                    {/* Current Action */}
                    <div className={`text-sm font-semibold mb-1 ${isProcessing
                            ? 'animate-shimmer bg-[linear-gradient(110deg,#00f0ff,45%,#fff,55%,#00f0ff)] bg-[length:200%_100%] bg-clip-text text-transparent'
                            : 'text-green-400'
                        }`}>
                        {currentMessage}
                    </div>

                    {/* Ambient Message */}
                    <motion.div
                        key={getAmbientMessage()}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-[11px] font-mono text-violet-300/60 italic"
                    >
                        {getAmbientMessage()}
                    </motion.div>

                    {/* Timer */}
                    {isProcessing && (
                        <div className="mt-2 text-[10px] font-mono text-white/30">
                            {elapsedTime}s elapsed
                        </div>
                    )}
                </div>

                {/* Bottom Glow Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent" />
            </div>
        </motion.div>
    );
};

export default ImageGenLoader;
