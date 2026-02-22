import { Link } from 'react-router-dom';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BusinessCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient?: string;
  comingSoon?: boolean;
  className?: string;
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
  gradient = 'from-yellow-400 to-amber-500',
  comingSoon = false,
  className,
}: BusinessCardProps) => {
  const CardContent = (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-white/[0.03] border border-white/[0.08]',
        'group active:bg-white/[0.06] transition-colors',
        comingSoon && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <div className="p-5">
        <div className="flex items-center gap-3">
          {/* Icon with gradient background */}
          <div
            className={cn(
              'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br',
              gradient
            )}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-bold text-white">{title}</h3>
              {comingSoon && (
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-elec-yellow text-black rounded-full">
                  Soon
                </span>
              )}
            </div>
            <p className="text-[13px] text-white line-clamp-1">{description}</p>
          </div>

          {/* Circular arrow */}
          {!comingSoon && (
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/[0.08] flex items-center justify-center group-active:bg-white/[0.12] transition-colors">
              <ArrowRight className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (comingSoon) {
    return <motion.div variants={itemVariants}>{CardContent}</motion.div>;
  }

  return (
    <motion.div variants={itemVariants}>
      <Link
        to={href}
        className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation"
      >
        {CardContent}
      </Link>
    </motion.div>
  );
};

export default BusinessCard;
