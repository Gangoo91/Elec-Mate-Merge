import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCollege } from '@/contexts/CollegeContext';
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
import { cn } from '@/lib/utils';

const mockSchemesOfWork = [
  {
    id: 'sow-1',
    title: 'Level 3 Electrical Installation - Year 1',
    courseId: 'course-1',
    courseName: 'Electrical Installation Level 3',
    academicYear: '2024/25',
    totalWeeks: 36,
    completedWeeks: 12,
    status: 'Active',
    createdBy: 'staff-1',
    createdByName: 'John Smith',
    lastUpdated: '2024-01-10',
    units: [
      { name: 'Health & Safety', weeks: 4, completed: true },
      { name: 'Electrical Science', weeks: 8, completed: true },
      { name: 'Installation Methods', weeks: 10, completed: false },
      { name: 'Testing & Inspection', weeks: 8, completed: false },
      { name: 'Fault Diagnosis', weeks: 6, completed: false },
    ],
  },
  {
    id: 'sow-2',
    title: 'Level 2 Electrical Fundamentals',
    courseId: 'course-2',
    courseName: 'Electrical Installation Level 2',
    academicYear: '2024/25',
    totalWeeks: 32,
    completedWeeks: 14,
    status: 'Active',
    createdBy: 'staff-2',
    createdByName: 'Sarah Johnson',
    lastUpdated: '2024-01-08',
    units: [
      { name: 'Introduction to Electrical', weeks: 6, completed: true },
      { name: 'Basic Circuits', weeks: 8, completed: true },
      { name: 'Wiring Systems', weeks: 10, completed: false },
      { name: 'Safety Practices', weeks: 8, completed: false },
    ],
  },
  {
    id: 'sow-3',
    title: 'Level 3 AM2 Preparation',
    courseId: 'course-1',
    courseName: 'Electrical Installation Level 3',
    academicYear: '2024/25',
    totalWeeks: 12,
    completedWeeks: 0,
    status: 'Draft',
    createdBy: 'staff-1',
    createdByName: 'John Smith',
    lastUpdated: '2024-01-05',
    units: [
      { name: 'AM2 Overview', weeks: 2, completed: false },
      { name: 'Practical Skills Review', weeks: 4, completed: false },
      { name: 'Mock Assessments', weeks: 4, completed: false },
      { name: 'Final Preparation', weeks: 2, completed: false },
    ],
  },
];

export function SchemesOfWorkSection() {
  const { courses } = useCollege();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCourse, setFilterCourse] = useState<string>('all');

  const filteredSchemes = mockSchemesOfWork.filter((scheme) => {
    const matchesSearch =
      scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || scheme.status === filterStatus;
    const matchesCourse = filterCourse === 'all' || scheme.courseId === filterCourse;
    return matchesSearch && matchesStatus && matchesCourse;
  });

  const activeCount = mockSchemesOfWork.filter((s) => s.status === 'Active').length;

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Curriculum · Schemes of Work"
          title="Scheme planning"
          description={`${activeCount} active scheme${activeCount === 1 ? '' : 's'} of work across courses.`}
          tone="emerald"
          actions={
            <button className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap">
              New scheme →
            </button>
          }
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FilterBar
          tabs={[
            { value: 'all', label: 'All', count: mockSchemesOfWork.length },
            { value: 'Active', label: 'Active', count: activeCount },
            {
              value: 'Draft',
              label: 'Draft',
              count: mockSchemesOfWork.filter((s) => s.status === 'Draft').length,
            },
            {
              value: 'Archived',
              label: 'Archived',
              count: mockSchemesOfWork.filter((s) => s.status === 'Archived').length,
            },
          ]}
          activeTab={filterStatus}
          onTabChange={setFilterStatus}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search schemes…"
          actions={
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="h-10 px-3 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-full text-[13px] text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
            >
              <option value="all">All Courses</option>
              {courses
                .filter((c) => c.status === 'Active')
                .map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
            </select>
          }
        />
      </motion.div>

      {filteredSchemes.length === 0 ? (
        <EmptyState title="No schemes found" description="Try adjusting filters." />
      ) : (
        <motion.div variants={itemVariants} className="space-y-4">
          {filteredSchemes.map((scheme) => {
            const progressPercent = Math.round((scheme.completedWeeks / scheme.totalWeeks) * 100);
            const tone =
              scheme.status === 'Active'
                ? 'green'
                : scheme.status === 'Draft'
                  ? 'amber'
                  : 'yellow';

            return (
              <div
                key={scheme.id}
                className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                      {scheme.courseName} · {scheme.academicYear}
                    </div>
                    <h3 className="mt-1.5 text-lg sm:text-xl font-semibold text-white tracking-tight">
                      {scheme.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Pill tone={tone as 'green' | 'amber' | 'yellow'}>{scheme.status}</Pill>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="text-white/50 hover:text-white text-[18px] leading-none px-1 touch-manipulation"
                          aria-label="Options"
                        >
                          ⋯
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="h-11">View details</DropdownMenuItem>
                        <DropdownMenuItem className="h-11">Edit scheme</DropdownMenuItem>
                        <DropdownMenuItem className="h-11">Export to PDF</DropdownMenuItem>
                        <DropdownMenuItem className="h-11">Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="h-11">Archive</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-baseline justify-between text-[11.5px]">
                    <span className="text-white/50 uppercase tracking-[0.12em]">Progress</span>
                    <span className="font-medium text-white tabular-nums">
                      {scheme.completedWeeks}/{scheme.totalWeeks} wks · {progressPercent}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-elec-yellow/80 rounded-full transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {scheme.units.map((unit, i) => (
                    <span
                      key={i}
                      className={cn(
                        'inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-full border tabular-nums',
                        unit.completed
                          ? 'bg-green-500/10 text-green-400 border-green-500/20'
                          : 'bg-white/[0.03] text-white/50 border-white/[0.06]'
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          'h-1.5 w-1.5 rounded-full',
                          unit.completed ? 'bg-green-400' : 'bg-white/30'
                        )}
                      />
                      {unit.name} · {unit.weeks}w
                    </span>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-x-5 gap-y-1 text-[11.5px] text-white/50">
                  <span className="tabular-nums">{scheme.totalWeeks} weeks total</span>
                  <span>By {scheme.createdByName}</span>
                </div>
              </div>
            );
          })}
        </motion.div>
      )}
    </PageFrame>
  );
}
