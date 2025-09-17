import React from "react";
import { format } from "date-fns";
import { Calendar, Clock, Eye, Star, ExternalLink, Users, MapPin, PoundSterling, TrendingUp, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EnhancedCareerCourse } from "@/components/apprentice/career/courses/enhancedCoursesData";

interface CourseNewsCardProps {
  course: EnhancedCareerCourse;
  className?: string;
  onClick?: () => void;
}

const CourseNewsCard = ({ course, className, onClick }: CourseNewsCardProps) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      "Electrical": "bg-blue-500/20 border-blue-500/30 text-blue-300",
      "Safety": "bg-orange-500/20 border-orange-500/30 text-orange-300", 
      "Engineering": "bg-purple-500/20 border-purple-500/30 text-purple-300",
      "Technology": "bg-green-500/20 border-green-500/30 text-green-300",
      "Management": "bg-red-500/20 border-red-500/30 text-red-300",
      "Compliance": "bg-yellow-500/20 border-yellow-500/30 text-yellow-300",
      "Testing": "bg-cyan-500/20 border-cyan-500/30 text-cyan-300",
    };
    return colors[category as keyof typeof colors] || "bg-white/10 border-white/20 text-white/80";
  };

  const getDemandColor = (demand: string) => {
    const colors = {
      "High": "bg-green-500/20 border-green-500/30 text-green-300",
      "Medium": "bg-yellow-500/20 border-yellow-500/30 text-yellow-300",
      "Low": "bg-red-500/20 border-red-500/30 text-red-300",
    };
    return colors[demand as keyof typeof colors] || "bg-white/10 border-white/20 text-white/80";
  };

  const getCategoryImage = (category: string) => {
    const images = {
      "Electrical": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop&auto=format",
      "Safety": "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=250&fit=crop&auto=format",
      "Engineering": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=250&fit=crop&auto=format",
      "Technology": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=250&fit=crop&auto=format",
      "Management": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&auto=format",
      "Compliance": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop&auto=format",
      "Testing": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop&auto=format",
    };
    return images[category as keyof typeof images] || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop&auto=format";
  };

  const formatPrice = (price: string) => {
    // Extract numeric value from price string
    const numericPrice = price.match(/£?(\d+(?:,\d{3})*(?:\.\d{2})?)/)?.[1];
    if (numericPrice) {
      const formatted = parseFloat(numericPrice.replace(/,/g, '')).toLocaleString();
      return `£${formatted}`;
    }
    return price;
  };

  return (
    <div 
      className={cn(
        "bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-xl border border-white/10 overflow-hidden group hover:border-elec-yellow/30 transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.02] cursor-pointer h-full",
        className
      )}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-32 sm:h-36 lg:h-40 overflow-hidden">
        <img
          src={getCategoryImage(course.category)}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4 flex flex-col h-[calc(100%-8rem)] sm:h-[calc(100%-9rem)] lg:h-[calc(100%-10rem)]">
        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-white/80">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{course.duration}</span>
            </div>
            {course.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{course.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <PoundSterling className="h-3 w-3" />
            <span>{formatPrice(course.price)}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-white line-clamp-2 text-sm sm:text-base lg:text-lg leading-tight">
          {course.title}
        </h3>

        {/* Provider */}
        <p className="text-elec-yellow text-xs sm:text-sm font-medium">
          {course.provider}
        </p>

        {/* Description */}
        <p className="text-white/90 text-xs sm:text-sm line-clamp-3 lg:line-clamp-2 leading-relaxed flex-grow">
          {course.description}
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 text-xs text-white/80">
          <MapPin className="h-3 w-3" />
          <span className="line-clamp-1">
            {course.locations.slice(0, 2).join(", ")}
            {course.locations.length > 2 && ` +${course.locations.length - 2} more`}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-white/80">
            {course.nextDates && course.nextDates.length > 0 && (
              <>
                <Calendar className="h-3 w-3" />
                <span>Next: {course.nextDates[0]}</span>
              </>
            )}
          </div>
          
          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-3 text-elec-yellow hover:bg-elec-yellow/10 hover:text-elec-yellow group/btn"
          >
            <span className="text-xs">View Details</span>
            <ExternalLink className="h-3 w-3 ml-1 transition-transform group-hover/btn:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseNewsCard;