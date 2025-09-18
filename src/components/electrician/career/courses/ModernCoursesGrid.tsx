import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Star, Clock, ExternalLink, Zap, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EnhancedCareerCourse } from "@/components/apprentice/career/courses/enhancedCoursesData";

interface ModernCoursesGridProps {
  courses: EnhancedCareerCourse[];
  excludeId?: string | number;
  onCourseClick?: (course: EnhancedCareerCourse) => void;
}

const ModernCoursesGrid = ({ courses, excludeId, onCourseClick }: ModernCoursesGridProps) => {
  const filteredCourses = excludeId 
    ? courses.filter(course => course.id !== excludeId)
    : courses;

  if (filteredCourses.length === 0) {
    return (
      <div className="text-center py-12">
        <Zap className="h-16 w-16 text-white/40 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
        <p className="text-white/80">Try adjusting your search criteria or explore different categories.</p>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      "Essential Updates": "bg-red-500/20 border-red-500/30 text-red-300",
      "Emerging Technologies": "bg-green-500/20 border-green-500/30 text-green-300",
      "Safety & Compliance": "bg-blue-500/20 border-blue-500/30 text-blue-300",
      "Specialized Systems": "bg-purple-500/20 border-purple-500/30 text-purple-300",
      "Professional Development": "bg-orange-500/20 border-orange-500/30 text-orange-300",
      "Business Skills": "bg-cyan-500/20 border-cyan-500/30 text-cyan-300",
    };
    return colors[category as keyof typeof colors] || "bg-white/10 border-white/20 text-white/80";
  };

  const getDemandColor = (demand: string) => {
    const colors = {
      "High": "bg-red-500/20 border-red-500/30 text-red-300",
      "Medium": "bg-yellow-500/20 border-yellow-500/30 text-yellow-300",
      "Low": "bg-green-500/20 border-green-500/30 text-green-300",
    };
    return colors[demand as keyof typeof colors] || "bg-white/10 border-white/20 text-white/80";
  };

  const getCategoryImage = (category: string) => {
    const images = {
      "Essential Updates": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop&auto=format&q=80",
      "Emerging Technologies": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&auto=format&q=80", 
      "Safety & Compliance": "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=250&fit=crop&auto=format&q=80",
      "Specialized Systems": "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=250&fit=crop&auto=format&q=80",
      "Professional Development": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format&q=80",
      "Business Skills": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop&auto=format&q=80",
    };
    return images[category as keyof typeof images] || "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop&auto=format&q=80";
  };

  const formatDuration = (duration: string) => {
    const patterns = [
      { regex: /(\d+)\s*days?/i, format: (n: number) => `${n} day${n > 1 ? 's' : ''}` },
      { regex: /(\d+)\s*weeks?/i, format: (n: number) => `${n} week${n > 1 ? 's' : ''}` },
      { regex: /(\d+)\s*months?/i, format: (n: number) => `${n} month${n > 1 ? 's' : ''}` },
      { regex: /(\d+)\s*hours?/i, format: (n: number) => `${n} hour${n > 1 ? 's' : ''}` }
    ];

    for (const pattern of patterns) {
      const match = duration.match(pattern.regex);
      if (match) {
        const number = parseInt(match[1]);
        return pattern.format(number);
      }
    }

    return duration;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCourses.map((course) => (
        <div
          key={course.id}
          className="bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-xl border border-white/10 overflow-hidden group hover:border-elec-yellow/30 transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.02] h-full cursor-pointer"
          onClick={() => onCourseClick?.(course)}
        >
          {/* Image */}
          <div className="relative h-32 sm:h-36 overflow-hidden">
            <img
              src={getCategoryImage(course.category)}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Live Data Indicator */}
            {course.isLive && (
              <div className="absolute bottom-2 left-2">
                <Badge className="bg-elec-yellow/20 border-elec-yellow/30 text-elec-yellow text-xs">
                  Live Data
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-3 sm:p-4 space-y-2 flex flex-col h-[calc(100%-8rem)] sm:h-[calc(100%-9rem)]">
            {/* Meta Info */}
            <div className="flex items-center justify-between text-xs text-white/80">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{(course.rating ?? 4.0).toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  <span>{course.level}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{formatDuration(course.duration)}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-white line-clamp-2 text-sm sm:text-base leading-tight flex-grow">
              {course.title}
            </h3>

            {/* Provider */}
            <p className="text-elec-yellow text-xs sm:text-sm font-medium">
              {course.provider}
            </p>

            {/* Format & Locations */}
            <div className="text-white/80 text-xs space-y-1">
              <div className="flex items-center gap-1">
                <span className="font-medium">Format:</span>
                <span>{course.format}</span>
              </div>
              {course.locations.length > 0 && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="line-clamp-1">{course.locations[0]}</span>
                  {course.locations.length > 1 && (
                    <span className="text-elec-yellow">+{course.locations.length - 1}</span>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
              <div className="text-xs text-white/80">
                <span className="font-medium">{course.price}</span>
              </div>
              
              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-3 text-elec-yellow hover:bg-elec-yellow/10 hover:text-elec-yellow group/btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onCourseClick?.(course);
                }}
              >
                <span className="text-xs">View</span>
                <ExternalLink className="h-3 w-3 ml-1 transition-transform group-hover/btn:translate-x-0.5" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModernCoursesGrid;