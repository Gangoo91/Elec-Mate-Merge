import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wrench, ArrowRight } from 'lucide-react';
import { useBusinessAIProfile } from './useBusinessAIProfile';

export function BusinessAICard() {
  const { isAgentActive, profile } = useBusinessAIProfile();

  return (
    <Link
      to="/electrician/business-ai"
      className="block group touch-manipulation active:opacity-90"
    >
      <motion.div
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative overflow-hidden glass-premium rounded-2xl active:bg-white/[0.02]"
      >
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500" />
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-amber-500/[0.08] blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 p-5 sm:p-6 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 mb-4 group-hover:bg-amber-500/20 group-active:bg-amber-500/25 transition-colors">
            <Wrench className="h-8 w-8 text-amber-400" />
          </div>

          {isAgentActive ? (
            <>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-green-400">Mate Online</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Mate</h3>
              <p className="text-sm text-white max-w-md mx-auto mb-4">
                Your business assistant — handling admin so you don't have to
              </p>
              <div className="inline-flex items-center gap-2 text-amber-400 font-medium text-sm group-hover:gap-3 group-active:gap-3 transition-all">
                <span>Open Dashboard</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 group-active:translate-x-1 transition-transform" />
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Meet Mate</h3>
              <p className="text-sm text-white max-w-md mx-auto mb-4">
                Your business assistant on WhatsApp — invoicing, scheduling, client comms & more
                while you're on the tools
              </p>
              <div className="inline-flex items-center gap-2 text-amber-400 font-medium text-sm group-hover:gap-3 group-active:gap-3 transition-all">
                <span>Find Out More</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 group-active:translate-x-1 transition-transform" />
              </div>
            </>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
