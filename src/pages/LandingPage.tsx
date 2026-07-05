import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ChevronDown, Menu, Star, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { StoreBadges } from '@/components/seo/StoreBadges';
import { useAuth } from '@/contexts/AuthContext';
import { trackLandingCtaClicked, trackLandingSectionViewed } from '@/lib/analytics-events';
import { usePublicStats } from '@/hooks/usePublicStats';
import { useUserCount } from '@/hooks/useUserCount';
import { ExitIntentModal } from '@/components/landing/ExitIntentModal';
import { WaitlistSection } from '@/components/landing/WaitlistSection';
import {
  Eyebrow,
  Pill,
  Dot,
  PrimaryButton,
  SecondaryButton,
} from '@/components/college/primitives';

/**
 * Landing page v3 — rebuilt 2026-07-04 (ELE-1233).
 *
 * Funnel data drove every cut: 427 visitors → 11 CTA clicks (2.6%) but
 * 11/11 clicks completed signup, and section-view counts showed visitors see
 * ~2 sections before leaving. So: the product and the CTA live in the hero,
 * proof comes second, pricing third, and everything that diluted the page
 * (lead magnet, waitlist, mental health, site photos) is gone. Every CTA
 * carries the "£0 today" framing that CheckoutTrial continues.
 */

const workflowSteps: {
  eyebrow: string;
  title: string;
  description: string;
  replaces: string;
}[] = [
  {
    eyebrow: 'QUOTE',
    title: 'AI cost engineer',
    description: 'Photo-to-quote, live material pricing, WhatsApp delivery.',
    replaces: 'Tradify · Excel',
  },
  {
    eyebrow: 'DESIGN',
    title: 'Circuit designer',
    description: 'Cable sizing, breakers, earthing, voltage drop — by AI.',
    replaces: 'Amtech',
  },
  {
    eyebrow: 'STAY COMPLIANT',
    title: 'RAMS in 2 minutes',
    description: 'Risk assessments, H&S templates, CPD log, audit trail.',
    replaces: 'Word + spreadsheets',
  },
  {
    eyebrow: 'DO THE WORK',
    title: '70+ calculators',
    description: 'Loop impedance, voltage drop, IR recorder, board scanner.',
    replaces: '6 separate apps',
  },
  {
    eyebrow: 'CERTIFY',
    title: 'Every BS 7671 cert',
    description: '19 cert types, A4:2026 ready, signed in minutes.',
    replaces: 'iCertifi',
  },
  {
    eyebrow: 'INVOICE',
    title: 'One tap from quote',
    description: 'Auto-chase, CIS deductions, Stripe payment links.',
    replaces: 'Xero + manual chase',
  },
  {
    eyebrow: 'GET PAID',
    title: 'Stripe Connect built in',
    description: 'Card, Apple Pay, Google Pay, bank transfer — same day.',
    replaces: 'Sumup (1.69%)',
  },
  {
    eyebrow: 'TRAIN',
    title: 'L2/L3 · AM2 · EPA',
    description: '46+ courses, 20,000+ questions, EPA simulator, digital portfolio.',
    replaces: 'Logic4Training',
  },
];

// 24px blur-up placeholder for the hero phone shot (~190 bytes inline) — paints
// instantly behind the real image so it fades in rather than popping from nothing
const HERO_THUMB =
  'data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAAAwBACdASoYACUAPxF8uFGsKCWiqqoBgCIJaQAAPY72bxHAu9Qezf3RUSAA/u6SKVZF3sMr2B0Dq/NNvud70W9+z3aSH4DEaHjddF56Jtdc2FTmKzdCcSzMkF314SZoG0ck/dpQzR0XClNeFrRYJBc25Tkyi8bAAAA=';
const heroThumbStyle = {
  backgroundImage: `url(${HERO_THUMB})`,
  backgroundSize: 'cover',
} as const;

const appScreens = [
  {
    src: '/images/landing/screen-certs.webp',
    alt: 'BS 7671 certificates in minutes — EICR, EIC and Minor Works pickers',
  },
  {
    src: '/images/landing/screen-business.webp',
    alt: 'Business Hub — paid, outstanding and overdue invoices in one place',
  },
  {
    src: '/images/landing/screen-ai.webp',
    alt: 'AI that understands electrical work — every answer cites the exact regulation',
  },
  {
    src: '/images/landing/screen-rams.webp',
    alt: 'RAMS generated in 2 minutes — AI handles the boilerplate',
  },
  {
    src: '/images/landing/screen-calculators.webp',
    alt: 'Built-in electrical calculators — BS 7671 compliant professional tools',
  },
  {
    src: '/images/landing/screen-study.webp',
    alt: 'Learn when and where you want — courses, quizzes and streaks',
  },
];

