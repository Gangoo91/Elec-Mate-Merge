import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppReview } from '@/hooks/useAppReview';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  FileText,
  Send,
  Edit,
  Eye,
  AlertCircle,
  Plus,
  CheckCircle,
  TrendingUp,
  Search,
  ArrowLeft,
  X,
  RefreshCw,
  Clock,
  LayoutGrid,
  List,
  PoundSterling,
  ChevronRight,
} from 'lucide-react';
import { useInvoiceStorage } from '@/hooks/useInvoiceStorage';
import { isPast, addHours } from 'date-fns';
import { Quote } from '@/types/quote';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import InvoiceCardView from '@/components/electrician/InvoiceCardView';
import InvoiceTableView from '@/components/electrician/InvoiceTableView';
import { EmptyStateGuide } from '@/components/electrician/shared/EmptyStateGuide';
import { cn } from '@/lib/utils';
import { VoiceHeaderButton } from '@/components/electrician/VoiceHeaderButton';
import { QuoteInvoiceAnalytics } from '@/components/electrician/analytics';
import StripeConnectBanner from '@/components/electrician/StripeConnectBanner';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { createQuickTaskBatch } from '@/utils/createQuickTask';
import { ClipboardCheck } from 'lucide-react';
import { openExternalUrl } from '@/utils/open-external-url';

