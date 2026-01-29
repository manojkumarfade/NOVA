import React from 'react';
import { ShoppingCart, Search, Zap, Image, Cpu, Globe } from 'lucide-react';

const ActionCard = ({ title, icon: Icon, color, delay }) => (
    <div
        className={`group relative glass-card p-4 rounded-xl cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-${color}/50 animate-fade-in`}
        style={{ animationDelay: `${delay}ms` }}
    >
        {/* Hover Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br from-${color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

        <div className="relative z-10 flex flex-col gap-3">
            <div className={`p-2 rounded-lg bg-${color}/10 w-fit group-hover:shadow-[0_0_15px_rgba(var(--color-${color}),0.3)] transition-shadow`}>
                <Icon className={`w-6 h-6 text-${color}`} />
            </div>

            <div>
                <h3 className="text-sm font-heading font-bold text-white tracking-wide group-hover:text-neon-cyan transition-colors">{title}</h3>
                <p className="text-[10px] text-gray-400 mt-1 font-body leading-tight group-hover:text-gray-200">
                    Auto-autonomous agent execution
                </p>
            </div>
        </div>

        {/* Decorative corner accent */}
        <div className={`absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
            <div className={`w-1.5 h-1.5 rounded-full bg-${color} shadow-[0_0_8px_currentColor]`}></div>
        </div>
    </div>
);

const AgentCommandPanel = ({ onActionSelect }) => {
    return (
        <div className="flex flex-col gap-6 p-2 h-full justify-center">

            {/* Thinking / Status Section */}
            <div className="text-center space-y-2 mb-4 animate-float">
                <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-neon-cyan/30 animate-[spin_4s_linear_infinite]"></div>
                    <div className="absolute inset-2 rounded-full border border-neon-violet/30 animate-[spin_3s_linear_infinite_reverse]"></div>
                    <Cpu className="w-8 h-8 text-neon-cyan animate-pulse" />
                </div>
                <h2 className="text-xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-neon-cyan/70">
                    SYSTEM IDLE
                </h2>
                <p className="text-xs font-mono text-neon-cyan/50 tracking-widest">WAITING FOR COMMAND</p>
            </div>

            {/* Grid of Command Cards */}
            <div className="grid grid-cols-2 gap-3">
                <ActionCard
                    title="SHOPPING"
                    icon={ShoppingCart}
                    color="neon-cyan"
                    delay={100}
                    onClick={() => onActionSelect && onActionSelect('shopping')}
                />
                <ActionCard
                    title="RESEARCH"
                    icon={Globe}
                    color="neon-violet"
                    delay={200}
                    onClick={() => onActionSelect && onActionSelect('research')}
                />
                <ActionCard
                    title="AUTOMATE"
                    icon={Zap}
                    color="neon-magenta"
                    delay={300}
                    onClick={() => onActionSelect && onActionSelect('automation')}
                />
                <ActionCard
                    title="IMAGINE"
                    icon={Image}
                    color="neon-blue"
                    delay={400}
                    onClick={() => onActionSelect && onActionSelect('image')}
                />
            </div>

            {/* Bottom Status ticker */}
            <div className="mt-4 border-t border-white/5 pt-3">
                <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    <span>CORE ONLINE</span>
                    <span className="mx-1">|</span>
                    <span>LATENCY: 12ms</span>
                    <span className="mx-1">|</span>
                    <span>MEMORY: OPTIMAL</span>
                </div>
            </div>
        </div>
    );
};

export default AgentCommandPanel;
