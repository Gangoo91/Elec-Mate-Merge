import { useEffect, useState, useMemo, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Quote } from '@/types/quote';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, ArrowLeft, MoreHorizontal, Mail, Phone, Pencil, Copy, Download, Check, Bell, Undo2, Trash2, Receipt, Link2, XCircle, CalendarPlus, FolderPlus, Folder, ShieldCheck } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { toast } from '@/hooks/use-toast';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { Helmet } from 'react-helmet';
import { QuoteSendDropdown } from '@/components/electrician/quote-builder/QuoteSendDropdown';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { format, differenceInDays, isPast } from 'date-fns';
import { createQuickTask } from '@/utils/createQuickTask';
import { computeQuoteTotals } from '@/utils/quote-calculations';
import { cn } from '@/lib/utils';

/** Why a quote was lost — feeds win/loss analytics. Keys persist in quotes.declined_reason. */
const DECLINE_REASONS = [
  { key: 'price', label: 'Too expensive', hint: 'Price was the sticking point' },
  { key: 'timing', label: 'Bad timing', hint: 'Couldn\u2019t start soon enough' },
  { key: 'competitor', label: 'Went elsewhere', hint: 'Chose another electrician' },
  { key: 'no_response', label: 'Went quiet', hint: 'Client stopped responding' },
  { key: 'cancelled', label: 'Job cancelled', hint: 'Work no longer happening' },
  { key: 'other', label: 'Other', hint: 'None of the above' },
] as const;


const QuoteViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState('Quote.pdf');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isSendingReminder, setIsSendingReminder] = useState(false);
  const [isReverting, setIsReverting] = useState(false);
  const [showActionsSheet, setShowActionsSheet] = useState(false);
  const [showDeclineSheet, setShowDeclineSheet] = useState(false);
  const [showRevertDialog, setShowRevertDialog] = useState(false);
  const [showProjectPicker, setShowProjectPicker] = useState(false);
  const [projects, setProjects] = useState<
    { id: string; title: string; status: string; customer?: string }[] | null
  >(null);
  const [linkedProject, setLinkedProject] = useState<{ id: string; title: string } | null>(null);
  const [isLinkingProject, setIsLinkingProject] = useState(false);
  const [emailTracking, setEmailTracking] = useState<{
    email_opened_at?: string;
    email_open_count?: number;
    first_sent_at?: string;
    reminder_count?: number;
  } | null>(null);
  const { companyProfile } = useCompanyProfile();

  const formatCurrency = (amount: number | undefined | null) => {
    const safeAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(safeAmount);
  };

  // === DATA LOADING ===
  useEffect(() => {
    const loadQuote = async () => {
      if (!id) { setError(true); setLoading(false); return; }
      try {
        const { data, error } = await supabase.from('quotes').select('*').eq('id', id).single();
        if (error) throw error;
        if (!data) { setError(true); return; }

        const transformedQuote: Quote = {
          id: data.id, quoteNumber: data.quote_number,
          client: typeof data.client_data === 'string' ? JSON.parse(data.client_data) : data.client_data,
          items: typeof data.items === 'string' ? JSON.parse(data.items) : data.items,
          settings: typeof data.settings === 'string' ? JSON.parse(data.settings) : data.settings,
          jobDetails: data.job_details ? (typeof data.job_details === 'string' ? JSON.parse(data.job_details) : data.job_details) : undefined,
          subtotal: data.subtotal || 0, overhead: data.overhead || 0, profit: data.profit || 0,
          vatAmount: data.vat_amount || 0, total: data.total || 0, discountAmount: data.discount_amount || 0,
          status: data.status as Quote['status'], tags: data.tags as Quote['tags'],
          createdAt: new Date(data.created_at), updatedAt: new Date(data.updated_at),
          expiryDate: new Date(data.expiry_date), notes: data.notes || undefined,
          acceptance_status: data.acceptance_status as Quote['acceptance_status'],
          acceptance_method: data.acceptance_method as Quote['acceptance_method'],
          accepted_at: data.accepted_at ? new Date(data.accepted_at) : undefined,
          accepted_by_name: data.accepted_by_name || undefined,
          signature_url: data.signature_url || undefined,
          invoice_raised: data.invoice_raised || false,
          invoice_number: data.invoice_number || undefined,
          pdf_url: data.pdf_url || undefined,
          pdf_version: data.pdf_version || 0,
        };
        setQuote(transformedQuote);
        setEmailTracking({ first_sent_at: data.first_sent_at, reminder_count: data.reminder_count || 0 });

        if (data.project_id) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: proj } = await (supabase as any)
            .from('spark_projects')
            .select('id, title')
            .eq('id', data.project_id)
            .maybeSingle();
          if (proj) setLinkedProject({ id: proj.id, title: proj.title });
        }

        const { data: viewData } = await supabase.from('quote_views').select('email_opened_at, email_open_count').eq('quote_id', data.id).maybeSingle();
        if (viewData) {
          setEmailTracking((prev) => ({ ...prev, email_opened_at: viewData.email_opened_at, email_open_count: viewData.email_open_count || 0 }));
        }
      } catch (err) {
        console.error('Error loading quote:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadQuote();
  }, [id]);

  // === HANDLERS ===
  const handleDownloadPDF = async () => {
    if (!quote) return;
    setIsDownloading(true); setGeneratedPdfUrl(null); setGenerationError(null); setShowGenerationDialog(true);
    try {
      const effectiveCompanyProfile = companyProfile || {
        id: 'default', user_id: 'default', company_name: 'Your Electrical Company',
        company_email: 'contact@yourcompany.com', company_phone: '0123 456 7890',
        company_address: '123 Business Street, London', primary_color: '#1e40af',
        secondary_color: '#3b82f6', currency: 'GBP', locale: 'en-GB',
        vat_number: 'GB123456789', payment_terms: 'Payment due within 30 days',
        created_at: new Date(), updated_at: new Date(),
      };
      const { data, error } = await supabase.functions.invoke('generate-pdf-monkey', { body: { quote, companyProfile: effectiveCompanyProfile } });
      if (error) throw error;
      let downloadUrl = data.downloadUrl;
      const documentId = data.documentId;
      if (!downloadUrl && documentId) {
        for (let i = 0; i < 18; i++) {
          await new Promise((resolve) => setTimeout(resolve, 5000));
          const { data: statusData } = await supabase.functions.invoke('generate-pdf-monkey', { body: { mode: 'status', documentId } });
          if (statusData?.downloadUrl) { downloadUrl = statusData.downloadUrl; break; }
        }
      }
      if (downloadUrl) {
        await supabase.from('quotes').update({ pdf_document_id: documentId, pdf_url: downloadUrl, pdf_generated_at: new Date().toISOString(), pdf_version: (quote.pdf_version || 0) + 1 }).eq('id', quote.id);
        setGeneratedPdfUrl(downloadUrl);
        setPdfFilename(`Quote-${quote.quoteNumber || quote.id}.pdf`);
        toast({ title: 'PDF ready' });
      } else { throw new Error('Failed to generate PDF'); }
    } catch (error: any) {
      setGenerationError(error?.message || 'PDF generation failed');
      toast({ title: 'PDF generation failed', variant: 'destructive' });
    } finally { setIsDownloading(false); }
  };

  const handleDelete = async () => {
    if (!quote) return;
    setIsDeleting(true);
    try {
      const { error } = await supabase.from('quotes').delete().eq('id', quote.id);
      if (error) throw error;
      toast({ title: 'Quote deleted' });
      navigate('/electrician/quotes');
    } catch (err) {
      toast({ title: 'Failed to delete', variant: 'destructive' });
    } finally { setIsDeleting(false); setShowDeleteDialog(false); }
  };

  const handleMarkAsAccepted = async () => {
    if (!quote) return;
    const { error } = await supabase.from('quotes').update({ acceptance_status: 'accepted', accepted_at: new Date().toISOString() }).eq('id', quote.id);
    if (error) { toast({ title: 'Failed', variant: 'destructive' }); }
    else {
      setQuote((prev) => prev ? { ...prev, acceptance_status: 'accepted', accepted_at: new Date().toISOString() } : prev);
      toast({ title: 'Quote accepted', description: 'You can now convert to an invoice.' });
    }
  };

  const handleRevertToSent = async () => {
    if (!quote) return;
    setIsReverting(true);
    try {
      const { error } = await supabase.from('quotes').update({ acceptance_status: 'pending', status: 'sent', accepted_at: null, accepted_by_name: null, updated_at: new Date().toISOString() }).eq('id', quote.id);
      if (error) throw error;
      setQuote((prev) => prev ? { ...prev, acceptance_status: 'pending', status: 'sent', accepted_at: undefined } : prev);
      toast({ title: 'Reverted to Sent' });
    } catch (err: any) { toast({ title: 'Failed', variant: 'destructive' }); }
    finally { setIsReverting(false); setShowRevertDialog(false); }
  };

  const handleConvertToInvoice = () => {
    if (!quote) return;
    navigate(`/electrician/invoice-quote-builder/${quote.id}`);
  };

  const handleSendReminder = async () => {
    if (!quote) return;
    setIsSendingReminder(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { toast({ title: 'Not authenticated', variant: 'destructive' }); return; }
      const { data, error } = await supabase.functions.invoke('send-quote-reminder', {
        body: { quoteId: quote.id, reminderType: 'gentle' },
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (error) throw error;
      setEmailTracking((prev) => ({ ...prev, reminder_count: (prev?.reminder_count || 0) + 1 }));
      toast({ title: 'Reminder sent', description: data?.message || 'Follow-up sent to client' });
    } catch (err: any) { toast({ title: 'Failed to send reminder', variant: 'destructive' }); }
    finally { setIsSendingReminder(false); }
  };

  // ELE-1280: email the quote from the actions drawer — same server-side
  // send-quote-resend flow as the Send button (PDF attached), so there is
  // one email path everywhere. Users were missing the bottom Send button.
  const handleEmailQuote = async () => {
    if (!quote) return;
    const cleanTo = quote.client?.email?.trim();
    if (!cleanTo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanTo)) {
      toast({
        title: 'No client email',
        description: 'Add a valid client email to the quote first, then try again.',
        variant: 'destructive',
      });
      return;
    }
    try {
      toast({
        title: 'Sending quote',
        description: `Generating the PDF and emailing it to ${cleanTo}…`,
      });
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('Please log in again to send quotes.');
      const { data, error } = await supabase.functions.invoke('send-quote-resend', {
        body: { quoteId: quote.id },
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (error) throw new Error(typeof error === 'string' ? error : error.message || 'Failed to send quote');
      if (data?.error) throw new Error(data.error + (data.hint ? ` (${data.hint})` : ''));
      if (!data?.success) throw new Error(data?.message || 'Unknown error sending quote');
      toast({
        title: 'Quote sent',
        description: `Quote ${quote.quoteNumber} emailed to ${cleanTo}`,
        variant: 'success',
      });
    } catch (err: any) {
      toast({
        title: 'Could not send quote',
        description: err.message || 'Please try again',
        variant: 'destructive',
      });
    }
  };

  const handleDuplicate = () => {
    if (!quote) return;
    // Strip identity/status fields so the wizard starts fresh — same pattern as QuoteBuilderEdit
    const {
      id: _id,
      quoteNumber: _qn,
      createdAt: _ca,
      updatedAt: _ua,
      accepted_at: _aa,
      accepted_by_name: _abn,
      accepted_by_email: _abe,
      acceptance_status: _as,
      acceptance_method: _am,
      invoice_raised: _ir,
      invoice_number: _in,
      invoice_status: _is,
      invoice_paid_at: _ipa,
      pdf_document_id: _pdi,
      docusign_envelope_id: _dei,
      docusign_status: _ds,
      external_invoice_id: _eii,
      external_invoice_provider: _eip,
      ...rest
    } = quote;
    const duplicate: Partial<typeof quote> = {
      ...rest,
      status: 'draft',
      acceptance_status: 'pending',
    };
    navigate('/electrician/quote-builder/create', {
      state: { duplicateFrom: duplicate, duplicateSourceNumber: quote.quoteNumber },
    });
    toast({ title: 'Duplicating quote', description: 'Edit the copy and save as new' });
  };

  const handleMarkAsDeclined = async (reason?: string) => {
    if (!quote) return;
    const { error } = await supabase
      .from('quotes')
      .update({ acceptance_status: 'rejected', declined_reason: reason ?? null })
      .eq('id', quote.id);
    if (error) {
      toast({ title: 'Failed', variant: 'destructive' });
    } else {
      setQuote((prev) =>
        prev ? { ...prev, acceptance_status: 'rejected', declined_reason: reason ?? null } : prev
      );
      setShowDeclineSheet(false);
      toast({
        title: 'Marked as declined',
        description: reason ? `Reason: ${DECLINE_REASONS.find((r) => r.key === reason)?.label}` : undefined,
      });
    }
  };

  const handleCopyClientLink = async () => {
    if (!quote) return;
    const buildLink = async (): Promise<string> => {
      const { data: existingView } = await supabase
        .from('quote_views')
        .select('public_token')
        .eq('quote_id', quote.id)
        .eq('is_active', true)
        .maybeSingle();
      let token: string | undefined = existingView?.public_token ?? undefined;
      if (!token) {
        token = crypto.randomUUID();
        const { error } = await supabase
          .from('quote_views')
          .insert({ quote_id: quote.id, public_token: token, is_active: true, view_count: 0 });
        if (error) throw error;
      }
      return `${window.location.origin}/quote/${token}`;
    };
    try {
      // iOS/Safari revoke clipboard access once the user gesture has passed —
      // a plain writeText after two awaited round-trips always throws there.
      // ClipboardItem accepts a promise payload, keeping the gesture alive.
      if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/plain': buildLink().then((url) => new Blob([url], { type: 'text/plain' })),
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(await buildLink());
      }
      toast({ title: 'Link copied', description: 'Send it to your client — they can view and accept online.' });
    } catch {
      toast({ title: 'Could not copy link', variant: 'destructive' });
    }
  };

  const handleCreateFollowUpTask = async () => {
    if (!quote) return;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);
    const taskId = await createQuickTask(
      `Follow up: Quote ${quote.quoteNumber || ''}${quote.client?.name ? ` — ${quote.client.name}` : ''}`.trim(),
      { priority: 'normal', dueAt: tomorrow.toISOString(), tags: ['follow-up', 'quote'] }
    );
    if (taskId) {
      toast({ title: 'Task created', description: 'Follow-up set for tomorrow, 9am.' });
    } else {
      toast({ title: 'Failed to create task', variant: 'destructive' });
    }
  };

  const openProjectPicker = async () => {
    setShowActionsSheet(false);
    setShowProjectPicker(true);
    if (projects === null) {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('Not signed in');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data, error } = await (supabase as any)
          .from('spark_projects')
          .select('id, title, status, customers(name)')
          .eq('user_id', user.id)
          .neq('status', 'cancelled')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setProjects(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (data || []).map((r: any) => ({
            id: r.id,
            title: r.title,
            status: r.status,
            customer: r.customers?.name,
          }))
        );
      } catch {
        // Leave projects null so reopening retries; tell the user why it's empty.
        setShowProjectPicker(false);
        toast({ title: 'Could not load projects', description: 'Check your connection and try again.', variant: 'destructive' });
      }
    }
  };

  const handleConvertToJob = async () => {
    if (!quote) return;
    setIsLinkingProject(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any).rpc('convert_quote_to_project', {
        p_quote_id: quote.id,
      });
      if (error) throw error;
      setShowProjectPicker(false);
      toast({ title: 'Job created', description: 'Quote, invoices and visits are linked.' });
      navigate(`/electrician/projects/${data}`);
    } catch {
      toast({ title: 'Failed to create job', variant: 'destructive' });
    } finally {
      setIsLinkingProject(false);
    }
  };

  const handleAssignProject = async (projectId: string | null, title?: string) => {
    if (!quote) return;
    setIsLinkingProject(true);
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ project_id: projectId })
        .eq('id', quote.id);
      if (error) throw error;
      setLinkedProject(projectId && title ? { id: projectId, title } : null);
      toast(
        projectId
          ? { title: 'Added to job', description: title }
          : { title: 'Removed from job' }
      );
      setShowProjectPicker(false);
    } catch {
      toast({ title: 'Failed to update project', variant: 'destructive' });
    } finally {
      setIsLinkingProject(false);
    }
  };

  // === DERIVED STATE ===
  const isExpired = quote?.expiryDate ? isPast(new Date(quote.expiryDate)) : false;
  const daysUntilExpiry = quote?.expiryDate ? differenceInDays(new Date(quote.expiryDate), new Date()) : null;
  const isAccepted = quote?.acceptance_status === 'accepted';
  const isRejected = quote?.acceptance_status === 'rejected';
  // ELE-986 — allow marking accepted / converting from any quote state including
  // draft. Users often send the PDF manually outside the app, so the quote
  // never gets to `sent` and we'd otherwise dead-end them.
  const canAccept = !isAccepted && !isRejected && !quote?.invoice_raised;
  const canConvertToInvoice = !isRejected && !quote?.invoice_raised;
  const canRevert = isAccepted && !quote?.invoice_raised;
  const canDecline = !isAccepted && !isRejected && !quote?.invoice_raised;
  const canFollowUpTask =
    (quote?.status === 'sent' || quote?.status === 'pending') && !isAccepted && !isRejected && !quote?.invoice_raised;
  const canSendReminder = (quote?.status === 'sent' || quote?.status === 'pending') && !isAccepted && (emailTracking?.reminder_count || 0) < 3 && !isExpired;

  const getStatusBadge = () => {
    if (quote?.invoice_raised)
      return { label: 'Invoiced', dot: 'bg-blue-400', text: 'text-blue-400', pill: 'bg-blue-500/15 text-blue-400 border-blue-500/25', wash: 'from-blue-500/[0.14]' };
    if (isAccepted)
      return { label: 'Won', dot: 'bg-emerald-400', text: 'text-emerald-400', pill: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25', wash: 'from-emerald-500/[0.14]' };
    if (quote?.acceptance_status === 'rejected') {
      const reason = DECLINE_REASONS.find(
        (r) => r.key === (quote as { declined_reason?: string | null }).declined_reason
      );
      return {
        label: reason ? `Declined · ${reason.label}` : 'Declined',
        dot: 'bg-red-400',
        text: 'text-red-400',
        pill: 'bg-red-500/15 text-red-400 border-red-500/25',
        wash: 'from-red-500/[0.12]',
      };
    }
    if (isExpired)
      return { label: 'Expired', dot: 'bg-red-400', text: 'text-red-400', pill: 'bg-red-500/15 text-red-400 border-red-500/25', wash: 'from-red-500/[0.12]' };
    if (quote?.status === 'sent' || quote?.status === 'pending')
      return { label: 'Sent', dot: 'bg-amber-400', text: 'text-amber-400', pill: 'bg-amber-500/15 text-amber-400 border-amber-500/25', wash: 'from-amber-500/[0.14]' };
    return { label: 'Draft', dot: 'bg-white/75', text: 'text-white/85', pill: 'bg-white/[0.08] text-white/85 border-white/[0.15]', wash: 'from-white/[0.06]' };
  };

  // Shared elevated panel recipe — fintech surface architecture
  const PANEL =
    'rounded-2xl border border-white/[0.10] bg-gradient-to-b from-white/[0.06] to-white/[0.03] shadow-[0_8px_24px_rgba(0,0,0,0.35)]';

  const liveTotals = useMemo(
    () => (quote ? computeQuoteTotals(quote.items || [], quote.settings) : null),
    [quote]
  );

  // === LOADING / ERROR ===
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="min-h-screen bg-background p-4">
        <button onClick={() => navigate('/electrician/quotes')} className="flex items-center gap-2 text-white mb-8 touch-manipulation">
          <ArrowLeft className="h-5 w-5" /> Back to Quotes
        </button>
        <div className="text-center py-12">
          <p className="text-lg font-semibold text-white">Quote not found</p>
          <p className="text-sm text-white mt-1">It may have been deleted.</p>
        </div>
      </div>
    );
  }

  const statusBadge = getStatusBadge();

  // Activity timeline events
  const timelineEvents: { label: string; date?: string; colour: string; active: boolean }[] = [];
  timelineEvents.push({
    label: 'Created',
    date: quote.createdAt ? format(new Date(quote.createdAt), 'd MMM') : undefined,
    colour: 'bg-white',
    active: true,
  });
  if (emailTracking?.first_sent_at) {
    timelineEvents.push({ label: 'Sent', date: format(new Date(emailTracking.first_sent_at), 'd MMM'), colour: 'bg-amber-400', active: true });
  } else if (quote.status !== 'draft') {
    timelineEvents.push({ label: 'Sent', colour: 'bg-amber-400', active: true });
  } else {
    timelineEvents.push({ label: 'Sent', colour: 'bg-white/20', active: false });
  }
  if (emailTracking?.email_open_count && emailTracking.email_open_count > 0) {
    timelineEvents.push({
      label: `Viewed ${emailTracking.email_open_count}×`,
      date: emailTracking.email_opened_at ? format(new Date(emailTracking.email_opened_at), 'd MMM') : undefined,
      colour: 'bg-blue-400', active: true,
    });
  } else {
    timelineEvents.push({ label: 'Viewed', colour: 'bg-white/20', active: false });
  }
  if (isAccepted) {
    timelineEvents.push({
      label: 'Won',
      date: quote.accepted_at ? format(new Date(quote.accepted_at), 'd MMM') : undefined,
      colour: 'bg-emerald-400', active: true,
    });
  } else if (quote.acceptance_status === 'rejected') {
    timelineEvents.push({ label: 'Declined', colour: 'bg-red-400', active: true });
  } else {
    timelineEvents.push({ label: 'Awaiting', colour: 'bg-white/20', active: false });
  }
  if (quote.invoice_raised) {
    timelineEvents.push({ label: 'Invoiced', colour: 'bg-blue-400', active: true });
  }

  // Intelligence strip facts
  const sentAgo = emailTracking?.first_sent_at
    ? differenceInDays(new Date(), new Date(emailTracking.first_sent_at))
    : null;
  const lastOpenedAgo = emailTracking?.email_opened_at
    ? differenceInDays(new Date(), new Date(emailTracking.email_opened_at))
    : null;
  const openCount = emailTracking?.email_open_count ?? 0;
  const intelFacts: string[] = [];
  if (sentAgo !== null) intelFacts.push(`Sent ${sentAgo === 0 ? 'today' : `${sentAgo}d ago`}`);
  if (openCount > 0) {
    intelFacts.push(`Viewed ${openCount}×`);
    if (lastOpenedAgo !== null)
      intelFacts.push(`Last opened ${lastOpenedAgo === 0 ? 'today' : `${lastOpenedAgo}d ago`}`);
  } else if (sentAgo !== null) {
    intelFacts.push('Not opened yet');
  }

  // Next-step nudge — one contextual suggestion
  let nudge:
    | { text: string; cta: string; cls: string; dot: string; action: () => void; disabled?: boolean }
    | null = null;
  if (!quote.invoice_raised && !isAccepted) {
    if (isRejected) {
      nudge = {
        text: 'Declined — tweak the price or scope and send a revised version',
        cta: 'Duplicate & revise',
        cls: 'text-elec-yellow',
        dot: 'bg-red-400',
        action: handleDuplicate,
      };
    } else if (isExpired) {
      nudge = {
        text: 'This quote has expired — re-issue it with a fresh expiry date',
        cta: 'Re-issue',
        cls: 'text-elec-yellow',
        dot: 'bg-red-400',
        action: handleDuplicate,
      };
    } else if (canSendReminder && openCount === 0 && (sentAgo ?? 0) >= 3) {
      nudge = {
        text: `Sent ${sentAgo}d ago and never opened — give it a nudge`,
        cta: isSendingReminder ? 'Sending…' : 'Send reminder',
        cls: 'text-blue-400',
        dot: 'bg-amber-400',
        action: handleSendReminder,
        disabled: isSendingReminder,
      };
    } else if (canSendReminder && (sentAgo ?? 0) >= 7) {
      nudge = {
        text: `No decision after ${sentAgo}d — a polite reminder works`,
        cta: isSendingReminder ? 'Sending…' : 'Send reminder',
        cls: 'text-blue-400',
        dot: 'bg-amber-400',
        action: handleSendReminder,
        disabled: isSendingReminder,
      };
    }
  }

  // Private margin maths
  const exVatTotal =
    (quote.subtotal || 0) + (quote.overhead || 0) + (quote.profit || 0) - (quote.discountAmount || 0);
  const marginPct = exVatTotal > 0 ? Math.round(((quote.profit || 0) / exVatTotal) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Quote {quote.quoteNumber} | Elec-Mate</title>
      </Helmet>

      {/* Sticky header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="flex items-center h-12 px-4 lg:px-6 gap-3">
          <button
            onClick={() => navigate('/electrician/quotes')}
            className="h-10 w-10 -ml-2 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.95] touch-manipulation flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </button>
          <span className="font-mono text-[13px] text-white/85 flex-1 min-w-0 truncate">{quote.quoteNumber}</span>
          <span className="flex items-center gap-1.5 flex-shrink-0">
            <span className={cn('h-1.5 w-1.5 rounded-full', statusBadge.dot)} />
            <span className={cn('text-[11px] font-semibold uppercase tracking-[0.08em]', statusBadge.text)}>
              {statusBadge.label}
            </span>
          </span>
          <button
            onClick={() => setShowActionsSheet(true)}
            className="h-10 px-3.5 flex items-center gap-1.5 rounded-xl bg-white/[0.08] border border-white/[0.12] text-[12px] font-semibold text-white hover:bg-white/[0.12] active:scale-[0.97] transition-all touch-manipulation flex-shrink-0"
          >
            Actions
            <MoreHorizontal className="h-4 w-4 text-white/80" />
          </button>
        </div>
      </header>

      <div className="px-4 py-5 pb-10 lg:px-6 space-y-4">

        {/* === HERO PANEL === */}
        <div className={cn('relative overflow-hidden rounded-3xl border border-white/[0.10] bg-gradient-to-b from-white/[0.07] to-white/[0.03] shadow-[0_12px_32px_rgba(0,0,0,0.4)]')}>
          <div className={cn('absolute inset-0 bg-gradient-to-br via-transparent to-transparent pointer-events-none', statusBadge.wash)} />
          <div className="relative p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[12px] text-white/75 px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/[0.08]">
                {quote.quoteNumber}
              </span>
              <span className={cn('inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] px-2.5 py-1 rounded-full border', statusBadge.pill)}>
                <span className={cn('h-1.5 w-1.5 rounded-full', statusBadge.dot)} />
                {statusBadge.label}
              </span>
            </div>

            <p className="mt-3 sm:mt-4 text-[38px] sm:text-[46px] font-bold text-elec-yellow leading-none tracking-tight tabular-nums">
              {formatCurrency(quote.total)}
            </p>
            <p className="text-[17px] font-semibold text-white mt-3">{quote.client?.name || 'No client'}</p>
            {quote.jobDetails?.title && (
              <p className="text-[13px] text-white/70 mt-0.5">{quote.jobDetails.title}</p>
            )}

            {/* Fact chips */}
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              {isAccepted && quote.accepted_at && (
                <span className="text-[11px] font-medium text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-500/[0.08] border border-emerald-500/15">
                  Accepted {format(new Date(quote.accepted_at), 'd MMM yyyy')}
                </span>
              )}
              {quote.invoice_raised && quote.invoice_number && (
                <span className="text-[11px] font-medium text-blue-400 px-2.5 py-1 rounded-lg bg-blue-500/[0.08] border border-blue-500/15">
                  Invoice {quote.invoice_number}
                </span>
              )}
              {!isAccepted && !quote.invoice_raised && quote.expiryDate && !isExpired && (
                <span className={cn(
                  'text-[11px] font-medium px-2.5 py-1 rounded-lg border',
                  daysUntilExpiry !== null && daysUntilExpiry <= 7
                    ? 'text-orange-400 bg-orange-500/[0.08] border-orange-500/20'
                    : 'text-white/75 bg-white/[0.05] border-white/[0.08]'
                )}>
                  {daysUntilExpiry !== null && daysUntilExpiry <= 7
                    ? `Expires in ${daysUntilExpiry}d`
                    : `Expires ${format(new Date(quote.expiryDate), 'd MMM yyyy')}`}
                </span>
              )}
              {intelFacts.map((fact) => (
                <span key={fact} className="text-[11px] font-medium text-white/75 px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08]">
                  {fact}
                </span>
              ))}
            </div>

            {/* Progress stepper */}
            <div className="mt-4 pt-4 sm:mt-5 sm:pt-5 border-t border-white/[0.08]">
              <div className="flex items-start">
                {timelineEvents.map((event, i) => (
                  <Fragment key={i}>
                    {i > 0 && (
                      <div className={cn('flex-1 h-[2px] mt-[5px] min-w-3 rounded-full', event.active ? 'bg-white/30' : 'bg-white/[0.10]')} />
                    )}
                    <div className="flex flex-col items-center gap-1.5 flex-shrink-0 max-w-[72px] px-1">
                      <span className={cn('h-3 w-3 rounded-full ring-4', event.active ? cn(event.colour, 'ring-white/[0.06]') : 'bg-white/[0.10] ring-transparent border border-white/[0.2]')} />
                      <span className={cn('text-[10px] font-medium text-center leading-tight', event.active ? 'text-white/90' : 'text-white/45')}>
                        {event.label}
                      </span>
                      {event.date && <span className="text-[9px] text-white/55 tabular-nums">{event.date}</span>}
                    </div>
                  </Fragment>
                ))}
              </div>
              {(emailTracking?.reminder_count ?? 0) > 0 && (
                <p className="text-[10px] text-purple-400 mt-2.5">
                  {emailTracking?.reminder_count} reminder{(emailTracking?.reminder_count ?? 0) !== 1 ? 's' : ''} sent
                </p>
              )}
            </div>
          </div>
        </div>

        {/* === NEXT STEP BANNER === */}
        {nudge && (
          <button
            onClick={nudge.action}
            disabled={nudge.disabled}
            className={cn(PANEL, 'w-full flex items-center justify-between gap-3 px-4 py-3.5 touch-manipulation active:scale-[0.99] transition-all text-left select-none disabled:opacity-50')}
          >
            <span className="flex items-center gap-2.5 min-w-0">
              <span className={cn('h-1.5 w-1.5 rounded-full flex-shrink-0', nudge.dot)} />
              <span className="text-[13px] text-white/90 leading-snug">{nudge.text}</span>
            </span>
            <span className={cn('text-[12px] font-semibold flex-shrink-0', nudge.cls)}>{nudge.cta} →</span>
          </button>
        )}

        {/* === CLIENT — full width === */}
        <div className={cn(PANEL, 'p-4 sm:p-5')}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="h-11 w-11 rounded-full bg-elec-yellow/15 border border-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[14px] font-bold text-elec-yellow">
                  {(quote.client?.name || '?').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold text-white truncate">{quote.client?.name || 'No client'}</p>
                {(quote.client?.address || quote.client?.postcode) && (
                  <p className="text-[12px] text-white/60 truncate">
                    {[quote.client?.address, quote.client?.postcode].filter(Boolean).join(', ')}
                  </p>
                )}
              </div>
            </div>
            {quote.client?.phone && (
              <div className="flex gap-2 sm:flex-shrink-0">
                {/* ELE-1277: no mailto Email button here — users read it as
                    "email the quote", but mailto can't attach the PDF and
                    silently does nothing on desktops with no mail app. Sending
                    the quote lives in the send actions at the bottom. */}
                {quote.client?.phone && (
                  <a
                    href={`tel:${quote.client.phone}`}
                    className="flex-1 sm:flex-initial h-10 sm:px-5 flex items-center justify-center gap-2 rounded-xl bg-white/[0.06] border border-white/[0.08] text-[12px] font-medium text-white touch-manipulation active:scale-[0.97] transition-all"
                  >
                    <Phone className="h-3.5 w-3.5 text-white/70" /> Call
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* === JOB + META — two equal boxes when a job scope exists, meta row otherwise === */}
        <div
          className={cn(
            'gap-4 space-y-4 lg:space-y-0',
            quote.jobDetails?.description || quote.jobDetails?.location
              ? 'lg:grid lg:grid-cols-2 lg:items-stretch'
              : ''
          )}
        >
          <div className={cn(!(quote.jobDetails?.description || quote.jobDetails?.location || quote.jobDetails?.workStartDate || quote.jobDetails?.workStartTbd) && 'hidden')}>
            {(quote.jobDetails?.description || quote.jobDetails?.location || quote.jobDetails?.workStartDate || quote.jobDetails?.workStartTbd) && (
              <div className={cn(PANEL, 'p-4 sm:p-5 h-full')}>
                <h2 className="text-[14px] font-semibold text-white mb-2">
                  {quote.jobDetails?.title || 'Job'}
                </h2>
                {quote.jobDetails?.description && (
                  <p className="text-[13px] text-white/80 whitespace-pre-line leading-relaxed">
                    {quote.jobDetails.description}
                  </p>
                )}
                {quote.jobDetails?.location && (
                  <p className="text-[12px] text-white/55 mt-2">{quote.jobDetails.location}</p>
                )}
                {(quote.jobDetails?.workStartTbd || quote.jobDetails?.workStartDate) && (
                  <p className="text-[12px] text-white/55 mt-2">
                    Start:{' '}
                    {quote.jobDetails?.workStartTbd
                      ? 'To be confirmed'
                      : new Date(quote.jobDetails!.workStartDate as string).toLocaleDateString(
                          'en-GB',
                          { day: 'numeric', month: 'short', year: 'numeric' }
                        )}
                  </p>
                )}
              </div>
            )}
          </div>
          <div
            className={cn(
              'gap-4',
              quote.jobDetails?.description || quote.jobDetails?.location
                ? 'flex flex-col'
                : 'grid lg:grid-cols-2 space-y-4 lg:space-y-0'
            )}
          >
            {/* Dates */}
            <div className={cn(PANEL, 'p-4 sm:p-5')}>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-[10px] text-white/55 uppercase tracking-wider mb-1.5">Created</p>
                  <p className="text-[13px] font-semibold text-white tabular-nums">
                    {format(new Date(quote.createdAt), 'd MMM yy')}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-white/55 uppercase tracking-wider mb-1.5">Expires</p>
                  <p className={cn('text-[13px] font-semibold tabular-nums', isExpired ? 'text-red-400' : 'text-white')}>
                    {format(new Date(quote.expiryDate), 'd MMM yy')}
                  </p>
                </div>
                {quote.accepted_at ? (
                  <div>
                    <p className="text-[10px] text-white/55 uppercase tracking-wider mb-1.5">Accepted</p>
                    <p className="text-[13px] font-semibold text-emerald-400 tabular-nums">
                      {format(new Date(quote.accepted_at), 'd MMM yy')}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-[10px] text-white/55 uppercase tracking-wider mb-1.5">Job</p>
                    <p className="text-[13px] font-semibold text-white truncate">
                      {quote.jobDetails?.title || '—'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Signature */}
            {isAccepted && quote.signature_url && (
              <div className={cn(PANEL, 'p-4 sm:p-5')}>
                <h2 className="text-[14px] font-semibold text-white mb-3">Signature</h2>
                <img
                  src={quote.signature_url}
                  alt="Customer signature"
                  className="w-full h-28 object-contain bg-white rounded-xl p-3"
                />
                {quote.accepted_by_name && (
                  <p className="text-[12px] text-white/65 mt-2">Signed by {quote.accepted_by_name}</p>
                )}
              </div>
            )}

            {/* Your numbers — private */}
            {((quote.overhead || 0) > 0 || (quote.profit || 0) > 0) && (
              <div className={cn(PANEL, 'p-4 sm:p-5')}>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-[14px] font-semibold text-white">Your numbers</h2>
                  <span className="text-[10px] text-white/50 px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08]">
                    Private
                  </span>
                </div>
                <div className="space-y-2">
                  {(quote.overhead || 0) > 0 && (
                    <div className="flex justify-between text-[13px]">
                      <span className="text-white/65">Overhead</span>
                      <span className="text-white/90 tabular-nums">{formatCurrency(quote.overhead)}</span>
                    </div>
                  )}
                  {(quote.profit || 0) > 0 && (
                    <div className="flex justify-between text-[13px]">
                      <span className="text-white/65">Profit</span>
                      <span className="text-emerald-400 font-semibold tabular-nums">{formatCurrency(quote.profit)}</span>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-[12px] mb-1.5">
                    <span className="text-white/65">Margin</span>
                    <span className={cn('font-bold tabular-nums', marginPct >= 20 ? 'text-emerald-400' : marginPct >= 10 ? 'text-amber-400' : 'text-red-400')}>
                      {marginPct}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
                    <div
                      className={cn('h-full rounded-full', marginPct >= 20 ? 'bg-emerald-400' : marginPct >= 10 ? 'bg-amber-400' : 'bg-red-400')}
                      style={{ width: `${Math.min(Math.max(marginPct, 2), 100)}%` }}
                    />
                  </div>
                </div>
                <p className="text-[10px] text-white/45 mt-3">Never shown to the client</p>
              </div>
            )}
          </div>
        </div>

        {/* === LINE ITEMS — full width === */}
            {quote.items && quote.items.length > 0 && (
              <div className={cn(PANEL, 'p-4 sm:p-5')}>
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-[14px] font-semibold text-white">Line items</h2>
                  <span className="text-[11px] text-white/65 px-2 py-0.5 rounded-md bg-white/[0.06] tabular-nums">
                    {quote.items.length}
                  </span>
                </div>
                <div className="divide-y divide-white/[0.07]">
                  {quote.items.map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-4 py-3.5">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className={cn(
                          'w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0',
                          item.category === 'labour' ? 'bg-blue-400' :
                          item.category === 'materials' ? 'bg-emerald-400' :
                          item.category === 'equipment' ? 'bg-purple-400' : 'bg-white/70'
                        )} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] text-white font-medium leading-snug whitespace-pre-line">{item.description}</p>
                          <p className="text-[12px] text-white/60 mt-1 tabular-nums">
                            {item.quantity} {item.unit || 'units'} × {formatCurrency(item.unitPrice)}
                          </p>
                        </div>
                      </div>
                      <p className="text-[14px] font-semibold text-white flex-shrink-0 tabular-nums">
                        {formatCurrency(item.totalPrice)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="mt-2 pt-4 border-t border-white/[0.10] space-y-2">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-white/65">Subtotal</span>
                    <span className="text-white/90 tabular-nums">{formatCurrency(quote.subtotal)}</span>
                  </div>
                  {quote.overhead > 0 && (
                    <div className="flex justify-between text-[13px]">
                      <span className="text-white/65">Overhead ({quote.settings?.overheadPercentage || 0}%)</span>
                      <span className="text-white/90 tabular-nums">{formatCurrency(quote.overhead)}</span>
                    </div>
                  )}
                  {quote.profit > 0 && (
                    <div className="flex justify-between text-[13px]">
                      <span className="text-white/65">Profit ({quote.settings?.profitPercentage || 0}%)</span>
                      <span className="text-white/90 tabular-nums">{formatCurrency(quote.profit)}</span>
                    </div>
                  )}
                  {quote.discountAmount > 0 && (
                    <div className="flex justify-between text-[13px]">
                      <span className="text-white/65">Discount</span>
                      <span className="text-emerald-400 tabular-nums">−{formatCurrency(quote.discountAmount)}</span>
                    </div>
                  )}
                  {quote.vatAmount > 0 && (
                    <div className="flex justify-between text-[13px]">
                      <span className="text-white/65">VAT ({quote.settings?.vatRate || 20}%)</span>
                      <span className="text-white/90 tabular-nums">{formatCurrency(quote.vatAmount)}</span>
                    </div>
                  )}
                  {liveTotals?.reverseCharge && (
                    <div className="flex justify-between text-[13px]">
                      <span className="text-white/65">VAT — reverse charge</span>
                      <span className="text-white/90 tabular-nums">£0.00</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-3 px-3.5 py-3 rounded-xl bg-elec-yellow/[0.08] border border-elec-yellow/[0.15]">
                    <span className="text-[14px] font-bold text-white">Total</span>
                    <span className="text-[22px] font-bold text-elec-yellow tabular-nums tracking-tight">
                      {formatCurrency(quote.total)}
                    </span>
                  </div>
                  {liveTotals && liveTotals.cisAmount > 0 && (
                    <div className="pt-1 space-y-1.5">
                      <div className="flex justify-between text-[13px]">
                        <span className="text-white/65">CIS deduction ({liveTotals.cisRate}% of labour)</span>
                        <span className="text-red-400 tabular-nums">−{formatCurrency(liveTotals.cisAmount)}</span>
                      </div>
                      <div className="flex justify-between text-[13px]">
                        <span className="text-white font-semibold">Net payable after CIS</span>
                        <span className="text-white font-semibold tabular-nums">{formatCurrency(liveTotals.netPayable)}</span>
                      </div>
                    </div>
                  )}
                  {liveTotals?.reverseCharge && (
                    <p className="text-[11px] text-white/55 pt-1 leading-relaxed">
                      Reverse charge: customer to account to HMRC for the VAT — {formatCurrency(liveTotals.notionalVat)} @ {quote.settings?.vatRate ?? 20}%.
                    </p>
                  )}
                </div>
              </div>
            )}

        {/* === NOTES === */}
            {quote.notes && (
              <div className={cn(PANEL, 'p-4 sm:p-5')}>
                <h2 className="text-[14px] font-semibold text-white mb-2">Notes</h2>
                <p className="text-[13px] text-white/80 whitespace-pre-line leading-relaxed">{quote.notes}</p>
              </div>
            )}

      </div>

      {/* === STICKY ACTION BAR — sticks inside the content column, respects sidebar === */}
      <div className="sticky bottom-0 z-40 bg-background/95 backdrop-blur-md border-t border-white/[0.08]">
        <div className="flex gap-2 p-3 pb-[max(12px,env(safe-area-inset-bottom))] lg:px-6">
          <div className="flex-1">
            <QuoteSendDropdown
              quote={quote}
              onSent={() => setQuote((prev) => (prev ? { ...prev, status: 'sent' } : prev))}
            />
          </div>
          {canAccept ? (
            <button
              onClick={handleMarkAsAccepted}
              className="flex-1 h-12 rounded-xl bg-emerald-500 text-white text-[14px] font-semibold touch-manipulation active:scale-[0.97] transition-all"
            >
              Mark Accepted
              <span className="sm:hidden font-bold tabular-nums"> · {formatCurrency(quote.total)}</span>
            </button>
          ) : canConvertToInvoice ? (
            <button
              onClick={handleConvertToInvoice}
              disabled={isConverting}
              className="flex-1 h-12 rounded-xl bg-elec-yellow text-black text-[14px] font-semibold touch-manipulation active:scale-[0.97] transition-all disabled:opacity-50"
            >
              Convert to Invoice
              <span className="sm:hidden font-bold tabular-nums"> · {formatCurrency(quote.total)}</span>
            </button>
          ) : (
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex-1 h-12 rounded-xl bg-white/[0.08] border border-white/[0.12] text-white text-[14px] font-semibold touch-manipulation active:scale-[0.97] transition-all disabled:opacity-50"
            >
              {isDownloading ? 'Generating…' : 'Download PDF'}
            </button>
          )}
        </div>
      </div>

      {/* === DIALOGS === */}
      {/* Actions Bottom Sheet */}
      <Sheet open={showActionsSheet} onOpenChange={setShowActionsSheet}>
        <SheetContent
          side="bottom"
          className="rounded-t-2xl p-0 max-h-[85vh] overflow-y-auto overscroll-contain border-t border-white/[0.10]"
        >
          <div className="w-full px-4 sm:px-6 pt-3 pb-[max(20px,env(safe-area-inset-bottom))]">
            {/* Grab handle */}
            <div className="mx-auto h-1 w-10 rounded-full bg-white/[0.15] mb-4" />

            {/* Context header */}
            <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-white/[0.08]">
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-white truncate">{quote.client?.name || 'No client'}</p>
                <p className="text-[11px] text-white/55 font-mono truncate">{quote.quoteNumber}</p>
              </div>
              <p className="text-[18px] font-bold text-elec-yellow tabular-nums flex-shrink-0">{formatCurrency(quote.total)}</p>
            </div>

            {/* Action tiles — 2-up, 4-up on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {/* ELE-1280: email send lives in the drawer too — users missed
                  the Send button at the bottom of the page. */}
              <button
                onClick={() => { setShowActionsSheet(false); handleEmailQuote(); }}
                className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] active:scale-[0.98] touch-manipulation transition-all text-left select-none"
              >
                <span className="h-10 w-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <Mail className="h-4 w-4 text-white/85" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-white">Email to client</span>
                  <span className="block text-[11px] text-white/55 mt-0.5">PDF attached, one tap</span>
                </span>
              </button>

              <button
                onClick={() => { setShowActionsSheet(false); navigate(`/electrician/quote-builder/${quote.id}`); }}
                className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] active:scale-[0.98] touch-manipulation transition-all text-left select-none"
              >
                <span className="h-10 w-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <Pencil className="h-4 w-4 text-white/85" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-white">Edit quote</span>
                  <span className="block text-[11px] text-white/55 mt-0.5">Items, prices and details</span>
                </span>
              </button>

              <button
                onClick={() => { setShowActionsSheet(false); handleDuplicate(); }}
                className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] active:scale-[0.98] touch-manipulation transition-all text-left select-none"
              >
                <span className="h-10 w-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <Copy className="h-4 w-4 text-white/85" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-white">Duplicate</span>
                  <span className="block text-[11px] text-white/55 mt-0.5">New quote from this one</span>
                </span>
              </button>

              <button
                onClick={() => { setShowActionsSheet(false); handleDownloadPDF(); }}
                className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] active:scale-[0.98] touch-manipulation transition-all text-left select-none"
              >
                <span className="h-10 w-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <Download className="h-4 w-4 text-white/85" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-white">Download PDF</span>
                  <span className="block text-[11px] text-white/55 mt-0.5">Client-ready document</span>
                </span>
              </button>

              <button
                onClick={() => { setShowActionsSheet(false); handleCopyClientLink(); }}
                className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] active:scale-[0.98] touch-manipulation transition-all text-left select-none"
              >
                <span className="h-10 w-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <Link2 className="h-4 w-4 text-white/85" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-white">Copy client link</span>
                  <span className="block text-[11px] text-white/55 mt-0.5">They view and accept online</span>
                </span>
              </button>

              <button
                onClick={openProjectPicker}
                className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] active:scale-[0.98] touch-manipulation transition-all text-left select-none"
              >
                <span className="h-10 w-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  {linkedProject ? (
                    <Folder className="h-4 w-4 text-elec-yellow" />
                  ) : (
                    <FolderPlus className="h-4 w-4 text-white/85" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-semibold text-white truncate">
                    {linkedProject ? linkedProject.title : 'Add to job'}
                  </span>
                  <span className="block text-[11px] text-white/55 mt-0.5">
                    {linkedProject ? 'On a job — tap to change' : 'Track it with tasks & costs'}
                  </span>
                </span>
              </button>

              <button
                onClick={() => {
                  setShowActionsSheet(false);
                  navigate('/electrician-tools/site-safety/ai-rams', {
                    state: {
                      ramsSeed: {
                        job_details: {
                          title: quote.jobDetails?.title,
                          description: quote.jobDetails?.description,
                          location: quote.jobDetails?.location,
                        },
                        client_data: {
                          name: quote.client?.name,
                          address: quote.client?.address,
                          postcode: quote.client?.postcode,
                        },
                      },
                    },
                  });
                }}
                className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] active:scale-[0.98] touch-manipulation transition-all text-left select-none"
              >
                <span className="h-10 w-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4 text-white/85" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-semibold text-white truncate">Create RAMS</span>
                  <span className="block text-[11px] text-white/55 mt-0.5">Risk assessment from this job</span>
                </span>
              </button>

              {canAccept && (
                <button
                  onClick={() => { setShowActionsSheet(false); handleMarkAsAccepted(); }}
                  className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/[0.15] hover:bg-emerald-500/[0.1] active:scale-[0.98] touch-manipulation transition-all text-left select-none"
                >
                  <span className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                    <Check className="h-4 w-4 text-emerald-400" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-emerald-400">Mark accepted</span>
                    <span className="block text-[11px] text-white/55 mt-0.5">Client said yes outside the app</span>
                  </span>
                </button>
              )}

              {canDecline && (
                <button
                  onClick={() => { setShowActionsSheet(false); setShowDeclineSheet(true); }}
                  className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-red-500/[0.06] active:scale-[0.98] touch-manipulation transition-all text-left select-none"
                >
                  <span className="h-10 w-10 rounded-xl bg-red-500/[0.10] border border-red-500/[0.15] flex items-center justify-center">
                    <XCircle className="h-4 w-4 text-red-400" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-white">Mark declined</span>
                    <span className="block text-[11px] text-white/55 mt-0.5">Keep your win rate honest</span>
                  </span>
                </button>
              )}

              {canConvertToInvoice && (
                <button
                  onClick={() => { setShowActionsSheet(false); handleConvertToInvoice(); }}
                  disabled={isConverting}
                  className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl bg-elec-yellow/[0.06] border border-elec-yellow/[0.15] hover:bg-elec-yellow/[0.1] active:scale-[0.98] touch-manipulation transition-all text-left select-none disabled:opacity-50"
                >
                  <span className="h-10 w-10 rounded-xl bg-elec-yellow/15 border border-elec-yellow/20 flex items-center justify-center">
                    <Receipt className="h-4 w-4 text-elec-yellow" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-elec-yellow">Convert to invoice</span>
                    <span className="block text-[11px] text-white/55 mt-0.5">Everything carries across</span>
                  </span>
                </button>
              )}

              {canSendReminder && (
                <button
                  onClick={() => { setShowActionsSheet(false); handleSendReminder(); }}
                  disabled={isSendingReminder}
                  className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-blue-500/[0.06] active:scale-[0.98] touch-manipulation transition-all text-left select-none disabled:opacity-50"
                >
                  <span className="h-10 w-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
                    <Bell className="h-4 w-4 text-blue-400" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-white">{isSendingReminder ? 'Sending…' : 'Send reminder'}</span>
                    <span className="block text-[11px] text-white/55 mt-0.5">{3 - (emailTracking?.reminder_count || 0)} of 3 left</span>
                  </span>
                </button>
              )}

              {canFollowUpTask && (
                <button
                  onClick={() => { setShowActionsSheet(false); handleCreateFollowUpTask(); }}
                  className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] active:scale-[0.98] touch-manipulation transition-all text-left select-none"
                >
                  <span className="h-10 w-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                    <CalendarPlus className="h-4 w-4 text-white/85" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-white">Follow-up task</span>
                    <span className="block text-[11px] text-white/55 mt-0.5">Reminds you tomorrow, 9am</span>
                  </span>
                </button>
              )}

              {canRevert && (
                <button
                  onClick={() => { setShowActionsSheet(false); setShowRevertDialog(true); }}
                  className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-amber-500/[0.06] active:scale-[0.98] touch-manipulation transition-all text-left select-none"
                >
                  <span className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center">
                    <Undo2 className="h-4 w-4 text-amber-400" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-white">Revert acceptance</span>
                    <span className="block text-[11px] text-white/55 mt-0.5">Put it back to sent</span>
                  </span>
                </button>
              )}
            </div>

            {/* Destructive — separated */}
            <div className="border-t border-white/[0.08] mt-3 pt-3">
              <button
                onClick={() => { setShowActionsSheet(false); setShowDeleteDialog(true); }}
                className="w-full flex items-center gap-3 h-12 px-3 rounded-xl hover:bg-red-500/[0.06] active:bg-red-500/[0.1] touch-manipulation transition-all"
              >
                <Trash2 className="h-4 w-4 text-red-400 flex-shrink-0" />
                <span className="text-[13px] font-semibold text-red-400">Delete quote</span>
                <span className="text-[11px] text-white/45 ml-auto">Permanent — cannot be undone</span>
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Decline reason — one tap, feeds win/loss analytics */}
      <Sheet open={showDeclineSheet} onOpenChange={setShowDeclineSheet}>
        <SheetContent
          side="bottom"
          className="rounded-t-2xl p-0 max-h-[85vh] overflow-y-auto overscroll-contain border-t border-white/[0.10]"
        >
          <div className="w-full px-4 sm:px-6 pt-3 pb-[max(20px,env(safe-area-inset-bottom))]">
            <div className="mx-auto h-1 w-10 rounded-full bg-white/[0.15] mb-4" />

            <div className="pb-3 mb-3 border-b border-white/[0.08]">
              <p className="text-[14px] font-semibold text-white">Why was it declined?</p>
              <p className="text-[11px] text-white/55 mt-0.5">
                One tap — this builds your win/loss insight over time
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {DECLINE_REASONS.map((r) => (
                <button
                  key={r.key}
                  onClick={() => handleMarkAsDeclined(r.key)}
                  className="flex flex-col items-start gap-1 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-red-500/[0.05] active:scale-[0.98] touch-manipulation transition-all text-left select-none min-h-[64px]"
                >
                  <span className="text-[13px] font-semibold text-white">{r.label}</span>
                  <span className="text-[11px] text-white/55">{r.hint}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => handleMarkAsDeclined()}
              className="w-full mt-3 h-11 rounded-xl text-[12px] font-medium text-white/55 bg-white/[0.03] border border-white/[0.06] touch-manipulation active:scale-[0.99] transition-all"
            >
              Skip — just mark it declined
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Project picker */}
      <Sheet open={showProjectPicker} onOpenChange={setShowProjectPicker}>
        <SheetContent
          side="bottom"
          className="rounded-t-2xl p-0 max-h-[70vh] overflow-y-auto overscroll-contain border-t border-white/[0.10]"
        >
          <div className="w-full px-4 sm:px-6 pt-3 pb-[max(20px,env(safe-area-inset-bottom))]">
            <div className="mx-auto h-1 w-10 rounded-full bg-white/[0.15] mb-4" />
            <p className="text-[14px] font-semibold text-white px-1 mb-3">
              {linkedProject ? 'Move to another job' : 'Add to a job'}
            </p>

            {!linkedProject && (
              <button
                onClick={handleConvertToJob}
                disabled={isLinkingProject}
                className="w-full flex items-center gap-3 h-12 px-3.5 mb-3 rounded-xl bg-elec-yellow/[0.08] border border-elec-yellow/[0.25] hover:bg-elec-yellow/[0.12] active:scale-[0.99] touch-manipulation transition-all disabled:opacity-50"
              >
                {isLinkingProject ? (
                  <Loader2 className="h-4 w-4 animate-spin text-elec-yellow flex-shrink-0" />
                ) : (
                  <FolderPlus className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                )}
                <span className="text-left min-w-0">
                  <span className="block text-[13px] font-semibold text-white">
                    Create job from this quote
                  </span>
                  <span className="block text-[11px] text-white/55">
                    Title, client, address and value carried over
                  </span>
                </span>
              </button>
            )}

            {projects === null ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
              </div>
            ) : projects.length === 0 ? (
              <p className="text-[13px] text-white/60 px-1 py-6 text-center">
                No jobs yet — create one from this quote above.
              </p>
            ) : (
              <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {projects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => handleAssignProject(proj.id, proj.title)}
                    disabled={isLinkingProject}
                    className={cn(
                      'flex flex-col items-start gap-2 p-3.5 rounded-xl border touch-manipulation transition-all text-left select-none active:scale-[0.98] disabled:opacity-50',
                      linkedProject?.id === proj.id
                        ? 'bg-elec-yellow/[0.06] border-elec-yellow/[0.2]'
                        : 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.06]'
                    )}
                  >
                    <span className="flex items-center gap-1.5 w-full">
                      <span
                        className={cn(
                          'h-1.5 w-1.5 rounded-full flex-shrink-0',
                          proj.status === 'completed' || proj.status === 'done'
                            ? 'bg-emerald-400'
                            : proj.status === 'in_progress' || proj.status === 'active'
                              ? 'bg-blue-400'
                              : 'bg-white/50'
                        )}
                      />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/55 truncate">
                        {proj.status.replace(/_/g, ' ')}
                      </span>
                      {linkedProject?.id === proj.id && (
                        <Check className="h-3.5 w-3.5 text-elec-yellow ml-auto flex-shrink-0" />
                      )}
                    </span>
                    <span className="min-w-0 w-full">
                      <span className="block text-[13px] font-semibold text-white truncate">{proj.title}</span>
                      <span className="block text-[11px] text-white/55 truncate min-h-[14px]">
                        {proj.customer || ' '}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              {linkedProject && (
                <div className="border-t border-white/[0.08] mt-3 pt-3">
                  <button
                    onClick={() => handleAssignProject(null)}
                    disabled={isLinkingProject}
                    className="w-full flex items-center gap-3 h-12 px-3 rounded-xl hover:bg-red-500/[0.06] active:bg-red-500/[0.1] touch-manipulation transition-all disabled:opacity-50"
                  >
                    <XCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span className="text-[13px] font-semibold text-red-400">Remove from job</span>
                  </button>
                </div>
              )}
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Quote {quote.quoteNumber}?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-500 hover:bg-red-600">
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showRevertDialog} onOpenChange={setShowRevertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revert to Sent?</AlertDialogTitle>
            <AlertDialogDescription>This will undo the acceptance.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRevertToSent} disabled={isReverting} className="bg-amber-500 hover:bg-amber-600">
              {isReverting ? 'Reverting...' : 'Revert'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <CertificateGenerationDialog
        open={showGenerationDialog}
        onOpenChange={setShowGenerationDialog}
        pdfUrl={generatedPdfUrl}
        filename={pdfFilename}
        error={generationError}
        isGenerating={isDownloading}
        title="Quote PDF"
      />
    </div>
  );
};

export default QuoteViewPage;
