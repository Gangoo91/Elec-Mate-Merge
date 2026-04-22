import { motion } from 'framer-motion';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { useQueryClient } from '@tanstack/react-query';
import {
  PageFrame,
  PageHero,
  StatStrip,
  SectionHeader,
  HubGrid,
  HubCard,
  ListCard,
  ListRow,
  Pill,
  itemVariants,
} from '@/components/college/primitives';

interface CurriculumHubProps {
  onNavigate: (section: CollegeSection) => void;
}

export function CurriculumHub({ onNavigate }: CurriculumHubProps) {
  const { courses, lessonPlans, getUpcomingLessonsData } = useCollegeSupabase();
  const queryClient = useQueryClient();

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['college-courses'] });
    await queryClient.invalidateQueries({ queryKey: ['college-lesson-plans'] });
  };

  const activeCourses = courses.filter((c) => c.status === 'Active').length;
  const upcomingLessons = getUpcomingLessonsData();
  const draftLessons = lessonPlans.filter((lp) => lp.status === 'Draft').length;
  const totalLessons = lessonPlans.length;

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <PageFrame>
        {/* HERO */}
        <motion.div variants={itemVariants}>
          <PageHero
            eyebrow="Curriculum Hub"
            title="Courses, lessons & materials"
            description="Plan qualifications, lesson sequences and teaching resources — powered by AI where useful."
            tone="emerald"
            actions={
              <button
                onClick={() => onNavigate('lessonplans')}
                className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
              >
                New lesson →
              </button>
            }
          />
        </motion.div>

        {/* STATS */}
        <motion.div variants={itemVariants}>
          <StatStrip
            columns={4}
            stats={[
              {
                value: activeCourses,
                label: 'Courses',
                sub: 'Active qualifications',
                onClick: () => onNavigate('courses'),
              },
              {
                value: totalLessons,
                label: 'Lessons',
                sub: 'Planned',
                onClick: () => onNavigate('lessonplans'),
              },
              {
                value: draftLessons,
                label: 'Drafts',
                sub: 'Awaiting publish',
                onClick: () => onNavigate('lessonplans'),
                accent: draftLessons > 0,
              },
              {
                value: upcomingLessons.length,
                label: 'Upcoming',
                sub: 'Scheduled this week',
                onClick: () => onNavigate('timetable'),
              },
            ]}
          />
        </motion.div>

        {/* CONTENT MANAGEMENT */}
        <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
          <SectionHeader eyebrow="Content Management" title="Build your curriculum" />
          <HubGrid columns={4}>
            <HubCard
              number="01"
              eyebrow="Qualifications & Units"
              title="Courses"
              description="Manage qualifications, unit structures and assessment criteria."
              tone="emerald"
              meta={`${activeCourses} active`}
              onClick={() => onNavigate('courses')}
            />
            <HubCard
              number="02"
              eyebrow="Plans & Delivery"
              title="Lesson Plans"
              description="Create, sequence and publish lesson plans per cohort."
              tone="blue"
              meta={draftLessons > 0 ? `${draftLessons} drafts` : `${totalLessons} plans`}
              onClick={() => onNavigate('lessonplans')}
            />
            <HubCard
              number="03"
              eyebrow="Materials Library"
              title="Teaching Resources"
              description="Slides, handouts and reference materials for lessons."
              tone="amber"
              meta="Uploads & links"
              onClick={() => onNavigate('teachingresources')}
            />
            <HubCard
              number="04"
              eyebrow="Quality & Policy"
              title="Compliance & QA"
              description="Policies, quality documentation and Ofsted-ready records."
              tone="purple"
              meta="Docs & reports"
              onClick={() => onNavigate('compliancedocs')}
            />
          </HubGrid>
        </motion.section>

        {/* AI-POWERED */}
        <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
          <SectionHeader eyebrow="AI-Powered" title="Intelligent tools" />
          <HubGrid columns={2}>
            <HubCard
              number="05"
              eyebrow="Notes & Summaries"
              title="Teaching Notebook"
              description="AI-assisted notes, lesson summaries and auto-generated quizzes."
              tone="yellow"
              meta="AI"
              badge={<Pill tone="yellow">AI</Pill>}
              onClick={() => onNavigate('tutornotebook')}
            />
            <HubCard
              number="06"
              eyebrow="Scheduled Delivery"
              title="Timetable"
              description="Weekly lesson schedule across cohorts, rooms and tutors."
              tone="purple"
              meta={`${upcomingLessons.length} this week`}
              onClick={() => onNavigate('timetable')}
            />
          </HubGrid>
        </motion.section>

        {/* UPCOMING LESSONS */}
        {upcomingLessons.length > 0 && (
          <motion.section variants={itemVariants} className="space-y-5">
            <SectionHeader
              eyebrow="This Week"
              title="Upcoming lessons"
              action="View timetable"
              onAction={() => onNavigate('timetable')}
            />
            <ListCard>
              {upcomingLessons.slice(0, 5).map((lesson) => (
                <ListRow
                  key={lesson.id}
                  onClick={() => onNavigate('lessonplans')}
                  title={lesson.title}
                  subtitle={lesson.cohortName}
                  trailing={
                    <div className="text-right shrink-0">
                      <div className="text-[10px] uppercase tracking-[0.14em] text-white/40">
                        {new Date(lesson.scheduledDate).toLocaleDateString('en-GB', {
                          weekday: 'short',
                        })}
                      </div>
                      <div className="mt-0.5 text-[13px] font-medium tabular-nums text-white">
                        {new Date(lesson.scheduledDate).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </div>
                    </div>
                  }
                />
              ))}
            </ListCard>
          </motion.section>
        )}

        {/* QUICK ACTIONS */}
        <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
          <SectionHeader eyebrow="Quick Actions" title="Create & capture" />
          <HubGrid columns={4}>
            <HubCard
              size="sm"
              eyebrow="Plan"
              title="New lesson"
              description="Start a lesson plan."
              tone="blue"
              onClick={() => onNavigate('lessonplans')}
              cta="Create"
            />
            <HubCard
              size="sm"
              eyebrow="Upload"
              title="Add resource"
              description="Upload slides or handouts."
              tone="amber"
              onClick={() => onNavigate('teachingresources')}
              cta="Upload"
            />
            <HubCard
              size="sm"
              eyebrow="Course"
              title="New qualification"
              description="Add a course framework."
              tone="emerald"
              onClick={() => onNavigate('courses')}
              cta="Add"
            />
            <HubCard
              size="sm"
              eyebrow="AI"
              title="Notebook"
              description="Generate from AI."
              tone="yellow"
              onClick={() => onNavigate('tutornotebook')}
              cta="Open"
            />
          </HubGrid>
        </motion.section>
      </PageFrame>
    </PullToRefresh>
  );
}
