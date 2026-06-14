/**
 * useSiteDiaryEntries
 *
 * CRUD hook for site diary entries. Uses Supabase with
 * localStorage fallback for offline resilience.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useLearningXP } from '@/hooks/useLearningXP';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

// Buckets diary photos can live in — new uploads go to portfolio-evidence;
// legacy ones may still be in visual-uploads. Used to turn a stored photo URL
// back into a {bucket, path} so the file can be deleted (no more orphans).
const PHOTO_BUCKETS = ['portfolio-evidence', 'visual-uploads'] as const;

function parsePhotoRef(url: string): { bucket: string; path: string } | null {
  const marker = '/storage/v1/object/';
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  const rest = url.slice(idx + marker.length).replace(/^(public|sign|authenticated)\//, '');
  for (const bucket of PHOTO_BUCKETS) {
    const prefix = `${bucket}/`;
    if (rest.startsWith(prefix)) {
      const path = decodeURIComponent(rest.slice(prefix.length).split('?')[0]);
      return path ? { bucket, path } : null;
    }
  }
  return null;
}

/** Best-effort delete of photo storage objects by their stored URLs. */
async function removePhotoFiles(urls: string[]): Promise<void> {
  const byBucket = new Map<string, string[]>();
  for (const u of urls) {
    const ref = parsePhotoRef(u);
    if (!ref) continue;
    const list = byBucket.get(ref.bucket) ?? [];
    list.push(ref.path);
    byBucket.set(ref.bucket, list);
  }
  for (const [bucket, paths] of byBucket) {
    try {
      await supabase.storage.from(bucket).remove(paths);
    } catch {
      /* best-effort — never block the entry op on storage cleanup */
    }
  }
}

