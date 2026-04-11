import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';


interface BusinessCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
  gradient?: string;
  comingSoon?: boolean;
  className?: string;
  variant?: 'hero' | 'standard' | 'compact';
  badge?: string;
  badgeVariant?: 'danger' | 'info';
  liveSubtitle?: string;
  accentColor?: string;
  iconColor?: string;
  iconBg?: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

const BusinessCard = ({
  title,
  description,
  icon: _Icon,
  href,
  onClick,
  comingSoon = false,
  className,
  variant = 'standard',
  liveSubtitle,
  accentColor = 'from-elec-yellow via-amber-400 to-orange-400',
  iconColor = 'text-elec-yellow',
  iconBg = 'bg-elec-yellow/10 border border-elec-yellow/20',
}: BusinessCardProps) => {
  const subtitle = liveSubtitle || description;
  const isOverdue = liveSubtitle?.includes('overdue');
  const isHero = variant === 'hero';
  const isCompact = variant === 'compact';

  const CardContent = (
    <div
      className={cn(
        'group relative overflow-hidden touch-manipulation',
        'card-surface-interactive',
        'active:scale-[0.98] transition-all duration-200',
        isHero ? 'min-h-[150px]' : isCompact ? 'h-[110px]' : 'min-h-[130px]',
        comingSoon && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {/* Top accent line */}
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-[2px]',
          'bg-gradient-to-r',
          accentColor,
          'opacity-30 group-hover:opacity-80',
          'transition-opacity duration-200'
        )}
      />

      {/* Content */}
      <div className={cn('relative z-10 flex flex-col h-full', isHero ? 'p-4 sm:p-5' : 'p-3.5 sm:p-4')}>
        {/* Overdue indicator */}
        {isOverdue && (
          <div className="mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse inline-block" />
          </div>
        )}

        {/* Title */}
        <h3
          className={cn(
            'font-semibold text-foreground leading-tight truncate',
            'group-hover:text-elec-yellow transition-colors',
            isHero ? 'text-[15px] sm:text-base' : 'text-[13px] sm:text-sm'
          )}
        >
          {title}
        </h3>

        {/* Subtitle */}
        {!isCompact && subtitle && (
          <p
            className={cn(
              'mt-0.5 leading-tight',
              isHero ? 'line-clamp-2' : 'line-clamp-1',
              isHero ? 'text-[12px] sm:text-[13px]' : 'text-[11px] sm:text-[12px]',
              isOverdue ? 'text-red-400 font-semibold' : 'text-muted-foreground'
            )}
          >
            {subtitle}
          </p>
        )}

        {/* Compact subtitle */}
        {isCompact && liveSubtitle && (
          <p
            className={cn(
              'mt-0.5 leading-tight truncate text-[10px] sm:text-[11px]',
              isOverdue ? 'text-red-400 font-semibold' : 'text-muted-foreground'
            )}
          >
            {liveSubtitle}
          </p>
        )}

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Bottom action */}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[11px] sm:text-xs font-medium text-elec-yellow">Open</span>
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
                'w-3.5 h-3.5 text-foreground',
                'group-hover:text-black group-hover:translate-x-0.5',
                'transition-all'
              )}
            />
          </div>
        </div>
      </div>

      {/* Coming soon pill */}
      {comingSoon && (
        <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-elec-yellow text-black rounded-full z-20">
          Soon
        </span>
      )}
    </div>
  );

  if (comingSoon) {
    return <motion.div variants={itemVariants}>{CardContent}</motion.div>;
  }

  if (onClick) {
    return (
      <motion.div variants={itemVariants}>
        <button
          type="button"
          onClick={onClick}
          className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation"
        >
          {CardContent}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div variants={itemVariants}>
      <Link
        to={href || '#'}
        className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation"
      >
        {CardContent}
      </Link>
    </motion.div>
  );
};

export default BusinessCard;
