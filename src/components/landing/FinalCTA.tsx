import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const FinalCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="relative w-full py-16 sm:py-24 overflow-hidden">
      {/* Ambient gradient background - matching hero style */}
      <div className="absolute inset-0 bg-black">
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 left-1/4 w-72 h-72 sm:w-[400px] sm:h-[400px] rounded-full bg-yellow-500/20 blur-[100px]"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute top-1/3 right-1/4 w-64 h-64 sm:w-[300px] sm:h-[300px] rounded-full bg-amber-500/15 blur-[80px]"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />
          </>
        )}
        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/10 border border-yellow-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400/90">Start Today</span>
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5 leading-tight">
            Join UK Electrical Professionals on{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
              Elec-Mate
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/50 mb-8 sm:mb-10 max-w-xl mx-auto">
            AI-powered tools, certifications, training & job management. Everything you need to excel.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 max-w-sm sm:max-w-none mx-auto">
            <Link to="/auth/signup" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-base sm:text-lg font-semibold bg-yellow-500 hover:bg-yellow-400 text-black touch-manipulation transition-all duration-200 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30 active:scale-[0.98]"
              >
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/auth/signin" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-14 px-8 text-base sm:text-lg font-semibold border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/25 touch-manipulation transition-all duration-200 active:scale-[0.98]"
              >
                Sign In
              </Button>
            </Link>
          </div>

          <p className="text-white/30 text-sm mt-6">
            7-day free trial. No card required. Cancel anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
