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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Customer } from '@/hooks/useCustomers';
import { useMediaQuery } from '@/hooks/useMediaQuery';

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

// Form content component to avoid duplication
const FormContent = ({
  customer,
  register,
  errors,
  isSubmitting,
  handleSubmit,
  onSubmit,
  onOpenChange,
}: {
  customer?: Customer | null;
  register: ReturnType<typeof useForm<CustomerFormData>>['register'];
  errors: ReturnType<typeof useForm<CustomerFormData>>['formState']['errors'];
  isSubmitting: boolean;
  handleSubmit: ReturnType<typeof useForm<CustomerFormData>>['handleSubmit'];
  onSubmit: (data: CustomerFormData) => Promise<void>;
  onOpenChange: (open: boolean) => void;
}) => (
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    {/* Name */}
    <div className="space-y-2">
      <Label htmlFor="name" className="text-sm font-medium text-foreground">
        Name <span className="text-red-400">*</span>
      </Label>
      <Input
        id="name"
        {...register('name')}
        className="h-12 bg-white/[0.02] border-white/10 focus:border-blue-500 focus:ring-blue-500/20 text-foreground rounded-xl"
        placeholder="Enter customer name"
      />
      {errors.name && (
        <p className="text-sm text-red-400">{errors.name.message}</p>
      )}
    </div>

    {/* Email */}
    <div className="space-y-2">
      <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
      <Input
        id="email"
        type="email"
        {...register('email')}
        className="h-12 bg-white/[0.02] border-white/10 focus:border-blue-500 focus:ring-blue-500/20 text-foreground rounded-xl"
        placeholder="customer@example.com"
      />
      {errors.email && (
        <p className="text-sm text-red-400">{errors.email.message}</p>
      )}
    </div>

    {/* Phone */}
    <div className="space-y-2">
      <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone</Label>
      <Input
        id="phone"
        {...register('phone')}
        className="h-12 bg-white/[0.02] border-white/10 focus:border-blue-500 focus:ring-blue-500/20 text-foreground rounded-xl"
        placeholder="01234 567890"
      />
      {errors.phone && (
        <p className="text-sm text-red-400">{errors.phone.message}</p>
      )}
    </div>

    {/* Address */}
    <div className="space-y-2">
      <Label htmlFor="address" className="text-sm font-medium text-foreground">Address</Label>
      <Textarea
        id="address"
        {...register('address')}
        className="bg-white/[0.02] border-white/10 focus:border-blue-500 focus:ring-blue-500/20 text-foreground resize-none rounded-xl min-h-[80px]"
        placeholder="Enter full address"
        rows={3}
      />
      {errors.address && (
        <p className="text-sm text-red-400">{errors.address.message}</p>
      )}
    </div>

    {/* Notes */}
    <div className="space-y-2">
      <Label htmlFor="notes" className="text-sm font-medium text-foreground">Notes</Label>
      <Textarea
        id="notes"
        {...register('notes')}
        className="bg-white/[0.02] border-white/10 focus:border-blue-500 focus:ring-blue-500/20 text-foreground resize-none rounded-xl min-h-[80px]"
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
        className="w-full sm:w-auto h-12 sm:h-11 bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] rounded-xl"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto h-12 sm:h-11 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0 shadow-lg shadow-blue-500/20 rounded-xl"
      >
        {isSubmitting ? 'Saving...' : customer ? 'Update Customer' : 'Add Customer'}
      </Button>
    </div>
  </form>
);

export const CustomerForm = ({ open, onOpenChange, customer, onSave }: CustomerFormProps) => {
  const isMobile = useMediaQuery('(max-width: 640px)');

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

  const title = customer ? 'Edit Customer' : 'Add New Customer';
  const description = customer
    ? 'Update customer information below.'
    : 'Enter the customer details to add them to your database.';

  // Mobile: Bottom Sheet
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="h-[85vh] rounded-t-2xl p-0 overflow-hidden bg-card/95 backdrop-blur-xl border-white/10"
        >
          {/* Drag handle */}
          <div className="flex justify-center py-3">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <div className="px-4 pb-8 overflow-y-auto h-[calc(85vh-48px)]">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-lg font-bold text-foreground">{title}</SheetTitle>
              <SheetDescription className="text-sm text-muted-foreground">
                {description}
              </SheetDescription>
            </SheetHeader>

            <FormContent
              customer={customer}
              register={register}
              errors={errors}
              isSubmitting={isSubmitting}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              onOpenChange={onOpenChange}
            />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: Dialog
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[500px] max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-white/10 p-4 sm:p-6 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl text-foreground">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <FormContent
            customer={customer}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            onOpenChange={onOpenChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
