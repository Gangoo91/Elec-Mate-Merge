import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Shield, HardHat, Clock } from 'lucide-react';
import { triggerHaptic, triggerConfetti } from '@/utils/animation-helpers';

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
  onClose 
}: HealthSafetySuccessProps) => {
  useEffect(() => {
    // Trigger confetti
    triggerConfetti();

    // Haptic feedback
    triggerHaptic([100, 50, 100, 50, 200]);
  }, []);

  const timeSaved = Math.round((1.5 - generationTime / 3600) * 10) / 10;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="max-w-lg w-full border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-background to-background">
        <CardContent className="p-8 text-center space-y-6">
          <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 animate-bounce-in">
            <CheckCircle2 className="h-16 w-16 text-foreground" />
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Documentation Complete!
            </h2>
            <p className="text-muted-foreground">
              Your safety documentation has been generated successfully
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 py-4">
            <Card className="bg-muted/50 border-orange-500/10 hover:scale-105 transition-transform">
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{hazardCount}</div>
                <div className="text-xs text-muted-foreground">Hazards Identified</div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50 border-orange-500/10 hover:scale-105 transition-transform">
              <CardContent className="p-4 text-center">
                <HardHat className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{ppeCount}</div>
                <div className="text-xs text-muted-foreground">PPE Items</div>
              </CardContent>
            </Card>
          </div>

          {/* Time Saved Highlight */}
          <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 text-orange-400">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">Time Saved: ~{timeSaved} hours</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Compared to manual risk assessment creation
            </p>
          </div>

          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-foreground h-12 touch-manipulation"
          >
            View Results
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
