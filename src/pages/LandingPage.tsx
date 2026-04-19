import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  Building2,
  Check,
  ChevronDown,
  Cpu,
  CreditCard,
  GraduationCap,
  Hammer,
  Heart,
  Menu,
  Mic,
  PoundSterling,
  Send,
  Settings,
  Shield,
  Sparkles,
  Wrench,
  X,
  Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { StoreBadges } from '@/components/seo/StoreBadges';
import { useAuth } from '@/contexts/AuthContext';
import { useUserCount } from '@/hooks/useUserCount';
import { LeadMagnetSection } from '@/components/landing/LeadMagnetSection';
import { ExitIntentModal } from '@/components/landing/ExitIntentModal';

type LucideIcon = typeof GraduationCap;

const statsBar = [
  { value: '17+', label: 'Certificate types' },
  { value: '50+', label: 'Calculators' },
  { value: '46+', label: 'Courses' },
  { value: '5', label: 'AI specialists' },
];

const audienceCards: {
  icon: LucideIcon;
  title: string;
  painPoint: string;
  tagline: string;
  features: string[];
  featured?: boolean;
}[] = [
  {
    icon: GraduationCap,
    title: 'Apprentices',
    painPoint: 'Training courses cost thousands and revision materials are scattered everywhere.',
    tagline: 'Everything to ace your training.',
    features: [
      '46+ courses — Level 2, 3, AM2 & upskilling',
      'EPA Simulator with AI scoring',
      'Inspection & Testing hub',
      'AI Study Assistant',
      'Portfolio & OJT hours tracking',
      'Learning videos & calculators',
    ],
  },
  {
    icon: Wrench,
    title: 'Electricians',
    painPoint: 'Paperwork, pricing and compliance eat into your billable hours.',
    tagline: 'Your complete site companion.',
    features: [
      '17+ digital certificate types',
      '5 AI specialists (BS 7671)',
      'Voice quote → invoice → paid',
      'Pre & post site visit reports',
      'Photo documentation per job',
      'Expenses & materials tracking',
      'Elec-ID digital professional card',
      'AI RAMS & method statements',
    ],
    featured: true,
  },
  {
    icon: Building2,
    title: 'Employers',
    painPoint: 'Managing apprentices, compliance and teams across multiple sites is chaos.',
    tagline: 'Manage your whole team from one dashboard.',
    features: [
      'Apprentice progress tracking',
      'Team certification management',
      'Job & project scheduling',
      'Business analytics & reports',
      'Multi-user team accounts',
      'Compliance documentation',
    ],
  },
];

const sitePhotos = [
  {
    src: '/images/site-photos/board-scanner.jpg',
    alt: 'Board Scanner in use',
    title: 'AI Board Scanner',
    subtitle: 'Scan & auto-populate circuits',
  },
  {
    src: '/images/site-photos/site-testing.jpg',
    alt: 'Testing on site',
    title: 'Site Testing',
    subtitle: 'Log results as you test',
  },
  {
    src: '/images/site-photos/eic-form.jpg',
    alt: 'EIC Certificate',
    title: 'Digital Certificates',
    subtitle: 'EIC, EICR & Minor Works',
  },
  {
    src: '/images/site-photos/dashboard.jpg',
    alt: 'Elec-Mate Dashboard',
    title: 'All-in-one Dashboard',
    subtitle: 'Everything at your fingertips',
  },
];

const testimonials = [
  {
    image: '/images/testimonials/corevolt.jpg',
    alt: 'Corevolt Electrical',
    name: 'Cole Humphreys',
    company: 'Corevolt Electrical',
    quote:
      "Everything is practical, easy to use, and actually useful on site. It saves time, takes the hassle out of calculations and checks, and just makes day-to-day work smoother. I genuinely love using it — it's an absolute game-changer.",
  },
  {
    image: '/images/testimonials/dan-palmer.jpg',
    alt: 'Dan Palmer Services',
    name: 'Dan Palmer',
    company: 'Dan Palmer Services',
    quote:
      "Elec-Mate has replaced 2/3 other apps and merged them into one. It's streamlined all aspects of our business from apprentices to the QS signing jobs off. The AI circuit designer in our handover packs has already won us additional contracts — a step above the rest.",
  },
  {
    image: '/images/testimonials/np-electrical.png',
    alt: 'NP Electrical Services',
    name: 'Nathan Perry',
    company: 'NP Electrical Services',
    quote:
      "Elec-Mate has become my go-to software for quoting, invoicing, and managing jobs. It's really easy to use and keeps everything in one place — I'm not jumping between different apps anymore. The calculation and circuit design features are a big help when pricing jobs on site. It's made running my jobs smoother and more organised.",
  },
];

