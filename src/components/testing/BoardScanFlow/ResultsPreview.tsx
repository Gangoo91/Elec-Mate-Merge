import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Check,
  X,
  Edit2,
  Zap,
  AlertTriangle,
  CheckCircle,
  RotateCcw,
  ChevronRight,
  Trash2,
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
 * Results preview screen with inline editing
 * Allows verification and correction of AI-detected data
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

  // Stats
  const highConfidence = circuits.filter(c => c.confidence === 'high').length;
  const mediumConfidence = circuits.filter(c => c.confidence === 'medium').length;
  const lowConfidence = circuits.filter(c => c.confidence === 'low').length;
  const threePhase = circuits.filter(c => c.phase === '3P').length;

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
      confidence: 'high', // Manual = high confidence
    };
    setCircuits(prev => [...prev, newCircuit]);
    setEditingCircuit(newCircuit);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
        >
          <X className="h-5 w-5" />
        </Button>
        <h2 className="font-semibold">
          {circuits.length} Circuits Found
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAccept(boardInfo, circuits)}
          className="text-primary"
        >
          <Check className="h-4 w-4 mr-1" />
          Accept
        </Button>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Image with circuit overlays */}
        <div className="relative">
          <img
            src={images[0]}
            alt="Scanned board"
            className="w-full"
          />
          {/* Circuit position indicators would go here */}
        </div>

        <div className="p-4 space-y-4">
          {/* Board info */}
          {boardInfo && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Board Detected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">
                      {boardInfo.brand} {boardInfo.model}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {boardInfo.main_switch_rating && (
                        <Badge variant="outline">{boardInfo.main_switch_rating}A Main Switch</Badge>
                      )}
                      <Badge variant="outline">{boardInfo.estimated_total_ways} ways</Badge>
                      {boardInfo.spd_status && boardInfo.spd_status !== 'unknown' && (
                        <Badge
                          variant="outline"
                          className={cn(
                            boardInfo.spd_status === 'present' && 'border-green-500 text-green-600'
                          )}
                        >
                          SPD: {boardInfo.spd_status}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Confidence summary */}
          <Card>
            <CardContent className="py-4">
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2 rounded-lg bg-muted">
                  <p className="text-xl font-bold">{circuits.length}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
                <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/30">
                  <p className="text-xl font-bold text-green-600">{highConfidence}</p>
                  <p className="text-xs text-muted-foreground">High</p>
                </div>
                <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30">
                  <p className="text-xl font-bold text-amber-600">{mediumConfidence}</p>
                  <p className="text-xs text-muted-foreground">Medium</p>
                </div>
                <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/30">
                  <p className="text-xl font-bold text-red-600">{lowConfidence}</p>
                  <p className="text-xs text-muted-foreground">Low</p>
                </div>
              </div>
              {threePhase > 0 && (
                <Badge className="mt-3 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {threePhase} Three-Phase Circuit{threePhase > 1 ? 's' : ''}
                </Badge>
              )}
            </CardContent>
          </Card>

          {/* Low confidence warning */}
          {lowConfidence > 0 && (
            <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
              <CardContent className="py-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    {lowConfidence} circuit{lowConfidence > 1 ? 's have' : ' has'} low confidence - tap to verify
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Circuits list */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Circuits</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addCircuit}
                >
                  + Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {circuits
                .sort((a, b) => a.index - b.index)
                .map((circuit) => (
                  <button
                    key={circuit.id}
                    onClick={() => setEditingCircuit(circuit)}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all',
                      'hover:bg-accent active:scale-[0.99]',
                      circuit.confidence === 'low' && 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20',
                      circuit.confidence === 'medium' && 'border-amber-200 dark:border-amber-800',
                      circuit.confidence === 'high' && 'border-border'
                    )}
                  >
                    {/* Circuit badge */}
                    <Badge
                      variant="outline"
                      className={cn(
                        'h-10 w-14 justify-center font-bold shrink-0',
                        circuit.phase === '3P' && 'bg-blue-100 dark:bg-blue-900/30 border-blue-300'
                      )}
                    >
                      C{circuit.index}
                    </Badge>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {circuit.label_text || `Circuit ${circuit.index}`}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{circuit.device.category}</span>
                        {circuit.device.rating_amps && (
                          <>
                            <span>•</span>
                            <span>{circuit.device.rating_amps}A</span>
                          </>
                        )}
                        {circuit.device.curve && (
                          <>
                            <span>•</span>
                            <span>Type {circuit.device.curve}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Confidence indicator */}
                    {circuit.confidence === 'high' ? (
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                    ) : circuit.confidence === 'medium' ? (
                      <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                    )}

                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  </button>
                ))}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 border-t border-border space-y-2 bg-background">
        <Button
          size="lg"
          onClick={() => onAccept(boardInfo, circuits)}
          className={cn('w-full gap-2 active:scale-[0.98] transition-transform', isMobile ? 'h-14' : 'h-12')}
        >
          <Check className="h-5 w-5" />
          Accept All ({circuits.length} circuits)
        </Button>
        <Button
          variant="outline"
          onClick={onRescan}
          className="w-full gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Rescan Board
        </Button>
      </footer>

      {/* Edit circuit sheet */}
      <Sheet open={!!editingCircuit} onOpenChange={(open) => !open && setEditingCircuit(null)}>
        <SheetContent side="bottom" className="h-[80vh]">
          {editingCircuit && (
            <>
              <SheetHeader>
                <SheetTitle>Edit Circuit {editingCircuit.index}</SheetTitle>
              </SheetHeader>
              <div className="py-6 space-y-4 overflow-y-auto">
                <div className="space-y-2">
                  <Label>Circuit Description</Label>
                  <Input
                    value={editingCircuit.label_text}
                    onChange={(e) => {
                      const updated = { ...editingCircuit, label_text: e.target.value };
                      setEditingCircuit(updated);
                      updateCircuit(editingCircuit.id, { label_text: e.target.value });
                    }}
                    className="h-12"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Device Type</Label>
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
                      className="w-full h-12 px-3 rounded-lg border border-border bg-background"
                    >
                      <option value="MCB">MCB</option>
                      <option value="RCBO">RCBO</option>
                      <option value="RCD">RCD</option>
                      <option value="MCCB">MCCB</option>
                      <option value="Fuse">Fuse</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Rating (A)</Label>
                    <Input
                      type="number"
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
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Curve Type</Label>
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
                      className="w-full h-12 px-3 rounded-lg border border-border bg-background"
                    >
                      <option value="">--</option>
                      <option value="B">Type B</option>
                      <option value="C">Type C</option>
                      <option value="D">Type D</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Phase</Label>
                    <select
                      value={editingCircuit.phase}
                      onChange={(e) => {
                        const updated = { ...editingCircuit, phase: e.target.value as '1P' | '3P' };
                        setEditingCircuit(updated);
                        updateCircuit(editingCircuit.id, { phase: updated.phase });
                      }}
                      className="w-full h-12 px-3 rounded-lg border border-border bg-background"
                    >
                      <option value="1P">Single Phase</option>
                      <option value="3P">Three Phase</option>
                    </select>
                  </div>
                </div>

                <Button
                  variant="destructive"
                  onClick={() => deleteCircuit(editingCircuit.id)}
                  className="w-full mt-4 gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Circuit
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ResultsPreview;
