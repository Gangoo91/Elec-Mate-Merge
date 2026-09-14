import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_BASE, CARD_NEUTRAL, CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { itemVariants } from '@/components/college/primitives';
import { HubSubPage } from '@/components/hub/HubSubPage';
import {
  CATEGORY_COUNT,
  ESSENTIAL_COUNT,
  SUPPLIER_COUNT,
  TOOL_COUNT,
} from '@/data/professional-tools/counts';
import { TOOL_CHAPTERS, chapterHref } from '@/data/professional-tools/chapters';
import KitByYear from '@/components/apprentice/professional-tools-v2/KitByYear';

/**
 * Professional tool guide — the index.
 *
 * 🔴 The cards are LINKS. They have never worked as toggles.
 *
 * They used to set an `activeCategory` that rendered the chapter *underneath
 * the grid*: on a phone the content arrived below the fold and the only
 * feedback was a border colour on the card you had just tapped. Andrew's
 * words: "people will think nothing's happened". Tapping the same card again
 * silently emptied the page, so the recovery looked identical to the fault.
 *
 * Flattening everything onto one page fixed the trap but produced ~1,250 lines
 * of components in a single route — 77 tool cards and ten reference tables
 * mounted whether you wanted them or not. Six routes fix both: the URL changes
 * so the navigation is unmissable, each chapter is deep-linkable for a tutor
 * sharing one, and you load the chapter you asked for.
 *
 * This also matches `electrical-installation-guides` in this same hub, which
 * was already built as an index plus four sub-routes.
 *
 * The trade-off is find-in-page no longer spans all six chapters, so the filter
 * below searches chapter keywords and the cards it leaves are the ones to open.
 */
const ProfessionalToolGuide = () => {
  const [query, setQuery] = useState('');

  const trimmed = query.trim();
  const isSearching = trimmed.length > 0;

  const visible = useMemo(() => {
    if (!isSearching) return TOOL_CHAPTERS;
    const q = trimmed.toLowerCase();
    return TOOL_CHAPTERS.filter((c) =>
      [c.label, c.eyebrow, c.description, c.blurb, ...c.keywords].some((s) =>
        s.toLowerCase().includes(q)
      )
    );
  }, [isSearching, trimmed]);

  return (
    <HubSubPage
      title="Professional tool guide"
      backTo="/apprentice/on-job-tools"
      description={`${TOOL_COUNT} tools across ${CATEGORY_COUNT} categories — what each one is for, what to look for, and where UK electricians actually buy theirs. Built from years of supplier and trade feedback.`}
    >
      <motion.div variants={itemVariants}>
        <HubKpiRow>
          <HubKpi label="Tools" value={String(TOOL_COUNT)} accent />
          <HubKpi label="Essential" value={String(ESSENTIAL_COUNT)} />
          <HubKpi label="Suppliers" value={String(SUPPLIER_COUNT)} />
        </HubKpiRow>
      </motion.div>

      {/* Leads, because "what do I buy this year" is the question people
          arrive with. The six category chapters below are the reference you
          consult once that is answered. */}
      <KitByYear />

      <motion.section variants={itemVariants} className="space-y-4 sm:space-y-5">
        <HubSectionHeading>Look up a category</HubSectionHeading>

        <div className="relative">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search — glands, SDS, boots, MFT…"
            aria-label="Search chapters"
            className={cn(
              'h-11 w-full rounded-xl border border-white/[0.12] bg-white/[0.04] pl-9 pr-9',
              'text-base font-medium text-white placeholder:text-white/40',
              'caret-elec-yellow transition-colors hover:border-white/[0.2]',
              'focus:border-elec-yellow focus:outline-none focus-visible:ring-0',
              '[color-scheme:dark] touch-manipulation'
            )}
          />
          {isSearching && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/[0.08] touch-manipulation"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {visible.map((chapter) => (
            <Link
              key={chapter.slug}
              to={chapterHref(chapter.slug)}
              className={cn(
                CARD_BASE,
                CARD_NEUTRAL,
                'group relative flex min-h-[140px] flex-col overflow-hidden px-4 py-3.5 sm:p-5',
                'lg:hover:-translate-y-0.5 lg:hover:border-elec-yellow/60',
                'touch-manipulation'
              )}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/55 to-elec-yellow/0"
              />
              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                {chapter.eyebrow}
              </span>
              <h3 className="mt-1.5 text-[15px] font-semibold leading-tight tracking-tight text-white">
                {chapter.label}
              </h3>
              <p className="mt-1.5 text-[12.5px] leading-snug text-white">{chapter.description}</p>
              {/* An explicit affordance — the card is a destination, not a toggle. */}
              <span className="mt-auto flex items-center gap-1.5 pt-3 text-[12px] font-medium text-elec-yellow">
                Open
                <ArrowRight
                  aria-hidden
                  className="h-3.5 w-3.5 transition-transform lg:group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="text-[13px] text-white">
            Nothing matches “{trimmed}”. Clear the search to see all {TOOL_CHAPTERS.length}{' '}
            chapters.
          </p>
        )}
      </motion.section>

      {/* Compliance note — editorial */}
      <motion.div
        variants={itemVariants}
        className={cn(
          'rounded-2xl border border-elec-yellow/35 px-5 py-4 sm:px-6 sm:py-5',
          CARD_SURFACE
        )}
      >
        <div className="mb-2 flex items-baseline gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
            Compliance
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            · Standards
          </span>
        </div>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Hand tools used on or near live equipment must be{' '}
          <span className="text-amber-200">VDE certified to BS EN 60900</span>. Test equipment must
          comply with <span className="text-amber-200">GS38</span> and be calibrated annually.
          Voltage indicators must meet <span className="text-amber-200">BS EN 61243-3</span>.
        </p>
      </motion.div>
    </HubSubPage>
  );
};

export default ProfessionalToolGuide;
