import React from 'react';
import Icon from '../../../components/AppIcon';

const ModelComparisonTable = ({ models }) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10">
            <Icon name="BarChart3" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Model Comparison
            </h3>
            <p className="text-sm text-muted-foreground">
              Compare capabilities, costs, and performance
            </p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-caption font-medium text-muted-foreground uppercase tracking-wider">
                Model
              </th>
              <th className="px-4 py-3 text-left text-xs font-caption font-medium text-muted-foreground uppercase tracking-wider">
                Provider
              </th>
              <th className="px-4 py-3 text-left text-xs font-caption font-medium text-muted-foreground uppercase tracking-wider">
                Context
              </th>
              <th className="px-4 py-3 text-left text-xs font-caption font-medium text-muted-foreground uppercase tracking-wider">
                Cost/1K
              </th>
              <th className="px-4 py-3 text-left text-xs font-caption font-medium text-muted-foreground uppercase tracking-wider">
                Speed
              </th>
              <th className="px-4 py-3 text-left text-xs font-caption font-medium text-muted-foreground uppercase tracking-wider">
                Quality
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {models?.map((model, index) => (
              <tr key={index} className="hover:bg-muted/50 transition-base">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-caption font-medium text-foreground">
                      {model?.name}
                    </span>
                    {model?.isRecommended && (
                      <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-caption font-medium rounded">
                        Recommended
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    {model?.provider}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    {model?.contextWindow}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-mono text-muted-foreground">
                    ${model?.costPer1k}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-[80px]">
                      <div 
                        className="h-full bg-primary transition-all"
                        style={{ width: `${model?.speedScore}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {model?.speedScore}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-[80px]">
                      <div 
                        className="h-full bg-accent transition-all"
                        style={{ width: `${model?.qualityScore}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {model?.qualityScore}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModelComparisonTable;