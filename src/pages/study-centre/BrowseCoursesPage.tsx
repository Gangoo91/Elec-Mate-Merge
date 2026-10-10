/**
 * Browse & search all Study Centre courses.
 *
 * The hub previously sent "Browse courses" straight to the apprentice track,
 * so five of the six things you might have wanted were unreachable from it —
 * you had to already know which of the four tracks a course lived in before
 * you could go looking for it. With 45 courses spread across four tracks
 * that's a filing system, not a way to find something.
 *
 * This is the finder: type what you call it, get the course. Matching runs
 * over titles, descriptions AND a per-course keyword list carrying the
 * qualification codes and trade slang the official titles omit — "2391",
 * "regs", "cherry picker", "car charger". See courseCatalogue.ts.
 *
 * Built from the hub primitives so it reads as part of the Study Centre and
 * not a bolted-on search screen.
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

import { useCourseProgress } from '@/hooks/useCourseProgress';
import { completedSectionsForCourse } from '@/lib/courseProgressMatch';
import useSEO from '@/hooks/useSEO';
import { cn } from '@/lib/utils';
import { CourseTile } from '@/components/study-centre/course-catalogue';

import { HubPage, HubBody, HubMasthead, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { CARD_BASE, CARD_NEUTRAL } from '@/components/ui/card-recipe';
import {
  COURSE_CATALOGUE,
  TRACKS,
  TOTAL_COURSES,
  searchCourses,
  countByTrack,
  type CourseTrack,
} from '@/data/study-centre/courseCatalogue';

type Filter = CourseTrack | 'all';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'apprentice', label: TRACKS.apprentice.short },
  { key: 'upskilling', label: TRACKS.upskilling.short },
  { key: 'general', label: TRACKS.general.short },
  { key: 'personal', label: TRACKS.personal.short },
];

export default function BrowseCoursesPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const { allProgress } = useCourseProgress();

  useSEO({
    // useSEO appends "| Elec-Mate" itself — including it here produced
    // "Browse courses | Study Centre | Elec-Mate | Elec-Mate".
    title: 'Browse courses | Study Centre',
    description:
      'Search every Elec-Mate course — apprenticeship training, BS 7671, inspection and testing, EV charging, site safety and personal development.',
  });

  const results = useMemo(() => searchCourses(query, filter), [query, filter]);

  // Sections completed per course, so a card can say whether this is something
  // you've started rather than making you open it to find out.
  const progressFor = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of COURSE_CATALOGUE) {
      map[c.id] = completedSectionsForCourse(allProgress, c.routeKey);
    }
    return map;
  }, [allProgress]);

  const counts = useMemo(
    () => ({
      all: TOTAL_COURSES,
      apprentice: countByTrack('apprentice'),
      upskilling: countByTrack('upskilling'),
      general: countByTrack('general'),
      personal: countByTrack('personal'),
    }),
    []
  );

  const trimmed = query.trim();

  return (
    <HubPage>
      <HubMasthead section="Learning" title="Browse courses" backTo="/study-centre" />

      <HubBody>
        {/* Search — the reason this page exists, so it goes first and nothing
            competes with it. */}
        <div className="space-y-3">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${TOTAL_COURSES} courses — try “2391”, “EV”, “cherry picker”`}
              aria-label="Search courses"
              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] pl-11 pr-11 text-base text-white placeholder:text-white/40 caret-elec-yellow transition-colors hover:border-white/20 focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation [color-scheme:dark] [&::-webkit-search-cancel-button]:hidden"
            />
            {trimmed.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white transition-colors hover:text-elec-yellow focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 touch-manipulation"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Track filters. Counts are on the chips because "Safety 15" answers
              "is it worth looking in here" before you tap it. */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  aria-pressed={active}
                  className={cn(
                    'inline-flex h-11 items-center gap-1.5 rounded-full border px-4 text-[13px] transition-colors touch-manipulation',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50',
                    active
                      ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                      : 'border-white/[0.12] bg-white/[0.05] font-medium text-white hover:border-white/[0.25] active:bg-white/[0.1]'
                  )}
                >
                  {f.label}
                  <span className="tabular-nums">{counts[f.key]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <section className="space-y-3">
          <HubSectionHeading>
            {trimmed
              ? `${results.length} ${results.length === 1 ? 'result' : 'results'} for “${trimmed}”`
              : filter === 'all'
                ? `All ${TOTAL_COURSES} courses`
                : TRACKS[filter].label}
          </HubSectionHeading>

          {results.length === 0 ? (
            /* A dead end is where people give up, so say what to do next
               rather than just reporting zero. */
            <div className={cn(CARD_BASE, CARD_NEUTRAL, 'p-6 text-center')}>
              <p className="text-[15px] font-semibold text-white">Nothing matches “{trimmed}”</p>
              <p className="mt-1.5 text-[13px] text-white">
                Try a qualification code like “2391”, a topic like “solar”, or clear the search to
                see all {TOTAL_COURSES} courses.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setFilter('all');
                }}
                className="mt-4 inline-flex h-11 items-center rounded-xl bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 touch-manipulation"
              >
                Show all courses
              </button>
            </div>
          ) : (
            <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
              {results.map((c) => (
                <CourseTile
                  key={c.id}
                  c={{
                    id: c.id,
                    title: c.title,
                    description: c.description,
                    level: `${TRACKS[c.track].short} · ${c.level}`,
                    duration: c.duration,
                    to: c.path,
                    done: progressFor[c.id] ?? 0,
                    badge: c.inDevelopment ? 'In review' : undefined,
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </HubBody>
    </HubPage>
  );
}
