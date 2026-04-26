import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useCollegeDailyDigest — counts the things that have changed since the
   tutor last opened the dashboard. Drives the "what's new today" card.

   Rules of thumb:
     • portfolio_submissions awaiting review     → status in (submitted/in_review/under_review/resubmitted)
     • EPA verdicts ready to co-sign             → AI judgement is_current AND no tutor judgement is_current
     • attendance dips this week                 → learner has ≥2 absent in last 7 days
     • new pastoral flags in last 24h            → kind in (flag, concern, safeguarding) created_at >= 24h ago
   ========================================================================== */

const STORAGE_KEY = 'college_daily_digest_last_seen';

export interface DailyDigest {
  loading: boolean;
  collegeId: string | null;
  awaitingReview: number;
  awaitingCoSign: number;
  attendanceDips: number;
  newFlags: number;
  total: number;
  lastSeenAt: string | null;
  markSeen: () => void;
}

export function useCollegeDailyDigest(): DailyDigest {
  const [collegeId, setCollegeId] = useState<string | null>(null);
  const [counts, setCounts] = useState({
    awaitingReview: 0,
    awaitingCoSign: 0,
    attendanceDips: 0,
    newFlags: 0,
  });
  const [loading, setLoading] = useState(true);
  const [lastSeenAt, setLastSeenAt] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        if (!cancelled) setLoading(false);
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', user.id)
        .maybeSingle();
      const cid = ((profile as { college_id?: string | null } | null)?.college_id) ?? null;
      if (cancelled) return;
      setCollegeId(cid);
      if (!cid) {
        setLoading(false);
        return;
      }

      // Pull active learners in the college first (so we can scope counts)
      const { data: students } = await supabase
        .from('college_students')
        .select('id, user_id')
        .eq('college_id', cid)
        .neq('status', 'withdrawn')
        .neq('status', 'completed');
      const studentIds = ((students ?? []) as Array<{ id: string }>).map((s) => s.id);
      const userIds = ((students ?? []) as Array<{ user_id: string | null }>)
        .map((s) => s.user_id)
        .filter(Boolean) as string[];

      if (studentIds.length === 0) {
        if (!cancelled) {
          setLoading(false);
        }
        return;
      }

      const ONE_DAY_MS = 86_400_000;
      const since24h = new Date(Date.now() - ONE_DAY_MS).toISOString();
      const since7d = new Date(Date.now() - 7 * ONE_DAY_MS).toISOString().slice(0, 10);

      const [subsRes, judRes, attRes, notesRes] = await Promise.all([
        userIds.length > 0
          ? supabase
              .from('portfolio_submissions')
              .select('id', { count: 'exact', head: true })
              .in('user_id', userIds)
              .in('status', ['submitted', 'in_review', 'under_review', 'resubmitted'])
          : Promise.resolve({ count: 0 } as { count: number | null }),
        supabase
          .from('college_epa_judgements')
          .select('college_student_id, source, is_current')
          .in('college_student_id', studentIds)
          .eq('is_current', true),
        supabase
          .from('college_attendance')
          .select('student_id, status')
          .in('student_id', studentIds)
          .gte('date', since7d),
        supabase
          .from('pastoral_notes')
          .select('id', { count: 'exact', head: true })
          .in('student_id', studentIds)
          .in('kind', ['flag', 'concern', 'safeguarding'])
          .gte('created_at', since24h),
      ]);

      if (cancelled) return;

      // Awaiting co-sign: students with current AI but no current tutor verdict
      const judgements = ((judRes.data ?? []) as Array<{
        college_student_id: string;
        source: string;
        is_current: boolean;
      }>);
      const aiByStudent = new Set<string>();
      const tutorByStudent = new Set<string>();
      for (const j of judgements) {
        if (j.source === 'ai') aiByStudent.add(j.college_student_id);
        if (j.source === 'tutor') tutorByStudent.add(j.college_student_id);
      }
      let coSignCount = 0;
      for (const sid of aiByStudent) {
        if (!tutorByStudent.has(sid)) coSignCount += 1;
      }

      // Attendance dips: ≥2 absent this week per student
      const absencesByStudent = new Map<string, number>();
      for (const r of ((attRes.data ?? []) as Array<{ student_id: string; status: string }>)) {
        if ((r.status ?? '').toLowerCase() === 'absent') {
          absencesByStudent.set(r.student_id, (absencesByStudent.get(r.student_id) ?? 0) + 1);
        }
      }
      let dips = 0;
      for (const [, n] of absencesByStudent) {
        if (n >= 2) dips += 1;
      }

      setCounts({
        awaitingReview: subsRes.count ?? 0,
        awaitingCoSign: coSignCount,
        attendanceDips: dips,
        newFlags: notesRes.count ?? 0,
      });
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const markSeen = () => {
    const now = new Date().toISOString();
    try {
      localStorage.setItem(STORAGE_KEY, now);
    } catch {
      /* ignore */
    }
    setLastSeenAt(now);
  };

  const total =
    counts.awaitingReview + counts.awaitingCoSign + counts.attendanceDips + counts.newFlags;

  return {
    loading,
    collegeId,
    awaitingReview: counts.awaitingReview,
    awaitingCoSign: counts.awaitingCoSign,
    attendanceDips: counts.attendanceDips,
    newFlags: counts.newFlags,
    total,
    lastSeenAt,
    markSeen,
  };
}
