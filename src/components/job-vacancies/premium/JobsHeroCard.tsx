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
      className={cn("space-y-4", className)}
    >
      {/* Main Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/60 via-background to-background border border-slate-600/30">
        {/* Animated gradient accent line */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />

        {/* Multiple decorative gradient blobs */}
        <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-10 top-10 w-40 h-40 rounded-full bg-slate-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-20 bottom-0 w-32 h-32 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 p-5 sm:p-8">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Premium Icon with glow */}
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/30 rounded-2xl blur-xl" />
                <div className="relative p-4 rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-500/20 border border-blue-400/30 backdrop-blur-sm">
                  <Briefcase className="h-8 w-8 text-blue-300" />
                </div>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Job{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Vacancies
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-white/60 mt-1">
                  Live electrical jobs from top recruiters
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
                <RefreshCw className={cn("h-5 w-5", isRefreshing && "animate-spin")} />
              </Button>
            )}
          </div>

          {/* Search Status */}
          {isSearching ? (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20"
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-blue-300">
                Searching across job boards...
              </span>
            </motion.div>
          ) : lastUpdated ? (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-emerald-300">
                Live results • {lastUpdated}
              </span>
            </motion.div>
          ) : null}

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4 mt-6">
            <StatCard
              icon={Briefcase}
              value={totalJobs}
              label="Jobs Found"
              iconColor="text-blue-300"
            />
            <StatCard
              icon={Zap}
              value={newJobsToday}
              label="New Today"
              iconColor="text-emerald-300"
            />
            <StatCard
              icon={TrendingUp}
              value={Math.round(avgSalaryValue / 1000)}
              label="Avg Salary"
              prefix="£"
              suffix="k"
              iconColor="text-blue-300"
            />
            <StatCard
              icon={Sparkles}
              value={matchPercentage || 0}
              label="Match Rate"
              suffix="%"
              iconColor="text-purple-300"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            {onSmartSearch && (
              <Button
                onClick={onSmartSearch}
                className="flex-1 sm:flex-none h-11 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-400 hover:to-cyan-400 gap-2 font-semibold shadow-lg shadow-blue-500/25 rounded-xl"
              >
                <Search className="h-4 w-4" />
                Smart Search
              </Button>
            )}
            {onUploadCV && (
              <Button
                onClick={onUploadCV}
                variant="outline"
                className="flex-1 sm:flex-none h-11 border-white/20 text-white hover:text-white hover:bg-white/10 gap-2 font-semibold rounded-xl backdrop-blur-sm"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Build</span> CV
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Filter Chips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <Search className="h-4 w-4 text-blue-400" />
          <h3 className="text-sm font-medium text-white">Popular Searches</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Electrician", "Solar Installer", "EV Technician", "Apprentice", "Site Manager"].map(
            (term, index) => (
              <motion.div
                key={term}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + index * 0.05 }}
              >
                <Badge
                  variant="secondary"
                  className="bg-white/10 text-white border-white/10 hover:bg-blue-500/20 hover:text-blue-300 hover:border-blue-500/30 transition-colors cursor-pointer"
                >
                  {term}
                </Badge>
              </motion.div>
            )
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JobsHeroCard;
