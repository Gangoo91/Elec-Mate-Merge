import { useState, useEffect, useRef } from 'react';
import { Quote } from '@/types/quote';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Mail, MessageCircle, Loader2, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { openExternalUrl } from '@/utils/open-external-url';
import { Capacitor } from '@capacitor/core';
import { sharePdfBytesFromUrlToWhatsAppWeb } from '@/utils/share-pdf-to-whatsapp-web';
import { sharePdfFileNative, canShareFilesToWhatsApp } from '@/utils/share-pdf-file-native';
import { isPermanentPdfUrl } from '@/utils/pdfUrl';

interface QuoteSendDropdownProps {
  quote: Quote;
  onSuccess?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'resend';
}

export const QuoteSendDropdown = ({
  quote,
  onSuccess,
  disabled = false,
  className = '',
  variant = 'default',
}: QuoteSendDropdownProps) => {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isSharingWhatsApp, setIsSharingWhatsApp] = useState(false);

  // AbortController for the PDF polling loop. On iOS, when the user swipes to WhatsApp
  // the WKWebView pauses — setTimeout chains freeze mid-poll. If we don't cancel
  // explicitly, state stays in limbo when the user returns. (ELE-772)
  const pollAbortRef = useRef<AbortController | null>(null);

  // Capacitor App 'resume' listener — belt-and-braces reset of loading state when the
  // user returns from any external app (WhatsApp, Mail). Without this, an iOS WKWebView
  // pause can leave `isSharingWhatsApp` stuck true forever = "Loading…" that never clears.
  useEffect(() => {
    let cleanup: (() => void) | null = null;
    let mounted = true;

    (async () => {
      try {
        const { Capacitor } = await import('@capacitor/core');
        if (!Capacitor.isNativePlatform() || !mounted) return;
        const { App } = await import('@capacitor/app');
        if (!mounted) return;
        const listener = await App.addListener('resume', () => {
          // User came back from WhatsApp/Mail — clear any loading state that may have
          // been orphaned while the WebView was paused.
          setIsSharingWhatsApp(false);
          setIsSendingEmail(false);
          pollAbortRef.current?.abort();
        });
        if (!mounted) {
          listener.remove();
          return;
        }
        cleanup = () => listener.remove();
      } catch {
        // Not running on native — no-op
      }
    })();

    return () => {
      mounted = false;
      cleanup?.();
      pollAbortRef.current?.abort();
    };
  }, []);

  // Poll PDF Monkey status via edge function until downloadUrl is ready (max 30s, every 1.5s).
  // Honours an AbortSignal so we can cancel cleanly if the user navigates away.
  const pollPdfDownloadUrl = async (
    documentId: string,
    accessToken: string,
    signal?: AbortSignal
  ): Promise<string | null> => {
    const maxAttempts = 20; // 20 × 1500ms = 30s
    for (let i = 0; i < maxAttempts; i++) {
      if (signal?.aborted) return null;
      const { data } = await supabase.functions.invoke('generate-pdf-monkey', {
        body: { documentId, mode: 'status' },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (data?.downloadUrl) return data.downloadUrl;
      await new Promise<void>((resolve) => {
        const t = setTimeout(resolve, 1500);
        signal?.addEventListener('abort', () => {
          clearTimeout(t);
          resolve();
        }, { once: true });
      });
    }
    return null;
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

  /**
   * Generate or regenerate a PDF for a quote
   * Returns the download URL or null on failure
   */
  const generateFreshPDF = async (
    quoteData: Quote,
    companyProfileData: any,
    signal?: AbortSignal
  ): Promise<{ downloadUrl: string | null; documentId: string | null }> => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        return { downloadUrl: null, documentId: null };
      }

      // Call PDF Monkey edge function to generate PDF
      const { data: pdfData, error: pdfError } = await supabase.functions.invoke(
        'generate-pdf-monkey',
        {
          body: {
            quote: quoteData,
            companyProfile: companyProfileData,
            force_regenerate: true,
          },
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      if (pdfError) {
        return { downloadUrl: null, documentId: null };
      }

      let downloadUrl = pdfData?.downloadUrl;
      const documentId = pdfData?.documentId;

      // If no download URL yet, poll for status (PDF is being generated asynchronously)
      if (!downloadUrl && documentId) {
        downloadUrl = await pollPdfDownloadUrl(documentId, session.access_token, signal);
      }

      if (!downloadUrl) {
        return { downloadUrl: null, documentId };
      }

      return { downloadUrl, documentId };
    } catch {
      return { downloadUrl: null, documentId: null };
    }
  };

  // Generate or retrieve public token for quote acceptance
  const getOrCreatePublicToken = async (): Promise<string | null> => {
    try {
      // Check if public token already exists
      const { data: existingView } = await supabase
        .from('quote_views')
        .select('public_token')
        .eq('quote_id', quote.id)
        .eq('is_active', true)
        .maybeSingle();

      if (existingView?.public_token) {
        return existingView.public_token;
      }

      // Generate new token (full UUID format for consistency)
      const newToken = crypto.randomUUID();

      // Validate UUID format
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(newToken)) {
        throw new Error('Invalid token format generated');
      }

      const { error } = await supabase.from('quote_views').insert({
        quote_id: quote.id,
        public_token: newToken,
        is_active: true,
        view_count: 0,
      });

      if (error) {
        return null;
      }

      return newToken;
    } catch {
      return null;
    }
  };

  const handleSendEmail = async () => {
    try {
      setIsSendingEmail(true);

      // Validate client email
      const cleanTo = quote.client?.email?.trim();
      if (!cleanTo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanTo)) {
        toast({
          title: 'Invalid Client Email',
          description:
            'Client email address is invalid. Please correct it in the quote and try again.',
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
          throw new Error('Please log in again to send quotes.');
        }
        session = refreshData.session;
      }

      // Send via Resend (generates PDF automatically)
      const { data, error } = await supabase.functions.invoke('send-quote-resend', {
        body: { quoteId: quote.id },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      // Handle errors - extract message from various possible locations
      if (error) {
        let errorMessage = 'Failed to send quote';

        if (typeof error === 'string') {
          errorMessage = error;
        } else if (error.message) {
          errorMessage = error.message;
        } else if (error.context?.body) {
          try {
            const bodyError = JSON.parse(error.context.body);
            errorMessage = bodyError.error || bodyError.message || errorMessage;
          } catch {
            errorMessage = error.context.body;
          }
        }

        throw new Error(errorMessage);
      }

      // Check if the response data indicates an error
      if (data?.error) {
        throw new Error(data.error + (data.hint ? ` (${data.hint})` : ''));
      }

      if (!data?.success) {
        throw new Error(data?.message || 'Unknown error sending quote');
      }

      toast({
        title: 'Quote sent',
        description: `Quote ${quote.quoteNumber} sent to ${cleanTo}`,
        variant: 'success',
        duration: 4000,
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Update status to sent
      await supabase.from('quotes').update({ status: 'sent' }).eq('id', quote.id);

      onSuccess?.();
    } catch (error: any) {
      toast({
        title: 'Error sending quote',
        description: error.message || 'Failed to send quote. Please try again.',
        variant: 'destructive',
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleShareWhatsApp = async () => {
    // Fresh abort controller for this share attempt — replaces any previous one still in flight.
    pollAbortRef.current?.abort();
    const controller = new AbortController();
    pollAbortRef.current = controller;

    try {
      setIsSharingWhatsApp(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Step 1: Fetch FRESH quote data from database
      const { data: freshQuote, error: fetchError } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', quote.id)
        .eq('user_id', user.id)
        .single();

      if (fetchError || !freshQuote) {
        throw new Error('Failed to fetch latest quote data');
      }

      const { data: companyData, error: companyError } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Company profile may not exist — non-blocking

      // Step 2: Check if PDF is current — content-current AND a permanent
      // storage URL; PDFMonkey signed links expire after an hour (ELE-1330).
      const pdfIsCurrent =
        freshQuote?.pdf_url &&
        isPermanentPdfUrl(freshQuote.pdf_url) &&
        freshQuote?.pdf_generated_at &&
        new Date(freshQuote.pdf_generated_at) >= new Date(freshQuote.updated_at);

      let pdfUrl = freshQuote.pdf_url;
      let documentId = freshQuote.pdf_document_id;

      // Try to refresh URL if not current
      if (!pdfIsCurrent && freshQuote.pdf_document_id) {
        const { data: statusData } = await supabase.functions.invoke('generate-pdf-monkey', {
          body: { mode: 'status', documentId: freshQuote.pdf_document_id },
        });

        if (statusData?.downloadUrl) {
          pdfUrl = statusData.downloadUrl;
          documentId = freshQuote.pdf_document_id;

          await supabase
            .from('quotes')
            .update({
              pdf_url: pdfUrl,
              pdf_generated_at: new Date().toISOString(),
            })
            .eq('id', quote.id);

        }
      }

      // If still no URL, regenerate PDF
      if (!pdfUrl) {
        const result = await generateFreshPDF(freshQuote as any, companyData, controller.signal);

        if (!result.downloadUrl) {
          throw new Error('Failed to generate professional PDF');
        }

        pdfUrl = result.downloadUrl;
        documentId = result.documentId;

        await supabase
          .from('quotes')
          .update({
            pdf_document_id: documentId,
            pdf_url: pdfUrl,
            pdf_generated_at: new Date().toISOString(),
            pdf_version: (freshQuote.pdf_version || 0) + 1,
          })
          .eq('id', quote.id);
      }

      const pdfDownloadUrl = pdfUrl;

      // Step 5: Create professional WhatsApp message with PDF URL
      const clientData =
        typeof freshQuote.client_data === 'string'
          ? JSON.parse(freshQuote.client_data)
          : freshQuote.client_data;
      const clientName = clientData?.name || 'Valued Client';
      const companyName = companyData?.company_name || 'Your Company';
      const totalAmount = freshQuote.total || 0;
      const validityDate = freshQuote.expiry_date
        ? format(new Date(freshQuote.expiry_date), 'dd MMMM yyyy')
        : format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'dd MMMM yyyy');

      const jobDetails =
        typeof freshQuote.job_details === 'string'
          ? JSON.parse(freshQuote.job_details)
          : freshQuote.job_details;
      const jobTitle = jobDetails?.title || 'Electrical Work';

      // Get or create public token for acceptance link
      const publicToken = await getOrCreatePublicToken();
      const acceptanceLink = publicToken
        ? `${window.location.origin}/public-quote/${publicToken}`
        : null;

      const clientPhone = clientData?.phone;

      if (Capacitor.isNativePlatform()) {
        // ELE-1276: attach the actual PDF via the native share sheet — the
        // signed S3 URL expires after an hour and looks unprofessional as
        // raw text. The acceptance link is a PERMANENT public URL, so that
        // stays in the message; only the expiring PDF link is replaced by
        // the real file.
        const nativeMessage = `*Quote ${freshQuote.quote_number} — ${companyName}*

Dear ${clientName},

Thank you for the opportunity to quote for ${jobTitle}. The full quote is attached.

Total: ${formatCurrency(totalAmount)}
Valid until: ${validityDate}
${acceptanceLink ? `\nYou can review and accept online here:\n${acceptanceLink}\n` : ''}
If you have any questions, just reply here.

Many thanks,
${companyName}`;

        // ELE-772 — Clear loading state BEFORE launching the share sheet.
        setIsSharingWhatsApp(false);

        const shared = await sharePdfFileNative({
          pdfUrl: pdfDownloadUrl,
          filename: `Quote-${freshQuote.quote_number || freshQuote.id}.pdf`,
          title: `Quote ${freshQuote.quote_number}`,
          text: nativeMessage,
        });

        if (!shared) {
          // Fallback: legacy wa.me text with the download link — better than
          // nothing if the PDF download or share sheet failed.
          const fallbackMessage = `${nativeMessage}

Download your quote here:
${pdfDownloadUrl}`;
          let whatsappUrl: string;
          if (clientPhone && (clientPhone.startsWith('+44') || clientPhone.startsWith('44'))) {
            const cleanPhone = clientPhone.replace(/\s/g, '').replace(/^44/, '+44');
            whatsappUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(fallbackMessage)}`;
          } else {
            whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fallbackMessage)}`;
          }
          await openExternalUrl(whatsappUrl);
        }

        toast({
          title: shared ? 'Share sheet opened' : 'Opening WhatsApp',
          description: shared
            ? 'Your quote PDF is attached — pick WhatsApp to send it'
            : 'WhatsApp will open with your quote message',
          variant: 'success',
          duration: 3000,
        });

        onSuccess?.();
        return;
      }

      // Web: attach the actual PDF, never a link in the body
      const webMessage = `*Quote ${freshQuote.quote_number} — ${companyName}*

Dear ${clientName},

Thank you for the opportunity to quote for ${jobTitle}. The full quote is attached.

Total: ${formatCurrency(totalAmount)}
Valid until: ${validityDate}

${acceptanceLink ? `You can review and accept online here:\n${acceptanceLink}\n\n` : ''}If you have any questions, just reply here.

Many thanks,
${companyName}`;

      const result = await sharePdfBytesFromUrlToWhatsAppWeb({
        pdfUrl: pdfDownloadUrl,
        filename: `Quote-${freshQuote.quote_number || freshQuote.id}.pdf`,
        message: webMessage,
        recipientPhone: clientPhone,
        title: `Quote ${freshQuote.quote_number}`,
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

      onSuccess?.();
    } catch (error: any) {
      if (error?.name === 'AbortError') {
        return;
      }
      toast({
        title: 'Error',
        description: error.message || 'Failed to prepare quote for WhatsApp',
        variant: 'destructive',
      });
    } finally {
      // The success path never cleared this flag — after a successful share
      // the button sat on "Loading..." forever (reported 5 Jul).
      setIsSharingWhatsApp(false);
    }
  };

  const isLoading = isSendingEmail || isSharingWhatsApp;

  const isResendVariant = variant === 'resend';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          disabled={disabled || isLoading}
          className={cn(
            'w-full h-12 rounded-xl text-[13px] font-medium touch-manipulation active:scale-[0.97] transition-all disabled:opacity-50',
            isResendVariant
              ? 'bg-amber-500/15 border border-amber-500/20 text-amber-400'
              : 'bg-white/[0.06] border border-white/[0.1] text-white active:bg-white/[0.1]'
          )}
        >
          {isLoading
            ? (isSendingEmail ? 'Sending...' : 'Loading...')
            : isResendVariant
              ? 'Resend'
              : 'Send'}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-72 bg-[#111214]/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl rounded-2xl z-50 p-1.5"
        sideOffset={8}
      >
        <DropdownMenuLabel className="text-[11px] font-semibold text-white/45 px-3 pt-2 pb-1 uppercase tracking-[0.08em]">
          {isResendVariant ? 'Resend quote' : 'Send quote'}
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
            <span className="text-[14px] font-semibold text-white leading-tight">Email to client</span>
            <span className="text-[12px] text-white/50 leading-snug">
              PDF attached, sent from your company
            </span>
          </div>
        </DropdownMenuItem>
        {/* ELE-1276: only offer WhatsApp where the PDF can genuinely attach
            (native app / mobile web). Desktop WhatsApp can't accept files via
            URL scheme — hiding it beats sending clients a bare link. */}
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
                Share on WhatsApp
              </span>
              <span className="text-[12px] text-white/50 leading-snug">
                Opens WhatsApp with the PDF attached
              </span>
            </div>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
