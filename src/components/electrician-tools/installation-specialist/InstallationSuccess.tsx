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
  }, []);

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
      <DialogContent className="max-w-2xl p-6 sm:p-8 bg-gradient-to-br from-blue-500/10 via-background to-background border-blue-500/30">
        <div className="text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative bg-gradient-to-br from-blue-400 to-blue-600 rounded-full p-6 shadow-2xl">
                <Wrench className="h-16 w-16 text-white animate-bounce" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
              Installation Method Ready! 🎉
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Your comprehensive BS 7671-compliant method statement has been generated
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 py-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-4 border border-blue-500/20 hover:scale-105 transition-transform">
              <div className="flex flex-col items-center gap-2">
                <CheckCircle2 className="h-8 w-8 text-blue-400" />
                <div className="text-2xl font-black text-foreground">{totalSteps}</div>
                <div className="text-xs text-muted-foreground font-medium">Steps</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-4 border border-blue-500/20 hover:scale-105 transition-transform">
              <div className="flex flex-col items-center gap-2">
                <Clock className="h-8 w-8 text-blue-400" />
                <div className="text-2xl font-black text-foreground truncate w-full text-center" title={estimatedDuration}>
                  {estimatedDuration.split(' ')[0]}
                </div>
                <div className="text-xs text-muted-foreground font-medium">Duration</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-xl p-4 border border-amber-500/20 hover:scale-105 transition-transform">
              <div className="flex flex-col items-center gap-2">
                <AlertTriangle className="h-8 w-8 text-amber-400" />
                <div className="text-2xl font-black text-foreground">{hazardsCount}</div>
                <div className="text-xs text-muted-foreground font-medium">Hazards</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl p-4 border border-green-500/20 hover:scale-105 transition-transform">
              <div className="flex flex-col items-center gap-2">
                <Shield className="h-8 w-8 text-green-400" />
                <div className="text-2xl font-black text-foreground uppercase">{riskLevel}</div>
                <div className="text-xs text-muted-foreground font-medium">Risk Level</div>
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="bg-gradient-to-r from-blue-500/5 to-transparent rounded-lg p-4 border border-blue-500/20">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Hammer className="h-4 w-4 text-blue-400" />
              <span className="font-medium">{toolsCount} tools identified</span>
              <span className="text-muted-foreground/50">•</span>
              <span className="font-medium">~{timeSaved} minutes saved</span>
            </div>
          </div>

          {/* View Results Button */}
          <Button 
            onClick={() => {
              onViewResults();
              onOpenChange(false);
            }}
            size="lg"
            className="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white h-12 sm:h-14 touch-manipulation text-base sm:text-lg"
          >
            <Wrench className="h-5 w-5 mr-2" />
            View Method Statement
          </Button>

          {/* Footer */}
          <p className="text-xs text-muted-foreground">
            Generated in {generationTime}s
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstallationSuccess;
