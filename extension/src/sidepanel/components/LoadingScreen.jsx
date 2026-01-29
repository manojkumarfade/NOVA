
import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground animate-in fade-in duration-300">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">Initializing Nova...</p>
        </div>
    );
};

export default LoadingScreen;
