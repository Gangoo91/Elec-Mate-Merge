import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useStudentInclusion — read / update inclusion details on college_students.
   ELE-904 (B9). Matches the existing production schema (send_flags array,
   eal boolean, ehcp_ref, accessibility_notes, first_language, pronouns).
   ========================================================================== */

export const SEND_FLAG_KEYS = [
  'send',                  // umbrella SEND
  'dyslexia',
  'dyspraxia',
  'autism',
  'adhd',
  'hearing_impairment',
  'visual_impairment',
  'physical_disability',
  'mental_health',
  'lac',                   // looked-after child
  'fsm',                   // free school meals
] as const;

export type SendFlagKey = (typeof SEND_FLAG_KEYS)[number];

export const SEND_FLAG_LABEL: Record<SendFlagKey, string> = {
  send: 'SEND',
  dyslexia: 'Dyslexia',
  dyspraxia: 'Dyspraxia',
  autism: 'Autism / ASC',
  adhd: 'ADHD',
  hearing_impairment: 'Hearing impairment',
  visual_impairment: 'Visual impairment',
  physical_disability: 'Physical disability',
  mental_health: 'Mental health',
  lac: 'Looked-after child',
  fsm: 'Free school meals',
};

export interface StudentInclusion {
  student_id: string;
  send_flags: SendFlagKey[];
  eal: boolean;
  ehcp_ref: string | null;
  accessibility_notes: string | null;
  first_language: string | null;
  pronouns: string | null;
}

export function useStudentInclusion(studentId: string | null | undefined) {
  const [data, setData] = useState<StudentInclusion | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!studentId) {
      setData(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data: row, error: qErr } = await supabase
        .from('college_students')
        .select('id, send_flags, eal, ehcp_ref, accessibility_notes, first_language, pronouns')
        .eq('id', studentId)
        .maybeSingle();
      if (qErr) throw qErr;
      if (!row) {
        setData(null);
        return;
      }
      setData({
        student_id: row.id,
        send_flags: (row.send_flags as SendFlagKey[]) ?? [],
        eal: !!row.eal,
        ehcp_ref: row.ehcp_ref,
        accessibility_notes: row.accessibility_notes,
        first_language: row.first_language,
        pronouns: row.pronouns,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  const update = useCallback(
    async (patch: Partial<Omit<StudentInclusion, 'student_id'>>) => {
      if (!studentId) return;
      setSaving(true);
      setError(null);
      try {
        const merged: Record<string, unknown> = {};
        if (patch.send_flags) merged.send_flags = patch.send_flags;
        if (patch.eal !== undefined) merged.eal = patch.eal;
        if (patch.ehcp_ref !== undefined) merged.ehcp_ref = patch.ehcp_ref;
        if (patch.accessibility_notes !== undefined)
          merged.accessibility_notes = patch.accessibility_notes;
        if (patch.first_language !== undefined) merged.first_language = patch.first_language;
        if (patch.pronouns !== undefined) merged.pronouns = patch.pronouns;

        const { error: updErr } = await supabase
          .from('college_students')
          .update(merged)
          .eq('id', studentId);
        if (updErr) throw updErr;
        await fetch();
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
        throw e;
      } finally {
        setSaving(false);
      }
    },
    [studentId, fetch]
  );

  const toggleFlag = useCallback(
    async (key: SendFlagKey, value: boolean) => {
      const current = data?.send_flags ?? [];
      const next = value
        ? Array.from(new Set([...current, key]))
        : current.filter((k) => k !== key);
      await update({ send_flags: next });
    },
    [data, update]
  );

  return { data, loading, saving, error, update, toggleFlag, refetch: fetch };
}

/** Helper: short formatted list of a learner's active SEND flags. */
export function summariseFlags(flags: SendFlagKey[] | null | undefined): string {
  if (!flags || flags.length === 0) return 'None recorded';
  return flags.map((k) => SEND_FLAG_LABEL[k]).join(' · ');
}
