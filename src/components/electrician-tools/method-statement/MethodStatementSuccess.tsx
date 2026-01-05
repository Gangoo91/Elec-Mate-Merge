import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, Clock, AlertTriangle, Layers } from "lucide-react";
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
        colors: ['#10b981', '#059669', '#047857', '#065f46']
      });
    }, 250);

    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const timeSaved = 180; // 3 hours vs manual method statement creation

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl sm:max-w-2xl p-8 sm:p-10 bg-gradient-to-br from-emerald-500/10 via-background to-background border-emerald-500/30">
        <DialogHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-8 sm:p-6 rounded-full shadow-xl shadow-emerald-500/50 animate-bounce-subtle">
              <CheckCircle2 className="h-16 w-16 sm:h-12 sm:w-12 text-foreground" />
            </div>
          </div>
          
          <DialogTitle className="text-3xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Method Statement Complete!
          </DialogTitle>
          <DialogDescription className="text-base sm:text-sm text-foreground/80 mt-2">
            Your comprehensive method statement for <span className="font-semibold text-emerald-400">{projectName}</span> has been generated
          </DialogDescription>
        </DialogHeader>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6">
          <div className="bg-elec-dark/80 backdrop-blur-sm rounded-lg p-5 sm:p-4 text-center border border-emerald-500/30 hover:border-emerald-500/50 transition-all">
            <div className="text-4xl sm:text-3xl font-bold text-emerald-400 mb-1">{stepsCount}</div>
            <div className="text-base sm:text-sm text-foreground/80 flex items-center justify-center gap-1">
              <Layers className="h-4 w-4" />
              <span>Steps</span>
            </div>
          </div>

          <div className="bg-elec-dark/80 backdrop-blur-sm rounded-lg p-5 sm:p-4 text-center border border-emerald-500/30 hover:border-emerald-500/50 transition-all">
            <div className="text-4xl sm:text-3xl font-bold text-emerald-400 mb-1 truncate">
              {totalDuration}
            </div>
            <div className="text-base sm:text-sm text-foreground/80 flex items-center justify-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Duration</span>
            </div>
          </div>

          <div className="bg-elec-dark/80 backdrop-blur-sm rounded-lg p-5 sm:p-4 text-center border border-orange-500/30 hover:border-orange-500/50 transition-all">
            <div className="text-4xl sm:text-3xl font-bold text-orange-400 mb-1">{hazardsCount}</div>
            <div className="text-base sm:text-sm text-foreground/80 flex items-center justify-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              <span>Hazards</span>
            </div>
          </div>

          <div className="bg-elec-dark/80 backdrop-blur-sm rounded-lg p-5 sm:p-4 text-center border border-emerald-500/30 hover:border-emerald-500/50 transition-all">
            <div className={`text-4xl sm:text-3xl font-bold mb-1 ${getRiskColor(riskLevel)} uppercase`}>
              {riskLevel}
            </div>
            <div className="text-base sm:text-sm text-foreground/80 flex items-center justify-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              <span>Risk</span>
            </div>
          </div>
        </div>

        {/* Time Saved Highlight */}
        <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-lg p-4 border border-emerald-500/30 mb-4">
          <div className="flex items-center justify-center gap-2 text-emerald-400">
            <Clock className="h-5 w-5" />
            <span className="text-base sm:text-sm font-semibold">Time Saved: ~{timeSaved} minutes</span>
          </div>
          <p className="text-sm sm:text-xs text-foreground/80 mt-1 text-center">
            Compared to manual method statement creation
          </p>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            onClick={() => {
              onViewResults();
              onOpenChange(false);
            }}
            className="w-full bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-foreground h-12 touch-manipulation text-base shadow-lg shadow-emerald-500/20"
          >
            <FileText className="mr-2 h-4 w-4" />
            View Method Statement
          </Button>
        </DialogFooter>

        <p className="text-sm sm:text-xs text-foreground/70 text-center mt-2">
          Generated in {generationTime}s • BS 7671:2018+A3:2024 Compliant
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default MethodStatementSuccess;