const aiAgents: {
  icon: LucideIcon;
  name: string;
  tagline: string;
  features: string[];
  featured?: boolean;
}[] = [
  {
    icon: Cpu,
    name: 'Circuit Designer',
    tagline: 'Design compliant circuits in seconds.',
    features: [
      'Adiabatic cable sizing to BS 7671',
      'Volt drop & max length calculations',
      'Consumer unit layouts with diversity',
      'Full load schedules & protection sizing',
    ],
  },
  {
    icon: PoundSterling,
    name: 'Cost Engineer',
    tagline: 'Quote jobs accurately, every time.',
    features: [
      'Live material prices from UK suppliers',
      'Labour rates with regional adjustments',
      'Automatic profit margin calculation',
      'Professional PDF quotes in 2 minutes',
    ],
    featured: true,
  },
  {
    icon: Hammer,
    name: 'Installation Guide',
    tagline: 'BS 7671 compliant installation steps.',
    features: [
      'Step-by-step for any circuit type',
      'Cable routes & containment guidance',
      'Earthing & bonding requirements',
      'Testing sequences after install',
    ],
  },
  {
    icon: Settings,
    name: 'Maintenance Agent',
    tagline: 'Keep installations compliant.',
    features: [
      'Maintenance schedules & intervals',
      'Inspection checklists by installation type',
      'Compliance reminders & tracking',
      'Condition reporting guidance',
    ],
  },
  {
    icon: Shield,
    name: 'Health & Safety',
    tagline: 'Site-ready RAMS in minutes.',
    features: [
      'Risk assessments for any job type',
      'Method statements with sequences',
      'Site-specific hazard identification',
      'PDF export ready for site induction',
    ],
  },
];

