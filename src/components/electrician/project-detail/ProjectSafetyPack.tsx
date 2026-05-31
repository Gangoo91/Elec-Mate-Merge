/**
 * ProjectSafetyPack — the "Safety Pack" section for a Spark project: every
 * safety document linked to it (permits, isolations, near-misses, COSHH, fire
 * watch, diary, inspections, pre-use checks, observations), each with one-tap
 * PDF export. Self-contained collapsible styled to match the project detail.
 */

import { useState } from 'react';
import { ShieldCheck, ChevronUp, ChevronDown, ChevronRight, FileText } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { useProjectSafetyDocs } from '@/hooks/useProjectSafetyDocs';

const fmtDate = (d: string | null) =>
  d
    ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

function statusTone(s: string | null): string {
  const v = (s || '').toLowerCase();
  if (
    [
      'fatal',
      'major',
      'high',
      'very-high',
      'critical',
      'expired',
      'isolated',
      'fail',
      'failed',
    ].includes(v)
  )
    return 'bg-red-500/15 text-red-300';
  if (['moderate', 'medium', 'active', 'pending', 'in_progress', 'open'].includes(v))
    return 'bg-amber-500/15 text-amber-300';
  if (
    [
      'low',
      'minor',
      'pass',
      'passed',
      'completed',
      'closed',
      're_energised',
      'accepted',
      'good',
    ].includes(v)
  )
    return 'bg-emerald-500/15 text-emerald-300';
  return 'bg-white/10 text-white/70';
}

export function ProjectSafetyPack({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  const { data: docs = [], isLoading } = useProjectSafetyDocs(projectId);
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center justify-between px-3.5 rounded-xl bg-white/[0.05] border border-white/[0.10] hover:bg-white/[0.08] hover:border-white/[0.18] touch-manipulation h-12 active:bg-white/[0.10] transition-colors group">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <span className="text-[14px] font-semibold text-white">Safety Pack</span>
          </div>
          <div className="flex items-center gap-2">
            {docs.length > 0 && (
              <span className="text-[11px] font-semibold text-white/70 bg-white/[0.10] px-2 py-0.5 rounded-full tabular-nums">
                {docs.length}
              </span>
            )}
            {open ? (
              <ChevronUp className="h-4 w-4 text-white/45" />
            ) : (
              <ChevronDown className="h-4 w-4 text-white/45" />
            )}
          </div>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 space-y-2">
        {isLoading ? (
          <div className="py-6 text-center text-sm text-white/55">Loading safety documents…</div>
        ) : docs.length === 0 ? (
          <div className="flex flex-col items-center py-6 text-center px-4">
            <p className="text-sm text-white mb-1">No safety documents linked yet</p>
            <p className="text-[11.5px] text-white/55 leading-snug max-w-[260px]">
              Link permits, safe isolations, RAMS, COSHH and more to this project from the Site
              Safety tools — they gather here as one pack.
            </p>
          </div>
        ) : (
          docs.map((d) => {
            const busy = isExporting && exportingId === d.id;
            return (
              <button
                key={`${d.pdfType}-${d.id}`}
                type="button"
                disabled={busy}
                onClick={() =>
                  exportPDF(d.pdfType as Parameters<typeof exportPDF>[0], d.id, undefined, d.title)
                }
                className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation active:bg-white/[0.08] transition-colors disabled:opacity-60"
              >
                <div className="min-w-0 text-left flex items-center gap-3">
                  <FileText className="h-4 w-4 text-white/45 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{d.title}</p>
                    <p className="text-[11px] text-white/55">
                      {d.type}
                      {d.date ? ` — ${fmtDate(d.date)}` : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {busy ? (
                    <span className="text-[11px] font-medium text-elec-yellow">Exporting…</span>
                  ) : (
                    d.status && (
                      <span
                        className={cn(
                          'text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap',
                          statusTone(d.status)
                        )}
                      >
                        {d.status.replace(/_/g, ' ')}
                      </span>
                    )
                  )}
                  <ChevronRight className="h-4 w-4 text-white/45" />
                </div>
              </button>
            );
          })
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default ProjectSafetyPack;
