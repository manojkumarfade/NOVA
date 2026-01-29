import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import SearchBar from './components/SearchBar';
import HistoryResultCard from './components/HistoryResultCard';
import AdvancedFilters from './components/AdvancedFilters';
import TimelineVisualization from './components/TimelineVisualization';
import TopicCluster from './components/TopicCluster';
import PrivacyControls from './components/PrivacyControls';
import EmptyState from './components/EmptyState';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const HistorySearchInterface = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([
  "machine learning tutorials",
  "react best practices 2026",
  "web automation tools",
  "AI browser extensions"]
  );
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeView, setActiveView] = useState('results');

  const mockHistoryResults = [
  {
    id: 1,
    title: "Advanced React Patterns and Best Practices for 2026",
    url: "https://reactpatterns.dev/advanced-patterns-2026",
    snippet: "Comprehensive guide covering the latest React patterns including server components, concurrent rendering, and advanced state management techniques. Learn how to build scalable applications with modern React architecture.",
    thumbnail: "https://images.unsplash.com/photo-1725800066480-7ccf189e9513",
    thumbnailAlt: "Modern laptop displaying colorful React code editor with component structure on dark themed IDE interface",
    visitedAt: new Date(Date.now() - 7200000),
    visitCount: 5,
    relevanceScore: 95,
    contentType: "article",
    isBookmarked: true
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals: Complete Tutorial Series",
    url: "https://mlacademy.com/fundamentals-series",
    snippet: "Step-by-step tutorial series covering machine learning basics, neural networks, deep learning frameworks, and practical implementation examples. Includes hands-on coding exercises and real-world projects.",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_15b9cfc75-1764651774193.png",
    thumbnailAlt: "Digital visualization of neural network with glowing blue nodes and connections representing machine learning architecture",
    visitedAt: new Date(Date.now() - 86400000),
    visitCount: 12,
    relevanceScore: 92,
    contentType: "video",
    isBookmarked: false
  },
  {
    id: 3,
    title: "Web Automation with Playwright: Complete Guide",
    url: "https://automation.dev/playwright-guide",
    snippet: "Master web automation using Playwright framework. Learn browser automation, testing strategies, CI/CD integration, and advanced scripting techniques for modern web applications.",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_13c5833f7-1768045962613.png",
    thumbnailAlt: "Close-up of automated testing code on computer screen showing browser automation script with multiple test cases",
    visitedAt: new Date(Date.now() - 172800000),
    visitCount: 8,
    relevanceScore: 88,
    contentType: "article",
    isBookmarked: true
  },
  {
    id: 4,
    title: "Building AI-Powered Browser Extensions",
    url: "https://extensiondev.io/ai-extensions",
    snippet: "Learn how to create intelligent browser extensions using AI APIs, natural language processing, and machine learning models. Includes practical examples and deployment strategies.",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_14d6b6f69-1767153659927.png",
    thumbnailAlt: "Browser extension interface showing AI assistant icon with chat bubble on modern web browser toolbar",
    visitedAt: new Date(Date.now() - 259200000),
    visitCount: 15,
    relevanceScore: 90,
    contentType: "document",
    isBookmarked: false
  },
  {
    id: 5,
    title: "TypeScript Advanced Types and Patterns",
    url: "https://typescript.guide/advanced-types",
    snippet: "Deep dive into TypeScript's advanced type system including conditional types, mapped types, template literal types, and utility types. Perfect for building type-safe applications.",
    thumbnail: "https://images.unsplash.com/photo-1517512006864-7edc3b933137",
    thumbnailAlt: "TypeScript code editor displaying complex type definitions with syntax highlighting on dark background",
    visitedAt: new Date(Date.now() - 345600000),
    visitCount: 6,
    relevanceScore: 85,
    contentType: "article",
    isBookmarked: true
  }];


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
      setSearchResults(mockHistoryResults);
    }
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);

    if (!recentSearches?.includes(query)) {
      setRecentSearches([query, ...recentSearches?.slice(0, 4)]);
    }

    setTimeout(() => {
      setSearchResults(mockHistoryResults);
      setIsSearching(false);
    }, 500);
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
  };

  const handleApplyFilters = (filters) => {
    console.log('Applying filters:', filters);
    setSearchResults(mockHistoryResults);
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
    <div className="min-h-screen bg-background">
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