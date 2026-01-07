/**
 * SavedJobsTab - Display saved jobs with swipe-to-remove
 * Includes sort options and empty state
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SwipeableCard } from "@/components/ui/SwipeableCard";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  Trash2,
  ArrowUpDown,
  Clock,
  Banknote,
  Star,
  Search,
  Briefcase,
  MapPin,
  Building2,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { listContainerVariants, listItemVariants, fadeUpVariants } from "./animations/variants";
import type { UnifiedJob } from "@/hooks/job-vacancies/useUnifiedJobSearch";

interface SavedJobEntry {
  job: UnifiedJob;
  savedAt: string;
}

interface SavedJobsTabProps {
  savedJobs: SavedJobEntry[];
  onRemove: (jobId: string) => void;
  onSelect: (job: UnifiedJob) => void;
  onClearAll?: () => void;
  onBrowseJobs?: () => void;
  className?: string;
}

type SortOption = "recent" | "salary" | "match";

// Sort options configuration
const SORT_OPTIONS: { id: SortOption; label: string; icon: typeof Clock }[] = [
  { id: "recent", label: "Recently Saved", icon: Clock },
  { id: "salary", label: "Highest Salary", icon: Banknote },
  { id: "match", label: "Best Match", icon: Star },
];

// Company initials fallback
const CompanyInitials = ({ company }: { company: string }) => {
  const initials = company
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/30 border border-amber-400/30 flex items-center justify-center flex-shrink-0">
      <span className="text-sm font-bold text-amber-300">{initials}</span>
    </div>
  );
};

// Parse salary value for sorting
const parseSalaryValue = (salary: string | null): number => {
  if (!salary) return 0;
  const match = salary.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
};

// Format relative time
const formatSavedTime = (savedAt: string) => {
  const saved = new Date(savedAt);
  const now = new Date();
  const diffMs = now.getTime() - saved.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return saved.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};

// Empty state component
const EmptyState = ({ onBrowseJobs }: { onBrowseJobs?: () => void }) => (
  <motion.div
    variants={fadeUpVariants}
    initial="initial"
    animate="animate"
    className="flex flex-col items-center justify-center py-16 px-6 text-center"
  >
    {/* Icon */}
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl" />
      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/30 to-orange-500/30 border border-amber-400/30 flex items-center justify-center">
        <Bookmark className="h-10 w-10 text-amber-300" />
      </div>
    </div>

    {/* Text */}
    <h3 className="text-xl font-bold text-white mb-2">No Saved Jobs</h3>
    <p className="text-white/60 mb-6 max-w-xs">
      Save jobs you're interested in by swiping right or tapping the bookmark icon
    </p>

    {/* CTA */}
    {onBrowseJobs && (
      <Button
        onClick={onBrowseJobs}
        className="h-11 bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:from-amber-400 hover:to-orange-400 font-semibold shadow-lg shadow-amber-500/25 rounded-xl"
      >
        <Search className="h-4 w-4 mr-2" />
        Browse Jobs
      </Button>
    )}
  </motion.div>
);

