import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Clock } from 'lucide-react';

type CourseLevel = 'Essential' | 'Foundation' | 'Intermediate' | 'Advanced' | 'Specialist' | 'Expert';

interface CourseCardProps {
  to: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  level: CourseLevel;
  duration: string;
  index?: number;
}

// Colors for each level - used for dot indicator and badge
const levelColors: Record<CourseLevel, { dot: string; bg: string; border: string; text: string }> = {
  Essential: {
    dot: 'bg-elec-yellow',
    bg: 'bg-elec-yellow/15',
    border: 'border-elec-yellow/30',
    text: 'text-elec-yellow',
  },
  Foundation: {
    dot: 'bg-green-400',
    bg: 'bg-green-500/15',
    border: 'border-green-500/30',
    text: 'text-green-400',
  },
  Intermediate: {
    dot: 'bg-blue-400',
    bg: 'bg-blue-500/15',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
  },
  Advanced: {
    dot: 'bg-purple-400',
    bg: 'bg-purple-500/15',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
  },
  Specialist: {
    dot: 'bg-orange-400',
    bg: 'bg-orange-500/15',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
  },
  Expert: {
    dot: 'bg-red-400',
    bg: 'bg-red-500/15',
    border: 'border-red-500/30',
    text: 'text-red-400',
  },
};

export const CourseCard: React.FC<CourseCardProps> = ({
  to,
  title,
  description,
  icon: Icon,
  level,
  duration,
  index = 0,
}) => {
  const colors = levelColors[level];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link to={to} className="block h-full" aria-label={`View ${title} course`}>
        <div
          className={`
            group relative overflow-hidden h-full min-h-[140px] sm:min-h-[180px]
            bg-gradient-to-br from-white/[0.08] to-white/[0.02]
            backdrop-blur-xl
            border border-white/10
            rounded-xl sm:rounded-2xl
            p-3 sm:p-5
            transition-all duration-300 ease-out
            hover:border-elec-yellow/40
            hover:shadow-[0_8px_32px_rgba(250,204,21,0.15)]
            hover:translate-y-[-2px]
            active:scale-[0.98] active:translate-y-0
            touch-manipulation
          `}
        >
          {/* Top accent line - colored by level on mobile */}
          <div className={`absolute inset-x-0 top-0 h-[2px] ${colors.dot} sm:bg-gradient-to-r sm:from-transparent sm:via-elec-yellow/60 sm:to-transparent opacity-80 group-hover:opacity-100 transition-opacity`} />

          {/* Content */}
          <div className="relative flex flex-col h-full">
            {/* Top row: Icon only on mobile, Icon + Badge on larger screens */}
            <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
              {/* Icon container - smaller on mobile */}
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-elec-yellow/20 via-amber-500/15 to-orange-500/10 border border-white/10 flex-shrink-0">
                <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-elec-yellow" strokeWidth={1.8} />
              </div>

              {/* Level badge - HIDDEN on mobile, shown on sm+ */}
              <div
                className={`
                  hidden sm:inline-flex px-2 py-0.5 rounded-full flex-shrink-0
                  ${colors.bg} ${colors.border} border
                `}
              >
                <span className={`text-xs font-bold ${colors.text} uppercase tracking-wide whitespace-nowrap`}>
                  {level}
                </span>
              </div>
            </div>

            {/* Title - tighter on mobile */}
            <h3 className="text-[13px] sm:text-[15px] font-semibold text-white leading-tight sm:leading-snug mb-1 sm:mb-1.5 line-clamp-2 group-hover:text-elec-yellow transition-colors duration-200">
              {title}
            </h3>

            {/* Description - hidden on mobile */}
            <p className="text-xs text-white/50 line-clamp-2 mb-auto leading-relaxed hidden sm:block">
              {description}
            </p>

            {/* Bottom row: Duration + Arrow */}
            <div className="flex items-center justify-between mt-auto pt-2 sm:pt-3">
              <div className="flex items-center gap-1 sm:gap-1.5 text-white/40">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="text-[10px] sm:text-xs">{duration}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-elec-yellow group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;
