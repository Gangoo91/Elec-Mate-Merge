/**
 * CircuitReviewSheet - Bottom sheet for reviewing detected circuits
 *
 * Shows photo thumbnail in header, prominent reverse order button,
 * and circuit list with confidence indicators.
 */

import React, { useState, useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Camera, Plus, AlertTriangle, CheckCircle2, ArrowUpDown, Check, Bot, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CircuitReviewCard } from './CircuitReviewCard';
import { CircuitEditModal } from './CircuitEditModal';
import { ContributePhotoModal } from './ContributePhotoModal';

interface DetectedCircuit {
  id: string;
  position: number;
  label: string;
  device: string;
  rating: number | null;
  curve: string | null;
  confidence: 'high' | 'medium' | 'low';
  phase?: '1P' | '3P';
  pictograms?: Array<{ type: string; confidence: number }>;
  notes?: string;
  evidence?: string;
}

interface CircuitReviewSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  circuits: DetectedCircuit[];
  board: {
    make?: string;
    model?: string;
    mainSwitch?: string;
    totalWays?: number;
  };
  /** URL of captured photo to display as thumbnail */
  photoUrl?: string | null;
  /** Base64 of photo for contribution (optional) */
  photoBase64?: string | null;
  onConfirm: (circuits: DetectedCircuit[]) => void;
  onRescan: () => void;
}

