import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AdvancedFilters = ({ 
  isOpen,
  onClose,
  onApply,
  className = '' 
}) => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [domains, setDomains] = useState({ whitelist: '', blacklist: '' });
  const [contentTypes, setContentTypes] = useState({
    articles: true,
    videos: true,
    documents: true,
    images: false
  });
  const [sortBy, setSortBy] = useState('relevance');

  const handleApply = () => {
    onApply({
      dateRange,
      domains,
      contentTypes,
      sortBy
    });
    onClose();
  };

  const handleReset = () => {
    setDateRange({ start: '', end: '' });
    setDomains({ whitelist: '', blacklist: '' });
    setContentTypes({
      articles: true,
      videos: true,
      documents: true,
      images: false
    });
    setSortBy('relevance');
  };

  if (!isOpen) return null;

  return (
    <div className={`bg-card border border-border rounded-lg elevation-md p-4 md:p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
          Advanced Filters
        </h2>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-base"
        >
          <Icon name="X" size={20} />
        </button>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-caption font-semibold text-foreground mb-3">
            Date Range
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              label="Start Date"
              value={dateRange?.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e?.target?.value })}
            />
            <Input
              type="date"
              label="End Date"
              value={dateRange?.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e?.target?.value })}
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-caption font-semibold text-foreground mb-3">
            Domain Filters
          </h3>
          <div className="space-y-4">
            <Input
              label="Whitelist Domains"
              placeholder="example.com, another.com"
              description="Only show results from these domains"
              value={domains?.whitelist}
              onChange={(e) => setDomains({ ...domains, whitelist: e?.target?.value })}
            />
            <Input
              label="Blacklist Domains"
              placeholder="exclude.com, spam.com"
              description="Exclude results from these domains"
              value={domains?.blacklist}
              onChange={(e) => setDomains({ ...domains, blacklist: e?.target?.value })}
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-caption font-semibold text-foreground mb-3">
            Content Types
          </h3>
          <div className="space-y-3">
            <Checkbox
              label="Articles & Blog Posts"
              checked={contentTypes?.articles}
              onChange={(e) => setContentTypes({ ...contentTypes, articles: e?.target?.checked })}
            />
            <Checkbox
              label="Videos"
              checked={contentTypes?.videos}
              onChange={(e) => setContentTypes({ ...contentTypes, videos: e?.target?.checked })}
            />
            <Checkbox
              label="Documents (PDF, DOCX)"
              checked={contentTypes?.documents}
              onChange={(e) => setContentTypes({ ...contentTypes, documents: e?.target?.checked })}
            />
            <Checkbox
              label="Images"
              checked={contentTypes?.images}
              onChange={(e) => setContentTypes({ ...contentTypes, images: e?.target?.checked })}
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-caption font-semibold text-foreground mb-3">
            Sort By
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'relevance', label: 'Relevance', icon: 'Zap' },
              { value: 'recent', label: 'Most Recent', icon: 'Clock' },
              { value: 'frequent', label: 'Most Visited', icon: 'TrendingUp' },
              { value: 'alphabetical', label: 'Alphabetical', icon: 'ArrowDownAZ' }
            ]?.map((option) => (
              <button
                key={option?.value}
                onClick={() => setSortBy(option?.value)}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-md text-sm font-caption transition-base
                  ${sortBy === option?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                  }
                `}
              >
                <Icon name={option?.icon} size={16} />
                <span>{option?.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            fullWidth
            iconName="RotateCcw"
            onClick={handleReset}
          >
            Reset Filters
          </Button>
          <Button
            variant="default"
            fullWidth
            iconName="Check"
            onClick={handleApply}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;