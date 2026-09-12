/**
 * React binding for the shared off-the-job training tracker.
 *
 * This hook used to own the timer, the activity listeners and the writer, so
 * every component that called it got a private copy of all three. It now reads
 * one shared instance (`trainingTracker`), which is what makes the header's
 * recording indicator agree with the page the learner is on, and what
 * guarantees a single writer.
 *
 * The returned functions are module-level constants. They keep the same
 * identity for the life of the app, so they are safe in a dependency array —
 * the previous versions were rebuilt on every render, which is what made an
 * effect cleanup fire continuously and fabricate training hours (ELE-1724).
 *
 * The running clock is deliberately NOT returned here. Subscribing to it
 * re-renders the caller every second, and most callers only need to know
 * whether tracking is on. Use `useTrainingSessionTime` where the seconds are
 * actually shown.
 */
import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { useAuthState } from '@/hooks/time-tracking/useAuthState';
import { useToast } from '@/components/ui/use-toast';
import { trainingTracker } from '@/hooks/training-tracking/trainingTracker';

/** The live session clock, in seconds. Re-renders the caller once a second. */
export const useTrainingSessionTime = (): number =>
  useSyncExternalStore(trainingTracker.subscribeTick, trainingTracker.getSessionSeconds, () => 0);

export const useAutomatedTraining = (autoStart = false) => {
  const status = useSyncExternalStore(
    trainingTracker.subscribeStatus,
    trainingTracker.getStatus,
    trainingTracker.getStatus
  );
  const { userId } = useAuthState();
  const { toast } = useToast();

  const startTracking = useCallback(
    (activity: string) => {
      if (!userId) {
        toast({
          title: 'Sign in required',
          description: 'Please sign in to track your training time',
          variant: 'destructive',
        });
        return;
      }
      trainingTracker.start(activity);
    },
    [userId, toast]
  );

  const pauseTracking = useCallback(() => {
    trainingTracker.pause();
  }, []);

  const resumeTracking = useCallback(() => {
    trainingTracker.resume();
  }, []);

  const stopTracking = useCallback(async () => {
    const minutes = await trainingTracker.stop();
    // Only tell the learner something was saved when something was. The old
    // version announced "training time saved" even when it had written a
    // five-minute row for a few seconds of activity.
    if (minutes > 0) {
      toast({
        title: 'Training time saved',
        description: `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} recorded`,
      });
    }
    return minutes;
  }, [toast]);

  // `autoStart` is kept for the existing call signature. It starts a generic
  // session only when nothing else is already tracking, so it can never
  // relabel a session a page has already named.
  useEffect(() => {
    if (!autoStart || !userId) return;
    if (status.isTracking || status.currentActivity) return;
    trainingTracker.start('Application Study');
  }, [autoStart, userId, status.isTracking, status.currentActivity]);

  return {
    isTracking: status.isTracking,
    currentActivity: status.currentActivity,
    isSaving: status.isSaving,
    startTracking,
    pauseTracking,
    resumeTracking,
    stopTracking,
    isAuthenticated: !!userId,
  };
};
