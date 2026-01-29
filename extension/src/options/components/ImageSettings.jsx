import React, { useState, useEffect } from 'react';
import { StorageService } from '../../services/StorageService';
import Button from '../../shared/components/ui/Button';
import Icon from '../../shared/components/AppIcon';
import { Checkbox } from '../../shared/components/ui/Checkbox';

const PROVIDERS = {
    a4f: {
        name: 'A4F (Reliable)',
        models: [
            { id: 'provider-4/imagen-4', name: 'Imagen 4 (Default)' },
            { id: 'provider-4/imagen-3.5', name: 'Imagen 3.5' },
            { id: 'provider-8/imagen-4', name: 'Imagen 4 (Alt)' },
            { id: 'provider-4/sdxl-lite', name: 'SDXL Lite' },
            { id: 'provider-4/flux-schnell', name: 'Flux Schnell' },
            { id: 'provider-4/phoenix', name: 'Phoenix' },
            { id: 'provider-8/firefrost', name: 'Firefrost' },
            { id: 'provider-8/z-image', name: 'Z-Image' },
        ],
        defaultModel: 'provider-4/imagen-4',
        sizes: ['1024x1024', '512x512', '768x768']
    },
    pico: {
        name: 'PicoApps (50/mo)',
        models: [{ id: 'default', name: 'Default' }],
        defaultModel: 'default',
        sizes: ['1024x1024']
    },
    infip: {
        name: 'Infip.pro (Flexible)',
        models: [
            { id: 'img4', name: 'Image 4 (Recommended)' },
            { id: 'flux-schnell', name: 'Flux Schnell' },
            { id: 'sdxl', name: 'SDXL' },
            { id: 'nano-banana', name: 'Nano Banana' },
            { id: 'z-image-turbo', name: 'Z-Image Turbo' },
            { id: 'lucid-origin', name: 'Lucid Origin' },
        ],
        defaultModel: 'img4',
        sizes: ['1024x1024', '512x512', '768x1024', '1024x768']
    }
};

