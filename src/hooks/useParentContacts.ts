import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useParentContacts — list / add / update / remove parent + guardian
   contacts for a single college learner.

   Schema lives in college_parent_contacts (already in prod). The weekly
   parent digest cron at college_parent_digest_weekly + the public magic-link
   surface at /p/:token consume the same rows.
   ========================================================================== */

export type ParentRelationship =
  | 'parent'
  | 'guardian'
  | 'carer'
  | 'next_of_kin'
  | 'emergency_contact'
  | 'other';
export type DigestFrequency = 'weekly' | 'fortnightly' | 'monthly' | 'never';

export interface ParentContact {
  id: string;
  college_id: string;
  student_id: string;
  name: string;
  email: string;
  phone: string | null;
  relationship: ParentRelationship | null;
  opted_in_at: string | null;
  opted_out_at: string | null;
  opt_in_method: string | null;
  digest_frequency: DigestFrequency;
  digest_last_sent_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ParentContactInput {
  name: string;
  email: string;
  phone?: string | null;
  relationship?: ParentRelationship | null;
  digest_frequency?: DigestFrequency;
  opted_in?: boolean;
}

export function useParentContacts(studentId: string | null | undefined) {
  const [contacts, setContacts] = useState<ParentContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!studentId) {
      setContacts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: qErr } = await supabase
        .from('college_parent_contacts')
        .select('*')
        .eq('student_id', studentId)
        .order('created_at', { ascending: true });
      if (qErr) throw qErr;
      setContacts((data ?? []) as ParentContact[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  const add = useCallback(
    async (input: ParentContactInput) => {
      if (!studentId) throw new Error('No student in scope');
      // Resolve college_id from the student row so RLS scopes correctly.
      const { data: studentRow } = await supabase
        .from('college_students')
        .select('college_id')
        .eq('id', studentId)
        .maybeSingle();
      const collegeId = (studentRow as { college_id?: string | null } | null)?.college_id;
      if (!collegeId) throw new Error('Student college not resolved');
      const now = new Date().toISOString();
      const { error: insErr } = await supabase.from('college_parent_contacts').insert({
        college_id: collegeId,
        student_id: studentId,
        name: input.name.trim(),
        email: input.email.trim(),
        phone: input.phone?.trim() || null,
        relationship: input.relationship ?? 'parent',
        digest_frequency: input.digest_frequency ?? 'weekly',
        opted_in_at: input.opted_in === false ? null : now,
        opt_in_method: 'tutor_added',
      });
      if (insErr) throw insErr;
      await fetch();
    },
    [studentId, fetch]
  );

  const update = useCallback(
    async (id: string, patch: Partial<ParentContact>) => {
      const { error: updErr } = await supabase
        .from('college_parent_contacts')
        .update(patch)
        .eq('id', id);
      if (updErr) throw updErr;
      await fetch();
    },
    [fetch]
  );

  const remove = useCallback(
    async (id: string) => {
      const { error: delErr } = await supabase
        .from('college_parent_contacts')
        .delete()
        .eq('id', id);
      if (delErr) throw delErr;
      await fetch();
    },
    [fetch]
  );

  const optOut = useCallback(
    async (id: string) => {
      const { error: updErr } = await supabase
        .from('college_parent_contacts')
        .update({ opted_out_at: new Date().toISOString() })
        .eq('id', id);
      if (updErr) throw updErr;
      await fetch();
    },
    [fetch]
  );

  return { contacts, loading, error, add, update, remove, optOut, refetch: fetch };
}
