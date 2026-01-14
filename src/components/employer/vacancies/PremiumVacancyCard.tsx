import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  Eye,
  PoundSterling,
  ChevronRight,
  Edit2,
  Copy,
  XCircle,
  CheckCircle,
  Calendar,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PremiumVacancyCardProps {
  id: string;
  title: string;
  location: string;
  type: string;
  status: "Open" | "Closed" | "Draft";
  salaryMin?: number;
  salaryMax?: number;
  salaryPeriod?: string;
  applicantCount: number;
  views: number;
  postedAt: string;
  closingDate?: string;
  workArrangement?: string;
  companyInitial?: string;
  onEdit: () => void;
  onDuplicate: () => void;
  onToggleStatus: () => void;
  onViewApplicants: () => void;
  onClick?: () => void;
}

export function PremiumVacancyCard({
  id,
  title,
  location,
  type,
  status,
  salaryMin,
  salaryMax,
  salaryPeriod = "year",
  applicantCount,
  views,
  postedAt,
  closingDate,
  workArrangement,
  companyInitial = "E",
  onEdit,
  onDuplicate,
  onToggleStatus,
  onViewApplicants,
  onClick,
}: PremiumVacancyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusConfig: Record<string, { bg: string; text: string; border: string; dot: string }> = {
    Open: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-500",
      border: "border-emerald-500/30",
      dot: "bg-emerald-500",
    },
    open: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-500",
      border: "border-emerald-500/30",
      dot: "bg-emerald-500",
    },
    Closed: {
      bg: "bg-gray-500/10",
      text: "text-gray-400",
      border: "border-gray-500/30",
      dot: "bg-gray-500",
    },
    closed: {
      bg: "bg-gray-500/10",
      text: "text-gray-400",
      border: "border-gray-500/30",
      dot: "bg-gray-500",
    },
    Draft: {
      bg: "bg-amber-500/10",
      text: "text-amber-500",
      border: "border-amber-500/30",
      dot: "bg-amber-500",
    },
    draft: {
      bg: "bg-amber-500/10",
      text: "text-amber-500",
      border: "border-amber-500/30",
      dot: "bg-amber-500",
    },
  };

  // Fallback for unknown status
  const defaultConfig = {
    bg: "bg-gray-500/10",
    text: "text-gray-400",
    border: "border-gray-500/30",
    dot: "bg-gray-500",
  };

  const config = statusConfig[status] || defaultConfig;

  const formatSalary = (min?: number, max?: number, period?: string) => {
    if (!min && !max) return null;
    const periodLabel = {
      year: "/yr",
      month: "/mo",
      week: "/wk",
      day: "/day",
      hour: "/hr",
    }[period || "year"] || "/yr";

    if (min && max) {
      return `£${min.toLocaleString()} - £${max.toLocaleString()}${periodLabel}`;
    }
    if (min) return `From £${min.toLocaleString()}${periodLabel}`;
    if (max) return `Up to £${max.toLocaleString()}${periodLabel}`;
    return null;
  };

  const salary = formatSalary(salaryMin, salaryMax, salaryPeriod);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-elec-gray/80 backdrop-blur-sm",
        "border border-white/10",
        "hover:border-elec-yellow/40",
        "transition-all duration-300",
        "hover:shadow-lg hover:shadow-elec-yellow/5",
        "group"
      )}
    >
      {/* Status indicator line */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-1 rounded-l-xl",
          status === "Open" ? "bg-emerald-500" : status === "Draft" ? "bg-amber-500" : "bg-gray-500"
        )}
      />

      {/* Main content */}
      <div
        className="p-4 pl-5 cursor-pointer"
        onClick={() => {
          setIsExpanded(!isExpanded);
          onClick?.();
        }}
      >
        <div className="flex items-start gap-4">
          {/* Company logo/initial */}
          <div className="shrink-0 w-12 h-12 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center">
            <span className="text-lg font-bold text-elec-yellow">{companyInitial}</span>
          </div>

          {/* Job info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white text-lg leading-tight truncate pr-2">
                  {title}
                </h3>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="flex items-center gap-1.5 text-sm text-white/60">
                    <MapPin className="h-3.5 w-3.5 text-elec-yellow/70" />
                    {location}
                  </span>
                  <span className="text-white/30">•</span>
                  <Badge
                    variant="outline"
                    className="text-xs bg-white/5 border-white/10 text-white/70"
                  >
                    {type}
                  </Badge>
                  {workArrangement && (
                    <>
                      <span className="text-white/30 hidden sm:inline">•</span>
                      <Badge
                        variant="outline"
                        className="text-xs bg-white/5 border-white/10 text-white/70 hidden sm:inline-flex"
                      >
                        {workArrangement}
                      </Badge>
                    </>
                  )}
                </div>
              </div>

              {/* Status badge + expand indicator */}
              <div className="flex items-center gap-2 shrink-0">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs font-medium px-2.5 py-1",
                    config.bg,
                    config.text,
                    config.border
                  )}
                >
                  <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", config.dot)} />
                  {status}
                </Badge>
                <ChevronRight
                  className={cn(
                    "h-5 w-5 text-white/40 transition-transform duration-300",
                    isExpanded && "rotate-90"
                  )}
                />
              </div>
            </div>

            {/* Salary */}
            {salary && (
              <div className="flex items-center gap-1.5 mt-3">
                <PoundSterling className="h-4 w-4 text-elec-yellow" />
                <span className="font-semibold text-white">{salary}</span>
              </div>
            )}

            {/* Metrics row */}
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/5">
              <div className="flex items-center gap-1.5">
                <div className="p-1.5 rounded-lg bg-elec-yellow/10">
                  <Users className="h-3.5 w-3.5 text-elec-yellow" />
                </div>
                <span className="text-sm font-medium text-white">{applicantCount}</span>
                <span className="text-xs text-white/50">applicants</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="p-1.5 rounded-lg bg-white/5">
                  <Eye className="h-3.5 w-3.5 text-white/60" />
                </div>
                <span className="text-sm font-medium text-white/80">{views}</span>
                <span className="text-xs text-white/50">views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pl-5 space-y-4 border-t border-white/5 pt-4">
              {/* Dates */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-white/60">
                  <Calendar className="h-4 w-4 text-elec-yellow/70" />
                  <span>Posted: {new Date(postedAt).toLocaleDateString()}</span>
                </div>
                {closingDate && (
                  <div className="flex items-center gap-2 text-white/60">
                    <Clock className="h-4 w-4 text-elec-yellow/70" />
                    <span>Closes: {new Date(closingDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-11 text-xs bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}
                >
                  <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-11 text-xs bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate();
                  }}
                >
                  <Copy className="h-3.5 w-3.5 mr-1.5" />
                  Duplicate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-11 text-xs",
                    status === "Open"
                      ? "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                      : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStatus();
                  }}
                >
                  {status === "Open" ? (
                    <>
                      <XCircle className="h-3.5 w-3.5 mr-1.5" />
                      Close
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                      Reopen
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  className="h-11 text-xs bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewApplicants();
                  }}
                >
                  <Users className="h-3.5 w-3.5 mr-1.5" />
                  Applicants ({applicantCount})
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
