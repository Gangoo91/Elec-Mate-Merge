import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Check,
  X,
  Zap,
  AlertTriangle,
  CheckCircle,
  RotateCcw,
  ChevronRight,
  Trash2,
  ArrowLeftRight,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BoardInfo {
  brand: string;
  model: string;
  main_switch_rating: number | null;
  spd_status: string;
  estimated_total_ways: number;
}

interface DetectedCircuit {
  id: string;
  index: number;
  label_text: string;
  device: {
    category: string;
    type: string;
    rating_amps: number | null;
    curve: string | null;
  };
  phase: '1P' | '3P';
  confidence: 'high' | 'medium' | 'low';
}

interface ResultsPreviewProps {
  images: string[];
  board: BoardInfo | null;
  circuits: DetectedCircuit[];
  onAccept: (board: BoardInfo | null, circuits: DetectedCircuit[]) => void;
  onRescan: () => void;
  onCancel: () => void;
  isMobile: boolean;
}

/**
 * Results preview screen with native mobile app feel
 * Features: reverse order, full-screen edit, iOS-style list
 */
export const ResultsPreview: React.FC<ResultsPreviewProps> = ({
  images,
  board,
  circuits: initialCircuits,
  onAccept,
  onRescan,
  onCancel,
  isMobile,
}) => {
  const [circuits, setCircuits] = useState(initialCircuits);
  const [boardInfo, setBoardInfo] = useState(board);
  const [editingCircuit, setEditingCircuit] = useState<DetectedCircuit | null>(null);
  const [isReversed, setIsReversed] = useState(false);

  // Stats
  const highConfidence = circuits.filter(c => c.confidence === 'high').length;
  const mediumConfidence = circuits.filter(c => c.confidence === 'medium').length;
  const lowConfidence = circuits.filter(c => c.confidence === 'low').length;
  const threePhase = circuits.filter(c => c.phase === '3P').length;

  // Reverse circuit order (for boards where main switch is on right)
  const handleReverseOrder = () => {
    setCircuits(prev => {
      const reversed = [...prev].reverse();
      return reversed.map((c, idx) => ({
        ...c,
        index: idx + 1
      }));
    });
    setIsReversed(!isReversed);
  };

  // Update circuit
  const updateCircuit = (id: string, updates: Partial<DetectedCircuit>) => {
    setCircuits(prev => prev.map(c =>
      c.id === id ? { ...c, ...updates } : c
    ));
  };

  // Delete circuit
  const deleteCircuit = (id: string) => {
    setCircuits(prev => prev.filter(c => c.id !== id));
    setEditingCircuit(null);
  };

  // Add manual circuit
  const addCircuit = () => {
    const maxIndex = Math.max(...circuits.map(c => c.index), 0);
    const newCircuit: DetectedCircuit = {
      id: `manual-${Date.now()}`,
      index: maxIndex + 1,
      label_text: `Circuit ${maxIndex + 1}`,
      device: {
        category: 'MCB',
        type: '',
        rating_amps: null,
        curve: 'B',
      },
      phase: '1P',
      confidence: 'high',
    };
    setCircuits(prev => [...prev, newCircuit]);
    setEditingCircuit(newCircuit);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Sticky header with stats */}
      <header className="sticky top-0 bg-background/95 backdrop-blur border-b border-border z-10">
        <div className="p-4 space-y-3">
          {/* Board info row */}
          {boardInfo && (
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="gap-1">
                <Zap className="h-3 w-3" />
                {boardInfo.brand}
              </Badge>
              {boardInfo.main_switch_rating && (
                <Badge variant="outline">{boardInfo.main_switch_rating}A Main</Badge>
              )}
              <Badge variant="outline">{boardInfo.estimated_total_ways} ways</Badge>
              {boardInfo.spd_status && boardInfo.spd_status !== 'unknown' && (
                <Badge
                  variant="outline"
                  className={cn(
                    boardInfo.spd_status === 'present' && 'border-green-500 text-green-600'
                  )}
                >
                  SPD
                </Badge>
              )}
            </div>
          )}

          {/* Confidence progress bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden flex">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${(highConfidence / circuits.length) * 100}%` }}
              />
              <div
                className="h-full bg-amber-500 transition-all"
                style={{ width: `${(mediumConfidence / circuits.length) * 100}%` }}
              />
              <div
                className="h-full bg-red-500 transition-all"
                style={{ width: `${(lowConfidence / circuits.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {highConfidence}/{circuits.length} verified
            </span>
          </div>

          {/* Actions row */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReverseOrder}
              className="gap-1.5 h-9"
            >
              <ArrowLeftRight className="h-4 w-4" />
              {isReversed ? 'Undo Reverse' : 'Reverse Order'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={addCircuit}
              className="gap-1.5 h-9"
            >
              <Plus className="h-4 w-4" />
              Add Circuit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRescan}
              className="gap-1.5 h-9 ml-auto"
            >
              <RotateCcw className="h-4 w-4" />
              Rescan
            </Button>
          </div>
        </div>
      </header>

      {/* Scrollable circuit list - native style */}
      <main className="flex-1 overflow-y-auto">
        {/* Low confidence warning */}
        {lowConfidence > 0 && (
          <div className="mx-4 mt-4 p-3 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {lowConfidence} circuit{lowConfidence > 1 ? 's need' : ' needs'} verification
            </p>
          </div>
        )}

        {/* Circuit list */}
        <div className="divide-y divide-border">
          {circuits
            .sort((a, b) => a.index - b.index)
            .map((circuit) => (
              <button
                key={circuit.id}
                onClick={() => setEditingCircuit(circuit)}
                className="w-full flex items-center gap-4 p-4 text-left active:bg-muted/50 transition-colors touch-manipulation"
              >
                {/* Large circuit number with confidence color */}
                <div className={cn(
                  "h-12 w-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0",
                  circuit.confidence === 'high' && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                  circuit.confidence === 'medium' && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                  circuit.confidence === 'low' && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                )}>
                  {circuit.index}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">
                    {circuit.label_text || `Circuit ${circuit.index}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {circuit.device.category}
                    {circuit.device.rating_amps && ` • ${circuit.device.rating_amps}A`}
                    {circuit.device.curve && ` • Type ${circuit.device.curve}`}
                  </p>
                </div>

                {/* Phase badge */}
                {circuit.phase === '3P' && (
                  <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shrink-0">
                    3Ø
                  </Badge>
                )}

                <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
              </button>
            ))}
        </div>
      </main>

      {/* Sticky footer */}
      <footer className="sticky bottom-0 p-4 bg-background border-t border-border pb-safe">
        <Button
          size="lg"
          onClick={() => onAccept(boardInfo, circuits)}
          className="w-full h-14 text-lg gap-2 active:scale-[0.98] transition-transform"
        >
          <Check className="h-5 w-5" />
          Accept {circuits.length} Circuits
        </Button>
      </footer>

      {/* Full-screen edit modal */}
      {editingCircuit && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          {/* Edit header */}
          <header className="h-14 flex items-center justify-between px-4 border-b border-border safe-area-top">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditingCircuit(null)}
            >
              Cancel
            </Button>
            <h1 className="font-semibold">Circuit {editingCircuit.index}</h1>
            <Button
              size="sm"
              onClick={() => setEditingCircuit(null)}
            >
              Done
            </Button>
          </header>

          {/* Edit form */}
          <main className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Circuit label */}
            <div className="space-y-2">
              <Label className="text-base">Circuit Description</Label>
              <Input
                value={editingCircuit.label_text}
                onChange={(e) => {
                  const updated = { ...editingCircuit, label_text: e.target.value };
                  setEditingCircuit(updated);
                  updateCircuit(editingCircuit.id, { label_text: e.target.value });
                }}
                className="h-12 text-base"
                placeholder="e.g., Kitchen Sockets"
              />
            </div>

            {/* Device type & rating */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-base">Device Type</Label>
                <select
                  value={editingCircuit.device.category}
                  onChange={(e) => {
                    const updated = {
                      ...editingCircuit,
                      device: { ...editingCircuit.device, category: e.target.value }
                    };
                    setEditingCircuit(updated);
                    updateCircuit(editingCircuit.id, { device: updated.device });
                  }}
                  className="w-full h-12 px-3 rounded-lg border border-border bg-background text-base touch-manipulation"
                >
                  <option value="MCB">MCB</option>
                  <option value="RCBO">RCBO</option>
                  <option value="RCD">RCD</option>
                  <option value="MCCB">MCCB</option>
                  <option value="Fuse">Fuse</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-base">Rating (A)</Label>
                <Input
                  type="number"
                  inputMode="numeric"
                  value={editingCircuit.device.rating_amps || ''}
                  onChange={(e) => {
                    const rating = e.target.value ? parseInt(e.target.value) : null;
                    const updated = {
                      ...editingCircuit,
                      device: { ...editingCircuit.device, rating_amps: rating }
                    };
                    setEditingCircuit(updated);
                    updateCircuit(editingCircuit.id, { device: updated.device });
                  }}
                  className="h-12 text-base"
                  placeholder="32"
                />
              </div>
            </div>

            {/* Curve & phase */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-base">Curve Type</Label>
                <select
                  value={editingCircuit.device.curve || ''}
                  onChange={(e) => {
                    const updated = {
                      ...editingCircuit,
                      device: { ...editingCircuit.device, curve: e.target.value || null }
                    };
                    setEditingCircuit(updated);
                    updateCircuit(editingCircuit.id, { device: updated.device });
                  }}
                  className="w-full h-12 px-3 rounded-lg border border-border bg-background text-base touch-manipulation"
                >
                  <option value="">--</option>
                  <option value="B">Type B</option>
                  <option value="C">Type C</option>
                  <option value="D">Type D</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-base">Phase</Label>
                <select
                  value={editingCircuit.phase}
                  onChange={(e) => {
                    const updated = { ...editingCircuit, phase: e.target.value as '1P' | '3P' };
                    setEditingCircuit(updated);
                    updateCircuit(editingCircuit.id, { phase: updated.phase });
                  }}
                  className="w-full h-12 px-3 rounded-lg border border-border bg-background text-base touch-manipulation"
                >
                  <option value="1P">Single Phase</option>
                  <option value="3P">Three Phase</option>
                </select>
              </div>
            </div>

            {/* Confidence indicator */}
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                {editingCircuit.confidence === 'high' ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className={cn(
                    "h-5 w-5",
                    editingCircuit.confidence === 'medium' ? "text-amber-500" : "text-red-500"
                  )} />
                )}
                <span className="font-medium capitalize">{editingCircuit.confidence} Confidence</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {editingCircuit.confidence === 'high' && 'AI is confident in this detection'}
                {editingCircuit.confidence === 'medium' && 'Please verify the details above'}
                {editingCircuit.confidence === 'low' && 'Manual verification strongly recommended'}
              </p>
            </div>
          </main>

          {/* Edit footer */}
          <footer className="p-4 border-t border-border pb-safe">
            <Button
              variant="destructive"
              onClick={() => deleteCircuit(editingCircuit.id)}
              className="w-full h-12 gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete Circuit
            </Button>
          </footer>
        </div>
      )}
    </div>
  );
};

export default ResultsPreview;
