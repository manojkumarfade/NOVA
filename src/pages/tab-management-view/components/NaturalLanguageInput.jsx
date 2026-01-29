import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NaturalLanguageInput = ({ 
  onExecuteCommand,
  isProcessing = false,
  className = ''
}) => {
  const [command, setCommand] = useState('');
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef(null);

  const exampleCommands = [
    'Group all shopping tabs',
    'Close social media tabs',
    'Show tabs from last hour',
    'Bookmark all research tabs',
    'Find tabs about React'
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (command?.trim() && !isProcessing) {
      onExecuteCommand(command?.trim());
      setCommand('');
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input simulation
    if (!isListening) {
      setTimeout(() => {
        setCommand('Group all shopping tabs');
        setIsListening(false);
      }, 2000);
    }
  };

  const handleExampleClick = (example) => {
    setCommand(example);
    inputRef?.current?.focus();
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 md:p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Sparkles" size={20} className="text-primary" />
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
          Natural Language Commands
        </h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="relative flex items-center">
            <Icon 
              name="MessageSquare" 
              size={18} 
              className="absolute left-4 text-muted-foreground"
            />
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e?.target?.value)}
              placeholder="Type a command like 'group all shopping tabs'..."
              disabled={isProcessing}
              className="w-full pl-12 pr-24 py-3 md:py-4 bg-muted border border-border rounded-lg text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-base disabled:opacity-50"
            />
            <div className="absolute right-2 flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                iconName={isListening ? 'MicOff' : 'Mic'}
                onClick={handleVoiceInput}
                className={`h-8 w-8 ${isListening ? 'text-error animate-pulse' : ''}`}
              />
              <Button
                type="submit"
                variant="default"
                size="icon"
                iconName="Send"
                loading={isProcessing}
                disabled={!command?.trim() || isProcessing}
                className="h-8 w-8"
              />
            </div>
          </div>

          {isListening && (
            <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-error/10 border border-error/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Icon name="Mic" size={16} className="text-error animate-pulse" />
                <span className="text-sm text-error font-caption font-medium">
                  Listening...
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-caption">
            Try these examples:
          </p>
          <div className="flex flex-wrap gap-2">
            {exampleCommands?.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleExampleClick(example)}
                className="px-3 py-1.5 bg-muted hover:bg-muted/80 border border-border rounded-md text-xs text-foreground font-caption transition-base"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </form>
      {isProcessing && (
        <div className="mt-4 p-3 bg-primary/10 border border-primary/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Icon name="Loader2" size={16} className="text-primary animate-spin" />
            <span className="text-sm text-primary font-caption font-medium">
              Processing your command...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NaturalLanguageInput;