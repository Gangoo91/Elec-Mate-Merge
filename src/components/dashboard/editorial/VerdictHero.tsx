/**
 * VerdictHero — calm editorial greeting with elec-yellow as the signature.
 *
 * "Hello, [Andrew]." — the name is rendered in elec-yellow so the page has
 * personality without the multi-coloured noise of the earlier version. The
 * verdict line below is in white at a quieter weight, and the CTA pill
 * carries the same yellow accent on its arrow.
 */
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';

interface VerdictHeroProps {
  eyebrow: string;
  greeting: string; // e.g. "Hello, Andrew."
  verdict: string;
  cta?: { label: string; href: string };
  isLoading?: boolean;
}

/**
 * Splits "Hello, Andrew." into ["Hello,", "Andrew."] so the name can be
 * rendered in elec-yellow as the visual anchor. Falls back gracefully if
 * the greeting doesn't match the expected shape.
 */
function splitGreeting(greeting: string): { lead: string; name: string | null } {
  const match = greeting.match(/^(.+?,\s+)(.+)$/);
  if (!match) return { lead: greeting, name: null };
  return { lead: match[1], name: match[2] };
}

export function VerdictHero({
  eyebrow,
  greeting,
  verdict,
  cta,
  isLoading = false,
}: VerdictHeroProps) {
  const { lead, name } = splitGreeting(greeting);

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
          'mt-3 font-semibold tracking-tight leading-[1.05]',
          'text-[34px] sm:text-[44px] lg:text-[56px]'
        )}
      >
        {isLoading ? (
          <span className="inline-block h-[1em] w-[10ch] animate-pulse rounded bg-white/[0.06]" />
        ) : (
          <>
            <span className="text-elec-yellow">{lead}</span>
            {name && <span className="text-white">{name}</span>}
          </>
        )}
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mt-3 sm:mt-4 text-[14px] sm:text-[15px] leading-relaxed text-white/75 max-w-2xl"
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
              'border border-elec-yellow/25 bg-elec-yellow/10 hover:bg-elec-yellow/20',
              'text-[13px] font-medium text-elec-yellow touch-manipulation',
              'transition-colors'
            )}
          >
            <span>{cta.label}</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      )}
    </motion.section>
  );
}

export default VerdictHero;
