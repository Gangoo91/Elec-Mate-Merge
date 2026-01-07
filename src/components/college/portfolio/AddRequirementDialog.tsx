/**
 * AddRequirementDialog
 *
 * Dialog for tutors to create or edit custom evidence requirements
 * for individual students.
 */

import React, { useState, useEffect } from 'react';
import {
  Camera,
  FileText,
  Award,
  ClipboardList,
  Users,
  BookOpen,
  Calendar,
  Video,
  PenTool,
  Calculator,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { EvidenceType, EvidenceTypeCode } from '@/types/evidence';

// Icon mapping for evidence types
const EVIDENCE_ICONS: Record<EvidenceTypeCode, React.ReactNode> = {
  photo: <Camera className="h-4 w-4" />,
  document: <FileText className="h-4 w-4" />,
  certificate: <Award className="h-4 w-4" />,
  test_result: <ClipboardList className="h-4 w-4" />,
  witness: <Users className="h-4 w-4" />,
  reflection: <BookOpen className="h-4 w-4" />,
  work_log: <Calendar className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  drawing: <PenTool className="h-4 w-4" />,
  calculation: <Calculator className="h-4 w-4" />,
};

interface RequirementFormData {
  title: string;
  description?: string;
  evidenceTypeCodes: EvidenceTypeCode[];
  quantityRequired: number;
  isMandatory: boolean;
  guidance?: string;
  dueDate?: string;
  categoryId?: string;
}

interface AddRequirementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: RequirementFormData) => Promise<void>;
  initialData?: RequirementFormData;
  evidenceTypes: EvidenceType[];
}

export function AddRequirementDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  evidenceTypes,
}: AddRequirementDialogProps) {
  const isEditing = !!initialData;

  const [formData, setFormData] = useState<RequirementFormData>({
    title: '',
    description: '',
    evidenceTypeCodes: [],
    quantityRequired: 1,
    isMandatory: true,
    guidance: '',
    dueDate: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when dialog opens/closes or initialData changes
  useEffect(() => {
    if (open) {
      if (initialData) {
        setFormData({
          title: initialData.title,
          description: initialData.description || '',
          evidenceTypeCodes: initialData.evidenceTypeCodes,
          quantityRequired: initialData.quantityRequired,
          isMandatory: initialData.isMandatory,
          guidance: initialData.guidance || '',
          dueDate: initialData.dueDate
            ? new Date(initialData.dueDate).toISOString().split('T')[0]
            : '',
        });
      } else {
        setFormData({
          title: '',
          description: '',
          evidenceTypeCodes: [],
          quantityRequired: 1,
          isMandatory: true,
          guidance: '',
          dueDate: '',
        });
      }
      setErrors({});
    }
  }, [open, initialData]);

  const toggleEvidenceType = (code: EvidenceTypeCode) => {
    setFormData((prev) => ({
      ...prev,
      evidenceTypeCodes: prev.evidenceTypeCodes.includes(code)
        ? prev.evidenceTypeCodes.filter((c) => c !== code)
        : [...prev.evidenceTypeCodes, code],
    }));
    // Clear error when user makes a selection
    if (errors.evidenceTypeCodes) {
      setErrors((prev) => ({ ...prev, evidenceTypeCodes: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (formData.evidenceTypeCodes.length === 0) {
      newErrors.evidenceTypeCodes = 'Select at least one evidence type';
    }

    if (formData.quantityRequired < 1) {
      newErrors.quantityRequired = 'Quantity must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        title: formData.title.trim(),
        description: formData.description?.trim() || undefined,
        evidenceTypeCodes: formData.evidenceTypeCodes,
        quantityRequired: formData.quantityRequired,
        isMandatory: formData.isMandatory,
        guidance: formData.guidance?.trim() || undefined,
        dueDate: formData.dueDate || undefined,
      });
      onOpenChange(false);
    } catch (err) {
      console.error('Failed to submit requirement:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-elec-dark border-elec-gray/40 max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Requirement' : 'Add Custom Requirement'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update the evidence requirement for this student'
              : 'Create a specific evidence requirement for this student'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, title: e.target.value }));
                if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
              }}
              placeholder="e.g., Site visit photos"
              className="bg-white/5 border-elec-gray/40"
            />
            {errors.title && <p className="text-xs text-red-400">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Optional details about what evidence is needed..."
              rows={2}
              className="bg-white/5 border-elec-gray/40 resize-none"
            />
          </div>

          {/* Evidence Types */}
          <div className="space-y-2">
            <Label>Evidence Types *</Label>
            <p className="text-xs text-white/50">
              Select the types of evidence the student can upload
            </p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {evidenceTypes.map((type) => {
                const isSelected = formData.evidenceTypeCodes.includes(type.code as EvidenceTypeCode);
                return (
                  <button
                    key={type.code}
                    type="button"
                    onClick={() => toggleEvidenceType(type.code as EvidenceTypeCode)}
                    className={cn(
                      'flex items-center gap-2 p-2 rounded-lg border transition-colors text-left',
                      isSelected
                        ? 'border-elec-yellow bg-elec-yellow/10'
                        : 'border-elec-gray/40 hover:border-elec-gray/60 bg-white/5'
                    )}
                  >
                    <span style={{ color: type.color }}>
                      {EVIDENCE_ICONS[type.code as EvidenceTypeCode]}
                    </span>
                    <span className="text-sm">{type.name}</span>
                  </button>
                );
              })}
            </div>
            {formData.evidenceTypeCodes.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {formData.evidenceTypeCodes.map((code) => {
                  const type = evidenceTypes.find((t) => t.code === code);
                  return type ? (
                    <Badge key={code} variant="secondary" className="text-xs">
                      {type.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            )}
            {errors.evidenceTypeCodes && (
              <p className="text-xs text-red-400">{errors.evidenceTypeCodes}</p>
            )}
          </div>

          {/* Quantity & Mandatory */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity Required</Label>
              <Input
                id="quantity"
                type="number"
                min={1}
                max={20}
                value={formData.quantityRequired}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    quantityRequired: Math.max(1, parseInt(e.target.value) || 1),
                  }))
                }
                className="bg-white/5 border-elec-gray/40"
              />
              {errors.quantityRequired && (
                <p className="text-xs text-red-400">{errors.quantityRequired}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Mandatory?</Label>
              <div className="flex items-center gap-3 pt-2">
                <Switch
                  checked={formData.isMandatory}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, isMandatory: checked }))
                  }
                />
                <span className="text-sm text-white/70">
                  {formData.isMandatory ? 'Required' : 'Optional'}
                </span>
              </div>
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date (Optional)</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, dueDate: e.target.value }))}
              className="bg-white/5 border-elec-gray/40"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Guidance */}
          <div className="space-y-2">
            <Label htmlFor="guidance">Guidance for Student</Label>
            <Textarea
              id="guidance"
              value={formData.guidance}
              onChange={(e) => setFormData((prev) => ({ ...prev, guidance: e.target.value }))}
              placeholder="Tips or specific instructions for the student..."
              rows={2}
              className="bg-white/5 border-elec-gray/40 resize-none"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-elec-gray/40"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? 'Saving...'
                : isEditing
                ? 'Update Requirement'
                : 'Add Requirement'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddRequirementDialog;
