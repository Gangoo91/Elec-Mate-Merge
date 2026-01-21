/**
 * LiveStatsBar
 *
 * Premium real-time stats bar with actual user data.
 * Best-in-class mobile horizontal scroll with fade indicators.
 */

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  FileText,
  PoundSterling,
  Flame,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboardData } from '@/hooks/useDashboardData';
import { StatCard, StatVariant } from './StatCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface StatConfig {
  id: string;
  label: string;
  getValue: (data: ReturnType<typeof useDashboardData>) => number;
  icon: typeof FileText;
  variant: StatVariant;
  prefix?: string;
  suffix?: string;
  getSubtitle?: (data: ReturnType<typeof useDashboardData>) => string | undefined;
  formatAsCurrency?: boolean;
  path?: string;
  roles: string[]; // Which user roles can see this stat
}

const statsConfig: StatConfig[] = [
  {
    id: 'quotes',
    label: 'Active Quotes',
    getValue: (data) => data.business.activeQuotes,
    icon: FileText,
    variant: 'yellow',
    getSubtitle: (data) =>
      data.business.pendingQuotes > 0
        ? `${data.business.pendingQuotes} awaiting response`
        : undefined,
    path: '/electrician/quotes',
    roles: ['electrician', 'employer', 'admin'],
  },
  {
    id: 'quoteValue',
    label: 'Quote Value',
    getValue: (data) => data.business.quoteValue,
    icon: PoundSterling,
    variant: 'green',
    prefix: '£',
    formatAsCurrency: true,
    path: '/electrician/quotes',
    roles: ['electrician', 'employer', 'admin'],
  },
  {
    id: 'streak',
    label: 'Study Streak',
    getValue: (data) => data.learning.currentStreak,
    icon: Flame,
    variant: 'orange',
    suffix: ' days',
    getSubtitle: (data) =>
      data.learning.studiedToday ? 'Studied today' : 'Study to continue!',
    path: '/study-centre/apprentice',
    roles: ['apprentice', 'electrician', 'admin'],
  },
  {
    id: 'certificates',
    label: 'Certificates',
    getValue: (data) => data.certificates.total,
    icon: Award,
    variant: 'purple',
    getSubtitle: (data) =>
      data.certificates.expiringSoon > 0
        ? `${data.certificates.expiringSoon} expiring soon`
        : undefined,
    path: '/profile?tab=certificates',
    roles: ['electrician', 'apprentice', 'admin'],
  },
  {
    id: 'overdue',
    label: 'Overdue',
    getValue: (data) => data.business.overdueInvoices,
    icon: data => data.business.overdueInvoices === 0 ? CheckCircle : AlertCircle,
    variant: 'red',
    getSubtitle: (data) =>
      data.business.overdueInvoices > 0
        ? `£${data.business.overdueValue.toLocaleString()} outstanding`
        : 'All paid!',
    path: '/electrician/invoices',
    roles: ['electrician', 'employer', 'admin'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0,
    },
  },
};

const itemVariants = {
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

export function LiveStatsBar() {
  const dashboardData = useDashboardData();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { isLoading } = dashboardData;

  // Filter stats based on user role
  const userRole = profile?.role || 'visitor';
  const filteredStats = statsConfig.filter(stat => stat.roles.includes(userRole));
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Track scroll position for fade indicators
  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [isLoading]);

  // Dynamic icon for overdue stat
  const getIcon = (config: StatConfig) => {
    if (config.id === 'overdue') {
      return dashboardData.business.overdueInvoices === 0 ? CheckCircle : AlertCircle;
    }
    return config.icon as typeof FileText;
  };

  // Dynamic variant for overdue stat
  const getVariant = (config: StatConfig): StatVariant => {
    if (config.id === 'overdue') {
      return dashboardData.business.overdueInvoices === 0 ? 'green' : 'red';
    }
    return config.variant;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {[...Array(filteredStats.length || 3)].map((_, i) => (
          <div
            key={i}
            className="h-20 sm:h-24 rounded-xl bg-white/5 animate-pulse"
          />
        ))}
      </div>
    );
  }

  // Don't render if user has no stats to show (e.g., visitor role)
  if (filteredStats.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Left fade indicator - mobile only */}
      <div
        className={cn(
          'absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none',
          'bg-gradient-to-r from-[hsl(240,5.9%,10%)] to-transparent',
          'transition-opacity duration-200 sm:hidden',
          canScrollLeft ? 'opacity-100' : 'opacity-0'
        )}
      />

      {/* Right fade indicator - mobile only */}
      <div
        className={cn(
          'absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none',
          'bg-gradient-to-l from-[hsl(240,5.9%,10%)] to-transparent',
          'transition-opacity duration-200 sm:hidden',
          canScrollRight ? 'opacity-100' : 'opacity-0'
        )}
      />

      <div
        ref={scrollRef}
        className={cn(
          // Mobile: horizontal scroll with proper padding
          'flex gap-3 overflow-x-auto pb-2 -mx-4 px-4',
          'snap-x snap-mandatory scroll-smooth',
          'scrollbar-hide',
          // Desktop: grid layout
          'sm:grid sm:grid-cols-3 lg:grid-cols-5 sm:gap-4',
          'sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0'
        )}
      >
        {filteredStats.map((config, index) => {
          const Icon = getIcon(config);
          const variant = getVariant(config);
          const value = config.getValue(dashboardData);
          const subtitle = config.getSubtitle?.(dashboardData);

          return (
            <div
              key={config.id}
              className={cn(
                // Mobile: fixed width cards with padding
                'flex-shrink-0 w-[140px] snap-center touch-manipulation',
                // Last card needs extra right margin for scroll padding
                index === filteredStats.length - 1 && 'mr-4 sm:mr-0',
                // Desktop: equal width columns
                'sm:w-full sm:flex-shrink'
              )}
            >
              <StatCard
                label={config.label}
                value={value}
                icon={Icon}
                variant={variant}
                prefix={config.prefix}
                suffix={config.suffix}
                subtitle={subtitle}
                formatAsCurrency={config.formatAsCurrency}
                onClick={config.path ? () => navigate(config.path!) : undefined}
              />
            </div>
          );
        })}
      </div>

      {/* Scroll hint - mobile only */}
      <div className="flex justify-center mt-2 sm:hidden">
        <div className="flex gap-1">
          {filteredStats.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-1.5 h-1.5 rounded-full transition-colors',
                i === 0 ? 'bg-white/40' : 'bg-white/15'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Compact version for secondary placement
 */
export function LiveStatsCompact() {
  const { business, learning, certificates } = useDashboardData();

  return (
    <div className="flex flex-wrap gap-2">
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] text-xs">
        <FileText className="h-3.5 w-3.5 text-elec-yellow" />
        <span className="text-white/80">Quotes:</span>
        <span className="font-medium text-elec-yellow">{business.activeQuotes}</span>
      </div>
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] text-xs">
        <Flame className="h-3.5 w-3.5 text-orange-500" />
        <span className="text-white/80">Streak:</span>
        <span className="font-medium text-orange-500">{learning.currentStreak}d</span>
      </div>
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] text-xs">
        <Award className="h-3.5 w-3.5 text-purple-500" />
        <span className="text-white/80">Certs:</span>
        <span className="font-medium text-purple-500">{certificates.total}</span>
      </div>
    </div>
  );
}

export default LiveStatsBar;
