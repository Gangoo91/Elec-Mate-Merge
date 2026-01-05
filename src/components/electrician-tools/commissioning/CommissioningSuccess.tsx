import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, Clock, Zap, Activity, Timer } from "lucide-react";
import confetti from "canvas-confetti";
import type { CommissioningResponse } from "@/types/commissioning-response";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface CommissioningSuccessProps {
  results: CommissioningResponse;
  onViewResults: () => void;
  generationTime: number; // seconds
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CommissioningSuccess = ({ results, onViewResults, generationTime, open, onOpenChange }: CommissioningSuccessProps) => {
  useEffect(() => {
    // Confetti animation
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.9),
          y: Math.random() - 0.2
        },
        colors: ['#a855f7', '#8b5cf6', '#7c3aed', '#6d28d9']
      });
    }, 250);

    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }

    return () => clearInterval(interval);
  }, []);

  // Calculate stats
  const totalTests = 
    (results.structuredData?.testingProcedure?.visualInspection?.checkpoints.length || 0) +
    (results.structuredData?.testingProcedure?.deadTests?.length || 0) +
    (results.structuredData?.testingProcedure?.liveTests?.length || 0);

  const estimatedDuration = (totalTests * 15) / 60; // 15 mins per test average

  const certificateType = results.structuredData?.certification?.certificateType || 'EIC';

  const maxZs = results.circuits?.length > 0 
    ? Math.max(...results.circuits.map((c: any) => parseFloat(c.zsMax || '0'))).toFixed(2)
    : 'N/A';

  const timeSaved = 120; // 2 hours vs manual BS 7671 lookup

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl sm:max-w-2xl p-8 sm:p-10 bg-gradient-to-br from-purple-500/10 via-background to-background border-purple-500/30">
        <DialogHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-8 sm:p-6 rounded-full shadow-xl shadow-purple-500/50 animate-bounce-subtle">
              <CheckCircle2 className="h-16 w-16 sm:h-12 sm:w-12 text-foreground" />
            </div>
          </div>
          
          <DialogTitle className="text-3xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Test Procedure Complete!
          </DialogTitle>
          <DialogDescription className="text-base sm:text-sm text-foreground/80 mt-2">
            Your electrical commissioning documentation has been generated successfully
          </DialogDescription>
        </DialogHeader>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6">
          <div className="bg-elec-dark/80 backdrop-blur-sm rounded-lg p-5 sm:p-4 text-center border border-purple-500/30 hover:border-purple-500/50 transition-all">
            <div className="text-4xl sm:text-3xl font-bold text-purple-400 mb-1">{totalTests}</div>
            <div className="text-base sm:text-sm text-foreground/80 flex items-center justify-center gap-1">
              <Zap className="h-4 w-4" />
              <span>Tests</span>
            </div>
          </div>

          <div className="bg-elec-dark/80 backdrop-blur-sm rounded-lg p-5 sm:p-4 text-center border border-purple-500/30 hover:border-purple-500/50 transition-all">
            <div className="text-4xl sm:text-3xl font-bold text-purple-400 mb-1">
              {estimatedDuration.toFixed(1)}<span className="text-xl">h</span>
            </div>
            <div className="text-base sm:text-sm text-foreground/80 flex items-center justify-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Duration</span>
            </div>
          </div>

          <div className="bg-elec-dark/80 backdrop-blur-sm rounded-lg p-5 sm:p-4 text-center border border-purple-500/30 hover:border-purple-500/50 transition-all">
            <div className="text-4xl sm:text-3xl font-bold text-purple-400 mb-1">
              {maxZs}<span className="text-xl">Ω</span>
            </div>
            <div className="text-base sm:text-sm text-foreground/80 flex items-center justify-center gap-1">
              <Activity className="h-4 w-4" />
              <span>Max Zs</span>
            </div>
          </div>

          <div className="bg-elec-dark/80 backdrop-blur-sm rounded-lg p-5 sm:p-4 text-center border border-purple-500/30 hover:border-purple-500/50 transition-all">
            <div className="text-4xl sm:text-3xl font-bold text-purple-400 mb-1 truncate">
              {certificateType.replace('BS 7671 Electrical Installation Certificate (EIC) and Schedule of Test Results', 'BS 7671 EIC').replace('BS 7671 Electrical Installation Condition Report (EICR)', 'BS 7671 EICR').replace('BS 7671 Minor Electrical Installation Works Certificate (MWC)', 'BS 7671 MWC')}
            </div>
            <div className="text-base sm:text-sm text-foreground/80 flex items-center justify-center gap-1">
              <FileText className="h-4 w-4" />
              <span>Certificate</span>
            </div>
          </div>
        </div>

        {/* Time Saved Highlight */}
        <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30 mb-4">
          <div className="flex items-center justify-center gap-2 text-purple-400">
            <Timer className="h-5 w-5" />
            <span className="text-base sm:text-sm font-semibold">Time Saved: ~{timeSaved} minutes</span>
          </div>
          <p className="text-sm sm:text-xs text-foreground/80 mt-1 text-center">
            Compared to manual BS 7671 lookup and procedure writing
          </p>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            onClick={() => {
              onViewResults();
              onOpenChange(false);
            }}
            className="w-full bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-foreground h-12 touch-manipulation text-base shadow-lg shadow-purple-500/20"
          >
            <FileText className="mr-2 h-4 w-4" />
            View Results
          </Button>
        </DialogFooter>

        <p className="text-sm sm:text-xs text-foreground/70 text-center mt-2">
          Generated in {generationTime}s
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default CommissioningSuccess;
