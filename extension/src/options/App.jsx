import React, { useState, useEffect } from 'react';
import Icon from '../shared/components/AppIcon';
import GeneralSettings from './components/GeneralSettings';
import ModelsSettings from './components/ModelsSettings';
import LLMProvidersSettings from './components/LLMProvidersSettings';
import ImageSettings from './components/ImageSettings';
import FirewallSettings from './components/FirewallSettings';
import AnalyticsSettings from './components/AnalyticsSettings';
import HelpSettings from './components/HelpSettings';
import { StorageService } from '../services/StorageService';

const SettingsDashboard = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [theme, setTheme] = useState('dark');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  useEffect(() => {
    // Check for auto-actions (e.g. requesting mic permission)
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'request-mic') {
      const requestMic = async () => {
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          alert("Microphone permission granted! You can now close this tab and use the side panel.");
        } catch (err) {
          console.error("Mic Permission Failed:", err);
          alert("Permission denied. Please click the Lock icon in the address bar and allow Microphone access manually.");
        }
      };
      setTimeout(requestMic, 500);
    }

    const loadTheme = async () => {
      const savedTheme = await StorageService.get('theme', 'dark');
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
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
      case 'image': return <ImageSettings />;
      case 'firewall': return <FirewallSettings />;
      case 'analytics': return <AnalyticsSettings />;
      case 'help': return <HelpSettings />;
      default: return <GeneralSettings />;
    }
  };

  return (
    <div className={`min-h-screen font-body transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0c] text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
                        flex flex-col border-r transition-all duration-300 ease-in-out z-20
                        ${theme === 'dark' ? 'bg-[#0f0f12] border-white/5' : 'bg-white border-slate-200'}
                        ${sidebarExpanded ? 'w-64' : 'w-20'}
                    `}
        >
          <div className="p-6 flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-neon-cyan to-neon-violet shadow-lg flex-none`}>
              <Icon name="Nova" size={20} className="text-white" />
            </div>
            {sidebarExpanded && (
              <h1 className="font-heading font-bold text-xl tracking-tighter truncate">
                NOVA <span className="text-xs font-mono text-neon-cyan/60 ml-1">v0.9</span>
              </h1>
            )}
          </div>

          <nav className="flex-1 px-3 space-y-1 overflow-y-auto no-scrollbar py-4">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                                        w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative
                                        ${isActive
                      ? (theme === 'dark' ? 'bg-neon-cyan/10 text-neon-cyan' : 'bg-blue-50 text-blue-600')
                      : (theme === 'dark' ? 'text-slate-400 hover:bg-white/5 hover:text-slate-200' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800')
                    }
                                    `}
                >
                  <Icon
                    name={tab.icon}
                    size={20}
                    className={`flex-none transition-transform group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}
                  />
                  {sidebarExpanded && (
                    <span className="font-medium text-[110%] whitespace-nowrap">{tab.label}</span>
                  )}
                  {isActive && (
                    <div className={`absolute left-0 w-1 h-6 rounded-r-full bg-current`} />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/5">
            <button
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className={`
                                w-full flex items-center gap-3 px-3 py-2 rounded-lg 
                                ${theme === 'dark' ? 'text-slate-500 hover:text-slate-300 hover:bg-white/5' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}
                                transition-all
                            `}
            >
              <Icon name={sidebarExpanded ? "ChevronLeft" : "ChevronRight"} size={20} className="flex-none" />
              {sidebarExpanded && <span className="text-sm">Collapse Menu</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto relative bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900/40 to-transparent">
          <div className="max-w-4xl mx-auto p-8 md:p-12 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-10">
              <h2 className="text-4xl font-heading font-extrabold tracking-tight mb-2">
                {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                Customize your {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} preferences and experience.
              </p>
            </header>

            <div className="text-[110%] leading-relaxed">
              {renderTabContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsDashboard;