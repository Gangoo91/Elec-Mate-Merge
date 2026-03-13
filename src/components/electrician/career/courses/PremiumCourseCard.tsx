import { motion } from 'framer-motion';
import {
  Star,
  Clock,
  GraduationCap,
  ChevronRight,
  TrendingDown,
  Minus,
  MapPin,
  Flame,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { EnhancedCareerCourse } from '@/components/apprentice/career/courses/enhancedCoursesData';

interface PremiumCourseCardProps {
  course: EnhancedCareerCourse;
  onClick: () => void;
  index?: number;
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'Essential Updates': { bg: 'bg-red-500/90', text: 'text-white', border: 'border-red-500/40' },
  'Emerging Technologies': {
    bg: 'bg-green-500/90',
    text: 'text-white',
    border: 'border-green-500/40',
  },
  'Safety & Compliance': { bg: 'bg-blue-500/90', text: 'text-white', border: 'border-blue-500/40' },
  'Specialised Systems': {
    bg: 'bg-purple-500/90',
    text: 'text-white',
    border: 'border-purple-500/40',
  },
  'Professional Development': {
    bg: 'bg-orange-500/90',
    text: 'text-white',
    border: 'border-orange-500/40',
  },
  'Business Skills': { bg: 'bg-cyan-500/90', text: 'text-white', border: 'border-cyan-500/40' },
};

const demandDotColor: Record<string, string> = {
  High: 'bg-red-400',
  Medium: 'bg-amber-400',
  Low: 'bg-green-400',
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.01,
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  }),
};

const getCourseImage = (course: EnhancedCareerCourse, size: 'thumb' | 'card' = 'card') => {
  if (course.image_url) return course.image_url;

  const dim = size === 'thumb' ? 'w=160&h=160' : 'w=400&h=180';
  const categoryImages: Record<string, string> = {
    'Essential Updates': `https://images.unsplash.com/photo-1621905251189-08b45d6a269e?${dim}&fit=crop`,
    'Emerging Technologies': `https://images.unsplash.com/photo-1593941707882-a5bba14938c7?${dim}&fit=crop`,
    'Safety & Compliance': `https://images.unsplash.com/photo-1581092160562-40aa08e78837?${dim}&fit=crop`,
    'Specialised Systems': `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?${dim}&fit=crop`,
    'Professional Development': `https://images.unsplash.com/photo-1434030216411-0b793f4b4173?${dim}&fit=crop`,
    'Business Skills': `https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?${dim}&fit=crop`,
  };

  return (
    categoryImages[course.category] ||
    `https://images.unsplash.com/photo-1621905251189-08b45d6a269e?${dim}&fit=crop`
  );
};

const PremiumCourseCard = ({ course, onClick, index = 0 }: PremiumCourseCardProps) => {
  const categoryStyle = categoryColors[course.category] || categoryColors['Essential Updates'];
  const demandDot = demandDotColor[course.industryDemand] || demandDotColor.Medium;
  const firstLocation = course.locations?.[0];

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group cursor-pointer touch-manipulation active:scale-[0.98]
        rounded-none border-x-0 border-b border-white/10 bg-elec-gray/50
        sm:rounded-xl sm:border sm:border-white/10 sm:hover:border-blue-500/40 sm:hover:shadow-lg sm:hover:shadow-blue-500/10
        overflow-hidden transition-colors duration-200"
    >
      {/* ===== MOBILE: Horizontal layout ===== */}
      <div className="flex gap-3 p-3 sm:hidden">
        {/* Thumbnail */}
        <img
          src={getCourseImage(course, 'thumb')}
          alt={course.title}
          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=160&h=160&fit=crop';
          }}
        />

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          {/* Title — 2 line clamp */}
          <h3 className="text-sm font-bold text-white leading-tight line-clamp-2">
            {course.title}
          </h3>

          {/* Provider · Rating · Duration */}
          <div className="flex items-center gap-1.5 text-xs text-white">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${demandDot}`} />
            <span className="truncate">{course.provider}</span>
            <span className="text-white/40">·</span>
            <Star className="h-3 w-3 text-elec-yellow fill-elec-yellow flex-shrink-0" />
            <span>{course.rating.toFixed(1)}</span>
            <span className="text-white/40">·</span>
            <span className="truncate">{course.duration}</span>
          </div>

          {/* Level | Location */}
          <div className="flex items-center gap-1.5 text-[11px] text-white">
            <GraduationCap className="h-3 w-3 flex-shrink-0" />
            <span>{course.level}</span>
            {firstLocation && (
              <>
                <span className="text-white/40">|</span>
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{firstLocation}</span>
              </>
            )}
          </div>

          {/* Price + View */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">{course.price}</span>
            <span className="flex items-center gap-0.5 text-xs font-medium text-white">
              View
              <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* ===== DESKTOP: Vertical card layout ===== */}
      <div className="hidden sm:block">
        {/* Image Section */}
        <div className="relative h-32 overflow-hidden">
          <img
            src={getCourseImage(course, 'card')}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=180&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-elec-gray via-elec-gray/30 to-transparent" />

          {/* Category Badge */}
          <div className="absolute bottom-3 left-3">
            <Badge
              className={`${categoryStyle.bg} ${categoryStyle.text} border-0 text-[10px] font-semibold px-2.5 py-1`}
            >
              {course.category}
            </Badge>
          </div>

          {/* Rating Badge */}
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
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${demandDot}`} />
              <p className="text-xs font-medium text-blue-400 truncate">{course.provider}</p>
            </div>
            {course.isLive && (
              <Badge className="bg-green-500 text-white border-0 text-[9px] font-bold px-2 py-0.5 animate-pulse ml-2 flex-shrink-0">
                LIVE
              </Badge>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-white leading-tight line-clamp-2 min-h-[2.5rem]">
            {course.title}
          </h3>

          {/* Description preview — desktop only */}
          <p className="text-xs text-white line-clamp-1">{course.description}</p>

          {/* Stat Pills Row */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="flex items-center gap-1 bg-white/10 rounded-full px-2.5 py-1">
              <Clock className="h-3 w-3 text-white" />
              <span className="text-[11px] text-white">{course.duration}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/10 rounded-full px-2.5 py-1">
              <GraduationCap className="h-3 w-3 text-white" />
              <span className="text-[11px] text-white">{course.level}</span>
            </div>
            {firstLocation && (
              <div className="flex items-center gap-1 bg-white/10 rounded-full px-2.5 py-1">
                <MapPin className="h-3 w-3 text-white" />
                <span className="text-[11px] text-white truncate max-w-[80px]">
                  {firstLocation}
                </span>
              </div>
            )}
          </div>

          {/* Bottom: Price left, View right */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <span className="text-base font-bold text-white">{course.price}</span>
            <span className="flex items-center gap-1 text-xs font-medium text-white group-hover:text-blue-400 transition-colors">
              View
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumCourseCard;
