import React, { useEffect, useRef, useState } from 'react';
import { Sheet } from '@/components/ui/sheet';
import SettingsSheetContent from '@/components/settings/SettingsSheetContent';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Eyebrow } from '@/components/college/primitives';

interface BookingAvailabilitySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
type DayWindow = { start: string; end: string } | null;
type WorkingHours = Record<DayKey, DayWindow>;

/*
 * A blocked-out period. WHOLE DAYS, `end` INCLUSIVE — "away 15th to 16th"
 * blocks both. `end` is optional and defaults to `start` for a single day.
 *
 * This is the shape `public-booking` has always read, and as of this change
 * `marketplace-available-slots` reads it the same way. Both consumers had to
 * be pinned to one reading before this UI could exist: the marketplace used to
 * treat the same rows as a raw timestamp interval, which dropped single-day
 * blocks entirely and left the last day of a range bookable.
 */
type BlackoutEntry = { start: string; end?: string; reason?: string };

const DAY_ORDER: { key: DayKey; label: string }[] = [
  { key: 'mon', label: 'Monday' },
  { key: 'tue', label: 'Tuesday' },
  { key: 'wed', label: 'Wednesday' },
  { key: 'thu', label: 'Thursday' },
  { key: 'fri', label: 'Friday' },
  { key: 'sat', label: 'Saturday' },
  { key: 'sun', label: 'Sunday' },
];

/** "15 Aug 2026" or "15–16 Aug 2026" — end is inclusive. */
function formatRange(b: BlackoutEntry): string {
  const fmt = (d: string) =>
    new Date(`${d}T00:00:00Z`).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    });
  const end = b.end && b.end !== b.start ? b.end : null;
  return end ? `${fmt(b.start)} — ${fmt(end)}` : fmt(b.start);
}

const DEFAULT_HOURS: WorkingHours = {
  mon: { start: '08:00', end: '18:00' },
  tue: { start: '08:00', end: '18:00' },
  wed: { start: '08:00', end: '18:00' },
  thu: { start: '08:00', end: '18:00' },
  fri: { start: '08:00', end: '18:00' },
  sat: null,
  sun: null,
};

