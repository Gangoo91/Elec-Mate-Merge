import { motion } from 'framer-motion';
import {
  Star,
  Clock,
  GraduationCap,
  ChevronRight,
  MapPin,
  Monitor,
  Zap,
  Shield,
  Cpu,
  Settings,
  Briefcase,
  BarChart3,
} from 'lucide-react';
import type { EnhancedCareerCourse } from '@/components/apprentice/career/courses/enhancedCoursesData';
import { cn } from '@/lib/utils';

interface PremiumCourseCardProps {
  course: EnhancedCareerCourse;
  onClick: () => void;
  index?: number;
}

// Category visual config — gradients, accent colours, and hero icons
const categoryConfig: Record<string, { gradient: string; accent: string; accentBg: string; Icon: React.ElementType }> = {
  'Essential Updates': { gradient: 'from-amber-500/25 via-orange-500/15 to-transparent', accent: 'text-amber-400', accentBg: 'bg-amber-500/20', Icon: Zap },
  'Emerging Technologies': { gradient: 'from-emerald-500/25 via-green-500/15 to-transparent', accent: 'text-emerald-400', accentBg: 'bg-emerald-500/20', Icon: Cpu },
  'Safety & Compliance': { gradient: 'from-sky-500/25 via-blue-500/15 to-transparent', accent: 'text-sky-400', accentBg: 'bg-sky-500/20', Icon: Shield },
  'Specialised Systems': { gradient: 'from-violet-500/25 via-purple-500/15 to-transparent', accent: 'text-violet-400', accentBg: 'bg-violet-500/20', Icon: Settings },
  'Professional Development': { gradient: 'from-orange-500/25 via-amber-500/15 to-transparent', accent: 'text-orange-400', accentBg: 'bg-orange-500/20', Icon: Briefcase },
  'Business Skills': { gradient: 'from-cyan-500/25 via-teal-500/15 to-transparent', accent: 'text-cyan-400', accentBg: 'bg-cyan-500/20', Icon: BarChart3 },
};

const defaultConfig = { gradient: 'from-blue-500/25 via-indigo-500/15 to-transparent', accent: 'text-blue-400', accentBg: 'bg-blue-500/20', Icon: GraduationCap };

const demandConfig: Record<string, { color: string; bg: string; label: string }> = {
  High: { color: 'text-emerald-400', bg: 'bg-emerald-500/15', label: 'In Demand' },
  Medium: { color: 'text-blue-400', bg: 'bg-blue-500/15', label: 'Popular' },
  Low: { color: 'text-white', bg: 'bg-white/[0.06]', label: 'Available' },
};

const PremiumCourseCard = ({ course, onClick, index = 0 }: PremiumCourseCardProps) => {
  const config = categoryConfig[course.category] || defaultConfig;
  const demand = demandConfig[course.industryDemand] || demandConfig.Medium;
  const firstLocation = course.locations?.[0] || course.location;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const distance = (course as any)._distance as number | undefined;
  const HeroIcon = config.Icon;

  return (
    <motion.div
      custom={index}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, type: 'spring', stiffness: 400, damping: 30 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer touch-manipulation rounded-2xl border border-white/[0.08] bg-[#111113] overflow-hidden active:scale-[0.98] transition-transform"
    >
      {/* Visual header — gradient with large category icon */}
      <div className={cn('relative h-24 bg-gradient-to-br overflow-hidden', config.gradient)}>
        {/* Large background icon */}
        <HeroIcon className="absolute -right-3 -bottom-3 h-20 w-20 text-white/[0.06]" strokeWidth={1} />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className={cn('text-[10px] font-bold uppercase tracking-widest', config.accent)}>
            {course.category}
          </span>
        </div>
        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5">
          <Star className="h-3 w-3 text-elec-yellow fill-elec-yellow" />
          <span className="text-[11px] font-bold text-white">{course.rating.toFixed(1)}</span>
        </div>
        {/* Demand badge */}
        <div className="absolute bottom-3 left-3">
          <span className={cn('text-[10px] font-semibold rounded-full px-2 py-0.5', demand.color, demand.bg)}>
            {demand.label}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-3.5 space-y-2.5">
        {/* Title */}
        <h3 className="text-[14px] font-bold text-white leading-snug line-clamp-2">
          {course.title}
        </h3>

        {/* Provider */}
        <p className="text-xs text-white font-medium truncate">{course.provider}</p>

        {/* Compact stats — inline pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex items-center gap-1 text-[11px] text-white">
            <Clock className="h-3 w-3 text-blue-400" />
            <span>{course.duration}</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1 text-[11px] text-white">
            <GraduationCap className="h-3 w-3 text-purple-400" />
            <span>{course.level}</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1 text-[11px] text-white">
            <Monitor className="h-3 w-3 text-green-400" />
            <span>{course.format || 'Classroom'}</span>
          </div>
        </div>

        {/* Location + Distance */}
        {(firstLocation || distance != null) && (
          <div className="flex items-center gap-1.5 text-[11px] text-white">
            <MapPin className="h-3 w-3 text-white shrink-0" />
            {firstLocation && <span className="truncate">{firstLocation}</span>}
            {distance != null && (
              <span className="bg-blue-500/15 border border-blue-500/20 rounded-full px-2 py-0.5 text-[10px] font-semibold text-blue-400 shrink-0">
                {Math.round(distance)} mi
              </span>
            )}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
          <span className="text-base font-bold text-white">{course.price}</span>
          <div className="flex items-center gap-0.5 bg-elec-yellow/15 rounded-full px-3 py-1.5 touch-manipulation">
            <span className="text-xs font-bold text-elec-yellow">View</span>
            <ChevronRight className="h-3.5 w-3.5 text-elec-yellow" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumCourseCard;
