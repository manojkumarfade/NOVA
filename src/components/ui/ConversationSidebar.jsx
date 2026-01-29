import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ConversationSidebar = ({ 
  isOpen = false,
  onToggle,
  conversations = [],
  activeConversationId = null,
  onSelectConversation,
  onNewConversation,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations?.filter(conv => 
    conv?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    conv?.preview?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date?.toLocaleDateString();
  };

  return (
    <>
      <button
        onClick={onToggle}
        className="fixed top-20 left-4 z-[150] lg:hidden p-2 rounded-md bg-card border border-border elevation-md transition-base hover:bg-muted"
        aria-label="Toggle conversation sidebar"
      >
        <Icon name={isOpen ? 'X' : 'MessageSquare'} size={20} />
      </button>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[140] bg-background lg:hidden"
          onClick={onToggle}
        />
      )}
      <aside className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-80 z-[145]
        bg-card border-r border-border
        transition-transform duration-250 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        ${className}
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Conversations
            </h2>
            <Button
              variant="ghost"
              size="icon"
              iconName="Plus"
              onClick={onNewConversation}
              className="h-8 w-8"
            />
          </div>

          <div className="p-4 border-b border-border">
            <div className="relative">
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-base"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <Icon name="MessageSquare" size={48} className="text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  {searchQuery ? 'No conversations found' : 'No conversations yet'}
                </p>
              </div>
            ) : (
              <div className="flex flex-col">
                {filteredConversations?.map((conversation) => (
                  <button
                    key={conversation?.id}
                    onClick={() => {
                      onSelectConversation(conversation?.id);
                      if (window.innerWidth < 1024) {
                        onToggle();
                      }
                    }}
                    className={`
                      flex flex-col gap-1 p-4 text-left border-b border-border
                      transition-base hover:bg-muted
                      ${activeConversationId === conversation?.id ? 'bg-muted' : ''}
                    `}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-caption font-medium text-foreground line-clamp-1">
                        {conversation?.title}
                      </h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatTimestamp(conversation?.timestamp)}
                      </span>
                    </div>
                    {conversation?.preview && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {conversation?.preview}
                      </p>
                    )}
                    {conversation?.messageCount && (
                      <div className="flex items-center gap-1 mt-1">
                        <Icon name="MessageCircle" size={12} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {conversation?.messageCount} messages
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default ConversationSidebar;