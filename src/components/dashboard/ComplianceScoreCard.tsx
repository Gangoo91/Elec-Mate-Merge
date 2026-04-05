import { cn } from '@/lib/utils';

interface ComplianceScoreCardProps {
  partPOverdue: number;
  partPPending: number;
  expiredCerts: number;
  expiringSoon: number;
}

type ComplianceLevel = 'great' | 'attention' | 'action';

function getComplianceLevel(
  partPOverdue: number,
  expiredCerts: number,
  partPPending: number,
  expiringSoon: number
): ComplianceLevel {
  if (partPOverdue > 0 || expiredCerts > 0) return 'action';
  if (partPPending > 0 || expiringSoon > 0) return 'attention';
  return 'great';
}

function getScore(
  partPOverdue: number,
  expiredCerts: number,
  partPPending: number,
  expiringSoon: number
): number {
  // Start at 100, deduct for issues
  let score = 100;
  score -= partPOverdue * 20;
  score -= expiredCerts * 15;
  score -= partPPending * 5;
  score -= expiringSoon * 3;
  return Math.max(0, Math.min(100, score));
}

const levelConfig: Record<
  ComplianceLevel,
  {
    label: string;
    subtitle: string;
    bg: string;
    border: string;
    labelColor: string;
    barColor: string;
    barTrack: string;
    accentGradient: string;
  }
> = {
  great: {
    label: 'All Clear',
    subtitle: 'No compliance issues',
    bg: 'bg-white/[0.04]',
    border: 'border-emerald-500/20',
    labelColor: 'text-emerald-400',
    barColor: 'bg-emerald-400',
    barTrack: 'bg-white/[0.06]',
    accentGradient: 'from-emerald-500 via-emerald-400 to-green-400',
  },
  attention: {
    label: 'Needs Attention',
    subtitle: 'Items due soon',
    bg: 'bg-white/[0.04]',
    border: 'border-amber-500/20',
    labelColor: 'text-amber-400',
    barColor: 'bg-amber-400',
    barTrack: 'bg-white/[0.06]',
    accentGradient: 'from-amber-500 via-amber-400 to-yellow-400',
  },
  action: {
    label: 'Action Required',
    subtitle: 'Overdue items need attention',
    bg: 'bg-white/[0.04]',
    border: 'border-red-500/20',
    labelColor: 'text-red-400',
    barColor: 'bg-red-400',
    barTrack: 'bg-white/[0.06]',
    accentGradient: 'from-red-500 via-rose-400 to-pink-400',
  },
};

const ComplianceScoreCard = ({
  partPOverdue,
  partPPending,
  expiredCerts,
  expiringSoon,
}: ComplianceScoreCardProps) => {
  const level = getComplianceLevel(partPOverdue, expiredCerts, partPPending, expiringSoon);
  const config = levelConfig[level];
  const score = getScore(partPOverdue, expiredCerts, partPPending, expiringSoon);
  const totalIssues = partPOverdue + partPPending + expiredCerts + expiringSoon;

  const issues: { label: string; count: number; color: string }[] = [];
  if (partPOverdue > 0) issues.push({ label: 'Part P overdue', count: partPOverdue, color: 'bg-red-500/15 text-red-400' });
  if (expiredCerts > 0) issues.push({ label: 'Expired certs', count: expiredCerts, color: 'bg-red-500/15 text-red-400' });
  if (partPPending > 0) issues.push({ label: 'Part P pending', count: partPPending, color: 'bg-amber-500/15 text-amber-400' });
  if (expiringSoon > 0) issues.push({ label: 'Expiring soon', count: expiringSoon, color: 'bg-amber-500/15 text-amber-400' });

  return (
    <div
      className={cn(
        'relative rounded-2xl border overflow-hidden',
        config.bg,
        config.border
      )}
    >
      {/* Top accent line */}
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-50',
          config.accentGradient
        )}
      />

      <div className="p-4 space-y-3">
        {/* Top row — score + status */}
        <div className="flex items-center gap-4">
          {/* Score circle */}
          <div className="relative flex-shrink-0">
            <svg width="52" height="52" viewBox="0 0 52 52" className="transform -rotate-90">
              {/* Track */}
              <circle
                cx="26" cy="26" r="22"
                fill="none"
                strokeWidth="4"
                className={config.barTrack}
                stroke="currentColor"
              />
              {/* Progress */}
              <circle
                cx="26" cy="26" r="22"
                fill="none"
                strokeWidth="4"
                className={config.barColor}
                stroke="currentColor"
                strokeLinecap="round"
                strokeDasharray={`${(score / 100) * 138.2} 138.2`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={cn('text-sm font-bold', config.labelColor)}>{score}</span>
            </div>
          </div>

          {/* Status text */}
          <div className="flex-1 min-w-0">
            <p className={cn('text-[15px] font-semibold', config.labelColor)}>
              {config.label}
            </p>
            <p className="text-xs text-white mt-0.5">{config.subtitle}</p>
            {totalIssues > 0 && (
              <p className="text-[11px] text-white mt-1">
                {totalIssues} item{totalIssues !== 1 ? 's' : ''} to review
              </p>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className={cn('h-1.5 rounded-full overflow-hidden', config.barTrack)}>
          <div
            className={cn('h-full rounded-full transition-all duration-500', config.barColor)}
            style={{ width: `${score}%` }}
          />
        </div>

        {/* Issue chips */}
        {issues.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {issues.map((issue) => (
              <span
                key={issue.label}
                className={cn(
                  'text-[11px] font-semibold px-2.5 py-1 rounded-lg',
                  issue.color
                )}
              >
                {issue.count} {issue.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplianceScoreCard;
