import { AlertTriangle } from 'lucide-react';
import { Pill } from '@/components/employer/editorial';
import { useJobDetailSignals } from '@/hooks/useJobDetailSignals';

/* ==========================================================================
   JobAttentionPanel — the cross-section items needing attention on this job,
   surfaced inside the job detail: open incidents, overdue invoices, and
   assigned workers with an expiring cert. Renders nothing when all clear.
   ========================================================================== */

const gbp = (n: number | null) => (n == null ? '' : ` £${Math.round(n).toLocaleString('en-GB')}`);

export function JobAttentionPanel({ jobId }: { jobId: string }) {
  const { data } = useJobDetailSignals(jobId);
  if (!data) return null;
  const total = data.incidents.length + data.overdueInvoices.length + data.expiringCerts.length;
  if (total === 0) return null;

  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/[0.06] p-3.5 space-y-2">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-red-300 shrink-0" />
        <p className="text-[13px] font-semibold text-white">Needs attention</p>
      </div>
      <div className="space-y-1.5">
        {data.incidents.map((i) => (
          <div key={i.id} className="flex items-center justify-between gap-2 text-[12.5px]">
            <span className="text-white/85 truncate">{i.title || 'Open incident'}</span>
            {i.severity && <Pill tone="red">{i.severity}</Pill>}
          </div>
        ))}
        {data.overdueInvoices.map((v) => (
          <div key={v.id} className="flex items-center justify-between gap-2 text-[12.5px]">
            <span className="text-white/85 truncate">
              Invoice {v.invoice_number ?? ''} overdue{gbp(v.amount)}
            </span>
            <Pill tone="red">{v.days}d</Pill>
          </div>
        ))}
        {data.expiringCerts.map((c, i) => (
          <div
            key={`${c.employee}-${i}`}
            className="flex items-center justify-between gap-2 text-[12.5px]"
          >
            <span className="text-white/85 truncate">
              {c.employee}: {c.name ?? 'cert'} expiring
            </span>
            <Pill tone="amber">{c.days}d</Pill>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobAttentionPanel;
