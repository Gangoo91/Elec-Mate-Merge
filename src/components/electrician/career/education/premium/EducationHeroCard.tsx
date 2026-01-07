/**
 * EducationHeroCard - Compact hero with animated stat counters
 * Premium glass morphism styling with spring-based counter animations
 */

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  GraduationCap,
  Users,
  Star,
  TrendingUp,
  Calculator,
  ChevronDown,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { pageVariants, counterSpringConfig } from "./animations/variants";
import type { LiveEducationAnalytics } from "@/hooks/useLiveEducationData";

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
  suffix = "",
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
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setDisplayValue(v));
    return unsubscribe;
  }, [display]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
};

// Stat card component
const StatCard = ({
  icon: Icon,
  value,
  label,
  suffix = "",
  decimals = 0,
  iconColor = "text-purple-400",
}: {
  icon: typeof GraduationCap;
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
  iconColor?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/5 rounded-xl p-3 text-center border border-white/5"
  >
    <Icon className={cn("h-5 w-5 mx-auto mb-1", iconColor)} />
    <div className="text-lg font-bold text-white">
      <AnimatedCounter value={value} suffix={suffix} decimals={decimals} />
    </div>
    <div className="text-[10px] text-white/60 uppercase tracking-wide">{label}</div>
  </motion.div>
);

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
      className={cn("space-y-4", className)}
    >
      {/* Main Hero Card */}
      <div className="relative overflow-hidden rounded-2xl glass-premium border-purple-500/20">
        {/* Gradient accent line */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500/60 via-purple-400 to-purple-500/60" />

        {/* Decorative gradient blob */}
        <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 p-4 sm:p-6">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <GraduationCap className="h-7 w-7 text-purple-400" />
              </div>

              {/* Title */}
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Further <span className="text-purple-400">Education</span>
                </h1>
                <p className="text-sm text-white/70 mt-0.5">
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
                className="h-9 w-9 text-white/60 hover:text-white hover:bg-white/10"
              >
                <RefreshCw
                  className={cn("h-4 w-4", isRefreshing && "animate-spin")}
                />
              </Button>
            )}
          </div>

          {/* Live data indicator */}
          {isFromCache && lastUpdated && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 mt-3 text-xs text-white/60"
            >
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span>
                Live data • Updated{" "}
                {new Date(lastUpdated).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </motion.div>
          )}

          {/* Stats Grid */}
          {analytics && (
            <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-5">
              <StatCard
                icon={GraduationCap}
                value={analytics.totalCourses}
                label="Programmes"
                iconColor="text-purple-400"
              />
              <StatCard
                icon={Users}
                value={analytics.totalProviders}
                label="Providers"
                iconColor="text-green-400"
              />
              <StatCard
                icon={Star}
                value={analytics.averageRating}
                label="Avg Rating"
                decimals={1}
                iconColor="text-elec-yellow"
              />
              <StatCard
                icon={TrendingUp}
                value={analytics.averageEmploymentRate || 0}
                label="Employed"
                suffix="%"
                iconColor="text-blue-400"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-5">
            {onFundingCalculator && (
              <Button
                onClick={onFundingCalculator}
                className="flex-1 sm:flex-none bg-purple-500 text-white hover:bg-purple-600 gap-2"
              >
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">Funding</span> Calculator
              </Button>
            )}
            {onBrowseAll && (
              <Button
                onClick={onBrowseAll}
                variant="outline"
                className="flex-1 sm:flex-none border-white/20 text-white hover:text-white hover:bg-white/10 gap-2"
              >
                <ChevronDown className="h-4 w-4" />
                Browse <span className="hidden sm:inline">Programmes</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Popular Categories */}
      {analytics?.topCategories && analytics.topCategories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <h3 className="text-sm font-medium text-white">Popular Categories</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {analytics.topCategories.slice(0, 6).map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + index * 0.05 }}
              >
                <Badge
                  variant="secondary"
                  className="bg-white/10 text-white border-white/10 hover:bg-purple-500/20 hover:text-purple-300 hover:border-purple-500/30 transition-colors cursor-pointer"
                >
                  {category.name}{" "}
                  <span className="text-white/50 ml-1">({category.count})</span>
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EducationHeroCard;
