/**
 * UnifiedJobCard - Clean, mobile-native job card
 * Simplified design inspired by LatestJobsWidget
 */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  MapPin,
  Building2,
  ChevronRight,
  Bookmark,
  Zap,
  Shield,
  BadgeCheck,
  Clock,
  PoundSterling,
} from "lucide-react";
import type { UnifiedJobListing, JobSourceType } from "@/types/unified-jobs";

interface UnifiedJobCardProps {
  job: UnifiedJobListing;
  onSelect: (job: UnifiedJobListing) => void;
  onSave?: (jobId: string) => void;
  onApply?: (job: UnifiedJobListing) => void;
  isSaved?: boolean;
  matchScore?: number;
  className?: string;
}

// Format salary for display - "45059.00 GBP Annual" → "£45k"
const formatSalary = (salary: string | null): string | null => {
  if (!salary) return null;

  // Handle ranges like "£35,000 - £45,000"
  const rangeMatch = salary.match(/(\d+(?:,\d{3})*(?:\.\d{2})?)\s*-\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/);
  if (rangeMatch) {
    const low = Math.round(parseFloat(rangeMatch[1].replace(/,/g, '')) / 1000);
    const high = Math.round(parseFloat(rangeMatch[2].replace(/,/g, '')) / 1000);
    return `£${low}-${high}k`;
  }

  // Single value
  const match = salary.match(/(\d+(?:,\d{3})*(?:\.\d{2})?)/);
  if (!match) return salary.length < 15 ? salary : null;

  const amount = parseFloat(match[1].replace(/,/g, ''));
  if (amount >= 1000) {
    const k = Math.round(amount / 1000);
    return `£${k}k`;
  }

  return `£${amount}`;
};

// Clean up company name
const formatCompany = (company: string): string => {
  return company
    .replace(/\s*(Recruitment|Ltd|Limited|PLC|Inc|Group|Agency)\.?$/gi, '')
    .trim() || company;
};

// Clean up location
const formatLocation = (location: string): string => {
  const parts = location.split(',');
  return parts[0].trim();
};

// Format posted date
const formatPostedDate = (date: string): string => {
  const posted = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - posted.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return posted.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};

// Check if job is fresh (posted today)
const isJobFresh = (postedDate: string): boolean => {
  const posted = new Date(postedDate);
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return posted > oneDayAgo;
};

// Source badge colors
const sourceColors: Record<JobSourceType, { bg: string; text: string }> = {
  employer: { bg: "bg-emerald-500/15", text: "text-emerald-400" },
  reed: { bg: "bg-blue-500/15", text: "text-blue-400" },
  indeed: { bg: "bg-purple-500/15", text: "text-purple-400" },
  totaljobs: { bg: "bg-green-500/15", text: "text-green-400" },
  cvlibrary: { bg: "bg-teal-500/15", text: "text-teal-400" },
  jobscouk: { bg: "bg-cyan-500/15", text: "text-cyan-400" },
};

const sourceLabels: Record<JobSourceType, string> = {
  employer: "Direct",
  reed: "Reed",
  indeed: "Indeed",
  totaljobs: "TotalJobs",
  cvlibrary: "CV Library",
  jobscouk: "Jobs.co.uk",
};

