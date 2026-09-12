import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAutomatedTraining } from '@/hooks/useAutomatedTraining';
import { trainingTracker } from '@/hooks/training-tracking/trainingTracker';
import { useToast } from '@/components/ui/use-toast';

/**
 * Starts and stops off-the-job tracking as the learner moves around the app.
 * Mounted once, app-wide, from `App.tsx`. Renders nothing.
 *
 * The tracker itself is a single shared instance, so this component only
 * decides WHEN to track — it never owns a timer or a writer.
 *
 * ⚠️ This effect must stay free of side effects in its cleanup. The previous
 * version depended on functions rebuilt on every render, so its cleanup ran
 * continuously, and the cleanup saved a time entry — which is how 479.5
 * fabricated training hours reached 51 learners (ELE-1724).
 */

/**
 * Routes that are genuinely structured learning, matched as path prefixes.
 *
 * The list this replaced (`/apprentice/course`, `/apprentice/unit`,
 * `/apprentice/study`, `/apprentice/section`) matched almost nothing: none of
 * those paths are registered any more. Course content moved under
 * `/study-centre/…` and `/apprentice/study` now 404s, so the old matcher was
 * starting sessions on a dead page and missing every real one.
 *
 * Keep this conservative. A page that is a tool, a calculator or a hub is not
 * training, and over-claiming hours is the failure mode that matters here.
 */
const LEARNING_PREFIXES = [
  '/study-centre', // every course, video, flashcard, glossary and mock exam
  '/apprentice/revision',
  '/apprentice/learning-videos',
  '/apprentice/am2-simulator',
  '/apprentice/epa-simulator',
  '/apprentice/inspection-testing', // also covers inspection-testing-hub
  '/apprentice/bs7671-inspection-testing',
  '/apprentice/safety-fundamentals',
  '/apprentice/professional-development',
  '/apprentice/toolbox',
];

const prettify = (segment: string) =>
  segment.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * A label a tutor could read on an evidence pack: the area, then where in it.
 * `/study-centre/apprentice/am2/module1/section1` becomes
 * "Study Centre: Module1 / Section1".
 */
const activityLabelFor = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return 'Study';
  const area = prettify(segments[0]);
  const tail = segments.slice(1).slice(-2).map(prettify).join(' / ');
  return tail ? `${area}: ${tail}` : area;
};

const isLearningPath = (pathname: string) =>
  LEARNING_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

const TrainingActivityMonitor = () => {
  const { pathname } = useLocation();
  const { isTracking, startTracking, stopTracking, isAuthenticated } = useAutomatedTraining();
  const { toast } = useToast();
  const hasAnnounced = useRef(false);
  const hasRecovered = useRef(false);

  // Time a previous visit could not write because the tab was closing. Once
  // per app load, and only once signed in.
  useEffect(() => {
    if (!isAuthenticated || hasRecovered.current) return;
    hasRecovered.current = true;
    void trainingTracker.recoverPending();
  }, [isAuthenticated]);

  useEffect(() => {
    if (isLearningPath(pathname) && isAuthenticated) {
      // Safe to call on every learning route: the tracker ignores a start for
      // the activity it is already on, and banks the previous one before
      // switching labels.
      startTracking(activityLabelFor(pathname));

      if (!hasAnnounced.current) {
        hasAnnounced.current = true;
        toast({
          title: 'Training time recording',
          description: 'Your off-the-job training time is being recorded',
          duration: 3000,
        });
      }
      return;
    }

    // Leaving the learning pages ends the session and banks the minutes. That
    // includes arriving at the off-the-job page, which the old code deferred to
    // `TrackingStatusIndicator` — a component mounted nowhere, so tracking
    // simply never stopped there.
    if (isTracking) void stopTracking();
  }, [pathname, isAuthenticated, isTracking, startTracking, stopTracking, toast]);

  return null;
};

export default TrainingActivityMonitor;
