import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { EnhancedCareerCourse } from "@/components/apprentice/career/courses/enhancedCoursesData";
import CourseNewsCard from "./CourseNewsCard";

interface CourseFeaturedCarouselProps {
  courses: EnhancedCareerCourse[];
  className?: string;
  onCourseClick?: (course: EnhancedCareerCourse) => void;
}

const CourseFeaturedCarousel = ({ courses, className, onCourseClick }: CourseFeaturedCarouselProps) => {
  // Show up to 6 featured courses
  const featuredCourses = courses.slice(0, 6);

  if (featuredCourses.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Section Header */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Featured Courses
        </h2>
        <p className="text-sm text-white/80">
          Top-rated electrical courses from leading training providers
        </p>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
          skipSnaps: false,
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {featuredCourses.map((course, index) => (
            <CarouselItem key={course.id} className="pl-2 md:pl-4 basis-[85%] sm:basis-[60%] md:basis-[45%] lg:basis-[33%]">
              <CourseNewsCard 
                course={course}
                onClick={() => onCourseClick?.(course)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
        <CarouselPrevious className="hidden md:flex -left-4 h-10 w-10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50" />
        <CarouselNext className="hidden md:flex -right-4 h-10 w-10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50" />
      </Carousel>

      {/* Mobile scroll hint */}
      <div className="md:hidden flex items-center justify-center gap-2 text-xs text-white/60">
        <ChevronLeft className="h-3 w-3" />
        <span>Swipe to browse more courses</span>
        <ChevronRight className="h-3 w-3" />
      </div>
    </div>
  );
};

export default CourseFeaturedCarousel;