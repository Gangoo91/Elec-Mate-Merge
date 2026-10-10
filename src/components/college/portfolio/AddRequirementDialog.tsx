/**
 * AddRequirementDialog
 * Wide sheet (bottom sheet on phone) for tutors to create or edit custom evidence requirements.
 */

import React, { useState, useEffect } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
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
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Portfolio"
      title={isEditing ? 'Edit requirement' : 'Add custom requirement'}
      description={
        isEditing
          ? 'Update the evidence requirement for this learner.'
          : 'Ask this learner for a specific piece of evidence, on top of the qualification criteria.'
      }
      footer={
        <div className="flex items-center justify-end gap-3">
          <SecondaryButton onClick={() => onOpenChange(false)}>Cancel</SecondaryButton>
          <PrimaryButton
            disabled={isSubmitting}
            onClick={() =>
              (
                document.getElementById('add-requirement-form') as HTMLFormElement | null
              )?.requestSubmit()
            }
          >
            {isSubmitting ? 'Saving…' : isEditing ? 'Update requirement' : 'Add requirement'}
          </PrimaryButton>
        </div>
      }
    >
      <form
        id="add-requirement-form"
        onSubmit={handleSubmit}
        className="grid gap-6 lg:grid-cols-2 lg:gap-10"
      >
        <div className="space-y-5">
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
            {errors.title && <p className="text-[12px] text-red-400">{errors.title}</p>}
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
        </div>
        <div className="space-y-5">
          <div className="space-y-2">
            <label className={fieldLabelClass}>
              Evidence types<span className="ml-1 text-elec-yellow">*</span>
            </label>
            <p className="text-[12px] text-white">
              Select the types of evidence the student can upload.
            </p>
            <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-3">
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
                        ? 'border-white bg-white font-semibold text-black'
                        : 'border-white/[0.12] bg-white/[0.06] text-white'
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        isSelected ? 'bg-black' : 'bg-white/30'
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
                  return type ? (
                    <Pill key={code} tone="yellow">
                      {type.name}
                    </Pill>
                  ) : null;
                })}
              </div>
            )}
            {errors.evidenceTypeCodes && (
              <p className="text-[12px] text-red-400">{errors.evidenceTypeCodes}</p>
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
                <p className="text-[12px] text-red-400">{errors.quantityRequired}</p>
              )}
            </Field>

            <Field label="Mandatory?">
              <label className="flex min-h-11 cursor-pointer items-center gap-3 touch-manipulation">
                <Switch
                  checked={formData.isMandatory}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, isMandatory: checked }))
                  }
                />
                <span className="text-[13px] text-white">
                  {formData.isMandatory ? 'Required' : 'Optional'}
                </span>
              </label>
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
        </div>
      </form>
    </FormSheet>
  );
}

export default AddRequirementDialog;
