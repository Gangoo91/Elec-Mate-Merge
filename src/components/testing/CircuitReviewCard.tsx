/**
 * CircuitReviewCard - Circuit result card with confidence accent
 *
 * Left colour accent for at-a-glance confidence. Clean layout with
 * device/rating/curve as inline tags. Edit and remove actions.
 * Responsive: stacks neatly on phone, breathes on tablet/desktop.
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, AlertTriangle, CheckCircle2, CircleDot } from 'lucide-react';
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
  wayNumber?: number | null;
  phaseDesignation?: string | null;
  boardSide?: string | null;
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
    label: 'Verified',
    accent: 'border-l-green-500',
    badgeCls: 'bg-green-500/10 text-green-400 border-green-500/30',
    iconCls: 'text-green-500',
  },
  medium: {
    icon: CircleDot,
    label: 'Check',
    accent: 'border-l-yellow-500',
    badgeCls: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    iconCls: 'text-yellow-500',
  },
  low: {
    icon: AlertTriangle,
    label: 'Review',
    accent: 'border-l-orange-500',
    badgeCls: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    iconCls: 'text-orange-500',
  },
};

export const CircuitReviewCard: React.FC<CircuitReviewCardProps> = ({
  circuit,
  onEdit,
  onRemove,
}) => {
  const config = confidenceConfig[circuit.confidence];
  const ConfidenceIcon = config.icon;

  return (
    <div
      className={cn(
        'relative flex items-stretch rounded-xl border border-white/[0.06] bg-white/[0.03] transition-all',
        'hover:bg-white/[0.05] hover:border-white/[0.1]',
        'border-l-[3px]',
        circuit.phase === '3P' ? 'border-l-purple-500' : config.accent
      )}
    >
      {/* Position / Way number */}
      <div className="flex items-center justify-center w-14 sm:w-16 flex-shrink-0">
        {circuit.wayNumber ? (
          <div className="flex flex-col items-center justify-center px-1">
            <span className="text-[10px] font-medium text-white/70">W{circuit.wayNumber}</span>
            <span className="text-xs font-bold text-elec-yellow">
              {circuit.phaseDesignation || `L${((circuit.position - 1) % 3) + 1}`}
            </span>
          </div>
        ) : (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-elec-yellow/15 flex items-center justify-center">
            <span className="text-sm sm:text-base font-bold text-elec-yellow tabular-nums">
              {circuit.position}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 py-3 pr-1">
        {/* Top row: label + phase */}
        <div className="flex items-center gap-2 min-w-0">
          <p className="text-sm font-semibold text-white truncate max-w-[180px] sm:max-w-none">
            {circuit.label || `Circuit ${circuit.position}`}
          </p>
          {circuit.phase === '3P' && (
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 leading-4 border-purple-500/40 text-purple-400 bg-purple-500/10 flex-shrink-0"
            >
              3P · L1,L2,L3
            </Badge>
          )}
        </div>

        {/* Bottom row: device + rating + curve as inline tags */}
        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
          <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-md bg-white/[0.06] text-white font-medium">
            {circuit.device}
          </span>
          {circuit.rating && (
            <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-md bg-white/[0.06] text-white">
              {circuit.rating}A
            </span>
          )}
          {circuit.curve && (
            <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-md bg-white/[0.06] text-white">
              Type {circuit.curve}
            </span>
          )}
        </div>

        {circuit.notes && <p className="text-xs text-white mt-1.5 truncate">{circuit.notes}</p>}
      </div>

      {/* Right side: confidence + actions */}
      <div className="flex items-center gap-0.5 pr-1.5 flex-shrink-0">
        <ConfidenceIcon className={cn('h-4 w-4 flex-shrink-0', config.iconCls)} />
        <Button
          variant="ghost"
          size="icon"
          onClick={onEdit}
          className="h-8 w-8 touch-manipulation text-white hover:text-white hover:bg-white/10 rounded-lg"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="h-8 w-8 touch-manipulation text-white/80 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};

export default CircuitReviewCard;
