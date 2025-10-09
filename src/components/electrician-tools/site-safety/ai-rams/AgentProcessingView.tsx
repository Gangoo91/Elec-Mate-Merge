import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Wrench, CheckCircle2, Loader2, AlertCircle, Clock } from 'lucide-react';

export interface ReasoningStep {
  agent: 'health-safety' | 'installer';
  status: 'pending' | 'processing' | 'complete' | 'error';
  reasoning?: string;
}

export interface AgentProcessingViewProps {
  steps: ReasoningStep[];
  isVisible: boolean;
}

const agentIcons = {
  'health-safety': ShieldCheck,
  'installer': Wrench
};

const agentNames = {
  'health-safety': 'Health & Safety Analyser',
  'installer': 'Installation Planner'
};

const agentDescriptions = {
  'health-safety': 'Analysing risks and safety requirements',
  'installer': 'Creating detailed method statements'
};

export const AgentProcessingView: React.FC<AgentProcessingViewProps> = ({
  steps,
  isVisible
}) => {
  if (!isVisible || steps.length === 0) return null;

  const getStatusIcon = (status: ReasoningStep['status']) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Loader2 className="h-5 w-5 text-elec-yellow animate-spin" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: ReasoningStep['status']) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/30 text-xs">Complete</Badge>;
      case 'processing':
        return <Badge className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 text-xs animate-pulse">Processing</Badge>;
      case 'error':
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/30 text-xs">Error</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Pending</Badge>;
    }
  };

  const allComplete = steps.every(step => step.status === 'complete');

  return (
    <Card className="border-none shadow-sm bg-card/60 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg md:text-xl font-bold flex items-center gap-2">
          <Loader2 className={`h-5 w-5 ${allComplete ? 'text-green-500' : 'text-elec-yellow animate-spin'}`} />
          AI Processing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Mobile: Vertical Timeline */}
        <div className="space-y-3">
          {steps.map((step, idx) => {
            const Icon = agentIcons[step.agent];
            const isActive = step.status === 'processing' || step.status === 'complete';
            
            return (
              <div key={step.agent} className="relative">
                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div className={`absolute left-5 top-12 w-0.5 h-full transition-colors duration-500 ${
                    step.status === 'complete' ? 'bg-elec-yellow' : 'bg-border'
                  }`} />
                )}
                
                <div className={`relative flex gap-4 p-4 rounded-xl transition-all duration-300 ${
                  isActive ? 'bg-primary/5 border border-primary/20' : 'bg-background/50 border border-transparent'
                }`}>
                  {/* Icon */}
                  <div className={`shrink-0 h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    step.status === 'complete' 
                      ? 'bg-green-500/10 border border-green-500/30' 
                      : step.status === 'processing'
                      ? 'bg-elec-yellow/10 border border-elec-yellow/30 animate-pulse'
                      : 'bg-muted border border-border'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      step.status === 'complete' 
                        ? 'text-green-500' 
                        : step.status === 'processing'
                        ? 'text-elec-yellow'
                        : 'text-muted-foreground'
                    }`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm md:text-base leading-tight">
                          {agentNames[step.agent]}
                        </h4>
                        <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                          {agentDescriptions[step.agent]}
                        </p>
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        {getStatusIcon(step.status)}
                        {getStatusBadge(step.status)}
                      </div>
                    </div>

                    {/* Reasoning - only show when complete */}
                    {step.status === 'complete' && step.reasoning && (
                      <div className="pt-2 border-t border-border">
                        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                          {step.reasoning}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion message */}
        {allComplete && (
          <div className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30 animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                  Documentation Generated Successfully
                </p>
                <p className="text-xs text-green-600/80 dark:text-green-400/80 mt-0.5">
                  Review and edit your RAMS below
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
