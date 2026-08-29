import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Check,
  CalendarDays,
  CalendarClock,
  Loader2,
  AlertCircle,
  ChevronLeft,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlacesAutocomplete } from '@/components/ui/PlacesAutocomplete';
import { GoogleMapsProvider } from '@/contexts/GoogleMapsContext';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, supabase } from '@/integrations/supabase/client';

interface Slot {
  date: string;
  start: string;
  end: string;
}

interface ElectricianInfo {
  name: string;
  company: string | null;
}

interface Branding {
  logo_url: string | null;
  primary_color: string | null;
}

/**
 * The three lengths a visitor can book, matching the server's fixed
 * vocabulary — the page names a KIND, never a number of minutes, so a public
 * client can never invent its own duration.
 */
type DurationKind = 'slot' | 'half_day' | 'full_day';

type Step = 'loading' | 'error' | 'date' | 'time' | 'details' | 'confirmed';
type TimePreference = 'morning' | 'afternoon' | 'flexible';

const TIME_PREFERENCES: { value: TimePreference; label: string; hint: string }[] = [
  { value: 'morning', label: 'Morning', hint: 'Before dinner time' },
  { value: 'afternoon', label: 'Afternoon', hint: 'After dinner time' },
  { value: 'flexible', label: "I'm flexible", hint: 'Whatever suits you' },
];

function formatUKPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 5) return digits;
  if (digits.length <= 8) return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  return `${digits.slice(0, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 11)}`;
}

/**
 * The client-facing booking page.
 *
 * Two flows through one page:
 *
 * **Booking link** (no `?quote=`) — someone wants an electrician out. They
 * pick a real slot and it goes straight in the diary. An hour is the right
 * unit for a call-out and this flow is unchanged.
 *
 * **Quote acceptance** (`?quote=`) — ELE-1513. This used to offer the same
 * hour grid, which was wrong: 13 of 751 accepted quotes ever used it, flat
 * across every job size, because somebody who has just signed a 206-hour job
 * does not pick a Tuesday 2pm. Deriving the length from the quote was not an
 * option either — 63% of accepted quotes carry no hour-priced labour, and
 * where hours exist they are a cost measure, not elapsed time. So the client
 * says when they would like to start and the electrician confirms.
 */
// The app's underline field — bottom border only, yellow caret, no ring.
const underlineCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] ' +
  'bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 ' +
  'caret-elec-yellow shadow-none transition-colors hover:border-white/[0.3] ' +
  'focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none ' +
  '[color-scheme:dark] touch-manipulation';

