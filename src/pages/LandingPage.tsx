import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { JsonLd } from '@/components/seo/JsonLd';
import { StoreBadges } from '@/components/seo/StoreBadges';
import { useAuth } from '@/contexts/AuthContext';
import {
  trackLandingCtaClicked,
  trackLandingSectionViewed,
  trackLeadMagnetDownloaded,
} from '@/lib/analytics-events';
import { usePublicStats } from '@/hooks/usePublicStats';
import { useUserCount } from '@/hooks/useUserCount';
import { ExitIntentModal } from '@/components/landing/ExitIntentModal';
import { EmailCaptureForm } from '@/components/landing/EmailCaptureForm';
import { TeamSignupForm } from '@/components/landing/TeamSignupForm';
import { cn } from '@/lib/utils';
import { PlainTermsStrip } from '@/components/employer/settings/import/PlainTerms';
import { CARD_BASE, CARD_NEUTRAL, CARD_PRIMARY } from '@/components/ui/card-recipe';

/**
 * Landing page v4 — rebuilt 4 Oct 2026 on the app's Volt design.
 *
 * What changed from v3 (ELE-1233) and why:
 *  - One primary action. "Sign in" is a text link in the nav, not a second
 *    button of equal weight in the hero.
 *  - Outcome headline + who it's for; the card-on-file trial stated plainly
 *    under the button (everyone else leads with "no card" — so we reassure
 *    harder, not less).
 *  - Three jobs, each with a real phone screen, instead of an 8-card wall.
 *  - Removed: competitor names ("Replaces: …") — we never publish competitor
 *    claims; "sparks"; the ★★★★★ pill (the App Store rating is 4.3 from 18
 *    ratings — a real 4.3 is also more believable than a perfect 5); "46+
 *    courses" (the app lists 45); grey text; translucent yellow cards.
 *  - Research brief (Unbounce 2024 SaaS benchmark, NN/g scrolling + concise
 *    copy studies): short plain copy, key message in the first screen, real
 *    product screens, prices on the page, sticky CTA on phones.
 *
 * Volt rules: no icons; volt is a solid fill, a line or text, never a
 * translucent wash; all text is white.
 */

// Checked 4 Oct 2026: Google Play 5.0 from 6 reviews (store page), App Store
// 4.33 from 18 ratings (iTunes lookup API). Lead with Google's 5.0 (Andrew,
// 4 Oct) but never say "5 stars on the app stores" — the App Store isn't.
// Update by hand — never round up.
const PLAY_RATING = { score: '5.0', count: 6 };
const APP_STORE_RATING = { score: '4.3', count: 18 };

// Phone renders with real app captures set into them (4 Oct 2026).
const HERO_IMG = '/images/landing/v5/dashboard-phone.webp';

const STEPS = [
  {
    key: 'quote',
    eyebrow: 'Quote',
    title: 'Price it before you leave the drive.',
    body: 'Build the quote from your own price book and send it as a PDF. The client accepts it online, and when the job’s done it becomes the invoice in one tap.',
    img: '/images/landing/v5/quotes-phone.webp',
    w: 700,
    h: 1084,
    alt: 'Quotes in Elec-Mate — pipeline, drafts, sent and won',
  },
  {
    key: 'certify',
    eyebrow: 'Certify',
    title: 'Fill the cert in as you test.',
    body: 'EICR, EIC, Minor Works and over 20 specialist certificates, on BS 7671:2018+A4:2026. It works with no signal and syncs when you’re back. Your client gets a clean PDF.',
    img: '/images/landing/v5/eicr-phone.webp',
    w: 700,
    h: 1249,
    alt: 'An EICR schedule of tests being filled in, circuit by circuit',
  },
  {
    key: 'ask',
    eyebrow: 'Ask',
    title: 'Check the regs without the book.',
    body: 'Ask Elec-AI anything on BS 7671 — Zs limits, RCD rules, what code to give. Every answer cites the regulation it comes from, so you can check it yourself.',
    img: '/images/landing/v5/elec-ai-phone.webp',
    w: 700,
    h: 1227,
    alt: 'Elec-AI answering a BS 7671 question with the regulation cited',
  },
];

// Each path shows the hub tiles from the app itself — same 2×2 grid, same
// solid-volt first tile as "Start a cert" in Inspection & Testing.
// Apprentice side, same shape as STEPS. Screens are real captures (4 Oct
// 2026); every tile below is a live feature in the Apprentice Hub.
const APPRENTICE_STEPS = [
  {
    key: 'learn',
    eyebrow: 'Learn',
    title: 'Every course, in your pocket.',
    body: 'Level 2, Level 3, AM2 prep and upskilling — 46 courses that fit round college and site. Pick up where you left off in a tap.',
    img: '/images/landing/v5/courses-phone.webp',
    alt: 'Browse courses in Elec-Mate — Level 2, Level 3, AM2 preparation and more',
  },
  {
    key: 'practise',
    eyebrow: 'Practise',
    title: 'Mock exams that feel like the real thing.',
    body: 'Timed papers for the AM2 knowledge test, 18th Edition, 2391 and more, with a worked explanation on every question when you finish.',
    img: '/images/landing/v5/mock-exam-phone.webp',
    alt: 'A timed AM2 knowledge test mock exam in Elec-Mate',
  },
  {
    key: 'evidence',
    eyebrow: 'Evidence',
    title: 'Your portfolio, built as you go.',
    body: 'Log your site diary, add photo evidence and track your off-the-job hours from the Apprentice Hub — so the portfolio’s done before your tutor asks.',
    img: '/images/landing/v5/appr-hub-phone.webp',
    alt: 'The Elec-Mate Apprentice Hub — study, diary, evidence and off-the-job hours',
  },
];

