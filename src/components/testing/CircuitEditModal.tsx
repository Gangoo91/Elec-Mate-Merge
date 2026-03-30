/**
 * CircuitEditModal - Edit detected circuit details
 *
 * Compact bottom sheet design. Captures corrections as training data.
 */

import React, { useState, useCallback } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Save, Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

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

interface CircuitEditModalProps {
  circuit: DetectedCircuit;
  onSave: (circuit: DetectedCircuit) => void;
  onClose: () => void;
  boardBrand?: string;
  imageUrls?: string[];
}

/**
 * Save correction data for AI training
 */
async function saveTrainingCorrection(
  originalCircuit: DetectedCircuit,
  correctedCircuit: DetectedCircuit,
  boardBrand?: string,
  imageUrl?: string
): Promise<void> {
  const hasCorrections =
    originalCircuit.device !== correctedCircuit.device ||
    originalCircuit.rating !== correctedCircuit.rating ||
    originalCircuit.curve !== correctedCircuit.curve ||
    originalCircuit.label !== correctedCircuit.label;

  if (!hasCorrections) return;

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from('board_scanner_training').insert({
      image_url: imageUrl || null,
      board_brand: boardBrand || null,
      circuit_position: originalCircuit.position,
      ai_device_type: originalCircuit.device,
      ai_rating: originalCircuit.rating?.toString() || null,
      ai_curve: originalCircuit.curve || null,
      ai_label: originalCircuit.label,
      ai_confidence: originalCircuit.confidence,
      correct_device_type: correctedCircuit.device,
      correct_rating: correctedCircuit.rating?.toString() || null,
      correct_curve: correctedCircuit.curve || null,
      correct_label: correctedCircuit.label,
      user_id: user?.id || null,
    });
  } catch (error) {
    console.error('Training save error:', error);
  }
}

const deviceTypes = [
  { value: 'MCB', label: 'MCB', desc: 'Miniature Circuit Breaker' },
  { value: 'RCBO', label: 'RCBO', desc: 'RCD + MCB Combined' },
  { value: 'RCD', label: 'RCD', desc: 'Residual Current Device' },
  { value: 'AFDD', label: 'AFDD', desc: 'Arc Fault Detection' },
  { value: 'SPD', label: 'SPD', desc: 'Surge Protection' },
  { value: 'MCCB', label: 'MCCB', desc: 'Moulded Case CB' },
  { value: 'Main Switch', label: 'Main Switch', desc: 'Main Isolator' },
  { value: 'Isolator', label: 'Isolator', desc: 'Switch Disconnector' },
  { value: 'Contactor', label: 'Contactor', desc: 'Power Contactor' },
  { value: 'Timer', label: 'Timer', desc: 'Time Switch' },
  { value: 'Fuse', label: 'Fuse', desc: 'BS88/BS3036' },
  { value: 'HRC Fuse', label: 'HRC Fuse', desc: 'High Rupturing Capacity' },
  { value: 'Blank', label: 'Blank', desc: 'Spare Way' },
];

const curveTypes = [
  { value: 'B', label: 'Type B', desc: '3-5× In' },
  { value: 'C', label: 'Type C', desc: '5-10× In' },
  { value: 'D', label: 'Type D', desc: '10-20× In' },
  { value: 'K', label: 'Type K', desc: '8-12× In' },
  { value: 'Z', label: 'Type Z', desc: '2-3× In' },
];

// Smart ratings based on device type
const ratingsByDevice: Record<string, number[]> = {
  'MCB': [6, 10, 16, 20, 25, 32, 40, 50, 63],
  'RCBO': [6, 10, 16, 20, 25, 32, 40, 50, 63],
  'RCD': [25, 40, 63, 80, 100],
  'AFDD': [6, 10, 16, 20, 25, 32, 40],
  'MCCB': [16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250],
  'Main Switch': [63, 80, 100, 125],
  'Isolator': [20, 32, 40, 63, 80, 100, 125],
  'Fuse': [3, 5, 13, 15, 20, 30, 45, 60, 80, 100],
  'HRC Fuse': [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100],
};
const defaultRatings = [1, 2, 3, 4, 5, 6, 10, 13, 16, 20, 25, 32, 40, 45, 50, 63, 80, 100, 125];

