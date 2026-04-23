import { useState } from 'react';
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
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';

function parseObjectives(objectives: string | null): string[] {
  if (!objectives) return [];
  const byNewline = objectives
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  if (byNewline.length > 1) return byNewline;
  return objectives
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function LessonPlansSection() {
  const { lessonPlans, cohorts, staff, updateLessonPlan } = useCollegeSupabase();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCohort, setFilterCohort] = useState<string>('all');

  const filteredLessons = lessonPlans.filter((lesson) => {
    const query = searchQuery.toLowerCase();
    const objectivesStr = lesson.objectives ?? '';
    const matchesSearch =
      lesson.title.toLowerCase().includes(query) || objectivesStr.toLowerCase().includes(query);
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

  const statusTone = (status: string | null) => {
    switch (status) {
      case 'Published':
      case 'Approved':
        return 'green' as const;
      case 'Draft':
        return 'amber' as const;
      case 'Delivered':
        return 'blue' as const;
      default:
        return 'yellow' as const;
    }
  };
  const statusLabel = (status: string | null) => (status === 'Approved' ? 'Published' : status ?? 'Unknown');

  const getCohortName = (cohortId: string | null) =>
    !cohortId ? 'Unknown' : cohorts.find((c) => c.id === cohortId)?.name || 'Unknown';
  const getTutorName = (tutorId: string | null) =>
    !tutorId ? 'Unknown' : staff.find((s) => s.id === tutorId)?.name || 'Unknown';

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
              onClick={() =>
                toast({
                  title: 'New Lesson Plan',
                  description: 'Lesson plan creation is coming soon.',
                })
              }
              className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
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
              className="h-10 px-3 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-full text-[13px] text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
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
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-[15px] font-medium text-white truncate">
                            {lesson.title}
                          </h3>
                          {upcoming && <Pill tone="blue">Upcoming</Pill>}
                          {past && <Pill tone="amber">Overdue</Pill>}
                        </div>
                        <div className="mt-0.5 text-[11.5px] text-white/75 truncate">
                          {getCohortName(lesson.cohort_id)} · {getTutorName(lesson.tutor_id)}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Pill tone={tone}>{statusLabel(lesson.status)}</Pill>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              className="text-white/75 hover:text-white text-[18px] leading-none px-1 touch-manipulation"
                              aria-label="Options"
                            >
                              ⋯
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="h-11 touch-manipulation"
                              onClick={() =>
                                toast({
                                  title: lesson.title,
                                  description:
                                    objectives.length > 0
                                      ? `Objectives: ${objectives.join(', ')}`
                                      : 'No objectives set.',
                                })
                              }
                            >
                              View plan
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="h-11 touch-manipulation"
                              onClick={() => toast({ title: 'Edit Plan', description: 'Coming soon.' })}
                            >
                              Edit plan
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="h-11 touch-manipulation"
                              onClick={() => toast({ title: 'Duplicate', description: 'Coming soon.' })}
                            >
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="h-11 touch-manipulation"
                              onClick={async () => {
                                await updateLessonPlan(lesson.id, { status: 'Delivered' });
                                toast({ title: 'Marked as Delivered', description: lesson.title });
                              }}
                            >
                              Mark as delivered
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {objectives.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {objectives.slice(0, 3).map((obj, i) => (
                          <span
                            key={i}
                            className="text-[11px] text-white/60 bg-white/[0.04] border border-white/[0.06] rounded px-1.5 py-0.5"
                          >
                            {obj.length > 40 ? obj.substring(0, 40) + '…' : obj}
                          </span>
                        ))}
                        {objectives.length > 3 && (
                          <span className="text-[11px] text-white/70 px-1.5 py-0.5">
                            +{objectives.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white/75">
                      <span className="tabular-nums">{lesson.duration_minutes ?? 0} mins</span>
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
