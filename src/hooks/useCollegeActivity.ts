import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * What the college scheme is doing, from Stripe and our own accounts:
 * every college promotion code with its redemptions, every subscription that
 * used one (trialing, paying, cancelled), and every tutor account made on
 * Bulk create with its last sign-in. See admin-college-activity.
 */
export interface CollegeCodeRow {
  id: string;
  code: string;
  couponId: string;
  redeemed: number;
  active: boolean;
  created: string;
}

export interface CollegeSubRow {
  code: string;
  status: string;
  tier: string;
  listAmount: number;
  amountMonthly: number;
  started: string;
  cancelAtPeriodEnd: boolean;
  periodEnd: string | null;
  endedAt: string | null;
  customerId: string;
  email: string | null;
  name: string | null;
}

export interface CollegeTutorRow {
  id: string;
  email: string | null;
  name: string | null;
  org: string;
  reason: string | null;
  freeAccess: boolean;
  onboarded: boolean;
  createdAt: string;
  lastSignIn: string | null;
}

/** One row of the outreach tracker's Colleges & training tab. */
export interface CollegeOutreachRow {
  no: number;
  org: string;
  orgKey: string;
  contact: string | null;
  email: string | null;
  type: string | null;
  firstEmailed: string | null;
  /** Needs me · Hot · Meeting booked · Waiting on them · No reply yet · Bounced · Declined / closed */
  stage: string;
  where: string | null;
  why: string | null;
  nextStep: string | null;
  followUp: string | null;
  done: boolean;
  gmailUrl: string | null;
  code: string | null;
  syncedAt: string;
}

export interface CollegeActivity {
  generatedAt: string;
  scheme?: SchemeKind;
  codes: CollegeCodeRow[];
  subs: CollegeSubRow[];
  tutors: CollegeTutorRow[];
  outreach: CollegeOutreachRow[];
}

export type SchemeKind = 'college' | 'employer';
export const COLLEGE_ACTIVITY_QUERY_KEY = ['admin-college-activity'];
export const activityQueryKey = (scheme: SchemeKind) => [...COLLEGE_ACTIVITY_QUERY_KEY, scheme];

export function useCollegeActivity(scheme: SchemeKind = 'college') {
  return useQuery<CollegeActivity>({
    queryKey: activityQueryKey(scheme),
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('admin-college-activity', {
        body: { scheme },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.message || data.error);
      return data as CollegeActivity;
    },
  });
}
