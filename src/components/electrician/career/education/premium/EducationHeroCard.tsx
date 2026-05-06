/**
 * EducationHeroCard - Compact hero with animated stat counters
 * Clean dark card with yellow accent, inline stats
 */

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Calculator, RefreshCw } from 'lucide-react';
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
    <motion.section
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className={cn('space-y-4', className)}
    >
      {/* Editorial header */}
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
          04 · FURTHER EDUCATION
        </span>
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="text-[10.5px] uppercase tracking-[0.14em] text-white/85 hover:text-elec-yellow border border-white/15 hover:border-elec-yellow/40 rounded-full px-2.5 py-1 min-h-[28px] touch-manipulation transition-colors inline-flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw className={cn('h-3 w-3', isRefreshing && 'animate-spin')} />
            Refresh
          </button>
        )}
      </div>
      <h2 className="text-[34px] sm:text-[44px] lg:text-[54px] font-semibold tracking-tight leading-[1.05]">
        <span className="text-elec-yellow">Step</span> <span className="text-white">up.</span>
      </h2>
      <p className="text-[14px] sm:text-[15px] leading-relaxed text-white max-w-3xl">
        HNC, HND, BEng and engineering degree apprenticeships from accredited UK providers. Funding
        routes (advanced learner loan, ELC, employer-supported, levy), part-time and distance
        options included.
      </p>

      {/* Live stats strip — replaces the old icon-heavy block */}
      {analytics && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-black/40 border border-white/[0.10] rounded-2xl overflow-hidden">
          <StatCell label="Programmes" value={<AnimatedCounter value={analytics.totalCourses} />} />
          <StatCell
            label="Providers"
            value={<AnimatedCounter value={analytics.totalProviders} />}
          />
          <StatCell
            label="Avg rating"
            value={<AnimatedCounter value={analytics.averageRating} decimals={1} />}
          />
          {analytics.averageEmploymentRate && analytics.averageEmploymentRate > 0 ? (
            <StatCell
              label="Employed"
              value={<AnimatedCounter value={analytics.averageEmploymentRate} suffix="%" />}
            />
          ) : (
            <StatCell label="Funded routes" value="ELC · Levy · ALL" small />
          )}
        </div>
      )}

      {/* Live data indicator + funding CTA */}
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        {isFromCache && lastUpdated ? (
          <span className="inline-flex items-center gap-1.5 text-[10.5px] tabular-nums text-emerald-300">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" aria-hidden />
            Live · updated{' '}
            {new Date(lastUpdated).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
            })}
          </span>
        ) : (
          <span />
        )}
        {onFundingCalculator && (
          <button
            type="button"
            onClick={onFundingCalculator}
            className="text-[12px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-4 py-2 min-h-[36px] inline-flex items-center gap-2 touch-manipulation transition-colors"
          >
            <Calculator className="h-3.5 w-3.5" />
            Funding calculator
          </button>
        )}
      </div>
    </motion.section>
  );
};

const StatCell = ({
  label,
  value,
  small,
}: {
  label: string;
  value: React.ReactNode;
  small?: boolean;
}) => (
  <div className="bg-[hsl(0_0%_10%)] px-3 sm:px-4 py-3 sm:py-4">
    <div className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/65 truncate">
      {label}
    </div>
    <div
      className={cn(
        'mt-1 font-semibold tabular-nums text-white truncate',
        small ? 'text-[12px]' : 'text-[18px] sm:text-[20px]'
      )}
    >
      {value}
    </div>
  </div>
);

export default EducationHeroCard;
