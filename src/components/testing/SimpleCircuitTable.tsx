/**
 * SimpleCircuitTable - Mobile-first circuit review table
 *
 * Redesigned with card-based layout for mobile devices.
 * Each circuit is shown as an expandable card for easy editing.
 */

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  X, Check, AlertCircle, Trash2, Plus, ChevronUp, ChevronDown,
  ArrowLeftRight, Zap, Cable, Settings2, ChevronRight, Pencil
} from 'lucide-react';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { protectiveDeviceTypeOptions, protectiveDeviceRatingOptions, getDefaultKaRating } from '@/types/protectiveDeviceTypes';
import { getRecommendedCpcSize } from '@/types/enhancedCircuitTypes';
import { InsertPositionDialog } from './InsertPositionDialog';
import { cn } from '@/lib/utils';

interface Evidence {
  label?: string[];
  device?: string[];
  curve?: string[];
  rating?: string[];
}

interface Circuit {
  id: number;
  position: number;
  label: string;
  device: string;
  curve: string | null;
  rating: number | null;
  liveConductorSize: string | null;
  cpcSize: string | null;
  kaRating: string | null;
  confidence: 'high' | 'medium' | 'low';
  evidence?: Evidence;
  notes?: string;
  phase?: '1P' | '3P';
  phases?: {
    L1?: { position: number; rating?: number; curve?: string };
    L2?: { position: number; rating?: number; curve?: string };
    L3?: { position: number; rating?: number; curve?: string };
  };
  pictograms?: Array<{
    type: string;
    confidence: 'high' | 'medium' | 'low';
  }>;
}

interface BoardInfo {
  make: string;
  model: string;
  mainSwitch: string;
  spd: string;
  totalWays: number;
  boardLayout?: '1P' | '3P-vertical' | '3P-horizontal';
  waysPerCircuit?: number;
  evidence?: {
    brand?: string[];
    model?: string[];
    mainSwitch?: string[];
    spd?: string[];
  };
}

interface SimpleCircuitTableProps {
  circuits: Circuit[];
  board: BoardInfo;
  onApply: (circuits: Circuit[]) => void;
  onClose: () => void;
}

// Get pictogram emoji
const getPictogramEmoji = (type: string): string => {
  const map: Record<string, string> = {
    'SHOWER': '🚿',
    'SOCKETS': '🔌',
    'LIGHTING': '💡',
    'COOKER_OVEN': '🍳',
    'HOB': '🔥',
    'EV_CHARGER': '🚗',
    'SMOKE_ALARM': '🔔',
    'FIRE_ALARM': '🔔',
    'BOILER': '🔧',
    'HEATER': '🌡️',
    'OUTDOOR': '🌳',
    'GARDEN_ROOM': '🌳',
    'GARAGE': '🏠',
  };
  return map[type] || '⚡';
};

// Confidence badge component
const ConfidenceBadge = ({ conf }: { conf: 'high' | 'medium' | 'low' }) => {
  const config = {
    high: { label: 'Verified', className: 'bg-green-500/10 text-green-500 border-green-500/30' },
    medium: { label: 'Check', className: 'bg-amber-500/10 text-amber-500 border-amber-500/30' },
    low: { label: 'Review', className: 'bg-red-500/10 text-red-500 border-red-500/30' },
  };
  const { label, className } = config[conf];
  return (
    <Badge variant="outline" className={cn('text-xs font-medium', className)}>
      {label}
    </Badge>
  );
};

// Detect circuit type from label
const detectCircuitType = (label: string): string => {
  const lower = label.toLowerCase();
  if (lower.includes('light')) return 'lighting';
  if (lower.includes('socket') || lower.includes('ring')) return 'ring-socket';
  if (lower.includes('cooker') || lower.includes('oven')) return 'cooker';
  if (lower.includes('shower')) return 'shower';
  return 'radial-socket';
};

// Get smart defaults for cable sizes
const getSmartDefaults = (rating: number | null, label: string): { live: string; cpc: string; ka: string } => {
  if (!rating) return { live: '', cpc: '', ka: '' };

  const circuitType = detectCircuitType(label);

  if (circuitType === 'lighting') {
    return { live: '1.5', cpc: '1.0', ka: '6' };
  }
  if (circuitType === 'shower') {
    return { live: '10', cpc: '4.0', ka: '10' };
  }
  if (circuitType === 'cooker' && rating >= 32) {
    return { live: '6.0', cpc: '2.5', ka: rating <= 40 ? '6' : '10' };
  }
  if (circuitType === 'ring-socket' && rating === 32) {
    return { live: '2.5', cpc: '1.5', ka: '6' };
  }

  if (rating <= 10) return { live: '1.5', cpc: '1.0', ka: '6' };
  if (rating <= 20) return { live: '2.5', cpc: '1.5', ka: '6' };
  if (rating >= 40) return { live: '10', cpc: '4.0', ka: '10' };

  return { live: '4.0', cpc: '1.5', ka: '6' };
};

