import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { SwipeableCard } from '@/components/ui/SwipeableCard';
import { Trash2, Edit, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CertificateData {
  id: string;
  reportType: string;
  clientName?: string;
  installationAddress?: string;
  inspectionDate?: string;
  status: string;
  lastModified: number;
  customerId?: string;
  canExportToEICR?: boolean;
  canExportToEIC?: boolean;
}

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
  };
  return labels[type] || type.toUpperCase().replace(/-/g, ' ').slice(0, 8);
};

const getTypeBadgeStyle = (type: string) => {
  if (type.startsWith('fire-alarm')) return 'bg-red-500/15 text-red-400';
  if (type === 'eicr') return 'bg-blue-500/15 text-blue-400';
  if (type === 'eic') return 'bg-emerald-500/15 text-emerald-400';
  if (type === 'minor-works') return 'bg-orange-500/15 text-orange-400';
  if (type === 'ev-charging') return 'bg-cyan-500/15 text-cyan-400';
  if (type === 'emergency-lighting') return 'bg-violet-500/15 text-violet-400';
  if (type === 'pat-testing') return 'bg-amber-500/15 text-amber-400';
  if (type === 'solar-pv') return 'bg-yellow-500/15 text-yellow-400';
  return 'bg-elec-yellow/15 text-elec-yellow';
};

const getTypeAccent = (type: string) => {
  if (type.startsWith('fire-alarm')) return 'from-red-500 via-rose-400 to-pink-400';
  if (type === 'eicr') return 'from-blue-500 via-blue-400 to-cyan-400';
  if (type === 'eic') return 'from-emerald-500 via-emerald-400 to-green-400';
  if (type === 'minor-works') return 'from-orange-500 via-amber-400 to-yellow-400';
  if (type === 'ev-charging') return 'from-cyan-500 via-cyan-400 to-blue-400';
  if (type === 'emergency-lighting') return 'from-violet-500 via-purple-400 to-indigo-400';
  if (type === 'pat-testing') return 'from-amber-500 via-amber-400 to-yellow-400';
  if (type === 'solar-pv') return 'from-yellow-500 via-yellow-400 to-orange-400';
  return 'from-elec-yellow via-amber-400 to-orange-400';
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return { label: 'Done', style: 'bg-green-500/15 text-green-400' };
    case 'in-progress':
      return { label: 'In Progress', style: 'bg-blue-500/15 text-blue-400' };
    case 'draft':
      return { label: 'Draft', style: 'bg-white/10 text-white/50' };
    default:
      return { label: status, style: 'bg-white/10 text-white/50' };
  }
};

const formatDate = (timestamp: number | string) => {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : new Date(timestamp);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
};

/**
 * Certificate card — HubCard style with gradient accent, swipeable
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
  const status = getStatusBadge(certificate.status);

  const cardContent = (
    <button
      type="button"
      onClick={handleCardTap}
      className={cn(
        'block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation',
        !isBulkMode && 'cursor-pointer'
      )}
    >
      <div
        className={cn(
          'group relative overflow-hidden card-surface-interactive active:scale-[0.98] transition-all duration-200 rounded-2xl',
          isSelected && 'ring-2 ring-elec-yellow bg-elec-yellow/5'
        )}
      >
        {/* Gradient accent line — colour matches cert type */}
        <div
          className={cn(
            'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-40 group-hover:opacity-100 transition-opacity duration-200',
            getTypeAccent(certificate.reportType)
          )}
        />
        <div className="relative z-10 p-4">
          {/* Top row: bulk checkbox + badges + date */}
          <div className="flex items-center gap-1.5 mb-2">
            {isBulkMode && (
              <div onClick={(e) => e.stopPropagation()} className="mr-1">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => {
                    navigator.vibrate?.(10);
                    onSelectToggle?.();
                  }}
                  className="h-5 w-5 flex-shrink-0 border-white/30 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                />
              </div>
            )}
            <span
              className={cn(
                'text-[10px] font-bold px-2 py-0.5 rounded',
                getTypeBadgeStyle(certificate.reportType)
              )}
            >
              {getTypeLabel(certificate.reportType)}
            </span>
            <span className="font-mono text-[10px] text-white/30 px-1.5 py-0.5 rounded bg-white/[0.04]">
              {certificate.id.split('-').slice(-1)[0]}
            </span>
            {canConvert && (
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 cursor-pointer hover:bg-blue-500/25"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.vibrate?.(10);
                  onConvert?.();
                }}
              >
                → EICR
              </span>
            )}
            <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded', status.style)}>
              {status.label}
            </span>
            <span className="text-[11px] text-white/40 ml-auto">
              {formatDate(certificate.lastModified)}
            </span>
          </div>

          {/* Client name */}
          <h3 className="text-[15px] font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors truncate">
            {certificate.clientName || 'Untitled'}
          </h3>

          {/* Address */}
          <p className="mt-0.5 text-[12px] text-white leading-tight truncate">
            {certificate.installationAddress || 'No address'}
          </p>

          {/* Bottom row */}
          {!isBulkMode && (
            <div className="flex items-center justify-between mt-3">
              <span className="text-[11px] font-medium text-elec-yellow">
                {certificate.status === 'completed' ? 'View' : 'Continue'}
              </span>
              <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
                <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          )}
        </div>
      </div>
    </button>
  );

  // In bulk mode, don't wrap with SwipeableCard
  if (isBulkMode) {
    return cardContent;
  }

  return (
    <SwipeableCard
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
