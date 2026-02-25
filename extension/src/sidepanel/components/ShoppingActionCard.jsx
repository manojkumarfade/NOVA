import React, { useState } from 'react';

const ShoppingActionCard = ({ products = [], winnerProduct, winnerUrl, onAddToCart, onCompare }) => {
    const [actionState, setActionState] = useState({});

    if (!products || products.length === 0) return null;

    const handleAction = (type, index, url, name) => {
        setActionState(prev => ({ ...prev, [`${type}-${index}`]: true }));
        if (type === 'cart') {
            onAddToCart(url);
        } else if (type === 'compare') {
            onCompare(url, name);
        }
    };

    const isDirectProductUrl = (url) => {
        if (!url || url === 'Check Site') return false;
        const lower = url.toLowerCase();
        // Must be a direct product page, NOT a search/listing
        const isSearch = lower.includes('/s?k=') || lower.includes('/s/') || lower.includes('/search') || lower.includes('duckduckgo.com') || lower.includes('/browse/');
        return !isSearch;
    };

    const getViewLabel = (url) => {
        if (!url || url === 'Check Site') return 'Search on Amazon';
        if (!isDirectProductUrl(url)) return 'Search on Amazon';
        return 'View Product';
    };

    const getViewUrl = (url, productName) => {
        if (!url || url === 'Check Site') {
            return `https://www.amazon.in/s?k=${encodeURIComponent(productName || '')}`;
        }
        return url;
    };

    return (
        <div className="mt-4 flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-white/90 px-1 border-b border-white/10 pb-2">Recommended Products</h3>
            {products.map((p, idx) => {
                const productUrl = p.url || winnerUrl;
                const productName = p.name || winnerProduct;
                const isDirect = isDirectProductUrl(productUrl);

                return (
                    <div key={idx} className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl p-3 pb-4 flex flex-col gap-2 relative group shadow-lg">
                        {p.badge && (
                            <div className="absolute top-0 right-0 bg-neon-cyan/20 text-neon-cyan text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10">
                                {p.badge.toUpperCase()}
                            </div>
                        )}

                        <div className="flex gap-3 items-start">
                            {p.image ? (
                                <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-lg bg-black/40 border border-white/5" />
                            ) : (
                                <div className="w-16 h-16 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center text-xl">
                                    🛒
                                </div>
                            )}
                            <div className="flex-1 flex flex-col min-w-0">
                                <h4 className="text-sm font-medium text-white/90 truncate pr-16">{productName}</h4>
                                <p className="text-xs text-neon-cyan font-mono mt-1">{p.price}</p>
                                {p.score && <p className="text-[10px] text-white/50 mt-1">Score: {p.score}/10</p>}
                            </div>
                        </div>

                        {p.specs && p.specs.length > 0 && (
                            <ul className="mt-2 space-y-1">
                                {p.specs.slice(0, 3).map((spec, sIdx) => (
                                    <li key={sIdx} className="text-[11px] text-white/60 flex items-start gap-1">
                                        <span className="text-neon-magenta mt-[2px]">•</span>
                                        <span>{spec}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {p.explanation && (
                            <div className="mt-2 text-[11px] text-neon-cyan/80 bg-neon-cyan/5 p-2 rounded-lg border border-neon-cyan/10">
                                {p.explanation}
                            </div>
                        )}

                        {/* Action Buttons — always fully visible */}
                        <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-white/10">
                            {/* View Product / Search */}
                            <a
                                href={getViewUrl(productUrl, productName)}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-white/80 transition-colors text-center cursor-pointer block"
                            >
                                {getViewLabel(productUrl)}
                            </a>

                            {/* Add to Cart — only for direct product URLs */}
                            {isDirect && (
                                <button
                                    onClick={() => handleAction('cart', idx, productUrl, productName)}
                                    disabled={actionState[`cart-${idx}`]}
                                    className={`w-full px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${actionState[`cart-${idx}`]
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                        : 'bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                                        }`}
                                >
                                    <span>🛒</span>
                                    {actionState[`cart-${idx}`] ? 'Adding...' : 'Add to Cart'}
                                </button>
                            )}

                            {/* Compare on Flash.co — only for direct product URLs */}
                            {isDirect && (
                                <button
                                    onClick={() => handleAction('compare', idx, productUrl, productName)}
                                    disabled={actionState[`compare-${idx}`]}
                                    className="w-full px-3 py-2 bg-neon-magenta/10 hover:bg-neon-magenta/20 text-neon-magenta border border-neon-magenta/30 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                                >
                                    <span>⚡</span>
                                    {actionState[`compare-${idx}`] ? 'Comparing...' : 'Compare on Flash.co'}
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ShoppingActionCard;
