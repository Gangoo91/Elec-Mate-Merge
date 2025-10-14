import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MobileButton } from "@/components/ui/mobile-button";
import { ArrowLeft, FileText, Send, Edit, Eye, Bell, AlertCircle, Plus, Filter, Download, CheckCircle, Mail } from "lucide-react";
import { useInvoiceStorage } from "@/hooks/useInvoiceStorage";
import { format, isPast } from "date-fns";
import { Quote } from "@/types/quote";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import InvoiceTableView from "@/components/electrician/InvoiceTableView";
import InvoiceCardList from "@/components/electrician/InvoiceCardList";
import { InvoiceSendDropdown } from "@/components/electrician/invoice-builder/InvoiceSendDropdown";

const InvoicesPage = () => {
  const { invoices, isLoading, fetchInvoices, deleteInvoice } = useInvoiceStorage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get('highlight');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'sent' | 'overdue' | 'paid'>('all');
  const [markingPaidId, setMarkingPaidId] = useState<string | null>(null);
  const [downloadingPdfId, setDownloadingPdfId] = useState<string | null>(null);
  const [deletingInvoiceId, setDeletingInvoiceId] = useState<string | null>(null);

  // Poll PDF Monkey status via edge function until downloadUrl is ready (max ~90s)
  const pollPdfDownloadUrl = async (documentId: string, accessToken: string): Promise<string | null> => {
    for (let i = 0; i < 45; i++) {
      const { data } = await supabase.functions.invoke('generate-pdf-monkey', {
        body: { documentId, mode: 'status' },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (data?.downloadUrl) return data.downloadUrl;
      await new Promise((res) => setTimeout(res, 2000));
    }
    return null;
  };

  const canonical = `${window.location.origin}/electrician/invoices`;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount);
  };

  const getStatusBadge = (invoice: Quote) => {
    const status = invoice.invoice_status;
    const isOverdue = invoice.invoice_due_date && isPast(new Date(invoice.invoice_due_date));

    if (isOverdue || status === "overdue") {
      return (
        <Badge variant="destructive" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800">
          <AlertCircle className="h-3 w-3 mr-1" />
          Overdue
        </Badge>
      );
    }

    if (status === "sent") {
      return (
        <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800">
          <Send className="h-3 w-3 mr-1" />
          Sent
        </Badge>
      );
    }

    if (status === "draft") {
      return (
        <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800">
          <Edit className="h-3 w-3 mr-1" />
          Draft
        </Badge>
      );
    }

    if (status === "paid") {
      return (
        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800">
          <FileText className="h-3 w-3 mr-1" />
          Paid
        </Badge>
      );
    }

    return null;
  };

  const handleInvoiceAction = (invoice: Quote) => {
    const status = invoice.invoice_status;
    
    if (status === 'draft') {
      // Edit draft invoice
      navigate(`/electrician/invoice-quote-builder/${invoice.id}`);
    } else {
      // View sent/paid/overdue invoice
      navigate(`/electrician/invoices/${invoice.id}/view`);
    }
  };

  const handleDownloadPDF = async (invoice: Quote) => {
    try {
      setDownloadingPdfId(invoice.id);
      
      toast({
        title: 'Generating PDF',
        description: `Generating PDF for invoice ${invoice.invoice_number}...`,
      });

      // Fetch company profile
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data: companyData } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!companyData) {
        toast({
          title: 'Company profile required',
          description: 'Please set up your company profile before generating invoices',
          variant: 'destructive',
        });
        return;
      }

      // Generate professional PDF using PDF Monkey
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('User not authenticated');
      }

      const { data: pdfData, error: pdfError } = await supabase.functions.invoke('generate-pdf-monkey', {
        body: {
          quote: invoice,
          companyProfile: companyData,
          invoice_mode: true
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      let pdfUrl: string | undefined = pdfData?.downloadUrl;
      const documentId: string | undefined = pdfData?.documentId;
      if (!pdfUrl && documentId) {
        toast({ title: 'Preparing PDF…', description: `Finalising invoice ${invoice.invoice_number}…` });
        pdfUrl = await pollPdfDownloadUrl(documentId, session.access_token) || undefined;
      }

      if (pdfError || !pdfUrl) {
        throw new Error('Failed to generate professional PDF');
      }

      window.open(pdfUrl, '_blank');
      
      toast({
        title: 'PDF downloaded',
        description: `Invoice ${invoice.invoice_number} downloaded successfully.`,
      });
    } catch (error) {
      console.error('Error generating invoice PDF:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate invoice PDF. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setDownloadingPdfId(null);
    }
  };

  const handleSendSuccess = async () => {
    await fetchInvoices();
  };

  const handleMarkAsPaid = async (invoice: Quote) => {
    try {
      setMarkingPaidId(invoice.id);
      
      const { error } = await supabase
        .from('quotes')
        .update({ invoice_status: 'paid' })
        .eq('id', invoice.id);

      if (error) throw error;

      toast({
        title: 'Invoice marked as paid',
        description: `Invoice ${invoice.invoice_number} has been marked as paid.`,
      });
      
      await fetchInvoices();
    } catch (error) {
      console.error('Error marking invoice as paid:', error);
      toast({
        title: 'Error',
        description: 'Failed to mark invoice as paid. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setMarkingPaidId(null);
    }
  };

  const handleDeleteInvoice = async (invoiceId: string) => {
    setDeletingInvoiceId(invoiceId);
    const success = await deleteInvoice(invoiceId);
    if (success) {
      await fetchInvoices();
    }
    setDeletingInvoiceId(null);
  };

  const getActionButton = (invoice: Quote) => {
    const isOverdue = invoice.invoice_due_date && isPast(new Date(invoice.invoice_due_date));
    const status = invoice.invoice_status;

    if (isOverdue || status === "overdue") {
      return {
        text: "Send Reminder",
        icon: <Bell className="h-4 w-4" />,
        className: "bg-red-600 hover:bg-red-700 text-white border-red-600 font-medium",
        ariaLabel: `Send payment reminder for invoice ${invoice.invoice_number}`,
      };
    }

    if (status === "sent") {
      return {
        text: "View Invoice",
        icon: <Eye className="h-4 w-4" />,
        className: "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 font-medium",
        ariaLabel: `View invoice ${invoice.invoice_number}`,
      };
    }

    if (status === "draft") {
      return {
        text: "Edit Invoice",
        icon: <Edit className="h-4 w-4" />,
        className: "bg-elec-yellow hover:bg-elec-yellow/90 text-black border-elec-yellow font-medium",
        ariaLabel: `Edit invoice ${invoice.invoice_number}`,
      };
    }

    return {
      text: "View Invoice",
      icon: <Eye className="h-4 w-4" />,
      className: "bg-elec-yellow hover:bg-elec-yellow/90 text-black border-elec-yellow font-medium",
      ariaLabel: `View invoice ${invoice.invoice_number}`,
    };
  };

  // Filter invoices based on status
  const filteredInvoices = invoices.filter((invoice) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'overdue') {
      const isOverdue = invoice.invoice_due_date && isPast(new Date(invoice.invoice_due_date));
      return isOverdue || invoice.invoice_status === 'overdue';
    }
    return invoice.invoice_status === statusFilter;
  });

  // Sort by priority: overdue > sent > draft > paid
  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    const aOverdue = a.invoice_due_date && isPast(new Date(a.invoice_due_date));
    const bOverdue = b.invoice_due_date && isPast(new Date(b.invoice_due_date));
    
    if (aOverdue && !bOverdue) return -1;
    if (!aOverdue && bOverdue) return 1;
    
    const statusOrder = { overdue: 0, sent: 1, draft: 2, paid: 3 };
    return (statusOrder[a.invoice_status as keyof typeof statusOrder] || 4) - 
           (statusOrder[b.invoice_status as keyof typeof statusOrder] || 4);
  });

  // Stats
  const stats = {
    total: invoices.length,
    draft: invoices.filter(i => i.invoice_status === 'draft').length,
    sent: invoices.filter(i => i.invoice_status === 'sent').length,
    overdue: invoices.filter(i => {
      const isOverdue = i.invoice_due_date && isPast(new Date(i.invoice_due_date));
      return isOverdue || i.invoice_status === 'overdue';
    }).length,
    paid: invoices.filter(i => i.invoice_status === 'paid').length,
  };

  // Highlight invoice when navigating from quote
  useEffect(() => {
    if (highlightId) {
      setTimeout(() => {
        const element = document.getElementById(`invoice-${highlightId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('ring-2', 'ring-elec-yellow', 'animate-pulse');
          setTimeout(() => {
            element.classList.remove('animate-pulse');
          }, 2000);
        }
      }, 100);
    }
  }, [highlightId]);

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in px-0">
      <Helmet>
        <title>Invoices | ElecMate - Manage Your Electrical Invoices</title>
        <meta
          name="description"
          content="Manage all your electrical invoices in one place. Track drafts, sent invoices, payments and overdue invoices for your electrical business."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-elec-yellow" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Invoices
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Link to="/electrician" className="w-full sm:w-auto order-1 sm:order-2">
            <MobileButton variant="outline" className="w-full sm:w-auto justify-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Electrical Hub
            </MobileButton>
          </Link>
          <Link to="/electrician/quotes" className="w-full sm:w-auto order-2 sm:order-1">
            <MobileButton variant="elec" className="w-full sm:w-auto justify-center">
              <Plus className="mr-2 h-4 w-4" /> Raise Invoice
            </MobileButton>
          </Link>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        <Card 
          className={`cursor-pointer transition-all ${statusFilter === 'all' ? 'ring-2 ring-elec-yellow' : ''}`}
          onClick={() => setStatusFilter('all')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${statusFilter === 'draft' ? 'ring-2 ring-elec-yellow' : ''}`}
          onClick={() => setStatusFilter('draft')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-600">{stats.draft}</div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${statusFilter === 'sent' ? 'ring-2 ring-elec-yellow' : ''}`}
          onClick={() => setStatusFilter('sent')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.sent}</div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${statusFilter === 'overdue' ? 'ring-2 ring-elec-yellow' : ''}`}
          onClick={() => setStatusFilter('overdue')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${statusFilter === 'paid' ? 'ring-2 ring-elec-yellow' : ''}`}
          onClick={() => setStatusFilter('paid')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{stats.paid}</div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {statusFilter === 'all' ? 'All Invoices' : `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Invoices`}
              {sortedInvoices.length > 0 && ` (${sortedInvoices.length})`}
            </CardTitle>
            {statusFilter !== 'all' && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filter
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="mobile-card-spacing">
          {isLoading ? (
            <p className="text-muted-foreground text-center py-8">Loading invoices...</p>
          ) : sortedInvoices.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground mb-4">
                {statusFilter === 'all' 
                  ? 'No invoices yet'
                  : `No ${statusFilter} invoices`
                }
              </p>
              <Link to="/electrician/quotes">
                <MobileButton variant="elec">
                  <Plus className="mr-2 h-4 w-4" />
                  Raise Your First Invoice
                </MobileButton>
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop: Table View */}
              <InvoiceTableView
                invoices={sortedInvoices}
                onInvoiceAction={handleInvoiceAction}
                onDownloadPDF={handleDownloadPDF}
                onMarkAsPaid={handleMarkAsPaid}
                onSendSuccess={handleSendSuccess}
                onDeleteInvoice={handleDeleteInvoice}
                markingPaidId={markingPaidId}
                downloadingPdfId={downloadingPdfId}
                deletingInvoiceId={deletingInvoiceId}
              />

              {/* Mobile/Tablet: Card View */}
              <InvoiceCardList
                invoices={sortedInvoices}
                onInvoiceAction={handleInvoiceAction}
                onDownloadPDF={handleDownloadPDF}
                onMarkAsPaid={handleMarkAsPaid}
                onSendSuccess={handleSendSuccess}
                onDeleteInvoice={handleDeleteInvoice}
                markingPaidId={markingPaidId}
                downloadingPdfId={downloadingPdfId}
                deletingInvoiceId={deletingInvoiceId}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoicesPage;
