/**
 * AddRequirementDialog
 * Dialog for tutors to create or edit custom evidence requirements.
 */

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import {
  Pill,
  Field,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  Eyebrow,
  inputClass,
  textareaClass,
  fieldLabelClass,
} from '@/components/college/primitives';
import type { EvidenceType, EvidenceTypeCode } from '@/types/evidence';

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
    if (errors.evidenceTypeCodes) {
      setErrors((prev) => ({ ...prev, evidenceTypeCodes: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (formData.evidenceTypeCodes.length === 0)
      newErrors.evidenceTypeCodes = 'Select at least one evidence type';
    if (formData.quantityRequired < 1) newErrors.quantityRequired = 'Quantity must be at least 1';
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
      <DialogContent className="bg-[hsl(0_0%_12%)] border-white/[0.08] max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <Eyebrow>Portfolio</Eyebrow>
          <DialogTitle className="mt-1 text-white">
            {isEditing ? 'Edit requirement' : 'Add custom requirement'}
          </DialogTitle>
          <DialogDescription className="text-[12.5px] text-white">
            {isEditing
              ? 'Update the evidence requirement for this student.'
              : 'Create a specific evidence requirement for this student.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          <Field label="Title" required>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, title: e.target.value }));
                if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
              }}
              placeholder="e.g. Site visit photos"
              className={inputClass}
            />
            {errors.title && <p className="text-[11px] text-red-400">{errors.title}</p>}
          </Field>

          <Field label="Description">
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Optional details about what evidence is needed…"
              rows={2}
              className={textareaClass}
            />
          </Field>

          <div className="space-y-2">
            <label className={fieldLabelClass}>
              Evidence types<span className="ml-1 text-elec-yellow">*</span>
            </label>
            <p className="text-[11px] text-white">
              Select the types of evidence the student can upload.
            </p>
            <div className="grid grid-cols-2 gap-1.5 mt-1">
              {evidenceTypes.map((type) => {
                const isSelected = formData.evidenceTypeCodes.includes(
                  type.code as EvidenceTypeCode
                );
                return (
                  <button
                    key={type.code}
                    type="button"
                    onClick={() => toggleEvidenceType(type.code as EvidenceTypeCode)}
                    className={cn(
                      'flex items-center justify-center gap-2 h-11 px-3 rounded-xl border transition-colors text-[12.5px] font-medium touch-manipulation',
                      isSelected
                        ? 'border-elec-yellow/60 bg-elec-yellow/[0.08] text-white'
                        : 'border-white/[0.08] bg-[hsl(0_0%_9%)] text-white hover:text-white'
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        isSelected ? 'bg-elec-yellow' : 'bg-white/30'
                      )}
                    />
                    {type.name}
                  </button>
                );
              })}
            </div>
            {formData.evidenceTypeCodes.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {formData.evidenceTypeCodes.map((code) => {
                  const type = evidenceTypes.find((t) => t.code === code);
                  return type ? <Pill key={code} tone="yellow">{type.name}</Pill> : null;
                })}
              </div>
            )}
            {errors.evidenceTypeCodes && (
              <p className="text-[11px] text-red-400">{errors.evidenceTypeCodes}</p>
            )}
          </div>

          <FormGrid cols={2}>
            <Field label="Quantity required">
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
                className={cn(inputClass, 'tabular-nums')}
              />
              {errors.quantityRequired && (
                <p className="text-[11px] text-red-400">{errors.quantityRequired}</p>
              )}
            </Field>

            <Field label="Mandatory?">
              <div className="flex items-center gap-3 pt-2">
                <Switch
                  checked={formData.isMandatory}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, isMandatory: checked }))
                  }
                />
                <span className="text-[13px] text-white">
                  {formData.isMandatory ? 'Required' : 'Optional'}
                </span>
              </div>
            </Field>
          </FormGrid>

          <Field label="Due date (optional)">
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, dueDate: e.target.value }))}
              className={cn(inputClass, 'tabular-nums')}
              min={new Date().toISOString().split('T')[0]}
            />
          </Field>

          <Field label="Guidance for student">
            <Textarea
              id="guidance"
              value={formData.guidance}
              onChange={(e) => setFormData((prev) => ({ ...prev, guidance: e.target.value }))}
              placeholder="Tips or specific instructions for the student…"
              rows={2}
              className={textareaClass}
            />
          </Field>

          <DialogFooter className="flex items-center justify-end gap-4 pt-3">
            <SecondaryButton onClick={() => onOpenChange(false)}>Cancel</SecondaryButton>
            <PrimaryButton type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? 'Saving…'
                : isEditing
                  ? 'Update requirement →'
                  : 'Add requirement →'}
            </PrimaryButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddRequirementDialog;
