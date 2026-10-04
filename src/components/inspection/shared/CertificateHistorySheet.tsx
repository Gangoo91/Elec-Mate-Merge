import React, { useEffect, useState } from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import { ChevronDown, Loader2, RotateCcw } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';

// The two history RPCs post-date the generated Database types (same pattern as LogBookImportReview).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';

/**
 * Certificate history (ELE-1432).
 *
 * Every save that changes a certificate leaves a revision behind — the values
 * it overwrote — captured by a trigger on `reports` (see the
 * `report_revisions` migration). This sheet lists them, newest first, and
 * restores one on request. A restore is itself an ordinary save, so it leaves
 * its own revision and can be undone the same way. The certificate number is
 * never moved by a restore.
 *
 * The list is drawn from `list_report_revisions`, which returns one light row
 * per revision (keys and size, never the payload), so opening the sheet on a
 * certificate with a hundred saves costs nothing.
 */

interface RevisionRow {
  id: number;
  saved_at: string;
  last_fold_at: string;
  edit_version: number | null;
  keys: string[];
  bytes: number;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** `reports.report_id` — the string id, not the row uuid. */
  reportId: string;
  /** Receives the certificate's data after a restore; the form replaces its state with it. */
  onRestored: (data: Record<string, unknown>) => void;
  /** The certificate as it is now, so an opened revision can show "was → now". */
  current?: Record<string, unknown>;
}

/**
 * A revision stores the values a save OVERWROTE. Opening one fetches that
 * payload (`get_report_revision`, owner only) and lays each field out as
 * "was X — now Y", Y being the certificate as it stands today. That is the
 * change summary ELE-1432 asked for, without snapshotting whole certificates.
 */
const formatValue = (v: unknown): string => {
  if (v === null || v === undefined || v === '') return 'blank';
  if (typeof v === 'boolean') return v ? 'yes' : 'no';
  if (typeof v === 'number') return String(v);
  if (typeof v === 'string') return v.length > 160 ? `${v.slice(0, 157)}…` : v;
  if (Array.isArray(v)) return `${v.length} item${v.length === 1 ? '' : 's'}`;
  if (typeof v === 'object') {
    const keys = Object.keys(v as Record<string, unknown>);
    return keys.length === 0 ? 'blank' : `${keys.length} field${keys.length === 1 ? '' : 's'}`;
  }
  return String(v);
};

/** Saves that mark a milestone get a badge; the trigger records them like any other. */
const milestoneFor = (keys: string[]): string | null => {
  if (keys.includes('certificateGenerated') || keys.includes('certificateGeneratedAt')) return 'Generated';
  if (keys.includes('qsReviewStatus') || keys.includes('qsApprovedAt')) return 'QS review';
  if (keys.includes('lockedAt') || keys.includes('issuedAt')) return 'Issued';
  return null;
};

const LABELS: Record<string, string> = {
  scheduleOfTests: 'Schedule of tests',
  distributionBoards: 'Distribution boards',
  inspectionItems: 'Inspection schedule',
  defectObservations: 'Observations',
  observations: 'Observations',
  circuits: 'Circuits',
  testResults: 'Test results',
  clientName: 'Client name',
  clientAddress: 'Client address',
  installationAddress: 'Installation address',
  completedSections: 'Progress',
};

/** camelCase → words, with the common certificate keys named properly. */
const humanise = (key: string): string =>
  LABELS[key] ??
  key
    .replace(/^_/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/^./, (c) => c.toUpperCase());

/** "goes" for one field, "go" for several — the confirm reads as a sentence. */
const verb = (keys: string[], one: string, many: string): string =>
  keys.length === 1 ? one : many;

const describeKeys = (rawKeys: string[]): string => {
  // Internal `_` keys are never content; the trigger skips them, this is belt and braces.
  const keys = rawKeys.filter((k) => !k.startsWith('_'));
  if (keys.length === 0) return 'internal fields';
  const shown = keys.slice(0, 3).map(humanise);
  const rest = keys.length - shown.length;
  return rest > 0 ? `${shown.join(', ')} and ${rest} more` : shown.join(', ');
};

