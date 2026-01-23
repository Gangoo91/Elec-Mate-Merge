import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, XCircle, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { ProcessingRing } from './premium/ProcessingRing';
import { StageCards } from './premium/StageCards';
import { Button } from '@/components/ui/button';

interface CostAnalysisProcessingViewProps {
  progress: {
    stage: 'initializing' | 'rag' | 'ai' | 'validation' | 'complete';
    message: string;
  } | null;
  onCancel: () => void;
  isCancelling?: boolean;
  status?: 'processing' | 'failed';
  error?: string | null;
  onRetry?: () => void;
}

const ESTIMATED_TIME = 180; // 3 minutes

const CostAnalysisProcessingView = ({
  progress: agentProgress,
  onCancel,
  isCancelling = false,
  status = 'processing',
  error,
  onRetry
}: CostAnalysisProcessingViewProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime] = useState(Date.now());
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  // Simulate building cost estimate during processing
  useEffect(() => {
    if (elapsedTime > 30 && elapsedTime < 150) {
      // Start showing estimated cost after 30s
      const baseEstimate = 2500 + Math.random() * 1500;
      const fluctuation = Math.sin(elapsedTime / 10) * 200;
      setEstimatedCost(Math.round(baseEstimate + fluctuation + elapsedTime * 10));
    } else if (elapsedTime >= 150) {
      // Stabilize near the end
      setEstimatedCost(prev => prev ? Math.round(prev * 0.99 + (prev + 50) * 0.01) : null);
    }
  }, [elapsedTime]);

  // Calculate progress based on elapsed time (3-minute workflow)
  const progress = Math.min((elapsedTime / ESTIMATED_TIME) * 100, 99);
  const remainingTime = Math.max(0, ESTIMATED_TIME - elapsedTime);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get current activity message
  const getActivityMessage = () => {
    if (agentProgress?.message) return agentProgress.message;
    if (elapsedTime < 20) return 'Initialising analysis...';
    if (elapsedTime < 60) return 'Searching UK pricing database...';
    if (elapsedTime < 120) return 'Calculating costs and labour...';
    if (elapsedTime < 160) return 'Generating quote options...';
    return 'Finalising report...';
  };

  return (
    <div className="h-[100dvh] bg-gradient-to-b from-black via-[#0a0a0f] to-black flex flex-col overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-elec-yellow/5 blur-[80px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[200px] h-[200px] rounded-full bg-amber-500/5 blur-[60px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-evenly px-4 py-6 max-w-md mx-auto w-full">

        {/* Error State */}
        {status === 'failed' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
          >
            <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Generation Failed</h3>
              <p className="text-sm text-white/60 max-w-xs">
                {error || 'An unexpected error occurred. Please try again.'}
              </p>
            </div>
            <div className="flex gap-3">
              {onRetry && (
                <Button
                  onClick={onRetry}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90 h-12 px-6 rounded-xl font-semibold"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              )}
              <Button
                onClick={onCancel}
                variant="ghost"
                className="h-12 px-6 rounded-xl text-white/60 hover:text-white hover:bg-white/10"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        )}

        {/* Processing State */}
        {status !== 'failed' && (
          <>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h2 className="text-xl font-bold text-white">AI Cost Analysis</h2>
          <p className="text-xs text-white/50">Searching 45,000+ UK pricing items</p>
        </motion.div>

        {/* Premium Processing Ring */}
        <ProcessingRing
          progress={progress}
          estimatedCost={estimatedCost}
          showCostPreview={elapsedTime > 30}
        />

        {/* Premium Stage Cards */}
        <StageCards
          progress={progress}
          currentStep={getActivityMessage()}
        />

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-6"
        >
          <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="h-3 w-3 text-white/40" />
              <span className="text-[10px] text-white/40">Elapsed</span>
            </div>
            <p className="text-lg font-bold text-white tabular-nums">
              {formatTime(elapsedTime)}
            </p>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Loader2 className="h-3 w-3 text-white/40 animate-spin" />
              <span className="text-[10px] text-white/40">Remaining</span>
            </div>
            <p className="text-lg font-bold text-white tabular-nums">
              ~{formatTime(remainingTime)}
            </p>
          </div>
        </motion.div>

        {/* Overdue Warning */}
        {elapsedTime > ESTIMATED_TIME && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20"
          >
            <p className="text-xs text-amber-200 text-center">
              Taking longer than usual. Complex estimates may take up to 4 minutes.
            </p>
          </motion.div>
        )}

        {/* Cancel Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onCancel}
          disabled={isCancelling}
          className="w-full py-3 text-xs text-white/40 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 border border-white/5"
        >
          {isCancelling ? (
            <><Loader2 className="w-3 h-3 animate-spin" /> Cancelling...</>
          ) : (
            <><XCircle className="w-3 h-3" /> Cancel</>
          )}
        </motion.button>
          </>
        )}
      </div>
    </div>
  );
};

export default CostAnalysisProcessingView;
