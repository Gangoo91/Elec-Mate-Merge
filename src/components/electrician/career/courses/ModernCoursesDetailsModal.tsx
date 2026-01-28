import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { EnhancedCareerCourse } from "@/components/apprentice/career/courses/enhancedCoursesData";
import {
  Star,
  Clock,
  MapPin,
  ExternalLink,
  Calendar,
  TrendingUp,
  Award,
  CheckCircle,
  GraduationCap,
  Building,
  Share2,
  ArrowLeft,
  PoundSterling,
  BookOpen,
  MessageSquare,
  Flame,
  Monitor,
  AlertTriangle,
  Info
} from "lucide-react";

interface ModernCoursesDetailsModalProps {
  course: EnhancedCareerCourse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEnquire?: (course: EnhancedCareerCourse) => void;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  "Essential Updates": { bg: "bg-red-500", text: "text-white" },
  "Emerging Technologies": { bg: "bg-green-500", text: "text-white" },
  "Safety & Compliance": { bg: "bg-blue-500", text: "text-white" },
  "Specialised Systems": { bg: "bg-purple-500", text: "text-white" },
  "Professional Development": { bg: "bg-orange-500", text: "text-white" },
  "Business Skills": { bg: "bg-cyan-500", text: "text-white" },
};

const demandConfig: Record<string, { color: string; bg: string; border: string; label: string }> = {
  "High": { color: "text-red-400", bg: "bg-red-500/10", border: "border-l-red-500", label: "High Demand" },
  "Medium": { color: "text-amber-400", bg: "bg-amber-500/10", border: "border-l-amber-500", label: "Moderate Demand" },
  "Low": { color: "text-green-400", bg: "bg-green-500/10", border: "border-l-green-500", label: "Available" },
};

const getCourseImage = (course: EnhancedCareerCourse) => {
  if (course.image_url) return course.image_url;

  const categoryImages: Record<string, string> = {
    "Essential Updates": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=400&fit=crop",
    "Emerging Technologies": "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=400&fit=crop",
    "Safety & Compliance": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=400&fit=crop",
    "Specialised Systems": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
    "Professional Development": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    "Business Skills": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
  };

  return categoryImages[course.category] || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=400&fit=crop";
};

