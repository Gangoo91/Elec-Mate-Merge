import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Camera,
  Upload,
  X,
  Wrench,
  Car,
  ParkingCircle,
  Hammer,
  HardHat,
  GraduationCap,
  UtensilsCrossed,
  Package,
  Receipt,
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { EXPENSE_CATEGORIES, formatCurrency } from '@/hooks/useExpenses';
import type { ExpenseClaim } from '@/services/financeService';
import {
  Field,
  FormCard,
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  IconButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  textareaClass,
} from '@/components/employer/editorial';

interface CreateExpenseSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<ExpenseClaim, 'id' | 'created_at' | 'updated_at' | 'employees'>) => void;
  employees: { id: string; name: string }[];
  jobs?: { id: string; title: string }[];
  isSubmitting?: boolean;
  employeeMode?: boolean; // When true, auto-assigns to current user (no employee dropdown)
  currentEmployeeId?: string; // The employee ID to use in employee mode
}

const categoryIcons: Record<string, React.ElementType> = {
  Materials: Wrench,
  Travel: Car,
  Parking: ParkingCircle,
  Tools: Hammer,
  PPE: HardHat,
  Training: GraduationCap,
  Meals: UtensilsCrossed,
  Other: Package,
};

const formSchema = z.object({
  employee_id: z.string().min(1, 'Select an employee'),
  amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Select a category'),
  job_id: z.string().nullable().optional(),
  receipt_url: z.string().nullable().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function CreateExpenseSheet({
  open,
  onOpenChange,
  onSubmit,
  employees,
  jobs = [],
  isSubmitting,
  employeeMode = false,
  currentEmployeeId,
}: CreateExpenseSheetProps) {
  const isMobile = useIsMobile();
  const [step, setStep] = useState(1);
  const totalSteps = employeeMode ? 3 : 4; // Skip employee step in employee mode

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee_id: employeeMode && currentEmployeeId ? currentEmployeeId : '',
      amount: 0,
      description: '',
      category: '',
      job_id: null,
      receipt_url: null,
    },
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;
  const values = watch();

  const handleClose = () => {
    reset();
    setStep(1);
    onOpenChange(false);
  };

  const handleFormSubmit = (data: FormData) => {
    onSubmit({
      ...data,
      status: 'Pending',
      submitted_date: new Date().toISOString().split('T')[0],
      approved_by: null,
      approved_date: null,
      paid_date: null,
      rejection_reason: null,
    } as any);
    handleClose();
  };

  const canProceed = () => {
    if (employeeMode) {
      // Employee mode: 3 steps (Amount → Category → Receipt/Review)
      switch (step) {
        case 1:
          return values.amount > 0 && values.description;
        case 2:
          return values.category;
        case 3:
          return true;
        default:
          return false;
      }
    } else {
      // Admin mode: 4 steps (Basic Info → Category → Receipt → Review)
      switch (step) {
        case 1:
          return values.employee_id && values.amount > 0 && values.description;
        case 2:
          return values.category;
        case 3:
          return true; // Receipt is optional
        case 4:
          return true;
        default:
          return false;
      }
    }
  };

  const selectedEmployee = employees.find((e) => e.id === values.employee_id);
  const selectedJob = jobs.find((j) => j.id === values.job_id);
  const CategoryIcon = categoryIcons[values.category] || Package;

  const stepTitle = employeeMode
    ? step === 1
      ? 'Expense details'
      : step === 2
        ? 'Category'
        : 'Review & submit'
    : step === 1
      ? 'Basic info'
      : step === 2
        ? 'Category & job'
        : step === 3
          ? 'Receipt'
          : 'Review & submit';

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={cn(
          'flex flex-col p-0 bg-[hsl(0_0%_8%)] border-white/[0.08]',
          isMobile ? 'h-[90vh] rounded-t-2xl' : 'w-[450px]'
        )}
      >
        {/* Header */}
        <SheetHeader className="p-4 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-3">
            {step > 1 && (
              <IconButton aria-label="Back" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="h-4 w-4" />
              </IconButton>
            )}
            <div className="flex-1 min-w-0">
              <Eyebrow>New expense</Eyebrow>
              <SheetTitle className="mt-1 text-white text-left">{stepTitle}</SheetTitle>
            </div>
            <span className="text-sm text-white shrink-0">
              {step} of {totalSteps}
            </span>
          </div>
          {/* Progress Bar */}
          <div className="flex gap-1 mt-3">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-1 flex-1 rounded-full transition-colors',
                  i < step ? 'bg-elec-yellow' : 'bg-white/[0.08]'
                )}
              />
            ))}
          </div>
        </SheetHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Step 1: Basic Info / Expense Details */}
          {step === 1 && (
            <FormCard eyebrow="Details">
              {/* Employee dropdown - only show in admin mode */}
              {!employeeMode && (
                <Field label="Employee" required hint={errors.employee_id?.message}>
                  <Select
                    value={values.employee_id}
                    onValueChange={(v) => setValue('employee_id', v)}
                  >
                    <SelectTrigger
                      className={cn(selectTriggerClass, errors.employee_id && 'border-red-500/60')}
                    >
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {employees.map((emp) => (
                        <SelectItem key={emp.id} value={emp.id}>
                          {emp.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}

              <Field label="Amount" required hint={errors.amount?.message}>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white font-medium text-[13px]">
                    £
                  </span>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className={cn(
                      inputClass,
                      'pl-8 text-lg h-12',
                      errors.amount && 'border-red-500/60'
                    )}
                    value={values.amount || ''}
                    onChange={(e) => setValue('amount', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </Field>

              <Field label="Description" required hint={errors.description?.message}>
                <Textarea
                  placeholder="What was this expense for?"
                  className={cn(textareaClass, 'min-h-[100px]', errors.description && 'border-red-500/60')}
                  value={values.description}
                  onChange={(e) => setValue('description', e.target.value)}
                />
              </Field>
            </FormCard>
          )}

          {/* Step 2: Category & Job */}
          {step === 2 && (
            <>
              <FormCard eyebrow="Category">
                <div className="grid grid-cols-2 gap-2">
                  {EXPENSE_CATEGORIES.map(({ id, label }) => {
                    const Icon = categoryIcons[id];
                    const isSelected = values.category === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setValue('category', id)}
                        className={cn(
                          'flex items-center gap-3 p-3 rounded-xl border transition-all touch-manipulation',
                          'hover:bg-white/[0.04] active:scale-[0.98]',
                          isSelected
                            ? 'border-elec-yellow/60 bg-elec-yellow/10'
                            : 'border-white/[0.08] bg-[hsl(0_0%_9%)]'
                        )}
                      >
                        <Icon
                          className={cn(
                            'h-5 w-5',
                            isSelected ? 'text-elec-yellow' : 'text-white'
                          )}
                        />
                        <span className="text-sm font-medium text-white">{label}</span>
                        {isSelected && <Check className="h-4 w-4 text-elec-yellow ml-auto" />}
                      </button>
                    );
                  })}
                </div>
              </FormCard>

              {jobs.length > 0 && (
                <FormCard eyebrow="Job link">
                  <Field label="Link to job (optional)">
                    <Select
                      value={values.job_id || 'none'}
                      onValueChange={(v) => setValue('job_id', v === 'none' ? null : v)}
                    >
                      <SelectTrigger className={selectTriggerClass}>
                        <SelectValue placeholder="Select job" />
                      </SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        <SelectItem value="none">No job linked</SelectItem>
                        {jobs.map((job) => (
                          <SelectItem key={job.id} value={job.id}>
                            {job.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </FormCard>
              )}
            </>
          )}

          {/* Step 3: Receipt (Admin mode only) */}
          {step === 3 && !employeeMode && (
            <FormCard eyebrow="Receipt">
              <div className="text-center py-6">
                <div className="inline-flex p-4 rounded-full bg-white/[0.06] mb-4">
                  <Receipt className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Add receipt</h3>
                <p className="text-sm text-white mb-6">
                  Upload a photo of the receipt for this expense
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <SecondaryButton>
                    <Camera className="h-4 w-4 mr-2" />
                    Take photo
                  </SecondaryButton>
                  <SecondaryButton>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload file
                  </SecondaryButton>
                </div>

                <p className="text-xs text-white mt-4">
                  Supported formats: JPG, PNG, PDF (max 5MB)
                </p>
              </div>

              {/* Show preview if receipt uploaded */}
              {values.receipt_url && (
                <div className="p-3 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_9%)]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Check className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">Receipt uploaded</p>
                      <p className="text-sm text-white">receipt.jpg</p>
                    </div>
                    <IconButton
                      aria-label="Remove receipt"
                      onClick={() => setValue('receipt_url', null)}
                    >
                      <X className="h-4 w-4" />
                    </IconButton>
                  </div>
                </div>
              )}
            </FormCard>
          )}

          {/* Step 3 (Employee) or Step 4 (Admin): Review */}
          {((employeeMode && step === 3) || (!employeeMode && step === 4)) && (
            <>
              <div className="p-5 rounded-2xl bg-gradient-to-br from-elec-yellow/10 to-transparent border border-elec-yellow/30">
                <div className="text-center mb-4">
                  <p className="text-sm text-white">Total amount</p>
                  <p className="text-3xl font-bold text-white">
                    {formatCurrency(values.amount)}
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  {/* Only show Employee row in admin mode */}
                  {!employeeMode && (
                    <div className="flex justify-between py-2 border-b border-white/[0.06]">
                      <span className="text-white">Employee</span>
                      <span className="font-medium text-white">
                        {selectedEmployee?.name || '-'}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-white/[0.06]">
                    <span className="text-white">Category</span>
                    <span className="font-medium flex items-center gap-1 text-white">
                      <CategoryIcon className="h-4 w-4" />
                      {values.category || '-'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/[0.06]">
                    <span className="text-white">Description</span>
                    <span className="font-medium text-right max-w-[200px] truncate text-white">
                      {values.description || '-'}
                    </span>
                  </div>
                  {selectedJob && (
                    <div className="flex justify-between py-2 border-b border-white/[0.06]">
                      <span className="text-white">Linked job</span>
                      <span className="font-medium text-white">{selectedJob.title}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2">
                    <span className="text-white">Receipt</span>
                    <span className="font-medium text-white">
                      {values.receipt_url ? 'Attached' : 'Not attached'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Receipt upload option in employee mode (since we skip dedicated step) */}
              {employeeMode && (
                <FormCard eyebrow="Receipt">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'p-2 rounded-lg',
                          values.receipt_url ? 'bg-green-500/10' : 'bg-white/[0.06]'
                        )}
                      >
                        {values.receipt_url ? (
                          <Check className="h-5 w-5 text-green-400" />
                        ) : (
                          <Receipt className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-white">
                          {values.receipt_url ? 'Receipt attached' : 'Add receipt (optional)'}
                        </p>
                        <p className="text-xs text-white">
                          {values.receipt_url ? 'Tap to remove' : 'Photo or file upload'}
                        </p>
                      </div>
                    </div>
                    {values.receipt_url ? (
                      <IconButton
                        aria-label="Remove receipt"
                        onClick={() => setValue('receipt_url', null)}
                      >
                        <X className="h-4 w-4" />
                      </IconButton>
                    ) : (
                      <div className="flex gap-2">
                        <IconButton aria-label="Take photo">
                          <Camera className="h-4 w-4" />
                        </IconButton>
                        <IconButton aria-label="Upload file">
                          <Upload className="h-4 w-4" />
                        </IconButton>
                      </div>
                    )}
                  </div>
                </FormCard>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.06] shrink-0 pb-safe">
          {step < totalSteps ? (
            <PrimaryButton
              fullWidth
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </PrimaryButton>
          ) : (
            <PrimaryButton
              fullWidth
              onClick={handleSubmit(handleFormSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit expense'}
              <Check className="h-4 w-4 ml-2" />
            </PrimaryButton>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CreateExpenseSheet;
