import React, { useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

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
  /**
   * ELE-1616 — the certificate the SCHEME returned (the PDF NAPIT hands back),
   * attached on the Part P notification screen.
   *
   * Surfaced here because this is where someone actually looks three years
   * later when a client rings up. Attaching it on the notifications screen but
   * only showing it there would mean the one document nobody can find.
   */
  schemeCertificate?: { url: string; name: string | null; ref: string | null } | null;
  onOpenSchemeCertificate?: () => void;
  /** Share the generated PDF (native share / copy link) — completed certs only. */
  onShare?: () => void;
  onConvertToEICR?: () => void;
  onExportToEIC?: () => void;
  onLinkCustomer?: () => void;
  onUnlinkCustomer?: () => void;
  onDelete: () => void;
  /** ELE-881 — duplicate cert as template for similar jobs (e.g. block of apartments) */
  onDuplicate?: () => void;
  /**
   * ELE-1421 — the cert belongs to a team member, so the signed-in QS may open,
   * edit and download it (the `QS can update team reports` policy allows that)
   * but may NOT delete it: soft-delete sets deleted_at, which that policy's WITH
   * CHECK rejects. Offering the button would produce a failure, not a deletion.
   */
  readOnly?: boolean;
  /** Name of the team member who owns the cert, shown in the sheet header. */
  ownerName?: string;
}

interface Action {
  label: string;
  sub: string;
  onClick: () => void;
}

const TYPE_LABELS: Record<string, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'Minor Works',
};

/**
 * Bottom-sheet action menu for a certificate.
 *
 * A grouped action LIST, not a tile grid. The previous layout was four equal
 * squares each carrying a coloured icon in a bordered chip, which had three
 * problems: the icons are not part of this design language, the colours (blue,
 * amber, volt) were decorative rather than semantic, and four identical tiles
 * gave Edit — the thing people open this sheet for nine times in ten — exactly
 * the same weight as "Duplicate as template".
 *
 * So: one primary action in solid volt, everything else as hairline-separated
 * rows, destructive last and set apart. Hierarchy comes from position, size and
 * a single accent, which is how the rest of the app works.
 */
