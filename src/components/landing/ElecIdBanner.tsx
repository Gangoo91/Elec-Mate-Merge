import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CreditCard, Shield, Share2, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const benefits = [
  { icon: Shield, text: 'Verified credentials' },
  { icon: Share2, text: 'Instant sharing' },
  { icon: CreditCard, text: 'Digital & physical card' },
];

export const ElecIdBanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="w-full py-16 sm:py-20 bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-yellow-500/10 border-y border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/30 mb-6">
              <CreditCard className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">Free for All Users</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Your Digital{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                Elec-ID
              </span>
            </h2>

            <p className="text-white/70 text-lg mb-6 leading-relaxed">
              A professional identity for UK electricians. Verify your qualifications,
              share credentials instantly, and build trust with clients.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              {benefits.map((benefit) => (
                <div
                  key={benefit.text}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
                >
                  <benefit.icon className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-white/80">{benefit.text}</span>
                </div>
              ))}
            </div>

            <Link to="/auth/signup">
              <Button
                size="lg"
                className="h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation"
              >
                Get Your Elec-ID
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Right: Card preview */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="relative w-[320px] aspect-[1.6/1] rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 p-[2px] shadow-2xl shadow-yellow-500/20 touch-manipulation transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-[2px] rounded-2xl bg-neutral-900 p-5 flex flex-col justify-between">
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs text-white/50 uppercase tracking-wider mb-1">UK Electrical Professional</div>
                    <div className="text-lg font-bold text-white">ELEC-ID</div>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-black" />
                  </div>
                </div>

                {/* Middle */}
                <div className="space-y-1">
                  <div className="text-white font-semibold">John Smith</div>
                  <div className="text-white/60 text-sm">Qualified Electrician</div>
                </div>

                {/* Bottom row */}
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs text-white/50 uppercase tracking-wider">ID Number</div>
                    <div className="text-white font-mono text-sm">EM-2024-XXXXX</div>
                  </div>
                  <div className="flex items-center gap-1 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 -z-10 bg-yellow-500/20 blur-[60px] rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
