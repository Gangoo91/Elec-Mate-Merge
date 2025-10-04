import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Mail, Edit, CheckCircle, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Quote } from "@/types/quote";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const InvoiceViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isMarkingPaid, setIsMarkingPaid] = useState(false);

  useEffect(() => {
    fetchInvoice();
  }, [id]);

  const fetchInvoice = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Authentication required',
          description: 'Please sign in to view invoice',
          variant: 'destructive',
        });
        return;
      }

      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('user_id', user.id)
        .eq('id', id)
        .eq('invoice_raised', true)
        .single();

      if (error) throw error;

      setInvoice({
        id: data.id,
        quoteNumber: data.quote_number,
        client: data.client_data as any,
        items: data.items as any,
        settings: data.settings as any,
        subtotal: parseFloat(String(data.subtotal)),
        overhead: parseFloat(String(data.overhead)),
        profit: parseFloat(String(data.profit)),
        vatAmount: parseFloat(String(data.vat_amount)),
        total: parseFloat(String(data.total)),
        status: data.status as any,
        tags: (data.tags || []) as any,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
        expiryDate: new Date(data.expiry_date),
        notes: data.notes,
        invoice_raised: data.invoice_raised,
        invoice_number: data.invoice_number,
        invoice_date: data.invoice_date ? new Date(data.invoice_date) : undefined,
        invoice_due_date: data.invoice_due_date ? new Date(data.invoice_due_date) : undefined,
        invoice_status: data.invoice_status as any,
        work_completion_date: data.work_completion_date ? new Date(data.work_completion_date) : undefined,
      });
    } catch (error) {
      console.error('Error fetching invoice:', error);
      toast({
        title: 'Error loading invoice',
        description: 'Failed to load invoice. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!invoice) return;
    
    toast({
      title: 'Generating PDF',
      description: 'Your invoice PDF is being generated...',
    });
    
    // TODO: Implement PDF generation
  };

  const handleSendInvoice = async () => {
    if (!invoice) return;
    
    try {
      setIsSending(true);
      
      const { error } = await supabase.functions.invoke('send-invoice', {
        body: { invoiceId: invoice.id }
      });

      if (error) throw error;

      toast({
        title: 'Invoice sent',
        description: `Invoice sent to ${invoice.client?.email}`,
      });

      // Update status to sent
      await supabase
        .from('quotes')
        .update({ invoice_status: 'sent' })
        .eq('id', invoice.id);
      
      fetchInvoice();
    } catch (error) {
      console.error('Error sending invoice:', error);
      toast({
        title: 'Error sending invoice',
        description: 'Failed to send invoice. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleMarkAsPaid = async () => {
    if (!invoice) return;
    
    try {
      setIsMarkingPaid(true);
      
      const { error } = await supabase
        .from('quotes')
        .update({ invoice_status: 'paid' })
        .eq('id', invoice.id);

      if (error) throw error;

      toast({
        title: 'Invoice marked as paid',
        description: `Invoice ${invoice.invoice_number} has been marked as paid.`,
      });
      
      fetchInvoice();
    } catch (error) {
      console.error('Error marking invoice as paid:', error);
      toast({
        title: 'Error',
        description: 'Failed to mark invoice as paid. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsMarkingPaid(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount);
  };

  const getStatusBadge = () => {
    if (!invoice) return null;
    
    const variants: Record<string, { variant: string; className: string; label: string }> = {
      draft: { variant: 'outline', className: 'bg-slate-50 text-slate-700 border-slate-200', label: 'Draft' },
      sent: { variant: 'secondary', className: 'bg-blue-50 text-blue-700 border-blue-200', label: 'Sent' },
      overdue: { variant: 'destructive', className: 'bg-red-50 text-red-700 border-red-200', label: 'Overdue' },
      paid: { variant: 'secondary', className: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Paid' },
    };

    const status = variants[invoice.invoice_status || 'draft'];
    return <Badge className={status.className}>{status.label}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading invoice...</p>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Invoice not found</AlertDescription>
        </Alert>
        <Link to="/electrician/invoices">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Invoices
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Helmet>
        <title>Invoice {invoice.invoice_number} | ElecMate</title>
        <meta name="description" content={`View invoice ${invoice.invoice_number} for ${invoice.client?.name}`} />
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Invoice {invoice.invoice_number}
            </h1>
            {getStatusBadge()}
          </div>
          <p className="text-muted-foreground">
            Client: {invoice.client?.name}
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Link to="/electrician/invoices" className="flex-1 sm:flex-initial">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button onClick={handleDownloadPDF} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
        
        {invoice.invoice_status !== 'paid' && (
          <>
            <Button 
              onClick={handleSendInvoice} 
              disabled={isSending}
              variant="outline"
            >
              <Mail className="mr-2 h-4 w-4" />
              {isSending ? 'Sending...' : 'Send Invoice'}
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" disabled={isMarkingPaid}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Paid
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Mark invoice as paid?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will mark invoice {invoice.invoice_number} as paid. This action can be undone by editing the invoice.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleMarkAsPaid}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
        
        <Link to={`/electrician/invoice-quote-builder/${invoice.id}`}>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Invoice
          </Button>
        </Link>
      </div>

      {/* Invoice Details */}
      <div className="grid gap-6">
        {/* Invoice Info */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Invoice Number</p>
                <p className="font-medium">{invoice.invoice_number}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium">{invoice.invoice_status}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Issue Date</p>
                <p className="font-medium">
                  {invoice.invoice_date ? format(invoice.invoice_date, 'dd MMM yyyy') : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Due Date</p>
                <p className="font-medium">
                  {invoice.invoice_due_date ? format(invoice.invoice_due_date, 'dd MMM yyyy') : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Details */}
        <Card>
          <CardHeader>
            <CardTitle>Client Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{invoice.client?.name}</p>
            </div>
            {invoice.client?.email && (
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{invoice.client.email}</p>
              </div>
            )}
            {invoice.client?.phone && (
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{invoice.client.phone}</p>
              </div>
            )}
            {invoice.client?.address && (
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium whitespace-pre-line">{invoice.client.address}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Items */}
        <Card>
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoice.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-start pb-4 border-b last:border-0">
                  <div className="flex-1">
                    <p className="font-medium">{item.description}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity} × {formatCurrency(item.unitPrice)}
                    </p>
                  </div>
                  <p className="font-medium">{formatCurrency(item.total)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Totals */}
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">{formatCurrency(invoice.subtotal)}</span>
            </div>
            {invoice.overhead > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Overhead</span>
                <span className="font-medium">{formatCurrency(invoice.overhead)}</span>
              </div>
            )}
            {invoice.profit > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Profit</span>
                <span className="font-medium">{formatCurrency(invoice.profit)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">VAT (20%)</span>
              <span className="font-medium">{formatCurrency(invoice.vatAmount)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold">{formatCurrency(invoice.total)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvoiceViewPage;
