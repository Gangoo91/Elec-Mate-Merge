import { useCallback, useMemo, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useTimeTracker, formatDuration, calculateValue } from '@/hooks/useTimeTracker';
import {
  useUnloggedDiaryBlocks,
  DIARY_LOOKBACK_DAYS,
  type DiaryBlock,
} from '@/hooks/useUnloggedDiaryBlocks';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/format';
import { Loader2, Check } from 'lucide-react';

/**
 * ELE-1472 — log diary blocks against a project as billable time.
 *
 * Ian Mills, 4 Aug 2026: "I am here all day for the week sort of thing" — he
 * was adding a calendar entry AND separately running a project timer. This
 * turns the entry he already made into the time log, so there is one action
 * rather than two.
 *
 * Candidates are drawn from events that are already attributed to this project
 * AND events attributed to nothing yet, because forcing him to open each diary
 * entry and tag it first would just move the second step somewhere else.
 * Logging a block attributes it at the same time.
 */

/** A working day, used only for all-day events, which carry no real hours. */
const DEFAULT_WORKING_DAY_HOURS = 8;

/** Nobody bills more than this from one diary block. A multi-day timed entry
 *  would otherwise offer its whole span — 72 hours from a three-day booking —
 *  and a mistyped correction could sail past unnoticed into an invoice. */
const MAX_LOGGABLE_HOURS = 24;

interface LogTimeFromDiarySheetProps {
  projectId: string;
  projectTitle?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called after at least one block is logged, so the caller can refresh. */
  onLogged?: () => void;
}

