import { useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { storageGetSync } from '@/utils/storage';

const MIGRATION_FLAG = '_progress_migrated_v1';

/**
 * One-time migration of localStorage completion data to the course_progress DB table.
 * Runs once per user session, scans all 5 legacy key patterns, and syncs to DB.
 */
export function useLocalStorageMigration() {
  const { user } = useAuth();
  const { recordProgress } = useCourseProgress();
  const hasRun = useRef(false);

  useEffect(() => {
    if (!user?.id || hasRun.current) return;
    if (storageGetSync(MIGRATION_FLAG) === user.id) return;

    hasRun.current = true;

    const migrations: Array<{ courseKey: string; sectionKey: string }> = [];

    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;

        // Pattern 1: completion_hs_section_{id}
        const hsMatch = key.match(/^completion_hs_section_(\d+)$/);
        if (hsMatch && localStorage.getItem(key) === 'true') {
          migrations.push({ courseKey: 'health-safety', sectionKey: `section-${hsMatch[1]}` });
          continue;
        }

        // Pattern 2: completion_elec_section_{id} or completion_elec_{sectionId}_{subsectionId}
        const elecMatch = key.match(/^completion_elec_(?:section_)?(\d+)(?:_(\d+))?$/);
        if (elecMatch && localStorage.getItem(key) === 'true') {
          const sectionKey = elecMatch[2]
            ? `section-${elecMatch[1]}-${elecMatch[2]}`
            : `section-${elecMatch[1]}`;
          migrations.push({ courseKey: 'electrical-theory', sectionKey });
          continue;
        }

        // Pattern 3: completion_craft_{sectionId}_{subsectionId}
        const craftMatch = key.match(/^completion_craft_(\d+)_(\d+)$/);
        if (craftMatch && localStorage.getItem(key) === 'true') {
          migrations.push({
            courseKey: 'craft-skills',
            sectionKey: `section-${craftMatch[1]}-${craftMatch[2]}`,
          });
          continue;
        }

        // Pattern 4: user_{userId}_unit_{unitCode}_quiz_completed
        const quizMatch = key.match(new RegExp(`^user_${user.id}_unit_(.+)_quiz_completed$`));
        if (quizMatch && localStorage.getItem(key) === 'true') {
          migrations.push({ courseKey: quizMatch[1], sectionKey: 'quiz' });
          continue;
        }
      }

      // Batch record all migrations (fire and forget — don't block UI)
      for (const { courseKey, sectionKey } of migrations) {
        recordProgress(courseKey, sectionKey, 100, true);
      }

      // Mark as migrated
      localStorage.setItem(MIGRATION_FLAG, user.id);
    } catch {
      // Migration is best-effort — don't break the app
    }
  }, [user?.id, recordProgress]);
}