const APPRENTICE_EXTRAS = [
  ['AM2 simulator', 'Testing, fault finding and safe isolation.'],
  ['EPA simulator', 'Mock professional discussions, AI scored.'],
  ['Flashcards', 'Bring back what you’re due to revise.'],
  ['Study assistant', 'Elec-AI explains the regs in plain English.'],
];

const PATHS = [
  {
    role: 'apprentice' as const,
    label: 'For apprentices',
    title: 'From Level 2 to your AM2.',
    tiles: [
      ['Courses', 'Level 2, Level 3 and upskilling — 46 in all'],
      ['AM2 prep', 'Mock exams and the practical, step by step'],
      ['Portfolio', 'Evidence and OJT hours logged as you go'],
      ['Revision', 'Flashcards that bring back what’s due'],
    ],
    price: '£6.99',
    cta: 'Start as an apprentice',
  },
  {
    role: 'electrician' as const,
    label: 'For electricians',
    title: 'Certs, quotes and invoices, done on site.',
    tiles: [
      ['Certificates', 'EICR, EIC, Minor Works and 20+ more'],
      ['Quotes', 'From your price book, accepted online'],
      ['Invoices', 'With card payment links'],
      ['Elec-AI', 'BS 7671 answers with the reg cited'],
    ],
    price: '£19.99',
    cta: 'Start as an electrician',
  },
];

// Grouped the way the job runs. Every item is a live feature (checked
// against the app and its edge functions, 4 Oct 2026).
const ALSO = [
  {
    group: 'On site',
    items: [
      ['Board scanner', 'Photograph the board — circuits read in for you.'],
      ['Voice test results', 'Speak readings straight into the schedule.'],
      ['RAMS and method statements', 'Written for the job in minutes.'],
      ['Toolbox talks and briefings', 'Brief the team, get it signed.'],
      ['Photo records', 'Before and after, with times, on every job.'],
      ['63 calculators', 'Cable sizing, Zs, voltage drop and more.'],
    ],
  },
  {
    group: 'In the office',
    items: [
      ['Circuit designer', 'Cable, protection and earthing worked out by AI.'],
      ['AI cost engineer', 'Materials and labour priced for the job.'],
      ['Price book', 'Your own rates, ready for every quote.'],
      ['Jobs and calendar', 'Synced with Google Calendar.'],
      ['Part P tracker', 'Know what still needs notifying.'],
      ['Elec-ID', 'Your qualifications on a card clients can check.'],
    ],
  },
  {
    group: 'Getting paid',
    items: [
      ['Quotes accepted online', 'Clients accept and sign from a link.'],
      ['Invoice from the quote', 'One tap when the job’s done.'],
      ['Card payment links', 'Clients pay by card or Apple Pay.'],
      ['Accounts sync', 'Xero, QuickBooks, Sage or FreshBooks.'],
    ],
  },
];

// Real 5★ App Store reviews, quoted as written. Picked ones that name no
// other product.
const REVIEWS = [
  {
    who: 'I.staffy',
    date: 'Apr 2026',
    quote:
      'A true all in one app for quotes, certs, calculations, RAMS, EICRs, and more. I use it every day without fail.',
  },
  {
    who: 'Jayecco',
    date: 'Mar 2026',
    quote:
      'I can invoice, complete testing certs and reports as well as track my CPD. Everything in one place is exactly what I need, worth every penny.',
  },
  {
    who: 'Cam5303',
    date: 'Jun 2026',
    quote:
      'Everything in one — ranging from calculators to EICs, or to freshen your memory up on something. Brilliant piece of kit, would totally recommend.',
  },
];

const PLANS = [
  {
    name: 'Electrician',
    price: '£19.99',
    yearly: '£199.99',
    role: 'electrician',
    for: 'Qualified and running your own work.',
    points: [
      'Every certificate, on A4:2026',
      'Quotes, invoices and card payments',
      'Elec-AI, RAMS and calculators',
      'Everything in Apprentice',
    ],
    featured: true,
  },
  {
    name: 'Apprentice',
    price: '£6.99',
    yearly: '£69.99',
    role: 'apprentice',
    for: 'Working towards your AM2.',
    points: [
      'Level 2 and 3 courses',
      'AM2 prep and mock exams',
      'Digital portfolio and OJT hours',
      'Elec-AI to explain the regs',
    ],
  },
];

const FAQS = [
  {
    q: 'Do I pay anything to start?',
    a: 'No. It’s £0 today and seven days free. You add a card to start (or your Apple or Google account in the app), but nothing is taken. We remind you before the trial ends, and if you cancel before day 8 you pay nothing.',
  },
  {
    q: 'What happens to my certificates if I cancel?',
    a: 'They’re yours. Export any certificate, quote or invoice as a PDF while you’re subscribed. If you cancel, nothing is deleted — it’s all there if you come back.',
  },
  {
    q: 'Is it up to date with Amendment 4:2026?',
    a: 'Yes. The certificates, calculators and Elec-AI are all on BS 7671:2018+A4:2026.',
  },
  {
    q: 'Does it work with no signal?',
    a: 'Certificates and testing do — fill them in anywhere and they sync when you’re back in signal. Elec-AI and the board scanner need a connection.',
  },
  {
    q: 'Can I use it on my phone and my laptop?',
    a: 'Yes. One account on iPhone, Android and the web. Start on site, finish at home.',
  },
  {
    q: 'Which plan do I need?',
    a: 'Working towards your AM2: Apprentice. Qualified and doing your own work: Electrician, which includes everything in Apprentice.',
  },
];

