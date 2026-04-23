import { useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Receipt, Wrench, Car, ParkingCircle, Hammer, HardHat, Package, Send } from 'lucide-react';
import { useCreateExpenseClaim } from '@/hooks/useFinance';
import { useEmployees } from '@/hooks/useEmployees';
import { useJobs } from '@/hooks/useJobs';
import { useOptionalVoiceFormContext } from '@/contexts/VoiceFormContext';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  Field,
  FormCard,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  textareaClass,
  fieldLabelClass,
} from '@/components/employer/editorial';

interface CreateExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CATEGORIES = [
  { value: 'Materials', icon: Wrench, emoji: '🔧' },
  { value: 'Travel', icon: Car, emoji: '🚗' },
  { value: 'Parking', icon: ParkingCircle, emoji: '🅿️' },
  { value: 'Tools', icon: Hammer, emoji: '🛠️' },
  { value: 'PPE', icon: HardHat, emoji: '🦺' },
  { value: 'Other', icon: Package, emoji: '📦' },
];

export function CreateExpenseDialog({ open, onOpenChange }: CreateExpenseDialogProps) {
  const [employeeId, setEmployeeId] = useState('');
  const [category, setCategory] = useState('Materials');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [jobId, setJobId] = useState<string | null>(null);

  const { data: employees = [] } = useEmployees();
  const { data: jobs = [] } = useJobs();
  const createExpenseMutation = useCreateExpenseClaim();

  const activeJobs = jobs.filter((j) => j.status === 'Active');

  // Voice form registration
  const voiceContext = useOptionalVoiceFormContext();

  useEffect(() => {
    if (!open || !voiceContext) return;

    voiceContext.registerForm({
      formId: 'create-expense',
      formName: 'Create Expense',
      fields: [
        { name: 'employee', label: 'Employee', type: 'text', required: true },
        { name: 'category', label: 'Category', type: 'text', required: true },
        { name: 'amount', label: 'Amount', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'text', required: true },
        { name: 'job', label: 'Linked Job', type: 'text' },
      ],
      onFillField: (field, value) => {
        switch (field) {
          case 'employee':
            const emp = employees.find((e) => e.name.toLowerCase().includes(value.toLowerCase()));
            if (emp) setEmployeeId(emp.id);
            break;
          case 'category':
            setCategory(value);
            break;
          case 'amount':
            setAmount(value);
            break;
          case 'description':
            setDescription(value);
            break;
          case 'job':
            const job = activeJobs.find((j) => j.title.toLowerCase().includes(value.toLowerCase()));
            if (job) setJobId(job.id);
            break;
        }
      },
      onSubmit: handleSubmit,
      onCancel: () => {
        resetForm();
        onOpenChange(false);
      },
    });

    return () => voiceContext.unregisterForm('create-expense');
  }, [open, voiceContext, employees, activeJobs]);

  const handleSubmit = async () => {
    if (!employeeId || !amount || !description) return;

    await createExpenseMutation.mutateAsync({
      employee_id: employeeId,
      category,
      amount: Number(amount),
      description,
      job_id: jobId,
      status: 'Pending',
      submitted_date: new Date().toISOString().split('T')[0],
      receipt_url: null,
      approved_by: null,
      approved_date: null,
      paid_date: null,
      rejection_reason: null,
    });

    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setEmployeeId('');
    setCategory('Materials');
    setAmount('');
    setDescription('');
    setJobId(null);
  };

  const selectedCategory = CATEGORIES.find((c) => c.value === category);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 overflow-hidden">
        <SheetShell
          eyebrow="Submit expense"
          title={`${selectedCategory?.emoji ?? ''} ${category}`}
          description="Log an expense claim for approval."
          footer={
            <>
              <SecondaryButton
                onClick={() => {
                  resetForm();
                  onOpenChange(false);
                }}
                fullWidth
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                onClick={handleSubmit}
                disabled={
                  !employeeId || !amount || !description || createExpenseMutation.isPending
                }
                fullWidth
              >
                <Send className="h-4 w-4 mr-2" />
                Submit
              </PrimaryButton>
            </>
          }
        >
          <FormCard eyebrow="Expense details">
            <Field label="Employee" required>
              <Select value={employeeId} onValueChange={setEmployeeId}>
                <SelectTrigger className={selectTriggerClass}>
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

            <div className="space-y-2">
              <label className={fieldLabelClass}>Category *</label>
              <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => {
                  const isSelected = category === cat.value;
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setCategory(cat.value)}
                      className={cn(
                        'cursor-pointer active:scale-[0.98] transition-all touch-manipulation rounded-xl border p-3 flex flex-col items-center gap-1',
                        isSelected
                          ? 'bg-elec-yellow/10 border-elec-yellow'
                          : 'bg-[hsl(0_0%_10%)] border-white/[0.08] hover:bg-[hsl(0_0%_12%)]'
                      )}
                    >
                      <span className="text-2xl">{cat.emoji}</span>
                      <span className="text-[11px] font-medium text-white">{cat.value}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Field label="Amount (£)" required>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white z-10 text-[13px]">
                  £
                </span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={cn(inputClass, 'pl-8 text-base font-medium')}
                  step={0.01}
                  min={0}
                />
              </div>
            </Field>

            <Field label="Description" required>
              <Textarea
                placeholder="What was this expense for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={cn(textareaClass, 'min-h-[80px]')}
              />
            </Field>

            <Field label="Link to job (optional)">
              <Select
                value={jobId || 'none'}
                onValueChange={(v) => setJobId(v === 'none' ? null : v)}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select job (optional)" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  <SelectItem value="none">No job linked</SelectItem>
                  {activeJobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title} - {job.client}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </FormCard>

          {/* Receipt Upload Placeholder */}
          <div className="rounded-xl border border-dashed border-white/[0.12] bg-white/[0.02] p-4 flex flex-col items-center gap-2">
            <Receipt className="h-8 w-8 text-white" />
            <p className="text-[12.5px] text-white text-center">Receipt upload coming soon</p>
          </div>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
