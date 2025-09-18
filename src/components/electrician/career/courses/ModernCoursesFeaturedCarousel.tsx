import { useState, useRef } from "react";
import { Calendar, Clock, MapPin, Star, ExternalLink, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { isValidUrl } from "@/utils/urlUtils";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { EnhancedCareerCourse } from "@/components/apprentice/career/courses/enhancedCoursesData";

interface ModernCoursesFeaturedCarouselProps {
  courses: EnhancedCareerCourse[];
  className?: string;
  onCourseClick?: (course: EnhancedCareerCourse) => void;
}

const ModernCoursesFeaturedCarousel = ({ courses, className, onCourseClick }: ModernCoursesFeaturedCarouselProps) => {
  // Show up to 6 courses passed from parent (already filtered as "featured")
  const featuredCourses = courses.slice(0, 6);
  const erroredImages = useRef(new Set<string>());

  if (featuredCourses.length === 0) {
    return null;
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

  const getCategoryImages = (category: string) => {
    const imageArrays = {
      "Essential Updates": [
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop&auto=format&q=80", // Electrical work
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop&auto=format&q=80", // Blueprint
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop&auto=format&q=80", // Engineering
        "https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=400&h=250&fit=crop&auto=format&q=80", // Electrical panel
      ],
      "Emerging Technologies": [
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&auto=format&q=80", // Technology
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop&auto=format&q=80", // Solar panels
        "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=250&fit=crop&auto=format&q=80", // EV charging
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=250&fit=crop&auto=format&q=80", // Smart home
      ],
      "Safety & Compliance": [
        "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=250&fit=crop&auto=format&q=80", // Safety
        "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=250&fit=crop&auto=format&q=80", // Hard hat
        "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=250&fit=crop&auto=format&q=80", // Safety equipment
        "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=250&fit=crop&auto=format&q=80", // First aid
      ],
      "Specialized Systems": [
        "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=250&fit=crop&auto=format&q=80", // Systems
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop&auto=format&q=80", // Data center
        "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=400&h=250&fit=crop&auto=format&q=80", // Control panel
        "https://images.unsplash.com/photo-1594736797933-d0bc02e42ecb?w=400&h=250&fit=crop&auto=format&q=80", // Fire alarm
      ],
      "Professional Development": [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format&q=80", // Professional
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=250&fit=crop&auto=format&q=80", // Training
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop&auto=format&q=80", // Mentorship
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop&auto=format&q=80", // Team meeting
      ],
      "Business Skills": [
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop&auto=format&q=80", // Business
        "https://images.unsplash.com/photo-1553028826-f4804a6dfd3f?w=400&h=250&fit=crop&auto=format&q=80", // Handshake
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop&auto=format&q=80", // Planning
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&auto=format&q=80", // Analytics
      ],
      "Electrical": [
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop&auto=format&q=80", // General electrical
        "https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=400&h=250&fit=crop&auto=format&q=80", // Electrical panel
        "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=250&fit=crop&auto=format&q=80", // Wiring
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop&auto=format&q=80", // Tools
      ],
    };
    return imageArrays[category as keyof typeof imageArrays] || imageArrays["Electrical"];
  };

  const getCategoryImage = (category: string, courseId?: string | number) => {
    const images = getCategoryImages(category);
    // Use course ID for consistent image selection per course
    const index = courseId ? Math.abs(parseInt(courseId.toString()) % images.length) : 0;
    return images[index];
  };

  const formatDuration = (duration: string) => {
    // Handle various duration formats
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
    <div className={cn("space-y-4", className)}>
      {/* Section Header */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Featured Courses
        </h2>
        <p className="text-sm text-white/80">
          Top-rated and high-demand electrical training courses
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
              <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-xl border border-white/10 overflow-hidden group hover:border-elec-yellow/30 transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.02] h-full cursor-pointer"
                   onClick={() => onCourseClick?.(course)}>
                {/* Image */}
                <div className="relative h-32 sm:h-36 overflow-hidden">
                  <img
                    src={course.image_url || getCategoryImage(course.category, course.id)}
                    alt={`${course.title} - Electrical Training Course`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      const imageKey = course.id.toString();
                      if (!erroredImages.current.has(imageKey)) {
                        erroredImages.current.add(imageKey);
                        const fallbackImages = getCategoryImages(course.category);
                        const nextIndex = (Math.abs(parseInt(imageKey)) + 1) % fallbackImages.length;
                        e.currentTarget.src = fallbackImages[nextIndex];
                      } else {
                        // Ultimate fallback - base64 placeholder
                        e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPkVsZWN0cmljYWwgQ291cnNlPC90ZXh0Pgo8L3N2Zz4=";
                      }
                    }}
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
                        <span>{course.rating.toFixed(1)}</span>
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
                        if (course.external_url && isValidUrl(course.external_url)) {
                          window.open(course.external_url, '_blank');
                        } else {
                          onCourseClick?.(course);
                        }
                      }}
                    >
                      <span className="text-xs">View</span>
                      <ExternalLink className="h-3 w-3 ml-1 transition-transform group-hover/btn:translate-x-0.5" />
                    </Button>
                  </div>
                </div>
              </div>
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

export default ModernCoursesFeaturedCarousel;