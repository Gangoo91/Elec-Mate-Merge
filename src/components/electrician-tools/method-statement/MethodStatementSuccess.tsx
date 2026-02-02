import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, Clock, AlertTriangle, Layers, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface MethodStatementSuccessProps {
  stepsCount: number;
  totalDuration: string;
  hazardsCount: number;
  riskLevel: string;
  generationTime: number;
  projectName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onViewResults: () => void;
}

const MethodStatementSuccess = ({
  stepsCount,
  totalDuration,
  hazardsCount,
  riskLevel,
  generationTime,
  projectName,
  open,
  onOpenChange,
  onViewResults
}: MethodStatementSuccessProps) => {
  useEffect(() => {
    if (!open) return;

    // Confetti burst
    const duration = 2500;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 40 * (timeLeft / duration);

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.2, 0.8),
          y: Math.random() - 0.2
        },
        colors: ['#10b981', '#34d399', '#6ee7b7', '#fbbf24', '#f59e0b']
      });
    }, 200);

    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100, 50, 200]);
    }

    return () => clearInterval(interval);
  }, [open]);

  const getRiskColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'text-emerald-400';
      case 'medium': return 'text-amber-400';
      case 'high': return 'text-red-400';
      default: return 'text-white/60';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm sm:max-w-md p-0 bg-background border-emerald-500/30 overflow-hidden">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 p-6 pb-8">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -mr-10 -mt-10" />

          <DialogHeader className="relative text-center space-y-4">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex justify-center"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-emerald-500/30"
                  animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ width: 80, height: 80 }}
                />
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-500/40">
                  <CheckCircle2 className="h-10 w-10 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <DialogTitle className="text-2xl font-bold text-white">
                Method Statement Ready!
              </DialogTitle>
              <DialogDescription className="text-sm text-white/70 mt-2">
                <span className="font-medium text-emerald-400">{projectName}</span>
              </DialogDescription>
            </motion.div>
          </DialogHeader>
        </div>

        {/* Stats Grid */}
        <div className="p-5 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-3"
          >
            {/* Steps */}
            <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/20 text-center">
              <p className="text-3xl font-bold text-emerald-400">{stepsCount}</p>
              <p className="text-xs text-white/50 uppercase tracking-wide flex items-center justify-center gap-1">
                <Layers className="h-3 w-3" /> Steps
              </p>
            </div>

            {/* Duration */}
            <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/20 text-center">
              <p className="text-xl font-bold text-amber-400 truncate">{totalDuration}</p>
              <p className="text-xs text-white/50 uppercase tracking-wide flex items-center justify-center gap-1">
                <Clock className="h-3 w-3" /> Duration
              </p>
            </div>

            {/* Hazards */}
            <div className="bg-orange-500/10 rounded-xl p-3 border border-orange-500/20 text-center">
              <p className="text-3xl font-bold text-orange-400">{hazardsCount}</p>
              <p className="text-xs text-white/50 uppercase tracking-wide flex items-center justify-center gap-1">
                <AlertTriangle className="h-3 w-3" /> Hazards
              </p>
            </div>

            {/* Risk Level */}
            <div className={`rounded-xl p-3 border text-center ${
              riskLevel?.toLowerCase() === 'low' ? 'bg-emerald-500/10 border-emerald-500/20' :
              riskLevel?.toLowerCase() === 'medium' ? 'bg-amber-500/10 border-amber-500/20' :
              'bg-red-500/10 border-red-500/20'
            }`}>
              <p className={`text-xl font-bold uppercase ${getRiskColor(riskLevel)}`}>{riskLevel}</p>
              <p className="text-xs text-white/50 uppercase tracking-wide">Risk Level</p>
            </div>
          </motion.div>

          {/* Time Saved Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20"
          >
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <Sparkles className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">~3 hours saved</p>
              <p className="text-xs text-white/50">vs manual creation</p>
            </div>
            <p className="text-xs text-emerald-400/70">
              Generated in {generationTime}s
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <DialogFooter className="p-5 pt-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full"
          >
            <Button
              onClick={() => {
                onViewResults();
                onOpenChange(false);
              }}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-12 text-base font-semibold shadow-lg shadow-emerald-500/30 touch-manipulation"
            >
              <FileText className="mr-2 h-5 w-5" />
              View Method Statement
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-xs text-white/40 text-center mt-3">
              BS 7671:2018+A3:2024 Compliant
            </p>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MethodStatementSuccess;