export const CertificateActionSheet: React.FC<CertificateActionSheetProps> = ({
  open,
  onOpenChange,
  certificate,
  onEdit,
  onPreview,
  schemeCertificate,
  onOpenSchemeCertificate,
  onConvertToEICR,
  onExportToEIC,
  onLinkCustomer,
  onUnlinkCustomer,
  onDelete,
  onDuplicate,
  readOnly = false,
  ownerName,
}) => {
  /**
   * The sheet is opened programmatically from a card tap rather than through a
   * SheetTrigger, so the card button is still `document.activeElement` when the
   * overlay marks the page behind as aria-hidden. Chrome refuses that and logs
   * "Blocked aria-hidden on an element because its descendant retained focus".
   * Dropping focus first lets the sheet take it cleanly on mount.
   */
  useEffect(() => {
    if (!open) return;
    const active = document.activeElement;
    if (active instanceof HTMLElement) active.blur();
  }, [open]);

  if (!certificate) return null;

  const typeLabel = TYPE_LABELS[certificate.reportType] || certificate.reportType.toUpperCase();
  const shortId = certificate.id.split('-').slice(-1)[0];
  // Profile names carry trailing spaces often enough that the possessive
  // rendered as "Andrew Moore 's certificate" in the wild.
  const owner = ownerName?.trim();

  // Wrap every handler so the sheet closes before the action runs — matches the
  // quotes drawer behaviour and avoids the sheet lingering over a navigation.
  const run = (fn?: () => void) => () => {
    if (!fn) return;
    onOpenChange(false);
    fn();
  };

  // Secondary actions, in the order someone reaches for them.
  const actions: Action[] = [
    { label: 'Download PDF', sub: 'Client-ready document', onClick: run(onPreview) },
  ];

  // Directly under the Elec-Mate PDF — the two documents belong together.
  if (schemeCertificate?.url && onOpenSchemeCertificate) {
    actions.push({
      label: 'Scheme certificate',
      sub: schemeCertificate.ref
        ? `From your scheme · ${schemeCertificate.ref}`
        : schemeCertificate.name || 'The PDF your scheme returned',
      onClick: run(onOpenSchemeCertificate),
    });
  }

  if (
    (certificate.reportType === 'eic' || certificate.reportType === 'minor-works') &&
    certificate.canExportToEICR &&
    onConvertToEICR
  ) {
    actions.push({
      label: 'Convert to EICR',
      sub:
        certificate.reportType === 'minor-works'
          ? 'Build an EICR from this'
          : 'New EICR from this cert',
      onClick: run(onConvertToEICR),
    });
  }
  if (certificate.reportType === 'eicr' && certificate.canExportToEIC && onExportToEIC) {
    actions.push({
      label: 'Export to EIC',
      sub: 'New EIC from this cert',
      onClick: run(onExportToEIC),
    });
  }
  // ELE-1421 — customer linking is withheld on a team member's certificate.
  // `customers` is SELECT-scoped to auth.uid(), but the reports UPDATE would
  // succeed under the `QS can update team reports` policy — so a QS attaching
  // one of THEIR clients to a colleague's cert writes a customer_id the owner
  // can never resolve. The write is permitted; the resulting row is broken.
  if (!readOnly) {
    if (!certificate.hasCustomer && onLinkCustomer) {
      actions.push({
        label: 'Link to customer',
        sub: 'Attach to a client',
        onClick: run(onLinkCustomer),
      });
    }
    if (certificate.hasCustomer && onLinkCustomer) {
      actions.push({
        label: 'Change customer',
        sub: 'Switch the linked client',
        onClick: run(onLinkCustomer),
      });
    }
    if (certificate.hasCustomer && onUnlinkCustomer) {
      actions.push({
        label: 'Unlink customer',
        sub: 'Detach the client',
        onClick: run(onUnlinkCustomer),
      });
    }
  }
  if (onDuplicate) {
    actions.push({
      label: 'Duplicate as template',
      sub: 'For similar jobs',
      onClick: run(onDuplicate),
    });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="rounded-t-2xl p-0 max-h-[85vh] overflow-y-auto overscroll-contain border-t border-white/[0.10]"
      >
        <div className="mx-auto w-full max-w-2xl px-4 pt-3 pb-[max(20px,env(safe-area-inset-bottom))] sm:px-6">
          {/* Grab handle */}
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/[0.15]" />

          {/* Context header. The volt type chip that used to sit opposite has
              gone: it repeated the type from the line directly beneath it, and
              spent the accent on a label rather than an action. */}
          <div className="mb-4 border-b border-white/[0.08] pb-4">
            <p className="truncate text-[17px] font-bold tracking-tight text-white">
              {certificate.clientName || 'No client'}
            </p>
            <p className="mt-0.5 truncate text-[12px] text-white">
              {typeLabel} · <span className="font-mono">{shortId}</span>
              {owner && ` · ${owner}'s certificate`}
            </p>
          </div>

          {/* Primary — the reason this sheet gets opened. */}
          <button
            type="button"
            onClick={run(onEdit)}
            className="block w-full rounded-xl bg-elec-yellow px-4 py-3 text-left transition-colors touch-manipulation active:scale-[0.99] hover:bg-elec-yellow/90"
          >
            {/* Label over sub, same as the list rows — side-by-side would run
                out of room at 390px and reads as a different kind of control. */}
            <span className="block text-[15px] font-bold text-black">Edit certificate</span>
            <span className="mt-0.5 block text-[11.5px] font-medium text-black/70">
              Open and update fields
            </span>
          </button>

          {/* Everything else — one grouped list, hairline separated. Scales to
              any number of actions without reflowing a grid. */}
          <div className="mt-2 overflow-hidden rounded-xl border border-white/[0.10] bg-white/[0.03]">
            {actions.map((action, i) => (
              <button
                key={action.label}
                type="button"
                onClick={action.onClick}
                className={cn(
                  'flex min-h-[56px] w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors touch-manipulation active:bg-white/[0.06] hover:bg-white/[0.05]',
                  i > 0 && 'border-t border-white/[0.08]'
                )}
              >
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-semibold text-white">
                    {action.label}
                  </span>
                  <span className="mt-0.5 block truncate text-[11.5px] text-white">
                    {action.sub}
                  </span>
                </span>
              </button>
            ))}
          </div>

          {/* Destructive — set apart below. Withheld on a team member's cert:
              the delete would be rejected by RLS, and a button that always
              fails is worse than no button. */}
          {readOnly ? (
            <p className="mt-3 text-[12px] leading-relaxed text-white">
              Only {owner || 'the electrician who created this'} can delete it. You can open, edit
              and download it as their supervisor.
            </p>
          ) : (
            <button
              type="button"
              onClick={run(onDelete)}
              className="mt-3 block w-full rounded-xl border border-red-500/25 bg-red-500/[0.05] px-4 py-3 text-left transition-colors touch-manipulation active:scale-[0.99] hover:bg-red-500/[0.10]"
            >
              <span className="block text-[14px] font-semibold text-red-300">
                Delete certificate
              </span>
              <span className="mt-0.5 block text-[11.5px] text-red-300">This can't be undone</span>
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CertificateActionSheet;
