import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { EnhancedCareerCourse } from "@/components/apprentice/career/courses/enhancedCoursesData";
import { 
  Star, 
  Clock, 
  MapPin, 
  Zap, 
  ExternalLink, 
  Calendar, 
  Users, 
  TrendingUp, 
  Award, 
  CheckCircle,
  GraduationCap,
  Building,
  Bookmark,
  X
} from "lucide-react";

interface ModernCoursesDetailsModalProps {
  course: EnhancedCareerCourse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModernCoursesDetailsModal = ({ course, open, onOpenChange }: ModernCoursesDetailsModalProps) => {
  if (!course) return null;

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

  const handleExternalLink = () => {
    if (course.external_url) {
      window.open(course.external_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-elec-card via-elec-card/95 to-elec-card/90 border-elec-yellow/20">
        <DialogHeader className="space-y-0 pb-6">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Header Content */}
          <div className="space-y-4 pr-8">
            {/* Title and Provider */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
                {course.title}
              </h2>
              <div className="flex items-center gap-3 text-elec-yellow">
                <Building className="h-5 w-5" />
                <span className="font-medium text-lg">{course.provider}</span>
              </div>
            </div>

            {/* Badges and Rating */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white font-medium">{course.rating.toFixed(1)}</span>
              </div>
              
              <Badge className={cn("text-sm", getCategoryColor(course.category))}>
                {course.category}
              </Badge>
              
              <Badge className={cn("text-sm", getDemandColor(course.industryDemand))}>
                {course.industryDemand} Demand
              </Badge>
              
              {course.isLive && (
                <Badge className="bg-elec-yellow/20 border-elec-yellow/30 text-elec-yellow">
                  Live Data
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-8">
          {/* Key Information Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm text-white/80">Duration</span>
              </div>
              <div className="font-semibold text-white">{course.duration}</div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm text-white/80">Level</span>
              </div>
              <div className="font-semibold text-white">{course.level}</div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm text-white/80">Price</span>
              </div>
              <div className="font-semibold text-white">{course.price}</div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm text-white/80">Format</span>
              </div>
              <div className="font-semibold text-white text-sm">{course.format}</div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-elec-yellow" />
              Course Description
            </h3>
            <p className="text-white/90 leading-relaxed">{course.description}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Course Outline */}
              {course.courseOutline && course.courseOutline.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-elec-yellow" />
                    Course Content
                  </h3>
                  <div className="space-y-2">
                    {course.courseOutline.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 text-white/90">
                        <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prerequisites */}
              {course.prerequisites && course.prerequisites.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Prerequisites</h3>
                  <div className="space-y-2">
                    {course.prerequisites.map((prereq, index) => (
                      <div key={index} className="flex items-start gap-3 text-white/90">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm leading-relaxed">{prereq}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Locations */}
              {course.locations && course.locations.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-elec-yellow" />
                    Locations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {course.locations.map((location, index) => (
                      <Badge key={index} variant="outline" className="border-white/20 text-white/80">
                        {location}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Career Outcomes */}
              {course.careerOutcomes && course.careerOutcomes.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Award className="h-5 w-5 text-elec-yellow" />
                    Career Outcomes
                  </h3>
                  <div className="space-y-2">
                    {course.careerOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start gap-3 text-white/90">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm leading-relaxed">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Salary Impact */}
              {course.salaryImpact && (
                <div className="bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 rounded-lg p-4 border border-elec-yellow/20">
                  <h4 className="font-semibold text-white mb-2">Salary Impact</h4>
                  <p className="text-elec-yellow font-medium">{course.salaryImpact}</p>
                </div>
              )}

              {/* Accreditation */}
              {course.accreditation && course.accreditation.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Accreditation</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.accreditation.map((accred, index) => (
                      <Badge key={index} className="bg-blue-500/20 border-blue-500/30 text-blue-300">
                        {accred}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Next Dates */}
              {course.nextDates && course.nextDates.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-elec-yellow" />
                    Upcoming Dates
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {course.nextDates.slice(0, 6).map((date, index) => (
                      <Badge key={index} variant="outline" className="justify-center border-white/20 text-white/80 py-2">
                        {date}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
            {course.external_url && (
              <Button
                onClick={handleExternalLink}
                className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold flex-1"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Course Details
              </Button>
            )}
            
            <Button
              variant="outline"
              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 flex-1"
            >
              <Bookmark className="h-4 w-4 mr-2" />
              Save Course
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModernCoursesDetailsModal;