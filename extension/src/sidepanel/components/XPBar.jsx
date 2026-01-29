import React from 'react';

const XPBar = ({ level, progress }) => {
    return (
        <div className="flex flex-col gap-1 w-full max-w-[200px]">
            <div className="flex justify-between items-end text-[10px] font-mono tracking-wider text-neon-cyan/80">
                <span>LVL {level}</span>
                <span>{progress}%</span>
            </div>

            {/* Bar Container */}
            <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-neon-cyan/20 relative backdrop-blur-sm">
                {/* Progress Fill */}
                <div
                    className="h-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-violet shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>

                {/* Animated Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2 -skew-x-12 animate-[slide-in_2s_infinite]"></div>
            </div>

            <div className="flex justify-between text-[8px] text-neon-cyan/40 font-mono uppercase">
                <span>Nav</span>
                <span>Exp</span>
            </div>
        </div>
    );
};

export default XPBar;
