/**
 * The public booking widget (ELE-2079). Phone first: what for → postcode →
 * a free morning, afternoon or day → name and address → booked. Used on the
 * firm's quote page (one card), on /book-visit/:key, inside website iframes
 * and behind the Google Business Profile "Book" link.
 *
 * Free times come from the firm's diary through the same scheduling logic
 * the office uses (ELE-2072): only people holding what the visit needs, free
 * that half-day, count. Customers never see who; the office does.
 */
import { useMemo, useRef, useState } from 'react';
import { CalendarCheck, Check, ChevronLeft, Loader2, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  usePublicBookingPage,
  useCreateBooking,
  fetchSlots,
  bookingErrorText,
  BookingRefusal,
  type PublicBookingType,
  type PublicSlotDay,
  type BookingDone,
} from '@/hooks/usePublicBooking';
import { textOn } from '@/utils/brandText';

type Source = 'quote_page' | 'website' | 'google' | 'link';
type Step = 'type' | 'postcode' | 'slot' | 'details' | 'done';
type Half = 'am' | 'pm' | 'day';

interface Props {
  /** The booking key, or the quote page slug. */
  bookingKey: string;
  source: Source;
  /** 'card' sits inside another page (the quote page); 'page' is the whole page. */
  variant?: 'card' | 'page';
  brand?: string;
  onBrand?: string;
  /** Inside an iframe, links open in the top window. */
  embedded?: boolean;
  /** The page shows the firm's intro itself (BookVisitPage). */
  hideIntro?: boolean;
  className?: string;
}

const HALF_TEXT: Record<Half, { label: string; hint: string }> = {
  am: { label: 'Morning', hint: 'From 8am' },
  pm: { label: 'Afternoon', hint: 'From 12:30pm' },
  day: { label: 'All day', hint: 'From 8am' },
};

const duration = (m: number) =>
  m < 60
    ? `About ${m} minutes`
    : m % 60 === 0
      ? `About ${m / 60} hour${m === 60 ? '' : 's'}`
      : `About ${Math.floor(m / 60)}h ${m % 60}m`;

// The app forces placeholders white (index.css, for its dark screens); on
// this light form they need their own colour, with the same !important.
const fieldCn =
  'h-12 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-[16px] text-slate-900 placeholder:!text-slate-500 placeholder:![-webkit-text-fill-color:#64748b] focus:border-slate-900 focus:outline-none focus:ring-0 touch-manipulation';
const labelCn = 'mb-1.5 block text-[14px] font-medium text-slate-800';

