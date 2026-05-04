import { Button } from '@/components/ui/button';
import { useComplianceTracking } from '@/hooks/time-tracking/useComplianceTracking';
import { TrendingUp } from 'lucide-react';

const ComplianceTracker = () => {
  const { otjGoal, getComplianceStatus, getRemainingHours, isLoading } = useComplianceTracking();

  if (isLoading) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-white/[0.04] rounded w-3/4" />
          <div className="h-8 bg-white/[0.04] rounded" />
        </div>
      </div>
    );
  }

  if (!otjGoal) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Compliance tracking
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          No compliance goals set. Setting up default 20% off-the-job learning requirement...
        </p>
      </div>
    );
  }

  const complianceStatus = getComplianceStatus();
  const remainingHours = getRemainingHours();
  const currentDate = new Date();
  const deadlineDate = otjGoal.deadline ? new Date(otjGoal.deadline) : null;
  const daysRemaining = deadlineDate
    ? Math.ceil((deadlineDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const isBehind = complianceStatus.status === 'behind';

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          20% off-the-job learning
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Progress
          </span>
          <span className="text-[12px] text-white/85 font-mono">
            {otjGoal.compliance_percentage}%
          </span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-elec-yellow transition-all duration-500"
            style={{ width: `${Math.min(otjGoal.compliance_percentage, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-white/55 font-mono">
          <span>{otjGoal.current_hours}h completed</span>
          <span>{otjGoal.target_hours}h target</span>
        </div>
      </div>

      <div
        className={`rounded-lg border p-3 ${
          isBehind ? 'border-red-500/30 bg-red-500/[0.04]' : 'border-white/[0.06] bg-white/[0.02]'
        }`}
      >
        <span
          className={`text-[10px] font-medium uppercase tracking-[0.18em] ${
            isBehind ? 'text-red-300' : 'text-white/55'
          }`}
        >
          {complianceStatus.message}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
          <div className="text-2xl font-mono text-white">{remainingHours}h</div>
          <div className="text-[11px] text-white/55 mt-1">Remaining</div>
        </div>
        {daysRemaining !== null && (
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="text-2xl font-mono text-white">
              {daysRemaining > 0 ? daysRemaining : 0}
            </div>
            <div className="text-[11px] text-white/55 mt-1">Days left</div>
          </div>
        )}
      </div>

      {complianceStatus.status !== 'compliant' && (
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Recommendation
          </span>
          {complianceStatus.status === 'behind' && remainingHours > 0 && daysRemaining && (
            <p className="text-[14px] text-white/85 leading-relaxed">
              Track {Math.ceil(remainingHours / (daysRemaining / 7))} hours per week to meet your
              target.
            </p>
          )}
          {complianceStatus.status === 'at-risk' && (
            <p className="text-[14px] text-white/85 leading-relaxed">
              Increase your weekly learning hours to stay on track.
            </p>
          )}
          {complianceStatus.status === 'on-track' && (
            <p className="text-[14px] text-white/85 leading-relaxed">
              Keep up the good work. Maintain your current pace.
            </p>
          )}
        </div>
      )}

      <Button
        variant="outline"
        className="w-full h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
        onClick={() => {
          // TODO: open detailed compliance view
        }}
      >
        <TrendingUp className="h-4 w-4 mr-2" />
        View detailed progress
      </Button>
    </div>
  );
};

export default ComplianceTracker;
