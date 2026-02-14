import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, XCircle, ShieldCheck } from 'lucide-react';
import type { ApprovalStatus } from '@/hooks/useSupervisorApproval';

const STATUS_CONFIG: Record<
  ApprovalStatus,
  { label: string; colour: string; bg: string; icon: React.ElementType } | null
> = {
  not_required: null,
  pending: {
    label: 'Pending Approval',
    colour: 'text-amber-400',
    bg: 'bg-amber-500/15 border-amber-500/20',
    icon: Clock,
  },
  approved: {
    label: 'Approved',
    colour: 'text-green-400',
    bg: 'bg-green-500/15 border-green-500/20',
    icon: ShieldCheck,
  },
  rejected: {
    label: 'Rejected',
    colour: 'text-red-400',
    bg: 'bg-red-500/15 border-red-500/20',
    icon: XCircle,
  },
};

interface ApprovalBadgeProps {
  status: ApprovalStatus;
  approvedBy?: string | null;
  className?: string;
}

export function ApprovalBadge({ status, approvedBy, className = '' }: ApprovalBadgeProps) {
  const config = STATUS_CONFIG[status];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <Badge className={`${config.bg} ${config.colour} border text-[10px] ${className}`}>
      <Icon className="h-2.5 w-2.5 mr-0.5" />
      {config.label}
      {approvedBy && status === 'approved' && ` — ${approvedBy}`}
    </Badge>
  );
}

interface ApprovalInfoCardProps {
  status: ApprovalStatus;
  approvedBy?: string | null;
  approvedAt?: string | null;
  comments?: string | null;
  approvalSignature?: string | null;
}

export function ApprovalInfoCard({
  status,
  approvedBy,
  approvedAt,
  comments,
  approvalSignature,
}: ApprovalInfoCardProps) {
  const config = STATUS_CONFIG[status];
  if (!config || status === 'not_required') return null;

  const Icon = config.icon;

  return (
    <div className={`rounded-xl border p-4 space-y-2 ${config.bg}`}>
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${config.colour}`} />
        <h3 className={`text-sm font-bold ${config.colour}`}>
          {status === 'pending'
            ? 'Awaiting Supervisor Approval'
            : status === 'approved'
              ? 'Supervisor Approved'
              : 'Supervisor Rejected'}
        </h3>
      </div>

      {approvedBy && (
        <p className="text-sm text-white">
          {status === 'approved' ? 'Approved' : 'Rejected'} by: {approvedBy}
        </p>
      )}

      {approvedAt && (
        <p className="text-xs text-white">
          {new Date(approvedAt).toLocaleString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      )}

      {comments && <p className="text-xs text-white italic">&ldquo;{comments}&rdquo;</p>}

      {approvalSignature && (
        <img src={approvalSignature} alt="Approval signature" className="h-12 mt-1 opacity-80" />
      )}
    </div>
  );
}

export default ApprovalBadge;
