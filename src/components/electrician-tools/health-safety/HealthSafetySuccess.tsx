import { useEffect } from 'react';
import { CheckCircle2, Shield, HardHat, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

interface HealthSafetySuccessProps {
  hazardCount: number;
  ppeCount: number;
  generationTime?: number;
  onClose: () => void;
}

export const HealthSafetySuccess = ({
  hazardCount,
  ppeCount,
  generationTime = 120,
  onClose,
}: HealthSafetySuccessProps) => {
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

    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100, 50, 200]);
    }
  }, []);

  const timeSaved = Math.round((1.5 - generationTime / 3600) * 10) / 10;
  const generationTimeSeconds = (generationTime / 60).toFixed(1);

  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full p-6 sm:p-8 animate-scale-in rounded-xl bg-white/[0.03] border border-white/[0.08]">
        <div className="text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <CheckCircle2 className="h-16 w-16 sm:h-20 sm:w-20 text-emerald-400 animate-scale-in" />
              <Shield className="h-8 w-8 text-emerald-400 absolute -bottom-2 -right-2 animate-fade-in" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Documentation Complete!
            </h2>
            <p className="text-white">
              Your safety documentation has been generated successfully
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 py-6">
            <div className="space-y-1">
              <Shield className="h-6 w-6 text-emerald-400 mx-auto" />
              <p className="text-2xl sm:text-3xl font-bold text-white">{hazardCount}</p>
              <p className="text-xs text-white">Hazards Identified</p>
            </div>
            <div className="space-y-1">
              <HardHat className="h-6 w-6 text-emerald-400 mx-auto" />
              <p className="text-2xl sm:text-3xl font-bold text-white">{ppeCount}</p>
              <p className="text-xs text-white">PPE Items</p>
            </div>
            <div className="space-y-1">
              <Clock className="h-6 w-6 text-emerald-400 mx-auto" />
              <p className="text-2xl sm:text-3xl font-bold text-white">~{timeSaved}h</p>
              <p className="text-xs text-white">Time Saved</p>
            </div>
          </div>

          {/* Generation Info */}
          <div className="rounded-lg bg-white/[0.03] border border-white/[0.08] p-4">
            <p className="text-sm text-white mb-1">Generated in:</p>
            <p className="font-medium text-white">{generationTimeSeconds} minutes</p>
          </div>

          {/* Action Button */}
          <Button
            onClick={onClose}
            size="lg"
            className="w-full h-14 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold text-base touch-manipulation active:scale-[0.98] shadow-lg shadow-emerald-500/20 hover:from-emerald-600 hover:to-green-600"
          >
            View Results
          </Button>
        </div>
      </div>
    </div>
  );
};
