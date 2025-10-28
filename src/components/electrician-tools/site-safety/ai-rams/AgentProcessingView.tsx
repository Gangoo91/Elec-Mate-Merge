import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Wrench, CheckCircle, Clock, Zap } from 'lucide-react';
import { TimelineExpectation } from './TimelineExpectation';
import { animateValue } from '@/utils/animation-helpers';

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
}

export const AgentProcessingView: React.FC<AgentProcessingViewProps> = ({
  overallProgress,
  currentStep,
  elapsedTime,
  estimatedTimeRemaining,
  agentSteps,
}) => {
  const [displayProgress, setDisplayProgress] = React.useState(0);

  React.useEffect(() => {
    const cleanup = animateValue(
      displayProgress,
      overallProgress,
      300,
      (value) => setDisplayProgress(value)
    );
    return cleanup;
  }, [overallProgress]);

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
              <Zap className="w-6 h-6 text-elec-yellow animate-pulse" />
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
                className="h-full bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow transition-all duration-500 ease-out shadow-lg shadow-elec-yellow/30"
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

      {/* Agent Cards - Mobile Optimized Vertical Layout */}
      <div className="space-y-6">
        {agentSteps.map((agent) => {
          const Icon = getAgentIcon(agent.name);
          const isActive = agent.status === 'processing';
          const isComplete = agent.status === 'complete';
          const isPending = agent.status === 'pending';

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
                    ${isActive ? 'bg-elec-yellow/20 ring-4 ring-elec-yellow/30 shadow-xl shadow-elec-yellow/20 animate-pulse' : ''}
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

                  {/* Progress Bar for Active Agent */}
                  {isActive && (
                    <div className="w-full space-y-2 pt-2">
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-elec-yellow to-amber-400 transition-all duration-500"
                          style={{ width: `${agent.progress}%` }}
                        />
                      </div>
                      <div className="text-sm text-gray-400 font-medium">
                        {agent.progress}% complete
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
                        <Zap className="w-4 h-4 text-elec-yellow shrink-0 mt-1 animate-pulse" />
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
    </div>
  );
};
