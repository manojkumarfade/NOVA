import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import TabCard from './TabCard';

const TabGroup = ({ 
  group,
  onToggleExpand,
  onRenameGroup,
  onDeleteGroup,
  onRemoveFromGroup,
  onTabSelect,
  onTabClose,
  onTabGroup,
  onTabBookmark,
  onTabShare,
  onTabNavigate,
  selectedTabs = [],
  className = ''
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [groupName, setGroupName] = useState(group?.name);

  const handleRename = () => {
    if (groupName?.trim() && groupName !== group?.name) {
      onRenameGroup(group?.id, groupName?.trim());
    }
    setIsEditing(false);
  };

  const groupColors = {
    blue: 'bg-primary/10 border-primary/30 text-primary',
    purple: 'bg-secondary/10 border-secondary/30 text-secondary',
    green: 'bg-accent/10 border-accent/30 text-accent',
    orange: 'bg-warning/10 border-warning/30 text-warning',
    red: 'bg-error/10 border-error/30 text-error'
  };

  const colorClass = groupColors?.[group?.color] || groupColors?.blue;

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden ${className}`}>
      <div className={`flex items-center justify-between gap-3 p-4 md:p-5 border-b border-border ${colorClass}`}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            iconName={group?.isExpanded ? 'ChevronDown' : 'ChevronRight'}
            onClick={() => onToggleExpand(group?.id)}
            className="h-8 w-8 flex-shrink-0"
          />

          {isEditing ? (
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e?.target?.value)}
              onBlur={handleRename}
              onKeyDown={(e) => {
                if (e?.key === 'Enter') handleRename();
                if (e?.key === 'Escape') {
                  setGroupName(group?.name);
                  setIsEditing(false);
                }
              }}
              className="flex-1 px-2 py-1 bg-background border border-border rounded-md text-sm font-caption font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              autoFocus
            />
          ) : (
            <h3 
              className="text-base md:text-lg font-heading font-semibold flex-1 min-w-0 truncate cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              {group?.name}
            </h3>
          )}

          <span className="px-2 py-1 rounded-md bg-background/50 text-xs font-caption font-medium whitespace-nowrap">
            {group?.tabs?.length} {group?.tabs?.length === 1 ? 'tab' : 'tabs'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            iconName="Edit2"
            onClick={() => setIsEditing(true)}
            className="h-8 w-8"
          />
          <Button
            variant="ghost"
            size="icon"
            iconName="Trash2"
            onClick={() => onDeleteGroup(group?.id)}
            className="h-8 w-8 text-error hover:text-error"
          />
        </div>
      </div>
      {group?.isExpanded && (
        <div className="p-4 md:p-5 space-y-3">
          {group?.tabs?.map((tab) => (
            <div key={tab?.id} className="relative">
              <TabCard
                tab={tab}
                isSelected={selectedTabs?.includes(tab?.id)}
                onSelect={onTabSelect}
                onClose={onTabClose}
                onGroup={onTabGroup}
                onBookmark={onTabBookmark}
                onShare={onTabShare}
                onNavigate={onTabNavigate}
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => onRemoveFromGroup(group?.id, tab?.id)}
                className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-base"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TabGroup;