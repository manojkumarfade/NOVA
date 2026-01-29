import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInput = ({ 
  onSendMessage,
  onVoiceToggle,
  isRecording = false,
  disabled = false,
  placeholder = "Ask me to navigate, search, or explain anything..."
}) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() || attachments?.length > 0) {
      onSendMessage({ 
        text: message?.trim(), 
        attachments: attachments 
      });
      setMessage('');
      setAttachments([]);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    const newAttachments = files?.map(file => ({
      name: file?.name,
      type: file?.type?.startsWith('image/') ? 'image' : 'document',
      size: file?.size,
      file: file
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
    e.target.value = '';
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev?.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-border bg-card">
      {attachments?.length > 0 && (
        <div className="px-4 md:px-6 pt-3 flex flex-wrap gap-2">
          {attachments?.map((attachment, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted border border-border"
            >
              <Icon 
                name={attachment?.type === 'image' ? 'Image' : 'FileText'} 
                size={16}
                className="text-muted-foreground"
              />
              <span className="text-xs font-caption truncate max-w-[120px] md:max-w-[200px]">
                {attachment?.name}
              </span>
              <button
                onClick={() => removeAttachment(index)}
                className="ml-1 hover:text-error transition-base"
                aria-label="Remove attachment"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="p-4 md:p-6">
        <div className="flex items-end gap-2 md:gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*,.pdf,.doc,.docx"
            multiple
            className="hidden"
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            iconName="Paperclip"
            onClick={() => fileInputRef?.current?.click()}
            disabled={disabled}
            className="flex-shrink-0 h-10 w-10 md:h-11 md:w-11"
          />

          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              rows={1}
              className="w-full px-4 py-3 md:px-5 md:py-3.5 bg-muted border border-border rounded-lg text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-base resize-none min-h-[44px] max-h-[120px] overflow-y-auto"
              style={{ 
                height: 'auto',
                minHeight: '44px'
              }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e?.target?.scrollHeight, 120) + 'px';
              }}
            />
          </div>

          <Button
            type="button"
            variant={isRecording ? 'destructive' : 'ghost'}
            size="icon"
            iconName={isRecording ? 'MicOff' : 'Mic'}
            onClick={onVoiceToggle}
            disabled={disabled}
            className="flex-shrink-0 h-10 w-10 md:h-11 md:w-11"
          />

          <Button
            type="submit"
            variant="default"
            size="icon"
            iconName="Send"
            disabled={disabled || (!message?.trim() && attachments?.length === 0)}
            className="flex-shrink-0 h-10 w-10 md:h-11 md:w-11"
          />
        </div>
      </form>
    </div>
  );
};

export default ChatInput;