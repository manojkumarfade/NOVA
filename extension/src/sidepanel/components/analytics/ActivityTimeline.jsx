import React, { useState } from 'react';
import Icon from '../../../shared/components/AppIcon';
import Button from '../../../shared/components/ui/Button';

const ActivityTimeline = ({ activities }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-success bg-success/10 border-success/30';
      case 'failed':
        return 'text-error bg-error/10 border-error/30';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/30';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return 'CheckCircle2';
      case 'failed':
        return 'XCircle';
      case 'pending':
        return 'Clock';
      default:
        return 'Circle';
    }
  };

  const formatDuration = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 elevation-sm">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/10">
            <Icon name="History" size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Activity Timeline
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">Recent browsing sessions</p>
          </div>
        </div>
      </div>
      <div className="space-y-3 md:space-y-4">
        {activities?.map((activity, index) => (
          <div 
            key={activity?.id}
            className="relative border border-border rounded-lg p-3 md:p-4 hover:border-primary/50 transition-base"
          >
            <div className="flex items-start gap-3 md:gap-4">
              <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg border flex-shrink-0 ${getStatusColor(activity?.status)}`}>
                <Icon name={getStatusIcon(activity?.status)} size={16} className="md:w-5 md:h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm md:text-base font-caption font-medium text-foreground line-clamp-1">
                      {activity?.task}
                    </h4>
                    <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                      {activity?.domain}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName={expandedId === activity?.id ? 'ChevronUp' : 'ChevronDown'}
                    onClick={() => toggleExpand(activity?.id)}
                    className="h-8 w-8 flex-shrink-0"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    <span>{activity?.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Timer" size={14} />
                    <span>{formatDuration(activity?.duration)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Zap" size={14} />
                    <span>{activity?.agent}</span>
                  </div>
                </div>

                {expandedId === activity?.id && (
                  <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border space-y-2 md:space-y-3">
                    <div>
                      <p className="text-xs font-caption font-medium text-muted-foreground mb-1">
                        Task Details
                      </p>
                      <p className="text-xs md:text-sm text-foreground">
                        {activity?.details}
                      </p>
                    </div>

                    {activity?.steps && activity?.steps?.length > 0 && (
                      <div>
                        <p className="text-xs font-caption font-medium text-muted-foreground mb-2">
                          Execution Steps
                        </p>
                        <div className="space-y-1.5">
                          {activity?.steps?.map((step, stepIndex) => (
                            <div key={stepIndex} className="flex items-start gap-2 text-xs">
                              <Icon 
                                name={step?.completed ? 'CheckCircle2' : 'Circle'} 
                                size={14} 
                                className={step?.completed ? 'text-success' : 'text-muted-foreground'}
                              />
                              <span className="text-foreground">{step?.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activity?.outcome && (
                      <div>
                        <p className="text-xs font-caption font-medium text-muted-foreground mb-1">
                          Outcome
                        </p>
                        <p className="text-xs md:text-sm text-foreground">
                          {activity?.outcome}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;
