import React from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Edit, Download, ArrowRight, Users, Trash2, ArrowRightCircle, Copy } from 'lucide-react';

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
  /** Share the generated PDF (native share / copy link) — completed certs only. */
  onShare?: () => void;
  onConvertToEICR?: () => void;
  onExportToEIC?: () => void;
  onLinkCustomer?: () => void;
  onUnlinkCustomer?: () => void;
  onDelete: () => void;
  /** ELE-881 — duplicate cert as template for similar jobs (e.g. block of apartments) */
  onDuplicate?: () => void;
}

interface Tile {
  label: string;
  sub: string;
  icon: React.ReactNode;
  onClick: () => void;
  /** Primary actions (Edit, Download) get a subtle yellow-accented chip. */
  primary?: boolean;
}

const TYPE_LABELS: Record<string, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'Minor Works',
};

/**
 * Bottom-sheet action menu for a certificate — premium tile-grid layout that
 * matches the Quote actions drawer (QuoteViewPage): grab handle, context
 * header, 2-up / 4-up tiles, destructive separated below. Opens on card tap.
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
  onUnlinkCustomer,
  onDelete,
  onDuplicate,
}) => {
  if (!certificate) return null;

  const typeLabel = TYPE_LABELS[certificate.reportType] || certificate.reportType.toUpperCase();
  const shortId = certificate.id.split('-').slice(-1)[0];

  // Wrap every handler so the sheet closes before the action runs — matches the
  // quotes drawer behaviour and avoids the sheet lingering over a navigation.
  const run = (fn?: () => void) => () => {
    if (!fn) return;
    onOpenChange(false);
    fn();
  };

  const tiles: Tile[] = [
    { label: 'Edit certificate', sub: 'Open and update fields', icon: <Edit className="h-4 w-4 text-elec-yellow" />, onClick: run(onEdit), primary: true },
    { label: 'Download PDF', sub: 'Client-ready document', icon: <Download className="h-4 w-4 text-elec-yellow" />, onClick: run(onPreview), primary: true },
  ];

  if (
    (certificate.reportType === 'eic' || certificate.reportType === 'minor-works') &&
    certificate.canExportToEICR &&
    onConvertToEICR
  ) {
    tiles.push({
      label: 'Convert to EICR',
      sub: certificate.reportType === 'minor-works' ? 'Build an EICR from this' : 'New EICR from this cert',
      icon: <ArrowRightCircle className="h-4 w-4 text-blue-400" />,
      onClick: run(onConvertToEICR),
    });
  }
  if (certificate.reportType === 'eicr' && certificate.canExportToEIC && onExportToEIC) {
    tiles.push({ label: 'Export to EIC', sub: 'New EIC from this cert', icon: <ArrowRight className="h-4 w-4 text-elec-yellow" />, onClick: run(onExportToEIC) });
  }
  if (!certificate.hasCustomer && onLinkCustomer) {
    tiles.push({ label: 'Link to customer', sub: 'Attach to a client', icon: <Users className="h-4 w-4 text-white/85" />, onClick: run(onLinkCustomer) });
  }
  if (certificate.hasCustomer && onLinkCustomer) {
    tiles.push({ label: 'Change customer', sub: 'Switch the linked client', icon: <Users className="h-4 w-4 text-blue-400" />, onClick: run(onLinkCustomer) });
  }
  if (certificate.hasCustomer && onUnlinkCustomer) {
    tiles.push({ label: 'Unlink customer', sub: 'Detach the client', icon: <Users className="h-4 w-4 text-amber-400" />, onClick: run(onUnlinkCustomer) });
  }
  if (onDuplicate) {
    tiles.push({ label: 'Duplicate as template', sub: 'For similar jobs', icon: <Copy className="h-4 w-4 text-elec-yellow" />, onClick: run(onDuplicate) });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="rounded-t-2xl p-0 max-h-[85vh] overflow-y-auto overscroll-contain border-t border-white/[0.10]"
      >
        <div className="w-full px-4 sm:px-6 pt-3 pb-[max(20px,env(safe-area-inset-bottom))]">
          {/* Grab handle */}
          <div className="mx-auto h-1 w-10 rounded-full bg-white/[0.15] mb-4" />

          {/* Context header */}
          <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-white/[0.08]">
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-white truncate">
                {certificate.clientName || 'No client'}
              </p>
              <p className="text-[11px] text-white/55 font-mono truncate">
                {typeLabel} · {shortId}
              </p>
            </div>
            <span className="flex-shrink-0 text-[11px] font-bold text-elec-yellow px-2.5 py-1 rounded-md bg-elec-yellow/[0.10] border border-elec-yellow/20">
              {typeLabel}
            </span>
          </div>

          {/* Action tiles — 2-up, 4-up on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {tiles.map((tile) => (
              <button
                key={tile.label}
                onClick={tile.onClick}
                className={`flex flex-col items-start gap-2.5 p-3.5 rounded-xl border active:scale-[0.98] touch-manipulation transition-all text-left select-none ${
                  tile.primary
                    ? 'bg-elec-yellow/[0.06] border-elec-yellow/25 hover:bg-elec-yellow/[0.10]'
                    : 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.06]'
                }`}
              >
                <span
                  className={`h-10 w-10 rounded-xl border flex items-center justify-center ${
                    tile.primary
                      ? 'bg-elec-yellow/[0.12] border-elec-yellow/25'
                      : 'bg-white/[0.06] border-white/[0.08]'
                  }`}
                >
                  {tile.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-semibold text-white truncate">{tile.label}</span>
                  <span className="block text-[11px] text-white/55 mt-0.5">{tile.sub}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Destructive — separated below the grid */}
          <button
            onClick={run(onDelete)}
            className="mt-2 w-full flex items-center gap-3 p-3.5 rounded-xl bg-red-500/[0.06] border border-red-500/20 hover:bg-red-500/[0.10] active:scale-[0.99] touch-manipulation transition-all text-left select-none"
          >
            <span className="h-10 w-10 rounded-xl bg-red-500/[0.10] border border-red-500/20 flex items-center justify-center flex-shrink-0">
              <Trash2 className="h-4 w-4 text-red-400" />
            </span>
            <span>
              <span className="block text-[13px] font-semibold text-red-300">Delete certificate</span>
              <span className="block text-[11px] text-red-300/60 mt-0.5">This can't be undone</span>
            </span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CertificateActionSheet;
