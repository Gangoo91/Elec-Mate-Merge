import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useAssessorDrift — per-assessor agreement-rate rollup with trend.

   Joins college_iqa_samples ↔ college_iqa_sampling (to recover the
   assessor each sample is auditing) and counts non-pending verdicts in
   two windows (recent N days vs prior N days). Surfaces:

     - agreement_pct (recent) and prior_agreement_pct
     - delta in pp between the two windows
     - drift_level: 'red' (recent <75% OR fell ≥10pp), 'amber' (75-85% OR
       fell ≥5pp), 'green' (>85% and steady or improving), 'insufficient'
       (fewer than `minSamples` recent samples — don't shout)

   Used to drive the Assessor Drift Panel on the IQA Dashboard so the IQA
   doesn't have to scroll the coverage matrix to spot a slipping marker.
   ========================================================================== */

export interface AssessorDriftRow {
  assessor_id: string;
  assessor_name: string;
  recent_samples: number;
  prior_samples: number;
  agreement_pct: number | null;
  prior_agreement_pct: number | null;
  delta_pp: number | null;
  drift_level: 'red' | 'amber' | 'green' | 'insufficient';
  drift_reason: string;
}

async function callerCollegeId(): Promise<string | null> {
  const { data: userRes } = await supabase.auth.getUser();
  const userId = userRes.user?.id;
  if (!userId) return null;
  const { data: profile } = await supabase
    .from('profiles')
    .select('college_id')
    .eq('id', userId)
    .maybeSingle();
  return (profile as { college_id?: string | null } | null)?.college_id ?? null;
}

export interface UseAssessorDriftOpts {
  /** Days in the "recent" window. Prior window is the same length immediately before it. */
  windowDays?: number;
  /** Minimum recent verdicts before drift can be evaluated. Below this we
   *  emit 'insufficient' instead of 'red' to avoid noise. */
  minSamples?: number;
  /** Agreement % threshold at which we flag red. */
  redBelow?: number;
  /** Trend drop (pp) at which we flag red. */
  redDropPp?: number;
}

export function useAssessorDrift(opts: UseAssessorDriftOpts = {}) {
  const windowDays = opts.windowDays ?? 90;
  const minSamples = opts.minSamples ?? 5;
  const redBelow = opts.redBelow ?? 75;
  const redDropPp = opts.redDropPp ?? 10;

  const [rows, setRows] = useState<AssessorDriftRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const collegeId = await callerCollegeId();
      if (!collegeId) {
        setRows([]);
        return;
      }

      const now = Date.now();
      const recentFrom = new Date(now - windowDays * 86_400_000).toISOString();
      const priorFrom = new Date(now - 2 * windowDays * 86_400_000).toISOString();

      // Plans tell us which assessor each sample was auditing
      const { data: plans } = await supabase
        .from('college_iqa_sampling')
        .select('id, assessor_id')
        .eq('college_id', collegeId);
      const planToAssessor = new Map<string, string>();
      const assessorIds = new Set<string>();
      for (const p of (plans ?? []) as Array<{ id: string; assessor_id: string | null }>) {
        if (p.assessor_id) {
          planToAssessor.set(p.id, p.assessor_id);
          assessorIds.add(p.assessor_id);
        }
      }
      if (planToAssessor.size === 0) {
        setRows([]);
        return;
      }

      // Pull all sample verdicts in the prior+recent window
      const { data: samples } = await supabase
        .from('college_iqa_samples')
        .select('sampling_plan_id, verdict, sampled_at')
        .in('sampling_plan_id', Array.from(planToAssessor.keys()))
        .gte('sampled_at', priorFrom);

      // Resolve assessor names from college_staff (assessor_id is auth.uid)
      const { data: staffRows } = await supabase
        .from('college_staff')
        .select('user_id, name')
        .in('user_id', Array.from(assessorIds));
      const nameMap = new Map(
        ((staffRows ?? []) as Array<{ user_id: string; name: string }>).map((r) => [r.user_id, r.name])
      );

      type Acc = {
        recent_agree: number;
        recent_total: number;
        prior_agree: number;
        prior_total: number;
      };
      const acc = new Map<string, Acc>();

      for (const row of (samples ?? []) as Array<{
        sampling_plan_id: string;
        verdict: string | null;
        sampled_at: string | null;
      }>) {
        const assessor = planToAssessor.get(row.sampling_plan_id);
        if (!assessor || !row.verdict || row.verdict === 'pending') continue;
        if (!row.sampled_at) continue;
        const slot = acc.get(assessor) ?? {
          recent_agree: 0,
          recent_total: 0,
          prior_agree: 0,
          prior_total: 0,
        };
        const inRecent = row.sampled_at >= recentFrom;
        if (inRecent) {
          slot.recent_total += 1;
          if (row.verdict === 'agree') slot.recent_agree += 1;
        } else {
          slot.prior_total += 1;
          if (row.verdict === 'agree') slot.prior_agree += 1;
        }
        acc.set(assessor, slot);
      }

      const out: AssessorDriftRow[] = [];
      for (const [assessorId, slot] of acc.entries()) {
        const agreementPct =
          slot.recent_total > 0 ? Math.round((slot.recent_agree / slot.recent_total) * 100) : null;
        const priorAgreementPct =
          slot.prior_total > 0 ? Math.round((slot.prior_agree / slot.prior_total) * 100) : null;
        const delta =
          agreementPct !== null && priorAgreementPct !== null
            ? agreementPct - priorAgreementPct
            : null;

        let drift_level: AssessorDriftRow['drift_level'] = 'green';
        let reason = 'Steady';
        if (slot.recent_total < minSamples) {
          drift_level = 'insufficient';
          reason = `Only ${slot.recent_total} sample${slot.recent_total === 1 ? '' : 's'} in window`;
        } else if (agreementPct !== null) {
          if (agreementPct < redBelow || (delta !== null && delta <= -redDropPp)) {
            drift_level = 'red';
            reason =
              agreementPct < redBelow
                ? `Agreement ${agreementPct}% (below ${redBelow}%)`
                : `Dropped ${Math.abs(delta!)}pp from prior window`;
          } else if (agreementPct < 85 || (delta !== null && delta <= -5)) {
            drift_level = 'amber';
            reason =
              agreementPct < 85
                ? `Agreement ${agreementPct}% (below 85%)`
                : `Dropped ${Math.abs(delta!)}pp from prior window`;
          } else {
            drift_level = 'green';
            reason = delta !== null && delta > 0 ? `Up ${delta}pp` : 'Steady';
          }
        }

        out.push({
          assessor_id: assessorId,
          assessor_name: nameMap.get(assessorId) ?? 'Unknown assessor',
          recent_samples: slot.recent_total,
          prior_samples: slot.prior_total,
          agreement_pct: agreementPct,
          prior_agreement_pct: priorAgreementPct,
          delta_pp: delta,
          drift_level,
          drift_reason: reason,
        });
      }

      // Red first, then amber, then insufficient, then green. Within each
      // band sort by agreement asc (worst first).
      const order: Record<AssessorDriftRow['drift_level'], number> = {
        red: 0,
        amber: 1,
        insufficient: 2,
        green: 3,
      };
      out.sort((a, b) => {
        const o = order[a.drift_level] - order[b.drift_level];
        if (o !== 0) return o;
        return (a.agreement_pct ?? 999) - (b.agreement_pct ?? 999);
      });
      setRows(out);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [windowDays, minSamples, redBelow, redDropPp]);

  useEffect(() => {
    void load();
  }, [load]);

  return { rows, loading, error, refresh: load };
}
