import React from 'react';
import Icon from '../../shared/components/AppIcon';

const AgentActivityCard = ({
  agentType = 'planner',
  activity = '',
  progress = 0,
  status = 'active',
  details = []
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const agentConfig = {
    planner: {
      name: 'Planner Agent',
      icon: 'Brain',
      color: 'text-neon-cyan',
      bgColor: 'bg-black/80 shadow-[inset_0_0_10px_rgba(6,182,212,0.2)]',
      borderColor: 'border-neon-cyan/40'
    },
    navigator: {
      name: 'Navigator Agent',
      icon: 'Navigation',
      color: 'text-neon-blue',
      bgColor: 'bg-black/80 shadow-[inset_0_0_10px_rgba(59,130,246,0.2)]',
      borderColor: 'border-neon-blue/40'
    },
    validator: {
      name: 'Validator Agent',
      icon: 'CheckCircle2',
      color: 'text-neon-green',
      bgColor: 'bg-black/80 shadow-[inset_0_0_10px_rgba(34,197,94,0.2)]',
      borderColor: 'border-neon-green/40'
    },
    generating_image: {
      name: 'Image Agent',
      icon: 'Image',
      color: 'text-neon-magenta',
      bgColor: 'bg-black/80 shadow-[inset_0_0_10px_rgba(236,72,153,0.2)]',
      borderColor: 'border-neon-magenta/40'
    }
  };

  const config = agentConfig?.[agentType] || agentConfig?.planner;

  return (
    <div className={`
      p-4 md:p-5 rounded-lg border ${config?.borderColor} ${config?.bgColor}
      transition-all duration-300
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
            <div className="flex items-center gap-2">
              {status === 'active' && (
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${config?.color?.replace('text-', 'bg-')} animate-pulse`} />
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
              )}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 hover:bg-black/5 rounded-full transition-colors"
              >
                <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} className="text-muted-foreground" />
              </button>
            </div>
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

      {/* Expandable Details Section */}
      {details?.length > 0 && isExpanded && (
        <div className="mt-3 pt-3 border-t border-black/5 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Thinking Process:</div>
          {details?.map((detail, index) => (
            <div key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
              <span className="mt-0.5">•</span>
              <span className="break-words">{detail}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentActivityCard;
