import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import GeneralSettings from './components/GeneralSettings';
import ModelsSettings from './components/ModelsSettings';
import LLMProvidersSettings from './components/LLMProvidersSettings';
import FirewallSettings from './components/FirewallSettings';
import AnalyticsSettings from './components/AnalyticsSettings';
import HelpSettings from './components/HelpSettings';

const SettingsDashboard = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: 'Settings' },
    { id: 'models', label: 'Models', icon: 'Brain' },
    { id: 'providers', label: 'LLM Providers', icon: 'Plug' },
    { id: 'firewall', label: 'Firewall', icon: 'Shield' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'help', label: 'Help', icon: 'HelpCircle' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'models':
        return <ModelsSettings />;
      case 'providers':
        return <LLMProvidersSettings />;
      case 'firewall':
        return <FirewallSettings />;
      case 'analytics':
        return <AnalyticsSettings />;
      case 'help':
        return <HelpSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
              Settings
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Configure AgenticBrowser preferences, models, and security settings
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg elevation-md overflow-hidden">
            <div className="border-b border-border overflow-x-auto">
              <nav className="flex min-w-max lg:min-w-0" aria-label="Settings tabs">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`
                      flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-caption font-medium
                      border-b-2 transition-base whitespace-nowrap flex-shrink-0
                      ${activeTab === tab?.id
                        ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
                      }
                    `}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span className="hidden sm:inline">{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-4 md:p-6 lg:p-8">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsDashboard;