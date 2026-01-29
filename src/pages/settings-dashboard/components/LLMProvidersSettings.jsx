import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const LLMProvidersSettings = () => {
  const [providers, setProviders] = useState([
    {
      id: 'openai',
      name: 'OpenAI',
      icon: 'Sparkles',
      apiKey: 'sk-proj-abc123...',
      isConnected: true,
      isEnabled: true,
      models: ['GPT-4 Turbo', 'GPT-4', 'GPT-3.5 Turbo']
    },
    {
      id: 'anthropic',
      name: 'Anthropic',
      icon: 'Zap',
      apiKey: '',
      isConnected: false,
      isEnabled: false,
      models: ['Claude 3 Opus', 'Claude 3 Sonnet', 'Claude 3 Haiku']
    },
    {
      id: 'google',
      name: 'Google AI',
      icon: 'Gem',
      apiKey: '',
      isConnected: false,
      isEnabled: false,
      models: ['Gemini Pro', 'Gemini Ultra']
    },
    {
      id: 'deepseek',
      name: 'DeepSeek',
      icon: 'Brain',
      apiKey: '',
      isConnected: false,
      isEnabled: false,
      models: ['DeepSeek Chat', 'DeepSeek Coder']
    }
  ]);

  const [revealedKeys, setRevealedKeys] = useState({});
  const [editingProvider, setEditingProvider] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');

  const toggleKeyVisibility = (providerId) => {
    setRevealedKeys(prev => ({
      ...prev,
      [providerId]: !prev?.[providerId]
    }));
  };

  const handleApiKeyChange = (providerId, newKey) => {
    setProviders(prev => prev?.map(p => 
      p?.id === providerId ? { ...p, apiKey: newKey } : p
    ));
  };

  const handleToggleProvider = (providerId) => {
    setProviders(prev => prev?.map(p => 
      p?.id === providerId ? { ...p, isEnabled: !p?.isEnabled } : p
    ));
  };

  const handleTestConnection = (providerId) => {
    const provider = providers?.find(p => p?.id === providerId);
    if (!provider?.apiKey) return;

    setProviders(prev => prev?.map(p => 
      p?.id === providerId ? { ...p, isConnected: true } : p
    ));
  };

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setEditingProvider(null);
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };

  const maskApiKey = (key) => {
    if (!key) return '';
    if (key?.length <= 8) return '•'?.repeat(key?.length);
    return key?.substring(0, 4) + '•'?.repeat(key?.length - 8) + key?.substring(key?.length - 4);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="bg-muted border border-border rounded-lg p-4 md:p-6">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="text-sm text-foreground font-caption font-medium">
              LLM Provider Configuration
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              Configure API keys for different LLM providers. Your keys are stored locally and never shared. Enable providers to access their models in the Models section.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {providers?.map((provider) => (
          <div
            key={provider?.id}
            className={`
              bg-card border rounded-lg p-4 md:p-6 elevation-sm transition-base
              ${provider?.isEnabled ? 'border-primary/30' : 'border-border'}
            `}
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-lg flex-shrink-0
                  ${provider?.isEnabled ? 'bg-primary/10' : 'bg-muted'}
                `}>
                  <Icon 
                    name={provider?.icon} 
                    size={24} 
                    color={provider?.isEnabled ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
                      {provider?.name}
                    </h3>
                    {provider?.isConnected && (
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-accent/10 rounded-full">
                        <Icon name="CheckCircle2" size={12} className="text-accent" />
                        <span className="text-xs font-caption text-accent">Connected</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-3">
                    Available models: {provider?.models?.join(', ')}
                  </p>

                  <div className="space-y-3">
                    <Checkbox
                      label="Enable this provider"
                      description="Make this provider's models available for agent assignment"
                      checked={provider?.isEnabled}
                      onChange={() => handleToggleProvider(provider?.id)}
                    />

                    {provider?.isEnabled && (
                      <div className="space-y-2">
                        <label className="block text-sm font-caption font-medium text-foreground">
                          API Key
                        </label>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 relative">
                            <input
                              type={revealedKeys?.[provider?.id] ? 'text' : 'password'}
                              value={provider?.apiKey}
                              onChange={(e) => handleApiKeyChange(provider?.id, e?.target?.value)}
                              placeholder="Enter your API key"
                              className="w-full px-4 py-2 pr-10 bg-muted border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-base"
                            />
                            <button
                              onClick={() => toggleKeyVisibility(provider?.id)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-background rounded transition-base"
                              aria-label={revealedKeys?.[provider?.id] ? 'Hide API key' : 'Show API key'}
                            >
                              <Icon 
                                name={revealedKeys?.[provider?.id] ? 'EyeOff' : 'Eye'} 
                                size={16} 
                                className="text-muted-foreground"
                              />
                            </button>
                          </div>
                          <Button
                            variant="outline"
                            size="default"
                            iconName="Plug"
                            onClick={() => handleTestConnection(provider?.id)}
                            disabled={!provider?.apiKey}
                            className="whitespace-nowrap"
                          >
                            Test
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Get your API key from {provider?.name}'s developer portal
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 elevation-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/10">
            <Icon name="Plus" size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Add Custom Provider
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Configure additional LLM providers like Azure OpenAI, OpenRouter, or local Ollama
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Add Provider
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
        <Button
          variant="default"
          iconName="Save"
          iconPosition="left"
          onClick={handleSave}
          loading={saveStatus === 'saving'}
          className="flex-1 sm:flex-initial"
        >
          {saveStatus === 'saved' ? 'Saved Successfully' : 'Save Changes'}
        </Button>

        {saveStatus === 'saved' && (
          <div className="flex items-center gap-2 text-accent text-sm font-caption">
            <Icon name="CheckCircle2" size={16} />
            <span>Provider settings saved</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LLMProvidersSettings;