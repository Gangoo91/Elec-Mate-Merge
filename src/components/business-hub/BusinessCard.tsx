import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
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
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

const BusinessCard = ({
  title,
  description,
  icon: Icon,
  href,
  onClick,
  gradient = 'from-yellow-400 to-amber-500',
  comingSoon = false,
  className,
  variant = 'standard',
  liveSubtitle,
}: BusinessCardProps) => {
  const subtitle = liveSubtitle || description;
  const isOverdue = liveSubtitle?.includes('overdue');

  const isHero = variant === 'hero';

  const CardContent = (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl',
        'active:scale-[0.98] transition-all',
        isHero
          ? 'bg-white/[0.04] border border-white/[0.10] p-5 min-h-[120px] flex flex-col items-center justify-center text-center'
          : 'bg-white/[0.03] border border-white/[0.08] flex flex-col items-center justify-center text-center p-4 min-h-[100px]',
        isHero && 'active:brightness-110',
        !isHero && 'active:bg-white/[0.06]',
        comingSoon && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {/* Hero gradient background wash */}
      {isHero && (
        <div className={cn('absolute inset-0 bg-gradient-to-br opacity-[0.08]', gradient)} />
      )}

      {/* Icon */}
      <div
        className={cn(
          'relative flex-shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-br',
          isHero ? 'w-12 h-12 mb-3 shadow-lg' : 'w-11 h-11 mb-2.5',
          gradient
        )}
      >
        <Icon className={cn('text-white', isHero ? 'h-6 w-6' : 'h-5 w-5')} />
        {/* Overdue dot on icon */}
        {isHero && isOverdue && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-[#0d0d0d] animate-pulse" />
        )}
      </div>

      {/* Title */}
      <h3
        className={cn(
          'relative font-bold text-white leading-tight',
          isHero ? 'text-[15px]' : 'text-[14px]'
        )}
      >
        {title}
      </h3>

      {/* Subtitle / live data */}
      {variant !== 'compact' && subtitle && (
        <p
          className={cn(
            'relative mt-0.5 leading-tight line-clamp-1',
            isHero ? 'text-[12px]' : 'text-[12px]',
            isOverdue ? 'text-red-400 font-semibold' : isHero ? 'text-white' : 'text-white'
          )}
        >
          {subtitle}
        </p>
      )}

      {/* Coming soon pill */}
      {comingSoon && (
        <span className="relative mt-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-elec-yellow text-black rounded-full">
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
          className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-xl touch-manipulation"
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
        className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-xl touch-manipulation"
      >
        {CardContent}
      </Link>
    </motion.div>
  );
};

export default BusinessCard;
