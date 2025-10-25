import { useState, useEffect } from 'react';
import { Quote } from '@/types/quote';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { PoundSterling, Calendar, CreditCard, FileText } from 'lucide-react';

interface Payment {
  id: string;
  quote_id: string;
  amount: number;
  payment_date: string;
  payment_method: string;
  payment_reference?: string;
  notes?: string;
  created_at: string;
}

interface PaymentHistoryDialogProps {
  invoice: Quote;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PaymentHistoryDialog = ({
  invoice,
  open,
  onOpenChange,
}: PaymentHistoryDialogProps) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

  useEffect(() => {
    if (open && invoice.id) {
      fetchPayments();
    }
  }, [open, invoice.id]);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('invoice_payments')
        .select('*')
        .eq('quote_id', invoice.id)
        .order('payment_date', { ascending: false });

      if (error) throw error;
      setPayments(data || []);
    } catch (error) {
      console.error('Error fetching payment history:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Payment History</DialogTitle>
          <DialogDescription>
            Invoice {invoice.invoice_number} • Total: {formatCurrency(invoice.total)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Summary */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Total Paid</p>
              <p className="text-2xl font-bold text-success">{formatCurrency(totalPaid)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Outstanding</p>
              <p className="text-2xl font-bold">
                {formatCurrency(Math.max(0, invoice.total - totalPaid))}
              </p>
            </div>
          </div>

          {/* Payment List */}
          <ScrollArea className="h-[400px] pr-4">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading payments...</div>
            ) : payments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <PoundSterling className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>No payment records found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="border rounded-lg p-4 space-y-2 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <PoundSterling className="h-4 w-4 text-success" />
                          <span className="font-bold text-lg">{formatCurrency(payment.amount)}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {payment.payment_method.replace(/_/g, ' ')}
                        </Badge>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(payment.payment_date), 'dd MMM yyyy')}
                        </div>
                      </div>
                    </div>

                    {payment.payment_reference && (
                      <div className="flex items-center gap-2 text-sm">
                        <CreditCard className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Ref:</span>
                        <span className="font-mono">{payment.payment_reference}</span>
                      </div>
                    )}

                    {payment.notes && (
                      <div className="flex items-start gap-2 text-sm">
                        <FileText className="h-3 w-3 text-muted-foreground mt-0.5" />
                        <p className="text-muted-foreground">{payment.notes}</p>
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground">
                      Recorded {format(new Date(payment.created_at), "dd MMM yyyy 'at' HH:mm")}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
