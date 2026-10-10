/**
 * Week one for a signed college (ELE-1921), days 1 to 5.
 *
 * The same plan as the written playbook ("Week one with Elec-Mate", in the
 * college sales kit): who does what each day. Every step ticks itself off
 * from the college's own records except day 5, which a person ticks.
 *
 *   Day 1  College set up, staff invited, roles and safeguarding lead set
 *   Day 2  Courses and cohorts, learners on the roll, join links out
 *   Day 3  First registers taken, lessons scheduled, learners signed in
 *   Day 4  First hours and evidence from learners, first decisions
 *   Day 5  The month in numbers reviewed with the head of department
 */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { CollegeSetupStatus } from '@/lib/collegeSetup';
import { providerWords } from '@/lib/collegeProviderType';

export interface WeekOneStatus {
  college_id: string;
  provider_type: string | null;
  employers: number;
  lessons_scheduled: number;
  hours_logged: number;
  evidence_submitted: number;
  decisions: number;
  value_reviewed_at: string | null;
}

export interface WeekOneStep {
  key: string;
  title: string;
  done: boolean;
  /** Where the step is done. */
  to: string;
}

export interface WeekOneDay {
  day: 1 | 2 | 3 | 4 | 5;
  title: string;
  who: string;
  steps: WeekOneStep[];
}

export const WEEK_ONE_KEY = ['college-week-one'] as const;

export function useWeekOneStatus(enabled = true) {
  return useQuery({
    queryKey: WEEK_ONE_KEY,
    enabled,
    staleTime: 30_000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc(
        'get_college_week_one_status' as never,
        { p_college: null } as never
      );
      if (error) throw error;
      return (data ?? null) as WeekOneStatus | null;
    },
  });
}

export function useRefreshWeekOne() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: WEEK_ONE_KEY });
}

export async function markValueReviewed(collegeId: string, done = true) {
  const { error } = await supabase.rpc(
    'mark_college_week_one' as never,
    { p_college: collegeId, p_key: 'value_reviewed_at', p_done: done } as never
  );
  if (error) throw new Error(error.message);
}

export function weekOneDays(
  s: CollegeSetupStatus,
  w: WeekOneStatus | null | undefined
): WeekOneDay[] {
  const words = providerWords(w?.provider_type);
  const day2: WeekOneStep[] = [
    { key: 'courses', title: 'Add your courses', done: s.courses > 0, to: '/college/setup' },
    { key: 'cohorts', title: 'Create your cohorts', done: s.cohorts > 0, to: '/college/setup' },
    {
      key: 'learners',
      title: 'Put learners on the roll',
      done: s.learners > 0,
      to: '/college/setup',
    },
    { key: 'join', title: 'Send the join links', done: s.join_codes > 0, to: '/college/setup' },
  ];
  if (words.type === 'itp') {
    day2.push({
      key: 'employers',
      title: 'Add the employers you work with',
      done: (w?.employers ?? 0) > 0,
      to: '/college?section=employerportal',
    });
  }
  return [
    {
      day: 1,
      title: `Set up ${words.yours}`,
      who: `${words.Noun} lead`,
      steps: [
        {
          key: 'details',
          title: `${words.Noun} details`,
          done: s.details_done,
          to: '/college/setup',
        },
        { key: 'staff', title: 'Invite your staff', done: s.staff > 1, to: '/college/setup' },
        {
          key: 'safeguarding',
          title: 'Name your safeguarding lead',
          done: Boolean(s.dsl_linked),
          to: '/college/setup',
        },
      ],
    },
    { day: 2, title: 'Courses and learners', who: 'Curriculum lead', steps: day2 },
    {
      day: 3,
      title: 'First sessions',
      who: 'Tutors',
      steps: [
        {
          key: 'register',
          title: words.usesTimetable
            ? 'Take the first register'
            : 'Record the first training session',
          done: s.registers > 0,
          to: '/college/setup',
        },
        {
          key: 'lessons',
          title: words.usesTimetable ? 'Schedule this week’s lessons' : 'Plan the first sessions',
          done: (w?.lessons_scheduled ?? 0) > 0,
          to: '/college?section=lessonplans',
        },
        {
          key: 'joined',
          title: 'First learner signs in',
          done: s.learners_linked > 0,
          to: '/college/setup',
        },
      ],
    },
    {
      day: 4,
      title: 'Work comes in',
      who: 'Learners and tutors',
      steps: [
        {
          key: 'hours',
          title: 'First off-the-job hours logged',
          done: (w?.hours_logged ?? 0) > 0,
          to: '/college/otj',
        },
        {
          key: 'evidence',
          title: 'First evidence submitted',
          done: (w?.evidence_submitted ?? 0) > 0,
          to: '/college/inbox',
        },
        {
          key: 'decision',
          title: 'First assessment decision',
          done: (w?.decisions ?? 0) > 0,
          to: '/college?section=portfolio',
        },
      ],
    },
    {
      day: 5,
      title: 'Review the week',
      who: 'Head of department',
      steps: [
        {
          key: 'value',
          title: 'Go through the month in numbers',
          done: Boolean(w?.value_reviewed_at),
          to: '/college/value',
        },
      ],
    },
  ];
}
