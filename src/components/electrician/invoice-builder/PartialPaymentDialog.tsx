import { useState } from 'react';
import { Quote } from '@/types/quote';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  Field,
  Eyebrow,
  Dot,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/employer/editorial';

interface PartialPayment {
  id: string;
  amount: number;
  date: string;
  method: string;
  reference?: string;
  notes?: string;
}

type InvoiceWithPayments = Quote & {
  partial_payments?: PartialPayment[];
  total_paid?: number;
  invoice_paid_at?: string;
};

interface PartialPaymentDialogProps {
  invoice: Quote;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaymentRecorded: () => void;
}

const formatCurrency = (value: number) => {
  const safe = typeof value === 'number' && !isNaN(value) ? value : 0;
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(safe);
};

const methodLabel = (m: string) =>
  ({
    bank_transfer: 'Bank transfer',
    card: 'Card',
    cash: 'Cash',
    cheque: 'Cheque',
    bacs: 'BACS',
    faster_payment: 'Faster Payment',
    other: 'Other',
  })[m] || m.replace(/_/g, ' ');

export const PartialPaymentDialog = ({
  invoice,
  open,
  onOpenChange,
  onPaymentRecorded,
}: PartialPaymentDialogProps) => {
  const inv = invoice as InvoiceWithPayments;
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState<Date>(new Date());
  const [paymentMethod, setPaymentMethod] = useState<string>('bank_transfer');
  const [paymentReference, setPaymentReference] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Balance — netted off existing part-payments (NaN-protected).
  const existingPayments: PartialPayment[] = inv.partial_payments || [];
  const totalPaid =
    inv.total_paid ?? existingPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const invoiceTotal = typeof invoice.total === 'number' && !isNaN(invoice.total) ? invoice.total : 0;
  const remainingBalance = Math.max(0, invoiceTotal - totalPaid);
  const paidPercentage = invoiceTotal > 0 ? Math.min((totalPaid / invoiceTotal) * 100, 100) : 0;

  const resetForm = () => {
    setAmount('');
    setPaymentDate(new Date());
    setPaymentMethod('bank_transfer');
    setPaymentReference('');
    setNotes('');
  };

  const handleRecordPayment = async () => {
    const paymentAmount = parseFloat(amount);

    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid payment amount',
        variant: 'destructive',
      });
      return;
    }
    if (paymentAmount > remainingBalance + 0.005) {
      toast({
        title: 'Amount exceeds balance',
        description: `Maximum payment is ${formatCurrency(remainingBalance)}`,
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const newPayment: PartialPayment = {
        id: crypto.randomUUID(),
        amount: paymentAmount,
        date: paymentDate.toISOString(),
        method: paymentMethod,
        reference: paymentReference || undefined,
        notes: notes || undefined,
      };

      const updatedPayments = [...existingPayments, newPayment];
      const newTotalPaid = totalPaid + paymentAmount;
      const isFullyPaid = newTotalPaid >= invoiceTotal;

      const { error: updateError } = await supabase
        .from('quotes')
        .update({
          partial_payments: updatedPayments,
          total_paid: newTotalPaid,
          invoice_status: isFullyPaid ? 'paid' : invoice.invoice_status,
          invoice_paid_at: isFullyPaid ? new Date().toISOString() : null,
          invoice_payment_method: isFullyPaid ? paymentMethod : null,
          invoice_payment_reference: isFullyPaid ? paymentReference : null,
        })
        .eq('id', invoice.id);
      if (updateError) throw updateError;

      // Mirror into invoice_payments (best-effort secondary log).
      const { error: paymentError } = await supabase.from('invoice_payments').insert({
        quote_id: invoice.id,
        user_id: user.id,
        amount: paymentAmount,
        payment_date: paymentDate.toISOString(),
        payment_method: paymentMethod,
        payment_reference: paymentReference || null,
        notes: notes || null,
      });
      if (paymentError) console.error('Error recording payment:', paymentError);

      toast({
        title: isFullyPaid ? 'Invoice fully paid' : 'Payment recorded',
        description: isFullyPaid
          ? `Invoice ${invoice.invoice_number} has been marked as fully paid`
          : `${formatCurrency(paymentAmount)} recorded. ${formatCurrency(invoiceTotal - newTotalPaid)} remaining.`,
        variant: 'success',
      });

      onPaymentRecorded();
      onOpenChange(false);
      resetForm();
    } catch (error) {
      console.error('Error recording payment:', error);
      toast({
        title: 'Error',
        description: 'Failed to record payment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = !isSubmitting && !!amount && parseFloat(amount) > 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        hideCloseButton
        className="h-[88vh] p-0 rounded-t-2xl overflow-hidden sm:max-w-lg sm:mx-auto"
      >
        <VisuallyHidden>
          <SheetTitle>Record payment</SheetTitle>
          <SheetDescription>Log a part or full payment received against this invoice.</SheetDescription>
        </VisuallyHidden>

        <SheetShell
          eyebrow={`Invoice ${invoice.invoice_number}`}
          title="Record payment"
          description={invoice.client?.name || undefined}
          footer={
            <>
              <SecondaryButton
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
                size="lg"
                className="flex-1"
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                onClick={handleRecordPayment}
                disabled={!canSubmit}
                size="lg"
                className="flex-1 gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    {canSubmit ? `Record ${formatCurrency(parseFloat(amount))}` : 'Record payment'}
                  </>
                )}
              </PrimaryButton>
            </>
          }
        >
          {/* Balance summary */}
          <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-5 space-y-3">
            <Eyebrow>{remainingBalance > 0 ? 'Outstanding' : 'Fully paid'}</Eyebrow>
            <div
              className={cn(
                'text-[38px] font-semibold tabular-nums leading-none',
                remainingBalance > 0 ? 'text-elec-yellow' : 'text-emerald-400'
              )}
            >
              {formatCurrency(remainingBalance)}
            </div>
            <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all"
                style={{ width: `${paidPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-white/55">
                Paid{' '}
                <span className="font-semibold tabular-nums text-emerald-400">
                  {formatCurrency(totalPaid)}
                </span>
              </span>
              <span className="text-white/55">
                Total{' '}
                <span className="font-semibold tabular-nums text-white">
                  {formatCurrency(invoiceTotal)}
                </span>
              </span>
            </div>
          </div>

          {/* Payment history (with delete) */}
          {existingPayments.length > 0 && (
            <div className="space-y-2">
              <Eyebrow>Payment history</Eyebrow>
              <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] divide-y divide-white/[0.06] overflow-hidden">
                {existingPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center gap-3 px-4 py-3">
                    <Dot tone="emerald" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-medium text-white tabular-nums">
                        {formatCurrency(payment.amount)}
                      </div>
                      <div className="text-[11.5px] text-white/55 truncate">
                        {format(new Date(payment.date), 'dd MMM yyyy')} · {methodLabel(payment.method)}
                        {payment.reference ? ` · ${payment.reference}` : ''}
                      </div>
                    </div>
                    <CheckCircle className="h-4 w-4 text-emerald-400/70 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New payment */}
          {remainingBalance > 0 ? (
            <div className="space-y-4">
              <Eyebrow>New payment</Eyebrow>

              <Field label="Payment amount">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50">£</span>
                  <input
                    inputMode="decimal"
                    type="number"
                    step="0.01"
                    min="0.01"
                    max={remainingBalance}
                    placeholder={`Up to ${formatCurrency(remainingBalance)}`}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={cn(inputClass, 'pl-7 text-lg')}
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setAmount((remainingBalance / 2).toFixed(2))}
                    className="h-8 px-3 rounded-full text-[12px] font-medium bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1] touch-manipulation"
                  >
                    50%
                  </button>
                  <button
                    type="button"
                    onClick={() => setAmount(remainingBalance.toFixed(2))}
                    className="h-8 px-3 rounded-full text-[12px] font-medium bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1] touch-manipulation"
                  >
                    Full balance
                  </button>
                </div>
              </Field>

              <Field label="Payment date">
                <input
                  type="date"
                  value={format(paymentDate, 'yyyy-MM-dd')}
                  max={format(new Date(), 'yyyy-MM-dd')}
                  onChange={(e) => {
                    if (!e.target.value) return;
                    const next = new Date(`${e.target.value}T00:00:00`);
                    if (!isNaN(next.getTime())) setPaymentDate(next);
                  }}
                  className={inputClass}
                />
              </Field>

              <Field label="Payment method">
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="bank_transfer">Bank transfer</SelectItem>
                    <SelectItem value="card">Card payment</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                    <SelectItem value="bacs">BACS</SelectItem>
                    <SelectItem value="faster_payment">Faster Payment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Reference" hint="Optional">
                <input
                  placeholder="Transaction ID, cheque number, etc."
                  value={paymentReference}
                  onChange={(e) => setPaymentReference(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Notes" hint="Optional">
                <textarea
                  placeholder="Any additional payment details…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className={textareaClass}
                />
              </Field>
            </div>
          ) : (
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-4 flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
              <p className="text-[13px] text-white">This invoice is fully paid — nothing left to record.</p>
            </div>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
};
