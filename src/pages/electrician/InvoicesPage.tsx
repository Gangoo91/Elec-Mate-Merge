import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppReview } from '@/hooks/useAppReview';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FileText, Send, AlertCircle, Plus, CheckCircle, Search, ArrowLeft, X, Clock, ChevronRight, ArrowUpDown } from 'lucide-react';
import { useInvoiceStorage } from '@/hooks/useInvoiceStorage';
import { isPast, addHours } from 'date-fns';
import { Quote } from '@/types/quote';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { EmptyStateGuide } from '@/components/electrician/shared/EmptyStateGuide';
import { cn } from '@/lib/utils';
import { VoiceHeaderButton } from '@/components/electrician/VoiceHeaderButton';
import { QuoteInvoiceAnalytics } from '@/components/electrician/analytics';
import StripeConnectBanner from '@/components/electrician/StripeConnectBanner';
import { InvoiceCard } from '@/components/electrician/invoice-builder/InvoiceCard';
import { isInvoiceOverdue } from '@/utils/invoice-status';
import { useAccountingIntegrations } from '@/hooks/useAccountingIntegrations';
import { PANEL } from '@/components/electrician/shared/surfaces';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { createQuickTaskBatch } from '@/utils/createQuickTask';

type TemporaryPdfLinkResponse = {
  publicUrl: string;
};

