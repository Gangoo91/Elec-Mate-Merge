/**
 * Study-centre shells — the editorial wrappers shared by every
 * course landing page, module landing page and section content page.
 *
 * Why a shell layer? Each course has its own data (modules, sections,
 * tones) but the page chrome (back-pill, hero, stat strip, grid frame)
 * should be identical. The shells let every page collapse to ~50 lines
 * of data + a single component, while the chrome stays consistent.
 */

import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import {
  PageFrame,
  PageHero,
  StatStrip,
  Eyebrow,
  type Tone,
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';

/* ── Back-to-X pill — shared across all study-centre pages ────────── */

interface BackPillProps {
  to: string;
  label: string;
}

function BackPill({ to, label }: BackPillProps) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
    >
      <ArrowLeft className="h-4 w-4" /> {label}
    </button>
  );
}

/* ── Page background wrapper ──────────────────────────────────────── */

function StudyPage({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>{children}</PageFrame>
      </div>
    </div>
  );
}

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

export function CourseShell({
  backTo,
  backLabel,
  eyebrow,
  title,
  description,
  tone = 'yellow',
  modulesCount,
  pagesCount = '200+',
  totalDuration,
  level,
  children,
}: CourseShellProps) {
  return (
    <StudyPage>
      <BackPill to={backTo} label={backLabel} />
      <PageHero
        eyebrow={level ? `${eyebrow} · ${level}` : eyebrow}
        title={title}
        description={description}
        tone={tone}
      />
      <StatStrip
        columns={4}
        stats={[
          { label: 'Modules', value: modulesCount, sub: 'Including final' },
          { label: 'Pages', value: pagesCount, sub: 'Reading material' },
          { label: 'Total time', value: totalDuration, sub: 'Self-paced' },
          { label: 'Level', value: level ?? 'All', sub: 'Difficulty' },
        ]}
      />
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 px-0.5">
          <Eyebrow>Course modules</Eyebrow>
          <span className="text-[11px] text-white">{modulesCount} total</span>
        </div>
        <div
          className={cn(
            'grid gap-[1.5px] bg-black border border-white/[0.06] rounded-2xl overflow-hidden',
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          )}
        >
          {children}
        </div>
      </div>
    </StudyPage>
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
}: SectionShellProps) {
  const navigate = useNavigate();
  return (
    <StudyPage>
      <BackPill to={backTo} label={backLabel} />
      <PageHero
        eyebrow={`Module ${moduleNumber} · Section ${sectionNumber}${
          duration ? ` · ${duration}` : ''
        }`}
        title={title}
        description={description}
        tone={tone}
      />
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 px-0.5">
          <Eyebrow>Subsections</Eyebrow>
          <span className="text-[11px] text-white">{subsectionsCount} total</span>
        </div>
        <div
          className={cn(
            'grid gap-[1.5px] bg-black border border-white/[0.06] rounded-2xl overflow-hidden',
            'grid-cols-1 sm:grid-cols-2'
          )}
        >
          {children}
        </div>
      </div>

      {(prevSectionHref || nextSectionHref) && (
        <div className="grid grid-cols-2 gap-3 pt-2">
          {prevSectionHref ? (
            <button
              onClick={() => navigate(prevSectionHref)}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
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
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-white">
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
    </StudyPage>
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
}: ModuleShellProps) {
  const navigate = useNavigate();
  return (
    <StudyPage>
      <BackPill to={backTo} label={backLabel} />
      <PageHero
        eyebrow={`Module ${moduleNumber}${duration ? ` · ${duration}` : ''}${
          sectionsCount ? ` · ${sectionsCount} sections` : ''
        }`}
        title={title}
        description={description}
        tone={tone}
      />
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 px-0.5">
          <Eyebrow>Sections</Eyebrow>
          <span className="text-[11px] text-white">{sectionsCount} total</span>
        </div>
        <div
          className={cn(
            'grid gap-[1.5px] bg-black border border-white/[0.06] rounded-2xl overflow-hidden',
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          )}
        >
          {children}
        </div>
      </div>

      {/* Prev/next module nav — shown when adjacent modules exist */}
      {(prevModuleHref || nextModuleHref) && (
        <div className="grid grid-cols-2 gap-3 pt-2">
          {prevModuleHref ? (
            <button
              onClick={() => navigate(prevModuleHref)}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
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
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-white">
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
    </StudyPage>
  );
}
