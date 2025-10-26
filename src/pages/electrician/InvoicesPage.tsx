import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MobileButton } from "@/components/ui/mobile-button";
import { ArrowLeft, FileText, Send, Edit, Eye, Bell, AlertCircle, Plus, Filter, Download, CheckCircle, Mail, LayoutDashboard, PoundSterling } from "lucide-react";
import { useInvoiceStorage } from "@/hooks/useInvoiceStorage";
import { format, isPast } from "date-fns";
import { Quote } from "@/types/quote";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import InvoiceCardView from "@/components/electrician/InvoiceCardView";
import { InvoiceSendDropdown } from "@/components/electrician/invoice-builder/InvoiceSendDropdown";
import { EmptyStateGuide } from "@/components/electrician/shared/EmptyStateGuide";

const InvoicesPage = () => {
  const { invoices, isLoading, fetchInvoices, deleteInvoice } = useInvoiceStorage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get('highlight');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'sent' | 'overdue' | 'paid'>('all');
  const [markingPaidId, setMarkingPaidId] = useState<string | null>(null);
  const [downloadingPdfId, setDownloadingPdfId] = useState<string | null>(null);
  const [deletingInvoiceId, setDeletingInvoiceId] = useState<string | null>(null);
  const [sharingWhatsAppId, setSharingWhatsAppId] = useState<string | null>(null);
  const [sharingEmailId, setSharingEmailId] = useState<string | null>(null);

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
      
      // Check if we have a current PDF
      const pdfIsCurrent = invoice.pdf_url && invoice.pdf_generated_at && 
        new Date(invoice.pdf_generated_at) >= new Date(invoice.updatedAt);
      
      if (pdfIsCurrent) {
        // Use cached PDF - instant! No toast needed.
        window.open(invoice.pdf_url, '_blank');
        setDownloadingPdfId(null);
        return;
      }

      // PDF is stale or missing - regenerate
      toast({
        title: 'Generating PDF',
        description: `Creating latest version for invoice ${invoice.invoice_number}...`,
        duration: 5000,
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
        pdfUrl = await pollPdfDownloadUrl(documentId, session.access_token) || undefined;
      }

      if (pdfError || !pdfUrl) {
        throw new Error('Failed to generate professional PDF');
      }

      // Store PDF metadata for future use
      if (pdfUrl && documentId) {
        await supabase
          .from('quotes')
          .update({
            pdf_document_id: documentId,
            pdf_url: pdfUrl,
            pdf_generated_at: new Date().toISOString()
          })
          .eq('id', invoice.id);
      }

      window.open(pdfUrl, '_blank');
      
      toast({
        title: 'PDF downloaded',
        description: `Invoice ${invoice.invoice_number} downloaded successfully`,
        variant: 'success',
        duration: 3000,
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

  const handleShareWhatsApp = async (invoice: Quote) => {
    setSharingWhatsAppId(invoice.id);
    try {
      toast({
        title: 'Preparing PDF',
        description: 'Generating shareable link for WhatsApp...',
        duration: 5000,
      });

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('User not authenticated');

      // Use the generate-temporary-pdf-link edge function to get a stable public URL
      const { data: linkData, error: linkError } = await supabase.functions.invoke(
        'generate-temporary-pdf-link',
        {
          body: {
            documentId: invoice.id,
            documentType: 'invoice'
          },
          headers: { Authorization: `Bearer ${session.access_token}` }
        }
      );

      if (linkError || !linkData?.publicUrl) {
        throw new Error('Failed to generate shareable PDF link');
      }

      const pdfDownloadUrl = linkData.publicUrl;

      const clientData = typeof (invoice as any).client_data === 'string' 
        ? JSON.parse((invoice as any).client_data) 
        : (invoice as any).client_data;

      const dueDate = invoice.invoice_due_date 
        ? format(new Date(invoice.invoice_due_date), 'dd MMM yyyy')
        : 'Upon receipt';

      const message = `Hello ${clientData?.name || 'there'},

Here is your invoice from ${clientData?.company || 'our company'}:

📄 Invoice #${invoice.invoice_number}
💷 Amount: ${formatCurrency(invoice.total)}
📅 Due Date: ${dueDate}

📥 Download Invoice (PDF):
${pdfDownloadUrl}

If you have any questions, please don't hesitate to contact us.

Thank you for your business!`;

      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      toast({
        title: 'Opening WhatsApp',
        description: 'Invoice ready to share via WhatsApp',
      });
    } catch (error) {
      console.error('Error sharing via WhatsApp:', error);
      toast({
        title: 'Error',
        description: 'Failed to prepare invoice for WhatsApp. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSharingWhatsAppId(null);
    }
  };

  const handleShareEmail = async (invoice: Quote) => {
    setSharingEmailId(invoice.id);
    try {
      toast({
        title: 'Preparing PDF',
        description: 'Generating shareable link for email...',
        duration: 5000,
      });

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('User not authenticated');

      // Use the generate-temporary-pdf-link edge function to get a stable public URL
      const { data: linkData, error: linkError } = await supabase.functions.invoke(
        'generate-temporary-pdf-link',
        {
          body: {
            documentId: invoice.id,
            documentType: 'invoice'
          },
          headers: { Authorization: `Bearer ${session.access_token}` }
        }
      );

      if (linkError || !linkData?.publicUrl) {
        throw new Error('Failed to generate shareable PDF link');
      }

      const pdfDownloadUrl = linkData.publicUrl;

      // Fetch fresh invoice data for email content
      const { data: freshInvoice, error: fetchError } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', invoice.id)
        .single();

      if (fetchError || !freshInvoice) {
        throw new Error('Failed to fetch invoice data');
      }

      const clientData = typeof freshInvoice.client_data === 'string' 
        ? JSON.parse(freshInvoice.client_data) 
        : freshInvoice.client_data;

      const dueDate = freshInvoice.invoice_due_date 
        ? format(new Date(freshInvoice.invoice_due_date), 'dd MMM yyyy')
        : 'Upon receipt';

      const subject = `Invoice ${freshInvoice.invoice_number} - ${formatCurrency(freshInvoice.total)}`;
      const body = `Hello ${clientData?.name || 'there'},

Please find attached your invoice:

Invoice #${freshInvoice.invoice_number}
Amount: ${formatCurrency(freshInvoice.total)}
Due Date: ${dueDate}

Download your invoice here:
${pdfDownloadUrl}

If you have any questions, please contact us.

Thank you for your business!`;

      const mailtoUrl = `mailto:${clientData?.email || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;

      toast({
        title: 'Opening Email',
        description: 'Invoice ready to send via email',
      });
    } catch (error) {
      console.error('Error sharing via email:', error);
      toast({
        title: 'Error',
        description: 'Failed to prepare invoice for email. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSharingEmailId(null);
    }
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
    // Calculate monetary totals
    totalValue: invoices.reduce((sum, inv) => sum + inv.total, 0),
    draftValue: invoices.filter(i => i.invoice_status === 'draft').reduce((sum, inv) => sum + inv.total, 0),
    sentValue: invoices.filter(i => i.invoice_status === 'sent').reduce((sum, inv) => sum + inv.total, 0),
    overdueValue: invoices.filter(i => {
      const isOverdue = i.invoice_due_date && isPast(new Date(i.invoice_due_date));
      return isOverdue || i.invoice_status === 'overdue';
    }).reduce((sum, inv) => sum + inv.total, 0),
    paidValue: invoices.filter(i => i.invoice_status === 'paid').reduce((sum, inv) => sum + inv.total, 0),
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
      <header className="relative bg-card border-b">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative px-4 py-8 space-y-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/electrician/business" className="hover:text-foreground transition-colors">
              Business Hub
            </Link>
            <span>/</span>
            <span>Invoices</span>
          </nav>

          {/* Title and Back Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Invoices
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage and track all your electrical invoices
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link to="/electrician/quote-invoice-dashboard" className="w-full sm:w-auto">
                <MobileButton variant="outline" size="wide" className="sm:w-auto">
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Workflow Dashboard
                </MobileButton>
              </Link>
              <Link to="/electrician" className="w-full sm:w-auto">
                <MobileButton variant="secondary" size="wide" className="sm:w-auto">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Electrical Hub
                </MobileButton>
              </Link>
              <Link to="/electrician/invoice-builder/create" className="w-full sm:w-auto">
                <MobileButton variant="elec" size="wide" className="sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" /> Create Invoice
                </MobileButton>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="px-4 md:px-6 py-6 md:py-8 space-y-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          <Card 
            className={`cursor-pointer transition-all hover:border-elec-yellow/40 ${statusFilter === 'all' ? 'ring-2 ring-elec-yellow border-elec-yellow/30' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <FileText className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Total</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-3xl font-bold">{stats.total}</div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <PoundSterling className="h-3.5 w-3.5" />
                <span>{stats.totalValue.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:border-slate-400/40 ${statusFilter === 'draft' ? 'ring-2 ring-slate-400 border-slate-400/30' : ''}`}
            onClick={() => setStatusFilter('draft')}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Edit className="h-5 w-5 text-slate-400" />
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Draft</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-3xl font-bold text-slate-400">{stats.draft}</div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <PoundSterling className="h-3.5 w-3.5" />
                <span>{stats.draftValue.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:border-blue-400/40 ${statusFilter === 'sent' ? 'ring-2 ring-blue-400 border-blue-400/30' : ''}`}
            onClick={() => setStatusFilter('sent')}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Send className="h-5 w-5 text-blue-400" />
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Sent</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-3xl font-bold text-blue-400">{stats.sent}</div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <PoundSterling className="h-3.5 w-3.5" />
                <span>{stats.sentValue.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:border-red-400/40 ${statusFilter === 'overdue' ? 'ring-2 ring-red-400 border-red-400/30' : ''}`}
            onClick={() => setStatusFilter('overdue')}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Overdue</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-3xl font-bold text-red-600">{stats.overdue}</div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <PoundSterling className="h-3.5 w-3.5" />
                <span>{stats.overdueValue.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:border-green-400/40 ${statusFilter === 'paid' ? 'ring-2 ring-green-400 border-green-400/30' : ''}`}
            onClick={() => setStatusFilter('paid')}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Paid</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-3xl font-bold text-green-400">{stats.paid}</div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <PoundSterling className="h-3.5 w-3.5" />
                <span>{stats.paidValue.toFixed(2)}</span>
              </div>
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
          ) : sortedInvoices.length === 0 && statusFilter === 'all' ? (
            <div className="mt-8">
              <EmptyStateGuide 
                type="invoice" 
                onCreateClick={() => navigate('/electrician/invoice-builder/create')} 
              />
            </div>
          ) : sortedInvoices.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground mb-4">
                No {statusFilter} invoices
              </p>
              <Link to="/electrician/invoice-builder/create">
                <MobileButton variant="elec">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Invoice
                </MobileButton>
              </Link>
            </div>
          ) : (
            <InvoiceCardView
              invoices={sortedInvoices}
              onInvoiceAction={handleInvoiceAction}
              onDownloadPDF={handleDownloadPDF}
              onMarkAsPaid={handleMarkAsPaid}
              onSendSuccess={handleSendSuccess}
              onDeleteInvoice={handleDeleteInvoice}
              onShareWhatsApp={handleShareWhatsApp}
              onShareEmail={handleShareEmail}
              markingPaidId={markingPaidId}
              downloadingPdfId={downloadingPdfId}
              deletingInvoiceId={deletingInvoiceId}
              formatCurrency={formatCurrency}
            />
          )}
        </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;
