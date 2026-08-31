import { useMemo, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import {
  buildLetterBeforeAction,
  buildReminderLetter,
  calcStatutoryInterest,
  fixedCompensation,
  statutoryRate,
  SMALL_CLAIMS_GUIDANCE,
  type DebtorType,
} from '@/utils/latePaymentLetters';

// ELE-1158 — "Need help getting paid?" escalation sheet on overdue invoices.

interface LatePaymentHelpSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceId: string;
  clientName: string;
  clientEmail?: string | null;
  invoiceNumber: string;
  invoiceTotal: number;
  amountOutstanding: number;
  dueDateFormatted: string;
  daysOverdue: number;
  jobTitle?: string;
  jobLocation?: string;
}

const gbp = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n || 0);

export function LatePaymentHelpSheet({
  open,
  onOpenChange,
  invoiceId,
  clientName,
  clientEmail,
  invoiceNumber,
  invoiceTotal,
  amountOutstanding,
  dueDateFormatted,
  daysOverdue,
  jobTitle,
  jobLocation,
}: LatePaymentHelpSheetProps) {
  const navigate = useNavigate();
  const { companyProfile } = useCompanyProfile();
  const [debtorType, setDebtorType] = useState<DebtorType>('consumer');
  const [previewLetter, setPreviewLetter] = useState<'reminder' | 'lba' | null>(null);
  const [sending, setSending] = useState<'reminder' | 'lba' | null>(null);

  const interest = calcStatutoryInterest(amountOutstanding, daysOverdue, debtorType);
  const compensation = debtorType === 'business' ? fixedCompensation(amountOutstanding) : 0;
  const rate = statutoryRate(debtorType);
  const totalClaim = amountOutstanding + interest + compensation;

  const letterParams = useMemo(
    () => ({
      companyName: companyProfile?.company_name || 'Your company',
      clientName: clientName || 'Customer',
      invoiceNumber,
      invoiceTotal,
      amountOutstanding,
      dueDate: dueDateFormatted,
      daysOverdue,
      debtorType,
      jobTitle,
      jobLocation,
    }),
    [companyProfile?.company_name, clientName, invoiceNumber, invoiceTotal, amountOutstanding, dueDateFormatted, daysOverdue, debtorType, jobTitle, jobLocation]
  );

  const sendLetter = async (kind: 'reminder' | 'lba') => {
    if (sending) return;
    setSending(kind);
    const body = kind === 'reminder' ? buildReminderLetter(letterParams) : buildLetterBeforeAction(letterParams);
    const subject =
      kind === 'reminder'
        ? `Overdue invoice ${invoiceNumber} — payment reminder`
        : `Letter Before Action — invoice ${invoiceNumber}`;
    try {
      const { error } = await supabase.functions.invoke('send-payment-reminder', {
        body: {
          invoiceId,
          reminderType: kind === 'reminder' ? 'firm' : 'final',
          customSubject: subject,
          customBody: body,
        },
      });
      if (error) throw error;
      toast.success(kind === 'reminder' ? 'Reminder letter sent' : 'Letter Before Action sent', {
        description:
          kind === 'lba' && debtorType === 'consumer'
            ? `Emailed to ${clientEmail} — now post a printed copy with the Protocol forms. A copy is in your inbox.`
            : `Emailed to ${clientEmail} — a copy is in your inbox.`,
      });
    } catch {
      toast.error('Could not send — copy the letter and email it manually instead');
    } finally {
      setSending(null);
    }
  };

  const copyLetter = async (kind: 'reminder' | 'lba') => {
    const text =
      kind === 'reminder' ? buildReminderLetter(letterParams) : buildLetterBeforeAction(letterParams);
    try {
      await navigator.clipboard.writeText(text);
      toast.success(kind === 'reminder' ? 'Reminder letter copied' : 'Letter Before Action copied', {
        description: 'Paste it into an email or letter — details are pre-filled.',
      });
    } catch {
      toast.error('Could not copy — long-press the preview to copy instead');
      setPreviewLetter(kind);
    }
  };

  const stepCls =
    'rounded-xl border border-white/[0.08] bg-white/[0.02] p-4';
  const stepNumCls =
    'text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-t border-white/[0.06] bg-[hsl(0_0%_12%)]"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-center pt-3 pb-1 shrink-0">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>
          <div className="px-5 sm:px-6 pt-2 pb-4 border-b border-white/[0.06] shrink-0">
            <h2 className="text-[17px] font-semibold text-white tracking-tight">
              Get paid — your escalation path
            </h2>
            <p className="mt-0.5 text-[12px] text-white/60">
              Invoice {invoiceNumber} · {daysOverdue} days overdue
            </p>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6 py-4 space-y-4 pb-10">
            {/* Debtor type — the law differs */}
            <div className="grid grid-cols-2 gap-1.5">
              {(
                [
                  { id: 'consumer', label: 'Homeowner' },
                  { id: 'business', label: 'Business client' },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setDebtorType(t.id)}
                  className={cn(
                    'h-11 rounded-xl text-[13px] font-medium border touch-manipulation transition-colors',
                    debtorType === t.id
                      ? 'border-elec-yellow/60 text-elec-yellow bg-elec-yellow/10'
                      : 'border-white/[0.08] text-white/70 bg-white/[0.04]'
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* What they owe you now */}
            <div className="rounded-xl border border-white/[0.08] overflow-hidden">
              <div className="divide-y divide-white/[0.06] text-[13px]">
                <div className="flex justify-between px-4 py-2.5">
                  <span className="text-white/65">Outstanding</span>
                  <span className="font-semibold text-white tabular-nums">
                    {gbp(amountOutstanding)}
                  </span>
                </div>
                <div className="flex justify-between px-4 py-2.5">
                  <span className="text-white/65">
                    Interest · {rate}% p.a.
                    {debtorType === 'business' ? ' (1998 Act)' : ' (s.69 CCA 1984)'}
                  </span>
                  <span className="font-semibold text-white tabular-nums">{gbp(interest)}</span>
                </div>
                {debtorType === 'business' && (
                  <div className="flex justify-between px-4 py-2.5">
                    <span className="text-white/65">Fixed compensation (the Act)</span>
                    <span className="font-semibold text-white tabular-nums">
                      {gbp(compensation)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between px-4 py-3 bg-white/[0.03]">
                  <span className="font-semibold text-white">You can claim</span>
                  <span className="font-bold text-elec-yellow tabular-nums">{gbp(totalClaim)}</span>
                </div>
              </div>
            </div>

            {/* Step 1 — reminder */}
            <div className={stepCls}>
              <div className={stepNumCls}>Step 01</div>
              <h3 className="mt-1 text-[14.5px] font-semibold text-white">Formal payment reminder</h3>
              <p className="mt-1 text-[12px] text-white/60 leading-relaxed">
                Firm but civil — resolves most late payments without souring the relationship. Gives
                them 7 days.
              </p>
              <div className="mt-3 flex gap-2">
                {clientEmail && (
                  <button
                    onClick={() => sendLetter('reminder')}
                    disabled={sending !== null}
                    className="flex-1 h-11 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation disabled:bg-white/[0.08] disabled:text-white/70"
                  >
                    {sending === 'reminder' ? 'Sending…' : 'Email to client'}
                  </button>
                )}
                <button
                  onClick={() => copyLetter('reminder')}
                  className={cn(
                    'flex-1 h-11 rounded-xl text-[13px] font-semibold touch-manipulation',
                    clientEmail
                      ? 'border border-white/[0.1] text-white/80'
                      : 'bg-elec-yellow text-black'
                  )}
                >
                  Copy letter
                </button>
                <button
                  onClick={() => setPreviewLetter(previewLetter === 'reminder' ? null : 'reminder')}
                  className="h-11 px-4 rounded-xl border border-white/[0.08] text-white/70 text-[13px] font-medium touch-manipulation"
                >
                  {previewLetter === 'reminder' ? 'Hide' : 'Preview'}
                </button>
              </div>
              {previewLetter === 'reminder' && (
                <pre className="mt-3 p-3.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[11px] text-white/80 whitespace-pre-wrap leading-relaxed font-sans">
                  {buildReminderLetter(letterParams)}
                </pre>
              )}
            </div>

            {/* Step 2 — LBA */}
            <div className={stepCls}>
              <div className={stepNumCls}>Step 02</div>
              <h3 className="mt-1 text-[14.5px] font-semibold text-white">Letter Before Action</h3>
              <p className="mt-1 text-[12px] text-white/60 leading-relaxed">
                The formal final warning courts expect before a claim — cites the law, itemises the
                full amount, gives {debtorType === 'consumer' ? '30 days (the Debt Protocol period for individuals)' : '14 days'}. Most debts settle here.
              </p>
              <div className="mt-3 flex gap-2">
                {clientEmail && (
                  <button
                    onClick={() => sendLetter('lba')}
                    disabled={sending !== null}
                    className="flex-1 h-11 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation disabled:bg-white/[0.08] disabled:text-white/70"
                  >
                    {sending === 'lba' ? 'Sending…' : 'Email to client'}
                  </button>
                )}
                <button
                  onClick={() => copyLetter('lba')}
                  className={cn(
                    'flex-1 h-11 rounded-xl text-[13px] font-semibold touch-manipulation',
                    clientEmail
                      ? 'border border-white/[0.1] text-white/80'
                      : 'bg-elec-yellow text-black'
                  )}
                >
                  Copy letter
                </button>
                <button
                  onClick={() => setPreviewLetter(previewLetter === 'lba' ? null : 'lba')}
                  className="h-11 px-4 rounded-xl border border-white/[0.08] text-white/70 text-[13px] font-medium touch-manipulation"
                >
                  {previewLetter === 'lba' ? 'Hide' : 'Preview'}
                </button>
              </div>
              {debtorType === 'consumer' && (
                <p className="mt-2 text-[11px] text-amber-300/80 leading-relaxed">
                  For individuals the Protocol expects the letter by post: print and post a copy
                  with the Information Sheet and Reply Form (justice.gov.uk — Debt Protocol).
                  Email counts as an extra, not a substitute.
                </p>
              )}
              {previewLetter === 'lba' && (
                <pre className="mt-3 p-3.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[11px] text-white/80 whitespace-pre-wrap leading-relaxed font-sans">
                  {buildLetterBeforeAction(letterParams)}
                </pre>
              )}
            </div>

            {/* Step 3 — court */}
            <div className={stepCls}>
              <div className={stepNumCls}>Step 03</div>
              <h3 className="mt-1 text-[14.5px] font-semibold text-white">
                Small claims court (under £10k)
              </h3>
              <ul className="mt-2 space-y-2">
                {SMALL_CLAIMS_GUIDANCE.map((line) => (
                  <li key={line} className="flex gap-2 text-[12px] text-white/70 leading-relaxed">
                    <span aria-hidden className="text-elec-yellow shrink-0 leading-relaxed">
                      —
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/electrician/business-development')}
                className="mt-3 w-full h-11 rounded-xl border border-white/[0.08] text-white/80 text-[13px] font-medium touch-manipulation"
              >
                Full debt recovery guide
              </button>
            </div>

            <p className="text-[10.5px] text-white/45 leading-relaxed px-1">
              General guidance for England &amp; Wales, not legal advice. Interest rates reflect the
              Bank of England reference rate current at generation.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default LatePaymentHelpSheet;
