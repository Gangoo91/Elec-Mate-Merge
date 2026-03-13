/**
 * EducationHeroCard - Compact hero with animated stat counters
 * Clean dark card with yellow accent, inline stats
 */

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  GraduationCap,
  Users,
  Star,
  TrendingUp,
  Calculator,
  RefreshCw,
  MapPin,
} from 'lucide-react';
import { pageVariants, counterSpringConfig } from './animations/variants';
import type { LiveEducationAnalytics } from '@/hooks/useLiveEducationData';

interface EducationHeroCardProps {
  analytics: LiveEducationAnalytics | null;
  isFromCache?: boolean;
  lastUpdated?: string | null;
  onFundingCalculator?: () => void;
  onBrowseAll?: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  className?: string;
}

// Animated counter component with spring physics
const AnimatedCounter = ({
  value,
  suffix = '',
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) => {
  const spring = useSpring(0, counterSpringConfig);
  const display = useTransform(spring, (latest) =>
    decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toLocaleString()
  );
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsubscribe = display.on('change', (v) => setDisplayValue(v));
    return unsubscribe;
  }, [display]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
};

const EducationHeroCard = ({
  analytics,
  isFromCache = false,
  lastUpdated,
  onFundingCalculator,
  onBrowseAll,
  onRefresh,
  isRefreshing = false,
  className,
}: EducationHeroCardProps) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className={cn('space-y-3', className)}
    >
      {/* Compact Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10">
        {/* Subtle accent line */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow/60 via-amber-400/40 to-elec-yellow/60" />

        <div className="relative z-10 p-4">
          {/* Header row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                <GraduationCap className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">
                  Further Education
                </h1>
                <p className="text-xs text-white mt-0.5">
                  HNC, HND, degrees & apprenticeships
                </p>
              </div>
            </div>

            {/* Refresh button */}
            {onRefresh && (
              <Button
                onClick={onRefresh}
                disabled={isRefreshing}
                size="icon"
                variant="ghost"
                className="h-9 w-9 text-white hover:text-white hover:bg-white/10 rounded-xl touch-manipulation"
              >
                <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
              </Button>
            )}
          </div>

          {/* Live data indicator */}
          {isFromCache && lastUpdated && (
            <div className="inline-flex items-center gap-2 mt-3 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[11px] font-medium text-emerald-300">
                Live data • Updated{' '}
                {new Date(lastUpdated).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                })}
              </span>
            </div>
          )}

          {/* Inline Stats Row */}
          {analytics && (
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <div className="flex items-center gap-1.5 text-sm">
                <GraduationCap className="h-3.5 w-3.5 text-elec-yellow" />
                <span className="font-semibold text-white">
                  <AnimatedCounter value={analytics.totalCourses} />
                </span>
                <span className="text-white text-xs">programmes</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5 text-sm">
                <Users className="h-3.5 w-3.5 text-emerald-400" />
                <span className="font-semibold text-white">
                  <AnimatedCounter value={analytics.totalProviders} />
                </span>
                <span className="text-white text-xs">providers</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5 text-sm">
                <Star className="h-3.5 w-3.5 text-amber-400" />
                <span className="font-semibold text-white">
                  <AnimatedCounter value={analytics.averageRating} decimals={1} />
                </span>
                <span className="text-white text-xs">avg</span>
              </div>
              {analytics.averageEmploymentRate && analytics.averageEmploymentRate > 0 && (
                <>
                  <span className="text-white/20 hidden sm:inline">•</span>
                  <div className="hidden sm:flex items-center gap-1.5 text-sm">
                    <TrendingUp className="h-3.5 w-3.5 text-blue-400" />
                    <span className="font-semibold text-white">
                      <AnimatedCounter value={analytics.averageEmploymentRate} suffix="%" />
                    </span>
                    <span className="text-white text-xs">employed</span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Single CTA */}
          {onFundingCalculator && (
            <div className="mt-3">
              <Button
                onClick={onFundingCalculator}
                className="h-10 px-4 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 gap-2 font-semibold rounded-xl touch-manipulation active:scale-[0.98] text-sm"
              >
                <Calculator className="h-4 w-4" />
                Funding Calculator
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EducationHeroCard;
