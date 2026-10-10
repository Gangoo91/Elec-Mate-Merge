import { useEffect, useState } from 'react';
import FormSheet from '@/components/forms/FormSheet';
import { SelectField } from '@/components/forms';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Field,
  inputClass,
  textareaClass,
  PrimaryButton,
  SecondaryButton,
} from '@/components/employer/editorial';
import { Segments, panel } from '@/components/employer/pageParts/PageParts';
import { cn } from '@/lib/utils';
import { autoCompleteOff } from '@/lib/textEntry';
import {
  useChaseSettings,
  useSaveChaseSettings,
  stepDayLabel,
  TONE_LABEL,
  type ChaseStep,
  type ChaseTone,
  type QuoteFollowUpStep,
} from '@/hooks/useGetPaid';
import { toast } from 'sonner';

/* ELE-2065 / ELE-2073: the firm's chasing schedule. One sheet, two tabs:
   unpaid invoices (days from the due date, email or a text hand-off, wording)
   and unanswered quotes (days after sending, wording). */

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';

function Chips<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            'h-11 rounded-full border px-4 text-[13px] touch-manipulation',
            value === o.value ? chipOn : chipOff
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const OFFSETS = [-14, -7, -5, -3, -2, -1, 0, 1, 3, 5, 7, 10, 14, 21, 28, 30, 45, 60, 90, 120];
const QUOTE_DAYS = [1, 2, 3, 4, 5, 7, 10, 14, 21, 28];

const PLACEHOLDERS_INVOICE =
  '{customer} {invoice} {amount} {due_date} {days_overdue} {company} {pay_line}';
const PLACEHOLDERS_QUOTE = '{customer} {quote} {amount} {company} {link}';

