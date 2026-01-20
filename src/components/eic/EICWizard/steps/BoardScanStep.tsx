/**
 * BoardScanStep - AI Board Scanner for EIC
 *
 * Hero feature: AI-powered circuit detection from photos
 * Uses shared BoardScanFlow component
 */

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, Sparkles, Plus, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { DistributionBoard, MAIN_BOARD_ID, createMainBoard } from '@/types/distributionBoard';

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
  const [selectedBoardId, setSelectedBoardId] = useState<string>(MAIN_BOARD_ID);
  const haptic = useHaptic();

  // Get boards from wizard data
  const boards: DistributionBoard[] = useMemo(() => {
    const wizardBoards = data.distributionBoards || [];
    if (wizardBoards.length === 0) {
      return [createMainBoard()];
    }
    return wizardBoards;
  }, [data.distributionBoards]);

  const selectedBoard = boards.find(b => b.id === selectedBoardId) || boards[0];
  const hasCircuits = data.circuits && data.circuits.length > 0;
  const circuitCount = data.circuits?.length || 0;
  const selectedBoardCircuits = (data.circuits || []).filter(
    (c: any) => (c.boardId || MAIN_BOARD_ID) === selectedBoardId
  );

  const handleStartScan = () => {
    haptic.medium();
    setShowScanner(true);
  };

  const handleScanComplete = (circuits: any[]) => {
    haptic.success();
    // Tag all scanned circuits with the selected board ID
    const taggedCircuits = circuits.map(c => ({
      ...c,
      boardId: selectedBoardId,
    }));
    // Merge with existing circuits from other boards
    const otherBoardCircuits = (data.circuits || []).filter(
      (c: any) => (c.boardId || MAIN_BOARD_ID) !== selectedBoardId
    );
    onChange({ circuits: [...otherBoardCircuits, ...taggedCircuits] });
    setShowScanner(false);
  };

  const handleAddManually = () => {
    haptic.light();
    // Add empty circuit to selected board
    const newCircuit = {
      id: `circuit-${Date.now()}`,
      boardId: selectedBoardId,
      circuitDesignation: `C${selectedBoardCircuits.length + 1}`,
      circuitNumber: `${selectedBoardCircuits.length + 1}`,
      circuitDescription: '',
      protectiveDeviceType: '',
      protectiveDeviceRating: '',
    };
    onChange({ circuits: [...(data.circuits || []), newCircuit] });
  };

  // Show scanner overlay if active
  if (showScanner) {
    return (
      <React.Suspense fallback={
        <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow" />
        </div>
      }>
        <BoardScannerOverlayWrapper
          onComplete={handleScanComplete}
          onClose={() => setShowScanner(false)}
        />
      </React.Suspense>
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

          {/* Board Selector - show if multiple boards */}
          {boards.length > 1 && (
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">
                Select board to scan:
              </label>
              <Select value={selectedBoardId} onValueChange={setSelectedBoardId}>
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue placeholder="Select board" />
                </SelectTrigger>
                <SelectContent>
                  {boards.map((board) => (
                    <SelectItem key={board.id} value={board.id}>
                      {board.name} {board.location && `(${board.location})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Button
            onClick={handleStartScan}
            className="w-full h-14 text-lg gap-3 bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            <Camera className="h-5 w-5" />
            Scan {selectedBoard?.name || 'Board'}
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

// Wrapper to lazy load BoardScannerOverlay
const BoardScannerOverlayWrapper: React.FC<{
  onComplete: (circuits: any[]) => void;
  onClose: () => void;
}> = ({ onComplete, onClose }) => {
  const [BoardScannerOverlay, setBoardScannerOverlay] = useState<React.ComponentType<any> | null>(null);

  React.useEffect(() => {
    import('@/components/inspection-app/testing/BoardScannerOverlay').then((mod) => {
      setBoardScannerOverlay(() => mod.BoardScannerOverlay);
    }).catch(() => {
      console.warn('BoardScannerOverlay not available');
      onClose();
    });
  }, [onClose]);

  // Transform BoardScannerOverlay data format to wizard format
  const handleAnalysisComplete = (data: any) => {
    // BoardScannerOverlay returns: { circuits, board, metadata, warnings }
    // Wizard expects array of circuits with position, label, device, rating, etc.
    const circuits = data.circuits || [];
    onComplete(circuits);
  };

  if (!BoardScannerOverlay) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow mx-auto" />
          <p className="text-muted-foreground">Loading scanner...</p>
        </div>
      </div>
    );
  }

  return (
    <BoardScannerOverlay
      onAnalysisComplete={handleAnalysisComplete}
      onClose={onClose}
      title="Scan Distribution Board"
      isWizard={true}
    />
  );
};

export default BoardScanStep;
