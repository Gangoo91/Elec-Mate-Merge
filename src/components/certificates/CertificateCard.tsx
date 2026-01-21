import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { SwipeableCard } from '@/components/ui/SwipeableCard';
import {
  FileText,
  Calendar,
  User,
  MapPin,
  Trash2,
  Edit,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CertificateData {
  id: string;
  reportType: 'eicr' | 'eic' | 'minor-works';
  clientName?: string;
  installationAddress?: string;
  inspectionDate?: string;
  status: 'draft' | 'in-progress' | 'completed';
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
  switch (type) {
    case 'eicr':
      return 'EICR';
    case 'eic':
      return 'EIC';
    case 'minor-works':
      return 'MW';
    default:
      return type.toUpperCase();
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'eicr':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'eic':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'minor-works':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500/10 text-green-400 border-green-500/30';
    case 'in-progress':
      return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
    case 'draft':
      return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Done';
    case 'in-progress':
      return 'Progress';
    case 'draft':
      return 'Draft';
    default:
      return status;
  }
};

const formatDate = (timestamp: number | string) => {
  const date =
    typeof timestamp === 'string' ? new Date(timestamp) : new Date(timestamp);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });
};

/**
 * Swipeable certificate card with native mobile app feel
 * Swipe LEFT to delete, swipe RIGHT to edit/convert
 * Tap to open action sheet
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

  // Determine if this card can be converted
  const canConvert = certificate.reportType === 'eic' && certificate.canExportToEICR;

  const cardContent = (
    <Card
      className={cn(
        'touch-manipulation transition-all duration-200',
        'active:scale-[0.98]',
        isSelected && 'border-elec-yellow border-2 bg-elec-yellow/5',
        !isBulkMode && 'cursor-pointer'
      )}
      onClick={handleCardTap}
    >
      <CardContent className="p-4">
        {/* Header row: Type badge, ID, Status, Checkbox (bulk mode) */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {isBulkMode && (
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => {
                    navigator.vibrate?.(10);
                    onSelectToggle?.();
                  }}
                  className="h-5 w-5 flex-shrink-0"
                />
              </div>
            )}
            <Badge
              variant="outline"
              className={cn('flex-shrink-0 text-xs font-semibold', getTypeColor(certificate.reportType))}
            >
              {getTypeLabel(certificate.reportType)}
            </Badge>
            <span className="font-mono text-sm text-foreground truncate">
              {certificate.id.split('-').slice(-1)[0]}
            </span>
            {canConvert && (
              <Badge
                variant="outline"
                className="flex-shrink-0 text-[10px] bg-blue-500/10 text-blue-400 border-blue-500/30 cursor-pointer hover:bg-blue-500/20"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.vibrate?.(10);
                  onConvert?.();
                }}
              >
                <ArrowRight className="h-3 w-3 mr-0.5" />
                EICR
              </Badge>
            )}
          </div>
          <Badge
            variant="outline"
            className={cn('flex-shrink-0 text-xs', getStatusColor(certificate.status))}
          >
            {getStatusText(certificate.status)}
          </Badge>
        </div>

        {/* Client name */}
        {certificate.clientName && (
          <div className="flex items-center gap-2 text-sm mb-2">
            <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate text-foreground">{certificate.clientName}</span>
          </div>
        )}

        {/* Address */}
        {certificate.installationAddress && (
          <div className="flex items-center gap-2 text-sm mb-2">
            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate text-muted-foreground">
              {certificate.installationAddress}
            </span>
          </div>
        )}

        {/* Footer: Date */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(certificate.lastModified)}</span>
          </div>
          {!isBulkMode && (
            <span className="text-xs text-muted-foreground">Tap for options</span>
          )}
        </div>
      </CardContent>
    </Card>
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
