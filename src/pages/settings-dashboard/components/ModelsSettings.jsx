import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const ModelsSettings = () => {
  const [plannerModel, setPlannerModel] = useState('gpt-4-turbo');
  const [navigatorModel, setNavigatorModel] = useState('gpt-4-turbo');
  const [validatorModel, setValidatorModel] = useState('gpt-4-turbo');
  const [navigatorTemperature, setNavigatorTemperature] = useState(0.7);
  const [saveStatus, setSaveStatus] = useState('');

  const modelOptions = [
    { value: 'gpt-4-turbo', label: 'GPT-4 Turbo', description: 'Most capable, best for complex tasks' },
    { value: 'gpt-4', label: 'GPT-4', description: 'Balanced performance and cost' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', description: 'Fast and cost-effective' },
    { value: 'claude-3-opus', label: 'Claude 3 Opus', description: 'Anthropic\'s most capable model' },
    { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet', description: 'Balanced Claude model' },
    { value: 'gemini-pro', label: 'Gemini Pro', description: 'Google\'s advanced model' },
    { value: 'deepseek-chat', label: 'DeepSeek Chat', description: 'Efficient reasoning model' },
    { value: 'grok-2', label: 'Grok 2', description: 'xAI\'s latest model' },
    { value: 'llama-3-70b', label: 'Llama 3 70B', description: 'Meta\'s open model via Ollama' }
  ];

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };

  const handleReset = () => {
    setPlannerModel('gpt-4-turbo');
    setNavigatorModel('gpt-4-turbo');
    setValidatorModel('gpt-4-turbo');
    setNavigatorTemperature(0.7);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 elevation-sm">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Icon name="Brain" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Planner Agent
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Analyzes tasks and creates execution plans
            </p>
          </div>
        </div>

        <Select
          label="Model Selection"
          description="Choose the LLM model for planning complex multi-step tasks"
          options={modelOptions}
          value={plannerModel}
          onChange={setPlannerModel}
          searchable
        />
      </div>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 elevation-sm">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/10">
            <Icon name="Navigation" size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Navigator Agent
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Executes web navigation and DOM interactions
            </p>
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          <Select
            label="Model Selection"
            description="Choose the LLM model for executing navigation actions"
            options={modelOptions}
            value={navigatorModel}
            onChange={setNavigatorModel}
            searchable
          />

          <div>
            <label className="block text-sm font-caption font-medium text-foreground mb-2">
              Temperature Control
            </label>
            <p className="text-xs text-muted-foreground mb-4">
              Adjust creativity vs. precision: Lower values (0.0-0.3) for precise actions, higher values (0.7-1.0) for creative problem-solving
            </p>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={navigatorTemperature}
                onChange={(e) => setNavigatorTemperature(parseFloat(e?.target?.value))}
                className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex items-center justify-center min-w-[60px] h-10 px-3 bg-muted border border-border rounded-md">
                <span className="text-sm font-caption font-medium text-foreground">
                  {navigatorTemperature?.toFixed(1)}
                </span>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-muted-foreground">Precise</span>
              <span className="text-xs text-muted-foreground">Creative</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 elevation-sm">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10">
            <Icon name="CheckCircle2" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Validator Agent
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Verifies task completion and validates results
            </p>
          </div>
        </div>

        <Select
          label="Model Selection"
          description="Choose the LLM model for validating task execution and results"
          options={modelOptions}
          value={validatorModel}
          onChange={setValidatorModel}
          searchable
        />
      </div>
      <div className="bg-muted border border-border rounded-lg p-4 md:p-6">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="text-sm text-foreground font-caption font-medium">
              Model Selection Tips
            </p>
            <ul className="text-xs md:text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Use GPT-4 Turbo or Claude 3 Opus for complex multi-step workflows</li>
              <li>GPT-3.5 Turbo works well for simple navigation tasks</li>
              <li>Different models can be assigned to each agent for optimal performance</li>
              <li>Temperature affects Navigator Agent's decision-making creativity</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
        <Button
          variant="default"
          iconName="Save"
          iconPosition="left"
          onClick={handleSave}
          loading={saveStatus === 'saving'}
          className="flex-1 sm:flex-initial"
        >
          {saveStatus === 'saved' ? 'Saved Successfully' : 'Save Changes'}
        </Button>

        <Button
          variant="outline"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={handleReset}
          disabled={saveStatus === 'saving'}
          className="flex-1 sm:flex-initial"
        >
          Reset to Defaults
        </Button>

        {saveStatus === 'saved' && (
          <div className="flex items-center gap-2 text-accent text-sm font-caption">
            <Icon name="CheckCircle2" size={16} />
            <span>Changes saved successfully</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelsSettings;