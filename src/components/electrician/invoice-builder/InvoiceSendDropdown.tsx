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
import { Mail, MessageCircle, Loader2, AlertCircle, AlertTriangle, AlertOctagon } from 'lucide-react';
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
      
      const { error } = await supabase.functions.invoke('send-invoice', {
        body: { invoiceId: invoice.id },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) throw error;

      toast({
        title: 'Invoice sent',
        description: `Invoice ${invoice.invoice_number} sent to ${invoice.client?.email}`,
        variant: 'success',
      });

      // Update status to sent
      await supabase
        .from('quotes')
        .update({ invoice_status: 'sent' })
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
        title: 'Payment reminder sent',
        description: `${reminderLabels[reminderType]} sent to ${invoice.client?.email}`,
        variant: 'success',
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

  const handleShareWhatsApp = async () => {
    try {
      setIsSharingWhatsApp(true);

      // 1. Check if we have a current PDF
      const pdfIsCurrent = invoice.pdf_url && invoice.pdf_generated_at && 
        new Date(invoice.pdf_generated_at) >= new Date(invoice.updatedAt);
      
      let pdfUrl: string | undefined;
      let documentId: string | undefined;

      if (pdfIsCurrent) {
        // Use cached PDF - instant!
        pdfUrl = invoice.pdf_url;
        toast({
          title: 'PDF ready',
          description: 'Using latest invoice PDF',
        });
      } else {
        // PDF is stale or missing - regenerate
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error('User not authenticated');
        }

        const { data: companyData, error: companyError } = await supabase
          .from('company_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (companyError) {
          console.error('Company profile error:', companyError);
        }

        // Generate professional PDF using PDF Monkey template
        toast({
          title: 'Generating Professional PDF',
          description: 'Creating invoice with your branded template...',
        });

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

        pdfUrl = pdfData?.downloadUrl;
        documentId = pdfData?.documentId;

        if (!pdfUrl && documentId) {
          toast({ title: 'Preparing PDF…', description: 'Finalising your professional invoice…' });
          pdfUrl = await pollPdfDownloadUrl(documentId, session.access_token) || undefined;
        }

        if (pdfError || !pdfUrl) {
          console.error('PDF Monkey error:', pdfError);
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
      }

      // 2. Create professional WhatsApp message (NO BRANDING)
      const clientName = invoice.client?.name || 'Valued Client';
      const { data: companyData } = await supabase
        .from('company_profiles')
        .select('company_name')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .single();
      const companyName = companyData?.company_name || 'Your Company';
      const totalAmount = invoice.total || 0;
      const dueDate = invoice.invoice_due_date 
        ? format(new Date(invoice.invoice_due_date), 'dd MMMM yyyy')
        : format(new Date(), 'dd MMMM yyyy');
      
      const message = `📄 *Invoice ${invoice.invoice_number}*

Dear ${clientName},

Please find your invoice for ${formatCurrency(totalAmount)}
Due date: ${dueDate}

📥 Download Invoice (PDF):
${pdfUrl}

Payment details are included in the invoice.

If you have any questions, please don't hesitate to contact me.

Best regards,
${companyName}`;

      // 4. Open WhatsApp with message and PDF link
      const clientPhone = invoice.client?.phone;
      
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
        title: 'WhatsApp opened',
        description: 'Invoice PDF ready to send',
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

  const isLoading = isSendingEmail || isSharingWhatsApp || isSendingReminder !== null;
  
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
          <span>Send via Email</span>
        </DropdownMenuItem>
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