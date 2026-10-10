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
 *
 * 2026-10-10: rebuilt on ./course-kit for "excellent on desktop and mobiles".
 * Same props, so none of the 516 pages changed. Each page now opens with a
 * header card (what it is, your progress, one Start / Continue / Review
 * button), lists its sections or modules as numbered rows that tick off as you
 * finish them, and puts a long intro (aboveGrid) in an "About this module"
 * panel: beside the list on a computer, folded with "Read more" on a phone.
 */

import { type ReactNode } from 'react';

import { type Tone } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { cn } from '@/lib/utils';
import {
  AboutPanel,
  CourseHero,
  ListHeading,
  ListProvider,
  PrevNext,
} from '@/components/study-centre/course-kit';

/* ── The list area: rows, plus the About panel beside them on a computer ── */

function ListArea({
  heading,
  count,
  about,
  aboutTitle,
  below,
  children,
}: {
  heading: string;
  count: string;
  about?: ReactNode;
  aboutTitle: string;
  below?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-6">
      {/* The long intro, folded: a few lines and "Read more", above the list. */}
      {about && <AboutPanel title={aboutTitle}>{about}</AboutPanel>}
      <div className="min-w-0 space-y-3">
        <ListHeading title={heading} count={count} />
        {/* Separate cards with a little space between them; two across on a computer. */}
        <div className="grid gap-2.5 sm:gap-3 lg:grid-cols-2">{children}</div>
        {below}
      </div>
    </div>
  );
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

/* ── CourseShell — used by every course landing page ──────────────── */

interface CourseShellProps {
  backTo: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  description?: string;
  /**
   * A banner above the description — used for a status the learner needs
   * before they start reading, such as a course still under review. Optional
   * and absent on every other course, so nothing else changes shape.
   */
  notice?: ReactNode;
  tone?: Tone;
  modulesCount: number;
  pagesCount?: number | string;
  totalDuration: string;
  level?: string;
  children: ReactNode;
}

export function CourseShell({
  backTo,
  backLabel,
  eyebrow,
  title,
  description,
  notice,
  modulesCount,
  totalDuration,
  level,
  children,
}: CourseShellProps) {
  return (
    <HubPage ground="landing">
      <HubMasthead section={backLabel} title={title} backTo={backTo} />
      <HubBody>
        <ListProvider>
          <CourseHero
            eyebrow={eyebrow}
            title={title}
            description={description}
            facts={[plural(modulesCount, 'module'), totalDuration, level]}
            noun="module"
            scope="course"
            notice={notice}
          />
          <ListArea heading="Modules" count={plural(modulesCount, 'module')} aboutTitle="">
            {children}
          </ListArea>
        </ListProvider>
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
  return (
    <HubPage ground="landing">
      <HubMasthead
        section={`Module ${moduleNumber} · Section ${sectionNumber}`}
        title={title}
        backTo={backTo}
      />
      <HubBody>
        <ListProvider>
          <CourseHero
            eyebrow={`Module ${moduleNumber} · Section ${sectionNumber}`}
            title={title}
            description={description}
            facts={[backLabel, plural(subsectionsCount, 'subsection'), duration]}
            noun="subsection"
            scope="section"
          />
          <ListArea
            heading="Subsections"
            count={plural(subsectionsCount, 'subsection')}
            about={aboveGrid}
            aboutTitle="About this section"
            below={belowGrid}
          >
            {children}
          </ListArea>
          <PrevNext
            prevHref={prevSectionHref}
            prevLabel={prevSectionLabel}
            nextHref={nextSectionHref}
            nextLabel={nextSectionLabel}
            noun="section"
          />
        </ListProvider>
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
  return (
    <HubPage ground="landing">
      <HubMasthead section={`Module ${moduleNumber}`} title={title} backTo={backTo} />
      <HubBody>
        <ListProvider>
          <CourseHero
            eyebrow={`Module ${moduleNumber}`}
            title={title}
            description={description}
            facts={[backLabel, plural(sectionsCount, 'section'), duration]}
            noun="section"
            scope="module"
          />
          <ListArea
            heading="Sections"
            count={plural(sectionsCount, 'section')}
            about={aboveGrid}
            aboutTitle="About this module"
            below={belowGrid}
          >
            {children}
          </ListArea>
          <PrevNext
            prevHref={prevModuleHref}
            prevLabel={prevModuleLabel}
            nextHref={nextModuleHref}
            nextLabel={nextModuleLabel}
            noun="module"
          />
        </ListProvider>
      </HubBody>
    </HubPage>
  );
}
