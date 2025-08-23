
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, Star, Calendar, MapPin, Users, BookOpen, 
  TrendingUp, PoundSterling, Award, Target, 
  CheckCircle, AlertCircle, Briefcase, GraduationCap 
} from "lucide-react";
import { EnhancedCareerCourse } from "./enhancedCoursesData";

interface EnhancedCourseCardProps {
  course: EnhancedCareerCourse;
  onViewDetails: (course: EnhancedCareerCourse) => void;
}

const EnhancedCourseCard = ({ course, onViewDetails }: EnhancedCourseCardProps) => {
  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "High": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Essential Qualifications": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Emerging Technologies": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Safety & Compliance": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Specialized Skills": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Business & Management": return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full flex flex-col hover:border-elec-yellow/40 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2 mb-2">
          <Badge className={`${getCategoryColor(course.category)} text-xs`}>
            {course.category}
          </Badge>
          <div className="flex items-center gap-1 bg-amber-400/20 text-amber-400 px-2 py-1 rounded text-xs">
            <Star className="h-3 w-3 fill-amber-400" />
            <span>{course.rating}</span>
          </div>
        </div>
        
        <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
        <p className="text-sm text-elec-yellow">{course.provider}</p>
      </CardHeader>
      
      <CardContent className="pt-0 flex-grow flex flex-col space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">{course.description}</p>
        
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-elec-yellow flex-shrink-0" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3 w-3 text-elec-yellow flex-shrink-0" />
            <span>{course.level}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3 w-3 text-elec-yellow flex-shrink-0" />
            <span>{course.format.split(',')[0]}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-3 w-3 text-elec-yellow flex-shrink-0" />
            <span>Future: {course.futureProofing || 3}/5</span>
          </div>
        </div>

        {/* Industry Demand & Career Impact */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Industry Demand:</span>
            <Badge className={`${getDemandColor(course.industryDemand)} text-xs`}>
              {course.industryDemand}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Salary Impact:</span>
            <span className="text-xs text-green-400 font-medium">{course.salaryImpact}</span>
          </div>
        </div>

        {/* Career Outcomes Preview */}
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-elec-yellow flex items-center gap-1">
            <Target className="h-3 w-3" />
            Career Outcomes:
          </h4>
          <div className="space-y-1">
            {course.careerOutcomes?.length > 0 ? (
              <>
                {course.careerOutcomes.slice(0, 2).map((outcome, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs">
                    <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                    <span className="text-muted-foreground">{outcome}</span>
                  </div>
                ))}
                {course.careerOutcomes.length > 2 && (
                  <div className="text-xs text-muted-foreground">
                    +{course.careerOutcomes.length - 2} more outcomes
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center gap-1.5 text-xs">
                <AlertCircle className="h-3 w-3 text-amber-400 flex-shrink-0" />
                <span className="text-muted-foreground">Contact provider for details</span>
              </div>
            )}
          </div>
        </div>

        {/* Locations */}
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-xs text-elec-yellow">
            <MapPin className="h-3 w-3" />
            <span>Available Locations:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {course.locations?.length > 0 ? (
              <>
                {course.locations.slice(0, 4).map((location, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs bg-elec-dark/60 px-2 py-1 rounded-md"
                  >
                    {location}
                  </span>
                ))}
                {course.locations.length > 4 && (
                  <span className="text-xs bg-elec-dark/60 px-2 py-1 rounded-md">
                    +{course.locations.length - 4} more
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs text-muted-foreground italic">
                Contact provider for details
              </span>
            )}
          </div>
        </div>

        {/* Accreditations */}
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-xs text-elec-yellow">
            <Award className="h-3 w-3" />
            <span>Accreditations:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {course.accreditation?.length > 0 ? (
              <>
                {course.accreditation.slice(0, 2).map((acc, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs bg-blue-500/10 text-blue-300 border-blue-500/30">
                    {acc}
                  </Badge>
                ))}
                {course.accreditation.length > 2 && (
                  <span className="text-xs text-muted-foreground">
                    +{course.accreditation.length - 2} more
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs text-muted-foreground italic">
                Not specified by provider
              </span>
            )}
          </div>
        </div>

        {/* Next Dates */}
        <div className="border-t border-elec-yellow/10 pt-3 space-y-2">
          <p className="text-xs text-elec-yellow flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            <span>Upcoming Dates:</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {course.nextDates?.length > 0 ? (
              <>
                {course.nextDates.slice(0, 3).map((date, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs bg-elec-dark/60 px-2 py-1 rounded-md"
                  >
                    {date}
                  </span>
                ))}
                {course.nextDates.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{course.nextDates.length - 3} more
                  </span>
                )}
                {(course as any).isLive && (
                  <Badge variant="secondary" className="text-xs">Live</Badge>
                )}
              </>
            ) : (
              <span className="text-xs text-muted-foreground italic">
                Contact provider for dates
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-elec-yellow/10">
          <div className="space-y-1">
            <p className="text-xs text-amber-400/80 flex items-center gap-1">
              <PoundSterling className="h-3 w-3" />
              {course.price}
            </p>
            {course.employerSupport && (
              <div className="flex items-center gap-1 text-xs text-green-400">
                <Briefcase className="h-3 w-3" />
                <span>Employer Support</span>
              </div>
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            onClick={() => onViewDetails(course)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedCourseCard;
