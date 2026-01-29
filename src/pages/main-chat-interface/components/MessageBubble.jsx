import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MessageBubble = ({ 
  message,
  isUser = false,
  timestamp,
  attachments = [],
  agentStatus = null
}) => {
  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`flex gap-3 md:gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4 md:mb-6`}>
      <div className={`
        flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center
        ${isUser ? 'bg-primary' : 'bg-secondary/10'}
      `}>
        <Icon 
          name={isUser ? 'User' : 'Bot'} 
          size={20} 
          color={isUser ? 'var(--color-primary-foreground)' : 'var(--color-secondary)'}
        />
      </div>
      <div className={`flex-1 max-w-[85%] md:max-w-[75%] lg:max-w-[65%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
        <div className={`
          px-4 py-3 md:px-5 md:py-4 rounded-lg
          ${isUser 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-card border border-border'
          }
        `}>
          <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
            {message}
          </p>

          {attachments?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {attachments?.map((attachment, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/50 border border-border"
                >
                  <Icon 
                    name={attachment?.type === 'image' ? 'Image' : 'FileText'} 
                    size={16}
                    className="text-muted-foreground"
                  />
                  <span className="text-xs font-caption truncate max-w-[150px]">
                    {attachment?.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`flex items-center gap-2 px-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-xs text-muted-foreground">
            {formatTime(timestamp)}
          </span>
          {agentStatus && (
            <div className="flex items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${
                agentStatus === 'planning' ? 'bg-secondary animate-pulse' :
                agentStatus === 'navigating' ? 'bg-primary animate-pulse' :
                agentStatus === 'validating'? 'bg-accent animate-pulse' : 'bg-muted-foreground'
              }`} />
              <span className="text-xs text-muted-foreground capitalize">
                {agentStatus}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;