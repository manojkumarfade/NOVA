import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HelpSettings = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const helpSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: 'Rocket',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      items: [
        {
          question: 'How do I configure my first LLM provider?',
          answer: 'Navigate to the LLM Providers tab, select a provider like OpenAI or Anthropic, enter your API key, and click Test Connection. Once connected, enable the provider to access its models in the Models section.'
        },
        {
          question: 'What are the three agent types?',
          answer: 'AgenticBrowser uses three specialized agents:\n• Planner Agent: Analyzes your request and creates a step-by-step execution plan\n• Navigator Agent: Executes web navigation and DOM interactions\n• Validator Agent: Verifies task completion and validates results'
        },
        {
          question: 'How do I start a conversation?',
          answer: 'Simply type your request in the chat interface. Use natural language like "Find the best laptop under $1000 on Amazon" or "Summarize this article". The agents will handle the rest.'
        }
      ]
    },
    {
      id: 'features',
      title: 'Features & Capabilities',
      icon: 'Sparkles',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      items: [
        {
          question: 'What can AgenticBrowser do?',
          answer: 'AgenticBrowser can:\n• Navigate websites and interact with web pages\n• Search for products and compare prices\n• Summarize and explain page content\n• Manage tabs through natural language\n• Execute multi-step workflows with confirmation\n• Search your browsing history with AI\n• Extract key information from documents'
        },
        {
          question: 'How does the firewall work?',
          answer: 'The firewall controls which domains and IPs AgenticBrowser can access. Configure allow lists for trusted sites and deny lists for blocked sites. The deny list takes precedence, and wildcards are supported (*.example.com).'
        },
        {
          question: 'What is temperature control?',
          answer: 'Temperature controls the Navigator Agent\'s creativity. Lower values (0.0-0.3) produce precise, deterministic actions. Higher values (0.7-1.0) enable creative problem-solving. Adjust based on your task requirements.'
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: 'Shield',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      items: [
        {
          question: 'Where is my data stored?',
          answer: 'All data is stored locally on your device using IndexedDB and localStorage. Your API keys, conversation history, and browsing data never leave your machine unless you explicitly export it.'
        },
        {
          question: 'Can I disable page indexing?',
          answer: 'Yes. In the General tab, uncheck "Enable Page Indexing" to prevent AgenticBrowser from analyzing and storing page content. This disables features like history search and page summarization.'
        },
        {
          question: 'How are API keys secured?',
          answer: 'API keys are stored locally with encryption and displayed with masking. Use the eye icon to reveal keys when needed. Keys are never transmitted except to the respective LLM provider APIs.'
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: 'AlertCircle',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      items: [
        {
          question: 'Why is my LLM provider not connecting?',
          answer: 'Check that:\n• Your API key is correct and active\n• The provider service is operational\n• Your network allows API requests\n• You have sufficient API credits/quota\nTry testing the connection again after verification.'
        },
        {
          question: 'What if an agent gets stuck?',
          answer: 'If an agent appears stuck in Planning, Navigating, or Validating state:\n• Wait 30 seconds for timeout\n• Click the stop button to cancel\n• Check the activity log for errors\n• Try rephrasing your request\n• Verify the target website is accessible'
        },
        {
          question: 'How do I report a bug?',
          answer: 'Use the feedback button in the main interface or contact support through the Help menu. Include:\n• Description of the issue\n• Steps to reproduce\n• Browser and OS version\n• Screenshots if applicable'
        }
      ]
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const resources = [
    { label: 'Documentation', icon: 'BookOpen', url: '#' },
    { label: 'Video Tutorials', icon: 'Video', url: '#' },
    { label: 'Community Forum', icon: 'Users', url: '#' },
    { label: 'GitHub Repository', icon: 'Github', url: '#' }
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="bg-muted border border-border rounded-lg p-4 md:p-6">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="text-sm text-foreground font-caption font-medium">
              Welcome to AgenticBrowser Help
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              Find answers to common questions, learn about features, and get support. Click on any section below to expand and view detailed information.
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {helpSections?.map((section) => (
          <div
            key={section?.id}
            className="bg-card border border-border rounded-lg overflow-hidden elevation-sm"
          >
            <button
              onClick={() => toggleSection(section?.id)}
              className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-muted transition-base"
            >
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${section?.bgColor}`}>
                  <Icon name={section?.icon} size={20} className={section?.color} />
                </div>
                <h3 className="text-base md:text-lg font-heading font-semibold text-foreground text-left">
                  {section?.title}
                </h3>
              </div>
              <Icon
                name={expandedSection === section?.id ? 'ChevronUp' : 'ChevronDown'}
                size={20}
                className="text-muted-foreground flex-shrink-0"
              />
            </button>

            {expandedSection === section?.id && (
              <div className="border-t border-border p-4 md:p-6 space-y-4">
                {section?.items?.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="text-sm md:text-base font-caption font-medium text-foreground">
                      {item?.question}
                    </h4>
                    <p className="text-xs md:text-sm text-muted-foreground whitespace-pre-line">
                      {item?.answer}
                    </p>
                    {index < section?.items?.length - 1 && (
                      <div className="pt-4 border-b border-border" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 elevation-sm">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Icon name="ExternalLink" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Additional Resources
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Explore more learning materials and community support
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {resources?.map((resource, index) => (
            <Button
              key={index}
              variant="outline"
              iconName={resource?.icon}
              iconPosition="left"
              onClick={() => window.open(resource?.url, '_blank')}
              className="justify-start"
            >
              {resource?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 elevation-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/10">
            <Icon name="MessageCircle" size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Need More Help?
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Contact our support team for personalized assistance
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            iconName="Mail"
            iconPosition="left"
            className="flex-1 sm:flex-initial"
          >
            Email Support
          </Button>

          <Button
            variant="outline"
            iconName="MessageSquare"
            iconPosition="left"
            className="flex-1 sm:flex-initial"
          >
            Live Chat
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpSettings;