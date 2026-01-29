import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TopicCluster = ({ 
  clusters = [],
  onClusterClick,
  className = '' 
}) => {
  const getClusterIcon = (topic) => {
    const iconMap = {
      'Technology': 'Cpu',
      'Business': 'Briefcase',
      'Entertainment': 'Film',
      'Education': 'GraduationCap',
      'Health': 'Heart',
      'News': 'Newspaper',
      'Shopping': 'ShoppingCart',
      'Social': 'Users',
      'Travel': 'Plane',
      'Finance': 'DollarSign'
    };
    return iconMap?.[topic] || 'Folder';
  };

  const getClusterColor = (index) => {
    const colors = [
      'bg-primary/10 text-primary border-primary/20',
      'bg-secondary/10 text-secondary border-secondary/20',
      'bg-accent/10 text-accent border-accent/20',
      'bg-warning/10 text-warning border-warning/20',
      'bg-error/10 text-error border-error/20'
    ];
    return colors?.[index % colors?.length];
  };

  return (
    <div className={`bg-card border border-border rounded-lg elevation-sm p-4 md:p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-1">
            Content Clusters
          </h2>
          <p className="text-sm text-muted-foreground">
            Your browsing organized by topic
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="RefreshCw"
        >
          Refresh
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clusters?.map((cluster, index) => (
          <button
            key={cluster?.id}
            onClick={() => onClusterClick(cluster)}
            className={`
              flex flex-col gap-3 p-4 rounded-lg border transition-base
              hover:elevation-md ${getClusterColor(index)}
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-current/10">
                  <Icon name={getClusterIcon(cluster?.topic)} size={20} />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-caption font-semibold">
                    {cluster?.topic}
                  </h3>
                  <p className="text-xs opacity-80">
                    {cluster?.pageCount} pages
                  </p>
                </div>
              </div>
              <Icon name="ChevronRight" size={18} />
            </div>

            <div className="flex flex-wrap gap-2">
              {cluster?.topKeywords?.slice(0, 3)?.map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs font-caption rounded-md bg-current/10"
                >
                  {keyword}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs opacity-80">
              <div className="flex items-center gap-1">
                <Icon name="Clock" size={12} />
                <span>{cluster?.lastVisited}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="TrendingUp" size={12} />
                <span>{cluster?.visitFrequency}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
      {clusters?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icon name="Layers" size={48} className="text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground">
            No content clusters available yet
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Browse more pages to see topic groupings
          </p>
        </div>
      )}
    </div>
  );
};

export default TopicCluster;