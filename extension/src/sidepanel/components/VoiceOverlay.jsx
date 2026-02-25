import React, { useEffect, useRef } from 'react';
import AISphere from './AISphere';

const VoiceOverlay = ({
    isOpen,
    onClose,
    status,
    transcript,
    messages,
    currentLang = 'en-US',
    onLanguageChange,
    isSongMode,
    onToggleSongMode
}) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, transcript]);

    if (!isOpen) return null;

    const sphereMode = status === 'listening' ? 'listening'
        : status === 'speaking' ? 'speaking'
            : status === 'processing' ? 'processing'
                : 'idle';

    const languages = [
        { code: 'en-US', label: 'ENG', flag: '🇺🇸' },
        { code: 'hi-IN', label: 'HIN', flag: '🇮🇳' },
        { code: 'te-IN', label: 'TEL', flag: '🇮🇳' },
    ];

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
        }}>

            {/* ===== AISphere FULL background - space + stars behind everything ===== */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
            }}>
                <AISphere mode={sphereMode} />
            </div>

            {/* ===== TOP BAR: Status & Exit ===== */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px 8px 14px',
                flexShrink: 0,
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'rgba(6, 182, 212, 0.15)',
                    border: '1px solid rgba(6, 182, 212, 0.4)',
                    borderRadius: '24px',
                    padding: '7px 16px',
                    backdropFilter: 'blur(6px)',
                }}>
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: status === 'listening' ? '#06b6d4' : status === 'speaking' ? '#a855f7' : '#f59e0b',
                        boxShadow: status === 'listening' ? '0 0 12px #06b6d4' : status === 'speaking' ? '0 0 12px #a855f7' : '0 0 12px #f59e0b',
                        animation: 'voicePulse 2s infinite',
                    }} />
                    <span style={{
                        color: '#f1f5f9',
                        fontSize: '11px',
                        fontWeight: 700,
                        fontFamily: 'monospace',
                        letterSpacing: '0.15em',
                    }}>
                        {status === 'listening' ? 'LISTENING MODE' : status === 'speaking' ? 'SPEAKING MODE' : 'PROCESSING...'}
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {/* Song Search Toggle */}
                    <button
                        onClick={onToggleSongMode}
                        title={isSongMode ? 'Song Search: ON' : 'Song Search: OFF'}
                        style={{
                            background: isSongMode ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255, 255, 255, 0.06)',
                            border: isSongMode ? '1px solid rgba(168, 85, 247, 0.6)' : '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '50%',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: isSongMode ? '0 0 16px rgba(168, 85, 247, 0.4)' : 'none',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Animated Music Bars */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            gap: '2px',
                            height: '16px',
                        }}>
                            {[0, 1, 2].map(i => (
                                <div
                                    key={i}
                                    style={{
                                        width: '3px',
                                        borderRadius: '2px',
                                        background: isSongMode ? '#a855f7' : '#94a3b8',
                                        transition: 'background 0.3s',
                                        animation: isSongMode ? `musicBar${i} 0.8s ease-in-out infinite alternate` : 'none',
                                        height: isSongMode ? (i === 1 ? '14px' : '8px') : '6px',
                                    }}
                                />
                            ))}
                        </div>
                    </button>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '24px',
                            padding: '7px 16px',
                            color: '#cbd5e1',
                            fontSize: '10px',
                            fontWeight: 700,
                            fontFamily: 'monospace',
                            letterSpacing: '0.15em',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        EXIT DIMENSION
                    </button>
                </div>
            </div>

            {/* ===== LANGUAGE SELECTOR BAR ===== */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                padding: '4px 14px',
                flexShrink: 0,
            }}>
                {languages.map(lang => (
                    <button
                        key={lang.code}
                        onClick={() => onLanguageChange && onLanguageChange(lang.code)}
                        style={{
                            background: currentLang === lang.code ? 'rgba(6, 182, 212, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                            border: currentLang === lang.code ? '1px solid rgba(6, 182, 212, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '4px 12px',
                            color: currentLang === lang.code ? '#fff' : '#94a3b8',
                            fontSize: '10px',
                            fontWeight: 700,
                            fontFamily: 'monospace',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            transition: 'all 0.2s',
                        }}
                    >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                    </button>
                ))}
            </div>

            {/* ===== CHAT AREA - scrollable, padded so it stops above sphere ===== */}
            <div ref={scrollRef} style={{
                position: 'relative',
                zIndex: 1,
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                padding: '4px 14px',
                paddingBottom: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}>
                <div style={{ flex: 1 }} />

                {messages && messages.map((msg, i) => (
                    <div key={i} style={{
                        display: 'flex',
                        justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        alignItems: 'flex-start',
                    }}>
                        {msg.sender !== 'user' && (
                            <div style={{
                                width: '7px',
                                height: '7px',
                                borderRadius: '50%',
                                background: '#06b6d4',
                                marginTop: '12px',
                                marginRight: '8px',
                                flexShrink: 0,
                                boxShadow: '0 0 6px rgba(6,182,212,0.6)',
                            }} />
                        )}
                        <div style={{
                            maxWidth: '82%',
                            padding: '10px 14px',
                            borderRadius: msg.sender === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                            fontSize: '13px',
                            lineHeight: '1.5',
                            ...(msg.sender === 'user' ? {
                                background: 'rgba(6, 182, 212, 0.12)',
                                border: '1px solid rgba(6, 182, 212, 0.25)',
                                color: '#e0f7fa',
                                backdropFilter: 'blur(4px)',
                            } : {
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                color: '#e2e8f0',
                                backdropFilter: 'blur(4px)',
                            }),
                        }}>
                            {msg.message}
                        </div>
                    </div>
                ))}
            </div>

            {/* ===== FIXED BOTTOM: Transcript + Status + 200px sphere space ===== */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                flexShrink: 0,
                textAlign: 'center',
                pointerEvents: 'none',
            }}>
                {/* Live Transcript - WHITE */}
                {transcript && (
                    <div style={{ padding: '4px 14px' }}>
                        <div style={{
                            display: 'inline-block',
                            padding: '7px 20px',
                            borderRadius: '18px',
                            fontSize: '14px',
                            fontFamily: 'monospace',
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px dashed rgba(255, 255, 255, 0.3)',
                            color: '#ffffff',
                            animation: 'voicePulse 1.5s infinite',
                            letterSpacing: '0.03em',
                            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                        }}>
                            {transcript}...
                        </div>
                    </div>
                )}

                {/* LISTENING... */}
                <div style={{
                    color: '#e2e8f0',
                    fontSize: '14px',
                    fontFamily: 'monospace',
                    letterSpacing: '0.18em',
                    fontWeight: 500,
                    textShadow: '0 0 12px rgba(226, 232, 240, 0.4)',
                    padding: '4px 0 2px 0',
                }}>
                    {status === 'listening' ? 'LISTENING...' : status === 'speaking' ? 'SPEAKING...' : 'THINKING...'}
                </div>

                {/* SAY "HEY NOVA" */}
                <div style={{
                    color: '#94a3b8',
                    fontSize: '9px',
                    fontFamily: 'monospace',
                    letterSpacing: '0.2em',
                    fontWeight: 600,
                    textShadow: '0 0 6px rgba(148, 163, 184, 0.4)',
                    marginBottom: '8px'
                }}>
                    SAY &quot;HEY NOVA&quot; OR &quot;STOP&quot; TO INTERRUPT
                </div>

                {/* Song Mode Active Indicator */}
                {isSongMode && (
                    <div style={{
                        color: '#a855f7',
                        fontSize: '10px',
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                        animation: 'voicePulse 1.5s infinite',
                        letterSpacing: '0.15em',
                        textShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
                        marginBottom: '4px',
                    }}>
                        🎵 SONG SEARCH ACTIVE
                    </div>
                )}

                {/* 200px spacer for sphere to show through from background */}
                <div style={{ height: '200px' }} />
            </div>

            {/* Keyframes */}
            <style>{`
                @keyframes voicePulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                @keyframes musicBar0 {
                    0% { height: 4px; }
                    100% { height: 14px; }
                }
                @keyframes musicBar1 {
                    0% { height: 14px; }
                    100% { height: 6px; }
                }
                @keyframes musicBar2 {
                    0% { height: 6px; }
                    100% { height: 12px; }
                }
            `}</style>
        </div>
    );
};

export default VoiceOverlay;

