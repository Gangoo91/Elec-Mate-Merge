/**
 * /book-visit/:key — a firm's online booking page (ELE-2079).
 *
 * The link the firm puts behind its Google Business Profile "Book" button
 * (?src=google) and inside its website (?embed=1&src=website, no header so
 * it sits in an iframe). Signed out; the key is the firm's random booking
 * key or its quote page slug.
 *
 * Phone: the firm's name and a line about them, the booking card, then how
 * it works and where they cover. Desktop: the firm on the left, the booking
 * card on the right, so the page reads like the firm's own.
 */
import { useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CalendarX, Loader2, MapPin, Phone } from 'lucide-react';
import { BookingWidget } from '@/components/booking/BookingWidget';
import { textOn } from '@/utils/brandText';
import { usePublicBookingPage, type PublicBookingPage } from '@/hooks/usePublicBooking';

const SOURCES = ['quote_page', 'website', 'google', 'link'] as const;
type Source = (typeof SOURCES)[number];

function areaText(area: PublicBookingPage['area']): string | null {
  if (!area) return null;
  if (area.mode === 'radius') {
    return area.from
      ? `Within ${area.miles} miles of ${area.from}`
      : `Within ${area.miles} miles of our base`;
  }
  if (!area.postcodes?.length) return null;
  const list = area.postcodes.slice(0, 12).join(', ');
  return area.postcodes.length > 12 ? `${list} and nearby` : list;
}

const STEPS = [
  { title: 'Pick the visit', body: 'Tell us what you need and where.' },
  { title: 'Choose a time', body: 'Only times we can really do are shown.' },
  { title: 'We confirm', body: 'You get a confirmation, and a reminder the evening before.' },
];

function HowItWorks({ area, phone }: { area: string | null; phone: string | null }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[15px] font-semibold text-slate-900">How it works</h2>
        <ol className="mt-3 divide-y divide-slate-200 border-y border-slate-200">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex gap-3 py-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-slate-300 text-[13px] font-semibold text-slate-800">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-[15px] font-medium text-slate-900">{s.title}</p>
                <p className="text-[14px] text-slate-600">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      {area && (
        <div className="flex gap-3">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" aria-hidden />
          <div className="min-w-0">
            <p className="text-[15px] font-medium text-slate-900">Areas we cover</p>
            <p className="text-[14px] text-slate-600">{area}</p>
          </div>
        </div>
      )}
      {phone && (
        <div className="flex gap-3">
          <Phone className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" aria-hidden />
          <div className="min-w-0">
            <p className="text-[15px] font-medium text-slate-900">Rather talk to us?</p>
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="inline-flex h-11 items-center text-[15px] font-semibold text-slate-900 underline underline-offset-4 touch-manipulation"
            >
              {phone}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookVisitPage() {
  const { key = '' } = useParams<{ key: string }>();
  const [params] = useSearchParams();
  const embedded = params.get('embed') === '1';
  const src = params.get('src');
  const source: Source = (SOURCES as readonly string[]).includes(src ?? '')
    ? (src as Source)
    : 'link';
  const { data, isLoading } = usePublicBookingPage(key);
  const brand = data?.colour && /^#[0-9a-f]{6}$/i.test(data.colour) ? data.colour : '#0f172a';
  const onBrand = textOn(brand);
  const name = data?.company_name ?? 'Book a visit';
  const live = !!data?.found && !!data.types?.length;
  const area = areaText(data?.area);
  const phone = data?.phone ?? null;

  const head = (
    <Helmet>
      <title>{data?.found ? `Book a visit | ${name}` : 'Book a visit'}</title>
      <meta
        name="description"
        content={`Book a visit from ${name} online: pick a free morning or afternoon.`}
      />
      {embedded && <meta name="robots" content="noindex" />}
      <meta name="theme-color" content={brand} />
    </Helmet>
  );

  if (embedded) {
    return (
      <div className="min-h-[100svh] bg-white text-slate-900">
        {head}
        <BookingWidget
          bookingKey={key}
          source={source}
          variant="page"
          embedded
          className="rounded-none border-0"
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid min-h-[100svh] place-items-center bg-slate-50">
        {head}
        <Loader2 className="h-6 w-6 animate-spin text-slate-500" aria-label="Loading" />
      </div>
    );
  }

  if (!live) {
    return (
      <div className="min-h-[100svh] bg-slate-50 px-4 py-16 text-slate-900">
        {head}
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center sm:p-8">
          <CalendarX className="mx-auto h-8 w-8 text-slate-500" aria-hidden />
          <h1 className="mt-3 text-[20px] font-semibold text-slate-900">
            Online booking is not available
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
            {data?.found
              ? `${name} is not taking bookings online at the moment.`
              : 'This booking link is not active. Check the link, or contact the firm directly.'}
          </p>
          {phone && (
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[16px] font-semibold touch-manipulation"
              style={{ background: brand, color: onBrand }}
            >
              <Phone className="h-4 w-4" /> Call {phone}
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100svh] bg-slate-50 text-slate-900">
      {head}
      <header style={{ background: brand, color: onBrand }}>
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3.5 sm:px-6 lg:px-10">
          {data?.logo ? (
            <img
              src={data.logo}
              alt=""
              className="h-11 w-11 shrink-0 rounded-xl bg-white object-contain p-1"
            />
          ) : (
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-[17px] font-bold"
              style={{ color: brand }}
              aria-hidden
            >
              {name.trim().charAt(0).toUpperCase()}
            </span>
          )}
          <p className="line-clamp-2 min-w-0 flex-1 text-[16px] font-semibold leading-snug sm:text-[18px]">
            {name}
          </p>
          {phone && (
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-white px-4 text-[14px] font-semibold text-slate-900 touch-manipulation"
            >
              <Phone className="h-4 w-4" />
              <span className="sm:hidden">Call</span>
              <span className="hidden sm:inline">{phone}</span>
            </a>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6 sm:pt-10 lg:px-10 lg:pt-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-14">
          <section className="min-w-0 lg:pt-2">
            <h1 className="text-[26px] font-semibold leading-tight tracking-tight text-slate-900 sm:text-[32px]">
              Book a visit with {name}
            </h1>
            <p className="mt-3 max-w-prose text-[16px] leading-relaxed text-slate-700">
              {data?.intro ||
                'Pick the visit you need and a free morning or afternoon. It takes about a minute.'}
            </p>
            <div className="mt-8 hidden lg:block">
              <HowItWorks area={area} phone={phone} />
            </div>
          </section>

          <section className="min-w-0">
            <BookingWidget
              bookingKey={key}
              source={source}
              variant="page"
              hideIntro
              className="-mx-4 rounded-none border-x-0 sm:mx-0 sm:rounded-2xl sm:border-x"
            />
          </section>

          <section className="min-w-0 lg:hidden">
            <HowItWorks area={area} phone={phone} />
          </section>
        </div>
        <p className="mt-10 text-center text-[13px] text-slate-600">Online booking by Elec-Mate</p>
      </main>
    </div>
  );
}
