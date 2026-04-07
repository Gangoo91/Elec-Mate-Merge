import { useState } from 'react';
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
   * Generate or regenerate a PDF for a quote
   * Returns the download URL or null on failure
   */
  const generateFreshPDF = async (
    quoteData: Quote,
    companyProfileData: any
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
        downloadUrl = await pollPdfDownloadUrl(documentId, session.access_token);
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

      // Step 2: Check if PDF is current
      const pdfIsCurrent =
        freshQuote?.pdf_url &&
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
        const result = await generateFreshPDF(freshQuote as any, companyData);

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

      const message = `📋 *Quote ${freshQuote.quote_number}*

Dear ${clientName},

Please find your quote for ${jobTitle}

💰 Total Amount: ${formatCurrency(totalAmount)}
Valid until: ${validityDate}

${acceptanceLink ? `✍️ Review & Accept Online:\n${acceptanceLink}\n\n` : ''}📥 Download Quote (PDF):
${pdfDownloadUrl}

If you have any questions, please don't hesitate to contact us.

Best regards,
${companyName}`;

      // Step 6: Build WhatsApp URL
      const clientPhone = clientData?.phone;

      let whatsappUrl: string;
      if (clientPhone && (clientPhone.startsWith('+44') || clientPhone.startsWith('44'))) {
        // UK number - direct to client
        const cleanPhone = clientPhone.replace(/\s/g, '').replace(/^44/, '+44');
        whatsappUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(message)}`;
      } else {
        // No number or international - share URL only
        whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      }

      // Step 7: Open WhatsApp (NOT the PDF directly)
      await openExternalUrl(whatsappUrl);

      toast({
        title: 'Opening WhatsApp',
        description: 'WhatsApp will open with your quote message',
        variant: 'success',
        duration: 3000,
      });

      onSuccess?.();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to prepare quote for WhatsApp',
        variant: 'destructive',
      });
    } finally {
      setIsSharingWhatsApp(false);
    }
  };

  const isLoading = isSendingEmail || isSharingWhatsApp;

  const isResendVariant = variant === 'resend';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isResendVariant ? 'default' : 'outline'}
          size="sm"
          disabled={disabled || isLoading}
          className={cn(
            'flex-1 text-xs touch-manipulation',
            isResendVariant
              ? 'h-10 bg-amber-500 hover:bg-amber-600 text-black font-semibold gap-1.5'
              : 'border border-elec-yellow/20 hover:bg-elec-yellow/10'
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              {isSendingEmail ? 'Sending...' : 'Loading...'}
            </>
          ) : isResendVariant ? (
            <>
              <RefreshCw className="h-3.5 w-3.5" />
              Resend Quote
            </>
          ) : (
            <>
              <Mail className="h-3 w-3" />
              Send
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-64 bg-card/95 backdrop-blur-lg border border-border/50 shadow-2xl rounded-2xl z-50 p-2"
        sideOffset={8}
      >
        <DropdownMenuLabel className="text-[10px] font-semibold text-white px-3 py-2 uppercase tracking-wider">
          {isResendVariant ? 'Resend Quote' : 'Send Quote'}
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={handleSendEmail}
          disabled={isSendingEmail}
          className="cursor-pointer rounded-xl h-16 px-3 my-1 focus:bg-blue-500/10 touch-manipulation"
        >
          <div className="h-10 w-10 rounded-xl bg-blue-500/15 flex items-center justify-center mr-3 flex-shrink-0">
            {isSendingEmail ? (
              <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
            ) : (
              <Mail className="h-5 w-5 text-blue-500" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Send via Email</span>
            <span className="text-xs text-white">Sends with PDF attachment</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleShareWhatsApp}
          disabled={isSharingWhatsApp}
          className="cursor-pointer rounded-xl h-16 px-3 my-1 focus:bg-green-500/10 touch-manipulation"
        >
          <div className="h-10 w-10 rounded-xl bg-green-500/15 flex items-center justify-center mr-3 flex-shrink-0">
            {isSharingWhatsApp ? (
              <Loader2 className="h-5 w-5 animate-spin text-green-500" />
            ) : (
              <MessageCircle className="h-5 w-5 text-green-500" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Share via WhatsApp</span>
            <span className="text-xs text-white">Send with PDF link</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