// Saved job card component
const SavedJobCard = ({
  entry,
  onSelect,
  onRemove,
}: {
  entry: SavedJobEntry;
  onSelect: (job: UnifiedJob) => void;
  onRemove: () => void;
}) => {
  const { job, savedAt } = entry;

  return (
    <SwipeableCard
      rightAction={{
        icon: <Trash2 className="h-5 w-5" />,
        bgColor: "bg-red-500",
        label: "Remove",
        onAction: onRemove,
      }}
    >
      <motion.div
        variants={listItemVariants}
        onClick={() => onSelect(job)}
        className={cn(
          "group relative bg-card/80 backdrop-blur-sm",
          "rounded-2xl border border-white/10 overflow-hidden cursor-pointer",
          "hover:border-amber-500/40 transition-all duration-300",
          "hover:shadow-xl hover:shadow-amber-500/10"
        )}
      >
        <div className="relative p-4">
          {/* Header: Logo + Saved time */}
          <div className="flex items-start justify-between gap-3 mb-3">
            {/* Company Logo */}
            {job.image_url ? (
              <>
                <img
                  src={job.image_url}
                  alt={job.company}
                  className="w-12 h-12 rounded-xl object-cover border border-white/10"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling?.classList.remove("hidden");
                  }}
                />
                <div className="hidden">
                  <CompanyInitials company={job.company} />
                </div>
              </>
            ) : (
              <CompanyInitials company={job.company} />
            )}

            {/* Saved indicator */}
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-500/20 border-amber-500/30 text-amber-300 text-[10px]">
                <Clock className="h-3 w-3 mr-1" />
                {formatSavedTime(savedAt)}
              </Badge>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Bookmark className="h-4 w-4 text-black fill-current" />
              </div>
            </div>
          </div>

          {/* Job Title */}
          <h3 className="font-bold text-white line-clamp-2 leading-snug text-base mb-2 group-hover:text-amber-200 transition-colors">
            {job.title}
          </h3>

          {/* Company */}
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="h-4 w-4 text-amber-400" />
            <p className="text-amber-400 text-sm font-medium line-clamp-1">{job.company}</p>
          </div>

          {/* Stats Row */}
          <div className="flex items-center flex-wrap gap-3 text-xs text-white/50 mb-3">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span className="line-clamp-1 max-w-[120px]">{job.location}</span>
            </span>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5">
              <Briefcase className="h-3.5 w-3.5" />
              {job.type}
            </span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div>
              {job.salary && job.salary !== "Not specified" ? (
                <>
                  <span className="text-xs text-white/40 block">Salary</span>
                  <span className="text-sm font-bold text-white">{job.salary}</span>
                </>
              ) : (
                <span className="text-sm text-white/40">Salary not specified</span>
              )}
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-3 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(job);
              }}
            >
              <span className="text-xs">View</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </motion.div>
    </SwipeableCard>
  );
};

const SavedJobsTab = ({
  savedJobs,
  onRemove,
  onSelect,
  onClearAll,
  onBrowseJobs,
  className,
}: SavedJobsTabProps) => {
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  // Sort jobs based on selected option
  const sortedJobs = useMemo(() => {
    const jobs = [...savedJobs];
    switch (sortBy) {
      case "recent":
        return jobs.sort(
          (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
        );
      case "salary":
        return jobs.sort(
          (a, b) => parseSalaryValue(b.job.salary) - parseSalaryValue(a.job.salary)
        );
      case "match":
        // For now, sort by random match score - in real implementation, use actual match data
        return jobs;
      default:
        return jobs;
    }
  }, [savedJobs, sortBy]);

  if (savedJobs.length === 0) {
    return <EmptyState onBrowseJobs={onBrowseJobs} />;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Bookmark className="h-5 w-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">Saved Jobs</h2>
          <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
            {savedJobs.length}
          </Badge>
        </div>

        {onClearAll && savedJobs.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="h-8 px-2 text-xs text-white/60 hover:text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Sort Options */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {SORT_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isActive = sortBy === option.id;
          return (
            <button
              key={option.id}
              onClick={() => setSortBy(option.id)}
              className={cn(
                "flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium",
                "border transition-all duration-200",
                isActive
                  ? "bg-amber-500/30 border-amber-500/50 text-amber-300"
                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Jobs List */}
      <motion.div
        variants={listContainerVariants}
        initial="initial"
        animate="animate"
        className="space-y-3"
      >
        <AnimatePresence mode="popLayout">
          {sortedJobs.map((entry) => (
            <motion.div
              key={entry.job.id}
              layout
              exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
            >
              <SavedJobCard
                entry={entry}
                onSelect={onSelect}
                onRemove={() => onRemove(entry.job.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Swipe hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-2 py-4 text-xs text-white/40"
      >
        <Sparkles className="h-3.5 w-3.5" />
        <span>Swipe left to remove a saved job</span>
      </motion.div>
    </div>
  );
};

export default SavedJobsTab;
