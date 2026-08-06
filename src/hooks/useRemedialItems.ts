import { useCallback, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

/** A coded observation as stored in `reports.data.defectObservations`. */
export interface DefectObservation {
  id: string;
  item?: string | null;
  description?: string | null;
  recommendation?: string | null;
  regulation?: string | null;
  defectCode?: string | null;
  rectified?: boolean | null;
}

export type DefectCode = 'C1' | 'C2' | 'FI' | 'C3' | string;

/**
 * BS 7671 classification → how urgent the remedial work is.
 *
 * C1 is "danger present, immediate action required", so it maps to the top of
 * the scale and nothing else does. C2 is potentially dangerous and needs
 * urgent remedial work. FI cannot be priced until someone has looked. C3 is
 * advisory — worth doing, never an emergency.
 */
export const CODE_PRIORITY: Record<string, 'urgent' | 'high' | 'normal' | 'low'> = {
  C1: 'urgent',
  C2: 'high',
  FI: 'normal',
  C3: 'low',
};

/** Sort order for the picker: the work that must happen, first. */
const CODE_RANK: Record<string, number> = { C1: 0, C2: 1, FI: 2, C3: 3 };

export function codePriority(code?: string | null): 'urgent' | 'high' | 'normal' | 'low' {
  return CODE_PRIORITY[(code ?? '').toUpperCase()] ?? 'normal';
}

/**
 * Observations from a certificate that represent outstanding work.
 *
 * Anything already marked `rectified` on the certificate is left out — it was
 * put right during the visit, and raising it as a job to go back and do would
 * be wrong.
 *
 * Sorted C1 → C2 → FI → C3 so the items that must happen read first, whatever
 * order they were entered in.
 */
export function outstandingObservations(observations: DefectObservation[]): DefectObservation[] {
  return observations
    .filter((o) => o && o.id && !o.rectified)
    .filter((o) => (o.description ?? '').trim().length > 0)
    .sort((a, b) => {
      const ra = CODE_RANK[(a.defectCode ?? '').toUpperCase()] ?? 9;
      const rb = CODE_RANK[(b.defectCode ?? '').toUpperCase()] ?? 9;
      return ra - rb;
    });
}

/** Where the raised items should land. */
export type RemedialTarget =
  | { kind: 'existing-project'; projectId: string }
  | { kind: 'new-project'; title: string; customerId?: string | null }
  | { kind: 'unassigned' };

export interface RaiseRemedialInput {
  reportId: string;
  observations: DefectObservation[];
  target: RemedialTarget;
  customerId?: string | null;
  /** Address or site, copied onto the created job so it reads properly. */
  location?: string | null;
}

export interface RaiseRemedialResult {
  created: number;
  skipped: number;
  projectId: string | null;
}

export function useRemedialItems() {
  const [saving, setSaving] = useState(false);

  const raise = useCallback(
    async (input: RaiseRemedialInput): Promise<RaiseRemedialResult | null> => {
      const { reportId, observations, target, customerId, location } = input;
      if (observations.length === 0) return null;

      setSaving(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('Not signed in');

        /*
         * Resolve the customer if the caller did not know one.
         *
         * The EICR form only carries a customer id when the certificate was
         * started from a customer record, but the saved `reports` row knows it
         * for 230 of the 344 certificates that carry defects. Without this the
         * new remedial job would be created unlinked — which is the difference
         * between a job you can invoice and a note to yourself.
         */
        let resolvedCustomerId = customerId ?? null;
        // Only look it up when the id could actually BE a reports row. A
        // certificate still being filled in carries a temp id, and comparing a
        // non-uuid against a uuid column errors — which would abort the whole
        // raise rather than just skip the lookup.
        const looksLikeUuid =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(reportId ?? '');
        if (!resolvedCustomerId && looksLikeUuid) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: reportRow } = await (supabase as any)
            .from('reports')
            .select('customer_id')
            .eq('id', reportId)
            .maybeSingle();
          resolvedCustomerId = (reportRow as { customer_id: string | null } | null)?.customer_id ?? null;
        }

        // Resolve the job — every task needs its id, and a half-created job
        // with no tasks on it is worse than nothing.
        let projectId: string | null = null;
        if (target.kind === 'existing-project') {
          projectId = target.projectId;
        } else if (target.kind === 'new-project') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: created, error: projectError } = await (supabase as any)
            .from('spark_projects')
            .insert({
              user_id: user.id,
              title: target.title,
              status: 'active',
              customer_id: target.customerId ?? resolvedCustomerId,
              location: location ?? null,
            })
            .select('id')
            .single();
          if (projectError) throw projectError;
          projectId = (created as { id: string }).id;
        }

        const rows = observations.map((o) => {
          const code = (o.defectCode ?? '').toUpperCase();
          // The recommendation is what to DO about it, the regulation is the
          // authority for it. Both belong in the details, which is the field
          // 19 of 23 hand-typed snags were missing entirely.
          const details = [
            o.recommendation?.trim(),
            o.regulation?.trim() ? `BS 7671 ${o.regulation.trim()}` : null,
          ]
            .filter(Boolean)
            .join('\n\n');

          return {
            user_id: user.id,
            title: (o.description ?? '').trim().slice(0, 300),
            details: details || null,
            status: 'open',
            priority: codePriority(code),
            location: o.item?.trim() || location || null,
            tags: code ? ['snagging', `code:${code}`] : ['snagging'],
            project_id: projectId,
            customer_id: resolvedCustomerId,
            source_report_id: reportId,
            source_observation_id: o.id,
          };
        });

        // Re-running must not raise the same observation twice. The unique
        // index on (user_id, source_report_id, source_observation_id) is what
        // enforces that; ignoreDuplicates makes a second run a no-op rather
        // than an error the user has to read.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: inserted, error } = await (supabase as any)
          .from('spark_tasks')
          .upsert(rows, {
            onConflict: 'user_id,source_report_id,source_observation_id',
            ignoreDuplicates: true,
          })
          .select('id');

        if (error) throw error;

        const created = (inserted as { id: string }[] | null)?.length ?? 0;
        const skipped = rows.length - created;

        toast({
          title:
            created === 0
              ? 'Already raised'
              : `${created} remedial item${created === 1 ? '' : 's'} raised`,
          description:
            created === 0
              ? 'These observations are already on your snagging list.'
              : skipped > 0
                ? `${skipped} were already there.`
                : projectId
                  ? 'They are on the job and on your snagging list.'
                  : 'They are on your snagging list.',
        });

        return { created, skipped, projectId };
      } catch (err) {
        console.error('Failed to raise remedial items:', err);
        toast({
          title: 'Could not raise the items',
          description: err instanceof Error ? err.message : 'Please try again.',
          variant: 'destructive',
        });
        return null;
      } finally {
        setSaving(false);
      }
    },
    []
  );

  return { raise, saving };
}

/**
 * Which observations on a certificate have already been raised.
 *
 * Lets the sheet show what is done rather than silently no-op'ing on items the
 * user has ticked and expects something to happen to.
 */
export function useAlreadyRaised(reportId: string | null | undefined) {
  const [ids, setIds] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    if (!reportId) {
      setIds(new Set());
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase as any)
      .from('spark_tasks')
      .select('source_observation_id')
      .eq('source_report_id', reportId)
      .not('source_observation_id', 'is', null);
    setIds(
      new Set(
        ((data ?? []) as { source_observation_id: string }[]).map((r) => r.source_observation_id)
      )
    );
  }, [reportId]);

  return useMemo(() => ({ raisedIds: ids, reloadRaised: load }), [ids, load]);
}
