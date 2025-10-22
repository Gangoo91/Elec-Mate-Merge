import { useMemo, useState } from 'react';
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
  DollarSign,
} from 'lucide-react';
import { InvoiceSendDropdown } from './InvoiceSendDropdown';
import { MarkAsPaidDialog } from './MarkAsPaidDialog';
import { formatDistanceToNow, differenceInDays } from 'date-fns';

interface InvoiceStatusPanelProps {
  invoices: Quote[];
  onRefresh: () => void;
}

export const InvoiceStatusPanel = ({ invoices, onRefresh }: InvoiceStatusPanelProps) => {
  const navigate = useNavigate();
  const [selectedInvoiceForPayment, setSelectedInvoiceForPayment] = useState<Quote | null>(null);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

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
        className={`border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow ${
          showActions === 'paid' ? 'bg-success/5 border-success/20' : 'bg-card'
        } ${daysOverdue > 0 && showActions !== 'paid' ? 'border-destructive' : ''}`}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">{invoice.invoice_number}</h4>
              {daysOverdue > 0 && showActions !== 'paid' && (
                <Badge variant="destructive" className="text-xs">
                  {daysOverdue} {daysOverdue === 1 ? 'day' : 'days'} overdue
                </Badge>
              )}
              {showActions === 'paid' && (
                <Badge variant="default" className="text-xs bg-success">
                  Paid
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{invoice.client?.name}</p>
          </div>
          <p className="text-lg font-bold">{formatCurrency(invoice.total)}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          {invoice.invoice_date && (
            <div>
              <span className="font-medium">Invoice Date:</span>{' '}
              {new Date(invoice.invoice_date).toLocaleDateString('en-GB')}
            </div>
          )}
          {invoice.invoice_due_date && (
            <div>
              <span className="font-medium">Due Date:</span>{' '}
              {new Date(invoice.invoice_due_date).toLocaleDateString('en-GB')}
            </div>
          )}
          {invoice.invoice_sent_at && (
            <div>
              <span className="font-medium">Sent:</span>{' '}
              {formatDistanceToNow(new Date(invoice.invoice_sent_at), { addSuffix: true })}
            </div>
          )}
          {invoice.invoice_paid_at && (
            <div>
              <span className="font-medium">Paid:</span>{' '}
              {new Date(invoice.invoice_paid_at).toLocaleDateString('en-GB')}
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/electrician/quote-builder/view/${invoice.id}`)}
          >
            <Eye className="mr-1 h-3 w-3" />
            View Quote
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/electrician/invoices/view/${invoice.id}`)}
          >
            <FileText className="mr-1 h-3 w-3" />
            View Invoice
          </Button>

          {showActions === 'send' && (
            <InvoiceSendDropdown invoice={invoice} onSuccess={onRefresh} className="ml-auto" />
          )}

          {showActions === 'paid' && invoice.invoice_payment_method && (
            <Badge variant="outline" className="ml-auto">
              {invoice.invoice_payment_method.replace('_', ' ')}
            </Badge>
          )}

          {showActions === 'view' && invoice.invoice_status === 'sent' && (
            <Button
              variant="default"
              size="sm"
              onClick={() => setSelectedInvoiceForPayment(invoice)}
              className="ml-auto"
            >
              <DollarSign className="mr-1 h-3 w-3" />
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
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
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

            <TabsContent value="sent" className="space-y-3 mt-4">
              {categorizedInvoices.sent.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Send className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p>No sent invoices awaiting payment</p>
                </div>
              ) : (
                categorizedInvoices.sent.map((invoice) => renderInvoiceCard(invoice, 'view'))
              )}
            </TabsContent>

            <TabsContent value="draft" className="space-y-3 mt-4">
              {categorizedInvoices.draft.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p>No draft invoices</p>
                </div>
              ) : (
                categorizedInvoices.draft.map((invoice) => renderInvoiceCard(invoice, 'send'))
              )}
            </TabsContent>

            <TabsContent value="paid" className="space-y-3 mt-4">
              {categorizedInvoices.paid.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p>No paid invoices yet</p>
                </div>
              ) : (
                categorizedInvoices.paid.map((invoice) => renderInvoiceCard(invoice, 'paid'))
              )}
            </TabsContent>

            <TabsContent value="overdue" className="space-y-3 mt-4">
              {categorizedInvoices.overdue.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-2 opacity-20 text-success" />
                  <p className="text-success">No overdue invoices! 🎉</p>
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
    </>
  );
};
