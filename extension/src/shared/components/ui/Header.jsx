import React, { useState } from 'react';
import Icon from '../AppIcon';

const Header = ({ title }) => {
  // Simple header for extension context
  // Main navigation is handled by Sidepanel App router or Options tabs
  // "Settings" icon always opens options page

  const handleSettingsClick = () => {
    if (chrome && chrome.tabs) {
      chrome.tabs.create({ url: 'src/options/index.html' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-card border-b border-border elevation-md">
      <div className="flex items-center justify-between h-12 px-4">
        <div className="flex items-center gap-2 transition-base hover:opacity-80">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
            <Icon name="Bot" size={20} color="var(--color-primary)" />
          </div>
          <span className="text-lg font-heading font-semibold text-foreground">
            {title || 'AgenticBrowser'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* We can add more nav items here if needed, but for now just Settings */}
          <button
            onClick={handleSettingsClick}
            className="p-2 rounded-md hover:bg-muted transition-base text-muted-foreground hover:text-foreground"
            title="Settings"
          >
            <Icon name="Settings" size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;