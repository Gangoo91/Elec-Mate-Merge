/**
 * Public quote page — /get-quote/:slug (ELE-1989).
 *
 * The page a firm puts on its van, its Google profile and every invoice. It
 * runs signed out, in the firm's own colour, on a light background a
 * homeowner reads easily. Trust lines come only from real data (scheme,
 * insurance, trading year, certificates issued, received reviews); nothing is
 * shown when the data isn't there.
 *
 * The form is three short steps: what the job is → details, postcode, timing
 * and up to 3 photos → name and how to reply. Spam protection is a honeypot +
 * time-on-page check here, and server-side rate limits in submit_quote_request.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Loader2,
  Check,
  Phone,
  ShieldCheck,
  Camera,
  X,
  ChevronLeft,
  MapPin,
  Star,
  BadgeCheck,
  CalendarClock,
  FileCheck2,
  Zap,
  ArrowRight,
  Globe,
} from 'lucide-react';
import {
  useLeadPage,
  useSubmitQuoteRequest,
  recordLeadPageView,
  beginLeadPageUpload,
  uploadLeadPagePhoto,
  type LeadPageData,
} from '@/hooks/usePublicLeadPage';
import { BookingWidget } from '@/components/booking/BookingWidget';

const DEFAULT_SERVICES = [
  'Fault finding',
  'New sockets or lights',
  'Fuse board upgrade',
  'EV charger',
  'Rewire',
  'EICR or safety check',
];
const TIMINGS = ['As soon as possible', 'Within 2 weeks', 'Within a month', 'Just getting prices'];
const MAX_PHOTOS = 3;

/* ── Colour: the firm's brand, kept readable ─────────────────────────── */

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
};
const lum = ([r, g, b]: [number, number, number]) => {
  const f = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contrast = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
const toHex = (c: [number, number, number]) =>
  '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

function brandPalette(raw: string | null | undefined) {
  const brand = raw && /^#[0-9a-f]{6}$/i.test(raw) ? raw : '#0f172a';
  const rgb = hexToRgb(brand);
  const L = lum(rgb);
  // Text on a brand-coloured button / band
  const on = contrast(L, 1) >= contrast(L, lum([10, 10, 10])) ? '#ffffff' : '#0a0a0a';
  // The brand as text on white: darken until it reads (4.5:1)
  let ink = rgb;
  for (let i = 0; i < 20 && contrast(lum(ink), 1) < 4.5; i++) {
    ink = ink.map((v) => v * 0.85) as [number, number, number];
  }
  return { brand, on, ink: toHex(ink) };
}

/** "A", "A and B", "A, B and C" */
const listOf = (xs: string[]) =>
  xs.length <= 1 ? (xs[0] ?? '') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`;

/* ── Photos ───────────────────────────────────────────────────────────── */

interface Photo {
  blob: Blob;
  preview: string;
}

async function shrink(file: File): Promise<Photo> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = () => rej(new Error('Could not read that photo'));
      i.src = url;
    });
    const scale = Math.min(1, 1600 / Math.max(img.width, img.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((res, rej) =>
      canvas.toBlob((b) => (b ? res(b) : rej(new Error('Could not read that photo'))), 'image/jpeg', 0.8)
    );
    return { blob, preview: URL.createObjectURL(blob) };
  } finally {
    URL.revokeObjectURL(url);
  }
}

/* ── Small pieces ─────────────────────────────────────────────────────── */

const fieldCn =
  'w-full h-12 rounded-xl border border-slate-300 bg-white px-3.5 text-[16px] text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-0 touch-manipulation';

function trustLines(d: LeadPageData) {
  const t = d.trust;
  const out: Array<{ icon: typeof ShieldCheck; text: string }> = [];
  if (t?.registration) {
    out.push({
      icon: BadgeCheck,
      text: `${t.registration.scheme} registered${t.registration.number ? `, no. ${t.registration.number}` : ''}`,
    });
  }
  if (t?.insurance) {
    out.push({
      icon: ShieldCheck,
      text: t.insurance.coverage ? `Insured, ${t.insurance.coverage} cover` : 'Fully insured',
    });
  }
  if (t?.trading_since) out.push({ icon: CalendarClock, text: `Trading since ${t.trading_since}` });
  if (t?.certificates) {
    out.push({
      icon: FileCheck2,
      text: `${t.certificates.toLocaleString('en-GB')} electrical certificates issued`,
    });
  }
  if (t?.reviews) {
    out.push({
      icon: Star,
      text: `Rated ${t.reviews.average} out of 5 by ${t.reviews.count} customer${t.reviews.count === 1 ? '' : 's'}`,
    });
  }
  return out;
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function GetQuoteView() {
  const { slug } = useParams<{ slug: string }>();
  const [params] = useSearchParams();
  const isPreview = params.get('preview') === '1';
  const { data, isLoading, isError, refetch } = useLeadPage(slug, isPreview);

  useEffect(() => {
    if (data?.found && slug && !isPreview) void recordLeadPageView(slug);
  }, [data?.found, slug, isPreview]);

  if (isLoading) {
    return (
      <div className="min-h-[100svh] bg-slate-50 grid place-items-center">
        <Loader2 className="h-7 w-7 animate-spin text-slate-700" aria-label="Loading" />
      </div>
    );
  }

  if (isError) {
    return (
      <Shell>
        <Helmet>
          <title>Get a quote</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="text-lg font-semibold text-slate-900">We couldn't load this page</h1>
          <p className="mt-2 text-[15px] text-slate-700">Check your signal and try again.</p>
          <button
            onClick={() => refetch()}
            className="mt-5 h-11 px-5 rounded-xl bg-slate-900 text-white font-semibold touch-manipulation"
          >
            Try again
          </button>
        </div>
      </Shell>
    );
  }

  if (!data?.found) {
    return (
      <Shell>
        <Helmet>
          <title>Quote page not available</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-slate-100 grid place-items-center">
            <Zap className="h-6 w-6 text-slate-700" />
          </div>
          <h1 className="text-lg font-semibold text-slate-900">This quote page isn't available</h1>
          <p className="mt-2 text-[15px] text-slate-700 leading-relaxed">
            The link may have changed or the page has been switched off. Check the link, or contact
            your electrician directly.
          </p>
        </div>
      </Shell>
    );
  }

  return <QuotePage data={data} slug={slug!} isPreview={isPreview} />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[100svh] bg-slate-50 px-4 py-12 sm:py-20">{children}</div>;
}

function QuotePage({ data, slug, isPreview }: { data: LeadPageData; slug: string; isPreview: boolean }) {
  const pal = useMemo(() => brandPalette(data.colour), [data.colour]);
  const name = data.company_name || 'Your local electrician';
  const areas = data.areas ?? [];
  const services = data.services?.length ? data.services : [];
  const trust = trustLines(data);
  const [done, setDone] = useState<{ reference: string | null } | null>(null);

  const headline =
    data.headline ||
    (areas.length
      ? `Electrician covering ${listOf(areas.slice(0, 3))}${areas.length > 3 ? ' and nearby' : ''}`
      : 'Tell us about the job and get a free quote');

  const canonical = `https://elec-mate.com/get-quote/${data.slug ?? slug}`;
  const description = `Ask ${name} for a free, no-obligation electrical quote${
    areas.length ? ` in ${listOf(areas.slice(0, 3))}` : ''
  }. Takes under a minute, photos welcome.`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name,
    url: canonical,
    ...(data.phone ? { telephone: data.phone } : {}),
    ...(data.logo && /^https:\/\//.test(data.logo) ? { image: data.logo } : {}),
    ...(areas.length ? { areaServed: areas.map((a) => ({ '@type': 'Place', name: a })) } : {}),
    ...(data.trust?.reviews
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: data.trust.reviews.average,
            reviewCount: data.trust.reviews.count,
          },
        }
      : {}),
  };

  return (
    <div className="min-h-[100svh] bg-slate-50 text-slate-900">
      <Helmet>
        <title>{`${name} | Free electrical quote`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Get a free quote from ${name}`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        {data.logo && /^https:\/\//.test(data.logo) && <meta property="og:image" content={data.logo} />}
        <meta name="theme-color" content={pal.brand} />
        {isPreview && <meta name="robots" content="noindex" />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {isPreview && (
        <div className="bg-slate-900 text-white text-center text-[13px] font-medium py-2 px-4">
          {data.enabled === false
            ? 'Preview: your page is switched off, so customers see "not available" and requests can\'t be sent. Switch it on in the Employer Hub when you are happy.'
            : 'Preview: this is how customers see your page. Views from here are not counted.'}
        </div>
      )}

      {/* Brand band */}
      <header style={{ background: pal.brand, color: pal.on }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center gap-3">
          {data.logo ? (
            <img
              src={data.logo}
              alt=""
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl object-contain bg-white p-1 shrink-0"
            />
          ) : (
            <div
              className="h-12 w-12 rounded-xl grid place-items-center shrink-0 bg-white/15 text-lg font-bold"
              aria-hidden
            >
              {name.slice(0, 1).toUpperCase()}
            </div>
          )}
          <p className="min-w-0 flex-1 text-[17px] sm:text-[19px] font-semibold leading-tight truncate">
            {name}
          </p>
          {data.phone && (
            <a
              href={`tel:${data.phone.replace(/\s+/g, '')}`}
              className="shrink-0 inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-white text-slate-900 text-[14px] font-semibold touch-manipulation"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">{data.phone}</span>
              <span className="sm:hidden">Call</span>
            </a>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        <div className="lg:grid lg:grid-cols-[1fr_440px] lg:gap-12 lg:items-start">
          {/* Intro (first on phone, left on desktop) */}
          <section className="pt-7 sm:pt-10">
            <h1 className="text-[28px] sm:text-[40px] font-bold tracking-tight leading-[1.1] text-slate-900">
              {headline}
            </h1>
            <p className="mt-3 text-[16px] sm:text-[17px] text-slate-700 leading-relaxed max-w-xl">
              Free, no-obligation quotes from {name}. Tell us what you need in under a minute and
              we'll come back to you.
            </p>

            {trust.length > 0 && (
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 max-w-2xl">
                {trust.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-2.5 text-[15px] text-slate-800">
                    <Icon className="h-5 w-5 shrink-0 mt-[1px]" style={{ color: pal.ink }} />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Form (second on phone, right + sticky on desktop) */}
          <section className="mt-7 lg:mt-10 lg:row-span-2 lg:sticky lg:top-6" id="request">
            {/* ELE-2079: book a visit straight into the diary, when the firm takes online bookings. */}
            <BookingWidget bookingKey={slug} source="quote_page" brand={pal.brand} onBrand={pal.on} className="mb-4" />
            {done ? (
              <Confirmation name={name} phone={data.phone} reference={done.reference} pal={pal} />
            ) : (
              <RequestForm
                slug={slug}
                name={name}
                services={services.length ? services : DEFAULT_SERVICES}
                pal={pal}
                onDone={setDone}
                blocked={isPreview && data.enabled === false}
              />
            )}
          </section>

          {/* Details */}
          <section className="mt-10 space-y-8 lg:mt-12">
            {data.about && (
              <div>
                <h2 className="text-[18px] font-semibold text-slate-900">About {name}</h2>
                <p className="mt-2 text-[15px] text-slate-700 leading-relaxed whitespace-pre-line max-w-2xl">
                  {data.about}
                </p>
              </div>
            )}

            {services.length > 0 && (
              <div>
                <h2 className="text-[18px] font-semibold text-slate-900">What we do</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {services.map((s) => (
                    <li
                      key={s}
                      className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-[14px] text-slate-800"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {areas.length > 0 && (
              <div>
                <h2 className="text-[18px] font-semibold text-slate-900">Areas we cover</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {areas.map((a) => (
                    <li
                      key={a}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 text-[14px] text-slate-800"
                    >
                      <MapPin className="h-3.5 w-3.5" style={{ color: pal.ink }} />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data.trust?.reviews && data.trust.reviews.items.length > 0 && (
              <div>
                <h2 className="text-[18px] font-semibold text-slate-900">What customers say</h2>
                <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                  {data.trust.reviews.items.map((r, i) => (
                    <li key={i} className="rounded-xl bg-white border border-slate-200 p-4">
                      <div className="flex items-center gap-0.5" aria-label={`${r.rating} out of 5`}>
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            className="h-4 w-4"
                            style={{ color: j < r.rating ? '#d97706' : '#cbd5e1' }}
                            fill={j < r.rating ? '#d97706' : 'none'}
                          />
                        ))}
                      </div>
                      {r.text && <p className="mt-2 text-[15px] text-slate-800 leading-relaxed">{r.text}</p>}
                      <p className="mt-2 text-[13px] text-slate-600">Verified customer, {r.month}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {data.phone && (
                <a
                  href={`tel:${data.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-white border border-slate-300 text-[14px] font-semibold text-slate-900 touch-manipulation"
                >
                  <Phone className="h-4 w-4" /> {data.phone}
                </a>
              )}
              {data.website && (
                <a
                  href={/^https?:\/\//.test(data.website) ? data.website : `https://${data.website}`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-white border border-slate-300 text-[14px] font-semibold text-slate-900 touch-manipulation"
                >
                  <Globe className="h-4 w-4" /> {data.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </a>
              )}
            </div>
          </section>
        </div>

        <footer className="mt-14 border-t border-slate-200 pt-5 text-[13px] text-slate-600 leading-relaxed">
          Your details go only to {name}, so they can reply to your request.{' '}
          <a href="/privacy" className="underline text-slate-700">
            Privacy
          </a>
          <span className="mx-1.5">·</span>
          Page by{' '}
          <a href="https://elec-mate.com" className="underline text-slate-700">
            Elec-Mate
          </a>
        </footer>
      </main>
    </div>
  );
}

/* ── The 3-step form ──────────────────────────────────────────────────── */

type Pal = ReturnType<typeof brandPalette>;

function RequestForm({
  slug,
  name,
  services,
  pal,
  onDone,
  blocked = false,
}: {
  slug: string;
  name: string;
  services: string[];
  pal: Pal;
  /** Preview of a switched-off page: the form shows but cannot send. */
  blocked?: boolean;
  onDone: (r: { reference: string | null }) => void;
}) {
  const startedAt = useRef(Date.now());
  const submit = useSubmitQuoteRequest();
  const [step, setStep] = useState(1);
  const [jobType, setJobType] = useState('');
  const [other, setOther] = useState(false);
  const [details, setDetails] = useState('');
  const [postcode, setPostcode] = useState('');
  const [timing, setTiming] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [preparing, setPreparing] = useState(false);
  const [contact, setContact] = useState({ name: '', phone: '', email: '' });
  const [website, setWebsite] = useState(''); // honeypot
  const [err, setErr] = useState<string | null>(null);
  const [tried, setTried] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const formTop = useRef<HTMLDivElement>(null);

  useEffect(() => () => photos.forEach((p) => URL.revokeObjectURL(p.preview)), []); // eslint-disable-line react-hooks/exhaustive-deps

  const go = (n: number) => {
    setErr(null);
    setStep(n);
    // Keep the step in view on a phone
    requestAnimationFrame(() =>
      formTop.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
  };

  const pick = (s: string) => {
    setJobType(s);
    setOther(false);
    setTimeout(() => go(2), 140);
  };

  const addPhotos = async (files: FileList | null) => {
    if (!files?.length) return;
    setPreparing(true);
    setErr(null);
    let failed = 0;
    for (const f of Array.from(files).slice(0, MAX_PHOTOS - photos.length)) {
      try {
        const ph = await shrink(f);
        setPhotos((p) => (p.length < MAX_PHOTOS ? [...p, ph] : p));
      } catch {
        failed++;
      }
    }
    setPreparing(false);
    if (failed) setErr('A photo could not be read. Try a JPEG or a screenshot of it.');
    if (fileRef.current) fileRef.current.value = '';
  };

  const phoneOk = !contact.phone.trim() || contact.phone.replace(/\D/g, '').length >= 7;
  const emailOk = !contact.email.trim() || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact.email.trim());
  const nameMissing = tried && contact.name.trim().length < 2;
  const reachMissing = tried && !contact.phone.trim() && !contact.email.trim();

  const send = async () => {
    if (blocked) return setErr('This is a preview of a switched-off page, so nothing is sent.');
    setTried(true);
    setErr(null);
    if (contact.name.trim().length < 2) return setErr('Please add your name.');
    if (!contact.phone.trim() && !contact.email.trim())
      return setErr('Add a phone number or an email so they can reply.');
    if (!phoneOk) return setErr('That phone number does not look right.');
    if (!emailOk) return setErr('That email address does not look right.');

    try {
      let requestId: string | null = null;
      if (photos.length && !website) {
        setUploading(true);
        const session = await beginLeadPageUpload(slug);
        requestId = session.requestId;
        for (let i = 0; i < photos.length; i++) {
          await uploadLeadPagePhoto(session.folder, photos[i].blob, i);
        }
      }
      setUploading(false);
      const r = await submit.mutateAsync({
        slug,
        name: contact.name.trim(),
        phone: contact.phone.trim(),
        email: contact.email.trim(),
        jobType: jobType.trim(),
        details: details.trim(),
        postcode: postcode.trim(),
        timing,
        requestId,
        website,
        elapsedMs: Date.now() - startedAt.current,
      });
      onDone(r);
      requestAnimationFrame(() =>
        formTop.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      );
    } catch (e) {
      setUploading(false);
      setErr(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    }
  };

  const busy = submit.isPending || uploading;
  const chipOn = { background: pal.brand, color: pal.on, borderColor: pal.brand };

  return (
    <div
      ref={formTop}
      className="scroll-mt-4 rounded-2xl bg-white border border-slate-200 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.25)] overflow-hidden"
    >
      <div className="h-1.5" style={{ background: pal.brand }} />
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[19px] font-semibold text-slate-900">Get a free quote</h2>
          <span className="text-[13px] font-medium text-slate-700">Step {step} of 3</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5" aria-hidden>
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-1.5 rounded-full"
              style={{ background: n <= step ? pal.brand : '#e2e8f0' }}
            />
          ))}
        </div>

        {/* Honeypot: off-screen, not focusable, ignored by people */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>

        {step === 1 && (
          <div className="mt-5">
            <p className="text-[15px] font-medium text-slate-900">What do you need?</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {services.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => pick(s)}
                  className="min-h-12 px-3 py-2 rounded-xl border text-left text-[14px] font-medium leading-snug text-slate-900 border-slate-300 bg-white touch-manipulation"
                  style={jobType === s && !other ? chipOn : undefined}
                >
                  {s}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOther(true);
                  setJobType('');
                }}
                className="min-h-12 px-3 py-2 rounded-xl border text-left text-[14px] font-medium text-slate-900 border-slate-300 bg-white touch-manipulation"
                style={other ? chipOn : undefined}
              >
                Something else
              </button>
            </div>
            {other && (
              <div className="mt-3 space-y-3">
                <input
                  autoFocus
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value.slice(0, 60))}
                  placeholder="In a few words, e.g. outside lights"
                  aria-label="What do you need?"
                  className={fieldCn}
                  style={{ ['--tw-ring-color' as string]: pal.brand }}
                />
                <NextButton pal={pal} disabled={!jobType.trim()} onClick={() => go(2)} />
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="mt-5 space-y-4">
            <BackLink onClick={() => go(1)} label={jobType || 'Change job'} />
            <div>
              <label htmlFor="qp-details" className="text-[15px] font-medium text-slate-900">
                Tell us a bit more
              </label>
              <textarea
                id="qp-details"
                value={details}
                onChange={(e) => setDetails(e.target.value.slice(0, 3000))}
                rows={4}
                placeholder="What's happening, how many rooms or points, anything we should know"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-[16px] text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 touch-manipulation"
                style={{ ['--tw-ring-color' as string]: pal.brand }}
              />
            </div>

            <div>
              <p className="text-[15px] font-medium text-slate-900">Photos (optional)</p>
              <p className="text-[14px] text-slate-700">
                A photo of your fuse board or the problem helps get a quicker, more accurate price.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {photos.map((ph, i) => (
                  <div key={ph.preview} className="relative h-20 w-20">
                    <img
                      src={ph.preview}
                      alt={`Photo ${i + 1}`}
                      className="h-20 w-20 rounded-xl object-cover border border-slate-200"
                    />
                    <button
                      type="button"
                      aria-label={`Remove photo ${i + 1}`}
                      onClick={() => {
                        URL.revokeObjectURL(ph.preview);
                        setPhotos((p) => p.filter((_, j) => j !== i));
                      }}
                      className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-slate-900 text-white grid place-items-center touch-manipulation"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {photos.length < MAX_PHOTOS && (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={preparing}
                    className="h-20 min-w-20 px-3 rounded-xl border-2 border-dashed border-slate-300 text-slate-800 text-[13px] font-medium flex flex-col items-center justify-center gap-1 touch-manipulation"
                  >
                    {preparing ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Camera className="h-5 w-5" />
                    )}
                    {photos.length ? 'Add another' : 'Add a photo'}
                  </button>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => addPhotos(e.target.files)}
              />
            </div>

            <div>
              <label htmlFor="qp-postcode" className="text-[15px] font-medium text-slate-900">
                Postcode of the job
              </label>
              <input
                id="qp-postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value.toUpperCase().slice(0, 10))}
                placeholder="e.g. M1 2AB"
                autoComplete="postal-code"
                autoCapitalize="characters"
                className={`mt-2 ${fieldCn}`}
                style={{ ['--tw-ring-color' as string]: pal.brand }}
              />
            </div>

            <div>
              <p className="text-[15px] font-medium text-slate-900">When do you need it?</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {TIMINGS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTiming(timing === t ? '' : t)}
                    className="min-h-11 px-3 py-2 rounded-xl border text-left text-[14px] font-medium text-slate-900 border-slate-300 bg-white touch-manipulation"
                    style={timing === t ? chipOn : undefined}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {err && <p className="text-[14px] text-red-700">{err}</p>}
            <NextButton pal={pal} disabled={preparing} onClick={() => go(3)} />
          </div>
        )}

        {step === 3 && (
          <form
            className="mt-5 space-y-3"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <BackLink onClick={() => go(2)} label="Back to details" />
            <p className="text-[15px] font-medium text-slate-900">How can {name} reach you?</p>
            <input
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value.slice(0, 120) })}
              placeholder="Your name"
              aria-label="Your name"
              autoComplete="name"
              className={`${fieldCn} ${nameMissing ? 'border-red-500' : ''}`}
              style={{ ['--tw-ring-color' as string]: pal.brand }}
            />
            <input
              value={contact.phone}
              onChange={(e) => setContact({ ...contact, phone: e.target.value.slice(0, 30) })}
              placeholder="Phone"
              aria-label="Phone number"
              inputMode="tel"
              type="tel"
              autoComplete="tel"
              className={`${fieldCn} ${reachMissing || (tried && !phoneOk) ? 'border-red-500' : ''}`}
              style={{ ['--tw-ring-color' as string]: pal.brand }}
            />
            <input
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value.slice(0, 200) })}
              placeholder="Email (for your confirmation)"
              aria-label="Email address"
              inputMode="email"
              type="email"
              autoComplete="email"
              className={`${fieldCn} ${reachMissing || (tried && !emailOk) ? 'border-red-500' : ''}`}
              style={{ ['--tw-ring-color' as string]: pal.brand }}
            />
            <p className="text-[13px] text-slate-700">
              A phone number or an email is enough. Your details go only to {name}.
            </p>

            {err && <p className="text-[14px] text-red-700">{err}</p>}

            <button
              type="submit"
              disabled={busy || blocked}
              className="w-full h-12 rounded-xl font-semibold text-[16px] flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70 touch-manipulation"
              style={{ background: pal.brand, color: pal.on }}
            >
              {busy ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {uploading ? 'Sending photos…' : 'Sending…'}
                </>
              ) : (
                'Send my request'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function NextButton({ pal, disabled, onClick }: { pal: Pal; disabled?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="w-full h-12 rounded-xl font-semibold text-[16px] flex items-center justify-center gap-2 disabled:opacity-50 touch-manipulation"
      style={{ background: pal.brand, color: pal.on }}
    >
      Next <ArrowRight className="h-4 w-4" />
    </button>
  );
}

function BackLink({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 h-11 -ml-1 pr-2 text-[14px] font-medium text-slate-800 touch-manipulation"
    >
      <ChevronLeft className="h-4 w-4" /> {label}
    </button>
  );
}

function Confirmation({
  name,
  phone,
  reference,
  pal,
}: {
  name: string;
  phone?: string | null;
  reference: string | null;
  pal: Pal;
}) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 text-center shadow-[0_10px_30px_-12px_rgba(15,23,42,0.25)]">
      <div
        className="mx-auto mb-4 h-14 w-14 rounded-full grid place-items-center"
        style={{ background: pal.brand, color: pal.on }}
      >
        <Check className="h-7 w-7" />
      </div>
      <h2 className="text-[22px] font-semibold text-slate-900">Request sent</h2>
      <p className="mt-2 text-[15px] text-slate-700">
        {name} has your request and will be in touch soon.
        {reference ? ` Your reference is ${reference}.` : ''}
      </p>
      <ol className="mt-6 space-y-3 text-left">
        {[
          `${name} reads your request and any photos`,
          'They call or email you to ask anything they need',
          'You get a clear quote with no obligation',
        ].map((s, i) => (
          <li key={s} className="flex items-start gap-3 text-[15px] text-slate-800">
            <span
              className="h-7 w-7 shrink-0 rounded-full grid place-items-center text-[13px] font-semibold"
              style={{ background: pal.brand, color: pal.on }}
            >
              {i + 1}
            </span>
            <span className="pt-0.5">{s}</span>
          </li>
        ))}
      </ol>
      {phone && (
        <a
          href={`tel:${phone.replace(/\s+/g, '')}`}
          className="mt-6 inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl border border-slate-300 text-[15px] font-semibold text-slate-900 touch-manipulation"
        >
          <Phone className="h-4 w-4" /> Call {phone}
        </a>
      )}
    </div>
  );
}