const BookingAvailabilitySheet = ({ open, onOpenChange }: BookingAvailabilitySheetProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [hours, setHours] = useState<WorkingHours>(DEFAULT_HOURS);
  const [bufferMinutes, setBufferMinutes] = useState<number>(30);
  const [maxPerDay, setMaxPerDay] = useState<number>(4);
  const [minNoticeHours, setMinNoticeHours] = useState<number>(24);
  const [blackouts, setBlackouts] = useState<BlackoutEntry[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [newStart, setNewStart] = useState('');
  const [newEnd, setNewEnd] = useState('');
  const [newReason, setNewReason] = useState('');
  const [loadError, setLoadError] = useState<string | null>(null);

  // Hydrate once per open transition — read from profiles.scheduling_*.
  const hydratedForOpenRef = useRef(false);
  useEffect(() => {
    if (!open) {
      hydratedForOpenRef.current = false;
      return;
    }
    if (hydratedForOpenRef.current) return;
    hydratedForOpenRef.current = true;

    (async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          setLoadError('Not signed in');
          return;
        }
        setUserId(user.id);
        const { data, error } = await supabase
          .from('profiles')
          .select(
            'scheduling_working_hours, scheduling_buffer_minutes, scheduling_max_bookings_per_day, scheduling_min_notice_hours, scheduling_blackout_dates'
          )
          .eq('id', user.id)
          .maybeSingle();
        if (error) {
          setLoadError(error.message);
          return;
        }
        if (data?.scheduling_working_hours) {
          setHours({ ...DEFAULT_HOURS, ...(data.scheduling_working_hours as WorkingHours) });
        }
        if (typeof data?.scheduling_buffer_minutes === 'number') {
          setBufferMinutes(data.scheduling_buffer_minutes);
        }
        if (typeof data?.scheduling_max_bookings_per_day === 'number') {
          setMaxPerDay(data.scheduling_max_bookings_per_day);
        }
        if (typeof data?.scheduling_min_notice_hours === 'number') {
          setMinNoticeHours(data.scheduling_min_notice_hours);
        }
        if (Array.isArray(data?.scheduling_blackout_dates)) {
          setBlackouts(
            (data.scheduling_blackout_dates as BlackoutEntry[])
              .filter((b) => b && typeof b.start === 'string')
              .sort((a, b) => a.start.localeCompare(b.start))
          );
        }
      } catch (e) {
        setLoadError(e instanceof Error ? e.message : 'Could not load');
      }
    })();
  }, [open]);

  const addBlackout = () => {
    const start = newStart.trim();
    if (!start) {
      toast.error('Pick a start date');
      return;
    }
    const end = newEnd.trim() || start;
    if (end < start) {
      toast.error('The end date is before the start date');
      return;
    }
    // Overlaps are harmless to the booking engines (a day blocked twice is
    // still blocked) but they read as a mistake in the list, so they are
    // merged rather than stacked.
    const reason = newReason.trim();
    setBlackouts((prev) =>
      [...prev, { start, ...(end !== start ? { end } : {}), ...(reason ? { reason } : {}) }].sort(
        (a, b) => a.start.localeCompare(b.start)
      )
    );
    setNewStart('');
    setNewEnd('');
    setNewReason('');
  };

  const removeBlackout = (index: number) =>
    setBlackouts((prev) => prev.filter((_, i) => i !== index));

  const toggleDay = (day: DayKey, isOpen: boolean) => {
    setHours((prev) => ({
      ...prev,
      [day]: isOpen ? { start: '08:00', end: '18:00' } : null,
    }));
  };

  const updateDayTime = (day: DayKey, field: 'start' | 'end', value: string) => {
    setHours((prev) => {
      const current = prev[day];
      if (!current) return prev;
      return { ...prev, [day]: { ...current, [field]: value } };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Not signed in');
        return;
      }
      const { error } = await supabase
        .from('profiles')
        .update({
          scheduling_working_hours: hours,
          scheduling_buffer_minutes: bufferMinutes,
          scheduling_max_bookings_per_day: maxPerDay,
          scheduling_min_notice_hours: minNoticeHours,
          scheduling_blackout_dates: blackouts,
        })
        .eq('id', user.id);
      if (error) throw error;
      toast.success('Booking availability saved');
      onOpenChange(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SettingsSheetContent className="bg-[hsl(0_0%_12%)]">
        <div className="flex flex-col h-full bg-[hsl(0_0%_12%)]">
          <div className="lg:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <header className="px-5 sm:px-6 lg:pt-6 pb-4">
            <Eyebrow>Scheduling</Eyebrow>
            <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">
              Booking availability
            </h2>
            <p className="mt-1 text-[13px] text-white">
              Working hours, buffer between jobs and daily booking cap. Used by your public booking
              link and post-acceptance slot picker.
            </p>
          </header>

          <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6 space-y-6">
            {loadError && (
              <p className="text-[13px] text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2">
                {loadError}
              </p>
            )}

            <section className="space-y-3">
              <Eyebrow>Working hours</Eyebrow>
              <div className="rounded-xl border border-white/[0.08] divide-y divide-white/[0.06]">
                {DAY_ORDER.map(({ key, label }) => {
                  const window = hours[key];
                  const isOpen = !!window;
                  return (
                    <div key={key} className="px-3 py-3 flex items-center gap-3">
                      <Switch
                        checked={isOpen}
                        onCheckedChange={(v) => toggleDay(key, v)}
                        className="data-[state=checked]:bg-elec-yellow"
                      />
                      <Label className="w-24 text-[14px] text-white font-medium">{label}</Label>
                      {isOpen && window ? (
                        <div className="flex-1 flex items-center gap-2">
                          <Input
                            type="time"
                            value={window.start}
                            onChange={(e) => updateDayTime(key, 'start', e.target.value)}
                            className="h-10 bg-[hsl(0_0%_12%)] border-white/[0.08] text-white text-[13px] touch-manipulation"
                          />
                          <span className="text-white/40 text-[13px]">to</span>
                          <Input
                            type="time"
                            value={window.end}
                            onChange={(e) => updateDayTime(key, 'end', e.target.value)}
                            className="h-10 bg-[hsl(0_0%_12%)] border-white/[0.08] text-white text-[13px] touch-manipulation"
                          />
                        </div>
                      ) : (
                        <p className="flex-1 text-[13px] text-white/40">Closed</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/*
             * ELE-1519 — the booking link, surfaced here.
             *
             * Sean asked "is there a tab to disable a customer booking a
             * date?" — but the link itself is only reachable from the Calendar
             * kebab menu and a public quote page, so there is a fair chance he
             * had never seen it. The blocked-dates control below is meaningless
             * without knowing what it is blocking, so the link belongs on the
             * same screen.
             */}
            {userId && (
              <section className="space-y-2">
                <Eyebrow>Your booking link</Eyebrow>
                <div className="flex items-center gap-2">
                  <code className="min-w-0 flex-1 truncate rounded-xl border border-white/[0.08] bg-[hsl(0_0%_12%)] px-3 py-2.5 text-[12.5px] text-white">
                    {`${window.location.origin}/book/${userId}`}
                  </code>
                  <button
                    type="button"
                    onClick={async () => {
                      const url = `${window.location.origin}/book/${userId}`;
                      try {
                        if (navigator.share) {
                          await navigator.share({ title: 'Book a visit', url });
                        } else {
                          await navigator.clipboard.writeText(url);
                          toast.success('Booking link copied');
                        }
                      } catch {
                        /* user cancelled the share sheet */
                      }
                    }}
                    className="h-11 shrink-0 rounded-xl bg-elec-yellow px-4 text-[13px] font-semibold text-black touch-manipulation transition-[filter] active:brightness-110"
                  >
                    Share
                  </button>
                </div>
                <p className="text-[11.5px] text-white">
                  Send this to a customer and they can pick from your open slots.
                </p>
              </section>
            )}

            {/* ELE-1519 — blocked dates. The backend has honoured these since
                the schedule-on-accept migration; there was simply no way to set
                one, which is why 0 accounts had any. */}
            <section className="space-y-3">
              <Eyebrow>Blocked dates</Eyebrow>
              <p className="-mt-1 text-[12px] text-white">
                Days you are away. Customers cannot book these on your booking link.
              </p>

              {blackouts.length > 0 && (
                <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/[0.08]">
                  {blackouts.map((b, i) => (
                    <li key={`${b.start}-${i}`} className="flex items-center gap-3 px-3 py-2.5">
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-medium text-white">{formatRange(b)}</p>
                        {b.reason && <p className="text-[12px] text-white">{b.reason}</p>}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeBlackout(i)}
                        aria-label={`Remove block ${formatRange(b)}`}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition-[filter] touch-manipulation active:brightness-125"
                      >
                        <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5">
                          <path
                            d="M4 4l8 8M12 4l-8 8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-[13px] font-medium text-white">From</Label>
                  <Input
                    type="date"
                    value={newStart}
                    onChange={(e) => setNewStart(e.target.value)}
                    className="h-11 touch-manipulation border-white/[0.08] bg-[hsl(0_0%_12%)] text-white [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[13px] font-medium text-white">
                    To <span className="text-white">(optional)</span>
                  </Label>
                  <Input
                    type="date"
                    value={newEnd}
                    min={newStart || undefined}
                    onChange={(e) => setNewEnd(e.target.value)}
                    className="h-11 touch-manipulation border-white/[0.08] bg-[hsl(0_0%_12%)] text-white [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[13px] font-medium text-white">Reason (optional)</Label>
                <Input
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  placeholder="Holiday, training day…"
                  maxLength={60}
                  className="h-11 touch-manipulation border-white/[0.08] bg-[hsl(0_0%_12%)] text-white"
                />
              </div>

              <button
                type="button"
                onClick={addBlackout}
                disabled={!newStart}
                className="h-11 w-full touch-manipulation rounded-xl border border-white/[0.12] bg-white/[0.06] text-[13px] font-medium text-white transition-[filter] active:brightness-125 disabled:opacity-40"
              >
                Block these dates
              </button>
              <p className="text-[11.5px] text-white">
                Blocks apply when you save. Existing bookings on these days are not cancelled.
              </p>
            </section>

            <section className="space-y-3">
              <Eyebrow>Booking rules</Eyebrow>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-white font-medium text-[13px]">Buffer between jobs</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      min={0}
                      max={120}
                      step={15}
                      value={bufferMinutes}
                      onChange={(e) => setBufferMinutes(Number(e.target.value) || 0)}
                      className="h-11 bg-[hsl(0_0%_12%)] border-white/[0.08] text-white pr-12 touch-manipulation"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-white/40">
                      min
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-white font-medium text-[13px]">Max bookings/day</Label>
                  <Input
                    type="number"
                    min={1}
                    max={20}
                    value={maxPerDay}
                    onChange={(e) => setMaxPerDay(Number(e.target.value) || 1)}
                    className="h-11 bg-[hsl(0_0%_12%)] border-white/[0.08] text-white touch-manipulation"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-white font-medium text-[13px]">Minimum notice</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      min={0}
                      max={168}
                      value={minNoticeHours}
                      onChange={(e) => setMinNoticeHours(Number(e.target.value) || 0)}
                      className="h-11 bg-[hsl(0_0%_12%)] border-white/[0.08] text-white pr-12 touch-manipulation"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-white/40">
                      hrs
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-[12px] text-white leading-relaxed">
                Buffer adds padding before and after each existing calendar event so you have travel
                time. Min notice prevents clients booking a slot too close to now.
              </p>
            </section>
          </div>

          <div className="px-5 sm:px-6 py-4 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:brightness-110 transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </SettingsSheetContent>
    </Sheet>
  );
};

export default BookingAvailabilitySheet;
