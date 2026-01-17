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
  X,
  Share2,
  ArrowLeft,
  Zap,
  PoundSterling,
  BookOpen
} from "lucide-react";

interface ModernCoursesDetailsModalProps {
  course: EnhancedCareerCourse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  "Essential Updates": { bg: "bg-red-500", text: "text-white" },
  "Emerging Technologies": { bg: "bg-green-500", text: "text-white" },
  "Safety & Compliance": { bg: "bg-blue-500", text: "text-white" },
  "Specialized Systems": { bg: "bg-purple-500", text: "text-white" },
  "Professional Development": { bg: "bg-orange-500", text: "text-white" },
  "Business Skills": { bg: "bg-cyan-500", text: "text-white" },
};

const demandColors: Record<string, { bg: string; text: string }> = {
  "High": { bg: "bg-red-500/20", text: "text-red-300" },
  "Medium": { bg: "bg-amber-500/20", text: "text-amber-300" },
  "Low": { bg: "bg-green-500/20", text: "text-green-300" },
};

// Default course images based on category
const getCourseImage = (course: EnhancedCareerCourse) => {
  if (course.image_url) return course.image_url;

  const categoryImages: Record<string, string> = {
    "Essential Updates": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=400&fit=crop",
    "Emerging Technologies": "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=400&fit=crop",
    "Safety & Compliance": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=400&fit=crop",
    "Specialized Systems": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
    "Professional Development": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    "Business Skills": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
  };

  return categoryImages[course.category] || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=400&fit=crop";
};

const ModernCoursesDetailsModal = ({ course, open, onOpenChange }: ModernCoursesDetailsModalProps) => {
  if (!course) return null;

  const categoryStyle = categoryColors[course.category] || { bg: "bg-blue-500", text: "text-white" };
  const demandStyle = demandColors[course.industryDemand] || demandColors.Medium;

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
      } catch (err) {
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
            <div className="flex-1 overflow-y-auto pb-24">
              {/* Hero Image */}
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
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 space-y-6 -mt-4">
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

                {/* Meta Row */}
                <div className="flex flex-wrap items-center gap-4 py-3 border-y border-white/10">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 text-elec-yellow fill-elec-yellow" />
                    <span className="font-semibold text-white">{course.rating.toFixed(1)}</span>
                  </div>
                  <div className="w-px h-4 bg-white/20" />
                  <div className="flex items-center gap-1.5 text-white">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="w-px h-4 bg-white/20" />
                  <div className="flex items-center gap-1.5 text-white">
                    <Zap className="h-4 w-4" />
                    <span>{course.level}</span>
                  </div>
                  <Badge className={`${demandStyle.bg} ${demandStyle.text} border-0 ml-auto`}>
                    {course.industryDemand} Demand
                  </Badge>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-400" />
                    Description
                  </h3>
                  <p className="text-white leading-relaxed text-sm">{course.description}</p>
                </div>

                {/* Course Outline */}
                {course.courseOutline && course.courseOutline.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Course Content
                    </h3>
                    <div className="space-y-2">
                      {course.courseOutline.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 text-white">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prerequisites */}
                {course.prerequisites && course.prerequisites.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-purple-400" />
                      Prerequisites
                    </h3>
                    <div className="space-y-2">
                      {course.prerequisites.map((prereq, index) => (
                        <div key={index} className="flex items-start gap-3 text-white">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{prereq}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Career Outcomes */}
                {course.careerOutcomes && course.careerOutcomes.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4 text-elec-yellow" />
                      Career Outcomes
                    </h3>
                    <div className="space-y-2">
                      {course.careerOutcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-3 text-white">
                          <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Salary Impact */}
                {course.salaryImpact && (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-blue-400" />
                      <h4 className="text-sm font-semibold text-white">Salary Impact</h4>
                    </div>
                    <p className="text-blue-300 font-medium">{course.salaryImpact}</p>
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
                        <Badge key={index} variant="outline" className="border-white/20 text-white text-xs">
                          {location}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Accreditation */}
                {course.accreditation && course.accreditation.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Accreditation</h3>
                    <div className="flex flex-wrap gap-2">
                      {course.accreditation.map((accred, index) => (
                        <Badge key={index} className="bg-blue-500/20 text-blue-300 border-0 text-xs">
                          {accred}
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

            {/* Fixed Bottom CTA */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-elec-gray/95 backdrop-blur-lg border-t border-white/10">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-white mb-0.5">Price</div>
                  <div className="text-lg font-bold text-white flex items-center gap-1">
                    <PoundSterling className="h-4 w-4" />
                    {course.price.replace(/[£$]/g, '')}
                  </div>
                </div>
                <Button
                  onClick={handleExternalLink}
                  disabled={!course.external_url}
                  className="bg-blue-500 text-white hover:bg-blue-600 font-semibold gap-2 px-6"
                >
                  <span>Visit Provider</span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModernCoursesDetailsModal;
