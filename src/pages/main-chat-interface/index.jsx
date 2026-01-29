import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/ui/Header';
import ConversationSidebar from '../../components/ui/ConversationSidebar';
import AgentStatusIndicator from '../../components/ui/AgentStatusIndicator';
import MessageBubble from './components/MessageBubble';
import ChatInput from './components/ChatInput';
import AgentActivityCard from './components/AgentActivityCard';
import WelcomeScreen from './components/WelcomeScreen';

const MainChatInterface = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentAgentStatus, setCurrentAgentStatus] = useState('idle');
  const [currentTask, setCurrentTask] = useState('');
  const [progress, setProgress] = useState(0);
  const [activeConversationId, setActiveConversationId] = useState('conv-1');
  const [messages, setMessages] = useState([]);
  const [agentActivity, setAgentActivity] = useState(null);
  const chatContainerRef = useRef(null);

  const mockConversations = [
    {
      id: 'conv-1',
      title: 'Product Search on Amazon',
      preview: 'Search for wireless headphones under $200...',
      timestamp: new Date(Date.now() - 3600000),
      messageCount: 8
    },
    {
      id: 'conv-2',
      title: 'Page Analysis Request',
      preview: 'Summarize the key points from this article...',
      timestamp: new Date(Date.now() - 7200000),
      messageCount: 5
    },
    {
      id: 'conv-3',
      title: 'Tab Management',
      preview: 'Group my tabs by topic and close duplicates...',
      timestamp: new Date(Date.now() - 86400000),
      messageCount: 12
    },
    {
      id: 'conv-4',
      title: 'Shopping Cart Workflow',
      preview: 'Add items to cart and proceed to checkout...',
      timestamp: new Date(Date.now() - 172800000),
      messageCount: 15
    }
  ];

  const scrollToBottom = () => {
    if (chatContainerRef?.current) {
      chatContainerRef.current.scrollTop = chatContainerRef?.current?.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, agentActivity]);

  const simulateAgentResponse = (userMessage) => {
    setCurrentAgentStatus('planning');
    setCurrentTask('Analyzing request and creating execution plan');
    setProgress(0);

    setAgentActivity({
      agentType: 'planner',
      activity: 'Breaking down task into actionable steps',
      progress: 25,
      status: 'active',
      details: [
        'Parsing natural language input',
        'Identifying target websites and actions',
        'Creating step-by-step execution plan'
      ]
    });

    setTimeout(() => {
      setCurrentAgentStatus('navigating');
      setCurrentTask('Executing navigation steps');
      setProgress(50);

      setAgentActivity({
        agentType: 'navigator',
        activity: 'Interacting with web page elements',
        progress: 60,
        status: 'active',
        details: [
          'Loading target webpage',
          'Locating search elements',
          'Entering search parameters'
        ]
      });

      setTimeout(() => {
        setCurrentAgentStatus('validating');
        setCurrentTask('Verifying task completion');
        setProgress(85);

        setAgentActivity({
          agentType: 'validator',
          activity: 'Confirming successful execution',
          progress: 90,
          status: 'active',
          details: [
            'Checking page state',
            'Verifying expected results',
            'Preparing response summary'
          ]
        });

        setTimeout(() => {
          setCurrentAgentStatus('idle');
          setCurrentTask('');
          setProgress(0);
          setAgentActivity(null);

          const agentResponse = {
            id: Date.now() + 1,
            sender: 'agent',
            message: `I've successfully completed your request. Here's what I did:\n\n1. Analyzed your search query for wireless headphones under $200\n2. Navigated to Amazon's search page\n3. Applied price filter and sorted by relevance\n4. Retrieved the top 5 results with ratings and prices\n\nWould you like me to add any of these items to your cart or provide more details about specific products?`,
            timestamp: new Date(),
            agentStatus: null
          };

          setMessages(prev => [...prev, agentResponse]);
        }, 2000);
      }, 2500);
    }, 2000);
  };

  const handleSendMessage = ({ text, attachments }) => {
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      message: text,
      timestamp: new Date(),
      attachments: attachments
    };

    setMessages(prev => [...prev, userMessage]);
    simulateAgentResponse(text);
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        handleSendMessage({ 
          text: 'Search for the best laptop deals under $1000', 
          attachments: [] 
        });
      }, 3000);
    }
  };

  const handleNewConversation = () => {
    setMessages([]);
    setActiveConversationId(`conv-${Date.now()}`);
    setAgentActivity(null);
    setCurrentAgentStatus('idle');
  };

  const handleSelectConversation = (conversationId) => {
    setActiveConversationId(conversationId);
    setMessages([
      {
        id: 1,
        sender: 'user',
        message: 'Search for wireless headphones under $200 on Amazon and show me the top 5 results',
        timestamp: new Date(Date.now() - 300000),
        attachments: []
      },
      {
        id: 2,
        sender: 'agent',
        message: 'I\'ll help you search for wireless headphones under $200 on Amazon. Let me break this down into steps and execute the search for you.',
        timestamp: new Date(Date.now() - 280000),
        agentStatus: null
      }
    ]);
  };

  const handleExampleClick = (prompt) => {
    handleSendMessage({ text: prompt, attachments: [] });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ConversationSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        conversations={mockConversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
      />
      <main className={`
        pt-16 min-h-screen transition-all duration-250
        lg:pl-80
      `}>
        <div className="h-[calc(100vh-4rem)] flex flex-col">
          <div className="flex-shrink-0 px-4 md:px-6 lg:px-8 py-4 border-b border-border bg-card">
            <AgentStatusIndicator
              status={currentAgentStatus}
              currentTask={currentTask}
              progress={progress}
            />
          </div>

          {messages?.length === 0 ? (
            <WelcomeScreen onExampleClick={handleExampleClick} />
          ) : (
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 py-6 md:py-8"
            >
              <div className="max-w-4xl mx-auto">
                {messages?.map((msg) => (
                  <MessageBubble
                    key={msg?.id}
                    message={msg?.message}
                    isUser={msg?.sender === 'user'}
                    timestamp={msg?.timestamp}
                    attachments={msg?.attachments || []}
                    agentStatus={msg?.agentStatus}
                  />
                ))}

                {agentActivity && (
                  <div className="mb-6">
                    <AgentActivityCard
                      agentType={agentActivity?.agentType}
                      activity={agentActivity?.activity}
                      progress={agentActivity?.progress}
                      status={agentActivity?.status}
                      details={agentActivity?.details}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex-shrink-0">
            <ChatInput
              onSendMessage={handleSendMessage}
              onVoiceToggle={handleVoiceToggle}
              isRecording={isRecording}
              disabled={currentAgentStatus !== 'idle'}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainChatInterface;