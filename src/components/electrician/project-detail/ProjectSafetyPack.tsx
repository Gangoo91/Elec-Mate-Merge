/**
 * ProjectSafetyPack — the "Safety Pack" section for a Spark project: every
 * safety document linked to it (permits, isolations, near-misses, COSHH, fire
 * watch, diary, inspections, pre-use checks, observations), each with one-tap
 * PDF export. Self-contained collapsible styled to match the project detail.
 */

import { useState } from 'react';
import { ShieldCheck, ChevronUp, ChevronDown, ChevronRight, FileText } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { PANEL } from '@/components/electrician/shared/surfaces';
import { cn } from '@/lib/utils';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { useProjectSafetyDocs } from '@/hooks/useProjectSafetyDocs';
import { useNavigate } from 'react-router-dom';
import {
  safetyToolFromJobUrl,
  type JobLaunchContext,
  type SafetyToolId,
} from '@/utils/safety-launch';

/**
 * The records people start ON a job. Each opens a new record already linked to
 * this job, and Back returns here. Recording the simple things should never
 * need a trip through the Site Safety front page and a job picker.
 */
const START_FROM_JOB: { tool: SafetyToolId; label: string }[] = [
  { tool: 'safe-isolation', label: 'Safe isolation' },
  { tool: 'permit-to-work', label: 'Permit' },
  { tool: 'near-miss', label: 'Near miss' },
  { tool: 'coshh', label: 'COSHH' },
  { tool: 'pre-use-checks', label: 'Pre-use check' },
  { tool: 'fire-watch', label: 'Fire watch' },
  { tool: 'site-diary', label: 'Site diary' },
  { tool: 'inspection-checklists', label: 'Inspection' },
  { tool: 'safety-observations', label: 'Observation' },
  { tool: 'accident-book', label: 'Accident' },
];

/** Status words as stored ('re_energised', 'very-high') → sentence case. */
const statusLabel = (s: string) => {
  const v = s.toLowerCase();
  if (v === 're_energised' || v === 're-energised') return 'Re-energised';
  const t = v.replace(/[_-]+/g, ' ').trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
};

/** Group records by kind, keeping the newest-first order inside each group. */
function groupByType<T extends { type: string }>(docs: T[]): [string, T[]][] {
  const groups = new Map<string, T[]>();
  for (const d of docs) groups.set(d.type, [...(groups.get(d.type) ?? []), d]);
  return [...groups.entries()];
}

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
  return 'bg-white/10 text-white';
}

export function ProjectSafetyPack({
  projectId,
  job,
}: {
  projectId: string;
  job?: Omit<JobLaunchContext, 'projectId'>;
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const startTool = (tool: SafetyToolId) =>
    navigate(safetyToolFromJobUrl(tool, { projectId, ...job }));
  const { data: docs = [], isLoading } = useProjectSafetyDocs(projectId);
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();

  return (
    <Collapsible className={cn(PANEL, 'overflow-hidden')} open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center justify-between gap-3 px-3.5 sm:px-4 py-3 min-h-[60px] touch-manipulation hover:bg-white/[0.03] active:bg-white/[0.04] transition-colors group text-left">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-4 w-4 text-white" />
            </span>
            <span className="min-w-0">
              <span className="block text-[14px] font-semibold text-white leading-tight">
                Safety Pack
              </span>
              <span className="block text-[11px] text-white truncate leading-tight mt-0.5">
                Permits, isolations & safety records
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {docs.length > 0 && (
              <span className="text-[11px] font-semibold text-white bg-white/[0.10] px-2 py-0.5 rounded-full tabular-nums">
                {docs.length}
              </span>
            )}
            {open ? (
              <ChevronUp className="h-4 w-4 text-white" />
            ) : (
              <ChevronDown className="h-4 w-4 text-white" />
            )}
          </div>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3.5 sm:px-4 pb-3.5 pt-2.5 space-y-2 border-t border-white/[0.06]">
        <div className="pb-1">
          <p className="mb-2 text-[12px] font-medium text-white">Start a record for this job</p>
          <div className="flex flex-wrap gap-2">
            {START_FROM_JOB.map((t) => (
              <button
                key={t.tool}
                type="button"
                onClick={() => startTool(t.tool)}
                className="h-11 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 text-[13px] font-medium text-white touch-manipulation active:bg-white/[0.12]"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        {isLoading ? (
          <div className="py-6 text-center text-sm text-white">Loading safety records…</div>
        ) : docs.length === 0 ? (
          <div className="flex flex-col items-center py-6 text-center px-4">
            <p className="text-sm text-white mb-1">No safety records for this job yet</p>
            <p className="text-[11.5px] text-white leading-snug max-w-[280px]">
              Start one above and it is filed here automatically. RAMS for this job are listed in
              the RAMS section.
            </p>
          </div>
        ) : (
          groupByType(docs).map(([type, group]) => (
            <div key={type} className="space-y-2 pt-2">
              <p className="text-[12px] font-semibold text-white">
                {type}
                {group.length > 1 ? ` · ${group.length}` : ''}
              </p>
              {group.map((d) => {
                const busy = isExporting && exportingId === d.id;
                return (
                  <button
                    key={`${d.pdfType}-${d.id}`}
                    type="button"
                    disabled={busy}
                    onClick={() =>
                      exportPDF(
                        d.pdfType as Parameters<typeof exportPDF>[0],
                        d.id,
                        undefined,
                        d.title
                      )
                    }
                    className="w-full min-h-11 flex items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation active:bg-white/[0.08] transition-colors disabled:opacity-60"
                  >
                    <div className="min-w-0 text-left flex items-center gap-3">
                      <FileText className="h-4 w-4 text-white shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white line-clamp-2 leading-snug">{d.title}</p>
                        {d.date && <p className="text-[11px] text-white">{fmtDate(d.date)}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {busy ? (
                        <span className="text-[11px] font-medium text-elec-yellow">Preparing PDF…</span>
                      ) : (
                        d.status && (
                          <span
                            className={cn(
                              'text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap',
                              statusTone(d.status)
                            )}
                          >
                            {statusLabel(d.status)}
                          </span>
                        )
                      )}
                      <ChevronRight className="h-4 w-4 text-white" />
                    </div>
                  </button>
                );
              })}
            </div>
          ))
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default ProjectSafetyPack;
