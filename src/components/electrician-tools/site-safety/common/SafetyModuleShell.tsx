/**
 * SafetyModuleShell — the canonical layout for every Site Safety module.
 *
 * Composes the shared editorial primitives (PageHero, StatStrip, FilterBar…)
 * in a fixed order so every module looks identical by construction:
 *
 *   ┌ SafetyMasthead   sticky · "← Site Safety" · module name · live badge
 *   │ hero             <PageHero …/>            outcome + primary action
 *   │ stats            <StatStrip …/>           at-a-glance, tap-to-filter
 *   │ filter           <FilterBar …/>           tabs + search
 *   └ children         list / EmptyState / LoadingState
 *
 * Modules just fill slots — they never hand-roll a header, hero, filter bar
 * or empty state again. This is what keeps the 18 modules visually uniform.
 */

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { containerVariants } from '@/components/college/primitives';

interface SafetyMastheadProps {
  onBack: () => void;
  /** Label shown next to the back arrow — where "back" returns to. */
  backLabel?: string;
  /** Module name shown as the masthead title. */
  moduleName: string;
  /** Optional trailing element (e.g. an active-count pill). */
  trailing?: ReactNode;
}

export function SafetyMasthead({
  onBack,
  backLabel = 'Site Safety',
  moduleName,
  trailing,
}: SafetyMastheadProps) {
  return (
    <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex items-center h-12 gap-3 sm:gap-5">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-[12.5px] font-medium text-white hover:text-white/80 transition-colors touch-manipulation whitespace-nowrap -ml-1 h-11 px-1"
          >
            <span aria-hidden className="text-white/70">←</span>
            {backLabel}
          </button>
          <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
            <span className="hidden sm:inline text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Site Safety
            </span>
            <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
            <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
              {moduleName}
            </h1>
          </div>
          {trailing && <div className="shrink-0">{trailing}</div>}
        </div>
      </div>
    </div>
  );
}

interface SafetyModuleShellProps extends SafetyMastheadProps {
  /** <PageHero …/> — outcome statement + primary action. */
  hero: ReactNode;
  /** Optional <StatStrip …/> — at-a-glance metrics. */
  stats?: ReactNode;
  /** Optional <FilterBar …/> — tabs + search. */
  filter?: ReactNode;
  /** List / EmptyState / LoadingState. */
  children: ReactNode;
  className?: string;
}

export function SafetyModuleShell({
  onBack,
  backLabel,
  moduleName,
  trailing,
  hero,
  stats,
  filter,
  children,
  className,
}: SafetyModuleShellProps) {
  return (
    <div className={cn('bg-elec-dark min-h-screen pb-24', className)}>
      <SafetyMasthead
        onBack={onBack}
        backLabel={backLabel}
        moduleName={moduleName}
        trailing={trailing}
      />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-5xl px-4 pb-6 space-y-6 sm:space-y-8"
      >
        {hero}
        {stats}
        {filter}
        {children}
      </motion.div>
    </div>
  );
}

export default SafetyModuleShell;
