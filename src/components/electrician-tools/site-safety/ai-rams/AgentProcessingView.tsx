import React, { useState, useMemo } from 'react';
import { Shield, Wrench, CheckCircle, Clock, XCircle, Sparkles, Loader2 } from 'lucide-react';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { cn } from '@/lib/utils';

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
  hsAgentProgress = 0,
  installerAgentProgress = 0,
}) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  // Calculate real progress from actual agent progress
  const displayProgress = useMemo(() => {
    // Each agent contributes 50% to the total
    const hsContribution = (hsAgentProgress / 100) * 50;
    const installerContribution = (installerAgentProgress / 100) * 50;
    const calculatedProgress = hsContribution + installerContribution;

    // If both agents are complete, show 100%
    const bothComplete = agentSteps.every(step => step.status === 'complete');
    if (bothComplete || overallProgress >= 100) {
      return 100;
    }

    // Cap at 95% until fully complete
    return Math.min(Math.round(calculatedProgress), 95);
  }, [hsAgentProgress, installerAgentProgress, agentSteps, overallProgress]);

  const isComplete = displayProgress >= 100;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ':' + secs.toString().padStart(2, '0');
  };

  const getAgentIcon = (name: string) => {
    switch (name) {
      case 'health-safety': return Shield;
      case 'installer': return Wrench;
      default: return Sparkles;
    }
  };

  const getAgentTitle = (name: string) => {
    switch (name) {
      case 'health-safety': return 'Health & Safety Agent';
      case 'installer': return 'Installation Planner';
      default: return name;
    }
  };

  const getAgentDescription = (name: string, status: string) => {
    if (status === 'complete') return 'Analysis complete';
    if (status === 'pending') return 'Waiting to start...';
    switch (name) {
      case 'health-safety': return 'Analysing hazards & control measures...';
      case 'installer': return 'Creating method steps & procedures...';
      default: return 'Processing...';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center animate-fade-in-up">
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className={cn(
            "w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center transition-all duration-500",
            isComplete
              ? "bg-green-500/10 border-2 border-green-500/30"
              : "bg-elec-yellow/10 border-2 border-elec-yellow/20"
          )}>
            {isComplete ? (
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-400 animate-check-bounce" />
            ) : (
              <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-elec-yellow animate-pulse" />
            )}
          </div>
          {!isComplete && (
            <div className="absolute inset-0 rounded-3xl bg-elec-yellow/20 animate-ping opacity-20" style={{ animationDuration: '2s' }} />
          )}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          {isComplete ? 'Generation Complete!' : 'Generating RAMS'}
        </h2>
        <p className="text-white/60 text-sm sm:text-base">
          {isComplete ? 'Your document is ready' : 'AI agents are working on your document'}
        </p>
      </div>

      {/* Progress Section */}
      <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        {/* Progress Bar */}
        <div className="relative">
          {/* Glow effect */}
          <div
            className="absolute inset-0 h-4 rounded-full bg-elec-yellow/30 blur-lg transition-all duration-700"
            style={{ width: `${displayProgress}%`, opacity: isComplete ? 0.5 : 0.3 }}
          />
          {/* Track */}
          <div className="relative w-full h-4 bg-white/[0.05] rounded-full overflow-hidden border border-white/[0.08]">
            {/* Fill */}
            <div
              className={cn(
                "h-full rounded-full relative overflow-hidden transition-all duration-700 ease-out",
                isComplete
                  ? "bg-gradient-to-r from-green-500 via-green-400 to-green-500"
                  : "bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow"
              )}
              style={{ width: `${displayProgress}%` }}
            >
              {/* Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              {/* Edge pulse */}
              {!isComplete && displayProgress > 0 && (
                <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/60 rounded-full animate-pulse" />
              )}
            </div>
          </div>
        </div>

        {/* Progress Info */}
        <div className="flex items-center justify-between">
          <span className={cn(
            "text-3xl sm:text-4xl font-bold tabular-nums transition-colors duration-300",
            isComplete ? "text-green-400" : "text-elec-yellow"
          )}>
            {displayProgress}%
          </span>
          <div className="flex items-center gap-3 text-white/50 text-sm">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span className="tabular-nums">{formatTime(elapsedTime)}</span>
            </span>
            {!isComplete && (
              <>
                <span className="text-white/20">•</span>
                <span className="tabular-nums">~{formatTime(estimatedTimeRemaining)} left</span>
              </>
            )}
          </div>
        </div>

        {/* Agent Status Indicators */}
        <div className="flex items-center justify-center gap-3">
          {agentSteps.map((agent) => (
            <div
              key={agent.name}
              className={cn(
                'h-2 rounded-full transition-all duration-500',
                agent.status === 'complete' && 'w-16 bg-green-500',
                agent.status === 'processing' && 'w-20 bg-elec-yellow animate-pulse',
                agent.status === 'pending' && 'w-8 bg-white/10'
              )}
            />
          ))}
        </div>
      </div>

      {/* Agent Cards */}
      <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        {agentSteps.map((agent, index) => {
          const Icon = getAgentIcon(agent.name);
          const isActive = agent.status === 'processing';
          const isAgentComplete = agent.status === 'complete';
          const isPending = agent.status === 'pending';
          const realProgress = agent.name === 'health-safety' ? hsAgentProgress : installerAgentProgress;

          return (
            <div
              key={agent.name}
              className={cn(
                'p-5 rounded-2xl border transition-all duration-500',
                isActive && 'bg-elec-yellow/5 border-elec-yellow/30 shadow-lg shadow-elec-yellow/10',
                isAgentComplete && 'bg-green-500/5 border-green-500/30',
                isPending && 'bg-white/[0.02] border-white/[0.06] opacity-50'
              )}
              style={{
                animationDelay: `${(index + 3) * 100}ms`,
                transform: isAgentComplete ? 'scale(1)' : 'scale(1)'
              }}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className={cn(
                  'w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500',
                  isActive && 'bg-elec-yellow/10',
                  isAgentComplete && 'bg-green-500/10',
                  isPending && 'bg-white/5'
                )}>
                  {isAgentComplete ? (
                    <CheckCircle className="w-7 h-7 text-green-400 animate-check-bounce" />
                  ) : isActive ? (
                    <Loader2 className="w-7 h-7 text-elec-yellow animate-spin" />
                  ) : (
                    <Icon className="w-7 h-7 text-white/30" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={cn(
                      'font-semibold text-base truncate transition-colors duration-300',
                      isActive && 'text-elec-yellow',
                      isAgentComplete && 'text-green-400',
                      isPending && 'text-white/40'
                    )}>
                      {getAgentTitle(agent.name)}
                    </h3>
                    {isActive && (
                      <span className="text-sm font-medium text-elec-yellow tabular-nums shrink-0 bg-elec-yellow/10 px-2 py-0.5 rounded-full">
                        {realProgress}%
                      </span>
                    )}
                    {isAgentComplete && (
                      <span className="text-sm font-medium text-green-400 tabular-nums shrink-0 bg-green-500/10 px-2 py-0.5 rounded-full">
                        Done
                      </span>
                    )}
                  </div>
                  <p className={cn(
                    'text-sm mt-1 transition-colors duration-300',
                    isActive && 'text-white/60',
                    isAgentComplete && 'text-green-400/60',
                    isPending && 'text-white/30'
                  )}>
                    {getAgentDescription(agent.name, agent.status)}
                  </p>

                  {/* Agent Progress Bar */}
                  {isActive && (
                    <div className="mt-3 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-elec-yellow rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${realProgress}%` }}
                      />
                    </div>
                  )}

                  {/* Reasoning */}
                  {isActive && agent.reasoning && (
                    <p className="mt-3 text-xs text-white/40 leading-relaxed line-clamp-2 italic">
                      "{agent.reasoning}"
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cancel Button */}
      {onCancel && !isComplete && (
        <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <button
            onClick={() => setShowCancelDialog(true)}
            disabled={isCancelling}
            className="w-full py-4 text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all disabled:opacity-50"
          >
            {isCancelling ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Cancelling...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <XCircle className="w-4 h-4" />
                Cancel Generation
              </span>
            )}
          </button>
        </div>
      )}

      <ConfirmationDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        title="Cancel RAMS Generation?"
        description="Are you sure you want to cancel? This will stop the generation and cannot be undone."
        confirmText="Yes, Cancel"
        cancelText="Continue"
        onConfirm={() => {
          setShowCancelDialog(false);
          onCancel?.();
        }}
        variant="destructive"
        loading={isCancelling}
      />

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer { animation: shimmer 2.5s ease-in-out infinite; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }

        @keyframes checkBounce {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-check-bounce { animation: checkBounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
      `}</style>
    </div>
  );
};
