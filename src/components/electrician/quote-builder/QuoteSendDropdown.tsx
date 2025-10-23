import { useState } from 'react';
import { Quote } from '@/types/quote';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Mail, MessageCircle, Loader2, MailOpen } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface QuoteSendDropdownProps {
  quote: Quote;
  onSuccess?: () => void;
  disabled?: boolean;
  className?: string;
}

export const QuoteSendDropdown = ({
  quote,
  onSuccess,
  disabled = false,
  className = '',
}: QuoteSendDropdownProps) => {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isSharingWhatsApp, setIsSharingWhatsApp] = useState(false);
  const [isGeneratingMailtoLink, setIsGeneratingMailtoLink] = useState(false);

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

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

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
      
      const { error } = await supabase
        .from('quote_views')
        .insert({
          quote_id: quote.id,
          public_token: newToken,
          is_active: true,
          view_count: 0
        });

      if (error) {
        console.error('Error creating public token:', error);
        return null;
      }

      return newToken;
    } catch (error) {
      console.error('Error in getOrCreatePublicToken:', error);
      return null;
    }
  };

  const handleSendEmail = async () => {
    try {
      setIsSendingEmail(true);

      // Try to get current session
      let { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      // If session is missing or expired, try to refresh
      if (sessionError || !session) {
        console.log('Session missing or expired, attempting refresh...');
        const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
        
        if (refreshError || !refreshData.session) {
          throw new Error('Please log in again to send quotes. Your session has expired.');
        }
        
        session = refreshData.session;
        console.log('Session refreshed successfully');
      }
      
      const { error } = await supabase.functions.invoke('send-quote-email', {
        body: { quoteId: quote.id },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) throw error;

      toast({
        title: 'Quote sent',
        description: `Quote ${quote.quoteNumber} sent to ${quote.client?.email}`,
        variant: 'success',
        duration: 4000,
      });

      // Update status to sent
      await supabase
        .from('quotes')
        .update({ status: 'sent' })
        .eq('id', quote.id);

      onSuccess?.();
    } catch (error: any) {
      console.error('Error sending quote:', error);
      
      // Provide specific error messages
      let errorMessage = 'Failed to send quote. Please try again.';
      
      if (error.message?.includes('session')) {
        errorMessage = 'Your session has expired. Please refresh the page and try again.';
      } else if (error.message?.includes('email')) {
        errorMessage = 'Client email address is missing or invalid.';
      }
      
      toast({
        title: 'Error sending quote',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleSendViaEmailClient = async () => {
    try {
      setIsGeneratingMailtoLink(true);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('User not authenticated');
      }

      // Generate temporary PDF link
      const { data: pdfData, error: pdfError } = await supabase.functions.invoke(
        'generate-temporary-pdf-link',
        {
          body: {
            documentId: quote.id,
            documentType: 'quote'
          },
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        }
      );

      if (pdfError || !pdfData?.success) {
        console.error('PDF generation error:', pdfError);
        throw new Error('Failed to generate PDF');
      }

      const pdfUrl = pdfData.publicUrl;

      // Get client and company data
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data: companyData } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      const clientData = quote.client;
      const jobDetails = quote.jobDetails;

      const clientEmail = clientData?.email || '';
      const clientName = clientData?.name || 'Valued Client';
      const companyName = companyData?.company_name || 'Your Company';
      const companyPhone = companyData?.company_phone || '';
      const companyEmail = companyData?.company_email || '';
      const jobTitle = jobDetails?.title || 'Electrical Work';
      const totalAmount = quote.total || 0;
      const validityDate = quote.expiryDate 
        ? format(new Date(quote.expiryDate), 'dd MMMM yyyy')
        : format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'dd MMMM yyyy');

      // Format currency
      const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

      // Create email subject
      const subject = `Quote ${quote.quoteNumber} from ${companyName}`;

      // Get or create public token for acceptance link
      const publicToken = await getOrCreatePublicToken();
      const acceptanceLink = publicToken 
        ? `${window.location.origin}/public-quote/${publicToken}`
        : null;

      // Create email body with PDF link and acceptance link
      const body = `Dear ${clientName},

Thank you for your enquiry. Please find your quotation for ${jobTitle}.

📋 Quote Details:
• Quote Number: ${quote.quoteNumber}
• Total Amount: ${formatCurrency(totalAmount)}
• Valid Until: ${validityDate}

${acceptanceLink ? `✍️ Review & Accept Quote Online:\n${acceptanceLink}\n\n` : ''}📥 Download Quote (PDF):
${pdfUrl}

This quote is valid for 30 days from the date of issue. If you have any questions or would like to proceed, please don't hesitate to contact us.

Best regards,
${companyName}${companyPhone ? `\n📞 ${companyPhone}` : ''}${companyEmail ? `\n✉️ ${companyEmail}` : ''}

---
⚡ Powered by ElecMate Professional Suite`;

      // Open mailto link
      const mailtoLink = `mailto:${clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;

      toast({
        title: 'Email draft opened',
        description: 'Your email app should open with a pre-filled quote email',
        variant: 'success',
        duration: 4000,
      });

      // Update quote status to sent
      await supabase
        .from('quotes')
        .update({ status: 'sent' })
        .eq('id', quote.id);

      onSuccess?.();
    } catch (error: any) {
      console.error('Error generating mailto link:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to open email draft',
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingMailtoLink(false);
    }
  };

  const handleShareWhatsApp = async () => {
    try {
      setIsSharingWhatsApp(true);
      
      console.log('🔄 Starting WhatsApp share process...');

      // ALWAYS regenerate PDF for guaranteed freshness - fetch latest data first
      const { data: { user } } = await supabase.auth.getUser();
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
        console.error('❌ Failed to fetch quote:', fetchError);
        throw new Error('Failed to fetch latest quote data');
      }
      
      console.log('✅ Quote data fetched:', freshQuote.quote_number);

      const { data: companyData, error: companyError } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (companyError) {
        console.error('Company profile error:', companyError);
      }

      // Step 2: Generate fresh PDF with latest data (silently)
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('User not authenticated');
      }

      console.log('🔄 Generating PDF...');
      
      const { data: pdfData, error: pdfError } = await supabase.functions.invoke('generate-pdf-monkey', {
        body: {
          quote: freshQuote, // Use fresh data from database
          companyProfile: companyData,
          invoice_mode: false,
          force_regenerate: true
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      let pdfUrl = pdfData?.downloadUrl;
      const documentId = pdfData?.documentId;

      if (!pdfUrl && documentId) {
        console.log('⏳ PDF not ready, polling for download URL...');
        pdfUrl = await pollPdfDownloadUrl(documentId, session.access_token) || undefined;
      }

      if (pdfError || !pdfUrl) {
        console.error('❌ PDF generation failed:', pdfError);
        throw new Error('Failed to generate professional PDF');
      }
      
      console.log('✅ PDF URL received:', pdfUrl.substring(0, 50) + '...');

      // Step 3: Store PDF metadata in database (NO URL - it expires)
      if (documentId) {
        const newVersion = (freshQuote.pdf_version || 0) + 1;
        await supabase
          .from('quotes')
          .update({
            pdf_document_id: documentId,
            pdf_generated_at: new Date().toISOString(),
            pdf_version: newVersion
          })
          .eq('id', quote.id);
      }


      // Step 4: Use PDF URL directly (don't modify signed URLs - it breaks AWS signature)
      const pdfDownloadUrl = pdfUrl;

      // Step 5: Create professional WhatsApp message with PDF URL
      const clientData = typeof freshQuote.client_data === 'string' 
        ? JSON.parse(freshQuote.client_data) 
        : freshQuote.client_data;
      const clientName = clientData?.name || 'Valued Client';
      const companyName = companyData?.company_name || 'Your Company';
      const totalAmount = freshQuote.total || 0;
      const validityDate = freshQuote.expiry_date 
        ? format(new Date(freshQuote.expiry_date), 'dd MMMM yyyy')
        : format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'dd MMMM yyyy');
      
      const jobDetails = typeof freshQuote.job_details === 'string' 
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
      
      console.log('📱 Opening WhatsApp with URL (first 100 chars):', whatsappUrl.substring(0, 100) + '...');

      // Step 7: Open WhatsApp (NOT the PDF directly)
      try {
        const whatsappWindow = window.open(whatsappUrl, '_blank');
        
        if (!whatsappWindow || whatsappWindow.closed || typeof whatsappWindow.closed === 'undefined') {
          // Popup was blocked
          console.warn('⚠️ Popup blocked, trying location.href...');
          window.location.href = whatsappUrl;
        } else {
          console.log('✅ WhatsApp opened successfully');
        }
      } catch (openError) {
        console.error('❌ Error opening WhatsApp:', openError);
        // Fallback to location.href
        window.location.href = whatsappUrl;
      }

      toast({
        title: 'Opening WhatsApp',
        description: 'WhatsApp will open with your quote message',
        variant: 'success',
        duration: 3000,
      });

      onSuccess?.();
    } catch (error: any) {
      console.error('❌ Error in WhatsApp share:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to prepare quote for WhatsApp',
        variant: 'destructive',
      });
    } finally {
      setIsSharingWhatsApp(false);
    }
  };

  const isLoading = isSendingEmail || isSharingWhatsApp || isGeneratingMailtoLink;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled || isLoading}
          className="flex-1 text-xs border border-elec-yellow/20 hover:bg-elec-yellow/10"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
              {isSendingEmail ? 'Sending...' : isGeneratingMailtoLink ? 'Preparing...' : 'Loading...'}
            </>
          ) : (
            <>
              <Mail className="mr-1 h-3 w-3" />
              Send
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-64 bg-background border-border shadow-lg z-50" sideOffset={8}>
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Send Options
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={handleSendEmail}
          disabled={isSendingEmail}
          className="cursor-pointer"
        >
          {isSendingEmail ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Mail className="mr-2 h-4 w-4" />
          )}
          <div className="flex flex-col">
            <span>Send via Email</span>
            <span className="text-xs text-muted-foreground">Automatic delivery via Gmail</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleSendViaEmailClient}
          disabled={isGeneratingMailtoLink}
          className="cursor-pointer"
        >
          {isGeneratingMailtoLink ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <MailOpen className="mr-2 h-4 w-4" />
          )}
          <div className="flex flex-col">
            <span>Send via My Email App</span>
            <span className="text-xs text-muted-foreground">Opens your email client</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleShareWhatsApp}
          disabled={isSharingWhatsApp}
          className="cursor-pointer"
        >
          {isSharingWhatsApp ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <MessageCircle className="mr-2 h-4 w-4" />
          )}
          <span>Share via WhatsApp</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
