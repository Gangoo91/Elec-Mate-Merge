import { useEffect, useState } from 'react';
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
import { useSetJobLabour } from '@/hooks/useFinanceModel';
import { formatGBP, type JobFinance } from '@/lib/financeDefinitions';
import { useToast } from '@/hooks/use-toast';

interface SetJobLabourSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: JobFinance | null;
}

/**
 * Override a job's labour cost. Approved timesheets stay untouched; the
 * difference is logged as a labour adjustment with who, when, before/after and
 * the reason, and it flows into Reports and Accounts on the day it is made.
 */
export function SetJobLabourSheet({ open, onOpenChange, job }: SetJobLabourSheetProps) {
  const { toast } = useToast();
  const setLabour = useSetJobLabour();
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (open && job) {
      setAmount(job.labour.toFixed(2));
      setReason('');
    }
  }, [open, job]);

  if (!job) return null;

  const value = Number(amount);
  const valid = Number.isFinite(value) && value >= 0 && reason.trim().length > 0;
  const unchanged = Math.abs(value - job.labour) < 0.005;
  const overridden = Math.abs(job.labourAdjustments) >= 0.005;

  const save = (target: number, why: string) =>
    setLabour.mutate(
      { jobId: job.jobId, amount: Math.round(target * 100) / 100, reason: why },
      {
        onSuccess: () => {
          toast({ title: 'Labour updated', description: 'The change is logged on the job.' });
          onOpenChange(false);
        },
        onError: (e) =>
          toast({
            title: 'Could not update labour',
            description: e instanceof Error ? e.message : 'Try again.',
            variant: 'destructive',
          }),
      }
    );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_10%)] border-white/[0.06]"
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="px-5 pt-5 pb-3 border-b border-white/[0.06] text-left">
            <SheetTitle className="text-white text-xl font-semibold">Labour cost</SheetTitle>
            <p className="text-[13px] text-white">{job.title}</p>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
            <div className="rounded-xl border border-white/[0.1] bg-white/[0.03] divide-y divide-white/[0.06]">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[13px] text-white">
                  From approved timesheets
                  <span className="block text-[11.5px] text-white">
                    {job.labourHours.toLocaleString('en-GB', { maximumFractionDigits: 2 })} hrs × each
                    person's rate, overtime included
                  </span>
                </span>
                <span className="text-[14px] font-semibold tabular-nums text-white">
                  {formatGBP(job.labourTimesheets)}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[13px] text-white">Logged adjustments</span>
                <span className="text-[14px] font-semibold tabular-nums text-white">
                  {formatGBP(job.labourAdjustments)}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[13px] font-medium text-white">Labour used for profit</span>
                <span className="text-[15px] font-semibold tabular-nums text-elec-yellow">
                  {formatGBP(job.labour)}
                </span>
              </div>
            </div>

            <Field label="Set labour cost to (£)">
              <Input
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={cn(inputClass, 'h-11 touch-manipulation')}
              />
            </Field>

            <Field label="Reason (required — it's kept in the job's log)">
              <Textarea
                placeholder="e.g. Subcontractor day rate agreed, timesheets not on the app"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className={cn(textareaClass, 'min-h-[96px]')}
              />
            </Field>

            {overridden && (
              <SecondaryButton
                fullWidth
                className="h-11"
                disabled={setLabour.isPending}
                onClick={() =>
                  save(job.labourTimesheets, reason.trim() || 'Back to approved timesheet labour')
                }
              >
                Go back to timesheet labour ({formatGBP(job.labourTimesheets)})
              </SecondaryButton>
            )}
          </div>

          <div className="px-5 py-4 border-t border-white/[0.06] flex gap-3 pb-safe">
            <SecondaryButton fullWidth onClick={() => onOpenChange(false)} className="h-11">
              Cancel
            </SecondaryButton>
            <PrimaryButton
              fullWidth
              className="h-11"
              disabled={!valid || unchanged || setLabour.isPending}
              onClick={() => save(value, reason.trim())}
            >
              {setLabour.isPending ? 'Saving…' : 'Save labour'}
            </PrimaryButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SetJobLabourSheet;
