import {
  MapPin,
  Briefcase,
  PoundSterling,
  Clock,
  Building2,
  Laptop,
  Home,
  Calendar,
  CheckCircle,
  Badge as BadgeIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatSalaryRange, type VacancyFormData, type SalaryPeriod } from "./schema";

interface VacancyPreviewCardProps {
  data: Partial<VacancyFormData>;
  companyName?: string;
  className?: string;
}

export function VacancyPreviewCard({
  data,
  companyName = "Your Company",
  className,
}: VacancyPreviewCardProps) {
  const {
    title,
    type,
    location,
    workArrangement,
    salaryMin,
    salaryMax,
    salaryPeriod = "year",
    benefits = [],
    requirements = [],
    experienceLevel,
    description,
    schedule,
    startDate,
    closingDate,
  } = data;

  const getArrangementIcon = () => {
    switch (workArrangement) {
      case "On-site":
        return <Building2 className="h-4 w-4" />;
      case "Remote":
        return <Laptop className="h-4 w-4" />;
      case "Hybrid":
        return <Home className="h-4 w-4" />;
      default:
        return <Building2 className="h-4 w-4" />;
    }
  };

  return (
    <Card
      className={cn(
        "bg-gradient-to-br from-elec-gray to-elec-dark",
        "border border-white/10 overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            {/* Company */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <p className="text-sm text-white/60">{companyName}</p>
                <Badge
                  variant="outline"
                  className="text-xs border-green-500/30 text-green-400"
                >
                  Direct from Employer
                </Badge>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-white">
              {title || "Job Title"}
            </h3>

            {/* Key details */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
              {location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {location}
                </span>
              )}
              {workArrangement && (
                <span className="flex items-center gap-1">
                  {getArrangementIcon()}
                  {workArrangement}
                </span>
              )}
              {type && (
                <Badge variant="secondary" className="text-xs">
                  {type}
                </Badge>
              )}
            </div>
          </div>

          {/* Salary badge */}
          <div className="text-right">
            <div className="px-3 py-2 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
              <p className="text-lg font-bold text-elec-yellow">
                {formatSalaryRange(salaryMin, salaryMax, salaryPeriod as SalaryPeriod)}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Requirements */}
        {requirements.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-white/80">Requirements</p>
            <div className="flex flex-wrap gap-2">
              {requirements.slice(0, 6).map((req) => (
                <Badge
                  key={req}
                  variant="outline"
                  className="text-xs border-elec-yellow/30 text-elec-yellow/80"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {req}
                </Badge>
              ))}
              {requirements.length > 6 && (
                <Badge variant="secondary" className="text-xs">
                  +{requirements.length - 6} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Benefits */}
        {benefits.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-white/80">Benefits</p>
            <div className="flex flex-wrap gap-2">
              {benefits.slice(0, 5).map((benefit) => (
                <Badge
                  key={benefit}
                  variant="secondary"
                  className="text-xs bg-green-500/10 text-green-400 border border-green-500/20"
                >
                  {benefit}
                </Badge>
              ))}
              {benefits.length > 5 && (
                <Badge variant="secondary" className="text-xs">
                  +{benefits.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Description preview */}
        {description && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-white/80">About the Role</p>
            <div
              className="text-sm text-white/60 line-clamp-4 prose prose-invert prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: description.substring(0, 300) + (description.length > 300 ? "..." : ""),
              }}
            />
          </div>
        )}

        {/* Footer info */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10 text-xs text-white/50">
          {schedule && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {schedule}
            </span>
          )}
          {startDate && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Start: {startDate}
            </span>
          )}
          {experienceLevel && (
            <Badge variant="outline" className="text-xs">
              {experienceLevel} Level
            </Badge>
          )}
          {closingDate && (
            <span className="flex items-center gap-1 text-warning">
              <Clock className="h-3.5 w-3.5" />
              Closes: {new Date(closingDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
