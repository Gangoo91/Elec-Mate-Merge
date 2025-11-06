import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, Clock, Zap } from "lucide-react";
import confetti from "canvas-confetti";
import type { CommissioningResponse } from "@/types/commissioning-response";

interface CommissioningSuccessProps {
  results: CommissioningResponse;
  onViewResults: () => void;
  generationTime: number; // seconds
}

const CommissioningSuccess = ({ results, onViewResults, generationTime }: CommissioningSuccessProps) => {
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
    <div className="min-h-[70vh] flex items-center justify-center animate-fade-in p-4">
      <Card className="max-w-2xl w-full p-6 sm:p-8 bg-gradient-to-br from-purple-500/10 via-background to-background border-purple-500/30">
        <div className="text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-6 rounded-full animate-pulse">
              <CheckCircle2 className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              ✅ Testing Procedure Complete!
            </h2>
            <p className="text-muted-foreground">
              Your commissioning procedure has been generated successfully
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
            <div className="bg-elec-gray/50 rounded-lg p-4 border border-purple-500/20">
              <div className="text-3xl font-bold text-purple-400 mb-1">{totalTests}</div>
              <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Tests
              </div>
            </div>
            <div className="bg-elec-gray/50 rounded-lg p-4 border border-purple-500/20">
              <div className="text-3xl font-bold text-purple-400 mb-1">
                {estimatedDuration.toFixed(1)}h
              </div>
              <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Clock className="h-3 w-3" />
                Duration
              </div>
            </div>
            <div className="bg-elec-gray/50 rounded-lg p-4 border border-purple-500/20">
              <div className="text-3xl font-bold text-purple-400 mb-1">
                {maxZs}Ω
              </div>
              <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Zap className="h-3 w-3" />
                Max Zs
              </div>
            </div>
            <div className="bg-elec-gray/50 rounded-lg p-4 border border-purple-500/20">
              <div className="text-3xl font-bold text-purple-400 mb-1">{certificateType}</div>
              <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <FileText className="h-3 w-3" />
                Certificate
              </div>
            </div>
          </div>

          {/* Time Saved */}
          <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg p-4 border border-purple-500/20">
            <div className="flex items-center justify-center gap-2 text-purple-400">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">Time Saved: ~{timeSaved} minutes</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Compared to manual BS 7671 lookup and procedure writing
            </p>
          </div>

          {/* View Results Button */}
          <Button 
            onClick={onViewResults}
            size="lg"
            className="w-full bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white h-12 sm:h-14 touch-manipulation text-base sm:text-lg"
          >
            View Results →
          </Button>

          {/* Generation Time */}
          <p className="text-xs text-muted-foreground">
            Generated in {generationTime}s
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CommissioningSuccess;
