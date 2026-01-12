import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Check,
  X,
  AlertTriangle,
  Edit2,
  RefreshCw,
  Zap,
  CheckCircle2,
  Info,
  ChevronDown,
  ChevronUp,
  ArrowLeftRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES
// ============================================================================

interface DetectedCircuit {
  id: string;
  position: number;
  label: string;
  device: string;
  curve: string | null;
  rating: number | null;
  confidence: 'high' | 'medium' | 'low';
  evidence?: string;
  phase: '1P' | '3P';
  phases?: string[];
  source_model?: string;
  pictograms?: Array<{ type: string; confidence: number }>;
}

interface BoardInfo {
  make: string;
  model: string;
  mainSwitch: string;
  spd: string;
  totalWays: number;
  boardLayout: '1P' | '3P-vertical' | '3P-horizontal';
}

interface AIResultsPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  circuits: DetectedCircuit[];
  board: BoardInfo;
  imageUrl?: string;
  metadata?: {
    analysisTime?: number;
    modelsUsed?: string[];
    decisions?: string[];
    warnings?: string[];
  };
  onApply: (circuits: DetectedCircuit[]) => void;
  onRescan?: () => void;
}

// ============================================================================
// CONFIDENCE INDICATOR COMPONENT
// ============================================================================

const ConfidenceIndicator: React.FC<{ confidence: 'high' | 'medium' | 'low'; showLabel?: boolean }> = ({
  confidence,
  showLabel = true
}) => {
  const config = {
    high: { color: 'bg-green-500', text: 'text-green-700 dark:text-green-400', label: 'High', icon: CheckCircle2 },
    medium: { color: 'bg-yellow-500', text: 'text-yellow-700 dark:text-yellow-400', label: 'Medium', icon: AlertTriangle },
    low: { color: 'bg-red-500', text: 'text-red-700 dark:text-red-400', label: 'Low', icon: AlertTriangle }
  };

  const { color, text, label, icon: Icon } = config[confidence];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("flex items-center gap-1.5", text)}>
            <div className={cn("w-2 h-2 rounded-full", color)} />
            {showLabel && <span className="text-xs font-medium">{label}</span>}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">
            {confidence === 'high' && 'AI is confident in this detection'}
            {confidence === 'medium' && 'Please verify this detection'}
            {confidence === 'low' && 'Low confidence - manual verification needed'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// ============================================================================
// CIRCUIT ROW COMPONENT
// ============================================================================

interface CircuitRowProps {
  circuit: DetectedCircuit;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (updates: Partial<DetectedCircuit>) => void;
  onCancel: () => void;
}

const CircuitRow: React.FC<CircuitRowProps> = ({ circuit, isEditing, onEdit, onSave, onCancel }) => {
  const [editedLabel, setEditedLabel] = useState(circuit.label);
  const [editedRating, setEditedRating] = useState(circuit.rating?.toString() || '');
  const [editedDevice, setEditedDevice] = useState(circuit.device);

  const handleSave = () => {
    onSave({
      label: editedLabel,
      rating: editedRating ? parseInt(editedRating) : null,
      device: editedDevice
    });
  };

  const handleCancel = () => {
    setEditedLabel(circuit.label);
    setEditedRating(circuit.rating?.toString() || '');
    setEditedDevice(circuit.device);
    onCancel();
  };

  return (
    <div className={cn(
      "flex items-center gap-2 p-2 rounded-lg border transition-colors",
      circuit.confidence === 'low' && "border-red-300 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20",
      circuit.confidence === 'medium' && "border-yellow-300 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-950/20",
      circuit.confidence === 'high' && "border-border bg-card",
      isEditing && "ring-2 ring-primary"
    )}>
      {/* Position */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center font-mono text-sm font-medium">
        {circuit.position}
      </div>

      {/* Phase badge */}
      {circuit.phase === '3P' && (
        <Badge variant="outline" className="flex-shrink-0 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-300">
          3P
        </Badge>
      )}

      {/* Editable fields */}
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <Input
            value={editedLabel}
            onChange={(e) => setEditedLabel(e.target.value)}
            className="flex-1 h-8 text-sm"
            placeholder="Circuit label"
            autoFocus
          />
          <select
            value={editedDevice}
            onChange={(e) => setEditedDevice(e.target.value)}
            className="h-8 px-2 text-sm border rounded-md bg-background"
          >
            <option value="MCB">MCB</option>
            <option value="RCBO">RCBO</option>
            <option value="RCD">RCD</option>
            <option value="AFDD">AFDD</option>
            <option value="Isolator">Isolator</option>
          </select>
          <Input
            value={editedRating}
            onChange={(e) => setEditedRating(e.target.value.replace(/\D/g, ''))}
            className="w-16 h-8 text-sm text-center"
            placeholder="A"
          />
          <span className="text-sm text-muted-foreground">A</span>
        </div>
      ) : (
        <div className="flex-1 flex items-center gap-3">
          <span className="font-medium text-sm">{circuit.label || 'Unlabelled'}</span>
          <Badge variant="secondary" className="text-xs">
            {circuit.device} {circuit.curve || ''}{circuit.rating || '?'}A
          </Badge>
        </div>
      )}

      {/* Confidence */}
      <ConfidenceIndicator confidence={circuit.confidence} showLabel={false} />

      {/* Actions */}
      <div className="flex-shrink-0 flex items-center gap-1">
        {isEditing ? (
          <>
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleSave}>
              <Check className="h-4 w-4 text-green-600" />
            </Button>
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleCancel}>
              <X className="h-4 w-4 text-red-600" />
            </Button>
          </>
        ) : (
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={onEdit}>
            <Edit2 className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const AIResultsPreview: React.FC<AIResultsPreviewProps> = ({
  open,
  onOpenChange,
  circuits: initialCircuits,
  board,
  imageUrl,
  metadata,
  onApply,
  onRescan
}) => {
  const [circuits, setCircuits] = useState<DetectedCircuit[]>(initialCircuits);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Update circuits when props change
  React.useEffect(() => {
    setCircuits(initialCircuits);
  }, [initialCircuits]);

  const handleEditCircuit = (id: string, updates: Partial<DetectedCircuit>) => {
    setCircuits(prev => prev.map(c =>
      c.id === id ? { ...c, ...updates, confidence: 'high' as const } : c
    ));
    setEditingId(null);
  };

  const handleApplyAll = () => {
    onApply(circuits);
    onOpenChange(false);
  };

  // Reverse circuit order (for boards where main switch is on right)
  const handleReverseOrder = () => {
    const reversed = [...circuits].reverse();
    const reindexed = reversed.map((c, idx) => ({
      ...c,
      position: idx + 1
    }));
    setCircuits(reindexed);
    setEditingId(null); // Cancel any active edits
  };

  // Statistics
  const highConfidence = circuits.filter(c => c.confidence === 'high').length;
  const mediumConfidence = circuits.filter(c => c.confidence === 'medium').length;
  const lowConfidence = circuits.filter(c => c.confidence === 'low').length;
  const threePhaseCircuits = circuits.filter(c => c.phase === '3P').length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            AI Board Analysis Results
          </DialogTitle>
          <DialogDescription>
            Review detected circuits before applying to your schedule
          </DialogDescription>
        </DialogHeader>

        {/* Board Summary */}
        <Card className="p-3 bg-muted/50">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Board:</span>
              <span className="ml-2 font-medium">{board.make} {board.model}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Main:</span>
              <span className="ml-2 font-medium">{board.mainSwitch}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Ways:</span>
              <span className="ml-2 font-medium">{board.totalWays}</span>
            </div>
            <div>
              <span className="text-muted-foreground">SPD:</span>
              <span className={cn(
                "ml-2 font-medium",
                board.spd === 'OK' && "text-green-600",
                board.spd === 'Replace' && "text-red-600"
              )}>{board.spd}</span>
            </div>
          </div>

          {board.boardLayout.startsWith('3P') && (
            <Badge className="mt-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
              Three-Phase Board ({board.boardLayout})
            </Badge>
          )}
        </Card>

        {/* Confidence Summary */}
        <div className="flex items-center justify-between py-2 border-b">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>{highConfidence} high</span>
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span>{mediumConfidence} medium</span>
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span>{lowConfidence} low</span>
            </span>
            {threePhaseCircuits > 0 && (
              <Badge variant="outline" className="text-purple-600">
                {threePhaseCircuits} three-phase
              </Badge>
            )}
          </div>

          {metadata && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs"
            >
              <Info className="h-3.5 w-3.5 mr-1" />
              Details
              {showDetails ? <ChevronUp className="h-3.5 w-3.5 ml-1" /> : <ChevronDown className="h-3.5 w-3.5 ml-1" />}
            </Button>
          )}
        </div>

        {/* Analysis Details (collapsible) */}
        {showDetails && metadata && (
          <div className="text-xs space-y-1 p-2 bg-muted/30 rounded-md">
            {metadata.analysisTime && (
              <p><span className="text-muted-foreground">Analysis time:</span> {metadata.analysisTime}ms</p>
            )}
            {metadata.modelsUsed && (
              <p><span className="text-muted-foreground">Models:</span> {metadata.modelsUsed.join(' + ')}</p>
            )}
            {metadata.decisions && metadata.decisions.length > 0 && (
              <div>
                <span className="text-muted-foreground">AI Decisions:</span>
                <ul className="list-disc list-inside ml-2">
                  {metadata.decisions.slice(0, 5).map((d, i) => (
                    <li key={i} className="text-muted-foreground">{d}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Warnings */}
        {metadata?.warnings && metadata.warnings.length > 0 && (
          <div className="flex items-start gap-2 p-2 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-md">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              {metadata.warnings.map((w, i) => (
                <p key={i}>{w}</p>
              ))}
            </div>
          </div>
        )}

        {/* Circuit List */}
        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-2 py-2">
            {circuits.map((circuit) => (
              <CircuitRow
                key={circuit.id}
                circuit={circuit}
                isEditing={editingId === circuit.id}
                onEdit={() => setEditingId(circuit.id)}
                onSave={(updates) => handleEditCircuit(circuit.id, updates)}
                onCancel={() => setEditingId(null)}
              />
            ))}
          </div>
        </ScrollArea>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleReverseOrder}>
              <ArrowLeftRight className="h-4 w-4 mr-2" />
              Reverse Order
            </Button>
            {onRescan && (
              <Button variant="outline" size="sm" onClick={onRescan}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Re-scan
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyAll} className="gap-2">
              <Check className="h-4 w-4" />
              Apply {circuits.length} Circuits
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIResultsPreview;
