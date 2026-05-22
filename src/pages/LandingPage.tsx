import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ChevronDown, Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { StoreBadges } from '@/components/seo/StoreBadges';
import { useAuth } from '@/contexts/AuthContext';
import { useUserCount } from '@/hooks/useUserCount';
import { LeadMagnetSection } from '@/components/landing/LeadMagnetSection';
import { ExitIntentModal } from '@/components/landing/ExitIntentModal';
import {
  Eyebrow,
  Pill,
  Dot,
  HubCard,
  PrimaryButton,
  SecondaryButton,
} from '@/components/college/primitives';

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
    description: '18 cert types, A4:2026 ready, signed in minutes.',
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
    description: '30+ courses, 700+ modules, EPA simulator, digital portfolio.',
    replaces: 'Logic4Training',
  },
];

const getAudienceCards = (
  apprenticePrice: string,
  electricianPrice: string
): {
  eyebrow: string;
  title: string;
  body: string;
  features: string[];
  price: string;
  featured?: boolean;
}[] => [
  {
    eyebrow: 'APPRENTICE',
    title: 'Pass AM2 first time.',
    body: 'The complete path from Level 2 to qualified — theory courses, the practical simulator, OJT hours, digital portfolio and an AI mentor that knows BS 7671. Built around the AM2.',
    features: [
      '46 courses · 106 lessons · 1,750+ exam questions (L2 · L3 · AM2)',
      'AM2 Testing Simulator — Megger MFT dial + EIC schedule sign-off',
      'Digital portfolio · OJT hours · tutor sign-off · AC coverage',
      '"Ask Dave" AI mentor · 22+ on-job calculators · flashcards',
    ],
    price: apprenticePrice,
  },
  {
    eyebrow: 'ELECTRICIAN',
    title: 'Quote, certify, invoice, get paid.',
    body: 'Everything you actually use on the tools, all in one app. Certificates, RAMS, calculators, AI agents — plus an AI Assistant in the sidebar that answers anything BS 7671 and Business Mate that does the admin for you.',
    features: [
      '18 BS 7671 cert types · A4:2026 ready · works offline',
      'AI Assistant in the sidebar — ask anything, every answer cites BS 7671',
      'Business Mate — creates projects, snags, quotes & emails on command',
      'AI agents — Cost Engineer · Circuit Designer · Maintenance · Installer · H&S',
      'AI Board Scanner · 70+ trade calculators · live BS 7671 reference',
      'RAMS · site safety · method statements · CPD log',
      'Business Hub — quotes, invoices, customers, projects, jobs, snagging',
    ],
    price: electricianPrice,
    featured: true,
  },
];

const sitePhotos = [
  {
    src: '/images/site-photos/consumer-unit-eic.jpg',
    alt: 'iPad showing EIC form below a live consumer unit',
    title: 'EIC, on the wall.',
    subtitle: 'iPad up. Form open. Cert signed before you leave the job.',
  },
  {
    src: '/images/site-photos/ipad-mft-testing.jpg',
    alt: 'iPad on a worktop next to a Megger MFT during testing',
    title: 'A4:2026 readings, live.',
    subtitle: 'Megger MFT into the new model schedule of tests.',
  },
  {
    src: '/images/site-photos/macbook-cert-types.jpg',
    alt: 'MacBook showing Elec-Mate certificate selector with Megger MFT',
    title: 'Every cert. One click.',
    subtitle: 'EICR · EIC · Minor Works · Testing Only · plus 14 more.',
  },
  {
    src: '/images/site-photos/macbook-workshop-a4.jpg',
    alt: 'MacBook on a workshop bench running schedule of tests',
    title: 'Workshop or front room.',
    subtitle: 'Same app. Every device. Every job.',
  },
];

