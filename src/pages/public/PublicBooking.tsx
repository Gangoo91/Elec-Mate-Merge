import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Check, CalendarDays, Clock, Loader2, AlertCircle, ChevronLeft, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';

const SLOT_DURATION_MINUTES = 60;

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

const STEP_LABELS: Record<string, string> = {
  date: '1 of 3',
  time: '2 of 3',
  details: '3 of 3',
};

function formatUKPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 5) return digits;
  if (digits.length <= 8) return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  return `${digits.slice(0, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 11)}`;
}

const PublicBooking = () => {
  const { electricianId } = useParams<{ electricianId: string }>();
  const [step, setStep] = useState<Step>('loading');
  const [error, setError] = useState('');
  const [electrician, setElectrician] = useState<ElectricianInfo | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');

  // Fetch available slots — extracted so we can re-fetch after booking or conflict
  const refreshSlots = useCallback(async () => {
    if (!electricianId) return;
    try {
      const url = `${SUPABASE_URL}/functions/v1/public-booking?electrician_id=${electricianId}&days=14`;
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
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load availability');
      return false;
    }
  }, [electricianId]);

  // Initial fetch
  useEffect(() => {
    refreshSlots().then((ok) => {
      if (ok) setStep('date');
      else setStep('error');
    });
  }, [refreshSlots]);

  // Available dates (unique)
  const availableDates = useMemo(() => {
    const dateSet = new Set(slots.map((s) => s.date));
    return Array.from(dateSet).sort();
  }, [slots]);

  // Slots for selected date
  const dateSlots = useMemo(() => {
    if (!selectedDate) return [];
    return slots.filter((s) => s.date === selectedDate);
  }, [slots, selectedDate]);

  const formatDate = useCallback((dateStr: string) => {
    const d = new Date(dateStr + 'T12:00:00');
    return {
      dayName: d.toLocaleDateString('en-GB', { weekday: 'short' }),
      dayNum: d.getDate(),
      month: d.toLocaleDateString('en-GB', { month: 'short' }),
      full: d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }),
    };
  }, []);

  const handleBack = () => {
    setError('');
    if (step === 'details') {
      setSelectedSlot(null);
      setStep('time');
    } else if (step === 'time') {
      setSelectedDate(null);
      setStep('date');
    }
  };

  const handleBook = async () => {
    if (!selectedSlot || !name.trim() || !phone.trim() || !electricianId) return;

    // Basic phone validation — at least 10 digits
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const url = `${SUPABASE_URL}/functions/v1/public-booking`;

      const res = await fetch(url, {
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
          client_phone: phoneDigits.startsWith('0')
            ? `+44${phoneDigits.slice(1)}`
            : phoneDigits.startsWith('44')
              ? `+${phoneDigits}`
              : phone.trim(),
          client_email: email.trim() || undefined,
          job_description: jobDescription.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        // On conflict (409), refresh slots so taken ones disappear
        if (res.status === 409) {
          setSelectedSlot(null);
          setStep('time');
          await refreshSlots();
        }
        throw new Error(errData.error || 'Booking failed');
      }

      setBookingDate(selectedSlot.date);
      setBookingTime(selectedSlot.start);
      setStep('confirmed');
      // Refresh slots in background so "Book another" shows updated availability
      refreshSlots();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  const generateIcsUrl = () => {
    if (!bookingDate || !bookingTime || !electrician) return '#';
    const start = new Date(`${bookingDate}T${bookingTime}:00`);
    const end = new Date(start.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);
    const fmt = (d: Date) =>
      d
        .toISOString()
        .replace(/[-:]/g, '')
        .replace(/\.\d{3}/, '');
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Elec-Mate//Booking//EN',
      'BEGIN:VEVENT',
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:Appointment with ${electrician.name}`,
      `DESCRIPTION:${jobDescription.trim() ? `Job: ${jobDescription.trim()}\\n` : ''}Booked via Elec-Mate`,
      `LOCATION:${electrician.company || ''}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
  };

  const handleBookAnother = () => {
    setSelectedDate(null);
    setSelectedSlot(null);
    setName('');
    setPhone('');
    setEmail('');
    setJobDescription('');
    setBookingDate('');
    setBookingTime('');
    setError('');
    setStep('date');
  };

  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        <p className="text-sm text-white">Loading availability...</p>
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

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>
          Book an Appointment{electrician ? ` with ${electrician.name}` : ''} | Elec-Mate
        </title>
        <meta name="description" content="Book a time slot with your electrician" />
      </Helmet>

      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          {(step === 'time' || step === 'details') && (
            <button
              onClick={handleBack}
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
          {STEP_LABELS[step] && (
            <span className="text-[11px] font-medium bg-white/10 text-white px-2 py-0.5 rounded-full flex-shrink-0">
              Step {STEP_LABELS[step]}
            </span>
          )}
        </div>
      </div>

      <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Error banner */}
        {error && step !== 'error' && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-white">{error}</p>
            </div>
            <button
              onClick={() => setError('')}
              className="text-xs text-white font-medium touch-manipulation px-2 py-0.5"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Step 1: Pick a date */}
        {(step === 'date' || step === 'time' || step === 'details') && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Pick a date</h2>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
              {availableDates.length === 0 ? (
                <div className="text-center py-8 w-full space-y-2">
                  <CalendarDays className="h-8 w-8 text-white mx-auto" />
                  <p className="text-white">No available dates in the next 14 days.</p>
                  <p className="text-sm text-white">
                    Contact {electrician?.name || 'the electrician'} directly to arrange a time.
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
                        setStep('time');
                        setError('');
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
                      <div
                        className={`text-[9px] mt-0.5 ${isSelected ? 'text-black/60' : 'text-white'}`}
                      >
                        {slotCount} slot{slotCount !== 1 ? 's' : ''}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Step 2: Pick a time */}
        {(step === 'time' || step === 'details') && selectedDate && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">
              Pick a time — {formatDate(selectedDate).full}
            </h2>
            {dateSlots.length === 0 ? (
              <p className="text-white py-4">No available slots on this date.</p>
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
                      className={`h-11 rounded-xl text-sm font-medium touch-manipulation transition-colors flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-elec-yellow text-black'
                          : 'bg-white/5 border border-white/10 text-white'
                      }`}
                    >
                      <Clock className="h-3.5 w-3.5" />
                      {slot.start} – {slot.end}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Your details */}
        {step === 'details' && selectedSlot && (
          <div className="space-y-4">
            {/* Selected slot summary */}
            <div className="p-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-elec-yellow flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">
                  {formatDate(selectedSlot.date).full}
                </p>
                <p className="text-sm text-white">
                  {selectedSlot.start} – {selectedSlot.end}
                </p>
              </div>
            </div>

            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Your details</h2>
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
              <Textarea
                placeholder="Describe what you need (optional)"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="touch-manipulation text-base min-h-[100px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
              />
            </div>

            <Button
              onClick={handleBook}
              disabled={!name.trim() || !phone.trim() || submitting}
              className="w-full h-12 bg-elec-yellow text-black font-bold text-base rounded-xl touch-manipulation hover:bg-elec-yellow/90 disabled:opacity-50"
            >
              {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Confirm Booking'}
            </Button>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 'confirmed' && (
          <div className="text-center space-y-6 py-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-green-400" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">Booking confirmed!</h2>
              <p className="text-white">
                {formatDate(bookingDate).full} at {bookingTime}
              </p>
              {electrician && <p className="text-white">with {electrician.name}</p>}
              {jobDescription.trim() && (
                <p className="text-sm text-white mt-2 px-4">"{jobDescription.trim()}"</p>
              )}
            </div>

            <div className="flex flex-col items-center gap-3">
              <a
                href={generateIcsUrl()}
                download="booking.ics"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-white/5 border border-white/10 text-white font-medium touch-manipulation hover:bg-white/10 transition-colors"
              >
                <CalendarDays className="h-4 w-4" />
                Add to Calendar
              </a>
              <button
                onClick={handleBookAnother}
                className="text-sm text-elec-yellow font-medium touch-manipulation"
              >
                Book another appointment
              </button>
            </div>

            <p className="text-sm text-white">
              {electrician?.name || 'The electrician'} will be in touch to confirm details.
            </p>
          </div>
        )}

        {/* Branding */}
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
