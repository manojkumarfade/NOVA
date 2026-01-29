import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';


const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Chat', path: '/main-chat-interface', icon: 'MessageSquare' },
    { label: 'Analytics', path: '/analytics-dashboard', icon: 'BarChart3' },
    { label: 'History', path: '/history-search-interface', icon: 'History' },
    { label: 'Tabs', path: '/tab-management-view', icon: 'Layers' },
    { label: 'Settings', path: '/settings-dashboard', icon: 'Settings' },
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] bg-card border-b border-border elevation-md">
        <div className="flex items-center justify-between h-16 px-6">
          <Link 
            to="/main-chat-interface" 
            className="flex items-center gap-3 transition-base hover:opacity-80"
            onClick={closeMobileMenu}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Icon name="Bot" size={24} color="var(--color-primary)" />
            </div>
            <span className="text-xl font-heading font-semibold text-foreground">
              AgenticBrowser
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md transition-base
                  ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon name={item?.icon} size={18} />
                <span className="font-caption font-medium">{item?.label}</span>
              </Link>
            ))}
          </nav>

          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-base"
            aria-label="Toggle mobile menu"
          >
            <Icon 
              name={mobileMenuOpen ? 'X' : 'Menu'} 
              size={24} 
              color="var(--color-foreground)" 
            />
          </button>
        </div>
      </header>
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[90] bg-background lg:hidden"
          onClick={closeMobileMenu}
        >
          <nav 
            className="fixed top-16 left-0 right-0 bottom-0 bg-card border-t border-border overflow-y-auto"
            onClick={(e) => e?.stopPropagation()}
          >
            <div className="flex flex-col p-4 gap-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-md transition-base
                    ${isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-caption font-medium text-base">{item?.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;