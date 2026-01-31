import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Menu, X, Check, ArrowRight, Zap,
  GraduationCap, Wrench, Building2,
  Cpu, PoundSterling, Hammer, Settings, Shield,
  FileText, BookOpen, Calculator, Clock,
  Mic, CreditCard, Send, Sparkles, Brain,
  ClipboardCheck, TrendingUp, Users, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { motion, useReducedMotion } from 'framer-motion';

const LandingPage = () => {
  const { user } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Elec-Mate | The Complete Platform for UK Electricians</title>
        <meta name="description" content="Training, AI tools, certificates & business management for UK electricians. Level 2 & 3 courses, BS 7671 AI assistants, EICR forms, voice quotes & Stripe payments. Start your free trial." />
        <meta name="keywords" content="electrician app, electrical training, EICR certificate, EIC form, Minor Works, BS 7671, 18th edition, electrical apprentice, UK electrician, cable sizing calculator, volt drop calculator, electrical quotes, AI electrician" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elec-mate.com/" />
        <meta property="og:title" content="Elec-Mate | The Complete Platform for UK Electricians" />
        <meta property="og:description" content="Training, AI tools, certificates & business management for UK electricians. From apprentice to employer — everything you need to learn, work smarter, and grow." />
        <meta property="og:image" content="https://elec-mate.com/og-image.jpg" />
        <meta property="og:site_name" content="Elec-Mate" />
        <meta property="og:locale" content="en_GB" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://elec-mate.com/" />
        <meta name="twitter:title" content="Elec-Mate | The Complete Platform for UK Electricians" />
        <meta name="twitter:description" content="Training, AI tools, certificates & business management for UK electricians. 5 AI specialists trained on BS 7671. Start free today." />
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
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Elec-Mate",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web, iOS, Android",
            "description": "The complete platform for UK electricians - training, AI tools, certificates, and business management.",
            "offers": {
              "@type": "AggregateOffer",
              "lowPrice": "4.99",
              "highPrice": "9.99",
              "priceCurrency": "GBP",
              "offerCount": "2"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "150"
            },
            "featureList": [
              "Level 2 & 3 Electrical Training",
              "BS 7671 AI Assistants",
              "EICR, EIC & Minor Works Certificates",
              "Voice Quotes & Invoices",
              "Stripe Payment Integration",
              "60+ Electrical Calculators"
            ]
          })}
        </script>

        {/* Organization schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Elec-Mate",
            "url": "https://elec-mate.com",
            "logo": "https://elec-mate.com/logo.jpg",
            "description": "The complete platform for UK electricians",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "GB"
            },
            "sameAs": []
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
              <img src="/logo.jpg" alt="Elec-Mate" className="relative w-9 h-9 lg:w-10 lg:h-10 rounded-xl" />
            </div>
            <span className="font-bold text-lg lg:text-xl">Elec-<span className="text-yellow-400">Mate</span></span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            <a href="#features" className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5">Features</a>
            <a href="#pricing" className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5">Pricing</a>
            <a href="#ai" className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5">AI Tools</a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <Button asChild size="sm" className="h-10 px-5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Link to="/auth/signin" className="text-sm text-white/60 hover:text-white px-4 py-2 transition-colors">Sign in</Link>
                <Button asChild size="sm" className="h-10 px-5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30 transition-all">
                  <Link to="/auth/signup">Start Free</Link>
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
              <Button asChild className="w-full h-12 bg-yellow-500 text-black font-semibold rounded-xl">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild className="w-full h-12 bg-yellow-500 text-black font-semibold rounded-xl">
                  <Link to="/auth/signup">Start Free Trial</Link>
                </Button>
                <Button asChild variant="outline" className="w-full h-12 border-white/20 text-white rounded-xl">
                  <Link to="/auth/signin">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="min-h-0 sm:min-h-[100svh] flex flex-col justify-start sm:justify-center px-5 pt-[env(safe-area-inset-top)] sm:pt-16 lg:pt-20 pb-8 sm:pb-0">
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
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-400 font-medium">Built for UK Electricians</span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Your complete
              <br />
              <span className="text-yellow-400">electrical career platform</span>
            </motion.h1>

            <motion.p
              className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              From apprentice training to AI-powered site tools — everything you need to learn, work smarter, and grow your business.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/auth/signup">
                <Button className="w-full sm:w-auto h-14 px-8 text-base font-semibold bg-yellow-500 hover:bg-yellow-400 text-black">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/auth/signin">
                <Button variant="outline" className="w-full sm:w-auto h-14 px-8 text-base font-semibold border-white/20 text-white hover:bg-white/5">
                  Sign In
                </Button>
              </Link>
            </motion.div>

            <motion.p
              className="text-white/40 text-sm mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              7 days free • No card required • Cancel anytime
            </motion.p>
          </div>
        </div>
      </section>

      {/* Who is this for? */}
      <section className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">One platform, every stage of your career</h2>
            <p className="text-white/60 max-w-lg mx-auto">Whether you're starting out or running a team, Elec-Mate grows with you</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <AudienceCard
              icon={<GraduationCap className="w-6 h-6" />}
              title="Apprentices"
              tagline="Master your trade"
              description="Comprehensive Level 2 & 3 training with practice exams, progress tracking, and mental health support built in."
              features={['City & Guilds aligned courses', '1000+ practice questions', 'AM2 exam preparation', 'Mental Health Mates community']}
              color="green"
            />
            <AudienceCard
              icon={<Wrench className="w-6 h-6" />}
              title="Electricians"
              tagline="Work smarter on site"
              description="AI assistants trained on BS 7671, voice-to-quote in 2 minutes, and digital certificates ready to send."
              features={['5 AI specialists (BS 7671 trained)', 'Voice quotes & invoices', 'EICR, EIC & Minor Works forms', '60+ calculators & tools']}
              color="yellow"
              highlight
            />
            <AudienceCard
              icon={<Building2 className="w-6 h-6" />}
              title="Employers"
              tagline="Manage your business"
              description="Track apprentice progress, manage team compliance, and keep your business running smoothly."
              features={['Apprentice progress dashboard', 'Team safety compliance', 'Job & project tracking', 'Business analytics']}
              color="purple"
              comingSoon
            />
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section id="ai" className="py-20 px-5 bg-gradient-to-b from-transparent via-yellow-500/[0.03] to-transparent scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-4">
              <Brain className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-yellow-400 font-semibold">POWERED BY AI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">5 AI specialists at your fingertips</h2>
            <p className="text-white/60 max-w-lg mx-auto">Trained on BS 7671:2022, IET Wiring Regulations, and UK electrical standards</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <AIAgentCard
              icon={<Cpu />}
              name="Circuit Designer"
              desc="Cable sizing, volt drop, CU layouts & load calculations"
              color="blue"
            />
            <AIAgentCard
              icon={<PoundSterling />}
              name="Cost Engineer"
              desc="Instant quotes with labour, materials & profit margins"
              color="emerald"
            />
            <AIAgentCard
              icon={<Hammer />}
              name="Installation Guide"
              desc="Step-by-step instructions for any installation"
              color="yellow"
            />
            <AIAgentCard
              icon={<Settings />}
              name="Fault Finder"
              desc="Diagnose faults with guided troubleshooting"
              color="orange"
            />
            <AIAgentCard
              icon={<Shield />}
              name="Safety & RAMS"
              desc="Generate risk assessments & method statements"
              color="red"
            />
          </div>

          <div className="mt-6 text-center">
            <p className="text-white/50 text-sm">
              <Sparkles className="w-4 h-4 inline mr-1.5 text-purple-400" />
              + 3 more specialists coming soon: Commissioning, Inspector & Trainer
            </p>
          </div>
        </div>
      </section>

      {/* Get Paid Faster */}
      <section className="py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Quote to payment in minutes</h2>
            <p className="text-white/60">Stop chasing payments — get paid the same day</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <FeatureBox
              icon={<Mic className="w-6 h-6" />}
              title="Voice Quotes"
              description="Speak your quote on site, AI formats it professionally. Send to customer in under 2 minutes."
              color="yellow"
            />
            <FeatureBox
              icon={<Send className="w-6 h-6" />}
              title="Instant Invoices"
              description="Convert quotes to invoices with one tap. Professional PDFs sent directly to customers."
              color="blue"
            />
            <FeatureBox
              icon={<CreditCard className="w-6 h-6" />}
              title="Stripe Payments"
              description="Payment links in every invoice. Customers pay by card, you get paid today."
              color="emerald"
            />
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section id="features" className="py-20 px-5 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Everything you need, all in one app</h2>
            <p className="text-white/60">Built by electricians, for electricians</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ContentCard
              icon={<FileText className="w-5 h-5" />}
              title="Digital Certificates"
              items={['EICR (18th Edition)', 'EIC (Electrical Installation)', 'Minor Works Certificate', 'Export & share as PDF']}
              color="blue"
            />
            <ContentCard
              icon={<BookOpen className="w-5 h-5" />}
              title="Training Courses"
              items={['Level 2 Electrical', 'Level 3 Electrical', 'BS 7671 Revision', 'AM2 Exam Prep']}
              color="emerald"
            />
            <ContentCard
              icon={<Calculator className="w-5 h-5" />}
              title="Site Calculators"
              items={['Cable sizing', 'Volt drop', 'Conduit fill', 'Maximum demand']}
              color="yellow"
            />
            <ContentCard
              icon={<TrendingUp className="w-5 h-5" />}
              title="Business Tools"
              items={['Live material pricing', 'Job profitability tracker', 'VAT & tax calculators', 'Quote templates']}
              color="purple"
            />
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <StatBox number="60+" label="Calculators & tools" />
            <StatBox number="13+" label="Training courses" />
            <StatBox number="1000+" label="Practice questions" />
          </div>
        </div>
      </section>

      {/* Mental Health */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-gradient-to-br from-pink-500/20 via-purple-500/15 to-blue-500/10 border border-pink-500/20 p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center flex-shrink-0">
                <Heart className="w-7 h-7 text-pink-400" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Mental Health Mates</h3>
                <p className="text-white/70 mb-4">
                  The construction industry has the highest suicide rate of any sector. We've built a safe space for apprentices and electricians to connect, share experiences, and support each other. Anonymous chat, peer support, and professional resources — because your wellbeing matters.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-sm">Anonymous support</span>
                  <span className="px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-sm">Peer community</span>
                  <span className="px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-sm">Crisis resources</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-5 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Simple, honest pricing</h2>
            <p className="text-white/60">Start free, upgrade when you're ready</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <PricingCard
              name="Apprentice"
              price="£4.99"
              description="Everything to ace your training"
              features={['Full Level 2 & 3 courses', '1000+ practice questions', 'Progress tracking', 'Mental Health Mates access', 'Career guidance']}
              color="green"
            />
            <PricingCard
              name="Electrician"
              price="£9.99"
              description="Your complete site companion"
              features={['Everything in Apprentice', '5 AI specialists', 'Voice quotes & invoices', 'All certificate forms', '60+ calculators', 'Stripe payments']}
              popular
              color="yellow"
            />
            <PricingCard
              name="Employer"
              price="£TBC"
              description="Manage your whole team"
              features={['Everything in Electrician', 'Team member seats', 'Apprentice tracking', 'Compliance dashboard', 'Business analytics']}
              comingSoon
              color="purple"
            />
          </div>

          <p className="text-center text-white/40 text-sm mt-8">
            7-day free trial on all plans • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-5">
        <div className="max-w-2xl mx-auto">
          <div className="text-center rounded-2xl bg-gradient-to-br from-yellow-500/20 via-amber-500/15 to-orange-500/10 border border-yellow-500/30 p-10">
            <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to work smarter?</h2>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              Join hundreds of UK electricians already using Elec-Mate to train, work, and grow.
            </p>
            <Link to="/auth/signup">
              <Button className="h-14 px-10 text-base font-semibold bg-yellow-500 hover:bg-yellow-400 text-black">
                Start Your Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-5 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Elec-Mate" className="w-6 h-6 rounded" />
            <span className="text-sm text-white/50">Elec-Mate © 2025</span>
          </div>
          <div className="flex gap-4 text-sm text-white/40">
            <Link to="/privacy" className="hover:text-white/60">Privacy</Link>
            <Link to="/terms" className="hover:text-white/60">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Audience Card
const AudienceCard = ({ icon, title, tagline, description, features, color, highlight, comingSoon }: {
  icon: React.ReactNode;
  title: string;
  tagline: string;
  description: string;
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
    },
    green: {
      bg: 'bg-gradient-to-br from-emerald-500/15 via-green-500/10 to-emerald-600/5',
      border: 'border-emerald-500/30',
      hoverBorder: 'hover:border-emerald-400/50',
      icon: 'bg-emerald-500/30 text-emerald-400 border-emerald-500/50',
      badge: 'bg-emerald-500 text-black',
      dot: 'bg-emerald-400',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-500/15 via-violet-500/10 to-purple-600/5',
      border: 'border-purple-500/30',
      hoverBorder: 'hover:border-purple-400/50',
      icon: 'bg-purple-500/30 text-purple-400 border-purple-500/50',
      badge: 'bg-purple-500 text-white',
      dot: 'bg-purple-400',
    },
  };

  const config = colorConfig[color];

  return (
    <div className={`relative p-6 rounded-2xl border transition-all duration-300 ${config.bg} ${config.border} ${config.hoverBorder} ${highlight ? 'ring-2 ring-yellow-500/50 shadow-xl shadow-yellow-500/10' : ''}`}>
      {comingSoon && (
        <span className={`absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold ${config.badge}`}>
          <Clock className="w-3 h-3" />
          COMING SOON
        </span>
      )}

      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 border ${config.icon}`}>
        {icon}
      </div>

      <h3 className="font-bold text-white text-xl mb-1">{title}</h3>
      <p className="text-white/50 text-sm mb-3">{tagline}</p>
      <p className="text-white/70 text-sm mb-4 leading-relaxed">{description}</p>

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

// AI Agent Card
const AIAgentCard = ({ icon, name, desc, color }: {
  icon: React.ReactNode;
  name: string;
  desc: string;
  color: 'yellow' | 'blue' | 'emerald' | 'orange' | 'red';
}) => {
  const colorConfig = {
    yellow: {
      bg: 'from-yellow-500/20 via-amber-500/10 to-yellow-600/5',
      border: 'border-yellow-500/30 hover:border-yellow-400/50',
      icon: 'bg-yellow-500/30 text-yellow-400',
    },
    blue: {
      bg: 'from-blue-500/20 via-cyan-500/10 to-blue-600/5',
      border: 'border-blue-500/30 hover:border-blue-400/50',
      icon: 'bg-blue-500/30 text-blue-400',
    },
    emerald: {
      bg: 'from-emerald-500/20 via-green-500/10 to-emerald-600/5',
      border: 'border-emerald-500/30 hover:border-emerald-400/50',
      icon: 'bg-emerald-500/30 text-emerald-400',
    },
    orange: {
      bg: 'from-orange-500/20 via-amber-500/10 to-orange-600/5',
      border: 'border-orange-500/30 hover:border-orange-400/50',
      icon: 'bg-orange-500/30 text-orange-400',
    },
    red: {
      bg: 'from-red-500/20 via-rose-500/10 to-red-600/5',
      border: 'border-red-500/30 hover:border-red-400/50',
      icon: 'bg-red-500/30 text-red-400',
    },
  };

  const config = colorConfig[color];

  return (
    <div className={`p-5 rounded-xl bg-gradient-to-br ${config.bg} border ${config.border} transition-all duration-300`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${config.icon}`}>
        {icon}
      </div>
      <h4 className="font-semibold text-white text-sm mb-1">{name}</h4>
      <p className="text-xs text-white/60 leading-relaxed">{desc}</p>
    </div>
  );
};

