import React, { useState, useEffect } from 'react';
import Header from '../../../shared/components/ui/Header';
import SearchBar from './SearchBar';
import HistoryResultCard from './HistoryResultCard';
import AdvancedFilters from './AdvancedFilters';
import TimelineVisualization from './TimelineVisualization';
import TopicCluster from './TopicCluster';
import PrivacyControls from './PrivacyControls';
import EmptyState from './EmptyState';
import Icon from '../../../shared/components/AppIcon';
import Button from '../../../shared/components/ui/Button';
import { StorageService } from '../../../services/StorageService';

const HistorySearchInterface = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [historyItems, setHistoryItems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeView, setActiveView] = useState('results');


  useEffect(() => {
    const loadHistory = async () => {
      try {
        const convs = await StorageService.get('conversations_index', []);

        if (!convs || !Array.isArray(convs)) {
          setHistoryItems([]);
          setSearchResults([]);
          return;
        }

        // Transform to history format
        const items = convs.map(c => ({
          id: c.id,
          title: c.title || "Untitled Conversation",
          snippet: c.preview || "No preview available",
          visitedAt: c.timestamp ? new Date(c.timestamp) : new Date(),
          visitCount: c.messageCount || 0,
          contentType: 'chat',
          url: '#',
          relevanceScore: 100
        }));
        setHistoryItems(items);
        setSearchResults(items);
      } catch (error) {
        console.error("Failed to load history:", error);
        setHistoryItems([]);
        setSearchResults([]);
      }
    };
    loadHistory();
  }, []);


  const mockTimelineData = Array.from({ length: 90 }, (_, i) => ({
    date: new Date(Date.now() - (89 - i) * 86400000)?.toISOString()?.split('T')?.[0],
    count: Math.floor(Math.random() * 30)
  }));

  const mockTopicClusters = [
    {
      id: 1,
      topic: "Technology",
      pageCount: 156,
      topKeywords: ["React", "JavaScript", "Web Development"],
      lastVisited: "2 hours ago",
      visitFrequency: "Daily"
    },
    {
      id: 2,
      topic: "Business",
      pageCount: 89,
      topKeywords: ["Startups", "Marketing", "Strategy"],
      lastVisited: "1 day ago",
      visitFrequency: "Weekly"
    },
    {
      id: 3,
      topic: "Education",
      pageCount: 124,
      topKeywords: ["Tutorials", "Courses", "Learning"],
      lastVisited: "3 hours ago",
      visitFrequency: "Daily"
    },
    {
      id: 4,
      topic: "Entertainment",
      pageCount: 67,
      topKeywords: ["Movies", "Music", "Gaming"],
      lastVisited: "5 days ago",
      visitFrequency: "Monthly"
    },
    {
      id: 5,
      topic: "News",
      pageCount: 203,
      topKeywords: ["Tech News", "Industry", "Updates"],
      lastVisited: "1 hour ago",
      visitFrequency: "Daily"
    },
    {
      id: 6,
      topic: "Shopping",
      pageCount: 45,
      topKeywords: ["Electronics", "Books", "Software"],
      lastVisited: "1 week ago",
      visitFrequency: "Weekly"
    }];


  useEffect(() => {
    if (searchQuery) {
      const filtered = historyItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.snippet.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(historyItems);
    }
  }, [searchQuery, historyItems]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 200);
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
  };

  const handleApplyFilters = (filters) => {
    // Basic filter example
    let filtered = historyItems;
    setSearchResults(filtered);
  };

  const handleVisit = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleBookmark = (id) => {
    setSearchResults(searchResults?.map((result) =>
      result?.id === id ? { ...result, isBookmarked: !result?.isBookmarked } : result
    ));
  };

  const handleShare = (result) => {
    if (navigator.share) {
      navigator.share({
        title: result?.title,
        url: result?.url
      });
    } else {
      navigator.clipboard?.writeText(result?.url);
      alert('Link copied to clipboard!');
    }
  };

  const handleExplain = (result) => {
    console.log('Explaining page:', result?.title);
  };

  const handlePeriodClick = (period) => {
    console.log('Period clicked:', period);
  };

  const handleClusterClick = (cluster) => {
    console.log('Cluster clicked:', cluster);
    setSearchQuery(cluster?.topic);
    setActiveView('results');
  };

  return (
    <div className="h-full overflow-y-auto bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
              Search Your History
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Find previously visited pages using natural language and semantic search
            </p>
          </div>

          <SearchBar
            onSearch={handleSearch}
            recentSearches={recentSearches}
            onClearRecent={handleClearRecent}
            className="mb-6 md:mb-8" />


          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Button
              variant={activeView === 'results' ? 'default' : 'outline'}
              size="sm"
              iconName="List"
              onClick={() => setActiveView('results')}>

              Results
            </Button>
            <Button
              variant={activeView === 'timeline' ? 'default' : 'outline'}
              size="sm"
              iconName="Calendar"
              onClick={() => setActiveView('timeline')}>

              Timeline
            </Button>
            <Button
              variant={activeView === 'clusters' ? 'default' : 'outline'}
              size="sm"
              iconName="Layers"
              onClick={() => setActiveView('clusters')}>

              Topics
            </Button>
            <Button
              variant={activeView === 'privacy' ? 'default' : 'outline'}
              size="sm"
              iconName="Shield"
              onClick={() => setActiveView('privacy')}>

              Privacy
            </Button>
            <div className="ml-auto">
              <Button
                variant="outline"
                size="sm"
                iconName="SlidersHorizontal"
                onClick={() => setShowFilters(!showFilters)}>

                Filters
              </Button>
            </div>
          </div>

          {showFilters &&
            <AdvancedFilters
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
              onApply={handleApplyFilters}
              className="mb-6" />

          }

          {activeView === 'results' &&
            <div>
              {isSearching ?
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="animate-spin mb-4">
                    <Icon name="Loader2" size={48} className="text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Searching your history...</p>
                </div> :
                searchResults?.length > 0 ?
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-muted-foreground">
                        Found {searchResults?.length} result{searchResults?.length !== 1 ? 's' : ''}
                        {searchQuery && ` for "${searchQuery}"`}
                      </p>
                    </div>
                    {searchResults?.map((result) =>
                      <HistoryResultCard
                        key={result?.id}
                        result={result}
                        onVisit={handleVisit}
                        onBookmark={handleBookmark}
                        onShare={handleShare}
                        onExplain={handleExplain} />

                    )}
                  </div> :
                  searchQuery ?
                    <EmptyState
                      type="no-results"
                      onAction={() => {
                        setSearchQuery('');
                        setSearchResults([]);
                      }} /> :


                    <EmptyState
                      type="no-history"
                      onAction={() => window.open('/', '_blank')} />

              }
            </div>
          }

          {activeView === 'timeline' &&
            <TimelineVisualization
              timelineData={mockTimelineData}
              onPeriodClick={handlePeriodClick} />

          }

          {activeView === 'clusters' &&
            <TopicCluster
              clusters={mockTopicClusters}
              onClusterClick={handleClusterClick} />

          }

          {activeView === 'privacy' &&
            <PrivacyControls />
          }
        </div>
      </main>
    </div>);

};

export default HistorySearchInterface;
