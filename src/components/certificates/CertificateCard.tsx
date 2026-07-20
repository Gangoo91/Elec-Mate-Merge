import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CertificateData {
  id: string;
  reportType: string;
  clientName?: string;
  installationAddress?: string;
  inspectionDate?: string;
  status: string;
  /** Set when the cert has been issued & locked (signed off). Null/undefined = unlocked. */
  lockedAt?: string;
  lastModified: number;
  customerId?: string;
  canExportToEICR?: boolean;
  canExportToEIC?: boolean;
  /** Latest Qualifying Supervisor review state, when the user is on a company team. */
  qsReviewStatus?: 'pending' | 'approved' | 'returned' | 'cancelled';
  /** Name of the QS who approved/returned the latest review, when present. */
  qsReviewerName?: string | null;
}

const QS_CHIP: Record<string, { label: string; className: string }> = {
  pending: { label: 'QS review', className: 'border-amber-400/40 text-amber-300 bg-amber-400/[0.06]' },
  returned: { label: 'Returned', className: 'border-red-400/40 text-red-300 bg-red-400/[0.06]' },
  approved: { label: 'QS approved', className: 'border-emerald-400/40 text-emerald-300 bg-emerald-400/[0.06]' },
};

interface CertificateCardProps {
  certificate: CertificateData;
  onTap: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onConvert?: () => void;
  isBulkMode?: boolean;
  isSelected?: boolean;
  onSelectToggle?: () => void;
}

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    eicr: 'EICR',
    eic: 'EIC',
    'minor-works': 'MW',
    'ev-charging': 'EV',
    'fire-alarm': 'FA G1',
    'fire-alarm-commissioning': 'FA G2',
    'fire-alarm-inspection': 'FA G7',
    'fire-alarm-modification': 'FA G4',
    'emergency-lighting': 'EM LTG',
    'pat-testing': 'PAT',
    'solar-pv': 'SOLAR PV',
    bess: 'BESS',
    'lightning-protection': 'LPS',
    'g98-commissioning': 'G98',
    'g99-commissioning': 'G99',
    'smoke-co-alarm': 'SMOKE/CO',
    'danger-notice': 'DANGER',
    'isolation-cert': 'ISOLATION',
    'permit-to-work': 'PERMIT',
    'safe-isolation': 'SAFE ISO',
    'limitation-notice': 'LIMITATION',
    'non-compliance-notice': 'NON-COMP',
    'completion-notice': 'COMPLETION',
    disconnection: 'DISCONN',
  };
  return labels[type] || type.toUpperCase().replace(/-/g, ' ').slice(0, 8);
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Issued';
    case 'in-progress':
      return 'In progress';
    case 'draft':
      return 'Draft';
    case 'auto-draft':
      return 'Auto-saved';
    default:
      return status;
  }
};

// Single accent dot — the only scan-by-state signal, mono palette otherwise.
const getStatusDot = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-emerald-400';
    case 'in-progress':
      return 'bg-amber-400';
    case 'draft':
      return 'bg-white/30';
    default:
      return 'bg-white/20';
  }
};

// Status text colour — the footer reads as a coloured state word, not grey.
const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'text-emerald-300';
    case 'in-progress':
      return 'text-amber-300';
    case 'draft':
      return 'text-white/70';
    default:
      return 'text-white/55';
  }
};

// Human relative date for recent items, falling back to a short date.
const formatDate = (timestamp: number | string) => {
  const date = new Date(timestamp);
  const diff = Date.now() - date.getTime();
  const day = 86_400_000;
  if (diff < day && new Date().getDate() === date.getDate()) return 'Today';
  if (diff < 2 * day) return 'Yesterday';
  if (diff < 7 * day) return `${Math.floor(diff / day)}d ago`;
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
};

/**
 * Certificate card — premium self-contained tile for the 2-up grid on My
 * Certificates. Uniform height (h-full flex column with a spacer), rounded
 * bordered surface, status accent dot + mono type badge up top, big title +
 * address, and a hairline footer carrying the state · date and a yellow "Open".
 * Tap opens the action sheet (Edit / Download / Delete etc.).
 */
