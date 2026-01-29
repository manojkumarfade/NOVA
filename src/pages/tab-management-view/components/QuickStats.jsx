import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ stats, className = '' }) => {
  const statItems = [
    {
      label: 'Total Tabs',
      value: stats?.totalTabs,
      icon: 'Layers',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Active Now',
      value: stats?.activeTabs,
      icon: 'Circle',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Grouped',
      value: stats?.groupedTabs,
      icon: 'FolderOpen',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      label: 'Memory Used',
      value: stats?.memoryUsed,
      icon: 'HardDrive',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 ${className}`}>
      {statItems?.map((stat, index) => (
        <div 
          key={index}
          className="bg-card border border-border rounded-lg p-4 md:p-5 transition-base hover:elevation-md"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              {stat?.value}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground font-caption">
              {stat?.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;