// Newest 5★ App Store reviews first — the top three render on the page
const testimonials: {
  nickname: string;
  title: string;
  quote: string;
  date: string;
}[] = [
  {
    nickname: 'Matt (FES)',
    title: 'Great business tool',
    quote:
      'I was using trade-cert and was paying £18 a month for a testing cert app, then a few customers needed PAT software (another £60). Elec-Mate has testing software, PAT testing, quoting, invoicing, training, calendar — I went fully committed and paid up for the year. I love this app, can’t speak highly enough about it to other electricians.',
    date: '10 Jun 2026',
  },
  {
    nickname: 'Cam5303',
    title: 'Brilliant software',
    quote:
      'If you are looking for a piece of software as an electrician or even apprentice with everything in one — ranging from calculators to EICs, or to freshen your memory up on something — be sure to check this out. Brilliant piece of kit, would totally recommend.',
    date: '16 Jun 2026',
  },
  {
    nickname: 'I.staffy',
    title: 'One App for Everything!',
    quote:
      "Elec-Mate is my go to app for business and electrical work. It's feature rich without feeling cluttered. A true all in one app for quotes, certs, calculations, RAMS, EICRs, and more. I use it every day without fail. 100% recommend.",
    date: '21 Apr 2026',
  },
  {
    nickname: 'Jayecco',
    title: 'Sparks best mate',
    quote:
      'Absolutely superb as an app, I can invoice, complete testing certs and reports as well as track my CPD. Everything in one place is exactly what I need, worth every penny.',
    date: '28 Mar 2026',
  },
  {
    nickname: 'Beckywaddington33',
    title: 'Amazing App and Value',
    quote:
      'The amount of features inside the app is mind boggling, incredible value and incredible features. A complete game changer!',
    date: '28 Mar 2026',
  },
  {
    nickname: 'COLE12345789…',
    title: 'Absolutely amazing',
    quote:
      "I've been using Elec-Mate for a while now, and honestly, it's one of the best apps I've ever downloaded. Every aspect of it feels thoughtfully designed — clean, intuitive, powerful. Reliable and efficient, exactly what I need.",
    date: '9 Apr 2026',
  },
  {
    nickname: 'Chief6uk',
    title: 'Fantastic app for electricians',
    quote:
      "I've used the app and the web based version for a while now and it's well worth the investment. If you're an apprentice or experienced Spark give it a go, you won't be disappointed.",
    date: '12 Apr 2026',
  },
];

const exploreTools = [
  {
    to: '/tools/eicr-certificate',
    label: 'EICR Certificate App',
    desc: 'Digital condition reports',
  },
  {
    to: '/tools/cable-sizing-calculator',
    label: 'Cable Sizing Calculator',
    desc: 'BS 7671 compliant',
  },
  {
    to: '/tools/voltage-drop-calculator',
    label: 'Voltage Drop Calculator',
    desc: 'Check maximum runs',
  },
  {
    to: '/tools/minor-works-certificate',
    label: 'Minor Works Certificate',
    desc: 'Digital EWC forms',
  },
  {
    to: '/tools/electrical-testing-calculators',
    label: 'Testing Calculators',
    desc: 'Zs, fault current, RCD',
  },
  { to: '/tools/ai-electrician', label: 'AI Electrician Tools', desc: '5 BS 7671 specialists' },
  {
    to: '/training/18th-edition-course',
    label: '18th Edition Course',
    desc: 'BS 7671 + Amendment 3',
  },
  { to: '/training/electrical-apprentice', label: 'Apprentice Training', desc: 'Level 2, 3 & AM2' },
];

const faqs = [
  {
    question: 'Do I pay anything to start?',
    answer:
      'No. £0 today — seven days free, no charge until day 8. You add a payment method to start the trial (card on the web, your Apple or Google account in the app) but nothing is taken. Cancel any time before day 8 and you pay nothing.',
  },
  {
    question: 'What happens to my certs and data if I cancel?',
    answer:
      "They're yours. While you're subscribed you can export every certificate, quote and invoice as a PDF whenever you like — so export anything you need before your last day. If you cancel, nothing is deleted: your certs, quotes and invoices are all exactly where you left them if you come back.",
  },
  {
    question: 'Is it ready for BS 7671 Amendment 4:2026?',
    answer:
      'Yes. Every certificate template, calculator and AI answer is updated for A4:2026 — AFDDs, TN-C-S (PNB), new schedule columns, new model forms. The reg corpus updates the moment new amendments land.',
  },
  {
    question: 'Does it work offline on site?',
    answer:
      "Yes for certificates and testing — fill them out anywhere, they sync the moment you're back in signal. Some AI features (the assistant, the board scanner) need a connection.",
  },
  {
    question: 'Which plan should I choose?',
    answer:
      'Working towards AM2? Apprentice. Qualified and running your own work? Electrician. The Electrician plan includes everything the Apprentice plan has.',
  },
  {
    question: 'How reliable is the AI for compliance work?',
    answer:
      'The AI is grounded in the BS 7671 corpus — every regulation answer cites the specific reg. You always review and sign off the work; the AI does the typing.',
  },
  {
    question: 'Can I use it on my phone and my laptop?',
    answer:
      'Yes — same account, same data on iOS, Android and the web. Start a job on your phone on site, finish it on your laptop at home.',
  },
  {
    question: "What if I'm not great with tech?",
    answer:
      'The app is built by a working UK electrician for the trade — designed for site use, big touch targets, no jargon. Most users are signed up and using their first feature within five minutes.',
  },
];