export function BookingWidget({
  bookingKey,
  source,
  variant = 'card',
  brand: brandIn,
  onBrand: onIn,
  embedded,
  hideIntro,
  className,
}: Props) {
  const { data: page, isLoading } = usePublicBookingPage(bookingKey);
  const create = useCreateBooking();
  const startedAt = useRef(Date.now());
  const [step, setStep] = useState<Step>('type');
  const [type, setType] = useState<PublicBookingType | null>(null);
  const [postcode, setPostcode] = useState('');
  const [checking, setChecking] = useState(false);
  const [days, setDays] = useState<PublicSlotDay[]>([]);
  const [day, setDay] = useState<string | null>(null);
  const [half, setHalf] = useState<Half | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
    website: '',
  });
  const [done, setDone] = useState<BookingDone | null>(null);

  const brand =
    brandIn ?? (page?.colour && /^#[0-9a-f]{6}$/i.test(page.colour) ? page.colour : '#0f172a');
  const onBrand = onIn ?? textOn(brand);
  const phone = page?.phone ?? null;
  const target = embedded ? '_top' : undefined;
  const chosenDay = useMemo(() => days.find((d) => d.day === day) ?? null, [days, day]);

  if (isLoading) {
    return variant === 'page' ? (
      <div className="grid place-items-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-slate-500" aria-label="Loading" />
      </div>
    ) : null;
  }
  if (!page?.found || !page.types?.length) {
    return variant === 'page' ? (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center sm:p-7">
        <p className="text-[16px] font-semibold text-slate-900">Online booking is not available</p>
        <p className="mt-1 text-[15px] text-slate-600">
          Please contact the firm directly to book a visit.
        </p>
      </div>
    ) : null;
  }
  const key = page.key ?? bookingKey;

  const pickType = (t: PublicBookingType) => {
    setType(t);
    setErr(null);
    setDay(null);
    setHalf(null);
    setStep('postcode');
  };

  const checkPostcode = async () => {
    if (!type) return;
    setErr(null);
    if (postcode.trim().length < 5) return setErr('Please enter your full postcode.');
    setChecking(true);
    try {
      const r = await fetchSlots(key, type.key, postcode.trim());
      setDays(r.days);
      setDay(r.days[0]?.day ?? null);
      setHalf(null);
      setStep('slot');
    } catch (e) {
      const ref = e instanceof BookingRefusal ? e : new BookingRefusal('error');
      setErr(bookingErrorText(ref.code, phone, ref.outcode));
    } finally {
      setChecking(false);
    }
  };

  const submit = async () => {
    if (!type || !day || !half) return;
    setErr(null);
    if (form.name.trim().length < 2) return setErr('Please add your name.');
    if (!form.phone.trim() && !form.email.trim())
      return setErr('Add a phone number or an email so we can confirm.');
    if (form.address.trim().length < 3) return setErr('Please add the address for the visit.');
    try {
      const r = await create.mutateAsync({
        key,
        type: type.key,
        day,
        half,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        postcode: postcode.trim(),
        notes: form.notes.trim(),
        source,
        website: form.website,
        elapsedMs: Date.now() - startedAt.current,
      });
      setDone(r);
      setStep('done');
    } catch (e) {
      const ref = e instanceof BookingRefusal ? e : new BookingRefusal('error');
      setErr(bookingErrorText(ref.code, phone, ref.outcode));
      if (ref.code === 'taken' || ref.code === 'slot') {
        setHalf(null);
        void fetchSlots(key, type.key, postcode.trim())
          .then((s) => setDays(s.days))
          .catch(() => undefined);
        setStep('slot');
      }
    }
  };

  const back = () => {
    setErr(null);
    setStep(step === 'details' ? 'slot' : step === 'slot' ? 'postcode' : 'type');
  };

  const primary =
    'h-12 w-full rounded-xl text-[16px] font-semibold touch-manipulation disabled:opacity-50';
  const stepNo = { type: 1, postcode: 2, slot: 3, details: 4, done: 4 }[step];
  const STEP_TITLE: Record<Step, string> = {
    type: 'What do you need?',
    postcode: 'Where is the visit?',
    slot: 'When suits you?',
    details: 'Your details',
    done: done?.status === 'confirmed' ? 'You are booked in' : 'Booking received',
  };
  const whenText =
    chosenDay && half
      ? `${chosenDay.label}, ${HALF_TEXT[half].label.toLowerCase()} (${HALF_TEXT[half].hint.toLowerCase()})`
      : null;
  // What the customer has chosen so far, so every step reads on its own.
  const summary: Array<{ k: string; v: string; to: Step }> = [];
  if (type && step !== 'type' && step !== 'done')
    summary.push({ k: 'Visit', v: type.label, to: 'type' });
  if (step === 'slot' || step === 'details')
    summary.push({ k: 'Postcode', v: postcode.trim().toUpperCase(), to: 'postcode' });
  if (step === 'details' && whenText) summary.push({ k: 'When', v: whenText, to: 'slot' });

  return (
    <div
      className={cn(
        'relative rounded-2xl border border-slate-200 bg-white text-slate-900',
        variant === 'card' ? 'p-5' : 'p-5 sm:p-7',
        className
      )}
      data-testid="booking-widget"
    >
      <div className="flex items-center gap-3">
        <CalendarCheck className="h-5 w-5 shrink-0" style={{ color: brand }} aria-hidden />
        <p className="min-w-0 flex-1 text-[14px] font-medium text-slate-700">
          {step === 'done' ? 'Book a visit' : `Book a visit · Step ${stepNo} of 4`}
        </p>
        {step !== 'type' && step !== 'done' && (
          <button
            type="button"
            onClick={back}
            className="-mr-2 inline-flex h-11 shrink-0 items-center gap-1 rounded-xl px-2 text-[14px] font-medium text-slate-700 touch-manipulation hover:text-slate-900"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
        )}
      </div>
      {step !== 'done' && (
        <div className="mt-2 grid grid-cols-4 gap-1.5" aria-hidden>
          {[1, 2, 3, 4].map((n) => (
            <span
              key={n}
              className="h-1 rounded-full"
              style={{ background: n <= stepNo ? brand : '#e2e8f0' }}
            />
          ))}
        </div>
      )}
      <h2 className="mt-4 text-[21px] font-semibold leading-tight tracking-tight text-slate-900">
        {STEP_TITLE[step]}
      </h2>

      {page.intro && step === 'type' && !hideIntro && (
        <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{page.intro}</p>
      )}

      {summary.length > 0 && (
        <dl className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-slate-50">
          {summary.map((r) => (
            <div key={r.k} className="flex items-center gap-3 py-1.5 pl-3.5 pr-1.5">
              <div className="min-w-0 flex-1">
                <dt className="text-[13px] text-slate-600">{r.k}</dt>
                <dd className="break-words text-[14px] font-medium text-slate-900">{r.v}</dd>
              </div>
              <button
                type="button"
                onClick={() => {
                  setErr(null);
                  setStep(r.to);
                }}
                className="inline-flex h-11 shrink-0 items-center rounded-lg px-2.5 text-[13px] font-medium text-slate-700 underline underline-offset-2 touch-manipulation hover:text-slate-900"
              >
                Change
              </button>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-4 space-y-4">
        {step === 'type' && (
          <div className="grid gap-2">
            {page.types.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => pickType(t)}
                className="min-h-14 rounded-xl border border-slate-300 bg-white px-4 py-3 text-left touch-manipulation hover:border-slate-500"
              >
                <span className="block text-[16px] font-semibold text-slate-900">{t.label}</span>
                <span className="block text-[14px] text-slate-600">
                  {duration(t.minutes)}
                  {t.deposit_pounds
                    ? ` · £${Number(t.deposit_pounds).toFixed(2)} deposit to book`
                    : ''}
                </span>
              </button>
            ))}
          </div>
        )}

        {step === 'postcode' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void checkPostcode();
            }}
            className="space-y-3"
          >
            <div>
              <label className={labelCn} htmlFor="bw-postcode">
                Your postcode
              </label>
              <input
                id="bw-postcode"
                className={cn(fieldCn, 'uppercase placeholder:normal-case')}
                autoComplete="postal-code"
                autoCapitalize="characters"
                inputMode="text"
                placeholder="e.g. S10 3AB"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={checking}
              className={primary}
              style={{ background: brand, color: onBrand }}
            >
              {checking ? <Loader2 className="mx-auto h-5 w-5 animate-spin" /> : 'See free times'}
            </button>
          </form>
        )}

        {step === 'slot' && (
          <div className="space-y-4">
            {days.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[15px] font-semibold text-slate-900">
                  No free times online at the moment
                </p>
                <p className="mt-1 text-[14px] leading-relaxed text-slate-600">
                  {phone
                    ? 'Our diary is full for the next few weeks. Call us and we will find you a time.'
                    : 'Our diary is full for the next few weeks. Please try again in a few days.'}
                </p>
                {phone && (
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    target={target}
                    className={cn(primary, 'mt-3 inline-flex items-center justify-center gap-2')}
                    style={{ background: brand, color: onBrand }}
                  >
                    <Phone className="h-4 w-4" /> Call {phone}
                  </a>
                )}
              </div>
            ) : (
              <>
                <div>
                  <span className={labelCn}>Pick a day</span>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {days.map((d) => (
                      <button
                        key={d.day}
                        type="button"
                        onClick={() => {
                          setDay(d.day);
                          setHalf(null);
                        }}
                        aria-pressed={day === d.day}
                        aria-label={d.label}
                        className={cn(
                          'flex h-[60px] flex-col items-center justify-center rounded-xl border px-2 touch-manipulation',
                          day === d.day
                            ? 'border-transparent'
                            : 'border-slate-300 bg-white text-slate-900 hover:border-slate-500'
                        )}
                        style={day === d.day ? { background: brand, color: onBrand } : undefined}
                      >
                        <span className="text-[13px] font-medium leading-none">
                          {d.label.split(' ')[0]}
                        </span>
                        <span className="mt-1.5 text-[15px] font-semibold leading-none">
                          {d.label.split(' ').slice(1).join(' ')}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                {chosenDay && (
                  <div>
                    <span className={labelCn}>Pick a time</span>
                    <div className="grid grid-cols-2 gap-2">
                      {(['am', 'pm', 'day'] as Half[])
                        .filter((h) => chosenDay.halves.includes(h))
                        .map((h) => (
                          <button
                            key={h}
                            type="button"
                            onClick={() => setHalf(h)}
                            aria-pressed={half === h}
                            className={cn(
                              'min-h-14 rounded-xl border px-3.5 py-2 text-left touch-manipulation',
                              half === h
                                ? 'border-transparent'
                                : 'border-slate-300 bg-white text-slate-900 hover:border-slate-500'
                            )}
                            style={half === h ? { background: brand, color: onBrand } : undefined}
                          >
                            <span className="block text-[15px] font-semibold">
                              {HALF_TEXT[h].label}
                            </span>
                            <span className="block text-[13px]">{HALF_TEXT[h].hint}</span>
                          </button>
                        ))}
                    </div>
                  </div>
                )}
                <button
                  type="button"
                  disabled={!day || !half}
                  onClick={() => {
                    setErr(null);
                    setStep('details');
                  }}
                  className={primary}
                  style={{ background: brand, color: onBrand }}
                >
                  Continue
                </button>
              </>
            )}
          </div>
        )}

        {step === 'details' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void submit();
            }}
            className="space-y-3"
          >
            <div>
              <label className={labelCn} htmlFor="bw-name">
                Your name
              </label>
              <input
                id="bw-name"
                className={fieldCn}
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className={labelCn} htmlFor="bw-address">
                Address for the visit (first line)
              </label>
              <input
                id="bw-address"
                className={fieldCn}
                autoComplete="address-line1"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className={labelCn} htmlFor="bw-phone">
                  Phone
                </label>
                <input
                  id="bw-phone"
                  className={fieldCn}
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div>
                <label className={labelCn} htmlFor="bw-email">
                  Email, for your confirmation
                </label>
                <input
                  id="bw-email"
                  className={fieldCn}
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className={labelCn} htmlFor="bw-notes">
                Anything we should know (optional)
              </label>
              <textarea
                id="bw-notes"
                rows={2}
                className={cn(fieldCn, 'h-auto min-h-[72px] py-3')}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
            {/* Honeypot: hidden from people, filled by bots. */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="bw-website">Website</label>
              <input
                id="bw-website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
              />
            </div>
            <button
              type="submit"
              disabled={create.isPending}
              className={primary}
              style={{ background: brand, color: onBrand }}
            >
              {create.isPending ? (
                <Loader2 className="mx-auto h-5 w-5 animate-spin" />
              ) : type?.deposit_pounds ? (
                `Book and pay £${Number(type.deposit_pounds).toFixed(2)} deposit`
              ) : (
                'Book this visit'
              )}
            </button>
            <p className="text-[13px] leading-relaxed text-slate-600">
              {page.company_name} uses these details to arrange this visit and contact you about it.
              Elec-Mate runs this booking page for them.{' '}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-800 underline underline-offset-2"
              >
                Privacy
              </a>
            </p>
          </form>
        )}

        {step === 'done' && done && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-600">
                <Check className="h-5 w-5 text-white" aria-hidden />
              </span>
              <p className="pt-1.5 text-[15px] leading-relaxed text-slate-700">
                {done.deposit
                  ? 'Pay the deposit within 48 hours to hold your slot. We confirm the visit once it is paid.'
                  : done.status === 'confirmed'
                    ? form.email
                      ? 'A confirmation is on its way by email, with a reminder the evening before.'
                      : 'We will text or call if anything changes.'
                    : `We have your booking and will confirm it shortly${form.email ? ' by email' : ' by phone'}.`}
              </p>
            </div>
            <dl className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-slate-50">
              {[
                { k: 'Visit', v: done.type || type?.label || '' },
                { k: 'When', v: done.label || whenText || '' },
                {
                  k: 'Where',
                  v: [form.address.trim(), postcode.trim().toUpperCase()]
                    .filter(Boolean)
                    .join(', '),
                },
                ...(done.reference ? [{ k: 'Reference', v: done.reference }] : []),
              ].map((r) => (
                <div key={r.k} className="flex gap-3 px-3.5 py-3">
                  <dt className="w-[84px] shrink-0 text-[13px] text-slate-600">{r.k}</dt>
                  <dd className="min-w-0 flex-1 break-words text-[14px] font-medium text-slate-900">
                    {r.v}
                  </dd>
                </div>
              ))}
            </dl>
            {done.deposit && (
              <a
                href={done.deposit.pay_path}
                target={target}
                className={cn(primary, 'inline-flex items-center justify-center')}
                style={{ background: brand, color: onBrand }}
              >
                Pay £{Number(done.deposit.pounds).toFixed(2)} deposit
              </a>
            )}
            {phone && (
              <p className="text-[14px] text-slate-600">
                Need to change it? Call{' '}
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  target={target}
                  className="font-semibold text-slate-900 underline underline-offset-2"
                >
                  {phone}
                </a>{' '}
                and quote your reference.
              </p>
            )}
          </div>
        )}

        {err && (
          <p
            role="alert"
            className="rounded-xl bg-amber-50 px-3.5 py-3 text-[15px] leading-snug text-amber-900"
          >
            {err}
          </p>
        )}

        {phone && step !== 'done' && !hideIntro && (
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            target={target}
            className="inline-flex h-11 items-center gap-2 text-[14px] font-medium text-slate-700 touch-manipulation"
          >
            <Phone className="h-4 w-4" /> Rather talk? {phone}
          </a>
        )}
      </div>
    </div>
  );
}

export default BookingWidget;
