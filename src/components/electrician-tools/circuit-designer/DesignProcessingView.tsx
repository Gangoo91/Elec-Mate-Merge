import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DesignProgress } from '@/hooks/useAIDesigner';
import { Clock, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DesignProcessingTimeline } from './DesignProcessingTimeline';
import { CircuitQueueViewer } from './CircuitQueueViewer';

interface DesignProcessingViewProps {
  progress: DesignProgress | null;
  retryMessage?: string | null;
  onCancel?: () => void;
}

export const DesignProcessingView = ({ progress, retryMessage, onCancel }: DesignProcessingViewProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime] = useState(Date.now());

  // Track elapsed time
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  // Stage definitions
  const stageDetails = [
    { name: 'Initialising', description: 'Preparing design service' },
    { name: 'Understanding Requirements', description: 'Analysing project specifications' },
    { name: 'Extracting Circuits', description: 'AI parsing circuit descriptions' },
    { name: 'Searching Regulations', description: 'Querying BS 7671 18th Edition' },
    { name: 'AI Circuit Design', description: 'Calculating cable sizes & protection' },
    { name: 'Compliance Validation', description: 'Verifying BS 7671 compliance' },
    { name: 'Finalising Documentation', description: 'Generating design documentation' },
    { name: 'Downloading Data', description: 'Transferring design to browser' }
  ];

  const currentStage = progress?.stage || 0;
  const currentPercent = progress?.percent || 0;

  // Create stage status list
  const stages = stageDetails.map((stage, index) => ({
    ...stage,
    status: index < currentStage ? 'complete' : index === currentStage ? 'active' : 'pending'
  })) as Array<{
    name: string;
    description: string;
    status: 'pending' | 'active' | 'complete';
  }>;

  // Mock circuit queue for demonstration
  const mockCircuits = [
    { name: 'Socket Ring 1', loadType: 'socket', status: currentStage > 3 ? 'complete' : currentStage === 3 ? 'processing' : 'pending' },
    { name: 'Lighting Circuit 1', loadType: 'lighting', status: currentStage > 4 ? 'complete' : currentStage === 4 ? 'processing' : 'pending' },
    { name: 'Cooker Circuit', loadType: 'cooker', status: currentStage > 4 ? 'complete' : 'pending' },
    { name: 'Shower Circuit', loadType: 'shower', status: currentStage > 5 ? 'complete' : 'pending' },
  ] as Array<{ name: string; loadType: string; status: 'pending' | 'processing' | 'complete' }>;

  const totalEstimatedSeconds = 180;
  const remainingSeconds = Math.max(0, totalEstimatedSeconds - elapsedTime);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-8">
      <Card className="max-w-6xl w-full">
        {/* Header */}
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Generating Your Design</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                AI is analysing circuits and checking BS 7671:2018+A3:2024 compliance
              </p>
            </div>
            {onCancel && (
              <Button variant="ghost" size="sm" onClick={onCancel}>
                <XCircle className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 mt-4">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${currentPercent}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-muted-foreground">Progress: {currentPercent}%</span>
            <Badge variant="secondary">
              Stage {currentStage + 1} of {stageDetails.length}
            </Badge>
          </div>
        </CardHeader>

        {/* Retry Message */}
        {retryMessage && (
          <div className="px-6 pt-4">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-sm text-amber-600 dark:text-amber-400">
                {retryMessage}
              </p>
            </div>
          </div>
        )}

        {/* Body - 2 Column Layout */}
        <CardContent className="p-6">
          <div className="grid md:grid-cols-[1fr_400px] gap-6">
            {/* Left Column - Timeline & Activity */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Processing Stages</h3>
                <DesignProcessingTimeline stages={stages} />
              </div>
            </div>

            {/* Right Column - Stats & Queue */}
            <div className="space-y-4">
              {/* Time Stats */}
              <Card className="bg-muted/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Time Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Elapsed</span>
                    <span className="font-mono font-medium">{formatTime(elapsedTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Remaining</span>
                    <span className="font-mono font-medium">{formatTime(remainingSeconds)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-muted-foreground">Total Estimate</span>
                    <span className="font-mono font-medium">{formatTime(totalEstimatedSeconds)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Circuit Queue */}
              <CircuitQueueViewer circuits={mockCircuits} />

              {/* What's Happening */}
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">What's Happening</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>{stages[currentStage]?.description || 'Processing...'}</p>
                  <p className="mt-2 text-xs">
                    Referencing BS 7671:2018+A3:2024, Appendices 4 & 15
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
