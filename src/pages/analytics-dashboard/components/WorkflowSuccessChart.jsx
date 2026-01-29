import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const WorkflowSuccessChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 elevation-md">
          <p className="text-sm font-caption font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-foreground">{entry?.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 elevation-sm">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-success/10">
            <Icon name="CheckCircle2" size={20} color="var(--color-success)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Workflow Success Rate
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">Success vs failure comparison</p>
          </div>
        </div>
      </div>

      <div className="w-full h-64 md:h-80 lg:h-96" aria-label="Workflow Success Rate Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="workflow" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              iconType="circle"
            />
            <Bar 
              dataKey="successful" 
              fill="var(--color-success)" 
              radius={[8, 8, 0, 0]}
              name="Successful"
            />
            <Bar 
              dataKey="failed" 
              fill="var(--color-error)" 
              radius={[8, 8, 0, 0]}
              name="Failed"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WorkflowSuccessChart;