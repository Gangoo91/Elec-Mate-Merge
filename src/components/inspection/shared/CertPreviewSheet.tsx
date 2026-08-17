import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { QsCertReviewBody } from '@/components/employer/sections/QsCertReviewBody';
import { GenericCertPreview } from './GenericCertPreview';
import { loadCertPreviewPayload } from '@/utils/certPreviewPayload';

/**
 * Cert types QsCertReviewBody genuinely renders. Every one of its sections
 * reads scheduleOfTests / inspectionItems / observations / distributionBoards
 * and returns null otherwise, so anything else must use the generic renderer —
 * pointing it at an EV cert would show a header and nothing else.
 */
/**
 * ELE-1549 — 'eic' was removed from this set.
 *
 * `QsCertReviewBody` is shaped around the EICR: its sections read
 * `overallAssessment`, `limitationsOfInspection` and
 * `satisfactoryForContinuedUse`. An EIC certifies new work, so it carries none
 * of those — it carries `extentOfInstallation` and `workType`, which the
 * component never reads. A complete EIC therefore previewed as an essentially
 * empty document while its PDF came out correct, because the PDF goes through
 * `formatEicJson` and the preview did not. EIC now previews from that same
 * payload, so the two cannot disagree.
 *
 * EICR and Minor Works stay here: the component genuinely fits them.
 */
const FIXED_WIRING_TYPES = new Set(['eicr', 'minor-works', 'testing-only']);

interface CertPreviewSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** 'eicr' | 'eic' | 'minor-works' — drives which sections render. */
  reportType: string;
  /** The live form data. Read-only here; nothing in this sheet writes. */
  data: Record<string, unknown>;
  /**
   * Saved report id, when there is one. Formatters that fetch observation
   * photos or a QS countersignature need it; without it those sections simply
   * come back empty, which is correct for a cert that has not been saved yet.
   */
  reportId?: string | null;
}

/**
 * Read-only certificate preview — ELE-1477.
 *
 * "Too slow converting certs to PDFs and no preview option" — the second half.
 * Until now the only way to see a finished certificate was to generate the PDF,
 * which round-trips through PDFMonkey; if a detail was wrong you regenerated
 * and waited again.
 *
 * The renderer is NOT new: `QsCertReviewBody` already lays a certificate out
 * for Qualifying Supervisors reviewing a team member's work, and it is
 * cert-type aware. Reusing it means the electrician previews exactly what their
 * QS sees, and there is one layout to maintain rather than two that drift.
 * Omitting `onAddComment` drops the QS-only "+ comment" affordances.
 *
 * This previews the DATA, not the PDF — branding, page breaks and the PDFMonkey
 * template are not reproduced here. It answers "have I filled everything in
 * correctly", which is the question being asked before generating.
 */
export const CertPreviewSheet: React.FC<CertPreviewSheetProps> = ({
  open,
  onOpenChange,
  reportType,
  data,
  reportId,
}) => {
  // ELE-1477 — resolve the cert's PDF payload when the sheet opens. Raw
  // formData shows internal ids and autosave flags in arbitrary order; the
  // payload is the curated, grouped, ordered content the certificate carries.
  // Loaded on open (not on mount) so no formatter is imported until used, and
  // re-resolved each time so it reflects edits made since the last look.
  const [payload, setPayload] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    // Clear on close so reopening cannot show the previous certificate's
    // payload for a frame before the new one resolves.
    if (!open) {
      setPayload(null);
      return;
    }
    let cancelled = false;
    loadCertPreviewPayload(reportType, data, reportId ?? '').then((p) => {
      if (!cancelled) setPayload(p);
    });
    return () => {
      cancelled = true;
    };
    // `data` is intentionally excluded: it is a new object on every keystroke,
    // and re-resolving mid-preview would thrash the formatter. The payload is
    // resolved fresh each time the sheet opens, which is when it is read.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // `reportId` is included: it changes once, when an unsaved cert is first
    // saved, and the payload must then pick up photos and any QS signature.
  }, [open, reportType, reportId]);

  return (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent
      side="bottom"
      className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.08] p-0"
    >
      <div className="flex h-full flex-col bg-background">
        <header className="shrink-0 border-b border-white/[0.08] px-5 pb-4 pt-5">
          <SheetTitle className="text-xl font-semibold tracking-tight text-white">
            Preview
          </SheetTitle>
          <p className="mt-1 text-[13px] text-white">
            How this certificate reads before you generate it
          </p>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 pt-4 sm:px-5">
          {FIXED_WIRING_TYPES.has(reportType) ? (
            <QsCertReviewBody reportType={reportType} data={data} />
          ) : (
            // Waiting on the formatter, rather than flashing raw form data —
            // internal ids and autosave flags are exactly what this avoids.
            payload ? (
              <GenericCertPreview payload={payload} />
            ) : (
              <p className="py-10 text-center text-[14px] text-white">Preparing preview…</p>
            )
          )}
        </div>
      </div>
    </SheetContent>
  </Sheet>
  );
};

export default CertPreviewSheet;
