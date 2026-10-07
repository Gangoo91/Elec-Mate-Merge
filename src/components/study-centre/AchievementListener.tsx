/**
 * AchievementListener — global component that checks achievements after any activity.
 *
 * Listens for 'elecmate:activity-logged' custom event dispatched by logActivity().
 * Mount once in the app layout — covers all pages.
 */

import { useEffect } from 'react';
import { useAchievementChecker } from '@/hooks/useAchievementChecker';

export function AchievementListener() {
  // ELE-1912: the on-load check waits until the screen has painted.
  const { checkAchievements } = useAchievementChecker({ initialCheckDelayMs: 6000 });

  useEffect(() => {
    const handler = () => {
      // Small delay to let DB writes settle before checking
      setTimeout(() => {
        checkAchievements();
      }, 1000);
    };

    window.addEventListener('elecmate:activity-logged', handler);
    return () => window.removeEventListener('elecmate:activity-logged', handler);
  }, [checkAchievements]);

  return null;
}

export default AchievementListener;
