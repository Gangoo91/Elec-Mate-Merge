/**
 * ELE-2065 §3A #6: after accepting a quote from an Employer Hub firm that has
 * online booking switched on, the customer picks a time from the firm's real
 * crew availability, and the visit is booked onto the job made from the quote
 * (book_quote_visit). Sole traders, and firms without online booking, keep the
 * personal calendar link (/book/<user_id>) the quote page has always shown.
 *
 * Runs signed out. Every call is token-keyed and rate limited on the server;
 * the free times come back as days and half-days, never names.
 */
import { useEffect, useMemo, useState } from 'react';
import { CalendarClock, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;

type Half = 'am' | 'pm' | 'day';

export interface QuoteBookingInfo {
  mode: 'firm' | 'personal' | 'none';
  ready?: boolean;
  minutes?: number;
  half_mode?: boolean;
  auto_confirm?: boolean;
  booking?: {
    reference: string;
    status: 'tentative' | 'confirmed';
    day: string;
    half: Half;
    label: string;
  } | null;
}

/** Which booking the quote page should offer (firm crew diary or personal). */
export async function fetchQuoteBooking(token: string): Promise<QuoteBookingInfo> {
  const { data, error } = await rpc('get_quote_booking', { p_token: token });
  if (error || !data) return { mode: 'personal' };
  return data as QuoteBookingInfo;
}

const HALF_LABEL: Record<Half, string> = {
  am: 'Morning, from 8:00',
  pm: 'Afternoon, from 12:30',
  day: 'All day, from 8:00',
};

// The page speaks as the firm ("Thanks, <firm>"), so after the name is used
// once it is "we", never the name again.
function errorText(code: string | undefined, phone?: string | null) {
  const call = phone ? ` Call us on ${phone}.` : ' Please get in touch with us.';
  switch (code) {
    case 'taken':
    case 'slot':
      return 'That time has just gone. Please pick another.';
    case 'already_booked':
      return 'This visit is already booked.';
    case 'not_ready':
      return 'Booking opens once the deposit has been paid.';
    case 'rate_limited':
      return `We have had a few requests from here already.${call}`;
    case 'links':
      return 'Please take the web links out of your note.';
    default:
      return `Something went wrong.${call}`;
  }
}

export function QuoteFirmBooking({
  token,
  info,
  companyName,
  companyPhone,
  brandHex,
  depositPaid,
  onBooked,
}: {
  token: string;
  info: QuoteBookingInfo;
  companyName: string;
  companyPhone?: string | null;
  brandHex: string;
  depositPaid: boolean;
  onBooked: () => void;
}) {
  const [days, setDays] = useState<Array<{ day: string; label: string; halves: Half[] }> | null>(
    null
  );
  const [loadError, setLoadError] = useState<string | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [half, setHalf] = useState<Half | null>(null);
  const [note, setNote] = useState('');
  const [allDays, setAllDays] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const booking = info.booking ?? null;

  const loadSlots = async () => {
    setLoadError(null);
    const { data, error: e } = await rpc('get_quote_booking_slots', { p_token: token });
    const r = data as { ok?: boolean; error?: string; days?: typeof days } | null;
    if (e || !r?.ok) {
      setDays([]);
      setLoadError(errorText(r?.error, companyPhone));
      return;
    }
    setDays(r.days ?? []);
  };

  useEffect(() => {
    if (!booking && info.ready) void loadSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, booking?.reference, info.ready]);

  const picked = useMemo(() => days?.find((d) => d.day === day) ?? null, [days, day]);
  const halves: Half[] = picked
    ? (['am', 'pm', 'day'] as Half[]).filter((h) => picked.halves.includes(h))
    : [];

  const book = async () => {
    if (!day || !half) return;
    setBusy(true);
    setError(null);
    const { data, error: e } = await rpc('book_quote_visit', {
      p_token: token,
      p_day: day,
      p_half: half,
      p_note: note.trim() || null,
    });
    const r = data as { ok?: boolean; error?: string } | null;
    setBusy(false);
    if (e || !r?.ok) {
      setError(errorText(r?.error, companyPhone));
      if (r?.error === 'taken' || r?.error === 'slot') {
        setHalf(null);
        void loadSlots();
      }
      if (r?.error === 'already_booked') onBooked();
      return;
    }
    onBooked();
  };

  if (booking) {
    const confirmed = booking.status === 'confirmed';
    return (
      <div className="rounded-xl border border-slate-200 p-5 text-center">
        <p className="text-[10.5px] font-semibold text-emerald-700 uppercase tracking-[0.12em] flex items-center justify-center gap-1.5">
          <CheckCircle className="h-3.5 w-3.5" />
          {confirmed ? 'Booked' : 'Time requested'}
        </p>
        <p className="mt-2 text-[15px] text-slate-700 leading-relaxed">
          {confirmed ? 'See you on ' : 'You asked for '}
          <strong className="text-slate-900">{booking.label}</strong>.{' '}
          {confirmed ? 'It’s in our diary.' : 'We’ll confirm it with you shortly.'}
        </p>
        <p className="mt-2 text-[12.5px] text-slate-500">Reference {booking.reference}</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 p-5">
      <p className="text-[10.5px] font-semibold text-emerald-700 uppercase tracking-[0.12em] flex items-center gap-1.5">
        <CalendarClock className="h-3.5 w-3.5" />
        Last step · pick a time
      </p>
      <p className="mt-2 text-[15px] text-slate-700 leading-relaxed">
        {depositPaid ? 'Thanks for the deposit. ' : ''}These are the times {companyName} can come
        out. {info.auto_confirm ? 'Your pick is booked straight away.' : 'We’ll confirm your pick.'}
      </p>

      {days === null ? (
        <div className="mt-4 flex items-center gap-2 text-[14px] text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" /> Finding free times
        </div>
      ) : days.length === 0 ? (
        <p className="mt-4 text-[14px] text-slate-700">
          {loadError ??
            `No free times online in the next few weeks.${
              companyPhone ? ` Call us on ${companyPhone} to book.` : ''
            }`}
        </p>
      ) : (
        <>
          <p className="mt-4 text-[13px] font-semibold text-slate-900">Day</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(allDays ? days : days.slice(0, 9)).map((d) => (
              <button
                key={d.day}
                type="button"
                onClick={() => {
                  setDay(d.day);
                  setHalf(d.halves.length === 1 ? d.halves[0] : null);
                  setError(null);
                }}
                aria-pressed={day === d.day}
                className={cn(
                  'h-12 rounded-xl border text-[13.5px] font-medium touch-manipulation transition-colors',
                  day === d.day
                    ? 'text-white border-transparent'
                    : 'border-slate-200 bg-white text-slate-800 hover:border-slate-400'
                )}
                style={day === d.day ? { backgroundColor: brandHex } : undefined}
              >
                {d.label}
              </button>
            ))}
          </div>
          {!allDays && days.length > 9 && (
            <button
              type="button"
              onClick={() => setAllDays(true)}
              className="mt-2 h-11 px-1 text-[13.5px] font-semibold text-slate-900 underline underline-offset-4 touch-manipulation"
            >
              More days
            </button>
          )}

          {picked && (
            <>
              <p className="mt-4 text-[13px] font-semibold text-slate-900">Time</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {halves.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setHalf(h)}
                    aria-pressed={half === h}
                    className={cn(
                      'h-12 rounded-xl border px-4 text-left text-[14px] font-medium touch-manipulation transition-colors',
                      half === h
                        ? 'text-white border-transparent'
                        : 'border-slate-200 bg-white text-slate-800 hover:border-slate-400'
                    )}
                    style={half === h ? { backgroundColor: brandHex } : undefined}
                  >
                    {HALF_LABEL[h]}
                  </button>
                ))}
              </div>
              <label
                className="mt-4 block text-[13px] font-semibold text-slate-900"
                htmlFor="qfb-note"
              >
                Anything we should know?{' '}
                <span className="font-normal text-slate-500">(optional)</span>
              </label>
              <textarea
                id="qfb-note"
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, 1000))}
                rows={2}
                placeholder="Parking, access, pets"
                className="mt-2 w-full rounded-xl border border-slate-200 !bg-white px-3 py-2.5 text-[14px] !text-slate-900 placeholder:!text-slate-400 [color-scheme:light] focus:border-slate-400 focus:outline-none"
              />
            </>
          )}

          {error && <p className="mt-3 text-[13.5px] text-rose-600">{error}</p>}

          <button
            type="button"
            onClick={book}
            disabled={!day || !half || busy}
            className="mt-4 inline-flex items-center justify-center gap-2 h-12 w-full sm:w-auto px-6 rounded-xl text-white font-semibold text-[15px] touch-manipulation disabled:opacity-50"
            style={{ backgroundColor: brandHex }}
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {info.auto_confirm ? 'Book this time' : 'Request this time'}
          </button>
        </>
      )}
    </div>
  );
}
