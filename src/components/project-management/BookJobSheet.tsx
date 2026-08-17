import { useState, useEffect, useCallback } from 'react';
import { CalendarCheck, Loader2, Clock } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { downloadIcs } from '@/utils/ics';

interface BookJobSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /**
   * ELE-1572 — one of projectId or quoteId. Booking from the quote screen
   * reuses this whole flow rather than forking it, so clash detection,
   * multi-day handling and the failed-write rollback stay in one place
   * instead of drifting between two near-identical sheets.
   */
  projectId?: string;
  quoteId?: string;
  projectTitle: string;
  location?: string | null;
  /** Called after a successful booking so the host page can refresh. */
  onBooked: () => void;
}

interface DayEvent {
  id: string;
  title: string;
  start_at: string;
}

const HOURS = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '12:00', '13:00', '14:00', '15:00'];

/** Assumed length of a day on site. */
const WORKING_DAY_HOURS = 8;

/**
 * One slot per day on site. Shared by the booking write and the .ics export so
 * the two cannot disagree about when the job actually is — they were separate
 * copies of this arithmetic, and a change to the day length in one would have
 * silently produced a calendar file that didn't match the booking.
 *
 * `setDate` rather than adding milliseconds: it preserves wall-clock start
 * time across a DST change, so an 08:00 start stays 08:00 all week.
 */
function buildSlots(date: string, time: string, days: number) {
  return Array.from({ length: days }, (_, index) => {
    const dayStart = new Date(`${date}T${time}:00`);
    dayStart.setDate(dayStart.getDate() + index);
    const dayEnd = new Date(dayStart.getTime() + WORKING_DAY_HOURS * 3600 * 1000);
    return { dayStart, dayEnd, index };
  });
}

/**
 * Book-it-in (ELE-1351): the real booking flow behind "Won — book it".
 * Creates a calendar event linked to the job (calendar_events.job_id) and
 * sets the job's start date — the stage ladder picks it up as Booked.
 */
export const BookJobSheet = ({
  open,
  onOpenChange,
  projectId,
  quoteId,
  projectTitle,
  location,
  onBooked,
}: BookJobSheetProps) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('08:00');
  const [days, setDays] = useState(1);
  const [saving, setSaving] = useState(false);
  const [dayEvents, setDayEvents] = useState<DayEvent[]>([]);
  const [loadingDay, setLoadingDay] = useState(false);

  /**
   * Conflict awareness across the WHOLE booking, not just the first day.
   *
   * This previously loaded a single day. With "on site for" offering up to 5
   * days, a week-long booking could sit straight on top of an existing job on
   * days 2–5 and the sheet would cheerfully report "Clear — nothing booked".
   * The span is what's being reserved, so the span is what gets checked.
   */
  const loadSpan = useCallback(
    async (d: string, dayCount: number) => {
      if (!d) return;
      setLoadingDay(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;
        const spanStart = new Date(`${d}T00:00:00`);
        // setDate rather than +n*86_400_000 so a DST boundary inside the span
        // doesn't shift the end by an hour and clip the last day.
        const spanEnd = new Date(spanStart);
        spanEnd.setDate(spanEnd.getDate() + dayCount);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let query = (supabase as any)
          .from('calendar_events')
          .select('id, title, start_at')
          .eq('user_id', user.id)
          .gte('start_at', spanStart.toISOString())
          .lt('start_at', spanEnd.toISOString())
          .order('start_at');

        // Don't report this job's own existing booking as a clash with itself
        // when re-booking — it is about to be replaced.
        if (quoteId) query = query.or(`quote_id.is.null,quote_id.neq.${quoteId}`);

        const { data } = await query;
        setDayEvents((data || []) as DayEvent[]);
      } finally {
        setLoadingDay(false);
      }
    },
    [quoteId]
  );

  useEffect(() => {
    if (open && date) loadSpan(date, days);
  }, [open, date, days, loadSpan]);

  /**
   * Build the same day-by-day slots the booking would create, as a .ics.
   * Deliberately does not require the job to have been booked first — someone
   * may want the slot in their phone while they think about it.
   */
  const handleDownloadIcs = () => {
    if (!date) return;
    const events = buildSlots(date, time, days).map(({ dayStart, dayEnd, index }) => ({
      // Stable per slot so re-downloading updates the existing entry rather
      // than duplicating it in the calendar.
      uid: `${quoteId || projectId || 'job'}-${index}@elec-mate.com`,
      title: days > 1 ? `${projectTitle} (day ${index + 1}/${days})` : projectTitle,
      startIso: dayStart.toISOString(),
      endIso: dayEnd.toISOString(),
      location: location || null,
    }));
    const safeName = projectTitle.replace(/[^a-z0-9]+/gi, '-').toLowerCase().slice(0, 40);
    downloadIcs(safeName || 'job', events);
  };

  const handleBook = async () => {
    if (!date || saving) return;
    // Neither subject supplied would fall through to `.eq('id', undefined)`,
    // which PostgREST turns into a malformed filter rather than an error you
    // can read. Fail loudly at the caller instead.
    if (!projectId && !quoteId) {
      console.error('BookJobSheet: needs one of projectId or quoteId');
      toast({ title: 'Nothing to book against', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      // One event per day on site — the calendar shows the whole job, not just day 1
      const slots = buildSlots(date, time, days);

      const events = slots.map(({ dayStart, dayEnd, index }) => ({
        user_id: user.id,
        title: days > 1 ? `${projectTitle} (day ${index + 1}/${days})` : projectTitle,
        description: 'Job',
        location: location || null,
        start_at: dayStart.toISOString(),
        end_at: dayEnd.toISOString(),
        // ELE-1472 — was `job_id`, which is FK'd to `employer_jobs` while
        // this is a `spark_projects` id. Every booking therefore failed with
        // a foreign key violation: 0 of 345 calendar events carry a job_id.
        // `project_id` is the Electrician Hub column added for this.
        // Null when booking from a quote (ELE-1572) — `quote_id` carries it.
        project_id: projectId ?? null,
        quote_id: quoteId ?? null,
        event_type: 'job',
      }));
      // ELE-1572 — re-booking REPLACES. The quote tile reads "Change booking"
      // once a slot exists, so a second booking must not leave the first one
      // sitting in the diary as a phantom job.
      //
      // Captured before the insert but deleted only AFTER the whole write
      // succeeds: clearing them up front would lose the existing booking if
      // the new one then failed to save.
      let supersededIds: string[] = [];
      if (quoteId) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: existing } = await (supabase as any)
          .from('calendar_events')
          .select('id')
          .eq('user_id', user.id)
          .eq('quote_id', quoteId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        supersededIds = ((existing || []) as any[]).map((e) => e.id);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: inserted, error: evErr } = await (supabase as any)
        .from('calendar_events')
        .insert(events)
        .select('id');
      if (evErr) throw evErr;

      // Record the booking on whichever record we came from. A quote stores a
      // real timestamp range (booked_slot_start/end, already on the table and
      // used by the client acceptance flow); a project stores a plain date.
      const subjectUpdate = quoteId
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (supabase as any)
            .from('quotes')
            .update({
              booked_slot_start: slots[0].dayStart.toISOString(),
              booked_slot_end: slots[slots.length - 1].dayEnd.toISOString(),
            })
            .eq('id', quoteId)
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (supabase as any)
            .from('spark_projects')
            .update({ start_date: date })
            .eq('id', projectId);

      if (subjectUpdate.error) {
        // don't leave orphaned events behind a failed booking (audit P2)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase as any)
          .from('calendar_events')
          .delete()
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .in('id', ((inserted || []) as any[]).map((e) => e.id));
        throw subjectUpdate.error;
      }

      // Safe to drop the previous booking now the replacement is committed.
      // A failure here leaves duplicates rather than a lost booking, which is
      // the right way round to fail — so it warns instead of throwing.
      if (supersededIds.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error: cleanupErr } = await (supabase as any)
          .from('calendar_events')
          .delete()
          .in('id', supersededIds);
        if (cleanupErr) {
          console.warn('Could not remove the previous booking:', cleanupErr);
        }
      }

      toast({
        title: 'Booked in',
        description: `${new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
        })} at ${time}`,
      });
      onOpenChange(false);
      onBooked();
    } catch (err) {
      console.error('Booking failed:', err);
      toast({ title: 'Could not book the job', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        hideCloseButton
        className="rounded-t-2xl p-0 overflow-hidden max-h-[85vh]"
      >
        <div className="bg-background px-5 pt-3 pb-[max(20px,env(safe-area-inset-bottom))] overflow-y-auto">
          <div className="mx-auto h-1 w-10 rounded-full bg-white/[0.15] mb-3" />
          <div className="flex items-center gap-3 pb-3 mb-4 border-b border-white/[0.08]">
            <span className="h-9 w-9 rounded-xl bg-elec-yellow/[0.10] border border-elec-yellow/20 flex items-center justify-center">
              <CalendarCheck className="h-4 w-4 text-elec-yellow" />
            </span>
            <div className="min-w-0">
              <SheetTitle className="text-[15px] font-semibold text-white truncate text-left">
                Book it in
              </SheetTitle>
              <p className="text-[11.5px] text-white/55 truncate">{projectTitle}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white mb-1.5 block">Start date</label>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-elec-gray border border-white/30 text-white text-base touch-manipulation focus:border-yellow-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white mb-1.5 block">Start time</label>
              <div className="flex gap-1.5 overflow-x-auto scrollbar-none -mx-5 px-5">
                {HOURS.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setTime(h)}
                    className={cn(
                      'flex-shrink-0 h-10 px-3.5 rounded-full border text-[13px] font-medium touch-manipulation tabular-nums',
                      time === h
                        ? 'bg-elec-yellow/[0.12] border-elec-yellow/[0.35] text-elec-yellow'
                        : 'bg-white/[0.04] border-white/[0.08] text-white/70'
                    )}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-white mb-1.5 block">On site for</label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 5].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDays(d)}
                    className={cn(
                      'h-10 rounded-xl border text-[13px] font-medium touch-manipulation',
                      days === d
                        ? 'bg-elec-yellow text-black border-elec-yellow'
                        : 'bg-white/[0.04] border-white/[0.08] text-white/70'
                    )}
                  >
                    {d} day{d === 1 ? '' : 's'}
                  </button>
                ))}
              </div>
            </div>

            {/* What's already on that day */}
            {date && (
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45 mb-1.5">
                  {days > 1 ? `Already booked across those ${days} days` : 'Already on that day'}
                </p>
                {loadingDay ? (
                  <Loader2 className="h-4 w-4 animate-spin text-white/40" />
                ) : dayEvents.length === 0 ? (
                  <p className="text-[12.5px] text-emerald-300">Clear — nothing booked.</p>
                ) : (
                  dayEvents.map((ev) => (
                    <p key={ev.id} className="text-[12.5px] text-white/70 flex items-center gap-1.5">
                      <Clock className="h-3 w-3 shrink-0 text-white/40" />
                      <span className="truncate">
                        {/* Across a multi-day span the time alone is ambiguous —
                            "08:00 — Rewire" on which of the five days? */}
                        {new Date(ev.start_at).toLocaleString('en-GB', {
                          ...(days > 1 ? { weekday: 'short', day: 'numeric', month: 'short' } : {}),
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        — {ev.title}
                      </span>
                    </p>
                  ))
                )}
              </div>
            )}

            <button
              type="button"
              onClick={handleBook}
              disabled={!date || saving}
              className="w-full h-12 rounded-xl bg-elec-yellow text-black text-base font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-40"
            >
              {saving ? 'Booking…' : 'Book the job'}
            </button>

            {/* ELE-1572 — booking already lands in the Elec-Mate diary and in
                any calendar subscribed to the iCal feed. This is for the
                separate case of wanting it in the phone's own calendar right
                now. Kept as an explicit choice rather than firing a download
                off the back of every booking. */}
            <button
              type="button"
              onClick={handleDownloadIcs}
              disabled={!date}
              className="w-full h-11 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[13.5px] font-semibold text-white touch-manipulation active:scale-[0.98] disabled:opacity-40"
            >
              Add to my phone calendar
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookJobSheet;
