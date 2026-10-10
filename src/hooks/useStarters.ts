/**
 * Hiring into onboarding without retyping (ELE-2091).
 *
 * The offer (pay, start date, role, job title) is recorded at "Make offer" and
 * carried into the roster at hire, with the probation dates (from the firm's
 * HR settings) and the pay profile (date of birth, apprentice start). The
 * starter checklist is worked out live by starter_checklist() from the records
 * that already exist: right to work, contract, probation, pay profile, the app
 * invite, policies, cards and the first job. Nothing is stored twice.
 *
 * Owner and admins only (can_see_firm_money): an offer carries pay. The RPCs
 * return nothing to anyone else.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useActingFirmId } from '@/hooks/useJobProfit';

const asRpc = (name: string) => name as never;

export type StarterItemKey =
  | 'terms'
  | 'rtw'
  | 'contract'
  | 'probation'
  | 'pay_profile'
  | 'app'
  | 'cards'
  | 'policies'
  | 'first_job';

export type StarterItemState = 'done' | 'waiting' | 'todo';

export interface StarterCardsSnapshot {
  ecs_card_type?: string | null;
  ecs_expiry_date?: string | null;
  ecs_verification_level?: string | null;
  job_title?: string | null;
  qualifications?: Array<{
    name: string;
    awarding_body: string | null;
    expiry_date: string | null;
    verified: boolean;
  }>;
}

export interface StarterItem {
  key: StarterItemKey;
  state: StarterItemState;
  // terms
  pay_set?: boolean;
  start_date?: string | null;
  // rtw
  status?: string | null;
  submitted?: boolean;
  // contract
  on_file?: boolean;
  countersigned?: boolean;
  // probation
  end_date?: string | null;
  // pay_profile
  rtw_dob?: string | null;
  apprentice?: boolean;
  apprentice_start?: string | null;
  // app
  has_email?: boolean;
  invite_status?: string | null;
  invite_sent_at?: string | null;
  // cards
  linked?: boolean;
  snapshot?: StarterCardsSnapshot;
  // policies
  signed?: number;
  total?: number;
  // first_job
  jobs?: number;
}

export interface Starter {
  roster_id: string;
  name: string;
  team_role: string | null;
  job_title: string | null;
  start_date: string | null;
  hired_at: string;
  vacancy_title: string | null;
  application_id: string | null;
  finished_at: string | null;
  items: StarterItem[];
  done: number;
  total: number;
}

export interface HireOffer {
  application_id: string;
  pay_type: 'hourly' | 'annual';
  hourly_rate: number | null;
  annual_salary: number | null;
  start_date: string | null;
  team_role: string | null;
  job_title: string | null;
}

export interface OfferInput {
  pay_type: 'hourly' | 'annual';
  hourly_rate: string;
  annual_salary: string;
  start_date: string;
  team_role: string;
  job_title: string;
}

export interface HireInput extends OfferInput {
  date_of_birth: string;
  apprentice_start_date: string;
}

export interface HireResult {
  ok: true;
  roster_employee_id: string;
  roster_created: boolean;
  hire_record_id: string | null;
  worker_user_id: string | null;
  worker_name: string;
  pay_carried: boolean;
  start_date: string | null;
  probation_end_date: string | null;
  pay_profile_created: boolean;
}

const STARTERS_KEY = ['starters'];

/** Open starters for the firm, or one person's checklist (open or finished). */
export function useStarters(rosterId?: string | null, enabled = true) {
  const { data: firm } = useActingFirmId();
  return useQuery({
    queryKey: [...STARTERS_KEY, firm, rosterId ?? 'open'],
    enabled: !!firm && enabled,
    staleTime: 30_000,
    queryFn: async (): Promise<Starter[]> => {
      const { data, error } = await supabase.rpc(asRpc('starter_checklist'), {
        p_firm: firm,
        p_roster_id: rosterId ?? null,
      } as never);
      if (error) throw error;
      return (data as unknown as Starter[]) ?? [];
    },
  });
}

