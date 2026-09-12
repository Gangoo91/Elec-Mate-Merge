import { Timer } from 'lucide-react';
import { useAutomatedTraining, useTrainingSessionTime } from '@/hooks/useAutomatedTraining';
import { formatTime } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';

/**
 * Shows the live training session while it is running.
 *
 * Display only. Deciding when a session starts and stops belongs to
 * `TrainingActivityMonitor`, which is mounted app-wide; this component used to
 * stop tracking on a ten-second timer of its own, which meant two places
 * raced to bank the same session.
 */
const TrackingStatusIndicator = () => {
  const { isTracking, currentActivity } = useAutomatedTraining();
  const sessionSeconds = useTrainingSessionTime();

  if (!isTracking) return null;

  return (
    <Alert className="mb-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
      <Timer className="h-5 w-5 animate-pulse text-elec-yellow" />
      <AlertDescription className="flex items-center justify-between">
        <div className="text-[13px] text-white">
          <span className="mr-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Recording
          </span>
          {currentActivity}
        </div>
        <div className="font-mono text-[14px] text-elec-yellow">{formatTime(sessionSeconds)}</div>
      </AlertDescription>
    </Alert>
  );
};

export default TrackingStatusIndicator;
