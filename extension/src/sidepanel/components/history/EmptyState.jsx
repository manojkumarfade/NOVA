import React from 'react';
import Icon from '../../../shared/components/AppIcon';
import Button from '../../../shared/components/ui/Button';

const EmptyState = ({ 
  type = 'no-results',
  onAction,
  className = '' 
}) => {
  const states = {
    'no-results': {
      icon: 'SearchX',
      title: 'No Results Found',
      description: 'Try adjusting your search query or filters to find what you\'re looking for.',
      actionLabel: 'Clear Filters',
      actionIcon: 'RotateCcw'
    },
    'no-history': {
      icon: 'History',
      title: 'No Browsing History Yet',
      description: 'Start browsing to build your searchable history. Your activity will appear here.',
      actionLabel: 'Start Browsing',
      actionIcon: 'ExternalLink'
    },
    'indexing-disabled': {
      icon: 'ShieldOff',
      title: 'Content Indexing Disabled',
      description: 'Enable content indexing in privacy settings to search your browsing history.',
      actionLabel: 'Enable Indexing',
      actionIcon: 'Settings'
    }
  };

  const state = states?.[type] || states?.['no-results'];

  return (
    <div className={`flex flex-col items-center justify-center py-12 md:py-16 px-4 text-center ${className}`}>
      <div className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-muted mb-6">
        <Icon name={state?.icon} size={40} className="text-muted-foreground" />
      </div>
      <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-2">
        {state?.title}
      </h3>
      <p className="text-sm md:text-base text-muted-foreground max-w-md mb-6">
        {state?.description}
      </p>
      {onAction && (
        <Button
          variant="default"
          iconName={state?.actionIcon}
          iconPosition="right"
          onClick={onAction}
        >
          {state?.actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
