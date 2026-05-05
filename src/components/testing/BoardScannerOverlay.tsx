/**
 * BoardScannerOverlay — bottom-sheet wrapper.
 *
 * Hosts the camera/upload step and then hands the captured image URLs off to
 * the editorial streaming review (BoardScannerStream).  The streaming UI
 * owns the SSE call to `board-read-stream`, the per-circuit edits and the
 * three-phase confirmation flow.
 */

import React, { useCallback, useState } from 'react';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Eyebrow } from '@/components/college/primitives';
import { BoardPhotoCapture } from './BoardPhotoCapture';
import {
  BoardScannerStream,
  type ConfirmedCircuit,
} from './BoardScannerStream';
import { trackFeatureUse } from '@/components/ActivityTracker';
import { supabase } from '@/integrations/supabase/client';

export type AnalysisStage =
  | 'idle'
  | 'uploading'
  | 'detecting'
  | 'reading'
  | 'verifying'
  | 'complete';

interface BoardScannerOverlayProps {
  onAnalysisComplete: (data: {
    board: any;
    circuits: any[];
    metadata?: any;
    warnings?: string[];
  }) => void;
  onClose: () => void;
  /** Title shown in header (kept for backwards compatibility) */
  title?: string;
  /** Whether this is used in a wizard context (affects styling) */
  isWizard?: boolean;
}

