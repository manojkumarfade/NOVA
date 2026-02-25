import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import { Mic } from 'lucide-react';
import Button from './Button';
import { StorageService } from '../../../services/StorageService';

const ConversationSidebar = ({
  isOpen = false,
  onToggle,
  activeConversationId = null,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onClearAll,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const loadConversations = async () => {
      try {
        const storedConvs = await StorageService.get('conversations_index', []);
        if (Array.isArray(storedConvs)) {
          setConversations(storedConvs);
        }
      } catch (e) {
        console.error("Sidebar load failed", e);
      }
    };
    if (isOpen) {
      loadConversations();
    }
  }, [isOpen]);

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
      {isOpen && (
        <div
          className="fixed inset-0 z-[140] bg-black/60 backdrop-blur-sm transition-all"
          onClick={onToggle}
        />
      )}
      <aside className={`
        fixed top-0 left-0 h-full w-80 z-[145]
        bg-black/95 border-r border-neon-cyan/20
        transition-transform duration-300 ease-in-out shadow-[10px_0_20px_rgba(0,0,0,0.5)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${className}
      `}>
        <div className="flex flex-col h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900/40 to-transparent">
          <div className="flex items-center justify-between p-5 border-b border-neon-cyan/10">
            <div className="flex flex-col">
              <h2 className="text-xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white tracking-wider">
                HISTORY
              </h2>
              <span className="text-[10px] font-mono text-neon-cyan/50 tracking-[0.2em] uppercase">Conversation Logs</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (window.confirm('WIPE ALL MEMORY? This action is permanent.')) {
                    onClearAll();
                  }
                }}
                className="p-1.5 rounded border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/60 transition-all group"
                title="Clear All History"
              >
                <Icon name="Trash2" size={16} className="group-hover:scale-110" />
              </button>
              <button
                onClick={onToggle}
                className="p-1.5 rounded border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all"
                title="Close"
              >
                <Icon name="X" size={18} />
              </button>
            </div>
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
                      group relative flex flex-col gap-1 p-4 text-left border-b border-border
                      transition-base hover:bg-muted
                      ${activeConversationId === conversation?.id ? 'bg-muted' : ''}
                    `}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-caption font-medium text-foreground line-clamp-1">
                        {conversation?.title}
                      </h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1">
                        {conversation?.hasVoiceMessages && <Mic size={10} className="text-neon-cyan" title="Voice chat" />}
                        {formatTimestamp(conversation?.timestamp)}
                      </span>
                    </div>
                    {conversation?.preview && (
                      <p className="text-xs text-muted-foreground line-clamp-2 pr-6">
                        {conversation?.preview}
                      </p>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Delete this chat?')) {
                          onDeleteConversation(conversation.id);
                        }
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
                      title="Delete Chat"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
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