export interface SiteDiaryEntry {
  id: string;
  user_id: string;
  date: string;
  site_name: string;
  supervisor: string | null;
  tasks_completed: string[];
  skills_practised: string[];
  what_i_learned: string | null;
  issues_or_questions: string | null;
  mood_rating: number | null;
  photos: string[];
  linked_portfolio_id: string | null;
  linked_time_entry_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewDiaryEntry
  extends Omit<SiteDiaryEntry, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'linked_time_entry_id'> {
  /** Optional hours spent on site — creates a linked OJT time entry */
  hours_spent?: number | null;
}

const STORAGE_KEY = 'elec-mate-site-diary';

export function useSiteDiaryEntries() {
  const { user } = useAuth();
  const { logActivity } = useLearningXP();
  const [entries, setEntries] = useState<SiteDiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // True when the fetch failed AND there was no local cache to fall back on —
  // lets the UI distinguish "couldn't load" from a genuine empty first-run.
  const [loadError, setLoadError] = useState(false);
  // Mirror of entries, readable from delete/update without stale closures, so
  // we can find the OLD photo set and clean up its storage on remove/replace.
  const entriesRef = useRef<SiteDiaryEntry[]>([]);
  useEffect(() => {
    entriesRef.current = entries;
  }, [entries]);

  // Load entries
  const loadEntries = useCallback(async () => {
    setIsLoading(true);
    setLoadError(false);
    try {
      if (user) {
        const { data, error } = await supabase
          .from('site_diary_entries')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setEntries(data as SiteDiaryEntry[]);
          storageSetJSONSync(STORAGE_KEY, data);
        } else {
          // Try local fallback
          const local = storageGetJSONSync<SiteDiaryEntry[]>(STORAGE_KEY, []);
          if (local.length > 0) setEntries(local);
        }
      } else {
        const local = storageGetJSONSync<SiteDiaryEntry[]>(STORAGE_KEY, []);
        if (local.length > 0) setEntries(local);
      }
    } catch {
      // Fallback to storage; only flag an error if there's nothing cached to
      // show either — otherwise the cached list is a fine offline experience.
      const local = storageGetJSONSync<SiteDiaryEntry[]>(STORAGE_KEY, []);
      if (local.length > 0) setEntries(local);
      else setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  // Create entry
  const createEntry = useCallback(
    async (entry: NewDiaryEntry) => {
      if (!user) {
        toast.error('Please sign in to save diary entries');
        return null;
      }

      try {
        // Extract hours_spent before inserting (not a DB column on site_diary_entries)
        const { hours_spent, ...diaryFields } = entry;

        // If hours_spent is provided, create a linked time entry first
        let linkedTimeEntryId: string | null = null;
        if (hours_spent && hours_spent > 0) {
          const durationMinutes = Math.round(hours_spent * 60);
          const activity =
            diaryFields.tasks_completed.length > 0
              ? diaryFields.tasks_completed.join(', ')
              : `Site work at ${diaryFields.site_name}`;

          const { data: timeData, error: timeError } = await supabase
            .from('time_entries')
            .insert({
              user_id: user.id,
              date: diaryFields.date,
              duration: durationMinutes,
              activity,
              notes: `Logged from site diary — ${diaryFields.site_name}`,
              is_automatic: false,
            })
            .select('id')
            .single();

          if (!timeError && timeData) {
            linkedTimeEntryId = timeData.id;
          }
        }

        const { data, error } = await supabase
          .from('site_diary_entries')
          .insert({
            ...diaryFields,
            user_id: user.id,
            linked_time_entry_id: linkedTimeEntryId,
          })
          .select()
          .single();

        if (error) throw error;

        const newEntry = data as SiteDiaryEntry;
        setEntries((prev) => {
          const next = [newEntry, ...prev];
          storageSetJSONSync(STORAGE_KEY, next);
          return next;
        });

        const hoursMsg =
          hours_spent && hours_spent > 0 ? ` + ${hours_spent}h OJT logged` : '';
        toast.success(`Diary entry saved${hoursMsg}`);

        // Log XP for diary entry
        logActivity({
          activityType: 'site_diary_entry',
          sourceId: newEntry.id,
          sourceTitle: `Site Diary: ${newEntry.site_name}`,
          metadata: {
            siteName: newEntry.site_name,
            tasksCompleted: newEntry.tasks_completed?.length ?? 0,
            skillsPractised: newEntry.skills_practised?.length ?? 0,
            hoursSpent: hours_spent ?? 0,
          },
        });

        return newEntry;
      } catch (err) {
        console.error('Failed to save diary entry:', err);
        toast.error('Failed to save. Please try again.');
        return null;
      }
    },
    [user, logActivity]
  );

  // Update entry
  const updateEntry = useCallback(
    async (id: string, updates: Partial<NewDiaryEntry>) => {
      if (!user) return null;

      try {
        const { data, error } = await supabase
          .from('site_diary_entries')
          .update(updates)
          .eq('id', id)
          .eq('user_id', user.id)
          .select()
          .single();

        if (error) throw error;

        const updated = data as SiteDiaryEntry;
        // Delete the storage objects for any photos dropped in this edit — no
        // orphaned, still-downloadable files left behind.
        if (updates.photos) {
          const prevPhotos = entriesRef.current.find((e) => e.id === id)?.photos ?? [];
          const removed = prevPhotos.filter((u) => !updates.photos!.includes(u));
          if (removed.length) void removePhotoFiles(removed);
        }
        setEntries((prev) => {
          const next = prev.map((e) => (e.id === id ? updated : e));
          storageSetJSONSync(STORAGE_KEY, next);
          return next;
        });
        toast.success('Entry updated');
        return updated;
      } catch {
        toast.error('Failed to update entry');
        return null;
      }
    },
    [user]
  );

  // Delete entry
  const deleteEntry = useCallback(
    async (id: string) => {
      if (!user) return false;

      try {
        const { error } = await supabase
          .from('site_diary_entries')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);

        if (error) throw error;

        // Clean up this entry's photo files so a delete doesn't leave them
        // orphaned (and, on the public bucket, still downloadable) forever.
        const removedPhotos = entriesRef.current.find((e) => e.id === id)?.photos ?? [];
        if (removedPhotos.length) void removePhotoFiles(removedPhotos);

        setEntries((prev) => {
          const next = prev.filter((e) => e.id !== id);
          storageSetJSONSync(STORAGE_KEY, next);
          return next;
        });
        toast.success('Entry deleted');
        return true;
      } catch {
        toast.error('Failed to delete entry');
        return false;
      }
    },
    [user]
  );

  // Get recent sites for quick-select
  const recentSites = Array.from(new Set(entries.map((e) => e.site_name).filter(Boolean))).slice(
    0,
    5
  );

  return {
    entries,
    isLoading,
    loadError,
    createEntry,
    updateEntry,
    deleteEntry,
    recentSites,
    refresh: loadEntries,
  };
}
