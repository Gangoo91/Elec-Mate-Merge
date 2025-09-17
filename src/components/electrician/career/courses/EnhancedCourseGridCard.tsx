import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, ExternalLink, MapPin, Users, PoundSterling } from "lucide-react";
import { EnhancedCareerCourse } from "@/components/apprentice/career/courses/enhancedCoursesData";

interface EnhancedCourseGridCardProps {
  course: EnhancedCareerCourse;
  onClick?: () => void;
}

const EnhancedCourseGridCard = ({ course, onClick }: EnhancedCourseGridCardProps) => {
  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "High": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Medium": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "Low": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <Card 
      className="bg-slate-800/90 border-slate-700 hover:border-elec-yellow/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer h-full flex flex-col group"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        {/* Top badges row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className="bg-slate-700/50 text-slate-300 border-slate-600 text-xs font-medium"
            >
              Electrical
            </Badge>
            {course.isLive && (
              <Badge 
                variant="outline" 
                className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs font-medium"
              >
                Live Data
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1 bg-amber-500/20 text-amber-400 px-2 py-1 rounded border border-amber-500/30 text-xs font-medium">
            <Star className="h-3 w-3 fill-current" />
            {course.rating}
          </div>
        </div>

        {/* Course title */}
        <CardTitle className="text-base text-white leading-tight line-clamp-2 group-hover:text-elec-yellow transition-colors mb-1">
          {course.title}
        </CardTitle>
        
        {/* Provider */}
        <p className="text-elec-yellow font-medium text-sm">{course.provider}</p>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col space-y-3 pt-0">
        {/* Description */}
        <p className="text-sm text-slate-400 line-clamp-3">
          {course.description}
        </p>

        {/* Demand badge */}
        <div className="flex justify-center py-2">
          <Badge 
            variant="outline"
            className={`${getDemandColor(course.industryDemand)} font-medium text-xs px-3 py-1`}
          >
            {course.industryDemand} Demand
          </Badge>
        </div>

        {/* View Provider Button */}
        <Button 
          className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold py-2.5 text-sm"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View Provider
        </Button>

        {/* Course metadata grid */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-700">
          <div className="text-center">
            <div className="flex justify-center mb-1.5">
              <Clock className="h-4 w-4 text-elec-yellow" />
            </div>
            <div className="font-medium text-white text-xs leading-tight">{course.duration}</div>
            <div className="text-xs text-slate-500 mt-0.5">Duration</div>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-1.5">
              <Users className="h-4 w-4 text-elec-yellow" />
            </div>
            <div className="font-medium text-white text-xs leading-tight line-clamp-1">{course.level}</div>
            <div className="text-xs text-slate-500 mt-0.5">Level</div>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-1.5">
              <PoundSterling className="h-4 w-4 text-elec-yellow" />
            </div>
            <div className="font-medium text-white text-xs leading-tight">{course.price.split(' - ')[0]}</div>
            <div className="text-xs text-slate-500 mt-0.5">Price</div>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-1.5">
              <MapPin className="h-4 w-4 text-elec-yellow" />
            </div>
            <div className="font-medium text-white text-xs leading-tight line-clamp-1">{course.format}</div>
            <div className="text-xs text-slate-500 mt-0.5">Format</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedCourseGridCard;