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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Customer } from '@/hooks/useCustomers';

const customerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().max(20, 'Phone must be less than 20 characters').optional().or(z.literal('')),
  address: z.string().max(500, 'Address must be less than 500 characters').optional().or(z.literal('')),
  notes: z.string().max(1000, 'Notes must be less than 1000 characters').optional().or(z.literal('')),
});

type CustomerFormData = z.infer<typeof customerSchema>;

interface CustomerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer?: Customer | null;
  onSave: (data: CustomerFormData) => Promise<void>;
}

export const CustomerForm = ({ open, onOpenChange, customer, onSave }: CustomerFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      notes: '',
    },
  });

  // Reset form when customer changes or dialog opens/closes
  useEffect(() => {
    if (open) {
      reset({
        name: customer?.name || '',
        email: customer?.email || '',
        phone: customer?.phone || '',
        address: customer?.address || '',
        notes: customer?.notes || '',
      });
    }
  }, [open, customer, reset]);

  const onSubmit = async (data: CustomerFormData) => {
    // Sanitize all inputs before saving
    const { sanitizeTextInput, sanitizeEmail, sanitizePhone } = await import('@/utils/inputSanitization');
    
    const sanitizedData: CustomerFormData = {
      name: sanitizeTextInput(data.name),
      email: data.email ? sanitizeEmail(data.email) : '',
      phone: data.phone ? sanitizePhone(data.phone) : '',
      address: data.address ? sanitizeTextInput(data.address) : '',
      notes: data.notes ? sanitizeTextInput(data.notes) : '',
    };
    
    await onSave(sanitizedData);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[500px] max-h-[90vh] overflow-y-auto bg-card border-border p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl text-foreground">
            {customer ? 'Edit Customer' : 'Add New Customer'}
          </DialogTitle>
          <DialogDescription className="text-sm text-neutral-400">
            {customer
              ? 'Update customer information below.'
              : 'Enter the customer details to add them to your database.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Name <span className="text-red-400">*</span>
            </Label>
            <Input
              id="name"
              {...register('name')}
              className="bg-background border-border text-foreground"
              placeholder="Enter customer name"
            />
            {errors.name && (
              <p className="text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              className="bg-background border-border text-foreground"
              placeholder="customer@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground">Phone</Label>
            <Input
              id="phone"
              {...register('phone')}
              className="bg-background border-border text-foreground"
              placeholder="01234 567890"
            />
            {errors.phone && (
              <p className="text-sm text-red-400">{errors.phone.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-foreground">Address</Label>
            <Textarea
              id="address"
              {...register('address')}
              className="bg-background border-border text-foreground resize-none"
              placeholder="Enter full address"
              rows={3}
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
              className="bg-background border-border text-foreground resize-none"
              placeholder="Add any additional notes..."
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
              className="w-full sm:w-auto h-11 sm:h-10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="accent"
              disabled={isSubmitting}
              className="w-full sm:w-auto h-11 sm:h-10"
            >
              {isSubmitting ? 'Saving...' : customer ? 'Update Customer' : 'Add Customer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
