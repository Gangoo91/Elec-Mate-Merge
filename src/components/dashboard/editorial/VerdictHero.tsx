/**
 * VerdictHero — calm editorial greeting.
 *
 * Hello, [name]. — that's the page. The supporting line under it carries
 * the verdict ("You have 5 overdue invoices worth £6,105.") in a quieter
 * weight; the bold display is reserved for the personal greeting only.
 * Monochrome — no tone gradients, no coloured accents. The single splash
 * of colour in the entire dashboard is the elec-yellow arrow on actions.
 */
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';

interface VerdictHeroProps {
  eyebrow: string;
  greeting: string;
  verdict: string;
  cta?: { label: string; href: string };
  isLoading?: boolean;
}

export function VerdictHero({
  eyebrow,
  greeting,
  verdict,
  cta,
  isLoading = false,
}: VerdictHeroProps) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative pt-2 sm:pt-4"
    >
      <motion.div variants={itemVariants}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className={cn(
          'mt-3 font-semibold tracking-tight leading-[1.05] text-white',
          // Display scale — big enough to feel personal, restrained enough
          // to feel calm. Below the size of the old verdict by ~25%.
          'text-[34px] sm:text-[44px] lg:text-[56px]'
        )}
      >
        {isLoading ? (
          <span className="inline-block h-[1em] w-[10ch] animate-pulse rounded bg-white/[0.06]" />
        ) : (
          greeting
        )}
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mt-3 sm:mt-4 text-[14px] sm:text-[15px] leading-relaxed text-white/70 max-w-2xl"
      >
        {isLoading ? (
          <span className="inline-block h-4 w-[24ch] animate-pulse rounded bg-white/[0.04]" />
        ) : (
          verdict
        )}
      </motion.p>

      {cta && !isLoading && (
        <motion.div variants={itemVariants} className="mt-5 sm:mt-6">
          <Link
            to={cta.href}
            className={cn(
              'group inline-flex items-center gap-2 h-10 px-4 rounded-full',
              'border border-white/[0.10] bg-white/[0.04] hover:bg-white/[0.08]',
              'text-[13px] font-medium text-white touch-manipulation',
              'transition-colors'
            )}
          >
            <span>{cta.label}</span>
            <ArrowRight className="h-4 w-4 text-elec-yellow group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      )}
    </motion.section>
  );
}

export default VerdictHero;
