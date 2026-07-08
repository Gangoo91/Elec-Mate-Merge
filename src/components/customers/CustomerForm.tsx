import React, { useEffect, useState } from 'react';
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
import { Customer, CustomerStatus } from '@/hooks/inspection/useCustomers';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const customerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  companyName: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().max(20, 'Phone must be less than 20 characters').optional().or(z.literal('')),
  address: z
    .string()
    .max(500, 'Address must be less than 500 characters')
    .optional()
    .or(z.literal('')),
  notes: z
    .string()
    .max(1000, 'Notes must be less than 1000 characters')
    .optional()
    .or(z.literal('')),
});

type CustomerFormData = z.infer<typeof customerSchema>;
type SubmitPayload = CustomerFormData & { tags: string[]; status: CustomerStatus };

const STATUS_OPTIONS: { value: CustomerStatus; label: string; hint: string }[] = [
  { value: 'lead', label: 'Lead', hint: 'Quoted or enquiring — not won yet' },
  { value: 'active', label: 'Active', hint: 'Current or recent customer' },
  { value: 'inactive', label: 'Inactive', hint: 'No longer working with them' },
];

interface CustomerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer?: Customer | null;
  onSave: (data: SubmitPayload) => Promise<void>;
}

// Pre-baked tag suggestions surfaced to nudge consistent categorisation.
const SUGGESTED_TAGS = [
  'Residential',
  'Commercial',
  'Landlord',
  'Letting Agent',
  'Contractor',
  'Repeat',
  'High-value',
];

const normaliseTag = (raw: string): string =>
  raw
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, 32);

