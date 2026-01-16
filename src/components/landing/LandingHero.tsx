import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, Sparkles, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingHero = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col overflow-hidden">
      {/* Premium gradient background - no grid */}
      <div className="absolute inset-0 bg-black">
        {/* Ambient glow orbs */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute -top-32 -left-32 w-80 h-80 sm:w-[500px] sm:h-[500px] rounded-full bg-yellow-500/25 blur-[100px] sm:blur-[140px]"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.25, 0.35, 0.25],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute top-1/3 -right-20 w-64 h-64 sm:w-[400px] sm:h-[400px] rounded-full bg-blue-500/20 blur-[80px] sm:blur-[120px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />
            <motion.div
              className="absolute bottom-0 left-1/3 w-72 h-72 sm:w-[350px] sm:h-[350px] rounded-full bg-amber-500/15 blur-[90px] sm:blur-[100px]"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            />
          </>
        )}
        {/* Subtle noise texture overlay for premium feel */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-6xl mx-auto px-5 sm:px-8 pt-24 pb-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Premium badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-6 sm:mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/10 border border-yellow-500/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400/90">
                7-Day Free Trial
              </span>
            </span>
          </motion.div>

          {/* Main headline - optimised for mobile */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-[2rem] leading-[1.15] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 sm:mb-6 tracking-tight"
          >
            The Complete Platform
            <br className="sm:hidden" />
            <span className="sm:inline"> for </span>
            <span className="block sm:inline mt-1 sm:mt-0 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              UK Electricians
            </span>
          </motion.h1>

          {/* Subheadline - cleaner for mobile */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2"
          >
            AI-powered tools, certifications, training & job management. Everything you need in one place.
          </motion.p>

          {/* CTA buttons - stacked on mobile, full width */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 mb-10 sm:mb-12 max-w-sm sm:max-w-none mx-auto"
          >
            <Link to="/auth/signup" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-base sm:text-lg font-semibold bg-yellow-500 hover:bg-yellow-400 text-black touch-manipulation transition-all duration-200 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                Start Free Trial
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
          </motion.div>

          {/* Trust indicators - horizontal scroll on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex items-center justify-center gap-6 sm:gap-8 text-white/50 overflow-x-auto scrollbar-hide px-4 -mx-4"
          >
            <div className="flex items-center gap-2 shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400/80" />
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">BS 7671 Compliant</span>
            </div>
            <div className="w-px h-4 bg-white/10 shrink-0" />
            <div className="flex items-center gap-2 shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400/80" />
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">No Card Required</span>
            </div>
            <div className="w-px h-4 bg-white/10 shrink-0 hidden sm:block" />
            <div className="items-center gap-2 shrink-0 hidden sm:flex">
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">UK Based</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/60 transition-colors touch-manipulation p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: prefersReducedMotion ? 0 : [0, 8, 0] }}
        transition={{
          opacity: { delay: 0.6, duration: 0.4 },
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }}
        aria-label="Scroll to content"
      >
        <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
      </motion.button>
    </section>
  );
};
