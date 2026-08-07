import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Check, CalendarDays, Loader2, AlertCircle, ChevronLeft, Zap } from 'lucide-react';
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
const PublicBooking = () => {
  const { electricianId } = useParams<{ electricianId: string }>();
  // ELE-955 — arriving from a quote-acceptance handoff, the URL carries
  // `?quote=<uuid>`. That is also what selects the start-date flow.
  const [searchParams] = useSearchParams();
  const quoteId = searchParams.get('quote');
  const isQuoteFlow = !!quoteId;

  const [step, setStep] = useState<Step>('loading');
  const [error, setError] = useState('');
  const [electrician, setElectrician] = useState<ElectricianInfo | null>(null);
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
    kind: 'requested' | 'booked';
    date: string;
    preference?: TimePreference;
  } | null>(null);
  /** Set when the client chooses to change what they asked for. */
  const [overrideSettled, setOverrideSettled] = useState(false);

  const refreshSlots = useCallback(async () => {
    if (!electricianId) return;
    try {
      const url = `${SUPABASE_URL}/functions/v1/public-booking?electrician_id=${electricianId}&days=${isQuoteFlow ? 56 : 14}`;
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
      setSlots(result.slots || []);
      setOpenDates(result.open_dates || []);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load availability');
      return false;
    }
  }, [electricianId, isQuoteFlow]);

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
        const row = (Array.isArray(data) ? data[0] : data) as
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

  const handleBack = () => {
    setError('');
    if (step === 'details') {
      if (isQuoteFlow) {
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
          <div className="p-2 rounded-lg bg-elec-yellow/10">
            <CalendarDays className="h-5 w-5 text-elec-yellow" />
          </div>
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
        {showSettled && (
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

        {/* ── Step 1 — the date ─────────────────────────────────────── */}
        {!showSettled && (step === 'date' || step === 'time' || step === 'details') && (
          <div className="space-y-3">
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

            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
              {availableDates.length === 0 ? (
                <div className="text-center py-8 w-full space-y-2">
                  <CalendarDays className="h-8 w-8 text-white mx-auto" />
                  <p className="text-white">No dates available at the moment.</p>
                  <p className="text-sm text-white">
                    Give {electrician?.name || 'your electrician'} a ring and they'll sort
                    something out.
                  </p>
                </div>
              ) : (
                availableDates.map((dateStr) => {
                  const { dayName, dayNum, month } = formatDate(dateStr);
                  const isSelected = selectedDate === dateStr;
                  const slotCount = slots.filter((s) => s.date === dateStr).length;
                  return (
                    <button
                      key={dateStr}
                      onClick={() => {
                        setSelectedDate(dateStr);
                        setSelectedSlot(null);
                        setError('');
                        if (!isQuoteFlow) setStep('time');
                      }}
                      className={`flex-shrink-0 w-[4.5rem] py-3 rounded-xl text-center touch-manipulation transition-colors ${
                        isSelected
                          ? 'bg-elec-yellow text-black'
                          : 'bg-white/5 border border-white/10 text-white'
                      }`}
                    >
                      <div className="text-[10px] font-medium uppercase">{dayName}</div>
                      <div className="text-lg font-bold">{dayNum}</div>
                      <div className="text-[10px] font-medium uppercase">{month}</div>
                      {/* A slot count is meaningless when the client is choosing
                          a start date rather than an appointment. */}
                      {!isQuoteFlow && (
                        <div
                          className={`text-[9px] mt-0.5 ${isSelected ? 'text-black/60' : 'text-white'}`}
                        >
                          {slotCount} slot{slotCount !== 1 ? 's' : ''}
                        </div>
                      )}
                    </button>
                  );
                })
              )}
            </div>

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
        {!showSettled && !isQuoteFlow && (step === 'time' || step === 'details') && selectedDate && (
          <div className="space-y-3">
            <h2 className="text-base font-semibold tracking-tight text-white">
              What time on {formatDate(selectedDate).full}?
            </h2>
            {dateSlots.length === 0 ? (
              <p className="text-white py-4">Nothing free that day — try another.</p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {dateSlots.map((slot) => {
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
                      className={`h-11 rounded-xl text-sm font-medium touch-manipulation transition-colors ${
                        isSelected
                          ? 'bg-elec-yellow text-black'
                          : 'bg-white/5 border border-white/10 text-white'
                      }`}
                    >
                      {slot.start} – {slot.end}
                    </button>
                  );
                })}
              </div>
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
                  ? `${selectedSlot.start} – ${selectedSlot.end}`
                  : preference === 'flexible'
                    ? 'Any time of day'
                    : `${TIME_PREFERENCES.find((p) => p.value === preference)?.label} preferred`}
              </p>
            </div>

            <h2 className="text-base font-semibold tracking-tight text-white">
              How can {electrician?.name || 'they'} reach you?
            </h2>
            <div className="space-y-3">
              <Input
                placeholder="Your name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                autoComplete="name"
              />
              <Input
                placeholder="Phone number *"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(formatUKPhone(e.target.value))}
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                autoComplete="tel"
                maxLength={15}
              />
              <Input
                placeholder="Email (optional)"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                autoComplete="email"
              />
              {/* Full address so it syncs to the diary as a tappable map pin
                  (ELE-1042). */}
              <GoogleMapsProvider>
                <PlacesAutocomplete
                  value={address}
                  onChange={setAddress}
                  placeholder={isQuoteFlow ? 'Where is the work? (optional)' : 'Job address (optional)'}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </GoogleMapsProvider>
              <Textarea
                placeholder={
                  isQuoteFlow
                    ? 'Anything they should know before starting? (optional)'
                    : 'What do you need doing? (optional)'
                }
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="touch-manipulation text-base min-h-[100px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
              />
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
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-white">You're booked in</h2>
                  {/* ELE-1512 — this showed the start time only. */}
                  {confirmedSlot && (
                    <p className="text-white">
                      {formatDate(confirmedSlot.date).full}, {confirmedSlot.start} –{' '}
                      {confirmedSlot.end}
                    </p>
                  )}
                  <p className="text-sm text-white">with {who}</p>
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