const testimonials: {
  nickname: string;
  title: string;
  quote: string;
  date: string;
}[] = [
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

const featurePillars: {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
}[] = [
  {
    eyebrow: 'INSPECTION & TESTING',
    title: 'Sign BS 7671 certs in minutes.',
    body: 'Every cert, signed on site. AI board scanner reads the panel for you, guided test sequences keep results clean, client handouts print themselves.',
    bullets: [
      '18 cert types — EIC · EICR · PAT · Solar PV · EV · Fire Alarm',
      'AI Board Scanner — photo in, circuits & ratings out',
      'Guided dead & live test sequences with confidence scoring',
      'A4:2026 ready · works offline · syncs when back online',
    ],
  },
  {
    eyebrow: 'BUSINESS HUB',
    title: 'Run the business from your phone.',
    body: 'Quotes, invoices, customers, projects and snagging — with live financials at a glance and Business Mate doing the admin in plain English.',
    bullets: [
      'Quotes · invoices · customers · projects · snagging',
      'Live financials — paid, outstanding, overdue, win rate',
      'Business Mate — "Add 3 snags for Oak Lane" or chase Mrs Smith',
      'Voice dictation · 5-second undo · agentic actions',
      'Day-rate, breakeven & take-home calculators',
    ],
  },
  {
    eyebrow: 'APPRENTICE HUB',
    title: 'Pass AM2 the first time.',
    body: 'Courses, mock exams, the AM2 simulator, OJT hours and a digital portfolio — plus an AI mentor on tap. Every step from Level 2 to qualified.',
    bullets: [
      'AM2 Testing Simulator — real MFT dial, EIC schedule, scoring',
      '8 courses · 106 lessons · 1,750+ quiz questions (L2 · L3 · AM2)',
      'Digital portfolio + OJT hours with tutor sign-off',
      '"Ask Dave" AI mentor · 22+ calculators · flashcard streaks',
    ],
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

const mentalHealthTags = [
  'Mood Tracking',
  'Breathing Exercises',
  'Crisis Resources',
  'Peer Support',
];

const faqs = [
  {
    question: 'Do I pay anything to start?',
    answer:
      'No. Seven days free, no charge until day 8. A card is needed to start the trial — it stops accidental sign-ups and rolls you straight into a paid account if you keep using it. Cancel any time before day 8 and you pay nothing.',
  },
  {
    question: 'What happens to my certs and data if I cancel?',
    answer:
      "They're yours. Export every certificate, quote and invoice as PDF any time. You keep read-only access to your account after cancelling, so nothing disappears.",
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

const getPricingPlans = (isNative: boolean) => [
  {
    name: 'Apprentice',
    price: isNative ? '£6.99' : '£5.99',
    description: 'Everything to ace your training.',
    features: [
      '46+ courses (Level 2, 3, AM2 & upskilling)',
      'EPA Simulator with AI grading',
      'Inspection & Testing hub',
      'AI Study Assistant',
      'Portfolio & OJT tracking',
      'Learning videos & calculators',
    ],
  },
  {
    name: 'Electrician',
    price: isNative ? '£14.99' : '£12.99',
    description: 'Your complete site companion.',
    features: [
      'Everything in Apprentice',
      '5 AI specialists',
      'Voice quotes & invoices',
      '17+ certificate types',
      'Pre & post site visit reports',
      'Photo documentation per job',
      'Expenses & materials tracking',
      'Elec-ID digital professional card',
      '50+ electrical calculators',
      'Stripe payments & Xero sync',
    ],
    featured: true,
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
  const userCount = useUserCount();
  const navigate = useNavigate();
  const isNative = Capacitor.isNativePlatform();
  const pricingPlans = useMemo(() => getPricingPlans(isNative), [isNative]);
  const apprenticePrice = isNative ? '£6.99' : '£5.99';
  const electricianPrice = isNative ? '£14.99' : '£12.99';
  const audienceCards = useMemo(
    () => getAudienceCards(apprenticePrice, electricianPrice),
    [apprenticePrice, electricianPrice]
  );

  // Attribution capture moved to App.tsx (AttributionCapture component) so it
  // runs for users landing directly on /auth/signup or /r/:code from ads, not
  // just this page.

  // Walkthrough redirect removed 2026-04-19 — was intercepting ~75% of landing
  // traffic (1.3K /walkthrough vs 399 / in Vercel Analytics), blocking paid-ad
  // conversion funnels and tanking Meta Pixel optimisation signal. Walkthrough
  // route still exists for direct links; just not the default landing.

  return (
    <div className="bg-[#0a0a0a] text-white">
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
              lowPrice: '5.99',
              highPrice: '12.99',
              priceCurrency: 'GBP',
              offerCount: '2',
            },
            featureList: [
              '46+ Electrical & Upskilling Courses',
              'BS 7671 AI Assistants',
              '17+ Certificate Types',
              'Voice Quotes & Invoices',
              'Stripe Payment Integration',
              '50+ Electrical Calculators',
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
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
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
              Platform
            </a>
            <a href="#pricing" className="text-[15px] text-white transition hover:text-white">
              Pricing
            </a>
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            {user ? (
              <Button
                asChild
                size="sm"
                className="h-10 touch-manipulation rounded-xl bg-yellow-500 px-5 font-semibold text-black hover:bg-yellow-400"
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
                  className="h-10 touch-manipulation rounded-xl bg-yellow-500 px-5 font-semibold text-black hover:bg-yellow-400"
                >
                  <Link to="/auth/signup">Start free trial</Link>
                </Button>
              </>
            )}
          </div>

          <button
            onClick={() => setIsNavOpen((open) => !open)}
            className="flex h-10 w-10 touch-manipulation items-center justify-center rounded-lg text-white sm:hidden"
            aria-label="Toggle navigation"
          >
            {isNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isNavOpen && (
          <div className="border-t border-white/[0.08] bg-black/95 px-5 py-5 backdrop-blur-xl sm:hidden">
            <div className="space-y-4">
              <a
                href="#workflow"
                onClick={() => setIsNavOpen(false)}
                className="block text-base text-white"
              >
                Workflow
              </a>
              <a
                href="#features"
                onClick={() => setIsNavOpen(false)}
                className="block text-base text-white"
              >
                Platform
              </a>
              <a
                href="#pricing"
                onClick={() => setIsNavOpen(false)}
                className="block text-base text-white"
              >
                Pricing
              </a>
              {!user && (
                <div className="space-y-3 pt-3">
                  <Button
                    asChild
                    className="h-12 w-full touch-manipulation rounded-xl bg-yellow-500 text-base font-semibold text-black hover:bg-yellow-400"
                  >
                    <Link to="/auth/signup">Start 7-day free trial</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 w-full touch-manipulation rounded-xl border-white/15 bg-transparent text-white"
                  >
                    <Link to="/auth/signin">Sign in</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* ========== HERO ========== */}
      <section className="relative px-5 pb-14 pt-[calc(env(safe-area-inset-top)+4rem)] sm:pb-20 sm:pt-28 lg:px-8 lg:pb-24 lg:pt-36">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55 }}
          className="relative z-10 mx-auto max-w-[80rem] text-center lg:text-left"
        >
          <Eyebrow>01 · YOUR TRADE. YOUR APP.</Eyebrow>

          <h1 className="mx-auto mt-4 max-w-[22ch] text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-[3.5rem] lg:mx-0 lg:max-w-[26ch] lg:text-[4.5rem]">
            Quote. Design. Certify. Invoice. Get paid. Train. One app.
          </h1>

          <p className="mx-auto mt-6 max-w-[44rem] text-base leading-[1.65] text-white/75 sm:mt-7 sm:text-lg lg:mx-0 lg:text-xl">
            The UK electrical industry runs on paperwork, WhatsApp and 4–5 disconnected apps.
            Elec-Mate replaces all of it.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <Pill tone="yellow">
              <Dot tone="yellow" className="mr-1.5" />
              {userCount} paying
            </Pill>
            <Pill tone="yellow">738 certs issued</Pill>
            <Pill tone="yellow">£307k invoiced</Pill>
          </div>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <PrimaryButton
              size="lg"
              fullWidth
              onClick={() => navigate('/auth/signup')}
              className="sm:w-auto sm:px-8"
            >
              Start 7-day free trial →
            </PrimaryButton>
            <SecondaryButton
              size="lg"
              fullWidth
              onClick={() =>
                document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="sm:w-auto sm:px-8"
            >
              See the workflow
            </SecondaryButton>
          </div>

          <p className="mt-4 text-[13px] text-white/65">
            Already a member?{' '}
            <Link
              to="/auth/signin"
              className="font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors"
            >
              Sign in →
            </Link>
          </p>

          <p className="mt-2 text-[13px] text-white/65">
            From <span className="font-medium text-white">{apprenticePrice}/mo</span> · cancel
            anytime · no card for 7 days
          </p>

          <div className="mt-10 flex justify-center lg:justify-start">
            <StoreBadges className="justify-center lg:justify-start" size="md" />
          </div>
        </motion.div>
      </section>

      {/* ========== WORKFLOW ========== */}
      <section id="workflow" className="scroll-mt-24 px-5 py-12 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[80rem] text-center lg:text-left">
          <Eyebrow>02 · ONE WORKFLOW</Eyebrow>
          <h2 className="mx-auto mt-3 max-w-[20ch] text-[2rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-[3rem] lg:mx-0 lg:text-[3.5rem]">
            No app-switching.
          </h2>
          <p className="mx-auto mt-4 max-w-[44rem] text-[14px] leading-relaxed text-white/65 sm:text-[15px] lg:mx-0">
            Quote, design, stay compliant, do the work, certify, invoice, get paid and train —
            without leaving Elec-Mate. Every step replaces a tool your trade is already paying for.
          </p>

          <div className="mt-8 sm:mt-10 lg:mt-12">
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
              {workflowSteps.map((step, i) => (
                <HubCard
                  key={step.title}
                  number={String(i + 1).padStart(2, '0')}
                  eyebrow={step.eyebrow}
                  title={step.title}
                  description={step.description}
                  meta={`Replaces: ${step.replaces}`}
                  tone="yellow"
                  size="sm"
                  cta="Try free"
                  onClick={() => navigate('/auth/signup')}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHO IT IS FOR ========== */}
      <section id="features" className="scroll-mt-24 px-5 py-14 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[80rem] text-center lg:text-left">
          <h2 className="mx-auto max-w-[22ch] text-[2.25rem] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[3rem] lg:mx-0 lg:text-[3.5rem]">
            One platform,
            <br />
            <span className="text-yellow-400">every stage</span> of your career.
          </h2>
          <p className="mx-auto mt-6 max-w-[40rem] text-lg leading-[1.7] text-white lg:mx-0 lg:text-xl">
            Whether you're studying for AM2 or running your own jobs, Elec-Mate grows with you —
            from your first module to signing off your hundredth cert.
          </p>

          <div className="mx-auto mt-12 grid max-w-[60rem] grid-cols-1 gap-5 lg:mx-0 lg:mt-16 lg:max-w-none lg:grid-cols-2 lg:gap-6">
            {audienceCards.map((item, idx) => (
              <AudienceCard key={item.title} index={idx} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== IN ACTION — SITE PHOTOS ========== */}
      <section className="px-5 py-14 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[80rem] text-center lg:text-left">
          <Eyebrow>IN THE TRADE</Eyebrow>
          <h2 className="mx-auto mt-3 max-w-[22ch] text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-[3rem] lg:mx-0 lg:text-[3.5rem]">
            Real sparks. <span className="text-elec-yellow">Real sites.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[42rem] text-[14px] leading-relaxed text-white/65 sm:text-[15px] lg:mx-0">
            On site every day — scanning boards, logging tests, signing off certificates, keeping
            the job flowing.
          </p>

          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-4">
            {sitePhotos.map((photo) => (
              <div
                key={photo.title}
                className="group relative overflow-hidden rounded-[1.4rem] border border-white/[0.08]"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="text-[15px] font-semibold text-white">{photo.title}</p>
                  <p className="mt-1 text-[12px] text-white">{photo.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="px-5 py-14 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[80rem] text-center lg:text-left">
          <Eyebrow>VERIFIED ON THE UK APP STORE</Eyebrow>
          <h2 className="mx-auto mt-3 max-w-[22ch] text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-[3rem] lg:mx-0 lg:text-[3.5rem]">
            What real sparks <span className="text-elec-yellow">are saying.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[42rem] text-[14px] leading-relaxed text-white/65 sm:text-[15px] lg:mx-0">
            Every five-star review pulled live from App Store Connect — UK territory, no edits, no
            paid placements.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
            {testimonials.map((item) => (
              <figure
                key={item.nickname}
                className="relative flex flex-col overflow-hidden rounded-[1.4rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-6 text-left lg:p-7"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/40 to-elec-yellow/0 opacity-70"
                />
                <div
                  className="flex gap-0.5 text-[14px] text-elec-yellow tracking-[0.05em]"
                  aria-label="5 stars"
                  role="img"
                >
                  <span aria-hidden>★★★★★</span>
                </div>
                <h3 className="mt-3 text-[15px] font-semibold leading-tight text-white sm:text-[16px]">
                  {item.title}
                </h3>
                <blockquote className="mt-3 text-[13.5px] leading-[1.65] text-white/80 sm:text-[14px]">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4 text-[12px]">
                  <span className="font-medium text-white truncate">{item.nickname}</span>
                  <span className="text-white/55 tabular-nums shrink-0">{item.date}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ========== INSIDE THE APP ========== */}
      <section className="px-5 py-14 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[80rem] text-center lg:text-left">
          <h2 className="mx-auto max-w-[22ch] text-[2.25rem] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[3rem] lg:mx-0 lg:text-[3.5rem]">
            Inside <span className="text-yellow-400">the app.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[42rem] text-lg leading-[1.7] text-white lg:mx-0 lg:text-xl">
            Inspection & testing, business operations and an AI assistant — without leaving
            Elec-Mate.
          </p>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6">
            {featurePillars.map((step, index) => (
              <div
                key={step.title}
                className="group relative flex flex-col overflow-hidden rounded-[1.8rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-7 text-left lg:p-9"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/40 to-elec-yellow/0 opacity-70"
                />
                <span
                  aria-hidden
                  className="text-[3.5rem] sm:text-[4rem] lg:text-[4.5rem] font-semibold leading-none tracking-tight text-white/[0.06] tabular-nums"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Eyebrow className="mt-6">{step.eyebrow}</Eyebrow>
                <h3 className="mt-3 text-[1.5rem] sm:text-[1.65rem] lg:text-[1.85rem] font-semibold leading-[1.12] tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-4 text-[14px] sm:text-[15px] leading-[1.65] text-white/70">
                  {step.body}
                </p>
                <div className="mt-7 space-y-3 border-t border-white/[0.06] pt-6">
                  {step.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className="flex items-start gap-3 text-[13px] sm:text-[13.5px] leading-[1.55] text-white/85"
                    >
                      <Dot tone="yellow" className="mt-[7px]" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-90">
            <img
              src="/logos/stripe.svg"
              alt="Stripe"
              loading="lazy"
              className="h-7 w-auto lg:h-8"
            />
            <img src="/logos/xero.svg" alt="Xero" loading="lazy" className="h-7 w-auto lg:h-8" />
            <img
              src="/logos/quickbooks.svg"
              alt="QuickBooks"
              loading="lazy"
              className="h-7 w-auto lg:h-8"
            />
          </div>
        </div>
      </section>

      {/* ========== PRICING ========== */}
      <section id="pricing" className="scroll-mt-24 px-5 py-14 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[80rem]">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>PRICING</Eyebrow>
            <h2 className="mt-3 text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-[3rem] lg:text-[3.5rem]">
              Simple, <span className="text-elec-yellow">honest</span> pricing.
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-white/65 sm:text-[15px]">
              7 days free. No charge until day 8. Cancel any time.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-[52rem] gap-5 sm:grid-cols-2 lg:mt-16 lg:gap-6">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.name} {...plan} />
            ))}
          </div>

          <p className="mt-10 text-center text-[14px] text-white">
            7-day free trial on all plans &middot; No charge until day 8 &middot; Cancel anytime
          </p>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="px-5 py-14 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[52rem] text-center lg:text-left">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mx-auto mt-3 max-w-[22ch] text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-[3rem] lg:mx-0 lg:text-[3.5rem]">
            Questions <span className="text-elec-yellow">before you sign up?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[40rem] text-[14px] leading-relaxed text-white/65 sm:text-[15px] lg:mx-0">
            The honest answers — no marketing spin.
          </p>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_9%)] sm:mt-12 lg:mt-14">
            {faqs.map((faq, index) => {
              const open = openFaqIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`border-b border-white/[0.06] transition-colors last:border-b-0 ${
                    open ? 'bg-white/[0.02]' : ''
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(open ? null : index)}
                    className="flex w-full touch-manipulation items-center justify-between gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
                  >
                    <span className="text-[15px] font-medium text-white sm:text-[16px]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-elec-yellow/80 transition-transform ${open ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {open && (
                    <div className="px-5 pb-6 pt-1 sm:px-7">
                      <p className="max-w-[60ch] text-[13.5px] leading-[1.7] text-white/75 sm:text-[14.5px]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== LEAD MAGNET — BS 7671 A4:2026 cheat sheet ========== */}
      <LeadMagnetSection />

      {/* ========== FREE GUIDES (SEO LANDING PAGES) ========== */}
      <section className="px-5 py-14 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[80rem] text-center lg:text-left">
          <Eyebrow>FREE GUIDES</Eyebrow>
          <h2 className="mx-auto mt-3 max-w-[22ch] text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-[3rem] lg:mx-0 lg:text-[3.5rem]">
            Browse the guides. <span className="text-elec-yellow">No sign-up.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[42rem] text-[14px] leading-relaxed text-white/65 sm:text-[15px] lg:mx-0">
            Quick-reference guides for UK electricians — bookmark them now, come back when you need
            them.
          </p>

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
            {exploreTools.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group touch-manipulation rounded-[1.4rem] border border-white/[0.08] bg-white/[0.03] p-5 transition-colors hover:border-yellow-500/30 hover:bg-yellow-500/[0.04] lg:p-6"
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

      {/* ========== FINAL CTA ========== */}
      <section className="px-5 py-14 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[80rem]">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-b from-elec-yellow/[0.04] to-white/[0.01] px-6 py-16 text-center sm:px-12 sm:py-20 lg:rounded-[2.5rem] lg:px-16 lg:py-24">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/70 to-elec-yellow/0 opacity-80"
            />
            <Eyebrow className="text-center">READY?</Eyebrow>
            <h2 className="mx-auto mt-3 max-w-[22ch] text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-[3.25rem] lg:text-[4rem]">
              Stop juggling apps. <span className="text-elec-yellow">Start running the job.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[42rem] text-[14px] leading-relaxed text-white/75 sm:text-[15px] lg:text-base">
              Quote, certify, invoice and get paid — all in one. {userCount} UK sparks already in.
              Run real work through it for seven days, no charge until day 8.
            </p>

            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <PrimaryButton
                size="lg"
                fullWidth
                onClick={() => navigate('/auth/signup')}
                className="sm:w-auto sm:px-8"
              >
                Start 7-day free trial →
              </PrimaryButton>
              <SecondaryButton
                size="lg"
                fullWidth
                onClick={() =>
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="sm:w-auto sm:px-8"
              >
                See pricing
              </SecondaryButton>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[12.5px] text-white/65">
              <span className="inline-flex items-center gap-1.5">
                <Dot tone="yellow" /> {userCount} sparks already in
              </span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>7 days free</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>Cancel any time</span>
            </div>

            <div className="mt-9 flex justify-center">
              <StoreBadges className="justify-center" size="md" />
            </div>
          </div>
        </div>
      </section>

      {/* ========== MENTAL HEALTH MATES ========== */}
      <section className="px-5 pb-14 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-[80rem]">
          <div className="relative overflow-hidden rounded-[1.8rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-7 text-center sm:p-10 lg:p-12 lg:text-left">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/40 to-elec-yellow/0 opacity-70"
            />
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
              <div>
                <Eyebrow>BEYOND THE TOOLS</Eyebrow>
                <h3 className="mt-3 text-[1.75rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-[2.25rem]">
                  Mental Health Mates.
                </h3>
                <p className="mt-4 max-w-[44ch] text-[14px] leading-[1.7] text-white/75 sm:text-[15px]">
                  Construction has the highest suicide rate of any sector. We built a safe space
                  inside Elec-Mate — mood tracking, breathing exercises, journals and crisis
                  resources. Because looking after yourself should be part of the trade.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                {mentalHealthTags.map((tag) => (
                  <Pill key={tag} tone="yellow" className="!text-[12px]">
                    {tag}
                  </Pill>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="px-5 pb-32 pt-8 sm:pb-12 lg:px-8">
        <div className="mx-auto max-w-[80rem] border-t border-white/[0.08] pt-12">
          <div className="grid gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-[1.4fr_0.9fr_0.9fr_0.8fr]">
            <div>
              <div className="flex items-center justify-center gap-3 sm:justify-start">
                <img
                  src="/logo.jpg"
                  alt="Elec-Mate"
                  className="h-10 w-10 rounded-2xl"
                  loading="lazy"
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
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.08] bg-black/85 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur-xl sm:hidden">
          <Link to="/auth/signup">
            <Button className="h-12 w-full touch-manipulation rounded-xl bg-yellow-500 text-base font-semibold text-black hover:bg-yellow-400">
              Start 7-day free trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
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

const AudienceCard = ({
  index,
  eyebrow,
  title,
  body,
  features,
  price,
  featured,
}: {
  index: number;
  eyebrow: string;
  title: string;
  body: string;
  features: string[];
  price: string;
  featured?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-[1.8rem] border p-7 text-left lg:p-9 ${
        featured
          ? 'border-elec-yellow/25 bg-gradient-to-b from-elec-yellow/[0.04] to-white/[0.015]'
          : 'border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.015]'
      }`}
    >
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 ${
          featured ? 'via-elec-yellow/80' : 'via-elec-yellow/40'
        } to-elec-yellow/0 opacity-80`}
      />
      {featured && (
        <Pill tone="yellow" className="self-start">
          <Dot tone="yellow" className="mr-1.5" />
          Most popular
        </Pill>
      )}
      <span
        aria-hidden
        className={`${
          featured ? 'mt-4' : ''
        } text-[3.5rem] sm:text-[4rem] lg:text-[4.5rem] font-semibold leading-none tracking-tight text-white/[0.06] tabular-nums`}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <Eyebrow className="mt-6">{eyebrow}</Eyebrow>
      <h3 className="mt-3 text-[1.5rem] sm:text-[1.65rem] lg:text-[1.85rem] font-semibold leading-[1.12] tracking-tight text-white">
        {title}
      </h3>
      <p className="mt-4 text-[14px] sm:text-[15px] leading-[1.65] text-white/70">{body}</p>
      <div className="mt-7 space-y-3 border-t border-white/[0.06] pt-6">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-start gap-3 text-[13px] sm:text-[13.5px] leading-[1.55] text-white/85"
          >
            <Dot tone="yellow" className="mt-[7px]" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-7">
        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3 border-t border-white/[0.06] pt-5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              from
            </span>
            <span className="text-[26px] font-semibold text-white tabular-nums leading-none">
              {price}
            </span>
            <span className="text-[12px] text-white/55">/mo</span>
          </div>
          <PrimaryButton size="sm" onClick={() => navigate('/auth/signup')}>
            Start free trial →
          </PrimaryButton>
        </div>
        <p className="mt-3 text-[11.5px] text-white/55">
          7 days free · cancel any time · no charge until day 8
        </p>
      </div>
    </div>
  );
};

const PricingCard = ({
  name,
  price,
  description,
  features,
  featured,
}: {
  name: string;
  price: string;
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
    <p className="mt-3 text-[15px] leading-[1.7] text-white">{description}</p>

    <Link to="/auth/signup" className="mt-7">
      <Button
        className={`h-12 w-full touch-manipulation rounded-xl font-semibold ${
          featured
            ? 'bg-yellow-500 text-black hover:bg-yellow-400'
            : 'border border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.12]'
        }`}
      >
        Start 7-day free trial
      </Button>
    </Link>

    <div className="mt-7 space-y-3 border-t border-white/[0.08] pt-6">
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
