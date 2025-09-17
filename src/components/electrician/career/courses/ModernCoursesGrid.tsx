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
          className="bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-xl border border-white/10 overflow-hidden group hover:border-elec-yellow/30 transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.02] cursor-pointer"
          onClick={() => onCourseClick?.(course)}
        >
          {/* Header */}
          <div className="p-4 pb-3 border-b border-white/10">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white text-base line-clamp-2 leading-tight mb-2">
                  {course.title}
                </h3>
                <p className="text-elec-yellow text-sm font-medium">{course.provider}</p>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-1 backdrop-blur-sm">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-white font-medium">{course.rating.toFixed(1)}</span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {course.isLive && (
                <Badge className="bg-elec-yellow/20 border-elec-yellow/30 text-elec-yellow text-xs">
                  Live Data
                </Badge>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Description */}
            <p className="text-sm text-white/80 line-clamp-3 leading-relaxed">
              {course.description}
            </p>

            {/* Course Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs text-white/80">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-elec-yellow" />
                  <span>{formatDuration(course.duration)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-elec-yellow" />
                  <span>{course.level}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-3 w-3 text-elec-yellow" />
                  <span className="font-medium">{course.price}</span>
                </div>
                {course.locations.length > 0 && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-elec-yellow" />
                    <span className="line-clamp-1">{course.locations[0]}</span>
                    {course.locations.length > 1 && (
                      <span className="text-elec-yellow">+{course.locations.length - 1}</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Format & Next Dates */}
            <div className="space-y-2">
              <div className="text-xs text-white/80">
                <span className="font-medium text-white">Format:</span> {course.format}
              </div>
              
              {course.nextDates && course.nextDates.length > 0 && (
                <div className="text-xs text-white/80">
                  <span className="font-medium text-white">Next dates:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {course.nextDates.slice(0, 2).map((date, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-white/20 text-white/80">
                        {date}
                      </Badge>
                    ))}
                    {course.nextDates.length > 2 && (
                      <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-yellow">
                        +{course.nextDates.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 pt-0">
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <div className="text-xs text-white/60">
                {course.salaryImpact && (
                  <span>Salary impact: <span className="text-elec-yellow font-medium">{course.salaryImpact}</span></span>
                )}
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
                <span className="text-xs">View Details</span>
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