// Cable size options
const liveSizeOptions = [
  { value: '1.0', label: '1.0mm²' },
  { value: '1.5', label: '1.5mm²' },
  { value: '2.5', label: '2.5mm²' },
  { value: '4.0', label: '4.0mm²' },
  { value: '6.0', label: '6.0mm²' },
  { value: '10', label: '10mm²' },
  { value: '16', label: '16mm²' },
  { value: '25', label: '25mm²' },
];

const cpcSizeOptions = [
  { value: '1.0', label: '1.0mm²' },
  { value: '1.5', label: '1.5mm²' },
  { value: '2.5', label: '2.5mm²' },
  { value: '4.0', label: '4.0mm²' },
  { value: '6.0', label: '6.0mm²' },
  { value: '10', label: '10mm²' },
  { value: '16', label: '16mm²' },
];

const curveOptions = [
  { value: 'B', label: 'Type B' },
  { value: 'C', label: 'Type C' },
  { value: 'D', label: 'Type D' },
  { value: 'K', label: 'Type K' },
  { value: 'Z', label: 'Type Z' },
];

const kaOptions = [
  { value: '3', label: '3kA' },
  { value: '6', label: '6kA' },
  { value: '10', label: '10kA' },
  { value: '16', label: '16kA' },
  { value: '16.5', label: '16.5kA' },
];

