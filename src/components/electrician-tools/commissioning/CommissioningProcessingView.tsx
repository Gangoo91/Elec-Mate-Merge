import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Search, Zap, Shield } from "lucide-react";

interface CommissioningProcessingViewProps {
  progress: {
    stage: 'initializing' | 'parsing' | 'ai' | 'validation' | 'complete';
    message: string;
  } | null;
  startTime: number;
  backendProgress?: number;
}

const TOTAL_ESTIMATED_TIME = 210; // 3 minutes 30 seconds

// Calculate smooth progress based on elapsed time (0-95% over 3:30)
const calculateAnimatedProgress = (elapsed: number, backendProgress: number = 0) => {
  // If backend reports completion, use that
  if (backendProgress >= 100) return 100;
  
  // Time-based progress with easing (slows down as it approaches 95%)
  // Uses quadratic easing: starts fast, slows near the end
  const normalised = Math.min(elapsed / TOTAL_ESTIMATED_TIME, 1);
  const eased = 1 - Math.pow(1 - normalised, 2); // Ease-out quad
  const timeBasedProgress = Math.min(95, eased * 95);
  
  // Use whichever is higher - backend or animated
  return Math.max(Math.round(timeBasedProgress), backendProgress);
};

// Get stage based on elapsed time, not backend progress
const getTimeBasedStage = (elapsed: number) => {
  if (elapsed < 10) return { stage: 'initializing', message: 'Starting up...' };
  if (elapsed < 30) return { stage: 'parsing', message: 'Understanding your testing requirements...' };
  if (elapsed < 180) return { stage: 'ai', message: 'Generating detailed test procedures...' };
  if (elapsed < 200) return { stage: 'validation', message: 'Verifying regulation compliance...' };
  return { stage: 'complete', message: 'Finalising...' };
};

const CommissioningProcessingView = ({ progress, startTime, backendProgress = 0 }: CommissioningProcessingViewProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const animatedProgress = calculateAnimatedProgress(elapsedTime, backendProgress);
  const timeBasedStage = getTimeBasedStage(elapsedTime);
  const estimatedTotal = TOTAL_ESTIMATED_TIME;
  const remaining = Math.max(0, estimatedTotal - elapsedTime);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 bg-gradient-to-br from-elec-yellow/10 via-background to-background border-elec-yellow/20">
        <div className="flex items-start gap-4 mb-6">
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-3 rounded-full animate-pulse">
            <CheckCircle2 className="h-6 w-6 text-elec-dark" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1">AI Testing & Commissioning Specialist</h3>
            <p className="text-sm text-white">
              {progress?.message || 'Analysing testing requirements...'}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white">Progress</span>
            <span className="font-semibold text-elec-yellow">{animatedProgress}%</span>
          </div>
          <Progress 
            value={animatedProgress} 
            className="h-2 transition-all duration-1000 ease-out"
          />
          <p className="text-xs text-white">
            • {timeBasedStage.message}
          </p>
        </div>

        {/* Generation Timeline */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/10">
          <div className="text-center">
            <div className="text-xs text-white mb-1">Elapsed Time</div>
            <div className="text-lg font-semibold text-elec-yellow">{formatTime(elapsedTime)}</div>
          </div>
          <div className="text-center border-x border-elec-yellow/10">
            <div className="text-xs text-white mb-1">Estimated Remaining</div>
            <div className="text-lg font-semibold text-foreground">{formatTime(remaining)}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-white mb-1">Total Estimate</div>
            <div className="text-lg font-semibold text-white">{formatTime(estimatedTotal)}</div>
          </div>
        </div>
      </Card>

      {/* What's Happening Section */}
      <Card className="p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow" />
          What's Happening?
        </h4>
        <div className="space-y-3">
          <div className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
            progress?.stage === 'parsing' || progress?.stage === 'ai' || progress?.stage === 'validation' || progress?.stage === 'complete'
              ? 'bg-elec-yellow/10 border border-elec-yellow/20'
              : 'bg-elec-gray/30 border border-transparent'
          }`}>
            <Search className={`h-4 w-4 mt-0.5 ${
              progress?.stage === 'parsing' || progress?.stage === 'ai' || progress?.stage === 'validation' || progress?.stage === 'complete'
                ? 'text-elec-yellow'
                : 'text-white'
            }`} />
            <div className="text-left">
              <div className="font-medium text-sm">Searching BS 7671 testing requirements</div>
              <div className="text-xs text-white mt-1">
                Finding relevant test procedures, acceptance criteria, and regulations
              </div>
            </div>
          </div>

          <div className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
            progress?.stage === 'ai' || progress?.stage === 'validation' || progress?.stage === 'complete'
              ? 'bg-elec-yellow/10 border border-elec-yellow/20'
              : 'bg-elec-gray/30 border border-transparent'
          }`}>
            <Zap className={`h-4 w-4 mt-0.5 ${
              progress?.stage === 'ai' || progress?.stage === 'validation' || progress?.stage === 'complete'
                ? 'text-elec-yellow'
                : 'text-white'
            }`} />
            <div className="text-left">
              <div className="font-medium text-sm">Calculating expected Zs values and test criteria</div>
              <div className="text-xs text-white mt-1">
                Generating expected results and maximum permitted values
              </div>
            </div>
          </div>

          <div className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
            progress?.stage === 'validation' || progress?.stage === 'complete'
              ? 'bg-elec-yellow/10 border border-elec-yellow/20'
              : 'bg-elec-gray/30 border border-transparent'
          }`}>
            <CheckCircle2 className={`h-4 w-4 mt-0.5 ${
              progress?.stage === 'validation' || progress?.stage === 'complete'
                ? 'text-elec-yellow'
                : 'text-white'
            }`} />
            <div className="text-left">
              <div className="font-medium text-sm">Generating step-by-step procedures</div>
              <div className="text-xs text-white mt-1">
                Creating detailed testing instructions with instrument setup
              </div>
            </div>
          </div>

          <div className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
            progress?.stage === 'complete'
              ? 'bg-elec-yellow/10 border border-elec-yellow/20'
              : 'bg-elec-gray/30 border border-transparent'
          }`}>
            <Shield className={`h-4 w-4 mt-0.5 ${
              progress?.stage === 'complete'
                ? 'text-elec-yellow'
                : 'text-white'
            }`} />
            <div className="text-left">
              <div className="font-medium text-sm">Verifying regulation compliance</div>
              <div className="text-xs text-white mt-1">
                Cross-checking with BS 7671 requirements and certification needs
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CommissioningProcessingView;
