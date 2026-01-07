import { motion } from "framer-motion";
import { Star, Clock, GraduationCap, ChevronRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  "Specialized Systems": { bg: "bg-purple-500/90", text: "text-white", border: "border-purple-500/40" },
  "Professional Development": { bg: "bg-orange-500/90", text: "text-white", border: "border-orange-500/40" },
  "Business Skills": { bg: "bg-cyan-500/90", text: "text-white", border: "border-cyan-500/40" },
};

const demandConfig = {
  High: { icon: TrendingUp, color: "text-red-400", bg: "bg-red-500/20", label: "High Demand" },
  Medium: { icon: Minus, color: "text-amber-400", bg: "bg-amber-500/20", label: "Moderate" },
  Low: { icon: TrendingDown, color: "text-green-400", bg: "bg-green-500/20", label: "Available" },
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

// Default course images based on category
const getCourseImage = (course: EnhancedCareerCourse) => {
  if (course.image_url) return course.image_url;

  const categoryImages: Record<string, string> = {
    "Essential Updates": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=200&fit=crop",
    "Emerging Technologies": "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=200&fit=crop",
    "Safety & Compliance": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=200&fit=crop",
    "Specialized Systems": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
    "Professional Development": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop",
    "Business Skills": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop",
  };

  return categoryImages[course.category] || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=200&fit=crop";
};

const PremiumCourseCard = ({ course, onClick, index = 0 }: PremiumCourseCardProps) => {
  const categoryStyle = categoryColors[course.category] || categoryColors["Essential Updates"];
  const demandStyle = demandConfig[course.industryDemand] || demandConfig.Medium;
  const DemandIcon = demandStyle.icon;

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
      {/* Top Accent Line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500/60 via-blue-400 to-blue-500/60" />

      {/* Image Section */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={getCourseImage(course)}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=200&fit=crop";
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-elec-gray via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={`${categoryStyle.bg} ${categoryStyle.text} border-0 text-[10px] font-semibold px-2 py-0.5`}>
            {course.category}
          </Badge>
        </div>

        {/* Live Badge */}
        {course.isLive && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-green-500 text-white border-0 text-[10px] font-semibold px-2 py-0.5 animate-pulse">
              LIVE
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Provider */}
        <p className="text-xs font-medium text-blue-400 truncate">{course.provider}</p>

        {/* Title */}
        <h3 className="text-sm font-bold text-white leading-tight line-clamp-2 min-h-[2.5rem]">
          {course.title}
        </h3>

        {/* Meta Row */}
        <div className="flex items-center gap-3 text-xs text-white">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-elec-yellow fill-elec-yellow" />
            <span className="font-medium">{course.rating.toFixed(1)}</span>
          </div>
          <div className="w-px h-3 bg-white/20" />
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-white/70" />
            <span>{course.duration}</span>
          </div>
          <div className="w-px h-3 bg-white/20" />
          <div className="flex items-center gap-1">
            <GraduationCap className="h-3.5 w-3.5 text-white/70" />
            <span>{course.level}</span>
          </div>
        </div>

        {/* Price & Demand Row */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-sm font-bold text-white">{course.price}</span>
          <Badge className={`${demandStyle.bg} ${demandStyle.color} border-0 text-[10px] font-medium gap-1`}>
            <DemandIcon className="h-3 w-3" />
            {demandStyle.label}
          </Badge>
        </div>

        {/* View Details Button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between text-white hover:text-white hover:bg-white/10 group/btn mt-1"
        >
          <span className="text-xs font-medium">View Details</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
};

export default PremiumCourseCard;