const getErrorMessage = (error: unknown, fallback: string): string => {
  return error instanceof Error && error.message ? error.message : fallback;
};

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
  const [markingPaidId, setMarkingPaidId] = useState<string | null>(null);
  const { recordExternalPayment } = useAccountingIntegrations();
  const [downloadingPdfId, setDownloadingPdfId] = useState<string | null>(null);
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState('Invoice.pdf');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [deletingInvoiceId, setDeletingInvoiceId] = useState<string | null>(null);
  const [stripeRefreshKey, setStripeRefreshKey] = useState(0);
  const [creatingChaseTasks, setCreatingChaseTasks] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'value-high' | 'due-soonest'>('newest');
  const [quickFilter, setQuickFilter] = useState<'part-paid' | null>(null);
  const [dateRange, setDateRange] = useState<'all' | '30d' | '90d'>('all');

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
    // Always go to view page — user can edit from there via bottom sheet
    navigate(`/electrician/invoices/${invoice.id}/view`);
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

  const handleMarkAsPaid = async (invoice: Quote) => {
    try {
      setMarkingPaidId(invoice.id);
      const { error } = await supabase
        .from('quotes')
        .update({ invoice_status: 'paid', invoice_paid_at: new Date().toISOString() })
        .eq('id', invoice.id);
      if (error) throw error;
      toast({
        title: 'Invoice marked as paid',
        description: `Invoice ${invoice.invoice_number} has been marked as paid.`,
      });
      // Close the loop in the accounting software (best-effort, non-blocking).
      if (invoice.external_invoice_id && invoice.external_invoice_provider) {
        recordExternalPayment(invoice.id, invoice.external_invoice_provider);
      }
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



  // Calculate stats
  const stats = useMemo(() => {
    const draft = invoices.filter((i) => i.invoice_status === 'draft');
    const sent = invoices.filter((i) => i.invoice_status === 'sent');
    const overdue = invoices.filter(isInvoiceOverdue);
    const paid = invoices.filter((i) => i.invoice_status === 'paid');
    const now = new Date();
    const paidThisMonth = paid.filter((i) => {
      const at = i.invoice_paid_at ? new Date(i.invoice_paid_at) : null;
      return at && at.getMonth() === now.getMonth() && at.getFullYear() === now.getFullYear();
    });
    const sumTotal = (list: typeof invoices) =>
      list.reduce((sum, inv) => sum + (typeof inv.total === 'number' && !isNaN(inv.total) ? inv.total : 0), 0);
    const sumOutstanding = (list: typeof invoices) =>
      list.reduce((sum, inv) => sum + Math.max(0, (inv.total || 0) - (inv.total_paid || 0)), 0);
    const unpaid = invoices.filter(
      (i) => i.invoice_status !== 'paid' && i.invoice_status !== 'draft' && i.invoice_status
    );

    return {
      total: invoices.length,
      draft: draft.length,
      sent: sent.length,
      overdue: overdue.length,
      paid: paid.length,
      monthlyTotal: sumTotal(paidThisMonth),
      monthlyCount: paidThisMonth.length,
      outstandingValue: sumOutstanding(unpaid),
      outstandingCount: unpaid.length,
      overdueValue: sumOutstanding(overdue),
      draftValue: sumTotal(draft),
    };
  }, [invoices]);

  // Chase task creation for overdue invoices
  const handleCreateChaseTasks = async () => {
    setCreatingChaseTasks(true);
    try {
      const overdueInvoices = invoices.filter(isInvoiceOverdue);

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
    } catch (error: unknown) {
      toast({
        title: 'Failed',
        description: getErrorMessage(error, 'Could not create chase tasks.'),
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
        filtered = filtered.filter(isInvoiceOverdue);
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

    if (quickFilter === 'part-paid') {
      filtered = filtered.filter(
        (i) => i.invoice_status !== 'paid' && (i.total_paid || 0) > 0.005
      );
    }

    if (dateRange !== 'all') {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - (dateRange === '30d' ? 30 : 90));
      filtered = filtered.filter((i) => {
        const d = i.invoice_date || i.createdAt;
        return d ? new Date(d) >= cutoff : false;
      });
    }

    const created = (i: (typeof invoices)[number]) =>
      new Date(i.invoice_date || i.createdAt).getTime();
    const sorted = [...filtered];
    switch (sortBy) {
      case 'oldest':
        sorted.sort((a, b) => created(a) - created(b));
        break;
      case 'value-high':
        sorted.sort((a, b) => (b.total || 0) - (a.total || 0));
        break;
      case 'due-soonest':
        sorted.sort((a, b) => {
          const da = a.invoice_due_date ? new Date(a.invoice_due_date).getTime() : Infinity;
          const db = b.invoice_due_date ? new Date(b.invoice_due_date).getTime() : Infinity;
          return da - db;
        });
        break;
      default:
        sorted.sort((a, b) => created(b) - created(a));
    }
    return sorted;
  }, [invoices, activeFilter, searchQuery, quickFilter, dateRange, sortBy]);

  const filteredValue = useMemo(
    () => filteredInvoices.reduce((acc, i) => acc + (i.total || 0), 0),
    [filteredInvoices]
  );

  // 30-day invoicing sparkline for the analytics strip
  const sparkPoints = useMemo(() => {
    const days = 30;
    const counts = new Array(days).fill(0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    invoices.forEach((i) => {
      const src = i.invoice_date || i.createdAt;
      if (!src) return;
      const d0 = new Date(src);
      d0.setHours(0, 0, 0, 0);
      const d = Math.round((today.getTime() - d0.getTime()) / 86400000);
      if (d >= 0 && d < days) counts[days - 1 - d]++;
    });
    const max = Math.max(...counts, 1);
    return counts
      .map((v, i) => `${((i / (days - 1)) * 100).toFixed(1)},${(29 - (v / max) * 26).toFixed(1)}`)
      .join(' ');
  }, [invoices]);

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
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('stripe');
      setSearchParams(nextParams, { replace: true });
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
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('stripe');
      setSearchParams(nextParams, { replace: true });
    }
  }, [fetchInvoices, searchParams, setSearchParams]);

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

      {/* Full-screen search overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background flex flex-col"
          >
            <div className="px-4 pt-4 pb-3 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Client, invoice number, job..."
                    className="w-full h-12 pl-4 pr-10 rounded-xl bg-white/[0.06] border border-white/[0.12] text-[15px] text-white placeholder:text-white/50 outline-none focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20 touch-manipulation"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/[0.1] flex items-center justify-center touch-manipulation"
                    >
                      <X className="h-3 w-3 text-white" />
                    </button>
                  )}
                </div>
                <button
                  className="text-[13px] text-white font-medium flex-shrink-0 touch-manipulation h-12 px-2"
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                >
                  Cancel
                </button>
              </div>
              {searchQuery.trim() && (
                <p className="text-[12px] text-white/50">{filteredInvoices.length} result{filteredInvoices.length !== 1 ? 's' : ''}</p>
              )}
            </div>
            <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-3">
              {searchQuery.trim() ? (
                filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <button
                      key={invoice.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                        navigate(`/electrician/invoices/${invoice.id}/view`);
                      }}
                      className="w-full flex items-center justify-between py-3 border-b border-white/[0.08] touch-manipulation active:bg-white/[0.04] transition-all text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-white truncate">{invoice.client?.name || 'No client'}</p>
                        <p className="text-[12px] text-white/50 mt-0.5">{invoice.invoice_number} · {invoice.items?.length || 0} items</p>
                      </div>
                      <span className="text-[14px] font-semibold text-white tabular-nums ml-3">
                        {formatCurrency(invoice.total)}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <p className="text-[15px] font-medium text-white">No results</p>
                    <p className="text-[13px] text-white/50 mt-1">Try a different search term</p>
                  </div>
                )
              ) : (
                <div className="space-y-4 pt-2">
                  <div>
                    <p className="text-[11px] text-white/50 uppercase tracking-wider mb-2">Recent Invoices</p>
                    <div className="space-y-2">
                      {invoices.slice(0, 5).map((invoice) => (
                        <button
                          key={invoice.id}
                          onClick={() => {
                            setIsSearchOpen(false);
                            navigate(`/electrician/invoices/${invoice.id}/view`);
                          }}
                          className="w-full flex items-center justify-between py-3 border-b border-white/[0.08] touch-manipulation active:bg-white/[0.04] transition-all text-left"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-medium text-white truncate">{invoice.client?.name || 'No client'}</p>
                            <p className="text-[12px] text-white/50 mt-0.5">{invoice.invoice_number} · {invoice.items?.length || 0} items</p>
                          </div>
                          <span className="text-[14px] font-semibold text-white tabular-nums ml-3">
                            {formatCurrency(invoice.total)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="flex items-center h-14 px-4 gap-2">
              <button
                onClick={() => navigate('/electrician/business')}
                className="h-10 w-10 -ml-2 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.98] transition-all touch-manipulation"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="flex-1 text-[22px] font-bold text-white truncate tracking-tight">Invoices</h1>
              <button
                onClick={() => navigate('/electrician/quotes')}
                className="h-8 px-2.5 rounded-lg bg-white/[0.08] text-[11px] font-medium text-white/90 touch-manipulation active:scale-[0.97] transition-all flex-shrink-0"
              >
                Quotes
              </button>
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
        </div>

        {/* Money subline */}
        <p className="px-4 mt-0.5 text-[12px] text-white/75">
          <span className={cn('font-semibold tabular-nums', stats.outstandingValue > 0 ? 'text-elec-yellow' : 'text-white/90')}>
            {formatCurrency(stats.outstandingValue)}
          </span>{' '}
          outstanding
          {stats.overdue > 0 && (
            <>
              <span className="mx-1.5 text-white/30">·</span>
              <span className="font-semibold text-red-400 tabular-nums">{stats.overdue}</span> overdue
            </>
          )}
        </p>

        {/* Status tabs */}
        <div className="flex gap-5 px-4 mt-2 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className="relative flex-shrink-0 pb-3 pt-2 text-[13px] font-medium whitespace-nowrap touch-manipulation select-none"
            >
              <span className={activeFilter === filter.id ? 'text-white' : 'text-white/65'}>
                {filter.label}
              </span>
              {filter.count > 0 && (
                <span
                  className={cn(
                    'ml-1.5 text-[11px] tabular-nums',
                    activeFilter === filter.id ? 'text-elec-yellow' : 'text-white/45'
                  )}
                >
                  {filter.count}
                </span>
              )}
              {activeFilter === filter.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-elec-yellow" />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-4 space-y-6 pb-24">
        {/* Stripe Connect Banner */}
        <StripeConnectBanner refreshKey={stripeRefreshKey} />

        {/* 01 · REVENUE — panel, mirrors QuotesPage pipeline */}
        <div className="space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">01</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/65">· Revenue</span>
          </div>

          <div className={cn(PANEL, 'overflow-hidden mt-2')}>
            <div className="grid grid-cols-2 lg:grid-cols-4">
              <button
                onClick={() => handleFilterChange('paid')}
                className="p-4 text-left border-b border-r border-white/[0.08] lg:border-b-0 touch-manipulation active:bg-white/[0.03] transition-colors"
              >
                <p className="text-[22px] font-bold text-emerald-400 tabular-nums leading-none tracking-tight">{formatCurrency(stats.monthlyTotal)}</p>
                <p className="text-[11px] text-white/80 mt-1.5">Paid this month · <span className="text-white tabular-nums">{stats.monthlyCount}</span></p>
              </button>
              <button
                onClick={() => handleFilterChange('sent')}
                className="p-4 text-left border-b border-white/[0.08] lg:border-b-0 lg:border-r touch-manipulation active:bg-white/[0.03] transition-colors"
              >
                <p className="text-[22px] font-bold text-amber-400 tabular-nums leading-none tracking-tight">{formatCurrency(stats.outstandingValue)}</p>
                <p className="text-[11px] text-white/80 mt-1.5">Outstanding · <span className="text-white tabular-nums">{stats.outstandingCount}</span></p>
              </button>
              <button
                onClick={() => handleFilterChange('overdue')}
                className="p-4 text-left border-r border-white/[0.08] touch-manipulation active:bg-white/[0.03] transition-colors"
              >
                <p className={cn('text-[22px] font-bold tabular-nums leading-none tracking-tight', stats.overdue > 0 ? 'text-red-400' : 'text-white')}>{formatCurrency(stats.overdueValue)}</p>
                <p className="text-[11px] text-white/80 mt-1.5">Overdue · <span className="text-white tabular-nums">{stats.overdue}</span></p>
              </button>
              <button
                onClick={() => handleFilterChange('draft')}
                className="p-4 text-left touch-manipulation active:bg-white/[0.03] transition-colors"
              >
                <p className="text-[22px] font-bold text-white tabular-nums leading-none tracking-tight">{formatCurrency(stats.draftValue)}</p>
                <p className="text-[11px] text-white/80 mt-1.5">Drafts · <span className="text-white tabular-nums">{stats.draft}</span></p>
              </button>
            </div>

            {/* Chase alert — panel footer */}
            {stats.overdue > 0 && (
              <button
                type="button"
                onClick={handleCreateChaseTasks}
                disabled={creatingChaseTasks}
                className="w-full flex items-center justify-between py-3 px-4 border-t border-white/[0.08] touch-manipulation active:bg-white/[0.03] transition-colors disabled:opacity-50"
              >
                <p className="text-[12px] text-white/90">
                  <span className="font-semibold text-red-400 tabular-nums">{stats.overdue}</span> invoice{stats.overdue !== 1 ? 's' : ''} need chasing
                </p>
                <span className="text-[11px] font-semibold text-amber-400 flex-shrink-0 ml-3">
                  {creatingChaseTasks ? 'Creating…' : 'Create tasks →'}
                </span>
              </button>
            )}
          </div>

          {/* Analytics — sparkline strip, expands to full panel */}
          {invoices.length > 0 && (
            <div className={cn(PANEL, 'px-4 py-3')}>
              <QuoteInvoiceAnalytics
                quotes={[]}
                invoices={invoices}
                formatCurrency={formatCurrency}
                lastUpdated={lastUpdated}
                onRefresh={fetchInvoices}
                isLoading={isLoading}
                trigger={(isOpen) => (
                  <button className="w-full flex items-center gap-3 py-1 touch-manipulation">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/65 flex-shrink-0">
                      Analytics
                    </span>
                    <svg
                      viewBox="0 0 100 32"
                      preserveAspectRatio="none"
                      className="flex-1 h-8 min-w-0 text-elec-yellow/90"
                      aria-hidden="true"
                    >
                      <polyline
                        points={sparkPoints}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    </svg>
                    <ChevronRight
                      className={cn(
                        'w-4 h-4 text-white/60 transition-transform flex-shrink-0',
                        isOpen && 'rotate-90'
                      )}
                    />
                  </button>
                )}
              />
            </div>
          )}
        </div>

        {/* 02 · INVOICES — list (mirrors QuotesPage 02 · QUOTES) */}
        <section className="space-y-3 pt-2 border-t border-white/[0.04]">
          <div className="flex items-baseline justify-between gap-3 pt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">02</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">
                ·{' '}
                {activeFilter === 'all'
                  ? 'All invoices'
                  : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} invoices`}
              </span>
            </div>
            <span className="text-[11px] text-white/80 tabular-nums">
              {filteredInvoices.length} {filteredInvoices.length === 1 ? 'invoice' : 'invoices'}
              {filteredInvoices.length > 0 && (
                <span className="text-white"> · {formatCurrency(filteredValue)}</span>
              )}
            </span>
          </div>

          {/* Sort + quick filters */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex-shrink-0 h-9 flex items-center gap-1.5 text-[12px] font-medium text-white/90 touch-manipulation select-none active:scale-[0.97] transition-all">
                  <ArrowUpDown className="h-3.5 w-3.5 text-elec-yellow" />
                  {{ newest: 'Newest', oldest: 'Oldest', 'value-high': 'Highest value', 'due-soonest': 'Due soonest' }[sortBy]}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="z-[100] min-w-[160px] bg-elec-gray border-white/10">
                {(
                  [
                    ['newest', 'Newest'],
                    ['oldest', 'Oldest'],
                    ['value-high', 'Highest value'],
                    ['due-soonest', 'Due soonest'],
                  ] as const
                ).map(([id, label]) => (
                  <DropdownMenuItem
                    key={id}
                    onClick={() => setSortBy(id)}
                    className={cn(
                      'h-11 text-[14px] touch-manipulation focus:bg-white/[0.06]',
                      sortBy === id ? 'text-elec-yellow focus:text-elec-yellow' : 'text-white focus:text-white'
                    )}
                  >
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="h-5 w-px bg-white/[0.16] flex-shrink-0" />

            <button
              onClick={() => setQuickFilter(quickFilter === 'part-paid' ? null : 'part-paid')}
              className={cn(
                'flex-shrink-0 h-9 px-3 rounded-lg text-[12px] font-medium transition-all touch-manipulation active:scale-[0.97] select-none',
                quickFilter === 'part-paid' ? 'bg-elec-yellow/10 text-elec-yellow' : 'text-white/75'
              )}
            >
              Part-paid
            </button>

            <div className="h-5 w-px bg-white/[0.16] flex-shrink-0" />

            {(['30d', '90d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(dateRange === r ? 'all' : r)}
                className={cn(
                  'flex-shrink-0 h-9 px-3 rounded-lg text-[12px] font-medium transition-all touch-manipulation active:scale-[0.97] select-none',
                  dateRange === r ? 'bg-elec-yellow/10 text-elec-yellow' : 'text-white/75'
                )}
              >
                {r}
              </button>
            ))}
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
                  No {activeFilter !== 'all' ? activeFilter : quickFilter === 'part-paid' ? 'part-paid' : ''} invoices
                </p>
                <p className="text-[12px] text-white/70 mt-1">
                  {quickFilter || dateRange !== 'all'
                    ? 'Try clearing the filters above'
                    : `Invoices will appear here when ${activeFilter}`}
                </p>
              </div>
            )
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
              <AnimatePresence>
                {filteredInvoices.map((invoice) => (
                  <motion.div key={invoice.id} id={`invoice-${invoice.id}`} layout exit={{ opacity: 0, scale: 0.95 }} className="h-full">
                    <InvoiceCard
                      invoice={invoice}
                      onTap={() => handleInvoiceAction(invoice)}
                      onMarkPaid={() => handleMarkAsPaid(invoice)}
                      onDownloadPDF={() => handleDownloadPDF(invoice)}
                      onEdit={() => navigate(`/electrician/invoice-quote-builder/${invoice.id}`)}
                      onDelete={() => handleDeleteInvoice(invoice.id)}
                      isMarkingPaid={markingPaidId === invoice.id}
                      isDownloading={downloadingPdfId === invoice.id}
                      isDeleting={deletingInvoiceId === invoice.id}
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
