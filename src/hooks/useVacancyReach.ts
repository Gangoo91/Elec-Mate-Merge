import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { getActingEmployerId } from '@/lib/actingEmployer';

/* ==========================================================================
   useVacancyReach — ELE-1957. A vacancy reaches the talent pool.

   vacancy_talent_matches(vacancy) returns the opted-in pool members who fit
   the role (Elec-ID "Let firms find me" only — nobody who has not opted in
   is ever returned), ranked by distance, verification and skills. Names come
   back as "Jane S."; no phone or email. Miles are worked out on the server
   from the vacancy postcode (or town) and the member's base district; where
   either is missing, "near" falls back to the area name.

   invite_vacancy_matches(vacancy, ids, message) invites the chosen people and
   pushes them server-side. The server re-checks the opt-in for every id.
   ========================================================================== */

// Cast: these RPCs postdate the last types.ts regeneration.
const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<{ data: any; error: { message?: string } | null }>;

export interface VacancyMatch {
  profile_id: string;
  name: string;
  job_title: string | null;
  area: string | null;
  ecs_card_type: string | null;
  verification_tier: string;
  is_verified: boolean;
  rate_type: string | null;
  rate_amount: number | null;
  near: boolean;
  /** How `near` was decided: real distance, the area name, or neither. */
  near_basis?: 'distance' | 'town' | 'none';
  /** Miles from the job to their base district (null when either has no location). */
  miles: number | null;
  travel_radius_miles: number | null;
  /** False when the job is further than they said they will travel. */
  will_travel: boolean | null;
  skill_hits: number;
  invited: boolean;
  applied: boolean;
}

export interface VacancyMatches {
  error?: 'not_found' | 'not_employer' | 'not_authenticated';
  pool_size: number;
  match_count: number;
  near_count: number;
  /** Members whose base is within radius_miles of the job. */
  within_count: number;
  /** Members we could measure a distance to. */
  located_count: number;
  invited_count: number;
  has_location: boolean;
  /** The vacancy resolved to a point (postcode or known town). */
  vacancy_located: boolean;
  vacancy_place: string | null;
  radius_miles: number;
  vacancy_status?: string;
  role?: 'apprentice' | 'labourer' | 'electrician';
  matches: VacancyMatch[];
}

export const vacancyMatchesKey = (id?: string | null) => ['vacancy-talent-matches', id];

export function useVacancyMatches(vacancyId?: string | null) {
  return useQuery({
    queryKey: vacancyMatchesKey(vacancyId),
    enabled: !!vacancyId,
    staleTime: 30_000,
    queryFn: async (): Promise<VacancyMatches> => {
      const { data, error } = await rpc('vacancy_talent_matches', { p_vacancy_id: vacancyId });
      if (error) throw new Error(error.message || 'Could not load matches');
      const d = (data ?? {}) as Partial<VacancyMatches>;
      return {
        error: d.error,
        pool_size: Number(d.pool_size) || 0,
        match_count: Number(d.match_count) || 0,
        near_count: Number(d.near_count) || 0,
        within_count: Number(d.within_count) || 0,
        located_count: Number(d.located_count) || 0,
        invited_count: Number(d.invited_count) || 0,
        has_location: !!d.has_location,
        vacancy_located: !!d.vacancy_located,
        vacancy_place: d.vacancy_place ?? null,
        radius_miles: Number(d.radius_miles) || 20,
        vacancy_status: d.vacancy_status,
        role: d.role,
        matches: Array.isArray(d.matches)
          ? d.matches.map((m) => ({
              ...m,
              miles: m.miles == null ? null : Number(m.miles),
              travel_radius_miles:
                m.travel_radius_miles == null ? null : Number(m.travel_radius_miles),
              will_travel: m.will_travel ?? null,
            }))
          : [],
      };
    },
  });
}

export interface InviteResult {
  invited: number;
  pushed: number;
  skipped: number;
}

const INVITE_ERRORS: Record<string, string> = {
  not_found: 'That vacancy was not found for your firm.',
  not_open: 'Publish the vacancy first. Only live vacancies can take invites.',
  not_employer: 'The talent pool is part of the Employer plan.',
  too_many: 'Invite up to 250 people at a time.',
  message_too_long: 'Keep the message under 1,000 characters.',
};

export function useInviteMatches() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      vacancyId,
      profileIds,
      message,
    }: {
      vacancyId: string;
      profileIds: string[];
      message?: string;
    }): Promise<InviteResult> => {
      const { data, error } = await rpc('invite_vacancy_matches', {
        p_vacancy_id: vacancyId,
        p_profile_ids: profileIds,
        p_message: message?.trim() || null,
      });
      if (error) throw new Error(error.message || 'Could not send the invites');
      if (data?.error) throw new Error(INVITE_ERRORS[data.error] ?? 'Could not send the invites');
      return {
        invited: Number(data?.invited) || 0,
        pushed: Number(data?.pushed) || 0,
        skipped: Number(data?.skipped) || 0,
      };
    },
    onSuccess: (_r, vars) => {
      queryClient.invalidateQueries({ queryKey: vacancyMatchesKey(vars.vacancyId) });
      queryClient.invalidateQueries({ queryKey: ['vacancy-invitation-counts'] });
      queryClient.invalidateQueries({ queryKey: ['my-vacancy-invitations'] });
    },
  });
}

/** Invitations per vacancy for the firm: sent and how many turned into applications. */
export interface InvitationCounts {
  total: number;
  applied: number;
  byVacancy: Record<string, { sent: number; applied: number }>;
}

export function useVacancyInvitationCounts() {
  return useQuery({
    queryKey: ['vacancy-invitation-counts'],
    staleTime: 30_000,
    queryFn: async (): Promise<InvitationCounts> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return { total: 0, applied: 0, byVacancy: {} };
      const firm = (await getActingEmployerId(user.id)) ?? user.id;
      const { data: vacs } = await supabase
        .from('employer_vacancies')
        .select('id')
        .eq('employer_id', firm);
      const ids = (vacs ?? []).map((v) => v.id);
      if (ids.length === 0) return { total: 0, applied: 0, byVacancy: {} };
      const { data, error } = await supabase
        .from('employer_vacancy_invitations')
        .select('vacancy_id, status')
        .in('vacancy_id', ids);
      if (error) throw error;
      const byVacancy: InvitationCounts['byVacancy'] = {};
      let applied = 0;
      for (const row of data ?? []) {
        const b = (byVacancy[row.vacancy_id] ??= { sent: 0, applied: 0 });
        b.sent += 1;
        if (row.status === 'applied') {
          b.applied += 1;
          applied += 1;
        }
      }
      return { total: (data ?? []).length, applied, byVacancy };
    },
  });
}
