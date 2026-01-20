/**
 * CircuitEditModal - Modal for editing detected circuit details
 *
 * Allows users to correct AI-detected circuit information before adding.
 * ENHANCED: Captures corrections as training data for AI improvement.
 */

import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Save, X } from 'lucide-react';
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
  pictograms?: Array<{ type: string; confidence: number }>;
  notes?: string;
  evidence?: string;
}

interface CircuitEditModalProps {
  circuit: DetectedCircuit;
  onSave: (circuit: DetectedCircuit) => void;
  onClose: () => void;
  /** Optional: Board brand for training context */
  boardBrand?: string;
  /** Optional: Image URL(s) for training data */
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
  // Check if there were any actual corrections
  const hasCorrections =
    originalCircuit.device !== correctedCircuit.device ||
    originalCircuit.rating !== correctedCircuit.rating ||
    originalCircuit.curve !== correctedCircuit.curve ||
    originalCircuit.label !== correctedCircuit.label;

  if (!hasCorrections) {
    // No corrections made, data was verified as correct
    console.log('No corrections made - AI detection verified');
    return;
  }

  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    const trainingData = {
      image_url: imageUrl || null,
      board_brand: boardBrand || null,
      circuit_position: originalCircuit.position,
      // AI predictions
      ai_device_type: originalCircuit.device,
      ai_rating: originalCircuit.rating?.toString() || null,
      ai_curve: originalCircuit.curve || null,
      ai_label: originalCircuit.label,
      ai_confidence: originalCircuit.confidence,
      // User corrections (ground truth)
      correct_device_type: correctedCircuit.device,
      correct_rating: correctedCircuit.rating?.toString() || null,
      correct_curve: correctedCircuit.curve || null,
      correct_label: correctedCircuit.label,
      user_id: user?.id || null,
    };

    const { error } = await supabase
      .from('board_scanner_training')
      .insert(trainingData);

    if (error) {
      console.error('Failed to save training correction:', error);
    } else {
      console.log('Training correction saved:', {
        position: originalCircuit.position,
        deviceChange: originalCircuit.device !== correctedCircuit.device
          ? `${originalCircuit.device} → ${correctedCircuit.device}` : null,
        ratingChange: originalCircuit.rating !== correctedCircuit.rating
          ? `${originalCircuit.rating}A → ${correctedCircuit.rating}A` : null,
      });
    }
  } catch (error) {
    console.error('Error saving training correction:', error);
    // Don't throw - training data capture should never block the user
  }
}

// Comprehensive device types for UK consumer units
const deviceTypes = [
  { value: 'MCB', label: 'MCB', description: 'Miniature Circuit Breaker' },
  { value: 'RCBO', label: 'RCBO', description: 'RCD + MCB Combined' },
  { value: 'RCD', label: 'RCD', description: 'Residual Current Device' },
  { value: 'AFDD', label: 'AFDD', description: 'Arc Fault Detection Device' },
  { value: 'SPD', label: 'SPD', description: 'Surge Protection Device' },
  { value: 'MCCB', label: 'MCCB', description: 'Moulded Case Circuit Breaker' },
  { value: 'Main Switch', label: 'Main Switch', description: 'Main Isolator' },
  { value: 'Isolator', label: 'Isolator', description: 'Switch Disconnector' },
  { value: 'Contactor', label: 'Contactor', description: 'Power Contactor' },
  { value: 'Timer', label: 'Timer', description: 'Time Switch' },
  { value: 'Fuse', label: 'Fuse', description: 'BS88/BS3036 Fuse' },
  { value: 'HRC Fuse', label: 'HRC Fuse', description: 'High Rupturing Capacity Fuse' },
  { value: 'Blank', label: 'Blank', description: 'Blank/Spare Way' },
];

const curveTypes = [
  { value: 'B', label: 'Type B', description: '3-5× In (General use)' },
  { value: 'C', label: 'Type C', description: '5-10× In (Motors/Inductive)' },
  { value: 'D', label: 'Type D', description: '10-20× In (High inrush)' },
  { value: 'K', label: 'Type K', description: '8-12× In (Motor protection)' },
  { value: 'Z', label: 'Type Z', description: '2-3× In (Semiconductor)' },
];

// All standard ratings from 1A to 125A
const commonRatings = [1, 2, 3, 4, 5, 6, 10, 13, 16, 20, 25, 32, 40, 45, 50, 63, 80, 100, 125];

