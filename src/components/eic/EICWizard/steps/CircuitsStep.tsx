/**
 * CircuitsStep - Schedule of Testing for EIC
 *
 * Mobile-optimized circuit cards with swipe actions
 * Desktop: Full table view
 */

import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Plus,
  Zap,
  ChevronRight,
  Trash2,
  Camera,
  CheckCircle,
  AlertCircle,
  MoreVertical,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { SwipeableCard } from '@/components/ui/SwipeableCard';
import { DistributionBoard, MAIN_BOARD_ID, createMainBoard } from '@/types/distributionBoard';

interface Circuit {
  id: string;
  boardId?: string; // Links to distribution board
  circuitDesignation: string;
  circuitNumber: string;
  circuitDescription: string;
  circuitType?: string;
  protectiveDeviceType?: string;
  protectiveDeviceRating?: string;
  protectiveDeviceCurve?: string;
  liveSize?: string;
  cpcSize?: string;
  r1r2?: string;
  zs?: string;
  maxZs?: string;
  insulationResistance?: string;
  polarity?: string;
  rcdRating?: string;
  rcdOneX?: string;
  notes?: string;
}

interface CircuitsStepProps {
  data: any;
  onChange: (updates: any) => void;
  isMobile?: boolean;
}

// Circuit status helper
const getCircuitStatus = (circuit: Circuit) => {
  const hasResults = circuit.r1r2 || circuit.zs || circuit.insulationResistance;
  const isComplete = circuit.r1r2 && circuit.zs && circuit.insulationResistance && circuit.polarity;

  if (isComplete) return 'complete';
  if (hasResults) return 'partial';
  return 'pending';
};

// Mobile Circuit Card
const CircuitCard: React.FC<{
  circuit: Circuit;
  onEdit: () => void;
  onDelete: () => void;
  isMobile?: boolean;
}> = ({ circuit, onEdit, onDelete, isMobile }) => {
  const status = getCircuitStatus(circuit);
  const haptic = useHaptic();

  const handleEdit = () => {
    haptic.light();
    onEdit();
  };

  const statusConfig = {
    complete: { color: 'text-green-500', bg: 'bg-green-500/10', icon: CheckCircle, label: 'Complete' },
    partial: { color: 'text-amber-500', bg: 'bg-amber-500/10', icon: AlertCircle, label: 'Partial' },
    pending: { color: 'text-muted-foreground', bg: 'bg-muted/50', icon: Zap, label: 'Pending' },
  }[status];

  const cardContent = (
    <Card
      className={cn(
        'border-border/50 transition-all active:scale-[0.98] touch-manipulation cursor-pointer',
        status === 'complete' && 'border-green-500/30'
      )}
      onClick={handleEdit}
    >
      <CardContent className="py-4">
        <div className="flex items-center gap-3">
          {/* Circuit Badge */}
          <div className={cn('p-2 rounded-lg', statusConfig.bg)}>
            <Zap className={cn('h-5 w-5', statusConfig.color)} />
          </div>

          {/* Circuit Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold">{circuit.circuitDesignation}</span>
              {circuit.protectiveDeviceRating && (
                <Badge variant="outline" className="text-xs">
                  {circuit.protectiveDeviceRating}A
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {circuit.circuitDescription || 'No description'}
            </p>
          </div>

          {/* Test Results Summary */}
          <div className="text-right text-xs space-y-1 hidden sm:block">
            {circuit.r1r2 && (
              <div>R1+R2: <span className="font-mono">{circuit.r1r2}Ω</span></div>
            )}
            {circuit.zs && (
              <div>Zs: <span className="font-mono">{circuit.zs}Ω</span></div>
            )}
          </div>

          {/* Status & Arrow */}
          <Badge variant="secondary" className={cn('text-xs', statusConfig.bg, statusConfig.color)}>
            {statusConfig.label}
          </Badge>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );

  // Wrap in swipeable for mobile
  if (isMobile) {
    return (
      <SwipeableCard
        onSwipeLeft={onDelete}
        leftAction={<Trash2 className="h-5 w-5" />}
        leftColor="bg-red-500"
      >
        {cardContent}
      </SwipeableCard>
    );
  }

  return cardContent;
};

