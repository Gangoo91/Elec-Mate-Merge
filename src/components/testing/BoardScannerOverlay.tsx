/**
 * BoardScannerOverlay - Bottom sheet overlay for board scanning
 *
 * Native app-style bottom sheet (90vh) with rounded top corners.
 * User can see the parent app dimmed behind - doesn't feel like leaving the app.
 */

import React, { useState, useCallback } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Camera } from 'lucide-react';
import { BoardPhotoCapture } from './BoardPhotoCapture';
import { AnalysisProgress } from './AnalysisProgress';
import { CircuitReviewSheet } from './CircuitReviewSheet';
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
  /** Title shown in header */
  title?: string;
  /** Whether this is used in a wizard context (affects styling) */
  isWizard?: boolean;
}

export const BoardScannerOverlay: React.FC<BoardScannerOverlayProps> = ({
  onAnalysisComplete,
  onClose,
  title = 'Scan Distribution Board',
  isWizard = false,
}) => {
  const [stage, setStage] = useState<AnalysisStage>('idle');
  const [progress, setProgress] = useState(0);
  const [circuitsFound, setCircuitsFound] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [showReview, setShowReview] = useState(false);
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState<string | null>(null);

  // Handle progress updates from BoardPhotoCapture
  const handleProgressUpdate = useCallback(
    (newStage: AnalysisStage, newProgress: number, circuits?: number, photoUrl?: string) => {
      setStage(newStage);
      setProgress(newProgress);
      if (circuits !== undefined) {
        setCircuitsFound(circuits);
      }
      if (photoUrl) {
        setCapturedPhotoUrl(photoUrl);
      }
    },
    []
  );

  // Handle analysis complete from BoardPhotoCapture
  const handleAnalysisComplete = useCallback((data: any) => {
    setAnalysisResult(data);
    setStage('complete');
    setProgress(100);
    setCircuitsFound(data.circuits?.length || 0);

    // Show review sheet
    setShowReview(true);
  }, []);

  // Handle user confirming circuits from review sheet
  const handleConfirmCircuits = useCallback(
    (circuits: any[]) => {
      if (analysisResult) {
        onAnalysisComplete({
          ...analysisResult,
          circuits,
        });
        supabase.auth.getUser().then(({ data: { user } }) => {
          if (user) trackFeatureUse(user.id, 'board_scanner', {});
        });
      }
      setShowReview(false);
    },
    [analysisResult, onAnalysisComplete]
  );

  // Handle rescan request from review sheet
  const handleRescan = useCallback(() => {
    setShowReview(false);
    setAnalysisResult(null);
    setStage('idle');
    setProgress(0);
    setCircuitsFound(0);
    setCapturedPhotoUrl(null);
  }, []);

  // Check if currently analysing
  const isAnalysing = stage !== 'idle' && stage !== 'complete';

  return (
    <>
      <Sheet open={true} onOpenChange={(open) => !open && !isAnalysing && onClose()}>
        <SheetContent
          side="bottom"
          className="h-[85vh] rounded-t-2xl p-0 flex flex-col overflow-hidden"
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          {/* Header - close button is built into SheetContent (top-right X) */}
          <SheetHeader className="flex-shrink-0 px-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-3 pr-8">
              <div className="p-2 rounded-xl bg-elec-yellow/10">
                <Camera className="h-5 w-5 text-elec-yellow" />
              </div>
              <SheetTitle className="text-lg font-semibold text-white">{title}</SheetTitle>
            </div>
          </SheetHeader>

          {/* Content area - properly centered with max-width */}
          <div className="flex-1 overflow-auto">
            <div className="max-w-2xl mx-auto p-4 sm:p-6">
              {/* Show progress UI when analysing */}
              {isAnalysing ? (
                <AnalysisProgress
                  stage={stage}
                  progress={progress}
                  circuitsFound={circuitsFound}
                  photoUrl={capturedPhotoUrl}
                  onCancel={handleRescan}
                />
              ) : (
                /* Show capture UI when idle or after review closed */
                <BoardPhotoCapture
                  onAnalysisComplete={handleAnalysisComplete}
                  onClose={onClose}
                  onProgressUpdate={handleProgressUpdate}
                  renderContentOnly={true}
                />
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Review sheet - shows after analysis complete */}
      {analysisResult && (
        <CircuitReviewSheet
          open={showReview}
          onOpenChange={setShowReview}
          circuits={analysisResult.circuits || []}
          board={analysisResult.board}
          photoUrl={capturedPhotoUrl}
          onConfirm={handleConfirmCircuits}
          onRescan={handleRescan}
        />
      )}
    </>
  );
};

export default BoardScannerOverlay;
