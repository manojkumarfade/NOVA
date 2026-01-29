import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from '../../../shared/components/AppIcon';

const DomainActivityChart = ({ data }) => {
  const COLORS = [
    'var(--color-primary)',
    'var(--color-secondary)',
    'var(--color-accent)',
    'var(--color-warning)',
    '#8B5CF6',
    '#EC4899'
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 elevation-md">
          <p className="text-sm font-caption font-medium text-foreground mb-1">{label}</p>
          <p className="text-xs text-muted-foreground">
            Visits: <span className="font-medium text-foreground">{payload?.[0]?.value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 elevation-sm">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10">
            <Icon name="Globe" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Most Accessed Domains
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">Top 6 domains by visit count</p>
          </div>
        </div>
      </div>
      <div className="w-full h-64 md:h-80 lg:h-96" aria-label="Domain Activity Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              type="number"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              type="category"
              dataKey="domain" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
              width={120}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="visits" radius={[0, 8, 8, 0]}>
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DomainActivityChart;
