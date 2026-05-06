import { motion } from 'framer-motion';
import { BookOpen, Search } from 'lucide-react';
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

  // Loading state — editorial skeletons matching the rewritten card
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-white/[0.10] bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 animate-pulse flex flex-col"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/[0.06] shrink-0" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="h-3 w-20 bg-white/[0.06] rounded" />
                  <div className="h-4 w-12 bg-white/[0.06] rounded-md" />
                </div>
                <div className="h-4 w-full bg-white/[0.06] rounded" />
                <div className="h-4 w-4/5 bg-white/[0.06] rounded" />
                <div className="h-3 w-1/2 bg-white/[0.06] rounded" />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/[0.06] grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="h-3 w-20 bg-white/[0.06] rounded" />
              <div className="h-3 w-24 bg-white/[0.06] rounded" />
              <div className="h-3 w-16 bg-white/[0.06] rounded" />
              <div className="h-3 w-20 bg-white/[0.06] rounded" />
            </div>
            <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-baseline justify-between gap-2">
              <div className="space-y-1.5">
                <div className="h-2.5 w-10 bg-white/[0.06] rounded" />
                <div className="h-4 w-20 bg-white/[0.06] rounded" />
              </div>
              <div className="h-8 w-20 bg-elec-yellow/10 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (filteredCourses.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-8 sm:p-10 text-center"
      >
        <div className="w-12 h-12 mx-auto rounded-xl bg-elec-yellow/[0.08] border border-elec-yellow/30 inline-flex items-center justify-center">
          <Search className="h-5 w-5 text-elec-yellow" aria-hidden />
        </div>
        <h3 className="mt-4 text-[20px] sm:text-[24px] font-semibold tracking-tight text-white">
          No courses match.
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-white/85 max-w-md mx-auto">
          Loosen the filters, drop the postcode, or browse a different category to widen the field.
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-4 py-2.5 min-h-[40px] touch-manipulation transition-colors"
        >
          <BookOpen className="h-4 w-4" />
          Browse all courses
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 sm:auto-rows-fr"
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
