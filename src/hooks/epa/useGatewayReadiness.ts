/**
 * useGatewayReadiness — the real gateway gate for one learner (ELE-1872),
 * from get_gateway_readiness: the same lines, states and sentences for the
 * learner (their Readiness view) and their tutor (Student 360). Each line is
 * green (met), amber (in hand, or waiting on someone else) or red (missing),
 * with a link key the screen turns into the place to fix it.
 */
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PORTFOLIO_CHANGED_EVENT } from '@/hooks/portfolio/usePortfolio';

export type GateState = 'green' | 'amber' | 'red';
export type GateLink =
  | 'coverage'
  | 'hours'
  | 'start_date'
  | 'english_maths'
  | 'declaration_learner'
  | 'declaration_provider'
  | 'declaration_employer'
  | 'net_checklist';

export interface GateItem {
  key: string;
  label: string;
  state: GateState;
  sentence: string;
  link: GateLink;
  figures?: Record<string, unknown>;
}

export interface GatewayReadiness {
  route: string;
  assessment: string | null;
  standard_code: string | null;
  standard_title: string | null;
  college_student_id: string | null;
  overall: GateState;
  met: number;
  total: number;
  gateway_passed: boolean;
  gateway_passed_at: string | null;
  epa_booking_date: string | null;
  items: GateItem[];
}

export function useGatewayReadiness(learnerId: string | null | undefined, opts: { enabled?: boolean } = {}) {
  const enabled = opts.enabled ?? true;
  const [data, setData] = useState<GatewayReadiness | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!learnerId) {
      setData(null);
      setLoading(false);
      return;
    }
    const { data: d, error: e } = await supabase.rpc(
      'get_gateway_readiness' as never,
      { p_learner: learnerId } as never
    );
    if (e) setError(e.message);
    else {
      setError(null);
      setData(d as unknown as GatewayReadiness);
    }
    setLoading(false);
  }, [learnerId]);

  useEffect(() => {
    if (!enabled) return;
    setLoading(true);
    void load();
  }, [enabled, load]);

  useEffect(() => {
    const on = () => void load();
    window.addEventListener(PORTFOLIO_CHANGED_EVENT, on);
    return () => window.removeEventListener(PORTFOLIO_CHANGED_EVENT, on);
  }, [load]);

  return { data, loading, error, reload: load };
}
