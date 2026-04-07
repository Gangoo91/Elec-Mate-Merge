import { useEffect } from 'react';
import { CheckCircle2, Wrench, Clock, AlertTriangle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

interface InstallationSuccessProps {
  results: any;
  onViewResults: () => void;
  generationTime: number; // seconds
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const InstallationSuccess = ({
  results,
  onViewResults,
  generationTime,
  open,
  onOpenChange,
}: InstallationSuccessProps) => {
  useEffect(() => {
    if (!open) return;

    // Trigger confetti celebration
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3b82f6', '#60a5fa', '#93c5fd'],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3b82f6', '#60a5fa', '#93c5fd'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  }, [open]);

  // Extract stats from results
  const totalSteps = results?.steps?.length || results?.summary?.totalSteps || 0;
  const estimatedDuration =
    results?.summary?.estimatedDuration || results?.estimatedDuration || 'N/A';
  const riskLevel = results?.summary?.overallRiskLevel || results?.overallRiskLevel || 'medium';
  const hazardsCount =
    results?.steps?.reduce((count: number, step: any) => {
      return count + (step.linkedHazards?.length || 0);
    }, 0) || 0;

  if (!open) return null;

  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full p-6 sm:p-8 animate-scale-in rounded-xl bg-white/[0.03] border border-white/[0.08]">
        <div className="text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <CheckCircle2 className="h-16 w-16 sm:h-20 sm:w-20 text-blue-400 animate-scale-in" />
              <Wrench className="h-8 w-8 text-blue-400 absolute -bottom-2 -right-2 animate-fade-in" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Installation Method Ready!
            </h2>
            <p className="text-white">
              Your comprehensive BS 7671-compliant method statement has been generated
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2.5 text-center space-y-1">
              <CheckCircle2 className="h-6 w-6 text-blue-400 mx-auto" />
              <p className="text-2xl sm:text-3xl font-bold text-white">{totalSteps}</p>
              <p className="text-xs text-white">Steps</p>
            </div>
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2.5 text-center space-y-1">
              <Clock className="h-6 w-6 text-blue-400 mx-auto" />
              <p className="text-2xl sm:text-3xl font-bold text-white truncate">
                {typeof estimatedDuration === 'string'
                  ? estimatedDuration.split(' ')[0]
                  : estimatedDuration}
              </p>
              <p className="text-xs text-white">Duration</p>
            </div>
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2.5 text-center space-y-1">
              <AlertTriangle className="h-6 w-6 text-amber-400 mx-auto" />
              <p className="text-2xl sm:text-3xl font-bold text-white">{hazardsCount}</p>
              <p className="text-xs text-white">Hazards</p>
            </div>
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2.5 text-center space-y-1">
              <Shield className="h-6 w-6 text-emerald-400 mx-auto" />
              <p className="text-2xl sm:text-3xl font-bold text-white uppercase">{riskLevel}</p>
              <p className="text-xs text-white">Risk Level</p>
            </div>
          </div>

          {/* Generation Info */}
          <div className="rounded-lg bg-white/[0.03] border border-white/[0.08] p-4">
            <p className="text-sm text-white mb-1">Generated in:</p>
            <p className="font-medium text-white">{generationTime}s — BS 7671:2018+A3:2024 Compliant</p>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => {
              onViewResults();
              onOpenChange(false);
            }}
            size="lg"
            className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-base touch-manipulation active:scale-[0.98] shadow-lg shadow-blue-500/20 hover:from-blue-600 hover:to-cyan-600"
          >
            View Method Statement
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstallationSuccess;
