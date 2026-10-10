/**
 * Team seats — ELE-1986. Owner only.
 *
 * Who on the team holds a seat, who is invited but has not joined, and what
 * that costs a month. Read straight from employer_seats: whether a role takes
 * a seat at all is decided where seats are written (ELE-1831), not here.
 *
 * Billing rule mirrors manage-employer-seats: an ACTIVE seat is billed at
 * £9.99/month on the employer subscription when the account is a paying
 * employer (subscription_tier employer*, not comped). Pending invites cost
 * nothing until the person joins. Comped accounts pay nothing for seats and
 * are capped (employer_seat_cap, default 5 — tg_employer_seat_cap).
 */
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useEmployerCoAdmin } from '@/hooks/useEmployerCoAdmin';
import {
  ListBody,
  ListRow,
  Avatar,
  LoadingBlocks,
  SecondaryButton,
} from '@/components/employer/editorial';
import { PanelHead, StatusPill, panelShellClass } from '@/components/employer/pageParts/PageParts';

/** £/month per active seat — the Stripe price behind EMPLOYER_SEAT_PRICE_ID. */
export const SEAT_PRICE_GBP = 9.99;
/** £/month per apprentice seat — EMPLOYER_APPRENTICE_SEAT_PRICE_ID (Andrew 7 Oct). */
export const APPRENTICE_SEAT_PRICE_GBP = 4.99;
const COMPED_DEFAULT_CAP = 5;

interface SeatRow {
  id: string;
  status: string;
  created_at: string;
  employee: { id: string; name: string | null; team_role: string | null } | null;
  /** The same rule billing uses (public.employer_seat_kind): every seat is paid. */
  kind: 'standard' | 'apprentice';
}

interface SeatOverview {
  seats: SeatRow[];
  billable: boolean;
  comped: boolean;
  onEmployerPlan: boolean;
  cap: number | null;
}

const gbp = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n);

