import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useJobDetailSignals — the actual cross-section items that need attention on
   ONE job (the detail behind the job-card badges): open incidents, overdue
   invoices, and assigned workers with a cert expiring within 30 days. So the
   manager can SEE and act, not just notice a badge. Employer-scoped by RLS.
   ========================================================================== */

export interface JobIncidentSignal {
  id: string;
  title: string | null;
  severity: string | null;
  status: string | null;
}
export interface JobInvoiceSignal {
  id: string;
  invoice_number: string | null;
  amount: number | null;
  due_date: string;
  days: number;
}
export interface JobCertSignal {
  employee: string;
  name: string | null;
  expiry_date: string;
  days: number;
}

export interface JobDetailSignals {
  incidents: JobIncidentSignal[];
  overdueInvoices: JobInvoiceSignal[];
  expiringCerts: JobCertSignal[];
}

const EMPTY: JobDetailSignals = { incidents: [], overdueInvoices: [], expiringCerts: [] };

const daysBetween = (iso: string) =>
  Math.round((Date.now() - new Date(iso).getTime()) / 86_400_000);

export function useJobDetailSignals(jobId: string | null | undefined) {
  return useQuery<JobDetailSignals>({
    queryKey: ['job-detail-signals', jobId],
    enabled: !!jobId,
    staleTime: 60_000,
    queryFn: async () => {
      if (!jobId) return EMPTY;
      const today = new Date().toISOString().slice(0, 10);
      const cutoff = new Date(Date.now() + 30 * 86_400_000).toISOString().slice(0, 10);

      const [incRes, invRes, assignRes] = await Promise.all([
        supabase
          .from('employer_incidents')
          .select('id, title, severity, status')
          .eq('job_id', jobId),
        supabase
          .from('employer_invoices')
          .select('id, invoice_number, amount, due_date, status')
          .eq('job_id', jobId),
        supabase.from('employer_job_assignments').select('employee_id, status').eq('job_id', jobId),
      ]);

      const incidents = (incRes.data ?? [])
        .filter((i) => !/resolved|closed/i.test(i.status ?? ''))
        .map((i) => ({ id: i.id, title: i.title, severity: i.severity, status: i.status }));

      const overdueInvoices = (invRes.data ?? [])
        .filter((v) => v.due_date && v.due_date < today && !/paid|cancel/i.test(v.status ?? ''))
        .map((v) => ({
          id: v.id,
          invoice_number: v.invoice_number,
          amount: v.amount,
          due_date: v.due_date as string,
          days: daysBetween(v.due_date as string),
        }));

      const employeeIds = [
        ...new Set(
          (assignRes.data ?? [])
            .filter((a) => !/removed|cancel/i.test(a.status ?? ''))
            .map((a) => a.employee_id)
            .filter(Boolean) as string[]
        ),
      ];

      let expiringCerts: JobCertSignal[] = [];
      if (employeeIds.length > 0) {
        const [certRes, empRes] = await Promise.all([
          supabase
            .from('employer_certifications')
            .select('employee_id, name, expiry_date')
            .in('employee_id', employeeIds)
            .not('expiry_date', 'is', null)
            .gte('expiry_date', today)
            .lte('expiry_date', cutoff),
          supabase.from('employer_employees').select('id, name').in('id', employeeIds),
        ]);
        const nameById = new Map((empRes.data ?? []).map((e) => [e.id, e.name as string]));
        expiringCerts = (certRes.data ?? []).map((c) => ({
          employee: nameById.get(c.employee_id as string) ?? 'Worker',
          name: c.name,
          expiry_date: c.expiry_date as string,
          days: -daysBetween(c.expiry_date as string),
        }));
      }

      return { incidents, overdueInvoices, expiringCerts };
    },
  });
}
