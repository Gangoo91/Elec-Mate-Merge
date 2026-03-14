import { motion } from 'framer-motion';
import { BookOpen, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PremiumCourseCard from './PremiumCourseCard';
import type { EnhancedCareerCourse } from '@/components/apprentice/career/courses/enhancedCoursesData';

interface ModernCoursesGridProps {
  courses: EnhancedCareerCourse[];
  excludeId?: string | number;
  onCourseClick?: (course: EnhancedCareerCourse) => void;
  isLoading?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.01,
    },
  },
};

const ModernCoursesGrid = ({
  courses,
  excludeId,
  onCourseClick,
  isLoading,
}: ModernCoursesGridProps) => {
  const filteredCourses = excludeId ? courses.filter((course) => course.id !== excludeId) : courses;

  // Loading State — horizontal skeletons on mobile, vertical on desktop
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-white/[0.08] bg-[#111113] overflow-hidden animate-pulse"
          >
            {/* Visual header skeleton */}
            <div className="h-24 bg-white/[0.04]" />
            {/* Card body skeleton */}
            <div className="p-4 space-y-3">
              <div className="h-4 bg-white/[0.06] rounded w-4/5" />
              <div className="h-3 bg-white/[0.06] rounded w-1/2" />
              <div className="flex gap-1.5">
                <div className="h-7 bg-white/[0.04] rounded-lg w-16" />
                <div className="h-7 bg-white/[0.04] rounded-lg w-16" />
                <div className="h-7 bg-white/[0.04] rounded-lg w-20" />
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                <div className="h-5 bg-white/[0.06] rounded w-16" />
                <div className="h-7 bg-elec-yellow/10 rounded-full w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty State
  if (filteredCourses.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="p-4 rounded-full bg-blue-500/10 w-fit mx-auto mb-4">
          <Search className="h-12 w-12 text-blue-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No courses found</h3>
        <p className="text-white mb-6 max-w-lg mx-auto">
          Try adjusting your search criteria or explore different categories to find the right
          training for you.
        </p>
        <Button
          variant="outline"
          className="border-white/20 text-white hover:text-white hover:bg-white/10 touch-manipulation active:scale-[0.98]"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Browse All Courses
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4"
    >
      {filteredCourses.map((course, index) => (
        <PremiumCourseCard
          key={course.id}
          course={course}
          onClick={() => onCourseClick?.(course)}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default ModernCoursesGrid;
