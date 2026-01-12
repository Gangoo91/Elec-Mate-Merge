import { useState } from 'react';
import { Quote } from '@/types/quote';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, CheckCircle, PoundSterling, CreditCard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface PartialPayment {
  id: string;
  amount: number;
  date: string;
  method: string;
  reference?: string;
  notes?: string;
}

interface PartialPaymentDialogProps {
  invoice: Quote;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaymentRecorded: () => void;
}

export const PartialPaymentDialog = ({
  invoice,
  open,
  onOpenChange,
  onPaymentRecorded,
}: PartialPaymentDialogProps) => {
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState<Date>(new Date());
  const [paymentMethod, setPaymentMethod] = useState<string>('bank_transfer');
  const [paymentReference, setPaymentReference] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value);

  // Calculate remaining balance
  const existingPayments = (invoice as any).partial_payments || [];
  const totalPaid = (invoice as any).total_paid || existingPayments.reduce((sum: number, p: PartialPayment) => sum + p.amount, 0);
  const remainingBalance = invoice.total - totalPaid;
  const paidPercentage = Math.min((totalPaid / invoice.total) * 100, 100);

  const handleRecordPayment = async () => {
    const paymentAmount = parseFloat(amount);

    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      toast({ title: 'Invalid amount', description: 'Please enter a valid payment amount', variant: 'destructive' });
      return;
    }

    if (paymentAmount > remainingBalance) {
      toast({ title: 'Amount exceeds balance', description: `Maximum payment is ${formatCurrency(remainingBalance)}`, variant: 'destructive' });
      return;
    }

    try {
      setIsSubmitting(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Create new payment record
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
      const isFullyPaid = newTotalPaid >= invoice.total;

      // Update quotes table with new payment
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

      // Also record in invoice_payments table
      const { error: paymentError } = await supabase
        .from('invoice_payments')
        .insert({
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
          : `${formatCurrency(paymentAmount)} payment recorded. ${formatCurrency(invoice.total - newTotalPaid)} remaining.`,
        variant: 'success',
      });

      onPaymentRecorded();
      onOpenChange(false);

      // Reset form
      setAmount('');
      setPaymentDate(new Date());
      setPaymentMethod('bank_transfer');
      setPaymentReference('');
      setNotes('');
    } catch (error) {
      console.error('Error recording payment:', error);
      toast({ title: 'Error', description: 'Failed to record payment. Please try again.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-border/50">
            <SheetTitle className="text-xl">Record Payment</SheetTitle>
            <SheetDescription>
              Invoice {invoice.invoice_number} - {invoice.client?.name}
            </SheetDescription>
          </SheetHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {/* Progress Card */}
            <div className="rounded-xl bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 border border-emerald-500/20 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400">
                  <PoundSterling className="h-5 w-5" />
                  <span className="font-medium">Payment Progress</span>
                </div>
                <span className="text-sm text-muted-foreground">{paidPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={paidPercentage} className="h-3 bg-emerald-500/20" />
              <div className="flex justify-between text-sm">
                <div>
                  <span className="text-muted-foreground">Paid: </span>
                  <span className="font-semibold text-emerald-400">{formatCurrency(totalPaid)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Remaining: </span>
                  <span className="font-semibold">{formatCurrency(remainingBalance)}</span>
                </div>
              </div>
              <div className="text-center pt-2 border-t border-emerald-500/20">
                <span className="text-xs text-muted-foreground">Invoice Total: </span>
                <span className="text-lg font-bold">{formatCurrency(invoice.total)}</span>
              </div>
            </div>

            {/* Payment History */}
            {existingPayments.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Payment History</h4>
                <div className="space-y-2">
                  {existingPayments.map((payment: PartialPayment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border/50">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{formatCurrency(payment.amount)}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(payment.date), 'dd MMM yyyy')} - {payment.method.replace('_', ' ')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Payment Form */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                New Payment
              </h4>

              {/* Payment Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">Payment Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    max={remainingBalance}
                    placeholder={`Max ${formatCurrency(remainingBalance)}`}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-7 h-12 text-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount((remainingBalance / 2).toFixed(2))}
                  >
                    50%
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(remainingBalance.toFixed(2))}
                  >
                    Full Balance
                  </Button>
                </div>
              </div>

              {/* Payment Date */}
              <div className="space-y-2">
                <Label>Payment Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal h-11">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(paymentDate, 'PPP')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={paymentDate}
                      onSelect={(date) => date && setPaymentDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="card">Card Payment</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                    <SelectItem value="bacs">BACS</SelectItem>
                    <SelectItem value="faster_payment">Faster Payment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Reference */}
              <div className="space-y-2">
                <Label htmlFor="payment-reference">
                  Reference <span className="text-muted-foreground text-xs">(Optional)</span>
                </Label>
                <Input
                  id="payment-reference"
                  placeholder="Transaction ID, Cheque Number, etc."
                  value={paymentReference}
                  onChange={(e) => setPaymentReference(e.target.value)}
                  className="h-11"
                />
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">
                  Notes <span className="text-muted-foreground text-xs">(Optional)</span>
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional payment details..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="border-t border-border/50 p-4 bg-background">
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting} className="flex-1 h-12">
                Cancel
              </Button>
              <Button
                onClick={handleRecordPayment}
                disabled={isSubmitting || !amount || parseFloat(amount) <= 0}
                className="flex-1 h-12 bg-emerald-500 hover:bg-emerald-600"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Recording...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Record Payment
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