// TagInput — pill list + suggestions + free-form add (Enter or comma).
const TagInput = ({
  value,
  onChange,
}: {
  value: string[];
  onChange: (next: string[]) => void;
}) => {
  const [draft, setDraft] = useState('');

  const add = (raw: string) => {
    const t = normaliseTag(raw);
    if (!t) return;
    if (value.some((v) => v.toLowerCase() === t.toLowerCase())) {
      setDraft('');
      return;
    }
    onChange([...value, t]);
    setDraft('');
  };
  const remove = (tag: string) => {
    onChange(value.filter((v) => v !== tag));
  };

  const availableSuggestions = SUGGESTED_TAGS.filter(
    (s) => !value.some((v) => v.toLowerCase() === s.toLowerCase())
  );

  return (
    <div className="space-y-2.5">
      {/* Current tags */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((tag) => (
            <span
              key={tag}
              className="inline-flex h-7 items-center gap-1.5 rounded-full border border-elec-yellow/30 bg-elec-yellow/[0.08] pl-3 pr-1 text-[12px] font-medium text-elec-yellow"
            >
              {tag}
              <button
                type="button"
                onClick={() => remove(tag)}
                className="flex h-5 w-5 items-center justify-center rounded-full text-elec-yellow/70 transition-colors hover:bg-elec-yellow/15 hover:text-elec-yellow touch-manipulation"
                aria-label={`Remove ${tag}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Add input */}
      <Input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            add(draft);
          }
          if (e.key === 'Backspace' && !draft && value.length > 0) {
            remove(value[value.length - 1]);
          }
        }}
        onBlur={() => {
          if (draft.trim()) add(draft);
        }}
        placeholder="Add tag and press Enter"
        className="h-10 rounded-xl border-white/10 bg-white/[0.02] text-foreground placeholder:text-white/35 focus:border-elec-yellow/40 focus:ring-elec-yellow/20"
      />

      {/* Suggestions */}
      {availableSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {availableSuggestions.slice(0, 6).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => add(s)}
              className="inline-flex h-7 items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 text-[11.5px] font-medium text-white/65 transition-colors hover:border-elec-yellow/30 hover:bg-white/[0.08] hover:text-elec-yellow touch-manipulation"
            >
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Form content component to avoid duplication
const FormContent = ({
  customer,
  register,
  errors,
  isSubmitting,
  handleSubmit,
  onSubmit,
  onOpenChange,
  tags,
  setTags,
  status,
  setStatus,
}: {
  customer?: Customer | null;
  register: ReturnType<typeof useForm<CustomerFormData>>['register'];
  errors: ReturnType<typeof useForm<CustomerFormData>>['formState']['errors'];
  isSubmitting: boolean;
  handleSubmit: ReturnType<typeof useForm<CustomerFormData>>['handleSubmit'];
  onSubmit: (data: CustomerFormData) => Promise<void>;
  onOpenChange: (open: boolean) => void;
  tags: string[];
  setTags: (next: string[]) => void;
  status: CustomerStatus;
  setStatus: (next: CustomerStatus) => void;
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
        className="h-12 rounded-xl border-white/10 bg-white/[0.02] text-foreground focus:border-elec-yellow/50 focus:ring-elec-yellow/20"
        placeholder="Enter customer name"
      />
      {errors.name && <p className="text-sm text-red-400">{errors.name.message}</p>}
    </div>

    {/* Company name — for commercial customers, agents, landlords */}
    <div className="space-y-2">
      <Label htmlFor="companyName" className="text-sm font-medium text-foreground">
        Company <span className="text-white/40 font-normal">(optional)</span>
      </Label>
      <Input
        id="companyName"
        {...register('companyName')}
        className="h-12 rounded-xl border-white/10 bg-white/[0.02] text-foreground focus:border-elec-yellow/50 focus:ring-elec-yellow/20"
        placeholder="e.g. Smith Lettings Ltd"
      />
      {errors.companyName && <p className="text-sm text-red-400">{errors.companyName.message}</p>}
    </div>

    {/* Status */}
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">Status</Label>
      <div className="flex p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setStatus(opt.value)}
            className={cn(
              'flex-1 h-10 text-sm font-medium rounded-lg transition-all touch-manipulation',
              status === opt.value ? 'bg-elec-yellow text-black' : 'text-white'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <p className="text-[12px] text-white/50">
        {STATUS_OPTIONS.find((o) => o.value === status)?.hint}
      </p>
    </div>

    {/* Email */}
    <div className="space-y-2">
      <Label htmlFor="email" className="text-sm font-medium text-foreground">
        Email
      </Label>
      <Input
        id="email"
        type="email"
        {...register('email')}
        className="h-12 rounded-xl border-white/10 bg-white/[0.02] text-foreground focus:border-elec-yellow/50 focus:ring-elec-yellow/20"
        placeholder="customer@example.com"
      />
      {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
    </div>

    {/* Phone */}
    <div className="space-y-2">
      <Label htmlFor="phone" className="text-sm font-medium text-foreground">
        Phone
      </Label>
      <Input
        id="phone"
        {...register('phone')}
        className="h-12 rounded-xl border-white/10 bg-white/[0.02] text-foreground focus:border-elec-yellow/50 focus:ring-elec-yellow/20"
        placeholder="01234 567890"
      />
      {errors.phone && <p className="text-sm text-red-400">{errors.phone.message}</p>}
    </div>

    {/* Address */}
    <div className="space-y-2">
      <Label htmlFor="address" className="text-sm font-medium text-foreground">
        Address
      </Label>
      <Textarea
        id="address"
        {...register('address')}
        className="min-h-[80px] resize-none rounded-xl border-white/10 bg-white/[0.02] text-foreground focus:border-elec-yellow/50 focus:ring-elec-yellow/20"
        placeholder="Enter full address"
        rows={3}
      />
      {errors.address && <p className="text-sm text-red-400">{errors.address.message}</p>}
    </div>

    {/* Tags */}
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">Tags</Label>
      <TagInput value={tags} onChange={setTags} />
    </div>

    {/* Notes */}
    <div className="space-y-2">
      <Label htmlFor="notes" className="text-sm font-medium text-foreground">
        Notes
      </Label>
      <Textarea
        id="notes"
        {...register('notes')}
        className="min-h-[80px] resize-none rounded-xl border-white/10 bg-white/[0.02] text-foreground focus:border-elec-yellow/50 focus:ring-elec-yellow/20"
        placeholder="Add any additional notes…"
        rows={3}
      />
      {errors.notes && <p className="text-sm text-red-400">{errors.notes.message}</p>}
    </div>

    {/* Actions */}
    <div className="flex flex-col-reverse justify-end gap-2 pt-4 sm:flex-row sm:gap-3">
      <Button
        type="button"
        variant="ghost"
        onClick={() => onOpenChange(false)}
        disabled={isSubmitting}
        className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] sm:h-11 sm:w-auto"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-xl border-0 bg-elec-yellow font-semibold text-black hover:bg-elec-yellow/90 sm:h-11 sm:w-auto"
      >
        {isSubmitting ? 'Saving…' : customer ? 'Update customer' : 'Add customer'}
      </Button>
    </div>
  </form>
);

export const CustomerForm = ({ open, onOpenChange, customer, onSave }: CustomerFormProps) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [tags, setTags] = useState<string[]>([]);
  const [status, setStatus] = useState<CustomerStatus>('active');

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
        companyName: customer?.companyName || '',
        email: customer?.email || '',
        phone: customer?.phone || '',
        address: customer?.address || '',
        notes: customer?.notes || '',
      });
      setTags(customer?.tags ? [...customer.tags] : []);
      setStatus(customer?.status || 'active');
    }
  }, [open, customer, reset]);

  const onSubmit = async (data: CustomerFormData) => {
    // Sanitize all inputs before saving
    const { sanitizeTextInput, sanitizeEmail, sanitizePhone } = await import(
      '@/utils/inputSanitization'
    );

    const sanitizedData: SubmitPayload = {
      name: sanitizeTextInput(data.name),
      companyName: data.companyName ? sanitizeTextInput(data.companyName) : '',
      email: data.email ? sanitizeEmail(data.email) : '',
      phone: data.phone ? sanitizePhone(data.phone) : '',
      address: data.address ? sanitizeTextInput(data.address) : '',
      notes: data.notes ? sanitizeTextInput(data.notes) : '',
      tags,
      status,
    };

    await onSave(sanitizedData);
    reset();
    setTags([]);
  };

  const title = customer ? 'Edit customer' : 'Add new customer';
  const description = customer
    ? 'Update customer information below.'
    : 'Enter the customer details to add them to your database.';

  // Mobile: Bottom Sheet
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="h-[85vh] overflow-hidden rounded-t-2xl border-white/10 bg-card/95 p-0 backdrop-blur-xl"
        >
          {/* Drag handle */}
          <div className="flex justify-center py-3">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          <div className="h-[calc(85vh-48px)] overflow-y-auto px-4 pb-8">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-lg font-bold text-foreground">{title}</SheetTitle>
              <SheetDescription className="text-sm text-white">{description}</SheetDescription>
            </SheetHeader>

            <FormContent
              customer={customer}
              register={register}
              errors={errors}
              isSubmitting={isSubmitting}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              onOpenChange={onOpenChange}
              tags={tags}
              setTags={setTags}
              status={status}
              setStatus={setStatus}
            />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: Dialog
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-[500px] overflow-y-auto rounded-2xl border-white/10 bg-card/95 p-4 backdrop-blur-xl sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg text-foreground sm:text-xl">{title}</DialogTitle>
          <DialogDescription className="text-sm text-white">{description}</DialogDescription>
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
            tags={tags}
            setTags={setTags}
            status={status}
            setStatus={setStatus}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
