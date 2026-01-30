import React, { useState, useEffect, useRef } from 'react';
import ConversationSidebar from '../shared/components/ui/ConversationSidebar';
import MessageBubble from './components/MessageBubble';
import ChatInput from './components/ChatInput';
import AgentActivityCard from './components/AgentActivityCard';
import PlanReviewCard from './components/PlanReviewCard';
import AgentCommandPanel from './components/AgentCommandPanel';
import GlassLayout from './components/GlassLayout';
import { StorageService } from '../services/StorageService';
import { ContentReader } from '../services/ContentReader';
import { supabase } from '../services/supabase';
import PlusMenu from './components/PlusMenu';

const MainChatInterface = () => {
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentAgentStatus, setCurrentAgentStatus] = useState('idle');
  const [currentTask, setCurrentTask] = useState('');
  const [progress, setProgress] = useState(0);
  const [activeConversationId, setActiveConversationId] = useState('conv-1');
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [agentActivity, setAgentActivity] = useState(null);
  const [isAgenticMode, setIsAgenticMode] = useState(false);
  const [inputText, setInputText] = useState('');
  const [attachments, setAttachments] = useState([]);

  // UI state
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [isImageGenEnabled, setIsImageGenEnabled] = useState(false);

  // XP System State
  const [userXP, setUserXP] = useState(75);
  const [userLevel, setUserLevel] = useState(12);

  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  // Check for Supabase Session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Conversation Logic (Load/Save)
  useEffect(() => {
    if (!session) return;
    const init = async () => {
      const savedConvs = await StorageService.get('conversations_index', []);
      setConversations(savedConvs);

      // [modified] START NEW CHAT ON OPEN, BUT PERSIST DURING NAVIGATION
      // We use sessionStorage (cleared when panel closes) to detect "Fresh Open".
      const isSessionActive = sessionStorage.getItem('nova_session_active');

      if (isSessionActive) {
        // Navigating back from History/Settings -> RESTORE
        const lastId = await StorageService.get('last_active_conversation_id');
        const isValidId = savedConvs.some(c => c.id === lastId);
        if (lastId && isValidId) {
          setActiveConversationId(lastId);
          return;
        }
      }

      // Fresh Open or No Valid Last Id -> NEW CHAT
      const newId = `conv-${Date.now()}`;
      setActiveConversationId(newId);
      sessionStorage.setItem('nova_session_active', 'true');
    };
    init();
  }, [session]);

  useEffect(() => {
    StorageService.set('last_active_conversation_id', activeConversationId);
  }, [activeConversationId]);

  useEffect(() => {
    const loadConversation = async () => {
      const saved = await StorageService.get(`conversation_${activeConversationId}`, []);
      setMessages(saved);
    };
    loadConversation();
  }, [activeConversationId]);

  useEffect(() => {
    if (messages.length > 0) {
      StorageService.set(`conversation_${activeConversationId}`, messages);
      StorageService.get('conversations_index', []).then(conversations => {
        const otherConvs = conversations.filter(c => c.id !== activeConversationId);
        let currentTitle = 'New Conversation';
        const existingConv = conversations.find(c => c.id === activeConversationId);

        if (existingConv && existingConv.title !== 'New Conversation') {
          currentTitle = existingConv.title;
        } else if (messages.length > 0) {
          const firstUserMsg = messages.find(m => m.sender === 'user');
          if (firstUserMsg) {
            currentTitle = firstUserMsg.message.slice(0, 35) + (firstUserMsg.message.length > 35 ? '...' : '');
          }
        }

        const currentConv = {
          id: activeConversationId,
          title: currentTitle,
          lastMessage: messages[messages.length - 1]?.message,
          timestamp: new Date().toISOString(),
          messageCount: messages.length,
          preview: messages[messages.length - 1]?.message?.slice(0, 100)
        };
        StorageService.set('conversations_index', [currentConv, ...otherConvs]);
      });
    }
  }, [messages, activeConversationId]);

  useEffect(() => {
    const loadIndex = async () => {
      const index = await StorageService.get('conversations_index', []);
      setConversations(index);
    };
    loadIndex();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef?.current) {
      chatContainerRef.current.scrollTop = chatContainerRef?.current?.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, agentActivity, currentAgentStatus]);

  // Agent Message Listener
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      const listener = (message) => {
        if (message.type === 'AGENT_PROGRESS') {
          const { status, message: taskMsg, result, plan } = message.data;

          if (status === 'thinking') {
            setCurrentAgentStatus('thinking');
            setCurrentTask(taskMsg);
          } else if (status === 'planning') {
            setCurrentAgentStatus('planning');
            setCurrentTask(taskMsg);
            setProgress(25);
          } else if (status === 'waiting_approval') {
            setCurrentAgentStatus('waiting_approval');
            setCurrentTask('Waiting for plan approval');
            setMessages(prev => [...prev, {
              id: Date.now(),
              sender: 'system',
              type: 'plan_review',
              plan: plan,
              timestamp: new Date()
            }]);
          } else if (status === 'navigating') {
            setCurrentAgentStatus('navigating');
            setCurrentTask(taskMsg);
            setProgress(50);
          } else if (status === 'validating') {
            setCurrentAgentStatus('validating');
            setCurrentTask(taskMsg);
            setProgress(85);
          } else if (status === 'generating_image') {
            setCurrentAgentStatus('generating_image');
            setCurrentTask(taskMsg);
            setProgress(60);
          } else if (status === 'idle' || status === 'completed') {
            setCurrentAgentStatus('idle');
            setCurrentTask('');
            setProgress(100);
            // Add XP on completion
            if (status === 'completed') {
              setUserXP(prev => Math.min(prev + 15, 100)); // Demo logic
            }
          }

          if (['planning', 'navigating', 'validating', 'generating_image'].includes(status)) {
            setAgentActivity(prev => ({
              agentType: status,
              activity: taskMsg,
              progress: status === 'planning' ? 25 : status === 'navigating' ? 50 : status === 'generating_image' ? 60 : 90,
              status: 'active',
              details: prev ? [...(prev.details || []), taskMsg] : [taskMsg]
            }));
          }

          if ((status === 'idle' || status === 'completed') && result) {
            let finalMessage = result.summary || result.message || 'Task completed successfully';

            // Format images as markdown if present to ensure visibility
            if (result.images && result.images.length > 0) {
              const imageMarkdown = result.images.map(img => {
                const url = typeof img === 'object' ? (img.url || img.image_url || img.data) : img;
                return `![Generated Image](${url})`;
              }).join('\n\n');
              finalMessage = `${finalMessage}\n\n${imageMarkdown}`;
            }

            const responseMsg = {
              id: Date.now() + 1,
              sender: 'agent',
              message: finalMessage,
              timestamp: new Date(),
              agentStatus: null,
              images: result.images
            };
            setMessages(prev => [...prev, responseMsg]);
            setAgentActivity(null);
            setCurrentAgentStatus('idle');
            setProgress(0);
          }
        }
      };
      chrome.runtime.onMessage.addListener(listener);
      return () => chrome.runtime.onMessage.removeListener(listener);
    }
  }, []);

  const [isWebSearchEnabled, setIsWebSearchEnabled] = useState(false);
  const [isShoppingMode, setIsShoppingMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Ref for speech recognition object
  const recognitionRef = useRef(null);
  const originalTextRef = useRef(""); // To store what was already typed/transcribed before current session

  // Function to start recording (User provided logic adapt)
  const startRecording = async () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Speech recognition not supported");
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      // Capture what is already in the input box
      originalTextRef.current = inputText;

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        // To mimic the "Saved Notes" logic where it APPENDS:
        // logic: currentStored (original) + final (new) + interim (pending)
        // But since finalTranscript in 'continuous' mode accumulates properly in event.results if we iterate from 0?
        // Actually, event.results contains the history of this session.

        // Correct way to get FULL session transcript:
        let sessionTranscript = '';
        for (let i = 0; i < event.results.length; ++i) {
          sessionTranscript += event.results[i][0].transcript;
        }

        const spacer = originalTextRef.current.length > 0 ? " " : "";
        setInputText(originalTextRef.current + spacer + sessionTranscript);
      };

      recognition.onerror = (event) => {
        console.error("Speech Error: " + event.error);
        // User requested explicit stop on error
        stopRecording();
        if (event.error === 'not-allowed') {
          alert("Microphone permission denied.");
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
      setIsRecording(true);

    } catch (e) {
      console.error("Failed to start recording", e);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleSendMessage = async ({ text, attachments }) => {
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      message: text,
      timestamp: new Date(),
      attachments: attachments
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setAttachments([]);

    const fileContent = await ContentReader.read(attachments);
    const fullPrompt = fileContent ? `${text}\n\n[Attached Content]:\n${fileContent}` : text;

    const history = messages.slice(-10).map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.message
    }));

    if (typeof chrome !== 'undefined' && chrome.runtime) {
      // [NEW] Strict API Key Check
      const providers = await StorageService.get('llm_providers', []);
      const hasValidKey = providers.some(p => p.isEnabled && p.apiKey && p.apiKey.trim().length > 0);

      if (!hasValidKey) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          sender: 'system',
          message: '⚠️ **Missing API Key**\n\nPlease go to **Settings** (⚙️) and configure an LLM Provider (e.g., TypeGPT, OpenAI) to start chatting.',
          timestamp: new Date()
        }]);
        setCurrentAgentStatus('idle'); // Ensure UI resets
        return;
      }

      if (isImageGenEnabled && (isWebSearchEnabled || isShoppingMode || isAgenticMode)) {
        alert("Please turn off Agent Modes (Web, Shopping, Agent) to use Image Generation.");
        return;
      }

      chrome.runtime.sendMessage({
        type: 'START_AGENT_TASK',
        prompt: fullPrompt,
        history: history,
        isAgentic: isAgenticMode,
        isWebSearchEnabled: isWebSearchEnabled,
        isShoppingMode: isShoppingMode,
        isImageGen: isImageGenEnabled
      });
      setCurrentAgentStatus('thinking');
    }
  };

  const handleApprovePlan = () => {
    chrome.runtime.sendMessage({ type: 'APPROVE_PLAN' });
    setCurrentAgentStatus('navigating');
  };

  const handleRejectPlan = () => {
    chrome.runtime.sendMessage({ type: 'REJECT_PLAN' });
    setCurrentAgentStatus('idle');
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'system',
      message: 'Plan rejected.',
      timestamp: new Date()
    }]);
  };

  const handleDeleteConversation = async (id) => {
    const updatedConvs = conversations.filter(c => c.id !== id);
    setConversations(updatedConvs);
    await StorageService.set('conversations_index', updatedConvs);
    await StorageService.remove(`conversation_${id}`);
    if (id === activeConversationId) {
      if (updatedConvs.length > 0) {
        setActiveConversationId(updatedConvs[0].id);
      } else {
        const newId = `conv-${Date.now()}`;
        setActiveConversationId(newId);
      }
    }
  };

  const handleStop = () => {
    chrome.runtime.sendMessage({ type: 'STOP_AGENT' });
    setCurrentAgentStatus('idle');
    setAgentActivity(null);
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'system',
      message: '🛑 Task stopped by user.',
      timestamp: new Date()
    }]);
  };

  const handleNewConversation = () => {
    setMessages([]);
    const newId = `conv-${Date.now()}`;
    setActiveConversationId(newId);
    setAgentActivity(null);
    setCurrentAgentStatus('idle');
    setConversations(prev => [{ id: newId, title: 'New Conversation', timestamp: new Date().toISOString() }, ...prev]);
  };

  const handleSelectConversation = (id) => {
    setActiveConversationId(id);
    setSidebarOpen(false);
  };

  // Retry Handler
  const handleRetry = (msgIndex) => {
    const lastUserMsg = [...messages].reverse().find(m => m.sender === 'user');
    if (lastUserMsg) {
      handleSendMessage({ text: lastUserMsg.message, attachments: lastUserMsg.attachments || [] });
    }
  };

  // Edit Handler
  const handleEdit = (newText) => {
    if (newText) handleSendMessage({ text: newText, attachments: [] });
  };

  const handleEnhancePrompt = async () => {
    if (!inputText || inputText.trim().length === 0) return;

    setIsEnhancing(true);
    try {
      const response = await chrome.runtime.sendMessage({
        type: 'ENHANCE_PROMPT',
        prompt: inputText
      });

      if (response && response.enhancedPrompt) {
        setInputText(response.enhancedPrompt);
      }
    } catch (error) {
      console.error("Enhancement failed", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  // Agent Command Panel Action Handler
  const handleAgentAction = (action) => {
    if (action === 'shopping') {
      setIsShoppingMode(true);
      setIsWebSearchEnabled(true);
      setIsAgenticMode(true);
      handleSendMessage({ text: "I want to shop for something...", attachments: [] });
    } else if (action === 'research') {
      setIsWebSearchEnabled(true);
      setIsAgenticMode(true);
      handleSendMessage({ text: "I need to research...", attachments: [] });
    } else if (action === 'automation') {
      setIsAgenticMode(true);
      handleSendMessage({ text: "I want to automate a task...", attachments: [] });
    } else if (action === 'image') {
      setIsImageGenEnabled(true);
      handleSendMessage({ text: "Generate an image of...", attachments: [] });
    }
  };

  if (loadingSession) {
    return <div className="h-full bg-black flex items-center justify-center text-neon-cyan font-mono animate-pulse">SYSTEM INITIALIZING...</div>;
  }

  return (
    <GlassLayout level={userLevel} xp={userXP}>
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">

        {/* Scrollable Chat Area */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-1 py-4 scroll-smooth">
          <div className="max-w-4xl mx-auto pb-4 min-h-full flex flex-col justify-end">

            {/* Show Agent Command Panel if no messages - REMOVED per user request for clean UI */}
            {messages.length === 0 && (
              <div className="flex-1 flex flex-col justify-center items-center opacity-70">
                {/* Optional: Add a subtle logo or text if needed, but user asked for clean */}
                <div className="text-neon-cyan font-heading text-2xl tracking-[0.3em] animate-pulse drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] opacity-100 font-bold">
                  SYSTEM ONLINE
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg) => (
              <div key={msg.id} className="mb-2 w-full">
                {msg.type === 'plan_review' ? (
                  <PlanReviewCard
                    plan={msg.plan}
                    onApprove={handleApprovePlan}
                    onReject={handleRejectPlan}
                  />
                ) : (
                  <MessageBubble
                    message={{
                      role: msg.sender === 'user' ? 'user' : 'assistant',
                      content: msg.message,
                      timestamp: msg.timestamp, // Pass the timestamp!
                      metadata: msg.agentStatus ? { type: 'agent_activity', activity: msg.agentStatus, status: 'active' } : undefined
                    }}
                    isLast={true}
                    onRetry={() => handleRetry(messages.indexOf(msg))}
                    onEdit={(newText) => handleEdit(newText)}
                  />
                )}
              </div>
            ))}

            {agentActivity && (
              <div className="mb-6">
                <AgentActivityCard
                  agentType={agentActivity.agentType}
                  activity={agentActivity.activity}
                  progress={agentActivity.progress}
                  status={agentActivity.status}
                  details={agentActivity.details}
                />
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 pt-2 pb-1 relative z-30">
          {/* Plus Menu Popover */}
          <PlusMenu
            isOpen={showPlusMenu}
            onClose={() => setShowPlusMenu(false)}
            onFileUpload={() => fileInputRef.current?.click()}
            isImageGenEnabled={isImageGenEnabled}
            toggleImageGen={() => {
              if (!session) return alert("Please Log In.");
              setIsImageGenEnabled(!isImageGenEnabled);
            }}
            isWebSearchEnabled={isWebSearchEnabled}
            toggleWebSearch={() => {
              if (!session) return alert("Please Log In.");
              setIsWebSearchEnabled(!isWebSearchEnabled);
              if (!isWebSearchEnabled) setIsAgenticMode(false);
            }}
            isShoppingMode={isShoppingMode}
            toggleShopping={() => {
              if (!session) return alert("Please Log In.");
              setIsShoppingMode(!isShoppingMode);
              if (!isShoppingMode) setIsAgenticMode(false);
            }}
            isAgenticMode={isAgenticMode}
            toggleAgentic={() => {
              if (!session) return alert("Please Log In.");
              setIsAgenticMode(!isAgenticMode);
              if (!isAgenticMode) { setIsWebSearchEnabled(false); setIsShoppingMode(false); }
            }}
          />

          {/* Hidden File Input */}
          <input
            type="file"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) {
                const files = Array.from(e.target.files);
                const newAttachments = files.map(file => ({
                  name: file.name,
                  type: file.type.startsWith('image/') ? 'image' : 'document',
                  size: file.size,
                  file: file
                }));
                setAttachments(prev => [...prev, ...newAttachments]);
                e.target.value = '';
              }
            }}
          />

          {/* Mode Indicators */}
          <div className="flex gap-2 mb-2 px-2 overflow-x-auto no-scrollbar">
            {isImageGenEnabled && <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-neon-blue text-neon-blue bg-neon-blue/10">IMG GEN</span>}
            {isWebSearchEnabled && <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-neon-cyan text-neon-cyan bg-neon-cyan/10">WEB SEARCH</span>}
            {isShoppingMode && <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-neon-magenta text-neon-magenta bg-neon-magenta/10">SHOPPING</span>}
            {isAgenticMode && <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-neon-violet text-neon-violet bg-neon-violet/10">AGENTIC</span>}
          </div>

          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={currentAgentStatus !== 'idle'}
            value={inputText}
            onChange={setInputText}
            onVoiceToggle={handleMicClick}
            isRecording={isRecording}
            onEnhance={handleEnhancePrompt}
            isEnhancing={isEnhancing}
            attachments={attachments}
            onAddAttachments={(newFiles) => setAttachments(prev => [...prev, ...newFiles])}
            onRemoveAttachment={(index) => setAttachments(prev => prev.filter((_, i) => i !== index))}
            isProcessing={currentAgentStatus !== 'idle'}
            onStop={handleStop}
            onPlusClick={() => setShowPlusMenu(!showPlusMenu)}
          />
        </div>

        {/* Sidebar Drawer (Optional: Keep hidden or reimplement as overlay) */}
        <ConversationSidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
          onDeleteConversation={handleDeleteConversation}
        />
      </div>
    </GlassLayout>
  );
};

export default MainChatInterface;