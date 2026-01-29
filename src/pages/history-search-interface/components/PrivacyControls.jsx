import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const PrivacyControls = ({ className = '' }) => {
  const [indexingEnabled, setIndexingEnabled] = useState(true);
  const [retentionPeriod, setRetentionPeriod] = useState('90');
  const [autoDelete, setAutoDelete] = useState(false);

  const retentionOptions = [
    { value: '30', label: '30 Days' },
    { value: '90', label: '90 Days' },
    { value: '180', label: '6 Months' },
    { value: '365', label: '1 Year' },
    { value: 'forever', label: 'Forever' }
  ];

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all browsing history? This action cannot be undone.')) {
      console.log('Clearing history...');
    }
  };

  const handleExportData = () => {
    console.log('Exporting data...');
  };

  return (
    <div className={`bg-card border border-border rounded-lg elevation-sm p-4 md:p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
          <Icon name="Shield" size={24} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Privacy Controls
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your data and privacy settings
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="p-4 bg-muted rounded-lg">
          <Checkbox
            label="Enable Content Indexing"
            description="Allow AI to index and analyze your browsing content for better search results"
            checked={indexingEnabled}
            onChange={(e) => setIndexingEnabled(e?.target?.checked)}
          />
        </div>

        <div>
          <Select
            label="Data Retention Period"
            description="How long to keep your browsing history"
            options={retentionOptions}
            value={retentionPeriod}
            onChange={setRetentionPeriod}
          />
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <Checkbox
            label="Auto-Delete Old History"
            description="Automatically remove history older than the retention period"
            checked={autoDelete}
            onChange={(e) => setAutoDelete(e?.target?.checked)}
          />
        </div>

        <div className="pt-6 border-t border-border space-y-3">
          <h3 className="text-sm font-caption font-semibold text-foreground mb-3">
            Data Management
          </h3>
          
          <Button
            variant="outline"
            fullWidth
            iconName="Download"
            iconPosition="left"
            onClick={handleExportData}
          >
            Export Browsing Data
          </Button>

          <Button
            variant="destructive"
            fullWidth
            iconName="Trash2"
            iconPosition="left"
            onClick={handleClearHistory}
          >
            Clear All History
          </Button>
        </div>

        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex gap-3">
            <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-foreground">
              <p className="font-caption font-medium mb-1">Your Privacy Matters</p>
              <p className="text-muted-foreground">
                All data is stored locally on your device. We never send your browsing history to external servers without your explicit consent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyControls;