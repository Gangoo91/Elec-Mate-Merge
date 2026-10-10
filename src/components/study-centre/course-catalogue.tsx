/**
 * Course catalogue — the Study Centre's course lists (10 Oct 2026):
 * Apprentice training, Professional upskilling, General upskilling and
 * Personal development. Same language as the course pages (./course-kit):
 * a header that says where you are and the one thing to do next, the courses
 * you've started first, then every course as a card with its level, length
 * and your progress.
 *
 * Replaces HubToolGrid + a KPI row on those pages. HubToolGrid stays as it is
 * for the rest of the app's hubs.
 */
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { ListHeading } from '@/components/study-centre/course-kit';

export interface CatalogueCourse {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  to: string;
  /** Sections finished in it. */
  done: number;
  /** e.g. "Your qualification · 5357-03": shown in volt, it's news. */
  tag?: string;
  /** e.g. "In review": shown neutral. */
  badge?: string;
}

const LEVEL_ORDER = ['Foundation', 'Essential', 'Intermediate', 'Advanced', 'Specialist'];
const rank = (l: string) => (LEVEL_ORDER.includes(l) ? LEVEL_ORDER.indexOf(l) : 50);

export function CourseTile({ c, next = false }: { c: CatalogueCourse; next?: boolean }) {
  const started = c.done > 0;
  return (
    <Link
      to={c.to}
      className={cn(
        'group flex min-w-0 flex-col rounded-2xl border bg-white/[0.04] p-4 transition-colors touch-manipulation sm:p-5',
        next ? 'border-elec-yellow' : 'border-white/[0.12]',
        'active:scale-[0.99] active:bg-white/[0.08] sm:hover:border-white/[0.3] sm:hover:bg-white/[0.06]'
      )}
    >
      <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="text-[12.5px] font-medium text-white">
          {c.level} · {c.duration}
        </span>
        {c.badge && (
          <span className="rounded-full border border-white/[0.3] px-2 py-0.5 text-[11.5px] font-semibold text-white">
            {c.badge}
          </span>
        )}
        {next && (
          <span className="rounded-full bg-elec-yellow px-2 py-0.5 text-[11.5px] font-bold text-black">
            Next up
          </span>
        )}
      </span>
      <span className="mt-1.5 text-[17px] font-bold leading-snug tracking-tight text-white">
        {c.title}
      </span>
      {c.tag && <span className="mt-1 text-[12.5px] font-semibold text-elec-yellow">{c.tag}</span>}
      <span className="mt-1.5 line-clamp-2 text-[13.5px] leading-snug text-white">
        {c.description}
      </span>
      <span className="flex-1" />
      <span className="mt-3 flex items-center justify-between gap-2">
        <span
          className={cn('text-[13px] font-semibold', started ? 'text-emerald-400' : 'text-white')}
        >
          {started ? `${c.done} ${c.done === 1 ? 'section' : 'sections'} done` : 'Not started'}
        </span>
        <span className="inline-flex items-center gap-0.5 text-[13px] font-semibold text-white">
          {started ? 'Continue' : 'Open'}
          <ChevronRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </span>
    </Link>
  );
}

export function CatalogueShell({
  title,
  description,
  courses,
  backTo = '/study-centre',
  notice,
}: {
  title: string;
  description: string;
  courses: CatalogueCourse[];
  backTo?: string;
  notice?: React.ReactNode;
}) {
  const navigate = useNavigate();
  const levels = useMemo(
    () => [...new Set(courses.map((c) => c.level))].sort((a, b) => rank(a) - rank(b)),
    [courses]
  );
  const [level, setLevel] = useState<string | null>(null);

  const started = courses.filter((c) => c.done > 0);
  // Continue the one you've done most in; otherwise start the first listed
  // (the apprentice list puts your own qualification first).
  const target = started.length
    ? [...started].sort((a, b) => b.done - a.done)[0]
    : (courses.find((c) => !c.badge) ?? courses[0]);
  const shown = level ? courses.filter((c) => c.level === level) : courses;
  const halfDay = courses.filter((c) => /half/i.test(c.duration)).length;

  return (
    <HubPage ground="landing">
      <HubMasthead section="Study Centre" title={title} backTo={backTo} />
      <HubBody>
        {/* ── Header ── */}
        <section className="relative -mx-4 overflow-hidden card-landing max-sm:!rounded-none max-sm:!border-x-0 px-5 py-6 sm:mx-0 sm:rounded-3xl sm:px-8 sm:py-8">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/70 to-elec-yellow/0"
          />
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-end lg:gap-x-10">
            <div className="min-w-0">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                Study Centre
              </p>
              <h1 className="mt-1.5 text-[28px] font-bold leading-[1.1] tracking-tight text-white sm:text-[38px]">
                {title}
              </h1>
              <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-white">
                {description}
              </p>
              <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[13px] font-medium text-white">
                {[
                  `${courses.length} courses`,
                  levels.length > 1 ? `${levels[0]} to ${levels[levels.length - 1]}` : levels[0],
                  halfDay ? `${halfDay} half-day` : null,
                ]
                  .filter(Boolean)
                  .map((f, i) => (
                    <span key={i} className="inline-flex items-center gap-3">
                      {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-white/40" />}
                      {f}
                    </span>
                  ))}
              </p>
              {notice && <div className="mt-4">{notice}</div>}
            </div>
            {target && (
              <div className="min-w-0 space-y-3">
                <p className="text-[13.5px] font-semibold text-white">
                  {started.length
                    ? `You've started ${started.length} of ${courses.length}`
                    : 'Not started any yet'}
                </p>
                <button
                  type="button"
                  onClick={() => navigate(target.to)}
                  className="flex min-h-[52px] w-full items-center justify-between gap-3 rounded-xl bg-elec-yellow px-4 py-2.5 text-left text-black transition-transform touch-manipulation active:scale-[0.99]"
                >
                  <span className="min-w-0">
                    <span className="block text-[15px] font-bold leading-tight">
                      {started.length ? 'Continue' : 'Start with'}
                    </span>
                    <span className="mt-0.5 block truncate text-[12.5px] font-medium">
                      {target.title}
                    </span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── In progress ── */}
        {started.length > 0 && (
          <section className="space-y-3" aria-labelledby="cat-started">
            <div id="cat-started">
              <ListHeading title="In progress" count={`${started.length} started`} />
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
              {started.map((c) => (
                <CourseTile key={c.id} c={c} next={c.id === target?.id} />
              ))}
            </div>
          </section>
        )}

        {/* ── Every course ── */}
        <section className="space-y-3" aria-labelledby="cat-all">
          <div id="cat-all">
            <ListHeading
              title={started.length ? 'All courses' : 'Courses'}
              count={`${shown.length} ${shown.length === 1 ? 'course' : 'courses'}`}
            />
          </div>
          {levels.length > 1 && (
            <div role="group" aria-label="Level" className="flex flex-wrap gap-2">
              {[null, ...levels].map((l) => (
                <button
                  key={l ?? 'all'}
                  type="button"
                  aria-pressed={level === l}
                  onClick={() => setLevel(l)}
                  className={chipCn(level === l)}
                >
                  {l ?? 'All levels'}
                </button>
              ))}
            </div>
          )}
          <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
            {shown.map((c) => (
              <CourseTile key={c.id} c={c} next={!started.length && c.id === target?.id} />
            ))}
          </div>
        </section>
      </HubBody>
    </HubPage>
  );
}
