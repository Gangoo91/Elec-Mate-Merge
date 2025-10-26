import { useMemo, useState, useEffect } from 'react';
import { Quote } from '@/types/quote';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Send,
  CheckCircle,
  AlertTriangle,
  Eye,
  Mail,
  PoundSterling,
  History,
} from 'lucide-react';
import { InvoiceSendDropdown } from './InvoiceSendDropdown';
import { MarkAsPaidDialog } from './MarkAsPaidDialog';
import { PaymentHistoryDialog } from './PaymentHistoryDialog';
import { formatDistanceToNow, differenceInDays } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';

interface InvoiceStatusPanelProps {
  invoices: Quote[];
  onRefresh: () => void;
}

export const InvoiceStatusPanel = ({ invoices, onRefresh }: InvoiceStatusPanelProps) => {
  const navigate = useNavigate();
  const [selectedInvoiceForPayment, setSelectedInvoiceForPayment] = useState<Quote | null>(null);
  const [selectedInvoiceForHistory, setSelectedInvoiceForHistory] = useState<Quote | null>(null);
  const [reminderHistory, setReminderHistory] = useState<Map<string, any[]>>(new Map());

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

  // Fetch reminder history for all invoices
  useEffect(() => {
    const fetchReminderHistory = async () => {
      if (invoices.length === 0) return;

      const { data } = await supabase
        .from('invoice_reminders')
        .select('*')
        .in('quote_id', invoices.map(i => i.id))
        .order('sent_at', { ascending: false });

      const historyMap = new Map();
      data?.forEach(reminder => {
        if (!historyMap.has(reminder.quote_id)) {
          historyMap.set(reminder.quote_id, []);
        }
        historyMap.get(reminder.quote_id).push(reminder);
      });

      setReminderHistory(historyMap);
    };

    fetchReminderHistory();
  }, [invoices]);

  // Categorize invoices
  const categorizedInvoices = useMemo(() => {
    const now = new Date();

    const draft = invoices.filter((inv) => inv.invoice_status === 'draft');
    const sent = invoices.filter(
      (inv) =>
        inv.invoice_status === 'sent' &&
        (!inv.invoice_due_date || new Date(inv.invoice_due_date) >= now)
    );
    const paid = invoices.filter((inv) => inv.invoice_status === 'paid');
    const overdue = invoices.filter(
      (inv) =>
        inv.invoice_status !== 'paid' &&
        inv.invoice_due_date &&
        new Date(inv.invoice_due_date) < now
    );

    return { draft, sent, paid, overdue };
  }, [invoices]);

  const renderInvoiceCard = (invoice: Quote, showActions: 'send' | 'paid' | 'view' = 'view') => {
    const daysOverdue = invoice.invoice_due_date
      ? differenceInDays(new Date(), new Date(invoice.invoice_due_date))
      : 0;

    return (
      <div
        key={invoice.id}
        className={`border rounded-xl p-5 md:p-6 space-y-4 hover:shadow-lg transition-all ${
          showActions === 'paid' ? 'bg-success/5 border-success/20' : 'bg-card border-primary/20'
        } ${daysOverdue > 0 && showActions !== 'paid' ? 'border-destructive/50 bg-destructive/5' : ''}`}
      >
        {/* Header: Invoice number + Status */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-primary/10">
          <div className="space-y-2 flex-1 min-w-0">
            <h4 className="font-semibold text-base truncate">{invoice.invoice_number}</h4>
            <p className="text-sm text-muted-foreground truncate">{invoice.client?.name}</p>
          </div>
          <div className="flex flex-col gap-1 items-end shrink-0">
            {daysOverdue > 0 && showActions !== 'paid' && (
              <Badge variant="destructive" className="text-xs whitespace-nowrap">
                {daysOverdue}d overdue
              </Badge>
            )}
            {showActions === 'paid' && (
              <Badge variant="default" className="text-xs bg-success whitespace-nowrap">
                Paid
              </Badge>
            )}
          </div>
        </div>

        {/* Amount - Centered and Prominent */}
        <div className="text-center py-4 bg-background/50 rounded-lg border border-primary/10">
          <div className="text-xs text-muted-foreground mb-1">Total Amount</div>
          <div className="text-2xl md:text-3xl font-bold text-elec-yellow">
            {formatCurrency(invoice.total)}
          </div>
        </div>

        {/* Dates Grid - 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {invoice.invoice_date && (
            <div className="space-y-0.5">
              <div className="text-muted-foreground font-medium">Invoice Date</div>
              <div className="text-foreground">{new Date(invoice.invoice_date).toLocaleDateString('en-GB')}</div>
            </div>
          )}
          {invoice.invoice_due_date && (
            <div className="space-y-0.5">
              <div className="text-muted-foreground font-medium">Due Date</div>
              <div className={daysOverdue > 0 && showActions !== 'paid' ? 'text-destructive font-semibold' : 'text-foreground'}>
                {new Date(invoice.invoice_due_date).toLocaleDateString('en-GB')}
              </div>
            </div>
          )}
          {invoice.invoice_sent_at && (
            <div className="space-y-0.5">
              <div className="text-muted-foreground font-medium">Sent</div>
              <div className="text-foreground">
                {formatDistanceToNow(new Date(invoice.invoice_sent_at), { addSuffix: true })}
              </div>
            </div>
          )}
          {invoice.invoice_paid_at && (
            <div className="space-y-0.5">
              <div className="text-muted-foreground font-medium">Paid</div>
              <div className="text-foreground">{new Date(invoice.invoice_paid_at).toLocaleDateString('en-GB')}</div>
            </div>
          )}
        </div>

        {/* Reminder History */}
        {reminderHistory.has(invoice.id) && reminderHistory.get(invoice.id)!.length > 0 && (
          <Badge variant="outline" className="text-xs w-full justify-center">
            <Mail className="h-3 w-3 mr-1" />
            Last reminder: {formatDistanceToNow(new Date(reminderHistory.get(invoice.id)![0].sent_at), { addSuffix: true })}
            {' '}({reminderHistory.get(invoice.id)![0].reminder_type})
          </Badge>
        )}

        {/* Action Buttons - Stack on mobile, row on desktop */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/electrician/quote-builder/view/${invoice.id}`)}
            className="w-full sm:w-auto min-h-[44px] sm:min-h-0"
          >
            <Eye className="mr-1 h-3 w-3" />
            View Quote
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/electrician/invoices/${invoice.id}/view`)}
            className="w-full sm:w-auto min-h-[44px] sm:min-h-0"
          >
            <FileText className="mr-1 h-3 w-3" />
            View Invoice
          </Button>

          {showActions === 'send' && (
            <InvoiceSendDropdown invoice={invoice} onSuccess={onRefresh} className="sm:ml-auto w-full sm:w-auto" />
          )}

          {showActions === 'paid' && (
            <>
              {invoice.invoice_payment_method && (
                <Badge variant="outline" className="w-full sm:w-auto justify-center sm:ml-auto">
                  {invoice.invoice_payment_method.replace(/_/g, ' ')}
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedInvoiceForHistory(invoice)}
                className="w-full sm:w-auto min-h-[44px] sm:min-h-0"
              >
                <History className="mr-1 h-3 w-3" />
                Payment History
              </Button>
            </>
          )}

          {showActions === 'view' && invoice.invoice_status === 'sent' && (
            <Button
              variant="success"
              size="sm"
              onClick={() => setSelectedInvoiceForPayment(invoice)}
              className="sm:ml-auto w-full sm:w-auto min-h-[44px] sm:min-h-0"
            >
              <PoundSterling className="mr-1 h-3 w-3" />
              Mark Paid
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
            <FileText className="h-5 w-5 md:h-6 md:w-6" />
            Invoice Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sent" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="sent" className="text-xs sm:text-sm">
                <Send className="h-3 w-3 sm:mr-1" />
                <span className="hidden sm:inline">Sent</span> ({categorizedInvoices.sent.length})
              </TabsTrigger>
              <TabsTrigger value="draft" className="text-xs sm:text-sm">
                <FileText className="h-3 w-3 sm:mr-1" />
                <span className="hidden sm:inline">Draft</span> ({categorizedInvoices.draft.length})
              </TabsTrigger>
              <TabsTrigger value="paid" className="text-xs sm:text-sm">
                <CheckCircle className="h-3 w-3 sm:mr-1" />
                <span className="hidden sm:inline">Paid</span> ({categorizedInvoices.paid.length})
              </TabsTrigger>
              <TabsTrigger value="overdue" className="text-xs sm:text-sm">
                <AlertTriangle className="h-3 w-3 sm:mr-1" />
                <span className="hidden sm:inline">Overdue</span> (
                {categorizedInvoices.overdue.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sent" className="space-y-4 mt-4">
              {categorizedInvoices.sent.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Send className="h-16 w-16 mx-auto mb-3 opacity-20" />
                  <p className="text-base">No sent invoices awaiting payment</p>
                </div>
              ) : (
                categorizedInvoices.sent.map((invoice) => renderInvoiceCard(invoice, 'view'))
              )}
            </TabsContent>

            <TabsContent value="draft" className="space-y-4 mt-4">
              {categorizedInvoices.draft.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-16 w-16 mx-auto mb-3 opacity-20" />
                  <p className="text-base">No draft invoices</p>
                </div>
              ) : (
                categorizedInvoices.draft.map((invoice) => renderInvoiceCard(invoice, 'send'))
              )}
            </TabsContent>

            <TabsContent value="paid" className="space-y-4 mt-4">
              {categorizedInvoices.paid.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckCircle className="h-16 w-16 mx-auto mb-3 opacity-20" />
                  <p className="text-base">No paid invoices yet</p>
                </div>
              ) : (
                categorizedInvoices.paid.map((invoice) => renderInvoiceCard(invoice, 'paid'))
              )}
            </TabsContent>

            <TabsContent value="overdue" className="space-y-4 mt-4">
              {categorizedInvoices.overdue.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckCircle className="h-16 w-16 mx-auto mb-3 opacity-20 text-success" />
                  <p className="text-base text-success">No overdue invoices! 🎉</p>
                </div>
              ) : (
                categorizedInvoices.overdue.map((invoice) => renderInvoiceCard(invoice, 'view'))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {selectedInvoiceForPayment && (
        <MarkAsPaidDialog
          invoice={selectedInvoiceForPayment}
          open={!!selectedInvoiceForPayment}
          onOpenChange={(open) => !open && setSelectedInvoiceForPayment(null)}
          onSuccess={onRefresh}
        />
      )}

      {selectedInvoiceForHistory && (
        <PaymentHistoryDialog
          invoice={selectedInvoiceForHistory}
          open={!!selectedInvoiceForHistory}
          onOpenChange={(open) => !open && setSelectedInvoiceForHistory(null)}
        />
      )}
    </>
  );
};
