import React, { useState, useEffect } from 'react';
import Header from '../shared/components/ui/Header';
import Icon from '../shared/components/AppIcon';
import GeneralSettings from './components/GeneralSettings';
import ModelsSettings from './components/ModelsSettings';
import LLMProvidersSettings from './components/LLMProvidersSettings';
// import VoiceSettings from './components/VoiceSettings'; // Removed
import ImageSettings from './components/ImageSettings';
import FirewallSettings from './components/FirewallSettings';
import AnalyticsSettings from './components/AnalyticsSettings';
import HelpSettings from './components/HelpSettings';
import { StorageService } from '../services/StorageService';

const SettingsDashboard = () => {
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    // Check for auto-actions (e.g. requesting mic permission)
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'request-mic') {
      const requestMic = async () => {
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          alert("Microphone permission granted! You can now close this tab and use the side panel.");
          // Optional: Close tab? window.close();
        } catch (err) {
          console.error("Mic Permission Failed:", err);
          alert("Permission denied. Please click the Lock icon in the address bar and allow Microphone access manually.");
        }
      };
      // Short delay to ensure rendering
      setTimeout(requestMic, 500);
    }

    // Load and apply theme globally
    const loadTheme = async () => {
      const settings = await StorageService.get('general_settings');
      const theme = settings?.theme || 'dark';
      const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    loadTheme();
  }, []);

  const tabs = [
    { id: 'general', label: 'General', icon: 'Settings' },
    { id: 'models', label: 'Models', icon: 'Brain' },
    { id: 'providers', label: 'LLM Providers', icon: 'Plug' },
    // { id: 'voice', label: 'Voice Assistant', icon: 'Mic' }, // Removed
    { id: 'image', label: 'Image Gen', icon: 'Palette' },
    { id: 'firewall', label: 'Firewall', icon: 'Shield' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'help', label: 'Help', icon: 'HelpCircle' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return <GeneralSettings />;
      case 'models': return <ModelsSettings />;
      case 'providers': return <LLMProvidersSettings />;
      // case 'voice': return <VoiceSettings />; // Removed
      case 'image': return <ImageSettings />;
      case 'firewall': return <FirewallSettings />;
      case 'analytics': return <AnalyticsSettings />;
      case 'help': return <HelpSettings />;
      default: return <GeneralSettings />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden relative font-body text-foreground">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: `url(${chrome.runtime.getURL('settings_bg_final.png')})` }}
      ></div>
      {/* Subtle overlay for text readability, but keeping image very visible */}
      <div className="absolute inset-0 z-0 bg-background/60"></div>

      <div className="relative z-10 w-full h-full flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            <div className="mb-6 md:mb-8 text-center sm:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-violet mb-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                SYSTEM CONFIGURATION
              </h1>
              <p className="text-sm md:text-base text-neon-cyan/70 font-mono tracking-widest uppercase">
                Adjust Neural Parameters & Protocols
              </p>
            </div>

            <div className="rounded-xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)] border border-neon-cyan/20 backdrop-blur-sm bg-black/30">
              <div className="border-b border-neon-cyan/20 overflow-x-auto bg-transparent">
                <nav className="flex min-w-max lg:min-w-0 p-1" aria-label="Settings tabs">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`
                          flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-caption font-medium
                          transition-all whitespace-nowrap flex-shrink-0 rounded-lg margin-1
                          ${activeTab === tab?.id
                          ? 'bg-neon-cyan/10 text-neon-cyan shadow-[0_0_10px_rgba(6,182,212,0.2)] border border-neon-cyan/30'
                          : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                        }
                        `}
                    >
                      <Icon name={tab?.icon} size={18} className={activeTab === tab?.id ? "animate-pulse" : ""} />
                      <span className="hidden sm:inline font-mono uppercase tracking-wide">{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-4 md:p-6 lg:p-8 bg-black/10">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsDashboard;