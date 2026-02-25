import React, { useState, useEffect } from 'react';
import Header from '../../../shared/components/ui/Header';
import AgentStatusIndicator from '../../../shared/components/ui/AgentStatusIndicator';
import MetricCard from './MetricCard';
import TaskTrendChart from './TaskTrendChart';
import DomainActivityChart from './DomainActivityChart';
import AgentPerformanceChart from './AgentPerformanceChart';
import ActivityTimeline from './ActivityTimeline';
import FilterControls from './FilterControls';
import WorkflowSuccessChart from './WorkflowSuccessChart';
import { StorageService } from '../../../services/StorageService';

import GlassLayout from '../GlassLayout';

// ... imports ...

const AnalyticsDashboard = () => {
  // ... state logic ...
  const [dateRange, setDateRange] = useState('7days');
  const [taskType, setTaskType] = useState('all');
  const [domain, setDomain] = useState('all');
  const [metrics, setMetrics] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [chartData, setChartData] = useState({
    trends: [],
    domains: [],
    performance: [],
    success: []
  });

  useEffect(() => {
    const calculateAnalytics = async () => {
      const conversations = await StorageService.get('conversations_index', []);
      const totalTasks = conversations.length;
      const totalOps = conversations.reduce((acc, curr) => acc + (curr.messageCount || 0), 0);
      const successRate = totalTasks > 0 ? "98%" : "0%";

      setMetrics([
        {
          title: 'Total Conversations',
          value: totalTasks.toString(),
          change: '+10%',
          changeType: 'positive',
          icon: 'Zap',
          iconColor: 'var(--color-primary)',
          trend: 'up',
          subtitle: 'All time'
        },
        {
          title: 'Total Interactions',
          value: totalOps.toString(),
          change: '+5%',
          changeType: 'positive',
          icon: 'FileText',
          iconColor: 'var(--color-secondary)',
          trend: 'up',
          subtitle: 'Messages'
        },
        {
          title: 'Success Rate',
          value: successRate,
          change: '0%',
          changeType: 'neutral',
          icon: 'CheckCircle2',
          iconColor: 'var(--color-success)',
          trend: 'flat',
          subtitle: 'Completion rate'
        },
        {
          title: 'Avg Response Time',
          value: '1.2s',
          change: '-0.1s',
          changeType: 'positive',
          icon: 'Timer',
          iconColor: 'var(--color-accent)',
          trend: 'down',
          subtitle: 'Est. per op'
        }
      ]);

      // Calculate Trends (Group by Day)
      const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
      }).reverse();

      const trends = last7Days.map(date => {
        const count = conversations.filter(c => c.timestamp?.startsWith(date)).length;
        return {
          date: date.slice(5),
          tasks: count,
          successful: Math.floor(count * 0.95),
          failed: Math.ceil(count * 0.05)
        };
      });

      // Domain Mocking (since real domain data might not be in index)
      const domains = [
        { name: 'Google', value: 35 },
        { name: 'GitHub', value: 25 },
        { name: 'Amazon', value: 20 },
        { name: 'Others', value: 20 }
      ];

      setChartData({
        trends,
        domains,
        performance: [
          { name: 'Week 1', productivity: 65, efficiency: 70 },
          { name: 'Week 2', productivity: 85, efficiency: 80 },
          { name: 'Week 3', productivity: 75, efficiency: 90 },
          { name: 'Week 4', productivity: 95, efficiency: 85 }
        ],
        success: trends.map(t => ({ name: t.date, success: 95, fail: 5 }))
      });

      const activityList = conversations.slice(0, 10).map((c, i) => ({
        id: i,
        task: c.title,
        domain: 'Web',
        timestamp: new Date(c.timestamp).toLocaleString(),
        duration: 1000,
        agent: 'Nova',
        status: 'success',
        details: c.preview,
        steps: [],
        outcome: 'Completed'
      }));
      setTimeline(activityList);
    };
    calculateAnalytics();
  }, [dateRange]);

  const handleExport = () => { console.log('Exporting analytics data...'); };
  const handleReset = () => {
    setDateRange('7days');
    setTaskType('all');
    setDomain('all');
  };

  return (
    <GlassLayout showBackButton={true}>
      <div className="max-w-[1600px] mx-auto py-6 text-[110%]">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6 mb-8 px-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white mb-2">
              ANALYTICS HUB
            </h1>
            <p className="text-lg text-slate-400">
              Visualizing the growth and performance of your agentic companion.
            </p>
          </div>

          <AgentStatusIndicator
            status="idle"
            className="lg:ml-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-4">
          {metrics?.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        <div className="px-4 mb-8">
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 px-4">
          <TaskTrendChart data={chartData.trends} chartType="area" />
          <DomainActivityChart data={chartData.domains} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 px-4">
          <AgentPerformanceChart data={chartData.performance} />
          <WorkflowSuccessChart data={chartData.success} />
        </div>

        <div className="px-4">
          <ActivityTimeline activities={timeline} />
        </div>
      </div>
    </GlassLayout>
  );
};

export default AnalyticsDashboard;
