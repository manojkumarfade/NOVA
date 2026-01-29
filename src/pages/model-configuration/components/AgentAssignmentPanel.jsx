import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const AgentAssignmentPanel = ({
  agent,
  availableModels,
  onModelChange,
  onTemperatureChange
}) => {
  const agentConfig = {
    planner: {
      icon: 'Brain',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      description: 'Analyzes tasks and creates execution plans'
    },
    navigator: {
      icon: 'Navigation',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Executes navigation and DOM interactions'
    },
    validator: {
      icon: 'CheckCircle2',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      description: 'Validates results and ensures accuracy'
    }
  };

  const config = agentConfig?.[agent?.type] || agentConfig?.planner;

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${config?.bgColor} flex-shrink-0`}>
          <Icon name={config?.icon} size={24} className={config?.color} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
            {agent?.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {config?.description}
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <Select
          label="Assigned Model"
          description="Select the LLM model for this agent"
          options={availableModels}
          value={agent?.selectedModel}
          onChange={(value) => onModelChange(agent?.type, value)}
          searchable
        />

        {agent?.type === 'navigator' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-caption font-medium text-foreground">
                Temperature
              </label>
              <span className="text-sm font-mono text-muted-foreground">
                {agent?.temperature?.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={agent?.temperature}
              onChange={(e) => onTemperatureChange(agent?.type, parseFloat(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-muted-foreground">Precise</span>
              <span className="text-xs text-muted-foreground">Creative</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-muted rounded-md p-3">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Zap" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Executions</span>
            </div>
            <p className="text-base font-heading font-semibold text-foreground">
              {agent?.executionCount?.toLocaleString()}
            </p>
          </div>

          <div className="bg-muted rounded-md p-3">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="CheckCircle2" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Success Rate</span>
            </div>
            <p className="text-base font-heading font-semibold text-foreground">
              {agent?.successRate}%
            </p>
          </div>

          <div className="bg-muted rounded-md p-3">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Clock" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Avg Time</span>
            </div>
            <p className="text-base font-heading font-semibold text-foreground">
              {agent?.avgExecutionTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentAssignmentPanel;