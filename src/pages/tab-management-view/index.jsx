import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import AgentStatusIndicator from '../../components/ui/AgentStatusIndicator';
import Icon from '../../components/AppIcon';

import TabCard from './components/TabCard';
import TabGroup from './components/TabGroup';
import NaturalLanguageInput from './components/NaturalLanguageInput';
import TabFilters from './components/TabFilters';
import QuickStats from './components/QuickStats';

const TabManagementView = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recency');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedTabs, setSelectedTabs] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [agentStatus, setAgentStatus] = useState('idle');

  const mockTabs = [
    {
      id: 'tab-1',
      title: 'React Documentation - Getting Started',
      url: 'https://react.dev/learn',
      favicon: 'https://react.dev/favicon.ico',
      isActive: true,
      aiSummary: 'Comprehensive guide to React fundamentals covering components, hooks, and state management. Includes interactive examples and best practices for building modern web applications with React 18.',
      highlights: ['React Hooks', 'Components', 'State Management'],
      lastUpdated: '2 minutes ago'
    },
    {
      id: 'tab-2',
      title: 'Amazon - Shopping Cart',
      url: 'https://amazon.com/cart',
      favicon: 'https://www.amazon.com/favicon.ico',
      isActive: false,
      aiSummary: 'Shopping cart contains 3 items totaling $127.99. Items include wireless headphones, USB-C cable, and phone case. Free shipping available for Prime members.',
      highlights: ['3 items', '$127.99', 'Prime eligible'],
      lastUpdated: '15 minutes ago'
    },
    {
      id: 'tab-3',
      title: 'GitHub - AgenticBrowser Repository',
      url: 'https://github.com/user/agentic-browser',
      favicon: 'https://github.com/favicon.ico',
      isActive: false,
      aiSummary: 'Open source AI-native browser assistant project with 1.2k stars. Features multi-agent architecture, natural language commands, and Chrome extension support. Active development with recent commits.',
      highlights: ['1.2k stars', 'Open Source', 'Active'],
      lastUpdated: '1 hour ago'
    },
    {
      id: 'tab-4',
      title: 'YouTube - Web Development Tutorial',
      url: 'https://youtube.com/watch?v=abc123',
      favicon: 'https://www.youtube.com/favicon.ico',
      isActive: false,
      aiSummary: 'Tutorial video covering advanced React patterns and performance optimization techniques. Duration 45 minutes. Covers custom hooks, memoization, and code splitting strategies.',
      highlights: ['45 min', 'React', 'Performance'],
      lastUpdated: '3 hours ago'
    },
    {
      id: 'tab-5',
      title: 'Gmail - Inbox',
      url: 'https://mail.google.com/mail/u/0/#inbox',
      favicon: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico',
      isActive: false,
      aiSummary: '12 unread emails including project updates, meeting invitations, and newsletter subscriptions. Most recent email from team lead regarding sprint planning.',
      highlights: ['12 unread', 'Work emails', 'Urgent'],
      lastUpdated: '5 minutes ago'
    },
    {
      id: 'tab-6',
      title: 'Stack Overflow - React Hooks Question',
      url: 'https://stackoverflow.com/questions/12345',
      favicon: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico',
      isActive: false,
      aiSummary: 'Discussion about useEffect dependency array best practices. Question has 45 upvotes with 3 detailed answers explaining proper hook usage and common pitfalls.',
      highlights: ['45 upvotes', 'Answered', 'React Hooks'],
      lastUpdated: '30 minutes ago'
    }
  ];

  const mockGroups = [
    {
      id: 'group-1',
      name: 'Shopping',
      color: 'orange',
      isExpanded: true,
      tabs: [mockTabs?.[1]]
    },
    {
      id: 'group-2',
      name: 'Development',
      color: 'blue',
      isExpanded: true,
      tabs: [mockTabs?.[0], mockTabs?.[2], mockTabs?.[5]]
    },
    {
      id: 'group-3',
      name: 'Learning',
      color: 'purple',
      isExpanded: false,
      tabs: [mockTabs?.[3]]
    }
  ];

  const [tabs, setTabs] = useState(mockTabs);
  const [groups, setGroups] = useState(mockGroups);

  const stats = {
    totalTabs: tabs?.length,
    activeTabs: tabs?.filter(t => t?.isActive)?.length,
    groupedTabs: groups?.reduce((acc, g) => acc + g?.tabs?.length, 0),
    memoryUsed: '1.2 GB'
  };

  const handleTabSelect = (tabId, isSelected) => {
    setSelectedTabs(prev => 
      isSelected 
        ? [...prev, tabId]
        : prev?.filter(id => id !== tabId)
    );
  };

  const handleSelectAll = () => {
    setSelectedTabs(tabs?.map(t => t?.id));
  };

  const handleDeselectAll = () => {
    setSelectedTabs([]);
  };

  const handleTabClose = (tabId) => {
    setTabs(prev => prev?.filter(t => t?.id !== tabId));
    setSelectedTabs(prev => prev?.filter(id => id !== tabId));
  };

  const handleTabGroup = (tabId) => {
    console.log('Group tab:', tabId);
  };

  const handleTabBookmark = (tabId) => {
    console.log('Bookmark tab:', tabId);
  };

  const handleTabShare = (tabId) => {
    console.log('Share tab:', tabId);
  };

  const handleTabNavigate = (tabId) => {
    setTabs(prev => prev?.map(t => ({
      ...t,
      isActive: t?.id === tabId
    })));
  };

  const handleBulkAction = (action) => {
    setIsProcessing(true);
    setAgentStatus('navigating');
    
    setTimeout(() => {
      if (action === 'close') {
        setTabs(prev => prev?.filter(t => !selectedTabs?.includes(t?.id)));
        setSelectedTabs([]);
      }
      setIsProcessing(false);
      setAgentStatus('idle');
    }, 1500);
  };

  const handleExecuteCommand = (command) => {
    setIsProcessing(true);
    setAgentStatus('planning');
    
    setTimeout(() => {
      setAgentStatus('navigating');
      setTimeout(() => {
        setAgentStatus('validating');
        setTimeout(() => {
          setIsProcessing(false);
          setAgentStatus('idle');
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const handleToggleGroupExpand = (groupId) => {
    setGroups(prev => prev?.map(g => 
      g?.id === groupId ? { ...g, isExpanded: !g?.isExpanded } : g
    ));
  };

  const handleRenameGroup = (groupId, newName) => {
    setGroups(prev => prev?.map(g => 
      g?.id === groupId ? { ...g, name: newName } : g
    ));
  };

  const handleDeleteGroup = (groupId) => {
    setGroups(prev => prev?.filter(g => g?.id !== groupId));
  };

  const handleRemoveFromGroup = (groupId, tabId) => {
    setGroups(prev => prev?.map(g => 
      g?.id === groupId 
        ? { ...g, tabs: g?.tabs?.filter(t => t?.id !== tabId) }
        : g
    ));
  };

  const filteredTabs = tabs?.filter(tab => {
    const matchesFilter = 
      activeFilter === 'all' ||
      (activeFilter === 'active' && tab?.isActive) ||
      (activeFilter === 'grouped' && groups?.some(g => g?.tabs?.some(t => t?.id === tab?.id))) ||
      (activeFilter === 'recent' && false);

    const matchesSearch = 
      !searchQuery ||
      tab?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      tab?.url?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      tab?.aiSummary?.toLowerCase()?.includes(searchQuery?.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Tab Management - AgenticBrowser</title>
        <meta name="description" content="Manage your browser tabs with AI-powered organization and natural language commands" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                  Tab Management
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Organize and control your tabs with AI assistance
                </p>
              </div>

              <AgentStatusIndicator 
                status={agentStatus}
                currentTask={isProcessing ? 'Processing command...' : ''}
                progress={isProcessing ? 65 : 0}
              />
            </div>

            <QuickStats stats={stats} />

            <NaturalLanguageInput 
              onExecuteCommand={handleExecuteCommand}
              isProcessing={isProcessing}
            />

            <div className="relative">
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search tabs by title, URL, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full pl-12 pr-4 py-3 md:py-4 bg-card border border-border rounded-lg text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-base"
              />
            </div>

            <TabFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              totalTabs={filteredTabs?.length}
              selectedCount={selectedTabs?.length}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
              onBulkAction={handleBulkAction}
            />

            {groups?.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                  Tab Groups
                </h2>
                {groups?.map(group => (
                  <TabGroup
                    key={group?.id}
                    group={group}
                    onToggleExpand={handleToggleGroupExpand}
                    onRenameGroup={handleRenameGroup}
                    onDeleteGroup={handleDeleteGroup}
                    onRemoveFromGroup={handleRemoveFromGroup}
                    onTabSelect={handleTabSelect}
                    onTabClose={handleTabClose}
                    onTabGroup={handleTabGroup}
                    onTabBookmark={handleTabBookmark}
                    onTabShare={handleTabShare}
                    onTabNavigate={handleTabNavigate}
                    selectedTabs={selectedTabs}
                  />
                ))}
              </div>
            )}

            <div className="space-y-4">
              <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                {activeFilter === 'all' ? 'All Tabs' : 
                 activeFilter === 'active' ? 'Active Tabs' :
                 activeFilter === 'grouped' ? 'Grouped Tabs' : 'Recently Closed'}
              </h2>

              {filteredTabs?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <Icon name="Layers" size={64} className="text-muted-foreground mb-4" />
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    No tabs found
                  </h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md">
                    {searchQuery 
                      ? 'Try adjusting your search query or filters' :'Open some tabs to get started with AI-powered management'}
                  </p>
                </div>
              ) : (
                <div className={`
                  ${viewMode === 'grid' ?'grid grid-cols-1 lg:grid-cols-2 gap-4' :'space-y-4'}
                `}>
                  {filteredTabs?.map(tab => (
                    <TabCard
                      key={tab?.id}
                      tab={tab}
                      isSelected={selectedTabs?.includes(tab?.id)}
                      onSelect={handleTabSelect}
                      onClose={handleTabClose}
                      onGroup={handleTabGroup}
                      onBookmark={handleTabBookmark}
                      onShare={handleTabShare}
                      onNavigate={handleTabNavigate}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default TabManagementView;