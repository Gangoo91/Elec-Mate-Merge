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
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  LoadingBlocks,
  SecondaryButton,
} from '@/components/employer/editorial';

/** £/month per active seat — the Stripe price behind EMPLOYER_SEAT_PRICE_ID. */
export const SEAT_PRICE_GBP = 9.99;
const COMPED_DEFAULT_CAP = 5;

interface SeatRow {
  id: string;
  status: string;
  created_at: string;
  employee: { id: string; name: string | null; team_role: string | null } | null;
  /** ELE-1831: the same rule billing uses (public.employer_seat_is_paid). */
  paid: boolean;
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

      // Ask the server which seats are paid, so this screen and the bill can
      // never disagree (supervisor roles and college apprentices are free).
      const rows = (seatsRes.data ?? []) as unknown as Omit<SeatRow, 'paid'>[];
      const flags = await Promise.all(
        rows.map(async (r) => {
          if (!r.employee?.id) return true;
          // Cast: this RPC postdates the last types.ts regeneration.
          const { data: paid } = await supabase.rpc(
            'employer_seat_is_paid' as never,
            { p_employee_id: r.employee.id } as never
          );
          return paid !== false;
        })
      );

      return {
        seats: rows.map((r, i) => ({ ...r, paid: flags[i] })),
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
  const paidActive = active.filter((s) => s.paid);
  const monthly = paidActive.length * SEAT_PRICE_GBP;

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
      ? `Engineers and subcontractors who have joined are ${gbp(SEAT_PRICE_GBP)} a month each, added to your Employer plan and prorated. Supervisors, QS and project managers are free, and so are apprentices while they're linked to a college. Invites cost nothing until the person joins. Archive someone and their seat comes off the next bill.`
      : data.comped
        ? `Seats are free on your account${data.cap != null ? `, up to ${data.cap} team members` : ''}. Invites count towards that until they are accepted or removed.`
        : `Seats are billed at ${gbp(SEAT_PRICE_GBP)} a month each on an Employer plan. Your account is not on one, so nothing is being charged for seats.`;

  return (
    <ListCard>
      <ListCardHeader
        tone="emerald"
        title="Team seats"
        meta={<Pill tone="emerald">{active.length}</Pill>}
      />

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
              <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-white">
                Joined
              </div>
              <div className="mt-1 text-[22px] font-semibold text-white tabular-nums">
                {active.length}
                {data?.cap != null && (
                  <span className="text-[13px] font-medium text-white"> of {data.cap}</span>
                )}
              </div>
            </div>
            <div className="px-4 sm:px-6 py-4">
              <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-white">
                Invited
              </div>
              <div className="mt-1 text-[22px] font-semibold text-white tabular-nums">
                {pending.length}
              </div>
            </div>
            <div className="px-4 sm:px-6 py-4">
              <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-white">
                Monthly
              </div>
              <div className="mt-1 text-[17px] sm:text-[22px] font-semibold text-elec-yellow tabular-nums leading-[1.6]">
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
                      isActive
                        ? s.employee?.team_role || 'Team member'
                        : 'Invited, not joined yet'
                    }
                    trailing={
                      <Pill tone={isActive ? 'emerald' : 'amber'}>
                        {isActive
                          ? !s.paid
                            ? 'Free seat'
                            : data?.billable
                              ? 'Paid seat'
                              : 'Seat'
                          : 'Invited'}
                      </Pill>
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
    </ListCard>
  );
}