export const CircuitEditModal: React.FC<CircuitEditModalProps> = ({
  circuit,
  onSave,
  onClose,
  boardBrand,
  imageUrls,
}) => {
  // Store original circuit for comparison (not affected by edits)
  const [originalCircuit] = useState<DetectedCircuit>({ ...circuit });

  const [editedCircuit, setEditedCircuit] = useState<DetectedCircuit>({
    ...circuit,
    // Ensure confidence is upgraded to high after manual edit
    confidence: 'high',
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = useCallback((field: keyof DetectedCircuit, value: any) => {
    setEditedCircuit(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(async () => {
    setIsSaving(true);

    // Save training correction in background (non-blocking)
    saveTrainingCorrection(
      originalCircuit,
      editedCircuit,
      boardBrand,
      imageUrls?.[0]
    ).catch(err => console.error('Training save error:', err));

    // Call parent save immediately
    onSave(editedCircuit);
    setIsSaving(false);
  }, [originalCircuit, editedCircuit, boardBrand, imageUrls, onSave]);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 bg-background overflow-hidden">
        {/* Header with circuit number */}
        <DialogHeader className="px-4 pt-4 pb-3 border-b border-border/30 bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">{circuit.position}</span>
            </div>
            <div>
              <DialogTitle className="text-base">Edit Circuit</DialogTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {circuit.confidence === 'low' ? '⚠️ Low confidence - needs verification' :
                 circuit.confidence === 'medium' ? '⚠️ Medium confidence' : '✓ High confidence'}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="px-4 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Circuit Label */}
          <div className="space-y-2">
            <Label htmlFor="label" className="text-sm font-medium">Circuit Label</Label>
            <Input
              id="label"
              value={editedCircuit.label}
              onChange={(e) => handleChange('label', e.target.value)}
              placeholder="e.g., Kitchen Sockets"
              className="h-12 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
            />
          </div>

          {/* Device Type - Enhanced with descriptions */}
          <div className="space-y-2">
            <Label htmlFor="device" className="text-sm font-medium">Device Type</Label>
            <Select
              value={editedCircuit.device}
              onValueChange={(value) => handleChange('device', value)}
            >
              <SelectTrigger className="h-12 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                <SelectValue placeholder="Select device type" />
              </SelectTrigger>
              <SelectContent className="z-[100] max-h-[40vh] bg-elec-gray border-elec-gray">
                {deviceTypes.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    className="py-2.5 focus:bg-elec-yellow/20"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{type.label}</span>
                      <span className="text-xs text-muted-foreground">{type.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rating and Curve - Side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="rating" className="text-sm font-medium">Rating (A)</Label>
              <Select
                value={editedCircuit.rating?.toString() || ''}
                onValueChange={(value) => handleChange('rating', parseInt(value))}
              >
                <SelectTrigger className="h-12 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="z-[100] max-h-[40vh] bg-elec-gray border-elec-gray">
                  {commonRatings.map((rating) => (
                    <SelectItem key={rating} value={rating.toString()} className="py-2.5">
                      <span className="font-medium">{rating}A</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="curve" className="text-sm font-medium">Curve Type</Label>
              <Select
                value={editedCircuit.curve || ''}
                onValueChange={(value) => handleChange('curve', value)}
              >
                <SelectTrigger className="h-12 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="z-[100] bg-elec-gray border-elec-gray">
                  {curveTypes.map((curve) => (
                    <SelectItem key={curve.value} value={curve.value} className="py-2.5">
                      <div className="flex flex-col">
                        <span className="font-medium">{curve.label}</span>
                        <span className="text-xs text-muted-foreground">{curve.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Phase - styled as toggle buttons */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Phase</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={editedCircuit.phase !== '3P' ? 'default' : 'outline'}
                onClick={() => handleChange('phase', '1P')}
                className={`h-11 touch-manipulation ${
                  editedCircuit.phase !== '3P'
                    ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
                    : 'border-white/30'
                }`}
              >
                Single Phase (1P)
              </Button>
              <Button
                type="button"
                variant={editedCircuit.phase === '3P' ? 'default' : 'outline'}
                onClick={() => handleChange('phase', '3P')}
                className={`h-11 touch-manipulation ${
                  editedCircuit.phase === '3P'
                    ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
                    : 'border-white/30'
                }`}
              >
                Three Phase (3P)
              </Button>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">Notes (optional)</Label>
            <Textarea
              id="notes"
              value={editedCircuit.notes || ''}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Any additional notes..."
              className="min-h-[80px] text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
            />
          </div>

          {/* AI Evidence (read-only) */}
          {circuit.evidence && (
            <div className="space-y-2 bg-muted/30 rounded-lg p-3 border border-border/30">
              <Label className="text-xs text-muted-foreground uppercase tracking-wide">AI Detection Evidence</Label>
              <p className="text-sm text-foreground">
                {circuit.evidence}
              </p>
            </div>
          )}
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="px-4 py-4 border-t border-border/30 bg-background flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-12 touch-manipulation border-white/30"
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation font-medium"
            disabled={isSaving}
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CircuitEditModal;