const UnifiedJobCard = ({
  job,
  onSelect,
  onSave,
  onApply,
  isSaved = false,
  className,
}: UnifiedJobCardProps) => {
  const isEmployer = job.is_internal;
  const isFresh = isJobFresh(job.posted_date);
  const salary = formatSalary(job.salary);
  const company = formatCompany(job.company);
  const location = formatLocation(job.location);

  const colors = sourceColors[job.source] || sourceColors.reed;

  return (
    <div
      onClick={() => onSelect(job)}
      className={cn(
        "relative bg-card/80 backdrop-blur-sm rounded-2xl border overflow-hidden cursor-pointer",
        "transition-all duration-200 touch-manipulation",
        "active:scale-[0.98]",
        isEmployer
          ? "border-emerald-500/30 hover:border-emerald-500/50"
          : "border-white/10 hover:border-white/20",
        className
      )}
    >
      {/* Accent line for employer jobs */}
      {isEmployer && (
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500" />
      )}

      <div className="p-4">
        {/* Top row: Job icon + Title + Badges */}
        <div className="flex items-start gap-3">
          {/* Job icon */}
          <div className={cn(
            "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0",
            isEmployer ? "bg-emerald-500/15" : "bg-elec-yellow/10"
          )}>
            {isEmployer ? (
              <Shield className="h-5 w-5 text-emerald-400" />
            ) : (
              <Briefcase className="h-5 w-5 text-elec-yellow" />
            )}
          </div>

          {/* Title + company */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-[15px] leading-tight line-clamp-2">
              {job.title}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <Building2 className="h-3.5 w-3.5 text-white/50 flex-shrink-0" />
              <span className={cn(
                "text-sm font-medium truncate",
                isEmployer ? "text-emerald-400" : "text-white/70"
              )}>
                {company}
              </span>
              {isEmployer && (
                <BadgeCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              )}
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-col gap-1 items-end flex-shrink-0">
            {isFresh && (
              <Badge className="bg-emerald-500/15 text-emerald-400 text-[10px] font-semibold px-2 py-0.5">
                <Zap className="h-3 w-3 mr-0.5" />
                New
              </Badge>
            )}
            <Badge className={cn(
              "text-[10px] font-medium px-2 py-0.5",
              isEmployer
                ? "bg-emerald-500/15 text-emerald-400"
                : `${colors.bg} ${colors.text}`
            )}>
              {isEmployer ? "Direct" : sourceLabels[job.source] || job.source}
            </Badge>
          </div>
        </div>

        {/* Middle row: Location + Type + Posted */}
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-white/50">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {location}
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 bg-white/5 rounded">
            <Briefcase className="h-3 w-3" />
            {job.type}
          </span>
          <span className="flex items-center gap-1 ml-auto">
            <Clock className="h-3.5 w-3.5" />
            {formatPostedDate(job.posted_date)}
          </span>
        </div>

        {/* Applied badge */}
        {isEmployer && job.has_applied && (
          <div className="flex items-center gap-2 mt-3 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <BadgeCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-300">Application Submitted</span>
          </div>
        )}

        {/* Bottom row: Salary + CTA */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
          {/* Salary */}
          <div className="flex items-center gap-2">
            {salary ? (
              <div className="flex items-center gap-1.5 bg-green-500/10 text-green-400 text-sm font-bold px-3 py-1.5 rounded-lg">
                <PoundSterling className="h-4 w-4" />
                {salary.replace('£', '')}
              </div>
            ) : (
              <span className="text-sm text-white/40">Salary negotiable</span>
            )}

            {/* Saved indicator */}
            {isSaved && (
              <div className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center",
                isEmployer ? "bg-emerald-500/20" : "bg-blue-500/20"
              )}>
                <Bookmark className={cn(
                  "h-4 w-4 fill-current",
                  isEmployer ? "text-emerald-400" : "text-blue-400"
                )} />
              </div>
            )}
          </div>

          {/* Action button */}
          <Button
            size="sm"
            className={cn(
              "h-9 px-4 font-medium transition-all touch-manipulation",
              isEmployer
                ? job.has_applied
                  ? "bg-slate-600 hover:bg-slate-500 text-white"
                  : "bg-emerald-500 hover:bg-emerald-400 text-white"
                : "bg-blue-500 hover:bg-blue-400 text-white"
            )}
            onClick={(e) => {
              e.stopPropagation();
              if (isEmployer && !job.has_applied && onApply) {
                onApply(job);
              } else {
                onSelect(job);
              }
            }}
          >
            {isEmployer && !job.has_applied ? (
              <>Apply</>
            ) : (
              <>View</>
            )}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnifiedJobCard;
