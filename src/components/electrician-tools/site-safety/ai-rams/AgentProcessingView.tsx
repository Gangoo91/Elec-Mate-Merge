import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, CheckCircle2, Loader2, AlertCircle, Shield, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReasoningStep {
  agent: 'health-safety' | 'installer';
  status: 'pending' | 'processing' | 'complete' | 'error';
  reasoning?: string;
}

interface AgentProcessingViewProps {
  steps: ReasoningStep[];
  isVisible: boolean;
}

const agentIcons = {
  'health-safety': Shield,
  'installer': Wrench
};

const agentNames = {
  'health-safety': 'Health & Safety Agent',
  'installer': 'Installation Agent'
};

const agentDescriptions = {
  'health-safety': 'Analyzing hazards and creating risk assessments',
  'installer': 'Generating step-by-step installation procedures'
};

export const AgentProcessingView: React.FC<AgentProcessingViewProps> = ({ steps, isVisible }) => {
  if (!isVisible || steps.length === 0) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />;
      case 'complete':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30">Processing</Badge>;
      case 'complete':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">Complete</Badge>;
      case 'error':
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/30">Error</Badge>;
      default:
        return <Badge variant="outline" className="bg-muted text-muted-foreground">Pending</Badge>;
    }
  };

  return (
    <Card className="border-primary/30 bg-card/60">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Brain className="h-5 w-5 text-elec-yellow" />
          AI Processing
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = agentIcons[step.agent];
            
            return (
              <div
                key={step.agent}
                className={cn(
                  "relative p-4 rounded-lg border transition-all duration-300",
                  step.status === 'processing' && "border-elec-yellow/50 bg-elec-yellow/5",
                  step.status === 'complete' && "border-green-500/30 bg-green-500/5",
                  step.status === 'error' && "border-red-500/30 bg-red-500/5",
                  step.status === 'pending' && "border-border/30 bg-background/20"
                )}
              >
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div 
                    className={cn(
                      "absolute left-[1.875rem] top-full h-4 w-0.5 transition-colors",
                      step.status === 'complete' ? "bg-green-500/30" : "bg-border/30"
                    )}
                  />
                )}

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                      step.status === 'processing' && "bg-elec-yellow/20",
                      step.status === 'complete' && "bg-green-500/20",
                      step.status === 'error' && "bg-red-500/20",
                      step.status === 'pending' && "bg-muted/20"
                    )}>
                      <Icon className={cn(
                        "h-4 w-4",
                        step.status === 'processing' && "text-elec-yellow",
                        step.status === 'complete' && "text-green-500",
                        step.status === 'error' && "text-red-500",
                        step.status === 'pending' && "text-muted-foreground"
                      )} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">
                        {agentNames[step.agent]}
                      </h4>
                      {getStatusIcon(step.status)}
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
                      {agentDescriptions[step.agent]}
                    </p>

                    {step.reasoning && step.status === 'complete' && (
                      <div className="mt-3 p-3 bg-background/50 rounded border border-border/30">
                        <p className="text-xs text-muted-foreground line-clamp-3">
                          {step.reasoning}
                        </p>
                      </div>
                    )}

                    <div className="mt-2">
                      {getStatusBadge(step.status)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {steps.every(s => s.status === 'complete') && (
          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              AI processing complete! Review your generated RAMS documentation below.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
