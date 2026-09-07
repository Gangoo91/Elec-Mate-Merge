import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { containerVariants, itemVariants, EmptyState } from '@/components/college/primitives';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';
import type { CollegeLessonPlan } from '@/services/college/collegeLessonPlanService';
import { cn } from '@/lib/utils';

/**
 * Lesson plans — every plan in the college, ranked by date, with the status
 * vocabulary the database actually uses.
 *
 * `college_lesson_plans.status` is CHECK-constrained to lowercase
 * draft / ready / published / delivered / archived. This section used to
 * filter on 'Draft' / 'Published' / 'Approved' / 'Delivered' — none of which
 * ever matched a live row, so every tab but "All" counted 0 — and its
 * "Mark as delivered" wrote 'Delivered', which the constraint rejects.
 * Everything here now compares case-insensitively and writes the lowercase
 * value. ('Approved' / 'Published' are still READ as ready, because older
 * code wrote them before the constraint landed.)
 *
 * `scheduled_date` is a DATE column. Comparing it as a timestamp against
 * "now" made this morning's lesson read as overdue by lunchtime; everything
 * here compares calendar days.
 *
 * Renders CONTENT ONLY under the CollegeDashboard masthead. The Slides row
 * action (added 2026-09-04) is kept as a quiet text control beside the menu.
 */

type LessonRow = CollegeLessonPlan & { scheduled_start_time?: string | null };

type LessonState = 'draft' | 'ready' | 'delivered' | 'archived';

const STATE_LABEL: Record<LessonState, string> = {
  draft: 'Draft',
  ready: 'Ready',
  delivered: 'Delivered',
  archived: 'Archived',
};

function lessonState(status: string | null): LessonState {
  const s = (status ?? 'draft').trim().toLowerCase();
  if (s === 'ready' || s === 'published' || s === 'approved') return 'ready';
  if (s === 'delivered') return 'delivered';
  if (s === 'archived') return 'archived';
  return 'draft';
}

interface ParsedObjective {
  text: string;
  acCodes: string[];
}

/**
 * Parse the `objectives` column on college_lesson_plans. The AI generator
 * writes a JSON array of { text, ac_codes[] } objects; legacy seed rows
 * contain plain strings split by newlines or commas. Handle both.
 */
function parseObjectives(objectives: string | null): ParsedObjective[] {
  if (!objectives) return [];
  const trimmed = objectives.trim();

  // Try JSON first
  if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed
          .map((o: unknown): ParsedObjective | null => {
            if (typeof o === 'string') return { text: o, acCodes: [] };
            if (o && typeof o === 'object') {
              const obj = o as { text?: unknown; ac_codes?: unknown };
              const text = typeof obj.text === 'string' ? obj.text : null;
              const acCodes = Array.isArray(obj.ac_codes)
                ? (obj.ac_codes as unknown[]).filter((v): v is string => typeof v === 'string')
                : [];
              return text ? { text, acCodes } : null;
            }
            return null;
          })
          .filter((o): o is ParsedObjective => o !== null);
      }
    } catch {
      /* fall through to legacy parsing */
    }
  }

  // Legacy: newline-separated
  const byNewline = trimmed
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  if (byNewline.length > 1) return byNewline.map((t) => ({ text: t, acCodes: [] }));

  // Legacy: comma-separated
  return trimmed
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((t) => ({ text: t, acCodes: [] }));
}