export const SimpleCircuitTable = ({ circuits, board, onApply, onClose }: SimpleCircuitTableProps) => {
  const [editedCircuits, setEditedCircuits] = useState<Circuit[]>(circuits);
  const [insertDialogOpen, setInsertDialogOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const isThreePhase = board.boardLayout === '3P-vertical' || board.boardLayout === '3P-horizontal' || board.waysPerCircuit === 3;

  // Count confidence levels
  const lowCount = editedCircuits.filter(c => c.confidence === 'low').length;
  const mediumCount = editedCircuits.filter(c => c.confidence === 'medium').length;

  // Auto-populate cable sizes when AI data loads
  useEffect(() => {
    const populatedCircuits = circuits.map(circuit => {
      if (circuit.liveConductorSize || circuit.cpcSize) return circuit;

      const defaults = getSmartDefaults(circuit.rating, circuit.label);

      return {
        ...circuit,
        liveConductorSize: defaults.live,
        cpcSize: defaults.cpc,
        kaRating: defaults.ka
      };
    });

    setEditedCircuits(populatedCircuits);
  }, [circuits]);

  const updateCircuit = (id: number, field: keyof Circuit, value: any) => {
    setEditedCircuits(prev =>
      prev.map(c => {
        if (c.id !== id) return c;

        const updated = { ...c, [field]: value };

        // Auto-update cable sizes when rating changes
        if (field === 'rating' && value) {
          const defaults = getSmartDefaults(Number(value), c.label);
          updated.liveConductorSize = defaults.live || c.liveConductorSize;
          updated.cpcSize = defaults.cpc || c.cpcSize;
          updated.kaRating = defaults.ka || c.kaRating;
        }

        // Auto-update CPC when live conductor changes
        if (field === 'liveConductorSize' && value) {
          updated.cpcSize = getRecommendedCpcSize(value);
        }

        // Auto-update kA when device type or rating changes
        if ((field === 'device' || field === 'rating') && updated.device && updated.rating) {
          updated.kaRating = getDefaultKaRating(updated.device, String(updated.rating));
        }

        return updated;
      })
    );
  };

  const deleteCircuit = (id: number) => {
    setEditedCircuits(prev => {
      const filtered = prev.filter(c => c.id !== id);
      return filtered.map((c, i) => ({ ...c, position: i + 1 }));
    });
    setExpandedId(null);
  };

  const addBlankCircuit = () => {
    const newPosition = editedCircuits.length > 0
      ? Math.max(...editedCircuits.map(c => c.position)) + 1
      : 1;

    const newCircuit: Circuit = {
      id: Date.now(),
      position: newPosition,
      label: '',
      device: 'MCB',
      curve: 'B',
      rating: null,
      liveConductorSize: null,
      cpcSize: null,
      kaRating: null,
      confidence: 'low',
      notes: ''
    };

    setEditedCircuits(prev => [...prev, newCircuit]);
    setExpandedId(newCircuit.id);
  };

  const insertCircuitAtPosition = (position: number) => {
    const newCircuit: Circuit = {
      id: Date.now(),
      position: position,
      label: '',
      device: 'MCB',
      curve: 'B',
      rating: null,
      liveConductorSize: null,
      cpcSize: null,
      kaRating: null,
      confidence: 'low',
      notes: '',
    };

    const updatedCircuits = editedCircuits.map((circuit) => ({
      ...circuit,
      position: circuit.position >= position ? circuit.position + 1 : circuit.position,
    }));

    const circuitsWithNew = [...updatedCircuits, newCircuit].sort(
      (a, b) => a.position - b.position
    );

    setEditedCircuits(circuitsWithNew);
    setExpandedId(newCircuit.id);
  };

  const reverseCircuitOrder = () => {
    const reversed = [...editedCircuits].reverse();
    reversed.forEach((circuit, idx) => {
      circuit.position = idx + 1;
    });
    setEditedCircuits(reversed);
  };

  const moveCircuit = (id: number, direction: 'up' | 'down') => {
    const index = editedCircuits.findIndex(c => c.id === id);
    if (index === -1) return;

    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === editedCircuits.length - 1) return;

    const newCircuits = [...editedCircuits];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    [newCircuits[index], newCircuits[targetIndex]] = [newCircuits[targetIndex], newCircuits[index]];

    newCircuits.forEach((circuit, idx) => {
      circuit.position = idx + 1;
    });

    setEditedCircuits(newCircuits);
  };

  const hasData = editedCircuits.length > 0;

  return (
    <div className="flex flex-col h-full max-h-[90vh] bg-background">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-4 pb-3 border-b border-border/30">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Zap className="h-5 w-5 text-elec-yellow" />
              AI Detection Results
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {board.make} {board.model} • {board.mainSwitch}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="flex-shrink-0">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <Badge variant="secondary" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
            {editedCircuits.length} circuits
          </Badge>
          {isThreePhase && (
            <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
              Three-Phase
            </Badge>
          )}
          {lowCount > 0 && (
            <Badge variant="secondary" className="bg-red-500/10 text-red-400 border-red-500/30">
              {lowCount} need review
            </Badge>
          )}
          {mediumCount > 0 && (
            <Badge variant="secondary" className="bg-amber-500/10 text-amber-400 border-amber-500/30">
              {mediumCount} to check
            </Badge>
          )}
        </div>

        {/* Quick actions */}
        {hasData && editedCircuits.length > 1 && (
          <Button
            variant="outline"
            size="sm"
            onClick={reverseCircuitOrder}
            className="mt-3 h-9 gap-2 touch-manipulation border-white/30"
          >
            <ArrowLeftRight className="h-4 w-4" />
            Reverse Order
          </Button>
        )}
      </div>

      {/* Circuit list */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {hasData ? (
            editedCircuits.map((circuit) => (
              <CircuitCard
                key={circuit.id}
                circuit={circuit}
                isExpanded={expandedId === circuit.id}
                onToggle={() => setExpandedId(expandedId === circuit.id ? null : circuit.id)}
                onUpdate={(field, value) => updateCircuit(circuit.id, field, value)}
                onDelete={() => deleteCircuit(circuit.id)}
                onMove={(dir) => moveCircuit(circuit.id, dir)}
                isFirst={editedCircuits[0]?.id === circuit.id}
                isLast={editedCircuits[editedCircuits.length - 1]?.id === circuit.id}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-1">No Circuits Detected</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Try taking another photo with better lighting
              </p>
              <Button onClick={addBlankCircuit} variant="outline" size="sm" className="touch-manipulation">
                <Plus className="h-4 w-4 mr-2" />
                Add Circuit Manually
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="flex-shrink-0 p-4 border-t border-border/30 bg-background safe-area-bottom">
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-12 px-4 touch-manipulation border-white/30">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-elec-gray border-elec-gray">
              <DropdownMenuItem onClick={addBlankCircuit} className="py-2.5">
                Add at End
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setInsertDialogOpen(true)} className="py-2.5">
                Insert at Position...
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={() => onApply(editedCircuits)}
            disabled={editedCircuits.length === 0}
            className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation font-medium"
          >
            <Check className="h-4 w-4 mr-2" />
            Apply to Schedule ({editedCircuits.length})
          </Button>
        </div>
      </div>

      {/* Insert Position Dialog */}
      <InsertPositionDialog
        open={insertDialogOpen}
        onOpenChange={setInsertDialogOpen}
        circuits={editedCircuits}
        onInsert={insertCircuitAtPosition}
      />
    </div>
  );
};

// Individual circuit card component
interface CircuitCardProps {
  circuit: Circuit;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate: (field: keyof Circuit, value: any) => void;
  onDelete: () => void;
  onMove: (direction: 'up' | 'down') => void;
  isFirst: boolean;
  isLast: boolean;
}

const CircuitCard: React.FC<CircuitCardProps> = ({
  circuit,
  isExpanded,
  onToggle,
  onUpdate,
  onDelete,
  onMove,
  isFirst,
  isLast,
}) => {
  const hasLowConfidence = circuit.confidence === 'low';
  const hasMediumConfidence = circuit.confidence === 'medium';

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200",
      hasLowConfidence && "border-red-500/30 bg-red-500/5",
      hasMediumConfidence && "border-amber-500/30 bg-amber-500/5",
      !hasLowConfidence && !hasMediumConfidence && "border-border/50"
    )}>
      {/* Card header - always visible */}
      <button
        onClick={onToggle}
        className="w-full p-3 flex items-center gap-3 touch-manipulation text-left"
      >
        {/* Position number */}
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm",
          hasLowConfidence ? "bg-red-500/20 text-red-400" :
          hasMediumConfidence ? "bg-amber-500/20 text-amber-400" :
          "bg-elec-yellow/20 text-elec-yellow"
        )}>
          {circuit.position}
        </div>

        {/* Circuit info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {circuit.pictograms?.[0] && (
              <span className="text-base">{getPictogramEmoji(circuit.pictograms[0].type)}</span>
            )}
            <span className="font-medium text-foreground truncate">
              {circuit.label || 'Unnamed Circuit'}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
            <span>{circuit.device}</span>
            {circuit.curve && <span>Type {circuit.curve}</span>}
            {circuit.rating && <span>{circuit.rating}A</span>}
            {circuit.phase === '3P' && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 bg-purple-500/10 text-purple-400 border-purple-500/30">
                3P
              </Badge>
            )}
          </div>
        </div>

        {/* Confidence and expand */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <ConfidenceBadge conf={circuit.confidence} />
          <ChevronRight className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            isExpanded && "rotate-90"
          )} />
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-3 pb-3 pt-0 space-y-3 border-t border-border/30">
          {/* Device section */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Label</label>
              <Input
                value={circuit.label}
                onChange={(e) => onUpdate('label', e.target.value)}
                placeholder="Circuit name"
                className="h-10 text-sm touch-manipulation"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Phase</label>
              <MobileSelectPicker
                value={circuit.phase || '1P'}
                onValueChange={(value) => onUpdate('phase', value as '1P' | '3P')}
                options={[
                  { value: '1P', label: 'Single Phase (1P)' },
                  { value: '3P', label: 'Three Phase (3P)' },
                ]}
                placeholder="Phase"
                title="Phase Type"
                triggerClassName="h-10 text-sm"
              />
            </div>
          </div>

          {/* Protective Device section */}
          <div className="bg-muted/30 rounded-lg p-3 space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Settings2 className="h-3.5 w-3.5" />
              PROTECTIVE DEVICE
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-muted-foreground">Type</label>
                <MobileSelectPicker
                  value={circuit.device}
                  onValueChange={(val) => onUpdate('device', val)}
                  options={protectiveDeviceTypeOptions}
                  placeholder="-"
                  title="Device Type"
                  triggerClassName="h-9 text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-muted-foreground">Curve</label>
                <MobileSelectPicker
                  value={circuit.curve || ''}
                  onValueChange={(val) => onUpdate('curve', val || null)}
                  options={curveOptions}
                  placeholder="-"
                  title="Curve Type"
                  triggerClassName="h-9 text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-muted-foreground">Rating</label>
                <MobileSelectPicker
                  value={circuit.rating?.toString() || ''}
                  onValueChange={(val) => onUpdate('rating', val ? Number(val) : null)}
                  options={protectiveDeviceRatingOptions}
                  placeholder="-"
                  title="Rating"
                  triggerClassName="h-9 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Cable section */}
          <div className="bg-muted/30 rounded-lg p-3 space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Cable className="h-3.5 w-3.5" />
              CABLE SIZES
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-muted-foreground">Live</label>
                <MobileSelectPicker
                  value={circuit.liveConductorSize || ''}
                  onValueChange={(val) => onUpdate('liveConductorSize', val || null)}
                  options={liveSizeOptions}
                  placeholder="-"
                  title="Live Conductor"
                  triggerClassName="h-9 text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-muted-foreground">CPC</label>
                <MobileSelectPicker
                  value={circuit.cpcSize || ''}
                  onValueChange={(val) => onUpdate('cpcSize', val || null)}
                  options={cpcSizeOptions}
                  placeholder="-"
                  title="CPC Size"
                  triggerClassName="h-9 text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-muted-foreground">kA</label>
                <MobileSelectPicker
                  value={circuit.kaRating || ''}
                  onValueChange={(val) => onUpdate('kaRating', val || null)}
                  options={kaOptions}
                  placeholder="-"
                  title="kA Rating"
                  triggerClassName="h-9 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMove('up')}
                disabled={isFirst}
                className="h-8 w-8 p-0"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMove('down')}
                disabled={isLast}
                className="h-8 w-8 p-0"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="h-8 px-3 text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4 mr-1.5" />
              Remove
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SimpleCircuitTable;
