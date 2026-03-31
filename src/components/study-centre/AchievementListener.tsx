/**
 * AchievementListener — global component that checks achievements after any activity.
 *
 * Listens for 'elecmate:activity-logged' custom event dispatched by logActivity().
 * Mount once in the app layout — covers all pages.
 */

import { useEffect } from 'react';
import { useAchievementChecker } from '@/hooks/useAchievementChecker';

export function AchievementListener() {
  const { checkAchievements } = useAchievementChecker();

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
