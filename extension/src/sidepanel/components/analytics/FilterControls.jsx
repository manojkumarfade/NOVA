import React from 'react';
import Icon from '../../../shared/components/AppIcon';
import Button from '../../../shared/components/ui/Button';
import Select from '../../../shared/components/ui/Select';

const FilterControls = ({ 
  dateRange, 
  onDateRangeChange,
  taskType,
  onTaskTypeChange,
  domain,
  onDomainChange,
  onExport,
  onReset
}) => {
  const dateRangeOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const taskTypeOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'navigation', label: 'Navigation' },
    { value: 'analysis', label: 'Page Analysis' },
    { value: 'search', label: 'Search' },
    { value: 'workflow', label: 'Workflow' }
  ];

  const domainOptions = [
    { value: 'all', label: 'All Domains' },
    { value: 'amazon.com', label: 'amazon.com' },
    { value: 'google.com', label: 'google.com' },
    { value: 'github.com', label: 'github.com' },
    { value: 'stackoverflow.com', label: 'stackoverflow.com' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 elevation-sm mb-4 md:mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 md:gap-6">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Icon name="Filter" size={20} color="var(--color-primary)" />
          </div>
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
            Filters
          </h3>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={dateRange}
            onChange={onDateRangeChange}
          />

          <Select
            label="Task Type"
            options={taskTypeOptions}
            value={taskType}
            onChange={onTaskTypeChange}
          />

          <Select
            label="Domain"
            options={domainOptions}
            value={domain}
            onChange={onDomainChange}
            searchable
          />
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="outline"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={onReset}
            className="flex-1 md:flex-none"
          >
            Reset
          </Button>
          <Button
            variant="default"
            iconName="Download"
            iconPosition="left"
            onClick={onExport}
            className="flex-1 md:flex-none"
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
