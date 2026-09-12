/**
 * SavedReports
 * ────────────────────────────────────────────────────────────────────────
 * The reports this electrician has already produced, so a PDF is a record
 * rather than a one-shot download. Collapsed by default and absent entirely
 * until there is something to show — the calculator is the job, this is a
 * drawer under it.
 */

import { useState } from 'react';
import { ChevronDown, FileText, Loader2, Trash2 } from 'lucide-react';

import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { openExternalUrl } from '@/utils/open-external-url';
import {
  useCalculationReports,
  type SavedCalculationReport,
} from '@/hooks/useCalculationReports';

const when = (iso: string) => {
  const d = new Date(iso);
  const today = new Date();
  const sameDay = d.toDateString() === today.toDateString();
  return sameDay
    ? `Today, ${d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

export function SavedReports() {
  const { reports, total, loading, open, remove } = useCalculationReports();
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  // Nothing to offer yet — say nothing rather than show an empty drawer.
  if (loading || reports.length === 0) return null;

  const handleOpen = async (r: SavedCalculationReport) => {
    setBusyId(r.id);
    try {
      const url = await open(r);
      if (!url) {
        toast({
          title: 'Could not open that report',
          description: 'Please try again, or generate a fresh one.',
          variant: 'destructive',
        });
        return;
      }
      openExternalUrl(url);
    } finally {
      setBusyId(null);
    }
  };

  const handleRemove = async (r: SavedCalculationReport) => {
    const ok = await remove(r);
    toast(
      ok
        ? { title: 'Report deleted' }
        : { title: 'Could not delete that report', variant: 'destructive' }
    );
  };

  return (
    <div className="mt-4 rounded-2xl border border-white/[0.12] bg-white/[0.02]">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex min-h-[44px] w-full touch-manipulation items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="flex items-center gap-2 text-[14px] font-semibold text-white">
          <FileText className="h-4 w-4 text-elec-yellow" />
          Saved reports
          <span className="text-[12px] font-medium text-white">({total})</span>
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-white transition-transform',
            expanded && 'rotate-180'
          )}
        />
      </button>

      {expanded && (
        <ul className="max-h-[60vh] overflow-y-auto border-t border-white/[0.1]">
          {reports.map((r) => (
            <li
              key={r.id}
              className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-2.5 last:border-b-0"
            >
              <button
                type="button"
                onClick={() => handleOpen(r)}
                disabled={busyId === r.id}
                className="min-h-[44px] flex-1 touch-manipulation text-left"
              >
                <span className="block text-[14px] font-semibold text-white">{r.title}</span>
                <span className="block text-[12px] text-white">
                  {when(r.created_at)}
                  {r.subtitle ? ` · ${r.subtitle}` : ''}
                </span>
              </button>
              {busyId === r.id ? (
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              ) : (
                <button
                  type="button"
                  onClick={() => handleRemove(r)}
                  aria-label={`Delete ${r.title} report`}
                  className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-lg text-white hover:bg-white/[0.06]"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </li>
          ))}
          {total > reports.length && (
            <li className="px-4 py-2.5 text-[12px] text-white">
              Showing the {reports.length} most recent of {total}.
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
