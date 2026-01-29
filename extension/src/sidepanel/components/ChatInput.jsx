import React, { useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, StopCircle, Plus, Wand2 } from 'lucide-react';

const ChatInput = ({
  onSendMessage,
  disabled,
  value,
  onChange,
  onVoiceToggle,
  isRecording,
  attachments = [],
  onRemoveAttachment,
  onAddAttachments,
  isProcessing,
  onStop,
  onPlusClick,
  onEnhance,
  isEnhancing
}) => {
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() || attachments.length > 0) {
        onSendMessage({ text: value, attachments });
      }
    }
  };

  return (
    <div className="relative w-full px-2 pb-2">
      {/* Glass Container */}
      <div className={`
                relative flex items-end gap-2 p-2 
                rounded-2xl border transition-all duration-300
                glass-panel
                ${isRecording ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-neon-cyan/30 hover:border-neon-cyan/60 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]'}
            `}>

        {/* Plus / More Actions Button */}
        <button
          onClick={onPlusClick}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neon-cyan transition-colors"
          title="Add content"
        >
          <Plus size={18} />
        </button>

        {/* Input Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <div className="flex gap-2 mb-2 overflow-x-auto py-1 px-1">
              {attachments.map((file, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded text-xs text-white border border-white/10">
                  <span className="truncate max-w-[80px]">{file.name}</span>
                  <button
                    onClick={() => onRemoveAttachment(i)}
                    className="hover:text-red-400"
                  >×</button>
                </div>
              ))}
            </div>
          )}

          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isRecording ? "Listening..." : "Command the agent..."}
            disabled={disabled}
            rows={1}
            className="w-full bg-transparent border-none text-sm text-white placeholder-gray-400 focus:ring-0 resize-none py-2.5 max-h-[120px]"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-end gap-1">
          {/* Mic Button */}
          <button
            onClick={onVoiceToggle}
            className={`p-2.5 rounded-xl transition-all duration-300 ${isRecording ? 'text-red-500 bg-red-500/10 animate-pulse' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            title="Voice Input"
          >
            <Mic size={18} />
          </button>

          {/* Enhance Prompt Button */}
          {onEnhance && (
            <button
              onClick={onEnhance}
              disabled={!value || value.trim().length === 0 || isEnhancing}
              className={`p-2.5 rounded-xl transition-all duration-300 ${isEnhancing ? 'text-neon-magenta animate-pulse' : 'text-gray-400 hover:text-neon-magenta hover:bg-neon-magenta/10'}`}
              title="Enhance Prompt (AI)"
            >
              <Wand2 size={18} />
            </button>
          )}

          {/* Send / Stop Button */}
          {isProcessing ? (
            <button
              onClick={onStop}
              className="p-2.5 rounded-xl bg-red-500/80 hover:bg-red-600 text-white shadow-lg transition-all hover:scale-105"
            >
              <StopCircle size={18} className="animate-pulse" />
            </button>
          ) : (
            <button
              onClick={() => {
                if (value.trim() || attachments.length > 0) {
                  onSendMessage({ text: value, attachments });
                }
              }}
              disabled={!value.trim() && attachments.length === 0}
              className={`
                                p-2.5 rounded-xl transition-all duration-300 transform
                                ${value.trim() || attachments.length > 0
                  ? 'bg-neon-cyan text-black shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:scale-105 hover:bg-cyan-300'
                  : 'bg-white/5 text-gray-500 cursor-not-allowed'}
                            `}
            >
              <Send size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Glow Line */}
      <div className="absolute -bottom-1 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent blur-[2px]"></div>
    </div>
  );
};

export default ChatInput;
