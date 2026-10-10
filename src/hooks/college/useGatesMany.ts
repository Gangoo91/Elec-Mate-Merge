/**
 * useGatesMany — the real gateway gate for a list of learners, in one place.
 *
 * 8 Oct 2026. Every college figure about who is ready for gateway reads this:
 * get_gateway_readiness_many (100 learners a call, 500 at most), the same
 * lines the learner sees on their Readiness view and the tutor sees on the
 * Student 360 gateway card. The stage someone set on an EPA record
 * ("Gateway Ready") is what was typed; this is what the record shows.
 *
 * The criteria line carries its own figures (passed / total), worked out by
 * get_portfolio_ac_state on the server, so "4 of 340 criteria passed" here is
 * the same 4 and 340 as Student 360 and the learner's portfolio.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/** One line of get_gateway_readiness. */
export interface GateLine {
  key: string;
  label: string;
  state: string;
  sentence?: string;
  link?: string;
  figures?: Record<string, unknown>;
}

/** What a list screen needs of get_gateway_readiness for one learner. */
export interface GateResult {
  met?: number;
  total?: number;
  overall?: string;
  gateway_passed?: boolean;
  items?: GateLine[];
}

export type Gates = Record<string, GateResult>;

/** The gate for up to 500 learners, keyed on their auth user id. */
export async function fetchGatesMany(userIds: string[]): Promise<Gates> {
  const ids = Array.from(new Set(userIds.filter(Boolean))).slice(0, 500);
  if (!ids.length) return {};
  const parts = await Promise.all(
    Array.from({ length: Math.ceil(ids.length / 100) }, (_, i) =>
      supabase
        .rpc(
          'get_gateway_readiness_many' as never,
          { p_learners: ids.slice(i * 100, i * 100 + 100) } as never
        )
        .then(({ data, error }) => {
          if (error) throw new Error(error.message);
          return (data ?? {}) as Gates;
        })
    )
  );
  return Object.assign({}, ...parts) as Gates;
}

/** Same query key as the EPA admin page, so a refresh there refreshes here. */
export function useGatesMany(userIds: string[]) {
  const key = [...userIds].sort().join(',');
  return useQuery({
    queryKey: ['college-epa', 'gates', key],
    enabled: userIds.length > 0,
    staleTime: 60_000,
    queryFn: () => fetchGatesMany(userIds),
  });
}

export interface GateSummary {
  met: number;
  total: number;
  /** Every line green: ready to put forward for gateway. */
  allMet: boolean;
  passed: boolean;
  /** From the criteria line's figures, when the gate has one. */
  criteria: { passed: number; total: number } | null;
}

/** A learner's gate in counts. null when the gate did not load for them. */
export function gateSummary(g: GateResult | null | undefined): GateSummary | null {
  const items = g?.items;
  if (!items?.length) return null;
  const met = items.filter((i) => i.state === 'green').length;
  const crit = items.find((i) => i.key === 'criteria')?.figures;
  const cPassed = Number(crit?.passed);
  const cTotal = Number(crit?.total);
  return {
    met,
    total: items.length,
    allMet: met === items.length,
    passed: !!g?.gateway_passed,
    criteria:
      crit && Number.isFinite(cPassed) && Number.isFinite(cTotal) && cTotal > 0
        ? { passed: cPassed, total: cTotal }
        : null,
  };
}

/** "3 of 9 gateway lines met", or "Ready for gateway" / "Gateway passed". */
export function gateWords(s: GateSummary | null): string {
  if (!s) return 'Gateway not checked';
  if (s.passed) return 'Gateway passed';
  if (s.allMet) return 'Ready for gateway';
  return `${s.met} of ${s.total} gateway lines met`;
}
