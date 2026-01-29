import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../shared/components/AppIcon';
import Button from '../../shared/components/ui/Button';

const WelcomeScreen = ({ onExampleClick }) => {
  const navigate = useNavigate();
  const examplePrompts = [
    {
      icon: 'Image',
      title: 'Generate Images',
      description: 'Create unique visuals and artwork',
      prompt: 'Generate a futuristic cityscape with neon lights'
    },
    {
      icon: 'ShoppingCart',
      title: 'Shopping Assistant',
      description: 'Find deals and compare products',
      prompt: 'Find the best noise-cancelling headphones under $200'
    },
    {
      icon: 'Globe', // Changed from FileText for variety
      title: 'Deep Research',
      description: 'Explore topics with web access',
      prompt: 'Research the latest developments in quantum computing'
    },
    {
      icon: 'Zap', // Changed from Layers
      title: 'Automation',
      description: 'Automate browser tasks',
      prompt: 'Navigate to multiple news sites and summarize the headlines'
    }
  ];

  const handleOpenSettings = () => {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      console.warn('Chrome runtime not available');
    }
  };

  const handleViewAnalytics = () => {
    navigate('/analytics');
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 md:p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/10 mb-4 md:mb-6">
            <Icon name="Bot" size={40} color="var(--color-primary)" />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-3 md:mb-4">
            Welcome to AgenticBrowser
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Your AI-powered browser assistant with multi-agent architecture for intelligent web navigation and complex task execution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
          {examplePrompts?.map((example, index) => (
            <button
              key={index}
              onClick={() => onExampleClick(example?.prompt)}
              className="group p-4 md:p-5 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-muted transition-base text-left"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-base">
                  <Icon
                    name={example?.icon}
                    size={20}
                    color="var(--color-primary)"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-caption font-semibold text-foreground mb-1">
                    {example?.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                    {example?.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          <Button
            variant="outline"
            iconName="Settings"
            iconPosition="left"
            onClick={handleOpenSettings}
            className="w-full sm:w-auto"
          >
            Configure Settings
          </Button>
          <Button
            variant="outline"
            iconName="BarChart3"
            iconPosition="left"
            onClick={handleViewAnalytics}
            className="w-full sm:w-auto"
          >
            View Analytics
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
