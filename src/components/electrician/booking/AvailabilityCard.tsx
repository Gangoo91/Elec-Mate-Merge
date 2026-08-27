import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { cardCn, chipBase, chipOff, chipOn, eyebrowCn } from '@/components/shared/surfaceStyles';
import { inputCn, labelCn } from '@/components/forms/fieldStyles';
import { toast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import {
  DAY_ORDER,
  SLOT_LENGTHS,
  useSaveBookingSettings,
  type Blackout,
  type BookingSettings,
  type DayKey,
} from '@/hooks/useBookingSettings';

const prettyDate = (d: string) =>
  new Date(`${d}T12:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

/**
 * The rules the public booking page runs on, on the page itself.
 *
 * Everything here already existed behind Settings → Business except the
 * blackout dates, which the booking edge function has always read and which
 * nothing has ever written. The Settings sheet still works and writes the same
 * columns; this is the copy an electrician will actually find.
 */
const AvailabilityCard = ({ settings }: { settings: BookingSettings }) => {
  const save = useSaveBookingSettings();
  const [draft, setDraft] = useState<BookingSettings>(settings);
  const [newStart, setNewStart] = useState('');
  const [newEnd, setNewEnd] = useState('');

  // Re-seed when the saved settings arrive or change underneath us — but not
  // while a save is in flight, which would flicker the form back.
  useEffect(() => {
    if (!save.isPending) setDraft(settings);
  }, [settings, save.isPending]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(settings);

  const toggleDay = (day: DayKey) =>
    setDraft((p) => ({
      ...p,
      hours: { ...p.hours, [day]: p.hours[day] ? null : { start: '08:00', end: '18:00' } },
    }));

  const setDayTime = (day: DayKey, field: 'start' | 'end', value: string) =>
    setDraft((p) => {
      const w = p.hours[day];
      if (!w) return p;
      return { ...p, hours: { ...p.hours, [day]: { ...w, [field]: value } } };
    });

  const addBlackout = () => {
    if (!newStart) return;
    // An end before the start would silently never match — the edge function
    // tests `date >= start && date <= end`. Swap rather than reject.
    const [start, end] = newEnd && newEnd < newStart ? [newEnd, newStart] : [newStart, newEnd];
    const entry: Blackout = { start, ...(end && end !== start ? { end } : {}) };
    setDraft((p) => ({ ...p, blackouts: [...p.blackouts, entry] }));
    setNewStart('');
    setNewEnd('');
  };

  // The first open day, whose hours the "use everywhere" shortcut copies.
  const firstOpenEntry = DAY_ORDER.find(({ key }) => !!draft.hours[key]);
  const firstOpen = firstOpenEntry
    ? { key: firstOpenEntry.key, window: draft.hours[firstOpenEntry.key]! }
    : null;

  // At least two open days, not already all on the same hours.
  const openWindows = DAY_ORDER.map(({ key }) => draft.hours[key]).filter(Boolean);
  const openDaysDiffer =
    openWindows.length > 1 &&
    openWindows.some((w) => w!.start !== openWindows[0]!.start || w!.end !== openWindows[0]!.end);

  const applyToAllOpenDays = () => {
    if (!firstOpen) return;
    setDraft((p) => ({
      ...p,
      // Closed days stay closed — this copies the hours, not the week shape.
      hours: DAY_ORDER.reduce(
        (acc, { key }) => ({ ...acc, [key]: p.hours[key] ? { ...firstOpen.window } : null }),
        {} as typeof p.hours
      ),
    }));
  };

  const removeBlackout = (i: number) =>
    setDraft((p) => ({ ...p, blackouts: p.blackouts.filter((_, idx) => idx !== i) }));

  const handleSave = () => {
    save.mutate(draft, {
      onSuccess: () => toast({ title: 'Booking availability saved' }),
      onError: (e) =>
        toast({
          title: 'Could not save',
          description: e instanceof Error ? e.message : 'Try again',
          variant: 'destructive',
        }),
    });
  };

  return (
    <section className={cn(cardCn, 'p-4 sm:p-5')}>
      <span className={cn(eyebrowCn, 'block')}>Availability</span>
      <h2 className="mt-1.5 text-[17px] font-semibold tracking-tight text-white">
        When people can book you
      </h2>

      {/* ── Working hours ─────────────────────────────────────────── */}
      <div className="mt-4 space-y-0.5">
        {DAY_ORDER.map(({ key, label, short }) => {
          const window = draft.hours[key];
          return (
            <div key={key} className="flex items-center gap-2.5 py-1 sm:gap-3">
              <span className="w-9 shrink-0 text-[13px] font-medium text-white sm:w-[4.5rem]">
                <span className="sm:hidden">{short}</span>
                <span className="hidden sm:inline">{label}</span>
              </span>

              <button
                type="button"
                onClick={() => toggleDay(key)}
                className={cn(
                  chipBase,
                  'h-9 w-[4.5rem] shrink-0 justify-center px-0 text-[12.5px]',
                  window ? chipOn : chipOff
                )}
              >
                {window ? 'Open' : 'Closed'}
              </button>

              {/* Fixed-width time fields.
                  These were `flex-1`, which on a desktop card stretched a
                  four-character time across 600px with its picker icon marooned
                  at the far edge. A time input never needs more room than the
                  time. */}
              {window ? (
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={window.start}
                    onChange={(e) => setDayTime(key, 'start', e.target.value)}
                    className={cn(inputCn, 'w-[6.5rem] shrink-0 text-[13.5px]')}
                  />
                  <span className="shrink-0 text-[12px] text-white">to</span>
                  <input
                    type="time"
                    value={window.end}
                    onChange={(e) => setDayTime(key, 'end', e.target.value)}
                    className={cn(inputCn, 'w-[6.5rem] shrink-0 text-[13.5px]')}
                  />
                </div>
              ) : (
                <span className="text-[13px] text-white">Not taking bookings</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Setting the same hours seven times over is the commonest thing anyone
          will do here, and it was seven pairs of fiddly time fields. */}
      {/* Only worth offering when there is more than one open day AND they
          don't already match — otherwise it is a button that does nothing. */}
      {firstOpen && openDaysDiffer && (
        <button
          type="button"
          onClick={applyToAllOpenDays}
          className="mt-2 min-h-11 text-[13px] font-semibold text-elec-yellow transition-opacity hover:opacity-80 touch-manipulation"
        >
          Use {firstOpen.window.start}–{firstOpen.window.end} on every open day
        </button>
      )}

      {/* ── Slot length ───────────────────────────────────────────── */}
      <div className="mt-5 border-t border-white/[0.1] pt-4">
        <h3 className="text-sm font-semibold text-white">How long is each booking</h3>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {SLOT_LENGTHS.map((mins) => (
            <button
              key={mins}
              type="button"
              onClick={() => setDraft((p) => ({ ...p, slotMinutes: mins }))}
              className={cn(
                chipBase,
                'h-10 px-4 text-[13px]',
                draft.slotMinutes === mins ? chipOn : chipOff
              )}
            >
              {mins < 60 ? `${mins} min` : `${mins / 60} hr${mins > 60 ? 's' : ''}`}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[12px] leading-snug text-white">
          Every booking was fixed at an hour, on this page and on the slot picker clients get
          after accepting a quote. Slots run back to back from your opening time.
        </p>
      </div>

      {/* ── Booking rules ─────────────────────────────────────────── */}
      <div className="mt-5 border-t border-white/[0.1] pt-4">
        <h3 className="text-sm font-semibold text-white">Booking rules</h3>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className={labelCn}>Buffer between jobs (minutes)</label>
            <input
              type="number"
              min={0}
              max={120}
              step={15}
              value={draft.bufferMinutes}
              onChange={(e) =>
                setDraft((p) => ({ ...p, bufferMinutes: Number(e.target.value) || 0 }))
              }
              className={inputCn}
            />
          </div>
          <div>
            <label className={labelCn}>Most bookings in a day</label>
            <input
              type="number"
              min={1}
              max={20}
              value={draft.maxPerDay}
              onChange={(e) => setDraft((p) => ({ ...p, maxPerDay: Number(e.target.value) || 1 }))}
              className={inputCn}
            />
          </div>
          <div>
            <label className={labelCn}>Least notice (hours)</label>
            <input
              type="number"
              min={0}
              max={168}
              value={draft.minNoticeHours}
              onChange={(e) =>
                setDraft((p) => ({ ...p, minNoticeHours: Number(e.target.value) || 0 }))
              }
              className={inputCn}
            />
          </div>
        </div>
        <p className="mt-2 text-[12px] leading-snug text-white">
          The buffer pads either side of everything already in your diary so you have travel time.
          Notice stops someone booking you for an hour from now.
        </p>
      </div>

      {/* ── Confirming to the customer ────────────────────────────── */}
      <div className="mt-5 border-t border-white/[0.1] pt-4">
        <h3 className="text-sm font-semibold text-white">When someone books</h3>
        <label className="mt-3 flex cursor-pointer items-center justify-between gap-4">
          <span className="min-w-0">
            <span className="block text-[13.5px] font-medium text-white">
              Email them a confirmation
            </span>
            <span className="mt-0.5 block text-[12px] leading-snug text-white">
              Sends straight away, with a calendar file they can tap to add the job to their own
              diary. Off unless you turn it on.
            </span>
          </span>
          <Switch
            checked={draft.autoConfirm}
            onCheckedChange={(v) => setDraft((p) => ({ ...p, autoConfirm: v }))}
          />
        </label>
        {/* Said plainly. This is the ONLY thing in the app that emails a
            customer without the electrician pressing send, and someone who
            does not realise that will be surprised in the worst possible
            place — in front of a client. */}
        <p className="mt-2 text-[12px] leading-snug text-white">
          It goes out under your name, from your details, and replies come back to you. Everywhere
          else in the app you press send yourself.
        </p>
      </div>

      {/* ── Blackout dates ────────────────────────────────────────── */}
      <div className="mt-5 border-t border-white/[0.1] pt-4">
        <h3 className="text-sm font-semibold text-white">Days off</h3>
        <p className="mt-1 text-[12px] leading-snug text-white">
          Holidays and anything else the page must not offer. Leave the second date empty for a
          single day.
        </p>

        {draft.blackouts.length > 0 && (
          <div className="mt-3 divide-y divide-white/[0.08] rounded-xl border border-white/[0.12]">
            {draft.blackouts.map((b, i) => (
              <div key={`${b.start}-${b.end ?? ''}-${i}`} className="flex items-center gap-3 px-3.5 py-2.5">
                <span className="min-w-0 flex-1 text-[13.5px] text-white">
                  {b.end && b.end !== b.start
                    ? `${prettyDate(b.start)} — ${prettyDate(b.end)}`
                    : prettyDate(b.start)}
                </span>
                <button
                  type="button"
                  onClick={() => removeBlackout(i)}
                  className="h-9 shrink-0 rounded-lg px-2.5 text-[12.5px] font-semibold text-elec-yellow transition-opacity hover:opacity-80 touch-manipulation"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end">
          <div className="min-w-0 flex-1">
            <label className={labelCn}>From</label>
            <input
              type="date"
              value={newStart}
              onChange={(e) => setNewStart(e.target.value)}
              className={inputCn}
            />
          </div>
          <div className="min-w-0 flex-1">
            <label className={labelCn}>To (optional)</label>
            <input
              type="date"
              value={newEnd}
              onChange={(e) => setNewEnd(e.target.value)}
              className={inputCn}
            />
          </div>
          <button
            type="button"
            onClick={addBlackout}
            disabled={!newStart}
            className="h-11 shrink-0 rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 text-[13.5px] font-semibold text-white transition-colors hover:bg-white/[0.10] touch-manipulation disabled:opacity-40"
          >
            Add
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={!dirty || save.isPending}
        className="mt-5 h-12 w-full rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation disabled:opacity-40"
      >
        {save.isPending ? 'Saving…' : dirty ? 'Save changes' : 'Saved'}
      </button>
    </section>
  );
};

export default AvailabilityCard;
