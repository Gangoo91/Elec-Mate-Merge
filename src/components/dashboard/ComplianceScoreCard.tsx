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
    labelColor: string;
    barColor: string;
    accentGradient: string;
    scoreColor: string;
  }
> = {
  great: {
    label: 'All Clear',
    subtitle: 'No compliance issues',
    labelColor: 'text-emerald-400',
    barColor: 'bg-emerald-400',
    accentGradient: 'from-emerald-500 via-emerald-400 to-green-400',
    scoreColor: 'text-emerald-400',
  },
  attention: {
    label: 'Needs Attention',
    subtitle: 'Items due soon',
    labelColor: 'text-amber-400',
    barColor: 'bg-amber-400',
    accentGradient: 'from-amber-500 via-amber-400 to-yellow-400',
    scoreColor: 'text-amber-400',
  },
  action: {
    label: 'Action Required',
    subtitle: 'Overdue items need attention',
    labelColor: 'text-red-400',
    barColor: 'bg-red-400',
    accentGradient: 'from-red-500 via-rose-400 to-pink-400',
    scoreColor: 'text-red-400',
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
    <div className="relative overflow-hidden card-surface-interactive rounded-2xl">
      {/* Accent line */}
      <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-60', config.accentGradient)} />

      <div className="relative z-10 p-4 space-y-3">
        {/* Top row — score + status */}
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className={cn('text-[15px] font-bold', config.labelColor)}>
              {config.label}
            </p>
            <p className="text-xs text-white mt-0.5">{config.subtitle}</p>
            {totalIssues > 0 && (
              <p className="text-[11px] text-white mt-1">
                {totalIssues} item{totalIssues !== 1 ? 's' : ''} to review
              </p>
            )}
          </div>
          {/* Score number */}
          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
            <span className={cn('text-xl font-bold', config.scoreColor)}>{score}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full overflow-hidden bg-white/[0.06]">
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
                className={cn('text-[10px] font-bold px-2 py-0.5 rounded', issue.color)}
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
