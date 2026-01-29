import React, { useState, useEffect } from 'react';
import Icon from '../../shared/components/AppIcon';
import Input from '../../shared/components/ui/Input';
import { Checkbox } from '../../shared/components/ui/Checkbox';
import Select from '../../shared/components/ui/Select';
import Button from '../../shared/components/ui/Button';
import AccountSettings from './AccountSettings';
import { StorageService } from '../../services/StorageService';

const GeneralSettings = () => {
  // username & email managed by AccountSettings/AuthService now
  const [pageIndexing, setPageIndexing] = useState(true);
  const [historyTracking, setHistoryTracking] = useState(true);
  const [analyticsCollection, setAnalyticsCollection] = useState(true);
  const [dataRetention, setDataRetention] = useState('90');
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [intelligenceSpeed, setIntelligenceSpeed] = useState(50);
  const [autoRetry, setAutoRetry] = useState(true);
  const [autoSiteSwitch, setAutoSiteSwitch] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    // Load Settings
    const loadSettings = async () => {
      const settings = await StorageService.get('general_settings');
      if (settings) {
        setPageIndexing(settings.pageIndexing ?? true);
        setHistoryTracking(settings.historyTracking ?? true);
        setAnalyticsCollection(settings.analyticsCollection ?? true);
        setDataRetention(settings.dataRetention || '90');
        setTheme(settings.theme || 'dark');
        setLanguage(settings.language || 'en');

        // Apply theme immediately on load of settings component too
        applyTheme(settings.theme || 'dark');
        setIntelligenceSpeed(settings.intelligenceSpeed ?? 50);
        setAutoRetry(settings.autoRetry ?? true);
        setAutoSiteSwitch(settings.autoSiteSwitch ?? false);
      } else {
        applyTheme('dark'); // Default
      }
    };
    loadSettings();
  }, []);

  const applyTheme = (selectedTheme) => {
    const isDark = selectedTheme === 'dark' || (selectedTheme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

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

  const handleSave = async () => {
    setSaveStatus('saving');

    // Save to storage
    await StorageService.set('general_settings', {
      pageIndexing,
      historyTracking,
      analyticsCollection,
      dataRetention,
      theme,
      language,
      intelligenceSpeed,
      autoRetry,
      autoSiteSwitch
    });

    // Apply Theme Immediately
    applyTheme(theme);

    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };

  const handleReset = () => {
    setPageIndexing(true);
    setHistoryTracking(true);
    setAnalyticsCollection(true);
    setDataRetention('90');
    setTheme('dark');
    setLanguage('en');
    setIntelligenceSpeed(50);
    setAutoRetry(true);
    setAutoSiteSwitch(false);
    applyTheme('dark');
  };

  // Live preview of theme change (optional, but good UX)
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  }

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
              Manage your account and session
            </p>
          </div>
        </div>

        <AccountSettings />
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
            onChange={(e) => setPageIndexing(e.target.checked)}
          />

          <Checkbox
            label="Track Browsing History"
            description="Store your browsing history locally for search and analysis features. History is never shared externally."
            checked={historyTracking}
            onChange={(e) => setHistoryTracking(e.target.checked)}
          />

          <Checkbox
            label="Collect Usage Analytics"
            description="Help improve AgenticBrowser by sharing anonymous usage statistics and performance data."
            checked={analyticsCollection}
            onChange={(e) => setAnalyticsCollection(e.target.checked)}
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
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20">
            <Icon name="Cpu" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Intelligence Controls
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Configure autonomous behavior
            </p>
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          <div>
            <label className="text-sm font-medium mb-1 block">Speed vs Accuracy (Current: {intelligenceSpeed}%)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={intelligenceSpeed}
              onChange={(e) => setIntelligenceSpeed(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Thorough (Accuracy)</span>
              <span>Balanced</span>
              <span>Rapid (Speed)</span>
            </div>
          </div>

          <Checkbox
            label="Auto-Retry Fails"
            description="Automatically attempt to recover from errors without asking."
            checked={autoRetry}
            onChange={(e) => setAutoRetry(e.target.checked)}
          />

          <Checkbox
            label="Auto Site-Switch"
            description="Switch to alternative websites if the current one is blocked or broken."
            checked={autoSiteSwitch}
            onChange={(e) => setAutoSiteSwitch(e.target.checked)}
          />
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
            onChange={handleThemeChange}
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
