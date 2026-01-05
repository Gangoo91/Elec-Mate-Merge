import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Wrench, CheckCircle, Clock, Zap, XCircle, FileText, ChevronDown, Sparkles } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { TimelineExpectation } from './TimelineExpectation';
import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';

interface AgentStep {
  name: string;
  status: 'pending' | 'processing' | 'complete';
  progress: number;
  currentStep?: string;
  reasoning?: string;
}

interface AgentProcessingViewProps {
  overallProgress: number;
  currentStep: string;
  elapsedTime: number;
  estimatedTimeRemaining: number;
  agentSteps: AgentStep[];
  onCancel?: () => void;
  isCancelling?: boolean;
  jobDescription?: string;
  hsAgentProgress?: number;
  installerAgentProgress?: number;
  hsAgentStatus?: string;
  installerAgentStatus?: string;
}

export const AgentProcessingView: React.FC<AgentProcessingViewProps> = ({
  overallProgress,
  currentStep,
  elapsedTime,
  estimatedTimeRemaining,
  agentSteps,
  onCancel,
  isCancelling = false,
  jobDescription,
  hsAgentProgress = 0,
  installerAgentProgress = 0,
  hsAgentStatus = 'pending',
  installerAgentStatus = 'pending',
}) => {
  const [timerProgress, setTimerProgress] = React.useState(0);
  const [isComplete, setIsComplete] = React.useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  // Timer-based smooth progress: 0-95% over 3:30 (210 seconds)
  React.useEffect(() => {
    const TOTAL_TIME = 210; // 3 minutes 30 seconds
    const MAX_PROGRESS = 95; // Never go above 95% until complete
    
    const interval = setInterval(() => {
      setTimerProgress(prev => {
        if (prev >= MAX_PROGRESS) return MAX_PROGRESS;
        const increment = (MAX_PROGRESS / TOTAL_TIME); // ~0.45% per second
        return Math.min(prev + increment, MAX_PROGRESS);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Jump to 100% when actually complete
  React.useEffect(() => {
    if (overallProgress >= 100 && !isComplete) {
      setTimerProgress(100);
      setIsComplete(true);
    }
  }, [overallProgress, isComplete]);

  const displayProgress = isComplete ? 100 : timerProgress;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAgentIcon = (name: string) => {
    switch (name) {
      case 'health-safety':
        return Shield;
      case 'installer':
        return Wrench;
      default:
        return Zap;
    }
  };

  const getAgentTitle = (name: string) => {
    switch (name) {
      case 'health-safety':
        return 'Health & Safety Analyser';
      case 'installer':
        return 'Installation Planner';
      default:
        return name;
    }
  };

  const getAgentDescription = (name: string) => {
    switch (name) {
      case 'health-safety':
        return 'Analysing risks and safety requirements';
      case 'installer':
        return 'Creating detailed method statements';
      default:
        return 'Processing...';
    }
  };

  const currentAgentIndex = agentSteps.findIndex(a => a.status === 'processing');

  return (
    <div className="space-y-4 sm:space-y-6 pb-8 px-2 sm:px-0">
      {/* Overall Progress Card */}
      <Card className="overflow-hidden">
        <CardContent className="p-4 sm:p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-elec-yellow/10 flex items-center justify-center border border-elec-yellow/20">
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-elec-yellow" />
              </div>
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-2xl border-2 border-elec-yellow/20 animate-ping opacity-20" style={{ animationDuration: '2s' }} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-white truncate">Generating RAMS</h2>
              <p className="text-sm text-white/50 truncate mt-0.5">{currentStep}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-3">
            <div className="relative w-full h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
              {/* Progress fill */}
              <div
                className="h-full bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow transition-all duration-700 ease-out relative overflow-hidden rounded-full"
                style={{ width: `${displayProgress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold text-elec-yellow tabular-nums">
                  {Math.round(displayProgress)}%
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 text-white/40">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span className="tabular-nums">{formatTime(elapsedTime)}</span>
                </span>
                <span className="hidden sm:flex items-center gap-1.5">
                  <span className="text-white/20">•</span>
                  <span className="tabular-nums">~{formatTime(estimatedTimeRemaining)}</span>
                  <span className="text-white/30">left</span>
                </span>
              </div>
            </div>

            {/* Step Indicator Pills */}
            <div className="flex items-center justify-center gap-2 pt-1">
              {agentSteps.map((agent) => (
                <div
                  key={agent.name}
                  className={`
                    h-1.5 rounded-full transition-all duration-500
                    ${agent.status === 'complete' ? 'w-8 bg-green-500' : ''}
                    ${agent.status === 'processing' ? 'w-12 bg-elec-yellow' : ''}
                    ${agent.status === 'pending' ? 'w-4 bg-white/10' : ''}
                  `}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>

      {/* Job Description Card - Collapsible */}
      {jobDescription && (
        <Card>
          <CardContent className="p-0">
            <Collapsible defaultOpen={false}>
              <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-between p-4 group touch-manipulation active:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                    </div>
                    <span className="font-semibold text-white text-sm sm:text-base">Your Job Description</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-white/40 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 pb-4">
                  <div className="p-3 sm:p-4 rounded-xl bg-[#1a1a1a] border border-white/5">
                    <p className="text-sm text-white/60 leading-relaxed whitespace-pre-wrap">
                      {jobDescription}
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      )}

      {/* Agent Cards - Grid on larger screens */}
      <div className="grid gap-4 sm:grid-cols-2">
        {agentSteps.map((agent) => {
          const Icon = getAgentIcon(agent.name);
          const isActive = agent.status === 'processing';
          const isComplete = agent.status === 'complete';
          const isPending = agent.status === 'pending';
          const realProgress = agent.name === 'health-safety' ? hsAgentProgress : installerAgentProgress;

          return (
            <Card
              key={agent.name}
              className={`
                transition-all duration-300 overflow-hidden
                ${isActive ? 'ring-2 ring-elec-yellow/40 shadow-lg shadow-elec-yellow/5' : ''}
                ${isComplete ? 'ring-2 ring-green-500/30' : ''}
                ${isPending ? 'opacity-50' : ''}
              `}
            >
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                  {/* Icon */}
                  <div className={`
                    relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-300
                    ${isActive ? 'bg-elec-yellow/10 border-2 border-elec-yellow/30' : ''}
                    ${isComplete ? 'bg-green-500/10 border-2 border-green-500/30' : ''}
                    ${isPending ? 'bg-white/5 border border-white/10' : ''}
                  `}>
                    {isComplete ? (
                      <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-green-400" />
                    ) : (
                      <Icon className={`
                        w-7 h-7 sm:w-8 sm:h-8
                        ${isActive ? 'text-elec-yellow' : 'text-white/30'}
                      `} />
                    )}
                    {isActive && (
                      <div className="absolute inset-0 rounded-2xl border-2 border-elec-yellow/30 animate-ping opacity-20" style={{ animationDuration: '2s' }} />
                    )}
                  </div>

                  {/* Title & Status */}
                  <div className="space-y-2">
                    <h3 className={`
                      text-base sm:text-lg font-bold
                      ${isActive ? 'text-elec-yellow' : ''}
                      ${isComplete ? 'text-green-400' : ''}
                      ${isPending ? 'text-white/40' : ''}
                    `}>
                      {getAgentTitle(agent.name)}
                    </h3>

                    {/* Status Badge */}
                    <div className={`
                      inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium
                      ${isActive ? 'bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/20' : ''}
                      ${isComplete ? 'bg-green-500/10 text-green-400 border border-green-500/20' : ''}
                      ${isPending ? 'bg-white/5 text-white/40 border border-white/10' : ''}
                    `}>
                      {isActive && (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-elec-yellow animate-pulse" />
                          Processing
                        </>
                      )}
                      {isComplete && (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          Complete
                        </>
                      )}
                      {isPending && (
                        <>
                          <Clock className="w-3.5 h-3.5" />
                          Waiting
                        </>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar for Active Agent */}
                  {isActive && (
                    <div className="w-full space-y-1.5">
                      <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-elec-yellow to-amber-400 transition-all duration-500 rounded-full"
                          style={{ width: `${realProgress}%` }}
                        />
                      </div>
                      <p className="text-xs text-white/40 tabular-nums">{realProgress}%</p>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-white/40">
                    {getAgentDescription(agent.name)}
                  </p>

                  {/* Current Step / Reasoning */}
                  {(isActive || isComplete) && (agent.currentStep || agent.reasoning) && (
                    <div className="w-full p-3 bg-[#1a1a1a] rounded-xl border border-white/5">
                      <div className="flex items-start gap-2">
                        <Zap className="w-3.5 h-3.5 text-elec-yellow shrink-0 mt-0.5" />
                        <p className="text-xs text-white/50 leading-relaxed text-left">
                          {agent.reasoning || agent.currentStep}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Timeline */}
      <TimelineExpectation />

      {/* Cancel Button */}
      {onCancel && (
        <Card className="border-red-500/20 bg-red-950/20">
          <CardContent className="pt-6 pb-5">
            <div className="flex flex-col items-center gap-4 text-center">
              <XCircle className="w-8 h-8 text-red-400" />
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-1">
                  Need to Stop?
                </h3>
                <p className="text-sm text-gray-400">
                  You can cancel this generation if you need to make changes to your input
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowCancelDialog(true)}
                disabled={isCancelling}
                className="border-red-500/40 hover:border-red-500 hover:bg-red-500/10 text-red-400"
              >
                {isCancelling ? 'Cancelling...' : 'Cancel Generation'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        title="Cancel RAMS Generation?"
        description="Are you sure you want to cancel? This will stop the generation and cannot be undone. You can start a new generation afterwards."
        confirmText="Yes, Cancel Generation"
        cancelText="No, Continue"
        onConfirm={() => {
          setShowCancelDialog(false);
          onCancel?.();
        }}
        variant="destructive"
        loading={isCancelling}
      />
    </div>
  );
};
