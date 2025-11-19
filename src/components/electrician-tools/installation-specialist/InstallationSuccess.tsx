import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Wrench, Clock, AlertTriangle, Shield, Hammer } from "lucide-react";
import confetti from "canvas-confetti";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface InstallationSuccessProps {
  results: any;
  onViewResults: () => void;
  generationTime: number; // seconds
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const InstallationSuccess = ({ results, onViewResults, generationTime, open, onOpenChange }: InstallationSuccessProps) => {
  useEffect(() => {
    if (!open) return;

    // Confetti animation - blue/yellow theme for Installation
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#3B82F6', '#60A5FA', '#FBBF24', '#F59E0B', '#10B981'] // Blue and yellow theme
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#3B82F6', '#60A5FA', '#FBBF24', '#F59E0B', '#10B981']
      });
    }, 250);

    // Haptic feedback (if supported)
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }

    return () => clearInterval(interval);
  }, [open]);

  // Extract stats from results
  const totalSteps = results?.steps?.length || results?.summary?.totalSteps || 0;
  const estimatedDuration = results?.summary?.estimatedDuration || results?.estimatedDuration || 'Not specified';
  const riskLevel = results?.summary?.overallRiskLevel || results?.overallRiskLevel || 'medium';
  const hazardsCount = results?.steps?.reduce((count: number, step: any) => {
    return count + (step.linkedHazards?.length || 0);
  }, 0) || 0;
  const toolsCount = results?.summary?.toolsRequired?.length || results?.toolsRequired?.length || 0;

  const timeSaved = 180; // 3 hours vs manual method statement creation

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl sm:max-w-2xl p-8 sm:p-10 bg-gradient-to-br from-blue-500/10 via-background to-background border-blue-500/30">
        <div className="text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative bg-gradient-to-br from-blue-400 to-blue-600 rounded-full p-8 sm:p-6 shadow-xl shadow-blue-500/50 animate-bounce-subtle">
                <Wrench className="h-16 w-16 sm:h-12 sm:w-12 text-white" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
              Installation Method Ready! 🎉
            </h2>
            <p className="text-base sm:text-sm text-white/80 max-w-md mx-auto">
              Your comprehensive BS 7671-compliant method statement has been generated
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6">
            <div className="bg-elec-dark/80 backdrop-blur-sm rounded-xl p-5 sm:p-4 border border-blue-500/30 hover:border-blue-500/50 transition-all">
              <div className="flex flex-col items-center gap-1">
                <div className="text-4xl sm:text-3xl font-bold text-blue-400 mb-1">{totalSteps}</div>
                <div className="text-base sm:text-sm text-white/80 flex items-center justify-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  Steps
                </div>
              </div>
            </div>

            <div className="bg-elec-dark/80 backdrop-blur-sm rounded-xl p-5 sm:p-4 border border-blue-500/30 hover:border-blue-500/50 transition-all">
              <div className="flex flex-col items-center gap-1">
                <div className="text-4xl sm:text-3xl font-bold text-blue-400 mb-1 truncate w-full text-center" title={estimatedDuration}>
                  {estimatedDuration?.split(' ')[0] || 'N/A'}
                </div>
                <div className="text-base sm:text-sm text-white/80 flex items-center justify-center gap-1">
                  <Clock className="h-4 w-4" />
                  Duration
                </div>
              </div>
            </div>

            <div className="bg-elec-dark/80 backdrop-blur-sm rounded-xl p-5 sm:p-4 border border-amber-500/30 hover:border-amber-500/50 transition-all">
              <div className="flex flex-col items-center gap-1">
                <div className="text-4xl sm:text-3xl font-bold text-amber-400 mb-1">{hazardsCount}</div>
                <div className="text-base sm:text-sm text-white/80 flex items-center justify-center gap-1">
                  <AlertTriangle className="h-4 w-4" />
                  Hazards
                </div>
              </div>
            </div>

            <div className="bg-elec-dark/80 backdrop-blur-sm rounded-xl p-5 sm:p-4 border border-green-500/30 hover:border-green-500/50 transition-all">
              <div className="flex flex-col items-center gap-1">
                <div className="text-4xl sm:text-3xl font-bold text-green-400 mb-1 uppercase">{riskLevel}</div>
                <div className="text-base sm:text-sm text-white/80 flex items-center justify-center gap-1">
                  <Shield className="h-4 w-4" />
                  Risk Level
                </div>
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-500/30">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
              <div className="flex items-center gap-2">
                <Hammer className="h-4 w-4 text-blue-400" />
                <span className="text-base sm:text-sm font-semibold text-white/90">
                  {toolsCount} tools identified
                </span>
              </div>
              <span className="hidden sm:inline text-white/50">•</span>
              <span className="text-base sm:text-sm font-semibold text-white/90">
                ~{timeSaved} minutes saved
              </span>
            </div>
            <p className="text-sm sm:text-xs text-white/80 mt-1 text-center">
              Complete with step-by-step instructions and safety guidance
            </p>
          </div>

          {/* View Results Button */}
          <Button 
            onClick={() => {
              onViewResults();
              onOpenChange(false);
            }}
            size="lg"
            className="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white h-12 touch-manipulation text-base shadow-lg shadow-blue-500/20"
          >
            <Wrench className="h-5 w-5 mr-2" />
            View Method Statement
          </Button>

          {/* Footer */}
          <p className="text-sm sm:text-xs text-white/70">
            Generated in {generationTime}s • BS 7671:2018+A3:2024 Compliant
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstallationSuccess;
