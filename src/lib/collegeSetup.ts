/* ==========================================================================
   collegeSetup — ELE-1855. A new college from nothing to a learner on the
   roll with no SQL: the RPCs behind /college/setup, the College Hub home
   checklist and Admin → Colleges → Hub colleges.

   Who may create a college (enforced in create_college):
     - a platform admin, from Admin → Colleges, or
     - the holder of a one-time set-up code Elec-Mate issued after a signed
       order, who becomes the college's first admin. One college per account.
   ========================================================================== */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CollegeSetupStatus {
  college_id: string;
  college_name: string;
  college_code: string;
  dismissed: boolean;
  details_done: boolean;
  courses: number;
  cohorts: number;
  join_codes: number;
  staff: number;
  staff_linked: number;
  learners: number;
  learners_linked: number;
  registers: number;
  can_manage: boolean;
  /** ELE-1911: a DSL or deputy is named (optional: older servers omit it). */
  dsl_named?: boolean;
  /** …and has a login, so an in-app concern reaches them. */
  dsl_linked?: boolean;
}

export type SetupStepKey =
  | 'details'
  | 'courses'
  | 'cohorts'
  | 'join'
  | 'staff'
  | 'safeguarding'
  | 'learners'
  | 'joined'
  | 'register';

export interface SetupStep {
  key: SetupStepKey;
  title: string;
  body: string;
  done: boolean;
  /** Only admins / heads of department can do it. */
  managerOnly?: boolean;
}

export function setupSteps(s: CollegeSetupStatus): SetupStep[] {
  return [
    {
      key: 'details',
      title: 'College details',
      body: 'Name, short code and awarding bodies.',
      done: s.details_done,
    },
    {
      key: 'courses',
      title: 'Add your courses',
      body: 'Pick qualifications from the catalogue. Each one brings its units and criteria.',
      done: s.courses > 0,
    },
    {
      key: 'cohorts',
      title: 'Create a cohort',
      body: 'A group of learners on one course, with dates and a lead tutor.',
      done: s.cohorts > 0,
    },
    {
      key: 'staff',
      title: 'Add your staff',
      body: 'Tutors, assessors and IQA get their own College Hub login.',
      done: s.staff > 1,
      managerOnly: true,
    },
    {
      key: 'safeguarding',
      title: 'Name your safeguarding lead',
      body:
        s.dsl_named && !s.dsl_linked
          ? 'Your safeguarding lead has no login yet, so concerns raised in the app cannot reach them. Link their account.'
          : 'Mark a member of staff as designated safeguarding lead (and a deputy). Concerns raised in the app go straight to them.',
      done: Boolean(s.dsl_linked),
      managerOnly: true,
    },
    {
      key: 'join',
      title: 'Share the join code',
      body: 'One code per cohort. Learners type it at sign-up or open the link.',
      done: s.join_codes > 0,
    },
    {
      key: 'learners',
      title: 'Put your learners on the roll',
      body: 'Paste your MIS list. Each learner gets a login and their join link by email.',
      done: s.learners > 0,
    },
    {
      key: 'joined',
      title: 'First learner joins',
      body: 'Done when a learner on your roll has a login linked to it: a new login you made, or an existing account that opened its join link.',
      done: s.learners_linked > 0,
    },
    {
      key: 'register',
      title: 'Take your first register',
      body: 'Attendance for a session. It also starts their off-the-job record.',
      done: s.registers > 0,
    },
  ];
}

export async function fetchSetupStatus(collegeId?: string | null): Promise<CollegeSetupStatus | null> {
  const { data, error } = await supabase.rpc('get_college_setup_status' as never, { p_college: collegeId ?? null } as never);
  if (error) throw error;
  return (data ?? null) as CollegeSetupStatus | null;
}

export const SETUP_STATUS_KEY = ['college-setup-status'] as const;

export function useCollegeSetupStatus(enabled = true) {
  return useQuery({
    queryKey: SETUP_STATUS_KEY,
    queryFn: () => fetchSetupStatus(null),
    enabled,
    staleTime: 30_000,
  });
}

export function useRefreshSetupStatus() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: SETUP_STATUS_KEY });
}

export async function dismissSetup(collegeId: string, dismissed = true) {
  const { error } = await supabase.rpc('dismiss_college_setup' as never, { p_college: collegeId, p_dismissed: dismissed } as never);
  if (error) throw error;
}

export interface SetupCodeCheck {
  valid: boolean;
  reason?: string;
  org_name?: string;
  expires_at?: string;
}

export async function checkSetupCode(code: string): Promise<SetupCodeCheck> {
  const { data, error } = await supabase.rpc('check_college_setup_code' as never, { p_code: code.trim().toUpperCase() } as never);
  if (error) return { valid: false, reason: error.message };
  return data as SetupCodeCheck;
}

export async function createCollege(input: {
  name: string;
  code: string;
  awardingBodies: string[];
  city?: string;
  setupCode?: string | null;
}): Promise<{ college_id: string; code: string; name: string }> {
  const { data, error } = await supabase.rpc('create_college' as never, {
    p_name: input.name,
    p_code: input.code,
    p_awarding_bodies: input.awardingBodies,
    p_city: input.city ?? null,
    p_setup_code: input.setupCode ?? null,
  } as never);
  if (error) throw new Error(error.message);
  return data as { college_id: string; code: string; name: string };
}

export const AWARDING_BODIES = ['City & Guilds', 'EAL', 'NOCN', 'Pearson', 'LCL Awards', 'Skills for Wales'];

/** "Kendal College" → "KENDAL"; a sensible first guess the person can change. */
export function suggestCollegeCode(name: string): string {
  const words = name
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !['COLLEGE', 'THE', 'OF', 'AND', 'GROUP', 'LTD', 'LIMITED', 'TRAINING'].includes(w));
  if (words.length === 0) return '';
  if (words.length === 1) return words[0].slice(0, 12);
  return words.map((w) => w[0]).join('').slice(0, 12);
}

export const SETUP_CODE_KEY = 'pendingCollegeSetupCode';
