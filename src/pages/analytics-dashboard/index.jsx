import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import AgentStatusIndicator from '../../components/ui/AgentStatusIndicator';
import MetricCard from './components/MetricCard';
import TaskTrendChart from './components/TaskTrendChart';
import DomainActivityChart from './components/DomainActivityChart';
import AgentPerformanceChart from './components/AgentPerformanceChart';
import ActivityTimeline from './components/ActivityTimeline';
import FilterControls from './components/FilterControls';
import WorkflowSuccessChart from './components/WorkflowSuccessChart';

const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState('7days');
  const [taskType, setTaskType] = useState('all');
  const [domain, setDomain] = useState('all');

  const summaryMetrics = [
    {
      title: 'Total Tasks',
      value: '1,247',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Zap',
      iconColor: 'var(--color-primary)',
      trend: 'up',
      subtitle: 'This week'
    },
    {
      title: 'Pages Analyzed',
      value: '3,842',
      change: '+8.3%',
      changeType: 'positive',
      icon: 'FileText',
      iconColor: 'var(--color-secondary)',
      trend: 'up',
      subtitle: 'This month'
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'CheckCircle2',
      iconColor: 'var(--color-success)',
      trend: 'up',
      subtitle: 'Navigation completions'
    },
    {
      title: 'Avg Response Time',
      value: '1.8s',
      change: '-0.3s',
      changeType: 'positive',
      icon: 'Timer',
      iconColor: 'var(--color-accent)',
      trend: 'down',
      subtitle: 'Per task'
    }
  ];

  const taskTrendData = [
    { date: 'Jan 08', tasks: 142, successful: 134, failed: 8 },
    { date: 'Jan 09', tasks: 168, successful: 159, failed: 9 },
    { date: 'Jan 10', tasks: 195, successful: 184, failed: 11 },
    { date: 'Jan 11', tasks: 178, successful: 168, failed: 10 },
    { date: 'Jan 12', tasks: 203, successful: 192, failed: 11 },
    { date: 'Jan 13', tasks: 187, successful: 176, failed: 11 },
    { date: 'Jan 14', tasks: 174, successful: 165, failed: 9 }
  ];

  const domainActivityData = [
    { domain: 'amazon.com', visits: 342 },
    { domain: 'google.com', visits: 298 },
    { domain: 'github.com', visits: 256 },
    { domain: 'stackoverflow.com', visits: 187 },
    { domain: 'linkedin.com', visits: 143 },
    { domain: 'twitter.com', visits: 98 }
  ];

  const agentPerformanceData = [
    { name: 'Planner', value: 412, percentage: 33 },
    { name: 'Navigator', value: 587, percentage: 47 },
    { name: 'Validator', value: 248, percentage: 20 }
  ];

  const workflowSuccessData = [
    { workflow: 'Product Search', successful: 156, failed: 12 },
    { workflow: 'Cart Addition', successful: 134, failed: 8 },
    { workflow: 'Payment Process', successful: 98, failed: 15 },
    { workflow: 'Form Filling', successful: 187, failed: 9 },
    { workflow: 'Data Extraction', successful: 203, failed: 7 }
  ];

  const activityTimelineData = [
    {
      id: 1,
      task: 'Product search and comparison on Amazon',
      domain: 'amazon.com',
      timestamp: 'Today at 2:34 PM',
      duration: 45000,
      agent: 'Navigator',
      status: 'success',
      details: 'Successfully searched for wireless headphones, compared 5 products, and extracted pricing information.',
      steps: [
        { description: 'Navigate to Amazon homepage', completed: true },
        { description: 'Enter search query', completed: true },
        { description: 'Filter results by rating', completed: true },
        { description: 'Extract product details', completed: true }
      ],
      outcome: 'Task completed successfully. Found 5 matching products with prices ranging from $49.99 to $299.99.'
    },
    {
      id: 2,
      task: 'GitHub repository analysis',
      domain: 'github.com',
      timestamp: 'Today at 1:15 PM',
      duration: 32000,
      agent: 'Planner',
      status: 'success',
      details: 'Analyzed repository structure, extracted README content, and identified key contributors.',
      steps: [
        { description: 'Navigate to repository', completed: true },
        { description: 'Parse README file', completed: true },
        { description: 'Extract contributor data', completed: true }
      ],
      outcome: 'Successfully analyzed repository with 1,234 stars and 45 contributors.'
    },
    {
      id: 3,
      task: 'Form submission on contact page',
      domain: 'example.com',
      timestamp: 'Today at 11:42 AM',
      duration: 18000,
      agent: 'Validator',
      status: 'failed',
      details: 'Attempted to fill and submit contact form but encountered CAPTCHA validation.',
      steps: [
        { description: 'Navigate to contact page', completed: true },
        { description: 'Fill form fields', completed: true },
        { description: 'Solve CAPTCHA', completed: false }
      ],
      outcome: 'Task failed due to CAPTCHA requirement. Manual intervention needed.'
    },
    {
      id: 4,
      task: 'LinkedIn profile data extraction',
      domain: 'linkedin.com',
      timestamp: 'Today at 10:28 AM',
      duration: 56000,
      agent: 'Navigator',
      status: 'success',
      details: 'Extracted professional experience, education, and skills from LinkedIn profile.',
      steps: [
        { description: 'Navigate to profile page', completed: true },
        { description: 'Extract experience section', completed: true },
        { description: 'Extract education details', completed: true },
        { description: 'Extract skills list', completed: true }
      ],
      outcome: 'Successfully extracted complete profile data including 8 years of experience and 15 skills.'
    },
    {
      id: 5,
      task: 'Stack Overflow question search',
      domain: 'stackoverflow.com',
      timestamp: 'Today at 9:15 AM',
      duration: 23000,
      agent: 'Planner',
      status: 'success',
      details: 'Searched for React hooks questions and extracted top 10 answers with code snippets.',
      steps: [
        { description: 'Navigate to Stack Overflow', completed: true },
        { description: 'Execute search query', completed: true },
        { description: 'Extract answer content', completed: true }
      ],
      outcome: 'Found 10 relevant answers with average score of 45 upvotes.'
    }
  ];

  const handleExport = () => {
    console.log('Exporting analytics data...');
  };

  const handleReset = () => {
    setDateRange('7days');
    setTaskType('all');
    setDomain('all');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Comprehensive usage statistics and browsing activity insights
              </p>
            </div>
            
            <AgentStatusIndicator 
              status="idle"
              className="lg:ml-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {summaryMetrics?.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>

          <FilterControls
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            taskType={taskType}
            onTaskTypeChange={setTaskType}
            domain={domain}
            onDomainChange={setDomain}
            onExport={handleExport}
            onReset={handleReset}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <TaskTrendChart data={taskTrendData} chartType="area" />
            <DomainActivityChart data={domainActivityData} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <AgentPerformanceChart data={agentPerformanceData} />
            <WorkflowSuccessChart data={workflowSuccessData} />
          </div>

          <ActivityTimeline activities={activityTimelineData} />
        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;