export const CircuitReviewSheet: React.FC<CircuitReviewSheetProps> = ({
  open,
  onOpenChange,
  circuits: initialCircuits,
  board,
  photoUrl,
  photoBase64,
  onConfirm,
  onRescan,
}) => {
  const [circuits, setCircuits] = useState<DetectedCircuit[]>(initialCircuits);
  const [originalCircuits, setOriginalCircuits] = useState<DetectedCircuit[]>(initialCircuits);
  const [editingCircuit, setEditingCircuit] = useState<DetectedCircuit | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [showPhotoPreview, setShowPhotoPreview] = useState(false);
  const [showContributeModal, setShowContributeModal] = useState(false);

  // Update circuits when prop changes
  React.useEffect(() => {
    setCircuits(initialCircuits);
    setOriginalCircuits(initialCircuits);
  }, [initialCircuits]);

  // Count confidence levels
  const { highCount, mediumCount, lowCount, allHighConfidence } = useMemo(() => {
    const high = circuits.filter(c => c.confidence === 'high').length;
    const medium = circuits.filter(c => c.confidence === 'medium').length;
    const low = circuits.filter(c => c.confidence === 'low').length;
    return {
      highCount: high,
      mediumCount: medium,
      lowCount: low,
      allHighConfidence: low === 0 && medium === 0,
    };
  }, [circuits]);

  // Track if user made corrections (valuable for training)
  const correctionsCount = useMemo(() => {
    return circuits.filter((c, i) => {
      const original = originalCircuits.find(o => o.id === c.id);
      if (!original) return false;
      return (
        c.device !== original.device ||
        c.rating !== original.rating ||
        c.curve !== original.curve ||
        c.label !== original.label
      );
    }).length;
  }, [circuits, originalCircuits]);

  // Handle circuit edit
  const handleEditCircuit = (circuit: DetectedCircuit) => {
    setEditingCircuit(circuit);
  };

  // Handle circuit update from edit modal
  const handleUpdateCircuit = (updated: DetectedCircuit) => {
    setCircuits(prev => prev.map(c => c.id === updated.id ? updated : c));
    setEditingCircuit(null);
  };

  // Handle reverse order
  const handleReverseOrder = () => {
    setCircuits(prev => {
      const reversed = [...prev].reverse();
      // Update position numbers
      return reversed.map((c, i) => ({ ...c, position: i + 1 }));
    });
    setIsReversed(!isReversed);
  };

  // Handle remove circuit
  const handleRemoveCircuit = (id: string) => {
    setCircuits(prev => {
      const filtered = prev.filter(c => c.id !== id);
      // Renumber positions
      return filtered.map((c, i) => ({ ...c, position: i + 1 }));
    });
  };

  // Handle add all - show contribution prompt after confirming
  const handleAddAll = () => {
    onConfirm(circuits);
    // Show contribution modal if we have a photo
    if (photoUrl) {
      setShowContributeModal(true);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="h-[85vh] rounded-t-2xl p-0 flex flex-col"
        >
          {/* Header with photo thumbnail, count, and status */}
          <SheetHeader className="px-4 py-4 border-b flex-shrink-0">
            <div className="flex items-start gap-3">
              {/* Photo Thumbnail */}
              {photoUrl && (
                <button
                  onClick={() => setShowPhotoPreview(true)}
                  className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-border/50 bg-muted/20 touch-manipulation hover:ring-2 hover:ring-elec-yellow/50 transition-all"
                >
                  <img
                    src={photoUrl}
                    alt="Scanned board"
                    className="w-full h-full object-cover"
                  />
                </button>
              )}

              {/* Title and info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <SheetTitle className="text-lg">{circuits.length} Circuits Found</SheetTitle>
                  <Badge
                    variant={allHighConfidence ? "default" : "secondary"}
                    className={cn(
                      "gap-1 flex-shrink-0",
                      allHighConfidence
                        ? "bg-green-500/10 text-green-500 border-green-500/30"
                        : "bg-orange-500/10 text-orange-500 border-orange-500/30"
                    )}
                  >
                    {allHighConfidence ? (
                      <>
                        <CheckCircle2 className="h-3 w-3" />
                        All verified
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-3 w-3" />
                        {lowCount + mediumCount} need review
                      </>
                    )}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {board.make || 'Unknown'} board • {board.mainSwitch || 'Unknown'} main switch
                </p>
              </div>
            </div>

            {/* Prominent Reverse Order Button */}
            <div className="mt-4">
              <Button
                variant={isReversed ? "default" : "outline"}
                onClick={handleReverseOrder}
                className={cn(
                  "w-full h-11 gap-2 touch-manipulation",
                  isReversed && "bg-elec-yellow text-black hover:bg-elec-yellow/90"
                )}
              >
                {isReversed ? (
                  <>
                    <Check className="h-4 w-4" />
                    Order Reversed
                  </>
                ) : (
                  <>
                    <ArrowUpDown className="h-4 w-4" />
                    Reverse Circuit Order
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-1.5">
                {isReversed
                  ? "Tap again to reset to original order"
                  : "Use if main switch is on the right side of the board"
                }
              </p>
            </div>

            {/* Confidence badges */}
            {(lowCount > 0 || mediumCount > 0) && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {lowCount > 0 && (
                  <Badge variant="outline" className="text-xs px-2 py-1 border-orange-500/30 text-orange-500">
                    {lowCount} low confidence
                  </Badge>
                )}
                {mediumCount > 0 && (
                  <Badge variant="outline" className="text-xs px-2 py-1 border-yellow-500/30 text-yellow-500">
                    {mediumCount} medium confidence
                  </Badge>
                )}
              </div>
            )}
          </SheetHeader>

          {/* Scrollable circuit list */}
          <ScrollArea className="flex-1 px-4 py-4">
            <div className="space-y-2">
              {circuits.map((circuit) => (
                <CircuitReviewCard
                  key={circuit.id}
                  circuit={circuit}
                  onEdit={() => handleEditCircuit(circuit)}
                  onRemove={() => handleRemoveCircuit(circuit.id)}
                />
              ))}
            </div>
          </ScrollArea>

          {/* Contribution prompt - show when corrections made or good scan */}
          {photoUrl && (correctionsCount > 0 || allHighConfidence) && (
            <div className="flex-shrink-0 mx-4 mb-2">
              <button
                onClick={() => setShowContributeModal(true)}
                className="w-full p-3 rounded-lg bg-gradient-to-r from-elec-yellow/10 to-amber-500/10 border border-elec-yellow/30 flex items-center gap-3 touch-manipulation hover:from-elec-yellow/20 hover:to-amber-500/20 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                  {correctionsCount > 0 ? (
                    <Sparkles className="h-4 w-4 text-elec-yellow" />
                  ) : (
                    <Bot className="h-4 w-4 text-elec-yellow" />
                  )}
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {correctionsCount > 0
                      ? `${correctionsCount} correction${correctionsCount > 1 ? 's' : ''} made`
                      : 'Great scan!'
                    }
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {correctionsCount > 0
                      ? 'Share to help improve AI accuracy'
                      : 'Share this photo to train the AI'
                    }
                  </p>
                </div>
                <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 flex-shrink-0">
                  Help AI
                </Badge>
              </button>
            </div>
          )}

          {/* Fixed footer with actions */}
          <div className="flex-shrink-0 p-4 bg-background border-t safe-area-bottom">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onRescan}
                className="flex-1 h-12 touch-manipulation"
              >
                <Camera className="h-4 w-4 mr-2" />
                Rescan
              </Button>
              <Button
                onClick={handleAddAll}
                className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add All ({circuits.length})
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Edit modal */}
      {editingCircuit && (
        <CircuitEditModal
          circuit={editingCircuit}
          onSave={handleUpdateCircuit}
          onClose={() => setEditingCircuit(null)}
        />
      )}

      {/* Photo preview dialog */}
      {photoUrl && (
        <Dialog open={showPhotoPreview} onOpenChange={setShowPhotoPreview}>
          <DialogContent className="max-w-[95vw] max-h-[90vh] p-2 bg-black/95">
            <img
              src={photoUrl}
              alt="Scanned board - full size"
              className="w-full h-full object-contain max-h-[85vh]"
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Contribution modal - shown after successful scan */}
      {photoUrl && (
        <ContributePhotoModal
          open={showContributeModal}
          onClose={() => setShowContributeModal(false)}
          photoUrl={photoUrl}
          photoBase64={photoBase64 || undefined}
          circuits={circuits}
          originalCircuits={originalCircuits}
          board={board}
        />
      )}
    </>
  );
};

export default CircuitReviewSheet;
