import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
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
  Flame,
  AlertTriangle,
  Timer,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { differenceInDays } from 'date-fns';
import {
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  IconButton,
} from '@/components/employer/editorial';

// Urgency indicator types
type UrgencyType = 'closing' | 'noApplicants' | 'hot' | null;

interface UrgencyIndicator {
  type: UrgencyType;
  label: string;
  icon: React.ReactNode;
  className: string;
}

// Calculate urgency for a vacancy
const getUrgencyIndicator = (
  closingDate: string | undefined,
  applicantCount: number,
  postedAt: string,
  status: string
): UrgencyIndicator | null => {
  if (status !== 'Open') return null;

  const daysToClose = closingDate ? differenceInDays(new Date(closingDate), new Date()) : null;
  const daysSincePosted = differenceInDays(new Date(), new Date(postedAt));

  // Priority: Closing soon > No applicants > Hot
  if (daysToClose !== null && daysToClose <= 7 && daysToClose >= 0) {
    return {
      type: 'closing',
      label: daysToClose === 0 ? 'Closes today' : `${daysToClose}d left`,
      icon: <Timer className="h-3 w-3" />,
      className: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    };
  }

  if (applicantCount === 0 && daysSincePosted >= 3) {
    return {
      type: 'noApplicants',
      label: 'No applicants',
      icon: <AlertTriangle className="h-3 w-3" />,
      className: 'bg-red-500/15 text-red-400 border-red-500/25',
    };
  }

  if (applicantCount >= 10) {
    return {
      type: 'hot',
      label: 'Hot',
      icon: <Flame className="h-3 w-3" />,
      className: 'bg-orange-500/15 text-orange-400 border-orange-500/25',
    };
  }

  return null;
};

