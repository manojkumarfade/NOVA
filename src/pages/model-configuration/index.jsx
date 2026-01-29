import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProviderCard from './components/ProviderCard';
import AgentAssignmentPanel from './components/AgentAssignmentPanel';
import AdvancedSettingsPanel from './components/AdvancedSettingsPanel';
import ModelComparisonTable from './components/ModelComparisonTable';
import AddProviderModal from './components/AddProviderModal';

const ModelConfiguration = () => {
  const [isAddProviderModalOpen, setIsAddProviderModalOpen] = useState(false);
  const [providers, setProviders] = useState([
    {
      id: 'openai-1',
      name: 'OpenAI',
      icon: 'Sparkles',
      status: 'connected',
      apiKey: 'sk-proj-abc123...',
      endpoint: '',
      availableModels: 12,
      requestsToday: 1247,
      avgResponseTime: '1.2s',
      isExpanded: false,
      description: 'Industry-leading models including GPT-4 and GPT-3.5 Turbo with excellent reasoning capabilities.'
    },
    {
      id: 'anthropic-1',
      name: 'Anthropic',
      icon: 'Brain',
      status: 'connected',
      apiKey: 'sk-ant-xyz789...',
      endpoint: '',
      availableModels: 8,
      requestsToday: 856,
      avgResponseTime: '1.5s',
      isExpanded: false,
      description: 'Claude models with strong analytical capabilities and extended context windows up to 200K tokens.'
    },
    {
      id: 'google-1',
      name: 'Google Gemini',
      icon: 'Gem',
      status: 'disconnected',
      apiKey: '',
      endpoint: '',
      availableModels: 6,
      requestsToday: 0,
      avgResponseTime: 'N/A',
      isExpanded: false,
      description: 'Multimodal AI models with native image and video understanding capabilities.'
    }
  ]);

  const [agents, setAgents] = useState([
    {
      type: 'planner',
      name: 'Planner Agent',
      selectedModel: 'gpt-4',
      executionCount: 3421,
      successRate: 94,
      avgExecutionTime: '2.1s'
    },
    {
      type: 'navigator',
      name: 'Navigator Agent',
      selectedModel: 'claude-3-opus',
      temperature: 0.7,
      executionCount: 8934,
      successRate: 91,
      avgExecutionTime: '1.8s'
    },
    {
      type: 'validator',
      name: 'Validator Agent',
      selectedModel: 'gpt-3.5-turbo',
      executionCount: 8934,
      successRate: 96,
      avgExecutionTime: '0.9s'
    }
  ]);

  const [advancedSettings, setAdvancedSettings] = useState({
    maxTokens: 4096,
    timeout: 30,
    fallbackModel: 'gpt-3.5-turbo',
    autoRetry: true,
    streamResponses: true,
    cacheResponses: false
  });

  const availableModels = [
    { value: 'gpt-4', label: 'GPT-4', description: 'Most capable model' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', description: 'Fast and efficient' },
    { value: 'claude-3-opus', label: 'Claude 3 Opus', description: 'Powerful reasoning' },
    { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet', description: 'Balanced performance' },
    { value: 'gemini-pro', label: 'Gemini Pro', description: 'Multimodal capabilities' },
    { value: 'deepseek-chat', label: 'DeepSeek Chat', description: 'Cost-effective' }
  ];

  const comparisonModels = [
    {
      name: 'GPT-4',
      provider: 'OpenAI',
      contextWindow: '128K',
      costPer1k: '0.03',
      speedScore: 75,
      qualityScore: 95,
      isRecommended: true
    },
    {
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      contextWindow: '200K',
      costPer1k: '0.015',
      speedScore: 70,
      qualityScore: 93,
      isRecommended: false
    },
    {
      name: 'GPT-3.5 Turbo',
      provider: 'OpenAI',
      contextWindow: '16K',
      costPer1k: '0.001',
      speedScore: 95,
      qualityScore: 80,
      isRecommended: false
    },
    {
      name: 'Gemini Pro',
      provider: 'Google',
      contextWindow: '32K',
      costPer1k: '0.0005',
      speedScore: 85,
      qualityScore: 82,
      isRecommended: false
    },
    {
      name: 'DeepSeek Chat',
      provider: 'DeepSeek',
      contextWindow: '64K',
      costPer1k: '0.0002',
      speedScore: 80,
      qualityScore: 75,
      isRecommended: false
    }
  ];

  const handleToggleExpand = (providerId) => {
    setProviders(providers?.map(p => 
      p?.id === providerId ? { ...p, isExpanded: !p?.isExpanded } : p
    ));
  };

  const handleUpdateApiKey = (providerId, apiKey) => {
    setProviders(providers?.map(p => 
      p?.id === providerId ? { ...p, apiKey, status: 'disconnected' } : p
    ));
  };

  const handleTestConnection = (providerId) => {
    setProviders(providers?.map(p => 
      p?.id === providerId ? { ...p, status: 'testing' } : p
    ));

    setTimeout(() => {
      setProviders(providers?.map(p => 
        p?.id === providerId ? { ...p, status: 'connected' } : p
      ));
    }, 2000);
  };

  const handleRemoveProvider = (providerId) => {
    setProviders(providers?.filter(p => p?.id !== providerId));
  };

  const handleModelChange = (agentType, modelValue) => {
    setAgents(agents?.map(a => 
      a?.type === agentType ? { ...a, selectedModel: modelValue } : a
    ));
  };

  const handleTemperatureChange = (agentType, temperature) => {
    setAgents(agents?.map(a => 
      a?.type === agentType ? { ...a, temperature } : a
    ));
  };

  const handleSettingsChange = (key, value) => {
    setAdvancedSettings({ ...advancedSettings, [key]: value });
  };

  const handleAddProvider = (formData) => {
    const providerConfig = {
      openai: { name: 'OpenAI', icon: 'Sparkles', models: 12 },
      anthropic: { name: 'Anthropic', icon: 'Brain', models: 8 },
      google: { name: 'Google Gemini', icon: 'Gem', models: 6 },
      deepseek: { name: 'DeepSeek', icon: 'Zap', models: 4 },
      grok: { name: 'Grok', icon: 'Bot', models: 3 },
      ollama: { name: 'Ollama', icon: 'Server', models: 15 },
      azure: { name: 'Azure OpenAI', icon: 'Cloud', models: 10 },
      openrouter: { name: 'OpenRouter', icon: 'Route', models: 50 }
    };

    const config = providerConfig?.[formData?.provider];
    const newProvider = {
      id: `${formData?.provider}-${Date.now()}`,
      name: config?.name,
      icon: config?.icon,
      status: 'disconnected',
      apiKey: formData?.apiKey,
      endpoint: formData?.endpoint,
      availableModels: config?.models,
      requestsToday: 0,
      avgResponseTime: 'N/A',
      isExpanded: false,
      description: `${config?.name} provider with ${config?.models} available models.`
    };

    setProviders([...providers, newProvider]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
                Model Configuration
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Manage LLM providers and configure agent model assignments
              </p>
            </div>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setIsAddProviderModalOpen(true)}
              className="w-full lg:w-auto"
            >
              Add Provider
            </Button>
          </div>

          <div className="space-y-6 md:space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <Icon name="Plug" size={20} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                    LLM Providers
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Configure API keys and connection settings
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {providers?.map(provider => (
                  <ProviderCard
                    key={provider?.id}
                    provider={provider}
                    onUpdateApiKey={handleUpdateApiKey}
                    onTestConnection={handleTestConnection}
                    onRemoveProvider={handleRemoveProvider}
                    onToggleExpand={handleToggleExpand}
                  />
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/10">
                  <Icon name="Users" size={20} className="text-secondary" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                    Agent Model Assignment
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Assign specific models to each agent
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {agents?.map(agent => (
                  <AgentAssignmentPanel
                    key={agent?.type}
                    agent={agent}
                    availableModels={availableModels}
                    onModelChange={handleModelChange}
                    onTemperatureChange={handleTemperatureChange}
                  />
                ))}
              </div>
            </section>

            <section>
              <AdvancedSettingsPanel
                settings={advancedSettings}
                onSettingsChange={handleSettingsChange}
              />
            </section>

            <section>
              <ModelComparisonTable models={comparisonModels} />
            </section>
          </div>
        </div>
      </main>
      <AddProviderModal
        isOpen={isAddProviderModalOpen}
        onClose={() => setIsAddProviderModalOpen(false)}
        onAddProvider={handleAddProvider}
      />
    </div>
  );
};

export default ModelConfiguration;