import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, RotateCcw, ThumbsUp, ThumbsDown, Bot, User, Terminal, Volume2, Square } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AgentActivityCard from './AgentActivityCard';
import PlanReviewCard from './PlanReviewCard';

const MessageBubble = ({ message, onRetry, onEdit }) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);
  const [expandedImage, setExpandedImage] = useState(null);

  useEffect(() => {
    setEditedContent(message.content);
  }, [message.content]);

  const handleSaveEdit = () => {
    if (onEdit && editedContent.trim() !== message.content) {
      onEdit(editedContent);
    }
    setIsEditing(false);
  };

  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechRef = useRef(null);

  // Helper to clean markdown for natural speech
  const cleanTextForSpeech = (text) => {
    if (!text) return '';
    let clean = text;

    // 1. Remove Code Blocks (```code```)
    clean = clean.replace(/```[\s\S]*?```/g, "Code snippet provided.");

    // 2. Remove Inline Code (`code`)
    clean = clean.replace(/`([^`]+)`/g, "$1");

    // 3. Remove Links ([text](url)) -> text
    clean = clean.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");

    // 4. Remove Raw URLs (http://...) -> "Link"
    clean = clean.replace(/(https?:\/\/[^\s]+)/g, "Link");

    // 5. Remove Bold/Italic (**text**, *text*)
    clean = clean.replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, "$1");

    // 6. Remove Markdown Headers (# Header)
    clean = clean.replace(/^#+\s+/gm, "");

    // 7. Remove Hashtags (#Tag) - Remove the '#' symbol
    clean = clean.replace(/#(\w+)/g, "$1");

    // 8. Remove Blockquotes (>)
    clean = clean.replace(/^>\s+/gm, "");

    // 9. Compress whitespace
    clean = clean.replace(/\s+/g, " ").trim();

    return clean;
  };

  useEffect(() => {
    // Cleanup speech on unmount
    return () => {
      if (speechRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const rawText = typeof message.content === 'string' ? message.content : '';
    const textToSpeak = cleanTextForSpeech(rawText) || 'Content not available for speech.';

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Select Voice
    const voices = window.speechSynthesis.getVoices();
    // Prioritize known good female voices or just 'female'
    const femaleVoice = voices.find(v =>
      v.name.includes('Zira') ||
      v.name.includes('Google US English') ||
      v.name.includes('Samantha') ||
      v.name.toLowerCase().includes('female')
    );

    if (femaleVoice) {
      utterance.voice = femaleVoice;
      // Adjust pitch slightly higher for Nova if generic
      if (!femaleVoice.name.includes('Zira')) utterance.pitch = 1.1;
    }

    utterance.onend = () => {
      setIsSpeaking(false);
      speechRef.current = null;
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      speechRef.current = null;
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleDownload = (e, url) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = url;
    link.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Image Renderer with Actions
  const ImageRenderer = ({ src, alt }) => {
    return (
      <div className="relative group/image my-2 inline-block max-w-full">
        <img
          src={src}
          alt={alt}
          className="max-w-full rounded-lg shadow-lg border border-white/10 cursor-pointer"
          style={{ maxHeight: '300px', objectFit: 'contain' }}
          loading="lazy"
          onClick={() => setExpandedImage(src)}
        />
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover/image:opacity-100 transition-opacity bg-black/60 rounded-lg p-1 backdrop-blur-sm">
          <button
            onClick={(e) => handleDownload(e, src)}
            className="p-1.5 hover:bg-white/20 rounded text-white transition-colors"
            title="Download"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
          </button>
          <button
            onClick={() => setExpandedImage(src)}
            className="p-1.5 hover:bg-white/20 rounded text-white transition-colors"
            title="View Fullscreen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" x2="14" y1="3" y2="10" /><line x1="3" x2="10" y1="21" y2="14" /></svg>
          </button>
        </div>
      </div>
    );
  };

  // Determine the glow color based on message type/role
  const glowColor = isUser ? 'neon-blue' : 'neon-cyan';
  const borderColor = isUser ? 'border-neon-blue/40' : 'border-neon-cyan/40';

  // Increased opacity for better readability against video background
  // User: Dark blue tint, semi-transparent
  // System: Darker black/cyan tint, semi-transparent
  const bgColor = isUser
    ? 'bg-slate-900/60 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]'
    : 'bg-black/70 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]';

  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.3, ease: "backOut" }}
        className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
      >
        <div className={`
                relative max-w-[85%] rounded-2xl p-4 group
                ${bgColor} backdrop-blur-md 
                border ${borderColor}
                shadow-[0_4px_16px_rgba(0,0,0,0.2)]
                ${!isUser ? 'rounded-tl-none shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'rounded-tr-none shadow-[0_0_15px_rgba(59,130,246,0.1)]'}
            `}>

          {/* Header / Meta Info & Actions */}
          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/5 opacity-80 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2">
              {isUser ? (
                <>
                  <span className="text-[10px] font-mono text-neon-blue/70">COMMANDER</span>
                  <User className="w-3 h-3 text-neon-blue" />
                </>
              ) : (
                <>
                  <Bot className="w-3 h-3 text-neon-cyan" />
                  <span className="text-[10px] font-mono text-neon-cyan/70">CORE SYSTEM</span>
                </>
              )}
              {message.timestamp && (
                <span className="text-[10px] text-gray-400 ml-2 font-mono">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </div>

            {/* Action Buttons (Copy/Edit/Speak) - Visible on Hover */}
            {!isEditing && (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={handleSpeak}
                  className={`p-1 hover:bg-white/10 rounded transition-colors ${isSpeaking ? 'text-neon-cyan animate-pulse' : 'text-white/50 hover:text-white'}`}
                  title={isSpeaking ? "Stop Speaking" : "Read Aloud"}
                >
                  {isSpeaking ? <Square size={12} fill="currentColor" /> : <Volume2 size={12} />}
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(typeof message.content === 'string' ? message.content : '')}
                  className="p-1 hover:bg-white/10 rounded transition-colors text-white/50 hover:text-white"
                  title="Copy"
                >
                  <Copy size={12} />
                </button>
                {isUser && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 hover:bg-white/10 rounded transition-colors text-white/50 hover:text-white"
                    title="Edit"
                  >
                    <Terminal size={12} />
                  </button>
                )}
                <button
                  onClick={() => onRetry && onRetry()}
                  className="p-1 hover:bg-white/10 rounded transition-colors text-white/50 hover:text-white"
                  title="Regenerate"
                >
                  <RotateCcw size={12} />
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className={`text-sm ${isUser ? 'text-white font-body' : 'text-gray-100 font-body'}`}>
            {isEditing ? (
              <div className="flex flex-col gap-2">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-neon-cyan/50 min-h-[60px]"
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button onClick={() => setIsEditing(false)} className="text-xs px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-gray-300">Cancel</button>
                  <button onClick={handleSaveEdit} className="text-xs px-2 py-1 bg-neon-cyan/20 hover:bg-neon-cyan/30 text-neon-cyan border border-neon-cyan/50 rounded">Save & Submit</button>
                </div>
              </div>
            ) : (
              <>
                {message.content && typeof message.content === 'string' ? (
                  <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        img: ({ node, ...props }) => <ImageRenderer src={props.src} alt={props.alt} />
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  // Fallback for non-string content (Prevents Error #31)
                  typeof message.content === 'object' ? JSON.stringify(message.content, null, 2) : String(message.content)
                )}

                {/* Agent Specific UI Elements */}
                {message.metadata?.type === 'agent_activity' && (
                  <div className="mt-3">
                    <AgentActivityCard
                      activity={message.metadata.activity}
                      status={message.metadata.status || 'in_progress'}
                    />
                  </div>
                )}

                {message.metadata?.type === 'implementation_plan_review' && (
                  <div className="mt-3">
                    <PlanReviewCard plan={message.metadata.plan} />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Decorative Line (Tech accent) */}
          {!isEditing && <div className={`absolute bottom-0 ${isUser ? 'right-0 w-1/3' : 'left-0 w-1/3'} h-[1px] bg-gradient-to-r from-transparent via-${isUser ? 'neon-blue' : 'neon-cyan'} to-transparent opacity-50`}></div>}

        </div>
      </motion.div>

      {/* Fullscreen Image Modal */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-full max-h-full flex items-center justify-center">
            <img
              src={expandedImage}
              alt="Extended View"
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white bg-black/50 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <button
              onClick={(e) => handleDownload(e, expandedImage)}
              className="absolute -top-12 right-12 p-2 text-white/70 hover:text-white mr-2 bg-black/50 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageBubble;
