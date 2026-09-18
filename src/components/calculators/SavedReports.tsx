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
import { Capacitor } from '@capacitor/core';
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

  /*
   * ELE-1738 — Colin at Property Services & Maintenance: "I notice a tab for
   * saved results but when I click nothing happens??" Twice, four days apart.
   *
   * His reports were never the problem: four rows, four PDFs present in
   * storage, RLS scoped correctly, and the list does not filter by calculator.
   * The tap itself was being swallowed.
   *
   * Signing the URL is async, and Safari drops the user-activation context
   * across an `await`. By the time `window.open()` ran it was no longer a
   * user-initiated open, so Safari blocked it — silently, with no error for
   * the code to catch, which is why it reported success and showed nothing.
   * Chrome is lenient here, which is why only the iPad user ever saw it.
   *
   * So the tab is claimed SYNCHRONOUSLY, on the gesture, and pointed at the
   * URL once it resolves. If the sign fails the placeholder is closed again
   * rather than left as a stray blank tab.
   *
   * Native is untouched — Capacitor routes through SFSafariViewController and
   * has no popup blocker to satisfy, so it keeps the existing path.
   */
  const handleOpen = async (r: SavedCalculationReport) => {
    setBusyId(r.id);

    const isWeb = !Capacitor.isNativePlatform();
    // Opened before any await — this is the part Safari cares about.
    const placeholder = isWeb ? window.open('', '_blank') : null;

    try {
      const url = await open(r);
      if (!url) {
        placeholder?.close();
        toast({
          title: 'Could not open that report',
          description: 'Please try again, or generate a fresh one.',
          variant: 'destructive',
        });
        return;
      }
      if (placeholder && !placeholder.closed) {
        placeholder.location.href = url;
      } else {
        // Popup blocked outright, or native. Fall back to the normal path.
        openExternalUrl(url);
      }
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
        <span className="flex min-w-0 flex-1 flex-col text-left">
          <span className="flex items-center gap-2 text-[14px] font-semibold text-white">
            <FileText className="h-4 w-4 text-elec-yellow" />
            Saved PDF reports
            <span className="text-[12px] font-medium text-white">({total})</span>
          </span>
          {/*
            ELE-1738 — Colin read "Saved reports" as saved CALCULATIONS and
            expected to reopen one and edit the figures: "can a calc be saved
            as one I started last night had now gone." What is stored is the
            generated PDF, not the calculator's inputs. Saying so here is the
            honest fix — the alternative was implying a feature that does not
            exist and losing his work again.
          */}
          <span className="mt-0.5 text-[12px] text-white">
            The PDFs you&rsquo;ve generated. Calculator entries aren&rsquo;t saved &mdash; note
            your figures before you leave.
          </span>
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
