import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Menu,
  X,
  Check,
  ArrowRight,
  Zap,
  GraduationCap,
  Wrench,
  Building2,
  Cpu,
  PoundSterling,
  Hammer,
  Settings,
  Shield,
  Clock,
  Mic,
  CreditCard,
  Send,
  Sparkles,
  Brain,
  Heart,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { motion, useReducedMotion } from 'framer-motion';

const LandingPage = () => {
  const { user } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Redirect first-time visitors to walkthrough (before they've signed in)
  if (!user && !localStorage.getItem('walkthrough_completed')) {
    return <Navigate to="/walkthrough" replace />;
  }

  const faqs = [
    {
      question: 'Will I be charged during the free trial?',
      answer:
        "Your card details are required to start your free trial, but you won't be charged for 7 days. Cancel anytime before the trial ends and you pay nothing.",
    },
    {
      question: 'Is the AI compliant with current regs?',
      answer:
        'Yes. All 5 AI specialists are trained on BS 7671:2018 + Amendment 3:2024 (18th Edition). We update them when regulations change.',
    },
    {
      question: 'What certificates can I create?',
      answer:
        'EICR, EIC, Minor Works, Fire Alarm, Emergency Lighting, Solar PV, EV Charging — all with digital signatures and PDF export.',
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

  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* SEO Meta Tags */}
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

        {/* Open Graph / Facebook */}
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

        {/* Twitter */}
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

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Elec-Mate" />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <link rel="canonical" href="https://elec-mate.com/" />

        {/* Schema.org structured data */}
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
              lowPrice: '4.99',
              highPrice: '9.99',
              priceCurrency: 'GBP',
              offerCount: '2',
            },
            featureList: [
              'Level 2 & 3 Electrical Training',
              'BS 7671 AI Assistants',
              '8 Certificate Types',
              'Voice Quotes & Invoices',
              'Stripe Payment Integration',
              '50+ Electrical Calculators',
            ],
          })}
        </script>

        {/* Organization schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Elec-Mate',
            url: 'https://elec-mate.com',
            logo: 'https://elec-mate.com/logo.jpg',
            description: 'The complete platform for UK electricians',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'GB',
            },
            sameAs: [],
          })}
        </script>
      </Helmet>

      {/* Nav - hidden on mobile to avoid iOS status bar overlap */}
      <nav className="hidden sm:block fixed top-0 left-0 right-0 z-50">
        {/* Gradient background for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/80 backdrop-blur-xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-5 lg:px-8 h-16 lg:h-18 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/20 rounded-xl blur-md group-hover:bg-yellow-500/30 transition-all" />
              <img
                src="/logo.jpg"
                alt="Elec-Mate"
                className="relative w-9 h-9 lg:w-10 lg:h-10 rounded-xl"
              />
            </div>
            <span className="font-bold text-lg lg:text-xl">
              Elec-<span className="text-yellow-400">Mate</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            <a
              href="#features"
              className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              Pricing
            </a>
            <a
              href="#ai"
              className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              AI Tools
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <Button
                asChild
                size="sm"
                className="h-10 px-5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl"
              >
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Link
                  to="/auth/signin"
                  className="text-sm text-white/60 hover:text-white px-4 py-2 transition-colors"
                >
                  Sign in
                </Link>
                <Button
                  asChild
                  size="sm"
                  className="h-10 px-5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30 transition-all"
                >
                  <Link to="/auth/signup">Start 7-Day Free Trial</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="sm:hidden w-10 h-10 flex items-center justify-center text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            {isNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isNavOpen && (
          <div className="sm:hidden relative border-t border-white/10 bg-black/95 backdrop-blur-xl p-4 space-y-3">
            {user ? (
              <Button
                asChild
                className="w-full h-12 bg-yellow-500 text-black font-semibold rounded-xl"
              >
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  className="w-full h-12 bg-yellow-500 text-black font-semibold rounded-xl"
                >
                  <Link to="/auth/signup">Start 7-Day Free Trial</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full h-12 border-white/20 text-white rounded-xl"
                >
                  <Link to="/auth/signin">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="min-h-0 sm:min-h-[100svh] flex flex-col justify-start sm:justify-center px-5 pt-[calc(env(safe-area-inset-top)+40px)] sm:pt-24 lg:pt-28 pb-8 sm:pb-0">
        <div className="max-w-5xl mx-auto w-full">
          {/* Ambient glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {!prefersReducedMotion && (
              <>
                <motion.div
                  className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[120px]"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/15 rounded-full blur-[100px]"
                  animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.25, 0.15] }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
              </>
            )}
          </div>

          <div className="relative z-10 text-center">
            {/* Logo for mobile */}
            <motion.div
              className="sm:hidden flex justify-center mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500/30 rounded-2xl blur-xl" />
                <img
                  src="/logo.jpg"
                  alt="Elec-Mate"
                  className="relative w-16 h-16 rounded-2xl shadow-lg shadow-yellow-500/20"
                />
              </div>
            </motion.div>

            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-5 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400" />
              </span>
              <span className="text-sm text-yellow-400 font-medium">Trusted by UK Sparks</span>
            </motion.div>

            <motion.h1
              className="text-[32px] sm:text-5xl lg:text-6xl font-bold leading-[1.15] sm:leading-tight mb-4 sm:mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Stop Losing Hours
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500">
                on Paperwork
              </span>
            </motion.h1>

            <motion.p
              className="text-white/60 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-6 sm:mb-8 px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Certificates, quotes, invoices, RAMS — done in minutes, not hours. Built for BS 7671
              by UK electricians.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/auth/signup">
                <Button className="w-full sm:w-auto h-14 px-8 text-base font-semibold bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 active:scale-[0.97] text-black shadow-lg shadow-yellow-500/25 rounded-2xl touch-manipulation transition-transform">
                  Start 7-Day Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/auth/signin">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-14 px-8 text-base font-semibold border-white/20 text-white hover:bg-white/5 active:scale-[0.97] rounded-2xl touch-manipulation transition-transform"
                >
                  Sign In
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-3 text-white/40 text-sm mt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-green-500" />7 days free
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-green-500" />
                Cancel anytime
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
              <span className="hidden sm:flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-green-500" />
                No charge until day 8
              </span>
            </motion.div>

            {/* Social Proof Banner */}
            <motion.div
              className="mt-8 sm:mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500/15 to-green-500/10 border border-emerald-500/30">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <p className="text-white font-semibold text-sm">
                  Approaching <span className="text-emerald-400">500 UK electricians</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1">8</div>
              <div className="text-xs sm:text-sm text-white/60">Certificate Types</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1">50+</div>
              <div className="text-xs sm:text-sm text-white/60">Calculators</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1">22</div>
              <div className="text-xs sm:text-sm text-white/60">Courses</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1">5</div>
              <div className="text-xs sm:text-sm text-white/60">AI Specialists</div>
            </div>
          </div>
        </div>
      </section>

      {/* Who is this for? */}
      <section id="features" className="py-10 sm:py-16 px-5 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              One platform, every stage of your career
            </h2>
            <p className="text-white/60 max-w-lg mx-auto">
              Whether you're starting out or running a team, Elec-Mate grows with you
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <AudienceCard
              icon={<GraduationCap className="w-6 h-6" />}
              title="Apprentices"
              painPoint="Training courses cost thousands and revision materials are scattered everywhere"
              tagline="Everything to ace your training — from £4.99/mo"
              features={[
                'Level 2 & 3 complete curriculum',
                'AM2 practical & theory prep',
                '2,000+ practice questions',
                'HNC diploma modules',
                'Flashcards & mock exams',
                'Mental Health Mates community',
              ]}
              color="green"
            />
            <AudienceCard
              icon={<Wrench className="w-6 h-6" />}
              title="Electricians"
              painPoint="Paperwork, pricing and compliance eat into your billable hours"
              tagline="Your complete site companion"
              features={[
                '8 digital certificate types',
                '5 AI specialists (BS 7671)',
                'Voice quote → invoice → paid',
                '50+ electrical calculators',
                'AI RAMS & method statements',
                'Xero & QuickBooks sync',
              ]}
              color="yellow"
              highlight
            />
            <AudienceCard
              icon={<Building2 className="w-6 h-6" />}
              title="Employers"
              painPoint="Managing apprentices, compliance and teams across multiple sites is chaos"
              tagline="Manage your whole team from one dashboard"
              features={[
                'Apprentice progress tracking',
                'Team certification management',
                'Job & project scheduling',
                'Business analytics & reports',
                'Multi-user team accounts',
                'Compliance documentation',
              ]}
              color="purple"
              comingSoon
            />
          </div>
        </div>
      </section>

      {/* In Action - Site Photos */}
      <section className="py-10 sm:py-16 px-5 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-blue-400 font-semibold">REAL SPARKS, REAL SITES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Elec-Mate in action</h2>
            <p className="text-white/60 max-w-lg mx-auto">
              See how electricians are using Elec-Mate on site every day
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-xl z-10" />
              <img
                src="/images/site-photos/board-scanner.jpg"
                alt="Board Scanner in use"
                loading="lazy"
                className="w-full aspect-[3/4] object-cover rounded-xl border border-white/10 group-hover:border-yellow-500/30 transition-all"
              />
              <div className="absolute bottom-3 left-3 right-3 z-20">
                <p className="text-white font-semibold text-sm">AI Board Scanner</p>
                <p className="text-white/60 text-xs">Scan & auto-populate circuits</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-xl z-10" />
              <img
                src="/images/site-photos/site-testing.jpg"
                alt="Testing on site"
                loading="lazy"
                className="w-full aspect-[3/4] object-cover rounded-xl border border-white/10 group-hover:border-yellow-500/30 transition-all"
              />
              <div className="absolute bottom-3 left-3 right-3 z-20">
                <p className="text-white font-semibold text-sm">Site Testing</p>
                <p className="text-white/60 text-xs">Log results as you test</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-xl z-10" />
              <img
                src="/images/site-photos/eic-form.jpg"
                alt="EIC Certificate"
                loading="lazy"
                className="w-full aspect-[3/4] object-cover rounded-xl border border-white/10 group-hover:border-yellow-500/30 transition-all"
              />
              <div className="absolute bottom-3 left-3 right-3 z-20">
                <p className="text-white font-semibold text-sm">Digital Certificates</p>
                <p className="text-white/60 text-xs">EIC, EICR & Minor Works</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-xl z-10" />
              <img
                src="/images/site-photos/dashboard.jpg"
                alt="Elec-Mate Dashboard"
                loading="lazy"
                className="w-full aspect-[3/4] object-cover rounded-xl border border-white/10 group-hover:border-yellow-500/30 transition-all"
              />
              <div className="absolute bottom-3 left-3 right-3 z-20">
                <p className="text-white font-semibold text-sm">All-in-One Dashboard</p>
                <p className="text-white/60 text-xs">Everything at your fingertips</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10 sm:py-16 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Trusted by UK sparks</h2>
            <p className="text-white/60 text-sm sm:text-base">Real electricians, real results</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Cole */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-white overflow-hidden flex-shrink-0">
                  <img
                    src="/images/testimonials/corevolt.jpg"
                    alt="Corevolt Electrical"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Cole Humphreys</p>
                  <p className="text-yellow-400/70 text-xs">Corevolt Electrical</p>
                </div>
              </div>
              <blockquote className="text-white/70 text-sm leading-relaxed">
                "Everything is practical, easy to use, and actually useful on site. It saves time,
                takes the hassle out of calculations and checks, and just makes day-to-day work
                smoother. I genuinely love using it — it's an absolute game-changer."
              </blockquote>
            </div>

            {/* Dan */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-white overflow-hidden flex-shrink-0">
                  <img
                    src="/images/testimonials/dan-palmer.jpg"
                    alt="Dan Palmer Services"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Dan Palmer</p>
                  <p className="text-yellow-400/70 text-xs">Dan Palmer Services</p>
                </div>
              </div>
              <blockquote className="text-white/70 text-sm leading-relaxed">
                "Elec-Mate has replaced 2/3 other apps and merged them into one. It's streamlined
                all aspects of our business from apprentices to the QS signing jobs off. The AI
                circuit designer in our handover packs has already won us additional contracts — a
                step above the rest."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section
        id="ai"
        className="py-12 sm:py-20 px-5 bg-gradient-to-b from-transparent via-yellow-500/[0.03] to-transparent scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-4">
              <Brain className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-yellow-400 font-semibold">POWERED BY AI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Stop Googling regs</h2>
            <p className="text-white/60 max-w-xl mx-auto">
              5 AI specialists trained on{' '}
              <span className="text-yellow-400 font-medium">BS 7671:2018 + A3:2024</span> — ask
              anything
            </p>
          </div>

          <div className="space-y-4">
            {/* Top row - 3 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <EnhancedAICard
                icon={<Cpu />}
                name="Circuit Designer"
                tagline="Design compliant circuits in seconds"
                features={[
                  'Adiabatic cable sizing to BS 7671',
                  'Volt drop & max length calculations',
                  'Consumer unit layouts with diversity',
                  'Full load schedules & protection sizing',
                ]}
                color="blue"
              />
              <EnhancedAICard
                icon={<PoundSterling />}
                name="Cost Engineer"
                tagline="Quote jobs accurately, every time"
                features={[
                  'Live material prices from UK suppliers',
                  'Labour rates with regional adjustments',
                  'Automatic profit margin calculation',
                  'Professional PDF quotes in 2 minutes',
                ]}
                color="emerald"
                highlight
              />
              <EnhancedAICard
                icon={<Hammer />}
                name="Installation Guide"
                tagline="BS 7671 compliant installation steps"
                features={[
                  'Step-by-step for any circuit type',
                  'Cable routes & containment guidance',
                  'Earthing & bonding requirements',
                  'Testing sequences after install',
                ]}
                color="yellow"
              />
            </div>

            {/* Bottom row - 2 cards centered */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <EnhancedAICard
                icon={<Settings />}
                name="Maintenance Agent"
                tagline="Keep installations compliant"
                features={[
                  'Maintenance schedules & intervals',
                  'Inspection checklists by installation type',
                  'Compliance reminders & tracking',
                  'Condition reporting guidance',
                ]}
                color="orange"
              />
              <EnhancedAICard
                icon={<Shield />}
                name="Health & Safety"
                tagline="Site-ready RAMS in minutes"
                features={[
                  'Risk assessments for any job type',
                  'Method statements with sequences',
                  'Site-specific hazard identification',
                  'PDF export ready for site induction',
                ]}
                color="red"
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-white/50 text-sm">
              <Sparkles className="w-4 h-4 inline mr-1.5 text-purple-400" />+ 3 more specialists
              coming soon: Commissioning Engineer, Inspector & Training Coach
            </p>
          </div>
        </div>
      </section>

      {/* Get Paid Faster */}
      <section className="py-14 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <PoundSterling className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-semibold">GET PAID FASTER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Quote to payment in minutes</h2>
            <p className="text-white/60 text-sm sm:text-base max-w-lg mx-auto">
              Create a quote by hand or voice, scan materials, send it for signing, do the work,
              convert to invoice, get paid — all from your phone.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-yellow-500/20 via-amber-500/10 to-yellow-600/5 border border-yellow-500/30 hover:border-yellow-400/50 transition-all">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-yellow-500/30 border border-yellow-500/40">
                <Mic className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Create Quotes Your Way</h3>
              <p className="text-sm text-white/60 mb-3">
                Type it, speak it, or scan materials with your camera — get a professional quote
                ready to send in minutes.
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <div className="w-1 h-1 rounded-full bg-yellow-400" />
                  <span>Voice, manual, or scanner input</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <div className="w-1 h-1 rounded-full bg-yellow-400" />
                  <span>AI formats line items & pricing</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <div className="w-1 h-1 rounded-full bg-yellow-400" />
                  <span>Send via email or WhatsApp</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-blue-600/5 border border-blue-500/30 hover:border-blue-400/50 transition-all">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-blue-500/30 border border-blue-500/40">
                <Send className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Send, Sign & Start Work</h3>
              <p className="text-sm text-white/60 mb-3">
                Clients get accept or reject buttons straight in their email. Chase signatures with
                automatic reminders.
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <div className="w-1 h-1 rounded-full bg-blue-400" />
                  <span>Client accept/reject buttons</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <div className="w-1 h-1 rounded-full bg-blue-400" />
                  <span>Automated email reminders</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <div className="w-1 h-1 rounded-full bg-blue-400" />
                  <span>Digital signatures built in</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-emerald-600/5 border border-emerald-500/30 hover:border-emerald-400/50 transition-all">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-emerald-500/30 border border-emerald-500/40">
                <CreditCard className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Get Paid the Same Day</h3>
              <p className="text-sm text-white/60 mb-3">
                Convert any signed quote to an invoice in one tap. Stripe payment links mean
                customers pay instantly by card.
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <div className="w-1 h-1 rounded-full bg-emerald-400" />
                  <span>One-tap quote to invoice</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <div className="w-1 h-1 rounded-full bg-emerald-400" />
                  <span>Stripe payment links in every invoice</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <div className="w-1 h-1 rounded-full bg-emerald-400" />
                  <span>Auto-sync to Xero & QuickBooks</span>
                </div>
              </div>
            </div>
          </div>

          {/* Integration logos */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <img src="/logos/stripe.svg" alt="Stripe" loading="lazy" className="h-6 w-auto" />
            <img src="/logos/xero.svg" alt="Xero" loading="lazy" className="h-6 w-auto" />
            <img
              src="/logos/quickbooks.svg"
              alt="QuickBooks"
              loading="lazy"
              className="h-6 w-auto"
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-12 sm:py-20 px-5 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Simple, honest pricing</h2>
            <p className="text-white/60">Try everything free for 7 days. No charge until day 8.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <PricingCard
              name="Apprentice"
              price="£4.99"
              description="Everything to ace your training"
              features={[
                '22 courses (Level 2, 3, AM2, HNC)',
                '2,000+ practice questions',
                'Progress tracking',
                'Mental Health Mates access',
                'Flashcards & mock exams',
              ]}
              color="green"
            />
            <PricingCard
              name="Electrician"
              price="£9.99"
              description="Your complete site companion"
              features={[
                'Everything in Apprentice',
                '5 AI specialists',
                'Voice quotes & invoices',
                '8 certificate types',
                '50+ electrical calculators',
                '14 business calculators',
                'Stripe payments',
              ]}
              popular
              color="yellow"
            />
            <PricingCard
              name="Employer"
              price="Coming Soon"
              description="Manage your whole team from one dashboard"
              features={[
                'Everything in Electrician',
                'Team member seats',
                'Apprentice tracking',
                'Compliance dashboard',
                'Business analytics',
              ]}
              comingSoon
              color="purple"
            />
          </div>

          <p className="text-center text-white/40 text-sm mt-8">
            7-day free trial on all plans · No charge until day 8 · Cancel anytime
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-10 sm:pb-16 px-5">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-8">
            Frequently asked questions
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left touch-manipulation"
                >
                  <span className="font-medium text-white text-sm sm:text-base pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-white/50 flex-shrink-0 transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                    <p className="text-sm text-white/60 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA + Mental Health Mates */}
      <section className="py-12 sm:py-20 px-5">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* CTA */}
          <div className="text-center rounded-2xl bg-gradient-to-br from-yellow-500/20 via-amber-500/15 to-orange-500/10 border border-yellow-500/30 p-10">
            <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to work smarter?</h2>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              Join 430+ UK electricians saving hours every week.
            </p>
            <Link to="/auth/signup">
              <Button className="h-14 px-10 text-base font-semibold bg-yellow-500 hover:bg-yellow-400 active:scale-[0.97] text-black touch-manipulation transition-transform">
                Start 7-Day Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Mental Health Mates - condensed banner */}
          <div className="rounded-2xl bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-blue-500/5 border border-pink-500/20 p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-pink-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base mb-1">Mental Health Mates</h3>
                <p className="text-white/60 text-sm mb-3">
                  Construction has the highest suicide rate of any sector. We've built a safe space
                  with mood tracking, breathing exercises, journals, and crisis resources.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/70 text-xs">
                    Mood Tracking
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/70 text-xs">
                    Breathing Exercises
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/70 text-xs">
                    Crisis Resources
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/70 text-xs">
                    Peer Support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-5 border-t border-white/5 pb-20 sm:pb-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <img src="/logo.jpg" alt="Elec-Mate" className="w-7 h-7 rounded-lg" loading="lazy" />
            <span className="text-sm text-white/50">Elec-Mate © 2026</span>
          </div>
          <div className="flex gap-1 text-sm text-white/40">
            <Link
              to="/privacy"
              className="px-3 py-2 min-h-[44px] flex items-center hover:text-white/60 active:text-white/70 transition-colors touch-manipulation rounded-lg"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="px-3 py-2 min-h-[44px] flex items-center hover:text-white/60 active:text-white/70 transition-colors touch-manipulation rounded-lg"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      {!user && (
        <div className="fixed bottom-0 left-0 right-0 sm:hidden z-50 px-4 pt-8 pb-[max(1rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-black via-black/95 to-transparent">
          <Link to="/auth/signup">
            <Button className="w-full h-12 text-base font-semibold bg-yellow-500 hover:bg-yellow-400 active:scale-[0.97] text-black rounded-xl shadow-lg shadow-yellow-500/25 touch-manipulation transition-transform">
              Start 7-Day Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

// Audience Card
const AudienceCard = ({
  icon,
  title,
  painPoint,
  tagline,
  features,
  color,
  highlight,
  comingSoon,
}: {
  icon: React.ReactNode;
  title: string;
  painPoint: string;
  tagline: string;
  features: string[];
  color: 'yellow' | 'green' | 'purple';
  highlight?: boolean;
  comingSoon?: boolean;
}) => {
  const colorConfig = {
    yellow: {
      bg: 'bg-gradient-to-br from-yellow-500/20 via-amber-500/10 to-yellow-600/5',
      border: 'border-yellow-500/40',
      hoverBorder: 'hover:border-yellow-400/60',
      icon: 'bg-yellow-500/30 text-yellow-400 border-yellow-500/50',
      badge: 'bg-yellow-500 text-black',
      dot: 'bg-yellow-400',
      painBg: 'bg-yellow-500/10 border-yellow-500/20',
      painText: 'text-yellow-300/80',
    },
    green: {
      bg: 'bg-gradient-to-br from-emerald-500/15 via-green-500/10 to-emerald-600/5',
      border: 'border-emerald-500/30',
      hoverBorder: 'hover:border-emerald-400/50',
      icon: 'bg-emerald-500/30 text-emerald-400 border-emerald-500/50',
      badge: 'bg-emerald-500 text-black',
      dot: 'bg-emerald-400',
      painBg: 'bg-emerald-500/10 border-emerald-500/20',
      painText: 'text-emerald-300/80',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-500/15 via-violet-500/10 to-purple-600/5',
      border: 'border-purple-500/30',
      hoverBorder: 'hover:border-purple-400/50',
      icon: 'bg-purple-500/30 text-purple-400 border-purple-500/50',
      badge: 'bg-purple-500 text-white',
      dot: 'bg-purple-400',
      painBg: 'bg-purple-500/10 border-purple-500/20',
      painText: 'text-purple-300/80',
    },
  };

  const config = colorConfig[color];

  return (
    <div
      className={`relative p-6 rounded-2xl border transition-all duration-300 ${config.bg} ${config.border} ${config.hoverBorder} ${highlight ? 'ring-2 ring-yellow-500/50 shadow-xl shadow-yellow-500/10' : ''}`}
    >
      {comingSoon && (
        <span
          className={`absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold ${config.badge}`}
        >
          <Clock className="w-3 h-3" />
          COMING SOON
        </span>
      )}

      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 border ${config.icon}`}
      >
        {icon}
      </div>

      <h3 className="font-bold text-white text-xl mb-1">{title}</h3>
      <p className="text-white/50 text-sm mb-3">{tagline}</p>

      {/* Pain point callout */}
      <div className={`rounded-lg border px-3 py-2 mb-4 ${config.painBg}`}>
        <p className={`text-xs italic ${config.painText}`}>"{painPoint}"</p>
      </div>

      <div className="space-y-2.5">
        {features.map((feature) => (
          <div key={feature} className="flex items-start gap-2.5 text-sm text-white/80">
            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${config.dot}`} />
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced AI Agent Card
const EnhancedAICard = ({
  icon,
  name,
  tagline,
  features,
  color,
  highlight,
}: {
  icon: React.ReactNode;
  name: string;
  tagline: string;
  features: string[];
  color: 'yellow' | 'blue' | 'emerald' | 'orange' | 'red';
  highlight?: boolean;
}) => {
  const colorConfig = {
    yellow: {
      bg: 'from-yellow-500/20 via-amber-500/10 to-yellow-600/5',
      border: 'border-yellow-500/30 hover:border-yellow-400/50',
      icon: 'bg-yellow-500/30 text-yellow-400 border-yellow-500/40',
      dot: 'bg-yellow-400',
      glow: 'shadow-yellow-500/20',
    },
    blue: {
      bg: 'from-blue-500/20 via-cyan-500/10 to-blue-600/5',
      border: 'border-blue-500/30 hover:border-blue-400/50',
      icon: 'bg-blue-500/30 text-blue-400 border-blue-500/40',
      dot: 'bg-blue-400',
      glow: 'shadow-blue-500/20',
    },
    emerald: {
      bg: 'from-emerald-500/20 via-green-500/10 to-emerald-600/5',
      border: 'border-emerald-500/30 hover:border-emerald-400/50',
      icon: 'bg-emerald-500/30 text-emerald-400 border-emerald-500/40',
      dot: 'bg-emerald-400',
      glow: 'shadow-emerald-500/20',
    },
    orange: {
      bg: 'from-orange-500/20 via-amber-500/10 to-orange-600/5',
      border: 'border-orange-500/30 hover:border-orange-400/50',
      icon: 'bg-orange-500/30 text-orange-400 border-orange-500/40',
      dot: 'bg-orange-400',
      glow: 'shadow-orange-500/20',
    },
    red: {
      bg: 'from-red-500/20 via-rose-500/10 to-red-600/5',
      border: 'border-red-500/30 hover:border-red-400/50',
      icon: 'bg-red-500/30 text-red-400 border-red-500/40',
      dot: 'bg-red-400',
      glow: 'shadow-red-500/20',
    },
  };

  const config = colorConfig[color];

  return (
    <div
      className={`relative p-5 rounded-2xl bg-gradient-to-br text-left ${config.bg} border ${config.border} transition-all duration-300 ${highlight ? `ring-2 ring-emerald-500/40 shadow-lg ${config.glow}` : ''}`}
    >
      {highlight && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-bold">
          POPULAR
        </span>
      )}
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${config.icon}`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-white text-base mb-0.5">{name}</h4>
          <p className="text-xs text-white/50 mb-3">{tagline}</p>
          <div className="space-y-1.5">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-2 text-xs text-white/70">
                <div className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${config.dot}`} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Pricing Card
const PricingCard = ({
  name,
  price,
  description,
  features,
  popular,
  comingSoon,
  color,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  comingSoon?: boolean;
  color?: 'yellow' | 'green' | 'purple';
}) => {
  const colorConfig = {
    yellow: {
      bg: 'bg-gradient-to-br from-yellow-500/20 via-amber-500/12 to-yellow-600/5',
      border: 'border-yellow-500/40',
      badge: 'bg-yellow-500 text-black',
      button: 'bg-yellow-500 hover:bg-yellow-400 text-black',
      check: 'text-yellow-400',
    },
    green: {
      bg: 'bg-gradient-to-br from-emerald-500/15 via-green-500/10 to-emerald-600/5',
      border: 'border-emerald-500/30',
      badge: 'bg-emerald-500 text-black',
      button: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
      check: 'text-emerald-400',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-500/15 via-violet-500/10 to-purple-600/5',
      border: 'border-purple-500/30',
      badge: 'bg-purple-500 text-white',
      button: 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30',
      check: 'text-purple-400',
    },
  };

  const config = colorConfig[color || 'green'];

  return (
    <div
      className={`relative p-6 rounded-2xl border transition-all duration-300 ${config.bg} ${config.border} ${popular ? 'ring-2 ring-yellow-500/50 shadow-xl shadow-yellow-500/10' : ''}`}
    >
      {popular && (
        <span
          className={`absolute -top-3 left-1/2 -translate-x-1/2 inline-block px-4 py-1 rounded-full text-xs font-bold ${config.badge}`}
        >
          MOST POPULAR
        </span>
      )}
      {comingSoon && (
        <span
          className={`absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${config.badge}`}
        >
          <Clock className="w-3 h-3" />
          COMING SOON
        </span>
      )}

      <h3 className="font-bold text-white text-xl mt-1">{name}</h3>
      <div className="flex items-baseline gap-1 mt-3 mb-1">
        {comingSoon ? (
          <span className="text-2xl font-bold text-white">{price}</span>
        ) : (
          <>
            <span className="text-4xl font-bold text-white">{price}</span>
            <span className="text-sm text-white/50">/month</span>
          </>
        )}
      </div>
      <p className="text-sm text-white/60 mb-6">{description}</p>

      {comingSoon ? (
        <a href="mailto:hello@elec-mate.com?subject=Employer%20Early%20Access">
          <Button
            className={`w-full h-12 font-semibold rounded-xl touch-manipulation ${config.button}`}
          >
            Get Early Access
          </Button>
        </a>
      ) : (
        <Link to="/auth/signup">
          <Button
            className={`w-full h-12 font-semibold rounded-xl touch-manipulation ${config.button}`}
          >
            Start 7-Day Free Trial
          </Button>
        </Link>
      )}

      <div className="mt-6 space-y-3">
        {features.map((feature) => (
          <div key={feature} className="flex items-start gap-2.5 text-sm text-white/80">
            <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${config.check}`} />
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