// Feature Box
const FeatureBox = ({ icon, title, description, color }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'yellow' | 'blue' | 'emerald';
}) => {
  const colorConfig = {
    yellow: {
      bg: 'from-yellow-500/20 via-amber-500/10 to-yellow-600/5',
      border: 'border-yellow-500/30 hover:border-yellow-400/50',
      icon: 'bg-yellow-500/30 text-yellow-400 border-yellow-500/40',
    },
    blue: {
      bg: 'from-blue-500/20 via-cyan-500/10 to-blue-600/5',
      border: 'border-blue-500/30 hover:border-blue-400/50',
      icon: 'bg-blue-500/30 text-blue-400 border-blue-500/40',
    },
    emerald: {
      bg: 'from-emerald-500/20 via-green-500/10 to-emerald-600/5',
      border: 'border-emerald-500/30 hover:border-emerald-400/50',
      icon: 'bg-emerald-500/30 text-emerald-400 border-emerald-500/40',
    },
  };

  const config = colorConfig[color];

  return (
    <div className={`p-6 rounded-2xl bg-gradient-to-br ${config.bg} border ${config.border} transition-all duration-300 text-center`}>
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 border ${config.icon}`}>
        {icon}
      </div>
      <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
      <p className="text-sm text-white/70 leading-relaxed">{description}</p>
    </div>
  );
};

// Content Card
const ContentCard = ({ icon, title, items, color }: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  color: 'yellow' | 'blue' | 'emerald' | 'purple';
}) => {
  const colorConfig = {
    yellow: {
      bg: 'from-yellow-500/15 via-amber-500/8 to-yellow-600/5',
      border: 'border-yellow-500/25 hover:border-yellow-400/40',
      icon: 'bg-yellow-500/25 text-yellow-400',
      dot: 'bg-yellow-400',
    },
    blue: {
      bg: 'from-blue-500/15 via-cyan-500/8 to-blue-600/5',
      border: 'border-blue-500/25 hover:border-blue-400/40',
      icon: 'bg-blue-500/25 text-blue-400',
      dot: 'bg-blue-400',
    },
    emerald: {
      bg: 'from-emerald-500/15 via-green-500/8 to-emerald-600/5',
      border: 'border-emerald-500/25 hover:border-emerald-400/40',
      icon: 'bg-emerald-500/25 text-emerald-400',
      dot: 'bg-emerald-400',
    },
    purple: {
      bg: 'from-purple-500/15 via-violet-500/8 to-purple-600/5',
      border: 'border-purple-500/25 hover:border-purple-400/40',
      icon: 'bg-purple-500/25 text-purple-400',
      dot: 'bg-purple-400',
    },
  };

  const config = colorConfig[color];

  return (
    <div className={`p-5 rounded-xl bg-gradient-to-br ${config.bg} border ${config.border} transition-all duration-300`}>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${config.icon}`}>
        {icon}
      </div>
      <h4 className="font-semibold text-white mb-3">{title}</h4>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-white/70">
            <div className={`w-1 h-1 rounded-full ${config.dot}`} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

// Stat Box
const StatBox = ({ number, label }: { number: string; label: string }) => (
  <div className="text-center p-5 rounded-xl bg-white/[0.03] border border-white/10">
    <div className="text-3xl font-bold text-yellow-400 mb-1">{number}</div>
    <div className="text-sm text-white/60">{label}</div>
  </div>
);

// Pricing Card
const PricingCard = ({ name, price, description, features, popular, comingSoon, color }: {
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
      button: 'bg-purple-500/20 text-purple-300 cursor-not-allowed border border-purple-500/30',
      check: 'text-purple-400',
    },
  };

  const config = colorConfig[color || 'green'];

  return (
    <div className={`relative p-6 rounded-2xl border transition-all duration-300 ${config.bg} ${config.border} ${popular ? 'ring-2 ring-yellow-500/50 shadow-xl shadow-yellow-500/10' : ''}`}>
      {popular && (
        <span className={`absolute -top-3 left-1/2 -translate-x-1/2 inline-block px-4 py-1 rounded-full text-xs font-bold ${config.badge}`}>
          MOST POPULAR
        </span>
      )}
      {comingSoon && (
        <span className={`absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${config.badge}`}>
          <Clock className="w-3 h-3" />
          COMING SOON
        </span>
      )}

      <h3 className="font-bold text-white text-xl mt-1">{name}</h3>
      <div className="flex items-baseline gap-1 mt-3 mb-1">
        <span className="text-4xl font-bold text-white">{price}</span>
        {!comingSoon && <span className="text-sm text-white/50">/month</span>}
      </div>
      <p className="text-sm text-white/60 mb-6">{description}</p>

      {comingSoon ? (
        <Button disabled className={`w-full h-12 font-semibold rounded-xl ${config.button}`}>
          Notify Me
        </Button>
      ) : (
        <Link to="/auth/signup">
          <Button className={`w-full h-12 font-semibold rounded-xl ${config.button}`}>
            Start Free Trial
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
