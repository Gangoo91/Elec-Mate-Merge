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
import { Mail, MessageCircle, Loader2, AlertCircle, AlertTriangle, AlertOctagon, MailOpen } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface InvoiceSendDropdownProps {
  invoice: Quote;
  onSuccess?: () => void;
  disabled?: boolean;
  className?: string;
}

export const InvoiceSendDropdown = ({
  invoice,
  onSuccess,
  disabled = false,
  className = '',
}: InvoiceSendDropdownProps) => {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isSharingWhatsApp, setIsSharingWhatsApp] = useState(false);
  const [isSendingReminder, setIsSendingReminder] = useState<'gentle' | 'firm' | 'final' | null>(null);
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
          throw new Error('Please log in again to send invoices. Your session has expired.');
        }
        
        session = refreshData.session;
        console.log('Session refreshed successfully');
      }
      
      const { error } = await supabase.functions.invoke('send-invoice-resend', {
        body: { invoiceId: invoice.id }
      });

      if (error) throw error;

      toast({
        title: 'Invoice sent successfully',
        description: `Invoice ${invoice.invoice_number} sent to ${invoice.client?.email}`,
        variant: 'success',
        duration: 4000,
      });

      // Update status to sent with timestamp
      await supabase
        .from('quotes')
        .update({ 
          invoice_status: 'sent',
          invoice_sent_at: new Date().toISOString()
        })
        .eq('id', invoice.id);

      onSuccess?.();
    } catch (error: any) {
      console.error('Error sending invoice:', error);
      
      // Provide specific error messages
      let errorMessage = 'Failed to send invoice. Please try again.';
      
      if (error.message?.includes('session')) {
        errorMessage = 'Your session has expired. Please refresh the page and try again.';
      } else if (error.message?.includes('email')) {
        errorMessage = 'Client email address is missing or invalid.';
      }
      
      toast({
        title: 'Error sending invoice',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleSendReminder = async (reminderType: 'gentle' | 'firm' | 'final') => {
    try {
      setIsSendingReminder(reminderType);

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Not authenticated');
      }
      
      const { error } = await supabase.functions.invoke('send-payment-reminder', {
        body: { 
          quoteId: invoice.id,
          reminderType 
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) throw error;

      const reminderLabels = {
        gentle: 'Gentle reminder',
        firm: 'Firm reminder',
        final: 'Final notice'
      };

      toast({
        title: 'Reminder sent',
        description: `Payment reminder sent to ${invoice.client?.email}`,
        variant: 'success',
        duration: 3000,
      });

      onSuccess?.();
    } catch (error) {
      console.error('Error sending payment reminder:', error);
      toast({
        title: 'Error sending reminder',
        description: 'Failed to send payment reminder. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSendingReminder(null);
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
            documentId: invoice.id,
            documentType: 'invoice'
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

      const clientData = invoice.client;
      const clientEmail = clientData?.email || '';
      const clientName = clientData?.name || 'Valued Client';
      const companyName = companyData?.company_name || 'Your Company';
      const companyPhone = companyData?.company_phone || '';
      const companyEmail = companyData?.company_email || '';
      const totalAmount = invoice.total || 0;
      const dueDate = invoice.invoice_due_date 
        ? format(new Date(invoice.invoice_due_date), 'dd MMMM yyyy')
        : format(new Date(), 'dd MMMM yyyy');

      // Format currency
      const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

      // Create email subject
      const subject = `Invoice ${invoice.invoice_number} from ${companyName}`;

      // Create email body with PDF link and payment details
      const settings = invoice.settings as any; // Type assertion for bankDetails
      const bankDetails = settings?.bankDetails;
      const paymentDetailsText = bankDetails ? `

💳 Payment Details:
• Bank Name: ${bankDetails.bankName}
• Account Name: ${bankDetails.accountName}
• Account Number: ${bankDetails.accountNumber}
• Sort Code: ${bankDetails.sortCode}` : '';

      const body = `Dear ${clientName},

Please find your invoice for ${formatCurrency(totalAmount)}.

📄 Invoice Details:
• Invoice Number: ${invoice.invoice_number}
• Amount Due: ${formatCurrency(totalAmount)}
• Due Date: ${dueDate}

📥 Download Invoice (PDF):
${pdfUrl}${paymentDetailsText}

Payment is due by ${dueDate}. If you have any questions about this invoice, please don't hesitate to contact us.

Best regards,
${companyName}${companyPhone ? `\n📞 ${companyPhone}` : ''}${companyEmail ? `\n✉️ ${companyEmail}` : ''}

---
⚡ Powered by ElecMate Professional Suite`;

      // Open mailto link
      const mailtoLink = `mailto:${clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;

      toast({
        title: 'Email draft opened',
        description: 'Your email app should open with a pre-filled invoice email',
        variant: 'success',
        duration: 4000,
      });

      // Update invoice status to sent with timestamp
      await supabase
        .from('quotes')
        .update({ 
          invoice_status: 'sent',
          invoice_sent_at: new Date().toISOString()
        })
        .eq('id', invoice.id);

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

      // ALWAYS regenerate PDF for guaranteed freshness - fetch latest data first
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
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

      if (companyError) {
        console.error('Company profile error:', companyError);
      }

      // Step 2: Generate fresh PDF with latest data (silently)
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('User not authenticated');
      }

      const { data: pdfData, error: pdfError } = await supabase.functions.invoke('generate-pdf-monkey', {
        body: {
          quote: freshInvoice, // Use fresh data from database
          companyProfile: companyData,
          invoice_mode: true,
          force_regenerate: true
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      let pdfUrl = pdfData?.downloadUrl;
      const documentId = pdfData?.documentId;

      if (!pdfUrl && documentId) {
        pdfUrl = await pollPdfDownloadUrl(documentId, session.access_token) || undefined;
      }

      if (pdfError || !pdfUrl) {
        console.error('PDF Monkey error:', pdfError);
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
            pdf_version: newVersion
          })
          .eq('id', invoice.id);
      }

      // Step 4: Use fresh PDF URL directly (don't store - it expires)
      const cacheBustedPdfUrl = `${pdfUrl}?t=${Date.now()}`;

      // Step 5: Create professional WhatsApp message with cache-busted URL
      const clientData = typeof freshInvoice.client_data === 'string' 
        ? JSON.parse(freshInvoice.client_data) 
        : freshInvoice.client_data;
      const clientName = clientData?.name || 'Valued Client';
      const companyName = companyData?.company_name || 'Your Company';
      const totalAmount = freshInvoice.total || 0;
      const dueDate = freshInvoice.invoice_due_date 
        ? format(new Date(freshInvoice.invoice_due_date), 'dd MMMM yyyy')
        : format(new Date(), 'dd MMMM yyyy');
      
      const message = `📄 *Invoice ${freshInvoice.invoice_number}*

Dear ${clientName},

Please find your invoice for ${formatCurrency(totalAmount)}
Due date: ${dueDate}

📥 Download Invoice (PDF):
${cacheBustedPdfUrl}

Payment details are included in the invoice.

If you have any questions, please don't hesitate to contact me.

Best regards,
${companyName}`;

      // Step 6: Open WhatsApp with message and fresh PDF link
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

      window.open(whatsappUrl, '_blank');

      toast({
        title: 'Sent via WhatsApp',
        variant: 'success',
        duration: 3000,
      });

      onSuccess?.();
    } catch (error: any) {
      console.error('Error sharing via WhatsApp:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to prepare invoice for WhatsApp',
        variant: 'destructive',
      });
    } finally {
      setIsSharingWhatsApp(false);
    }
  };

  const isLoading = isSendingEmail || isSharingWhatsApp || isSendingReminder !== null || isGeneratingMailtoLink;
  
  // Check if invoice is overdue
  const isOverdue = invoice.invoice_due_date && 
    new Date(invoice.invoice_due_date) < new Date() && 
    invoice.invoice_status !== 'paid';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled || isLoading}
          className={className}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isSendingEmail ? 'Sending...' : 'Preparing...'}
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
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
            <span className="text-xs text-muted-foreground">Professional delivery via Resend</span>
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

        {isOverdue && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-destructive">
              Payment Reminders
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => handleSendReminder('gentle')}
              disabled={isSendingReminder !== null}
              className="cursor-pointer"
            >
              {isSendingReminder === 'gentle' ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <AlertCircle className="mr-2 h-4 w-4 text-blue-500" />
              )}
              <span>Send Gentle Reminder</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSendReminder('firm')}
              disabled={isSendingReminder !== null}
              className="cursor-pointer"
            >
              {isSendingReminder === 'firm' ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <AlertTriangle className="mr-2 h-4 w-4 text-orange-500" />
              )}
              <span>Send Firm Reminder</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSendReminder('final')}
              disabled={isSendingReminder !== null}
              className="cursor-pointer"
            >
              {isSendingReminder === 'final' ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <AlertOctagon className="mr-2 h-4 w-4 text-red-500" />
              )}
              <span>Send Final Notice</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};