const ImageSettings = () => {
    const [enabled, setEnabled] = useState(false);
    const [activeProvider, setActiveProvider] = useState('a4f');
    const [settings, setSettings] = useState({
        a4f: { apiKey: '', model: PROVIDERS.a4f.defaultModel, size: '1024x1024' },
        pico: { apiKey: '', model: PROVIDERS.pico.defaultModel, size: '1024x1024' },
        infip: { apiKey: '', model: PROVIDERS.infip.defaultModel, size: '1024x1024' }
    });
    const [showKeys, setShowKeys] = useState({});
    const [status, setStatus] = useState('');

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        const data = await StorageService.get('image_settings', {
            enabled: false,
            activeProvider: 'a4f',
            providers: {
                a4f: { apiKey: '', model: PROVIDERS.a4f.defaultModel, size: '1024x1024' },
                pico: { apiKey: '', model: PROVIDERS.pico.defaultModel, size: '1024x1024' },
                infip: { apiKey: '', model: PROVIDERS.infip.defaultModel, size: '1024x1024' }
            }
        });

        setEnabled(data.enabled);
        setActiveProvider(data.activeProvider || 'a4f');
        setSettings(data.providers || {
            a4f: { apiKey: '', model: PROVIDERS.a4f.defaultModel, size: '1024x1024' },
            pico: { apiKey: '', model: PROVIDERS.pico.defaultModel, size: '1024x1024' },
            infip: { apiKey: '', model: PROVIDERS.infip.defaultModel, size: '1024x1024' }
        });
    };

    const saveSettings = async () => {
        const data = {
            enabled,
            activeProvider,
            providers: settings
        };
        const success = await StorageService.set('image_settings', data);
        if (success) {
            setStatus('Settings saved successfully!');
            setTimeout(() => setStatus(''), 2000);
        } else {
            setStatus('Failed to save settings.');
        }
    };

    const updateProviderSetting = (provider, key, value) => {
        setSettings(prev => ({
            ...prev,
            [provider]: {
                ...prev[provider],
                [key]: value
            }
        }));
    };

    const toggleKeyVisibility = (provider) => {
        setShowKeys(prev => ({ ...prev, [provider]: !prev[provider] }));
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-center border-b border-border pb-4">
                <div>
                    <h2 className="text-xl font-heading font-semibold text-center">Image Generation</h2>
                    <p className="text-sm text-muted-foreground text-center">Configure AI providers for visual content creation.</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-4 elevation-sm flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-base">Enable Image Generation</h3>
                        <p className="text-xs text-muted-foreground">Allow the agent to generate images using configured providers.</p>
                    </div>
                    <Checkbox
                        checked={enabled}
                        onChange={(e) => setEnabled(e.target.checked)}
                    />
                </div>

                <label className="block text-sm font-medium mb-2">Active Provider</label>
                <select
                    value={activeProvider}
                    onChange={(e) => setActiveProvider(e.target.value)}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-md focus:ring-1 focus:ring-ring focus:outline-none"
                >
                    {Object.entries(PROVIDERS).map(([key, info]) => (
                        <option key={key} value={key}>{info.name}</option>
                    ))}
                </select>
            </div>

            {/* Provider Configurations */}
            {Object.entries(PROVIDERS).map(([key, info]) => (
                <div key={key} className={`border border-border rounded-lg p-4 space-y-4 ${activeProvider === key ? 'bg-card ring-1 ring-primary' : 'bg-muted/50 opacity-70 hover:opacity-100 transition-opacity'}`}>
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            {info.name}
                            {activeProvider === key && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Active</span>}
                        </h3>
                    </div>

                    <div className="space-y-3">
                        {/* API Key */}
                        {key !== 'pico' ? (
                            <div>
                                <label className="block text-xs font-medium mb-1">API Key</label>
                                <div className="relative">
                                    <input
                                        type={showKeys[key] ? "text" : "password"}
                                        value={settings[key]?.apiKey || ''}
                                        onChange={(e) => updateProviderSetting(key, 'apiKey', e.target.value)}
                                        placeholder={`Enter ${info.name} API Key`}
                                        className="w-full px-3 py-2 pr-10 bg-background border border-border rounded-md text-sm focus:ring-1 focus:ring-ring focus:outline-none placeholder:text-muted-foreground/50"
                                    />
                                    <button
                                        onClick={() => toggleKeyVisibility(key)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        <Icon name={showKeys[key] ? "EyeOff" : "Eye"} size={16} />
                                    </button>
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-1">Stored locally in your browser.</p>
                            </div>
                        ) : (
                            <div className="bg-primary/10 border border-primary/20 rounded-md p-3 flex items-center gap-3">
                                <div className="p-2 bg-primary/20 rounded-full text-primary">
                                    <Icon name="Zap" size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-primary">Ready to Generate</p>
                                    <p className="text-xs text-muted-foreground">Free tier (50 images/mo). No API key needed.</p>
                                </div>
                            </div>
                        )}

                        {/* Model Selector */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium mb-1">Model</label>
                                <select
                                    value={settings[key]?.model}
                                    onChange={(e) => updateProviderSetting(key, 'model', e.target.value)}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm"
                                >
                                    {info.models.map(m => (
                                        <option key={m.id} value={m.id}>{m.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Size Selector */}
                            <div>
                                <label className="block text-xs font-medium mb-1">Image Size</label>
                                <select
                                    value={settings[key]?.size}
                                    onChange={(e) => updateProviderSetting(key, 'size', e.target.value)}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm"
                                >
                                    {info.sizes.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="pt-4 flex items-center justify-between">
                <span className={`text-sm font-medium ${status.includes('success') ? 'text-green-500' : 'text-red-500'}`}>{status}</span>
                <Button onClick={saveSettings} variant="default" iconName="Save">
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default ImageSettings;