const FREE_TOOLS = [
  {
    to: '/mock-exams',
    label: 'Mock exams',
    tag: 'No sign-up',
    desc: 'AM2 knowledge test, 18th Edition, 2391 and more — timed, with every answer explained.',
  },
  {
    to: '/tools/cable-sizing-calculator',
    label: 'Calculators',
    tag: 'No sign-up',
    desc: 'Cable sizing, voltage drop, Zs and more, to BS 7671.',
  },
  {
    to: '/guides/electrical-symbols-chart',
    label: 'Electrical symbols chart',
    tag: 'Free PDF',
    desc: 'Every symbol on one printable A4 sheet.',
  },
];

const GUIDES = [
  { to: '/tools/eicr-certificate', label: 'EICR certificate app' },
  { to: '/tools/cable-sizing-calculator', label: 'Cable sizing calculator' },
  { to: '/tools/voltage-drop-calculator', label: 'Voltage drop calculator' },
  { to: '/minor-works-certificate', label: 'Minor Works certificate' },
  { to: '/electrical-testing-calculators', label: 'Testing calculators' },
  { to: '/ai-electrician-tools', label: 'AI tools for electricians' },
  { to: '/eighteenth-edition-course', label: '18th Edition course' },
  { to: '/apprentice-training', label: 'Apprentice training' },
];

// ── Shared bits ─────────────────────────────────────────────────────────

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
    {children}
  </p>
);

const H2 = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h2
    className={cn(
      'mt-3 text-[30px] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-[40px]',
      className
    )}
  >
    {children}
  </h2>
);

const Hairline = () => (
  <span
    aria-hidden
    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/55 to-elec-yellow/0"
  />
);

const primaryCta =
  'inline-flex h-14 items-center justify-center rounded-2xl bg-elec-yellow px-8 text-[16px] font-bold text-black touch-manipulation transition-transform hover:bg-[hsl(47_100%_60%)] active:scale-[0.98]';

// The phone renders end mid-handset, so they fade out rather than stop. A mask
// (not an overlay inside overflow-hidden) — the clip left a hard rectangle
// where the phone's shadow was cut off.
const PHONE_FADE = {
  maskImage: 'linear-gradient(to bottom, #000 62%, transparent 96%)',
  WebkitMaskImage: 'linear-gradient(to bottom, #000 62%, transparent 96%)',
} as const;

const sectionCn = 'px-5 py-16 sm:py-20 lg:px-8 lg:py-24';

// ── Page ────────────────────────────────────────────────────────────────

