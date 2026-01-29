import React from 'react';
import Icon from '../../../shared/components/AppIcon';
import Image from '../../../shared/components/AppImage';
import Button from '../../../shared/components/ui/Button';

const HistoryResultCard = ({ 
  result,
  onVisit,
  onBookmark,
  onShare,
  onExplain,
  className = '' 
}) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffHours < 1) return 'Less than an hour ago';
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getRelevanceColor = (score) => {
    if (score >= 90) return 'text-accent bg-accent/10';
    if (score >= 70) return 'text-primary bg-primary/10';
    if (score >= 50) return 'text-warning bg-warning/10';
    return 'text-muted-foreground bg-muted';
  };

  return (
    <div className={`bg-card border border-border rounded-lg elevation-sm hover:elevation-md transition-base overflow-hidden ${className}`}>
      <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6">
        {result?.thumbnail && (
          <div className="w-full md:w-32 h-32 md:h-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
            <Image
              src={result?.thumbnail}
              alt={result?.thumbnailAlt}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-heading font-semibold text-foreground line-clamp-2 mb-1">
                {result?.title}
              </h3>
              <a
                href={result?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs md:text-sm text-primary hover:text-primary/80 transition-base truncate block"
              >
                {result?.url}
              </a>
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-caption font-medium whitespace-nowrap ${getRelevanceColor(result?.relevanceScore)}`}>
              <Icon name="Zap" size={12} />
              <span>{result?.relevanceScore}%</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
            {result?.snippet}
          </p>

          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Icon name="Clock" size={14} />
              <span>{formatTimestamp(result?.visitedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Eye" size={14} />
              <span>{result?.visitCount} visit{result?.visitCount > 1 ? 's' : ''}</span>
            </div>
            {result?.contentType && (
              <div className="flex items-center gap-1">
                <Icon name="FileText" size={14} />
                <span className="capitalize">{result?.contentType}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="default"
              size="sm"
              iconName="ExternalLink"
              iconPosition="right"
              onClick={() => onVisit(result?.url)}
            >
              Revisit
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName={result?.isBookmarked ? 'BookmarkCheck' : 'Bookmark'}
              onClick={() => onBookmark(result?.id)}
            />
            <Button
              variant="outline"
              size="sm"
              iconName="Share2"
              onClick={() => onShare(result)}
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="MessageSquare"
              onClick={() => onExplain(result)}
            >
              Explain
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryResultCard;
