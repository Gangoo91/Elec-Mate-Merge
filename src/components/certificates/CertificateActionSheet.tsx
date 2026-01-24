import React from 'react';
import { ActionSheet } from '@/components/native/SwipeableBottomSheet';
import {
  Edit,
  Download,
  ArrowRight,
  Users,
  Trash2,
  FileText,
  ArrowRightCircle,
} from 'lucide-react';

export interface CertificateActionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certificate: {
    id: string;
    reportType: 'eicr' | 'eic' | 'minor-works';
    clientName?: string;
    hasCustomer?: boolean;
    canExportToEICR?: boolean;
    canExportToEIC?: boolean;
  } | null;
  onEdit: () => void;
  onPreview: () => void;
  onConvertToEICR?: () => void;
  onExportToEIC?: () => void;
  onLinkCustomer?: () => void;
  onDelete: () => void;
}

/**
 * Bottom sheet action menu for certificate actions
 * Opens on card tap with all available actions
 */
export const CertificateActionSheet: React.FC<CertificateActionSheetProps> = ({
  open,
  onOpenChange,
  certificate,
  onEdit,
  onPreview,
  onConvertToEICR,
  onExportToEIC,
  onLinkCustomer,
  onDelete,
}) => {
  if (!certificate) return null;

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'eicr':
        return 'EICR';
      case 'eic':
        return 'EIC';
      case 'minor-works':
        return 'Minor Works';
      default:
        return type.toUpperCase();
    }
  };

  // Build actions array based on certificate state
  const actions: {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    destructive?: boolean;
    disabled?: boolean;
  }[] = [
    {
      label: 'Edit Certificate',
      icon: <Edit className="h-5 w-5" />,
      onClick: onEdit,
    },
    {
      label: 'Download PDF',
      icon: <Download className="h-5 w-5" />,
      onClick: onPreview,
    },
  ];

  // Add EIC to EICR conversion option (prominent)
  if (certificate.reportType === 'eic' && certificate.canExportToEICR && onConvertToEICR) {
    actions.push({
      label: 'Convert to EICR',
      icon: <ArrowRightCircle className="h-5 w-5 text-blue-400" />,
      onClick: onConvertToEICR,
    });
  }

  // Add EICR to EIC export option (for satisfactory EICRs)
  if (certificate.reportType === 'eicr' && certificate.canExportToEIC && onExportToEIC) {
    actions.push({
      label: 'Export to EIC',
      icon: <ArrowRight className="h-5 w-5 text-elec-yellow" />,
      onClick: onExportToEIC,
    });
  }

  // Add link customer option if not already linked
  if (!certificate.hasCustomer && onLinkCustomer) {
    actions.push({
      label: 'Link to Customer',
      icon: <Users className="h-5 w-5" />,
      onClick: onLinkCustomer,
    });
  }

  // Delete is always last and destructive
  actions.push({
    label: 'Delete Certificate',
    icon: <Trash2 className="h-5 w-5" />,
    onClick: onDelete,
    destructive: true,
  });

  return (
    <ActionSheet
      open={open}
      onOpenChange={onOpenChange}
      title={`${getTypeLabel(certificate.reportType)} ${certificate.id.split('-').slice(-1)[0]}${
        certificate.clientName ? ` - ${certificate.clientName}` : ''
      }`}
      actions={actions}
    />
  );
};

export default CertificateActionSheet;
