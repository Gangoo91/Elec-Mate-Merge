/**
 * SafetyModuleShell — the canonical layout for every Site Safety module.
 *
 * Laid out like the business hub (see `BusinessPageLayout`): the page identity
 * lives in the bar, and content starts straight after it.
 *
 *   ┌ SafetyMasthead   sticky · ← · module name + subtitle · action · badge
 *   │ stats            <SafetyStatStrip …/>      2x2 HubKpi cards, tap-to-filter
 *   │ filter           <FilterBar …/>            tabs + search
 *   └ children         list / EmptyState / LoadingState
 *
 * There is no hero row any more. Every module used to pass one — an uppercase
 * kicker, a 26px headline and a paragraph of prose — and on a phone that was
 * most of the first screen before a single record appeared. The `hero` prop is
 * still accepted, but the shell reads `title` and `actions` off it and renders
 * them in the bar; see the note in the component body for why it is done that
 * way rather than by editing all eighteen call sites.
 *
 * Modules just fill slots — they never hand-roll a header, filter bar or empty
 * state. This is what keeps the 18 modules visually uniform.
 */

import { isValidElement, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { containerVariants } from '@/components/college/primitives';
import { SafetyPageHeader, SafetyStatStrip } from '../common/SafetyPageHeader';

interface SafetyMastheadProps {
  onBack: () => void;
  /** Label shown next to the back arrow — where "back" returns to. */
  backLabel?: string;
  /** Module name shown as the masthead title. */
  moduleName: string;
  /** Optional trailing element (e.g. an active-count pill). */
  trailing?: ReactNode;
  /**
   * The page's outcome statement, e.g. "Every safety document in one place".
   * It used to live in a hero block below this bar; it now sits under the
   * module name, the way the business hub pages do it.
   */
  subtitle?: string;
  /** Page-level action, right of the bar. Was the hero's `actions` slot. */
  actions?: ReactNode;
}

export function SafetyMasthead({
  onBack,
  backLabel = 'Site Safety',
  moduleName,
  trailing,
  subtitle,
  actions,
}: SafetyMastheadProps) {
  return (
    <div className="sticky top-0 z-50 border-b border-white/[0.08] bg-[hsl(0_0%_7%)]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-4 lg:max-w-[1600px] lg:px-8 xl:max-w-[1920px] 2xl:max-w-[2240px]">
        {/*
         * The bar now carries the page identity, the way BusinessPageLayout
         * does. It used to be a breadcrumb only, with the real title in a hero
         * block underneath — an uppercase kicker, a 26px headline and a
         * paragraph of prose. On a phone that was most of the first screen
         * before a single record was visible, and the two titles said
         * substantially the same thing twice.
         */}
        <div className="flex items-center gap-3 py-2.5 sm:gap-4">
          <button
            type="button"
            onClick={onBack}
            aria-label={`Back to ${backLabel}`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-white transition-[filter] touch-manipulation active:brightness-125 [-webkit-tap-highlight-color:transparent]"
          >
            <span aria-hidden className="text-[17px] leading-none">
              ←
            </span>
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-[17px] font-bold leading-tight tracking-tight text-white">
              {moduleName}
            </h1>
            {subtitle && (
              <p className="truncate text-[12px] leading-tight text-white">{subtitle}</p>
            )}
          </div>

          {actions && <div className="shrink-0">{actions}</div>}
          {trailing && <div className="shrink-0">{trailing}</div>}
        </div>
      </div>
    </div>
  );
}

interface SafetyModuleShellProps extends SafetyMastheadProps {
  /** <SafetyPageHeader …/> — outcome statement + primary action. */
  hero: ReactNode;
  /** Optional <SafetyStatStrip …/> — at-a-glance metrics. */
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
  /*
   * The hero is absorbed into the masthead rather than rendered.
   *
   * All eighteen modules pass `hero={<SafetyPageHeader title=… description=…
   * actions=… />}`. Reading those props here means the whole hub moves to the
   * business-hub layout without eighteen separate edits — and eighteen edits
   * driven by a regex is exactly what broke four files earlier today.
   *
   * `description` is deliberately dropped, not relocated: it was a sentence of
   * prose restating what the module list already shows, and there is nowhere in
   * a 56px bar for it. The `title` becomes the subtitle under the module name,
   * which is the one line that actually said something the name did not.
   *
   * Anything that is not a SafetyPageHeader falls through and still renders in
   * place, so a module with a bespoke hero is not silently blanked.
   */
  const heroEl = isValidElement<{ title?: ReactNode; actions?: ReactNode }>(hero) ? hero : null;
  const heroTitle = typeof heroEl?.props.title === 'string' ? heroEl.props.title : undefined;
  const heroActions = heroEl?.props.actions;
  const heroFallback = heroEl && heroTitle === undefined ? hero : null;

  return (
    // `--elec-dark` is pure black (index.css:97). White text on #000 is the
    // harshest pairing there is — it glares on a large screen and gives the
    // card surfaces (white/[0.04]) nothing to sit against, so the whole page
    // reads as a void with text floating in it.
    //
    // Site Safety uses a three-step ladder instead: page 7%, card 11%, raised
    // 14%. Enough separation to see structure, dark enough for a van at night.
    // Set here rather than on `--elec-dark`, which is app-wide.
    <div className={cn('min-h-screen bg-[hsl(0_0%_7%)] pb-24', className)}>
      <SafetyMasthead
        onBack={onBack}
        backLabel={backLabel}
        moduleName={moduleName}
        trailing={trailing}
        subtitle={heroTitle}
        actions={heroActions}
      />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-5xl space-y-6 px-4 pb-6 sm:space-y-8 lg:max-w-[1600px] lg:px-8 xl:max-w-[1920px] 2xl:max-w-[2240px]"
      >
        {heroFallback}
        {stats}
        {filter}
        {children}
      </motion.div>
    </div>
  );
}

export default SafetyModuleShell;
