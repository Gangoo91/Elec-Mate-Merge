import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LiveCircuitPreview } from "./LiveCircuitPreview";
import { ProcessingStatsPanel } from "./ProcessingStatsPanel";
import { AnimatedProgressRing } from "./AnimatedProgressRing";
import { StageIndicator } from "./StageIndicator";
import { DesignProgress } from "@/hooks/useAIDesigner";
import { useState } from "react";
import { Zap } from "lucide-react";

interface DesignProcessingViewDesktopProps {
  progress: DesignProgress | null;
  userRequest?: string;
  totalCircuits?: number;
  onCancel?: () => void;
  retryMessage?: string | null;
}

export const DesignProcessingViewDesktop = ({
  progress,
  userRequest,
  totalCircuits = 0,
  onCancel,
  retryMessage
}: DesignProcessingViewDesktopProps) => {
  const [startTime] = useState(new Date());
  const [recentlyCompleted] = useState<string[]>([]);

  const currentStage = progress?.stage || 0;
  const currentPercent = progress?.percent || 0;
  const estimatedCompleted = totalCircuits > 0 ? Math.floor((currentPercent / 100) * totalCircuits) : 0;

  const stageDetails = [
    { name: 'Initialising', description: 'Preparing design service' },
    { name: 'Understanding Requirements', description: 'Analysing specifications' },
    { name: 'Extracting Circuits', description: 'AI parsing descriptions' },
    { name: 'Searching Regulations', description: 'Querying BS 7671' },
    { name: 'AI Circuit Design', description: 'Calculating cables & protection' },
    { name: 'Compliance Validation', description: 'Verifying compliance' },
    { name: 'Finalising Documentation', description: 'Generating docs' },
    { name: 'Downloading Data', description: 'Transferring to browser' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-orange-500/10 border-b border-border/50 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-orange-500/5 animate-gradient-flow bg-[length:200%_200%]" />
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center lg:items-start gap-4">
              <AnimatedProgressRing progress={currentPercent} size={180} />
            </div>
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50">
                <span className="text-sm text-muted-foreground">Stage {currentStage + 1} of 8</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Zap className="w-8 h-8 text-elec-yellow animate-pulse-glow" />
                  <h2 className="text-3xl font-bold tracking-tight">AI Circuit Design</h2>
                </div>
                <p className="text-lg text-muted-foreground">{stageDetails[currentStage]?.description || 'Processing...'}</p>
              </div>
              <StageIndicator currentStage={currentStage} totalStages={8} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          <div className="space-y-6">
            {userRequest && (
              <Card className="p-6 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl border-border/50 shadow-lg animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="text-4xl animate-pulse-glow">🤖</div>
                  <div className="space-y-2 flex-1">
                    <div className="text-sm font-semibold text-elec-yellow">Your Request</div>
                    <p className="text-lg leading-relaxed font-medium">{userRequest}</p>
                  </div>
                </div>
              </Card>
            )}
            {retryMessage && (
              <Card className="p-4 bg-amber-500/10 border-amber-500/30">
                <p className="text-sm text-amber-600 dark:text-amber-400">{retryMessage}</p>
              </Card>
            )}
            <div className="space-y-4">
              <h3 className="text-xl font-bold tracking-tight">Live Circuit Generation</h3>
              <LiveCircuitPreview totalCircuits={totalCircuits} completedCircuits={estimatedCompleted} currentCircuitName={`Circuit ${estimatedCompleted + 1}`} recentlyCompleted={recentlyCompleted} />
            </div>
            {onCancel && (
              <div className="flex justify-center pt-4">
                <Button variant="outline" onClick={onCancel} className="hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive transition-colors">Cancel Generation</Button>
              </div>
            )}
          </div>
          <div className="hidden lg:block">
            <ProcessingStatsPanel currentStage={currentStage + 1} currentPercent={currentPercent} totalCircuits={totalCircuits} completedCircuits={estimatedCompleted} currentStepName={progress?.message || stageDetails[currentStage]?.name || 'Processing...'} startTime={startTime} />
          </div>
        </div>
      </div>
    </div>
  );
};
