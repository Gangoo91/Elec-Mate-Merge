import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { storageGetSync, storageSetSync } from '@/utils/storage';
import { DEFAULT_OTJ_STANDARD } from '@/data/otjStandards';

/* ==========================================================================
   useOtjProgramme — the apprentice's real off-the-job training envelope.

   Replaces the hardcoded 400h / 7.5h-per-week / 30-weeks-remaining constants
   that OJTHub previously applied to every apprentice regardless of where they
   actually are in their programme.

   OTJ rules (starts from 1 August 2025): off-the-job training is a FIXED total
   number of hours set per apprenticeship standard (DfE Annex C) — NOT 20% of
   working hours and NOT 6h/week. Those hours are delivered over a
   provider-agreed timeframe. The weekly figure here is therefore just a
   delivery pace (total ÷ weeks), not a statutory weekly minimum.

   Source priority:
     1. 'college'    — college_students.{start_date, expected_end_date,
                       otj_required_hours}. Provider-set, authoritative.
     2. 'self'       — apprentice picked their standard (→ fixed total) + dates
                       (stored locally). Pace = total ÷ programme weeks.
     3. 'estimated'  — no programme data at all. Falls back to the default
                       standard's total over a typical duration, clearly
                       labelled and nudged by profiles.apprentice_year.
   ========================================================================== */

export type OtjProgrammeSource = 'college' | 'self' | 'estimated';

export interface SelfProgramme {
  start_date: string; // ISO date (YYYY-MM-DD)
  end_date: string; // ISO date (planned gateway)
  /** Fixed OTJ total for the chosen standard (DfE Annex C), or a provider-given figure. */
  total_hours: number;
  /** Standard code the total came from, when picked from the list. */
  standard_code?: string | null;
}

export interface OtjProgramme {
  /** Total off-the-job hours required across the whole programme (gateway target). */
  totalTargetHours: number;
  /** Steady-state weekly OTJ target to clear the programme on time. */
  weeklyTargetHours: number;
  /** Whole weeks left until the planned end / gateway date. */
  weeksRemaining: number;
  /** Total programme length in weeks (null when unknown). */
  programmeWeeks: number | null;
  startDate: string | null;
  endDate: string | null;
  source: OtjProgrammeSource;
  /** false → showing a generic estimate the apprentice should correct. */
  isPersonalised: boolean;
  loading: boolean;
  /** Persist a self-set programme (used when there's no college link). */
  setSelfProgramme: (p: SelfProgramme) => void;
  clearSelfProgramme: () => void;
}

const WEEK_MS = 7 * 86_400_000;
// When we have no dates at all, fall back to the default standard's fixed OTJ
// total spread across a typical programme length.
const STANDARD_PROGRAMME_YEARS = 4; // typical electrical apprenticeship duration
const WEEKS_PER_YEAR = 46; // ~46 working weeks/yr after holiday

const selfKey = (uid: string) => `otj_programme:${uid}`;

function weeksBetween(fromIso: string, toIso: string): number {
  const from = new Date(fromIso).getTime();
  const to = new Date(toIso).getTime();
  if (!isFinite(from) || !isFinite(to) || to <= from) return 0;
  return (to - from) / WEEK_MS;
}

function weeksUntil(toIso: string): number {
  const to = new Date(toIso).getTime();
  if (!isFinite(to)) return 0;
  return Math.max(0, (to - Date.now()) / WEEK_MS);
}

