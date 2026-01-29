import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const TabCard = ({ 
  tab,
  isSelected = false,
  onSelect,
  onClose,
  onGroup,
  onBookmark,
  onShare,
  onNavigate,
  className = ''
}) => {
  const [showFullSummary, setShowFullSummary] = useState(false);

  const getDomainColor = (url) => {
    const colors = [
      'bg-primary/10 text-primary',
      'bg-secondary/10 text-secondary',
      'bg-accent/10 text-accent',
      'bg-warning/10 text-warning'
    ];
    const hash = url?.split('')?.reduce((acc, char) => acc + char?.charCodeAt(0), 0);
    return colors?.[hash % colors?.length];
  };

  const truncateUrl = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj?.hostname?.replace('www.', '');
    } catch {
      return url;
    }
  };

  return (
    <div className={`
      group relative bg-card border border-border rounded-lg overflow-hidden
      transition-base hover:elevation-md
      ${isSelected ? 'ring-2 ring-primary' : ''}
      ${className}
    `}>
      <div className="flex items-start gap-3 p-4 md:p-5">
        <Checkbox
          checked={isSelected}
          onChange={(e) => onSelect(tab?.id, e?.target?.checked)}
          className="mt-1"
        />

        <div 
          className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-md overflow-hidden bg-muted flex items-center justify-center cursor-pointer"
          onClick={() => onNavigate(tab?.id)}
        >
          {tab?.favicon ? (
            <Image 
              src={tab?.favicon} 
              alt={`${tab?.title} favicon`}
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon name="Globe" size={20} className="text-muted-foreground" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h3 
                className="text-sm md:text-base font-caption font-medium text-foreground line-clamp-1 cursor-pointer hover:text-primary transition-base"
                onClick={() => onNavigate(tab?.id)}
              >
                {tab?.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`
                  inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-caption font-medium
                  ${getDomainColor(tab?.url)}
                `}>
                  <Icon name="Link" size={12} />
                  {truncateUrl(tab?.url)}
                </span>
                {tab?.isActive && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-caption font-medium bg-accent/10 text-accent">
                    <Icon name="Circle" size={8} className="fill-current" />
                    Active
                  </span>
                )}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              onClick={() => onClose(tab?.id)}
              className="opacity-0 group-hover:opacity-100 transition-base h-8 w-8 flex-shrink-0"
            />
          </div>

          {tab?.aiSummary && (
            <div className="mt-3 p-3 bg-muted/50 rounded-md border border-border">
              <div className="flex items-start gap-2 mb-2">
                <Icon name="Sparkles" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-xs font-caption font-medium text-primary">AI Summary</span>
              </div>
              <p className={`text-xs md:text-sm text-muted-foreground leading-relaxed ${!showFullSummary ? 'line-clamp-2' : ''}`}>
                {tab?.aiSummary}
              </p>
              {tab?.aiSummary?.length > 150 && (
                <button
                  onClick={() => setShowFullSummary(!showFullSummary)}
                  className="text-xs text-primary hover:underline mt-1 font-caption font-medium"
                >
                  {showFullSummary ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          )}

          {tab?.highlights && tab?.highlights?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tab?.highlights?.map((highlight, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-secondary/10 text-secondary font-caption"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              iconName="FolderPlus"
              iconPosition="left"
              onClick={() => onGroup(tab?.id)}
              className="text-xs"
            >
              Group
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Bookmark"
              iconPosition="left"
              onClick={() => onBookmark(tab?.id)}
              className="text-xs"
            >
              Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Share2"
              iconPosition="left"
              onClick={() => onShare(tab?.id)}
              className="text-xs"
            >
              Share
            </Button>
          </div>
        </div>
      </div>
      {tab?.lastUpdated && (
        <div className="px-4 md:px-5 pb-3 flex items-center gap-1 text-xs text-muted-foreground">
          <Icon name="Clock" size={12} />
          <span>Updated {tab?.lastUpdated}</span>
        </div>
      )}
    </div>
  );
};

export default TabCard;