const PublicBooking = () => {
  const { electricianId } = useParams<{ electricianId: string }>();
  // ELE-955 — arriving from a quote-acceptance handoff, the URL carries
  // `?quote=<uuid>`. That is also what selects the start-date flow.
  const [searchParams] = useSearchParams();
  const quoteId = searchParams.get('quote');
  // Loop-closers from reminder emails: booking from a renewal reminder
  // (?rid=…) marks that renewal BOOKED in the electrician's pipeline; from a
  // maintenance-visit reminder (?visit=…) it links the diary event to the
  // visit. Passed through verbatim; the server validates ownership.
  const renewalId = searchParams.get('rid');
  const visitId = searchParams.get('visit');
  const isQuoteFlow = !!quoteId;

  const [step, setStep] = useState<Step>('loading');
  const [error, setError] = useState('');
  const [electrician, setElectrician] = useState<ElectricianInfo | null>(null);
  const [branding, setBranding] = useState<Branding | null>(null);
  const [slotMinutes, setSlotMinutes] = useState(60);
  const [duration, setDuration] = useState<DurationKind>('slot');
  const [slots, setSlots] = useState<Slot[]>([]);
  const [openDates, setOpenDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [preference, setPreference] = useState<TimePreference>('flexible');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmedSlot, setConfirmedSlot] = useState<Slot | null>(null);
  const [confirmedRequest, setConfirmedRequest] = useState<{
    date: string;
    preference: TimePreference;
  } | null>(null);
  const [quoteNumber, setQuoteNumber] = useState<string | null>(null);
  /** An earlier request or confirmed booking already on this quote. */
  const [alreadySettled, setAlreadySettled] = useState<{
    kind: 'requested' | 'booked' | 'proposed';
    date: string;
    preference?: TimePreference;
    /** ELE-1562 — the day they originally asked for, when kind is 'proposed'. */
    theirDate?: string;
    note?: string | null;
  } | null>(null);
  /** Set when the client chooses to change what they asked for. */
  const [overrideSettled, setOverrideSettled] = useState(false);

  const refreshSlots = useCallback(async () => {
    if (!electricianId) return;
    try {
      // 28 days for a straight booking (a fortnight was tight for anyone
      // planning ahead), 56 for a start-date request. The server now honours
      // both — it used to silently cap the quote flow's 56 at 30.
      const url = `${SUPABASE_URL}/functions/v1/public-booking?electrician_id=${electricianId}&days=${isQuoteFlow ? 56 : 28}&duration=${duration}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to load availability');
      }

      const result = await res.json();
      setElectrician(result.electrician);
      setBranding(result.branding || null);
      if (Number(result.slot_minutes) > 0) setSlotMinutes(Number(result.slot_minutes));
      setSlots(result.slots || []);
      setOpenDates(result.open_dates || []);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load availability');
      return false;
    }
  }, [electricianId, isQuoteFlow, duration]);

  useEffect(() => {
    refreshSlots().then((ok) => {
      if (ok) setStep('date');
      else setStep('error');
    });
  }, [refreshSlots]);

  // ELE-955 — pre-fill from the linked quote. Best-effort: a failure just
  // leaves the fields blank for the client to fill in.
  useEffect(() => {
    if (!quoteId) return;
    let cancelled = false;
    (async () => {
      try {
        const { data, error: rpcErr } = await supabase.rpc('get_public_quote_for_booking', {
          quote_id_param: quoteId,
        });
        if (rpcErr || cancelled) return;
        /*
         * Cast through `unknown`: the generated Supabase types are a snapshot
         * and do not yet carry the three `proposed_*` columns this RPC now
         * returns. Regenerating types.ts is a 40k-line diff on a file other
         * work is touching, so the shape is asserted locally instead.
         */
        const row = (Array.isArray(data) ? data[0] : data) as unknown as
          | {
              client_name: string | null;
              client_phone: string | null;
              client_email: string | null;
              job_title: string | null;
              job_location: string | null;
              quote_number: string | null;
              booked_slot_start: string | null;
              requested_start_date: string | null;
              requested_time_preference: TimePreference | null;
              proposed_start_date: string | null;
              proposed_at: string | null;
              proposed_note: string | null;
            }
          | null;
        if (!row) return;

        /*
         * What has already happened on this quote.
         *
         * The RPC has always returned `booked_slot_start` and the page ignored
         * it, so a client who had already booked came back to a blank form and
         * could book twice. Now a return visit shows where things stand rather
         * than inviting a second submission.
         */
        if (row.booked_slot_start) {
          setAlreadySettled({ kind: 'booked', date: row.booked_slot_start });
        } else if (row.proposed_start_date) {
          /*
           * ELE-1562 — the electrician could not do the day they picked and
           * has offered another. That is the newer move, so it outranks the
           * client's own request: showing "you asked for the 26th" when he has
           * already come back with the 2nd would be a conversation a step
           * behind.
           */
          setAlreadySettled({
            kind: 'proposed',
            date: row.proposed_start_date,
            theirDate: row.requested_start_date || undefined,
            note: row.proposed_note,
          });
        } else if (row.requested_start_date) {
          setAlreadySettled({
            kind: 'requested',
            date: row.requested_start_date,
            preference: row.requested_time_preference || 'flexible',
          });
        }
        if (row.client_name) setName(row.client_name);
        if (row.client_phone) setPhone(formatUKPhone(row.client_phone));
        if (row.client_email) setEmail(row.client_email);
        if (row.job_location) setAddress(row.job_location);
        if (row.job_title) setJobDescription(row.job_title);
        if (row.quote_number) setQuoteNumber(row.quote_number);
      } catch {
        /* non-fatal */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [quoteId]);

  /*
   * Which dates the client may choose.
   *
   * The start-date flow uses `open_dates` — every day the electrician works
   * and is not away — because it is asking when to BEGIN, and whether an hour
   * happens to be free that morning has no bearing on that. The slot flow
   * uses the dates that actually have slots.
   */
  const availableDates = useMemo(
    () => (isQuoteFlow ? openDates : Array.from(new Set(slots.map((s) => s.date))).sort()),
    [isQuoteFlow, openDates, slots]
  );

  const dateSlots = useMemo(
    () => (selectedDate ? slots.filter((s) => s.date === selectedDate) : []),
    [slots, selectedDate]
  );

  const formatDate = useCallback((dateStr: string) => {
    const d = new Date(dateStr + 'T12:00:00');
    return {
      dayName: d.toLocaleDateString('en-GB', { weekday: 'short' }),
      dayNum: d.getDate(),
      month: d.toLocaleDateString('en-GB', { month: 'short' }),
      full: d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }),
    };
  }, []);

  const stepLabel = useMemo(() => {
    const total = isQuoteFlow ? 2 : 3;
    if (step === 'date') return `1 of ${total}`;
    if (step === 'time') return `2 of ${total}`;
    if (step === 'details') return `${total} of ${total}`;
    return null;
  }, [step, isQuoteFlow]);

  /*
   * The days grouped into calendar weeks with a human label. A horizontal
   * strip of 28 day chips showed five at a time and hid the rest behind a
   * scroll nobody discovers — weeks read the way people actually plan:
   * "can you do something next week?".
   */
  const weekGroups = useMemo(() => {
    const mondayOf = (dateStr: string) => {
      const d = new Date(dateStr + 'T12:00:00');
      d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
      return d;
    };
    const thisMonday = mondayOf(new Date().toISOString().slice(0, 10)).getTime();
    const groups: Array<{ label: string; dates: string[] }> = [];
    for (const dateStr of availableDates) {
      const mon = mondayOf(dateStr);
      const diffWeeks = Math.round((mon.getTime() - thisMonday) / (7 * 24 * 3600 * 1000));
      const label =
        diffWeeks <= 0
          ? 'This week'
          : diffWeeks === 1
            ? 'Next week'
            : `Week of ${mon.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}`;
      const last = groups[groups.length - 1];
      if (last && last.label === label) last.dates.push(dateStr);
      else groups.push({ label, dates: [dateStr] });
    }
    return groups;
  }, [availableDates]);

  /**
   * Changing the job size restarts the choice — the slots for a full day are
   * different animals from the hour grid, so a selection made under the old
   * length cannot survive. The effect above refetches automatically.
   */
  const handleDurationChange = (next: DurationKind) => {
    if (next === duration) return;
    setDuration(next);
    setSelectedDate(null);
    setSelectedSlot(null);
    setError('');
    if (step === 'time' || step === 'details') setStep('date');
  };

  const handleBack = () => {
    setError('');
    if (step === 'details') {
      if (isQuoteFlow || duration === 'full_day') {
        // Full-day bookings skip the time step — a day IS the slot.
        setSelectedSlot(null);
        setStep('date');
      } else {
        setSelectedSlot(null);
        setStep('time');
      }
    } else if (step === 'time') {
      setSelectedDate(null);
      setStep('date');
    }
  };

  /** UK mobile/landline to E.164, which is what the customer record stores. */
  const normalisedPhone = () => {
    const digits = phone.replace(/\D/g, '');
    if (digits.startsWith('0')) return `+44${digits.slice(1)}`;
    if (digits.startsWith('44')) return `+${digits}`;
    return phone.trim();
  };

  const validateDetails = () => {
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid phone number');
      return false;
    }
    return true;
  };

  /** Start-date request — nothing is reserved; the electrician confirms. */
  const handleRequestStartDate = async () => {
    if (!selectedDate || !name.trim() || !phone.trim() || !electricianId || !quoteId) return;
    if (!validateDetails()) return;

    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/public-booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          mode: 'request',
          electrician_id: electricianId,
          quote_id: quoteId,
          requested_date: selectedDate,
          time_preference: preference,
          client_name: name.trim(),
          client_phone: normalisedPhone(),
          client_email: email.trim() || undefined,
          client_address: address.trim() || undefined,
          job_description: jobDescription.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Could not send your request');
      }

      setConfirmedRequest({ date: selectedDate, preference });
      setStep('confirmed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send your request');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBook = async () => {
    if (!selectedSlot || !name.trim() || !phone.trim() || !electricianId) return;
    if (!validateDetails()) return;

    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/public-booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          electrician_id: electricianId,
          date: selectedSlot.date,
          start_time: selectedSlot.start,
          duration,
          renewal_id: renewalId || undefined,
          visit_id: visitId || undefined,
          client_name: name.trim(),
          client_phone: normalisedPhone(),
          client_email: email.trim() || undefined,
          client_address: address.trim() || undefined,
          job_description: jobDescription.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        // Someone else took it while this form was open.
        if (res.status === 409) {
          setSelectedSlot(null);
          setStep('time');
          await refreshSlots();
        }
        throw new Error(errData.error || 'Booking failed');
      }

      setConfirmedSlot(selectedSlot);
      setStep('confirmed');
      refreshSlots();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBookAnother = () => {
    setSelectedDate(null);
    setSelectedSlot(null);
    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setJobDescription('');
    setConfirmedSlot(null);
    setError('');
    setStep('date');
  };

  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        <p className="text-sm text-white">Loading…</p>
      </div>
    );
  }

  if (step === 'error') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 gap-4">
        <AlertCircle className="h-12 w-12 text-red-400" />
        <p className="text-white text-center text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="h-11 px-6 rounded-xl bg-white/5 border border-white/10 text-white font-medium touch-manipulation"
        >
          Try again
        </button>
      </div>
    );
  }

  const who = electrician?.company || electrician?.name || 'your electrician';

  /*
   * Suppress the form when this quote is already settled.
   *
   * Not applied after a fresh submission (`step === 'confirmed'`) — that
   * screen is its own confirmation — nor once the client has chosen to change
   * the date they asked for.
   */
  const showSettled = !!alreadySettled && !overrideSettled && step !== 'confirmed';

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>
          {isQuoteFlow ? 'Arrange your start date' : 'Book an appointment'}
          {electrician ? ` with ${electrician.name}` : ''} | Elec-Mate
        </title>
        <meta
          name="description"
          content={
            isQuoteFlow
              ? 'Tell your electrician when you would like the work to start.'
              : 'Book a time with your electrician.'
          }
        />
      </Helmet>

      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          {(step === 'time' || step === 'details') && (
            <button
              onClick={handleBack}
              aria-label="Back"
              className="p-1.5 rounded-lg touch-manipulation active:bg-white/10 -ml-1"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
          )}
          {branding?.logo_url ? (
            // Their brand, not ours — the customer is booking THEIR
            // electrician, and the page should look like it belongs to them.
            <img
              src={branding.logo_url}
              alt=""
              className="h-10 w-10 rounded-lg object-contain bg-white/[0.06] p-0.5"
            />
          ) : (
            <div className="p-2 rounded-lg bg-elec-yellow/10">
              <CalendarDays className="h-5 w-5 text-elec-yellow" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-white truncate">
              {electrician?.name || 'Electrician'}
            </h1>
            {electrician?.company && (
              <p className="text-sm text-white truncate">{electrician.company}</p>
            )}
          </div>
          {stepLabel && (
            <span className="text-[11px] font-medium bg-white/10 text-white px-2 py-0.5 rounded-full flex-shrink-0">
              Step {stepLabel}
            </span>
          )}
        </div>
      </div>

      <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* ELE-1512 — the quote banner used to read "pick a time and we'll
            lock it in" on every screen including the confirmation, long after
            the client had picked. It now only appears while there is still
            something to do. */}
        {quoteNumber && step !== 'confirmed' && !showSettled && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2.5">
            <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-white">
              Thanks for accepting quote{' '}
              <span className="font-semibold text-emerald-300">{quoteNumber}</span>. Let{' '}
              {electrician?.name || 'your electrician'} know when you'd like the work to start.
            </p>
          </div>
        )}

        {error && step !== 'error' && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="flex-1 text-sm text-white">{error}</p>
            <button
              onClick={() => setError('')}
              className="text-xs text-white font-medium touch-manipulation px-2 py-0.5"
            >
              Dismiss
            </button>
          </div>
        )}

        {/*
          Already sorted. Shown instead of the form so a client returning to
          the link — from the same email, days later — sees where things stand
          rather than a blank slate inviting a duplicate.
        */}
        {showSettled && alreadySettled!.kind === 'proposed' && (
          /*
           * ELE-1562 — the electrician cannot do the day they picked and has
           * offered another. Deliberately NOT the green tick used by the other
           * two states: nothing is settled here, it needs a decision. Leads
           * with the new date rather than the refusal, and accepting is one
           * tap because that is the outcome everyone wants.
           */
          <div className="space-y-4 py-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/20">
              <CalendarClock className="h-7 w-7 text-amber-300" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">A different day is needed</h2>
              <p className="text-white">
                {who} can't make{' '}
                {alreadySettled!.theirDate
                  ? formatDate(alreadySettled!.theirDate).full
                  : 'the day you picked'}
                , but can do{' '}
                <strong className="text-elec-yellow">
                  {formatDate(alreadySettled!.date).full}
                </strong>
                .
              </p>
              {alreadySettled!.note && (
                <p className="mx-auto max-w-sm rounded-xl border border-white/[0.12] bg-white/[0.06] p-3 text-sm text-white">
                  “{alreadySettled!.note}”
                </p>
              )}
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setSelectedDate(alreadySettled!.date);
                  setOverrideSettled(true);
                  setStep('details');
                }}
                className="min-h-12 w-full rounded-xl bg-elec-yellow px-5 text-[15px] font-semibold text-black touch-manipulation"
              >
                Yes, {formatDate(alreadySettled!.date).full} works
              </button>
              <button
                onClick={() => setOverrideSettled(true)}
                className="min-h-11 w-full text-sm font-medium text-elec-yellow touch-manipulation"
              >
                Neither suits — pick another day
              </button>
            </div>
          </div>
        )}

        {showSettled && alreadySettled!.kind !== 'proposed' && (
          <div className="space-y-4 py-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20">
              <Check className="h-7 w-7 text-green-400" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">
                {alreadySettled!.kind === 'booked' ? "You're booked in" : 'Already sorted'}
              </h2>
              <p className="text-white">
                {alreadySettled!.kind === 'booked'
                  ? `${formatDate(alreadySettled!.date.slice(0, 10)).full} with ${who}.`
                  : `You've asked to start on ${formatDate(alreadySettled!.date).full}${
                      alreadySettled!.preference && alreadySettled!.preference !== 'flexible'
                        ? ` in the ${alreadySettled!.preference}`
                        : ''
                    }.`}
              </p>
              <p className="px-2 text-sm text-white">
                {alreadySettled!.kind === 'booked'
                  ? 'Nothing else to do — they will be in touch if anything changes.'
                  : `${who} is confirming it and will come back to you.`}
              </p>
            </div>

            {alreadySettled!.kind === 'requested' && (
              <button
                onClick={() => setOverrideSettled(true)}
                className="min-h-11 text-sm font-medium text-elec-yellow touch-manipulation"
              >
                Change the date I asked for
              </button>
            )}
          </div>
        )}

        {/* ── Step 1 — the date. Gone entirely by the details step: the
            summary card there already echoes the choice, and repeating the
            picker above the form doubled the same date on screen. ── */}
        {!showSettled && (step === 'date' || step === 'time') && (
          <div className="space-y-3">
            {/* How big is the job? Decides what a "slot" means below. Straight
                bookings only — the quote flow requests a start date, where
                length is the electrician's business. */}
            {!isQuoteFlow && (
              <div className="space-y-2">
                <h2 className="text-base font-semibold tracking-tight text-white">
                  How long do you need?
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      {
                        value: 'slot' as DurationKind,
                        label: 'Quick visit',
                        hint:
                          slotMinutes >= 60
                            ? `About ${slotMinutes % 60 === 0 ? slotMinutes / 60 : (slotMinutes / 60).toFixed(1)} hour${slotMinutes > 60 ? 's' : ''}`
                            : `About ${slotMinutes} min`,
                      },
                      { value: 'half_day' as DurationKind, label: 'Half a day', hint: 'Around 4 hours' },
                      { value: 'full_day' as DurationKind, label: 'Full day', hint: 'The whole day' },
                    ]
                  ).map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleDurationChange(opt.value)}
                      className={`py-2.5 px-2 rounded-xl text-center touch-manipulation transition-colors ${
                        duration === opt.value
                          ? 'bg-elec-yellow text-black'
                          : 'bg-white/5 border border-white/10 text-white'
                      }`}
                    >
                      <div className="text-[13px] font-semibold">{opt.label}</div>
                      <div
                        className={`text-[10px] mt-0.5 ${
                          duration === opt.value ? 'text-black/60' : 'text-white'
                        }`}
                      >
                        {opt.hint}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-base font-semibold tracking-tight text-white">
                {isQuoteFlow ? 'When would you like us to start?' : 'Pick a day'}
              </h2>
              {isQuoteFlow && (
                <p className="mt-1 text-sm text-white">
                  Pick the day you'd like the work to begin. {electrician?.name || 'They'} will
                  confirm it with you — nothing is fixed yet.
                </p>
              )}
            </div>

            {step !== 'date' && selectedDate ? (
              /* A vertical week list has no business staying open above the
                 time grid — collapse to the chosen day once it's picked. */
              <button
                onClick={() => {
                  setSelectedSlot(null);
                  setStep('date');
                }}
                className="flex w-full items-center justify-between rounded-xl border border-white/[0.12] bg-white/[0.06] px-3.5 py-3 touch-manipulation"
              >
                <span className="text-sm font-semibold text-white">
                  {formatDate(selectedDate).full}
                </span>
                <span className="text-[12px] font-medium text-elec-yellow">Change day</span>
              </button>
            ) : availableDates.length === 0 ? (
              <div className="text-center py-8 w-full space-y-2">
                <CalendarDays className="h-8 w-8 text-white mx-auto" />
                <p className="text-white">No dates available at the moment.</p>
                <p className="text-sm text-white">
                  Give {electrician?.name || 'your electrician'} a ring and they'll sort
                  something out.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {weekGroups.map((week) => (
                  <div key={week.label} className="space-y-2">
                    <h3 className="text-[12px] font-medium text-white">{week.label}</h3>
                    <div className="flex flex-wrap gap-2">
                      {week.dates.map((dateStr) => {
                        const { dayName, dayNum, month } = formatDate(dateStr);
                        const isSelected = selectedDate === dateStr;
                        const slotCount = slots.filter((s) => s.date === dateStr).length;
                        return (
                          <button
                            key={dateStr}
                            onClick={() => {
                              setSelectedDate(dateStr);
                              setError('');
                              if (isQuoteFlow) {
                                setSelectedSlot(null);
                              } else if (duration === 'full_day') {
                                // One slot per day by construction — picking the
                                // day IS picking the slot, straight to details.
                                const daySlot = slots.find((sl) => sl.date === dateStr) ?? null;
                                setSelectedSlot(daySlot);
                                setStep(daySlot ? 'details' : 'time');
                              } else {
                                setSelectedSlot(null);
                                setStep('time');
                              }
                            }}
                            className={`w-[4rem] py-2.5 rounded-xl text-center touch-manipulation transition-colors ${
                              isSelected
                                ? 'bg-elec-yellow text-black'
                                : 'bg-white/[0.06] border border-white/[0.12] text-white'
                            }`}
                          >
                            <div className="text-[10px] font-medium uppercase">{dayName}</div>
                            <div className="text-lg font-bold leading-tight">{dayNum}</div>
                            <div className="text-[10px] font-medium uppercase">{month}</div>
                            {/* A slot count is meaningless when the client is
                                choosing a start date, not an appointment. */}
                            {!isQuoteFlow && (
                              <div
                                className={`text-[9px] mt-0.5 font-medium ${isSelected ? 'text-black/70' : 'text-white'}`}
                              >
                                {duration === 'full_day'
                                  ? 'free'
                                  : `${slotCount} slot${slotCount !== 1 ? 's' : ''}`}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Time of day — a preference, not a reservation. */}
            {isQuoteFlow && selectedDate && (
              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-semibold text-white">
                  Any preference on the time of day?
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_PREFERENCES.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setPreference(p.value)}
                      className={`py-2.5 px-2 rounded-xl text-center touch-manipulation transition-colors ${
                        preference === p.value
                          ? 'bg-elec-yellow text-black'
                          : 'bg-white/5 border border-white/10 text-white'
                      }`}
                    >
                      <div className="text-[13px] font-semibold">{p.label}</div>
                      <div
                        className={`text-[10px] mt-0.5 ${
                          preference === p.value ? 'text-black/60' : 'text-white'
                        }`}
                      >
                        {p.hint}
                      </div>
                    </button>
                  ))}
                </div>

                <Button
                  onClick={() => {
                    setStep('details');
                    setError('');
                  }}
                  className="w-full h-12 mt-1 bg-elec-yellow text-black font-bold text-base rounded-xl touch-manipulation hover:bg-elec-yellow/90"
                >
                  Continue
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ── Step 2 — the time, booking-link flow only ─────────────── */}
        {/* Details already echoes the chosen time in its summary card — the
            grid collapses once a time is picked, same as the day list. */}
        {!showSettled &&
          !isQuoteFlow &&
          duration !== 'full_day' &&
          step === 'time' &&
          selectedDate && (
          <div className="space-y-3">
            <h2 className="text-base font-semibold tracking-tight text-white">
              What time on {formatDate(selectedDate).full}?
            </h2>
            {dateSlots.length === 0 ? (
              <p className="text-white py-4">Nothing free that day — try another.</p>
            ) : (
              /* Grouped by half of the day — ten identical chips in a wall
                 made the customer count; "Morning / Afternoon" is how they
                 were going to scan it anyway. Half-day chips already ARE the
                 halves, so they keep a single grid. */
              (duration === 'half_day'
                ? [{ label: null as string | null, group: dateSlots }]
                : [
                    {
                      label: 'Morning',
                      group: dateSlots.filter((s) => parseInt(s.start, 10) < 12),
                    },
                    {
                      label: 'Afternoon',
                      group: dateSlots.filter((s) => parseInt(s.start, 10) >= 12),
                    },
                  ].filter((g) => g.group.length > 0)
              ).map(({ label, group }) => (
                <div key={label ?? 'all'} className="space-y-2">
                  {label && <h3 className="text-[12px] font-medium text-white">{label}</h3>}
                  <div className="grid grid-cols-2 gap-2">
                    {group.map((slot) => {
                      const isSelected =
                        selectedSlot?.start === slot.start && selectedSlot?.date === slot.date;
                      return (
                        <button
                          key={`${slot.date}-${slot.start}`}
                          onClick={() => {
                            setSelectedSlot(slot);
                            setStep('details');
                            setError('');
                          }}
                          className={`${duration === 'half_day' ? 'min-h-[3.5rem] py-2' : 'h-11'} rounded-xl text-sm font-medium touch-manipulation transition-colors ${
                            isSelected
                              ? 'bg-elec-yellow text-black'
                              : 'bg-white/[0.06] border border-white/[0.12] text-white'
                          }`}
                        >
                          {slot.start} – {slot.end}
                          {duration === 'half_day' && (
                            <span
                              className={`block text-[10px] font-medium ${
                                isSelected ? 'text-black/70' : 'text-white'
                              }`}
                            >
                              {parseInt(slot.start, 10) < 12 ? 'Morning' : 'Afternoon'}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── Final step — details ──────────────────────────────────── */}
        {!showSettled && step === 'details' && (selectedSlot || (isQuoteFlow && selectedDate)) && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
              <p className="text-sm font-semibold text-white">
                {formatDate(selectedSlot ? selectedSlot.date : selectedDate!).full}
              </p>
              <p className="text-sm text-white">
                {selectedSlot
                  ? duration === 'full_day' && !isQuoteFlow
                    ? `All day, ${selectedSlot.start} – ${selectedSlot.end}`
                    : `${selectedSlot.start} – ${selectedSlot.end}`
                  : preference === 'flexible'
                    ? 'Any time of day'
                    : `${TIME_PREFERENCES.find((p) => p.value === preference)?.label} preferred`}
              </p>
            </div>

            <h2 className="text-base font-semibold tracking-tight text-white">
              How can {electrician?.name || 'they'} reach you?
            </h2>
            {/* Underline fields, not boxes — the boxed grey inputs were the
                superseded form language. Labels carry the field name in full
                white; the caret and bottom border carry focus. */}
            <div className="space-y-5">
              <div>
                <label className="mb-1 block text-[12px] font-medium text-white">Your name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={underlineCn}
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-medium text-white">
                  Phone number
                </label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatUKPhone(e.target.value))}
                  className={underlineCn}
                  autoComplete="tel"
                  maxLength={15}
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-medium text-white">
                  Email <span className="font-normal">(optional)</span>
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={underlineCn}
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-medium text-white">
                  {isQuoteFlow ? 'Where is the work?' : 'Job address'}{' '}
                  <span className="font-normal">(optional)</span>
                </label>
                {/* Full address so it syncs to the diary as a tappable map pin
                    (ELE-1042). */}
                <GoogleMapsProvider>
                  <PlacesAutocomplete
                    value={address}
                    onChange={setAddress}
                    placeholder="Start typing the address"
                    className={underlineCn}
                  />
                </GoogleMapsProvider>
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-medium text-white">
                  {isQuoteFlow
                    ? 'Anything they should know before starting?'
                    : 'What do you need doing?'}{' '}
                  <span className="font-normal">(optional)</span>
                </label>
                <Textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className={`${underlineCn} min-h-[80px] resize-none py-2`}
                />
              </div>
            </div>

            <Button
              onClick={isQuoteFlow ? handleRequestStartDate : handleBook}
              disabled={!name.trim() || !phone.trim() || submitting}
              className="w-full h-12 bg-elec-yellow text-black font-bold text-base rounded-xl touch-manipulation hover:bg-elec-yellow/90 disabled:opacity-50"
            >
              {submitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : isQuoteFlow ? (
                'Send my start date'
              ) : (
                'Book it in'
              )}
            </Button>

            {isQuoteFlow && (
              <p className="text-center text-xs text-white">
                This is a request, not a fixed appointment. {electrician?.name || 'Your electrician'}{' '}
                will be in touch to confirm.
              </p>
            )}
          </div>
        )}

        {/* ── Confirmation ──────────────────────────────────────────── */}
        {step === 'confirmed' && (
          <div className="text-center space-y-6 py-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-green-400" />
            </div>

            {confirmedRequest ? (
              <>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-white">That's gone over</h2>
                  <p className="text-white">
                    You've asked to start on {formatDate(confirmedRequest.date).full}
                    {confirmedRequest.preference !== 'flexible' &&
                      ` in the ${confirmedRequest.preference}`}
                    .
                  </p>
                  <p className="text-sm text-white px-2">
                    {who} will confirm the date with you{email.trim() ? ' by email or phone' : ''}.
                    Nothing is booked in until they do.
                  </p>
                </div>
                {quoteNumber && (
                  <p className="text-sm text-white">Against quote {quoteNumber}</p>
                )}
              </>
            ) : (
              <>
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-white">You're booked in</h2>
                  {/* ELE-1512 — this showed the start time only. */}
                  {confirmedSlot && (
                    <div className="mx-auto max-w-xs rounded-xl border border-elec-yellow/20 bg-elec-yellow/10 p-3.5 text-left">
                      <p className="text-sm font-semibold text-white">
                        {formatDate(confirmedSlot.date).full}
                      </p>
                      <p className="text-sm text-white">
                        {duration === 'full_day' ? 'All day, ' : ''}
                        {confirmedSlot.start} – {confirmedSlot.end} · with {who}
                      </p>
                      {address.trim() && <p className="mt-1 text-sm text-white">{address}</p>}
                    </div>
                  )}
                </div>
                {/* ELE-1514 — "Add to Calendar" removed. It is an
                    electrician-side action and had no business on a public
                    page; the job lands in their diary automatically. */}
                <button
                  onClick={handleBookAnother}
                  className="text-sm text-elec-yellow font-medium touch-manipulation min-h-11"
                >
                  Book another time
                </button>
              </>
            )}

            <p className="text-sm text-white">
              {electrician?.name || 'They'} will be in touch if anything changes.
            </p>
          </div>
        )}

        <div className="pt-8 pb-4 text-center">
          <p className="text-xs text-white flex items-center justify-center gap-1">
            Powered by
            <Zap className="h-3 w-3 text-elec-yellow" />
            <span className="text-elec-yellow font-medium">Elec-Mate</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicBooking;