interface PremiumVacancyCardProps {
  id: string;
  title: string;
  location: string;
  type: string;
  status: 'Open' | 'Closed' | 'Draft';
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
  salaryPeriod = 'year',
  applicantCount,
  views,
  postedAt,
  closingDate,
  workArrangement,
  companyInitial = 'E',
  onEdit,
  onDuplicate,
  onToggleStatus,
  onViewApplicants,
  onClick,
}: PremiumVacancyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate urgency indicator
  const urgency = getUrgencyIndicator(closingDate, applicantCount, postedAt, status);

  const statusConfig: Record<string, { bg: string; text: string; border: string; dot: string }> = {
    Open: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/25',
      dot: 'bg-emerald-500',
    },
    open: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/25',
      dot: 'bg-emerald-500',
    },
    Closed: {
      bg: 'bg-white/[0.06]',
      text: 'text-white',
      border: 'border-white/[0.08]',
      dot: 'bg-white/30',
    },
    closed: {
      bg: 'bg-white/[0.06]',
      text: 'text-white',
      border: 'border-white/[0.08]',
      dot: 'bg-white/30',
    },
    Draft: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/25',
      dot: 'bg-amber-500',
    },
    draft: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/25',
      dot: 'bg-amber-500',
    },
  };

  // Fallback for unknown status
  const defaultConfig = {
    bg: 'bg-white/[0.06]',
    text: 'text-white',
    border: 'border-white/[0.08]',
    dot: 'bg-white/30',
  };

  const config = statusConfig[status] || defaultConfig;

  const formatSalary = (min?: number, max?: number, period?: string) => {
    if (!min && !max) return null;
    const periodLabel =
      {
        year: '/yr',
        month: '/mo',
        week: '/wk',
        day: '/day',
        hour: '/hr',
      }[period || 'year'] || '/yr';

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
        'relative overflow-hidden rounded-2xl',
        'bg-[hsl(0_0%_12%)]',
        'border border-white/[0.06]',
        'hover:bg-[hsl(0_0%_15%)]',
        'transition-colors duration-200',
        'group'
      )}
    >
      {/* Status indicator line */}
      <div
        className={cn(
          'absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl',
          status === 'Open' ? 'bg-emerald-500' : status === 'Draft' ? 'bg-amber-500' : 'bg-white/20'
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
          <div className="shrink-0 w-12 h-12 rounded-xl bg-elec-yellow/10 border border-elec-yellow/25 flex items-center justify-center">
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
                  <span className="flex items-center gap-1.5 text-[13px] text-white">
                    <MapPin className="h-3.5 w-3.5 text-elec-yellow/70" />
                    {location}
                  </span>
                  <span className="text-white">•</span>
                  <Badge
                    variant="outline"
                    className="text-[11px] bg-white/[0.06] border-white/[0.08] text-white"
                  >
                    {type}
                  </Badge>
                  {workArrangement && (
                    <>
                      <span className="text-white hidden sm:inline">•</span>
                      <Badge
                        variant="outline"
                        className="text-[11px] bg-white/[0.06] border-white/[0.08] text-white hidden sm:inline-flex"
                      >
                        {workArrangement}
                      </Badge>
                    </>
                  )}
                </div>
              </div>

              {/* Status badge + urgency + expand indicator */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Urgency badge */}
                {urgency && (
                  <Badge
                    variant="outline"
                    className={cn('text-[11px] font-medium px-2 py-1 animate-pulse', urgency.className)}
                  >
                    {urgency.icon}
                    <span className="ml-1">{urgency.label}</span>
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className={cn(
                    'text-[11px] font-medium px-2.5 py-1',
                    config.bg,
                    config.text,
                    config.border
                  )}
                >
                  <span className={cn('w-1.5 h-1.5 rounded-full mr-1.5 inline-block', config.dot)} />
                  {status}
                </Badge>
                <ChevronRight
                  className={cn(
                    'h-5 w-5 text-white transition-transform duration-300',
                    isExpanded && 'rotate-90'
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

            {/* Metrics row + Quick Actions */}
            <div className="flex items-center justify-between gap-4 mt-3 pt-3 border-t border-white/[0.06]">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="p-1.5 rounded-lg bg-elec-yellow/10">
                    <Users className="h-3.5 w-3.5 text-elec-yellow" />
                  </div>
                  <span className="text-[13px] font-medium text-white tabular-nums">
                    {applicantCount}
                  </span>
                  <span className="text-[11px] text-white">applicants</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="p-1.5 rounded-lg bg-white/[0.06]">
                    <Eye className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-[13px] font-medium text-white tabular-nums">{views}</span>
                  <span className="text-[11px] text-white">views</span>
                </div>
              </div>

              {/* Quick actions - visible in collapsed state */}
              <div className="flex items-center gap-1">
                <IconButton
                  aria-label="Edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}
                  className="h-9 w-9"
                >
                  <Edit2 className="h-4 w-4" />
                </IconButton>
                <div className="relative">
                  <IconButton
                    aria-label="View applicants"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewApplicants();
                    }}
                    className="h-9 w-9"
                  >
                    <Users className="h-4 w-4" />
                  </IconButton>
                  {applicantCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-elec-yellow text-black text-[10px] font-bold rounded-full flex items-center justify-center pointer-events-none">
                      {applicantCount > 99 ? '99+' : applicantCount}
                    </span>
                  )}
                </div>
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
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pl-5 space-y-4 border-t border-white/[0.06] pt-4">
              {/* Dates */}
              <div className="flex items-center gap-6 text-[13px]">
                <div className="flex items-center gap-2 text-white">
                  <Calendar className="h-4 w-4 text-elec-yellow/70" />
                  <span>Posted: {new Date(postedAt).toLocaleDateString()}</span>
                </div>
                {closingDate && (
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="h-4 w-4 text-elec-yellow/70" />
                    <span>Closes: {new Date(closingDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <SecondaryButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}
                  fullWidth
                >
                  <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                  Edit
                </SecondaryButton>
                <SecondaryButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate();
                  }}
                  fullWidth
                >
                  <Copy className="h-3.5 w-3.5 mr-1.5" />
                  Duplicate
                </SecondaryButton>
                {status === 'Open' ? (
                  <DestructiveButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleStatus();
                    }}
                    fullWidth
                  >
                    <XCircle className="h-3.5 w-3.5 mr-1.5" />
                    Close
                  </DestructiveButton>
                ) : (
                  <SecondaryButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleStatus();
                    }}
                    fullWidth
                  >
                    <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                    Reopen
                  </SecondaryButton>
                )}
                <PrimaryButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewApplicants();
                  }}
                  fullWidth
                >
                  <Users className="h-3.5 w-3.5 mr-1.5" />
                  Applicants ({applicantCount})
                </PrimaryButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