export function LogTimeFromDiarySheet({
  projectId,
  projectTitle,
  open,
  onOpenChange,
  onLogged,
}: LogTimeFromDiarySheetProps) {
  const { companyProfile } = useCompanyProfile();
  // Take the rate from the tracker, not from the profile directly: the tracker
  // applies a £45 fallback and is what actually gets stamped on the row. Read
  // the profile here and the preview would promise £0 while £45 was recorded.
  const { logCalendarEvent, hourlyRate } = useTimeTracker();
  const [loggingId, setLoggingId] = useState<string | null>(null);
  const [loggedIds, setLoggedIds] = useState<string[]>([]);

  // Per-block hour overrides, keyed by event id. A diary block is what was
  // PLANNED; the hours are what was WORKED, and the two differ whenever
  // someone leaves early or the day runs over. Without this the only honest
  // option would be logging the plan and calling it fact.
  const [hourOverrides, setHourOverrides] = useState<Record<string, string>>({});

  // Their actual working day where we can tell — a day rate divided by an
  // hourly rate is the length of day they price. Only 8 of 250 profiles set a
  // day rate, so most fall back to 8h.
  const workingDayHours = useMemo(() => {
    const dayRate = Number(companyProfile?.day_rate ?? 0);
    if (dayRate > 0 && hourlyRate > 0) {
      const implied = dayRate / hourlyRate;
      if (implied >= 4 && implied <= 16) return Math.round(implied * 2) / 2;
    }
    return DEFAULT_WORKING_DAY_HOURS;
  }, [companyProfile?.day_rate, hourlyRate]);

  const { data: blocks = [], isLoading, refetch } = useUnloggedDiaryBlocks(projectId, open);

  /** What the diary block itself suggests, before any correction. All-day
   *  events span midnight to midnight, so their raw duration would bill 24
   *  hours for a day's work. */
  const suggestedHours = useCallback(
    (block: DiaryBlock): number => {
      if (block.all_day) return workingDayHours;
      const ms = new Date(block.end_at).getTime() - new Date(block.start_at).getTime();
      return Math.max(0, Math.round((ms / 3600000) * 100) / 100);
    },
    [workingDayHours]
  );

  /** What will actually be logged — the correction if one was typed and parses,
   *  otherwise the suggestion. */
  const effectiveHours = useCallback(
    (block: DiaryBlock): number => {
      const raw = hourOverrides[block.id];
      if (raw !== undefined && raw.trim() !== '') {
        const parsed = parseFloat(raw);
        if (!isNaN(parsed) && parsed > 0) return Math.min(parsed, MAX_LOGGABLE_HOURS);
      }
      return suggestedHours(block);
    },
    [hourOverrides, suggestedHours]
  );

  /** Sessions are anchored to the block's start and run for the hours being
   *  logged, so a corrected figure moves the end rather than silently
   *  disagreeing with it. All-day blocks start at midnight, so they begin at
   *  08:00 instead — a logged day should not read as a night shift. */
  const startForLogging = useCallback((block: DiaryBlock): Date => {
    const start = new Date(block.start_at);
    if (block.all_day) start.setHours(8, 0, 0, 0);
    return start;
  }, []);

  const visible = useMemo(
    () => blocks.filter((b) => !loggedIds.includes(b.id)),
    [blocks, loggedIds]
  );

  const totalHours = useMemo(
    () => visible.reduce((acc, b) => acc + effectiveHours(b), 0),
    [visible, effectiveHours]
  );

  const handleLog = async (block: DiaryBlock) => {
    const hrs = effectiveHours(block);
    if (hrs <= 0) {
      toast({ title: 'Enter how long you were there', variant: 'destructive' });
      return;
    }
    const start = startForLogging(block);
    const end = new Date(start.getTime() + hrs * 3600000);

    setLoggingId(block.id);
    try {
      await logCalendarEvent({
        eventId: block.id,
        projectId,
        startedAt: start.toISOString(),
        endedAt: end.toISOString(),
        label: block.title,
        notes: block.location ? `From diary — ${block.location}` : 'From diary',
      });
      setLoggedIds((prev) => [...prev, block.id]);
      toast({
        title: 'Time logged',
        description:
          hourlyRate > 0
            ? `${formatDuration(hrs * 3600)} · ${formatCurrency(calculateValue(hrs * 3600, hourlyRate))}`
            : formatDuration(hrs * 3600),
      });
      onLogged?.();
    } catch (err) {
      toast({
        title: 'Could not log that day',
        description: err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      });
      // Something else may have logged it; re-read rather than trust our list.
      refetch();
    } finally {
      setLoggingId(null);
    }
  };

  const handleLogAll = async () => {
    // Sequential, not parallel: each write also attributes the event, and a
    // burst of concurrent writes against the same project is how you get a
    // half-applied batch that is hard to reason about afterwards.
    for (const block of visible) {
      await handleLog(block);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden"
      >
        <div className="flex flex-col h-full bg-background">
          <div className="px-4 pt-5 pb-3 border-b border-white/[0.08]">
            <h2 className="text-[17px] font-semibold tracking-tight text-white">
              Log time from your diary
            </h2>
            <p className="mt-1 text-[13px] text-white">
              {projectTitle
                ? `Turn diary entries into logged time on ${projectTitle}.`
                : 'Turn diary entries into logged time on this project.'}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-5 w-5 animate-spin text-white" />
              </div>
            ) : visible.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-[15px] font-medium text-white">Nothing left to log</p>
                <p className="mt-1.5 text-[13px] text-white">
                  Diary entries from the last {DIARY_LOOKBACK_DAYS} days show up here once they
                  have finished. Entries already logged are not offered twice.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {visible.map((block) => {
                  const hrs = effectiveHours(block);
                  const suggested = suggestedHours(block);
                  const corrected = Math.abs(hrs - suggested) > 0.01;
                  const busy = loggingId === block.id;
                  return (
                    <div
                      key={block.id}
                      className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-3.5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-semibold text-white line-clamp-2">
                            {block.title}
                          </p>
                          <p className="mt-1 text-[12px] text-white tabular-nums">
                            {new Date(block.start_at).toLocaleDateString('en-GB', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short',
                            })}
                            {' · '}
                            {block.all_day
                              ? 'All day'
                              : `${new Date(block.start_at).toLocaleTimeString('en-GB', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}–${new Date(block.end_at).toLocaleTimeString('en-GB', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}`}
                          </p>
                          {block.location && (
                            <p className="mt-0.5 text-[12px] text-white truncate">
                              {block.location}
                            </p>
                          )}
                          {block.project_id == null && (
                            <p className="mt-1 text-[11px] text-white">
                              Not yet attached to a project — logging will attach it.
                            </p>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-[15px] font-bold text-white tabular-nums leading-none">
                            {formatDuration(hrs * 3600)}
                          </p>
                          {hourlyRate > 0 && (
                            <p className="mt-1 text-[12px] text-elec-yellow tabular-nums">
                              {formatCurrency(calculateValue(hrs * 3600, hourlyRate))}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* The diary says what was planned; this says what was
                          worked. Pre-filled so the common case is one tap. */}
                      <div className="mt-3 flex items-center gap-2.5">
                        <label
                          htmlFor={`hours-${block.id}`}
                          className="text-[12px] font-medium text-white shrink-0"
                        >
                          Hours worked
                        </label>
                        <input
                          id={`hours-${block.id}`}
                          type="text"
                          inputMode="decimal"
                          value={hourOverrides[block.id] ?? String(suggested)}
                          onChange={(e) => {
                            const v = e.target.value;
                            if (v === '' || /^\d*\.?\d*$/.test(v)) {
                              setHourOverrides((prev) => ({ ...prev, [block.id]: v }));
                            }
                          }}
                          className="input-underline h-11 w-20 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none tabular-nums touch-manipulation"
                        />
                        {corrected && (
                          <button
                            type="button"
                            onClick={() =>
                              setHourOverrides((prev) => {
                                const next = { ...prev };
                                delete next[block.id];
                                return next;
                              })
                            }
                            className="text-[12px] font-medium text-white underline underline-offset-2 touch-manipulation ml-auto"
                          >
                            Reset to {suggested}h
                          </button>
                        )}
                      </div>
                      <Button
                        onClick={() => handleLog(block)}
                        disabled={busy || loggingId !== null}
                        className={cn(
                          'mt-3 w-full h-11 touch-manipulation',
                          'bg-elec-yellow text-black font-semibold hover:bg-elec-yellow/90'
                        )}
                      >
                        {busy ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Logging…
                          </>
                        ) : (
                          'Log this day'
                        )}
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {visible.length > 0 && (
            <div className="px-4 py-3 border-t border-white/[0.08] bg-background">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[12px] text-white">
                  {visible.length} {visible.length === 1 ? 'entry' : 'entries'} ·{' '}
                  {formatDuration(totalHours * 3600)}
                </span>
                {hourlyRate > 0 && (
                  <span className="text-[13px] font-semibold text-elec-yellow tabular-nums">
                    {formatCurrency(calculateValue(totalHours * 3600, hourlyRate))}
                  </span>
                )}
              </div>
              <Button
                onClick={handleLogAll}
                disabled={loggingId !== null}
                className="w-full h-11 touch-manipulation bg-white/[0.08] text-white font-semibold hover:bg-white/[0.12] border border-white/[0.12]"
              >
                {loggingId !== null ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging…
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Log all {visible.length}
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
