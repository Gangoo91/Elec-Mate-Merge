import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck, Wrench, CheckCircle2, Loader2, AlertCircle, Clock, Sparkles } from 'lucide-react';
import { SubStepProgress, SubStep } from './SubStepProgress';
import { GenerationTimer } from './GenerationTimer';

export interface ReasoningStep {
  agent: 'health-safety' | 'installer';
  status: 'pending' | 'processing' | 'complete' | 'error';
  reasoning?: string;
  subStep?: SubStep | null;
  timeElapsed?: number;
}

export interface AgentProcessingViewProps {
  steps: ReasoningStep[];
  isVisible: boolean;
  overallProgress?: number;
  estimatedTimeRemaining?: number;
  onCancel?: () => void;
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
  isVisible,
  overallProgress = 0,
  estimatedTimeRemaining,
  onCancel
}) => {
  if (!isVisible || steps.length === 0) return null;

  const allComplete = steps.every(step => step.status === 'complete');
  const hasError = steps.some(step => step.status === 'error');
  const isProcessing = steps.some(step => step.status === 'processing');

  const totalTimeElapsed = useMemo(() => {
    return steps.reduce((sum, step) => sum + (step.timeElapsed || 0), 0);
  }, [steps]);

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

  return (
    <Card className="border-elec-yellow/20 shadow-md bg-elec-grey">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-xl md:text-xl font-bold tracking-tight leading-tight flex items-center gap-2.5">
            {allComplete ? (
              <CheckCircle2 className="h-6 w-6 md:h-5 md:w-5 text-green-500 animate-in fade-in zoom-in duration-300" />
            ) : hasError ? (
              <AlertCircle className="h-6 w-6 md:h-5 md:w-5 text-red-500" />
            ) : null}
            AI Processing
          </CardTitle>
          <GenerationTimer isRunning={isProcessing && !allComplete} />
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-elec-light/70 font-medium">Overall Progress</span>
            <div className="flex items-center gap-2">
              {estimatedTimeRemaining !== undefined && estimatedTimeRemaining > 0 && !allComplete && (
                <span className="text-elec-light/50">~{estimatedTimeRemaining}s remaining</span>
              )}
              <span className="text-elec-yellow font-semibold">{Math.round(overallProgress)}%</span>
            </div>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        {/* Cancel button */}
        {isProcessing && !allComplete && onCancel && (
          <button
            onClick={onCancel}
            className="w-full mt-3 px-4 py-2 text-sm font-medium text-elec-light/70 hover:text-elec-light border border-elec-yellow/20 hover:border-elec-yellow/40 rounded-lg transition-all"
          >
            Cancel Generation
          </button>
        )}
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6">
        {/* Vertical Timeline - Mobile Optimized */}
        <div className="space-y-3 sm:space-y-4">
          {steps.map((step, idx) => {
            const Icon = agentIcons[step.agent];
            const isActive = step.status === 'processing' || step.status === 'complete';
            
            return (
              <div key={step.agent} className="relative">
                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div className={`absolute left-5 sm:left-5 top-11 sm:top-12 w-0.5 h-full transition-colors duration-500 ${
                    step.status === 'complete' ? 'bg-elec-yellow' : 'bg-elec-yellow/20'
                  }`} />
                )}
                
                <div className={`relative flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-300 ${
                  isActive ? 'bg-elec-grey/80 border border-elec-yellow/30' : 'bg-elec-grey/50 border border-transparent'
                } ${step.status === 'complete' ? 'animate-in fade-in slide-in-from-left-4 duration-500' : ''}`}>
                  {/* Icon */}
                  <div className={`shrink-0 h-10 w-10 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 relative ${
                    step.status === 'complete' 
                      ? 'bg-green-500/20 border border-green-500/40' 
                      : step.status === 'processing'
                      ? 'bg-elec-yellow/20 border border-elec-yellow/40 animate-pulse'
                      : 'bg-muted border border-border'
                  }`}>
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${
                      step.status === 'complete' 
                        ? 'text-green-500' 
                        : step.status === 'processing'
                        ? 'text-elec-yellow'
                        : 'text-muted-foreground'
                    }`} />
                    {step.status === 'complete' && (
                      <Sparkles className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-400 animate-in zoom-in duration-300" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-2">
                    {/* Title and Status Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm sm:text-base leading-tight tracking-tight">
                          {agentNames[step.agent]}
                        </h4>
                        <p className="text-xs sm:text-sm text-elec-light/70 mt-0.5 sm:mt-1 font-medium leading-relaxed">
                          {agentDescriptions[step.agent]}
                        </p>
                      </div>
                      <div className="shrink-0 flex items-center gap-2 self-start">
                        {getStatusIcon(step.status)}
                        {getStatusBadge(step.status)}
                      </div>
                    </div>

                    {/* Sub-step progress */}
                    {step.status === 'processing' && (
                      <SubStepProgress 
                        currentSubStep={step.subStep || null}
                        isComplete={false}
                      />
                    )}

                    {/* Time elapsed for completed steps */}
                    {step.status === 'complete' && step.timeElapsed && (
                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-elec-light/50">
                        <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        <span className="font-medium">Completed in {step.timeElapsed}s</span>
                      </div>
                    )}

                    {/* Reasoning - only show when complete */}
                    {step.status === 'complete' && step.reasoning && (
                      <div className="pt-2 sm:pt-3 border-t border-elec-yellow/20 animate-in fade-in slide-in-from-top-2 duration-300">
                        <p className="text-xs sm:text-sm text-elec-light/80 font-medium leading-relaxed">
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
          <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-green-500/10 border border-green-500/30 animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 md:h-5 md:w-5 text-green-500 shrink-0" />
              <div className="flex-1">
                <p className="text-base md:text-sm font-bold text-green-600 dark:text-green-400 tracking-tight leading-tight">
                  Documentation Generated Successfully
                </p>
                <p className="text-sm md:text-xs text-green-600/80 dark:text-green-400/80 mt-1 font-medium leading-relaxed">
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
