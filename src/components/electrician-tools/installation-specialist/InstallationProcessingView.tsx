import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench, XCircle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { InstallationProjectDetails } from "@/types/installation-method";
import { CircularProgress } from '@/components/agents/shared/CircularProgress';
import { StageTimeline, getStageFromProgress } from '@/components/agents/shared/StageTimeline';
import { TimeStatsGrid } from '@/components/agents/shared/TimeStatsGrid';
import { AGENT_CONFIG } from '@/components/agents/shared/AgentConfig';

interface InstallationProcessingViewProps {
  originalQuery?: string;
  projectDetails?: InstallationProjectDetails;
  progress: {
    stage: 'initializing' | 'rag' | 'ai' | 'generation' | 'validation' | 'complete';
    message: string;
  } | null;
  startTime: number;
  onCancel?: () => void;
  isCancelling?: boolean;
  onQuickMode?: () => void;
  qualityMetrics?: {
    overallConfidence: number;
    ragDataQuality: 'excellent' | 'good' | 'fair' | 'poor';
    bs7671Coverage: number;
    practicalWorkCoverage: number;
    stage: 'initializing' | 'rag' | 'ai' | 'generation' | 'validation' | 'complete';
  };
}

const ESTIMATED_TIME = 240; // 4 minutes for installation methods

// Map stages to percentage values
const progressMap: Record<string, number> = {
  'initializing': 10,
  'rag': 25,
  'ai': 50,
  'generation': 70,
  'validation': 90,
  'complete': 100
};

export const InstallationProcessingView = ({ originalQuery, projectDetails, progress, startTime, onCancel, isCancelling, onQuickMode, qualityMetrics }: InstallationProcessingViewProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const config = AGENT_CONFIG['installation'];

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate progress value and current stage
  const progressValue = progress ? progressMap[progress.stage] : 0;
  const remainingTime = Math.max(0, ESTIMATED_TIME - elapsedTime);
  const currentStage = getStageFromProgress(progressValue);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 animate-fade-in">
      <Card
        className="w-full max-w-lg agent-card"
        style={{ borderColor: `${config.gradientFrom}20` }}
      >
        <CardHeader className="text-center space-y-4 pb-4">
          {/* Animated Header Icon */}
          <div className="flex justify-center">
            <div
              className="relative w-16 h-16 rounded-2xl flex items-center justify-center animate-pulse"
              style={{
                background: `linear-gradient(135deg, ${config.gradientFrom}20, ${config.gradientTo}20)`,
                boxShadow: `0 0 30px ${config.gradientFrom}30`,
              }}
            >
              <Wrench className="h-8 w-8" style={{ color: config.gradientFrom }} />
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 rounded-2xl animate-ping opacity-30"
                style={{ background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <CardTitle className="text-xl sm:text-2xl font-bold">
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              >
                {config.processingTitle}
              </span>
            </CardTitle>
            <p className="text-sm sm:text-base text-white/60">
              Analysing BS 7671 installation requirements
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-6">
          {/* Circular Progress Ring */}
          <div className="flex justify-center py-4">
            <CircularProgress
              progress={progressValue}
              agentType="installation"
              size="lg"
            />
          </div>

          {/* Time Stats Grid */}
          <TimeStatsGrid
            elapsedSeconds={elapsedTime}
            remainingSeconds={remainingTime}
          />

          {/* Stage Timeline */}
          <div className="pt-2">
            <StageTimeline
              currentStage={currentStage}
              agentType="installation"
              compact
            />
          </div>

          {/* Overdue Warning */}
          {elapsedTime > ESTIMATED_TIME && (
            <div
              className="p-3 rounded-xl border animate-slide-up"
              style={{
                background: `${config.gradientFrom}10`,
                borderColor: `${config.gradientFrom}30`
              }}
            >
              <p className="text-sm text-center" style={{ color: config.gradientFrom }}>
                Still processing... Complex installations may take longer.
              </p>
            </div>
          )}

          {/* Cancel Button */}
          {onCancel && (
            <div className="pt-4 border-t border-white/10">
              <Button
                variant="ghost"
                onClick={onCancel}
                disabled={isCancelling}
                className="w-full h-12 text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 rounded-xl touch-manipulation active:scale-[0.98] transition-all"
              >
                {isCancelling ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 mr-2" />
                    Cancel Generation
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
