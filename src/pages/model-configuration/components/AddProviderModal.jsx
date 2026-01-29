import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddProviderModal = ({ isOpen, onClose, onAddProvider }) => {
  const [formData, setFormData] = useState({
    provider: '',
    apiKey: '',
    endpoint: ''
  });
  const [showApiKey, setShowApiKey] = useState(false);

  const providerOptions = [
    { value: 'openai', label: 'OpenAI' },
    { value: 'anthropic', label: 'Anthropic' },
    { value: 'google', label: 'Google Gemini' },
    { value: 'deepseek', label: 'DeepSeek' },
    { value: 'grok', label: 'Grok' },
    { value: 'ollama', label: 'Ollama' },
    { value: 'azure', label: 'Azure OpenAI' },
    { value: 'openrouter', label: 'OpenRouter' }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    onAddProvider(formData);
    setFormData({ provider: '', apiKey: '', endpoint: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card border border-border rounded-lg elevation-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Icon name="Plus" size={20} className="text-primary" />
            </div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Add LLM Provider
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
            className="h-8 w-8"
          />
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Select
            label="Provider"
            description="Select the LLM provider to add"
            options={providerOptions}
            value={formData?.provider}
            onChange={(value) => setFormData({ ...formData, provider: value })}
            required
          />

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-caption font-medium text-foreground">
                API Key
              </label>
            </div>
            <div className="relative">
              <Input
                type={showApiKey ? 'text' : 'password'}
                value={formData?.apiKey}
                onChange={(e) => setFormData({ ...formData, apiKey: e?.target?.value })}
                placeholder="Enter your API key"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-base"
              >
                <Icon name={showApiKey ? 'EyeOff' : 'Eye'} size={18} />
              </button>
            </div>
          </div>

          <Input
            label="Custom Endpoint (Optional)"
            type="url"
            value={formData?.endpoint}
            onChange={(e) => setFormData({ ...formData, endpoint: e?.target?.value })}
            placeholder="https://api.example.com/v1"
            description="Leave empty to use default endpoint"
          />

          <div className="bg-muted/50 rounded-md p-3">
            <div className="flex items-start gap-2">
              <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Your API key is stored locally and never sent to our servers. It's only used to communicate directly with the selected provider.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Button
              type="submit"
              variant="default"
              iconName="Plus"
              iconPosition="left"
              fullWidth
            >
              Add Provider
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              fullWidth
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProviderModal;