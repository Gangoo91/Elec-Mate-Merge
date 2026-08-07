/**
 * Mate, as one row.
 *
 * This was a full section: a pulsing eyebrow, a 40px two-tone headline
 * ("I'm Mate. What needs sorting?"), a paragraph of explanation, the input
 * bar, four starter cards and a "Grounded in BS 7671" divider — roughly 700px,
 * most of the first screen, before an electrician reached anything they could
 * do. The starter cards also overflowed the viewport on a phone, so the fourth
 * one was clipped.
 *
 * What was load-bearing was the input. Everything else was Mate introducing
 * itself, every single visit. The starters belong inside the Assistant sheet
 * anyway, which is where you are once you have decided to ask it something.
 *
 * The live dot stays: it is the only thing here that says this is a running
 * assistant rather than a search box, and it costs 8px.
 */
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { itemVariants } from '@/components/college/primitives';
import { useHaptic } from '@/hooks/useHaptic';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

export const MateBar = ({ onOpen }: { onOpen: () => void }) => {
  const haptic = useHaptic();
  return (
    <motion.button
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      type="button"
      onClick={() => {
        haptic.light();
        onOpen();
      }}
      aria-label="Ask Mate"
      className={[
        'group flex w-full items-center gap-3 rounded-2xl border text-left',
        'border-elec-yellow/35',
        CARD_SURFACE,
        'hover:border-elec-yellow/60 hover:from-white/[0.19] hover:via-white/[0.11] hover:to-white/[0.07]',
        'active:from-white/[0.22]',
        'transition-[background-image,background-color,border-color,transform] duration-150 ease-out',
        'touch-manipulation select-none [-webkit-tap-highlight-color:transparent]',
        'active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
        'py-2 pl-4 pr-2 sm:pl-5 sm:pr-2.5',
      ].join(' ')}
    >
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-elec-yellow opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-elec-yellow" />
      </span>

      <span className="flex-1 truncate py-1.5 text-[14px] text-white sm:text-[15px]">
        Ask Mate — tasks, snags, regs, anything…
      </span>

      <kbd className="hidden items-center gap-1 rounded-md border border-white/[0.12] bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-semibold text-white md:inline-flex">
        ⌘K
      </kbd>

      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-elec-yellow text-black transition-transform group-hover:scale-[1.04] group-active:scale-[0.96] sm:h-10 sm:w-10">
        <ArrowRight className="h-[18px] w-[18px]" />
      </span>
    </motion.button>
  );
};
