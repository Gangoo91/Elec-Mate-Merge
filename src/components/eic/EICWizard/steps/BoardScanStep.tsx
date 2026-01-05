/**
 * BoardScanStep - AI Board Scanner for EIC
 *
 * Hero feature: AI-powered circuit detection from photos
 * Uses shared BoardScanFlow component
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Sparkles, Plus, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

interface BoardScanStepProps {
  data: any;
  onChange: (updates: any) => void;
  onSkip?: () => void;
  isMobile?: boolean;
}

export const BoardScanStep: React.FC<BoardScanStepProps> = ({
  data,
  onChange,
  onSkip,
  isMobile,
}) => {
  const [showScanner, setShowScanner] = useState(false);
  const haptic = useHaptic();

  const hasCircuits = data.circuits && data.circuits.length > 0;
  const circuitCount = data.circuits?.length || 0;

  const handleStartScan = () => {
    haptic.medium();
    setShowScanner(true);
  };

  const handleScanComplete = (circuits: any[]) => {
    haptic.success();
    onChange({ circuits });
    setShowScanner(false);
  };

  const handleAddManually = () => {
    haptic.light();
    // Add empty circuit
    const newCircuit = {
      id: `circuit-${Date.now()}`,
      circuitDesignation: `C${circuitCount + 1}`,
      circuitNumber: `${circuitCount + 1}`,
      circuitDescription: '',
      protectiveDeviceType: '',
      protectiveDeviceRating: '',
    };
    onChange({ circuits: [...(data.circuits || []), newCircuit] });
  };

  // Show scanner overlay if active
  if (showScanner) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        {/* Import BoardScanFlow dynamically to avoid circular deps */}
        <React.Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow" />
          </div>
        }>
          <BoardScanFlowWrapper
            onComplete={handleScanComplete}
            onClose={() => setShowScanner(false)}
          />
        </React.Suspense>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero AI Scanner Card */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-transparent overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-elec-yellow/20">
              <Camera className="h-8 w-8 text-elec-yellow" />
            </div>
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                AI Board Scanner
                <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Automatically detect circuits from your board photo
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Circuit labels
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Device ratings
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-500" />
              MCB/RCD types
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Board make/model
            </div>
          </div>

          <Button
            onClick={handleStartScan}
            className="w-full h-14 text-lg gap-3 bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            <Camera className="h-5 w-5" />
            Start Scanning
            <ArrowRight className="h-5 w-5" />
          </Button>
        </CardContent>
      </Card>

      {/* Current Circuits Status */}
      {hasCircuits && (
        <Card className="border-green-500/30 bg-green-500/5">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Zap className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="font-semibold">{circuitCount} Circuits Added</p>
                  <p className="text-sm text-muted-foreground">
                    Ready for testing
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleAddManually}>
                <Plus className="h-4 w-4 mr-1" />
                Add More
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Manual Entry Option */}
      <Card className="border-border/50">
        <CardContent className="py-6">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Prefer to add circuits manually?
            </p>
            <Button variant="outline" onClick={handleAddManually} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Circuit Manually
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Skip Option */}
      {onSkip && !hasCircuits && (
        <div className="text-center">
          <button
            onClick={onSkip}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip and add circuits later
          </button>
        </div>
      )}
    </div>
  );
};

// Wrapper to lazy load BoardScanFlow
const BoardScanFlowWrapper: React.FC<{
  onComplete: (circuits: any[]) => void;
  onClose: () => void;
}> = ({ onComplete, onClose }) => {
  const [BoardScanFlow, setBoardScanFlow] = useState<React.ComponentType<any> | null>(null);

  React.useEffect(() => {
    import('@/components/testing/BoardScanFlow').then((mod) => {
      setBoardScanFlow(() => mod.default || mod.BoardScanFlow);
    }).catch(() => {
      // Fallback if component doesn't exist yet
      console.warn('BoardScanFlow not available');
      onClose();
    });
  }, [onClose]);

  if (!BoardScanFlow) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow mx-auto" />
          <p className="text-muted-foreground">Loading scanner...</p>
        </div>
      </div>
    );
  }

  return (
    <BoardScanFlow
      onComplete={onComplete}
      onCancel={onClose}
    />
  );
};

export default BoardScanStep;
