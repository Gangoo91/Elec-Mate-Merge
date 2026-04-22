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
  itemVariants,
} from '@/components/college/primitives';

export function CoursesSection() {
  const { courses, cohorts, students } = useCollegeSupabase();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.code || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.awarding_body || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filterLevel === 'all' || (course.level || '') === filterLevel;
    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const getCohortCount = (courseId: string) =>
    cohorts.filter((c) => c.course_id === courseId && c.status === 'Active').length;

  const getStudentCount = (courseId: string) => {
    const courseCohorts = cohorts.filter((c) => c.course_id === courseId);
    return students.filter(
      (s) => s.cohort_id && courseCohorts.some((c) => c.id === s.cohort_id) && s.status === 'Active'
    ).length;
  };

  const activeCount = courses.filter((c) => c.status === 'Active').length;

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Curriculum · Courses"
          title="Qualifications & units"
          description={`${activeCount} active course${activeCount === 1 ? '' : 's'}.`}
          tone="emerald"
          actions={
            <button
              onClick={() =>
                toast({ title: 'Add Course', description: 'Course creation dialog is coming soon.' })
              }
              className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              Add course →
            </button>
          }
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FilterBar
          tabs={[
            { value: 'all', label: 'All', count: courses.length },
            { value: 'Active', label: 'Active', count: activeCount },
            {
              value: 'Draft',
              label: 'Draft',
              count: courses.filter((c) => c.status === 'Draft').length,
            },
            {
              value: 'Archived',
              label: 'Archived',
              count: courses.filter((c) => c.status === 'Archived').length,
            },
          ]}
          activeTab={filterStatus}
          onTabChange={setFilterStatus}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search courses, codes or awarding body…"
          actions={
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="h-10 px-3 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-full text-[13px] text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
            >
              <option value="all">All Levels</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
              <option value="4">Level 4</option>
            </select>
          }
        />
      </motion.div>

      {filteredCourses.length === 0 ? (
        <EmptyState
          title="No courses found"
          description="Try adjusting your filters."
        />
      ) : (
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {filteredCourses.map((course, i) => {
              const cohortCount = getCohortCount(course.id);
              const studentCount = getStudentCount(course.id);
              const levelTone =
                course.level === '2'
                  ? 'blue'
                  : course.level === '3'
                    ? 'yellow'
                    : course.level === '4'
                      ? 'purple'
                      : 'amber';

              return (
                <div
                  key={course.id}
                  className="group relative bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-5 sm:p-6 flex flex-col min-h-[200px]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                        {String(i + 1).padStart(2, '0')} · {course.code || 'Course'}
                      </div>
                      <h3 className="mt-1.5 text-lg font-semibold text-white tracking-tight leading-snug">
                        {course.name}
                      </h3>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="text-white/50 hover:text-white text-[18px] leading-none px-1 touch-manipulation shrink-0"
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
                              title: course.name,
                              description: `${course.awarding_body || 'Unknown'} · Level ${course.level || '?'} · ${course.duration_months} months`,
                            })
                          }
                        >
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-11 touch-manipulation"
                          onClick={() =>
                            toast({ title: 'Edit Course', description: 'Coming soon.' })
                          }
                        >
                          Edit course
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-11 touch-manipulation"
                          onClick={() =>
                            toast({
                              title: 'Cohorts',
                              description: `${cohortCount} active cohort${cohortCount !== 1 ? 's' : ''}.`,
                            })
                          }
                        >
                          View cohorts
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <Pill tone={course.status === 'Active' ? 'green' : course.status === 'Draft' ? 'amber' : 'yellow'}>
                      {course.status}
                    </Pill>
                    <Pill tone={levelTone}>Level {course.level || '?'}</Pill>
                  </div>

                  <div className="mt-3 space-y-1 text-[11.5px] text-white/50">
                    <div className="truncate">{course.awarding_body || 'Awarding body'}</div>
                    <div className="tabular-nums">{course.duration_months} months duration</div>
                  </div>

                  <div className="flex-grow" />

                  <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[12px] text-white/60">
                    <span className="tabular-nums">{cohortCount} cohorts</span>
                    <span className="tabular-nums">{studentCount} students</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </PageFrame>
  );
}