const ModernCoursesDetailsModal = ({ course, open, onOpenChange, onEnquire }: ModernCoursesDetailsModalProps) => {
  if (!course) return null;

  const categoryStyle = categoryColors[course.category] || { bg: "bg-blue-500", text: "text-white" };
  const demandStyle = demandConfig[course.industryDemand] || demandConfig.Medium;

  const handleExternalLink = () => {
    if (course.external_url) {
      window.open(course.external_url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: course.title,
          text: `Check out this course: ${course.title} by ${course.provider}`,
          url: course.external_url || window.location.href
        });
      } catch {
        // User cancelled or error
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal - Full screen on mobile, centered on desktop */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 sm:inset-4 sm:m-auto sm:max-w-3xl sm:max-h-[90vh] bg-elec-gray sm:rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-elec-gray/95 backdrop-blur-lg border-b border-white/10">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="text-white hover:text-white hover:bg-white/10 gap-1 touch-manipulation active:scale-[0.98]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sm:hidden">Back</span>
                <span className="hidden sm:inline">Close</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="text-white hover:text-white hover:bg-white/10"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-28">
              {/* Hero Image with rating badge */}
              <div className="relative h-48 sm:h-56">
                <img
                  src={getCourseImage(course)}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=400&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-elec-gray via-elec-gray/50 to-transparent" />

                {/* Category Badge on Image */}
                <div className="absolute bottom-4 left-4">
                  <Badge className={`${categoryStyle.bg} ${categoryStyle.text} border-0 text-xs font-semibold`}>
                    {course.category}
                  </Badge>
                </div>

                {/* Gold Rating Badge — top-right */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <Star className="h-4 w-4 text-elec-yellow fill-elec-yellow" />
                    <span className="text-sm font-bold text-white">{course.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 space-y-5 -mt-4">
                {/* Title & Provider */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-2">
                    {course.title}
                  </h2>
                  <div className="flex items-center gap-2 text-blue-400">
                    <Building className="h-4 w-4" />
                    <span className="font-medium">{course.provider}</span>
                  </div>
                </div>

                {/* Quick Stats Grid — 2x2 */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <Clock className="h-4 w-4 text-blue-400 mx-auto mb-1.5" />
                    <p className="text-[10px] text-white/50 uppercase tracking-wider">Duration</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{course.duration}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <GraduationCap className="h-4 w-4 text-purple-400 mx-auto mb-1.5" />
                    <p className="text-[10px] text-white/50 uppercase tracking-wider">Level</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{course.level}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <Monitor className="h-4 w-4 text-green-400 mx-auto mb-1.5" />
                    <p className="text-[10px] text-white/50 uppercase tracking-wider">Format</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{course.format || "In-Person"}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <PoundSterling className="h-4 w-4 text-elec-yellow mx-auto mb-1.5" />
                    <p className="text-[10px] text-white/50 uppercase tracking-wider">Price</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{course.price}</p>
                  </div>
                </div>

                {/* Industry Demand Card — full-width, coloured left border */}
                <div className={`${demandStyle.bg} border-l-4 ${demandStyle.border} rounded-lg p-4`}>
                  <div className="flex items-center gap-3">
                    <Flame className={`h-5 w-5 ${demandStyle.color} flex-shrink-0`} />
                    <div>
                      <p className={`text-sm font-semibold ${demandStyle.color}`}>{demandStyle.label}</p>
                      <p className="text-xs text-white/60 mt-0.5">
                        {course.industryDemand === "High"
                          ? "This qualification is in strong demand across the UK electrical industry"
                          : course.industryDemand === "Medium"
                          ? "Steady demand for this qualification across UK employers"
                          : "Niche qualification with targeted opportunities"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Salary Impact Card — enhanced with gradient */}
                {course.salaryImpact && (
                  <div className="bg-gradient-to-br from-blue-500/15 to-purple-500/15 border border-blue-500/25 rounded-xl p-4">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-blue-400" />
                      </div>
                      <h4 className="text-sm font-bold text-white">Salary Impact</h4>
                    </div>
                    <p className="text-blue-300 font-semibold text-base">{course.salaryImpact}</p>
                  </div>
                )}

                {/* Accreditation Badges — enhanced with Award icon */}
                {course.accreditation && course.accreditation.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4 text-elec-yellow" />
                      Accreditation
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {course.accreditation.map((accred, index) => (
                        <div key={index} className="flex items-center gap-1.5 bg-blue-500/15 border border-blue-500/25 rounded-lg px-3 py-2">
                          <Award className="h-3.5 w-3.5 text-blue-400 flex-shrink-0" />
                          <span className="text-sm text-blue-300 font-medium">{accred}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-400" />
                    Description
                  </h3>
                  <p className="text-white/80 leading-relaxed text-sm">{course.description}</p>
                </div>

                {/* Course Content — numbered list in subtle cards */}
                {course.courseOutline && course.courseOutline.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Course Content
                    </h3>
                    <div className="space-y-2">
                      {course.courseOutline.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 bg-white/5 border border-white/8 rounded-lg p-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-sm text-white/90 pt-0.5">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prerequisites — info card with purple accent */}
                {course.prerequisites && course.prerequisites.length > 0 && (
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Info className="h-4 w-4 text-purple-400" />
                      Prerequisites
                    </h3>
                    <div className="space-y-2">
                      {course.prerequisites.map((prereq, index) => (
                        <div key={index} className="flex items-start gap-2.5 text-white/80">
                          <AlertTriangle className="h-3.5 w-3.5 text-purple-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{prereq}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Career Outcomes — green check icons */}
                {course.careerOutcomes && course.careerOutcomes.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4 text-elec-yellow" />
                      Career Outcomes
                    </h3>
                    <div className="space-y-2.5">
                      {course.careerOutcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-2.5">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-white/90">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Locations */}
                {course.locations && course.locations.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-400" />
                      Locations
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {course.locations.map((location, index) => (
                        <Badge key={index} variant="outline" className="border-white/20 text-white text-xs py-1.5 px-3">
                          {location}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next Dates */}
                {course.nextDates && course.nextDates.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-orange-400" />
                      Upcoming Dates
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {course.nextDates.slice(0, 6).map((date, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="justify-center border-white/20 text-white py-2 text-xs"
                        >
                          {date}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Fixed Bottom CTA — enhanced */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-elec-gray/95 backdrop-blur-lg border-t border-white/10 safe-area-inset-bottom">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="text-[10px] text-white/50 mb-0.5">Price</div>
                  <div className="text-lg font-bold text-white flex items-center gap-0.5">
                    <PoundSterling className="h-4 w-4" />
                    {course.price.replace(/[£$]/g, '')}
                  </div>
                </div>
                <div className="flex-1 flex gap-2">
                  {onEnquire && (
                    <Button
                      onClick={() => onEnquire(course)}
                      variant="outline"
                      className="flex-1 h-12 bg-white/5 border-white/20 text-white hover:text-white hover:bg-white/10 font-medium gap-2 touch-manipulation"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Enquire</span>
                    </Button>
                  )}
                  <Button
                    onClick={handleExternalLink}
                    disabled={!course.external_url}
                    className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold gap-2 touch-manipulation"
                  >
                    <span>Visit</span>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModernCoursesDetailsModal;
