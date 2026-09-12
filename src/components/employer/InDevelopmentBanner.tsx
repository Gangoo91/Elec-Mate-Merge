import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, X } from 'lucide-react';
import { Eyebrow } from '@/components/employer/editorial';

const KEY = 'employer-hub-in-dev-dismissed';

/**
 * Employer Hub only. The hub ships ahead of the paid Employer product, and the
 * £3.99 Founders Offer maps to tier 'employer' (see PRICE_TO_TIER in the
 * stripe-subscription-webhook), so ~60 founders can walk in here and judge an
 * unfinished room. Rather than quietly revoke access they were sold, say so.
 *
 * Dismissal is deliberately sessionStorage, not localStorage: it stops the
 * banner nagging while someone browses, and shows again next visit so the
 * expectation is reset rather than permanently hidden.
 */
export function InDevelopmentBanner() {
  const [open, setOpen] = useState(() => {
    try {
      return sessionStorage.getItem(KEY) !== '1';
    } catch {
      // Private windows and blocked site data both throw on access.
      return true;
    }
  });

  const dismiss = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* nothing to persist to — the banner simply returns on the next render */
    }
  };

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="overflow-hidden border-b border-yellow-400/20 bg-gradient-to-r from-yellow-400/[0.10] via-amber-400/[0.06] to-transparent"
        >
          <div className="mx-auto flex max-w-7xl items-start gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-yellow-400/25 bg-yellow-400/10">
              <Hammer className="h-4 w-4 text-yellow-400" />
            </div>

            <div className="min-w-0 flex-1">
              <Eyebrow className="text-yellow-400/90">In development</Eyebrow>
              <p className="mt-1 text-[13px] leading-relaxed text-white/90">
                The Employer Hub isn&apos;t finished yet. You can look around, but things will move
                and some of it won&apos;t work properly. Your Elec-Mate account is unaffected — this
                is the only area still being built.
              </p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-white/60">
                Found something broken, or know what would actually help you run your firm?{' '}
                <a
                  href="mailto:founder@elec-mate.com?subject=Employer%20Hub%20feedback"
                  className="font-medium text-yellow-400 underline decoration-yellow-400/40 underline-offset-2 hover:decoration-yellow-400"
                >
                  Tell Andrew
                </a>
                .
              </p>
            </div>

            <button
              type="button"
              onClick={dismiss}
              aria-label="Hide this notice"
              className="-m-1 shrink-0 rounded-lg p-1 text-white/40 transition-colors hover:bg-white/5 hover:text-white/80 touch-manipulation"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
