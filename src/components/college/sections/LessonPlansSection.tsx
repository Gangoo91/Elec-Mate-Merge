import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  PageFrame,
  PageHero,
  FilterBar,
  EmptyState,
  Pill,
  ListCard,
  itemVariants,
  toneDot,
  statusTone as lessonStatusTone,
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';

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
                ? (obj.ac_codes as unknown[]).filter(
                    (v): v is string => typeof v === 'string'
                  )
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

export function LessonPlansSection() {
  const { lessonPlans, cohorts, staff, updateLessonPlan, addLessonPlan } = useCollegeSupabase();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCohort, setFilterCohort] = useState<string>('all');

  const filteredLessons = lessonPlans.filter((lesson) => {
    const query = searchQuery.toLowerCase();
    const objectives = parseObjectives(lesson.objectives);
    const objectivesText = objectives.map((o) => o.text).join(' ');
    const matchesSearch =
      lesson.title.toLowerCase().includes(query) || objectivesText.toLowerCase().includes(query);
    const matchesStatus =
      filterStatus === 'all' ||
      lesson.status === filterStatus ||
      (filterStatus === 'Published' && lesson.status === 'Approved') ||
      (filterStatus === 'Approved' && lesson.status === 'Published');
    const matchesCohort = filterCohort === 'all' || lesson.cohort_id === filterCohort;
    return matchesSearch && matchesStatus && matchesCohort;
  });

  const sortedLessons = [...filteredLessons].sort((a, b) => {
    if (!a.scheduled_date) return 1;
    if (!b.scheduled_date) return -1;
    return new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime();
  });

  // Route status → canonical lesson tone (Approved is the DB alias for Published).
  const statusTone = (status: string | null) =>
    lessonStatusTone('lesson', status === 'Approved' ? 'Published' : status);
  const statusLabel = (status: string | null) => (status === 'Approved' ? 'Published' : status ?? 'Unknown');

  const getCohortName = (cohortId: string | null) => {
    if (!cohortId) return 'No cohort';
    return cohorts.find((c) => c.id === cohortId)?.name || 'Cohort missing';
  };
  const getTutorName = (tutorId: string | null) => {
    if (!tutorId) return null;
    return staff.find((s) => s.id === tutorId)?.name || null;
  };

  const isUpcoming = (date?: string | null) => {
    if (!date) return false;
    const lessonDate = new Date(date);
    const today = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    return lessonDate >= today && lessonDate <= weekFromNow;
  };
  const isPastUndelivered = (lesson: { scheduled_date: string | null; status: string | null }) =>
    lesson.scheduled_date && new Date(lesson.scheduled_date) < new Date() && lesson.status !== 'Delivered';

  const publishedCount = lessonPlans.filter(
    (l) => l.status === 'Published' || l.status === 'Approved'
  ).length;

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Curriculum · Lesson Plans"
          title="Plans & delivery"
          description={`${publishedCount} published lesson plan${publishedCount === 1 ? '' : 's'}.`}
          tone="blue"
          actions={
            <button
              onClick={() => navigate('/college?section=courses')}
              className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
              title="Pick a qualification and unit to generate a new lesson plan"
            >
              New plan →
            </button>
          }
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FilterBar
          tabs={[
            { value: 'all', label: 'All', count: lessonPlans.length },
            { value: 'Draft', label: 'Draft', count: lessonPlans.filter((l) => l.status === 'Draft').length },
            { value: 'Published', label: 'Published', count: publishedCount },
            { value: 'Delivered', label: 'Delivered', count: lessonPlans.filter((l) => l.status === 'Delivered').length },
          ]}
          activeTab={filterStatus}
          onTabChange={setFilterStatus}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search title or objectives…"
          actions={
            <select
              value={filterCohort}
              onChange={(e) => setFilterCohort(e.target.value)}
              className="h-10 px-3 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-full text-[13px] text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation data-[state=open]:border-elec-yellow/60"
            >
              <option value="all">All Cohorts</option>
              {cohorts
                .filter((c) => c.status === 'Active')
                .map((cohort) => (
                  <option key={cohort.id} value={cohort.id}>
                    {cohort.name}
                  </option>
                ))}
            </select>
          }
        />
      </motion.div>

      {sortedLessons.length === 0 ? (
        <EmptyState
          title="No lesson plans found"
          description="Try adjusting filters, or create a new lesson plan."
        />
      ) : (
        <motion.div variants={itemVariants}>
          <ListCard>
            {sortedLessons.map((lesson) => {
              const objectives = parseObjectives(lesson.objectives);
              const upcoming = isUpcoming(lesson.scheduled_date);
              const past = isPastUndelivered(lesson);
              const tone = statusTone(lesson.status);

              const cohortName = getCohortName(lesson.cohort_id);
              const tutorName = getTutorName(lesson.tutor_id);
              const subtitleParts = [cohortName, tutorName].filter(Boolean) as string[];
              const openPlan = () => navigate(`/college/lessons/${lesson.id}`);

              return (
                <div
                  key={lesson.id}
                  className="group flex items-start gap-4 px-5 sm:px-6 py-5 hover:bg-[hsl(0_0%_15%)] transition-colors"
                >
                  <span
                    aria-hidden
                    className={cn(
                      'w-[3px] self-stretch rounded-full shrink-0',
                      upcoming
                        ? 'bg-blue-400'
                        : past
                          ? 'bg-amber-400'
                          : toneDot[tone]
                    )}
                  />
                  <button
                    type="button"
                    onClick={openPlan}
                    className="flex-1 min-w-0 text-left touch-manipulation"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-[15px] font-medium text-white truncate">
                            {lesson.title}
                          </h3>
                          {upcoming && <Pill tone="blue">Upcoming</Pill>}
                          {past && <Pill tone="amber">Overdue</Pill>}
                        </div>
                        <div className="mt-0.5 text-[11.5px] text-white truncate">
                          {subtitleParts.length > 0
                            ? subtitleParts.join(' · ')
                            : 'Unscheduled'}
                        </div>
                      </div>
                    </div>

                    {objectives.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {objectives.slice(0, 3).map((o, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-[12px] text-white leading-relaxed"
                          >
                            <span
                              className="mt-[7px] h-1 w-1 rounded-full bg-elec-yellow/70 shrink-0"
                              aria-hidden
                            />
                            <span className="flex-1">
                              {o.text.length > 90
                                ? o.text.slice(0, 90) + '…'
                                : o.text}
                              {o.acCodes.length > 0 && (
                                <span className="ml-2 text-[10.5px] font-mono tabular-nums text-elec-yellow/80">
                                  AC {o.acCodes.join(' · ')}
                                </span>
                              )}
                            </span>
                          </li>
                        ))}
                        {objectives.length > 3 && (
                          <li className="ml-3 text-[11px] text-white">
                            +{objectives.length - 3} more
                          </li>
                        )}
                      </ul>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white/65">
                      <span className="tabular-nums">
                        {lesson.duration_minutes ?? 0} min
                      </span>
                      {lesson.scheduled_date && (
                        <span className="tabular-nums">
                          {new Date(lesson.scheduled_date).toLocaleDateString('en-GB', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                      )}
                      <span className="tabular-nums">
                        {lesson.resources?.length || 0} resources
                      </span>
                    </div>
                  </button>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <Pill tone={tone}>
                      {statusLabel(lesson.status)}
                    </Pill>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="h-9 w-9 rounded-full flex items-center justify-center text-white hover:text-white hover:bg-white/[0.06] transition-colors touch-manipulation"
                          aria-label="Options"
                        >
                          <span className="text-[15px] font-semibold tracking-[0.12em]">
                            ⋯
                          </span>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-[hsl(0_0%_11%)] border border-white/[0.08] text-white min-w-[180px]"
                      >
                        <DropdownMenuItem
                          className="h-11 touch-manipulation text-[13px]"
                          onClick={openPlan}
                        >
                          Open plan
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-11 touch-manipulation text-[13px]"
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
                        <DropdownMenuItem
                          className="h-11 touch-manipulation text-[13px]"
                          onClick={async () => {
                            await updateLessonPlan(lesson.id, { status: 'Delivered' });
                            toast({ title: 'Marked as delivered', description: lesson.title });
                          }}
                        >
                          Mark as delivered
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </ListCard>
        </motion.div>
      )}
    </PageFrame>
  );
}
