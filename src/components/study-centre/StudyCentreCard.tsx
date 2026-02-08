import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StudyCentreCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  path: string;
  accentGradient: string;
  iconColor: string;
  iconBg: string;
  courseCount?: number;
  comingSoon?: boolean;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

export function StudyCentreCard({
  title,
  subtitle,
  description,
  icon: Icon,
  path,
  accentGradient,
  iconColor,
  iconBg,
  courseCount,
  comingSoon,
}: StudyCentreCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(path)}
      className={cn(
        'group relative cursor-pointer',
        'glass-premium rounded-2xl',
        'touch-manipulation',
        'overflow-hidden'
      )}
    >
      {/* Gradient accent line at top */}
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-[2px]',
          'bg-gradient-to-r',
          accentGradient,
          'opacity-60 group-hover:opacity-100',
          'transition-opacity duration-200'
        )}
      />

      {/* Decorative gradient blob */}
      <div
        className={cn(
          'absolute -top-16 -right-16 w-32 h-32',
          'bg-gradient-to-br',
          accentGradient,
          'opacity-[0.03] blur-3xl',
          'group-hover:opacity-[0.08]',
          'transition-opacity duration-300',
          'pointer-events-none'
        )}
      />

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-5 lg:p-6 flex flex-col h-full min-h-[160px] sm:min-h-[180px] lg:min-h-[200px]">
        {/* Top row - Icon and badge */}
        <div className="flex items-start justify-between mb-3">
          <div
            className={cn(
              'p-2.5 sm:p-3 rounded-xl',
              iconBg,
              iconColor,
              'transition-all duration-200',
              'group-hover:scale-110'
            )}
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <span
            className={cn(
              'text-[10px] sm:text-xs font-medium',
              'text-white/70 uppercase tracking-wider',
              'px-2 py-1 rounded-md bg-white/[0.04]'
            )}
          >
            {comingSoon ? 'Coming Soon' : subtitle}
          </span>
        </div>

        {/* Text content */}
        <div className="flex-grow">
          <h3
            className={cn(
              'text-base sm:text-lg font-semibold text-white mb-1',
              'group-hover:text-elec-yellow transition-colors'
            )}
          >
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Course count badge */}
        {courseCount != null && courseCount > 0 && (
          <div
            className={cn(
              'inline-flex items-center gap-1.5 self-start',
              'mt-3 px-2.5 py-1 rounded-full',
              'bg-white/[0.05] border border-white/[0.08]'
            )}
          >
            <span className="text-[10px] sm:text-xs text-white/80">
              {courseCount} {courseCount === 1 ? 'Course' : 'Courses'}
            </span>
          </div>
        )}

        {/* Bottom action row */}
        <div className="mt-3 flex items-center justify-between">
          <span
            className={cn(
              'text-xs sm:text-sm font-medium',
              'text-elec-yellow',
              'transition-colors'
            )}
          >
            Explore
          </span>
          <div
            className={cn(
              'w-7 h-7 sm:w-8 sm:h-8 rounded-full',
              'bg-white/[0.05] border border-elec-yellow/20',
              'flex items-center justify-center',
              'group-hover:bg-elec-yellow group-hover:border-elec-yellow',
              'transition-all duration-200'
            )}
          >
            <ChevronRight
              className={cn(
                'w-4 h-4 text-white/60',
                'group-hover:text-black group-hover:translate-x-0.5',
                'transition-all'
              )}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
