import { cn } from '@/lib/utils';
import { CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

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

const levelConfig: Record<
  ComplianceLevel,
  { label: string; subtitle: string; icon: typeof CheckCircle2; color: string; iconBg: string; bg: string; border: string; accent: string }
> = {
  great: {
    label: 'All Clear',
    subtitle: 'No compliance issues',
    icon: CheckCircle2,
    color: 'text-emerald-400',
    iconBg: 'bg-emerald-500/30 border border-emerald-500/40',
    bg: 'bg-emerald-500/[0.08]',
    border: 'border-emerald-500/20',
    accent: 'from-emerald-500 via-emerald-400 to-green-400',
  },
  attention: {
    label: 'Needs Attention',
    subtitle: 'Items due soon',
    icon: AlertTriangle,
    color: 'text-amber-400',
    iconBg: 'bg-amber-500/30 border border-amber-500/40',
    bg: 'bg-amber-500/[0.08]',
    border: 'border-amber-500/20',
    accent: 'from-amber-500 via-amber-400 to-yellow-400',
  },
  action: {
    label: 'Action Required',
    subtitle: 'Overdue items need attention',
    icon: ShieldAlert,
    color: 'text-red-400',
    iconBg: 'bg-red-500/30 border border-red-500/40',
    bg: 'bg-red-500/[0.08]',
    border: 'border-red-500/20',
    accent: 'from-red-500 via-rose-400 to-pink-400',
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
  const Icon = config.icon;

  const issues: { label: string; count: number; color: string }[] = [];
  if (partPOverdue > 0) issues.push({ label: 'Part P overdue', count: partPOverdue, color: 'bg-red-500/15 text-red-400 border border-red-500/20' });
  if (expiredCerts > 0) issues.push({ label: 'Expired', count: expiredCerts, color: 'bg-red-500/15 text-red-400 border border-red-500/20' });
  if (partPPending > 0) issues.push({ label: 'Part P pending', count: partPPending, color: 'bg-amber-500/15 text-amber-400 border border-amber-500/20' });
  if (expiringSoon > 0) issues.push({ label: 'Expiring soon', count: expiringSoon, color: 'bg-amber-500/15 text-amber-400 border border-amber-500/20' });

  return (
    <div className={cn('relative overflow-hidden rounded-2xl border', config.bg, config.border)}>
      {/* Accent line */}
      <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r', config.accent)} />

      <div className="p-4 flex items-start gap-3">
        {/* Icon */}
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', config.iconBg)}>
          <Icon className={cn('h-5 w-5', config.color)} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={cn('text-[15px] font-bold leading-tight', config.color)}>{config.label}</p>
          {issues.length === 0 && (
            <p className="text-xs text-white mt-0.5">{config.subtitle}</p>
          )}
          {issues.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {issues.map((issue) => (
                <span key={issue.label} className={cn('text-[10px] font-semibold px-2.5 py-1 rounded-lg', issue.color)}>
                  {issue.count} {issue.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplianceScoreCard;
