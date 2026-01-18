import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Check, AlertCircle, Trash2, Plus, GripVertical, ChevronUp, ChevronDown, ArrowLeftRight, User } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { protectiveDeviceTypeOptions, protectiveDeviceRatingOptions, getDefaultKaRating } from '@/types/protectiveDeviceTypes';
import { getRecommendedCpcSize } from '@/types/enhancedCircuitTypes';
import { InsertPositionDialog } from './InsertPositionDialog';

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
  phase?: '1P' | '3P'; // Three-phase detection
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

const ConfidenceBadge = ({ conf }: { conf: 'high' | 'medium' | 'low' }) => {
  const variants = {
    high: { label: 'High', variant: 'default' as const, color: 'bg-green-500/10 text-green-700 dark:text-green-400' },
    medium: { label: 'Med', variant: 'secondary' as const, color: 'bg-amber-500/10 text-amber-700 dark:text-amber-400' },
    low: { label: 'Low', variant: 'destructive' as const, color: 'bg-red-500/10 text-red-700 dark:text-red-400' },
  };
  const { label, color } = variants[conf];
  return (
    <Badge className={`text-xs font-medium ${color} border-0`}>
      {label}
    </Badge>
  );
};

const EvidenceTooltip = ({ evidence }: { evidence?: string[] }) => {
  if (!evidence || evidence.length === 0) return null;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="text-xs space-y-1">
            <div className="font-semibold text-foreground">Evidence:</div>
            {evidence.map((e, i) => (
              <div key={i} className="text-muted-foreground">• {e}</div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const SimpleCircuitTable = ({ circuits, board, onApply, onClose }: SimpleCircuitTableProps) => {
  const [editedCircuits, setEditedCircuits] = useState<Circuit[]>(circuits);
  const [insertDialogOpen, setInsertDialogOpen] = useState(false);
  
  const isThreePhase = board.boardLayout === '3P-vertical' || board.boardLayout === '3P-horizontal' || board.waysPerCircuit === 3;

  // Auto-populate cable sizes when AI data loads
  useEffect(() => {
    const populatedCircuits = circuits.map(circuit => {
      // Only populate if cable sizes are empty
      if (circuit.liveConductorSize || circuit.cpcSize) return circuit;
      
      const rating = circuit.rating;
      const label = circuit.label || '';
      
      // Get smart defaults based on rating and label
      const defaults = getSmartDefaults(rating, label);
      
      return {
        ...circuit,
        liveConductorSize: defaults.live,
        cpcSize: defaults.cpc,
        kaRating: defaults.ka
      };
    });
    
    setEditedCircuits(populatedCircuits);
  }, [circuits]);

  // Detect circuit type from label
  const detectCircuitType = (label: string): string => {
    const lower = label.toLowerCase();
    if (lower.includes('light')) return 'lighting';
    if (lower.includes('socket') || lower.includes('ring')) return 'ring-socket';
    if (lower.includes('cooker') || lower.includes('oven')) return 'cooker';
    if (lower.includes('shower')) return 'shower';
    return 'radial-socket';
  };

  // Detect if rating seems wrong for the circuit type
  const detectRatingMismatch = (rating: number | null, label: string): string | null => {
    if (!rating) return null;
    const circuitType = detectCircuitType(label);
    
    if (circuitType === 'lighting' && rating > 16) {
      return `Lighting circuits typically use 6A or 10A, not ${rating}A`;
    }
    if (circuitType === 'ring-socket' && rating !== 32 && rating !== 20) {
      return `Ring circuits typically use 32A or 20A, not ${rating}A`;
    }
    if (circuitType === 'shower' && rating < 32) {
      return `Shower circuits typically use 40A-45A, not ${rating}A`;
    }
    if (circuitType === 'cooker' && rating < 20) {
      return `Cooker circuits typically use 32A-50A, not ${rating}A`;
    }
    
    return null;
  };

  // Get smart defaults - PRIORITISE circuit type over rating when they conflict
  const getSmartDefaults = (rating: number | null, label: string): { live: string; cpc: string; ka: string } => {
    if (!rating) return { live: '', cpc: '', ka: '' };
    
    const circuitType = detectCircuitType(label);
    const ratingNum = rating;
    
    // PRIORITY 1: Circuit Type Overrides (label-based)
    // These rules apply REGARDLESS of detected rating
    
    if (circuitType === 'lighting') {
      // Lighting MUST be 1.5mm² live, even if rating says 32A (likely misread)
      return { live: '1.5', cpc: '1.0', ka: '6' };
    }
    
    if (circuitType === 'shower') {
      // Showers are high-current, need 10mm²
      return { live: '10', cpc: '4.0', ka: '10' };
    }
    
    if (circuitType === 'cooker' && ratingNum >= 32) {
      return { live: '6.0', cpc: '2.5', ka: ratingNum <= 40 ? '6' : '10' };
    }
    
    if (circuitType === 'ring-socket' && ratingNum === 32) {
      return { live: '2.5', cpc: '1.5', ka: '6' };
    }
    
    // PRIORITY 2: Rating-based defaults (when label is ambiguous)
    
    if (ratingNum <= 10) {
      return { live: '1.5', cpc: '1.0', ka: '6' };
    }
    
    if (ratingNum <= 20) {
      return { live: '2.5', cpc: '1.5', ka: '6' };
    }
    
    if (ratingNum >= 40) {
      return { live: '10', cpc: '4.0', ka: '10' };
    }
    
    // Default for 25-32A radials
    return { live: '4.0', cpc: '1.5', ka: '6' };
  };

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
    setEditedCircuits(prev => prev.filter(c => c.id !== id));
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

    // Renumber circuits at or after the insertion position
    const updatedCircuits = editedCircuits.map((circuit) => ({
      ...circuit,
      position: circuit.position >= position ? circuit.position + 1 : circuit.position,
    }));

    // Insert the new circuit and sort by position
    const circuitsWithNew = [...updatedCircuits, newCircuit].sort(
      (a, b) => a.position - b.position
    );

    setEditedCircuits(circuitsWithNew);
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
    
    // Update positions
    newCircuits.forEach((circuit, idx) => {
      circuit.position = idx + 1;
    });
    
    setEditedCircuits(newCircuits);
  };

  const hasData = editedCircuits.length > 0;

  return (
    <Card className="p-4 sm:p-6 max-w-7xl mx-auto shadow-xl">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-start justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">AI Circuit Detection Results</h2>
          <div className="flex items-center gap-2">
            {hasData && editedCircuits.length > 1 && (
              <Button variant="outline" size="sm" onClick={reverseCircuitOrder}>
                <ArrowLeftRight className="h-4 w-4 mr-2" />
                Reverse Order
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
          {isThreePhase && (
            <>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 font-semibold">
                Three-Phase Board
              </Badge>
              <div className="h-4 w-px bg-border hidden sm:block" />
            </>
          )}
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-foreground">Board:</span>
            <span>{board.make} {board.model}</span>
            <EvidenceTooltip evidence={[...(board.evidence?.brand || []), ...(board.evidence?.model || [])]} />
          </div>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-foreground">Main Switch:</span>
            <span>{board.mainSwitch}</span>
            <EvidenceTooltip evidence={board.evidence?.mainSwitch} />
          </div>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-foreground">SPD:</span>
            <span>{board.spd}</span>
            <EvidenceTooltip evidence={board.evidence?.spd} />
          </div>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <div>
            <span className="font-semibold text-foreground">Ways:</span> {isThreePhase ? `${editedCircuits.length} (${editedCircuits.length * 3} MCB positions)` : board.totalWays}
          </div>
        </div>
      </div>

      {/* Table Container - Mobile Scrollable */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
          {hasData ? (
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10 bg-muted/30">
                <tr className="border-b-2 border-border">
                  <th className="px-2 py-1.5 text-left text-[10px] font-semibold uppercase tracking-wider sticky left-0 bg-muted/30 z-20 w-[40px]">Cct</th>
                  <th className="px-2 py-1.5 text-left text-[10px] font-semibold uppercase tracking-wider w-[60px]">Phase</th>
                  <th className="px-2 py-1.5 text-left text-[10px] font-semibold uppercase tracking-wider min-w-[150px]">Description</th>
                  <th className="px-2 py-1.5 text-left text-[10px] font-semibold uppercase tracking-wider border-l border-border w-[80px]">Device</th>
                  <th className="px-2 py-1.5 text-left text-[10px] font-semibold uppercase tracking-wider w-[70px]">Curve</th>
                  <th className="px-2 py-1.5 text-left text-[10px] font-semibold uppercase tracking-wider w-[80px]">Rating</th>
                  <th className="px-2 py-1.5 text-left text-[10px] font-semibold uppercase tracking-wider border-l border-border w-[70px]">Live</th>
                  <th className="px-2 py-1.5 text-left text-[10px] font-semibold uppercase tracking-wider w-[70px]">CPC</th>
                  <th className="px-2 py-1.5 text-left text-[10px] font-semibold uppercase tracking-wider border-l border-border w-[70px]">kA</th>
                  <th className="px-2 py-1.5 text-left text-[10px] font-semibold uppercase tracking-wider w-[60px]">Conf.</th>
                  <th className="px-2 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wider w-[90px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {editedCircuits.map((circuit, index) => {
                  const isManuallyAdded = circuit.confidence === 'low' && !circuit.evidence;
                  return (
                  <tr key={circuit.id} className={`border-b border-border/50 hover:bg-accent/30 transition-colors ${
                    circuit.confidence === 'low' 
                      ? 'bg-red-500/5 border-l-4 border-l-red-500' 
                      : circuit.confidence === 'medium'
                      ? 'bg-amber-500/5 border-l-4 border-l-amber-500'
                      : ''
                  }`}>
                    {/* Circuit Number */}
                    <td className="px-2 py-1.5 sticky left-0 bg-background relative">
                      <div className="flex items-center gap-1" title={circuit.confidence === 'low' ? '⚠️ Low confidence - verify manually' : circuit.confidence === 'medium' ? '⚠️ Medium confidence - check values' : '✓ High confidence'}>
                        {isThreePhase && circuit.phases ? (
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold">Way {circuit.position}</span>
                            <span className="text-[10px] text-muted-foreground">
                              ({circuit.phases.L1?.position}, {circuit.phases.L2?.position}, {circuit.phases.L3?.position})
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs font-semibold">{circuit.position}</span>
                        )}
                        {isManuallyAdded && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <User className="h-3 w-3 text-blue-500" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">Manually added</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      {circuit.confidence === 'low' && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                      )}
                    </td>
                    
                    {/* Phase Selection */}
                    <td className="px-2 py-1.5">
                      <Select
                        value={circuit.phase || '1P'}
                        onValueChange={(value: '1P' | '3P') => updateCircuit(circuit.id, 'phase', value)}
                      >
                        <SelectTrigger className="h-7 text-xs w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1P">1P</SelectItem>
                          <SelectItem value="3P">3P</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    
                    {/* Description with Tooltip */}
                    <td className="px-2 py-1.5">
                      <div className="flex items-center gap-1">
                        {circuit.pictograms?.length > 0 && (
                          <span className="text-base shrink-0" title={`Detected: ${circuit.pictograms.map((p: any) => p.type).join(', ')}`}>
                            {circuit.pictograms[0].type === 'SHOWER' && '🚿'}
                            {circuit.pictograms[0].type === 'SOCKETS' && '🔌'}
                            {circuit.pictograms[0].type === 'LIGHTING' && '💡'}
                            {circuit.pictograms[0].type === 'COOKER_OVEN' && '🍳'}
                            {circuit.pictograms[0].type === 'HOB' && '🔥'}
                            {circuit.pictograms[0].type === 'EV_CHARGER' && '🚗'}
                            {circuit.pictograms[0].type === 'SMOKE_ALARM' && '🔔'}
                            {circuit.pictograms[0].type === 'FIRE_ALARM' && '🔔'}
                            {circuit.pictograms[0].type === 'BOILER' && '🔧'}
                            {circuit.pictograms[0].type === 'HEATER' && '🌡️'}
                            {circuit.pictograms[0].type === 'OUTDOOR' && '🌳'}
                            {circuit.pictograms[0].type === 'GARDEN_ROOM' && '🌳'}
                            {circuit.pictograms[0].type === 'GARAGE' && '🏠'}
                          </span>
                        )}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Input
                                value={circuit.label}
                                onChange={(e) => updateCircuit(circuit.id, 'label', e.target.value)}
                                className="h-7 text-xs flex-1"
                                placeholder="e.g., Kitchen Sockets"
                                title={circuit.label}
                              />
                            </TooltipTrigger>
                            {circuit.label && circuit.label.length > 15 && (
                              <TooltipContent side="top">
                                <p className="max-w-xs text-xs">{circuit.label}</p>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                        <EvidenceTooltip evidence={circuit.evidence?.label} />
                      </div>
                    </td>
                    
                    {/* Device Type */}
                    <td className="px-2 py-1.5 border-l border-border">
                      <div className="flex items-center gap-1">
                        <Select value={circuit.device} onValueChange={(val) => updateCircuit(circuit.id, 'device', val)}>
                          <SelectTrigger className="h-7 text-xs w-[80px]">
                            <SelectValue placeholder="-" />
                          </SelectTrigger>
                          <SelectContent>
                            {protectiveDeviceTypeOptions.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <EvidenceTooltip evidence={circuit.evidence?.device} />
                      </div>
                    </td>
                    
                    {/* Curve */}
                    <td className="px-2 py-1.5">
                      <div className="flex items-center gap-1">
                        <Select value={circuit.curve || ''} onValueChange={(val) => updateCircuit(circuit.id, 'curve', val || null)}>
                          <SelectTrigger className="h-7 text-xs w-[80px]">
                            <SelectValue placeholder="-" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="B">B</SelectItem>
                            <SelectItem value="C">C</SelectItem>
                            <SelectItem value="D">D</SelectItem>
                            <SelectItem value="K">K</SelectItem>
                            <SelectItem value="Z">Z</SelectItem>
                          </SelectContent>
                        </Select>
                        <EvidenceTooltip evidence={circuit.evidence?.curve} />
                      </div>
                    </td>
                    
                    {/* Rating */}
                    <td className="px-2 py-1.5">
                      <div className="flex items-center gap-1">
                        {isThreePhase && circuit.phases ? (
                          <div className="flex flex-col gap-0.5 text-[10px] text-muted-foreground">
                            <span>L1: {circuit.phases.L1?.rating || '-'}A</span>
                            <span>L2: {circuit.phases.L2?.rating || '-'}A</span>
                            <span>L3: {circuit.phases.L3?.rating || '-'}A</span>
                          </div>
                        ) : (
                          <>
                            <Select 
                              value={circuit.rating?.toString() || ''} 
                              onValueChange={(val) => updateCircuit(circuit.id, 'rating', val ? Number(val) : null)}
                            >
                              <SelectTrigger className="h-7 text-xs w-[80px]">
                                <SelectValue placeholder="-" />
                              </SelectTrigger>
                              <SelectContent>
                                {protectiveDeviceRatingOptions.map(opt => (
                                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <EvidenceTooltip evidence={circuit.evidence?.rating} />
                            {detectRatingMismatch(circuit.rating, circuit.label) && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span className="text-amber-500 text-xs font-bold">⚠️</span>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
                                    <p className="text-xs text-amber-900 dark:text-amber-100 max-w-xs">
                                      {detectRatingMismatch(circuit.rating, circuit.label)}
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                    
                    {/* Live Conductor Size */}
                    <td className="px-2 py-1.5 border-l border-border">
                      <Select 
                        value={circuit.liveConductorSize || ''} 
                        onValueChange={(val) => updateCircuit(circuit.id, 'liveConductorSize', val || null)}
                      >
                        <SelectTrigger className="h-7 text-xs w-[80px]">
                          <SelectValue placeholder="-" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1.0">1.0</SelectItem>
                          <SelectItem value="1.5">1.5</SelectItem>
                          <SelectItem value="2.5">2.5</SelectItem>
                          <SelectItem value="4.0">4.0</SelectItem>
                          <SelectItem value="6.0">6.0</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="16">16</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    
                    {/* CPC Size */}
                    <td className="px-2 py-1.5">
                      <Select 
                        value={circuit.cpcSize || ''} 
                        onValueChange={(val) => updateCircuit(circuit.id, 'cpcSize', val || null)}
                      >
                        <SelectTrigger className="h-7 text-xs w-[80px]">
                          <SelectValue placeholder="-" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1.0">1.0</SelectItem>
                          <SelectItem value="1.5">1.5</SelectItem>
                          <SelectItem value="2.5">2.5</SelectItem>
                          <SelectItem value="4.0">4.0</SelectItem>
                          <SelectItem value="6.0">6.0</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="16">16</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    
                    {/* kA Rating */}
                    <td className="px-2 py-1.5 border-l border-border">
                      <Select 
                        value={circuit.kaRating || ''} 
                        onValueChange={(val) => updateCircuit(circuit.id, 'kaRating', val || null)}
                      >
                        <SelectTrigger className="h-7 text-xs w-[80px]">
                          <SelectValue placeholder="-" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3kA</SelectItem>
                          <SelectItem value="6">6kA</SelectItem>
                          <SelectItem value="10">10kA</SelectItem>
                          <SelectItem value="16">16kA</SelectItem>
                          <SelectItem value="16.5">16.5kA</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    
                    {/* Confidence */}
                    <td className="px-2 py-1.5">
                      <ConfidenceBadge conf={circuit.confidence} />
                    </td>
                    
                    {/* Actions */}
                    <td className="px-2 py-1.5">
                      <div className="flex items-center justify-center gap-0.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveCircuit(circuit.id, 'up')}
                          disabled={index === 0}
                          className="h-6 w-6 p-0"
                        >
                          <ChevronUp className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveCircuit(circuit.id, 'down')}
                          disabled={index === editedCircuits.length - 1}
                          className="h-6 w-6 p-0"
                        >
                          <ChevronDown className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteCircuit(circuit.id)}
                          className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
                })}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-1">No Circuits Detected</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Try taking another photo with better lighting and angle
              </p>
              <Button onClick={addBlankCircuit} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Circuit Manually
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-6 pt-6 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Circuit
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={addBlankCircuit}>
              Add at End
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setInsertDialogOpen(true)}>
              Insert at Position...
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex gap-2 sm:gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 sm:flex-none">
            Cancel
          </Button>
          <Button onClick={() => onApply(editedCircuits)} disabled={editedCircuits.length === 0} className="flex-1 sm:flex-none">
            <Check className="h-4 w-4 mr-2" />
            Apply to Schedule
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
    </Card>
  );
};
