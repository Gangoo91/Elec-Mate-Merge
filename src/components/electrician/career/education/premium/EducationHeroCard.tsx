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

// Stat card component - Premium design
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
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    className="group bg-white/[0.03] hover:bg-white/[0.08] rounded-2xl p-3 sm:p-4 text-center border border-white/5 hover:border-white/10 transition-all duration-300 backdrop-blur-sm"
  >
    <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
      <Icon className={cn("h-5 w-5", iconColor)} />
    </div>
    <div className="text-xl sm:text-2xl font-bold text-white">
      <AnimatedCounter value={value} suffix={suffix} decimals={decimals} />
    </div>
    <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider font-medium mt-1">{label}</div>
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
      {/* Main Hero Card - Premium Design */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/40 via-background to-background border border-purple-500/20">
        {/* Animated gradient accent line */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-purple-600 via-violet-400 to-purple-600 animate-pulse" />

        {/* Multiple decorative gradient blobs */}
        <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-purple-500/20 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -left-10 top-10 w-40 h-40 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-20 bottom-0 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 p-5 sm:p-8">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Premium Icon with glow */}
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/30 rounded-2xl blur-xl" />
                <div className="relative p-4 rounded-2xl bg-gradient-to-br from-purple-500/30 to-purple-600/20 border border-purple-400/30 backdrop-blur-sm">
                  <GraduationCap className="h-8 w-8 text-purple-300" />
                </div>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Further{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                    Education
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-white/60 mt-1">
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
                className="h-10 w-10 text-white/60 hover:text-white hover:bg-white/10 rounded-xl"
              >
                <RefreshCw
                  className={cn("h-5 w-5", isRefreshing && "animate-spin")}
                />
              </Button>
            )}
          </div>

          {/* Live data indicator */}
          {isFromCache && lastUpdated && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-emerald-300">
                Live data • Updated{" "}
                {new Date(lastUpdated).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </motion.div>
          )}

          {/* Stats Grid - Enhanced */}
          {analytics && (
            <div className="grid grid-cols-4 gap-3 sm:gap-4 mt-6">
              <StatCard
                icon={GraduationCap}
                value={analytics.totalCourses}
                label="Programmes"
                iconColor="text-purple-300"
              />
              <StatCard
                icon={Users}
                value={analytics.totalProviders}
                label="Providers"
                iconColor="text-emerald-300"
              />
              <StatCard
                icon={Star}
                value={analytics.averageRating}
                label="Avg Rating"
                decimals={1}
                iconColor="text-amber-300"
              />
              <StatCard
                icon={TrendingUp}
                value={analytics.averageEmploymentRate || 0}
                label="Employed"
                suffix="%"
                iconColor="text-blue-300"
              />
            </div>
          )}

          {/* Action Buttons - Premium */}
          <div className="flex gap-3 mt-6">
            {onFundingCalculator && (
              <Button
                onClick={onFundingCalculator}
                className="flex-1 sm:flex-none h-11 bg-gradient-to-r from-purple-500 to-violet-500 text-white hover:from-purple-400 hover:to-violet-400 gap-2 font-semibold shadow-lg shadow-purple-500/25 rounded-xl"
              >
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">Funding</span> Calculator
              </Button>
            )}
            {onBrowseAll && (
              <Button
                onClick={onBrowseAll}
                variant="outline"
                className="flex-1 sm:flex-none h-11 border-white/20 text-white hover:text-white hover:bg-white/10 gap-2 font-semibold rounded-xl backdrop-blur-sm"
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
