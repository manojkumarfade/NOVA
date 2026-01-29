import React from 'react';
import Icon from '../AppIcon';

const AgentStatusIndicator = ({ 
  status = 'idle',
  currentTask = '',
  progress = 0,
  className = ''
}) => {
  const statusConfig = {
    idle: {
      label: 'Ready',
      icon: 'Circle',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
      borderColor: 'border-muted-foreground/20',
      pulseColor: 'bg-muted-foreground/20'
    },
    planning: {
      label: 'Planning',
      icon: 'Brain',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/30',
      pulseColor: 'bg-secondary/30'
    },
    navigating: {
      label: 'Navigating',
      icon: 'Navigation',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30',
      pulseColor: 'bg-primary/30'
    },
    validating: {
      label: 'Validating',
      icon: 'CheckCircle2',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/30',
      pulseColor: 'bg-accent/30'
    },
    error: {
      label: 'Error',
      icon: 'AlertCircle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/30',
      pulseColor: 'bg-error/30'
    }
  };

  const config = statusConfig?.[status] || statusConfig?.idle;
  const isActive = status !== 'idle';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center gap-2">
        <div className={`
          relative flex items-center justify-center w-10 h-10 rounded-lg
          ${config?.bgColor} border ${config?.borderColor}
          transition-base
        `}>
          <Icon 
            name={config?.icon} 
            size={20} 
            className={config?.color}
          />
          {isActive && (
            <span className={`
              absolute inset-0 rounded-lg animate-pulse-glow
              ${config?.pulseColor}
            `} />
          )}
        </div>

        <div className="hidden sm:flex flex-col">
          <span className={`text-sm font-caption font-medium ${config?.color}`}>
            {config?.label}
          </span>
          {currentTask && (
            <span className="text-xs text-muted-foreground truncate max-w-[200px]">
              {currentTask}
            </span>
          )}
        </div>
      </div>
      {isActive && progress > 0 && (
        <div className="hidden md:flex items-center gap-2 min-w-[120px]">
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full ${config?.bgColor?.replace('/10', '')} transition-all duration-300`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-caption font-medium text-muted-foreground">
            {progress}%
          </span>
        </div>
      )}
    </div>
  );
};

export default AgentStatusIndicator;