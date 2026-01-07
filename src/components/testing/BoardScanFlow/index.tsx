/**
 * BoardScanFlow - Full-screen AI board scanning experience
 *
 * Three-step flow:
 * 1. CaptureScreen - Camera/upload UI
 * 2. AnalyzingScreen - Animated AI analysis
 * 3. ResultsPreview - Edit and accept results
 */

import React, { useState, useCallback } from 'react';
import { useStreamingBoardAnalysis } from '@/hooks/useStreamingBoardAnalysis';
import { useOrientation } from '@/hooks/useOrientation';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { CaptureScreen } from './CaptureScreen';
import { AnalyzingScreen } from './AnalyzingScreen';
import { ResultsPreview } from './ResultsPreview';

type FlowStep = 'capture' | 'analyzing' | 'results';

interface BoardInfo {
  brand: string;
  model: string;
  main_switch_rating: number | null;
  spd_status: string;
  estimated_total_ways: number;
}

interface DetectedCircuit {
  id: string;
  index: number;
  label_text: string;
  device: {
    category: string;
    type: string;
    rating_amps: number | null;
    curve: string | null;
  };
  phase: '1P' | '3P';
  confidence: 'high' | 'medium' | 'low';
}

interface BoardScanFlowProps {
  /** Called when user accepts the results */
  onComplete: (data: {
    board: BoardInfo | null;
    circuits: DetectedCircuit[];
    images: string[];
  }) => void;
  /** Called when user cancels the flow */
  onCancel: () => void;
  /** Hints for the AI analysis */
  hints?: {
    main_switch_side?: 'left' | 'right';
    expected_ways?: number;
    board_type?: 'domestic' | 'commercial' | 'industrial';
    is_three_phase?: boolean;
  };
}

/**
 * Main BoardScanFlow component
 * Manages the full scanning workflow
 */
export const BoardScanFlow: React.FC<BoardScanFlowProps> = ({
  onComplete,
  onCancel,
  hints,
}) => {
  const orientation = useOrientation();
  const isMobile = orientation.isMobile && !orientation.isLandscape;

  const [step, setStep] = useState<FlowStep>('capture');
  const [capturedImages, setCapturedImages] = useState<string[]>([]);

  // Streaming analysis hook
  const analysis = useStreamingBoardAnalysis();

  // Handle capture complete
  const handleCapture = useCallback(async (images: string[]) => {
    setCapturedImages(images);
    setStep('analyzing');

    try {
      await analysis.analyzeImages(images, hints, {
        use_claude_ocr: true,
        use_openai_components: true,
      });
      setStep('results');
    } catch (error) {
      console.error('Analysis failed:', error);
      // Stay on analyzing screen to show error
    }
  }, [analysis, hints]);

  // Handle rescan
  const handleRescan = useCallback(() => {
    analysis.reset();
    setCapturedImages([]);
    setStep('capture');
  }, [analysis]);

  // Handle cancel during analysis
  const handleCancelAnalysis = useCallback(() => {
    analysis.abort();
    handleRescan();
  }, [analysis, handleRescan]);

  // Handle accept results
  const handleAccept = useCallback((
    board: BoardInfo | null,
    circuits: DetectedCircuit[]
  ) => {
    onComplete({
      board,
      circuits,
      images: capturedImages,
    });
  }, [capturedImages, onComplete]);

  // Render current step inside Sheet
  return (
    <Sheet open={true} onOpenChange={(open) => !open && onCancel()}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        {step === 'capture' && (
          <CaptureScreen
            onCapture={handleCapture}
            onCancel={onCancel}
            isMobile={isMobile}
          />
        )}
        {step === 'analyzing' && (
          <AnalyzingScreen
            images={capturedImages}
            progress={analysis.progress}
            stage={analysis.stage}
            stageMessage={analysis.stageMessage}
            board={analysis.board as BoardInfo | null}
            circuits={analysis.circuits as DetectedCircuit[]}
            warnings={analysis.warnings}
            onCancel={handleCancelAnalysis}
          />
        )}
        {step === 'results' && (
          <ResultsPreview
            images={capturedImages}
            board={analysis.board as BoardInfo | null}
            circuits={analysis.circuits as DetectedCircuit[]}
            onAccept={handleAccept}
            onRescan={handleRescan}
            onCancel={onCancel}
            isMobile={isMobile}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default BoardScanFlow;
