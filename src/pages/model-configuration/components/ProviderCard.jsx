import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProviderCard = ({
  provider,
  onUpdateApiKey,
  onTestConnection,
  onRemoveProvider,
  onToggleExpand
}) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState(provider?.apiKey || '');
  const [isEditing, setIsEditing] = useState(false);

  const statusConfig = {
    connected: {
      icon: 'CheckCircle2',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      label: 'Connected'
    },
    disconnected: {
      icon: 'XCircle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      label: 'Disconnected'
    },
    testing: {
      icon: 'Loader2',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      label: 'Testing...'
    }
  };

  const status = statusConfig?.[provider?.status] || statusConfig?.disconnected;

  const handleSaveApiKey = () => {
    onUpdateApiKey(provider?.id, apiKey);
    setIsEditing(false);
  };

  const handleTestConnection = () => {
    onTestConnection(provider?.id);
  };

  return (
    <div className="bg-card border border-border rounded-lg elevation-sm transition-base hover:elevation-md">
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${status?.bgColor}`}>
              <Icon name={provider?.icon} size={24} className={status?.color} />
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground">
                {provider?.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Icon name={status?.icon} size={14} className={status?.color} />
                <span className={`text-xs font-caption font-medium ${status?.color}`}>
                  {status?.label}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              iconName={provider?.isExpanded ? 'ChevronUp' : 'ChevronDown'}
              onClick={() => onToggleExpand(provider?.id)}
              className="h-8 w-8"
            />
            <Button
              variant="ghost"
              size="icon"
              iconName="Trash2"
              onClick={() => onRemoveProvider(provider?.id)}
              className="h-8 w-8 text-error hover:text-error"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="bg-muted rounded-md p-3">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Layers" size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Available Models</span>
            </div>
            <p className="text-lg font-heading font-semibold text-foreground">
              {provider?.availableModels}
            </p>
          </div>

          <div className="bg-muted rounded-md p-3">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Activity" size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Requests Today</span>
            </div>
            <p className="text-lg font-heading font-semibold text-foreground">
              {provider?.requestsToday?.toLocaleString()}
            </p>
          </div>

          <div className="bg-muted rounded-md p-3">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Zap" size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Avg Response</span>
            </div>
            <p className="text-lg font-heading font-semibold text-foreground">
              {provider?.avgResponseTime}
            </p>
          </div>
        </div>

        {provider?.isExpanded && (
          <div className="border-t border-border pt-4 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-caption font-medium text-foreground">
                  API Key
                </label>
                {!isEditing && (
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Edit2"
                    iconPosition="left"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                )}
              </div>
              
              {isEditing ? (
                <div className="space-y-3">
                  <div className="relative">
                    <Input
                      type={showApiKey ? 'text' : 'password'}
                      value={apiKey}
                      onChange={(e) => setApiKey(e?.target?.value)}
                      placeholder="Enter your API key"
                      className="pr-10"
                    />
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-base"
                    >
                      <Icon name={showApiKey ? 'EyeOff' : 'Eye'} size={18} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      iconName="Save"
                      iconPosition="left"
                      onClick={handleSaveApiKey}
                    >
                      Save Key
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsEditing(false);
                        setApiKey(provider?.apiKey || '');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-md px-3 py-2 font-mono text-sm text-muted-foreground">
                    {provider?.apiKey ? '••••••••••••••••' : 'No API key configured'}
                  </div>
                  {provider?.apiKey && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="TestTube2"
                      iconPosition="left"
                      onClick={handleTestConnection}
                      loading={provider?.status === 'testing'}
                    >
                      Test
                    </Button>
                  )}
                </div>
              )}
            </div>

            {provider?.endpoint && (
              <div>
                <label className="text-sm font-caption font-medium text-foreground mb-2 block">
                  Custom Endpoint
                </label>
                <Input
                  type="url"
                  value={provider?.endpoint}
                  placeholder="https://api.example.com/v1"
                  disabled
                />
              </div>
            )}

            <div className="bg-muted/50 rounded-md p-3">
              <div className="flex items-start gap-2">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">
                    {provider?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderCard;