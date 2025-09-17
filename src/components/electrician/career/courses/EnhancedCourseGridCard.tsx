import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, TrendingUp, ExternalLink, MapPin, CheckCircle } from "lucide-react";
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
      case "Safety & Compliance": return "bg-blue-500/20 text-blue-400";
      case "Essential Updates": return "bg-red-500/20 text-red-400";
      case "Emerging Technologies": return "bg-purple-500/20 text-purple-400";
      case "Specialized Systems": return "bg-orange-500/20 text-orange-400";
      case "Professional Development": return "bg-green-500/20 text-green-400";
      case "Business Skills": return "bg-indigo-500/20 text-indigo-400";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <Card 
      className="border-elec-yellow/20 bg-gradient-to-br from-elec-gray to-elec-gray/70 hover:border-elec-yellow/50 transition-all duration-300 hover:scale-105 cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <Badge className={getCategoryColor(course.category)}>
            {course.category}
          </Badge>
          <div className="flex items-center gap-1 bg-amber-500/20 text-amber-400 px-2 py-1 rounded text-xs">
            <Star className="h-3 w-3 fill-current" />
            {course.rating}
          </div>
        </div>
        <CardTitle className="text-lg text-white leading-tight line-clamp-2">
          {course.title}
        </CardTitle>
        <p className="text-sm text-elec-yellow font-medium">{course.provider}</p>
      </CardHeader>
      
      <CardContent className="space-y-4 flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <TrendingUp className="h-3 w-3" />
            {course.level}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-elec-yellow">{course.price.split(' - ')[0]}</span>
          <Badge className={getDemandColor(course.industryDemand)}>
            {course.industryDemand} Demand
          </Badge>
        </div>

        <div className="text-sm text-green-400 font-medium">
          {course.salaryImpact}
        </div>

        <div className="space-y-1 flex-1">
          {course.careerOutcomes.slice(0, 2).map((outcome, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
              <span className="line-clamp-1">{outcome}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-auto">
          <MapPin className="h-3 w-3" />
          <span className="line-clamp-1">{course.locations.slice(0, 2).join(", ")}</span>
        </div>

        <div className="flex gap-2 mt-auto pt-2">
          <Button 
            className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90 text-sm"
            onClick={(e) => {
              e.stopPropagation();
              window.open(course.external_url || '#', '_blank');
            }}
          >
            View Course
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            onClick={(e) => {
              e.stopPropagation();
              window.open(course.external_url || '#', '_blank');
            }}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedCourseGridCard;