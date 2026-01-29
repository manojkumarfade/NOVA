import React from 'react';
import Icon from '../../shared/components/AppIcon';
import Button from '../../shared/components/ui/Button';

const PlanReviewCard = ({ plan, onApprove, onReject }) => {
    if (!plan) return null;

    return (
        <div className="border border-border rounded-lg bg-card p-4 my-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
                <Icon name="Map" size={18} className="text-primary" />
                <h3 className="font-semibold text-sm text-foreground">Proposed Execution Plan</h3>
            </div>

            <div className="space-y-3 mb-4">
                {plan.steps && plan.steps.map((step, index) => (
                    <div key={index} className="flex gap-3 text-sm">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                            {index + 1}
                        </div>
                        <div className="flex-1">
                            <p className="text-foreground font-medium">{step.description}</p>
                            {step.url && <p className="text-xs text-muted-foreground font-mono mt-0.5">{step.url}</p>}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-2 pt-2">
                <Button
                    variant="default"
                    size="sm"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    onClick={onApprove}
                    iconName="Check"
                >
                    Approve Plan
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-destructive border-destructive/30 hover:bg-destructive/10"
                    onClick={onReject}
                    iconName="X"
                >
                    Reject
                </Button>
            </div>
        </div>
    );
};

export default PlanReviewCard;
