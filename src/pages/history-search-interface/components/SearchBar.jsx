import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchBar = ({ 
  onSearch, 
  recentSearches = [], 
  onClearRecent,
  className = '' 
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (query?.trim()) {
      onSearch(query?.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    setQuery(e?.target?.value);
    setShowSuggestions(e?.target?.value?.length > 0 && recentSearches?.length > 0);
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center gap-2 bg-card border border-border rounded-lg elevation-md transition-base focus-within:ring-2 focus-within:ring-ring">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-4 text-muted-foreground pointer-events-none"
          />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(query?.length > 0 && recentSearches?.length > 0)}
            placeholder="Search your browsing history with natural language..."
            className="flex-1 pl-12 pr-4 py-3 md:py-4 bg-transparent text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <div className="flex items-center gap-2 pr-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              iconName="SlidersHorizontal"
              onClick={() => setShowFilters(!showFilters)}
              className="h-8 w-8 md:h-10 md:w-10"
            />
            <Button
              type="submit"
              variant="default"
              size="sm"
              iconName="ArrowRight"
              iconPosition="right"
              disabled={!query?.trim()}
              className="hidden sm:flex"
            >
              Search
            </Button>
            <Button
              type="submit"
              variant="default"
              size="icon"
              iconName="ArrowRight"
              disabled={!query?.trim()}
              className="sm:hidden h-8 w-8"
            />
          </div>
        </div>
      </form>
      {showSuggestions && recentSearches?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg elevation-lg overflow-hidden z-50">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border">
            <span className="text-xs font-caption font-medium text-muted-foreground">
              Recent Searches
            </span>
            <button
              onClick={onClearRecent}
              className="text-xs text-primary hover:text-primary/80 transition-base"
            >
              Clear All
            </button>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {recentSearches?.map((search, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(search)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-base text-left"
              >
                <Icon name="History" size={16} className="text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-foreground truncate">{search}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg elevation-lg p-4 z-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-caption font-semibold text-foreground">
              Quick Filters
            </h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-muted-foreground hover:text-foreground transition-base"
            >
              <Icon name="X" size={18} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['Today', 'This Week', 'This Month', 'All Time']?.map((filter) => (
              <Button
                key={filter}
                variant="outline"
                size="sm"
                className="justify-center"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;