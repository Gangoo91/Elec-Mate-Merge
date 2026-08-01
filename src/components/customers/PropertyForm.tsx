import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { CustomerProperty } from '@/hooks/inspection/useCustomerProperties';
import { cn } from '@/lib/utils';

const propertySchema = z.object({
  address: z
    .string()
    .min(1, 'Address is required')
    .max(500, 'Address must be less than 500 characters'),
  propertyType: z.enum(['residential', 'commercial', 'industrial']),
  notes: z
    .string()
    .max(1000, 'Notes must be less than 1000 characters')
    .optional()
    .or(z.literal('')),
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface PropertyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property?: CustomerProperty | null;
  onSave: (data: PropertyFormData) => void;
}

const propertyTypes = [
  { value: 'residential' as const, label: 'Residential', description: 'House, flat, domestic' },
  { value: 'commercial' as const, label: 'Commercial', description: 'Office, shop, business' },
  { value: 'industrial' as const, label: 'Industrial', description: 'Factory, warehouse' },
];

export const PropertyForm = ({ open, onOpenChange, property, onSave }: PropertyFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      address: '',
      propertyType: 'residential',
      notes: '',
    },
  });

  const selectedType = watch('propertyType');

  useEffect(() => {
    if (open) {
      reset({
        address: property?.address || '',
        propertyType: property?.propertyType || 'residential',
        notes: property?.notes || '',
      });
    }
  }, [open, property, reset]);

  const onSubmit = async (data: PropertyFormData) => {
    const { sanitizeTextInput } = await import('@/utils/inputSanitization');

    const sanitizedData: PropertyFormData = {
      address: sanitizeTextInput(data.address),
      propertyType: data.propertyType,
      notes: data.notes ? sanitizeTextInput(data.notes) : '',
    };

    onSave(sanitizedData);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[500px] max-h-[90vh] overflow-y-auto bg-card border-border p-0">
        <DialogHeader className="px-5 pt-5 pb-0">
          <DialogTitle className="text-lg font-bold text-foreground">
            {property ? 'Edit Property' : 'Add Property'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="px-5 pb-5 space-y-5 mt-3">
          {/* Property Type — tappable cards */}
          <div className="space-y-2.5">
            <Label className="text-[13px] font-medium text-white">
              Property Type
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {propertyTypes.map((type) => {
                const isSelected = selectedType === type.value;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setValue('propertyType', type.value)}
                    className={cn(
                      'flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-xl border p-3 transition-all touch-manipulation',
                      isSelected
                        ? 'border-elec-yellow bg-elec-yellow'
                        : 'border-white/[0.1] bg-white/[0.04] hover:border-white/[0.25]'
                    )}
                  >
                    <span
                      className={cn(
                        'text-[12.5px] font-semibold',
                        isSelected ? 'text-black' : 'text-white'
                      )}
                    >
                      {type.label}
                    </span>
                    <span
                      className={cn(
                        'text-center text-[10px] leading-tight',
                        isSelected ? 'text-black/70' : 'text-white/55'
                      )}
                    >
                      {type.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2.5">
            <Label
              htmlFor="address"
              className="text-[13px] font-medium text-white flex items-center gap-1.5"
            >
              Address
            </Label>
            <Textarea
              id="address"
              {...register('address')}
              className="bg-background border-border text-foreground text-base resize-none min-h-[100px] rounded-xl touch-manipulation focus:border-elec-yellow/50 focus:ring-1 focus:ring-elec-yellow/20"
              placeholder="Enter full property address"
              rows={4}
            />
            {errors.address && <p className="text-xs text-red-400">{errors.address.message}</p>}
          </div>

          {/* Notes */}
          <div className="space-y-2.5">
            <Label
              htmlFor="notes"
              className="text-[13px] font-medium text-white flex items-center gap-1.5"
            >
              Notes{' '}
              <span className="normal-case tracking-normal text-white">
                (optional)
              </span>
            </Label>
            <Textarea
              id="notes"
              {...register('notes')}
              className="bg-background border-border text-foreground text-base resize-none rounded-xl touch-manipulation focus:border-elec-yellow/50 focus:ring-1 focus:ring-elec-yellow/20"
              placeholder="Access instructions, key safe codes, etc."
              rows={3}
            />
            {errors.notes && <p className="text-xs text-red-400">{errors.notes.message}</p>}
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-1">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="w-full sm:w-auto h-11 touch-manipulation"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="accent"
              disabled={isSubmitting}
              className="w-full sm:w-auto h-11 touch-manipulation"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : property ? (
                'Update Property'
              ) : (
                'Add Property'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
