/**
 * Study-centre shells — the page chrome shared by every course landing,
 * module landing and section landing.
 *
 * Why a shell layer? Each course has its own data (modules, sections) but the
 * chrome should be identical, so every page collapses to ~50 lines of data
 * plus one component.
 *
 * 2026-08-28: these were the *editorial* wrappers — back-pill, hero, numbered
 * stat strip, hairline grid frame — and they are now the hub ones. See the
 * note on CourseShell for what each swap fixes and why. The rule from here on
 * is that a Study Centre page is built from `HubPrimitives` like every other
 * hub in the app; if something is missing there, add it there.
 */

import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { type Tone } from '@/components/college/primitives';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubKpi,
  HubKpiRow,
  HubSectionHeading,
} from '@/components/hub/HubPrimitives';
import { CARD_BASE, CARD_NEUTRAL } from '@/components/ui/card-recipe';
import { cn } from '@/lib/utils';

/* ── CourseShell — used by every course landing page ──────────────── */

interface CourseShellProps {
  backTo: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  description?: string;
  tone?: Tone;
  modulesCount: number;
  pagesCount?: number | string;
  totalDuration: string;
  level?: string;
  children: ReactNode;
}

/**
 * CourseShell — moved onto the hub primitives 2026-08-28.
 *
 * This is the medicine `StudyCentreIndex` took and the course pages did not,
 * which is the whole reason a course landing looked like a different product
 * from the Study Centre hub it is reached from. Four things went:
 *
 * 1. `StatStrip columns={4}` → `HubKpiRow` + `HubKpi`. The strip rendered
 *    `01 · MODULES  02 · PAGES  03 · TOTAL TIME  04 · LEVEL`. The hub's own
 *    note on dropping that numbering: it "implied an order the groups never
 *    had". Nobody reads the level *after* the page count because it is fourth.
 *
 * 2. `PageHero` → `HubMasthead`. The hero "cost roughly 300px before an
 *    electrician reached a single tool" — same words, same reason.
 *
 * 3. THE HAIRLINE GRID. Cards were cells in
 *    `gap-[1.5px] bg-black border border-white/[0.06] rounded-2xl` — jammed
 *    together with 1.5px black seams inside one bordered box. No card design
 *    survives that: a grid of cards reads as a table, and the cards' own
 *    borders and corner radii are invisible because they are butted together.
 *    Now a normal gapped grid, so a card is a card.
 *
 * 4. `Eyebrow` (grey caps) → `HubSectionHeading` (volt). Section headings on
 *    the hub are `text-elec-yellow`; here they were the same muted grey as
 *    body text, so the page had no structure at a glance.
 *
 * The description survives as one line under the KPI row rather than as hero
 * copy. The hub deleted its equivalent because it "only restated the KPI row
 * below it" — a course description does not, the first time you meet it.
 */
export function CourseShell({
  backTo,
  backLabel,
  eyebrow,
  title,
  description,
  tone: _tone = 'yellow',
  modulesCount,
  pagesCount = '200+',
  totalDuration,
  level,
  children,
}: CourseShellProps) {
  return (
    <HubPage>
      <HubMasthead section={backLabel} title={title} backTo={backTo} />
      <HubBody>
        {description && (
          <p className="max-w-3xl text-[13px] leading-relaxed text-white">{description}</p>
        )}

        <HubKpiRow>
          <HubKpi label="Modules" value={String(modulesCount)} context="Including final" />
          <HubKpi label="Pages" value={String(pagesCount)} context="Reading material" />
          <HubKpi label="Total time" value={totalDuration} context="Self-paced" />
          <HubKpi label="Level" value={level ?? 'All'} context={eyebrow} />
        </HubKpiRow>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <HubSectionHeading>Course modules</HubSectionHeading>
            <span className="text-[11px] text-white">{modulesCount} total</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
        </section>
      </HubBody>
    </HubPage>
  );
}

/* ── SectionShell — used by section landing pages (lists subsections) ── */

interface SectionShellProps {
  backTo: string;
  backLabel: string;
  moduleNumber: number | string;
  sectionNumber: number | string;
  title: string;
  description?: string;
  tone?: Tone;
  subsectionsCount: number;
  duration?: string;
  prevSectionHref?: string;
  prevSectionLabel?: string;
  nextSectionHref?: string;
  nextSectionLabel?: string;
  children: ReactNode;
  aboveGrid?: ReactNode;
  belowGrid?: ReactNode;
}