const getPaidSteps: {
  icon: LucideIcon;
  title: string;
  body: string;
  bullets: string[];
}[] = [
  {
    icon: Mic,
    title: 'Create quotes your way',
    body: 'Type it, speak it, or scan materials with your camera — get a professional quote ready to send in minutes.',
    bullets: [
      'Voice, manual, or scanner input',
      'AI formats line items & pricing',
      'Send via email or WhatsApp',
    ],
  },
  {
    icon: Send,
    title: 'Send, sign & start work',
    body: 'Clients get accept or reject buttons straight in their email. Chase signatures with automatic reminders.',
    bullets: [
      'Client accept/reject buttons',
      'Automated email reminders',
      'Digital signatures built in',
    ],
  },
  {
    icon: CreditCard,
    title: 'Get paid the same day',
    body: 'Convert any signed quote to an invoice in one tap. Stripe payment links mean customers pay instantly by card.',
    bullets: [
      'One-tap quote to invoice',
      'Stripe payment links in every invoice',
      'Auto-sync to Xero & QuickBooks',
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
    question: 'Will I be charged during the free trial?',
    answer:
      "Your card details are required to start your free trial, but you won't be charged for 7 days. Cancel anytime before the trial ends and you pay nothing.",
  },
  {
    question: 'Is the AI compliant with current regs?',
    answer:
      'Yes. All 5 AI specialists are trained on BS 7671:2018 + Amendment 4:2026 (18th Edition). We update them when regulations change.',
  },
  {
    question: 'What certificates can I create?',
    answer:
      'EICR, EIC, Minor Works, Fire Alarm, Emergency Lighting, Solar PV, EV Charging, and PAT Testing — all 8 with digital signatures and PDF export.',
  },
  {
    question: 'Do you sync with my accounting software?',
    answer:
      'Yes. We integrate with Xero and QuickBooks. Invoices sync automatically when you send them.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes. Cancel in one tap from Settings. No contracts, no minimum term, no hassle.',
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
  const prefersReducedMotion = useReducedMotion();
  const isNative = Capacitor.isNativePlatform();
  const pricingPlans = useMemo(() => getPricingPlans(isNative), [isNative]);
  const apprenticePrice = isNative ? '£6.99' : '£5.99';

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
        <meta property="og:url" content="https://elec-mate.com/" />
        <meta property="og:title" content="Elec-Mate | The Complete Platform for UK Electricians" />
        <meta
          property="og:description"
          content="Training, AI tools, certificates & business management for UK electricians. From apprentice to employer — everything you need to learn, work smarter, and grow."
        />
        <meta property="og:image" content="https://elec-mate.com/og-image.jpg" />
        <meta property="og:site_name" content="Elec-Mate" />
        <meta property="og:locale" content="en_GB" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://elec-mate.com/" />
        <meta
          name="twitter:title"
          content="Elec-Mate | The Complete Platform for UK Electricians"
        />
        <meta
          name="twitter:description"
          content="Training, AI tools, certificates & business management for UK electricians. 5 AI specialists trained on BS 7671. Start free today."
        />
        <meta name="twitter:image" content="https://elec-mate.com/og-image.jpg" />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="Elec-Mate" />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <link rel="canonical" href="https://elec-mate.com/" />

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
            url: 'https://elec-mate.com',
            logo: 'https://elec-mate.com/logo.jpg',
            description: 'The complete platform for UK electricians',
            address: { '@type': 'PostalAddress', addressCountry: 'GB' },
            sameAs: [
              'https://www.facebook.com/elecmate',
              'https://www.instagram.com/elec_mate',
              'https://www.tiktok.com/@elecmate',
              'https://www.linkedin.com/company/elec-mate',
              'https://t.me/Elec_MateOfficialGroup',
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
            <a href="#features" className="text-[15px] text-white transition hover:text-white">
              Platform
            </a>
            <a href="#ai" className="text-[15px] text-white transition hover:text-white">
              AI tools
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
                href="#features"
                onClick={() => setIsNavOpen(false)}
                className="block text-base text-white"
              >
                Platform
              </a>
              <a
                href="#ai"
                onClick={() => setIsNavOpen(false)}
                className="block text-base text-white"
              >
                AI tools
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
      <section className="relative overflow-hidden px-5 pb-16 pt-[calc(env(safe-area-inset-top)+4rem)] sm:pb-20 sm:pt-28 lg:px-8 lg:pb-24 lg:pt-36">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {!prefersReducedMotion && (
            <>
              <motion.div
                className="absolute left-[6%] top-24 h-[34rem] w-[34rem] rounded-full bg-yellow-500/10 blur-[160px]"
                animate={{ scale: [1, 1.08, 1], opacity: [0.16, 0.28, 0.16] }}
                transition={{ duration: 11, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-[-12%] right-[4%] h-[28rem] w-[28rem] rounded-full bg-amber-500/[0.08] blur-[140px]"
                animate={{ scale: [1.04, 1, 1.04], opacity: [0.12, 0.22, 0.12] }}
                transition={{ duration: 12, repeat: Infinity }}
              />
            </>
          )}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55 }}
          className="relative z-10 mx-auto max-w-[80rem] text-center lg:text-left"
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/[0.08] px-4 py-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-400" />
            </span>
            <span className="text-[13px] font-medium text-yellow-300">Trusted by UK sparks</span>
          </motion.div>

          <h1 className="mx-auto mt-7 max-w-[18ch] text-[2.5rem] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[4rem] lg:mx-0 lg:text-[5rem]">
            Stop losing hours <span className="text-yellow-400">on paperwork.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-[42rem] text-lg leading-[1.65] text-white sm:mt-8 sm:text-xl lg:mx-0">
            Certificates, quotes, invoices, RAMS — done in minutes, not hours. One premium platform
            for UK electricians, built for BS 7671 and the realities of working on site.
          </p>

          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <Link to="/auth/signup" className="w-full sm:w-auto">
              <Button className="h-14 w-full touch-manipulation rounded-2xl bg-yellow-500 px-8 text-base font-semibold text-black hover:bg-yellow-400 sm:w-auto">
                Start 7-day free trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/auth/signin" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="h-14 w-full touch-manipulation rounded-2xl border-white/15 bg-white/[0.02] px-8 text-base font-semibold text-white hover:bg-white/[0.06] sm:w-auto"
              >
                Sign in
              </Button>
            </Link>
          </div>

          <p className="mt-5 text-[14px] text-white">
            Plans from <span className="font-semibold text-yellow-400">{apprenticePrice}/mo</span>{' '}
            after your free trial.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px] text-white lg:justify-start">
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-yellow-400" />7 days free
            </span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-yellow-400" />
              Cancel anytime
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:inline-block" />
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              <Check className="h-3.5 w-3.5 text-yellow-400" />
              No charge until day 8
            </span>
          </div>

          <div className="mt-8 flex justify-center lg:justify-start">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <p className="text-[14px] font-medium text-white">
                <span className="text-emerald-400">{userCount}</span> UK electricians and growing
              </p>
            </div>
          </div>

          <div className="mt-10 flex justify-center lg:justify-start">
            <StoreBadges className="justify-center lg:justify-start" size="md" />
          </div>
        </motion.div>
      </section>

      {/* ========== STATS BAND ========== */}
      <section className="px-5 pb-10 sm:pb-14 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-[80rem]">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.015] p-8 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] sm:p-12 lg:rounded-[2.5rem] lg:p-16">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-24 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.12),transparent_60%)] blur-3xl" />
              <div className="absolute -right-24 top-1/2 h-[22rem] w-[22rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.06),transparent_60%)] blur-3xl" />
            </div>
            <div className="relative grid grid-cols-2 gap-y-10 text-center sm:grid-cols-4 sm:gap-y-8 sm:divide-x sm:divide-white/[0.08] lg:text-left">
              {statsBar.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`${idx > 0 ? 'sm:pl-8 lg:pl-12' : ''} ${idx < statsBar.length - 1 ? 'sm:pr-8 lg:pr-12' : ''}`}
                >
                  <div className="bg-gradient-to-b from-yellow-300 to-yellow-500 bg-clip-text text-[2.75rem] font-bold leading-none tracking-[-0.04em] text-transparent sm:text-[3rem] lg:text-[4rem]">
                    {stat.value}
                  </div>
                  <div className="mt-3 text-[13px] font-medium leading-[1.5] text-white/75 sm:text-sm lg:text-[15px]">
                    {stat.label}
                  </div>
                </div>
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
            Whether you are starting out or running a team, Elec-Mate grows with you — from your
            first module to signing off your hundredth job.
          </p>

          <div className="-mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 lg:mx-0 lg:mt-20 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
            {audienceCards.map((item) => (
              <AudienceCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== IN ACTION — SITE PHOTOS ========== */}
      <section className="px-5 py-14 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[80rem] text-center lg:text-left">
          <h2 className="mx-auto max-w-[22ch] text-[2.25rem] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[3rem] lg:mx-0 lg:text-[3.5rem]">
            Real sparks,
            <br />
            <span className="text-yellow-400">Real sites.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[40rem] text-lg leading-[1.7] text-white lg:mx-0 lg:text-xl">
            See how electricians are using Elec-Mate on site every day — scanning boards, logging
            tests, signing off certificates and keeping the job flowing.
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
          <h2 className="mx-auto max-w-[22ch] text-[2.25rem] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[3rem] lg:mx-0 lg:text-[3.5rem]">
            Trusted by electricians
            <br />
            <span className="text-yellow-400">already winning</span> their time back.
          </h2>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6">
            {testimonials.map((item) => (
              <figure
                key={item.name}
                className="flex flex-col rounded-[1.8rem] border border-white/[0.08] bg-white/[0.03] p-7 lg:p-8"
              >
                <div className="flex text-yellow-400">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
                <blockquote className="mt-5 text-[16px] leading-[1.75] text-white lg:text-[17px]">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-4 pt-7">
                  <div className="h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.08]">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold text-white">{item.name}</div>
                    <div className="text-[13px] text-white">{item.company}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ========== AI AGENTS ========== */}
      <section id="ai" className="scroll-mt-24 px-5 py-14 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[80rem]">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-black px-6 py-12 sm:px-10 sm:py-16 lg:rounded-[2.5rem] lg:px-16 lg:py-20">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.1),transparent_60%)] blur-3xl" />
            </div>
            <div className="relative text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/[0.08] px-4 py-2">
                <Brain className="h-3.5 w-3.5 text-yellow-400" />
                <span className="text-[13px] font-medium text-yellow-300">Powered by AI</span>
              </div>
              <h2 className="mx-auto mt-6 max-w-[22ch] text-[2.25rem] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[3rem] lg:mx-0 lg:text-[3.5rem]">
                Stop Googling regs.
                <br />
                <span className="text-yellow-400">Ask anything.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-[42rem] text-lg leading-[1.7] text-white lg:mx-0 lg:text-xl">
                Five AI specialists trained on{' '}
                <span className="font-medium text-yellow-400">BS 7671:2018 + A4:2026</span>. Ask
                them anything — design, cost, install, maintain, sign off.
              </p>

              <div className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-16 lg:grid-cols-3 lg:gap-6">
                {aiAgents.map((agent) => (
                  <AIAgentCard key={agent.name} {...agent} />
                ))}
              </div>

              <p className="mt-8 text-[14px] text-white">
                <Sparkles className="mr-1.5 inline h-4 w-4 text-yellow-400" />
                Plus 2 more specialists: Project Manager & Commissioning Agent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== GET PAID FASTER ========== */}
      <section className="px-5 py-14 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[80rem] text-center lg:text-left">
          <h2 className="mx-auto max-w-[24ch] text-[2.25rem] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[3rem] lg:mx-0 lg:text-[3.5rem]">
            Quote to payment
            <br />
            <span className="text-yellow-400">in minutes.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[42rem] text-lg leading-[1.7] text-white lg:mx-0 lg:text-xl">
            Create a quote by hand or voice, scan materials, send it for signing, do the work,
            convert to invoice, get paid — all from your phone.
          </p>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6">
            {getPaidSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="flex flex-col rounded-[1.8rem] border border-white/[0.08] bg-white/[0.03] p-7 lg:p-8"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-500/25 bg-yellow-500/[0.12]">
                      <Icon className="h-6 w-6 text-yellow-400" />
                    </div>
                    <span className="text-[13px] font-medium tabular-nums text-white">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-white lg:text-[1.35rem]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.7] text-white">{step.body}</p>
                  <div className="mt-6 space-y-2.5 border-t border-white/[0.06] pt-5">
                    {step.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-2.5 text-[14px] text-white">
                        <div className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-yellow-400" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
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
            <h2 className="text-[2.25rem] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[3rem] lg:text-[3.5rem]">
              Simple, <span className="text-yellow-400">honest</span> pricing.
            </h2>
            <p className="mt-6 text-lg leading-[1.7] text-white lg:text-xl">
              Try everything free for 7 days. No charge until day 8.
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
          <h2 className="mx-auto max-w-[22ch] text-[2.25rem] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[3rem] lg:mx-0 lg:text-[3.5rem]">
            Clear enough
            <br />
            <span className="text-yellow-400">to make the next step</span> easy.
          </h2>

          <div className="mt-14 space-y-3 lg:mt-16">
            {faqs.map((faq, index) => {
              const open = openFaqIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-[1.5rem] border transition-colors ${
                    open
                      ? 'border-yellow-500/25 bg-yellow-500/[0.04]'
                      : 'border-white/[0.08] bg-white/[0.03]'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(open ? null : index)}
                    className="flex w-full touch-manipulation items-center justify-between gap-4 p-6 text-left"
                  >
                    <span className="text-[16px] font-semibold text-white sm:text-[17px]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-white transition-transform ${open ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {open && (
                    <div className="px-6 pb-6">
                      <p className="text-[15px] leading-[1.8] text-white">{faq.answer}</p>
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

      {/* ========== EXPLORE OUR TOOLS ========== */}
      <section className="px-5 py-14 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[80rem] text-center lg:text-left">
          <h2 className="mx-auto max-w-[22ch] text-[2.25rem] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[3rem] lg:mx-0 lg:text-[3.5rem]">
            Explore the tools,
            <br />
            <span className="text-yellow-400">no sign-up</span> required.
          </h2>
          <p className="mx-auto mt-6 max-w-[40rem] text-lg leading-[1.7] text-white lg:mx-0 lg:text-xl">
            Free guides and calculators for UK electricians — try them, bookmark them, come back
            when you need them.
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
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-black px-6 py-16 text-center sm:px-12 sm:py-20 lg:rounded-[2.5rem] lg:px-16 lg:py-24">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.14),transparent_60%)] blur-3xl" />
            </div>
            <div className="relative">
              <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-500/25 bg-yellow-500/[0.12]">
                <Zap className="h-6 w-6 text-yellow-400" />
              </div>
              <h2 className="mx-auto mt-6 max-w-[20ch] text-[2.25rem] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[3.25rem] lg:text-[4rem]">
                Ready to <span className="text-yellow-400">work smarter?</span>
              </h2>
              <p className="mx-auto mt-6 max-w-[38rem] text-lg leading-[1.7] text-white lg:text-xl">
                Join {userCount} UK electricians saving hours every week. Run real work through the
                platform for seven days — no charge until day 8.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to="/auth/signup" className="w-full sm:w-auto">
                  <Button className="h-14 w-full touch-manipulation rounded-2xl bg-yellow-500 px-8 text-base font-semibold text-black hover:bg-yellow-400 sm:w-auto">
                    Start 7-day free trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/auth/signin" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="h-14 w-full touch-manipulation rounded-2xl border-white/15 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/[0.06] sm:w-auto"
                  >
                    Sign in
                  </Button>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px] text-white">
                <span>{userCount} electricians already live</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span>7 days free</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span>Cancel anytime</span>
              </div>

              <div className="mt-10 flex justify-center">
                <StoreBadges className="justify-center" size="md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== MENTAL HEALTH MATES ========== */}
      <section className="px-5 pb-14 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-[80rem]">
          <div className="rounded-[1.8rem] border border-white/[0.08] bg-white/[0.03] p-7 text-center sm:p-10 lg:p-12 lg:text-left">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
              <div>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-pink-500/30 bg-pink-500/[0.12] lg:mx-0">
                  <Heart className="h-6 w-6 text-pink-400" />
                </div>
                <h3 className="mt-6 text-[1.75rem] font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2.25rem]">
                  Mental Health Mates.
                </h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-white lg:text-base">
                  Construction has the highest suicide rate of any sector. We built a safe space
                  inside Elec-Mate with mood tracking, breathing exercises, journals and crisis
                  resources — because looking after yourself should be part of the trade.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2.5 lg:justify-start">
                {mentalHealthTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-[13px] text-white"
                  >
                    {tag}
                  </span>
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
  title,
  painPoint,
  tagline,
  features,
  featured,
}: {
  icon: LucideIcon;
  title: string;
  painPoint: string;
  tagline: string;
  features: string[];
  featured?: boolean;
}) => (
  <div
    className={`relative w-[82%] flex-shrink-0 snap-start rounded-[1.8rem] border p-7 lg:w-auto lg:flex-shrink lg:p-8 ${
      featured
        ? 'border-yellow-500/30 bg-gradient-to-br from-yellow-500/[0.12] via-amber-500/[0.05] to-white/[0.02] shadow-[0_24px_80px_rgba(250,204,21,0.1)]'
        : 'border-white/[0.08] bg-white/[0.03]'
    }`}
  >
    {featured && (
      <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/[0.12] px-3 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-yellow-300">
          Most popular
        </span>
      </div>
    )}

    <h3 className="text-[1.6rem] font-semibold tracking-[-0.02em] text-white lg:text-[1.75rem]">
      {title}
    </h3>
    <p className="mt-2 text-[15px] leading-[1.55] text-white/80">{tagline}</p>

    <div className="mt-6 rounded-[1rem] border border-white/[0.06] bg-white/[0.02] px-4 py-3">
      <p className="text-[13px] italic leading-[1.6] text-white/75">&ldquo;{painPoint}&rdquo;</p>
    </div>

    <div className="mt-6 space-y-2.5">
      {features.map((feature) => (
        <div
          key={feature}
          className="flex items-start gap-2.5 text-[14px] leading-[1.6] text-white"
        >
          <div className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-yellow-400" />
          <span>{feature}</span>
        </div>
      ))}
    </div>
  </div>
);

const AIAgentCard = ({
  name,
  tagline,
  features,
  featured,
}: {
  icon: LucideIcon;
  name: string;
  tagline: string;
  features: string[];
  featured?: boolean;
}) => (
  <div
    className={`relative flex w-[82%] flex-shrink-0 snap-start flex-col rounded-[1.8rem] border p-6 text-left sm:w-auto sm:flex-shrink lg:p-7 ${
      featured
        ? 'border-yellow-500/30 bg-gradient-to-br from-yellow-500/[0.1] via-amber-500/[0.04] to-white/[0.02]'
        : 'border-white/[0.08] bg-white/[0.03]'
    }`}
  >
    <h3 className="text-[1.15rem] font-semibold tracking-[-0.01em] text-white lg:text-[1.25rem]">
      {name}
    </h3>
    <p className="mt-2 text-[13px] leading-[1.55] text-white/75">{tagline}</p>
    <div className="mt-5 space-y-2.5 border-t border-white/[0.06] pt-4">
      {features.map((feature) => (
        <div
          key={feature}
          className="flex items-start gap-2.5 text-[13px] leading-[1.55] text-white"
        >
          <div className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-yellow-400" />
          <span className="flex-1">{feature}</span>
        </div>
      ))}
    </div>
  </div>
);

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
