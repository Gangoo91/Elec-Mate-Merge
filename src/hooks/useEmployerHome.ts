import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { getActingEmployerId } from '@/lib/actingEmployer';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';

/**
 * The Employer Hub Overview in one round trip (get_employer_home). Firm =
 * the acting employer, so a co-admin sees the owner's firm, not their own
 * empty account. Every money figure is null unless the caller may see the
 * firm's money (owner / admin); office managers get `money: null`.
 */

export interface HomePerson {
  employee_id: string;
  name: string;
  initials: string | null;
  photo_url: string | null;
  state: 'clocked_in' | 'booked' | 'leave';
  job_id: string | null;
  job_title: string | null;
  location: string | null;
  postcode: string | null;
  start_time: string | null;
  clocked_in_at: string | null;
  leave_type: string | null;
  leave_half_day: string | null;
  leave_until: string | null;
}

export interface HomeJobRef {
  id: string;
  title: string;
  client?: string | null;
  location?: string | null;
  start_date?: string | null;
  crew?: number;
}

export interface EmployerHome {
  firm: { id: string; name: string | null; role: string | null; money_visible: boolean };
  today: string;
  team: {
    active: number;
    joined: number;
    not_joined: number;
    to_chase: { id: string; name: string; last_chased_at: string | null; added_at: string }[];
  };
  people_today: HomePerson[];
  jobs: {
    live: number;
    today: number;
    week: number;
    unstaffed_today: number;
    unstaffed_today_first: HomeJobRef | null;
    unstaffed_week: number;
    unstaffed_week_list: HomeJobRef[];
    starting_week: HomeJobRef[];
    starting_week_count: number;
    diary_unsent: number;
  };
  approvals: {
    timesheets: number;
    timesheets_people: number;
    timesheets_oldest: string | null;
    timesheets_open_old: number;
    leave: number;
    leave_first: { id: string; name: string; type: string | null; start_date: string; days: number | null } | null;
    expenses: number;
    expenses_total: number | null;
    qs: number;
    otj: number;
  };
  safety: {
    incidents_open: number;
    incidents_unseen: number;
    incident_first: { id: string; title: string } | null;
    riddor_due: number;
    riddor_next: { id: string; title: string; due: string | null } | null;
    actions_open: number;
    actions_overdue: number;
    packs_unsigned: number;
    signatures_waiting: number;
    pack_first: { id: string; title: string; waiting: number } | null;
    /** ELE-1984: vehicles with a driver-reported problem not yet fixed. */
    vehicle_defects?: number;
    vehicle_defect_first?: { id: string; registration: string | null; off_road: boolean; reported: string } | null;
    rams_pending: number;
  };
  expiring: {
    credentials: number;
    credentials_expired: number;
    credential_items: { employee_id: string; name: string; qualification: string; expiry_date: string }[];
    vehicles: number;
    vehicle_first: { id?: string; registration: string | null; label: string; expiry: string } | null;
    firm_docs: { label: string; expiry: string }[];
  };
  leave_coming: { name: string; type: string | null; start_date: string; end_date: string; days: number | null }[];
  money: {
    outstanding: number;
    outstanding_count: number;
    overdue: number;
    overdue_count: number;
    paid_month: number;
    paid_month_count: number;
    invoiced_month: number;
    invoiced_month_count: number;
    quotes_waiting: number;
    quotes_waiting_value: number;
    costs_month: number;
    gross_profit_month: number;
    margin_pct: number | null;
    drafts: number;
  } | null;
  grow: {
    slug: string | null;
    quote_page_leads_week: number;
    quote_page_leads_total: number;
    new_leads: number;
  };
  setup: {
    company: boolean;
    logo: boolean;
    team: boolean;
    job: boolean;
    crew_booked: boolean;
    card_payments: boolean;
    quote_page_live: boolean;
    quote_page_lead: boolean;
  };
  /** Counts for the Overview's "Your hub" cards (optional: older payloads lack it). */
  hub?: {
    clients: number;
    docs: number;
  };
}

export const EMPLOYER_HOME_KEY = ['employer-home'] as const;

/** The acting firm for this user (the owner's id for a co-admin). */
export function useActingFirmId() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['acting-employer-id', user?.id],
    enabled: !!user,
    staleTime: 5 * 60_000,
    queryFn: async () => (await getActingEmployerId(user!.id)) ?? user!.id,
  });
}

export function useEmployerHome() {
  const { data: firmId } = useActingFirmId();

  // Anything that changes a number on the page refetches it. RLS decides
  // which rows stream in; the RPC re-checks scope on every call.
  useRealtimeInvalidate(
    'employer-home',
    [
      { table: 'employer_timesheets' },
      { table: 'employer_leave_requests' },
      { table: 'employer_expense_claims' },
      { table: 'employer_job_assignments' },
      { table: 'employer_jobs' },
      { table: 'employer_employees' },
      { table: 'employer_incidents' },
      // ELE-2031: incidents are Site Safety near misses and accidents now.
      { table: 'near_miss_reports' },
      { table: 'accident_records' },
      { table: 'employer_job_pack_acknowledgements' },
      { table: 'report_qs_reviews' },
      { table: 'employer_leads' },
      { table: 'quotes' },
    ],
    [[...EMPLOYER_HOME_KEY]],
    !!firmId
  );

  return useQuery({
    queryKey: [...EMPLOYER_HOME_KEY, firmId],
    enabled: !!firmId,
    // Coming back to the Overview after approving something must show it
    // done, so always refetch on mount and on focus.
    staleTime: 10_000,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    refetchInterval: 60_000,
    queryFn: async (): Promise<EmployerHome> => {
      // Cast: this RPC postdates the last types.ts regeneration.
      const { data, error } = await supabase.rpc('get_employer_home' as never, {
        p_firm: firmId,
      } as never);
      if (error) throw new Error(error.message);
      return data as unknown as EmployerHome;
    },
  });
}
