import { useEffect } from "react";
import { CheckCircle2, Wrench, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import confetti from "canvas-confetti";

interface MaintenanceSuccessProps {
  stepCount: number;
  equipmentType: string;
  generationTimeMs: number;
  onViewResults: () => void;
}

export const MaintenanceSuccess = ({
  stepCount,
  equipmentType,
  generationTimeMs,
  onViewResults
}: MaintenanceSuccessProps) => {
  useEffect(() => {
    // Trigger confetti celebration
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#3b82f6", "#60a5fa", "#93c5fd"],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#3b82f6", "#60a5fa", "#93c5fd"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const generationTimeSeconds = (generationTimeMs / 1000).toFixed(1);

  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-6 sm:p-8 animate-scale-in">
        <div className="text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <CheckCircle2 className="h-16 w-16 sm:h-20 sm:w-20 text-green-400 animate-scale-in" />
              <Wrench className="h-8 w-8 text-blue-400 absolute -bottom-2 -right-2 animate-fade-in" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Maintenance Instructions Generated!
            </h2>
            <p className="text-muted-foreground">
              Your comprehensive maintenance method statement is ready
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 py-6">
            <div className="space-y-1">
              <FileText className="h-6 w-6 text-blue-400 mx-auto" />
              <p className="text-2xl sm:text-3xl font-bold text-foreground">{stepCount}</p>
              <p className="text-xs text-muted-foreground">Detailed Steps</p>
            </div>
            <div className="space-y-1">
              <Clock className="h-6 w-6 text-amber-400 mx-auto" />
              <p className="text-2xl sm:text-3xl font-bold text-foreground">{generationTimeSeconds}s</p>
              <p className="text-xs text-muted-foreground">Generation Time</p>
            </div>
            <div className="space-y-1">
              <Wrench className="h-6 w-6 text-green-400 mx-auto" />
              <p className="text-2xl sm:text-3xl font-bold text-foreground">✓</p>
              <p className="text-xs text-muted-foreground">BS 7671 Compliant</p>
            </div>
          </div>

          {/* Equipment Summary */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Equipment:</p>
            <p className="font-medium text-foreground">{equipmentType}</p>
          </div>

          {/* Action Button */}
          <Button
            onClick={onViewResults}
            size="lg"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            View Maintenance Instructions
          </Button>
        </div>
      </Card>
    </div>
  );
};
