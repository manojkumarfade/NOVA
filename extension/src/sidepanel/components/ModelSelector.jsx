import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Check, Zap, Sparkles, Cpu, Brain, X, Image as ImageIcon } from 'lucide-react';
import { StorageService } from '../../services/StorageService';

const ModelSelector = ({
    isOpen,
    onClose,
    isImageMode,
    currentTextModel,
    currentImageModel,
    onModelSelect
}) => {
    const [providers, setProviders] = useState([]);
    const [imgProviders, setImgProviders] = useState([]);
    const [expandedProvider, setExpandedProvider] = useState(null);

    useEffect(() => {
        loadData();
    }, [isImageMode]);

    const getLLMModels = (providerId, storedModels) => {
        const DEFAULT_LLM_MODELS = {
            openai: [
                'gpt-5.2-pro', 'gpt-5.1', 'o3-pro', 'o1-preview',
                'gpt-5', 'gpt-4.1-mini', 'gpt-4o', 'gpt-4-turbo-2024-04-09',
                'gpt-4-0613', 'gpt-4-32k-0613',
                'gpt-3.5-turbo-0125', 'gpt-3.5-turbo-instruct',
                'davinci-002', 'babbage-002'
            ],
            google: [
                'gemini-3-pro', 'gemini-3-flash', 'gemini-2.5-pro', 'gemini-2.5-flash',
                'gemini-2.0-flash-001', 'gemini-2.0-flash-lite',
                'gemini-1.5-pro-001', 'gemini-1.5-flash-001', 'gemini-1.5-pro', 'gemini-1.5-flash',
                'gemini-1.0-pro'
            ],
            anthropic: [
                'claude-opus-4.6', 'claude-sonnet-4.5', 'claude-haiku-4.5',
                'claude-3-7-sonnet-20250219', 'claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-5-sonnet-20240620',
                'claude-2.0', 'claude-2.1',
                'claude-1.0', 'claude-instant-1.2'
            ],
            xai: [
                'grok-4.1', 'grok-4', 'grok-4-fast-reasoning',
                'grok-2-vision-1212', 'grok-vision-beta',
                'grok-3', 'grok-3-mini-beta',
                'grok-2-1212', 'grok-1.5', 'grok-beta'
            ],
            typegpt: [
                'zai-org/GLM-4.6',
                'deepseek-ai/DeepSeek-R1-0528',
                'Qwen/Qwen3-235B-A22B-Thinking-2507',
                'Qwen/Qwen3-235B-A22B-Instruct-2507',
                'moonshotai/kimi-k2-instruct-0905',
                'moonshotai/kimi-k2-thinking',
                'moonshotai/kimi-k2-instruct',
                'qwen/qwen3-coder-480b-a35b-instruct',
                'deepseek-ai/deepseek-r1',
                'deepseek-ai/deepseek-r1-0528',
                'openai/gpt-oss-120b',
                'openai/gpt-oss-20b',
                'mistralai/mistral-large-3-675b-instruct-2512',
                'deepseek-ai/deepseek-v3.1-terminus',
                'deepseek-ai/deepseek-v3.1',
                'mistralai/mistral-large',
                'mistralai/mistral-small-24b-instruct',
                'mistralai/magistral-small-2506',
                'mistralai/mistral-small-3.1-24b-instruct-2503',
                'mistralai/ministral-14b-instruct-2512',
                'qwen/qwen3-next-80b-a3b-thinking',
                'qwen/qwen3-next-80b-a3b-instruct'
            ]
        };
        return DEFAULT_LLM_MODELS[providerId] || storedModels || [];
    };

    const loadData = async () => {
        if (isImageMode) {
            // Load Image Providers
            const settings = await StorageService.get('image_settings');
            if (settings?.providers) {
                const list = Object.entries(settings.providers).map(([key, val]) => ({
                    id: key,
                    name: getProviderName(key),
                    models: getModelsForProvider(key, val),
                    icon: getProviderIcon(key)
                }));
                setImgProviders(list);
                const active = list.find(p => p.models.some(m => m.id === currentImageModel));
                if (active) setExpandedProvider(active.id);
            }
        } else {
            // Load LLM Providers
            const llmProviders = await StorageService.get('llm_providers');
            if (llmProviders) {
                // Merge stored enabled state with fresh model lists for built-ins
                // Show ALL providers regardless of enabled state to avoid confusion, 
                // or just allow user to see them and be prompted for key if missing.
                const mergedProviders = llmProviders.map(p => ({
                    ...p,
                    models: getLLMModels(p.id, p.models)
                }));

                // If the list is empty (e.g. first load before settings saved), fall back to defaults?
                // Actually LLMProvidersSettings handles defaults. StorageService should return valid list if initialized.
                // If not, we should probably have a fallback here too using the DEFAULT keys.
                // But for now, removing filter fixes the immediate "I can't see them" issue if they exist in storage but are disabled.

                setProviders(mergedProviders);

                const active = mergedProviders.find(p => p.models.includes(currentTextModel));
                if (active) setExpandedProvider(active.id);
            }
        }
    };

    const getProviderName = (key) => {
        const names = {
            openai: 'OpenAI (DALL-E)',
            google: 'Google (Imagen)',
            xai: 'xAI (Grok)',
            a4f: 'A4F',
            infip: 'Infip.pro'
        };
        return names[key] || key;
    };

    const getProviderIcon = (key) => {
        if (key === 'openai') return <Sparkles size={16} />;
        if (key === 'google') return <span className="text-xs font-bold">G</span>;
        if (key === 'xai') return <X size={16} />;
        if (key === 'typegpt' || key === 'a4f') return <Cpu size={16} />;
        if (key === 'anthropic') return <Zap size={16} />;
        return <Brain size={16} />;
    };

    const getModelsForProvider = (key, data) => {
        // ImageSettings unfortunately doesn't store the full list in the 'providers' object in DB 
        // if we only saved the current config.
        // But in our Code we defined PROVIDERS constant. 
        // Ideally we should pull from the Code constants if DB is partial.
        // For now, let's assume the DB has what we need or we hardcode the list here for UI safety?
        // Actually, let's rely on what's passed in data (which should be from settings state).
        // Wait, ImageSettings `saveSettings` saves the whole `providers` state which includes keys/models/sizes.
        // But `models` was an array in the Code constant, not usually saved to DB `settings` state unless initialized.
        // Let's check ImageSettings again. It copies `PROVIDERS...models` into state on load?
        // No, ImageSettings uses `PROVIDERS` constant for rendering options. The state only holds selected `model`.
        // So we need to access that constant. Ideally it should be exported or shared.
        // For this component to be standalone, we might need to duplicate the list or import it.
        // Let's duplicate strictly the "Available Models" list for the UI.

        const IMAGE_MODELS = {
            openai: [{ id: 'gpt-image-1.5', name: 'GPT-Image 1.5' }, { id: 'dall-e-3', name: 'DALL-E 3' }, { id: 'dall-e-2', name: 'DALL-E 2' }],
            google: [{ id: 'gemini-3-pro', name: 'Gemini 3 Pro' }, { id: 'imagen-3.0-generate-001', name: 'Imagen 3' }, { id: 'gemini-2.5-flash', name: 'Gemini Flash' }],
            xai: [{ id: 'grok-4', name: 'Grok 4' }, { id: 'grok-2-image', name: 'Grok 2 Image' }],
            a4f: [
                { id: 'provider-4/imagen-4', name: 'Imagen 4' },
                { id: 'provider-4/flux-schnell', name: 'Flux Schnell' },
                { id: 'provider-4/imagen-3.5', name: 'Imagen 3.5' },
                { id: 'provider-4/sdxl-lite', name: 'SDXL Lite' },
                { id: 'provider-4/z-image-turbo', name: 'Z-Image Turbo' },
                { id: 'provider-4/flux-2-klein-4b', name: 'Flux 2 Klein 4B' },
                { id: 'provider-4/flux-2-klein-9b', name: 'Flux 2 Klein 9B' },
                { id: 'provider-4/phoenix', name: 'Phoenix' },
                { id: 'provider-4/flux-2-dev', name: 'Flux 2 Dev' },
            ],
            infip: [
                { id: 'z-image-turbo', name: 'Z-Image Turbo ★' },
                { id: 'nano-banana', name: 'Nano Banana ★' },
                { id: 'img3', name: 'Img3 (x4)' },
                { id: 'qwen', name: 'Qwen (x4)' },
                { id: 'lucid-origin', name: 'Lucid Origin (x4)' },
                { id: 'phoenix', name: 'Phoenix (x4)' },
                { id: 'sdxl', name: 'SDXL (x4)' },
                { id: 'sdxl-lite', name: 'SDXL Lite (x4)' },
                { id: 'img4', name: 'Image 4' },
                { id: 'flux-schnell', name: 'Flux Schnell' },
            ]
        };
        return IMAGE_MODELS[key] || [];
    };

    const list = isImageMode ? imgProviders : providers;

    if (!isOpen) return null;

    return (
        <div className="absolute bottom-16 left-2 z-50 w-64 bg-black/90 border border-neon-cyan/30 rounded-lg backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-bottom-2">
            <div className="p-2 bg-white/5 border-b border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-neon-cyan font-bold uppercase">
                    {isImageMode ? 'Image Models' : 'LLM Models'}
                </span>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                    <X size={14} />
                </button>
            </div>

            <div className="max-h-60 overflow-y-auto custom-scrollbar">
                {list.map((p) => {
                    const isExpanded = expandedProvider === p.id;
                    const models = isImageMode ? p.models : p.models; // LLM providers have .models array

                    return (
                        <div key={p.id} className="border-b border-white/5 last:border-0">
                            <button
                                onClick={() => setExpandedProvider(isExpanded ? null : p.id)}
                                className={`w-full flex items-center justify-between p-2 text-sm hover:bg-white/5 transition-colors ${isExpanded ? 'text-white' : 'text-gray-400'}`}
                            >
                                <div className="flex items-center gap-2">
                                    <span className={isExpanded ? "text-neon-cyan" : ""}>
                                        {isImageMode ? getProviderIcon(p.id) : (p.icon === 'Sparkles' ? <Sparkles size={14} /> : p.icon === 'Zap' ? <Zap size={14} /> : <Cpu size={14} />)}
                                    </span>
                                    <span>{p.name}</span>
                                </div>
                                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </button>

                            {isExpanded && (
                                <div className="bg-black/40">
                                    {models.map((m) => {
                                        const mId = typeof m === 'string' ? m : m.id;
                                        const mName = typeof m === 'string' ? m : m.name;
                                        const isSelected = isImageMode ? (currentImageModel === mId) : (currentTextModel === mId);

                                        return (
                                            <button
                                                key={mId}
                                                onClick={() => {
                                                    onModelSelect(p.id, mId);
                                                    onClose();
                                                }}
                                                className={`w-full text-left px-8 py-1.5 text-xs flex items-center justify-between hover:bg-neon-cyan/10 transition-colors ${isSelected ? 'text-neon-cyan' : 'text-gray-400'}`}
                                            >
                                                <span className="truncate pr-2">{mName}</span>
                                                {isSelected && <Check size={12} />}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}

                {list.length === 0 && (
                    <div className="p-4 text-center text-xs text-gray-500">
                        No enabled providers found.<br />Check Settings.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModelSelector;
