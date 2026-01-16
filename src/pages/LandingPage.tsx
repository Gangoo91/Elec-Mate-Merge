import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu, X, Check, ArrowRight,
  GraduationCap, Wrench, Building2,
  Cpu, PoundSterling, Hammer, Settings, Shield,
  FileText, BookOpen, Calculator, Clock,
  Mic, CreditCard, Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { motion, useReducedMotion } from 'framer-motion';

const LandingPage = () => {
  const { user } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Elec-Mate" className="w-8 h-8 rounded-lg" />
            <span className="font-bold">Elec-<span className="text-yellow-400">Mate</span></span>
          </Link>

          {/* Desktop */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <Button asChild size="sm" className="h-9 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Link to="/auth/signin" className="text-sm text-white/50 hover:text-white px-3 py-2">Sign in</Link>
                <Button asChild size="sm" className="h-9 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold">
                  <Link to="/auth/signup">Start Free</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="sm:hidden w-10 h-10 flex items-center justify-center text-white"
          >
            {isNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isNavOpen && (
          <div className="sm:hidden border-t border-white/10 bg-black p-4 space-y-3">
            {user ? (
              <Button asChild className="w-full h-12 bg-yellow-500 text-black font-semibold">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild className="w-full h-12 bg-yellow-500 text-black font-semibold">
                  <Link to="/auth/signup">Start Free Trial</Link>
                </Button>
                <Button asChild variant="outline" className="w-full h-12 border-white/20 text-white">
                  <Link to="/auth/signin">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="min-h-[100svh] flex flex-col justify-center px-5 pt-14">
        <div className="max-w-5xl mx-auto w-full">
          {/* Ambient glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {!prefersReducedMotion && (
              <>
                <motion.div
                  className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/15 rounded-full blur-[120px]"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]"
                  animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
              </>
            )}
          </div>

          <div className="relative z-10 text-center">
            <motion.h1
              className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              The complete platform for
              <br />
              <span className="text-yellow-400">UK electricians</span>
            </motion.h1>

            <motion.p
              className="text-white/60 text-base sm:text-lg max-w-xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Training, AI tools, certificates, and business management — from apprentice to employer.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              7 days free. No card required.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Who is this for? - Three Audience Cards */}
      <section className="py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-3">Built for the electrical trade</h2>
          <p className="text-white/50 text-center mb-10 max-w-md mx-auto">One platform for your entire career journey</p>

          <div className="grid sm:grid-cols-3 gap-4">
            <AudienceCard
              icon={<GraduationCap className="w-6 h-6" />}
              title="Apprentices"
              tagline="Train for your future"
              features={['Level 2 & 3 courses', 'Practice exams', 'Career guidance', 'Wellbeing support']}
              color="green"
            />
            <AudienceCard
              icon={<Wrench className="w-6 h-6" />}
              title="Electricians"
              tagline="Work smarter on site"
              features={['Voice quotes in 2 mins', 'Stripe payment links', '8 AI assistants', 'Certificates & forms']}
              color="yellow"
              highlight
            />
            <AudienceCard
              icon={<Building2 className="w-6 h-6" />}
              title="Employers"
              tagline="Manage your business"
              features={['Team management', 'Job tracking', 'Finance tools', 'Safety compliance']}
              color="purple"
              comingSoon
            />
          </div>
        </div>
      </section>

      {/* AI Agents */}
      <section className="py-16 px-5 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">8 AI specialists at your fingertips</h2>
            <p className="text-white/50">Trained on BS 7671 and UK regulations</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <AIAgentCard icon={<Cpu />} name="Circuit Designer" desc="Cable sizing & CU layouts" />
            <AIAgentCard icon={<PoundSterling />} name="Cost Engineer" desc="Quotes & pricing" />
            <AIAgentCard icon={<Hammer />} name="Installation" desc="Step-by-step guidance" />
            <AIAgentCard icon={<Settings />} name="Maintenance" desc="Fault diagnosis" />
            <AIAgentCard icon={<Shield />} name="Health & Safety" desc="RAMS & risk assessments" />
          </div>

          <p className="text-center text-white/40 text-sm mt-6">+ 3 more specialists coming soon</p>
        </div>
      </section>

      {/* Get Paid Faster */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Get paid faster</h2>
            <p className="text-white/50">From voice to payment in minutes</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 bg-yellow-500/20 text-yellow-400">
                <Mic className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-white mb-1">Voice quotes</h3>
              <p className="text-sm text-white/50">Speak your quote, send in 2 mins</p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 bg-blue-500/20 text-blue-400">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-white mb-1">Instant invoices</h3>
              <p className="text-sm text-white/50">Professional PDFs, one tap send</p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 bg-green-500/20 text-green-400">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-white mb-1">Payment links</h3>
              <p className="text-sm text-white/50">Stripe-powered, get paid today</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-5 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-10">Everything you need</h2>

          <div className="grid sm:grid-cols-3 gap-4">
            <FeatureCard
              icon={<FileText className="w-5 h-5" />}
              title="Certificates"
              description="EICR, EIC, and Minor Works. Fill on site, export as PDF, share with customers."
              stat="3 form types"
              color="blue"
            />
            <FeatureCard
              icon={<BookOpen className="w-5 h-5" />}
              title="Training"
              description="Level 2 & 3 courses, BS7671 revision, AM2 prep, and professional CPD."
              stat="13+ courses"
              color="green"
            />
            <FeatureCard
              icon={<Calculator className="w-5 h-5" />}
              title="Business Tools"
              description="Quotes, invoices, calculators, live material pricing, and job profitability."
              stat="60+ tools"
              color="yellow"
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-10">Simple pricing</h2>

          <div className="grid sm:grid-cols-3 gap-4">
            <PricingCard
              name="Apprentice"
              price="£4.99"
              description="Training and exam prep"
              features={['Level 2 & 3 courses', 'Practice questions', 'Progress tracking', 'Mental health support']}
              color="green"
            />
            <PricingCard
              name="Electrician"
              price="£9.99"
              description="Everything for site work"
              features={['All apprentice features', 'AI assistants', 'Certificate forms', 'Voice quotes']}
              popular
              color="yellow"
            />
            <PricingCard
              name="Employer"
              price="£TBC"
              description="Team management tools"
              features={['Manage apprentices', 'Track progress', 'Compliance dashboard', 'Team analytics']}
              comingSoon
              color="purple"
            />
          </div>

          <p className="text-center text-white/30 text-sm mt-6">
            7-day free trial. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-5">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Ready to start?</h2>
          <p className="text-white/50 mb-6">Join UK electricians using Elec-Mate every day.</p>
          <Link to="/auth/signup">
            <Button className="h-14 px-10 text-base font-semibold bg-yellow-500 hover:bg-yellow-400 text-black">
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-5 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Elec-Mate" className="w-6 h-6 rounded" />
            <span className="text-sm text-white/50">Elec-Mate</span>
          </div>
          <div className="flex gap-4 text-sm text-white/30">
            <Link to="/privacy" className="hover:text-white/50">Privacy</Link>
            <Link to="/terms" className="hover:text-white/50">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Audience Card - Who is this for?
const AudienceCard = ({ icon, title, tagline, features, color, highlight, comingSoon }: {
  icon: React.ReactNode;
  title: string;
  tagline: string;
  features: string[];
  color: 'yellow' | 'green' | 'purple';
  highlight?: boolean;
  comingSoon?: boolean;
}) => {
  const colorConfig = {
    yellow: {
      bg: 'bg-gradient-to-b from-yellow-500/10 to-amber-600/5',
      border: 'border-yellow-500/30',
      icon: 'bg-yellow-500/20 text-yellow-400',
      badge: 'bg-yellow-500 text-black',
      dot: 'bg-yellow-400',
    },
    green: {
      bg: 'bg-gradient-to-b from-green-500/5 to-emerald-600/5',
      border: 'border-white/10 hover:border-green-500/30',
      icon: 'bg-green-500/20 text-green-400',
      badge: 'bg-green-500 text-black',
      dot: 'bg-green-400',
    },
    purple: {
      bg: 'bg-gradient-to-b from-purple-500/5 to-violet-600/5',
      border: 'border-white/10 hover:border-purple-500/30',
      icon: 'bg-purple-500/20 text-purple-400',
      badge: 'bg-purple-500 text-white',
      dot: 'bg-purple-400',
    },
  };

  const config = colorConfig[color];

  return (
    <div className={`relative p-6 rounded-2xl border transition-all duration-300 ${config.bg} ${config.border} ${highlight ? 'ring-1 ring-yellow-500/30' : ''}`}>
      {comingSoon && (
        <span className={`absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold ${config.badge}`}>
          <Clock className="w-3 h-3" />
          COMING SOON
        </span>
      )}

      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${config.icon}`}>
        {icon}
      </div>

      <h3 className="font-bold text-white text-lg">{title}</h3>
      <p className="text-white/50 text-sm mb-4">{tagline}</p>

      <div className="space-y-2">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-2 text-sm text-white/60">
            <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
};

// AI Agent Card
const AIAgentCard = ({ icon, name, desc }: {
  icon: React.ReactNode;
  name: string;
  desc: string;
}) => (
  <div className="p-4 rounded-xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] hover:border-yellow-500/20 transition-colors">
    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-yellow-500/10 text-yellow-400">
      {icon}
    </div>
    <h4 className="font-semibold text-white text-sm mb-0.5">{name}</h4>
    <p className="text-[11px] text-white/40">{desc}</p>
  </div>
);

// Feature Card
const FeatureCard = ({ icon, title, description, stat, color }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  stat: string;
  color: 'yellow' | 'blue' | 'green';
}) => {
  const colorConfig = {
    yellow: {
      icon: 'bg-gradient-to-br from-yellow-500/20 to-amber-600/20 text-yellow-400 border-yellow-500/20',
      stat: 'text-yellow-400',
    },
    blue: {
      icon: 'bg-gradient-to-br from-blue-500/20 to-cyan-600/20 text-blue-400 border-blue-500/20',
      stat: 'text-blue-400',
    },
    green: {
      icon: 'bg-gradient-to-br from-green-500/20 to-emerald-600/20 text-green-400 border-green-500/20',
      stat: 'text-green-400',
    },
  };

  const config = colorConfig[color];

  return (
    <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] transition-all duration-300 hover:border-white/20">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${config.icon}`}>
        {icon}
      </div>
      <div className={`text-xs font-bold mb-2 ${config.stat}`}>{stat}</div>
      <h3 className="font-semibold text-white text-lg mb-2">{title}</h3>
      <p className="text-sm text-white/50 leading-relaxed">{description}</p>
    </div>
  );
};

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
      bg: 'bg-gradient-to-b from-yellow-500/10 to-yellow-600/5',
      border: 'border-yellow-500/30',
      badge: 'bg-yellow-500 text-black',
      button: 'bg-yellow-500 hover:bg-yellow-400 text-black',
      check: 'text-yellow-400',
    },
    green: {
      bg: 'bg-gradient-to-b from-green-500/5 to-emerald-600/5',
      border: 'border-white/10',
      badge: 'bg-green-500 text-black',
      button: 'bg-white/10 hover:bg-white/15 text-white',
      check: 'text-green-400',
    },
    purple: {
      bg: 'bg-gradient-to-b from-purple-500/5 to-violet-600/5',
      border: 'border-white/10',
      badge: 'bg-purple-500 text-white',
      button: 'bg-purple-500/20 text-purple-300 cursor-not-allowed',
      check: 'text-purple-400',
    },
  };

  const config = colorConfig[color || 'green'];

  return (
    <div className={`relative p-6 rounded-2xl border transition-all duration-300 ${config.bg} ${config.border}`}>
      {popular && (
        <span className={`absolute -top-3 left-1/2 -translate-x-1/2 inline-block px-3 py-1 rounded-full text-[11px] font-bold ${config.badge}`}>
          POPULAR
        </span>
      )}
      {comingSoon && (
        <span className={`absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold ${config.badge}`}>
          <Clock className="w-3 h-3" />
          COMING SOON
        </span>
      )}

      <h3 className="font-bold text-white text-lg mt-1">{name}</h3>
      <div className="flex items-baseline gap-1 mt-2 mb-1">
        <span className="text-3xl font-bold text-white">{price}</span>
        {!comingSoon && <span className="text-sm text-white/40">/month</span>}
      </div>
      <p className="text-sm text-white/50 mb-5">{description}</p>

      {comingSoon ? (
        <Button disabled className={`w-full h-12 font-semibold rounded-xl ${config.button}`}>
          Notify Me
        </Button>
      ) : (
        <Link to="/auth/signup">
          <Button className={`w-full h-12 font-semibold rounded-xl ${config.button}`}>
            Start Free
          </Button>
        </Link>
      )}

      <div className="mt-5 space-y-3">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-2.5 text-sm text-white/60">
            <Check className={`w-4 h-4 flex-shrink-0 ${config.check}`} />
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
