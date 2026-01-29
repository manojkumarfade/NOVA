import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const GeneralSettings = () => {
  const [username, setUsername] = useState('AgenticUser');
  const [email, setEmail] = useState('user@agenticbrowser.com');
  const [pageIndexing, setPageIndexing] = useState(true);
  const [historyTracking, setHistoryTracking] = useState(true);
  const [analyticsCollection, setAnalyticsCollection] = useState(true);
  const [dataRetention, setDataRetention] = useState('90');
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [saveStatus, setSaveStatus] = useState('');

  const retentionOptions = [
    { value: '30', label: '30 Days' },
    { value: '60', label: '60 Days' },
    { value: '90', label: '90 Days' },
    { value: '180', label: '6 Months' },
    { value: '365', label: '1 Year' },
    { value: 'forever', label: 'Forever' }
  ];

  const themeOptions = [
    { value: 'dark', label: 'Dark Mode' },
    { value: 'light', label: 'Light Mode' },
    { value: 'auto', label: 'Auto (System)' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'ja', label: 'Japanese' }
  ];

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };

  const handleReset = () => {
    setUsername('AgenticUser');
    setEmail('user@agenticbrowser.com');
    setPageIndexing(true);
    setHistoryTracking(true);
    setAnalyticsCollection(true);
    setDataRetention('90');
    setTheme('dark');
    setLanguage('en');
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 elevation-sm">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Icon name="User" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              User Profile
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Manage your account information
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e?.target?.value)}
            placeholder="Enter username"
            description="This name will appear in your conversations"
          />

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
            placeholder="Enter email address"
            description="Used for notifications and account recovery"
          />
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 elevation-sm">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/10">
            <Icon name="Shield" size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Privacy Settings
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Control your data and privacy preferences
            </p>
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          <Checkbox
            label="Enable Page Indexing"
            description="Allow AgenticBrowser to index and analyze visited pages for better assistance. You can disable this at any time."
            checked={pageIndexing}
            onChange={(e) => setPageIndexing(e?.target?.checked)}
          />

          <Checkbox
            label="Track Browsing History"
            description="Store your browsing history locally for search and analysis features. History is never shared externally."
            checked={historyTracking}
            onChange={(e) => setHistoryTracking(e?.target?.checked)}
          />

          <Checkbox
            label="Collect Usage Analytics"
            description="Help improve AgenticBrowser by sharing anonymous usage statistics and performance data."
            checked={analyticsCollection}
            onChange={(e) => setAnalyticsCollection(e?.target?.checked)}
          />

          <div className="pt-4 border-t border-border">
            <Select
              label="Data Retention Period"
              description="Choose how long to keep your browsing data and conversation history"
              options={retentionOptions}
              value={dataRetention}
              onChange={setDataRetention}
            />
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 elevation-sm">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10">
            <Icon name="Palette" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Appearance
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Customize the look and feel of your interface
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Select
            label="Theme"
            description="Choose your preferred color scheme"
            options={themeOptions}
            value={theme}
            onChange={setTheme}
          />

          <Select
            label="Language"
            description="Select your preferred language for the interface"
            options={languageOptions}
            value={language}
            onChange={setLanguage}
          />
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

        <Button
          variant="outline"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={handleReset}
          disabled={saveStatus === 'saving'}
          className="flex-1 sm:flex-initial"
        >
          Reset to Defaults
        </Button>

        {saveStatus === 'saved' && (
          <div className="flex items-center gap-2 text-accent text-sm font-caption">
            <Icon name="CheckCircle2" size={16} />
            <span>Changes saved successfully</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralSettings;