import { useEffect, useState } from 'react';
import { Package, Truck, Building2, Receipt } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  PrimaryButton,
  SecondaryButton,
  Field,
  inputClass,
  textareaClass,
} from '@/components/employer/editorial';
import { useRecordJobCost } from '@/hooks/useFinanceModel';
import { todayUk } from '@/lib/financeDefinitions';
import { useToast } from '@/hooks/use-toast';

interface RecordActualCostSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string;
  jobTitle?: string;
}

type Category = 'materials' | 'equipment' | 'overheads' | 'other';

const categories: { id: Category; label: string; hint: string; icon: typeof Package }[] = [
  { id: 'materials', label: 'Materials', hint: 'Bought outside a purchase order', icon: Package },
  { id: 'equipment', label: 'Equipment', hint: 'Hire, plant, access', icon: Truck },
  { id: 'overheads', label: 'Overheads', hint: 'Skip, parking, permits', icon: Building2 },
  { id: 'other', label: 'Other', hint: 'Anything else for this job', icon: Receipt },
];

/**
 * Log a manual cost against a job. Labour, purchase orders and approved
 * expense claims are already counted automatically, so they are not offered
 * here — that is what stops a cost being counted twice. Every entry is kept in
 * the job's cost log (employer_job_cost_entries).
 */
export function RecordActualCostSheet({
  open,
  onOpenChange,
  jobId,
  jobTitle,
}: RecordActualCostSheetProps) {
  const { toast } = useToast();
  const recordCost = useRecordJobCost();
  const [category, setCategory] = useState<Category>('materials');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(todayUk());
  const [note, setNote] = useState('');

  useEffect(() => {
    if (open) {
      setCategory('materials');
      setAmount('');
      setDate(todayUk());
      setNote('');
    }
  }, [open]);

  const value = Number(amount);
  const valid = Number.isFinite(value) && value > 0 && !!date;

  const submit = () => {
    if (!valid) return;
    recordCost.mutate(
      { jobId, category, amount: Math.round(value * 100) / 100, incurredOn: date, note: note.trim() },
      {
        onSuccess: () => {
          toast({ title: 'Cost recorded', description: 'Job profit has been updated.' });
          onOpenChange(false);
        },
        onError: (e) =>
          toast({
            title: 'Could not record the cost',
            description: e instanceof Error ? e.message : 'Try again.',
            variant: 'destructive',
          }),
      }
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_10%)] border-white/[0.06]"
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="px-5 pt-5 pb-3 border-b border-white/[0.06] text-left">
            <SheetTitle className="text-white text-xl font-semibold">Record a job cost</SheetTitle>
            {jobTitle && <p className="text-[13px] text-white">{jobTitle}</p>}
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
            <p className="text-[12.5px] text-white leading-relaxed">
              Labour from approved timesheets, purchase orders and approved expense claims are
              added to this job automatically. Use this only for costs that aren't recorded
              anywhere else.
            </p>

            <div className="grid grid-cols-2 gap-2">
              {categories.map(({ id, label, hint, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setCategory(id)}
                  className={cn(
                    'min-h-[64px] flex flex-col items-start gap-1 p-3 rounded-xl border text-left touch-manipulation transition-colors',
                    category === id
                      ? 'border-elec-yellow bg-white/[0.06]'
                      : 'border-white/[0.1] bg-white/[0.02]'
                  )}
                >
                  <span className="flex items-center gap-2 text-[14px] font-medium text-white">
                    <Icon className={cn('h-4 w-4', category === id ? 'text-elec-yellow' : 'text-white')} />
                    {label}
                  </span>
                  <span className="text-[11.5px] text-white">{hint}</span>
                </button>
              ))}
            </div>

            <Field label="Amount (£)">
              <Input
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={cn(inputClass, 'h-11 touch-manipulation')}
              />
            </Field>

            <Field label="Date of the cost">
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={cn(inputClass, 'h-11 touch-manipulation')}
              />
            </Field>

            <Field label="Note (optional)">
              <Textarea
                placeholder="What was it for?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className={cn(textareaClass, 'min-h-[96px]')}
              />
            </Field>
          </div>

          <div className="px-5 py-4 border-t border-white/[0.06] flex gap-3 pb-safe">
            <SecondaryButton fullWidth onClick={() => onOpenChange(false)} className="h-11">
              Cancel
            </SecondaryButton>
            <PrimaryButton
              fullWidth
              onClick={submit}
              disabled={!valid || recordCost.isPending}
              className="h-11"
            >
              {recordCost.isPending ? 'Recording…' : 'Record cost'}
            </PrimaryButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default RecordActualCostSheet;
