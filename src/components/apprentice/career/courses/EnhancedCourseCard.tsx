
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileButton } from "@/components/ui/mobile-button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, Star, Calendar, MapPin, Users, BookOpen, 
  TrendingUp, PoundSterling, Award, Target, 
  CheckCircle, AlertCircle, Briefcase, GraduationCap,
  Heart, Share2, Plus
} from "lucide-react";
import { EnhancedCareerCourse } from "./enhancedCoursesData";
import { useIsMobile } from "@/hooks/use-mobile";

interface EnhancedCourseCardProps {
  course: EnhancedCareerCourse;
  onViewDetails: (course: EnhancedCareerCourse) => void;
  onBookmark?: (course: EnhancedCareerCourse) => void;
  onShare?: (course: EnhancedCareerCourse) => void;
  onCompare?: (course: EnhancedCareerCourse) => void;
  isBookmarked?: boolean;
  isInComparison?: boolean;
}

const EnhancedCourseCard = ({ 
  course, 
  onViewDetails, 
  onBookmark, 
  onShare, 
  onCompare, 
  isBookmarked = false,
  isInComparison = false 
}: EnhancedCourseCardProps) => {
  const isMobile = useIsMobile();
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
    <Card className="border-elec-yellow/20 bg-elec-gray h-full flex flex-col hover:border-elec-yellow/40 transition-all duration-300 relative group">
      {/* Mobile Action Buttons */}
      {isMobile && (
        <div className="absolute top-3 right-3 flex gap-1 z-10">
          {onBookmark && (
            <MobileButton
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onBookmark(course);
              }}
              className={`h-8 w-8 rounded-full ${
                isBookmarked 
                  ? 'bg-elec-yellow/20 text-elec-yellow' 
                  : 'bg-elec-dark/80 text-muted-foreground hover:text-elec-yellow'
              }`}
            >
              <Heart className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </MobileButton>
          )}
          {onShare && (
            <MobileButton
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onShare(course);
              }}
              className="h-8 w-8 rounded-full bg-elec-dark/80 text-muted-foreground hover:text-blue-400"
            >
              <Share2 className="h-4 w-4" />
            </MobileButton>
          )}
        </div>
      )}

      <CardHeader className={`pb-3 ${isMobile ? 'p-3' : 'p-4 sm:p-6'}`}>
        <div className="flex justify-between items-start gap-2 mb-2">
          <Badge className={`${getCategoryColor(course.category)} text-xs ${isMobile ? 'px-1.5 py-0.5' : 'px-2 py-1'}`}>
            {isMobile ? course.category.split(' ')[0] : course.category}
          </Badge>
          <div className="flex items-center gap-1 bg-amber-400/20 text-amber-400 px-2 py-1 rounded text-xs font-medium">
            <Star className="h-3 w-3 fill-amber-400" />
            <span>{course.rating}</span>
          </div>
        </div>
        
        <CardTitle className={`${isMobile ? 'text-sm' : 'text-base sm:text-lg'} leading-tight`}>
          {course.title}
        </CardTitle>
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-elec-yellow font-medium`}>
          {course.provider}
        </p>
      </CardHeader>
      
      <CardContent className={`pt-0 ${isMobile ? 'p-3' : 'p-4 sm:p-6'} flex-grow flex flex-col ${isMobile ? 'space-y-3' : 'space-y-4'}`}>
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground leading-relaxed ${isMobile ? 'line-clamp-2' : ''}`}>
          {course.description}
        </p>
        
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-elec-yellow flex-shrink-0" />
            <span className="min-w-0 truncate">{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3 w-3 text-elec-yellow flex-shrink-0" />
            <span className="min-w-0 truncate">{course.level}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3 w-3 text-elec-yellow flex-shrink-0" />
            <span className="min-w-0 truncate">{course.format.split(',')[0]}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-3 w-3 text-elec-yellow flex-shrink-0" />
            <span className="min-w-0 truncate">Future: {course.futureProofing}/5</span>
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
          </div>
        </div>

        {/* Locations */}
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-xs text-elec-yellow">
            <MapPin className="h-3 w-3" />
            <span>Available Locations:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {course.locations.slice(0, 3).map((location, idx) => (
              <span 
                key={idx} 
                className="text-xs bg-elec-dark/60 px-2 py-1 rounded-md break-words"
              >
                {location}
              </span>
            ))}
            {course.locations.length > 3 && (
              <span className="text-xs bg-elec-dark/60 px-2 py-1 rounded-md">
                +{course.locations.length - 3} more
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
          </div>
        </div>

        {/* Next Dates */}
        <div className="border-t border-elec-yellow/10 pt-3 space-y-2">
          <p className="text-xs text-elec-yellow flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            <span>Upcoming Dates:</span>
          </p>
          <div className="flex flex-wrap gap-2">
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
          </div>
        </div>

        {/* Footer */}
        <div className={`flex ${isMobile ? 'flex-col gap-2' : 'flex-col sm:flex-row sm:justify-between sm:items-center gap-3'} mt-auto pt-3 border-t border-elec-yellow/10`}>
          <div className="space-y-1">
            <p className={`${isMobile ? 'text-xs' : 'text-sm sm:text-xs'} text-amber-400/80 flex items-center gap-1 font-medium`}>
              <PoundSterling className="h-3 w-3" />
              {course.price}
            </p>
            {course.employerSupport && (
              <div className={`flex items-center gap-1 ${isMobile ? 'text-xs' : 'text-xs'} text-green-400`}>
                <Briefcase className="h-3 w-3" />
                <span>Employer Support</span>
              </div>
            )}
          </div>
          
          {isMobile ? (
            <div className="flex gap-2">
              <MobileButton 
                variant="outline" 
                size={isMobile ? "wide" : "sm"}
                className="flex-1 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                onClick={() => onViewDetails(course)}
              >
                View Details
              </MobileButton>
              {onCompare && (
                <MobileButton
                  variant={isInComparison ? "default" : "outline"}
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCompare(course);
                  }}
                  className={isInComparison ? "bg-blue-500 text-white" : "border-blue-500/30 text-blue-400 hover:bg-blue-500/10"}
                >
                  <Plus className="h-4 w-4" />
                </MobileButton>
              )}
            </div>
          ) : (
            <MobileButton 
              variant="outline" 
              size="sm" 
              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 w-full sm:w-auto min-h-[36px]"
              onClick={() => onViewDetails(course)}
            >
              View Details
            </MobileButton>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedCourseCard;
