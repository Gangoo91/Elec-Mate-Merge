/**
 * CircuitReviewSheet - AI detection results review
 *
 * Full redesign: compact header, scrollable circuit list, responsive grid
 * on wider screens. Reverse order kept as inline toggle. Contribution
 * prompt collapsed into footer area. Scroll bug fixed with min-h-0.
 */

import React, { useState, useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Camera,
  Plus,
  AlertTriangle,
  CheckCircle2,
  ArrowUpDown,
  Check,
  Sparkles,
  X,
  Zap,
  RotateCcw,
} from 'lucide-react';
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
  wayNumber?: number | null;
  phaseDesignation?: string | null;
  boardSide?: string | null;
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
  photoUrl?: string | null;
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
  const [newCircuit, setNewCircuit] = useState<DetectedCircuit | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [showPhotoPreview, setShowPhotoPreview] = useState(false);
  const [showContributeModal, setShowContributeModal] = useState(false);

  React.useEffect(() => {
    setCircuits(initialCircuits);
    setOriginalCircuits(initialCircuits);
  }, [initialCircuits]);

  const { highCount, mediumCount, lowCount, allHighConfidence } = useMemo(() => {
    const high = circuits.filter((c) => c.confidence === 'high').length;
    const medium = circuits.filter((c) => c.confidence === 'medium').length;
    const low = circuits.filter((c) => c.confidence === 'low').length;
    return {
      highCount: high,
      mediumCount: medium,
      lowCount: low,
      allHighConfidence: low === 0 && medium === 0,
    };
  }, [circuits]);

  const correctionsCount = useMemo(() => {
    return circuits.filter((c) => {
      const original = originalCircuits.find((o) => o.id === c.id);
      if (!original) return false;
      return (
        c.device !== original.device ||
        c.rating !== original.rating ||
        c.curve !== original.curve ||
        c.label !== original.label
      );
    }).length;
  }, [circuits, originalCircuits]);

  const handleEditCircuit = (circuit: DetectedCircuit) => {
    setEditingCircuit(circuit);
  };

  const handleUpdateCircuit = (updated: DetectedCircuit) => {
    setCircuits((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setEditingCircuit(null);
  };

  const handleReverseOrder = () => {
    setCircuits((prev) => {
      const reversed = [...prev].reverse();
      return reversed.map((c, i) => ({ ...c, position: i + 1 }));
    });
    setIsReversed(!isReversed);
  };

  const handleRemoveCircuit = (id: string) => {
    setCircuits((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      return filtered.map((c, i) => ({ ...c, position: i + 1 }));
    });
  };

  const handleMoveCircuit = (id: string, direction: 'up' | 'down') => {
    setCircuits((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx === -1) return prev;
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[targetIdx]] = [next[targetIdx], next[idx]];
      return next.map((c, i) => ({ ...c, position: i + 1 }));
    });
  };

  // Generate a blank circuit used to seed the Edit modal when the user taps
  // "Add Circuit". `crypto.randomUUID` is available in all browsers we target
  // (and on iOS Safari in Capacitor). Positioning is handled on save.
  const handleStartAddCircuit = () => {
    const blank: DetectedCircuit = {
      id:
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `new-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      position: circuits.length + 1,
      label: '',
      device: 'MCB',
      rating: null,
      curve: null,
      confidence: 'high', // user is creating it manually → verified
      phase: '1P',
    };
    setNewCircuit(blank);
  };

  const handleSaveNewCircuit = (added: DetectedCircuit) => {
    setCircuits((prev) => {
      const next = [...prev, added];
      return next.map((c, i) => ({ ...c, position: i + 1 }));
    });
    setNewCircuit(null);
  };

  const handleAddAll = () => {
    onConfirm(circuits);
    if (photoUrl) {
      setShowContributeModal(true);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="h-[90vh] sm:h-[85vh] rounded-t-2xl p-0 flex flex-col overflow-hidden"
        >
          {/* ── Header ── */}
          <SheetHeader className="flex-shrink-0 border-b border-white/[0.06] bg-background">
            {/* Top bar: title + close */}
            <div className="flex items-center justify-between px-4 pt-4 pb-2 sm:px-6">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-4.5 w-4.5 text-elec-yellow" />
                </div>
                <div className="min-w-0">
                  <SheetTitle className="text-base sm:text-lg font-semibold text-white">
                    AI Detection Results
                  </SheetTitle>
                  <p className="text-xs sm:text-sm text-white truncate">
                    {board.make || 'Unknown'} {board.model ? `${board.model} ` : ''}
                    {'\u00b7'} {board.mainSwitch || 'Unknown'}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="h-10 w-10 rounded-xl touch-manipulation text-white hover:text-white hover:bg-white/10 flex-shrink-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Stats bar + reverse toggle */}
            <div className="flex items-center gap-2 px-4 pb-3 sm:px-6">
              {/* Circuit count */}
              <Badge
                variant="outline"
                className="text-xs font-semibold px-2.5 py-1 border-white/10 bg-white/[0.04] text-white gap-1.5"
              >
                <span className="text-elec-yellow">{circuits.length}</span> circuits
              </Badge>

              {/* Confidence summary */}
              {allHighConfidence ? (
                <Badge
                  variant="outline"
                  className="text-xs px-2.5 py-1 gap-1 bg-green-500/10 text-green-400 border-green-500/20"
                >
                  <CheckCircle2 className="h-3 w-3" />
                  All verified
                </Badge>
              ) : (
                <>
                  {highCount > 0 && (
                    <Badge
                      variant="outline"
                      className="text-xs px-2 py-1 gap-1 bg-green-500/10 text-green-400 border-green-500/20"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {highCount}
                    </Badge>
                  )}
                  {mediumCount > 0 && (
                    <Badge
                      variant="outline"
                      className="text-xs px-2 py-1 gap-1 bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                      {mediumCount}
                    </Badge>
                  )}
                  {lowCount > 0 && (
                    <Badge
                      variant="outline"
                      className="text-xs px-2 py-1 gap-1 bg-orange-500/10 text-orange-400 border-orange-500/20"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      {lowCount}
                    </Badge>
                  )}
                </>
              )}

              {/* Spacer */}
              <div className="flex-1" />

              {/* Reverse order toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReverseOrder}
                className={cn(
                  'h-8 gap-1.5 text-xs font-medium rounded-lg touch-manipulation transition-all',
                  isReversed
                    ? 'bg-elec-yellow/15 text-elec-yellow hover:bg-elec-yellow/20'
                    : 'text-white hover:text-white hover:bg-white/10'
                )}
              >
                {isReversed ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <ArrowUpDown className="h-3.5 w-3.5" />
                )}
                {isReversed ? 'Reversed' : 'Reverse'}
              </Button>
            </div>
          </SheetHeader>

          {/* ── Scrollable circuit list ── */}
          <ScrollArea className="flex-1 min-h-0">
            <div className="px-4 py-3 sm:px-6 sm:py-4">
              {/* Responsive: single column on mobile, 2-col on wider screens */}
              <div className="space-y-2 sm:space-y-2.5 md:grid md:grid-cols-2 md:gap-2.5 md:space-y-0">
                {circuits.map((circuit, idx) => (
                  <CircuitReviewCard
                    key={circuit.id}
                    circuit={circuit}
                    onEdit={() => handleEditCircuit(circuit)}
                    onRemove={() => handleRemoveCircuit(circuit.id)}
                    onMoveUp={() => handleMoveCircuit(circuit.id, 'up')}
                    onMoveDown={() => handleMoveCircuit(circuit.id, 'down')}
                    canMoveUp={idx > 0}
                    canMoveDown={idx < circuits.length - 1}
                  />
                ))}
              </div>

              {/* Add circuit — opens the edit modal pre-seeded with a blank
                  circuit. Saves append to the end; user can then move it up
                  to land it where they want (see handleMoveCircuit). */}
              <button
                onClick={handleStartAddCircuit}
                className="mt-2.5 w-full py-3 rounded-xl border border-dashed border-white/10 text-white text-sm font-medium flex items-center justify-center gap-2 hover:border-white/20 hover:text-white hover:bg-white/[0.02] transition-all touch-manipulation"
              >
                <Plus className="h-4 w-4" />
                Add Circuit
              </button>
            </div>
          </ScrollArea>

          {/* ── Contribution prompt (compact, above footer) ── */}
          {photoUrl && (correctionsCount > 0 || allHighConfidence) && (
            <div className="flex-shrink-0 px-4 sm:px-6 pb-2">
              <button
                onClick={() => setShowContributeModal(true)}
                className="w-full px-3 py-2.5 rounded-xl bg-gradient-to-r from-elec-yellow/[0.06] to-amber-500/[0.06] border border-elec-yellow/20 flex items-center gap-3 touch-manipulation hover:from-elec-yellow/10 hover:to-amber-500/10 transition-colors"
              >
                <Sparkles className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                <span className="text-xs sm:text-sm text-white flex-1 text-left">
                  {correctionsCount > 0
                    ? `${correctionsCount} correction${correctionsCount > 1 ? 's' : ''} — share to improve AI`
                    : 'Great scan — share to train AI'}
                </span>
                <Badge className="bg-elec-yellow/15 text-elec-yellow border-elec-yellow/25 text-[10px] sm:text-xs flex-shrink-0">
                  Help AI
                </Badge>
              </button>
            </div>
          )}

          {/* ── Footer actions ── */}
          <div className="flex-shrink-0 px-4 py-3 sm:px-6 sm:py-4 bg-background/95 backdrop-blur-sm border-t border-white/[0.06] safe-area-bottom">
            <div className="flex gap-3 max-w-2xl mx-auto">
              <Button
                variant="outline"
                onClick={onRescan}
                className="h-12 sm:h-11 px-5 gap-2 touch-manipulation rounded-xl border-white/10 text-white hover:text-white hover:bg-white/10 hover:border-white/20"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Rescan</span>
              </Button>
              <Button
                onClick={handleAddAll}
                className="flex-1 h-12 sm:h-11 gap-2 touch-manipulation rounded-xl bg-elec-yellow text-black font-semibold hover:bg-elec-yellow/90 shadow-lg shadow-elec-yellow/20"
              >
                <Check className="h-4 w-4" />
                Apply to Schedule ({circuits.length})
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Edit modal — existing circuit */}
      {editingCircuit && (
        <CircuitEditModal
          circuit={editingCircuit}
          onSave={handleUpdateCircuit}
          onClose={() => setEditingCircuit(null)}
        />
      )}

      {/* Edit modal — new circuit (reuses the same component) */}
      {newCircuit && (
        <CircuitEditModal
          circuit={newCircuit}
          onSave={handleSaveNewCircuit}
          onClose={() => setNewCircuit(null)}
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

      {/* Contribution modal */}
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
