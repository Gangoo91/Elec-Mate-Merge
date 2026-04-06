import { useEffect } from 'react';
import { CheckCircle2, Wrench, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

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
  onViewResults,
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
        colors: ['#10b981', '#34d399', '#6ee7b7'],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#10b981', '#34d399', '#6ee7b7'],
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
      <div className="max-w-2xl w-full p-6 sm:p-8 animate-scale-in rounded-xl bg-white/[0.03] border border-white/[0.08]">
        <div className="text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <CheckCircle2 className="h-16 w-16 sm:h-20 sm:w-20 text-emerald-400 animate-scale-in" />
              <Wrench className="h-8 w-8 text-emerald-400 absolute -bottom-2 -right-2 animate-fade-in" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Maintenance Instructions Generated!
            </h2>
            <p className="text-white">
              Your comprehensive maintenance method statement is ready
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 py-6">
            <div className="space-y-1">
              <FileText className="h-6 w-6 text-emerald-400 mx-auto" />
              <p className="text-2xl sm:text-3xl font-bold text-white">{stepCount}</p>
              <p className="text-xs text-white">Detailed Steps</p>
            </div>
            <div className="space-y-1">
              <Clock className="h-6 w-6 text-emerald-400 mx-auto" />
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {generationTimeSeconds}s
              </p>
              <p className="text-xs text-white">Generation Time</p>
            </div>
            <div className="space-y-1">
              <Wrench className="h-6 w-6 text-emerald-400 mx-auto" />
              <p className="text-2xl sm:text-3xl font-bold text-white">✓</p>
              <p className="text-xs text-white">BS 7671 Compliant</p>
            </div>
          </div>

          {/* Equipment Summary */}
          <div className="rounded-lg bg-white/[0.03] border border-white/[0.08] p-4">
            <p className="text-sm text-white mb-1">Equipment:</p>
            <p className="font-medium text-white">{equipmentType}</p>
          </div>

          {/* Action Button */}
          <Button
            onClick={onViewResults}
            size="lg"
            className="w-full h-14 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold hover:from-emerald-600 hover:to-green-600"
          >
            View Maintenance Instructions
          </Button>
        </div>
      </div>
    </div>
  );
};