/** Local calendar day as YYYY-MM-DD — the shape `scheduled_date` arrives in. */
function localIso(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function fmtDay(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

const CHIP =
  'inline-flex h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-4 text-[12.5px] font-medium transition-colors touch-manipulation';
const CHIP_ON = 'border-white bg-white text-black';
const CHIP_OFF = 'border-white/[0.14] text-white hover:bg-white/[0.06]';
const SEARCH =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white placeholder:opacity-40 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus:outline-none touch-manipulation';
const SELECT =
  'input-underline h-11 w-full appearance-none rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation sm:w-64';
const PRIMARY =
  'inline-flex h-11 w-full items-center justify-center rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-[filter,transform] touch-manipulation hover:brightness-105 active:scale-[0.98] sm:w-auto';
const LIST_CARD = cn(
  '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
  CARD_SURFACE
);

const STATE_ORDER: LessonState[] = ['draft', 'ready', 'delivered', 'archived'];

export function LessonPlansSection() {
  const { lessonPlans, cohorts, staff, updateLessonPlan, addLessonPlan } = useCollegeSupabase();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterState, setFilterState] = useState<LessonState | 'all'>('all');
  const [filterCohort, setFilterCohort] = useState<string>('all');

  const todayIso = localIso(new Date());
  const weekAheadIso = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return localIso(d);
  }, []);

  const plans = lessonPlans as LessonRow[];

  const counts = useMemo(() => {
    const c: Record<LessonState, number> = { draft: 0, ready: 0, delivered: 0, archived: 0 };
    for (const l of plans) c[lessonState(l.status)] += 1;
    return c;
  }, [plans]);

  const isUpcoming = (l: LessonRow) =>
    !!l.scheduled_date && l.scheduled_date >= todayIso && l.scheduled_date <= weekAheadIso;
  const isOverdue = (l: LessonRow) => {
    const state = lessonState(l.status);
    return (
      !!l.scheduled_date &&
      l.scheduled_date < todayIso &&
      state !== 'delivered' &&
      state !== 'archived'
    );
  };

  const overdueCount = plans.filter(isOverdue).length;
  const upcomingCount = plans.filter(isUpcoming).length;

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return plans.filter((lesson) => {
      if (query) {
        const objectivesText = parseObjectives(lesson.objectives)
          .map((o) => o.text)
          .join(' ');
        if (
          !lesson.title.toLowerCase().includes(query) &&
          !objectivesText.toLowerCase().includes(query)
        )
          return false;
      }
      if (filterState !== 'all' && lessonState(lesson.status) !== filterState) return false;
      if (filterCohort !== 'all' && lesson.cohort_id !== filterCohort) return false;
      return true;
    });
  }, [plans, searchQuery, filterState, filterCohort]);

  // Overdue first (cost of delay), then by date; unscheduled last. Cheap
  // enough not to memoise — a college has tens of plans, not thousands.
  const sorted = [...filtered].sort((a, b) => {
    const ao = isOverdue(a) ? 0 : 1;
    const bo = isOverdue(b) ? 0 : 1;
    if (ao !== bo) return ao - bo;
    if (!a.scheduled_date) return 1;
    if (!b.scheduled_date) return -1;
    return a.scheduled_date.localeCompare(b.scheduled_date);
  });

  const getCohortName = (cohortId: string | null) => {
    if (!cohortId) return null;
    return cohorts.find((c) => c.id === cohortId)?.name || 'Cohort missing';
  };
  // college_lesson_plans.tutor_id → college_staff.id (the college row, not the
  // auth uid) — checked against the FK.
  const getTutorName = (tutorId: string | null) => {
    if (!tutorId) return null;
    return staff.find((s) => s.id === tutorId)?.name || null;
  };

  const activeCohorts = cohorts.filter((c) => (c.status ?? '').toLowerCase() === 'active');

  return (
    <>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {plans.length > 0 && (
          <HubKpiRow>
            <HubKpi
              accent
              label="Ready to teach"
              value={String(counts.ready)}
              verdict={counts.ready > 0 ? 'Planned and approved' : 'Nothing marked ready'}
              context={counts.delivered > 0 ? `${counts.delivered} delivered` : undefined}
              onClick={() => setFilterState('ready')}
            />
            <HubKpi
              label="Drafts"
              value={String(counts.draft)}
              verdict={counts.draft > 0 ? 'Finish and mark ready' : 'No drafts'}
              onClick={() => setFilterState('draft')}
            />
            <HubKpi
              label="Overdue"
              value={String(overdueCount)}
              sentiment={overdueCount > 0 ? 'bad' : 'neutral'}
              verdict={
                overdueCount > 0 ? 'Scheduled, never marked delivered' : 'Nothing slipped'
              }
            />
            <HubKpi
              label="Next 7 days"
              value={String(upcomingCount)}
              verdict={upcomingCount > 0 ? 'Scheduled this week' : 'Nothing scheduled'}
            />
          </HubKpiRow>
        )}

        {/* New plans start from a qualification unit — the generator lives
            in the curriculum browser, so this is a navigation. */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => navigate('/college?section=courses')}
            className={PRIMARY}
          >
            New plan
          </button>
        </motion.div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <HubSectionHeading>Plans</HubSectionHeading>
          <span
            className={cn(
              'text-[11px] font-semibold tabular-nums',
              overdueCount > 0 ? 'text-elec-yellow' : 'text-white'
            )}
          >
            {filtered.length === plans.length
              ? `${plans.length}`
              : `${filtered.length} of ${plans.length}`}
          </span>
        </motion.div>

        {plans.length > 0 && (
          <>
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4"
            >
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title or objectives"
                aria-label="Search lesson plans"
                className={SEARCH}
              />
              {activeCohorts.length > 0 && (
                <select
                  value={filterCohort}
                  onChange={(e) => setFilterCohort(e.target.value)}
                  aria-label="Filter by cohort"
                  className={SELECT}
                >
                  <option value="all">All cohorts</option>
                  {activeCohorts.map((cohort) => (
                    <option key={cohort.id} value={cohort.id}>
                      {cohort.name}
                    </option>
                  ))}
                </select>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="-mx-4 flex gap-2 overflow-x-auto px-4 hide-scrollbar sm:mx-0 sm:flex-wrap sm:px-0"
            >
              <button
                type="button"
                onClick={() => setFilterState('all')}
                className={cn(CHIP, filterState === 'all' ? CHIP_ON : CHIP_OFF)}
              >
                All
                <span className="text-[11px] tabular-nums opacity-70">{plans.length}</span>
              </button>
              {STATE_ORDER.filter((s) => s !== 'archived' || counts.archived > 0).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFilterState(s)}
                  className={cn(CHIP, filterState === s ? CHIP_ON : CHIP_OFF)}
                >
                  {STATE_LABEL[s]}
                  <span className="text-[11px] tabular-nums opacity-70">{counts[s]}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}

        {plans.length === 0 ? (
          <motion.div variants={itemVariants}>
            <EmptyState
              title="No lesson plans yet"
              description="Pick a qualification unit in the curriculum browser and generate the first plan from its criteria."
            />
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className={LIST_CARD}>
            {sorted.length === 0 ? (
              <p className="px-4 py-5 text-[12.5px] text-white sm:px-5">
                Nothing matches — clear the search or filters.
              </p>
            ) : (
              <ul className="divide-y divide-white/[0.10]">
                {sorted.map((lesson) => {
                  const objectives = parseObjectives(lesson.objectives);
                  const state = lessonState(lesson.status);
                  const overdue = isOverdue(lesson);
                  const upcoming = isUpcoming(lesson);
                  const openPlan = () => navigate(`/college/lessons/${lesson.id}`);
                  const openSlides = () => navigate(`/college/lessons/${lesson.id}/slides`);

                  const reason = [
                    overdue ? 'Overdue' : upcoming ? 'This week' : null,
                    getCohortName(lesson.cohort_id),
                    getTutorName(lesson.tutor_id),
                    objectives.length > 0
                      ? `${objectives.length} objective${objectives.length === 1 ? '' : 's'}`
                      : null,
                    lesson.duration_minutes ? `${lesson.duration_minutes} min` : null,
                  ]
                    .filter(Boolean)
                    .join(' · ');

                  const trailing = lesson.scheduled_date
                    ? [
                        fmtDay(lesson.scheduled_date),
                        lesson.scheduled_start_time?.slice(0, 5) ?? null,
                      ]
                        .filter(Boolean)
                        .join(' ')
                    : STATE_LABEL[state];

                  return (
                    <li key={lesson.id} className="flex items-center gap-1 pr-2 sm:pr-3">
                      <button
                        type="button"
                        onClick={openPlan}
                        className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            'h-8 w-[3px] shrink-0 rounded-full',
                            overdue ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                          )}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                            {lesson.title}
                          </span>
                          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                            {reason || STATE_LABEL[state]}
                          </span>
                        </span>
                        <span
                          className={cn(
                            'shrink-0 text-right text-[13px] font-semibold tabular-nums',
                            overdue ? 'text-elec-yellow' : 'text-white'
                          )}
                        >
                          <span className="block">{trailing}</span>
                          {lesson.scheduled_date && (
                            <span className="block text-[11px] font-medium">
                              {STATE_LABEL[state]}
                            </span>
                          )}
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                      </button>

                      {/* Slide deck — the deck page owns generation, so this
                          is a plain navigation whether or not a deck exists. */}
                      <button
                        type="button"
                        onClick={openSlides}
                        className="hidden h-11 shrink-0 items-center px-3 text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:text-elec-yellow sm:flex"
                        aria-label={`Slides for ${lesson.title}`}
                      >
                        Slides
                      </button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors touch-manipulation hover:bg-white/[0.06]"
                            aria-label={`Options for ${lesson.title}`}
                          >
                            <span className="text-[18px] leading-none">⋯</span>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-[180px]">
                          <DropdownMenuItem className="h-11 touch-manipulation" onClick={openPlan}>
                            Open plan
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="h-11 touch-manipulation"
                            onClick={openSlides}
                          >
                            Slides
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="h-11 touch-manipulation"
                            onClick={async () => {
                              // Duplicate: clone every editable column, prefix
                              // title with "Copy of", reset status to draft and
                              // wipe the scheduled date so the assessor can
                              // schedule the new copy independently.
                              try {
                                await addLessonPlan({
                                  college_id: lesson.college_id,
                                  title: `Copy of ${lesson.title}`,
                                  cohort_id: lesson.cohort_id,
                                  tutor_id: lesson.tutor_id,
                                  scheduled_date: null,
                                  duration_minutes: lesson.duration_minutes,
                                  objectives: lesson.objectives,
                                  content: lesson.content,
                                  resources: lesson.resources,
                                  status: 'draft',
                                });
                                toast({
                                  title: 'Lesson plan duplicated',
                                  description: `"Copy of ${lesson.title}" is now in your drafts.`,
                                });
                              } catch (e) {
                                toast({
                                  title: 'Duplicate failed',
                                  description: (e as Error).message,
                                  variant: 'destructive',
                                });
                              }
                            }}
                          >
                            Duplicate
                          </DropdownMenuItem>
                          {state !== 'delivered' && (
                            <DropdownMenuItem
                              className="h-11 touch-manipulation"
                              onClick={async () => {
                                try {
                                  // Lowercase — the DB CHECK constraint rejects 'Delivered'.
                                  await updateLessonPlan(lesson.id, { status: 'delivered' });
                                  toast({ title: 'Marked as delivered', description: lesson.title });
                                } catch (e) {
                                  toast({
                                    title: 'Could not update',
                                    description: (e as Error).message,
                                    variant: 'destructive',
                                  });
                                }
                              }}
                            >
                              Mark as delivered
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </li>
                  );
                })}
              </ul>
            )}
          </motion.div>
        )}
      </motion.section>
    </>
  );
}