const CertificateHistorySheet: React.FC<Props> = ({ open, onOpenChange, reportId, onRestored, current }) => {
  const { toast } = useToast();
  const haptic = useHaptic();
  const [rows, setRows] = useState<RevisionRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<RevisionRow | null>(null);
  const [restoring, setRestoring] = useState(false);
  const [openId, setOpenId] = useState<number | null>(null);
  const [details, setDetails] = useState<Record<number, Record<string, unknown> | 'loading' | 'error'>>({});

  const toggleDetail = (id: number) => {
    haptic.light();
    if (openId === id) {
      setOpenId(null);
      return;
    }
    setOpenId(id);
    if (details[id]) return;
    setDetails((d) => ({ ...d, [id]: 'loading' }));
    db.rpc('get_report_revision', { p_revision_id: id }).then(({ data, error: err }) => {
      setDetails((d) => ({ ...d, [id]: err ? 'error' : ((data as Record<string, unknown>) || {}) }));
    });
  };

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setRows(null);
    setError(null);
    db.rpc('list_report_revisions', { p_report_id: reportId }).then(({ data, error: err }) => {
      if (cancelled) return;
      if (err) {
        setError(err.message);
        setRows([]);
        return;
      }
      setRows((data as RevisionRow[]) || []);
    });
    return () => {
      cancelled = true;
    };
  }, [open, reportId]);

  const restore = async () => {
    if (!pending) return;
    setRestoring(true);
    try {
      const { data, error: err } = await db.rpc('restore_report_revision', {
        p_revision_id: pending.id,
      });
      if (err) throw err;
      haptic.success();
      onRestored((data as Record<string, unknown>) || {});
      toast({
        title: 'Version restored',
        description: `${describeKeys(pending.keys)} put back as ${verb(pending.keys, 'it was', 'they were')} ${formatDistanceToNow(new Date(pending.saved_at), { addSuffix: true })}. This restore is itself in the history, so it can be undone.`,
      });
      setPending(null);
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Could not restore',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setRestoring(false);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          <div className="flex flex-col h-full bg-background">
            <SheetHeader className="px-5 pt-5 pb-4 border-b border-white/[0.08] flex-shrink-0">
              <SheetTitle className="text-white text-base font-semibold text-left">
                History
              </SheetTitle>
              <p className="text-[12.5px] leading-snug text-white text-left">
                Every save that changed this certificate, newest first. Restoring puts those values
                back; the restore is recorded too, so nothing here is one-way.
              </p>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-4 py-3">
              {rows === null && (
                <div className="flex items-center gap-2 py-8 justify-center text-white">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading history
                </div>
              )}
              {error && (
                <div className="border-y border-orange-500/30 bg-orange-500/10 -mx-4 p-4 sm:mx-0 sm:rounded-2xl sm:border-x">
                  <p className="text-[13px] text-orange-300 font-semibold">
                    History is unavailable
                  </p>
                  <p className="text-[12.5px] text-white mt-1">{error}</p>
                </div>
              )}
              {rows && rows.length === 0 && !error && (
                <p className="py-8 text-center text-[13px] text-white">
                  No earlier versions yet. Versions appear from the first save that changes
                  something.
                </p>
              )}
              {rows && rows.length > 0 && (
                <ul className="divide-y divide-white/[0.08]">
                  {rows.map((r) => {
                    const at = new Date(r.saved_at);
                    const milestone = milestoneFor(r.keys);
                    const isOpen = openId === r.id;
                    const detail = details[r.id];
                    const shownKeys = r.keys.filter((k) => !k.startsWith('_'));
                    return (
                      <li key={r.id} className="py-3">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => toggleDetail(r.id)}
                            aria-expanded={isOpen}
                            className="flex min-w-0 flex-1 items-center gap-2 text-left touch-manipulation"
                          >
                            <ChevronDown
                              className={`h-4 w-4 shrink-0 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-[14px] font-semibold text-white">
                                {formatDistanceToNow(at, { addSuffix: true })}
                                <span className="ml-2 text-[11.5px] font-medium text-white">
                                  {format(at, 'd MMM, HH:mm')}
                                </span>
                                {milestone && (
                                  <span className="ml-2 rounded-md bg-elec-yellow/15 px-1.5 py-0.5 text-[10.5px] font-semibold text-elec-yellow">
                                    {milestone}
                                  </span>
                                )}
                              </p>
                              <p className="mt-0.5 truncate text-[12.5px] text-white">
                                Before this save: {describeKeys(r.keys)}
                              </p>
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              haptic.light();
                              setPending(r);
                            }}
                            className="flex h-11 shrink-0 items-center gap-1.5 rounded-xl border border-white/[0.14] bg-white/[0.05] px-3 text-[12.5px] font-semibold text-white touch-manipulation active:scale-[0.98]"
                          >
                            <RotateCcw className="h-3.5 w-3.5" />
                            Restore
                          </button>
                        </div>
                        {isOpen && (
                          <div className="mt-2 ml-6 rounded-xl border border-white/[0.1] bg-white/[0.04] px-3 py-2">
                            {detail === 'loading' || detail === undefined ? (
                              <p className="flex items-center gap-2 py-1 text-[12.5px] text-white">
                                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading what changed
                              </p>
                            ) : detail === 'error' ? (
                              <p className="py-1 text-[12.5px] text-orange-300">Could not load this version.</p>
                            ) : (
                              <ul className="divide-y divide-white/[0.06]">
                                {shownKeys.map((k) => (
                                  <li key={k} className="py-1.5 text-[12.5px]">
                                    <span className="font-semibold text-white">{humanise(k)}</span>
                                    <span className="mt-0.5 block text-white">
                                      was <span className="text-white/90">{formatValue(detail[k])}</span>
                                      {current ? (
                                        <>
                                          {' '}
                                          · now{' '}
                                          <span className="font-medium text-elec-yellow">{formatValue(current[k])}</span>
                                        </>
                                      ) : null}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={!!pending} onOpenChange={(o) => !o && !restoring && setPending(null)}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md bg-[#111114] border border-white/[0.08] rounded-2xl shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-base font-bold">
              Restore this version?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white text-sm">
              {pending
                ? `${describeKeys(pending.keys)} ${verb(pending.keys, 'goes', 'go')} back to how ${verb(pending.keys, 'it was', 'they were')} ${formatDistanceToNow(new Date(pending.saved_at), { addSuffix: true })}. Everything else stays as it is now. The certificate number never changes.`
                : ''}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                void restore();
              }}
              disabled={restoring}
              className="w-full h-11 rounded-xl bg-elec-yellow text-black font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation"
            >
              {restoring ? 'Restoring…' : 'Restore'}
            </AlertDialogAction>
            <AlertDialogCancel
              disabled={restoring}
              className="w-full h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-medium hover:bg-white/[0.08] active:scale-[0.98] transition-all touch-manipulation mt-0"
            >
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CertificateHistorySheet;
