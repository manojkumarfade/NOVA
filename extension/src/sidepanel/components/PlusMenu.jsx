import React from 'react';
import Icon from '../../shared/components/AppIcon';

const PlusMenu = ({
    isOpen,
    onClose,
    onFileUpload,
    isImageGenEnabled,
    toggleImageGen,
    isWebSearchEnabled,
    toggleWebSearch,
    isShoppingMode,
    toggleShopping,
    isAgenticMode,
    toggleAgentic
}) => {
    if (!isOpen) return null;

    const menuItems = [
        {
            icon: 'Paperclip',
            label: 'Add photos & files',
            onClick: onFileUpload,
            color: 'text-neon-blue'
        },
        {
            icon: 'Palette',
            label: 'Create image',
            onClick: toggleImageGen,
            active: isImageGenEnabled,
            color: 'text-neon-magenta'
        },
        {
            icon: 'Globe',
            label: 'Deep research',
            onClick: toggleWebSearch,
            active: isWebSearchEnabled,
            color: 'text-neon-cyan'
        },
        {
            icon: 'ShoppingBag',
            label: 'Shopping research',
            onClick: toggleShopping,
            active: isShoppingMode,
            color: 'text-green-400'
        },
        {
            icon: 'Zap',
            label: 'Agent Mode',
            onClick: toggleAgentic,
            active: isAgenticMode,
            color: 'text-neon-violet'
        }
    ];

    return (
        <div className="absolute bottom-16 left-2 z-50 animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200">
            <div className="glass-panel border border-neon-cyan/30 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] w-64 overflow-hidden backdrop-blur-xl">
                <div className="p-1.5 space-y-0.5">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                item.onClick();
                                onClose();
                            }}
                            className={`
                                w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 group
                                ${item.active
                                    ? 'bg-neon-cyan/10 text-white shadow-[0_0_10px_rgba(6,182,212,0.2)] border border-neon-cyan/20'
                                    : 'text-gray-300 hover:bg-white/5 hover:text-white hover:pl-4'}
                            `}
                        >
                            <span className={`${item.color} ${item.active ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'} transition-opacity`}>
                                <Icon name={item.icon} size={18} className={item.active ? "animate-pulse" : ""} />
                            </span>
                            <span className="flex-1 text-left font-body tracking-wide">{item.label}</span>
                            {item.active && (
                                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_5px_theme('colors.neon.cyan')]" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
            {/* Backdrop to close */}
            <div
                className="fixed inset-0 z-[-1]"
                onClick={onClose}
            />
        </div>
    );
};

export default PlusMenu;
