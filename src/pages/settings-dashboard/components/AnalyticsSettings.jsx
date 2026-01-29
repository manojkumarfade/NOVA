import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const AnalyticsSettings = () => {
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const [detailedMetrics, setDetailedMetrics] = useState(true);
  const [performanceData, setPerformanceData] = useState(true);
  const [errorReporting, setErrorReporting] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');

  const analyticsStats = [
    { label: 'Total Tasks Executed', value: '1,247', icon: 'CheckCircle2', color: 'text-accent' },
    { label: 'Pages Analyzed', value: '3,891', icon: 'FileText', color: 'text-primary' },
    { label: 'Navigation Actions', value: '5,623', icon: 'Navigation', color: 'text-secondary' },
    { label: 'Average Response Time', value: '2.3s', icon: 'Clock', color: 'text-warning' }
  ];

  const handleExportData = () => {
    console.log('Exporting analytics data...');
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all analytics data? This action cannot be undone.')) {
      console.log('Clearing analytics data...');
    }
  };

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsStats?.map((stat, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-4 elevation-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                <Icon name={stat?.icon} size={20} className={stat?.color} />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-1">
              {stat?.value}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              {stat?.label}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 elevation-sm">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Icon name="BarChart3" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Analytics Tracking
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Configure what data is collected and analyzed
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Enable Analytics Tracking"
            description="Collect usage statistics and performance metrics to improve your experience"
            checked={trackingEnabled}
            onChange={(e) => setTrackingEnabled(e?.target?.checked)}
          />

          {trackingEnabled && (
            <>
              <Checkbox
                label="Detailed Metrics"
                description="Track detailed information about agent actions, navigation patterns, and task execution"
                checked={detailedMetrics}
                onChange={(e) => setDetailedMetrics(e?.target?.checked)}
              />

              <Checkbox
                label="Performance Data"
                description="Monitor response times, resource usage, and system performance metrics"
                checked={performanceData}
                onChange={(e) => setPerformanceData(e?.target?.checked)}
              />

              <Checkbox
                label="Error Reporting"
                description="Automatically report errors and crashes to help improve stability"
                checked={errorReporting}
                onChange={(e) => setErrorReporting(e?.target?.checked)}
              />
            </>
          )}
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 elevation-sm">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/10">
            <Icon name="Database" size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Data Management
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Export or clear your analytics data
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={handleExportData}
            className="flex-1 sm:flex-initial"
          >
            Export Data
          </Button>

          <Button
            variant="destructive"
            iconName="Trash2"
            iconPosition="left"
            onClick={handleClearData}
            className="flex-1 sm:flex-initial"
          >
            Clear All Data
          </Button>
        </div>
      </div>
      <div className="bg-muted border border-border rounded-lg p-4 md:p-6">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="text-sm text-foreground font-caption font-medium">
              Privacy & Data Usage
            </p>
            <ul className="text-xs md:text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>All analytics data is stored locally on your device</li>
              <li>No personal information is collected or transmitted</li>
              <li>Data is used solely to improve your AgenticBrowser experience</li>
              <li>You can export or delete your data at any time</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
        <Button
          variant="default"
          iconName="Save"
          iconPosition="left"
          onClick={handleSave}
          loading={saveStatus === 'saving'}
          className="flex-1 sm:flex-initial"
        >
          {saveStatus === 'saved' ? 'Saved Successfully' : 'Save Changes'}
        </Button>

        {saveStatus === 'saved' && (
          <div className="flex items-center gap-2 text-accent text-sm font-caption">
            <Icon name="CheckCircle2" size={16} />
            <span>Analytics settings saved</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsSettings;