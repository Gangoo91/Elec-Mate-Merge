import { useState, useEffect, useCallback } from 'react';
import { CalendarCheck, Loader2, Clock } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface BookJobSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
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

/**
 * Book-it-in (ELE-1351): the real booking flow behind "Won — book it".
 * Creates a calendar event linked to the job (calendar_events.job_id) and
 * sets the job's start date — the stage ladder picks it up as Booked.
 */
export const BookJobSheet = ({
  open,
  onOpenChange,
  projectId,
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

  // Conflict awareness: show what's already booked on the chosen day
  const loadDay = useCallback(async (d: string) => {
    if (!d) return;
    setLoadingDay(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase as any)
        .from('calendar_events')
        .select('id, title, start_at')
        .eq('user_id', user.id)
        .gte('start_at', new Date(`${d}T00:00:00`).toISOString())
        .lt('start_at', new Date(new Date(`${d}T00:00:00`).getTime() + 86400000).toISOString())
        .order('start_at');
      setDayEvents((data || []) as DayEvent[]);
    } finally {
      setLoadingDay(false);
    }
  }, []);

  useEffect(() => {
    if (open && date) loadDay(date);
  }, [open, date, loadDay]);

  const handleBook = async () => {
    if (!date || saving) return;
    setSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      // One event per day on site — the calendar shows the whole job, not just day 1
      const events = Array.from({ length: days }, (_, i) => {
        const dayStart = new Date(`${date}T${time}:00`);
        dayStart.setDate(dayStart.getDate() + i);
        const dayEnd = new Date(dayStart.getTime() + 8 * 3600 * 1000);
        return {
          user_id: user.id,
          title: days > 1 ? `${projectTitle} (day ${i + 1}/${days})` : projectTitle,
          description: 'Job',
          location: location || null,
          start_at: dayStart.toISOString(),
          end_at: dayEnd.toISOString(),
          job_id: projectId,
          event_type: 'job',
        };
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: inserted, error: evErr } = await (supabase as any)
        .from('calendar_events')
        .insert(events)
        .select('id');
      if (evErr) throw evErr;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: pErr } = await (supabase as any)
        .from('spark_projects')
        .update({ start_date: date })
        .eq('id', projectId);
      if (pErr) {
        // don't leave orphaned events behind a failed booking (audit P2)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase as any)
          .from('calendar_events')
          .delete()
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .in('id', ((inserted || []) as any[]).map((e) => e.id));
        throw pErr;
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
                  Already on that day
                </p>
                {loadingDay ? (
                  <Loader2 className="h-4 w-4 animate-spin text-white/40" />
                ) : dayEvents.length === 0 ? (
                  <p className="text-[12.5px] text-emerald-300">Clear — nothing booked.</p>
                ) : (
                  dayEvents.map((ev) => (
                    <p key={ev.id} className="text-[12.5px] text-white/70 flex items-center gap-1.5">
                      <Clock className="h-3 w-3 text-white/40" />
                      {new Date(ev.start_at).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}{' '}
                      — {ev.title}
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
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookJobSheet;
