import { useEffect } from 'react';
import { useAutomatedTraining } from '@/hooks/useAutomatedTraining';
import { Clock, Timer } from 'lucide-react';
import { formatTime } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TrackingStatusIndicator = () => {
  const { isTracking, stopTracking, sessionTime, currentActivity } = useAutomatedTraining();
  const { toast } = useToast();

  // Stop tracking when this component mounts (user has arrived at the OJT page)
  useEffect(() => {
    let timeoutId: number | null = null;

    if (isTracking) {
      // Show a message that tracking will stop
      toast({
        title: 'Training time will be saved',
        description: 'Your training time is being saved automatically',
      });

      // Give a 10-second delay before stopping to allow the user to see the status
      timeoutId = window.setTimeout(() => {
        stopTracking();
        toast({
          title: 'Training time saved',
          description: 'Your accumulated training time has been recorded',
        });
      }, 10000); // 10 seconds
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [isTracking, stopTracking, toast]);

  if (!isTracking) return null;

  return (
    <Alert className="mb-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
      <Timer className="h-5 w-5 text-elec-yellow animate-pulse" />
      <AlertDescription className="flex items-center justify-between">
        <div className="text-[13px] text-white/85">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mr-2">
            Recording
          </span>
          {currentActivity}
        </div>
        <div className="text-[14px] font-mono text-elec-yellow">{formatTime(sessionTime)}</div>
      </AlertDescription>
    </Alert>
  );
};

export default TrackingStatusIndicator;
