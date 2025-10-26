import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Quote } from '@/types/quote';
import { Button } from '@/components/ui/button';
import { generateClientQuotePDF } from '@/utils/client-quote-pdf';
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
  const navigate = useNavigate();
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

  /**
   * Generate or regenerate a PDF for a quote
   * Returns the download URL or null on failure
   */
  const generateFreshPDF = async (
    quoteData: Quote,
    companyProfileData: any
  ): Promise<{ downloadUrl: string | null; documentId: string | null }> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.error('[PDF] No active session');
        return { downloadUrl: null, documentId: null };
      }

      console.log('[PDF] Generating fresh PDF for quote:', quoteData.id);

      // Call PDF Monkey edge function to generate PDF
      const { data: pdfData, error: pdfError } = await supabase.functions.invoke('generate-pdf-monkey', {
        body: {
          quote: quoteData,
          companyProfile: companyProfileData,
          force_regenerate: true
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (pdfError) {
        console.error('[PDF] Generation error:', pdfError);
        return { downloadUrl: null, documentId: null };
      }

      let downloadUrl = pdfData?.downloadUrl;
      const documentId = pdfData?.documentId;

      // If no download URL yet, poll for status (PDF is being generated asynchronously)
      if (!downloadUrl && documentId) {
        console.log('[PDF] Polling for PDF completion...');
        downloadUrl = await pollPdfDownloadUrl(documentId, session.access_token);
      }

      if (!downloadUrl) {
        console.error('[PDF] Failed to get download URL after polling');
        return { downloadUrl: null, documentId };
      }

      console.log('[PDF] Successfully generated PDF:', { documentId, hasUrl: !!downloadUrl });
      return { downloadUrl, documentId };
    } catch (error) {
      console.error('[PDF] Exception during generation:', error);
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

      // Validate client email FIRST
      const cleanTo = quote.client?.email?.trim();
      if (!cleanTo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanTo)) {
        toast({
          title: "Invalid Client Email",
          description: "Client email address is invalid. Please correct it in the quote and try again.",
          variant: "destructive",
        });
        setIsSendingEmail(false);
        return;
      }

      // Get current session
      let { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
        if (refreshError || !refreshData.session) {
          throw new Error('Please log in again to send quotes.');
        }
        session = refreshData.session;
      }

      // Check if user has connected email
      const { data: configData, error: configError } = await supabase.functions.invoke('get-email-config', {
        headers: { Authorization: `Bearer ${session.access_token}` }
      });

      const hasEmailConfig = configData?.configs?.length > 0 && 
                            configData.configs.some((c: any) => c.is_active);

      if (!hasEmailConfig) {
        toast({
          title: "Email Not Connected",
          description: "Connect your Gmail or Outlook in Settings → Email Integration to send quotes",
          variant: "destructive",
        });
        
        // Navigate after a brief delay
        setTimeout(() => {
          navigate('/electrician/settings?tab=email');
        }, 2000);
        
        return;
      }

      // Get latest quote data
      const { data: freshQuote, error: fetchError } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', quote.id)
        .single();

      if (fetchError) throw fetchError;

      // Ensure client_data in DB is current
      await supabase
        .from('quotes')
        .update({ client_data: quote.client as any })
        .eq('id', quote.id);

      // Step 1: Check if we have a valid, current PDF
      const pdfIsCurrent = freshQuote?.pdf_url && 
                           freshQuote?.pdf_generated_at && 
                           new Date(freshQuote.pdf_generated_at) >= new Date(freshQuote.updated_at);

      let pdfUrl = freshQuote.pdf_url;
      let documentId = freshQuote.pdf_document_id;

      // Step 2: If PDF is not current or missing, try to refresh URL first
      if (!pdfIsCurrent && freshQuote.pdf_document_id) {
        console.log('[EMAIL] PDF not current, attempting to refresh URL from existing document...');
        
        const { data: statusData } = await supabase.functions.invoke('generate-pdf-monkey', {
          body: { mode: 'status', documentId: freshQuote.pdf_document_id }
        });

        if (statusData?.downloadUrl) {
          pdfUrl = statusData.downloadUrl;
          documentId = freshQuote.pdf_document_id;
          
          // Update quote with refreshed URL
          await supabase
            .from('quotes')
            .update({
              pdf_url: pdfUrl,
              pdf_generated_at: new Date().toISOString()
            })
            .eq('id', quote.id);
          
          console.log('[EMAIL] ✅ Successfully refreshed PDF URL from existing document');
        }
      }

      // Step 3: If still no valid URL, regenerate the PDF entirely
      if (!pdfUrl) {
        console.log('[EMAIL] No valid PDF URL available, generating fresh PDF...');
        
        toast({
          title: "Generating PDF",
          description: "Creating a fresh PDF for your email. This will take a moment...",
        });

        // Fetch company profile if not already loaded
        const { data: { user } } = await supabase.auth.getUser();
        let companyProfileData = null;
        
        if (user) {
          const { data: profile } = await supabase
            .from('company_profiles')
            .select('*')
            .eq('user_id', user.id)
            .maybeSingle();
          
          companyProfileData = profile || {
            company_name: "Your Electrical Company",
            company_email: "contact@yourcompany.com",
            company_phone: "0123 456 7890",
            company_address: "123 Business Street, London",
            primary_color: "#1e40af",
            secondary_color: "#3b82f6",
            currency: "GBP",
            locale: "en-GB",
            vat_number: "",
            payment_terms: "30 days"
          };
        }

        // Generate fresh PDF (pass as 'any' since DB types differ from Quote type)
        const result = await generateFreshPDF(freshQuote as any, companyProfileData);
        
        if (!result.downloadUrl) {
          toast({
            title: "PDF Generation Failed",
            description: "Unable to generate PDF. Please try clicking the PDF button first, then send the email.",
            variant: "destructive"
          });
          setIsSendingEmail(false);
          return;
        }

        pdfUrl = result.downloadUrl;
        documentId = result.documentId;

        // Update quote with new PDF info
        await supabase
          .from('quotes')
          .update({
            pdf_document_id: documentId,
            pdf_url: pdfUrl,
            pdf_generated_at: new Date().toISOString(),
            pdf_version: (freshQuote.pdf_version || 0) + 1
          })
          .eq('id', quote.id);

        console.log('[EMAIL] ✅ Successfully generated and saved fresh PDF');
        
        toast({
          title: "PDF Ready",
          description: "Fresh PDF generated successfully. Proceeding with email...",
          variant: "success"
        });
      }

      // Step 4: Validate we have a working URL by testing it
      console.log('[EMAIL] Validating PDF URL...');
      let pdfResponse = await fetch(pdfUrl);

      // Step 5: If URL is still invalid, one final regeneration attempt
      if (!pdfResponse.ok) {
        console.warn('[EMAIL] PDF URL validation failed, making final regeneration attempt...');
        
        toast({
          title: "Refreshing PDF",
          description: "PDF link expired, generating a new one...",
        });

        const { data: { user } } = await supabase.auth.getUser();
        let companyProfileData = null;
        
        if (user) {
          const { data: profile } = await supabase
            .from('company_profiles')
            .select('*')
            .eq('user_id', user.id)
            .maybeSingle();
          companyProfileData = profile;
        }

        const result = await generateFreshPDF(freshQuote as any, companyProfileData);
        
        if (!result.downloadUrl) {
          toast({
            title: "Unable to Generate PDF",
            description: "Please try generating the PDF manually first, then send the email.",
            variant: "destructive"
          });
          setIsSendingEmail(false);
          return;
        }

        pdfUrl = result.downloadUrl;
        
        await supabase
          .from('quotes')
          .update({
            pdf_document_id: result.documentId,
            pdf_url: pdfUrl,
            pdf_generated_at: new Date().toISOString()
          })
          .eq('id', quote.id);

        pdfResponse = await fetch(pdfUrl);
        
        if (!pdfResponse.ok) {
          toast({
            title: "PDF Access Error",
            description: "Unable to access PDF. Please contact support.",
            variant: "destructive"
          });
          setIsSendingEmail(false);
          return;
        }
      }

      console.log('[EMAIL] ✅ PDF validated and ready for email attachment');

      const pdfBlob = await pdfResponse.blob();
      
      // Convert to base64
      const pdfBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(pdfBlob);
      });

      // Send via send-quote-email function (includes Accept/Reject buttons)
      const { error } = await supabase.functions.invoke('send-quote-email', {
        body: { 
          quoteId: quote.id
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) {
        // Map backend errors to user-friendly messages
        const errorMsg = error.message || '';
        
        if (errorMsg.includes('Invalid email address')) {
          throw new Error('Client email address looks invalid. Edit the Client email and save the quote.');
        } else if (errorMsg.includes('No email account connected')) {
          throw new Error('Connect Gmail/Outlook in Settings → Email Integration.');
        } else if (errorMsg.includes('Daily email limit reached')) {
          throw new Error('Daily email limit reached (100/day). Resets at midnight UTC.');
        } else {
          throw error;
        }
      }

      toast({
        title: 'Quote sent with PDF',
        description: `Quote ${quote.quoteNumber} sent to ${cleanTo} with attached PDF`,
        variant: 'success',
        duration: 4000,
      });
      
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Update status to sent
      await supabase
        .from('quotes')
        .update({ status: 'sent' })
        .eq('id', quote.id);

      onSuccess?.();
    } catch (error: any) {
      console.error('Error sending quote:', error);
      
      let errorMessage = 'Failed to send quote. Please try again.';
      
      if (error.message?.includes('email account')) {
        errorMessage = 'Please connect your email account in Settings first.';
      } else if (error.message?.includes('rate limit')) {
        errorMessage = 'Daily email limit reached (100/day). Resets at midnight UTC.';
      } else if (error.message?.includes('token')) {
        errorMessage = 'Email authentication expired. Please reconnect your email in Settings.';
      }
      
      toast({
        title: 'Error sending quote',
        description: errorMessage,
        variant: 'destructive',
      });
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

      // Get latest quote data
      const { data: freshQuote, error: fetchError } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', quote.id)
        .single();

      if (fetchError) throw fetchError;

      // Check if PDF is current
      const pdfIsCurrent = freshQuote?.pdf_url && 
                           freshQuote?.pdf_generated_at && 
                           new Date(freshQuote.pdf_generated_at) >= new Date(freshQuote.updated_at);

      let pdfUrl = freshQuote.pdf_url;
      let documentId = freshQuote.pdf_document_id;

      // If PDF not current, try to refresh URL first
      if (!pdfIsCurrent && freshQuote.pdf_document_id) {
        console.log('[MAILTO] Attempting to refresh PDF URL...');
        
        const { data: statusData } = await supabase.functions.invoke('generate-pdf-monkey', {
          body: { mode: 'status', documentId: freshQuote.pdf_document_id }
        });

        if (statusData?.downloadUrl) {
          pdfUrl = statusData.downloadUrl;
          documentId = freshQuote.pdf_document_id;
          
          await supabase
            .from('quotes')
            .update({
              pdf_url: pdfUrl,
              pdf_generated_at: new Date().toISOString()
            })
            .eq('id', quote.id);
          
          console.log('[MAILTO] ✅ PDF URL refreshed');
        }
      }

      // If still no URL, regenerate PDF
      if (!pdfUrl) {
        console.log('[MAILTO] Generating fresh PDF...');
        
        const { data: { user } } = await supabase.auth.getUser();
        let companyProfileData = null;
        
        if (user) {
          const { data: profile } = await supabase
            .from('company_profiles')
            .select('*')
            .eq('user_id', user.id)
            .maybeSingle();
          companyProfileData = profile;
        }

        const result = await generateFreshPDF(freshQuote as any, companyProfileData);
        
        if (!result.downloadUrl) {
          throw new Error('Failed to generate PDF');
        }

        pdfUrl = result.downloadUrl;
        documentId = result.documentId;

        await supabase
          .from('quotes')
          .update({
            pdf_document_id: documentId,
            pdf_url: pdfUrl,
            pdf_generated_at: new Date().toISOString(),
            pdf_version: (freshQuote.pdf_version || 0) + 1
          })
          .eq('id', quote.id);

        console.log('[MAILTO] ✅ Fresh PDF generated');
      }

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

      // Step 2: Check if PDF is current
      const pdfIsCurrent = freshQuote?.pdf_url && 
                           freshQuote?.pdf_generated_at && 
                           new Date(freshQuote.pdf_generated_at) >= new Date(freshQuote.updated_at);

      let pdfUrl = freshQuote.pdf_url;
      let documentId = freshQuote.pdf_document_id;

      // Try to refresh URL if not current
      if (!pdfIsCurrent && freshQuote.pdf_document_id) {
        console.log('[WHATSAPP] Attempting to refresh PDF URL...');
        
        const { data: statusData } = await supabase.functions.invoke('generate-pdf-monkey', {
          body: { mode: 'status', documentId: freshQuote.pdf_document_id }
        });

        if (statusData?.downloadUrl) {
          pdfUrl = statusData.downloadUrl;
          documentId = freshQuote.pdf_document_id;
          
          await supabase
            .from('quotes')
            .update({
              pdf_url: pdfUrl,
              pdf_generated_at: new Date().toISOString()
            })
            .eq('id', quote.id);
          
          console.log('[WHATSAPP] ✅ PDF URL refreshed');
        }
      }

      // If still no URL, regenerate PDF
      if (!pdfUrl) {
        console.log('[WHATSAPP] Generating fresh PDF...');
        
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
            pdf_version: (freshQuote.pdf_version || 0) + 1
          })
          .eq('id', quote.id);

        console.log('[WHATSAPP] ✅ Fresh PDF generated');
      }

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
