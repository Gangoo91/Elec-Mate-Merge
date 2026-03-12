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

  const CardContent = (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl',
        'bg-white/[0.03] border border-white/[0.08]',
        'active:bg-white/[0.06] active:scale-[0.98] transition-all',
        'flex flex-col items-center justify-center text-center p-4 min-h-[100px]',
        comingSoon && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br mb-2.5',
          gradient
        )}
      >
        <Icon className="h-5 w-5 text-white" />
      </div>

      {/* Title */}
      <h3 className="text-[14px] font-bold text-white leading-tight">{title}</h3>

      {/* Subtitle / live data */}
      {variant !== 'compact' && subtitle && (
        <p
          className={cn(
            'text-[12px] mt-0.5 leading-tight line-clamp-1',
            isOverdue ? 'text-red-400 font-semibold' : 'text-white'
          )}
        >
          {subtitle}
        </p>
      )}

      {/* Coming soon pill */}
      {comingSoon && (
        <span className="mt-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-elec-yellow text-black rounded-full">
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
