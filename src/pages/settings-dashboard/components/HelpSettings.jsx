import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { novaManualContent } from './NovaManualContent';

const HelpSettings = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Video Tutorials Data
  const videoTutorials = [
    {
      title: 'How to install extension',
      description: 'Comprehensive guide on side-loading the unpacked extension in Chrome Developer Mode. Covers manifest validation, permission granting, and initial service worker registration to ensure a successful deployment.',
      videoSrc: 'videos/How to install extension.mp4'
    },
    {
      title: 'Tutorial & Settings',
      description: 'Deep dive into the configuration subsystem. Explains LLM provider setup (OpenAI/Anthropic), model selection parameters, and global preference tuning for the agentic core to match your workflow needs.',
      videoSrc: 'videos/Tutorial & Settings.mp4'
    },
    {
      title: 'Side Panel Overview',
      description: 'Architectural tour of the primary interface. Detailed breakdown of the chat layer, context retention mechanisms, and the real-time event stream UI that visualizes the agent\'s decision-making process.',
      videoSrc: 'videos/Side Panel Overview.mp4'
    },
    {
      title: 'Files Analyzer',
      description: 'Technical overview of the RAG (Retrieval-Augmented Generation) pipeline. Demonstrates how the system parses, chunks, and embeds uploaded documents for semantic search, code analysis, and complex data extraction.',
      videoSrc: 'videos/Files Analyzer.mp4'
    },
    {
      title: 'Image Generation',
      description: 'Demonstration of the multi-modal generative capabilities. Integrating diverse diffusion models to synthesize visual assets directly from natural language prompts, complete with style modulation.',
      videoSrc: 'videos/Image Generation.mp4'
    },
    {
      title: 'TTS (Text-to-Speech)',
      description: 'Analysis of the Neural Text-to-Speech engine. Shows how text streams are converted to synthesized audio with low latency and high fidelity, enabling auditory feedback and hands-free interaction.',
      videoSrc: 'videos/TTS.mp4'
    },
    {
      title: 'Web Search Agent',
      description: 'Explanation of the autonomous search agent. How it formulates queries, scrapes SERPs, filters irrelevant results, and uses an LLM to synthesize concise, fact-based answers from live web data.',
      videoSrc: 'videos/Web Search.mp4'
    },
    {
      title: 'Shopping Agent',
      description: 'Walkthrough of the specialized e-commerce logic. Features cross-platform price comparison, product specification extraction, and deal analysis algorithms to find the best value across multiple vendors.',
      videoSrc: 'videos/Shopping Agent.mp4'
    },
    {
      title: 'Agent Mode (The Brain)',
      description: 'The core recursive reasoning loop. Visualizes the Planner -> Navigator -> Validator cycle, DOM tree traversal, and dynamic action execution on live web pages. This is the central intelligence of the Nova extension.',
      videoSrc: 'videos/Agent Mode.mp4'
    }
  ];

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
    { label: 'Documentation', icon: 'BookOpen', action: () => setShowDocsModal(true) },
    { label: 'Video Tutorials', icon: 'Video', action: () => setShowVideoModal(true) },
    { label: 'Community Forum', icon: 'Users', url: 'https://t.me/nova_gent' },
    { label: 'GitHub Repository', icon: 'Github', url: 'https://github.com/manojkumarfade' }
  ];

  return (
    <>
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
                onClick={resource.action ? resource.action : () => window.open(resource?.url, '_blank')}
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
              onClick={() => window.open('mailto:manojboora13@gmail.com')}
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

        <div className="text-center text-xs text-muted-foreground pt-4 pb-2">
          <p>Created with ❤️ by <b>Manoj Kumar</b> © 2026</p>
          <p className="mt-1 opacity-75">All Rights Reserved</p>
        </div>
      </div>

      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500/10">
                  <Icon name="Video" size={20} className="text-purple-500" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    Video Tutorials
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Watch demo videos to learn more about Nova
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowVideoModal(false)}
                className="hover:bg-muted"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="overflow-y-auto p-4 md:p-6 space-y-8">
              {videoTutorials.map((video, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="text-base md:text-lg font-heading font-medium text-foreground">
                      {index + 1}. {video.title}
                    </h4>
                  </div>

                  <div className="rounded-lg overflow-hidden border border-border bg-black/10 aspect-video shadow-sm">
                    <video
                      controls
                      className="w-full h-full object-contain"
                      src={chrome.runtime.getURL(video.videoSrc)}
                      preload="metadata"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm text-foreground font-bold">
                      {video.description}
                    </p>
                  </div>

                  {index < videoTutorials.length - 1 && (
                    <div className="pt-4 border-b border-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showDocsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10">
                  <Icon name="BookOpen" size={20} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    Documentation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Official Nova Browser Agent Manual
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowDocsModal(false)}
                className="hover:bg-muted"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="overflow-y-auto p-4 md:p-6 prose prose-sm md:prose-base dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {novaManualContent}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpSettings;