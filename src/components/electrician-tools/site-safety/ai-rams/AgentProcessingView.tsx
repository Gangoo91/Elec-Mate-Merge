import React, { useState } from 'react';
import { Shield, Wrench, CheckCircle, Clock, XCircle, Sparkles, Loader2 } from 'lucide-react';
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
  hsAgentProgress = 0,
  installerAgentProgress = 0,
}) => {
  const [timerProgress, setTimerProgress] = React.useState(0);
  const [isComplete, setIsComplete] = React.useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  React.useEffect(() => {
    const TOTAL_TIME = 210;
    const MAX_PROGRESS = 95;
    const interval = setInterval(() => {
      setTimerProgress(prev => {
        if (prev >= MAX_PROGRESS) return MAX_PROGRESS;
        const increment = (MAX_PROGRESS / TOTAL_TIME);
        return Math.min(prev + increment, MAX_PROGRESS);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
      case 'health-safety': return 'Health & Safety';
      case 'installer': return 'Installation Planner';
      default: return name;
    }
  };

  const getAgentDescription = (name: string, status: string) => {
    if (status === 'complete') return 'Complete';
    if (status === 'pending') return 'Waiting...';
    switch (name) {
      case 'health-safety': return 'Analysing hazards...';
      case 'installer': return 'Creating method steps...';
      default: return 'Processing...';
    }
  };
  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center animate-fade-in-up">
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-elec-yellow animate-pulse" />
          </div>
          <div className="absolute inset-0 rounded-2xl bg-elec-yellow/20 animate-ping opacity-20" style={{ animationDuration: '2s' }} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Generating RAMS</h2>
        <p className="text-white/70">Your document is being created</p>
      </div>

      <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className="relative">
          <div className="absolute inset-0 h-3 rounded-full bg-elec-yellow/20 blur-md animate-progress-glow" style={{ width: displayProgress + '%' }} />
          <div className="relative w-full h-3 bg-white/[0.03] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow transition-all duration-700 ease-out relative overflow-hidden rounded-full"
              style={{ width: displayProgress + '%' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-elec-yellow tabular-nums">
            {Math.round(displayProgress)}%
          </span>
          <div className="flex items-center gap-3 text-white/50 text-sm">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span className="tabular-nums">{formatTime(elapsedTime)}</span>
            </span>
            <span className="text-white/20">•</span>
            <span className="tabular-nums">~{formatTime(estimatedTimeRemaining)} left</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          {agentSteps.map((agent) => (
            <div
              key={agent.name}
              className={[
                'h-1.5 rounded-full transition-all duration-500',
                agent.status === 'complete' ? 'w-8 bg-green-500' : '',
                agent.status === 'processing' ? 'w-12 bg-elec-yellow animate-pulse' : '',
                agent.status === 'pending' ? 'w-4 bg-white/10' : ''
              ].join(' ')}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        {agentSteps.map((agent, index) => {
          const Icon = getAgentIcon(agent.name);
          const isActive = agent.status === 'processing';
          const isAgentComplete = agent.status === 'complete';
          const isPending = agent.status === 'pending';
          const realProgress = agent.name === 'health-safety' ? hsAgentProgress : installerAgentProgress;

          return (
            <div
              key={agent.name}
              className={[
                'p-4 rounded-xl border transition-all duration-300',
                isActive ? 'bg-elec-yellow/5 border-elec-yellow/20' : '',
                isAgentComplete ? 'bg-green-500/5 border-green-500/20' : '',
                isPending ? 'bg-white/[0.02] border-white/5 opacity-50' : ''
              ].join(' ')}
              style={{ animationDelay: ((index + 3) * 100) + 'ms' }}
            >
              <div className="flex items-center gap-4">
                <div className={[
                  'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300',
                  isActive ? 'bg-elec-yellow/10' : '',
                  isAgentComplete ? 'bg-green-500/10' : '',
                  isPending ? 'bg-white/5' : ''
                ].join(' ')}>
                  {isAgentComplete ? (
                    <CheckCircle className="w-6 h-6 text-green-400 animate-check-bounce" />
                  ) : isActive ? (
                    <Loader2 className="w-6 h-6 text-elec-yellow animate-spin" />
                  ) : (
                    <Icon className="w-6 h-6 text-white/30" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={[
                      'font-semibold truncate',
                      isActive ? 'text-elec-yellow' : '',
                      isAgentComplete ? 'text-green-400' : '',
                      isPending ? 'text-white/40' : ''
                    ].join(' ')}>
                      {getAgentTitle(agent.name)}
                    </h3>
                    {isActive && (
                      <span className="text-xs text-elec-yellow tabular-nums shrink-0">{realProgress}%</span>
                    )}
                  </div>
                  <p className={[
                    'text-sm mt-0.5',
                    isActive ? 'text-white/60' : '',
                    isAgentComplete ? 'text-green-400/60' : '',
                    isPending ? 'text-white/30' : ''
                  ].join(' ')}>
                    {getAgentDescription(agent.name, agent.status)}
                  </p>

                  {isActive && (
                    <div className="mt-2 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-elec-yellow transition-all duration-500 rounded-full"
                        style={{ width: realProgress + '%' }}
                      />
                    </div>
                  )}

                  {isActive && agent.reasoning && (
                    <p className="mt-2 text-xs text-white/40 leading-relaxed line-clamp-2">
                      {agent.reasoning}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {onCancel && (
        <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <button
            onClick={() => setShowCancelDialog(true)}
            disabled={isCancelling}
            className="w-full py-3 text-sm text-red-400/70 hover:text-red-400 transition-colors disabled:opacity-50"
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
          100% { transform: translateX(100%); }
        }
        .animate-shimmer { animation: shimmer 2s infinite; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
        @keyframes progressGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-progress-glow { animation: progressGlow 2s ease-in-out infinite; }
        @keyframes checkBounce {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-check-bounce { animation: checkBounce 0.4s ease-out; }
      `}</style>
    </div>
  );
};
