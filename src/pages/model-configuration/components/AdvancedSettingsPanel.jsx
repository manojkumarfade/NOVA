import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AdvancedSettingsPanel = ({
  settings,
  onSettingsChange
}) => {
  const fallbackModelOptions = [
    { value: 'gpt-4', label: 'GPT-4' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    { value: 'claude-3-opus', label: 'Claude 3 Opus' },
    { value: 'gemini-pro', label: 'Gemini Pro' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
          <Icon name="Settings2" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Advanced Settings
          </h3>
          <p className="text-sm text-muted-foreground">
            Fine-tune model behavior and performance
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Max Tokens"
            type="number"
            value={settings?.maxTokens}
            onChange={(e) => onSettingsChange('maxTokens', parseInt(e?.target?.value))}
            description="Maximum tokens per request"
            min="100"
            max="32000"
          />

          <Input
            label="Request Timeout (seconds)"
            type="number"
            value={settings?.timeout}
            onChange={(e) => onSettingsChange('timeout', parseInt(e?.target?.value))}
            description="Maximum wait time for responses"
            min="5"
            max="300"
          />
        </div>

        <Select
          label="Fallback Model"
          description="Model to use if primary model fails"
          options={fallbackModelOptions}
          value={settings?.fallbackModel}
          onChange={(value) => onSettingsChange('fallbackModel', value)}
        />

        <div className="space-y-3">
          <Checkbox
            label="Enable Automatic Retry"
            description="Retry failed requests with exponential backoff"
            checked={settings?.autoRetry}
            onChange={(e) => onSettingsChange('autoRetry', e?.target?.checked)}
          />

          <Checkbox
            label="Stream Responses"
            description="Enable streaming for faster perceived response times"
            checked={settings?.streamResponses}
            onChange={(e) => onSettingsChange('streamResponses', e?.target?.checked)}
          />

          <Checkbox
            label="Cache Responses"
            description="Cache identical requests to reduce API calls"
            checked={settings?.cacheResponses}
            onChange={(e) => onSettingsChange('cacheResponses', e?.target?.checked)}
          />
        </div>

        <div className="bg-muted/50 rounded-md p-4">
          <div className="flex items-start gap-3">
            <Icon name="AlertCircle" size={18} className="text-warning mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-caption font-medium text-foreground mb-1">
                Performance Impact
              </h4>
              <p className="text-xs text-muted-foreground">
                Higher token limits and longer timeouts may increase costs and response times. Enable caching and streaming for optimal performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettingsPanel;