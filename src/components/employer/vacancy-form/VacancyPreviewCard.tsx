import {
  MapPin,
  Briefcase,
  Clock,
  Building2,
  Laptop,
  Home,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatSalaryRange, type VacancyFormData, type SalaryPeriod } from './schema';

interface VacancyPreviewCardProps {
  data: Partial<VacancyFormData>;
  companyName?: string;
  className?: string;
}

export function VacancyPreviewCard({
  data,
  companyName = 'Your Company',
  className,
}: VacancyPreviewCardProps) {
  const {
    title,
    type,
    location,
    workArrangement,
    salaryMin,
    salaryMax,
    salaryPeriod = 'year',
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
      case 'On-site':
        return <Building2 className="h-4 w-4" />;
      case 'Remote':
        return <Laptop className="h-4 w-4" />;
      case 'Hybrid':
        return <Home className="h-4 w-4" />;
      default:
        return <Building2 className="h-4 w-4" />;
    }
  };

  return (
    <div
      className={cn(
        'bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1 min-w-0">
            {/* Company */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-elec-yellow/15 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <p className="text-[13px] text-white">{companyName}</p>
                <Badge variant="outline" className="text-[11px] border-emerald-500/25 text-emerald-400">
                  Direct from Employer
                </Badge>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-white">{title || 'Job Title'}</h3>

            {/* Key details */}
            <div className="flex flex-wrap items-center gap-3 text-[13px] text-white">
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
                <Badge
                  variant="outline"
                  className="text-[11px] bg-white/[0.06] border-white/[0.08] text-white"
                >
                  {type}
                </Badge>
              )}
            </div>
          </div>

          {/* Salary badge */}
          <div className="text-right shrink-0">
            <div className="px-3 py-2 rounded-xl bg-elec-yellow/10 border border-elec-yellow/25">
              <p className="text-lg font-bold text-elec-yellow tabular-nums">
                {formatSalaryRange(salaryMin, salaryMax, salaryPeriod as SalaryPeriod)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 space-y-6">
        {/* Requirements */}
        {requirements.length > 0 && (
          <div className="space-y-2">
            <p className="text-[13px] font-medium text-white">Requirements</p>
            <div className="flex flex-wrap gap-2">
              {requirements.slice(0, 6).map((req) => (
                <Badge
                  key={req}
                  variant="outline"
                  className="text-[11px] border-elec-yellow/25 text-elec-yellow"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {req}
                </Badge>
              ))}
              {requirements.length > 6 && (
                <Badge
                  variant="outline"
                  className="text-[11px] bg-white/[0.06] border-white/[0.08] text-white"
                >
                  +{requirements.length - 6} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Benefits */}
        {benefits.length > 0 && (
          <div className="space-y-2">
            <p className="text-[13px] font-medium text-white">Benefits</p>
            <div className="flex flex-wrap gap-2">
              {benefits.slice(0, 5).map((benefit) => (
                <Badge
                  key={benefit}
                  variant="outline"
                  className="text-[11px] bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                >
                  {benefit}
                </Badge>
              ))}
              {benefits.length > 5 && (
                <Badge
                  variant="outline"
                  className="text-[11px] bg-white/[0.06] border-white/[0.08] text-white"
                >
                  +{benefits.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Description preview */}
        {description && (
          <div className="space-y-2">
            <p className="text-[13px] font-medium text-white">About the Role</p>
            <div
              className="text-[13px] text-white line-clamp-4 prose prose-invert prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: description.substring(0, 300) + (description.length > 300 ? '...' : ''),
              }}
            />
          </div>
        )}

        {/* Footer info */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/[0.06] text-[11px] text-white">
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
            <Badge
              variant="outline"
              className="text-[11px] bg-white/[0.06] border-white/[0.08] text-white"
            >
              {experienceLevel} Level
            </Badge>
          )}
          {closingDate && (
            <span className="flex items-center gap-1 text-amber-400">
              <Clock className="h-3.5 w-3.5" />
              Closes: {new Date(closingDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