export function useHireOffer(applicationId: string | null | undefined, enabled = true) {
  return useQuery({
    queryKey: ['hire-offer', applicationId],
    enabled: !!applicationId && enabled,
    queryFn: async (): Promise<HireOffer | null> => {
      const { data, error } = await supabase
        .from('employer_hire_offers' as never)
        .select(
          'application_id, pay_type, hourly_rate, annual_salary, start_date, team_role, job_title'
        )
        .eq('application_id', applicationId!)
        .maybeSingle();
      if (error) throw error;
      return (data as unknown as HireOffer | null) ?? null;
    },
  });
}

const ERROR_TEXT: Record<string, string> = {
  not_authorised: 'Only the owner or an admin can make offers and hire, because they carry pay.',
  not_authenticated: 'Sign in again and try once more.',
  application_not_found: 'That application has gone. Refresh and try again.',
  date_of_birth: 'Check the date of birth.',
  details_format: 'Check the dates and pay.',
  offer_format: 'Check the pay and start date.',
  offer_start_date: 'The start date must be within the next two years.',
  offer_pay_type: 'Choose hourly or salary.',
};

function readError(raw: string | undefined | null): string {
  const m = String(raw ?? '');
  const key = Object.keys(ERROR_TEXT).find((k) => m.includes(k));
  return key ? ERROR_TEXT[key] : 'Please try again.';
}

const offerBody = (o: OfferInput) => ({
  pay_type: o.pay_type,
  hourly_rate: o.pay_type === 'hourly' ? o.hourly_rate : '',
  annual_salary: o.pay_type === 'annual' ? o.annual_salary : '',
  start_date: o.start_date,
  team_role: o.team_role,
  job_title: o.job_title,
});

export function useSaveHireOffer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ applicationId, offer }: { applicationId: string; offer: OfferInput }) => {
      const { data, error } = await supabase.rpc(asRpc('save_hire_offer'), {
        p_application_id: applicationId,
        p_offer: offerBody(offer),
      } as never);
      const r = data as unknown as { ok?: boolean; error?: string } | null;
      if (error || r?.error) throw new Error(readError(error?.message ?? r?.error));
    },
    onSuccess: (_d, v) => qc.invalidateQueries({ queryKey: ['hire-offer', v.applicationId] }),
  });
}

export function useHireAndOnboard() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      applicationId,
      details,
    }: {
      applicationId: string;
      details: HireInput;
    }): Promise<HireResult> => {
      const { data, error } = await supabase.rpc(asRpc('hire_applicant_onboard'), {
        p_application_id: applicationId,
        p_details: {
          ...offerBody(details),
          date_of_birth: details.date_of_birth,
          apprentice_start_date: details.apprentice_start_date,
        },
      } as never);
      const r = data as unknown as (HireResult & { error?: string }) | null;
      if (error || r?.error || !r) throw new Error(readError(error?.message ?? r?.error));
      return r;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: STARTERS_KEY });
      qc.invalidateQueries({ queryKey: ['vacancy-applications'] });
      qc.invalidateQueries({ queryKey: ['employees'] });
      qc.invalidateQueries({ queryKey: ['employer-employees'] });
      qc.invalidateQueries({ queryKey: ['hr-people'] });
      qc.invalidateQueries({ queryKey: ['pay-profiles'] });
      qc.invalidateQueries({ queryKey: ['rtw-team-status'] });
    },
  });
}

export function useFinishStarter() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ rosterId, reopen = false }: { rosterId: string; reopen?: boolean }) => {
      const { data, error } = await supabase.rpc(asRpc('finish_starter'), {
        p_roster_id: rosterId,
        p_reopen: reopen,
      } as never);
      const r = data as unknown as { ok?: boolean; error?: string } | null;
      if (error || r?.error) throw new Error(readError(error?.message ?? r?.error));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: STARTERS_KEY }),
  });
}

/** Refresh every checklist after something it reads changes (invite, contract, RTW). */
export function invalidateStarters(qc: ReturnType<typeof useQueryClient>) {
  qc.invalidateQueries({ queryKey: STARTERS_KEY });
}
