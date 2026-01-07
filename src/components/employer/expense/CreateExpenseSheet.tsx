import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Plus, ArrowLeft, ArrowRight, Check, Camera, Upload, X,
  Wrench, Car, ParkingCircle, Hammer, HardHat,
  GraduationCap, UtensilsCrossed, Package, Receipt
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { EXPENSE_CATEGORIES, formatCurrency, type ExpenseCategory } from '@/hooks/useExpenses';
import type { ExpenseClaim } from '@/services/financeService';

interface CreateExpenseSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<ExpenseClaim, 'id' | 'created_at' | 'updated_at' | 'employees'>) => void;
  employees: { id: string; name: string }[];
  jobs?: { id: string; title: string }[];
  isSubmitting?: boolean;
  employeeMode?: boolean;  // When true, auto-assigns to current user (no employee dropdown)
  currentEmployeeId?: string;  // The employee ID to use in employee mode
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
  const totalSteps = employeeMode ? 3 : 4;  // Skip employee step in employee mode

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

  const { watch, setValue, handleSubmit, formState: { errors }, reset } = form;
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

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={cn(
          "flex flex-col p-0",
          isMobile ? "h-[90vh] rounded-t-2xl" : "w-[450px]"
        )}
      >
        {/* Header */}
        <SheetHeader className="p-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            {step > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setStep(step - 1)}
                className="h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <SheetTitle className="flex-1">
              {employeeMode ? (
                <>
                  {step === 1 && 'Expense Details'}
                  {step === 2 && 'Category'}
                  {step === 3 && 'Review & Submit'}
                </>
              ) : (
                <>
                  {step === 1 && 'Basic Info'}
                  {step === 2 && 'Category & Job'}
                  {step === 3 && 'Receipt'}
                  {step === 4 && 'Review & Submit'}
                </>
              )}
            </SheetTitle>
            <span className="text-sm text-muted-foreground">
              {step} of {totalSteps}
            </span>
          </div>
          {/* Progress Bar */}
          <div className="flex gap-1 mt-3">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  i < step ? "bg-elec-yellow" : "bg-muted"
                )}
              />
            ))}
          </div>
        </SheetHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Step 1: Basic Info / Expense Details */}
          {step === 1 && (
            <div className="space-y-4">
              {/* Employee dropdown - only show in admin mode */}
              {!employeeMode && (
                <div className="space-y-2">
                  <Label>Employee</Label>
                  <Select
                    value={values.employee_id}
                    onValueChange={(v) => setValue('employee_id', v)}
                  >
                    <SelectTrigger className={cn(errors.employee_id && "border-red-500")}>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((emp) => (
                        <SelectItem key={emp.id} value={emp.id}>
                          {emp.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.employee_id && (
                    <p className="text-xs text-red-500">{errors.employee_id.message}</p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label>Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                    £
                  </span>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className={cn("pl-8 text-lg h-12", errors.amount && "border-red-500")}
                    value={values.amount || ''}
                    onChange={(e) => setValue('amount', parseFloat(e.target.value) || 0)}
                  />
                </div>
                {errors.amount && (
                  <p className="text-xs text-red-500">{errors.amount.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="What was this expense for?"
                  className={cn("min-h-[100px]", errors.description && "border-red-500")}
                  value={values.description}
                  onChange={(e) => setValue('description', e.target.value)}
                />
                {errors.description && (
                  <p className="text-xs text-red-500">{errors.description.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Category & Job */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Category</Label>
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
                          "flex items-center gap-3 p-3 rounded-lg border transition-all",
                          "hover:bg-muted/50 active:scale-[0.98]",
                          isSelected
                            ? "border-elec-yellow bg-elec-yellow/10"
                            : "border-border"
                        )}
                      >
                        <Icon className={cn(
                          "h-5 w-5",
                          isSelected ? "text-elec-yellow" : "text-muted-foreground"
                        )} />
                        <span className={cn(
                          "text-sm font-medium",
                          isSelected ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {label}
                        </span>
                        {isSelected && (
                          <Check className="h-4 w-4 text-elec-yellow ml-auto" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {jobs.length > 0 && (
                <div className="space-y-2">
                  <Label>Link to Job (Optional)</Label>
                  <Select
                    value={values.job_id || 'none'}
                    onValueChange={(v) => setValue('job_id', v === 'none' ? null : v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select job" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No job linked</SelectItem>
                      {jobs.map((job) => (
                        <SelectItem key={job.id} value={job.id}>
                          {job.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Receipt (Admin mode only) */}
          {step === 3 && !employeeMode && (
            <div className="space-y-4">
              <div className="text-center py-8">
                <div className="inline-flex p-4 rounded-full bg-muted mb-4">
                  <Receipt className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Add Receipt</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Upload a photo of the receipt for this expense
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" className="gap-2">
                    <Camera className="h-4 w-4" />
                    Take Photo
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload File
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-4">
                  Supported formats: JPG, PNG, PDF (max 5MB)
                </p>
              </div>

              {/* Show preview if receipt uploaded */}
              {values.receipt_url && (
                <Card className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Receipt uploaded</p>
                      <p className="text-sm text-muted-foreground">receipt.jpg</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setValue('receipt_url', null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Step 3 (Employee) or Step 4 (Admin): Review */}
          {((employeeMode && step === 3) || (!employeeMode && step === 4)) && (
            <div className="space-y-4">
              <Card className="p-4 bg-gradient-to-br from-elec-yellow/10 to-transparent border-elec-yellow/30">
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-3xl font-bold text-foreground">
                    {formatCurrency(values.amount)}
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  {/* Only show Employee row in admin mode */}
                  {!employeeMode && (
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Employee</span>
                      <span className="font-medium">{selectedEmployee?.name || '-'}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium flex items-center gap-1">
                      <CategoryIcon className="h-4 w-4" />
                      {values.category || '-'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Description</span>
                    <span className="font-medium text-right max-w-[200px] truncate">
                      {values.description || '-'}
                    </span>
                  </div>
                  {selectedJob && (
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Linked Job</span>
                      <span className="font-medium">{selectedJob.title}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Receipt</span>
                    <span className="font-medium">
                      {values.receipt_url ? 'Attached' : 'Not attached'}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Receipt upload option in employee mode (since we skip dedicated step) */}
              {employeeMode && (
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        values.receipt_url ? "bg-green-500/10" : "bg-muted"
                      )}>
                        {values.receipt_url ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <Receipt className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {values.receipt_url ? 'Receipt attached' : 'Add receipt (optional)'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {values.receipt_url ? 'Tap to remove' : 'Photo or file upload'}
                        </p>
                      </div>
                    </div>
                    {values.receipt_url ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setValue('receipt_url', null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="h-9 w-9">
                          <Camera className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border shrink-0 pb-safe">
          {step < totalSteps ? (
            <Button
              className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 h-12"
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 h-12"
              onClick={handleSubmit(handleFormSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Expense'}
              <Check className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CreateExpenseSheet;
