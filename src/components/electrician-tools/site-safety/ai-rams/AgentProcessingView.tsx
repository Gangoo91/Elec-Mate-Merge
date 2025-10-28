import React, { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck, Wrench, CheckCircle2, Loader2, AlertCircle, Clock, Sparkles } from 'lucide-react';
import { SubStepProgress, SubStep } from './SubStepProgress';
import { GenerationTimer } from './GenerationTimer';
import { TimelineExpectation } from './TimelineExpectation';

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
  const [currentSeconds, setCurrentSeconds] = useState(0);

  // Calculate status flags first (needed in useEffect)
  const allComplete = steps.every(step => step.status === 'complete');
  const hasError = steps.some(step => step.status === 'error');
  const isProcessing = steps.some(step => step.status === 'processing');

  useEffect(() => {
    if (!isVisible) {
      setCurrentSeconds(0);
      return;
    }
    const interval = setInterval(() => setCurrentSeconds(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [isVisible]);

  // Reset timer on error
  useEffect(() => {
    if (hasError) {
      setCurrentSeconds(0);
    }
  }, [hasError]);

  // Reset timer when processing starts
  useEffect(() => {
    if (isProcessing && steps.length > 0) {
      setCurrentSeconds(0);
    }
  }, [isProcessing, steps.length]);

  if (!isVisible || steps.length === 0) return null;

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

  const formatTimeRemaining = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins}m ${secs}s remaining`;
    }
    return `${secs}s remaining`;
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {!allComplete && currentSeconds < 10 && (
        <TimelineExpectation currentSeconds={currentSeconds} />
      )}
      
    <Card className="border-elec-yellow/30 shadow-lg bg-gradient-to-br from-elec-grey to-elec-grey/80">
      <CardHeader className="pb-5 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight flex items-center gap-3">
            {allComplete ? (
              <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8 text-green-500 animate-in fade-in zoom-in duration-300" />
            ) : hasError ? (
              <AlertCircle className="h-7 w-7 sm:h-8 sm:w-8 text-red-500" />
            ) : (
              <Sparkles className="h-7 w-7 sm:h-8 sm:w-8 text-elec-yellow" />
            )}
            <span className="bg-gradient-to-r from-elec-yellow to-elec-yellow/70 bg-clip-text text-transparent">
              AI Processing
            </span>
          </CardTitle>
          <GenerationTimer isRunning={isProcessing && !allComplete} />
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-elec-light/80 font-semibold">Overall Progress</span>
            <div className="flex items-center gap-3">
              {estimatedTimeRemaining !== undefined && estimatedTimeRemaining > 0 && !allComplete && (
                <span className="text-elec-light/60 font-medium tabular-nums">{formatTimeRemaining(estimatedTimeRemaining)}</span>
              )}
              <span className="text-elec-yellow font-bold text-lg tabular-nums">{Math.round(overallProgress)}%</span>
            </div>
          </div>
          <div className="relative">
            <Progress value={overallProgress} className="h-3" />
            {isProcessing && overallProgress < 95 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-elec-yellow rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-1 bg-elec-yellow rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1 h-1 bg-elec-yellow rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cancel button */}
        {isProcessing && !allComplete && onCancel && (
          <button
            onClick={onCancel}
            className="w-full mt-2 px-4 py-2.5 text-sm font-semibold text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/50 rounded-lg transition-all hover:bg-red-500/10 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
          >
            Cancel Generation
          </button>
        )}
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-5 px-4 sm:px-6 pb-6">
        {/* Vertical Timeline - Mobile Optimized */}
        <div className="space-y-3 sm:space-y-5">
          {steps.map((step, idx) => {
            const Icon = agentIcons[step.agent];
            const isActive = step.status === 'processing' || step.status === 'complete';
            const agentColor = step.agent === 'health-safety' ? 'green' : 'blue';
            
            return (
              <div key={step.agent} className="relative">
                {/* Connector line with gradient animation */}
                {idx < steps.length - 1 && (
                  <div className={`absolute left-6 sm:left-7 top-[60px] sm:top-[64px] w-0.5 h-[calc(100%+16px)] sm:h-[calc(100%+24px)] -mb-4 sm:-mb-6 transition-all duration-700 ${
                    step.status === 'complete' 
                      ? 'bg-gradient-to-b from-elec-yellow via-elec-yellow to-elec-yellow/30 shadow-[0_0_8px_rgba(255,193,7,0.5)]' 
                      : 'bg-elec-yellow/20'
                  }`} />
                )}
                
                <div className={`relative flex gap-4 sm:gap-5 p-4 sm:p-5 rounded-xl transition-all duration-300 ${
                  step.status === 'processing'
                    ? 'bg-gradient-to-br from-elec-yellow/10 via-elec-grey/90 to-elec-grey/90 border border-elec-yellow/40 shadow-[0_0_20px_rgba(255,193,7,0.15)] backdrop-blur-sm'
                    : isActive 
                    ? 'bg-elec-grey/80 border border-elec-yellow/30' 
                    : 'bg-elec-grey/50 border border-elec-yellow/10'
                } ${step.status === 'complete' ? 'animate-in fade-in slide-in-from-left-4 duration-500' : ''}`}>
                  {/* Icon with glow effect */}
                  <div className={`shrink-0 h-12 w-12 sm:h-14 sm:w-14 rounded-xl flex items-center justify-center transition-all duration-300 relative ${
                    step.status === 'complete' 
                      ? 'bg-gradient-to-br from-green-500/30 to-green-500/10 border-2 border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                      : step.status === 'processing'
                      ? 'bg-gradient-to-br from-elec-yellow/30 to-elec-yellow/10 border-2 border-elec-yellow/60 shadow-[0_0_20px_rgba(255,193,7,0.4)]'
                      : 'bg-muted border-2 border-border'
                  }`}>
                    <Icon className={`relative h-6 w-6 sm:h-7 sm:w-7 ${
                      step.status === 'complete' 
                        ? 'text-green-400' 
                        : step.status === 'processing'
                        ? 'text-elec-yellow'
                        : 'text-muted-foreground'
                    }`} />
                    {step.status === 'complete' && (
                      <Sparkles className="absolute -top-1 -right-1 h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-300 animate-in zoom-in duration-300" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-3">
                    {/* Title and Status Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-base sm:text-lg leading-tight tracking-tight">
                          {agentNames[step.agent]}
                        </h4>
                        <p className="text-sm sm:text-base text-elec-light/70 mt-1 sm:mt-1.5 font-medium leading-relaxed">
                          {agentDescriptions[step.agent]}
                        </p>
                      </div>
                      <div className="shrink-0 flex items-center gap-2.5 self-start">
                        {getStatusIcon(step.status)}
                        {getStatusBadge(step.status)}
                      </div>
                    </div>

                    {/* Sub-step progress */}
                    {step.status === 'processing' && (
                      <>
                        <SubStepProgress 
                          currentSubStep={step.subStep || null}
                          isComplete={false}
                        />
                        <div className="text-xs text-elec-light/60 mt-2">
                          <span className="animate-pulse">
                            {step.agent === 'health-safety' 
                              ? 'Identifying hazards and controls...' 
                              : 'Planning installation sequence...'}
                          </span>
                        </div>
                      </>
                    )}

                    {/* Time elapsed for completed steps */}
                    {step.status === 'complete' && step.timeElapsed && (
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-elec-light/60">
                        <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span className="font-medium tabular-nums">Completed in {step.timeElapsed}s</span>
                      </div>
                    )}

                    {/* Reasoning - only show when complete */}
                    {step.status === 'complete' && step.reasoning && (
                      <div className="pt-3 border-t border-elec-yellow/20 animate-in fade-in slide-in-from-top-2 duration-300">
                        <p className="text-sm sm:text-base text-elec-light/90 font-medium leading-relaxed">
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
          <div className="mt-4 sm:mt-6 p-4 sm:p-5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10 border-2 border-green-500/40 animate-fade-in shadow-[0_0_30px_rgba(34,197,94,0.2)]">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="h-8 w-8 sm:h-9 sm:w-9 text-green-400 shrink-0" />
              <div className="flex-1">
                <p className="text-lg sm:text-xl font-bold text-green-400 tracking-tight leading-tight">
                  Documentation Generated Successfully
                </p>
                <p className="text-sm sm:text-base text-green-400/80 mt-1.5 font-medium leading-relaxed">
                  Review and edit your RAMS below
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
    </div>
  );
};
