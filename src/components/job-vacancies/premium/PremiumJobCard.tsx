/**
 * PremiumJobCard - Premium swipeable job card
 * Native app feel with swipe actions, touch feedback, and smooth animations
 */

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SwipeableCard } from "@/components/ui/SwipeableCard";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  MapPin,
  Clock,
  Building2,
  TrendingUp,
  ChevronRight,
  Bookmark,
  ExternalLink,
  Star,
  Zap,
} from "lucide-react";
import { cardPressSubtleVariants, listItemVariants } from "./animations/variants";
import type { UnifiedJob } from "@/hooks/job-vacancies/useUnifiedJobSearch";

interface PremiumJobCardProps {
  job: UnifiedJob;
  onSelect: (job: UnifiedJob) => void;
  onSave?: (jobId: string) => void;
  onApply?: (job: UnifiedJob) => void;
  isSaved?: boolean;
  matchScore?: number;
  className?: string;
}

// Company logo fallback with initials
const CompanyInitials = ({ company }: { company: string }) => {
  const initials = company
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-600/40 to-slate-700/40 border border-slate-500/30 flex items-center justify-center">
      <span className="text-sm font-bold text-slate-300">{initials}</span>
    </div>
  );
};

// Match score badge with color coding
const MatchScoreBadge = ({ score }: { score: number }) => {
  const getScoreColor = () => {
    if (score >= 85) return "bg-gradient-to-r from-emerald-500/30 to-green-500/30 border-emerald-400/40 text-emerald-300";
    if (score >= 70) return "bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border-blue-400/40 text-blue-300";
    return "bg-gradient-to-r from-slate-500/30 to-slate-600/30 border-slate-400/40 text-slate-300";
  };

  return (
    <Badge className={cn("text-[10px] font-semibold backdrop-blur-sm", getScoreColor())}>
      <Star className="h-3 w-3 mr-1 fill-current" />
      {score}% Match
    </Badge>
  );
};

// Format salary for display
const formatSalary = (salary: string | null) => {
  if (!salary || salary === "Not specified") return null;
  return salary;
};

// Check if job is fresh (within 24 hours)
const isJobFresh = (postedDate: string) => {
  const posted = new Date(postedDate);
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return posted > oneDayAgo;
};

// Format posted date
const formatPostedDate = (date: string) => {
  const posted = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - posted.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return posted.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};

// Source badge color
const getSourceColor = (source: string) => {
  const colors: Record<string, string> = {
    Reed: "bg-blue-500/20 border-blue-500/30 text-blue-300",
    Indeed: "bg-purple-500/20 border-purple-500/30 text-purple-300",
    TotalJobs: "bg-green-500/20 border-green-500/30 text-green-300",
    "CV Library": "bg-orange-500/20 border-orange-500/30 text-orange-300",
    "Jobs.co.uk": "bg-cyan-500/20 border-cyan-500/30 text-cyan-300",
  };
  return colors[source] || "bg-white/10 border-white/20 text-white/70";
};

const PremiumJobCard = ({
  job,
  onSelect,
  onSave,
  onApply,
  isSaved = false,
  matchScore,
  className,
}: PremiumJobCardProps) => {
  const isFresh = isJobFresh(job.posted_date);
  const salary = formatSalary(job.salary);

  const cardContent = (
    <motion.div
      variants={listItemVariants}
      whileTap={cardPressSubtleVariants.tap}
      onClick={() => onSelect(job)}
      className={cn(
        "group relative bg-card/80 backdrop-blur-sm",
        "rounded-2xl border border-white/10 overflow-hidden cursor-pointer",
        "hover:border-blue-500/40 transition-all duration-300",
        "hover:shadow-2xl hover:shadow-blue-500/10",
        "hover:-translate-y-1",
        "active:scale-[0.98]",
        className
      )}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Glowing accent line at top */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative p-4 space-y-3">
        {/* Header: Logo + Badges */}
        <div className="flex items-start justify-between gap-3">
          {/* Company Logo */}
          {job.image_url ? (
            <img
              src={job.image_url}
              alt={job.company}
              className="w-12 h-12 rounded-xl object-cover border border-white/10"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : (
            <CompanyInitials company={job.company} />
          )}
          <div className="hidden">
            <CompanyInitials company={job.company} />
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 flex-1 justify-end">
            {isFresh && (
              <Badge className="bg-gradient-to-r from-emerald-500/30 to-green-500/30 border-emerald-400/40 text-emerald-300 text-[10px] font-semibold backdrop-blur-sm">
                <Zap className="h-3 w-3 mr-1" />
                New
              </Badge>
            )}
            {matchScore && <MatchScoreBadge score={matchScore} />}
            {job.source && (
              <Badge className={cn("text-[10px] font-medium backdrop-blur-sm", getSourceColor(job.source))}>
                {job.source}
              </Badge>
            )}
          </div>
        </div>

        {/* Job Title */}
        <h3 className="font-bold text-white line-clamp-2 leading-snug text-base group-hover:text-blue-200 transition-colors">
          {job.title}
        </h3>

        {/* Company */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <Building2 className="h-3.5 w-3.5 text-blue-400" />
          </div>
          <p className="text-blue-400 text-sm font-medium line-clamp-1">{job.company}</p>
        </div>

        {/* Stats Row */}
        <div className="flex items-center flex-wrap gap-3 text-xs text-white/50">
          {/* Location */}
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span className="line-clamp-1 max-w-[120px]">{job.location}</span>
          </span>

          {/* Job Type */}
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5">
            <Briefcase className="h-3.5 w-3.5" />
            {job.type}
          </span>

          {/* Posted */}
          <span className="flex items-center gap-1.5 ml-auto">
            <Clock className="h-3.5 w-3.5" />
            {formatPostedDate(job.posted_date)}
          </span>
        </div>

        {/* Footer: Salary + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div>
            {salary ? (
              <>
                <span className="text-xs text-white/40 block">Salary</span>
                <span className="text-base font-bold text-white">{salary}</span>
              </>
            ) : (
              <span className="text-sm text-white/40">Salary not specified</span>
            )}
          </div>
          <Button
            size="sm"
            className="h-9 px-4 bg-blue-500 hover:bg-blue-400 text-white font-medium shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(job);
            }}
          >
            <span className="text-sm">View Details</span>
            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>

        {/* Saved indicator */}
        {isSaved && (
          <div className="absolute top-4 right-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Bookmark className="h-4 w-4 text-white fill-current" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  // If no swipe actions, return card directly
  if (!onSave && !onApply) {
    return cardContent;
  }

  // Wrap in SwipeableCard for swipe actions
  return (
    <SwipeableCard
      leftAction={
        onApply
          ? {
              icon: <ExternalLink className="h-5 w-5" />,
              bgColor: "bg-emerald-500",
              label: "Apply",
              onAction: () => onApply(job),
            }
          : undefined
      }
      rightAction={
        onSave
          ? {
              icon: <Bookmark className={cn("h-5 w-5", isSaved && "fill-current")} />,
              bgColor: "bg-blue-500",
              label: isSaved ? "Saved" : "Save",
              onAction: () => onSave(job.id),
            }
          : undefined
      }
      disabled={!onSave && !onApply}
      className={className}
    >
      {cardContent}
    </SwipeableCard>
  );
};

export default PremiumJobCard;
