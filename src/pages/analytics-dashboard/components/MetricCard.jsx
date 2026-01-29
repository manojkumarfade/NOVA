import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon, 
  iconColor = 'var(--color-primary)',
  trend = 'up',
  subtitle = ''
}) => {
  const changeColor = changeType === 'positive' ?'text-success' 
    : changeType === 'negative' ?'text-error' :'text-muted-foreground';

  const trendIcon = trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus';

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 elevation-sm hover:elevation-md transition-base">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10">
            <Icon name={icon} size={20} color={iconColor} className="md:w-6 md:h-6" />
          </div>
          <div>
            <h3 className="text-xs md:text-sm font-caption font-medium text-muted-foreground">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground">
            {value}
          </p>
        </div>
        
        {change !== undefined && (
          <div className={`flex items-center gap-1 ${changeColor}`}>
            <Icon name={trendIcon} size={16} className="md:w-5 md:h-5" />
            <span className="text-xs md:text-sm font-caption font-medium whitespace-nowrap">
              {change}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;