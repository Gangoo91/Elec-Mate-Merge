/**
 * JobsHeroCard - Premium hero with animated stat counters
 * Glass morphism styling with spring-based counter animations
 */

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  TrendingUp,
  MapPin,
  Clock,
  Search,
  FileText,
  RefreshCw,
  Sparkles,
  Zap,
} from "lucide-react";
import { pageVariants, counterSpringConfig, heroCardVariants } from "./animations/variants";

interface JobsHeroCardProps {
  totalJobs: number;
  newJobsToday: number;
  avgSalary?: string;
  matchPercentage?: number;
  isSearching?: boolean;
  lastUpdated?: string;
  onSmartSearch?: () => void;
  onUploadCV?: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  className?: string;
}

// Animated counter component with spring physics
const AnimatedCounter = ({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) => {
  const spring = useSpring(0, counterSpringConfig);
  const display = useTransform(spring, (latest) => Math.round(latest).toLocaleString());
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
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};

// Compact stat pill for mobile
const StatPill = ({
  icon: Icon,
  value,
  label,
  suffix = "",
  prefix = "",
  iconColor = "text-amber-300",
}: {
  icon: typeof Briefcase;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  iconColor?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex items-center gap-2 bg-white/[0.05] rounded-xl px-3 py-2 border border-white/5"
  >
    <div className={cn("p-1.5 rounded-lg bg-white/5", iconColor.replace('text-', 'bg-').replace('300', '500/20'))}>
      <Icon className={cn("h-4 w-4", iconColor)} />
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-bold text-white leading-tight">
        <AnimatedCounter value={value} suffix={suffix} prefix={prefix} />
      </span>
      <span className="text-[9px] text-white/50 uppercase tracking-wide leading-tight">
        {label}
      </span>
    </div>
  </motion.div>
);

const JobsHeroCard = ({
  totalJobs,
  newJobsToday,
  avgSalary,
  matchPercentage,
  isSearching = false,
  lastUpdated,
  onSmartSearch,
  onUploadCV,
  onRefresh,
  isRefreshing = false,
  className,
}: JobsHeroCardProps) => {
  // Parse salary for counter animation
  const avgSalaryValue = avgSalary ? parseInt(avgSalary.replace(/[^0-9]/g, "")) || 0 : 35000;

  return (
    <motion.div
      variants={heroCardVariants}
      initial="initial"
      animate="animate"
      className={cn("space-y-3", className)}
    >
      {/* Compact Hero Card - Mobile Optimised */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/60 via-background to-background border border-slate-600/30">
        {/* Gradient accent line */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />

        {/* Single decorative blob - reduced for performance */}
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 p-4">
          {/* Compact Header - Single row on mobile */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {/* Smaller Icon */}
              <div className="relative flex-shrink-0">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/20 border border-blue-400/20">
                  <Briefcase className="h-5 w-5 text-blue-300" />
                </div>
              </div>

              {/* Title - truncated on mobile */}
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
                  Job{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Vacancies
                  </span>
                </h1>
                {/* Status badge inline with title on mobile */}
                {isSearching ? (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-medium text-blue-300">Searching...</span>
                  </div>
                ) : totalJobs > 0 ? (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    <span className="text-[10px] font-medium text-emerald-300">
                      {totalJobs.toLocaleString()} live jobs
                    </span>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Refresh button */}
            {onRefresh && (
              <Button
                onClick={onRefresh}
                disabled={isRefreshing}
                size="icon"
                variant="ghost"
                className="h-9 w-9 text-white/60 hover:text-white hover:bg-white/10 rounded-lg flex-shrink-0 touch-manipulation"
              >
                <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
              </Button>
            )}
          </div>

          {/* Compact Stats Row - Horizontal scroll on mobile */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            <StatPill
              icon={Briefcase}
              value={totalJobs}
              label="Jobs"
              iconColor="text-blue-300"
            />
            <StatPill
              icon={Zap}
              value={newJobsToday}
              label="New"
              iconColor="text-emerald-300"
            />
            <StatPill
              icon={TrendingUp}
              value={Math.round(avgSalaryValue / 1000)}
              label="Avg £k"
              prefix="£"
              suffix="k"
              iconColor="text-amber-300"
            />
            {matchPercentage !== undefined && matchPercentage > 0 && (
              <StatPill
                icon={Sparkles}
                value={matchPercentage}
                label="Match"
                suffix="%"
                iconColor="text-purple-300"
              />
            )}
          </div>

          {/* Action Buttons - Full width on mobile */}
          <div className="flex gap-2 mt-3">
            {onSmartSearch && (
              <Button
                onClick={onSmartSearch}
                className="flex-1 h-11 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-400 hover:to-cyan-400 gap-2 font-semibold shadow-lg shadow-blue-500/25 rounded-xl touch-manipulation active:scale-[0.98]"
              >
                <Search className="h-4 w-4" />
                <span>Search Jobs</span>
              </Button>
            )}
            {onUploadCV && (
              <Button
                onClick={onUploadCV}
                variant="outline"
                size="icon"
                className="h-11 w-11 border-white/20 text-white hover:text-white hover:bg-white/10 rounded-xl touch-manipulation active:scale-[0.98] flex-shrink-0"
              >
                <FileText className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Filter Chips - Compact */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {["Electrician", "Solar", "EV Tech", "Apprentice", "Site Manager"].map(
          (term, index) => (
            <motion.div
              key={term}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.03 }}
            >
              <Badge
                variant="secondary"
                className="bg-white/5 text-white/80 border-white/10 hover:bg-blue-500/20 hover:text-blue-300 hover:border-blue-500/30 transition-colors cursor-pointer whitespace-nowrap touch-manipulation"
              >
                {term}
              </Badge>
            </motion.div>
          )
        )}
      </div>
    </motion.div>
  );
};

export default JobsHeroCard;
