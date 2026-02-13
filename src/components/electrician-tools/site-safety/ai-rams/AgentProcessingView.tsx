import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    const hsContribution = (hsAgentProgress / 100) * 50;
    const installerContribution = (installerAgentProgress / 100) * 50;
    const calculatedProgress = hsContribution + installerContribution;

    const bothComplete = agentSteps.every(step => step.status === 'complete');
    if (bothComplete || overallProgress >= 100) {
      return 100;
    }

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
      case 'health-safety': return 'H&S Agent';
      case 'installer': return 'Install Planner';
      default: return name;
    }
  };

  const getAgentDescription = (name: string, status: string) => {
    if (status === 'complete') return 'Complete';
    if (status === 'pending') return 'Waiting...';
    switch (name) {
      case 'health-safety': return 'Analysing hazards...';
      case 'installer': return 'Creating procedures...';
      default: return 'Processing...';
    }
  };

  return (
    <div className="min-h-[100dvh] bg-elec-dark flex flex-col overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-elec-yellow/5 blur-[60px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content - Full width with compact padding */}
      <div className="relative z-10 flex-1 flex flex-col justify-evenly px-3 py-4 w-full">

        {/* Header Section - Compact */}
        <div className="text-center space-y-2">
          {/* Animated Icon - Smaller */}
          <div className="flex justify-center">
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full border border-elec-yellow/20"
                style={{ width: 56, height: 56, margin: -4 }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center",
                  isComplete ? "bg-green-500/10" : "bg-elec-yellow/10"
                )}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isComplete ? (
                  <CheckCircle className="h-6 w-6 text-green-400" />
                ) : (
                  <Sparkles className="h-6 w-6 text-elec-yellow" />
                )}
              </motion.div>
              {!isComplete && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-elec-yellow/20"
                  animate={{ scale: [1, 1.3], opacity: [0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 48, height: 48 }}
                />
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">
              {isComplete ? 'Complete!' : 'Generating RAMS'}
            </h2>
            <p className="text-[10px] text-white mt-0.5">
              {isComplete ? 'Document ready' : 'AI agents working'}
            </p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-2">
          {/* Large Percentage - Slightly smaller */}
          <div className="text-center">
            <motion.span
              className={cn(
                "text-4xl font-bold tabular-nums",
                isComplete ? "text-green-400" : "text-elec-yellow"
              )}
              key={displayProgress}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
            >
              {displayProgress}
            </motion.span>
            <span className={cn(
              "text-xl font-bold",
              isComplete ? "text-green-400/60" : "text-elec-yellow/60"
            )}>%</span>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className={cn(
                  "h-full rounded-full relative",
                  isComplete
                    ? "bg-gradient-to-r from-green-500 via-green-400 to-green-500"
                    : "bg-gradient-to-r from-elec-yellow/80 via-elec-yellow to-elec-yellow/80"
                )}
                style={{ width: `${displayProgress}%` }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
            <div
              className={cn(
                "absolute -bottom-1 left-0 h-3 blur-md rounded-full transition-all duration-300",
                isComplete ? "bg-green-500/30" : "bg-elec-yellow/30"
              )}
              style={{ width: `${displayProgress}%` }}
            />
          </div>

          {/* Time Stats */}
          <div className="flex items-center justify-center gap-4 text-xs text-white">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span className="tabular-nums">{formatTime(elapsedTime)}</span>
            </span>
            {!isComplete && (
              <>
                <span className="text-white">•</span>
                <span className="tabular-nums">~{formatTime(estimatedTimeRemaining)} left</span>
              </>
            )}
          </div>

          {/* Stage Dots */}
          <div className="flex items-center justify-center gap-2">
            {agentSteps.map((agent) => (
              <motion.div
                key={agent.name}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-500',
                  agent.status === 'complete' && 'w-12 bg-green-500',
                  agent.status === 'processing' && 'w-16 bg-elec-yellow',
                  agent.status === 'pending' && 'w-6 bg-white/10'
                )}
                animate={agent.status === 'processing' ? { opacity: [0.7, 1, 0.7] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            ))}
          </div>
        </div>

        {/* Agent Cards - Compact */}
        <div className="space-y-1.5">
          {agentSteps.map((agent) => {
            const Icon = getAgentIcon(agent.name);
            const isActive = agent.status === 'processing';
            const isAgentComplete = agent.status === 'complete';
            const isPending = agent.status === 'pending';
            const realProgress = agent.name === 'health-safety' ? hsAgentProgress : installerAgentProgress;

            return (
              <motion.div
                key={agent.name}
                className={cn(
                  'p-2.5 rounded-xl border transition-all duration-300',
                  isActive && 'bg-elec-yellow/5 border-elec-yellow/20',
                  isAgentComplete && 'bg-green-500/5 border-green-500/20',
                  isPending && 'bg-white/[0.02] border-white/[0.08] opacity-50'
                )}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2.5">
                  {/* Icon */}
                  <div className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
                    isActive && 'bg-elec-yellow/10',
                    isAgentComplete && 'bg-green-500/10',
                    isPending && 'bg-white/5'
                  )}>
                    {isAgentComplete ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : isActive ? (
                      <Loader2 className="w-4 h-4 text-elec-yellow animate-spin" />
                    ) : (
                      <Icon className="w-4 h-4 text-white" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={cn(
                        'font-semibold text-xs truncate',
                        isActive && 'text-elec-yellow',
                        isAgentComplete && 'text-green-400',
                        isPending && 'text-white'
                      )}>
                        {getAgentTitle(agent.name)}
                      </h3>
                      {isActive && (
                        <span className="text-[10px] font-medium text-elec-yellow tabular-nums bg-elec-yellow/10 px-1.5 py-0.5 rounded">
                          {realProgress}%
                        </span>
                      )}
                      {isAgentComplete && (
                        <span className="text-[10px] font-medium text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded">
                          ✓
                        </span>
                      )}
                    </div>
                    <p className={cn(
                      'text-[10px] mt-0.5',
                      isActive && 'text-white',
                      isAgentComplete && 'text-green-400/40',
                      isPending && 'text-white'
                    )}>
                      {getAgentDescription(agent.name, agent.status)}
                    </p>

                    {/* Inline Progress Bar */}
                    {isActive && (
                      <div className="mt-1.5 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-elec-yellow rounded-full"
                          style={{ width: `${realProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Cancel Button - Compact */}
        {onCancel && !isComplete && (
          <button
            onClick={() => setShowCancelDialog(true)}
            disabled={isCancelling}
            className="w-full py-3 min-h-[48px] text-xs text-white hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 touch-manipulation active:scale-[0.98]"
          >
            {isCancelling ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                Cancelling...
              </>
            ) : (
              <>
                <XCircle className="w-3 h-3" />
                Cancel
              </>
            )}
          </button>
        )}
      </div>

      <ConfirmationDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        title="Cancel RAMS Generation?"
        description="This will stop the generation and cannot be undone."
        confirmText="Yes, Cancel"
        cancelText="Continue"
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
