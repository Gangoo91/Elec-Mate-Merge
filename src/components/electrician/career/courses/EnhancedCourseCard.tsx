import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Users, PoundSterling, MapPin, ExternalLink, Heart } from "lucide-react";
import { EnhancedCareerCourse } from "@/components/apprentice/career/courses/enhancedCoursesData";

interface EnhancedCourseCardProps {
  course: EnhancedCareerCourse;
  onViewDetails: (course: EnhancedCareerCourse) => void;
  onSaveToFavorites?: (id: string) => void;
  isFavorite?: boolean;
}

const EnhancedCourseCard = ({ course, onViewDetails, onSaveToFavorites, isFavorite }: EnhancedCourseCardProps) => {
  const getDemandColor = (demand: string): string => {
    switch (demand) {
      case "High": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Medium": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "Low": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getFormatColor = (format: string): string => {
    switch (format.toLowerCase()) {
      case "online": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "in-person": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "hybrid": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:border-elec-yellow/30 bg-elec-card border-elec-yellow/10">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {course.category}
              </Badge>
              {course.isLive && (
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                  Live Data
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-lg text-white group-hover:text-elec-yellow transition-colors line-clamp-2">
              {course.title}
            </h3>
            <p className="text-elec-yellow font-medium mt-1">
              {course.provider}
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-white font-medium">
              {course.rating ? course.rating.toFixed(1) : '4.0'}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-white/80 text-sm line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        <div className="flex justify-center">
          <Badge className={getDemandColor(course.industryDemand)} variant="outline">
            {course.industryDemand} Demand
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-elec-yellow flex-shrink-0" />
            <div>
              <div className="text-white/60 text-xs">Duration</div>
              <div className="text-white font-medium">{course.duration}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-elec-yellow flex-shrink-0" />
            <div>
              <div className="text-white/60 text-xs">Level</div>
              <div className="text-white font-medium">{course.level}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <PoundSterling className="h-4 w-4 text-elec-yellow flex-shrink-0" />
            <div>
              <div className="text-white/60 text-xs">Price</div>
              <div className="text-white font-medium">{course.price}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-elec-yellow flex-shrink-0" />
            <div>
              <div className="text-white/60 text-xs">Format</div>
              <div className="text-white font-medium">{course.format}</div>
            </div>
          </div>
        </div>

        {course.careerOutcomes && course.careerOutcomes.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white">Career Outcomes:</h4>
            <div className="flex flex-wrap gap-1">
              {course.careerOutcomes.slice(0, 3).map((outcome, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20">
                  {outcome}
                </Badge>
              ))}
              {course.careerOutcomes.length > 3 && (
                <Badge variant="outline" className="text-xs text-white/60">
                  +{course.careerOutcomes.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {course.salaryImpact && (
          <div className="bg-background/30 rounded-lg p-3 border border-elec-yellow/10">
            <div className="text-xs text-white/60 mb-1">Starting Salary</div>
            <div className="text-elec-yellow font-semibold">{course.salaryImpact}</div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <Button 
            onClick={() => onViewDetails(course)}
            className="flex-1 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium"
          >
            View Full Details
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          {onSaveToFavorites && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSaveToFavorites(String(course.id))}
              className="ml-2 p-2"
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white/60'}`} />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedCourseCard;