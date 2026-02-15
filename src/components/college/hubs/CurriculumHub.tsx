import { Card, CardContent } from '@/components/ui/card';
import { CollegeFeatureTile } from '@/components/college/CollegeFeatureTile';
import { CollegeSectionHeader } from '@/components/college/CollegeSectionHeader';
import { Button } from '@/components/ui/button';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { motion } from 'framer-motion';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import { useQueryClient } from '@tanstack/react-query';
import {
  BookMarked,
  Presentation,
  FileText,
  Plus,
  Upload,
  Sparkles,
  Shield,
  Clock,
} from 'lucide-react';

interface CurriculumHubProps {
  onNavigate: (section: CollegeSection) => void;
}

export function CurriculumHub({ onNavigate }: CurriculumHubProps) {
  const { courses, lessonPlans, getUpcomingLessonsData } = useCollegeSupabase();
  const { staggerContainer, staggerItem } = useHapticFeedback();
  const queryClient = useQueryClient();

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['college-courses'] });
    await queryClient.invalidateQueries({ queryKey: ['college-lesson-plans'] });
  };

  const activeCourses = courses.filter((c) => c.status === 'Active').length;
  const upcomingLessons = getUpcomingLessonsData();
  const draftLessons = lessonPlans.filter((lp) => lp.status === 'Draft').length;

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <motion.div
        className="space-y-4 md:space-y-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <CollegeSectionHeader
          title="Curriculum Hub"
          description="Manage courses, lesson plans and teaching resources"
          action={
            <Button
              className="gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black h-11 touch-manipulation"
              onClick={() => onNavigate('lessonplans')}
            >
              <Plus className="h-4 w-4" />
              New Lesson
            </Button>
          }
        />

        {/* Quick Stats */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
          <Card className="relative overflow-hidden backdrop-blur-xl bg-elec-dark/60 border-white/10 hover:border-elec-yellow/30 shrink-0 transition-all duration-300 cursor-pointer group touch-manipulation">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow/50" />
            <CardContent className="p-3 flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/20 shadow-lg shadow-elec-yellow/5 group-hover:scale-110 transition-transform duration-300">
                <BookMarked className="h-4 w-4 text-elec-yellow" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">{activeCourses}</p>
                <p className="text-xs text-white">Courses</p>
              </div>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden backdrop-blur-xl bg-elec-dark/60 border-white/10 hover:border-info/30 shrink-0 transition-all duration-300 cursor-pointer group touch-manipulation">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-info via-blue-400 to-info/50" />
            <CardContent className="p-3 flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-info/20 to-info/5 border border-info/20 shadow-lg shadow-info/5 group-hover:scale-110 transition-transform duration-300">
                <Presentation className="h-4 w-4 text-info" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">{lessonPlans.length}</p>
                <p className="text-xs text-white">Lessons</p>
              </div>
            </CardContent>
          </Card>
          {draftLessons > 0 && (
            <Card className="relative overflow-hidden backdrop-blur-xl bg-elec-dark/60 border-white/10 hover:border-warning/30 shrink-0 transition-all duration-300 cursor-pointer group touch-manipulation">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-warning via-orange-400 to-warning/50" />
              <CardContent className="p-3 flex items-center gap-2">
                <div className="p-2 rounded-xl bg-gradient-to-br from-warning/20 to-warning/5 border border-warning/20 shadow-lg shadow-warning/5 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{draftLessons}</p>
                  <p className="text-xs text-white">Drafts</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main Navigation */}
        <motion.div variants={staggerItem}>
          <h2 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
            Content Management
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <CollegeFeatureTile
              icon={BookMarked}
              title="Courses"
              description="Qualifications & units"
              onClick={() => onNavigate('courses')}
              badge={`${activeCourses} active`}
            />
            <CollegeFeatureTile
              icon={Presentation}
              title="Lesson Plans"
              description="Create & manage lessons"
              onClick={() => onNavigate('lessonplans')}
              badge={draftLessons > 0 ? `${draftLessons} drafts` : undefined}
              badgeVariant="warning"
            />
            <CollegeFeatureTile
              icon={FileText}
              title="Teaching Resources"
              description="Materials & uploads"
              onClick={() => onNavigate('teachingresources')}
            />
            <CollegeFeatureTile
              icon={Shield}
              title="Compliance & QA"
              description="Policies & quality docs"
              onClick={() => onNavigate('compliancedocs')}
            />
          </div>
        </motion.div>

        {/* AI Tools */}
        <motion.div variants={staggerItem}>
          <h2 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-success to-green-500 rounded-full"></span>
            AI-Powered Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <CollegeFeatureTile
              icon={Sparkles}
              title="Teaching Notebook"
              description="AI-powered notes, summaries & quiz generation"
              onClick={() => onNavigate('tutornotebook')}
              badge="AI"
              badgeVariant="success"
            />
          </div>
        </motion.div>

        {/* Upcoming Lessons */}
        {upcomingLessons.length > 0 && (
          <motion.div variants={staggerItem}>
            <h2 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-info to-blue-500 rounded-full"></span>
              Upcoming This Week
            </h2>
            <CollegeFeatureTile
              icon={Clock}
              title={upcomingLessons[0]?.title || 'View scheduled lessons'}
              description={`${upcomingLessons.length} lessons scheduled`}
              onClick={() => onNavigate('lessonplans')}
              badge={`${upcomingLessons.length}`}
              badgeVariant="info"
            />
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div variants={staggerItem}>
          <h2 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-elec-yellow to-amber-500 rounded-full"></span>
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <CollegeFeatureTile
              icon={Plus}
              title="New Lesson"
              description="Create plan"
              onClick={() => onNavigate('lessonplans')}
              compact
            />
            <CollegeFeatureTile
              icon={Upload}
              title="Upload Resource"
              description="Add materials"
              onClick={() => onNavigate('teachingresources')}
              compact
            />
            <CollegeFeatureTile
              icon={BookMarked}
              title="Add Course"
              description="New qualification"
              onClick={() => onNavigate('courses')}
              compact
            />
            <CollegeFeatureTile
              icon={Sparkles}
              title="AI Notebook"
              description="Generate content"
              onClick={() => onNavigate('tutornotebook')}
              compact
            />
          </div>
        </motion.div>
      </motion.div>
    </PullToRefresh>
  );
}