const initials = (name: string) =>
  name
    .replace(/\(.*?\)/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('') || '?';

export function SeatsCard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: isCoAdmin } = useEmployerCoAdmin(user?.id);

  const { data, isLoading, error } = useQuery({
    queryKey: ['employer-seat-overview', user?.id],
    enabled: !!user && isCoAdmin === false,
    staleTime: 60 * 1000,
    queryFn: async (): Promise<SeatOverview> => {
      const [seatsRes, profileRes] = await Promise.all([
        supabase
          .from('employer_seats')
          .select('id, status, created_at, employee:employer_employees(id, name, team_role)')
          .eq('employer_id', user!.id)
          .in('status', ['active', 'pending'])
          .order('created_at', { ascending: true }),
        supabase
          .from('profiles')
          .select('subscription_tier, free_access_granted, employer_seat_cap')
          .eq('id', user!.id)
          .maybeSingle(),
      ]);
      if (seatsRes.error) throw seatsRes.error;
      if (profileRes.error) throw profileRes.error;

      const p = profileRes.data as {
        subscription_tier?: string | null;
        free_access_granted?: boolean | null;
        employer_seat_cap?: number | null;
      } | null;
      const onEmployerPlan = (p?.subscription_tier ?? '').toLowerCase().startsWith('employer');
      const comped = p?.free_access_granted === true;
      const cap = p?.employer_seat_cap ?? (comped && !onEmployerPlan ? COMPED_DEFAULT_CAP : null);

      // Ask the server which price each seat is on, so this screen and the
      // bill can never disagree (apprentices £4.99, everyone else £9.99).
      const rows = (seatsRes.data ?? []) as unknown as Omit<SeatRow, 'kind'>[];
      const kinds = await Promise.all(
        rows.map(async (r): Promise<SeatRow['kind']> => {
          if (!r.employee?.id) return 'standard';
          // Cast: this RPC postdates the last types.ts regeneration.
          const { data: kind } = await supabase.rpc(
            'employer_seat_kind' as never,
            { p_employee_id: r.employee.id } as never
          );
          return kind === 'apprentice' ? 'apprentice' : 'standard';
        })
      );

      return {
        seats: rows.map((r, i) => ({ ...r, kind: kinds[i] })),
        billable: onEmployerPlan && !comped,
        comped,
        onEmployerPlan,
        cap,
      };
    },
  });

  // Seats and billing belong to the account owner.
  if (isCoAdmin !== false) return null;

  const seats = data?.seats ?? [];
  const active = seats.filter((s) => s.status === 'active');
  const pending = seats.filter((s) => s.status === 'pending');
  const apprenticeActive = active.filter((s) => s.kind === 'apprentice');
  const standardActive = active.filter((s) => s.kind === 'standard');
  const monthly =
    standardActive.length * SEAT_PRICE_GBP + apprenticeActive.length * APPRENTICE_SEAT_PRICE_GBP;

  const costLine = !data
    ? ''
    : data.billable
      ? gbp(monthly)
      : data.comped
        ? 'No charge'
        : 'Per your plan';

  const explainer = !data
    ? ''
    : data.billable
      ? `Everyone who joins your team is a seat on your Employer plan: ${gbp(SEAT_PRICE_GBP)} a month each, apprentices ${gbp(APPRENTICE_SEAT_PRICE_GBP)}, prorated. Invites cost nothing until the person joins. Archive someone and their seat comes off the next bill.`
      : data.comped
        ? `Seats are free on your account${data.cap != null ? `, up to ${data.cap} team members` : ''}. Invites count towards that until they are accepted or removed.`
        : `Seats are billed at ${gbp(SEAT_PRICE_GBP)} a month each on an Employer plan. Your account is not on one, so nothing is being charged for seats.`;

  return (
    <div className={panelShellClass}>
      <PanelHead title="Team seats" meta={<StatusPill tone="green">{active.length}</StatusPill>} />

      {isLoading ? (
        <div className="px-5 sm:px-6 py-4">
          <LoadingBlocks />
        </div>
      ) : error ? (
        <div className="px-5 sm:px-6 py-4">
          <p className="text-[13px] text-white leading-relaxed">
            Seats could not be loaded. Pull to refresh or try again shortly.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 divide-x divide-white/[0.06] border-b border-white/[0.06]">
            <div className="px-4 sm:px-6 py-4">
              <div className="text-[12px] font-semibold text-white">Joined</div>
              <div className="mt-1 text-[22px] font-semibold text-white tabular-nums">
                {active.length}
                {data?.cap != null && (
                  <span className="text-[13px] font-medium text-white"> of {data.cap}</span>
                )}
              </div>
            </div>
            <div className="px-4 sm:px-6 py-4">
              <div className="text-[12px] font-semibold text-white">Invited</div>
              <div className="mt-1 text-[22px] font-semibold text-white tabular-nums">
                {pending.length}
              </div>
            </div>
            <div className="px-4 sm:px-6 py-4">
              <div className="text-[12px] font-semibold text-white">Monthly</div>
              <div className="mt-1 text-[17px] sm:text-[22px] font-semibold text-white tabular-nums leading-[1.6]">
                {costLine}
              </div>
            </div>
          </div>

          <div className="px-5 sm:px-6 py-3.5">
            <p className="text-[13px] text-white leading-relaxed">{explainer}</p>
          </div>

          {seats.length > 0 && (
            <ListBody>
              {seats.map((s) => {
                const name = s.employee?.name?.trim() || 'Team member';
                const isActive = s.status === 'active';
                return (
                  <ListRow
                    key={s.id}
                    lead={<Avatar initials={initials(name)} />}
                    title={name}
                    subtitle={
                      isActive ? s.employee?.team_role || 'Team member' : 'Invited, not joined yet'
                    }
                    trailing={
                      <StatusPill tone={isActive ? 'green' : 'neutral'}>
                        {isActive
                          ? data?.billable
                            ? s.kind === 'apprentice'
                              ? `Apprentice · ${gbp(APPRENTICE_SEAT_PRICE_GBP)}`
                              : gbp(SEAT_PRICE_GBP)
                            : 'Seat'
                          : 'Invited'}
                      </StatusPill>
                    }
                    onClick={
                      s.employee?.id
                        ? () => navigate(`/employer?section=team&member=${s.employee!.id}`)
                        : undefined
                    }
                  />
                );
              })}
            </ListBody>
          )}

          {seats.length === 0 && (
            <div className="px-5 sm:px-6 pb-4">
              <p className="text-[13px] text-white leading-relaxed">
                Nobody holds a seat yet. Add people from Team and they take a seat when they join.
              </p>
            </div>
          )}

          <div className="px-5 sm:px-6 py-4 border-t border-white/[0.06]">
            <SecondaryButton fullWidth onClick={() => navigate('/settings?tab=billing')}>
              Manage subscription
            </SecondaryButton>
          </div>
        </>
      )}
    </div>
  );
}
