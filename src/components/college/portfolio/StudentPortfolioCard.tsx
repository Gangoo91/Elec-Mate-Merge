import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StudentPortfolio } from '@/hooks/college/useCollegePortfolios';
import { Pill, Eyebrow, PrimaryButton, SecondaryButton, type Tone } from '@/components/college/primitives';

interface StudentPortfolioCardProps {
  portfolio: StudentPortfolio;
  onViewDetails: (studentId: string, qualificationId: string) => void;
  onReviewSubmissions?: (studentId: string) => void;
  showActions?: boolean;
}

const StudentPortfolioCard: React.FC<StudentPortfolioCardProps> = ({
  portfolio,
  onViewDetails,
  onReviewSubmissions,
  showActions = true,
}) => {
  const statusTone = (status: string): Tone => {
    switch (status) {
      case 'active':
        return 'green';
      case 'at_risk':
        return 'red';
      case 'on_break':
        return 'amber';
      case 'completed':
        return 'blue';
      default:
        return 'yellow';
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'at_risk':
        return 'At Risk';
      case 'on_break':
        return 'On Break';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  const daysSinceActivity = portfolio.lastActivityDate
    ? Math.floor(
        (Date.now() - new Date(portfolio.lastActivityDate).getTime()) / (1000 * 60 * 60 * 24)
      )
    : null;

  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 space-y-5 hover:bg-[hsl(0_0%_14%)] transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar className="h-10 w-10 shrink-0 ring-1 ring-white/[0.08]">
            <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-xs font-semibold">
              {getInitials(portfolio.studentName)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <Eyebrow>Portfolio</Eyebrow>
            <div className="mt-0.5 text-[15px] font-semibold text-white truncate">
              {portfolio.studentName}
            </div>
            <div className="mt-0.5 text-[11.5px] text-white truncate">
              {portfolio.qualificationTitle}
            </div>
          </div>
        </div>
        <Pill tone={statusTone(portfolio.status)}>{statusLabel(portfolio.status)}</Pill>
      </div>

      {/* Progress */}
      <div>
        <div className="flex items-baseline justify-between text-[11.5px]">
          <span className="text-white uppercase tracking-[0.12em]">Progress</span>
          <span className="font-medium text-white tabular-nums">
            {portfolio.completionPercentage}%
          </span>
        </div>
        <div className="mt-1.5 h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-elec-yellow/80 rounded-full transition-all"
            style={{ width: `${portfolio.completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden">
        {[
          { value: portfolio.completedEntries, label: 'Complete' },
          { value: portfolio.draftEntries, label: 'Drafts' },
          { value: portfolio.submissionsAwaitingReview, label: 'Review' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[hsl(0_0%_10%)] px-3 py-3 text-center"
          >
            <div className="text-lg font-semibold tabular-nums text-white leading-none">
              {stat.value}
            </div>
            <Eyebrow className="mt-1.5">{stat.label}</Eyebrow>
          </div>
        ))}
      </div>

      {/* Alerts */}
      {portfolio.submissionsAwaitingReview > 0 && (
        <div className="flex items-center gap-3 bg-amber-500/[0.08] border border-amber-500/20 rounded-xl px-4 py-3">
          <span aria-hidden className="w-[3px] h-8 rounded-full bg-amber-400 shrink-0" />
          <p className="text-[12.5px] text-amber-300 leading-snug">
            {portfolio.submissionsAwaitingReview} submission
            {portfolio.submissionsAwaitingReview > 1 ? 's' : ''} awaiting review
          </p>
        </div>
      )}

      {daysSinceActivity !== null && daysSinceActivity > 14 && (
        <div className="flex items-center gap-3 bg-red-500/[0.08] border border-red-500/20 rounded-xl px-4 py-3">
          <span aria-hidden className="w-[3px] h-8 rounded-full bg-red-400 shrink-0" />
          <p className="text-[12.5px] text-red-300 leading-snug tabular-nums">
            No activity for {daysSinceActivity} days
          </p>
        </div>
      )}

      {/* Meta */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11.5px] text-white tabular-nums pt-2 border-t border-white/[0.06]">
        <div>
          Units · {portfolio.categoriesComplete}/{portfolio.categoriesTotal}
        </div>
        <div>
          KSBs · {portfolio.ksbsCovered}/{portfolio.ksbsTotal}
        </div>
        <div>
          OTJ · {portfolio.ojtHoursCompleted}/{portfolio.ojtHoursRequired}h
        </div>
        {portfolio.cohortName && <div className="truncate">Cohort · {portfolio.cohortName}</div>}
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex items-center justify-end gap-4 pt-1">
          <SecondaryButton onClick={() => onViewDetails(portfolio.studentId, portfolio.qualificationId)}>
            View details
          </SecondaryButton>
          {portfolio.submissionsAwaitingReview > 0 && onReviewSubmissions && (
            <PrimaryButton onClick={() => onReviewSubmissions(portfolio.studentId)}>
              Review →
            </PrimaryButton>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentPortfolioCard;
