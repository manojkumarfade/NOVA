import React, { useState, useEffect } from 'react';
import Icon from '../../shared/components/AppIcon';

const ThinkingIndicator = ({ visible, message = "Thinking..." }) => {
    if (!visible) return null;

    const steps = [
        "Analyzing request...",
        "Checking available tools...",
        "Formulating execution plan...",
        "Reviewing safety constraints..."
    ];

    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep(prev => (prev + 1) % steps.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-3 p-4 my-2 bg-secondary/5 border border-secondary/20 rounded-lg animate-in fade-in slide-in-from-bottom-2">
            <div className="relative flex items-center justify-center w-8 h-8">
                <div className="absolute inset-0 border-2 border-secondary/30 rounded-full"></div>
                <div className="absolute inset-0 border-2 border-secondary rounded-full border-t-transparent animate-spin"></div>
                <Icon name="Brain" size={14} className="text-secondary" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{message || "Thinking..."}</p>
                <p className="text-xs text-muted-foreground transition-all duration-300">
                    {steps[currentStep]}
                </p>
            </div>
        </div>
    );
};

export default ThinkingIndicator;
