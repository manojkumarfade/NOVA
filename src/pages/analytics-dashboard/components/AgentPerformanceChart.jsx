import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const AgentPerformanceChart = ({ data }) => {
  const COLORS = {
    'Planner': 'var(--color-secondary)',
    'Navigator': 'var(--color-primary)',
    'Validator': 'var(--color-accent)'
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 elevation-md">
          <p className="text-sm font-caption font-medium text-foreground mb-1">{data?.name}</p>
          <p className="text-xs text-muted-foreground">
            Tasks: <span className="font-medium text-foreground">{data?.value}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Percentage: <span className="font-medium text-foreground">{data?.payload?.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs md:text-sm font-caption font-medium"
      >
        {`${(percent * 100)?.toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 elevation-sm">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Icon name="Activity" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Agent Performance
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">Task distribution by agent</p>
          </div>
        </div>
      </div>
      <div className="w-full h-64 md:h-80 lg:h-96" aria-label="Agent Performance Pie Chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS?.[entry?.name]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-4 md:mt-6">
        {data?.map((agent, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0" 
              style={{ backgroundColor: COLORS?.[agent?.name] }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs md:text-sm font-caption font-medium text-foreground truncate">
                {agent?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {agent?.value} tasks ({agent?.percentage}%)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentPerformanceChart;