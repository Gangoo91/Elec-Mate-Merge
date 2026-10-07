import { useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase as typedSupabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useLearnerHeaderFacts — the facts on the Student 360 name line and the
   "Last contact" figure (ELE-1888).

   Employer: the college's employer record on college_students.employer_id,
   else the employer name typed on the learner's assignment.
   Tutor: the tutor on the learner's assignment (matched to a college_staff
   row by user id), else the tutor of their cohort.
   Last contact: the newest of a message a member of staff sent them, a
   held progress review, and (passed in) a one-to-one note or observation.
   Every read is a plain RLS read a member of staff at the college can make;
   a read that fails leaves its fact blank rather than breaking the page.
   ========================================================================== */

const supabase = typedSupabase as unknown as SupabaseClient;

export interface ContactEvent {
  at: string;
  kind: 'message' | 'review' | 'one_to_one' | 'observation';
}

export const CONTACT_LABEL: Record<ContactEvent['kind'], string> = {
  message: 'Message',
  review: 'Progress review',
  one_to_one: 'One-to-one',
  observation: 'Observation',
};

interface Args {
  studentId: string | null;
  userId: string | null;
  cohortId: string | null;
  employerId: string | null;
}

export function useLearnerHeaderFacts({ studentId, userId, cohortId, employerId }: Args) {
  const [employer, setEmployer] = useState<string | null>(null);
  const [tutor, setTutor] = useState<string | null>(null);
  const [remoteContact, setRemoteContact] = useState<ContactEvent[]>([]);
  const [contactLoaded, setContactLoaded] = useState(false);

  useEffect(() => {
    setEmployer(null);
    setTutor(null);
    if (!studentId) return;
    let live = true;
    (async () => {
      const [emp, asg, coh] = await Promise.all([
        employerId
          ? supabase
              .from('college_employers')
              .select('company_name')
              .eq('id', employerId)
              .maybeSingle()
          : Promise.resolve({ data: null }),
        userId
          ? supabase
              .from('college_student_assignments')
              .select('tutor_id, employer_name, college_id')
              .eq('student_id', userId)
              .order('created_at', { ascending: false })
              .limit(1)
              .maybeSingle()
          : Promise.resolve({ data: null }),
        cohortId
          ? supabase.from('college_cohorts').select('tutor_id').eq('id', cohortId).maybeSingle()
          : Promise.resolve({ data: null }),
      ]);
      if (!live) return;
      const a = (asg.data ?? null) as {
        tutor_id: string | null;
        employer_name: string | null;
        college_id: string | null;
      } | null;
      const companyName =
        (emp.data as { company_name?: string | null } | null)?.company_name ?? null;
      setEmployer(companyName || a?.employer_name || null);

      let tutorName: string | null = null;
      if (a?.tutor_id) {
        let q = supabase
          .from('college_staff')
          .select('name')
          .eq('user_id', a.tutor_id)
          .is('archived_at', null);
        if (a.college_id) q = q.eq('college_id', a.college_id);
        const { data } = await q.limit(1).maybeSingle();
        tutorName = (data as { name?: string | null } | null)?.name ?? null;
      }
      const cohortTutor = (coh.data as { tutor_id?: string | null } | null)?.tutor_id ?? null;
      if (!tutorName && cohortTutor) {
        const { data } = await supabase
          .from('college_staff')
          .select('name')
          .eq('id', cohortTutor)
          .maybeSingle();
        tutorName = (data as { name?: string | null } | null)?.name ?? null;
      }
      if (live) setTutor(tutorName);
    })().catch(() => {
      /* facts stay blank */
    });
    return () => {
      live = false;
    };
  }, [studentId, userId, cohortId, employerId]);

  useEffect(() => {
    setRemoteContact([]);
    setContactLoaded(false);
    if (!studentId) return;
    let live = true;
    Promise.all([
      supabase
        .from('student_messages')
        .select('created_at, student_message_threads!inner(student_id)')
        .eq('student_message_threads.student_id', studentId)
        .eq('sender_kind', 'tutor')
        .order('created_at', { ascending: false })
        .limit(1),
      supabase
        .from('college_tripartite_reviews')
        .select('held_on, completed_at')
        .eq('student_id', studentId)
        .eq('status', 'completed')
        .order('completed_at', { ascending: false, nullsFirst: false })
        .limit(1),
    ])
      .then(([msg, rev]) => {
        if (!live) return;
        const out: ContactEvent[] = [];
        const m = (msg.data?.[0] as { created_at?: string } | undefined)?.created_at;
        if (m) out.push({ at: m, kind: 'message' });
        const r = rev.data?.[0] as
          { held_on?: string | null; completed_at?: string | null } | undefined;
        const rAt = r?.held_on ?? r?.completed_at ?? null;
        if (rAt) out.push({ at: rAt, kind: 'review' });
        setRemoteContact(out);
        setContactLoaded(true);
      })
      .catch(() => live && setContactLoaded(true));
    return () => {
      live = false;
    };
  }, [studentId]);

  return { employer, tutor, remoteContact, contactLoaded };
}

/** Newest contact across the remote reads and the rows the page already has. */
export function latestContact(events: ContactEvent[]): ContactEvent | null {
  let best: ContactEvent | null = null;
  for (const e of events) {
    const t = new Date(e.at).getTime();
    if (Number.isNaN(t) || t > Date.now() + 86_400_000) continue;
    if (!best || t > new Date(best.at).getTime()) best = e;
  }
  return best;
}
