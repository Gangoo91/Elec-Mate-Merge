import { useState, useEffect, useCallback, useRef } from 'react';
import { useAppReview } from '@/hooks/useAppReview';
import { useNavigate } from 'react-router-dom';
import { Quote } from '@/types/quote';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Mail,
  MessageCircle,
  Loader2,
  CreditCard,
  Zap,
  CheckCircle,
  Calculator,
  ExternalLink,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { toast as sonnerToast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { useAccountingIntegrations } from '@/hooks/useAccountingIntegrations';
import { ACCOUNTING_PROVIDERS } from '@/types/accounting';
import { openExternalUrl } from '@/utils/open-external-url';
import { Capacitor } from '@capacitor/core';
import { sharePdfBytesFromUrlToWhatsAppWeb } from '@/utils/share-pdf-to-whatsapp-web';
import { sharePdfFileNative, canShareFilesToWhatsApp } from '@/utils/share-pdf-file-native';
import {
  trackCardPromptDismissed,
  trackCardPromptShown,
  trackInvoiceRaised,
  trackInvoiceSentWithoutCard,
  trackStripeConnectCompleted,
  trackStripeConnectStarted,
} from '@/lib/analytics-events';
import CardPaymentsPromptSheet, { type CardPromptStatus } from './CardPaymentsPromptSheet';
import { cardPromptSnoozed, snoozeCardPrompt } from './cardPromptSnooze';

/**
 * Set when setup starts, taken when the account comes back active. Stripe
 * returns to the page with a full load, so component state cannot carry it —
 * and it remembers WHICH invoice started it, so that one can be resent with
 * the button the moment it can carry one.
 */
const CONNECT_STARTED_KEY = 'elecmate:stripe-connect-started';
const CONNECT_MARKER_DAYS = 3;
function markConnectStarted(invoiceId: string) {
  try {
    localStorage.setItem(CONNECT_STARTED_KEY, JSON.stringify({ at: Date.now(), invoiceId }));
  } catch {
    /* storage blocked — the completion event and the resend offer are lost */
  }
}
function takeConnectStarted(): { invoiceId?: string } | null {
  try {
    const raw = localStorage.getItem(CONNECT_STARTED_KEY);
    if (!raw) return null;
    localStorage.removeItem(CONNECT_STARTED_KEY);
    const parsed = JSON.parse(raw) as { at?: number; invoiceId?: string };
    // A setup abandoned last week finishing today is not this invoice's story.
    if (!parsed.at || Date.now() - parsed.at > CONNECT_MARKER_DAYS * 86_400_000) return null;
    return { invoiceId: parsed.invoiceId };
  } catch {
    return null;
  }
}

interface InvoiceSendDropdownProps {
  invoice: Quote;
  onSuccess?: () => void;
  disabled?: boolean;
  className?: string;
  refreshKey?: number;
  compact?: boolean;
}

export const InvoiceSendDropdown = ({
  invoice,
  onSuccess,
  disabled = false,
  className = '',
  refreshKey = 0,
  compact = false,
}: InvoiceSendDropdownProps) => {
  const navigate = useNavigate();
  const { recordPositiveAction } = useAppReview();
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isSharingWhatsApp, setIsSharingWhatsApp] = useState(false);
  const [isConnectingStripe, setIsConnectingStripe] = useState(false);
  const [stripeStatus, setStripeStatus] = useState<
    'loading' | 'not_connected' | 'pending' | 'active'
  >('loading');
  const [isSyncingAccounting, setIsSyncingAccounting] = useState(false);
  /** ELE-1705 — the after-send prompt, or the "now resend it" offer. */
  const [cardPrompt, setCardPrompt] = useState<{
    mode: 'prompt' | 'ready';
    status?: CardPromptStatus;
  } | null>(null);
  // The status effect runs on focus with stale props; read the invoice live.
  const invoiceRef = useRef(invoice);
  invoiceRef.current = invoice;

  /**
   * Back from Stripe with the account live. If the invoice that started it is
   * still unpaid, offer to resend it with the button — that is what the setup
   * was for. Otherwise just say card payments are on.
   */
  const onCardsLive = useCallback(async (startedFrom?: string) => {
    trackStripeConnectCompleted();
    const current = invoiceRef.current;
    if (startedFrom && startedFrom === current.id) {
      const { data } = await supabase
        .from('quotes')
        .select('invoice_status, invoice_sent_at')
        .eq('id', current.id)
        .maybeSingle();
      if (data?.invoice_sent_at && data.invoice_status !== 'paid') {
        setCardPrompt({ mode: 'ready' });
        return;
      }
    }
    toast({
      title: 'Card payments are on',
      description: 'Every invoice you email now carries a Pay now button.',
      variant: 'success',
    });
  }, []);

  // Accounting integrations hook
  const {
    integrations: accountingIntegrations,
    loading: accountingLoading,
    hasConnectedProvider: hasAccountingConnected,
    syncInvoice,
    connectProvider,
  } = useAccountingIntegrations();

  // Check if user has Stripe connected - refreshes on mount, focus, or refreshKey change
  // Calls edge function to sync with Stripe API and update database
  useEffect(() => {
    const checkStripeStatus = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          setStripeStatus('not_connected');
          return;
        }

        // Call edge function to check actual Stripe status and sync database
        const { data, error } = await supabase.functions.invoke('get-stripe-connect-status', {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (error) {
          // Fallback to database read
          const { data: profile } = await supabase
            .from('company_profiles')
            .select('stripe_account_id, stripe_account_status')
            .eq('user_id', session.user.id)
            .single();

          if (profile?.stripe_account_status === 'active') {
            const started = takeConnectStarted();
            if (started) onCardsLive(started.invoiceId);
            setStripeStatus('active');
          } else if (profile?.stripe_account_id) {
            setStripeStatus('pending');
          } else {
            setStripeStatus('not_connected');
          }
          return;
        }

        // Edge function returns actual Stripe status and updates DB
        if (data?.status === 'active') {
          const started = takeConnectStarted();
          if (started) onCardsLive(started.invoiceId);
          setStripeStatus('active');
        } else if (data?.connected) {
          setStripeStatus('pending');
        } else {
          setStripeStatus('not_connected');
        }
      } catch {
        setStripeStatus('not_connected');
      }
    };

    checkStripeStatus();

    // Re-check when window regains focus (after returning from Stripe)
    const handleFocus = () => checkStripeStatus();
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [refreshKey, onCardsLive]);

  // Poll PDF Monkey status via edge function until downloadUrl is ready (max ~90s)
  const pollPdfDownloadUrl = async (
    documentId: string,
    accessToken: string
  ): Promise<string | null> => {
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

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

  /**
   * ELE-1705 — after any send that went without a Pay now link, say what the
   * client cannot do. It was an 8-second toast saying "get paid faster",
   * which 35 senders scrolled past on 413 invoices in 90 days.
   */
  const promptAfterSend = () => {
    if (stripeStatus === 'active') return;
    trackInvoiceSentWithoutCard({ stripe_status: stripeStatus });
    if ((stripeStatus === 'not_connected' || stripeStatus === 'pending') && !cardPromptSnoozed()) {
      const promptStatus: CardPromptStatus = stripeStatus;
      // After the success toast has registered, not on top of it.
      setTimeout(() => {
        setCardPrompt({ mode: 'prompt', status: promptStatus });
        trackCardPromptShown({ stripe_status: promptStatus });
      }, 700);
    }
  };

  const handleSendEmail = async () => {
    try {
      setIsSendingEmail(true);

      // Validate client email
      const cleanTo = invoice.client?.email?.trim();
      if (!cleanTo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanTo)) {
        toast({
          title: 'Invalid Client Email',
          description:
            'Client email address is invalid. Please correct it in the invoice and try again.',
          variant: 'destructive',
        });
        setIsSendingEmail(false);
        return;
      }

      // Get current session
      let {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
        if (refreshError || !refreshData.session) {
          throw new Error('Please log in again to send invoices.');
        }
        session = refreshData.session;
      }

      // Send via Resend
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL || 'https://jtwygbeceundfgnkirof.supabase.co'}/functions/v1/send-invoice-resend`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ invoiceId: invoice.id }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || `Server error: ${response.status}`);
      }

      if (data?.error) {
        throw new Error(data.error + (data.hint ? ` (${data.hint})` : ''));
      }

      if (!data?.success) {
        throw new Error(data?.message || 'Unknown error sending invoice');
      }

      // Show success message with payment link and accounting sync status
      const payNowIncluded = data?.payNowIncluded;
      const accountingSynced = data?.accountingSynced;
      const accountingProvider = data?.accountingProvider;

      let description = `Invoice ${invoice.invoice_number} sent to ${cleanTo}`;
      if (payNowIncluded) description += ' with Pay Now button';
      if (accountingSynced && accountingProvider) {
        description += ` • Synced to ${accountingProvider.charAt(0).toUpperCase() + accountingProvider.slice(1)}`;
      }

      toast({
        title: 'Invoice sent',
        description,
        variant: 'success',
        duration: 4000,
      });

      /*
       * ELE-1705 — say what the client cannot do, at the moment it matters.
       * It was an 8-second toast saying "get paid faster", which 35 senders
       * scrolled past on 413 invoices in 90 days.
       */
      if (!payNowIncluded) promptAfterSend();

      // Update status to sent with timestamp
      await supabase
        .from('quotes')
        .update({
          invoice_status: 'sent',
          invoice_sent_at: new Date().toISOString(),
        })
        .eq('id', invoice.id);

      // An invoice is "raised" the moment it reaches the client. Totals are
      // pounds (see computeQuoteTotals), hence ×100 for amount_pence.
      trackInvoiceRaised({
        invoice_id: invoice.id,
        amount_pence: Math.round((invoice.total || 0) * 100),
      });

      onSuccess?.();
      recordPositiveAction();
    } catch (error: any) {
      toast({
        title: 'Error sending invoice',
        description: error.message || 'Failed to send invoice. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleShareWhatsApp = async () => {
    try {
      setIsSharingWhatsApp(true);

      // ALWAYS regenerate PDF for guaranteed freshness - fetch latest data first
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      /*
       * ELE-1705 — a WhatsApp send never carried a way to pay by card, even
       * for electricians set up for it: only the EMAIL send created the link,
       * and the PDF only shows one that exists. Of 76 invoices from connected
       * accounts in 90 days, 7 had a link. Create it first (non-fatal), so
       * the PDF carries the button and the message carries the link.
       */
      const PAY_PAGE = 'https://www.elec-mate.com/pay/';
      if (stripeStatus === 'active' && invoice.invoice_status !== 'paid') {
        // Only when it has no permanent link yet — no Stripe round trip on
        // every share of an invoice that already carries one.
        const { data: existing } = await supabase
          .from('quotes')
          .select('stripe_payment_link_url')
          .eq('id', invoice.id)
          .maybeSingle();
        if (!existing?.stripe_payment_link_url?.startsWith(PAY_PAGE)) {
          await supabase.functions
            .invoke('create-invoice-payment-link', { body: { invoiceId: invoice.id } })
            .catch(() => undefined);
        }
      }

      // Step 1: Fetch FRESH invoice data from database
      const { data: freshInvoice, error: fetchError } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', invoice.id)
        .eq('user_id', user.id)
        .single();

      if (fetchError || !freshInvoice) {
        throw new Error('Failed to fetch latest invoice data');
      }

      const { data: companyData, error: companyError } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Company profile may not exist — non-blocking

      // Step 2: Generate fresh PDF with latest data (silently)
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('User not authenticated');
      }

      const { data: pdfData, error: pdfError } = await supabase.functions.invoke(
        'generate-pdf-monkey',
        {
          body: {
            quote: freshInvoice, // Use fresh data from database
            companyProfile: companyData,
            invoice_mode: true,
            force_regenerate: true,
          },
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      let pdfUrl = pdfData?.downloadUrl;
      const documentId = pdfData?.documentId;

      if (!pdfUrl && documentId) {
        pdfUrl = (await pollPdfDownloadUrl(documentId, session.access_token)) || undefined;
      }

      if (pdfError || !pdfUrl) {
        throw new Error('Failed to generate professional PDF');
      }

      // Step 3: Store PDF metadata in database (NO URL - it expires)
      if (documentId) {
        const newVersion = (freshInvoice.pdf_version || 0) + 1;
        await supabase
          .from('quotes')
          .update({
            pdf_document_id: documentId,
            pdf_generated_at: new Date().toISOString(),
            pdf_version: newVersion,
          })
          .eq('id', invoice.id);
      }

      // Step 4: Use fresh PDF URL directly (don't store - it expires)
      const cacheBustedPdfUrl = `${pdfUrl}?t=${Date.now()}`;

      // Step 5: Create WhatsApp message
      const clientData =
        typeof freshInvoice.client_data === 'string'
          ? JSON.parse(freshInvoice.client_data)
          : freshInvoice.client_data;
      const clientName = clientData?.name || 'Valued Client';
      const companyName = companyData?.company_name || 'Your Company';
      const totalAmount = freshInvoice.total || 0;
      const dueDate = freshInvoice.invoice_due_date
        ? format(new Date(freshInvoice.invoice_due_date), 'dd MMMM yyyy')
        : format(new Date(), 'dd MMMM yyyy');

      const clientPhone = clientData?.phone;

      // Only the permanent page goes in a chat — never a Checkout session,
      // which is dead in 24 hours, and never a signed file URL (ELE-1377).
      // And only while card payments are live — a link kept from before a
      // revoked account would open a page that cannot take the payment.
      const payLink: string | null =
        stripeStatus === 'active' &&
        typeof freshInvoice.stripe_payment_link_url === 'string' &&
        freshInvoice.stripe_payment_link_url.startsWith(PAY_PAGE)
          ? freshInvoice.stripe_payment_link_url
          : null;
      const paymentLine = payLink
        ? `Pay by card here: ${payLink}\n\nBank details are on the invoice too. If you have any questions, just reply here.`
        : 'Payment details are on the invoice. If you have any questions, just reply here.';

      if (Capacitor.isNativePlatform()) {
        // ELE-1276: attach the actual PDF via the native share sheet — the
        // signed S3 URL expires after an hour and looks unprofessional as
        // raw text. The file IS the document; the only link a message carries is
        // the permanent pay page (ELE-1705), never a file or Checkout URL.
        const nativeMessage = `*Invoice ${freshInvoice.invoice_number} — ${companyName}*

Dear ${clientName},

Please find attached your invoice for ${formatCurrency(totalAmount)}, due ${dueDate}.

${paymentLine}

Many thanks,
${companyName}`;

        const shared = await sharePdfFileNative({
          pdfUrl: cacheBustedPdfUrl,
          filename: `Invoice-${freshInvoice.invoice_number || freshInvoice.id}.pdf`,
          title: `Invoice ${freshInvoice.invoice_number}`,
          text: nativeMessage,
        });

        if (!shared) {
          // ELE-1377 — no wa.me link fallback (it dumped a raw signed URL into
          // the chat, which is the broken behaviour). If the native share sheet
          // can't open, point the user at Save rather than send a bad link.
          toast({
            title: 'Could not open share sheet',
            description:
              'Please try again, or use Save to download the PDF and attach it yourself.',
            variant: 'destructive',
          });
          return;
        }

        toast({
          title: 'Shared',
          variant: 'success',
          duration: 3000,
        });
      } else {
        // Web: attach the actual PDF; the pay page is the only link in the body
        const webMessage = `*Invoice ${freshInvoice.invoice_number} — ${companyName}*

Dear ${clientName},

Please find attached your invoice for ${formatCurrency(totalAmount)}, due ${dueDate}.

${paymentLine}

Many thanks,
${companyName}`;

        const result = await sharePdfBytesFromUrlToWhatsAppWeb({
          pdfUrl,
          filename: `Invoice-${freshInvoice.invoice_number || freshInvoice.id}.pdf`,
          message: webMessage,
          recipientPhone: clientPhone,
          title: `Invoice ${freshInvoice.invoice_number}`,
        });

        toast({
          title: result.mode === 'web-share' ? 'Opening share sheet' : 'PDF downloaded',
          description:
            result.mode === 'web-share'
              ? 'Pick WhatsApp to send the PDF.'
              : 'PDF saved to your Downloads — attach it from your WhatsApp chat.',
          variant: 'success',
          duration: 3000,
        });
      }

      if (!payLink) promptAfterSend();
      onSuccess?.();
    } catch (error: any) {
      if (error?.name === 'AbortError') {
        return;
      }
      toast({
        title: 'Error',
        description: error.message || 'Failed to prepare invoice for WhatsApp',
        variant: 'destructive',
      });
    } finally {
      setIsSharingWhatsApp(false);
    }
  };

  // Connect existing Stripe account via OAuth (instant!)
  const handleConnectStripeOAuth = async (source: 'send_prompt' | 'send_menu' = 'send_menu') => {
    trackStripeConnectStarted({ source, method: 'oauth' });
    markConnectStarted(invoice.id);
    try {
      setIsConnectingStripe(true);
      const { data: session } = await supabase.auth.getSession();

      if (!session.session) {
        sonnerToast.error('Please log in to connect Stripe');
        return;
      }

      const response = await supabase.functions.invoke('stripe-connect-oauth', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
        body: {
          action: 'get_oauth_url',
          returnUrl: window.location.href,
        },
      });

      if (response.error) throw response.error;

      if (response.data?.error) {
        sonnerToast.error(response.data.error);
        return;
      }

      const { url } = response.data || {};
      if (url) {
        // Redirect to Stripe OAuth - user logs into their existing account
        await openExternalUrl(url);
      } else {
        sonnerToast.error('Could not start Stripe connection');
      }
    } catch (error: any) {
      sonnerToast.error(error?.message || 'Failed to connect Stripe');
    } finally {
      setIsConnectingStripe(false);
    }
  };

  // Create new Stripe Express account (for users without Stripe)
  const handleConnectStripeExpress = async (source: 'send_prompt' | 'send_menu' = 'send_menu') => {
    trackStripeConnectStarted({ source, method: 'express' });
    markConnectStarted(invoice.id);
    try {
      setIsConnectingStripe(true);
      const { data: session } = await supabase.auth.getSession();

      if (!session.session) {
        sonnerToast.error('Please log in to connect Stripe');
        return;
      }

      // Pass current URL so Stripe redirects back here after onboarding
      const response = await supabase.functions.invoke('create-stripe-connect-account', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
        body: { returnUrl: window.location.href },
      });

      if (response.error) throw response.error;

      // Check for error in response data
      if (response.data?.error) {
        sonnerToast.error(response.data.error, {
          description: response.data.action || undefined,
          duration: 6000,
        });
        return;
      }

      const { url, type } = response.data || {};

      if (url) {
        if (type === 'dashboard') {
          sonnerToast.success('Opening Stripe Dashboard');
        }
        // Use openExternalUrl so Stripe Connect works on native (WKWebView) and web
        await openExternalUrl(url);
      } else {
        sonnerToast.error('Could not start Stripe setup', {
          description: 'Please try again or contact support.',
        });
      }
    } catch (error: any) {
      const errorMessage =
        error?.message ||
        error?.error ||
        (typeof error === 'string' ? error : 'Failed to connect Stripe');
      sonnerToast.error(errorMessage);
    } finally {
      setIsConnectingStripe(false);
    }
  };

  // Sync invoice to connected accounting software
  const handleSyncToAccounting = async () => {
    try {
      setIsSyncingAccounting(true);
      const success = await syncInvoice(invoice.id);
      if (success) {
        // Trigger refresh to show green tick
        onSuccess?.();
      }
    } finally {
      setIsSyncingAccounting(false);
    }
  };

  // Connect accounting (navigate to settings business tab without hard reload)
  const handleConnectAccounting = () => {
    navigate('/settings?tab=business');
  };

  const isLoading =
    isSendingEmail || isSharingWhatsApp || isConnectingStripe || isSyncingAccounting;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {compact ? (
            <button
              disabled={disabled || isLoading}
              className="flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-[13px] font-semibold text-white touch-manipulation transition-all active:scale-[0.96] disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Mail className="h-4 w-4" />
              )}
              <span>Send</span>
            </button>
          ) : (
            <Button
              variant="default"
              disabled={disabled || isLoading}
              className={`h-11 touch-manipulation rounded-xl bg-blue-600 hover:bg-blue-700 text-white ${className}`}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin sm:mr-2" />
              ) : (
                <Mail className="h-4 w-4 sm:mr-2" />
              )}
              <span className="hidden sm:inline">
                {isLoading ? (isSendingEmail ? 'Sending...' : 'Loading...') : 'Send'}
              </span>
            </Button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="center"
          className="w-72 bg-[#111214]/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl rounded-2xl z-50 p-1.5"
          sideOffset={8}
        >
          <DropdownMenuLabel className="text-[11px] font-semibold text-white px-3 pt-2 pb-1 uppercase tracking-[0.08em]">
            Send invoice
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={handleSendEmail}
            disabled={isSendingEmail}
            className="cursor-pointer rounded-xl px-3 py-3 gap-3 focus:bg-white/[0.06] touch-manipulation"
          >
            {isSendingEmail ? (
              <Loader2 className="h-[18px] w-[18px] animate-spin text-white/70 flex-shrink-0" />
            ) : (
              <Mail className="h-[18px] w-[18px] text-white/70 flex-shrink-0" />
            )}
            <div className="flex min-w-0 flex-col">
              <span className="text-[14px] font-semibold text-white leading-tight">
                Email to client
              </span>
              {/* It said "with payment link" whether or not there was one —
                to the 35 senders without card payments it was never true. */}
              <span className="text-[12px] text-white leading-snug">
                {stripeStatus === 'active'
                  ? 'PDF attached, with a Pay now link'
                  : 'PDF attached — no card payment link'}
              </span>
            </div>
          </DropdownMenuItem>
          {/* ELE-1377 — native WhatsApp share (PDF attached via the OS share
            sheet). Only shown where the device can attach a file; the broken
            wa.me link fallback that dumped a raw signed URL was removed. */}
          {canShareFilesToWhatsApp() && (
            <DropdownMenuItem
              onClick={handleShareWhatsApp}
              disabled={isSharingWhatsApp}
              className="cursor-pointer rounded-xl px-3 py-3 gap-3 focus:bg-white/[0.06] touch-manipulation"
            >
              {isSharingWhatsApp ? (
                <Loader2 className="h-[18px] w-[18px] animate-spin text-white/70 flex-shrink-0" />
              ) : (
                <MessageCircle className="h-[18px] w-[18px] text-white/70 flex-shrink-0" />
              )}
              <div className="flex min-w-0 flex-col">
                <span className="text-[14px] font-semibold text-white leading-tight">
                  Share via WhatsApp
                </span>
                <span className="text-[12px] text-white leading-snug">
                  Opens your share sheet with the PDF attached
                </span>
              </div>
            </DropdownMenuItem>
          )}

          {/* Accounting Sync Section */}
          {!accountingLoading && (
            <>
              <DropdownMenuSeparator className="my-2 bg-border/30" />
              <DropdownMenuLabel className="text-[11px] font-semibold text-white px-3 py-1 uppercase tracking-wider">
                Accounting Software
              </DropdownMenuLabel>
              {/* Already synced - show green tick */}
              {invoice.external_invoice_id ? (
                <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 my-1">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-emerald-400">
                      Synced to{' '}
                      {invoice.external_invoice_provider
                        ? ACCOUNTING_PROVIDERS[
                            invoice.external_invoice_provider as keyof typeof ACCOUNTING_PROVIDERS
                          ]?.name || invoice.external_invoice_provider
                        : 'Accounting'}
                    </span>
                    <span className="text-xs text-white">
                      Invoice is in your accounting software
                    </span>
                  </div>
                </div>
              ) : hasAccountingConnected ? (
                <>
                  {accountingIntegrations
                    .filter((i) => i.status === 'connected')
                    .map((integration) => (
                      <DropdownMenuItem
                        key={integration.provider}
                        onClick={handleSyncToAccounting}
                        disabled={isSyncingAccounting}
                        className="cursor-pointer rounded-xl h-16 px-3 my-1 focus:bg-purple-500/10 touch-manipulation"
                      >
                        <div
                          className={`h-10 w-10 rounded-xl ${ACCOUNTING_PROVIDERS[integration.provider].bgColor} flex items-center justify-center mr-3 flex-shrink-0`}
                        >
                          {isSyncingAccounting ? (
                            <Loader2 className="h-5 w-5 text-purple-400 animate-spin" />
                          ) : (
                            <Calculator
                              className={`h-5 w-5 ${ACCOUNTING_PROVIDERS[integration.provider].logoColor}`}
                            />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">
                            Sync to {ACCOUNTING_PROVIDERS[integration.provider].name}
                          </span>
                          <span className="text-xs text-white">
                            {integration.tenantName || 'Send invoice to accounting'}
                          </span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                </>
              ) : (
                <DropdownMenuItem
                  onClick={handleConnectAccounting}
                  className="cursor-pointer rounded-xl h-16 px-3 my-1 focus:bg-purple-500/10 touch-manipulation"
                >
                  <div className="h-10 w-10 rounded-xl bg-purple-500/15 flex items-center justify-center mr-3 flex-shrink-0">
                    <Calculator className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">Connect Accounting</span>
                    <span className="text-xs text-white">Xero, QuickBooks, Sage & more</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-white ml-auto" />
                </DropdownMenuItem>
              )}
            </>
          )}

          {/* Stripe Connect - show connect options, pending status, or connected status */}
          {stripeStatus === 'not_connected' && (
            <>
              <DropdownMenuSeparator className="my-2 bg-border/30" />
              <DropdownMenuLabel className="text-[11px] font-semibold text-white px-3 py-1 uppercase tracking-wider">
                Accept Card Payments
              </DropdownMenuLabel>
              {/* Primary: Connect existing Stripe via OAuth (INSTANT!) */}
              <DropdownMenuItem
                onClick={() => handleConnectStripeOAuth('send_menu')}
                disabled={isConnectingStripe}
                className="cursor-pointer rounded-xl h-16 px-3 my-1 focus:bg-elec-yellow/10 touch-manipulation bg-elec-yellow/[0.10] border border-elec-yellow/30"
              >
                <div className="h-10 w-10 rounded-xl bg-elec-yellow/[0.18] flex items-center justify-center mr-3 flex-shrink-0">
                  {isConnectingStripe ? (
                    <Loader2 className="h-5 w-5 text-elec-yellow animate-spin" />
                  ) : (
                    <Zap className="h-5 w-5 text-elec-yellow" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-white">Connect Stripe</span>
                  <span className="text-[11px] text-white font-medium">Instant — just log in</span>
                </div>
              </DropdownMenuItem>
              {/* Secondary: Small link for users without Stripe */}
              <div className="px-3">
                <button
                  onClick={() => handleConnectStripeExpress('send_menu')}
                  disabled={isConnectingStripe}
                  className="flex min-h-[44px] w-full items-center text-left text-[11px] text-white underline underline-offset-2 touch-manipulation"
                >
                  Don&rsquo;t have Stripe? Create free account
                </button>
              </div>
            </>
          )}
          {stripeStatus === 'pending' && (
            <>
              <DropdownMenuSeparator className="my-2 bg-border/30" />
              <DropdownMenuItem
                onClick={() => handleConnectStripeExpress('send_menu')}
                disabled={isConnectingStripe}
                className="cursor-pointer rounded-xl h-16 px-3 my-1 focus:bg-amber-500/10 touch-manipulation bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20"
              >
                <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                  {isConnectingStripe ? (
                    <Loader2 className="h-5 w-5 text-amber-400 animate-spin" />
                  ) : (
                    <CreditCard className="h-5 w-5 text-amber-400" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm flex items-center gap-1">
                    {isConnectingStripe ? 'Loading...' : 'Finish Stripe Setup'}
                  </span>
                  <span className="text-xs text-white">
                    Complete verification to accept payments
                  </span>
                </div>
              </DropdownMenuItem>
            </>
          )}
          {stripeStatus === 'active' && (
            <>
              <DropdownMenuSeparator className="my-2 bg-border/30" />
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-xs text-green-400 font-medium">Card payments enabled</span>
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {cardPrompt && (
        <CardPaymentsPromptSheet
          open
          onOpenChange={(open) => {
            if (!open) setCardPrompt(null);
          }}
          mode={cardPrompt.mode}
          status={cardPrompt.status}
          clientName={invoice.client?.name}
          invoiceNumber={invoice.invoice_number}
          amount={invoice.total}
          busy={isConnectingStripe || isSendingEmail}
          // Close as Stripe opens: on a phone it opens in the browser, and the
          // "can't pay by card" sheet should not be waiting on the way back.
          onSetUp={() => {
            setCardPrompt(null);
            handleConnectStripeExpress('send_prompt');
          }}
          onConnectExisting={() => {
            setCardPrompt(null);
            handleConnectStripeOAuth('send_prompt');
          }}
          onResend={async () => {
            await handleSendEmail();
            setCardPrompt(null);
          }}
          onNotNow={() => {
            // Only the after-send prompt snoozes; declining the resend is a
            // one-off answer about one invoice.
            if (cardPrompt.mode === 'prompt') {
              snoozeCardPrompt();
              trackCardPromptDismissed();
            }
            setCardPrompt(null);
          }}
        />
      )}
    </>
  );
};
