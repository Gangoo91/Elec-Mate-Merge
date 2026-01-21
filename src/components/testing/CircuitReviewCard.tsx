/**
 * CircuitReviewCard - Individual circuit card with confidence indicator
 *
 * Shows circuit details with visual confidence indicator and edit capability.
 * Low confidence circuits are highlighted for review.
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, AlertTriangle, CheckCircle2, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface CircuitReviewCardProps {
  circuit: DetectedCircuit;
  onEdit: () => void;
  onRemove: () => void;
}

const confidenceConfig = {
  high: {
    icon: CheckCircle2,
    color: 'text-green-500',
    bgColor: 'bg-green-500/5',
    borderColor: 'border-green-500/20',
  },
  medium: {
    icon: Minus,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/5',
    borderColor: 'border-yellow-500/30',
  },
  low: {
    icon: AlertTriangle,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/5',
    borderColor: 'border-orange-500/50',
  },
};

// Map pictogram types to emojis for quick visual reference
const pictogramEmojis: Record<string, string> = {
  SOCKET: '🔌',
  LIGHTING: '💡',
  COOKER_OVEN: '🍳',
  HOB: '🔥',
  SHOWER: '🚿',
  IMMERSION: '🔥',
  GARAGE: '🚗',
  SMOKE_ALARM: '🔔',
  BOILER: '🌡️',
  FREEZER: '❄️',
  FRIDGE: '🧊',
  WASHING_MACHINE: '🧺',
  DISHWASHER: '🍽️',
  EV_CHARGER: '🔋',
  OUTDOOR: '🌳',
  RING_MAIN: '⭕',
};

export const CircuitReviewCard: React.FC<CircuitReviewCardProps> = ({
  circuit,
  onEdit,
  onRemove,
}) => {
  const config = confidenceConfig[circuit.confidence];
  const ConfidenceIcon = config.icon;

  // Get primary pictogram emoji if available
  const pictogramEmoji = circuit.pictograms?.[0]?.type
    ? pictogramEmojis[circuit.pictograms[0].type]
    : null;

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border transition-colors",
        config.bgColor,
        config.borderColor
      )}
    >
      {/* Position badge */}
      <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
        <span className="font-bold text-elec-yellow">{circuit.position}</span>
      </div>

      {/* Circuit details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium truncate">
            {pictogramEmoji && <span className="mr-1">{pictogramEmoji}</span>}
            {circuit.label || `Circuit ${circuit.position}`}
          </p>
          {circuit.phase === '3P' && (
            <Badge variant="outline" className="text-xs px-1.5 py-0 border-purple-500/50 text-purple-500">
              3P
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
          <Badge variant="outline" className="text-xs px-1.5 py-0">
            {circuit.device}
          </Badge>
          {circuit.rating && (
            <span>{circuit.rating}A</span>
          )}
          {circuit.curve && (
            <span>Type {circuit.curve}</span>
          )}
        </div>
        {circuit.notes && (
          <p className="text-xs text-muted-foreground mt-1 truncate">
            {circuit.notes}
          </p>
        )}
      </div>

      {/* Confidence indicator and actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <ConfidenceIcon className={cn("h-4 w-4", config.color)} />
        <Button
          variant="ghost"
          size="icon"
          onClick={onEdit}
          className="h-8 w-8 touch-manipulation"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="h-8 w-8 touch-manipulation text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CircuitReviewCard;
