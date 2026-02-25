/**
 * @file ChatPage.jsx
 * @description Core functionality for ChatPage.
 * Handles the primary logic and responsibilities designated for this module.
 * 
 * @context Sidepanel UI Component (React)
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import ConversationSidebar from '../shared/components/ui/ConversationSidebar';
import MessageBubble from './components/MessageBubble';
import ChatInput from './components/ChatInput';
import AgentActivityCard from './components/AgentActivityCard';
import PlanReviewCard from './components/PlanReviewCard';
import AgentCommandPanel from './components/AgentCommandPanel';
import GlassLayout from './components/GlassLayout';
import VoiceOverlay from './components/VoiceOverlay';
import { VoiceService } from '../services/VoiceService';
import { SongService } from '../services/SongService';
import { StorageService } from '../services/StorageService';
import { ContentReader } from '../services/ContentReader';
import { supabase } from '../services/supabase';
import PlusMenu from './components/PlusMenu';
import CollapsibleReasoning from './components/CollapsibleReasoning';
import ImageGenLoader from './components/ImageGenLoader';
import ShoppingActionCard from './components/ShoppingActionCard';
import { VisionTrigger } from '../services/vision/visionTrigger';
import { VisionRateLimiter } from '../services/vision/rateLimiter';
import { VisionClient } from '../services/vision/visionClient';
import { PromptComposer } from '../services/vision/promptComposer';

import ModelSelector from './components/ModelSelector';
import { ChevronUp } from 'lucide-react'; // For the toggle arrow

const MainChatInterface = () => {
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);

  // Model Selection State
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
  const [activeModel, setActiveModel] = useState('gpt-4-turbo'); // Default
  const [activeImageModel, setActiveImageModel] = useState('dall-e-3'); // Default

  // ... existing state ...

  // Load saved model preference
  useEffect(() => {
    const loadModelPrefs = async () => {
      const settings = await StorageService.get('model_settings');
      if (settings?.plannerModel) setActiveModel(settings.plannerModel);

      const imgSettings = await StorageService.get('image_settings');
      if (imgSettings?.activeProvider) {
        const p = imgSettings.activeProvider;
        const m = imgSettings.providers?.[p]?.model;
        if (m) setActiveImageModel(m);
      }
    };
    loadModelPrefs();
  }, []);

  const handleModelSelect = async (providerId, modelId) => {
    // Logic to update storage so the rest of the app knows
    if (isImageGenEnabled) {
      setActiveImageModel(modelId);
      // Update Image Settings
      const imgSettings = await StorageService.get('image_settings') || {};
      if (!imgSettings.providers) imgSettings.providers = {};

      // We need to switch active provider if different
      imgSettings.activeProvider = providerId;

      // And update that provider's selected model
      if (!imgSettings.providers[providerId]) imgSettings.providers[providerId] = {};
      imgSettings.providers[providerId].model = modelId;

      await StorageService.set('image_settings', imgSettings);
    } else {
      setActiveModel(modelId);
      // Update LLM Settings for Planner, Navigator, and Validator to keep them in sync
      const settings = await StorageService.get('model_settings') || {};
      settings.plannerModel = modelId;
      settings.navigatorModel = modelId;
      settings.validatorModel = modelId;
      await StorageService.set('model_settings', settings);
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentAgentStatus, setCurrentAgentStatus] = useState('idle');
  const [currentTask, setCurrentTask] = useState('');
  const [progress, setProgress] = useState(0);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [agentActivity, setAgentActivity] = useState(null);
  const [agentLogs, setAgentLogs] = useState([]);
  const [isAgenticMode, setIsAgenticMode] = useState(false);
  const [inputText, setInputText] = useState('');
  const [attachments, setAttachments] = useState([]);

  // UI state
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [isImageGenEnabled, setIsImageGenEnabled] = useState(false);

  // Voice Agent State
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('idle');
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceMessages, setVoiceMessages] = useState([]);
  const [voiceLang, setVoiceLang] = useState('en-US');
  const voiceTranscriptRef = useRef('');
  const voiceProcessingRef = useRef(false);

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
  const loadConversationsIndex = useCallback(async () => {
    const savedConvs = await StorageService.get('conversations_index', []);
    setConversations(savedConvs);
    return savedConvs;
  }, []);

  useEffect(() => {
    if (!session) return;
    const init = async () => {
      const savedConvs = await loadConversationsIndex();

      // PERSIST DURING NAVIGATION
      const lastId = await StorageService.get('last_active_conversation_id');
      const isSessionActive = sessionStorage.getItem('nova_session_active');

      const isValidId = savedConvs.some(c => c.id === lastId);

      if (isSessionActive && lastId && isValidId) {
        setActiveConversationId(lastId);
      } else {
        // Fresh Open or No Valid Last Id -> START NEW ONLY IF NOT ALREADY IN ONE
        if (!activeConversationId) {
          const newId = `conv-${Date.now()}`;
          setActiveConversationId(newId);
          sessionStorage.setItem('nova_session_active', 'true');
        }
      }
    };
    init();
  }, [session, loadConversationsIndex]);

  useEffect(() => {
    if (activeConversationId) {
      StorageService.set('last_active_conversation_id', activeConversationId);
      const loadConversation = async () => {
        const saved = await StorageService.get(`conversation_${activeConversationId}`, []);
        setMessages(saved);
      };
      loadConversation();
    }
  }, [activeConversationId]);

  // Unified Update Index Logic
  const updateConversationIndex = useCallback(async (convId, msgs) => {
    if (!convId || msgs.length === 0) return;

    const currentConvs = await StorageService.get('conversations_index', []);
    const otherConvs = currentConvs.filter(c => c.id !== convId);

    let currentTitle = 'New Conversation';
    const existingConv = currentConvs.find(c => c.id === convId);
    const hasVoiceMessages = msgs.some(m => m.isVoice);

    if (existingConv && existingConv.title !== 'New Conversation') {
      currentTitle = existingConv.title;
    } else {
      // Auto-generate title via LLM after first assistant response
      const userMsgs = msgs.filter(m => m.sender === 'user');
      const agentMsgs = msgs.filter(m => m.sender === 'agent');
      if (userMsgs.length >= 1 && agentMsgs.length >= 1) {
        try {
          const titleMsgs = msgs.slice(0, 4).map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.message
          }));
          chrome.runtime.sendMessage({ type: 'GENERATE_TITLE', messages: titleMsgs }, (res) => {
            if (res?.title) {
              // Update title in storage asynchronously
              StorageService.get('conversations_index', []).then(idx => {
                const updated = idx.map(c => c.id === convId ? { ...c, title: res.title } : c);
                StorageService.set('conversations_index', updated);
                setConversations(updated);
              });
            }
          });
        } catch (e) { /* silent */ }
        // Set temporary title from first user message
        const firstUserMsg = userMsgs[0];
        currentTitle = firstUserMsg.message.slice(0, 35) + (firstUserMsg.message.length > 35 ? '...' : '');
      } else {
        const firstUserMsg = userMsgs[0];
        if (firstUserMsg) {
          currentTitle = firstUserMsg.message.slice(0, 35) + (firstUserMsg.message.length > 35 ? '...' : '');
        }
      }
    }

    const currentConv = {
      id: convId,
      title: currentTitle,
      lastMessage: msgs[msgs.length - 1]?.message,
      timestamp: new Date().toISOString(),
      messageCount: msgs.length,
      preview: msgs[msgs.length - 1]?.message?.slice(0, 100),
      hasVoiceMessages
    };

    const newIndex = [currentConv, ...otherConvs];
    await StorageService.set('conversations_index', newIndex);
    setConversations(newIndex);
  }, []);

  useEffect(() => {
    if (messages.length > 0 && activeConversationId) {
      StorageService.set(`conversation_${activeConversationId}`, messages);
      updateConversationIndex(activeConversationId, messages);
    }
  }, [messages, activeConversationId, updateConversationIndex]);

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

          if (['planning', 'navigating', 'validating', 'generating_image', 'thinking'].includes(status)) {
            // Build structured log entry
            const logEntry = message.data.logEntry || {
              type: status === 'navigating' ? 'navigate' : status === 'thinking' ? 'think' : status === 'planning' ? 'plan' : status === 'generating_image' ? 'image' : 'validate',
              message: taskMsg,
              url: message.data.url || '',
              timestamp: new Date().toLocaleTimeString()
            };
            setAgentLogs(prev => [...prev, logEntry]);
            setAgentActivity(prev => ({
              agentType: status,
              activity: taskMsg,
              progress: status === 'planning' ? 25 : status === 'navigating' ? 50 : status === 'generating_image' ? 60 : status === 'thinking' ? 35 : 90,
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

            const imgModelInfo = (result.images && result.images.length > 0 && typeof result.images[0] === 'object')
              ? (result.images[0].model || result.images[0].provider)
              : null;

            const responseMsg = {
              id: Date.now() + 1,
              sender: 'agent',
              message: finalMessage,
              timestamp: new Date(),
              agentStatus: null,
              metadata: { imageModel: imgModelInfo },
              images: result.images,
              taskSummary: result.taskSummary || null,
              logs: [...agentLogs],
              // Shopping-specific data for action card
              isShopping: result.isShopping || false,
              products: result.products || [],
              winnerProduct: result.winnerProduct || null,
              winnerUrl: result.winnerUrl || null,
              needsProceed: result.needsProceed || false
            };
            setMessages(prev => [...prev, responseMsg]);
            setAgentActivity(null);
            setAgentLogs([]);
            setCurrentAgentStatus('idle');
            setProgress(0);
          } else if (status === 'error') {
            const errorMsg = {
              id: Date.now() + 1,
              sender: 'system',
              message: '❌ Task Failed',
              timestamp: new Date(),
              agentStatus: null,
              metadata: {
                type: 'error',
                errorDetails: taskMsg || 'An unknown error occurred.'
              }
            };
            setMessages(prev => [...prev, errorMsg]);
            setAgentActivity(null);
            setAgentLogs([]);
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

  // ===== VOICE AGENT MODE =====
  const handleVoiceMicClick = () => {
    if (isVoiceMode) {
      handleVoiceClose();
      return;
    }
    // Open overlay FIRST
    setIsVoiceMode(true);
    setVoiceMessages([]);
    setVoiceTranscript('');
    voiceTranscriptRef.current = '';
    voiceProcessingRef.current = false;

    // Set language in VoiceService
    VoiceService.setLanguage(voiceLang);

    // Then start voice mode (with error handling so overlay still shows)
    try {
      VoiceService.startVoiceMode(
        (text, isFinal) => {
          setVoiceTranscript(text);
          voiceTranscriptRef.current = text;
        },
        (state) => {
          setVoiceStatus(state);

          if (state === 'processing' && voiceTranscriptRef.current.trim() && !voiceProcessingRef.current) {
            voiceProcessingRef.current = true;
            const userText = voiceTranscriptRef.current.trim();

            // Clear AFTER capturing the text
            setVoiceTranscript('');
            voiceTranscriptRef.current = '';

            // Add to voiceMessages for overlay display
            setVoiceMessages(prev => [...prev, { sender: 'user', message: userText }]);

            // Also add to main messages with isVoice flag for persistence
            const userMessage = {
              id: Date.now(),
              sender: 'user',
              message: userText,
              timestamp: new Date(),
              isVoice: true
            };
            setMessages(prev => [...prev, userMessage]);

            chrome.runtime.sendMessage({
              type: 'PROCESS_VOICE_COMMAND',
              prompt: userText,
              history: messages.slice(-6)
            }, (response) => {
              voiceProcessingRef.current = false;
              if (response && response.message) {
                // Add to voiceMessages for overlay display
                setVoiceMessages(prev => [...prev, { sender: 'nova', message: response.message }]);

                // Also add to main messages with isVoice flag for persistence
                const agentMessage = {
                  id: Date.now() + 1,
                  sender: 'agent',
                  message: response.message,
                  timestamp: new Date(),
                  isVoice: true
                };
                setMessages(prev => [...prev, agentMessage]);

                VoiceService.speak(response.message);
              }
            });
          }
        }
      );
    } catch (e) {
      console.error('[VoiceMode] Failed to start:', e);
    }
  };

  const handleVoiceClose = () => {
    // Stop VoiceService (STT + TTS)
    try { VoiceService.stopVoiceMode(); } catch (e) { console.error(e); }
    // Force stop browser TTS immediately
    try { window.speechSynthesis.cancel(); } catch (e) { }
    setIsVoiceMode(false);
    setVoiceStatus('idle');
    setVoiceTranscript('');
    setVoiceMessages([]);
  };

  // Song Mode State
  const [isSongMode, setIsSongMode] = useState(false);

  const toggleSongMode = async () => {
    if (isSongMode) {
      // TURN OFF
      setIsSongMode(false);
      SongService.stopDetection();
      VoiceService.resume();
      setVoiceStatus('listening');
      setVoiceMessages(prev => [...prev, { sender: 'nova', message: "Song detection stopped. I'm listening to you again." }]);
    } else {
      // TURN ON
      setIsSongMode(true);
      VoiceService.pause(); // Pause main voice to free mic
      setVoiceStatus('processing'); // Visual cue (or maybe a new 'music' status?)
      setVoiceMessages(prev => [...prev, { sender: 'nova', message: "🎵 Global Song Search ACTIVATED. I'll keep listening until I catch a song..." }]);

      SongService.startContinuousDetection(
        voiceLang,
        (result) => {
          // On Success
          setVoiceMessages(prev => [...prev, {
            sender: 'nova',
            message: `🎵 MATCH FOUND: "${result.title}" by ${result.artist}!`
          }]);

          // Keep mode ON? user said "continuously listen".
          // But usually we want to search for it once found.
          // Let's notify and search.
          handleSendMessage({ text: `Found song: "${result.title}" by ${result.artist}". Tell me about it.` });
        },
        (error) => {
          // Optional error feedback in UI, usually silent retry
        },
        (interimLyrics) => {
          // Live Lyrics Update
          setVoiceTranscript(`🎵 ${interimLyrics}`);
        }
      );
    }
  };

  const handleReverseEngineer = async () => {
    const canUseVision = await VisionRateLimiter.checkLimits();
    if (!canUseVision) {
      alert("Vision rate limit reached. Please try again later.");
      return;
    }

    setAgentActivity({
      agentType: 'thinking',
      activity: 'Reverse engineering image...',
      progress: 50,
      status: 'active',
      details: ['Capturing screen for analysis...']
    });

    try {
      const base64Image = await VisionClient.captureAndProcessScreenshot();
      if (!base64Image) {
        throw new Error("Failed to capture screen or no image found.");
      }

      setAgentActivity({
        agentType: 'thinking',
        activity: 'Analyzing visual elements...',
        progress: 80,
        status: 'active',
        details: ['Extracting camera settings, lighting, and style...']
      });

      const recipe = await VisionClient.reverseEngineerImage(base64Image);

      if (recipe) {
        // Populate the input text for the user to tweak
        setInputText(recipe);

        // Optionally add a polite system message
        setMessages(prev => [...prev, {
          id: Date.now(),
          sender: 'system',
          message: '✨ **Prompt Recipe Extracted!**\n\nI have analyzed the screen and populated the chat input with the generative recipe. You can tweak it or send it to generate your image.',
          timestamp: new Date()
        }]);
      } else {
        throw new Error("Failed to extract prompt recipe.");
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'system',
        message: '❌ I can\'t see any photo from the page to extract visuals.',
        timestamp: new Date()
      }]);
    } finally {
      setAgentActivity(null);
      setCurrentAgentStatus('idle');
    }
  };

  const handleAddToCart = async (url) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'user',
      message: 'Please add this product to my cart.',
      timestamp: new Date()
    }]);

    setAgentActivity({ agentType: 'shopping', status: 'active' });
    setCurrentAgentStatus('Navigating to store to scan cart options...');

    try {
      const response = await chrome.runtime.sendMessage({
        type: 'START_CART_AUTOMATION',
        url: url
      });

      setAgentActivity(null);
      setCurrentAgentStatus('idle');

      if (response && response.message) {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'agent',
          message: response.message,
          timestamp: new Date()
        }]);
      } else {
        throw new Error('Automation failed');
      }
    } catch (err) {
      setAgentActivity(null);
      setCurrentAgentStatus('idle');
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'system',
        message: '❌ Failed to start cart automation. Check if the store loaded correctly.',
        timestamp: new Date()
      }]);
    }
  };

  const handleCompare = async (url, name) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'user',
      message: `Compare prices for ${name}`,
      timestamp: new Date()
    }]);

    setAgentActivity({ agentType: 'shopping', status: 'active' });
    setCurrentAgentStatus(`Opening Flash.co and comparing prices for ${name}...`);

    try {
      const response = await chrome.runtime.sendMessage({
        type: 'FLASH_COMPARE',
        url: url,
        name: name
      });

      setAgentActivity(null);
      setCurrentAgentStatus('idle');

      if (response && response.message) {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'agent',
          message: response.message,
          timestamp: new Date()
        }]);
      } else {
        throw new Error('Comparison failed');
      }
    } catch (err) {
      setAgentActivity(null);
      setCurrentAgentStatus('idle');
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'system',
        message: '❌ Comparison Error: Extension connection dropped or timed out.',
        timestamp: new Date()
      }]);
    }
  };

  const handleSendMessage = async ({ text, attachments, modeOverrides = null }) => {
    const wasVoiceInput = isRecording;
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      message: text,
      timestamp: new Date(),
      attachments: attachments?.map(a => ({ name: a.name, type: a.type, size: a.size })) || [],
      isVoice: wasVoiceInput
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setAttachments([]);

    // Determine target modes (use overrides if provided, else use current state)
    const targetAgentic = modeOverrides ? modeOverrides.isAgentic : isAgenticMode;
    const targetWebSearch = modeOverrides ? modeOverrides.isWebSearch : isWebSearchEnabled;
    const targetShopping = modeOverrides ? modeOverrides.isShopping : isShoppingMode;
    const targetImage = modeOverrides ? modeOverrides.isImage : isImageGenEnabled;

    const { textContent: fileContent, imageDataUrls } = await ContentReader.read(attachments);
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

      if (targetImage && (targetWebSearch || targetShopping || targetAgentic)) {
        alert("Please turn off Agent Modes (Web, Shopping, Agent) to use Image Generation.");
        return;
      }

      let finalPromptToSend = fullPrompt;
      if (targetImage && VisionTrigger.shouldTrigger(fullPrompt, true)) {
        const canUseVision = await VisionRateLimiter.checkLimits();
        if (canUseVision) {
          setAgentActivity({
            agentType: 'thinking',
            activity: 'Analyzing page visuals...',
            progress: 20,
            status: 'active',
            details: ['Extracting visual references from current tab...']
          });

          const base64Image = await VisionClient.captureAndProcessScreenshot();
          if (base64Image) {
            const visionData = await VisionClient.analyzeScreenshot(base64Image);
            if (visionData) {
              finalPromptToSend = PromptComposer.composeFinalPrompt(visionData, fullPrompt);
            }
          }
        }
      }

      chrome.runtime.sendMessage({
        type: 'START_AGENT_TASK',
        prompt: finalPromptToSend,
        history: history,
        imageAttachments: imageDataUrls || [],
        isAgentic: targetAgentic,
        isWebSearchEnabled: targetWebSearch,
        isShoppingMode: targetShopping,
        isImageGen: targetImage
      });
      setCurrentAgentStatus('thinking');
    }
  };

  // --- Shopping Action Handlers ---
  const handleResearchMore = (originalQuery, additionalPrefs) => {
    const newQuery = `${originalQuery} ${additionalPrefs}`;
    chrome.runtime.sendMessage({
      type: 'START_AGENT_TASK',
      prompt: newQuery,
      history: [],
      isAgentic: false,
      isWebSearchEnabled: false,
      isShoppingMode: true,
      isImageGen: false
    });
    setCurrentAgentStatus('thinking');
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
    chrome.runtime.sendMessage({ type: 'STOP_AGENT_TASK' });
    setCurrentAgentStatus('idle');
    setAgentActivity(null);
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'system',
      message: '🛑 Task stopped by user.',
      timestamp: new Date()
    }]);
  };

  const handleClearAll = async () => {
    try {
      const currentIndex = await StorageService.get('conversations_index', []);
      for (const conv of currentIndex) {
        await StorageService.remove(`conversation_${conv.id}`);
      }
      await StorageService.set('conversations_index', []);
      await StorageService.remove('last_active_conversation_id');
      setConversations([]);
      setMessages([]);
      const newId = `conv-${Date.now()}`;
      setActiveConversationId(newId);
    } catch (e) {
      console.error("Clear all failed", e);
    }
  };

  const handleNewConversation = useCallback(() => {
    setMessages([]);
    const newId = `conv-${Date.now()}`;
    setActiveConversationId(newId);
    setAgentActivity(null);
    setCurrentAgentStatus('idle');
    setConversations(prev => [{ id: newId, title: 'New Conversation', timestamp: new Date().toISOString() }, ...prev]);
  }, []);

  const handleSelectConversation = (id) => {
    setActiveConversationId(id);
    setSidebarOpen(false);
  };

  // Retry Handler
  const handleRetry = (msgIndex) => {
    let targetUserMsg = null;
    for (let i = msgIndex; i >= 0; i--) {
      if (messages[i] && messages[i].sender === 'user') {
        targetUserMsg = messages[i];
        break;
      }
    }

    if (targetUserMsg) {
      handleSendMessage({ text: targetUserMsg.message, attachments: targetUserMsg.attachments || [] });
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
      setIsWebSearchEnabled(false);
      setIsAgenticMode(true);
      handleSendMessage({
        text: "I want to shop for something...",
        attachments: [],
        modeOverrides: { isWebSearch: false, isShopping: true, isAgentic: true, isImage: false }
      });
    } else if (action === 'research') {
      setIsWebSearchEnabled(true);
      setIsShoppingMode(false);
      setIsAgenticMode(true);
      handleSendMessage({
        text: "I need to research...",
        attachments: [],
        modeOverrides: { isWebSearch: true, isShopping: false, isAgentic: true, isImage: false }
      });
    } else if (action === 'automation') {
      setIsAgenticMode(true);
      handleSendMessage({
        text: "I want to automate a task...",
        attachments: [],
        modeOverrides: { isWebSearch: false, isShopping: false, isAgentic: true, isImage: false }
      });
    } else if (action === 'image') {
      setIsImageGenEnabled(true);
      handleSendMessage({
        text: "Generate an image of...",
        attachments: [],
        modeOverrides: { isWebSearch: false, isShopping: false, isAgentic: false, isImage: true }
      });
    }
  };

  if (loadingSession) {
    return <div className="h-full bg-black flex items-center justify-center text-neon-cyan font-mono animate-pulse">SYSTEM INITIALIZING...</div>;
  }

  return (
    <>
      {/* Voice Agent Overlay - Portaled to body to escape GlassLayout overflow */}
      {isVoiceMode && createPortal(
        <VoiceOverlay
          isOpen={isVoiceMode}
          onClose={handleVoiceClose}
          status={voiceStatus}
          transcript={voiceTranscript}
          messages={voiceMessages}
          currentLang={voiceLang}
          onLanguageChange={(lang) => {
            setVoiceLang(lang);
            VoiceService.setLanguage(lang);
          }}


          isSongMode={isSongMode}
          onToggleSongMode={toggleSongMode}
        />,
        document.body
      )}

      <GlassLayout
        level={userLevel}
        xp={userXP}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onNewChat={handleNewConversation}
      >
        <div className="flex-1 flex flex-col h-full overflow-hidden relative text-[110%]">

          {/* Scrollable Chat Area */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-1 py-4 scroll-smooth">
            <div className="max-w-4xl mx-auto pb-4 min-h-full flex flex-col justify-end">

              {/* Show Agent Command Panel if no messages - REMOVED per user request for clean UI */}
              {messages.length === 0 && (
                <div className="flex-1 flex flex-col justify-center items-center opacity-70">
                  {/* Optional: Add a subtle logo or text if needed, but user asked for clean */}
                  <div className="text-neon-cyan font-heading text-2xl tracking-[0.3em] animate-pulse drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] opacity-100 font-bold relative text-center">
                    SYSTEM ONLINE
                  </div>

                  {isImageGenEnabled && (
                    <div className="mt-8 flex flex-col items-center gap-3 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">

                      <div className="w-full bg-white/5 border border-white/10 p-3 rounded-lg mb-2 text-center text-[10px] text-white/70">
                        <span className="opacity-100">💡</span> <strong>Vision Guide:</strong> If generating from a reference photo on screen, please keep the page steady and ensure the image is fully visible.
                      </div>

                      <div className="w-full bg-neon-cyan/5 border border-neon-cyan/20 p-3 rounded-lg border-l-2 border-l-neon-cyan mb-2 text-left text-[10px] text-white/80 transition-all hover:bg-neon-cyan/10 flex flex-col gap-1">
                        <div className="font-bold flex items-center gap-1"><span className="text-[12px]">ℹ️</span> Free Tier API Rate Limits</div>
                        <div className="pl-4 font-mono space-y-1 mt-1 text-white/60">
                          <div>• <span className="text-neon-cyan">provider-6/llama-4-scout-17b-16e-instruct</span>:<br />  <b>64 reqs/day</b></div>
                          <div>• <span className="text-neon-cyan">provider-6/llama-4-maverick-17b-128e-instruct</span>:<br />  <b>26 reqs/day</b></div>
                        </div>
                      </div>

                      <h3 className="text-neon-magenta text-xs font-mono mb-2 tracking-widest uppercase opacity-80">Pre-Prompts</h3>
                      <button onClick={() => handleSendMessage({ text: "Generate a futuristic neon city skyline at night", attachments: [] })} className="w-full text-sm text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-neon-magenta/50 rounded-xl transition-all shadow-sm hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] text-white/90">
                        🌆 Futuristic neon city skyline at night
                      </button>
                      <button onClick={() => handleSendMessage({ text: "Create a highly detailed 3D render of a cute astronaut cat", attachments: [] })} className="w-full text-sm text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-neon-magenta/50 rounded-xl transition-all shadow-sm hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] text-white/90">
                        🐱 Detailed 3D render of a cute astronaut cat
                      </button>
                      <button onClick={() => handleSendMessage({ text: "A cinematic wide shot of a mythical forest with glowing plants", attachments: [] })} className="w-full text-sm text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-neon-magenta/50 rounded-xl transition-all shadow-sm hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] text-white/90">
                        🌲 Cinematic wide shot of a mythical forest
                      </button>
                    </div>
                  )}
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
                    <>
                      <MessageBubble
                        message={{
                          role: msg.sender === 'user' ? 'user' : 'assistant',
                          content: msg.message,
                          timestamp: msg.timestamp,
                          isVoice: msg.isVoice || false,
                          attachments: msg.attachments || [],
                          metadata: msg.agentStatus ? { type: 'agent_activity', activity: msg.agentStatus, status: 'active' } : undefined
                        }}
                        isLast={true}
                        onRetry={() => handleRetry(messages.indexOf(msg))}
                        onEdit={(newText) => handleEdit(newText)}
                        onRemix={(promptMod) => {
                          setIsImageGenEnabled(true);
                          setIsAgenticMode(false);
                          setIsWebSearchEnabled(false);
                          setIsShoppingMode(false);
                          handleSendMessage({
                            text: promptMod,
                            attachments: []
                          });
                        }}
                      />
                      {msg.needsProceed && !msg.shoppingActionTaken && (
                        <div className="mt-2 ml-4 mb-4">
                          <button
                            onClick={() => {
                              handleSendMessage({
                                text: "PROCEED_TO_WEB_SEARCH",
                                attachments: [],
                                modeOverrides: { isWebSearch: false, isShopping: true, isAgentic: false, isImage: false }
                              });
                              setMessages(prev => prev.map(m =>
                                m.id === msg.id ? { ...m, shoppingActionTaken: true } : m
                              ));
                            }}
                            className="px-4 py-2 bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 rounded font-mono text-[11px] shadow-sm transition-all flex items-center gap-2"
                          >
                            <span>🌐</span> Ready to proceed for web search?
                          </button>
                        </div>
                      )}
                      {msg.logs && msg.logs.length > 0 && (
                        <CollapsibleReasoning
                          logs={msg.logs}
                          status="completed"
                          isExpanded={false}
                          estimatedTime={0}
                        />
                      )}
                      {msg.isShopping && (
                        <ShoppingActionCard
                          products={msg.products}
                          winnerProduct={msg.winnerProduct}
                          winnerUrl={msg.winnerUrl}
                          onAddToCart={(url) => handleAddToCart(url || msg.winnerUrl)}
                          onCompare={(url, name) => handleCompare(url || msg.winnerUrl, name || msg.winnerProduct)}
                        />
                      )}
                    </>
                  )}
                </div>
              ))}

              {agentActivity && (
                <div className="mb-6">
                  {isImageGenEnabled ? (
                    <ImageGenLoader
                      status={agentActivity.status}
                      currentMessage={agentActivity.activity || 'Generating Image...'}
                    />
                  ) : ((!isAgenticMode && !isWebSearchEnabled && !isShoppingMode && agentActivity.agentType === 'thinking') ||
                    (isShoppingMode && agentActivity.activity === 'Analyzing user constraints...')) ? (
                    <CollapsibleReasoning
                      logs={agentLogs}
                      status="thinking"
                      isExpanded={true}
                      estimatedTime={15}
                    />
                  ) : (
                    <CollapsibleReasoning
                      logs={agentLogs}
                      status={agentActivity.status}
                      isExpanded={true}
                      estimatedTime={120}
                    />
                  )}
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
                setIsImageGenEnabled(prev => !prev);
                setIsWebSearchEnabled(false);
                setIsShoppingMode(false);
                setIsAgenticMode(false);
              }}
              isWebSearchEnabled={isWebSearchEnabled}
              toggleWebSearch={() => {
                if (!session) return alert("Please Log In.");
                setIsWebSearchEnabled(prev => !prev);
                setIsImageGenEnabled(false);
                setIsShoppingMode(false);
                setIsAgenticMode(false);
              }}
              isShoppingMode={isShoppingMode}
              toggleShopping={() => {
                if (!session) return alert("Please Log In.");
                setIsShoppingMode(prev => !prev);
                setIsImageGenEnabled(false);
                setIsWebSearchEnabled(false);
                setIsAgenticMode(false);
              }}
              isAgenticMode={isAgenticMode}
              toggleAgentic={() => {
                if (!session) return alert("Please Log In.");
                setIsAgenticMode(prev => !prev);
                setIsImageGenEnabled(false);
                setIsWebSearchEnabled(false);
                setIsShoppingMode(false);
              }}
            />

            {/* Hidden File Input */}
            <input
              type="file"
              multiple
              ref={fileInputRef}
              className="hidden"
              accept="image/*,video/*,.pdf,.doc,.docx,.txt,.md,.json,.csv,.xlsx,.xls,.js,.jsx,.ts,.tsx,.py,.html,.css,.xml,.yaml,.yml,.log,.sh,.bat,.c,.cpp,.java,.rb,.go,.rs,.swift,.kt"
              onChange={(e) => {
                if (e.target.files?.length) {
                  const files = Array.from(e.target.files);
                  const newAttachments = files.map(file => ({
                    name: file.name,
                    type: ContentReader.categorizeFile(file),
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

            {/* Model Selector Trigger */}
            <div className="relative px-2 mb-1 flex justify-between items-center w-full">
              <div className="flex items-center">
                <ModelSelector
                  isOpen={isModelSelectorOpen}
                  onClose={() => setIsModelSelectorOpen(false)}
                  isImageMode={isImageGenEnabled}
                  currentTextModel={activeModel}
                  currentImageModel={activeImageModel}
                  onModelSelect={handleModelSelect}
                />
                <button
                  onClick={() => setIsModelSelectorOpen(!isModelSelectorOpen)}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 border border-white/5 text-[10px] font-mono text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all backdrop-blur-sm"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isImageGenEnabled ? 'bg-neon-magenta shadow-[0_0_5px_#f0f]' : 'bg-neon-cyan shadow-[0_0_5px_#0ff]'}`}></span>
                  <span className="truncate max-w-[150px]">{isImageGenEnabled ? (activeImageModel || 'Default Image') : (activeModel || 'Default Model')}</span>
                  <ChevronUp size={10} className={`transition-transform ${isModelSelectorOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {isImageGenEnabled && (
                <button
                  onClick={handleReverseEngineer}
                  title="Reverse Engineering analyzes an image on your screen and extracts a detailed generative prompt (recipes like camera gear, style, subject) that you can use to recreate it."
                  className="text-[10px] px-2 py-1 bg-neon-cyan/10 hover:bg-neon-cyan/30 border border-neon-cyan/50 text-neon-cyan rounded transition-all shadow-sm flex items-center gap-1 group ml-2"
                >
                  <span>🔍</span>
                  <span className="font-bold tracking-wide">Rev Eng Screen</span>
                </button>
              )}

              {/* Voice Agent Button */}
              <button
                onClick={handleVoiceMicClick}
                title="Open Voice Agent (multilingual voice assistant)"
                className={`text-[10px] px-2 py-1 rounded transition-all shadow-sm flex items-center gap-1 ml-auto ${isVoiceMode
                    ? 'bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400'
                    : 'bg-neon-magenta/10 hover:bg-neon-magenta/30 border border-neon-magenta/50 text-neon-magenta'
                  }`}
              >
                <span>🎙️</span>
                <span className="font-bold tracking-wide">{isVoiceMode ? 'Close Voice' : 'Voice Agent'}</span>
              </button>
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
            onClearAll={handleClearAll}
          />
        </div>
      </GlassLayout>
    </>
  );
};

export default MainChatInterface;