export function ChaseScheduleSheet({
  open,
  onOpenChange,
  initialTab = 'invoices',
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  initialTab?: 'invoices' | 'quotes';
}) {
  const { data: settings, isLoading, error } = useChaseSettings(open);
  const save = useSaveChaseSettings();
  const [tab, setTab] = useState<'invoices' | 'quotes'>(initialTab);
  const [invOn, setInvOn] = useState(false);
  const [steps, setSteps] = useState<ChaseStep[]>([]);
  const [quoteOn, setQuoteOn] = useState(false);
  const [qSteps, setQSteps] = useState<QuoteFollowUpStep[]>([]);
  const [openWording, setOpenWording] = useState<string | null>(null);

  useEffect(() => {
    if (open) setTab(initialTab);
  }, [open, initialTab]);

  useEffect(() => {
    if (!settings || !open) return;
    setInvOn(settings.invoice_enabled);
    setSteps([...(settings.invoice_steps ?? [])].sort((a, b) => a.offset - b.offset));
    setQuoteOn(settings.quote_enabled);
    setQSteps([...(settings.quote_steps ?? [])].sort((a, b) => a.day - b.day));
  }, [settings, open]);

  const updateStep = (i: number, patch: Partial<ChaseStep>) =>
    setSteps((prev) => prev.map((s, j) => (j === i ? { ...s, ...patch } : s)));
  const updateQStep = (i: number, patch: Partial<QuoteFollowUpStep>) =>
    setQSteps((prev) => prev.map((s, j) => (j === i ? { ...s, ...patch } : s)));

  const dupOffsets = new Set(steps.map((s) => s.offset)).size !== steps.length;
  const dupDays = new Set(qSteps.map((s) => s.day)).size !== qSteps.length;

  const onSave = async () => {
    if (dupOffsets || dupDays) {
      toast.error('Two steps are on the same day. Change one of them.');
      return;
    }
    const clean = (s: string | null | undefined) => (s && s.trim() ? s.trim() : null);
    await save.mutateAsync({
      invoice_enabled: invOn,
      invoice_steps: [...steps]
        .sort((a, b) => a.offset - b.offset)
        .map((s) => ({ ...s, subject: clean(s.subject), body: clean(s.body) })),
      quote_enabled: quoteOn,
      quote_steps: [...qSteps]
        .sort((a, b) => a.day - b.day)
        .map((s) => ({ ...s, subject: clean(s.subject), body: clean(s.body) })),
    });
    toast.success('Chasing schedule saved');
    onOpenChange(false);
  };

  const denied = error && String((error as Error).message).includes('Only the owner');

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Get paid"
      title="Chasing schedule"
      description="What goes to customers, and when. Every step stops the moment an invoice is paid, disputed or paused, or a quote is answered."
      subheader={
        <div className="pb-3">
          <Segments
            items={[
              { value: 'invoices', label: 'Unpaid invoices' },
              { value: 'quotes', label: 'Unanswered quotes' },
            ]}
            value={tab}
            onChange={setTab}
            className="sm:w-fit"
          />
        </div>
      }
      footer={
        <div className="flex gap-2">
          <SecondaryButton fullWidth onClick={() => onOpenChange(false)}>
            Cancel
          </SecondaryButton>
          <PrimaryButton
            fullWidth
            onClick={onSave}
            disabled={save.isPending || isLoading || !!denied}
          >
            {save.isPending ? 'Saving' : 'Save schedule'}
          </PrimaryButton>
        </div>
      }
    >
      {denied ? (
        <p className="text-[14px] text-white">
          Only the owner or an admin can change the chasing schedule.
        </p>
      ) : isLoading || !settings ? (
        <p className="text-[14px] text-white">Loading the schedule.</p>
      ) : tab === 'invoices' ? (
        <div className="space-y-5 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:items-start lg:gap-8 lg:space-y-0">
          <div className="space-y-4">
            <div className={cn(panel, 'flex items-center justify-between gap-4 p-4 sm:p-5')}>
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-white">Chase unpaid invoices for me</p>
                <p className="mt-0.5 text-[13px] text-white">
                  {invOn
                    ? 'On. Steps run on weekdays between 9am and 5pm.'
                    : 'Off. Nothing is sent until you turn it on.'}
                </p>
              </div>
              <Switch
                checked={invOn}
                onCheckedChange={setInvOn}
                aria-label="Chase unpaid invoices"
              />
            </div>
            {settings.old_rule_on && (
              <p className="text-[13px] text-white">
                Your automation "Chase unpaid invoices" is on. While this schedule is on, it
                replaces that rule, so nobody is chased twice.
              </p>
            )}
            {settings.automations_paused && (
              <p className="text-[13px] text-red-300">
                Automations are paused for the firm, so nothing is sent until you resume them in
                Automations.
              </p>
            )}
            <p className="text-[13px] text-white">
              Only invoices that reach a step after you turn this on are chased, so switching it on
              never sends a pile of old reminders at once. A text step sends nobody anything: the
              office gets a reminder to text the customer, with the wording ready.
            </p>
            <p className="text-[13px] text-white">
              Wording can use {PLACEHOLDERS_INVOICE}. Leave it empty to send the branded reminder
              with a Pay now button.
            </p>
          </div>

          <div className={cn(panel, 'overflow-hidden')}>
            <div className="divide-y divide-white/[0.07]">
              {steps.map((s, i) => {
                const key = `i${i}`;
                return (
                  <div key={key} className="space-y-3 px-4 py-4 sm:px-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[15px] font-semibold text-white">
                        Step {i + 1}: {stepDayLabel(s.offset)}
                      </p>
                      <button
                        type="button"
                        onClick={() => setSteps((prev) => prev.filter((_, j) => j !== i))}
                        className="h-11 shrink-0 rounded-full px-3 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_auto_auto] xl:items-start">
                      <Field label="When">
                        <SelectField
                          value={String(s.offset)}
                          onValueChange={(v) => updateStep(i, { offset: Number(v) })}
                          options={Array.from(new Set([...OFFSETS, s.offset]))
                            .sort((a, b) => a - b)
                            .map((o) => ({ value: String(o), label: stepDayLabel(o) }))}
                          title="When this step runs"
                        />
                      </Field>
                      <Field label="How">
                        <Chips
                          value={s.channel}
                          onChange={(v) => updateStep(i, { channel: v })}
                          options={[
                            { value: 'email', label: 'Email' },
                            { value: 'sms', label: 'Text' },
                          ]}
                        />
                      </Field>
                      <Field label="Tone">
                        <Chips<ChaseTone>
                          value={s.tone}
                          onChange={(v) => updateStep(i, { tone: v })}
                          options={(['gentle', 'firm', 'final'] as ChaseTone[]).map((t) => ({
                            value: t,
                            label: TONE_LABEL[t],
                          }))}
                        />
                      </Field>
                    </div>
                    {openWording === key || s.body ? (
                      <div className="space-y-3">
                        {s.channel === 'email' && (
                          <Field label="Subject">
                            <Input
                              value={s.subject ?? ''}
                              onChange={(e) => updateStep(i, { subject: e.target.value })}
                              placeholder="Invoice {invoice}: {amount}"
                              className={inputClass}
                              autoComplete={autoCompleteOff}
                            />
                          </Field>
                        )}
                        <Field label={s.channel === 'email' ? 'Email wording' : 'Text wording'}>
                          <Textarea
                            value={s.body ?? ''}
                            onChange={(e) => updateStep(i, { body: e.target.value })}
                            rows={5}
                            placeholder={
                              s.channel === 'email'
                                ? 'Dear {customer}, a reminder that {amount} on invoice {invoice} is due on {due_date}. {pay_line} Thank you, {company}'
                                : 'Hi {customer}, a quick reminder from {company} that invoice {invoice} for {amount} is now {days_overdue} days overdue. {pay_line}'
                            }
                            className={textareaClass}
                          />
                        </Field>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setOpenWording(key)}
                        className="h-11 rounded-full border border-white/[0.14] px-4 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
                      >
                        Write my own wording
                      </button>
                    )}
                  </div>
                );
              })}
              {steps.length === 0 && (
                <p className="px-4 py-5 text-[14px] text-white sm:px-5">
                  No steps. Add one to start chasing.
                </p>
              )}
            </div>
            {steps.length < 8 && (
              <div className="border-t border-white/[0.07] px-4 py-3 sm:px-5">
                <button
                  type="button"
                  onClick={() => {
                    const used = new Set(steps.map((s) => s.offset));
                    const next = OFFSETS.find((o) => o > 0 && !used.has(o)) ?? 45;
                    setSteps((prev) => [...prev, { offset: next, channel: 'email', tone: 'firm' }]);
                  }}
                  className="h-11 rounded-full border border-white/[0.14] px-4 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
                >
                  Add a step
                </button>
              </div>
            )}
            {dupOffsets && (
              <p className="border-t border-white/[0.07] px-4 py-3 text-[13px] text-red-300 sm:px-5">
                Two steps are on the same day.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-5 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:items-start lg:gap-8 lg:space-y-0">
          <div className="space-y-4">
            <div className={cn(panel, 'flex items-center justify-between gap-4 p-4 sm:p-5')}>
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-white">Follow up quotes for me</p>
                <p className="mt-0.5 text-[13px] text-white">
                  {quoteOn
                    ? 'On. A follow-up stops when the customer accepts, declines or the quote expires.'
                    : 'Off. Quotes get the standard reminder 3 and 7 days after sending.'}
                </p>
              </div>
              <Switch
                checked={quoteOn}
                onCheckedChange={setQuoteOn}
                aria-label="Follow up quotes"
              />
            </div>
            <p className="text-[13px] text-white">
              While this is on, your days replace the standard reminders, so a customer is never
              chased twice. Turn it off and open quotes go back to the standard reminders.
            </p>
            <p className="text-[13px] text-white">
              Wording can use {PLACEHOLDERS_QUOTE}. Leave it empty to send the branded reminder with
              an Accept button.
            </p>
          </div>
          <div className={cn(panel, 'overflow-hidden')}>
            <div className="divide-y divide-white/[0.07]">
              {qSteps.map((s, i) => {
                const key = `q${i}`;
                return (
                  <div key={key} className="space-y-3 px-4 py-4 sm:px-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[15px] font-semibold text-white">
                        Follow-up {i + 1}: {s.day} day{s.day === 1 ? '' : 's'} after sending
                      </p>
                      <button
                        type="button"
                        onClick={() => setQSteps((prev) => prev.filter((_, j) => j !== i))}
                        className="h-11 shrink-0 rounded-full px-3 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="sm:max-w-md">
                      <Field label="When">
                        <SelectField
                          value={String(s.day)}
                          onValueChange={(v) => updateQStep(i, { day: Number(v) })}
                          options={Array.from(new Set([...QUOTE_DAYS, s.day]))
                            .sort((a, b) => a - b)
                            .map((d) => ({
                              value: String(d),
                              label: `${d} day${d === 1 ? '' : 's'} after sending`,
                            }))}
                          title="When this follow-up goes"
                        />
                      </Field>
                    </div>
                    {openWording === key || s.body ? (
                      <div className="space-y-3">
                        <Field label="Subject">
                          <Input
                            value={s.subject ?? ''}
                            onChange={(e) => updateQStep(i, { subject: e.target.value })}
                            placeholder="Your quote {quote} from {company}"
                            className={inputClass}
                            autoComplete={autoCompleteOff}
                          />
                        </Field>
                        <Field label="Email wording">
                          <Textarea
                            value={s.body ?? ''}
                            onChange={(e) => updateQStep(i, { body: e.target.value })}
                            rows={5}
                            placeholder="Hi {customer}, just checking you got quote {quote} for {amount}. Any questions, reply here. You can accept it online: {link} Thanks, {company}"
                            className={textareaClass}
                          />
                        </Field>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setOpenWording(key)}
                        className="h-11 rounded-full border border-white/[0.14] px-4 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
                      >
                        Write my own wording
                      </button>
                    )}
                  </div>
                );
              })}
              {qSteps.length === 0 && (
                <p className="px-4 py-5 text-[14px] text-white sm:px-5">No follow-ups. Add one.</p>
              )}
            </div>
            {qSteps.length < 5 && (
              <div className="border-t border-white/[0.07] px-4 py-3 sm:px-5">
                <button
                  type="button"
                  onClick={() => {
                    const used = new Set(qSteps.map((s) => s.day));
                    const next = QUOTE_DAYS.find((d) => !used.has(d)) ?? 28;
                    setQSteps((prev) => [...prev, { day: next }]);
                  }}
                  className="h-11 rounded-full border border-white/[0.14] px-4 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
                >
                  Add a follow-up
                </button>
              </div>
            )}
            {dupDays && (
              <p className="border-t border-white/[0.07] px-4 py-3 text-[13px] text-red-300 sm:px-5">
                Two follow-ups are on the same day.
              </p>
            )}
          </div>
        </div>
      )}
    </FormSheet>
  );
}
