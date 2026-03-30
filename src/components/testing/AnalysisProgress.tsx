/**
 * AnalysisProgress - Split-view progress UI for board analysis
 *
 * Shows the captured photo on top (50%) and progress info below (50%).
 * Users can see the photo during processing to confirm correct image captured.
 */

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, Upload, Scan, FileText, CheckCircle2, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type AnalysisStage =
  | 'idle'
  | 'uploading'
  | 'detecting'
  | 'reading'
  | 'verifying'
  | 'complete';

interface AnalysisProgressProps {
  stage: AnalysisStage;
  progress: number; // 0-100
  circuitsFound: number;
  /** URL of the first captured photo to display during analysis */
  photoUrl?: string | null;
  /** Callback to cancel analysis */
  onCancel?: () => void;
}

const stageConfig: Record<
  AnalysisStage,
  {
    label: string;
    icon: React.ReactNode;
    minProgress: number;
    maxProgress: number;
  }
> = {
  idle: {
    label: 'Ready to scan',
    icon: <Scan className="h-5 w-5" />,
    minProgress: 0,
    maxProgress: 0,
  },
  uploading: {
    label: 'Uploading photos...',
    icon: <Upload className="h-5 w-5" />,
    minProgress: 0,
    maxProgress: 20,
  },
  detecting: {
    label: 'Detecting board type...',
    icon: <Scan className="h-5 w-5" />,
    minProgress: 20,
    maxProgress: 40,
  },
  reading: {
    label: 'Reading circuit labels...',
    icon: <FileText className="h-5 w-5" />,
    minProgress: 40,
    maxProgress: 70,
  },
  verifying: {
    label: 'Verifying device ratings...',
    icon: <CheckCircle2 className="h-5 w-5" />,
    minProgress: 70,
    maxProgress: 90,
  },
  complete: {
    label: 'Analysis complete!',
    icon: <CheckCircle2 className="h-5 w-5" />,
    minProgress: 100,
    maxProgress: 100,
  },
};

const stages: AnalysisStage[] = ['uploading', 'detecting', 'reading', 'verifying', 'complete'];

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({
  stage,
  progress,
  circuitsFound,
  photoUrl,
  onCancel,
}) => {
  const currentStageIndex = stages.indexOf(stage);
  const config = stageConfig[stage];

  return (
    <div className="flex flex-col items-center">
      {/* Photo display */}
      {photoUrl && (
        <div className="w-full pb-4">
          <div className="relative w-full max-h-[30vh] rounded-xl overflow-hidden border border-white/10 bg-black/20 mx-auto max-w-md">
            <img
              src={photoUrl}
              alt="Board being analysed"
              className="w-full h-auto max-h-[30vh] object-contain mx-auto"
            />
            {/* Scanning animation overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-elec-yellow/50 to-transparent animate-scan" />
            </div>
          </div>
        </div>
      )}

      {/* Progress info */}
      <div className="flex flex-col items-center space-y-4 py-2">
        {/* Stage Indicator Dots */}
        <div className="flex justify-center gap-2">
          {stages.slice(0, -1).map((s, i) => (
            <motion.div
              key={s}
              initial={false}
              animate={{
                backgroundColor:
                  i <= currentStageIndex - 1 || (i === currentStageIndex && stage !== 'complete')
                    ? 'var(--elec-yellow, #FACC15)'
                    : 'rgba(255,255,255,0.15)',
                scale: i === currentStageIndex ? 1.2 : 1,
              }}
              className="w-2.5 h-2.5 rounded-full transition-colors"
            />
          ))}
        </div>

        {/* Stage Label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 text-white"
          >
            {stage === 'complete' ? (
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            ) : (
              <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
            )}
            <span className="text-base font-medium">{config.label}</span>
          </motion.div>
        </AnimatePresence>

        {/* Live Circuit Count Badge */}
        <AnimatePresence>
          {circuitsFound > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <Badge
                variant="secondary"
                className="text-sm px-3 py-1.5 bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/30"
              >
                <Zap className="h-3.5 w-3.5 mr-1.5" />
                Found {circuitsFound} circuits so far
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint text */}
        <p className="text-xs text-white text-center max-w-xs">
          {stage === 'reading' || stage === 'verifying'
            ? 'Reading device ratings and labels — three-phase boards may take longer...'
            : stage === 'complete'
              ? 'Review the detected circuits before adding them'
              : 'This usually takes 30 seconds to 1 minute'}
        </p>

        {/* Cancel button */}
        {onCancel && (
          <Button
            variant="outline"
            onClick={onCancel}
            className="mt-3 h-11 px-6 touch-manipulation border-white/20 text-white hover:bg-white/5"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default AnalysisProgress;
