import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type AccentColor = 'yellow' | 'blue' | 'green' | 'purple' | 'orange' | 'emerald' | 'rose' | 'cyan';

const accentConfig: Record<
  AccentColor,
  { gradient: string; iconBg: string; iconBorder: string; iconText: string }
> = {
  yellow: {
    gradient: 'from-yellow-500/8',
    iconBg: 'bg-yellow-400/10',
    iconBorder: 'border-yellow-400/20',
    iconText: 'text-yellow-400',
  },
  blue: {
    gradient: 'from-blue-500/8',
    iconBg: 'bg-blue-400/10',
    iconBorder: 'border-blue-400/20',
    iconText: 'text-blue-400',
  },
  green: {
    gradient: 'from-green-500/8',
    iconBg: 'bg-green-400/10',
    iconBorder: 'border-green-400/20',
    iconText: 'text-green-400',
  },
  purple: {
    gradient: 'from-purple-500/8',
    iconBg: 'bg-purple-400/10',
    iconBorder: 'border-purple-400/20',
    iconText: 'text-purple-400',
  },
  orange: {
    gradient: 'from-orange-500/8',
    iconBg: 'bg-orange-400/10',
    iconBorder: 'border-orange-400/20',
    iconText: 'text-orange-400',
  },
  emerald: {
    gradient: 'from-emerald-500/8',
    iconBg: 'bg-emerald-400/10',
    iconBorder: 'border-emerald-400/20',
    iconText: 'text-emerald-400',
  },
  rose: {
    gradient: 'from-rose-500/8',
    iconBg: 'bg-rose-400/10',
    iconBorder: 'border-rose-400/20',
    iconText: 'text-rose-400',
  },
  cyan: {
    gradient: 'from-cyan-500/8',
    iconBg: 'bg-cyan-400/10',
    iconBorder: 'border-cyan-400/20',
    iconText: 'text-cyan-400',
  },
};

interface BusinessPageLayoutProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  backUrl: string;
  accentColor?: AccentColor;
  children: ReactNode;
  className?: string;
}

const BusinessPageLayout = ({
  title,
  subtitle,
  icon: Icon,
  backUrl,
  accentColor = 'yellow',
  children,
  className,
}: BusinessPageLayoutProps) => {
  const accent = accentConfig[accentColor];

  return (
    <motion.div
      className={cn('min-h-screen bg-[#1a1a1a]', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10 pt-safe">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-14 sm:h-16">
            <Link
              to={backUrl}
              className="flex items-center justify-center h-11 w-11 rounded-xl text-white hover:bg-white/10 mr-3 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Icon className={cn('h-5 w-5 flex-shrink-0', accent.iconText)} />
              <h1 className="text-lg sm:text-xl font-bold text-white truncate">{title}</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className={cn('border-b border-white/10 bg-gradient-to-b to-[#1a1a1a]', accent.gradient)}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-center gap-4">
            <div className={cn('p-3 sm:p-4 rounded-2xl border', accent.iconBg, accent.iconBorder)}>
              <Icon className={cn('h-8 w-8 sm:h-10 sm:w-10', accent.iconText)} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{title}</h2>
              {subtitle && <p className="text-sm sm:text-base text-white mt-1">{subtitle}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-safe">
        {children}
      </main>
    </motion.div>
  );
};

export default BusinessPageLayout;
