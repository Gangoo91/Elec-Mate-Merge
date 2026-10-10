import { useMemo, useState } from 'react';
import FormSheet from '@/components/forms/FormSheet';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Field, inputClass, textareaClass, PrimaryButton } from '@/components/employer/editorial';
import { panel, PanelTitle, KeyValue, Rows } from '@/components/employer/pageParts/PageParts';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import {
  useAddChaseNote,
  useChaseNotes,
  useChaseNow,
  useCustomerChasePause,
  useSetChaseState,
  fillChaseText,
  gbp,
  shortDate,
  stepDayLabel,
  BUCKET_LABEL,
  DEBTORS_KEY,
  DEFAULT_TEXT_WORDING,
  TONE_LABEL,
  type ChaseTone,
  type Debtor,
} from '@/hooks/useGetPaid';
import { statutoryClaim, statutoryClaimLetter } from '@/utils/statutoryInterest';

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const ghostBtn =
  'inline-flex h-11 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.04] px-4 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.08]';

const NOTE_LABEL: Record<string, string> = {
  note: 'Note',
  promise: 'Promised to pay',
  dispute: 'Disputed',
  resolved: 'Dispute resolved',
  chase: 'Chased',
  interest: 'Late payment claim sent',
};

function todayIso() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export function DebtorSheet({
  debtor,
  open,
  onOpenChange,
  companyName,
  textWording,
}: {
  debtor: Debtor | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  companyName: string;
  /** The schedule's text-step wording, if the owner wrote one. */
  textWording?: string | null;
}) {
  const d = debtor;
  const qc = useQueryClient();
  const chase = useChaseNow();
  const setState = useSetChaseState();
  const addNote = useAddChaseNote();
  const pauseCustomer = useCustomerChasePause();
  const { data: history } = useChaseNotes(open && d ? d.invoice_id : null);
  const [tone, setTone] = useState<ChaseTone>('gentle');
  const [promiseDate, setPromiseDate] = useState('');
  const [promiseNote, setPromiseNote] = useState('');
  const [note, setNote] = useState('');
  const [disputeNote, setDisputeNote] = useState('');
  const [releasing, setReleasing] = useState(false);

  const claim = useMemo(
    () =>
      d && d.due_on && d.debtor_type === 'business' ? statutoryClaim(d.due_now, d.due_on) : null,
    [d]
  );

  if (!d) return null;

  const smsText = fillChaseText(textWording || DEFAULT_TEXT_WORDING, d, companyName);
  const smsHref = d.client_phone
    ? `sms:${d.client_phone.replace(/\s+/g, '')}${/iPhone|iPad|Mac/i.test(navigator.userAgent) ? '&' : '?'}body=${encodeURIComponent(smsText)}`
    : null;

  const chaseNow = async () => {
    if (!d.client_email) {
      toast.error('There is no email address on this invoice. Text or call them instead.');
      return;
    }
    try {
      await chase.mutateAsync({
        invoiceId: d.invoice_id,
        tone,
        note: `${TONE_LABEL[tone]} reminder emailed to ${d.client_email}.`,
        ...(d.retention_held > 0
          ? {
              customSubject: `Invoice ${d.invoice_number}: ${gbp(d.due_now, true)}`,
              customBody: fillChaseText(
                'Dear {customer},\n\nA reminder that {amount} on invoice {invoice} was due on {due_date}. {pay_line}\n\nThank you,\n{company}',
                d,
                companyName
              ),
            }
          : {}),
      });
      toast.success(`Reminder sent to ${d.client}`);
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const sendClaim = async () => {
    if (!claim || !d.due_on) return;
    if (!d.client_email) {
      toast.error('There is no email address on this invoice.');
      return;
    }
    const letter = statutoryClaimLetter({
      claim,
      customer: d.company_name || d.client,
      invoiceNumber: d.invoice_number || '',
      dueDate: d.due_on,
      companyName,
    });
    try {
      await chase.mutateAsync({
        invoiceId: d.invoice_id,
        tone: 'final',
        customSubject: letter.subject,
        customBody: letter.body,
        kind: 'interest',
        note: `Claimed ${gbp(claim.interest, true)} statutory interest and ${gbp(claim.compensation)} compensation (${claim.rate}% a year, ${claim.daysLate} days).`,
      });
      toast.success('Late payment claim sent');
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const markReleased = async () => {
    setReleasing(true);
    try {
      const { data: row, error } = await supabase
        .from('quotes')
        .select('settings')
        .eq('id', d.invoice_id)
        .maybeSingle();
      if (error || !row) throw new Error('Could not load the invoice');
      const settings = (row.settings ?? {}) as Record<string, unknown>;
      const retention = {
        ...((settings.retention as Record<string, unknown>) ?? {}),
        released_at: new Date().toISOString(),
      };
      const { error: upErr } = await supabase
        .from('quotes')
        .update({ settings: { ...settings, retention } as never })
        .eq('id', d.invoice_id);
      if (upErr) throw upErr;
      await addNote.mutateAsync({
        invoiceId: d.invoice_id,
        kind: 'note',
        body: 'Retention released. It is now chased with the rest of the invoice.',
      });
      qc.invalidateQueries({ queryKey: DEBTORS_KEY });
      toast.success('Retention marked as released');
    } catch (e) {
      toast.error((e as Error).message || 'Could not update the retention');
    } finally {
      setReleasing(false);
    }
  };

  const stopped = d.paused || d.customer_paused || d.disputed;
  const nextLine = d.disputed
    ? 'Not chased: disputed'
    : d.paused
      ? 'Not chased: paused for this invoice'
      : d.customer_paused
        ? 'Not chased: paused for this customer'
        : d.promise_date && d.promise_date >= todayIso()
          ? `Not chased until after ${shortDate(d.promise_date)} (promised)`
          : d.next_chase
            ? `${shortDate(d.next_chase.date)}, ${d.next_chase.channel === 'sms' ? 'text' : 'email'} (${stepDayLabel(d.next_chase.offset).toLowerCase()})`
            : 'No automatic chase planned';

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow={`Invoice ${d.invoice_number ?? ''}`}
      title={d.client}
      description={`${gbp(d.due_now, true)} to collect${d.days_overdue > 0 ? `, ${d.days_overdue} days late` : d.due_on ? `, due ${shortDate(d.due_on)}` : ''}.`}
      footer={
        <PrimaryButton fullWidth onClick={chaseNow} disabled={chase.isPending || !d.client_email}>
          {chase.isPending
            ? 'Sending'
            : d.client_email
              ? `Email a ${TONE_LABEL[tone].toLowerCase()} reminder now`
              : 'No email on this invoice'}
        </PrimaryButton>
      }
    >
      <div className="space-y-6 lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start lg:gap-8 lg:space-y-0">
        <div className="space-y-6">
          <section>
            <PanelTitle title="Where it stands" meta={BUCKET_LABEL[d.bucket]} />
            <div className={cn(panel, 'overflow-hidden')}>
              <Rows>
                <KeyValue label="Invoice total" value={gbp(d.amount, true)} />
                {d.paid > 0 && (
                  <KeyValue label="Paid so far" value={gbp(d.paid, true)} tone="green" />
                )}
                {d.retention_held > 0 && (
                  <KeyValue
                    label={`Retention held${d.retention_release_date ? `, release ${shortDate(d.retention_release_date)}` : ''}`}
                    value={gbp(d.retention_held, true)}
                  />
                )}
                <KeyValue
                  label="To collect now"
                  value={gbp(d.due_now, true)}
                  tone={d.days_overdue > 0 ? 'red' : undefined}
                />
                <KeyValue label="Due" value={d.due_on ? shortDate(d.due_on) : 'No due date'} />
                <KeyValue
                  label="Last chased"
                  value={d.last_chased_at ? shortDate(d.last_chased_at) : 'Not yet'}
                />
                <KeyValue label="Next chase" value={nextLine} />
              </Rows>
            </div>
          </section>

          <section>
            <PanelTitle title="Chase now" />
            <div className={cn(panel, 'space-y-4 p-4 sm:p-5')}>
              <Field label="Tone of the email">
                <div className="flex flex-wrap gap-2">
                  {(['gentle', 'firm', 'final'] as ChaseTone[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTone(t)}
                      className={cn(
                        'h-11 rounded-full border px-4 text-[13px] touch-manipulation',
                        tone === t ? chipOn : chipOff
                      )}
                    >
                      {TONE_LABEL[t]}
                    </button>
                  ))}
                </div>
              </Field>
              <div className="flex flex-wrap gap-2">
                {smsHref ? (
                  <a
                    href={smsHref}
                    className={ghostBtn}
                    onClick={() =>
                      addNote.mutate({
                        invoiceId: d.invoice_id,
                        kind: 'chase',
                        body: `Texted ${d.client_phone}.`,
                      })
                    }
                  >
                    Send a text
                  </a>
                ) : null}
                {d.client_phone ? (
                  <a href={`tel:${d.client_phone.replace(/\s+/g, '')}`} className={ghostBtn}>
                    Call
                  </a>
                ) : (
                  <span className="text-[13px] text-white">No phone number on this invoice.</span>
                )}
              </div>
              {smsHref && (
                <p className="text-[12.5px] text-white">
                  The text opens on your phone ready to send: "{smsText}"
                </p>
              )}
            </div>
          </section>

          <section>
            <PanelTitle
              title="Promise to pay"
              meta={d.promise_date ? `Promised by ${shortDate(d.promise_date)}` : undefined}
            />
            <div className={cn(panel, 'space-y-3 p-4 sm:p-5')}>
              <p className="text-[13px] text-white">
                Automatic chasing waits until the day after the date they promised, then carries on.
              </p>
              <div className="grid gap-3 sm:grid-cols-[12rem_minmax(0,1fr)]">
                <Field label="They will pay by">
                  <Input
                    type="date"
                    value={promiseDate}
                    min={todayIso()}
                    onChange={(e) => setPromiseDate(e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="What they said">
                  <Input
                    value={promiseNote}
                    onChange={(e) => setPromiseNote(e.target.value)}
                    placeholder="Paying on Friday when the funds clear"
                    className={inputClass}
                  />
                </Field>
              </div>
              <button
                type="button"
                disabled={!promiseDate || addNote.isPending}
                onClick={async () => {
                  await addNote.mutateAsync({
                    invoiceId: d.invoice_id,
                    kind: 'promise',
                    promiseDate,
                    body: promiseNote || `Promised to pay by ${shortDate(promiseDate)}.`,
                  });
                  setPromiseDate('');
                  setPromiseNote('');
                  toast.success('Promise saved');
                }}
                className={cn(ghostBtn, 'disabled:opacity-50')}
              >
                Save the promise
              </button>
            </div>
          </section>

          <section>
            <PanelTitle
              title="Notes and history"
              meta={history ? `${history.notes.length + history.runs.length}` : undefined}
            />
            <div className={cn(panel, 'overflow-hidden')}>
              <div className="space-y-3 p-4 sm:p-5">
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  placeholder="Spoke to their accounts team, invoice is with the director"
                  className={textareaClass}
                />
                <button
                  type="button"
                  disabled={!note.trim() || addNote.isPending}
                  onClick={async () => {
                    await addNote.mutateAsync({
                      invoiceId: d.invoice_id,
                      kind: 'note',
                      body: note.trim(),
                    });
                    setNote('');
                  }}
                  className={cn(ghostBtn, 'disabled:opacity-50')}
                >
                  Add note
                </button>
              </div>
              <div className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
                {[
                  ...(history?.notes ?? []).map((n) => ({
                    at: n.created_at,
                    title: NOTE_LABEL[n.kind] ?? 'Note',
                    body: [n.body, n.created_by_name].filter(Boolean).join(' · '),
                  })),
                  ...(history?.runs ?? []).map((r) => ({
                    at: r.created_at,
                    title:
                      r.status === 'done'
                        ? 'Schedule'
                        : r.status === 'skipped'
                          ? 'Schedule, skipped'
                          : r.status === 'failed'
                            ? 'Schedule, failed'
                            : 'Schedule, sending',
                    body: r.summary,
                  })),
                ]
                  .sort((a, b) => b.at.localeCompare(a.at))
                  .map((h, i) => (
                    <div key={i} className="px-4 py-3 sm:px-5">
                      <p className="text-[14px] font-semibold text-white">
                        {h.title} <span className="font-normal">· {shortDate(h.at)}</span>
                      </p>
                      {h.body && <p className="mt-0.5 text-[13px] text-white">{h.body}</p>}
                    </div>
                  ))}
                {history && history.notes.length + history.runs.length === 0 && (
                  <p className="px-4 py-3 text-[13px] text-white sm:px-5">Nothing yet.</p>
                )}
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section>
            <PanelTitle title="Who the customer is" />
            <div className={cn(panel, 'space-y-3 p-4 sm:p-5')}>
              <div className="flex flex-wrap gap-2">
                {(['business', 'consumer'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() =>
                      setState.mutate({ invoiceId: d.invoice_id, patch: { debtor_type: t } })
                    }
                    className={cn(
                      'h-11 rounded-full border px-4 text-[13px] touch-manipulation',
                      d.debtor_type === t ? chipOn : chipOff
                    )}
                  >
                    {t === 'business' ? 'A business' : 'A homeowner or consumer'}
                  </button>
                ))}
              </div>
              <p className="text-[12.5px] text-white">
                {d.debtor_type === 'business'
                  ? 'Late payment interest and compensation can be claimed on this invoice.'
                  : d.debtor_type === 'consumer'
                    ? 'The late payment law for businesses does not apply to consumers, so no interest is offered.'
                    : d.company_name
                      ? `${d.company_name} looks like a business. Say which it is to see late payment interest.`
                      : 'Say which it is. Late payment interest is only for business customers.'}
              </p>
            </div>
          </section>

          {d.debtor_type === 'business' && (
            <section>
              <PanelTitle
                title="Late payment interest"
                meta={
                  d.interest_offered_at ? `Claimed ${shortDate(d.interest_offered_at)}` : undefined
                }
              />
              <div className={cn(panel, 'overflow-hidden')}>
                {claim ? (
                  <>
                    <Rows>
                      <KeyValue label="Amount late" value={gbp(claim.principal, true)} />
                      <KeyValue
                        label={`Interest at ${claim.rate}% a year, ${claim.daysLate} days`}
                        value={gbp(claim.interest, true)}
                      />
                      <KeyValue label="Fixed compensation" value={gbp(claim.compensation, true)} />
                      <KeyValue label="Total to claim" value={gbp(claim.total, true)} />
                    </Rows>
                    <div className="space-y-3 border-t border-white/[0.07] p-4 sm:p-5">
                      <p className="text-[12.5px] text-white">
                        Late Payment of Commercial Debts (Interest) Act 1998: 8% a year plus the
                        Bank of England base rate on {shortDate(claim.referenceDate)} (
                        {claim.baseRate}%), from the day after the due date, plus a fixed sum of
                        £40, £70 or £100 by the size of the debt, once per invoice. Not if your
                        contract sets its own late payment rate.
                      </p>
                      <button
                        type="button"
                        onClick={sendClaim}
                        disabled={chase.isPending || !d.client_email}
                        className={cn(ghostBtn, 'w-full disabled:opacity-50')}
                      >
                        Email the claim to {d.company_name || d.client}
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="p-4 text-[13px] text-white sm:p-5">
                    Nothing to claim until the invoice is past its due date.
                  </p>
                )}
              </div>
            </section>
          )}

          {d.retention_held > 0 && (
            <section>
              <PanelTitle title="Retention" meta={gbp(d.retention_held, true)} />
              <div className={cn(panel, 'space-y-3 p-4 sm:p-5')}>
                <p className="text-[13px] text-white">
                  {d.retention_release_date
                    ? `Due for release on ${shortDate(d.retention_release_date)}. You get a reminder that day.`
                    : 'No release date set.'}{' '}
                  It is not chased until you mark it released.
                </p>
                <button
                  type="button"
                  onClick={markReleased}
                  disabled={releasing}
                  className={cn(ghostBtn, 'w-full disabled:opacity-50')}
                >
                  Mark the retention released
                </button>
              </div>
            </section>
          )}

          <section>
            <PanelTitle title="Automatic chasing" meta={stopped ? 'Stopped' : undefined} />
            <div className={cn(panel, 'overflow-hidden')}>
              <div className="flex min-h-[60px] items-center justify-between gap-3 px-4 py-3 sm:px-5">
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-white">Pause this invoice</p>
                  <p className="text-[13px] text-white">
                    No automatic chasing on it until you turn this off.
                  </p>
                </div>
                <Switch
                  checked={d.paused}
                  onCheckedChange={(v) =>
                    setState.mutate({ invoiceId: d.invoice_id, patch: { paused: v } })
                  }
                  aria-label="Pause this invoice"
                />
              </div>
              <div className="flex min-h-[60px] items-center justify-between gap-3 border-t border-white/[0.07] px-4 py-3 sm:px-5">
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-white">Pause this customer</p>
                  <p className="text-[13px] text-white">
                    Every invoice for {d.company_name || d.client}.
                  </p>
                </div>
                <Switch
                  checked={d.customer_paused}
                  onCheckedChange={(v) =>
                    pauseCustomer.mutate({ key: d.customer_key, label: d.client, paused: v })
                  }
                  aria-label="Pause this customer"
                />
              </div>
              <div className="space-y-3 border-t border-white/[0.07] px-4 py-3 sm:px-5">
                <div className="flex min-h-[44px] items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-white">Disputed</p>
                    <p className="text-[13px] text-white">
                      {d.disputed
                        ? d.dispute_note || 'Chasing stopped.'
                        : 'Stops chasing while you sort it out.'}
                    </p>
                  </div>
                  <Switch
                    checked={d.disputed}
                    onCheckedChange={(v) =>
                      setState.mutate({
                        invoiceId: d.invoice_id,
                        patch: { disputed: v, ...(v ? { dispute_note: disputeNote || null } : {}) },
                      })
                    }
                    aria-label="Disputed"
                  />
                </div>
                {!d.disputed && (
                  <Input
                    value={disputeNote}
                    onChange={(e) => setDisputeNote(e.target.value)}
                    placeholder="What they are disputing (optional)"
                    className={inputClass}
                  />
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </FormSheet>
  );
}