export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  onTap,
  isBulkMode = false,
  isSelected = false,
  onSelectToggle,
}) => {
  const handleCardTap = () => {
    if (isBulkMode && onSelectToggle) {
      navigator.vibrate?.(10);
      onSelectToggle();
    } else {
      onTap();
    }
  };

  const statusLabel = getStatusLabel(certificate.status);
  const statusColor = getStatusText(certificate.status);
  const typeLabel = getTypeLabel(certificate.reportType);
  const title = certificate.clientName || `Untitled ${typeLabel}`;
  // Version number lives in the report-id suffix (…-V2, …-V3) from an Amend —
  // NOT edit_version, which is the autosave concurrency counter (resets to 1
  // on each new version).
  const versionMatch = certificate.id.match(/-V(\d+)$/);
  const version = versionMatch ? parseInt(versionMatch[1], 10) : 1;
  const qs = certificate.qsReviewStatus && QS_CHIP[certificate.qsReviewStatus];

  return (
    <button
      type="button"
      onClick={handleCardTap}
      className={cn(
        'group relative flex h-full w-full flex-col text-left rounded-2xl border p-3.5 sm:p-4 transition-all touch-manipulation',
        'focus:outline-none focus-visible:ring-1 focus-visible:ring-elec-yellow/50 active:scale-[0.99]',
        isSelected
          ? 'border-elec-yellow/40 bg-elec-yellow/[0.07]'
          : 'border-white/[0.09] bg-gradient-to-b from-white/[0.05] to-white/[0.015] hover:border-elec-yellow/30 hover:from-elec-yellow/[0.06] hover:to-white/[0.01]'
      )}
    >
      {/* Header — type badge (or bulk checkbox) left, lock + status dot right */}
      <div className="flex items-center justify-between gap-2">
        {isBulkMode ? (
          <div onClick={(e) => e.stopPropagation()}>
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => {
                navigator.vibrate?.(10);
                onSelectToggle?.();
              }}
              className="h-5 w-5 flex-shrink-0 border-white/30 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
            />
          </div>
        ) : (
          <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/75 border border-white/[0.14] bg-white/[0.06] rounded-md px-2 py-1">
            {typeLabel}
          </span>
        )}
        <span className="flex items-center gap-1.5 shrink-0">
          {version > 1 && (
            <span
              className="text-[9px] font-bold uppercase tracking-[0.1em] text-blue-300 border border-blue-400/30 bg-blue-400/[0.08] rounded px-1.5 py-0.5"
              title={`Amended — version ${version}`}
            >
              V{version}
            </span>
          )}
          {certificate.lockedAt && (
            <span
              className="inline-flex items-center justify-center h-[18px] w-[18px] border border-emerald-400/40 bg-emerald-400/[0.06] text-emerald-300 rounded"
              title="Issued & locked — signed off"
            >
              <Lock className="h-2.5 w-2.5" aria-hidden />
            </span>
          )}
          <span
            className={cn('w-2 h-2 rounded-full shrink-0', getStatusDot(certificate.status))}
            aria-hidden
          />
        </span>
      </div>

      {/* Title */}
      <h3
        title={title}
        className="mt-3 text-[15.5px] sm:text-[16px] font-semibold tracking-tight leading-[1.2] text-white group-hover:text-elec-yellow transition-colors line-clamp-2"
      >
        {title}
      </h3>

      {/* Address — clean text, no inline icon (the pin threw the wrap) */}
      <p
        title={certificate.installationAddress || undefined}
        className={cn(
          'mt-1.5 text-[12.5px] leading-snug line-clamp-2',
          certificate.installationAddress ? 'text-white/65' : 'text-white/40 italic'
        )}
      >
        {certificate.installationAddress || 'No address'}
      </p>

      {/* QS review chip, when present */}
      {qs && (
        <span
          className={cn(
            'mt-2 inline-flex w-fit items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.12em] border rounded px-1.5 py-0.5',
            qs.className
          )}
          title={certificate.qsReviewerName ? `${qs.label} — ${certificate.qsReviewerName}` : undefined}
        >
          {qs.label}
        </span>
      )}

      {/* Spacer keeps every card in a row the same height */}
      <div className="flex-1 min-h-[12px]" />

      {/* Footer — coloured state · date, round open affordance */}
      <div className="mt-3 pt-3 border-t border-white/[0.07] flex items-center justify-between gap-2">
        <span className="min-w-0 flex items-baseline gap-1 text-[11.5px]">
          <span className={cn('font-semibold shrink-0', statusColor)}>{statusLabel}</span>
          <span className="text-white/25 shrink-0">·</span>
          <span className="text-white/50 tabular-nums truncate">
            {formatDate(certificate.lastModified)}
          </span>
        </span>
        <span className="shrink-0 h-6 w-6 rounded-full bg-elec-yellow/[0.12] flex items-center justify-center transition-colors group-hover:bg-elec-yellow/25">
          <ArrowRight className="h-3.5 w-3.5 text-elec-yellow transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </button>
  );
};

export default CertificateCard;
