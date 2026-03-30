import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

type CourseLevel =
  | 'Essential'
  | 'Foundation'
  | 'Intermediate'
  | 'Advanced'
  | 'Specialist'
  | 'Expert';

interface CourseCardProps {
  to: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  level: CourseLevel;
  duration: string;
  index?: number;
  comingSoon?: boolean;
}

const levelAccents: Record<
  CourseLevel,
  { gradient: string; iconColor: string; iconBg: string; hoverColor: string }
> = {
  Essential: {
    gradient: 'from-elec-yellow via-amber-400 to-orange-400',
    iconColor: 'text-elec-yellow',
    iconBg: 'bg-elec-yellow/10 border border-elec-yellow/20',
    hoverColor: 'group-hover:text-elec-yellow',
  },
  Foundation: {
    gradient: 'from-emerald-500 via-emerald-400 to-green-400',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10 border border-emerald-500/20',
    hoverColor: 'group-hover:text-emerald-300',
  },
  Intermediate: {
    gradient: 'from-blue-500 via-blue-400 to-cyan-400',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10 border border-blue-500/20',
    hoverColor: 'group-hover:text-blue-300',
  },
  Advanced: {
    gradient: 'from-purple-500 via-violet-400 to-indigo-400',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10 border border-purple-500/20',
    hoverColor: 'group-hover:text-purple-300',
  },
  Specialist: {
    gradient: 'from-orange-500 via-amber-400 to-yellow-400',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-500/10 border border-orange-500/20',
    hoverColor: 'group-hover:text-orange-300',
  },
  Expert: {
    gradient: 'from-red-500 via-rose-400 to-pink-400',
    iconColor: 'text-red-400',
    iconBg: 'bg-red-500/10 border border-red-500/20',
    hoverColor: 'group-hover:text-red-300',
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
  comingSoon = false,
}) => {
  const accent = levelAccents[level];

  const cardContent = (
    <div
      className={cn(
        'group relative overflow-hidden card-surface-interactive h-full',
        'touch-manipulation',
        comingSoon
          ? 'opacity-50 cursor-default'
          : 'active:scale-[0.98] transition-all duration-200'
      )}
    >
      {/* Top accent line */}
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-[2px]',
          'bg-gradient-to-r',
          accent.gradient,
          'opacity-30 group-hover:opacity-80',
          'transition-opacity duration-200'
        )}
      />

      <div className="relative z-10 p-3.5 sm:p-4 flex flex-col h-full min-h-[150px] sm:min-h-[170px]">
        {/* Top row — Icon + badge */}
        <div className="flex items-start justify-between mb-2.5">
          <div
            className={cn(
              'p-2 sm:p-2.5 rounded-xl',
              accent.iconBg,
              accent.iconColor,
              'transition-all duration-200 group-hover:scale-110'
            )}
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.8} />
          </div>
          {comingSoon ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase">
              Soon
            </span>
          ) : (
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/[0.04] text-white border border-white/[0.06]">
              {level}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className={cn(
            'text-[13px] sm:text-sm font-semibold text-white leading-tight mb-1',
            accent.hoverColor,
            'transition-colors line-clamp-2'
          )}
        >
          {title}
        </h3>

        {/* Description — hidden on mobile */}
        <p className="hidden sm:block text-[11px] sm:text-xs text-white leading-relaxed line-clamp-2 mb-2">
          {description}
        </p>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Bottom row — Duration + Arrow */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1.5 text-white">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="text-[10px] sm:text-xs">{duration}</span>
          </div>
          {comingSoon ? (
            <div className="w-2 h-2 rounded-full bg-amber-400/40" />
          ) : (
            <div
              className={cn(
                'w-6 h-6 sm:w-7 sm:h-7 rounded-full',
                'bg-white/[0.05] border border-elec-yellow/20',
                'flex items-center justify-center',
                'group-hover:bg-elec-yellow group-hover:border-elec-yellow',
                'transition-all duration-200'
              )}
            >
              <ChevronRight
                className={cn(
                  'w-3.5 h-3.5 text-white',
                  'group-hover:text-black group-hover:translate-x-0.5',
                  'transition-all'
                )}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (comingSoon) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04, type: 'spring', stiffness: 300, damping: 24 }}
      >
        <div className="block h-full">{cardContent}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, type: 'spring', stiffness: 300, damping: 24 }}
    >
      <Link to={to} className="block h-full" aria-label={`View ${title} course`}>
        {cardContent}
      </Link>
    </motion.div>
  );
};

export default CourseCard;
