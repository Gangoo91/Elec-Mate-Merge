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

const levelColors: Record<CourseLevel, { bg: string; border: string; text: string }> = {
  Essential: {
    bg: 'bg-elec-yellow/15',
    border: 'border-elec-yellow/30',
    text: 'text-elec-yellow',
  },
  Foundation: {
    bg: 'bg-green-500/15',
    border: 'border-green-500/30',
    text: 'text-green-400',
  },
  Intermediate: {
    bg: 'bg-blue-500/15',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
  },
  Advanced: {
    bg: 'bg-purple-500/15',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
  },
  Specialist: {
    bg: 'bg-orange-500/15',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
  },
  Expert: {
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
            group relative overflow-hidden h-full min-h-[160px] sm:min-h-[180px]
            bg-gradient-to-br from-white/[0.08] to-white/[0.02]
            backdrop-blur-xl
            border border-white/10
            rounded-2xl
            p-4 sm:p-5
            transition-all duration-300 ease-out
            hover:border-elec-yellow/40
            hover:shadow-[0_8px_32px_rgba(250,204,21,0.15)]
            hover:translate-y-[-2px]
            active:scale-[0.97] active:translate-y-0
            touch-manipulation
          `}
        >
          {/* Top accent gradient line */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-elec-yellow/60 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

          {/* Ambient glow on hover */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-elec-yellow/30 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

          {/* Content */}
          <div className="relative flex flex-col h-full">
            {/* Top row: Icon + Level badge */}
            <div className="flex items-start justify-between gap-2 mb-3">
              {/* Icon container with gradient */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-elec-yellow/20 via-amber-500/15 to-orange-500/10 border border-white/10 shadow-inner flex-shrink-0">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" strokeWidth={1.8} />
              </div>

              {/* Level badge */}
              <div
                className={`
                  inline-flex px-2 py-0.5 rounded-full
                  ${colors.bg} ${colors.border} border
                `}
              >
                <span className={`text-[10px] sm:text-xs font-bold ${colors.text} uppercase tracking-wide`}>
                  {level}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-sm sm:text-[15px] font-semibold text-white leading-snug mb-1.5 line-clamp-2 group-hover:text-elec-yellow transition-colors duration-200">
              {title}
            </h3>

            {/* Description */}
            <p className="text-[10px] sm:text-xs text-white/50 line-clamp-2 mb-auto leading-relaxed hidden sm:block">
              {description}
            </p>

            {/* Bottom row: Duration + Arrow */}
            <div className="flex items-center justify-between mt-auto pt-3">
              <div className="flex items-center gap-1.5 text-white/40">
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
