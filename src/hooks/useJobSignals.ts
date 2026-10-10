import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { fetchTeamHeldCredentialRows } from '@/services/credentialsService';
import { fetchFirmIncidents } from '@/hooks/useIncidents';

/* ==========================================================================
   useJobSignals — cross-section signals surfaced ON the job they relate to,
   so the hub feels like one connected system, not 40 tabs. Per job:
     • open incidents (Site Safety near misses / accidents and employer_incidents, unresolved)
     • overdue invoices (employer_invoices.job_id, past due & unpaid)
     • assigned workers with a cert expiring within 30 days
   All employer-scoped by RLS. Small tables → fetch + aggregate client-side
   (robust against status-casing variance).
   ========================================================================== */

export interface JobSignals {
  incidents: number;
  overdueInvoices: number;
  expiringCerts: number;
  invoiced: number;
  paid: number;
}

const EMPTY: JobSignals = {
  incidents: 0,
  overdueInvoices: 0,
  expiringCerts: 0,
  invoiced: 0,
  paid: 0,
};

export function useJobSignals() {
  return useQuery<Map<string, JobSignals>>({
    queryKey: ['job-signals'],
    staleTime: 60_000,
    queryFn: async () => {
      const map = new Map<string, JobSignals>();
      const bump = (jobId: string | null | undefined, key: keyof JobSignals) => {
        if (!jobId) return;
        const s = map.get(jobId) ?? { ...EMPTY };
        s[key] += 1;
        map.set(jobId, s);
      };

      const today = new Date().toISOString().slice(0, 10);
      const cutoff = new Date(Date.now() + 30 * 86_400_000).toISOString().slice(0, 10);

      const [incidentsRes, invoicesRes, certsRes] = await Promise.all([
        // ELE-2031: Site Safety near misses / accidents on the job, plus any
        // employer_incidents rows. Managers only; anyone else sees no badge.
        fetchFirmIncidents()
          .then((rows) => ({ data: rows.map((r) => ({ job_id: r.job_id, status: r.status })) }))
          .catch(() => ({ data: [] as { job_id: string | null | undefined; status: string }[] })),
        supabase.rpc('employer_invoices_unified').select('job_id, status, due_date, amount, paid_date'),
        // ELE-1950: the team's Elec-ID store (employer_certifications is LEGACY)
        fetchTeamHeldCredentialRows().then((r) => ({
          ...r,
          data: (r.data ?? []).filter(
            (c) => c.expiry_date && c.expiry_date >= today && c.expiry_date <= cutoff
          ),
        })),
      ]);

      // Open incidents tied to a job
      for (const i of incidentsRes.data ?? []) {
        if (!/resolved|closed/i.test(i.status ?? '')) bump(i.job_id, 'incidents');
      }

      // Invoiced/paid totals + overdue count, tied to a job
      for (const inv of invoicesRes.data ?? []) {
        if (inv.job_id) {
          const s = map.get(inv.job_id) ?? { ...EMPTY };
          const amt = Number(inv.amount) || 0;
          s.invoiced += amt;
          if (inv.paid_date) s.paid += amt;
          map.set(inv.job_id, s);
        }
        if (inv.due_date && inv.due_date < today && !/paid|cancel/i.test(inv.status ?? '')) {
          bump(inv.job_id, 'overdueInvoices');
        }
      }

      // Assigned workers whose cert expires within 30d
      const expiring = new Set(
        (certsRes.data ?? []).map((c) => c.employee_id).filter(Boolean) as string[]
      );
      if (expiring.size > 0) {
        const { data: assigns } = await supabase
          .from('employer_job_assignments')
          .select('job_id, employee_id, status');
        const seen = new Set<string>();
        for (const a of assigns ?? []) {
          if (
            a.job_id &&
            a.employee_id &&
            expiring.has(a.employee_id) &&
            !/removed|cancel/i.test(a.status ?? '')
          ) {
            const k = `${a.job_id}:${a.employee_id}`;
            if (!seen.has(k)) {
              seen.add(k);
              bump(a.job_id, 'expiringCerts');
            }
          }
        }
      }

      return map;
    },
  });
}