// Featured (Electrician) plan first — it's the majority audience, and on
// mobile the first card is the only one guaranteed to be seen
const getPricingPlans = (isNative: boolean) => [
  {
    name: 'Electrician',
    price: isNative ? '£19.99' : '£19.99',
    yearly: isNative ? '£199.99' : '£199.99',
    yearlySaving: isNative ? '£29.89' : '£25.89',
    description: 'Quote, certify, invoice, get paid — the whole trade in one app.',
    features: [
      'Everything in Apprentice',
      '19 BS 7671 cert types · A4:2026 ready · works offline',
      'AI Board Scanner — photo in, circuits out',
      '5 AI specialists — Cost Engineer, Circuit Designer & more',
      'Quotes, invoices, CIS, auto-chase & Stripe payments',
      'RAMS, method statements & site safety',
      '70+ trade calculators & live BS 7671 reference',
      'Elec-ID digital professional card',
    ],
    featured: true,
  },
  {
    name: 'Apprentice',
    price: isNative ? '£6.99' : '£6.99',
    yearly: isNative ? '£69.99' : '£69.99',
    yearlySaving: isNative ? '£13.89' : '£11.89',
    description: 'Everything from Level 2 to qualified — built around the AM2.',
    features: [
      '46+ courses (Level 2, 3, AM2 & upskilling)',
      '20,000+ exam questions & flashcards',
      'AM2 Testing Simulator with real MFT dial',
      'Digital portfolio & OJT hours tracking',
      '"Ask Dave" AI mentor — cites BS 7671',
      '60+ on-job calculators',
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const LandingPage = () => {
  const { user } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  // Sticky CTA appears as soon as the hero CTA scrolls away. Section-view data
  // shows most visitors never scroll past section two — the button must follow.
  const [stickyVisible, setStickyVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 380);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  // Section-view tracking — fires once per section per page load, cookieless
  // via Vercel Analytics, so it sees every visitor (PostHog only sees consented
  // ones). Tells us how far down the page people actually get.
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
  // realtime off — no point holding a websocket open on a public marketing page
  const userCount = useUserCount({ realtime: false });
  const publicStats = usePublicStats();
  const navigate = useNavigate();
  const goToSignup = (section: 'hero' | 'workflow' | 'final_cta', label?: string) => {
    trackLandingCtaClicked({ section, label });
    navigate('/auth/signup');
  };
  const isNative = Capacitor.isNativePlatform();
  const pricingPlans = useMemo(() => getPricingPlans(isNative), [isNative]);

  // Attribution capture lives in App.tsx (AttributionCapture component) so it
  // runs for users landing directly on /auth/signup or /r/:code from ads, not
  // just this page.

  // True black base — the app-screen graphics are composed on #000, and on
  // the slightly-lighter #0a0a0a they showed as floating rectangles
  return (
    <div className="bg-black text-white">
      <Helmet>
        <title>Elec-Mate | The Complete Platform for UK Electricians</title>
        <meta
          name="description"
          content="Training, AI tools, certificates & business management for UK electricians. Level 2 & 3 courses, BS 7671 AI assistants, EICR forms, voice quotes & Stripe payments. Start your free trial."
        />
        <meta
          name="keywords"
          content="electrician app, electrical training, EICR certificate, EIC form, Minor Works, BS 7671, 18th edition, electrical apprentice, UK electrician, cable sizing calculator, volt drop calculator, electrical quotes, AI electrician"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.elec-mate.com/" />
        <meta property="og:title" content="Elec-Mate | The Complete Platform for UK Electricians" />
        <meta
          property="og:description"
          content="Training, AI tools, certificates & business management for UK electricians. From apprentice to employer — everything you need to learn, work smarter, and grow."
        />
        <meta property="og:image" content="https://www.elec-mate.com/og-image.jpg" />
        <meta property="og:site_name" content="Elec-Mate" />
        <meta property="og:locale" content="en_GB" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.elec-mate.com/" />
        <meta
          name="twitter:title"
          content="Elec-Mate | The Complete Platform for UK Electricians"
        />
        <meta
          name="twitter:description"
          content="Training, AI tools, certificates & business management for UK electricians. 8 AI specialists trained on BS 7671. Start free today."
        />
        <meta name="twitter:image" content="https://www.elec-mate.com/og-image.jpg" />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="Elec-Mate" />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <link rel="canonical" href="https://www.elec-mate.com/" />
        {/* Hero phone shot is the LCP element on mobile — fetch it before the
            bundle finishes parsing */}
        <link rel="preload" as="image" href="/images/landing/hero-dashboard.webp" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Elec-Mate',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web, iOS, Android',
            description:
              'The complete platform for UK electricians - training, AI tools, certificates, and business management.',
            offers: {
              '@type': 'AggregateOffer',
              lowPrice: '6.99',
              highPrice: '19.99',
              priceCurrency: 'GBP',
              offerCount: '2',
            },
            featureList: [
              '46+ Electrical & Upskilling Courses',
              'BS 7671 AI Assistants',
              '19 Certificate Types',
              'Voice Quotes & Invoices',
              'Stripe Payment Integration',
              '70+ Electrical Calculators',
            ],
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Elec-Mate',
            url: 'https://www.elec-mate.com',
            logo: 'https://www.elec-mate.com/logo.jpg',
            description: 'The complete platform for UK electricians',
            address: { '@type': 'PostalAddress', addressCountry: 'GB' },
            sameAs: [
              'https://www.facebook.com/ElecMateUK',
              'https://www.instagram.com/elec_mate',
              'https://www.tiktok.com/@elec_mate',
              'https://www.linkedin.com/company/elec-mate',
              'https://t.me/Elec_MateOfficialGroup',
              'https://apps.apple.com/gb/app/elec-mate/id6758948665',
            ],
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          })}
        </script>
      </Helmet>

      {/* ========== NAV ========== */}
      <nav
        className="fixed inset-x-0 top-0 z-50"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/[0.06]" />
        <div className="relative mx-auto flex h-12 max-w-[80rem] items-center justify-between px-4 sm:px-5 lg:h-16 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Elec-Mate" className="h-9 w-9 rounded-xl lg:h-10 lg:w-10" />
            <span className="text-lg font-bold tracking-[-0.02em] lg:text-xl">
              Elec-<span className="text-yellow-400">Mate</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#workflow" className="text-[15px] text-white transition hover:text-white">
              Workflow
            </a>
            <a href="#features" className="text-[15px] text-white transition hover:text-white">
              Inside the app
            </a>
            <a href="#pricing" className="text-[15px] text-white transition hover:text-white">
              Pricing
            </a>
            <Link to="/guides" className="text-[15px] text-white transition hover:text-white">
              Guides
            </Link>
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            {user ? (
              <Button
                asChild
                size="sm"
                className="h-10 touch-manipulation rounded-xl bg-yellow-500 px-5 font-semibold text-black transition-transform hover:bg-yellow-400 active:scale-[0.98]"
              >
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Link
                  to="/auth/signin"
                  className="text-[15px] text-white transition hover:text-white"
                >
                  Sign in
                </Link>
                <Button
                  asChild
                  size="sm"
                  className="h-10 touch-manipulation rounded-xl bg-yellow-500 px-5 font-semibold text-black transition-transform hover:bg-yellow-400 active:scale-[0.98]"
                >
                  <Link
                    to="/auth/signup"
                    onClick={() => trackLandingCtaClicked({ section: 'nav' })}
                  >
                    Start free — £0 today
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="flex items-center gap-1 sm:hidden">
            {/* ELE-1278: visible Sign in on mobile — it only lived inside the
                hamburger menu, so existing users couldn't find it. */}
            {!user && (
              <Link
                to="/auth/signin"
                className="flex h-10 touch-manipulation items-center rounded-lg px-3 text-[14px] font-medium text-white"
              >
                Sign in
              </Link>
            )}
            <button
              onClick={() => setIsNavOpen((open) => !open)}
              className="flex h-10 w-10 touch-manipulation items-center justify-center rounded-lg text-white"
              aria-label="Toggle navigation"
            >
              {isNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Always mounted; max-height animates the menu open/closed. (grid-rows
            [0fr/1fr] animation is unreliable in Android WebView and rendered the
            menu blank — ELE-1075.) */}
        <div
          className={`relative z-10 overflow-hidden transition-[max-height,opacity] duration-300 ease-out sm:hidden ${
            isNavOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div>
            <div className="border-t border-white/[0.08] bg-black px-5 py-5">
              <div className="space-y-4">
                <a
                  href="#workflow"
                  onClick={() => setIsNavOpen(false)}
                  className="block select-none touch-manipulation py-1 text-base text-white"
                >
                  Workflow
                </a>
                <a
                  href="#features"
                  onClick={() => setIsNavOpen(false)}
                  className="block select-none touch-manipulation py-1 text-base text-white"
                >
                  Inside the app
                </a>
                <a
                  href="#pricing"
                  onClick={() => setIsNavOpen(false)}
                  className="block select-none touch-manipulation py-1 text-base text-white"
                >
                  Pricing
                </a>
                <Link
                  to="/guides"
                  onClick={() => setIsNavOpen(false)}
                  className="block select-none touch-manipulation py-1 text-base text-white"
                >
                  Guides
                </Link>
                {!user && (
                  <div className="space-y-3 pt-3">
                    <Button
                      asChild
                      className="h-12 w-full touch-manipulation rounded-xl bg-yellow-500 text-base font-semibold text-black transition-transform hover:bg-yellow-400 active:scale-[0.98]"
                    >
                      <Link
                        to="/auth/signup"
                        onClick={() => trackLandingCtaClicked({ section: 'nav_mobile' })}
                      >
                        Start free — £0 today
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="h-12 w-full touch-manipulation rounded-xl border-white/15 bg-transparent text-white transition-transform active:scale-[0.98]"
                    >
                      <Link to="/auth/signin">Sign in</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ========== HERO — product first ========== */}
      <section
        data-analytics-section="hero"
        className="relative px-5 pb-12 pt-[calc(env(safe-area-inset-top)+4rem)] sm:pb-16 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32"
      >
        {/* initial={false} — hero must paint immediately (LCP); no hidden-until-JS flash */}
        <motion.div
          variants={fadeUp}
          initial={false}
          animate="visible"
          transition={{ duration: 0.55 }}
          className="relative z-10 mx-auto max-w-[80rem] lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center lg:gap-16"
        >
          <div className="text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <Pill tone="yellow">
                <Dot tone="yellow" className="mr-1.5" />
                {userCount} UK electricians
              </Pill>
              <Pill tone="yellow">{'★★★★★'} on the App Store</Pill>
            </div>

            <h1 className="mx-auto mt-5 max-w-[16ch] text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-white sm:text-[3.6rem] lg:mx-0 lg:text-[4.25rem]">
              Certs done on site. <span className="text-elec-yellow">Invoices paid faster.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-[38rem] text-base leading-[1.65] text-white/75 sm:mt-6 sm:text-lg lg:mx-0">
              Quote → job → cert → invoice → paid. The one app UK electricians run their whole
              trade on — instead of paperwork, WhatsApp and four disconnected apps.
            </p>

            {/* Sign in sits directly UNDER the sign-up CTA (Andrew, 5 Jul) —
                stacked at every breakpoint, not side by side */}
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:mx-auto sm:max-w-[320px] lg:mx-0">
              <PrimaryButton size="lg" fullWidth onClick={() => goToSignup('hero')}>
                Start free — £0 today →
              </PrimaryButton>
              <SecondaryButton size="lg" fullWidth onClick={() => navigate('/auth/signin')}>
                Sign in
              </SecondaryButton>
            </div>

            <p className="mt-3 text-[13px] text-white/65">
              7 days free · cancel anytime · from £6.99/mo after ·{' '}
              <button
                type="button"
                onClick={() =>
                  document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="touch-manipulation font-medium text-elec-yellow/90 transition-colors hover:text-elec-yellow"
              >
                See how it works ↓
              </button>
            </p>

            {/* Mobile/tablet — the product itself, straight after the CTA. The
                section-view data says this is all most visitors ever see. No
                border/shadow: the graphic is composed on the same black as the
                page, so it sits IN it rather than on it. */}
            <div className="mt-9 flex justify-center lg:hidden">
              <img
                src="/images/landing/hero-dashboard.webp"
                alt="Elec-Mate dashboard on iPhone — live quotes, certificates and hubs"
                width={720}
                height={1092}
                fetchpriority="high"
                style={heroThumbStyle}
                className="w-[260px] sm:w-[300px]"
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <Pill tone="yellow">{publicStats.certs} certs issued</Pill>
              <Pill tone="yellow">{publicStats.quoted} quoted</Pill>
            </div>


            <div className="mt-6 flex justify-center lg:justify-start">
              <StoreBadges className="justify-center lg:justify-start" size="md" />
            </div>
          </div>

          {/* Desktop — app preview, second grid column so it never overlaps the copy */}
          <div className="hidden lg:block">
            <img
              src="/images/landing/hero-dashboard.webp"
              alt="Elec-Mate dashboard on iPhone — live quotes, certificates and hubs"
              width={720}
              height={1092}
              fetchpriority="high"
              style={heroThumbStyle}
              className="w-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ========== PROOF — second thing every visitor sees ========== */}
      <section
        data-analytics-section="testimonials"
        className="[content-visibility:auto] [contain-intrinsic-size:auto_600px] px-5 py-12 sm:py-16 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-[80rem]">
          <div className="text-center lg:text-left">
            <Eyebrow>FROM THE APP STORE</Eyebrow>
            <h2 className="mx-auto mt-3 max-w-[24ch] text-[1.9rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-[2.5rem] lg:mx-0">
              Sparks who switched, <span className="text-elec-yellow">in their own words.</span>
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <figure
                key={t.nickname}
                className="flex flex-col rounded-[1.6rem] border border-white/[0.08] bg-white/[0.03] p-6"
              >
                <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mt-3 text-[15px] font-semibold text-white">{t.title}</p>
                <blockquote className="mt-2 flex-1 text-[13.5px] leading-[1.65] text-white/75">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 text-[12px] text-white/55">
                  {t.nickname} · App Store · {t.date}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WORKFLOW ========== */}
      <section
        id="workflow"
        data-analytics-section="workflow"
        className="[content-visibility:auto] [contain-intrinsic-size:auto_700px] scroll-mt-24 px-5 py-12 sm:py-16 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-[80rem]">
          <div className="text-center lg:text-left">
            <Eyebrow>THE WORKFLOW</Eyebrow>
            <h2 className="mx-auto mt-3 max-w-[24ch] text-[1.9rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-[2.5rem] lg:mx-0">
              One job, start to finish —{' '}
              <span className="text-elec-yellow">without leaving the app.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[42rem] text-[14px] leading-relaxed text-white/65 sm:text-[15px] lg:mx-0">
              Each step replaces a tool you're paying for (or a spreadsheet you're fighting with)
              today.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-4">
            {workflowSteps.map((step, index) => (
              <div
                key={step.title}
                className="relative rounded-[1.6rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6"
              >
                <span
                  aria-hidden
                  className="text-[2.4rem] font-semibold leading-none tracking-tight text-elec-yellow/40 tabular-nums"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Eyebrow className="mt-3">{step.eyebrow}</Eyebrow>
                <h3 className="mt-2 text-[17px] font-semibold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-white/70">{step.description}</p>
                <p className="mt-4 border-t border-white/[0.06] pt-3 text-[11.5px] text-white/50">
                  Replaces: {step.replaces}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <PrimaryButton
              size="lg"
              fullWidth
              onClick={() => goToSignup('workflow')}
              className="sm:w-auto sm:px-8"
            >
              Run your next job through it — £0 today →
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* ========== INSIDE THE APP ========== */}
      <section
        id="features"
        data-analytics-section="inside_the_app"
        className="[content-visibility:auto] [contain-intrinsic-size:auto_700px] scroll-mt-24 px-5 py-12 sm:py-16 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-[80rem]">
          <div className="text-center lg:text-left">
            <Eyebrow>INSIDE THE APP</Eyebrow>
            <h2 className="mx-auto mt-3 max-w-[24ch] text-[1.9rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-[2.5rem] lg:mx-0">
              Not mock-ups. <span className="text-elec-yellow">The actual app.</span>
            </h2>
          </div>

          {/* The graphics are composed panels (baked headline + phone on #000):
              no frames or captions — they sit directly in the black page */}
          <div className="-mx-5 mt-10 snap-x snap-mandatory overflow-x-auto px-5 pb-4 lg:mx-0 lg:snap-none lg:px-0 [scrollbar-width:thin]">
            <div className="flex gap-4 lg:grid lg:grid-cols-6">
              {appScreens.map((screen) => (
                <img
                  key={screen.src}
                  src={screen.src}
                  alt={screen.alt}
                  width={720}
                  height={1092}
                  loading="lazy"
                  decoding="async"
                  className="w-[230px] flex-shrink-0 snap-center lg:w-full"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== PRICING ========== */}
      <section
        id="pricing"
        data-analytics-section="pricing"
        className="[content-visibility:auto] [contain-intrinsic-size:auto_900px] scroll-mt-24 px-5 py-12 sm:py-16 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-[64rem]">
          <div className="text-center">
            <Eyebrow className="text-center">PRICING</Eyebrow>
            <h2 className="mx-auto mt-3 max-w-[24ch] text-[1.9rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-[2.5rem]">
              <span className="text-elec-yellow">£0 today.</span> Two plans after.
            </h2>
            <p className="mx-auto mt-4 max-w-[38rem] text-[14px] leading-relaxed text-white/65 sm:text-[15px]">
              Everything unlocked for 7 days. First charge only if you keep it — cancel before day
              8 in a couple of clicks and pay nothing.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-2 lg:gap-6">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.name} {...plan} />
            ))}
          </div>

          <p className="mt-6 text-center text-[12.5px] text-white/55">
            Same price on web, iOS and Android · no hidden extras · cancel anytime
          </p>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section
        data-analytics-section="faq"
        className="[content-visibility:auto] [contain-intrinsic-size:auto_700px] px-5 py-12 sm:py-16 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-[52rem]">
          <div className="text-center">
            <Eyebrow className="text-center">QUESTIONS</Eyebrow>
            <h2 className="mx-auto mt-3 max-w-[24ch] text-[1.9rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-[2.5rem]">
              The things sparks <span className="text-elec-yellow">actually ask.</span>
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const open = openFaqIndex === index;
              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-[1.4rem] border border-white/[0.08] bg-white/[0.03]"
                >
                  <button
                    onClick={() => setOpenFaqIndex(open ? null : index)}
                    className="flex w-full touch-manipulation items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={open}
                  >
                    <span className="text-[15px] font-semibold text-white">{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 flex-shrink-0 text-yellow-400 transition-transform ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                      open ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-5 pb-5 text-[14px] leading-[1.7] text-white/75">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section
        data-analytics-section="final_cta"
        className="[content-visibility:auto] [contain-intrinsic-size:auto_600px] px-5 py-12 sm:py-16 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-[80rem]">
          {/* Pure black card — the app-screen graphic is composed on #000, so
              anything lighter shows it as a floating rectangle */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-black lg:rounded-[2.5rem]">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/70 to-elec-yellow/0 opacity-80"
            />
            {/* Soft glow behind the phone so the card doesn't read as a void */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 top-1/2 hidden h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-elec-yellow/[0.07] blur-3xl lg:block"
            />

            <div className="relative grid items-center gap-10 px-6 py-14 sm:px-12 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:px-16 lg:py-16">
              <div className="text-center lg:text-left">
                <Eyebrow>READY?</Eyebrow>
                <h2 className="mx-auto mt-3 max-w-[22ch] text-[2.1rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-[3rem] lg:mx-0 lg:text-[3.4rem]">
                  Stop juggling apps.{' '}
                  <span className="text-elec-yellow">Start running the job.</span>
                </h2>
                <p className="mx-auto mt-5 max-w-[42rem] text-[14px] leading-relaxed text-white/75 sm:text-[15px] lg:mx-0 lg:text-base">
                  {userCount} UK electricians already run their trade through Elec-Mate. Put one
                  real job through it this week — £0 today, first charge only if you keep it.
                </p>

                <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
                  <PrimaryButton
                    size="lg"
                    fullWidth
                    onClick={() => goToSignup('final_cta')}
                    className="sm:w-auto sm:px-8"
                  >
                    Start free — £0 today →
                  </PrimaryButton>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[12.5px] text-white/65 lg:justify-start">
                  <span className="inline-flex items-center gap-1.5">
                    <Dot tone="yellow" /> {userCount} already in
                  </span>
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                  <span>7 days free</span>
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                  <span>Cancel any time</span>
                </div>

                <div className="mt-8 flex justify-center lg:justify-start">
                  <StoreBadges className="justify-center lg:justify-start" size="md" />
                </div>
              </div>

              {/* One last look at the product on the way out. No border/shadow —
                  the graphic is composed on the same black as the card, so it
                  sits IN the page rather than on it */}
              <div className="hidden justify-center lg:flex">
                <img
                  src="/images/landing/screen-certs.webp"
                  alt="Elec-Mate certificate picker on iPhone — EICR, EIC and Minor Works"
                  width={720}
                  height={1092}
                  loading="lazy"
                  decoding="async"
                  className="w-[300px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== EMPLOYER & COLLEGE WAITLIST ========== */}
      <div data-analytics-section="waitlist">
        <WaitlistSection />
      </div>

      {/* ========== FREE GUIDES (SEO INTERNAL LINKS) ========== */}
      <section
        data-analytics-section="guides"
        className="[content-visibility:auto] [contain-intrinsic-size:auto_500px] px-5 py-12 sm:py-16 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-[80rem] text-center lg:text-left">
          <Eyebrow>FREE GUIDES</Eyebrow>
          <h2 className="mx-auto mt-3 max-w-[24ch] text-[1.9rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-[2.5rem] lg:mx-0">
            Browse the guides. <span className="text-elec-yellow">No sign-up.</span>
          </h2>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {exploreTools.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group touch-manipulation rounded-[1.4rem] border border-white/[0.08] bg-white/[0.03] p-5 transition-colors hover:border-yellow-500/30 hover:bg-yellow-500/[0.04]"
              >
                <p className="text-[15px] font-semibold text-white transition-colors group-hover:text-yellow-400">
                  {link.label}
                </p>
                <p className="mt-1.5 text-[13px] text-white">{link.desc}</p>
                <ArrowRight className="mt-5 h-4 w-4 text-white transition-colors group-hover:text-yellow-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer
        data-analytics-section="footer"
        className="[content-visibility:auto] [contain-intrinsic-size:auto_500px] px-5 pb-32 pt-8 sm:pb-12 lg:px-8"
      >
        <div className="mx-auto max-w-[80rem] border-t border-white/[0.08] pt-12">
          <div className="grid gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-[1.4fr_0.9fr_0.9fr_0.8fr]">
            <div>
              <div className="flex items-center justify-center gap-3 sm:justify-start">
                <img
                  src="/logo.jpg"
                  alt="Elec-Mate"
                  className="h-10 w-10 rounded-2xl"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <p className="text-lg font-semibold tracking-[-0.02em] text-white">
                    Elec-<span className="text-yellow-400">Mate</span>
                  </p>
                  <p className="text-[13px] text-white">Built for UK electricians</p>
                </div>
              </div>
              <p className="mx-auto mt-5 max-w-sm text-[14px] leading-[1.7] text-white sm:mx-0">
                The complete platform for UK electricians. Training, AI tools, certificates, and
                business management — all in one place.
              </p>
              <div className="mt-6 flex justify-center sm:justify-start">
                <StoreBadges className="justify-center sm:justify-start" size="sm" />
              </div>
            </div>

            <div>
              <h4 className="text-[13px] font-semibold text-white">Tools</h4>
              <div className="mt-5 space-y-3 text-[14px] text-white">
                <Link to="/tools/eicr-certificate" className="block transition hover:text-white">
                  EICR Certificate
                </Link>
                <Link
                  to="/tools/cable-sizing-calculator"
                  className="block transition hover:text-white"
                >
                  Cable Sizing Calculator
                </Link>
                <Link
                  to="/tools/voltage-drop-calculator"
                  className="block transition hover:text-white"
                >
                  Voltage Drop Calculator
                </Link>
                <Link
                  to="/tools/minor-works-certificate"
                  className="block transition hover:text-white"
                >
                  Minor Works Certificate
                </Link>
                <Link to="/tools/ai-electrician" className="block transition hover:text-white">
                  AI Electrician Tools
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-[13px] font-semibold text-white">Training</h4>
              <div className="mt-5 space-y-3 text-[14px] text-white">
                <Link
                  to="/training/18th-edition-course"
                  className="block transition hover:text-white"
                >
                  18th Edition Course
                </Link>
                <Link
                  to="/training/electrical-apprentice"
                  className="block transition hover:text-white"
                >
                  Apprentice Training
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-[13px] font-semibold text-white">Legal</h4>
              <div className="mt-5 space-y-3 text-[14px] text-white">
                <Link to="/privacy" className="block transition hover:text-white">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="block transition hover:text-white">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/[0.06] pt-6 text-[13px] text-white">
            Elec-Mate &copy; 2026
          </div>
        </div>
      </footer>

      {/* ========== STICKY MOBILE CTA ========== */}
      {!user && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.08] bg-black/90 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 sm:hidden ${
            stickyVisible ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <Link
            to="/auth/signup"
            onClick={() => trackLandingCtaClicked({ section: 'sticky_mobile' })}
          >
            <Button className="h-12 w-full touch-manipulation rounded-xl bg-yellow-500 text-base font-semibold text-black transition-transform hover:bg-yellow-400 active:scale-[0.98]">
              Start free — £0 today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="mt-1.5 text-center text-[11px] text-white/60">
            7 days free · cancel anytime
          </p>
        </div>
      )}

      {/* Desktop-only exit-intent modal — fires once per week per browser */}
      {!user && !isNative && <ExitIntentModal />}
    </div>
  );
};

// ============================================================
//  Sub-components
// ============================================================

const PricingCard = ({
  name,
  price,
  yearly,
  yearlySaving,
  description,
  features,
  featured,
}: {
  name: string;
  price: string;
  yearly?: string;
  yearlySaving?: string;
  description: string;
  features: string[];
  featured?: boolean;
}) => (
  <div
    className={`relative flex flex-col rounded-[2rem] border p-7 lg:p-8 ${
      featured
        ? 'border-yellow-500/30 bg-gradient-to-br from-yellow-500/[0.14] via-amber-500/[0.06] to-white/[0.02] shadow-[0_24px_80px_rgba(250,204,21,0.12)]'
        : 'border-white/[0.08] bg-white/[0.03] shadow-[0_24px_80px_rgba(0,0,0,0.22)]'
    }`}
  >
    {featured && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-yellow-500 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-black">
        Most popular
      </span>
    )}

    <h3 className="text-xl font-semibold tracking-[-0.02em] text-white">{name}</h3>
    <div className="mt-3 flex items-baseline gap-1.5">
      <span className="text-[3rem] font-bold leading-none tracking-[-0.04em] text-white">
        {price}
      </span>
      <span className="text-sm text-white">/ month</span>
    </div>
    {yearly && (
      <p className="mt-2 text-[13px] text-white/65">
        or <span className="font-medium text-white">{yearly}/yr</span>
        {yearlySaving ? ` — save ${yearlySaving}` : ''}
      </p>
    )}
    <p className="mt-3 text-[15px] leading-[1.7] text-white">{description}</p>

    <Link
      to="/auth/signup"
      className="mt-7"
      onClick={() => trackLandingCtaClicked({ section: 'pricing', label: name })}
    >
      <Button
        className={`h-12 w-full touch-manipulation rounded-xl font-semibold transition-transform active:scale-[0.98] ${
          featured
            ? 'bg-yellow-500 text-black hover:bg-yellow-400'
            : 'border border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.12]'
        }`}
      >
        Start free — £0 today
      </Button>
    </Link>
    <p className="mt-2.5 text-center text-[11.5px] text-white/55">
      First charge after 7 days, only if you keep it
    </p>

    <div className="mt-6 space-y-3 border-t border-white/[0.08] pt-6">
      {features.map((feature) => (
        <div key={feature} className="flex items-start gap-3 text-[14px] leading-[1.6] text-white">
          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-400" />
          <span>{feature}</span>
        </div>
      ))}
    </div>
  </div>
);

export default LandingPage;
