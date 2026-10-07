/**
 * "Make this recurring" (ELE-1821). Turns a firm job into a repeat visit on
 * the shared contract engine: how often, when the next one is, how early to
 * book it and whether the same crew goes. Owners and admins can also set a
 * price per visit and have a draft invoice made each time.
 */
import { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  inputCn,
  labelCn,
  grid2Cn,
  fieldFullCn,
  chipBase,
  chipOn,
  chipOff,
  buttonPrimaryCn,
  buttonSecondaryCn,
  checkLineCn,
  checkboxCn,
  infoPanelCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { FREQUENCY_LABELS, type ContractFrequency } from '@/hooks/useMaintenanceContracts';
import { useSetJobRecurring, type FirmRecurring } from '@/hooks/useFirmRecurring';

const QUICK: ContractFrequency[] = ['monthly', 'quarterly', 'six_monthly', 'annually'];
const MORE: ContractFrequency[] = ['weekly', 'two_yearly', 'three_yearly', 'five_yearly', 'custom'];

const addMonths = (iso: string, m: number) => {
  const d = new Date(`${iso}T12:00:00`);
  d.setMonth(d.getMonth() + m);
  return format(d, 'yyyy-MM-dd');
};
// Local date, not UTC: between midnight and 1am BST, UTC is still yesterday.
const today = () => format(new Date(), 'yyyy-MM-dd');
const STEP: Partial<Record<ContractFrequency, number>> = {
  monthly: 1,
  quarterly: 3,
  six_monthly: 6,
  annually: 12,
  two_yearly: 24,
  three_yearly: 36,
  five_yearly: 60,
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: { id: string; title: string; start_date?: string | null; end_date?: string | null };
  /** The job's current recurrence, when it already repeats. */
  existing?: FirmRecurring | null;
  /** ELE-1832: a signed certificate's own interval and re-test date. */
  suggest?: { frequency: ContractFrequency; nextDue: string; title?: string } | null;
}

export function MakeRecurringSheet({ open, onOpenChange, job, existing, suggest }: Props) {
  const { data: role } = useEmployerRole();
  const canSeeMoney = !!role?.canSeeMoney;
  const save = useSetJobRecurring();

  const [title, setTitle] = useState('');
  const [freq, setFreq] = useState<ContractFrequency>('annually');
  const [customDays, setCustomDays] = useState('30');
  const [nextDue, setNextDue] = useState('');
  const [leadDays, setLeadDays] = useState('14');
  const [endDate, setEndDate] = useState('');
  const [sameCrew, setSameCrew] = useState(true);
  const [autoInvoice, setAutoInvoice] = useState(false);
  const [amount, setAmount] = useState('');
  const [showMore, setShowMore] = useState(false);

  // Fill from the existing recurrence, or suggest a year after this visit.
  // Filled once per opening: a background refetch hands us new objects, and
  // re-filling then would wipe what the user has typed.
  const filled = useRef(false);
  useEffect(() => {
    if (!open) {
      filled.current = false;
      return;
    }
    if (filled.current) return;
    filled.current = true;
    if (existing) {
      setTitle(existing.title ?? job.title);
      setFreq(existing.frequency);
      setCustomDays(String(existing.frequency_custom_days ?? 30));
      setNextDue(existing.next_due_date < today() ? today() : existing.next_due_date);
      setLeadDays(String(existing.reminder_days_before ?? 14));
      setEndDate(existing.end_date ?? '');
      setSameCrew(existing.same_crew);
      setAutoInvoice(existing.auto_create_invoice);
      setAmount(existing.amount != null ? String(existing.amount) : '');
      setShowMore(MORE.includes(existing.frequency));
    } else if (suggest) {
      setTitle(suggest.title || job.title);
      setFreq(suggest.frequency);
      setNextDue(suggest.nextDue < today() ? today() : suggest.nextDue);
      setLeadDays('30');
      setEndDate('');
      setSameCrew(true);
      setAutoInvoice(false);
      setAmount('');
      setShowMore(MORE.includes(suggest.frequency));
    } else {
      const base = job.end_date || job.start_date || today();
      const suggested = addMonths(base < today() ? today() : base, 12);
      setTitle(job.title);
      setFreq('annually');
      setNextDue(suggested);
      setLeadDays('14');
      setEndDate('');
      setSameCrew(true);
      setAutoInvoice(false);
      setAmount('');
      setShowMore(false);
    }
  }, [open, existing, suggest, job.id, job.title, job.start_date, job.end_date]);

  const pickFreq = (f: ContractFrequency) => {
    setFreq(f);
    // Keep the next date in step with the choice until they set it themselves.
    const months = STEP[f];
    if (!existing && !suggest && months) {
      const base = job.end_date || job.start_date || today();
      setNextDue(addMonths(base < today() ? today() : base, months));
    }
  };

  const valid =
    !!nextDue &&
    nextDue >= today() &&
    (!endDate || endDate >= nextDue) &&
    (freq !== 'custom' || Number(customDays) >= 1) &&
    // Office managers never see the price, so it can't be theirs to fix.
    (!canSeeMoney || !autoInvoice || Number(amount) > 0);

  const submit = async () => {
    try {
      await save.mutateAsync({
        jobId: job.id,
        frequency: freq,
        nextDue,
        customDays: freq === 'custom' ? Number(customDays) : null,
        leadDays: leadDays.trim() === '' ? 14 : Math.min(60, Math.max(0, Number(leadDays) || 0)),
        endDate: endDate || null,
        sameCrew,
        title: title.trim() || job.title,
        autoInvoice: canSeeMoney && autoInvoice,
        amount: canSeeMoney && amount ? Number(amount) : null,
      });
      toast.success(existing ? 'Repeat visit updated' : 'This job now repeats', {
        description: `The next visit is booked ${leadDays || 14} days before ${new Date(`${nextDue}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}.`,
      });
      onOpenChange(false);
    } catch (e) {
      toast.error((e as Error).message || 'Not saved');
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Recurring work"
      title={existing ? 'Repeat visit' : 'Make this recurring'}
      description="The next visit is booked as a job before it's due, with the same client, site and notes."
      width="wide"
      footer={
        <div className="grid grid-cols-2 gap-2 lg:ml-auto lg:max-w-md">
          <button type="button" className={buttonSecondaryCn} onClick={() => onOpenChange(false)}>
            Cancel
          </button>
          <button
            type="button"
            className={buttonPrimaryCn}
            disabled={!valid || save.isPending}
            onClick={submit}
          >
            {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : existing ? 'Save changes' : 'Make it recurring'}
          </button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-5">
          <div>
            <label className={labelCn} htmlFor="rec-title">
              What is the visit
            </label>
            <input
              id="rec-title"
              className={inputCn}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Quarterly emergency lighting test"
            />
          </div>

          <div>
            <span className={labelCn}>How often</span>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {QUICK.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => pickFreq(f)}
                  className={cn(chipBase, freq === f ? chipOn : chipOff)}
                >
                  {FREQUENCY_LABELS[f]}
                </button>
              ))}
            </div>
            {showMore ? (
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
                {MORE.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => pickFreq(f)}
                    className={cn(chipBase, freq === f ? chipOn : chipOff)}
                  >
                    {f === 'custom' ? 'Every N days' : FREQUENCY_LABELS[f]}
                  </button>
                ))}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowMore(true)}
                className="mt-2 min-h-11 text-[13px] font-medium text-elec-yellow underline-offset-4 hover:underline touch-manipulation"
              >
                More options
              </button>
            )}
            {freq === 'custom' && (
              <div className="mt-3 max-w-[12rem]">
                <label className={labelCn} htmlFor="rec-days">
                  Days between visits
                </label>
                <input
                  id="rec-days"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  className={inputCn}
                  value={customDays}
                  onChange={(e) => setCustomDays(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className={grid2Cn}>
            <div>
              <label className={labelCn} htmlFor="rec-next">
                Next visit
              </label>
              <input
                id="rec-next"
                type="date"
                min={today()}
                className={inputCn}
                value={nextDue}
                onChange={(e) => setNextDue(e.target.value)}
              />
            </div>
            <div>
              <label className={labelCn} htmlFor="rec-lead">
                Book it this many days ahead
              </label>
              <input
                id="rec-lead"
                type="number"
                inputMode="numeric"
                min={0}
                max={60}
                className={inputCn}
                value={leadDays}
                onChange={(e) => setLeadDays(e.target.value)}
              />
            </div>
            <div className={fieldFullCn}>
              <label className={labelCn} htmlFor="rec-end">
                Stop after (optional)
              </label>
              <input
                id="rec-end"
                type="date"
                min={nextDue || today()}
                className={cn(inputCn, 'sm:max-w-[14rem]')}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              {endDate && endDate < nextDue && (
                <p className="mt-1 text-[12px] text-orange-300">The end date is before the next visit.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <label className={checkLineCn}>
            <input
              type="checkbox"
              className={checkboxCn}
              checked={sameCrew}
              onChange={(e) => setSameCrew(e.target.checked)}
            />
            <span className="text-[14px] text-white">
              <span className="font-medium">Same crew next time</span>
              <span className="block text-[12px]">
                Everyone on the last visit is booked again. Anyone who has left the team is skipped.
              </span>
            </span>
          </label>

          {canSeeMoney && (
            <div className="space-y-3 border-t border-white/[0.1] pt-4">
              <label className={checkLineCn}>
                <input
                  type="checkbox"
                  className={checkboxCn}
                  checked={autoInvoice}
                  onChange={(e) => setAutoInvoice(e.target.checked)}
                />
                <span className="text-[14px] text-white">
                  <span className="font-medium">Draft an invoice for each visit</span>
                  <span className="block text-[12px]">It waits in Invoices as a draft. Nothing is sent until you send it.</span>
                </span>
              </label>
              <div className="max-w-[14rem]">
                <label className={labelCn} htmlFor="rec-amount">
                  Price per visit (£)
                </label>
                <input
                  id="rec-amount"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="0.01"
                  className={inputCn}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                />
                {autoInvoice && !(Number(amount) > 0) && (
                  <p className="mt-1 text-[12px] text-orange-300">Add the price to draft invoices.</p>
                )}
              </div>
            </div>
          )}

          <div className={infoPanelCn}>
            <p className="text-[13px] leading-relaxed text-white">
              The crew sees a Last visit card on each repeat job: who went, their notes and any snags.
            </p>
          </div>
        </div>
      </div>
    </FormSheet>
  );
}
