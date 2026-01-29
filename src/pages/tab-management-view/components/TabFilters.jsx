import React from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TabFilters = ({ 
  activeFilter,
  onFilterChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalTabs,
  selectedCount,
  onSelectAll,
  onDeselectAll,
  onBulkAction,
  className = ''
}) => {
  const filterOptions = [
    { value: 'all', label: 'All Tabs', icon: 'Layers' },
    { value: 'active', label: 'Active', icon: 'Circle' },
    { value: 'grouped', label: 'Grouped', icon: 'FolderOpen' },
    { value: 'recent', label: 'Recently Closed', icon: 'Clock' }
  ];

  const sortOptions = [
    { value: 'recency', label: 'Most Recent' },
    { value: 'domain', label: 'By Domain' },
    { value: 'relevance', label: 'AI Relevance' },
    { value: 'title', label: 'Alphabetical' }
  ];

  const bulkActions = [
    { value: 'group', label: 'Group Selected', icon: 'FolderPlus' },
    { value: 'bookmark', label: 'Bookmark All', icon: 'Bookmark' },
    { value: 'close', label: 'Close Selected', icon: 'X' }
  ];

  return (
    <div className={`bg-card border border-border rounded-lg p-4 md:p-5 ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {filterOptions?.map((filter) => (
            <Button
              key={filter?.value}
              variant={activeFilter === filter?.value ? 'default' : 'outline'}
              size="sm"
              iconName={filter?.icon}
              iconPosition="left"
              onClick={() => onFilterChange(filter?.value)}
              className="text-xs md:text-sm"
            >
              {filter?.label}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            className="w-full sm:w-48"
          />

          <div className="flex items-center gap-2 border-l border-border pl-3">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              iconName="Grid3x3"
              onClick={() => onViewModeChange('grid')}
              className="h-9 w-9"
            />
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              iconName="List"
              onClick={() => onViewModeChange('list')}
              className="h-9 w-9"
            />
          </div>
        </div>
      </div>
      {selectedCount > 0 && (
        <div className="mt-4 pt-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-sm text-foreground font-caption font-medium">
              {selectedCount} of {totalTabs} selected
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={selectedCount === totalTabs ? onDeselectAll : onSelectAll}
              className="text-xs"
            >
              {selectedCount === totalTabs ? 'Deselect All' : 'Select All'}
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {bulkActions?.map((action) => (
              <Button
                key={action?.value}
                variant="outline"
                size="sm"
                iconName={action?.icon}
                iconPosition="left"
                onClick={() => onBulkAction(action?.value)}
                className="text-xs"
              >
                {action?.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TabFilters;