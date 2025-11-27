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
}

const STAGE_PERCENTAGES = {
  initializing: 0,
  parsing: 20,
  ai: 50,
  validation: 75,
  complete: 100
};

const CommissioningProcessingView = ({ progress, startTime }: CommissioningProcessingViewProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const percentage = progress ? STAGE_PERCENTAGES[progress.stage] : 0;
  const estimatedTotal = 90; // seconds
  const remaining = Math.max(0, estimatedTotal - elapsedTime);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 bg-gradient-to-br from-purple-500/5 via-background to-background border-purple-500/20">
        <div className="flex items-start gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-3 rounded-full animate-pulse">
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
            <span className="font-semibold text-purple-400">{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-2" />
          <p className="text-xs text-white">
            • {progress?.stage === 'initializing' && 'Starting up...'}
            {progress?.stage === 'parsing' && 'Understanding your testing requirements...'}
            {progress?.stage === 'ai' && 'Generating detailed test procedures...'}
            {progress?.stage === 'validation' && 'Verifying regulation compliance...'}
            {progress?.stage === 'complete' && 'Complete!'}
          </p>
        </div>

        {/* Generation Timeline */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-elec-gray/50 rounded-lg border border-purple-500/10">
          <div className="text-center">
            <div className="text-xs text-white mb-1">Elapsed Time</div>
            <div className="text-lg font-semibold text-purple-400">{formatTime(elapsedTime)}</div>
          </div>
          <div className="text-center border-x border-purple-500/10">
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
          <Shield className="h-5 w-5 text-purple-400" />
          What's Happening?
        </h4>
        <div className="space-y-3">
          <div className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
            progress?.stage === 'parsing' || progress?.stage === 'ai' || progress?.stage === 'validation' || progress?.stage === 'complete'
              ? 'bg-purple-500/10 border border-purple-500/20'
              : 'bg-elec-gray/30 border border-transparent'
          }`}>
            <Search className={`h-4 w-4 mt-0.5 ${
              progress?.stage === 'parsing' || progress?.stage === 'ai' || progress?.stage === 'validation' || progress?.stage === 'complete'
                ? 'text-purple-400'
                : 'text-white'
            }`} />
            <div>
              <div className="font-medium text-sm">Searching BS 7671 testing requirements</div>
              <div className="text-xs text-white mt-1">
                Finding relevant test procedures, acceptance criteria, and regulations
              </div>
            </div>
          </div>

          <div className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
            progress?.stage === 'ai' || progress?.stage === 'validation' || progress?.stage === 'complete'
              ? 'bg-purple-500/10 border border-purple-500/20'
              : 'bg-elec-gray/30 border border-transparent'
          }`}>
            <Zap className={`h-4 w-4 mt-0.5 ${
              progress?.stage === 'ai' || progress?.stage === 'validation' || progress?.stage === 'complete'
                ? 'text-purple-400'
                : 'text-white'
            }`} />
            <div>
              <div className="font-medium text-sm">Calculating expected Zs values and test criteria</div>
              <div className="text-xs text-white mt-1">
                Generating expected results and maximum permitted values
              </div>
            </div>
          </div>

          <div className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
            progress?.stage === 'validation' || progress?.stage === 'complete'
              ? 'bg-purple-500/10 border border-purple-500/20'
              : 'bg-elec-gray/30 border border-transparent'
          }`}>
            <CheckCircle2 className={`h-4 w-4 mt-0.5 ${
              progress?.stage === 'validation' || progress?.stage === 'complete'
                ? 'text-purple-400'
                : 'text-white'
            }`} />
            <div>
              <div className="font-medium text-sm">Generating step-by-step procedures</div>
              <div className="text-xs text-white mt-1">
                Creating detailed testing instructions with instrument setup
              </div>
            </div>
          </div>

          <div className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
            progress?.stage === 'complete'
              ? 'bg-purple-500/10 border border-purple-500/20'
              : 'bg-elec-gray/30 border border-transparent'
          }`}>
            <Shield className={`h-4 w-4 mt-0.5 ${
              progress?.stage === 'complete'
                ? 'text-purple-400'
                : 'text-white'
            }`} />
            <div>
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
