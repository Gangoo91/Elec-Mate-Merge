import { motion } from "framer-motion";
import { Star, Clock, GraduationCap, ChevronRight, TrendingUp, TrendingDown, Minus, MapPin, Award, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { EnhancedCareerCourse } from "@/components/apprentice/career/courses/enhancedCoursesData";

interface PremiumCourseCardProps {
  course: EnhancedCareerCourse;
  onClick: () => void;
  index?: number;
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "Essential Updates": { bg: "bg-red-500/90", text: "text-white", border: "border-red-500/40" },
  "Emerging Technologies": { bg: "bg-green-500/90", text: "text-white", border: "border-green-500/40" },
  "Safety & Compliance": { bg: "bg-blue-500/90", text: "text-white", border: "border-blue-500/40" },
  "Specialised Systems": { bg: "bg-purple-500/90", text: "text-white", border: "border-purple-500/40" },
  "Professional Development": { bg: "bg-orange-500/90", text: "text-white", border: "border-orange-500/40" },
  "Business Skills": { bg: "bg-cyan-500/90", text: "text-white", border: "border-cyan-500/40" },
};

const demandConfig = {
  High: { icon: Flame, color: "text-red-400", bg: "bg-red-500/20", border: "border-red-500/30", label: "High Demand" },
  Medium: { icon: Minus, color: "text-amber-400", bg: "bg-amber-500/20", border: "border-amber-500/30", label: "Moderate" },
  Low: { icon: TrendingDown, color: "text-green-400", bg: "bg-green-500/20", border: "border-green-500/30", label: "Available" },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  }),
};

const getCourseImage = (course: EnhancedCareerCourse) => {
  if (course.image_url) return course.image_url;

  const categoryImages: Record<string, string> = {
    "Essential Updates": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=200&fit=crop",
    "Emerging Technologies": "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=200&fit=crop",
    "Safety & Compliance": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=200&fit=crop",
    "Specialised Systems": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
    "Professional Development": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop",
    "Business Skills": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop",
  };

  return categoryImages[course.category] || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=200&fit=crop";
};

const PremiumCourseCard = ({ course, onClick, index = 0 }: PremiumCourseCardProps) => {
  const categoryStyle = categoryColors[course.category] || categoryColors["Essential Updates"];
  const demandStyle = demandConfig[course.industryDemand] || demandConfig.Medium;
  const DemandIcon = demandStyle.icon;
  const firstLocation = course.locations?.[0];
  const firstAccreditation = course.accreditation?.[0];

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative cursor-pointer rounded-xl border border-white/10 bg-elec-gray/50 overflow-hidden transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10"
    >
      {/* Image Section — taller h-44 with gradient */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={getCourseImage(course)}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=200&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-elec-gray via-elec-gray/30 to-transparent" />

        {/* Category Badge — bottom-left on image */}
        <div className="absolute bottom-3 left-3">
          <Badge className={`${categoryStyle.bg} ${categoryStyle.text} border-0 text-[10px] font-semibold px-2.5 py-1`}>
            {course.category}
          </Badge>
        </div>

        {/* Rating Badge — gold, top-right */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1">
            <Star className="h-3.5 w-3.5 text-elec-yellow fill-elec-yellow" />
            <span className="text-xs font-bold text-white">{course.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-2.5">
        {/* Provider + LIVE badge */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-blue-400 truncate">{course.provider}</p>
          {course.isLive && (
            <Badge className="bg-green-500 text-white border-0 text-[9px] font-bold px-2 py-0.5 animate-pulse ml-2 flex-shrink-0">
              LIVE
            </Badge>
          )}
        </div>

        {/* Title — 2 lines max */}
        <h3 className="text-sm font-bold text-white leading-tight line-clamp-2 min-h-[2.5rem]">
          {course.title}
        </h3>

        {/* Description preview — 1 line */}
        <p className="text-xs text-white/50 line-clamp-1">
          {course.description}
        </p>

        {/* Stat Pills Row: Duration, Level, Location */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex items-center gap-1 bg-white/10 rounded-full px-2.5 py-1">
            <Clock className="h-3 w-3 text-white/60" />
            <span className="text-[11px] text-white/80">{course.duration}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/10 rounded-full px-2.5 py-1">
            <GraduationCap className="h-3 w-3 text-white/60" />
            <span className="text-[11px] text-white/80">{course.level}</span>
          </div>
          {firstLocation && (
            <div className="flex items-center gap-1 bg-white/10 rounded-full px-2.5 py-1">
              <MapPin className="h-3 w-3 text-white/60" />
              <span className="text-[11px] text-white/80 truncate max-w-[80px]">{firstLocation}</span>
            </div>
          )}
        </div>

        {/* Accreditation + Demand Row */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {firstAccreditation && (
            <div className="flex items-center gap-1 bg-blue-500/15 border border-blue-500/25 rounded-full px-2.5 py-1">
              <Award className="h-3 w-3 text-blue-400" />
              <span className="text-[11px] text-blue-300 truncate max-w-[120px]">{firstAccreditation}</span>
            </div>
          )}
          <div className={`flex items-center gap-1 ${demandStyle.bg} border ${demandStyle.border} rounded-full px-2.5 py-1 ml-auto`}>
            <DemandIcon className={`h-3 w-3 ${demandStyle.color}`} />
            <span className={`text-[11px] font-medium ${demandStyle.color}`}>{demandStyle.label}</span>
          </div>
        </div>

        {/* Bottom: Price left, View → right */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-base font-bold text-white">{course.price}</span>
          <span className="flex items-center gap-1 text-xs font-medium text-white/60 group-hover:text-blue-400 transition-colors">
            View
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumCourseCard;