const OfflineScreen = () => (
  <div className="flex min-h-[100svh] flex-col bg-background px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] text-white">
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <img
        src="/images/elec-mate-logo-wide.png"
        alt="Elec-Mate"
        width={358}
        height={312}
        className="w-[150px]"
      />
      <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
        No signal
      </p>
      <h1 className="mt-2 text-[28px] font-bold leading-tight tracking-[-0.02em] text-white">
        You’re offline right now
      </h1>
      <p className="mt-3 max-w-[20rem] text-[15px] leading-relaxed text-white">
        You need a connection to sign in. Anything already saved on this phone is safe and will sync
        when you’re back in signal.
      </p>
    </div>
    <button
      type="button"
      onClick={() => window.location.reload()}
      className="h-14 w-full rounded-2xl bg-elec-yellow text-[16px] font-bold text-black touch-manipulation active:scale-[0.98]"
    >
      Try again
    </button>
  </div>
);

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userCount = useUserCount({ realtime: false });
  const stats = usePublicStats();
  const isNative = Capacitor.isNativePlatform();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // The hero phone is the LCP element on phones. Injected (not Helmet) so it
  // lands in the live DOM and in the prerendered head.
  useEffect(() => {
    if (document.querySelector(`link[rel="preload"][href="${HERO_IMG}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = HERO_IMG;
    document.head.appendChild(link);
  }, []);

  // Sticky CTA once the hero button has scrolled away.
  const [stickyVisible, setStickyVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Section-view tracking — once per section per load (Vercel Analytics,
  // cookieless), so we can see how far down people get.
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-analytics-section]');
    if (!sections.length || typeof IntersectionObserver === 'undefined') return;
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const name = entry.target.getAttribute('data-analytics-section');
          if (entry.isIntersecting && name && !seen.has(name)) {
            seen.add(name);
            trackLandingSectionViewed({ section: name });
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.25 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goToSignup = (
    section: 'hero' | 'workflow' | 'final_cta',
    label?: string,
    role?: 'electrician' | 'apprentice'
  ) => {
    trackLandingCtaClicked({ section, label });
    navigate(role ? `/auth/signup?role=${role}` : '/auth/signup');
  };

  // In the apps, a signed-out start with no signal used to show this
  // marketing page with fallback figures ("700+ electricians"). Show a proper
  // offline screen instead (4 Oct 2026).
  const [online, setOnline] = useState(() =>
    typeof navigator === 'undefined' ? true : navigator.onLine
  );
  useEffect(() => {
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener('online', up);
    window.addEventListener('offline', down);
    return () => {
      window.removeEventListener('online', up);
      window.removeEventListener('offline', down);
    };
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  if (isNative && !online && !user) return <OfflineScreen />;

  // The app's ground (hsl 0 0% 11%), same as sign-in / sign-up, with darker
  // panels (8%) for the product shots — the phone renders are transparent.
  return (
    <div className="min-h-screen bg-background text-white">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Elec-Mate',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web, iOS, Android',
          description:
            'The app UK electricians run their work on — BS 7671 certificates, quotes, invoices, RAMS and regulations on your phone.',
          offers: {
            '@type': 'AggregateOffer',
            lowPrice: '6.99',
            highPrice: '19.99',
            priceCurrency: 'GBP',
            offerCount: '2',
          },
          featureList: [
            'BS 7671:2018+A4:2026 certificates (EICR, EIC, Minor Works and specialist)',
            'Quotes and invoices with card payments',
            'Elec-AI — BS 7671 answers with the regulation cited',
            'RAMS and method statements',
            'Electrical calculators',
            'Apprentice courses, AM2 prep and digital portfolio',
          ],
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQS.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />

      {/* ========== NAV ========== */}
      <nav
        className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-background/90 backdrop-blur-md"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="mx-auto flex h-14 max-w-[76rem] items-center justify-between px-5 lg:h-16 lg:px-8">
          <Link to="/" className="flex h-11 items-center gap-2.5 touch-manipulation">
            <img
              src="/images/landing/v5/logo-96.webp"
              alt=""
              className="h-8 w-8 rounded-lg lg:h-9 lg:w-9"
            />
            <span className="text-[17px] font-bold tracking-tight lg:text-[19px]">
              Elec-<span className="text-elec-yellow">Mate</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <button
              type="button"
              onClick={() => scrollTo('how')}
              className="inline-flex h-11 items-center text-[15px] font-medium text-white hover:text-elec-yellow"
            >
              How it works
            </button>
            <button
              type="button"
              onClick={() => scrollTo('pricing')}
              className="inline-flex h-11 items-center text-[15px] font-medium text-white hover:text-elec-yellow"
            >
              Pricing
            </button>
            <button
              type="button"
              onClick={() => scrollTo('teams')}
              className="inline-flex h-11 items-center text-[15px] font-medium text-white hover:text-elec-yellow"
            >
              For teams
            </button>
            <Link
              to="/guides"
              className="inline-flex h-11 items-center text-[15px] font-medium text-white hover:text-elec-yellow"
            >
              Guides
            </Link>
          </div>

          <div className="flex items-center gap-1 sm:gap-3">
            {user ? (
              <Link
                to="/dashboard"
                className="inline-flex h-10 items-center rounded-xl bg-elec-yellow px-4 text-[14px] font-bold text-black touch-manipulation"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/auth/signin"
                  className="inline-flex h-11 items-center px-3 text-[14px] font-semibold text-white touch-manipulation"
                >
                  Sign in
                </Link>
                <Link
                  to="/auth/signup"
                  onClick={() => trackLandingCtaClicked({ section: 'nav' })}
                  className="inline-flex h-10 items-center rounded-xl bg-elec-yellow px-4 text-[14px] font-bold text-black touch-manipulation active:scale-[0.98]"
                >
                  Start free
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ========== HERO ========== */}
      <section
        data-analytics-section="hero"
        className="relative overflow-hidden px-5 pb-12 pt-[calc(env(safe-area-inset-top)+5.5rem)] lg:px-8 lg:pb-20 lg:pt-32"
      >
        <div className="mx-auto max-w-[76rem] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div>
            <Eyebrow>For UK electricians and apprentices</Eyebrow>
            <h1 className="mt-3 text-[44px] font-bold leading-[1.0] tracking-[-0.035em] text-white sm:text-[60px] lg:text-[60px] xl:text-[72px]">
              <span className="block">Learn the trade.</span>
              <span className="block text-elec-yellow">Run the trade.</span>
            </h1>
            <p className="mt-5 max-w-[34rem] text-[17px] leading-[1.55] text-white sm:text-[19px]">
              One app from your first day as an apprentice to running your own jobs — courses and
              AM2 prep, then certificates, quotes and invoices done on site.
            </p>

            {!user && (
              <div className="mt-8 sm:max-w-[360px]">
                <button
                  type="button"
                  onClick={() => goToSignup('hero')}
                  className={cn(primaryCta, 'w-full')}
                >
                  Start your free week
                </button>
                {/* One line of reassurance, not a paragraph: the card-on-file
                    fact stays up front (everyone else says "no card"), the
                    prices live in the two paths just below. */}
                <p className="mt-3 text-[13.5px] leading-relaxed text-white">
                  <span className="font-semibold text-elec-yellow">£0 today</span> · card needed,
                  nothing charged for 7 days · cancel in two taps
                </p>
              </div>
            )}
            {user && (
              <Link to="/dashboard" className={cn(primaryCta, 'mt-8 w-full sm:w-auto')}>
                Go to your dashboard
              </Link>
            )}

            <p className="mt-6 text-[13.5px] font-medium text-white">
              <span className="tracking-[0.12em] text-elec-yellow">★★★★★</span>{' '}
              <span className="font-bold">{PLAY_RATING.score}</span> on Google Play ·{' '}
              <span className="font-bold">{APP_STORE_RATING.score}</span> on the App Store
            </p>
          </div>

          {/* The original phone renders (same device art as the app store
              shots) with today's real screens set into them — 4 Oct 2026.
              The renders end mid-phone, so they run into a fade at the
              bottom rather than stopping in a box. */}
          <div
            className="relative mx-auto mt-10 h-[460px] w-full max-w-[440px] sm:h-[540px] lg:mt-0 lg:h-[640px] lg:max-w-none"
            style={PHONE_FADE}
          >
            <img
              src="/images/landing/v5/certs-phone.webp"
              alt=""
              aria-hidden
              width={700}
              height={1084}
              className="absolute left-0 top-12 w-[52%] -rotate-[6deg] lg:left-[4%] lg:top-16 lg:w-[270px] xl:w-[290px]"
            />
            <img
              src={HERO_IMG}
              alt="The Elec-Mate dashboard — start a certificate, quote or invoice, and see what's overdue"
              width={700}
              height={1084}
              {...{ fetchpriority: 'high' }}
              className="absolute right-0 top-0 w-[60%] rotate-[3deg] lg:right-[6%] lg:w-[320px] xl:w-[340px]"
            />
          </div>
        </div>
      </section>

      {/* ========== NUMBERS ========== */}
      <section
        data-analytics-section="numbers"
        className="border-y border-white/[0.08] bg-white/[0.03] px-5 lg:px-8"
      >
        <dl className="mx-auto grid max-w-[76rem] grid-cols-3 divide-x divide-white/[0.08]">
          {[
            { v: userCount, k: 'electricians and apprentices' },
            { v: stats.quoted, k: 'quoted through the app' },
            { v: `${PLAY_RATING.score}★`, k: `Google Play · ${APP_STORE_RATING.score} App Store` },
          ].map((s) => (
            <div key={s.k} className="px-2 py-6 text-center sm:py-8">
              <dt className="sr-only">{s.k}</dt>
              <dd className="text-[24px] font-bold tabular-nums tracking-tight text-white sm:text-[34px]">
                {s.v}
              </dd>
              <dd className="mt-1 text-[12px] leading-snug text-white sm:text-[14px]">{s.k}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ========== TWO PATHS ==========
          The page is for both audiences (Andrew, 4 Oct 2026): say who each half
          is for before showing how it works. */}
      <section data-analytics-section="paths" className={sectionCn}>
        <div className="mx-auto max-w-[76rem]">
          <Eyebrow>Who it’s for</Eyebrow>
          <H2 className="max-w-[20ch]">Wherever you are in the trade.</H2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {PATHS.map((p) => (
              <div
                key={p.role}
                className="relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-5 sm:p-7"
              >
                <Hairline />
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
                  {p.label}
                </p>
                <h3 className="mt-2 text-[24px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[28px]">
                  {p.title}
                </h3>
                <div className="mt-5 grid flex-1 grid-cols-2 gap-2.5 sm:gap-3">
                  {p.tiles.map(([t, d], i) => (
                    <div
                      key={t}
                      className={cn(
                        CARD_BASE,
                        i === 0 ? CARD_PRIMARY : CARD_NEUTRAL,
                        'relative min-h-[104px] overflow-hidden p-3.5 sm:min-h-[116px] sm:p-4'
                      )}
                    >
                      {i !== 0 && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/55 to-elec-yellow/0"
                        />
                      )}
                      <span
                        className={cn(
                          'text-[16px] font-bold leading-tight tracking-tight',
                          i === 0 ? 'text-black' : 'text-white'
                        )}
                      >
                        {t}
                      </span>
                      <span
                        className={cn(
                          'mt-1 text-[12.5px] leading-snug',
                          i === 0 ? 'text-black' : 'text-white'
                        )}
                      >
                        {d}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-3 border-t border-white/[0.08] pt-4">
                  <p className="text-[14px] text-white">
                    <span className="text-[24px] font-bold tracking-tight text-white">
                      {p.price}
                    </span>{' '}
                    a month
                  </p>
                  <p className="text-[13px] text-white">after 7 days free</p>
                </div>
                {!user && (
                  <button
                    type="button"
                    onClick={() => goToSignup('workflow', `path_${p.role}`, p.role)}
                    className={cn(
                      'mt-4 flex h-12 w-full items-center justify-center rounded-2xl text-[15px] font-bold touch-manipulation active:scale-[0.98]',
                      p.role === 'electrician'
                        ? 'bg-elec-yellow text-black'
                        : 'border border-elec-yellow text-elec-yellow'
                    )}
                  >
                    {p.cta}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section
        id="how"
        data-analytics-section="workflow"
        className="scroll-mt-20 px-5 pb-4 lg:px-8"
      >
        <div className="mx-auto max-w-[76rem]">
          <Eyebrow>For electricians</Eyebrow>
          <H2 className="max-w-[18ch]">
            One job, start to finish. <span className="text-elec-yellow">Finished on site.</span>
          </H2>

          <div className="mt-10 space-y-10 lg:mt-14 lg:space-y-20">
            {STEPS.map((s, i) => (
              <div
                key={s.key}
                className="grid items-center gap-6 md:grid-cols-2 md:gap-10 lg:gap-16"
              >
                <div className={cn(i % 2 === 1 && 'md:order-2')}>
                  <p className="text-[13px] font-semibold tabular-nums text-elec-yellow">
                    {String(i + 1).padStart(2, '0')} · {s.eyebrow}
                  </p>
                  <h3 className="mt-2 text-[26px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[32px]">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-[30rem] text-[16px] leading-[1.6] text-white sm:text-[17px]">
                    {s.body}
                  </p>
                </div>
                <div
                  className={cn(
                    'relative mx-auto h-[380px] w-full max-w-[260px] sm:h-[460px] sm:max-w-[300px] md:h-[540px] md:max-w-[330px]',
                    i % 2 === 1 && 'md:order-1'
                  )}
                  style={PHONE_FADE}
                >
                  <img
                    src={s.img}
                    alt={s.alt}
                    width={s.w}
                    height={s.h}
                    loading="lazy"
                    decoding="async"
                    className="w-full"
                  />
                </div>
              </div>
            ))}
          </div>

          {!user && (
            <div className="mt-14 sm:max-w-[360px] lg:mx-auto">
              <button
                type="button"
                onClick={() => goToSignup('workflow')}
                className={cn(primaryCta, 'w-full')}
              >
                Try it on your next job
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ========== APPRENTICES ==========
          Built like the electrician steps above (Andrew, 4 Oct: "for
          apprentices we need to be better") — three steps, each with a real
          screen, then the rest of the apprentice kit as app tiles. */}
      <section data-analytics-section="apprentices" className={sectionCn}>
        <div className="mx-auto max-w-[76rem]">
          <Eyebrow>For apprentices</Eyebrow>
          <H2 className="max-w-[20ch]">
            Revise on the bus. <span className="text-elec-yellow">Turn up to your AM2 ready.</span>
          </H2>

          <div className="mt-10 space-y-10 lg:mt-14 lg:space-y-20">
            {APPRENTICE_STEPS.map((s, i) => (
              <div
                key={s.key}
                className="grid items-center gap-6 md:grid-cols-2 md:gap-10 lg:gap-16"
              >
                <div className={cn(i % 2 === 0 && 'md:order-2')}>
                  <p className="text-[13px] font-semibold tabular-nums text-elec-yellow">
                    {String(i + 1).padStart(2, '0')} · {s.eyebrow}
                  </p>
                  <h3 className="mt-2 text-[26px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[32px]">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-[30rem] text-[16px] leading-[1.6] text-white sm:text-[17px]">
                    {s.body}
                  </p>
                </div>
                <div
                  className={cn(
                    'relative mx-auto h-[380px] w-full max-w-[260px] sm:h-[460px] sm:max-w-[300px] md:h-[540px] md:max-w-[330px]',
                    i % 2 === 0 && 'md:order-1'
                  )}
                  style={PHONE_FADE}
                >
                  <img
                    src={s.img}
                    alt={s.alt}
                    width={700}
                    height={1084}
                    loading="lazy"
                    decoding="async"
                    className="w-full"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
              Also for apprentices
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
              {APPRENTICE_EXTRAS.map(([k, v]) => (
                <li
                  key={k}
                  className={cn(
                    CARD_BASE,
                    CARD_NEUTRAL,
                    'relative min-h-[96px] overflow-hidden p-3.5 sm:p-4'
                  )}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/55 to-elec-yellow/0"
                  />
                  <span className="text-[15px] font-bold leading-tight tracking-tight text-white sm:text-[16px]">
                    {k}
                  </span>
                  <span className="mt-1 text-[12.5px] leading-snug text-white sm:text-[13.5px]">
                    {v}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {!user && (
            <div className="mt-10 sm:max-w-[360px]">
              <button
                type="button"
                onClick={() => goToSignup('workflow', 'apprentice_band', 'apprentice')}
                className="flex h-14 w-full items-center justify-center rounded-2xl border border-elec-yellow text-[16px] font-bold text-elec-yellow touch-manipulation active:scale-[0.98]"
              >
                Start as an apprentice · £6.99 a month
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ========== ALSO IN THE APP ========== */}
      <section data-analytics-section="also" className={sectionCn}>
        <div className="mx-auto max-w-[76rem]">
          <Eyebrow>Also in the app</Eyebrow>
          <H2>
            The rest of the job, sorted.{' '}
            <span className="text-elec-yellow">All in the one app.</span>
          </H2>
          <div className="mt-8 space-y-8 lg:mt-10">
            {ALSO.map((g) => (
              <div key={g.group}>
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
                  {g.group}
                </p>
                <ul
                  className={cn(
                    'mt-3 grid grid-cols-2 gap-2.5 sm:gap-3',
                    g.items.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
                  )}
                >
                  {g.items.map(([k, v]) => (
                    <li
                      key={k}
                      className={cn(
                        CARD_BASE,
                        CARD_NEUTRAL,
                        'relative min-h-[96px] overflow-hidden p-3.5 sm:p-4'
                      )}
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/55 to-elec-yellow/0"
                      />
                      <span className="text-[15px] font-bold leading-tight tracking-tight text-white sm:text-[16px]">
                        {k}
                      </span>
                      <span className="mt-1 text-[12.5px] leading-snug text-white sm:text-[13.5px]">
                        {v}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== REVIEWS ========== */}
      <section data-analytics-section="testimonials" className={sectionCn}>
        <div className="mx-auto max-w-[76rem]">
          <Eyebrow>On the App Store</Eyebrow>
          <H2>In their words.</H2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure
                key={r.who}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-6"
              >
                <Hairline />
                <p className="text-[15px] tracking-[0.2em] text-elec-yellow" aria-label="5 stars">
                  ★★★★★
                </p>
                <blockquote className="mt-3 flex-1 text-[16px] leading-[1.6] text-white">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-5 text-[13px] font-medium text-white">
                  {r.who} · App Store review · {r.date}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Founder */}
          <div className="mt-12 flex items-start gap-4 border-t border-white/[0.08] pt-8 sm:items-center">
            <img
              src="/images/landing/v4/andrew.webp"
              alt="Andrew Moore"
              width={160}
              height={160}
              loading="lazy"
              className="h-14 w-14 shrink-0 rounded-full object-cover"
            />
            <p className="max-w-[44rem] text-[15px] leading-[1.6] text-white">
              <span className="font-semibold">Built by an electrician.</span> Elec-Mate is made in
              the UK by Andrew Moore, a qualified electrician. Something not working the way the job
              does? Tell him:{' '}
              <span className="font-semibold text-elec-yellow">founder@elec-mate.com</span>
            </p>
          </div>
        </div>
      </section>

      {/* ========== PRICING ========== */}
      <section
        id="pricing"
        data-analytics-section="pricing"
        className={cn(sectionCn, 'scroll-mt-20 pt-4 sm:pt-4 lg:pt-4')}
      >
        <div className="mx-auto max-w-[76rem]">
          <Eyebrow>Pricing</Eyebrow>
          <H2>
            <span className="text-elec-yellow">£0 today.</span> Two plans after.
          </H2>
          <p className="mt-4 max-w-[38rem] text-[16px] leading-[1.6] text-white">
            Everything unlocked for seven days. You’re only charged if you keep it.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={cn(
                  'relative flex flex-col overflow-hidden rounded-3xl border bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-6 sm:p-8',
                  p.featured ? 'border-elec-yellow' : 'border-white/[0.12]'
                )}
              >
                {p.featured && <Hairline />}
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[22px] font-bold tracking-tight text-white">{p.name}</h3>
                  {p.featured && (
                    <span className="rounded-full bg-elec-yellow px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-black">
                      Most popular
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[14px] text-white">{p.for}</p>
                <p className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-[44px] font-bold leading-none tracking-[-0.04em] text-white">
                    {p.price}
                  </span>
                  <span className="text-[15px] font-medium text-white">a month</span>
                </p>
                <p className="mt-2 text-[13.5px] text-white">or {p.yearly} a year</p>
                <ul className="mt-6 flex-1 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                  {p.points.map((pt) => (
                    <li key={pt} className="py-3 text-[15px] text-white">
                      {pt}
                    </li>
                  ))}
                </ul>
                {!user && (
                  <Link
                    to={`/auth/signup?role=${p.role}`}
                    onClick={() => trackLandingCtaClicked({ section: 'pricing', label: p.name })}
                    className={cn(
                      'mt-6 inline-flex h-12 items-center justify-center rounded-2xl text-[15px] font-bold touch-manipulation active:scale-[0.98]',
                      p.featured
                        ? 'bg-elec-yellow text-black'
                        : 'border border-white/[0.2] text-white'
                    )}
                  >
                    Start free as {p.name === 'Electrician' ? 'an electrician' : 'an apprentice'}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* The trial, as a timeline — card-on-file needs the reassurance. */}
          <dl className="mt-8 grid border-t border-white/[0.08] sm:grid-cols-3">
            {[
              ['Today', '£0. Everything unlocked.'],
              ['Before it ends', 'We remind you, so there are no surprises.'],
              ['Day 8', 'First payment — only if you keep it.'],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-white/[0.08] py-4 sm:border-b-0 sm:pr-6">
                <dt className="text-[13px] font-semibold text-elec-yellow">{k}</dt>
                <dd className="mt-1 text-[15px] text-white">{v}</dd>
              </div>
            ))}
          </dl>
          {/* ELE-2067 plain terms: the four promises the Terms already make, shown to everyone. */}
          <PlainTermsStrip className="mt-8" />
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section data-analytics-section="faq" className={cn(sectionCn, 'pt-0 sm:pt-0 lg:pt-0')}>
        <div className="mx-auto max-w-[76rem] lg:grid lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <Eyebrow>Questions</Eyebrow>
            <H2>Before you start.</H2>
            <p className="mt-4 max-w-[26rem] text-[15px] leading-[1.6] text-white">
              Something else? Email{' '}
              <span className="font-semibold text-elec-yellow">info@elec-mate.com</span> and we’ll
              get back to you.
            </p>
          </div>
          <div className="mt-8 border-t border-white/[0.08] lg:mt-2">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="border-b border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="flex min-h-[56px] w-full items-center justify-between gap-4 py-4 text-left touch-manipulation"
                  >
                    <span className="text-[16px] font-semibold text-white">{f.q}</span>
                    <span
                      aria-hidden
                      className={cn(
                        'shrink-0 text-[22px] font-light leading-none text-elec-yellow transition-transform duration-200',
                        open && 'rotate-45'
                      )}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={cn(
                      'overflow-hidden transition-[max-height,opacity] duration-300 ease-out',
                      open ? 'max-h-[20rem] opacity-100' : 'max-h-0 opacity-0'
                    )}
                  >
                    <p className="pb-5 pr-8 text-[15px] leading-[1.65] text-white">{f.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== FREE (lead magnets) ==========
          For visitors who aren't ready to start a trial: genuinely useful
          things, free, most with no sign-up. The cheat sheet is the one email
          capture — same pipeline and Brevo list as the guide pages. */}
      <section
        data-analytics-section="free_tools"
        className={cn(sectionCn, 'pt-0 sm:pt-0 lg:pt-0')}
      >
        <div className="mx-auto max-w-[76rem]">
          <Eyebrow>Free, no card needed</Eyebrow>
          <H2 className="max-w-[20ch]">Not ready yet? Start with these.</H2>
          <div className="mt-10 grid gap-4 md:grid-cols-[1.1fr_1fr]">
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-5 sm:p-7">
              <Hairline />
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
                Free download · PDF
              </p>
              <h3 className="mt-2 text-[22px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[26px]">
                The BS 7671 A4:2026 cheat sheet
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white">
                Every change in the 2026 amendment on one page — AFDDs, TN-C-S, the new schedule
                columns and model forms.
              </p>
              <div className="mt-5">
                <EmailCaptureForm
                  source="lead_magnet_cheatsheet"
                  placeholder="you@email.com"
                  buttonLabel="Send me the PDF"
                  successMessage="Check your email — the PDF is on its way."
                  onSuccess={({ downloadUrl }) => {
                    if (!downloadUrl) return;
                    trackLeadMagnetDownloaded({ magnet: 'cheatsheet_landing' });
                    window.open(downloadUrl, '_blank', 'noopener,noreferrer');
                  }}
                  compact
                />
              </div>
            </div>
            <ul className="grid gap-3">
              {FREE_TOOLS.map((t) => (
                <li key={t.to}>
                  <Link
                    to={t.to}
                    onClick={() =>
                      trackLandingCtaClicked({ section: 'free_tools', label: t.label })
                    }
                    className={cn(
                      CARD_BASE,
                      CARD_NEUTRAL,
                      'relative min-h-[96px] justify-center overflow-hidden p-5 touch-manipulation'
                    )}
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="text-[17px] font-bold tracking-tight text-white group-hover:text-elec-yellow">
                        {t.label}
                      </span>
                      <span className="shrink-0 text-[12px] font-semibold uppercase tracking-[0.12em] text-elec-yellow">
                        {t.tag}
                      </span>
                    </span>
                    <span className="mt-1 text-[14px] leading-snug text-white">{t.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ========== EMPLOYERS & COLLEGES ==========
          Real sign-up, not a "coming soon" waitlist: the Employer and College
          hubs exist (the Employer hub is in early access) and teams are set up
          by hand, so the form goes straight to Andrew. */}
      <section
        id="teams"
        data-analytics-section="waitlist"
        className={cn(sectionCn, 'scroll-mt-20 pt-0 sm:pt-0 lg:pt-0')}
      >
        <div className="relative mx-auto grid max-w-[76rem] gap-8 overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-5 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:p-12">
          <Hairline />
          <div>
            <Eyebrow>Employers and colleges</Eyebrow>
            <H2 className="text-[28px] sm:text-[36px]">
              Bring your whole team. <span className="text-elec-yellow">Or your whole class.</span>
            </H2>
            <dl className="mt-6 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {[
                [
                  'Team discount codes',
                  'A code for your electricians and one for your apprentices.',
                ],
                [
                  'Employer hub, early access',
                  'Your team, jobs, timesheets and site safety in one place — we’re building it with the firms using it.',
                ],
                [
                  'College hub',
                  'Tutors see learners’ progress, attendance, results and portfolios.',
                ],
              ].map(([k, v]) => (
                <div key={k} className="py-3.5">
                  <dt className="text-[16px] font-semibold text-white">{k}</dt>
                  <dd className="mt-0.5 text-[14.5px] leading-snug text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <TeamSignupForm />
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section data-analytics-section="final_cta" className="px-5 pb-16 lg:px-8 lg:pb-24">
        <div className="relative mx-auto max-w-[76rem] overflow-hidden rounded-3xl border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.025] px-6 py-12 text-center sm:px-12 sm:py-16">
          <Hairline />
          <H2 className="mx-auto max-w-[20ch]">
            Start learning or start earning. <span className="text-elec-yellow">£0 today.</span>
          </H2>
          <p className="mx-auto mt-4 max-w-[34rem] text-[16px] leading-[1.6] text-white">
            Join {userCount} electricians and apprentices. Seven days free, cancel in two taps.
          </p>
          {!user && (
            <button
              type="button"
              onClick={() => goToSignup('final_cta')}
              className={cn(primaryCta, 'mx-auto mt-8 w-full sm:w-auto')}
            >
              Start your free week
            </button>
          )}
          <div className="mt-8 flex justify-center">
            <StoreBadges className="justify-center" size="md" />
          </div>
        </div>
      </section>

      {/* ========== GUIDES (internal links for SEO) ========== */}
      <section data-analytics-section="guides" className="px-5 py-12 lg:px-8">
        <div className="mx-auto max-w-[76rem]">
          <Eyebrow>Free guides and tools</Eyebrow>
          <ul className="mt-5 grid grid-cols-2 gap-x-5 border-t border-white/[0.08] lg:grid-cols-4">
            {GUIDES.map((g) => (
              <li key={g.to} className="border-b border-white/[0.08]">
                <Link
                  to={g.to}
                  className="flex min-h-[48px] items-center text-[14px] font-medium leading-snug text-white touch-manipulation hover:text-elec-yellow sm:text-[15px]"
                >
                  {g.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ========== FOOTER ==========
          Company name, number and registered office: a UK company's website
          must show them (Companies (Trading Disclosures) Regulations 2008). */}
      <footer data-analytics-section="footer" className="px-5 pb-32 pt-4 sm:pb-12 lg:px-8">
        <div className="mx-auto max-w-[76rem] border-t border-white/[0.08] pt-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/images/landing/v5/logo-96.webp"
                alt=""
                className="h-9 w-9 rounded-xl"
                loading="lazy"
              />
              <div>
                <p className="text-[16px] font-bold tracking-tight text-white">
                  Elec-<span className="text-elec-yellow">Mate</span>
                </p>
                <p className="text-[13px] text-white">For UK electricians and apprentices</p>
              </div>
            </div>
            <nav
              aria-label="Footer"
              className="grid grid-cols-2 gap-x-8 text-[14px] font-medium text-white sm:flex sm:flex-wrap sm:gap-x-6"
            >
              {[
                ['/guides', 'Guides'],
                ['/mock-exams', 'Mock exams'],
                ['/privacy', 'Privacy'],
                ['/cookies', 'Cookies'],
                ['/terms', 'Terms'],
                ['/account-deletion', 'Delete your account'],
              ].map(([to, label]) => (
                <Link
                  key={to}
                  to={to}
                  className="flex h-11 items-center hover:text-elec-yellow touch-manipulation"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="mt-6 text-[12.5px] leading-relaxed text-white">
            © 2026 Elec-Mate Ltd · Registered in England and Wales, company number 16416291 ·
            Registered office: 33 Gable Road, Whitehaven, CA28 8HE · ICO registration ZB935897
          </p>
        </div>
      </footer>

      {/* ========== STICKY CTA (phones) ========== */}
      {!user && (
        <div
          className={cn(
            'fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.08] bg-background/90 px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 sm:hidden',
            stickyVisible ? 'translate-y-0' : 'translate-y-full'
          )}
        >
          <Link
            to="/auth/signup"
            onClick={() => trackLandingCtaClicked({ section: 'sticky_mobile' })}
            className="flex h-12 w-full items-center justify-center rounded-2xl bg-elec-yellow text-[16px] font-bold text-black touch-manipulation active:scale-[0.98]"
          >
            Start your free week · £0 today
          </Link>
        </div>
      )}

      {/* Desktop-only exit-intent modal — once per week per browser */}
      {!user && !isNative && <ExitIntentModal />}
    </div>
  );
};

export default LandingPage;
