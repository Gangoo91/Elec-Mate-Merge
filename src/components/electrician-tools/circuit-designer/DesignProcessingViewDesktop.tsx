import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

  // Get status badge based on progress
  const getStatusBadge = () => {
    if (currentPercent === 0) {
      return <Badge variant="outline" className="text-xs">Starting...</Badge>;
    }
    if (currentPercent < 100) {
      return <Badge variant="secondary" className="text-xs">Processing</Badge>;
    }
    return <Badge variant="default" className="text-xs">Complete</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between gap-8">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">AI Circuit Design</h2>
                {getStatusBadge()}
              </div>
              <p className="text-sm text-muted-foreground">
                Stage {currentStage + 1} of 8 • {stageDetails[currentStage]?.description}
              </p>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${currentPercent}%` }}
                />
              </div>
              <StageIndicator currentStage={currentStage} totalStages={8} />
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold">{currentPercent}%</div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          <div className="space-y-6">
            {userRequest && (
              <Card className="p-4 border">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🤖</div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-muted-foreground mb-1">
                      Your Request
                    </div>
                    <p className="text-sm">{userRequest}</p>
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
