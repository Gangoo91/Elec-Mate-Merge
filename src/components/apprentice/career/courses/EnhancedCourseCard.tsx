
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock, Star, Calendar, MapPin, Users, BookOpen,
  TrendingUp, PoundSterling, Award, Target,
  CheckCircle, AlertCircle, Briefcase, GraduationCap, ChevronRight
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
      default: return "bg-white/10 text-white border-white/20";
    }
  };

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "Essential Qualifications":
        return { badge: "bg-blue-500/20 text-blue-400 border-blue-500/30", border: "border-blue-500/20 hover:border-blue-500/40", glow: "bg-blue-500/5" };
      case "Emerging Technologies":
        return { badge: "bg-green-500/20 text-green-400 border-green-500/30", border: "border-green-500/20 hover:border-green-500/40", glow: "bg-green-500/5" };
      case "Safety & Compliance":
        return { badge: "bg-orange-500/20 text-orange-400 border-orange-500/30", border: "border-orange-500/20 hover:border-orange-500/40", glow: "bg-orange-500/5" };
      case "Specialised Skills":
        return { badge: "bg-purple-500/20 text-purple-400 border-purple-500/30", border: "border-purple-500/20 hover:border-purple-500/40", glow: "bg-purple-500/5" };
      case "Business & Management":
        return { badge: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30", border: "border-indigo-500/20 hover:border-indigo-500/40", glow: "bg-indigo-500/5" };
      default:
        return { badge: "bg-white/10 text-white border-white/20", border: "border-white/20 hover:border-white/40", glow: "bg-white/5" };
    }
  };

  const categoryStyles = getCategoryStyles(course.category);

  return (
    <Card className={`bg-gradient-to-br from-elec-gray to-elec-card ${categoryStyles.border} h-full flex flex-col overflow-hidden relative transition-all duration-300`}>
      <div className={`absolute top-0 right-0 w-48 h-48 ${categoryStyles.glow} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />

      <CardHeader className="pb-3 relative">
        <div className="flex justify-between items-start gap-2 mb-2">
          <Badge className={`${categoryStyles.badge} text-xs border`}>
            {course.category}
          </Badge>
          <div className="flex items-center gap-1 bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-lg text-xs border border-amber-500/30">
            <Star className="h-3 w-3 fill-amber-400" />
            <span className="font-medium">{course.rating}</span>
          </div>
        </div>

        <CardTitle className="text-lg leading-tight text-white">{course.title}</CardTitle>
        <p className="text-sm text-elec-yellow">{course.provider}</p>
      </CardHeader>

      <CardContent className="pt-0 flex-grow flex flex-col space-y-4 relative">
        <p className="text-sm text-white/70 leading-relaxed line-clamp-4 text-justify">{course.description}</p>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
            <Clock className="h-3.5 w-3.5 text-elec-yellow flex-shrink-0" />
            <span className="text-xs text-white/80">{course.duration}</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
            <Users className="h-3.5 w-3.5 text-elec-yellow flex-shrink-0" />
            <span className="text-xs text-white/80">{course.level}</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
            <BookOpen className="h-3.5 w-3.5 text-elec-yellow flex-shrink-0" />
            <span className="text-xs text-white/80">{course.format.split(',')[0]}</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
            <TrendingUp className="h-3.5 w-3.5 text-elec-yellow flex-shrink-0" />
            <span className="text-xs text-white/80">Future: {course.futureProofing || 3}/5</span>
          </div>
        </div>

        {/* Industry Demand & Career Impact */}
        <div className="space-y-2 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/70">Industry Demand:</span>
            <Badge className={`${getDemandColor(course.industryDemand)} text-xs border`}>
              {course.industryDemand}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/70">Salary Impact:</span>
            <span className="text-xs text-green-400 font-medium">{course.salaryImpact}</span>
          </div>
        </div>

        {/* Career Outcomes Preview */}
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-elec-yellow flex items-center gap-1.5">
            <div className="p-1 rounded bg-elec-yellow/20">
              <Target className="h-3 w-3" />
            </div>
            Career Outcomes:
          </h4>
          <div className="space-y-1.5">
            {course.careerOutcomes?.length > 0 ? (
              <>
                {course.careerOutcomes.slice(0, 2).map((outcome, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                    <span className="text-white/80">{outcome}</span>
                  </div>
                ))}
                {course.careerOutcomes.length > 2 && (
                  <div className="text-xs text-white/60">
                    +{course.careerOutcomes.length - 2} more outcomes
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center gap-2 text-xs">
                <AlertCircle className="h-3 w-3 text-amber-400 flex-shrink-0" />
                <span className="text-white/70">Contact provider for details</span>
              </div>
            )}
          </div>
        </div>

        {/* Locations */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-elec-yellow">
            <div className="p-1 rounded bg-elec-yellow/20">
              <MapPin className="h-3 w-3" />
            </div>
            <span>Available Locations:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {course.locations?.length > 0 ? (
              <>
                {course.locations.slice(0, 4).map((location, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded-md text-white/80"
                  >
                    {location}
                  </span>
                ))}
                {course.locations.length > 4 && (
                  <span className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded-md text-white/60">
                    +{course.locations.length - 4} more
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs text-white/60 italic">
                Contact provider for details
              </span>
            )}
          </div>
        </div>

        {/* Accreditations */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-elec-yellow">
            <div className="p-1 rounded bg-elec-yellow/20">
              <Award className="h-3 w-3" />
            </div>
            <span>Accreditations:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {course.accreditation?.length > 0 ? (
              <>
                {course.accreditation.slice(0, 2).map((acc, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30">
                    {acc}
                  </Badge>
                ))}
                {course.accreditation.length > 2 && (
                  <span className="text-xs text-white/60">
                    +{course.accreditation.length - 2} more
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs text-white/60 italic">
                Not specified by provider
              </span>
            )}
          </div>
        </div>

        {/* Next Dates */}
        <div className="border-t border-white/10 pt-3 space-y-2">
          <p className="text-xs text-elec-yellow flex items-center gap-1.5">
            <div className="p-1 rounded bg-elec-yellow/20">
              <Calendar className="h-3 w-3" />
            </div>
            <span>Upcoming Dates:</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {course.nextDates?.length > 0 ? (
              <>
                {course.nextDates.slice(0, 3).map((date, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded-md text-white/80"
                  >
                    {date}
                  </span>
                ))}
                {course.nextDates.length > 3 && (
                  <span className="text-xs text-white/60">
                    +{course.nextDates.length - 3} more
                  </span>
                )}
                {(course as any).isLive && (
                  <Badge className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30">Live</Badge>
                )}
              </>
            ) : (
              <span className="text-xs text-white/60 italic">
                Contact provider for dates
              </span>
            )}
          </div>
        </div>

        {/* Footer - stacked on mobile */}
        <div className="flex flex-col gap-3 mt-auto pt-3 border-t border-white/10">
          {/* Price row */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-base sm:text-sm text-green-400 flex items-center gap-1.5 font-semibold">
                <PoundSterling className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                {course.price}
              </p>
              {course.employerSupport && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <Briefcase className="h-3 w-3" />
                  <span>Employer Support</span>
                </div>
              )}
            </div>
            {/* Desktop button */}
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex h-10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation active:scale-95 transition-all"
              onClick={() => onViewDetails(course)}
            >
              View Details
            </Button>
          </div>
          {/* Mobile full-width button */}
          <Button
            variant="outline"
            className="sm:hidden w-full h-12 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 font-semibold touch-manipulation active:scale-[0.98]"
            onClick={() => onViewDetails(course)}
          >
            View Details
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedCourseCard;
