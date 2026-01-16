import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Check, ArrowRight, Zap, FileText, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { motion, useReducedMotion } from 'framer-motion';

const LandingPage = () => {
  const { user } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Nav - minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl">
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

      {/* Hero - single focus */}
      <section className="min-h-[100svh] flex flex-col justify-center px-5 pt-14">
        <div className="max-w-5xl mx-auto w-full">
          {/* Ambient glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {!prefersReducedMotion && (
              <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[120px]"
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
            )}
          </div>

          <div className="relative z-10 text-center sm:text-left">
            <motion.h1
              className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              AI tools for
              <br />
              <span className="text-yellow-400">UK electricians</span>
            </motion.h1>

            <motion.p
              className="text-white/50 text-base sm:text-lg max-w-md mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Quotes, certificates, and calculations. Everything you need on site.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/auth/signup" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-14 px-8 text-base font-semibold bg-yellow-500 hover:bg-yellow-400 text-black">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/auth/signin" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto h-14 px-8 text-base font-semibold border-white/20 text-white hover:bg-white/5">
                  Sign In
                </Button>
              </Link>
            </motion.div>

            <motion.p
              className="text-white/30 text-sm mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              7 days free. No card required.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features - 3 real things */}
      <section className="py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-10">What you get</h2>

          <div className="grid sm:grid-cols-3 gap-4">
            <FeatureCard
              icon={<Zap className="w-5 h-5" />}
              title="AI Assistants"
              description="Cost estimates, circuit design, method statements, and commissioning guidance."
              color="yellow"
            />
            <FeatureCard
              icon={<FileText className="w-5 h-5" />}
              title="Certificates"
              description="EICR, EIC, and Minor Works forms. Fill on site, export as PDF."
              color="blue"
            />
            <FeatureCard
              icon={<GraduationCap className="w-5 h-5" />}
              title="Training"
              description="Level 2 & 3 courses, BS7671 revision, and AM2 prep."
              color="green"
            />
          </div>
        </div>
      </section>

      {/* Pricing - simple */}
      <section className="py-16 px-5 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-10">Simple pricing</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <PricingCard
              name="Apprentice"
              price="£4.99"
              description="Training and exam prep"
              features={['Level 2 & 3 courses', 'Practice questions', 'Progress tracking', 'Mental health support']}
            />
            <PricingCard
              name="Electrician"
              price="£9.99"
              description="Everything for site work"
              features={['All apprentice features', 'AI assistants', 'Certificate forms', 'Voice quotes']}
              popular
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
          <p className="text-white/50 mb-6">Join UK electricians using Elec-Mate on site.</p>
          <Link to="/auth/signup">
            <Button className="h-14 px-10 text-base font-semibold bg-yellow-500 hover:bg-yellow-400 text-black">
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer - minimal */}
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

// Feature card component
const FeatureCard = ({ icon, title, description, color }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'yellow' | 'blue' | 'green';
}) => {
  const colors = {
    yellow: 'bg-yellow-500/10 text-yellow-400',
    blue: 'bg-blue-500/10 text-blue-400',
    green: 'bg-green-500/10 text-green-400',
  };

  return (
    <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${colors[color]}`}>
        {icon}
      </div>
      <h3 className="font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-white/40">{description}</p>
    </div>
  );
};

// Pricing card component
const PricingCard = ({ name, price, description, features, popular }: {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}) => (
  <div className={`p-5 rounded-xl border ${popular ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-white/[0.02] border-white/5'}`}>
    {popular && (
      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-yellow-500 text-black mb-3">
        POPULAR
      </span>
    )}
    <h3 className="font-semibold text-white">{name}</h3>
    <div className="flex items-baseline gap-1 mt-1 mb-2">
      <span className="text-2xl font-bold text-white">{price}</span>
      <span className="text-sm text-white/40">/month</span>
    </div>
    <p className="text-sm text-white/40 mb-4">{description}</p>

    <Link to="/auth/signup">
      <Button className={`w-full h-11 font-semibold ${popular ? 'bg-yellow-500 hover:bg-yellow-400 text-black' : 'bg-white/10 hover:bg-white/15 text-white'}`}>
        Start Free
      </Button>
    </Link>

    <div className="mt-4 space-y-2">
      {features.map((feature) => (
        <div key={feature} className="flex items-center gap-2 text-sm text-white/50">
          <Check className={`w-4 h-4 ${popular ? 'text-yellow-400' : 'text-green-400'}`} />
          {feature}
        </div>
      ))}
    </div>
  </div>
);

export default LandingPage;
