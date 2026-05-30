/**
 * ProjectSafetyPack — the "Safety pack" for a Spark project: every safety
 * document linked to it (permits, isolations, near-misses, COSHH, fire watch,
 * diary, inspections, pre-use checks, observations), with one-tap PDF export.
 * Drop into the project detail.
 */

import { cn } from '@/lib/utils';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { useProjectSafetyDocs } from '@/hooks/useProjectSafetyDocs';
import { Eyebrow, ListCard, ListRow, EmptyState, LoadingState } from '@/components/college/primitives';

const fmtDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

function statusTone(s: string | null): string {
  const v = (s || '').toLowerCase();
  if (['fatal', 'major', 'high', 'very-high', 'critical', 'expired', 'isolated', 'fail'].includes(v)) return 'bg-red-500/10 text-red-400 border-red-500/25';
  if (['moderate', 'medium', 'active', 'pending', 'in_progress'].includes(v)) return 'bg-amber-500/10 text-amber-400 border-amber-500/25';
  if (['low', 'minor', 'pass', 'completed', 'closed', 're_energised', 'accepted', 'good'].includes(v)) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25';
  return 'bg-white/[0.06] text-white/60 border-white/10';
}

export function ProjectSafetyPack({ projectId }: { projectId: string }) {
  const { data: docs = [], isLoading } = useProjectSafetyDocs(projectId);
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Eyebrow>Safety pack{docs.length ? ` · ${docs.length}` : ''}</Eyebrow>
      </div>

      {isLoading ? (
        <LoadingState />
      ) : docs.length === 0 ? (
        <EmptyState
          title="No safety documents linked yet"
          description="Link permits, safe isolations, RAMS, COSHH and more to this project from the Site Safety tools — they'll gather here as one pack."
        />
      ) : (
        <ListCard>
          {docs.map((d) => (
            <ListRow
              key={`${d.pdfType}-${d.id}`}
              onClick={() => exportPDF(d.pdfType as Parameters<typeof exportPDF>[0], d.id)}
              title={d.title}
              subtitle={d.type}
              trailing={
                <div className="flex flex-col items-end gap-1">
                  {d.status && (
                    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.1em] border whitespace-nowrap', statusTone(d.status))}>
                      {d.status}
                    </span>
                  )}
                  <span className="text-[11px] text-white/45 tabular-nums">
                    {isExporting && exportingId === d.id ? 'Exporting…' : fmtDate(d.date)}
                  </span>
                </div>
              }
            />
          ))}
        </ListCard>
      )}
    </div>
  );
}

export default ProjectSafetyPack;
