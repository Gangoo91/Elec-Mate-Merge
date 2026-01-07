/**
 * UnifiedJobCard - Card component for both employer and external jobs
 * Employer jobs get emerald styling and "Direct Employer" badge
 * External jobs get standard styling with source badge
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
  ChevronRight,
  Bookmark,
  ExternalLink,
  Star,
  Zap,
  Shield,
  BadgeCheck,
  Send,
} from "lucide-react";
import { cardPressSubtleVariants, listItemVariants } from "./animations/variants";
import type { UnifiedJobListing, JobSourceType, JOB_SOURCE_INFO } from "@/types/unified-jobs";

interface UnifiedJobCardProps {
  job: UnifiedJobListing;
  onSelect: (job: UnifiedJobListing) => void;
  onSave?: (jobId: string) => void;
  onApply?: (job: UnifiedJobListing) => void;
  isSaved?: boolean;
  matchScore?: number;
  className?: string;
}

// Company logo with employer vs external styling
const CompanyLogo = ({
  company,
  imageUrl,
  isEmployer,
}: {
  company: string;
  imageUrl?: string;
  isEmployer: boolean;
}) => {
  const initials = company
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  if (imageUrl) {
    return (
      <div className={cn(
        "w-12 h-12 rounded-xl overflow-hidden border-2",
        isEmployer ? "border-emerald-400/40" : "border-slate-500/30"
      )}>
        <img
          src={imageUrl}
          alt={company}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
    );
  }

  return (
    <div className={cn(
      "w-12 h-12 rounded-xl flex items-center justify-center border",
      isEmployer
        ? "bg-gradient-to-br from-emerald-500/30 to-teal-500/30 border-emerald-400/30"
        : "bg-gradient-to-br from-slate-600/40 to-slate-700/40 border-slate-500/30"
    )}>
      <span className={cn(
        "text-sm font-bold",
        isEmployer ? "text-emerald-300" : "text-slate-300"
      )}>
        {initials}
      </span>
    </div>
  );
};

// Match score badge
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

// Source badge with colors
const SourceBadge = ({ source, isInternal }: { source: JobSourceType; isInternal: boolean }) => {
  if (isInternal) {
    return (
      <Badge className="bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border-emerald-400/40 text-emerald-300 text-[10px] font-semibold backdrop-blur-sm">
        <Shield className="h-3 w-3 mr-1" />
        Direct Employer
      </Badge>
    );
  }

  const sourceColors: Record<JobSourceType, string> = {
    employer: "bg-emerald-500/20 border-emerald-500/30 text-emerald-300",
    reed: "bg-blue-500/20 border-blue-500/30 text-blue-300",
    indeed: "bg-purple-500/20 border-purple-500/30 text-purple-300",
    totaljobs: "bg-green-500/20 border-green-500/30 text-green-300",
    cvlibrary: "bg-teal-500/20 border-teal-500/30 text-teal-300",
    jobscouk: "bg-cyan-500/20 border-cyan-500/30 text-cyan-300",
  };

  const sourceLabels: Record<JobSourceType, string> = {
    employer: "Direct Employer",
    reed: "Reed",
    indeed: "Indeed",
    totaljobs: "TotalJobs",
    cvlibrary: "CV Library",
    jobscouk: "Jobs.co.uk",
  };

  return (
    <Badge className={cn("text-[10px] font-medium backdrop-blur-sm", sourceColors[source] || sourceColors.reed)}>
      {sourceLabels[source] || source}
    </Badge>
  );
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

// Check if job is fresh
const isJobFresh = (postedDate: string) => {
  const posted = new Date(postedDate);
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return posted > oneDayAgo;
};

const UnifiedJobCard = ({
  job,
  onSelect,
  onSave,
  onApply,
  isSaved = false,
  matchScore,
  className,
}: UnifiedJobCardProps) => {
  const isFresh = isJobFresh(job.posted_date);
  const isEmployer = job.is_internal;

  const cardContent = (
    <motion.div
      variants={listItemVariants}
      whileTap={cardPressSubtleVariants.tap}
      onClick={() => onSelect(job)}
      className={cn(
        "group relative bg-card/80 backdrop-blur-sm",
        "rounded-2xl border overflow-hidden cursor-pointer",
        "transition-all duration-300",
        "hover:-translate-y-1",
        "active:scale-[0.98]",
        // Different styling for employer vs external jobs
        isEmployer
          ? "border-emerald-500/30 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10"
          : "border-white/10 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10",
        className
      )}
    >
      {/* Accent line at top - emerald for employer, blue for external */}
      <div className={cn(
        "absolute inset-x-0 top-0 h-[2px] transition-opacity",
        isEmployer
          ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 opacity-100"
          : "bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100"
      )} />

      {/* Subtle gradient overlay */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
        isEmployer
          ? "bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent"
          : "bg-gradient-to-br from-blue-500/5 via-transparent to-transparent"
      )} />

      <div className="relative p-4 space-y-3">
        {/* Header: Logo + Badges */}
        <div className="flex items-start justify-between gap-3">
          <CompanyLogo
            company={job.company}
            imageUrl={job.employer_logo || job.image_url}
            isEmployer={isEmployer}
          />

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 flex-1 justify-end">
            {isFresh && (
              <Badge className="bg-gradient-to-r from-emerald-500/30 to-green-500/30 border-emerald-400/40 text-emerald-300 text-[10px] font-semibold backdrop-blur-sm">
                <Zap className="h-3 w-3 mr-1" />
                New
              </Badge>
            )}
            {matchScore && <MatchScoreBadge score={matchScore} />}
            <SourceBadge source={job.source} isInternal={isEmployer} />
          </div>
        </div>

        {/* Job Title */}
        <h3 className={cn(
          "font-bold text-white line-clamp-2 leading-snug text-base transition-colors",
          isEmployer ? "group-hover:text-emerald-200" : "group-hover:text-blue-200"
        )}>
          {job.title}
        </h3>

        {/* Company */}
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
            isEmployer ? "bg-emerald-500/20" : "bg-blue-500/20"
          )}>
            <Building2 className={cn(
              "h-3.5 w-3.5",
              isEmployer ? "text-emerald-400" : "text-blue-400"
            )} />
          </div>
          <p className={cn(
            "text-sm font-medium line-clamp-1",
            isEmployer ? "text-emerald-400" : "text-blue-400"
          )}>
            {job.company}
          </p>
          {isEmployer && (
            <BadgeCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
          )}
        </div>

        {/* Stats Row */}
        <div className="flex items-center flex-wrap gap-3 text-xs text-white/50">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span className="line-clamp-1 max-w-[120px]">{job.location}</span>
          </span>

          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5">
            <Briefcase className="h-3.5 w-3.5" />
            {job.type}
          </span>

          <span className="flex items-center gap-1.5 ml-auto">
            <Clock className="h-3.5 w-3.5" />
            {formatPostedDate(job.posted_date)}
          </span>
        </div>

        {/* Applied badge for employer jobs */}
        {isEmployer && job.has_applied && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <BadgeCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-300">Application Submitted</span>
          </div>
        )}

        {/* Footer: Salary + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div>
            {job.salary ? (
              <>
                <span className="text-xs text-white/40 block">Salary</span>
                <span className="text-base font-bold text-white">{job.salary}</span>
              </>
            ) : (
              <span className="text-sm text-white/40">Salary not specified</span>
            )}
          </div>

          {isEmployer ? (
            <Button
              size="sm"
              className={cn(
                "h-9 px-4 font-medium shadow-lg transition-all",
                job.has_applied
                  ? "bg-slate-600 hover:bg-slate-500 text-white shadow-slate-500/25"
                  : "bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/25 group-hover:shadow-emerald-500/40"
              )}
              onClick={(e) => {
                e.stopPropagation();
                if (!job.has_applied && onApply) {
                  onApply(job);
                } else {
                  onSelect(job);
                }
              }}
            >
              {job.has_applied ? (
                <>
                  <span className="text-sm">View Status</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-1" />
                  <span className="text-sm">Apply with Elec-ID</span>
                </>
              )}
            </Button>
          ) : (
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
          )}
        </div>

        {/* Saved indicator */}
        {isSaved && (
          <div className="absolute top-4 right-4">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shadow-lg",
              isEmployer
                ? "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-emerald-500/30"
                : "bg-gradient-to-br from-blue-500 to-cyan-500 shadow-blue-500/30"
            )}>
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
        onApply && !job.has_applied
          ? {
              icon: isEmployer ? <Send className="h-5 w-5" /> : <ExternalLink className="h-5 w-5" />,
              bgColor: isEmployer ? "bg-emerald-500" : "bg-emerald-500",
              label: isEmployer ? "Apply" : "View",
              onAction: () => onApply(job),
            }
          : undefined
      }
      rightAction={
        onSave
          ? {
              icon: <Bookmark className={cn("h-5 w-5", isSaved && "fill-current")} />,
              bgColor: isEmployer ? "bg-teal-500" : "bg-blue-500",
              label: isSaved ? "Saved" : "Save",
              onAction: () => onSave(job.id),
            }
          : undefined
      }
      disabled={!onSave && (!onApply || job.has_applied)}
      className={className}
    >
      {cardContent}
    </SwipeableCard>
  );
};

export default UnifiedJobCard;
