import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, TrendingUp, ExternalLink, MapPin, Users, DollarSign } from "lucide-react";
import { EnhancedCareerCourse } from "@/components/apprentice/career/courses/enhancedCoursesData";

interface EnhancedCourseGridCardProps {
  course: EnhancedCareerCourse;
  onClick?: () => void;
}

const EnhancedCourseGridCard = ({ course, onClick }: EnhancedCourseGridCardProps) => {
  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "High": return "bg-green-500/20 text-green-400";
      case "Medium": return "bg-amber-500/20 text-amber-400";
      case "Low": return "bg-red-500/20 text-red-400";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Safety & Compliance": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Essential Updates": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Emerging Technologies": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Specialized Systems": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Professional Development": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Business Skills": return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <Card 
      className="border-elec-yellow/20 bg-gradient-to-br from-elec-gray to-elec-gray/70 hover:border-elec-yellow/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer h-full flex flex-col group"
      onClick={onClick}
    >
      <CardHeader className="pb-4">
        {/* Top badges */}
        <div className="flex items-center gap-2 mb-3">
          <Badge 
            variant="outline" 
            className={`text-xs font-medium ${getCategoryColor(course.category)}`}
          >
            {course.category}
          </Badge>
          {course.isLive && (
            <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
              Live Data
            </Badge>
          )}
          <div className="flex items-center gap-1 bg-amber-500/20 text-amber-400 px-2 py-1 rounded border border-amber-500/30 text-xs font-medium ml-auto">
            <Star className="h-3 w-3 fill-current" />
            {course.rating}
          </div>
        </div>

        {/* Course title */}
        <CardTitle className="text-lg text-white leading-tight line-clamp-2 group-hover:text-elec-yellow transition-colors">
          {course.title}
        </CardTitle>
        
        {/* Provider */}
        <p className="text-elec-yellow font-semibold text-sm">{course.provider}</p>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
          {course.description}
        </p>

        {/* Demand badge */}
        <div className="flex justify-center">
          <Badge className={`${getDemandColor(course.industryDemand)} font-medium`}>
            {course.industryDemand} Demand
          </Badge>
        </div>

        {/* View Provider Button */}
        <Button 
          className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold py-3 text-sm"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View Provider
        </Button>

        {/* Course metadata grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-elec-yellow/10">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
            </div>
            <div className="font-semibold text-white text-sm">{course.duration}</div>
            <div className="text-xs text-muted-foreground">Duration</div>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Users className="h-5 w-5 text-elec-yellow" />
            </div>
            <div className="font-semibold text-white text-sm">{course.level}</div>
            <div className="text-xs text-muted-foreground">Level</div>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-2">
              <DollarSign className="h-5 w-5 text-elec-yellow" />
            </div>
            <div className="font-semibold text-white text-sm">{course.price.split(' - ')[0]}</div>
            <div className="text-xs text-muted-foreground">Price</div>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-2">
              <MapPin className="h-5 w-5 text-elec-yellow" />
            </div>
            <div className="font-semibold text-white text-sm line-clamp-1">{course.format}</div>
            <div className="text-xs text-muted-foreground">Format</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedCourseGridCard;