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
import { storageGetJSONSync, storageRemoveSync, storageSetJSONSync } from '@/utils/storage';

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

/**
 * The URLs nothing else still points at. A diary photo is copied by URL into
 * a portfolio item (storage_urls) and into the training record's evidence, so
 * deleting the file because the DIARY let go of it blanked signed-off
 * evidence. Any lookup that fails counts as "still used" — keep the file.
 */
async function unreferencedPhotos(urls: string[]): Promise<string[]> {
  const free: string[] = [];
  for (const url of urls) {
    try {
      const [pi, one, many] = await Promise.all([
        supabase
          .from('portfolio_items')
          .select('id', { count: 'exact', head: true })
          // jsonb: send the filter as JSON. `.contains()` with an array writes a
          // Postgres array literal, which jsonb rejects (400) — and a failed
          // lookup counts as "still used", so no photo was ever cleaned up.
          .filter('storage_urls', 'cs', JSON.stringify([{ url }])),
        supabase
          .from('college_otj_entries')
          .select('id', { count: 'exact', head: true })
          .eq('evidence_url', url),
        supabase
          .from('college_otj_entries')
          .select('id', { count: 'exact', head: true })
          .contains('evidence_urls', [url]),
      ]);
      if (pi.error || one.error || many.error) continue;
      if ((pi.count ?? 0) + (one.count ?? 0) + (many.count ?? 0) === 0) free.push(url);
    } catch {
      /* keep the file */
    }
  }
  return free;
}

/** Best-effort delete of photo storage objects by their stored URLs — only
 *  the ones no portfolio item or training record still uses. */
export async function removePhotoFiles(candidates: string[]): Promise<void> {
  const urls = await unreferencedPhotos(candidates);
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
  /** The supervisor's account, when picked from the employer link. */
  supervisor_user_id?: string | null;
  tasks_completed: string[];
  skills_practised: string[];
  /** Qualification units this day covered (codes, e.g. "301") — their own
   *  column now; they used to be mixed into skills_practised as strings. */
  unit_codes?: string[];
  what_i_learned: string | null;
  issues_or_questions: string | null;
  mood_rating: number | null;
  photos: string[];
  linked_portfolio_id: string | null;
  /** Off-the-job TRAINING time that day — not hours on site. */
  training_minutes?: number | null;
  training_type?: TrainingType | null;
  /** The college_otj_entries row the training time was sent as. */
  linked_otj_entry_id?: string | null;
  /** Shared with the apprentice's college (entry + question; never mood). */
  share_with_tutor?: boolean;
  job_id?: string | null;
  created_at: string;
  updated_at: string;
}

/** college_otj_entries.activity_type values a site day's training can be. */
export type TrainingType =
  | 'practical'
  | 'shadowing'
  | 'tutorial'
  | 'manufacturer_training'
  | 'workshop'
  | 'mentoring'
  | 'other';

export const TRAINING_TYPES: { id: TrainingType; label: string; hint: string }[] = [
  { id: 'practical', label: 'Shown how', hint: 'Someone showed you how to do a task' },
  { id: 'shadowing', label: 'Shadowing', hint: 'You watched a skilled electrician work' },
  { id: 'tutorial', label: 'Toolbox talk', hint: 'A briefing or talk on site' },
  { id: 'manufacturer_training', label: 'Manufacturer', hint: 'Product or manufacturer training' },
  { id: 'mentoring', label: 'Mentoring', hint: 'A one-to-one with your supervisor or mentor' },
  { id: 'other', label: 'Other training', hint: 'Training that isn’t your normal work' },
];

export type NewDiaryEntry = Omit<
  SiteDiaryEntry,
  'id' | 'user_id' | 'created_at' | 'updated_at' | 'linked_otj_entry_id'
>;

// The generated Supabase types predate migration 20261006203000, so writes
// carrying the new columns are cast. Regenerate the types to drop the casts.

/** Per user — a shared key let a second account on the same device see the
 *  first account's diary whenever its own list came back empty. */
const storageKey = (uid: string) => `elec-mate-site-diary:${uid}`;
const LEGACY_STORAGE_KEY = 'elec-mate-site-diary';

export type OtjStatus = 'pending' | 'verified' | 'rejected' | 'verified_by_employer';

/** Signed off by a tutor or employer — the diary can no longer change it. */
export const isOtjSignedOff = (s: OtjStatus | undefined) =>
  s === 'verified' || s === 'verified_by_employer';

export function useSiteDiaryEntries() {
  const { user } = useAuth();
  const { logActivity } = useLearningXP();
  const [entries, setEntries] = useState<SiteDiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // True when the fetch failed AND there was no local cache to fall back on —
  // lets the UI distinguish "couldn't load" from a genuine empty first-run.
  const [loadError, setLoadError] = useState(false);
  /** Verification state of each entry's linked training (OTJ) record. */
  const [otjStatus, setOtjStatus] = useState<Record<string, OtjStatus>>({});
  /** Why a tutor or employer didn't accept the training, when they said. */
  const [otjRationale, setOtjRationale] = useState<Record<string, string>>({});
  /** Who sent the training back: a tutor writes verification_rationale, an
   *  employer's attestation writes attestation_comment. */
  const [otjReturnedBy, setOtjReturnedBy] = useState<Record<string, 'tutor' | 'employer'>>({});
  /** Entries whose linked training record didn't update on the last save —
   *  the link is still there, so "unsent" alone can't see them. */
  const [syncFailed, setSyncFailed] = useState<Record<string, true>>({});
  const uid = user?.id ?? null;
  // Mirror of entries, readable from delete/update without stale closures, so
  // we can find the OLD photo set and clean up its storage on remove/replace.
  const entriesRef = useRef<SiteDiaryEntry[]>([]);
  useEffect(() => {
    entriesRef.current = entries;
  }, [entries]);

  const cache = useCallback(
    (next: SiteDiaryEntry[]) => {
      if (uid) storageSetJSONSync(storageKey(uid), next);
    },
    [uid]
  );

  const loadOtjStatus = useCallback(async (list: SiteDiaryEntry[]) => {
    const ids = list.map((e) => e.linked_otj_entry_id).filter((x): x is string => !!x);
    if (!ids.length) {
      setOtjStatus({});
      setOtjRationale({});
      setOtjReturnedBy({});
      return;
    }
    const { data, error } = await supabase
      .from('college_otj_entries')
      .select('id, verification_status, verification_rationale, attestation_comment')
      .in('id', ids);
    if (error) return; // keep what we had rather than wiping it
    const byOtj = new Map(
      (
        (data ?? []) as Array<{
          id: string;
          verification_status: OtjStatus;
          verification_rationale: string | null;
          attestation_comment: string | null;
        }>
      ).map((r) => [r.id, r])
    );
    const next: Record<string, OtjStatus> = {};
    const why: Record<string, string> = {};
    const by: Record<string, 'tutor' | 'employer'> = {};
    for (const e of list) {
      const r = e.linked_otj_entry_id ? byOtj.get(e.linked_otj_entry_id) : undefined;
      if (!r) continue;
      next[e.id] = r.verification_status;
      if (r.verification_status !== 'rejected') continue;
      const tutorWhy = (r.verification_rationale ?? '').trim();
      const employerWhy = (r.attestation_comment ?? '').trim();
      if (tutorWhy) {
        why[e.id] = tutorWhy;
        by[e.id] = 'tutor';
      } else if (employerWhy) {
        why[e.id] = employerWhy;
        by[e.id] = 'employer';
      }
    }
    setOtjStatus(next);
    setOtjRationale(why);
    setOtjReturnedBy(by);
  }, []);

  // Load entries
  const loadEntries = useCallback(async () => {
    setIsLoading(true);
    setLoadError(false);
    try {
      storageRemoveSync(LEGACY_STORAGE_KEY);
    } catch {
      /* storage blocked */
    }
    if (!uid) {
      setEntries([]);
      setIsLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('site_diary_entries')
        .select('*')
        .eq('user_id', uid)
        .order('date', { ascending: false });
      if (error) throw error;
      // The server is the truth — an empty list is empty, not "use the cache"
      // (that brought back entries deleted on another device).
      const list = (data ?? []) as SiteDiaryEntry[];
      setEntries(list);
      cache(list);
      void loadOtjStatus(list);
    } catch {
      // Offline or the request failed: the cached list is a fine read-only
      // fallback; only flag an error if there's nothing cached either.
      const local = storageGetJSONSync<SiteDiaryEntry[]>(storageKey(uid), []);
      if (local.length > 0) setEntries(local);
      else setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  }, [uid, cache, loadOtjStatus]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  /**
   * Training time → college_otj_entries, the record the OTJ hub, the tutor and
   * the employer's attestation already use (apprentice_submitted, pending).
   * The diary used to write time_entries, which the OTJ hub itself says never
   * count — and wrote them BEFORE the diary row, so every failed save left
   * phantom hours behind. Now the diary row is saved first and this runs
   * after; if it fails the entry is still saved and says so.
   *
   * Once a tutor or employer has signed it off it is theirs: never rewritten.
   * A REJECTED record is resubmitted (back to pending, rationale cleared — the
   * one transition tg_guard_otj_self_edit allows the learner).
   * Every write is filtered to the status we read, so a sign-off landing
   * between the read and the write makes the write miss rather than clobber.
   */
  const syncTraining = useCallback(
    async (
      entry: SiteDiaryEntry,
      /** false: nothing a tutor would re-read changed (only mood, the
       *  question or sharing), so a sent-back record stays sent back. */
      opts: { resubmit?: boolean } = {}
    ): Promise<{
      otjId: string | null;
      failed: boolean;
      locked: boolean;
      /** False when the learner has no college — nobody is told about a
       *  pending row then; only the supervisor link reaches a signer. */
      hasCollege: boolean;
      /** A sent-back record went to the tutor again. */
      resubmitted?: boolean;
    }> => {
      const linked = entry.linked_otj_entry_id ?? null;
      if (!uid) return { otjId: linked, failed: false, locked: false, hasCollege: false };
      const minutes = entry.training_minutes ?? 0;
      try {
        if (linked) {
          const { data: cur, error: readErr } = await supabase
            .from('college_otj_entries')
            .select('verification_status, college_id')
            .eq('id', linked)
            .maybeSingle();
          if (readErr) throw readErr;
          const row = cur as { verification_status?: OtjStatus; college_id?: string | null } | null;
          const hasCollege = !!row?.college_id;
          // The record was deleted elsewhere (FK will null the link) — treat
          // the entry as unlinked and send it fresh below.
          if (row) {
            const status = row.verification_status ?? 'pending';
            if (isOtjSignedOff(status))
              return { otjId: linked, failed: false, locked: true, hasCollege };
            // A rejected record can't be deleted by the learner (policy) — it
            // stays linked and simply never counts.
            if (!minutes && status === 'rejected')
              return { otjId: linked, failed: false, locked: false, hasCollege };
            if (status === 'rejected' && opts.resubmit === false)
              return { otjId: linked, failed: false, locked: false, hasCollege };
            if (!minutes) {
              const { error } = await supabase
                .from('college_otj_entries')
                .delete()
                .eq('id', linked)
                .eq('verification_status', status);
              if (error) throw error;
              return { otjId: null, failed: false, locked: false, hasCollege };
            }
            const { data: upd, error } = await supabase
              .from('college_otj_entries')
              .update({
                activity_date: entry.date,
                activity_type: entry.training_type ?? 'practical',
                title: `Site diary — ${entry.site_name}`,
                description: trainingDescription(entry),
                duration_minutes: minutes,
                unit_codes: entry.unit_codes ?? [],
                evidence_url: entry.photos[0] ?? null,
                evidence_urls: entry.photos.length ? entry.photos : null,
                ...(status === 'rejected'
                  ? { verification_status: 'pending', verification_rationale: null }
                  : {}),
              } as never)
              .eq('id', linked)
              .eq('verification_status', status)
              .select('id');
            if (error) throw error;
            // Zero rows: signed off in the gap between the read and the write.
            if (!upd?.length) return { otjId: linked, failed: false, locked: true, hasCollege };
            return {
              otjId: linked,
              failed: false,
              locked: false,
              hasCollege,
              resubmitted: status === 'rejected',
            };
          }
        }
        if (!minutes) return { otjId: null, failed: false, locked: false, hasCollege: false };
        const [{ data: cs }, { data: prof }] = await Promise.all([
          // Newest enrolment — a learner who moved college has two rows, and the
          // tutor bell (trigger) picks the newest too.
          supabase
            .from('college_students')
            .select('college_id')
            .eq('user_id', uid)
            .order('created_at', { ascending: false })
            .limit(1),
          supabase.from('profiles').select('full_name').eq('id', uid).maybeSingle(),
        ]);
        const collegeId =
          ((cs ?? []) as Array<{ college_id?: string | null }>)[0]?.college_id ?? null;
        const { data: ins, error } = await supabase
          .from('college_otj_entries')
          .insert({
            college_id: collegeId,
            student_id: uid,
            recorded_by: uid,
            recorded_by_name_snapshot:
              (prof as { full_name?: string | null } | null)?.full_name ?? null,
            activity_date: entry.date,
            activity_type: entry.training_type ?? 'practical',
            title: `Site diary — ${entry.site_name}`,
            description: trainingDescription(entry),
            duration_minutes: minutes,
            unit_codes: entry.unit_codes ?? [],
            evidence_url: entry.photos[0] ?? null,
            evidence_urls: entry.photos.length ? entry.photos : null,
            source: 'apprentice',
            source_kind: 'apprentice_submitted',
            verification_status: 'pending',
          })
          .select('id')
          .single();
        if (error) throw error;
        const otjId = (ins as { id: string }).id;
        const { error: linkErr } = await supabase
          .from('site_diary_entries')
          .update({ linked_otj_entry_id: otjId } as never)
          .eq('id', entry.id)
          .eq('user_id', uid);
        if (linkErr) {
          // Don't leave an unlinked training record behind.
          await supabase
            .from('college_otj_entries')
            .delete()
            .eq('id', otjId)
            .eq('verification_status', 'pending');
          throw linkErr;
        }
        return { otjId, failed: false, locked: false, hasCollege: !!collegeId };
      } catch (err) {
        console.error('Diary training time not sent:', err);
        return { otjId: linked, failed: true, locked: false, hasCollege: false };
      }
    },
    [uid]
  );

  const applyLocal = useCallback(
    (updater: (prev: SiteDiaryEntry[]) => SiteDiaryEntry[]) => {
      setEntries((prev) => {
        const next = updater(prev);
        cache(next);
        return next;
      });
    },
    [cache]
  );

  const markSync = useCallback((id: string, failed: boolean) => {
    setSyncFailed((s) => {
      if (failed === !!s[id]) return s;
      const next = { ...s };
      if (failed) next[id] = true;
      else delete next[id];
      return next;
    });
  }, []);

  // Create entry
  const createEntry = useCallback(
    async (entry: NewDiaryEntry) => {
      if (!uid) {
        toast.error('Please sign in to save diary entries');
        return null;
      }
      try {
        const { data, error } = await supabase
          .from('site_diary_entries')
          .insert({ ...entry, user_id: uid } as never)
          .select()
          .single();
        if (error) throw error;
        let saved = data as SiteDiaryEntry;

        const t = await syncTraining(saved);
        if (t.otjId !== (saved.linked_otj_entry_id ?? null))
          saved = { ...saved, linked_otj_entry_id: t.otjId };
        applyLocal((prev) => [saved, ...prev]);
        if (t.otjId) setOtjStatus((s) => ({ ...s, [saved.id]: 'pending' }));
        markSync(saved.id, t.failed && !!t.otjId);

        // XP for the entry (this also counts as reflective practice).
        logActivity({
          activityType: 'site_diary_entry',
          sourceId: saved.id,
          sourceTitle: `Site Diary: ${saved.site_name}`,
          metadata: {
            siteName: saved.site_name,
            tasksCompleted: saved.tasks_completed?.length ?? 0,
            unitCodes: saved.unit_codes ?? [],
            trainingMinutes: saved.training_minutes ?? 0,
          },
        });
        return { entry: saved, trainingFailed: t.failed, hasCollege: t.hasCollege };
      } catch (err) {
        console.error('Failed to save diary entry:', err);
        toast.error('Couldn’t save — check your connection. Your draft is kept.');
        return null;
      }
    },
    [uid, logActivity, syncTraining, applyLocal, markSync]
  );

  // Update entry
  const updateEntry = useCallback(
    async (id: string, input: Partial<NewDiaryEntry>) => {
      if (!uid) return null;
      const before = entriesRef.current.find((e) => e.id === id);
      const updates = { ...input };
      // Signed-off training belongs to whoever signed it: the diary keeps
      // showing what they signed, not an edit nobody will see. Read the record
      // fresh — the page's status map loads in the background and an Edit
      // opened before it arrived wrote "2h · signed off" over a signed-off 1h.
      let otjNow: {
        verification_status: OtjStatus;
        duration_minutes: number | null;
        activity_type: string | null;
      } | null = null;
      if (before?.linked_otj_entry_id) {
        const { data: cur } = await supabase
          .from('college_otj_entries')
          .select('verification_status, duration_minutes, activity_type')
          .eq('id', before.linked_otj_entry_id)
          .maybeSingle();
        otjNow = (cur as typeof otjNow) ?? null;
      }
      const signedOff = isOtjSignedOff(otjNow?.verification_status ?? otjStatus[id]);
      if (signedOff) {
        delete updates.training_minutes;
        delete updates.training_type;
      }
      const trainingChanged =
        !!before &&
        (('training_minutes' in input &&
          (input.training_minutes ?? 0) !== (before.training_minutes ?? 0)) ||
          ('training_type' in input &&
            (input.training_type ?? null) !== (before.training_type ?? null)));
      try {
        const { data, error } = await supabase
          .from('site_diary_entries')
          .update(updates as never)
          .eq('id', id)
          .eq('user_id', uid)
          .select()
          .single();
        if (error) throw error;
        let updated = data as SiteDiaryEntry;

        // Only what a tutor would re-read sends a sent-back record again —
        // a mood, question or sharing change leaves it where it is.
        const same = (a: unknown, b: unknown) =>
          JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
        const tutorFieldsChanged =
          !before ||
          !same(before.training_minutes, updated.training_minutes) ||
          !same(before.training_type, updated.training_type) ||
          before.date !== updated.date ||
          before.site_name !== updated.site_name ||
          !same(before.tasks_completed, updated.tasks_completed) ||
          !same(before.what_i_learned, updated.what_i_learned) ||
          !same(before.photos, updated.photos) ||
          !same(before.unit_codes, updated.unit_codes);

        const t = await syncTraining(updated, { resubmit: tutorFieldsChanged });

        // Signed off between our read and the sync's write: put the signed
        // figures back on the diary row so it never claims a different time.
        if (t.locked && updated.linked_otj_entry_id) {
          const { data: signed } = await supabase
            .from('college_otj_entries')
            .select('duration_minutes, activity_type')
            .eq('id', updated.linked_otj_entry_id)
            .maybeSingle();
          const sm = (signed as { duration_minutes?: number | null } | null)?.duration_minutes;
          const st = (signed as { activity_type?: string | null } | null)?.activity_type;
          const typeOk = TRAINING_TYPES.some((x) => x.id === st);
          if (
            sm != null &&
            (sm !== (updated.training_minutes ?? 0) || (typeOk && st !== updated.training_type))
          ) {
            const fix = {
              training_minutes: sm,
              ...(typeOk ? { training_type: st as TrainingType } : {}),
            };
            const { error: fixErr } = await supabase
              .from('site_diary_entries')
              .update(fix as never)
              .eq('id', id)
              .eq('user_id', uid);
            if (!fixErr) updated = { ...updated, ...fix };
          }
        }
        if (t.otjId !== (updated.linked_otj_entry_id ?? null)) {
          if (!t.otjId && updated.linked_otj_entry_id)
            await supabase
              .from('site_diary_entries')
              .update({ linked_otj_entry_id: null } as never)
              .eq('id', id)
              .eq('user_id', uid);
          updated = { ...updated, linked_otj_entry_id: t.otjId };
        }
        applyLocal((prev) => prev.map((e) => (e.id === id ? updated : e)));
        // A record that stayed sent back (only mood/question/sharing changed)
        // keeps its status and its reason.
        const keptReturned =
          !t.resubmitted &&
          otjNow?.verification_status === 'rejected' &&
          t.otjId === before?.linked_otj_entry_id;
        setOtjStatus((s) => {
          const next = { ...s };
          if (t.otjId && !t.locked && !t.failed && !keptReturned) next[id] = 'pending';
          if (!t.otjId) delete next[id];
          return next;
        });
        if (!t.locked && !t.failed && !keptReturned)
          setOtjRationale((r) => {
            if (!r[id]) return r;
            const next = { ...r };
            delete next[id];
            return next;
          });
        markSync(id, t.failed && !!t.otjId);

        // Photos dropped in this edit: delete the files only once nothing
        // (portfolio item, training evidence) still uses them. Runs after the
        // training sync so the record's evidence already reflects the edit.
        if (updates.photos && before) {
          const removed = before.photos.filter((u) => !updates.photos!.includes(u));
          if (removed.length) void removePhotoFiles(removed);
        }

        if (t.failed) toast.warning('Updated — but the training time didn’t send. Try again.');
        else if ((t.locked || signedOff) && trainingChanged)
          toast.success(
            'Updated. The training time was already signed off, so it stays as it was.'
          );
        else if (t.resubmitted)
          toast.success(
            `Sent again · ${formatMinutes(updated.training_minutes ?? 0)} training waiting for sign-off`
          );
        else toast.success('Entry updated');
        return updated;
      } catch {
        toast.error('Couldn’t update the entry');
        return null;
      }
    },
    [uid, syncTraining, applyLocal, otjStatus, markSync]
  );

  // Delete entry
  const deleteEntry = useCallback(
    async (id: string) => {
      if (!uid) return false;
      const entry = entriesRef.current.find((e) => e.id === id);
      try {
        // Its training record goes FIRST — waiting or sent back, it isn't
        // counted hours, and a sent-back one left behind sat in the OTJ hub
        // with no diary day. If that fails we stop. Always attempted (the
        // status may not have loaded); the filter keeps signed-off records.
        if (entry?.linked_otj_entry_id) {
          const { error: otjErr } = await supabase
            .from('college_otj_entries')
            .delete()
            .eq('id', entry.linked_otj_entry_id)
            .in('verification_status', ['pending', 'rejected']);
          if (otjErr) throw otjErr;
        }

        const { error } = await supabase
          .from('site_diary_entries')
          .delete()
          .eq('id', id)
          .eq('user_id', uid);
        if (error) throw error;

        // Clean up photo files nothing else uses, so a delete doesn't leave
        // them orphaned (and, on the public bucket, still downloadable).
        if (entry?.photos.length) void removePhotoFiles(entry.photos);

        applyLocal((prev) => prev.filter((e) => e.id !== id));
        markSync(id, false);
        toast.success('Entry deleted');
        return true;
      } catch {
        toast.error('Couldn’t delete the entry');
        return false;
      }
    },
    [uid, applyLocal, markSync]
  );

  /** Re-send training time that failed to send (from the detail sheet). */
  const retryTraining = useCallback(
    async (id: string) => {
      const entry = entriesRef.current.find((e) => e.id === id);
      if (!entry) return false;
      const t = await syncTraining(entry);
      if (t.failed) {
        toast.error('Still couldn’t send the training time');
        return false;
      }
      applyLocal((prev) =>
        prev.map((e) => (e.id === id ? { ...e, linked_otj_entry_id: t.otjId } : e))
      );
      if (t.otjId && !t.locked) setOtjStatus((s) => ({ ...s, [id]: 'pending' }));
      markSync(id, false);
      toast.success(
        t.hasCollege
          ? 'Training time sent for sign-off'
          : 'Training time saved. Ask your supervisor to confirm it.'
      );
      return true;
    },
    [syncTraining, applyLocal, markSync]
  );

  /*
   * Recent sites for quick-select.
   *
   * De-duplicated case-insensitively: a plain Set treated "Sellafield" and
   * "sellafield" as two different sites, so the same place appeared twice in
   * the chips and split the feed's grouping. The first spelling entered wins,
   * since that is the one the apprentice chose most recently.
   */
  const recentSites = (() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const name of entries.map((e) => e.site_name)) {
      if (!name) continue;
      const key = name.trim().toLowerCase();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      out.push(name.trim());
      if (out.length === 5) break;
    }
    return out;
  })();

  return {
    entries,
    isLoading,
    loadError,
    otjStatus,
    otjRationale,
    otjReturnedBy,
    syncFailed,
    createEntry,
    updateEntry,
    deleteEntry,
    retryTraining,
    recentSites,
    refresh: loadEntries,
  };
}

function trainingDescription(e: SiteDiaryEntry): string {
  const parts = [
    e.tasks_completed.length ? `Tasks: ${e.tasks_completed.join(', ')}.` : '',
    e.what_i_learned ? `Learned: ${e.what_i_learned}` : '',
    e.supervisor ? `Supervisor: ${e.supervisor}.` : '',
  ].filter(Boolean);
  return parts.join(' ').slice(0, 2000);
}

/** 90 → "1h 30m", 60 → "1h", 30 → "30m". */
export function formatMinutes(m: number): string {
  const h = Math.floor(m / 60);
  const r = m % 60;
  return h && r ? `${h}h ${r}m` : h ? `${h}h` : `${r}m`;
}