export const CircuitEditModal: React.FC<CircuitEditModalProps> = ({
  circuit,
  onSave,
  onClose,
  boardBrand,
  imageUrls,
}) => {
  const [originalCircuit] = useState<DetectedCircuit>({ ...circuit });
  const [editedCircuit, setEditedCircuit] = useState<DetectedCircuit>({
    ...circuit,
    confidence: 'high',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = useCallback(
    (field: keyof DetectedCircuit, value: string | number | null) => {
      setEditedCircuit((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    saveTrainingCorrection(originalCircuit, editedCircuit, boardBrand, imageUrls?.[0]).catch(
      (err) => console.error('Training save error:', err)
    );
    onSave(editedCircuit);
    setIsSaving(false);
  }, [originalCircuit, editedCircuit, boardBrand, imageUrls, onSave]);

  const confidenceColour =
    circuit.confidence === 'low'
      ? 'text-orange-400'
      : circuit.confidence === 'medium'
        ? 'text-yellow-400'
        : 'text-green-400';

  return (
    <Sheet open onOpenChange={() => onClose()}>
      <SheetContent
        side="bottom"
        className="h-auto max-h-[85vh] rounded-t-2xl p-0 flex flex-col overflow-hidden"
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <SheetHeader className="px-5 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-elec-yellow/15 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">{circuit.position}</span>
            </div>
            <div className="flex-1 min-w-0">
              <SheetTitle className="text-base font-semibold text-white">Edit Circuit</SheetTitle>
              <p className={cn('text-xs mt-0.5', confidenceColour)}>
                {circuit.confidence === 'low'
                  ? 'Low confidence — verify details'
                  : circuit.confidence === 'medium'
                    ? 'Medium confidence'
                    : 'High confidence'}
              </p>
            </div>
          </div>
        </SheetHeader>

        {/* Form */}
        <div className="px-5 py-4 space-y-4 flex-1 min-h-0 overflow-y-auto">
          {/* Circuit Label */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-white uppercase tracking-wider">Label</Label>
            <Input
              value={editedCircuit.label}
              onChange={(e) => handleChange('label', e.target.value)}
              placeholder="e.g., Kitchen Sockets"
              className="h-12 text-base touch-manipulation bg-white/[0.04] border-white/10 focus:border-elec-yellow focus:ring-elec-yellow text-white placeholder:text-white/30"
            />
          </div>

          {/* Device Type — full width */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-white uppercase tracking-wider">Device Type</Label>
            <Select
              value={editedCircuit.device}
              onValueChange={(value) => handleChange('device', value)}
            >
              <SelectTrigger className="h-12 touch-manipulation bg-white/[0.04] border-white/10 focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow text-white">
                <SelectValue placeholder="Select device type" />
              </SelectTrigger>
              <SelectContent className="z-[100] max-h-[40vh] bg-elec-gray border-elec-gray">
                {deviceTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value} className="py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{type.label}</span>
                      <span className="text-xs text-white/60">{type.desc}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rating + Curve — side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-white uppercase tracking-wider">Rating (A)</Label>
              <Select
                value={editedCircuit.rating?.toString() || ''}
                onValueChange={(value) => handleChange('rating', parseInt(value))}
              >
                <SelectTrigger className="h-12 touch-manipulation bg-white/[0.04] border-white/10 focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow text-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="z-[100] max-h-[40vh] bg-elec-gray border-elec-gray">
                  {(ratingsByDevice[editedCircuit.device] || defaultRatings).map((rating) => (
                    <SelectItem key={rating} value={rating.toString()} className="py-2.5">
                      <span className="font-medium text-white">{rating}A</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-white uppercase tracking-wider">Curve Type</Label>
              <Select
                value={editedCircuit.curve || ''}
                onValueChange={(value) => handleChange('curve', value)}
              >
                <SelectTrigger className="h-12 touch-manipulation bg-white/[0.04] border-white/10 focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow text-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="z-[100] bg-elec-gray border-elec-gray">
                  {curveTypes.map((curve) => (
                    <SelectItem key={curve.value} value={curve.value} className="py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{curve.label}</span>
                        <span className="text-xs text-white/60">{curve.desc}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Phase toggle */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-white uppercase tracking-wider">Phase</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: '1P', label: 'Single Phase (1P)' },
                { value: '3P', label: 'Three Phase (3P)' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleChange('phase', option.value)}
                  className={cn(
                    'h-11 rounded-xl font-medium transition-all touch-manipulation text-sm',
                    (editedCircuit.phase || '1P') === option.value
                      ? 'bg-elec-yellow text-black'
                      : 'bg-white/[0.04] text-white border border-white/10'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-white uppercase tracking-wider">
              Notes <span className="normal-case text-white/50">(optional)</span>
            </Label>
            <Textarea
              value={editedCircuit.notes || ''}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Any additional notes..."
              className="min-h-[72px] text-base touch-manipulation bg-white/[0.04] border-white/10 focus:border-elec-yellow focus:ring-elec-yellow text-white placeholder:text-white/30 resize-none"
            />
          </div>

          {/* AI Evidence */}
          {circuit.evidence && (
            <div className="px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/10">
              <p className="text-[10px] font-medium text-white/50 uppercase tracking-wider mb-1">AI Evidence</p>
              <p className="text-xs text-white leading-relaxed">{circuit.evidence}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/10 flex gap-3 safe-area-bottom">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-12 touch-manipulation rounded-xl border-white/10 text-white hover:bg-white/5"
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation font-semibold rounded-xl shadow-lg shadow-elec-yellow/20"
            disabled={isSaving}
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CircuitEditModal;