const InvoicesPage = () => {
  const { invoices, isLoading, fetchInvoices, deleteInvoice, lastUpdated } = useInvoiceStorage();
  const navigate = useNavigate();
  const { recordPositiveAction } = useAppReview();
  const [searchParams, setSearchParams] = useSearchParams();
  const highlightId = searchParams.get('highlight');
  const activeFilter = searchParams.get('filter') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [markingPaidId, setMarkingPaidId] = useState<string | null>(null);
  const [downloadingPdfId, setDownloadingPdfId] = useState<string | null>(null);
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState('Invoice.pdf');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [deletingInvoiceId, setDeletingInvoiceId] = useState<string | null>(null);
  const [sharingWhatsAppId, setSharingWhatsAppId] = useState<string | null>(null);
  const [sharingEmailId, setSharingEmailId] = useState<string | null>(null);
  const [stripeRefreshKey, setStripeRefreshKey] = useState(0);
  const [creatingChaseTasks, setCreatingChaseTasks] = useState(false);

  // Pull to refresh handler
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchInvoices();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [fetchInvoices]);

  // Poll PDF Monkey status with progress feedback
  const pollPdfDownloadUrl = async (
    documentId: string,
    accessToken: string
  ): Promise<string | null> => {
    const maxAttempts = 45;
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const { data } = await supabase.functions.invoke('generate-pdf-monkey', {
          body: { documentId, mode: 'status' },
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (data?.downloadUrl) return data.downloadUrl;
      } catch {
        // Network error — retry silently
      }
      if (i === 15) {
        toast({
          title: 'Still generating',
          description: 'Large documents can take up to 60 seconds...',
          duration: 5000,
        });
      }
      await new Promise((res) => setTimeout(res, 2000));
    }
    return null;
  };

  // Retry helper for sharing functions
  const retryAsync = async <T,>(fn: () => Promise<T>, attempts = 3, delayMs = 2000): Promise<T> => {
    for (let i = 0; i < attempts; i++) {
      try {
        return await fn();
      } catch (err) {
        if (i === attempts - 1) throw err;
        await new Promise((res) => setTimeout(res, delayMs * (i + 1)));
      }
    }
    throw new Error('All retry attempts failed');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  };

  const handleFilterChange = (filter: string) => {
    if (filter === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ filter });
    }
  };

  const handleInvoiceAction = (invoice: Quote) => {
    const status = invoice.invoice_status;
    if (status === 'draft') {
      navigate(`/electrician/invoice-quote-builder/${invoice.id}`);
    } else {
      navigate(`/electrician/invoices/${invoice.id}/view`);
    }
  };

  const handleDownloadPDF = async (invoice: Quote) => {
    try {
      setDownloadingPdfId(invoice.id);
      setGeneratedPdfUrl(null);
      setGenerationError(null);
      setShowGenerationDialog(true);

      const pdfIsCurrent =
        invoice.pdf_url &&
        invoice.pdf_generated_at &&
        new Date(invoice.pdf_generated_at) >= new Date(invoice.updatedAt);

      if (pdfIsCurrent) {
        setGeneratedPdfUrl(invoice.pdf_url);
        setPdfFilename(`Invoice-${invoice.invoice_number || invoice.id}.pdf`);
        setDownloadingPdfId(null);
        return;
      }

      toast({
        title: 'Generating PDF',
        description: `Creating latest version for invoice ${invoice.invoice_number}...`,
        duration: 5000,
      });

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

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

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('User not authenticated');

      const { data: pdfData, error: pdfError } = await supabase.functions.invoke(
        'generate-pdf-monkey',
        {
          body: { quote: invoice, companyProfile: companyData, invoice_mode: true },
          headers: { Authorization: `Bearer ${session.access_token}` },
        }
      );

      let pdfUrl: string | undefined = pdfData?.downloadUrl;
      const documentId: string | undefined = pdfData?.documentId;
      if (!pdfUrl && documentId) {
        pdfUrl = (await pollPdfDownloadUrl(documentId, session.access_token)) || undefined;
      }

      if (pdfError || !pdfUrl) throw new Error('Failed to generate professional PDF');

      if (pdfUrl && documentId) {
        await supabase
          .from('quotes')
          .update({
            pdf_document_id: documentId,
            pdf_url: pdfUrl,
            pdf_generated_at: new Date().toISOString(),
          })
          .eq('id', invoice.id);
      }

      setGeneratedPdfUrl(pdfUrl);
      setPdfFilename(`Invoice-${invoice.invoice_number || invoice.id}.pdf`);
      toast({
        title: 'PDF ready',
        description: `Invoice ${invoice.invoice_number} downloaded successfully`,
        variant: 'success',
        duration: 3000,
      });
    } catch (error) {
      // PDF generation failed
      setGenerationError(error instanceof Error ? error.message : 'Failed to generate invoice PDF');
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
      recordPositiveAction();
      await fetchInvoices();
    } catch (error) {
      // Mark as paid failed
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
    if (success) await fetchInvoices();
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
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('User not authenticated');

      const linkData = await retryAsync(async () => {
        const { data, error } = await supabase.functions.invoke(
          'generate-temporary-pdf-link',
          {
            body: { documentId: invoice.id, documentType: 'invoice' },
            headers: { Authorization: `Bearer ${session.access_token}` },
          }
        );
        if (error || !data?.publicUrl) throw new Error('Failed to generate shareable PDF link');
        return data;
      });

      const clientData =
        typeof (invoice as any).client_data === 'string'
          ? JSON.parse((invoice as any).client_data)
          : (invoice as any).client_data;

      const message = `Hello ${clientData?.name || 'there'},\n\nHere is your invoice:\n\n📄 Invoice #${invoice.invoice_number}\n💷 Amount: ${formatCurrency(invoice.total)}\n\n📥 Download Invoice:\n${linkData.publicUrl}\n\nThank you for your business!`;

      await openExternalUrl(`https://wa.me/?text=${encodeURIComponent(message)}`);
      toast({ title: 'Opening WhatsApp', description: 'Invoice ready to share via WhatsApp' });
    } catch (error) {
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
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('User not authenticated');

      const linkData = await retryAsync(async () => {
        const { data, error } = await supabase.functions.invoke(
          'generate-temporary-pdf-link',
          {
            body: { documentId: invoice.id, documentType: 'invoice' },
            headers: { Authorization: `Bearer ${session.access_token}` },
          }
        );
        if (error || !data?.publicUrl) throw new Error('Failed to generate shareable PDF link');
        return data;
      });

      const { data: freshInvoice, error: fetchError } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', invoice.id)
        .single();
      if (fetchError || !freshInvoice) throw new Error('Failed to fetch invoice data');

      const clientData =
        typeof freshInvoice.client_data === 'string'
          ? JSON.parse(freshInvoice.client_data)
          : freshInvoice.client_data;

      const subject = `Invoice ${freshInvoice.invoice_number} - ${formatCurrency(freshInvoice.total)}`;
      const body = `Hello ${clientData?.name || 'there'},\n\nPlease find attached your invoice:\n\nInvoice #${freshInvoice.invoice_number}\nAmount: ${formatCurrency(freshInvoice.total)}\n\nDownload your invoice here:\n${linkData.publicUrl}\n\nThank you for your business!`;

      window.location.href = `mailto:${clientData?.email || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      toast({ title: 'Opening Email', description: 'Invoice ready to send via email' });
    } catch (error) {
      // Email sharing failed after retries
      toast({
        title: 'Error',
        description: 'Failed to prepare invoice for email. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSharingEmailId(null);
    }
  };

  // Calculate stats
  const stats = useMemo(() => {
    const draft = invoices.filter((i) => i.invoice_status === 'draft');
    const sent = invoices.filter((i) => i.invoice_status === 'sent');
    const overdue = invoices.filter((i) => {
      if (i.invoice_status === 'paid') return false;
      if (i.invoice_status === 'overdue') return true;
      return i.invoice_due_date && isPast(addHours(new Date(i.invoice_due_date), 24));
    });
    const paid = invoices.filter((i) => i.invoice_status === 'paid');
    const monthlyPaid = paid.reduce((sum, inv) => {
      const total = typeof inv.total === 'number' && !isNaN(inv.total) ? inv.total : 0;
      return sum + total;
    }, 0);

    return {
      total: invoices.length,
      draft: draft.length,
      sent: sent.length,
      overdue: overdue.length,
      paid: paid.length,
      monthlyTotal: monthlyPaid,
    };
  }, [invoices]);

  // Chase task creation for overdue invoices
  const handleCreateChaseTasks = async () => {
    setCreatingChaseTasks(true);
    try {
      const overdueInvoices = invoices.filter((i) => {
        if (i.invoice_status === 'paid') return false;
        if (i.invoice_status === 'overdue') return true;
        return i.invoice_due_date && isPast(addHours(new Date(i.invoice_due_date), 24));
      });

      const tasks = overdueInvoices.map((inv) => ({
        title: `Chase payment: Invoice ${inv.invoice_number || ''}${inv.client?.name ? ` — ${inv.client.name}` : ''}`.trim(),
        priority: 'high' as const,
        dueAt: new Date().toISOString(),
        tags: ['chase', 'invoice'],
      }));

      const count = await createQuickTaskBatch(tasks);
      toast({
        title: 'Chase tasks created',
        description: `${count} chase ${count === 1 ? 'task' : 'tasks'} added to your task list.`,
      });
    } catch (error: any) {
      toast({
        title: 'Failed',
        description: error?.message || 'Could not create chase tasks.',
        variant: 'destructive',
      });
    } finally {
      setCreatingChaseTasks(false);
    }
  };

  // Filter invoices
  const filteredInvoices = useMemo(() => {
    let filtered = invoices;

    if (activeFilter !== 'all') {
      if (activeFilter === 'overdue') {
        filtered = filtered.filter((i) => {
          if (i.invoice_status === 'paid') return false;
          if (i.invoice_status === 'overdue') return true;
          return i.invoice_due_date && isPast(addHours(new Date(i.invoice_due_date), 24));
        });
      } else {
        filtered = filtered.filter((i) => i.invoice_status === activeFilter);
      }
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (i) =>
          i.client?.name?.toLowerCase().includes(query) ||
          i.jobDetails?.title?.toLowerCase().includes(query) ||
          i.invoice_number?.toLowerCase().includes(query)
      );
    }

    // Sort by priority: overdue > sent > draft > paid
    return [...filtered].sort((a, b) => {
      const aOverdue = a.invoice_due_date && isPast(addHours(new Date(a.invoice_due_date), 24));
      const bOverdue = b.invoice_due_date && isPast(addHours(new Date(b.invoice_due_date), 24));
      if (aOverdue && !bOverdue) return -1;
      if (!aOverdue && bOverdue) return 1;
      const statusOrder = { overdue: 0, sent: 1, draft: 2, paid: 3 };
      return (
        (statusOrder[a.invoice_status as keyof typeof statusOrder] || 4) -
        (statusOrder[b.invoice_status as keyof typeof statusOrder] || 4)
      );
    });
  }, [invoices, activeFilter, searchQuery]);

  const filters = [
    { id: 'all', label: 'All', count: invoices.length, icon: FileText },
    { id: 'draft', label: 'Draft', count: stats.draft, icon: Clock },
    { id: 'sent', label: 'Sent', count: stats.sent, icon: Send },
    { id: 'overdue', label: 'Overdue', count: stats.overdue, icon: AlertCircle },
    { id: 'paid', label: 'Paid', count: stats.paid, icon: CheckCircle },
  ];

  // Detect ?stripe=success when returning from Stripe onboarding
  useEffect(() => {
    const stripeParam = searchParams.get('stripe');
    if (stripeParam === 'success') {
      toast({
        title: 'Stripe Connected!',
        description: 'You can now accept card payments on invoices.',
        variant: 'success',
        duration: 5000,
      });
      // Clean URL - remove stripe param
      searchParams.delete('stripe');
      setSearchParams(searchParams, { replace: true });
      // Trigger refresh of Stripe status in child components
      setStripeRefreshKey((prev) => prev + 1);
      // Refresh invoice list
      fetchInvoices();
    } else if (stripeParam === 'refresh') {
      toast({
        title: 'Complete Stripe Setup',
        description: 'Please finish connecting your Stripe account.',
        duration: 5000,
      });
      searchParams.delete('stripe');
      setSearchParams(searchParams, { replace: true });
    }
  }, []); // Only run once on mount

  // Highlight invoice when navigating from quote
  useEffect(() => {
    if (highlightId) {
      setTimeout(() => {
        const element = document.getElementById(`invoice-${highlightId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('ring-2', 'ring-emerald-400', 'animate-pulse');
          setTimeout(() => element.classList.remove('animate-pulse'), 2000);
        }
      }, 100);
    }
  }, [highlightId]);

  const canonical = `${window.location.origin}/electrician/invoices`;

  return (
    <div className="bg-background animate-fade-in">
      <Helmet>
        <title>Invoices | Elec-Mate</title>
        <meta
          name="description"
          content="Manage all your electrical invoices. Track drafts, sent invoices, payments and overdue invoices."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Header — exact QuotesPage pattern */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="flex items-center h-14 px-4 gap-2">
          {isSearchOpen ? (
            <>
              <div className="flex-1 relative">
                <Input
                  autoFocus
                  placeholder="Search invoices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 pl-4 pr-10 bg-white/[0.06] border-0 rounded-full text-base touch-manipulation"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                )}
              </div>
              <button
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                className="text-sm text-white font-medium px-2 touch-manipulation"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/electrician/business')}
                className="h-10 w-10 -ml-2 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.98] transition-all touch-manipulation"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="flex-1 text-lg font-semibold text-white">Invoices</h1>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.98] transition-all touch-manipulation"
              >
                <Search className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={() => navigate('/electrician/invoice-builder/create')}
                className="h-10 w-10 rounded-xl bg-elec-yellow flex items-center justify-center active:scale-[0.98] touch-manipulation"
              >
                <Plus className="h-5 w-5 text-black" />
              </button>
            </>
          )}
        </div>

        {/* Filter pills */}
        {!isSearchOpen && (
          <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={cn(
                  'flex-shrink-0 h-8 px-3 rounded-lg text-xs font-medium transition-all touch-manipulation active:scale-[0.98]',
                  activeFilter === filter.id
                    ? 'bg-elec-yellow/15 text-elec-yellow border border-elec-yellow/25'
                    : 'bg-white/[0.04] text-white border border-white/[0.08] hover:bg-white/[0.07]'
                )}
              >
                {filter.label}
                {filter.count > 0 && (
                  <span className="ml-1.5 text-white/50">{filter.count}</span>
                )}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <main className="px-4 py-4 space-y-4 pb-24">
        {/* Stripe Connect Banner */}
        <StripeConnectBanner refreshKey={stripeRefreshKey} />

        {/* Revenue hero card — matching QuotesPage pipeline card */}
        <div className="relative rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400 opacity-60" />
          <div className="p-4">
            {/* Main value */}
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <p className="text-[11px] text-white uppercase tracking-wider">Total Revenue</p>
                <p className="text-[28px] font-bold text-elec-yellow leading-tight mt-0.5">
                  £{stats.monthlyTotal.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-white">Paid</p>
                <p className="text-[20px] font-bold text-emerald-400 leading-tight">{stats.paid}</p>
              </div>
            </div>
            {/* Secondary stats */}
            <div className="flex gap-0 rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
              <button
                onClick={() => handleFilterChange('overdue')}
                className="flex-1 py-2.5 text-center touch-manipulation active:bg-white/[0.04] transition-colors"
              >
                <p className="text-[10px] text-white">Overdue</p>
                <p className={cn('text-[14px] font-bold', stats.overdue > 0 ? 'text-red-400' : 'text-white')}>{stats.overdue}</p>
              </button>
              <div className="w-px h-10 self-center bg-white/[0.06]" />
              <button
                onClick={() => handleFilterChange('sent')}
                className="flex-1 py-2.5 text-center touch-manipulation active:bg-white/[0.04] transition-colors"
              >
                <p className="text-[10px] text-white">Sent</p>
                <p className="text-[14px] font-bold text-blue-400">{stats.sent}</p>
              </button>
              <div className="w-px h-10 self-center bg-white/[0.06]" />
              <button
                onClick={() => handleFilterChange('draft')}
                className="flex-1 py-2.5 text-center touch-manipulation active:bg-white/[0.04] transition-colors"
              >
                <p className="text-[10px] text-white">Drafts</p>
                <p className="text-[14px] font-bold text-white">{stats.draft}</p>
              </button>
              <div className="w-px h-10 self-center bg-white/[0.06]" />
              <button
                onClick={() => handleFilterChange('all')}
                className="flex-1 py-2.5 text-center touch-manipulation active:bg-white/[0.04] transition-colors"
              >
                <p className="text-[10px] text-white">Total</p>
                <p className="text-[14px] font-bold text-white">{stats.total}</p>
              </button>
            </div>
          </div>
        </div>

        {/* Chase alert — matching QuotesPage stale quote alert */}
        {stats.overdue > 0 && (
          <button
            type="button"
            onClick={handleCreateChaseTasks}
            disabled={creatingChaseTasks}
            className="w-full flex items-center justify-between p-3.5 rounded-xl bg-purple-500/[0.06] border border-purple-500/15 touch-manipulation active:bg-purple-500/10 transition-colors disabled:opacity-50"
          >
            <div>
              <p className="text-[13px] font-semibold text-purple-300">
                {stats.overdue} invoice{stats.overdue !== 1 && 's'} need chasing
              </p>
              <p className="text-[11px] text-white mt-0.5">Overdue and unpaid</p>
            </div>
            <span className="text-[12px] font-semibold text-purple-400 flex-shrink-0 ml-3">
              {creatingChaseTasks ? 'Creating...' : 'Create Tasks'}
            </span>
          </button>
        )}

        {/* Analytics — collapsed by default */}
        {invoices.length > 0 && (
          <details>
            <summary className="flex items-center justify-between cursor-pointer touch-manipulation py-2 list-none">
              <span className="text-xs font-medium text-white uppercase tracking-wider">Analytics</span>
              <ChevronRight className="w-4 h-4 text-white transition-transform [details[open]>&]:rotate-90" />
            </summary>
            <div className="mt-2">
              <QuoteInvoiceAnalytics
                quotes={[]}
                invoices={invoices}
                formatCurrency={formatCurrency}
                lastUpdated={lastUpdated}
                onRefresh={fetchInvoices}
                isLoading={isLoading}
              />
            </div>
          </details>
        )}

        {/* Invoices List */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-medium text-white uppercase tracking-wider">
              {activeFilter === 'all'
                ? 'All Invoices'
                : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Invoices`}
            </h2>
            <span className="text-[11px] text-white/50">
              {filteredInvoices.length} {filteredInvoices.length === 1 ? 'invoice' : 'invoices'}
            </span>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-elec-yellow border-t-transparent" />
            </div>
          ) : filteredInvoices.length === 0 ? (
            searchQuery ? (
              <div className="text-center py-12">
                <p className="text-[14px] font-medium text-white">No results found</p>
                <p className="text-[12px] text-white mt-1">No invoices match "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-3 text-[13px] font-medium text-elec-yellow touch-manipulation"
                >
                  Clear search
                </button>
              </div>
            ) : activeFilter === 'all' ? (
              <EmptyStateGuide
                type="invoice"
                onCreateClick={() => navigate('/electrician/invoice-builder/create')}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-[14px] font-medium text-white">
                  No {activeFilter !== 'all' ? activeFilter : ''} invoices
                </p>
                <p className="text-[12px] text-white mt-1">
                  Invoices will appear here when {activeFilter}
                </p>
              </div>
            )
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {filteredInvoices.map((invoice) => (
                  <motion.div key={invoice.id} layout exit={{ opacity: 0, scale: 0.95 }}>
                    <InvoiceCardView
                      invoices={[invoice]}
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
                      stripeRefreshKey={stripeRefreshKey}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </main>

      <CertificateGenerationDialog
        open={showGenerationDialog}
        onOpenChange={setShowGenerationDialog}
        isGenerating={!!downloadingPdfId}
        pdfUrl={generatedPdfUrl}
        pdfFilename={pdfFilename}
        errorMessage={generationError}
        documentLabel="Invoice"
      />
    </div>
  );
};

export default InvoicesPage;