export const BoardScannerOverlay: React.FC<BoardScannerOverlayProps> = ({
  onAnalysisComplete,
  onClose,
}) => {
  const [imageUrls, setImageUrls] = useState<string[] | null>(null);
  const [showStream, setShowStream] = useState(false);

  const handlePhotosReady = useCallback((urls: string[]) => {
    setImageUrls(urls);
    setShowStream(true);
  }, []);

  const handleConfirm = useCallback(
    (circuits: ConfirmedCircuit[], board: any) => {
      // Normalise phaseAssignment so downstream code can rely on the literal
      // 'L1' | 'L2' | 'L3' | 'L1,L2,L3' shape. The scanner uses the same
      // strings but may pass nulls / arrays.
      const normalisePhase = (raw: string | null | undefined): string | null => {
        if (!raw) return null;
        if (raw.includes(',')) return 'L1,L2,L3';
        if (raw === 'L1' || raw === 'L2' || raw === 'L3') return raw;
        return null;
      };

      const isSpareCategory = (cat: string) =>
        !cat || cat === 'Spare' || cat === 'Unknown';

      // Map ConfirmedCircuit shape back to the legacy DetectedCircuit shape the
      // schedule-of-tests integration expects, AND tag every row with the
      // canonical fields TestResult uses for three-phase: phaseType,
      // phaseAssignment, wayNumber.
      //
      // We emit BOTH shapes simultaneously so all downstream consumers
      // (EICCertificate, EICRForm, EICRScheduleOfTests.handleAIAnalysisComplete)
      // work without further transformation:
      //   • Legacy flat string fields:  device, protectiveDeviceType, rating, etc.
      //   • Nested device object:       device.category, device.rating_amps, etc.
      const mapped = circuits.map((c) => {
        const phaseAssignment = normalisePhase(c.phaseDesignation);
        const finalAssignment =
          c.phase === '3P' ? 'L1,L2,L3' : phaseAssignment;
        const isSpare = isSpareCategory(c.device);
        const deviceTypeString =
          c.curve && c.rating !== null ? `${c.curve}${c.rating}` : null;
        const ratingStr = c.rating !== null ? String(c.rating) : '';

        return {
          id: c.id,
          index: c.position,
          position: c.position,
          wayNumber: c.position,
          spansWays: c.spansWays ?? (c.phase === '3P' ? 3 : 1),
          // For 3P circuits spanning multiple ways, render the range "1–3" in
          // the cert's circuit number column.
          circuitNumber:
            c.spansWays && c.spansWays > 1
              ? `${c.position}-${c.position + c.spansWays - 1}`
              : String(c.position),
          label_text: c.label,
          label: c.label,
          notes: c.label && /spare/i.test(c.label) ? 'Spare way — no circuit fitted' : '',
          isSpare,
          // ── Nested device object (new shape) ──────────────────
          device: {
            category: c.device,
            rating_amps: c.rating,
            curve: c.curve,
            type: deviceTypeString,
            rcd_type: c.rcdType ?? null,
            i_delta_n_mA: c.iDeltaNmA ?? null,
          },
          // ── Legacy flat string fields (read by EICRScheduleOfTests) ──
          protectiveDeviceType: isSpare ? '' : c.device,
          protectiveDeviceRating: isSpare ? '' : ratingStr,
          protectiveDeviceCurve: isSpare ? '' : (c.curve ?? ''),
          rcdType: c.rcdType ?? '',
          rcdRating: c.iDeltaNmA !== null && c.iDeltaNmA !== undefined ? String(c.iDeltaNmA) : '',
          rating: c.rating,
          curve: c.curve,
          confidence: c.confidence,
          circuitDescription: isSpare ? 'Spare' : c.label,
          // ── Three-phase fields ────────────────────────────────
          phase: c.phase,
          phaseType: c.phase, // '1P' | '3P'
          phase_assignment: finalAssignment,
          phaseAssignment: finalAssignment,
          phaseDesignation: finalAssignment,
          evidence: c.evidence,
        };
      });

      onAnalysisComplete({
        board,
        circuits: mapped,
        metadata: {
          boardSize: board?.estimated_total_ways ?? mapped.length,
          isThreePhase: !!board?.is_three_phase,
          source: 'board-read-stream',
        },
      });

      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) trackFeatureUse(user.id, 'board_scanner', {});
      });

      setShowStream(false);
      setImageUrls(null);
      onClose();
    },
    [onAnalysisComplete, onClose]
  );

  const handleRescan = useCallback(() => {
    setShowStream(false);
    setImageUrls(null);
  }, []);

  const handleStreamOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setShowStream(false);
        // Don't clear image URLs immediately — leaves room for "rescan" without
        // re-uploading. They are cleared on rescan / confirm.
      }
    },
    []
  );

  return (
    <>
      <Sheet open={!showStream} onOpenChange={(open) => !open && onClose()}>
        <SheetContent
          side="bottom"
          className="h-[85vh] rounded-t-2xl p-0 flex flex-col overflow-hidden border-white/10"
        >
          <SheetTitle className="sr-only">Board scanner — capture a photo</SheetTitle>
          <SheetDescription className="sr-only">
            Take or upload a photo of the distribution board. The scanner will then read every circuit.
          </SheetDescription>
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          {/* Editorial header */}
          <div className="flex-shrink-0 px-5 sm:px-8 pt-3 pb-5">
            <div className="h-[2px] -mx-5 sm:-mx-8 mb-4 bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400" />
            <Eyebrow className="text-elec-yellow">Board scanner</Eyebrow>
            <h2 className="mt-2 text-[24px] sm:text-[30px] leading-[1.05] font-semibold text-white tracking-tight">
              Snap your board.
            </h2>
            <p className="mt-2 text-[14px] sm:text-[15px] text-white/55 max-w-md leading-relaxed">
              Frame the whole unit including the legend. Three-phase boards work — the scanner reads the main switch first.
            </p>
          </div>

          {/* Capture body */}
          <div className="flex-1 overflow-auto">
            <div className="max-w-2xl mx-auto px-5 sm:px-8 pb-8">
              <BoardPhotoCapture
                onAnalysisComplete={() => {
                  /* not used in streaming flow */
                }}
                onPhotosReady={handlePhotosReady}
                onClose={onClose}
                renderContentOnly
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Streaming review sheet */}
      {imageUrls && (
        <BoardScannerStream
          open={showStream}
          onOpenChange={handleStreamOpenChange}
          imageUrls={imageUrls}
          onConfirm={handleConfirm}
          onRescan={handleRescan}
        />
      )}
    </>
  );
};

export default BoardScannerOverlay;
