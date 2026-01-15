import { motion } from "framer-motion";
import { BookOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import PremiumCourseCard from "./PremiumCourseCard";
import type { EnhancedCareerCourse } from "@/components/apprentice/career/courses/enhancedCoursesData";

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
      staggerChildren: 0.02,
    },
  },
};

const ModernCoursesGrid = ({ courses, excludeId, onCourseClick, isLoading }: ModernCoursesGridProps) => {
  const filteredCourses = excludeId
    ? courses.filter(course => course.id !== excludeId)
    : courses;

  // Loading State
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-white/10 bg-elec-gray/50 overflow-hidden animate-pulse"
          >
            <div className="h-36 bg-white/5" />
            <div className="p-4 space-y-3">
              <div className="h-3 bg-white/10 rounded w-1/4" />
              <div className="h-4 bg-white/10 rounded w-3/4" />
              <div className="h-3 bg-white/10 rounded w-1/2" />
              <div className="h-8 bg-white/5 rounded mt-3" />
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
        <p className="text-white mb-6 max-w-md mx-auto">
          Try adjusting your search criteria or explore different categories to find the right training for you.
        </p>
        <Button
          variant="outline"
          className="border-white/20 text-white hover:text-white hover:bg-white/10"
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
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
