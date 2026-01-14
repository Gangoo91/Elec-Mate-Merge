import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Home, Building2, Factory } from 'lucide-react';
import { CustomerProperty } from '@/hooks/inspection/useCustomerProperties';

const propertySchema = z.object({
  address: z.string().min(1, 'Address is required').max(500, 'Address must be less than 500 characters'),
  propertyType: z.enum(['residential', 'commercial', 'industrial']),
  notes: z.string().max(1000, 'Notes must be less than 1000 characters').optional().or(z.literal('')),
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface PropertyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property?: CustomerProperty | null;
  onSave: (data: PropertyFormData) => void;
}

const propertyTypes = [
  { value: 'residential', label: 'Residential', icon: Home, description: 'House, flat, or domestic property' },
  { value: 'commercial', label: 'Commercial', icon: Building2, description: 'Office, shop, or business premises' },
  { value: 'industrial', label: 'Industrial', icon: Factory, description: 'Factory, warehouse, or industrial site' },
] as const;

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
      <DialogContent className="w-[calc(100%-2rem)] max-w-[500px] max-h-[90vh] overflow-y-auto bg-card border-border p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl text-foreground">
            {property ? 'Edit Property' : 'Add New Property'}
          </DialogTitle>
          <DialogDescription className="text-sm text-neutral-400">
            {property
              ? 'Update property details below.'
              : 'Add a new property for this customer.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Property Type */}
          <div className="space-y-2">
            <Label className="text-foreground">
              Property Type <span className="text-red-400">*</span>
            </Label>
            <Select
              value={selectedType}
              onValueChange={(value) => setValue('propertyType', value as PropertyFormData['propertyType'])}
            >
              <SelectTrigger className="h-11 touch-manipulation bg-background border-border">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {propertyTypes.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    className="min-h-[48px] touch-manipulation"
                  >
                    <div className="flex items-center gap-2">
                      <type.icon className="h-4 w-4" />
                      <div>
                        <span className="font-medium">{type.label}</span>
                        <span className="text-xs text-muted-foreground ml-2 hidden sm:inline">
                          {type.description}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-foreground">
              Address <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="address"
              {...register('address')}
              className="bg-background border-border text-foreground resize-none min-h-[100px] touch-manipulation"
              placeholder="Enter full property address"
              rows={4}
            />
            {errors.address && (
              <p className="text-sm text-red-400">{errors.address.message}</p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-foreground">Notes</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              className="bg-background border-border text-foreground resize-none touch-manipulation"
              placeholder="Access instructions, key safe codes, etc."
              rows={3}
            />
            {errors.notes && (
              <p className="text-sm text-red-400">{errors.notes.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4">
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
              {isSubmitting ? 'Saving...' : property ? 'Update Property' : 'Add Property'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
