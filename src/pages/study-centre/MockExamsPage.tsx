/**
 * Mock exams — every in-app paper in one place.
 *
 * The papers were always there, one per course, sitting in the final module of
 * each. Nothing listed them together, so "give me a paper to sit" meant
 * remembering which course owned the exam you wanted and scrolling to the
 * bottom of it. This page is the index that was missing.
 *
 * The free public papers at /mock-exams are a different catalogue for a
 * different audience (no sign-up, SEO entry point) and are deliberately not
 * merged in here.
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

import useSEO from '@/hooks/useSEO';
import { cn } from '@/lib/utils';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubToolGrid,
  type HubTool,
} from '@/components/hub/HubPrimitives';
import {
  IN_APP_MOCK_EXAMS,
  MOCK_EXAM_TRACKS,
  TOTAL_IN_APP_MOCK_EXAMS,
  type MockExamTrack,
} from '@/data/study-centre/inAppMockExams';

type Filter = 'all' | MockExamTrack;

export default function MockExamsPage() {
  useSEO({
    title: 'Mock Exams | Study Centre | Elec-Mate',
    description:
      'Every practice paper in the Elec-Mate study centre — Level 2 and Level 3, AM2, HNC, MOET, 18th Edition, inspection and testing, and the safety card tests.',
  });

  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const search = query.trim().toLowerCase();

  // Search spans title, course and description so "2391", "level 2" and
  // "fault" all land somewhere sensible.
  const matches = useMemo(
    () =>
      IN_APP_MOCK_EXAMS.filter((exam) => {
        if (filter !== 'all' && exam.track !== filter) return false;
        if (!search) return true;
        return (
          exam.title.toLowerCase().includes(search) ||
          exam.course.toLowerCase().includes(search) ||
          exam.description.toLowerCase().includes(search)
        );
      }),
    [filter, search]
  );

  const groups = useMemo(
    () =>
      MOCK_EXAM_TRACKS.map((track) => ({
        ...track,
        cards: matches
          .filter((exam) => exam.track === track.id)
          .map<HubTool>((exam) => ({
            id: exam.id,
            title: exam.title,
            description: exam.description,
            meta: exam.course,
            // onClick rather than `to` so the paper learns where it was opened
            // from. A paper reached from here used to exit into its parent
            // course — a place the learner had never been.
            onClick: () =>
              navigate(exam.path, {
                state: { from: '/study-centre/mock-exams', label: 'mock exams' },
              }),
          })),
      })).filter((group) => group.cards.length > 0),
    [matches, navigate]
  );

  const chips: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: 'All papers', count: TOTAL_IN_APP_MOCK_EXAMS },
    ...MOCK_EXAM_TRACKS.map((t) => ({
      id: t.id as Filter,
      label: t.label.replace(' & site cards', '').replace(' papers', ''),
      count: IN_APP_MOCK_EXAMS.filter((e) => e.track === t.id).length,
    })),
  ];

  return (
    <HubPage>
      <HubMasthead section="Study centre" title="Mock exams" backTo="/study-centre" />

      <HubBody>
        <p className="max-w-[70ch] text-[14px] leading-relaxed text-white">
          Every practice paper built into your courses, in one place. Each one draws a fresh random
          selection from its course question bank, so you can sit the same paper more than once and
          get a different set. Wrong answers are added to your revision pile automatically.
        </p>

        {/* Filter + search. Chips beat a select here — five options, and on a
            phone a chip row is one tap where a picker is three. */}
        <div className="space-y-3">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
            {chips.map((chip) => {
              const active = filter === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setFilter(chip.id)}
                  className={cn(
                    'flex h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 text-[13px] touch-manipulation transition-colors',
                    active
                      ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                      : 'border-white/[0.12] bg-white/[0.06] font-medium text-white hover:bg-white/[0.1]'
                  )}
                >
                  {chip.label}
                  <span className={cn('tabular-nums', active ? 'text-black/70' : 'text-white')}>
                    {chip.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative">
            <Search
              className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search papers — 2391, level 2, fault finding…"
              aria-label="Search mock exams"
              className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-7 pr-9 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 focus-visible:ring-0 touch-manipulation [color-scheme:dark]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-0 top-1/2 flex h-11 w-9 -translate-y-1/2 items-center justify-center text-white touch-manipulation"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {groups.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] p-6 text-center">
            <p className="text-[15px] font-semibold text-white">No papers match that search</p>
            <p className="mt-1.5 text-[13px] text-white">
              Try a course name, a qualification number, or clear the filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setFilter('all');
              }}
              className="mt-4 inline-flex h-11 items-center rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black touch-manipulation"
            >
              Show all {TOTAL_IN_APP_MOCK_EXAMS} papers
            </button>
          </div>
        ) : (
          groups.map((group) => (
            <div key={group.id} className="space-y-2">
              <HubToolGrid label={group.label} cards={group.cards} columns="four" />
              <p className="px-0.5 text-[12px] text-white">{group.blurb}</p>
            </div>
          ))
        )}
      </HubBody>
    </HubPage>
  );
}