// Circuit Edit Sheet
const CircuitEditSheet: React.FC<{
  circuit: Circuit | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (circuit: Circuit) => void;
  boards: DistributionBoard[];
  isMobile?: boolean;
}> = ({ circuit, open, onOpenChange, onSave, boards, isMobile }) => {
  const [editData, setEditData] = useState<Circuit | null>(null);

  React.useEffect(() => {
    if (circuit) {
      setEditData({ ...circuit });
    }
  }, [circuit]);

  const handleChange = (field: keyof Circuit, value: string) => {
    if (editData) {
      setEditData({ ...editData, [field]: value });
    }
  };

  const handleSave = () => {
    if (editData) {
      onSave(editData);
      onOpenChange(false);
    }
  };

  if (!editData) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={isMobile ? 'bottom' : 'right'} className={cn(isMobile && 'h-[90vh]')}>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-elec-yellow/10">
              <Zap className="h-5 w-5 text-elec-yellow" />
            </div>
            Circuit {editData.circuitDesignation}
          </SheetTitle>
        </SheetHeader>

        <div className="py-4 space-y-4 overflow-y-auto">
          {/* Board Selection */}
          {boards.length > 1 && (
            <div className="space-y-2">
              <Label className="text-xs">Distribution Board</Label>
              <Select
                value={editData.boardId || MAIN_BOARD_ID}
                onValueChange={(v) => handleChange('boardId', v)}
              >
                <SelectTrigger className="h-11">
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

          {/* Circuit Details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs">Designation</Label>
              <Input
                value={editData.circuitDesignation}
                onChange={(e) => handleChange('circuitDesignation', e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Rating (A)</Label>
              <Select
                value={editData.protectiveDeviceRating || ''}
                onValueChange={(v) => handleChange('protectiveDeviceRating', v)}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {['6', '10', '16', '20', '32', '40', '50', '63'].map((r) => (
                    <SelectItem key={r} value={r}>{r}A</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Description</Label>
            <Input
              value={editData.circuitDescription}
              onChange={(e) => handleChange('circuitDescription', e.target.value)}
              placeholder="e.g. Kitchen sockets"
              className="h-11"
            />
          </div>

          {/* Test Results Section */}
          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              Test Results
              <Badge variant="outline" className="text-xs">BS7671</Badge>
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">R1+R2 (Ω)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={editData.r1r2 || ''}
                  onChange={(e) => handleChange('r1r2', e.target.value)}
                  placeholder="0.00"
                  className="h-11 font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Zs (Ω)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={editData.zs || ''}
                  onChange={(e) => handleChange('zs', e.target.value)}
                  placeholder="0.00"
                  className="h-11 font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Ir (MΩ)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={editData.insulationResistance || ''}
                  onChange={(e) => handleChange('insulationResistance', e.target.value)}
                  placeholder="≥2"
                  className="h-11 font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Polarity</Label>
                <Select
                  value={editData.polarity || ''}
                  onValueChange={(v) => handleChange('polarity', v)}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="correct">✓ Correct</SelectItem>
                    <SelectItem value="incorrect">✗ Incorrect</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* RCD Fields */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="space-y-2">
                <Label className="text-xs">RCD Rating (mA)</Label>
                <Select
                  value={editData.rcdRating || 'na'}
                  onValueChange={(v) => handleChange('rcdRating', v === 'na' ? '' : v)}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="N/A" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="na">N/A</SelectItem>
                    <SelectItem value="30">30mA</SelectItem>
                    <SelectItem value="100">100mA</SelectItem>
                    <SelectItem value="300">300mA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">RCD Trip (×In)</Label>
                <Input
                  type="number"
                  step="1"
                  value={editData.rcdOneX || ''}
                  onChange={(e) => handleChange('rcdOneX', e.target.value)}
                  placeholder="ms"
                  className="h-11 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Notes</Label>
            <Input
              value={editData.notes || ''}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Any additional notes..."
              className="h-11"
            />
          </div>
        </div>

        <SheetFooter className="pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
            Save Circuit
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export const CircuitsStep: React.FC<CircuitsStepProps> = ({ data, onChange, isMobile }) => {
  const [editingCircuit, setEditingCircuit] = useState<Circuit | null>(null);
  const [showEditSheet, setShowEditSheet] = useState(false);
  const [activeBoard, setActiveBoard] = useState<string>(MAIN_BOARD_ID);
  const haptic = useHaptic();

  const circuits: Circuit[] = data.circuits || [];

  // Get boards from wizard data, ensure main board exists
  const boards: DistributionBoard[] = useMemo(() => {
    const wizardBoards = data.distributionBoards || [];
    if (wizardBoards.length === 0) {
      return [createMainBoard()];
    }
    return wizardBoards;
  }, [data.distributionBoards]);

  // Group circuits by board
  const circuitsByBoard = useMemo(() => {
    const grouped: Record<string, Circuit[]> = {};
    boards.forEach(board => {
      grouped[board.id] = circuits.filter(c => (c.boardId || MAIN_BOARD_ID) === board.id);
    });
    return grouped;
  }, [circuits, boards]);

  const handleAddCircuit = useCallback((boardId?: string) => {
    haptic.medium();
    const targetBoardId = boardId || activeBoard;
    const boardCircuits = circuits.filter(c => (c.boardId || MAIN_BOARD_ID) === targetBoardId);
    const newCircuit: Circuit = {
      id: `circuit-${Date.now()}`,
      boardId: targetBoardId,
      circuitDesignation: `C${boardCircuits.length + 1}`,
      circuitNumber: `${boardCircuits.length + 1}`,
      circuitDescription: '',
    };
    onChange({ circuits: [...circuits, newCircuit] });
  }, [circuits, onChange, haptic, activeBoard]);

  const handleEditCircuit = useCallback((circuit: Circuit) => {
    setEditingCircuit(circuit);
    setShowEditSheet(true);
  }, []);

  const handleSaveCircuit = useCallback((updated: Circuit) => {
    const updatedCircuits = circuits.map((c) =>
      c.id === updated.id ? updated : c
    );
    onChange({ circuits: updatedCircuits });
  }, [circuits, onChange]);

  const handleDeleteCircuit = useCallback((circuit: Circuit) => {
    haptic.warning();
    const updatedCircuits = circuits.filter((c) => c.id !== circuit.id);
    onChange({ circuits: updatedCircuits });
  }, [circuits, onChange, haptic]);

  // Stats
  const completeCount = circuits.filter((c) => getCircuitStatus(c) === 'complete').length;
  const partialCount = circuits.filter((c) => getCircuitStatus(c) === 'partial').length;

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      {circuits.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-border/50">
            <CardContent className="py-3 text-center">
              <p className="text-2xl font-bold">{circuits.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card className="border-green-500/30 bg-green-500/5">
            <CardContent className="py-3 text-center">
              <p className="text-2xl font-bold text-green-500">{completeCount}</p>
              <p className="text-xs text-muted-foreground">Complete</p>
            </CardContent>
          </Card>
          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardContent className="py-3 text-center">
              <p className="text-2xl font-bold text-amber-500">{partialCount}</p>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Board Tabs - only show if multiple boards */}
      {boards.length > 1 && (
        <div className="flex rounded-lg bg-muted p-1 gap-1 overflow-x-auto">
          {boards.map((board) => (
            <button
              key={board.id}
              type="button"
              onClick={() => setActiveBoard(board.id)}
              className={cn(
                'flex-shrink-0 px-3 py-2.5 rounded-md text-sm font-medium transition-all touch-manipulation',
                'min-h-[44px] whitespace-nowrap',
                activeBoard === board.id
                  ? 'bg-elec-yellow text-black shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {board.name}
              <Badge variant="secondary" className="ml-2 text-xs">
                {circuitsByBoard[board.id]?.length || 0}
              </Badge>
            </button>
          ))}
        </div>
      )}

      {/* Circuit List - filtered by active board */}
      {(() => {
        const currentBoardCircuits = boards.length > 1
          ? (circuitsByBoard[activeBoard] || [])
          : circuits;

        return currentBoardCircuits.length > 0 ? (
          <div className="space-y-3">
            {currentBoardCircuits.map((circuit) => (
              <CircuitCard
                key={circuit.id}
                circuit={circuit}
                onEdit={() => handleEditCircuit(circuit)}
                onDelete={() => handleDeleteCircuit(circuit)}
                isMobile={isMobile}
              />
            ))}
          </div>
        ) : (
          <Card className="border-dashed border-2 border-border">
            <CardContent className="py-12 text-center">
              <Zap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No Circuits Added</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {boards.length > 1
                  ? `Add circuits to ${boards.find(b => b.id === activeBoard)?.name || 'this board'}`
                  : 'Add circuits to record test results'}
              </p>
              <Button onClick={() => handleAddCircuit(activeBoard)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add First Circuit
              </Button>
            </CardContent>
          </Card>
        );
      })()}

      {/* Add Circuit Button */}
      {((boards.length > 1 ? (circuitsByBoard[activeBoard] || []) : circuits).length > 0) && (
        <Button
          onClick={() => handleAddCircuit(activeBoard)}
          variant="outline"
          className="w-full h-12 gap-2 border-dashed"
        >
          <Plus className="h-4 w-4" />
          Add Circuit {boards.length > 1 && `to ${boards.find(b => b.id === activeBoard)?.name}`}
        </Button>
      )}

      {/* Edit Sheet */}
      <CircuitEditSheet
        circuit={editingCircuit}
        open={showEditSheet}
        onOpenChange={setShowEditSheet}
        onSave={handleSaveCircuit}
        boards={boards}
        isMobile={isMobile}
      />
    </div>
  );
};

export default CircuitsStep;