export function SectionShell({
  backTo,
  backLabel,
  moduleNumber,
  sectionNumber,
  title,
  description,
  tone = 'yellow',
  subsectionsCount,
  duration,
  prevSectionHref,
  prevSectionLabel,
  nextSectionHref,
  nextSectionLabel,
  children,
  aboveGrid,
  belowGrid,
}: SectionShellProps) {
  const navigate = useNavigate();
  return (
    <HubPage>
      <HubMasthead
        section={`Module ${moduleNumber} · Section ${sectionNumber}${duration ? ` · ${duration}` : ''}`}
        title={title}
        backTo={backTo}
      />
      <HubBody>
        {description && (
          <p className="max-w-3xl text-[13px] leading-relaxed text-white">{description}</p>
        )}
        {aboveGrid}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3 px-0.5">
            <HubSectionHeading>Subsections</HubSectionHeading>
            <span className="text-[11px] text-white">{subsectionsCount} total</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>
        </div>

        {belowGrid}

        {(prevSectionHref || nextSectionHref) && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            {prevSectionHref ? (
              <button
                onClick={() => navigate(prevSectionHref)}
                className={cn(CARD_BASE, CARD_NEUTRAL, 'p-4 text-left lg:hover:-translate-y-0.5')}
              >
                <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous section
                </div>
                <div className="mt-1 text-[14px] font-semibold text-white truncate">
                  {prevSectionLabel ?? 'Previous'}
                </div>
              </button>
            ) : (
              <div />
            )}
            {nextSectionHref ? (
              <button
                onClick={() => navigate(nextSectionHref)}
                className={cn(CARD_BASE, CARD_NEUTRAL, 'p-4 text-right lg:hover:-translate-y-0.5')}
              >
                <div className="flex items-center gap-2 justify-end text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                  Next section <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 text-[14px] font-semibold text-white truncate">
                  {nextSectionLabel ?? 'Next'}
                </div>
              </button>
            ) : (
              <div />
            )}
          </div>
        )}
      </HubBody>
    </HubPage>
  );
}

/* ── ModuleShell — used by every module landing page ──────────────── */

interface ModuleShellProps {
  backTo: string;
  backLabel: string;
  moduleNumber: number | string;
  title: string;
  description?: string;
  tone?: Tone;
  sectionsCount: number;
  duration?: string;
  prevModuleHref?: string;
  prevModuleLabel?: string;
  nextModuleHref?: string;
  nextModuleLabel?: string;
  children: ReactNode;
  aboveGrid?: ReactNode;
  belowGrid?: ReactNode;
}

export function ModuleShell({
  backTo,
  backLabel,
  moduleNumber,
  title,
  description,
  tone = 'yellow',
  sectionsCount,
  duration,
  prevModuleHref,
  prevModuleLabel,
  nextModuleHref,
  nextModuleLabel,
  children,
  aboveGrid,
  belowGrid,
}: ModuleShellProps) {
  const navigate = useNavigate();
  return (
    <HubPage>
      <HubMasthead
        section={`Module ${moduleNumber}${duration ? ` · ${duration}` : ''}`}
        title={title}
        backTo={backTo}
      />
      <HubBody>
        {description && (
          <p className="max-w-3xl text-[13px] leading-relaxed text-white">{description}</p>
        )}
        {aboveGrid}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3 px-0.5">
            <HubSectionHeading>Sections</HubSectionHeading>
            <span className="text-[11px] text-white">{sectionsCount} total</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
        </div>

        {belowGrid}

        {/* Prev/next module nav — shown when adjacent modules exist */}
        {(prevModuleHref || nextModuleHref) && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            {prevModuleHref ? (
              <button
                onClick={() => navigate(prevModuleHref)}
                className={cn(CARD_BASE, CARD_NEUTRAL, 'p-4 text-left lg:hover:-translate-y-0.5')}
              >
                <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous module
                </div>
                <div className="mt-1 text-[14px] font-semibold text-white truncate">
                  {prevModuleLabel ?? 'Previous'}
                </div>
              </button>
            ) : (
              <div />
            )}
            {nextModuleHref ? (
              <button
                onClick={() => navigate(nextModuleHref)}
                className={cn(CARD_BASE, CARD_NEUTRAL, 'p-4 text-right lg:hover:-translate-y-0.5')}
              >
                <div className="flex items-center gap-2 justify-end text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                  Next module <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 text-[14px] font-semibold text-white truncate">
                  {nextModuleLabel ?? 'Next'}
                </div>
              </button>
            ) : (
              <div />
            )}
          </div>
        )}
      </HubBody>
    </HubPage>
  );
}
