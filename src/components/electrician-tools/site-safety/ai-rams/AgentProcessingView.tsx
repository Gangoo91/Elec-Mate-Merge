import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Wrench, CheckCircle, Clock, Zap, XCircle, FileText, ChevronDown } from 'lucide-react';
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
    <div className="space-y-6 pb-8 px-1">
      {/* Overall Progress Card - NO STICKY */}
      <Card className="border-elec-yellow/20 shadow-lg">
        <CardContent className="pt-6 pb-5 space-y-4">
          {/* Title */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-elec-yellow/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-elec-yellow" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-white">Generating RAMS Document</h2>
              <p className="text-sm text-gray-400 mt-0.5">{currentStep}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2.5">
            <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow transition-all duration-700 ease-out shadow-lg shadow-elec-yellow/30"
                style={{ width: `${displayProgress}%` }}
              />
            </div>
            
            {/* Stats Row */}
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-elec-yellow text-base">{Math.round(displayProgress)}%</span>
              <div className="flex items-center gap-3 text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {formatTime(elapsedTime)}
                </span>
                <span className="text-gray-600">•</span>
                <span>~{formatTime(estimatedTimeRemaining)} remaining</span>
              </div>
            </div>

            {/* Step Indicator */}
            <div className="text-center text-sm text-gray-400 pt-1">
              Step {currentAgentIndex >= 0 ? currentAgentIndex + 1 : agentSteps.length} of {agentSteps.length}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Description Card */}
      {jobDescription && (
        <Card className="border-blue-500/20 bg-blue-950/20">
          <CardContent className="pt-5 pb-5">
            <Collapsible defaultOpen={false}>
              <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-between group touch-manipulation">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-400" />
                    <span className="font-semibold text-white">Your Job Description</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-data-[state=open]:rotate-180" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-4 p-4 rounded-lg bg-elec-grey/40 border border-blue-500/20">
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {jobDescription}
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      )}

      {/* Agent Cards - Mobile Optimized Vertical Layout */}
      <div className="space-y-6">
        {agentSteps.map((agent) => {
          const Icon = getAgentIcon(agent.name);
          const isActive = agent.status === 'processing';
          const isComplete = agent.status === 'complete';
          const isPending = agent.status === 'pending';
          
          // PHASE 4 FIX: Use real agent progress
          const realProgress = agent.name === 'health-safety' ? hsAgentProgress : installerAgentProgress;

          return (
            <Card
              key={agent.name}
              className={`
                transition-all duration-300 min-h-[300px]
                ${isActive ? 'border-2 border-elec-yellow/40 shadow-xl shadow-elec-yellow/10 scale-[1.02]' : ''}
                ${isComplete ? 'border-2 border-green-500/40 shadow-lg' : ''}
                ${isPending ? 'border border-gray-700/50 opacity-70' : ''}
              `}
            >
              <CardContent className="pt-8 pb-6 px-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Icon - Centered at Top - LARGER */}
                  <div className={`
                    w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300
                    ${isActive ? 'bg-elec-yellow/20 ring-4 ring-elec-yellow/30 shadow-xl shadow-elec-yellow/20' : ''}
                    ${isComplete ? 'bg-green-500/20 ring-4 ring-green-500/30 shadow-lg' : ''}
                    ${isPending ? 'bg-gray-800/50' : ''}
                  `}>
                    {isComplete ? (
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    ) : (
                      <Icon className={`
                        w-10 h-10
                        ${isActive ? 'text-elec-yellow' : ''}
                        ${isPending ? 'text-gray-500' : ''}
                      `} />
                    )}
                  </div>

                  {/* Title - LARGER */}
                  <div className="space-y-2">
                    <h3 className={`
                      text-xl font-semibold
                      ${isActive ? 'text-elec-yellow' : ''}
                      ${isComplete ? 'text-green-400' : ''}
                      ${isPending ? 'text-gray-400' : ''}
                    `}>
                      {getAgentTitle(agent.name)}
                    </h3>

                    {/* Status Badge - LARGER */}
                    <div className={`
                      inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium
                      ${isActive ? 'bg-elec-yellow/20 text-elec-yellow' : ''}
                      ${isComplete ? 'bg-green-500/20 text-green-400' : ''}
                      ${isPending ? 'bg-gray-800/50 text-gray-500' : ''}
                    `}>
                      {isActive && (
                        <>
                          <span className="w-2 h-2 rounded-full bg-elec-yellow animate-pulse" />
                          Processing
                        </>
                      )}
                      {isComplete && (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Complete
                        </>
                      )}
                      {isPending && (
                        <>
                          <Clock className="w-4 h-4" />
                          Pending
                        </>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar for Active Agent - PHASE 4 FIX: Use real progress */}
                  {isActive && (
                    <div className="w-full space-y-2 pt-2">
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-elec-yellow to-amber-400 transition-all duration-500"
                          style={{ width: `${realProgress}%` }}
                        />
                      </div>
                      <div className="text-sm text-gray-400 font-medium">
                        {realProgress}% complete
                      </div>
                    </div>
                  )}

                  {/* Description - LARGER */}
                  <p className="text-base text-gray-400 max-w-xs leading-relaxed">
                    {getAgentDescription(agent.name)}
                  </p>

                  {/* Reasoning Box - LARGER */}
                  {(isActive || isComplete) && (agent.currentStep || agent.reasoning) && (
                    <div className="w-full mt-4 p-4 bg-elec-grey/40 rounded-lg border border-elec-yellow/20">
                      <div className="flex items-start gap-2.5">
                        <Zap className="w-4 h-4 text-elec-yellow shrink-0 mt-1" />
                        <p className="text-sm text-gray-300 leading-relaxed text-left">
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