export function useOtjProgramme(): OtjProgramme {
  const { user, profile } = useAuth();
  const uid = user?.id ?? null;

  const [college, setCollege] = useState<{
    start_date: string | null;
    expected_end_date: string | null;
    otj_required_hours: number | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [self, setSelf] = useState<SelfProgramme | null>(null);

  // Load the self-set programme. DB row wins (durable across devices); a
  // legacy localStorage copy is used as fallback and migrated up to the DB
  // the first time we see it. Tolerates the table not existing yet — the
  // localStorage path keeps working until the migration lands.
  useEffect(() => {
    if (!uid) return;
    let active = true;

    const local: SelfProgramme | null = (() => {
      const raw = storageGetSync(selfKey(uid));
      if (!raw) return null;
      try {
        return JSON.parse(raw) as SelfProgramme;
      } catch {
        return null;
      }
    })();
    if (local) setSelf(local);

    (async () => {
      try {
        const { data, error } = await supabase
          .from('user_otj_programmes' as never)
          .select('start_date, end_date, total_hours, standard_code')
          .eq('user_id', uid)
          .maybeSingle();
        if (!active || error) return;
        const row = data as unknown as SelfProgramme | null;
        if (row && row.start_date && row.end_date && row.total_hours > 0) {
          setSelf(row);
          // Keep the local copy in step for offline reads.
          storageSetSync(selfKey(uid), JSON.stringify(row));
        } else if (local) {
          // Legacy local-only programme — migrate it up so it survives the device.
          void supabase
            .from('user_otj_programmes' as never)
            .upsert({ user_id: uid, ...local } as never, { onConflict: 'user_id' });
        }
      } catch {
        /* table may not exist yet — localStorage fallback already applied */
      }
    })();

    return () => {
      active = false;
    };
  }, [uid]);

  // Load the college-side programme if the apprentice is linked.
  useEffect(() => {
    let active = true;
    (async () => {
      if (!uid) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data } = await supabase
        .from('college_students')
        .select('start_date, expected_end_date, otj_required_hours')
        .eq('user_id', uid)
        .maybeSingle();
      if (!active) return;
      setCollege(
        data
          ? {
              start_date: data.start_date,
              expected_end_date: data.expected_end_date,
              otj_required_hours: data.otj_required_hours,
            }
          : null
      );
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [uid]);

  const setSelfProgramme = useCallback(
    (p: SelfProgramme) => {
      setSelf(p);
      if (!uid) return;
      storageSetSync(selfKey(uid), JSON.stringify(p));
      // Durable copy — best-effort so the sheet stays snappy offline.
      void supabase
        .from('user_otj_programmes' as never)
        .upsert({ user_id: uid, ...p } as never, { onConflict: 'user_id' });
    },
    [uid]
  );

  const clearSelfProgramme = useCallback(() => {
    setSelf(null);
    if (!uid) return;
    storageSetSync(selfKey(uid), '');
    void supabase.from('user_otj_programmes' as never).delete().eq('user_id', uid);
  }, [uid]);

  return useMemo<OtjProgramme>(() => {
    // 1. College-provided programme — the gold source.
    if (college && (college.expected_end_date || college.otj_required_hours)) {
      const total =
        college.otj_required_hours && college.otj_required_hours > 0
          ? Number(college.otj_required_hours)
          : DEFAULT_OTJ_STANDARD.otjHours;
      const programmeWeeks =
        college.start_date && college.expected_end_date
          ? weeksBetween(college.start_date, college.expected_end_date)
          : null;
      const weeksRemaining = college.expected_end_date
        ? Math.max(1, Math.round(weeksUntil(college.expected_end_date)))
        : Math.round(programmeWeeks ?? STANDARD_PROGRAMME_YEARS * WEEKS_PER_YEAR);
      const weeklyTarget =
        programmeWeeks && programmeWeeks > 0
          ? total / programmeWeeks
          : total / (STANDARD_PROGRAMME_YEARS * WEEKS_PER_YEAR);
      return {
        totalTargetHours: Math.round(total),
        weeklyTargetHours: Math.round(weeklyTarget * 10) / 10,
        weeksRemaining,
        programmeWeeks: programmeWeeks ? Math.round(programmeWeeks) : null,
        startDate: college.start_date,
        endDate: college.expected_end_date,
        source: 'college',
        isPersonalised: true,
        loading,
        setSelfProgramme,
        clearSelfProgramme,
      };
    }

    // 2. Apprentice self-set programme — fixed total ÷ dates gives the pace.
    if (self && self.start_date && self.end_date && self.total_hours > 0) {
      const programmeWeeks = weeksBetween(self.start_date, self.end_date);
      const total = self.total_hours;
      const weeklyTarget = programmeWeeks > 0 ? total / programmeWeeks : 0;
      return {
        totalTargetHours: Math.round(total),
        weeklyTargetHours: Math.round(weeklyTarget * 10) / 10,
        weeksRemaining: Math.max(1, Math.round(weeksUntil(self.end_date))),
        programmeWeeks: programmeWeeks ? Math.round(programmeWeeks) : null,
        startDate: self.start_date,
        endDate: self.end_date,
        source: 'self',
        isPersonalised: true,
        loading,
        setSelfProgramme,
        clearSelfProgramme,
      };
    }

    // 3. Generic estimate — the default standard's fixed total over a typical
    //    programme, nudged by apprentice_year. Clearly flagged as not personalised.
    const year = profile?.apprentice_year ?? null;
    const yearsLeft =
      year && year >= 1 && year <= STANDARD_PROGRAMME_YEARS
        ? STANDARD_PROGRAMME_YEARS - year + 0.5
        : STANDARD_PROGRAMME_YEARS;
    const programmeWeeks = STANDARD_PROGRAMME_YEARS * WEEKS_PER_YEAR;
    const total = DEFAULT_OTJ_STANDARD.otjHours;
    return {
      totalTargetHours: total,
      weeklyTargetHours: Math.round((total / programmeWeeks) * 10) / 10,
      weeksRemaining: Math.max(1, Math.round(yearsLeft * WEEKS_PER_YEAR)),
      programmeWeeks,
      startDate: null,
      endDate: null,
      source: 'estimated',
      isPersonalised: false,
      loading,
      setSelfProgramme,
      clearSelfProgramme,
    };
  }, [college, self, profile?.apprentice_year, loading, setSelfProgramme, clearSelfProgramme]);
}
