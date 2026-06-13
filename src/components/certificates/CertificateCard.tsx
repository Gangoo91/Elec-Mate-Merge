import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { SwipeableCard } from '@/components/ui/SwipeableCard';
import { Trash2, Edit, ArrowRight, MapPin, Lock } from 'lucide-react';
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
}

const QS_CHIP: Record<string, { label: string; className: string }> = {
  pending: { label: 'QS review', className: 'border-amber-400/40 text-amber-300' },
  returned: { label: 'Returned', className: 'border-red-400/40 text-red-300' },
  approved: { label: 'QS approved', className: 'border-emerald-400/40 text-emerald-300' },
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
 * Certificate card — editorial tile (mirrors DocCard on Labels & Warnings):
 * status accent dot + mono type badge, big tracking-tight title, address, and
 * a hairline footer with the meta line + a single yellow "Open →". Swipeable.
 */
export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  onTap,
  onDelete,
  onEdit,
  onConvert,
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

  const canConvert = certificate.reportType === 'eic' && certificate.canExportToEICR;
  const statusLabel = getStatusLabel(certificate.status);
  const typeLabel = getTypeLabel(certificate.reportType);
  const title = certificate.clientName || `Untitled ${typeLabel}`;

  // Editorial card — mirrors DocCard on the Labels & Warnings page: a status
  // accent dot + a mono type badge, a big tracking-tight title, the address,
  // then a hairline footer carrying the meta line and a single yellow "Open →".
  const cardContent = (
    <button
      type="button"
      onClick={handleCardTap}
      className={cn(
        'group relative flex w-full flex-col text-left p-4 sm:p-5 bg-[hsl(0_0%_11%)] transition-colors touch-manipulation',
        'focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow/50',
        isSelected ? 'bg-elec-yellow/[0.07]' : 'hover:bg-elec-yellow/[0.05] active:bg-white/[0.05]'
      )}
    >
      {/* Status dot (or bulk checkbox) + type badge */}
      <div className="flex items-start justify-between gap-2">
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
          <span
            className={cn('mt-1 w-2 h-2 rounded-full shrink-0', getStatusDot(certificate.status))}
            aria-hidden
          />
        )}
        <span className="flex items-center gap-1.5 shrink-0">
          {certificate.lockedAt && (
            <span
              className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.14em] border border-emerald-400/40 text-emerald-300 rounded px-1.5 py-0.5"
              title="Issued & locked — signed off"
            >
              <Lock className="h-2.5 w-2.5" aria-hidden />
              Locked
            </span>
          )}
          {certificate.qsReviewStatus && QS_CHIP[certificate.qsReviewStatus] && (
            <span
              className={cn(
                'text-[9px] font-semibold uppercase tracking-[0.14em] border rounded px-1.5 py-0.5',
                QS_CHIP[certificate.qsReviewStatus].className
              )}
            >
              {QS_CHIP[certificate.qsReviewStatus].label}
            </span>
          )}
          <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/50 border border-white/[0.12] rounded px-1.5 py-0.5">
            {typeLabel}
          </span>
        </span>
      </div>

      <h3
        title={title}
        className="mt-3 text-[17px] sm:text-[18px] font-semibold tracking-tight leading-[1.15] text-white group-hover:text-elec-yellow transition-colors truncate"
      >
        {title}
      </h3>
      <p
        className={cn(
          'mt-1.5 flex items-center gap-1.5 text-[12px] leading-relaxed min-w-0',
          certificate.installationAddress ? 'text-white/55' : 'text-white/35'
        )}
      >
        <MapPin className="h-3 w-3 shrink-0" aria-hidden />
        <span
          title={certificate.installationAddress || undefined}
          className={cn('truncate', !certificate.installationAddress && 'italic')}
        >
          {certificate.installationAddress || 'No address'}
        </span>
      </p>

      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="min-w-0 truncate text-[11px] uppercase tracking-[0.1em] text-white/45">
          {statusLabel}
          <span className="mx-1.5 text-white/20">·</span>
          <span className="normal-case tracking-normal tabular-nums">
            {formatDate(certificate.lastModified)}
          </span>
        </span>
        <span className="inline-flex items-center gap-1 text-[12px] font-medium text-elec-yellow shrink-0">
          {canConvert ? 'Convert to EICR' : 'Open'}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </button>
  );

  // In bulk mode, don't wrap with SwipeableCard
  if (isBulkMode) {
    return cardContent;
  }

  return (
    <SwipeableCard
      className="rounded-none"
      leftAction={{
        icon: <Trash2 className="h-5 w-5" />,
        bgColor: 'bg-red-500',
        onAction: () => {
          navigator.vibrate?.(50);
          onDelete();
        },
        label: 'Delete',
      }}
      rightAction={{
        icon: <Edit className="h-5 w-5" />,
        bgColor: canConvert ? 'bg-blue-500' : 'bg-elec-yellow',
        onAction: () => {
          navigator.vibrate?.(10);
          if (canConvert && onConvert) {
            onConvert();
          } else {
            onEdit();
          }
        },
        label: canConvert ? 'Convert' : 'Edit',
      }}
    >
      {cardContent}
    </SwipeableCard>
  );
};

export default CertificateCard;
