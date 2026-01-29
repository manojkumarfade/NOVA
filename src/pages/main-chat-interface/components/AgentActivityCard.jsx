import React from 'react';
import Icon from '../../../components/AppIcon';

const AgentActivityCard = ({ 
  agentType = 'planner',
  activity = '',
  progress = 0,
  status = 'active',
  details = []
}) => {
  const agentConfig = {
    planner: {
      name: 'Planner Agent',
      icon: 'Brain',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/30'
    },
    navigator: {
      name: 'Navigator Agent',
      icon: 'Navigation',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30'
    },
    validator: {
      name: 'Validator Agent',
      icon: 'CheckCircle2',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/30'
    }
  };

  const config = agentConfig?.[agentType] || agentConfig?.planner;

  return (
    <div className={`
      p-4 md:p-5 rounded-lg border ${config?.borderColor} ${config?.bgColor}
      transition-base
    `}>
      <div className="flex items-start gap-3 md:gap-4 mb-3">
        <div className={`
          flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center
          ${config?.bgColor} border ${config?.borderColor}
        `}>
          <Icon 
            name={config?.icon} 
            size={24} 
            className={config?.color}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className={`text-sm md:text-base font-caption font-semibold ${config?.color}`}>
              {config?.name}
            </h3>
            {status === 'active' && (
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${config?.color?.replace('text-', 'bg-')} animate-pulse`} />
                <span className="text-xs text-muted-foreground">Active</span>
              </div>
            )}
          </div>
          <p className="text-sm text-foreground line-clamp-2">
            {activity}
          </p>
        </div>
      </div>
      {progress > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-caption text-muted-foreground">Progress</span>
            <span className="text-xs font-caption font-medium text-foreground">{progress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full ${config?.bgColor?.replace('/10', '')} transition-all duration-300`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      {details?.length > 0 && (
        <div className="space-y-1.5">
          {details?.map((detail, index) => (
            <div key={index} className="flex items-start gap-2">
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-muted-foreground mt-0.5 flex-shrink-0"
              />
              <span className="text-xs text-muted-foreground line-clamp-1">
                {detail}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentActivityCard;