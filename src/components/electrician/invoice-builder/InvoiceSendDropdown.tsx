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
import { Mail, MessageCircle, Loader2 } from 'lucide-react';
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

      // Validate client email
      const cleanTo = invoice.client?.email?.trim();
      if (!cleanTo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanTo)) {
        toast({
          title: "Invalid Client Email",
          description: "Client email address is invalid. Please correct it in the invoice and try again.",
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
          throw new Error('Please log in again to send invoices.');
        }
        session = refreshData.session;
      }

      // Send via Resend (generates PDF automatically)
      const { error } = await supabase.functions.invoke('send-invoice-resend', {
        body: { invoiceId: invoice.id },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: 'Invoice sent',
        description: `Invoice ${invoice.invoice_number} sent to ${cleanTo}`,
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

  const isLoading = isSendingEmail || isSharingWhatsApp;

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
              {isSendingEmail ? 'Sending...' : 'Loading...'}
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
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
        <DropdownMenuLabel className="text-[10px] font-semibold text-muted-foreground px-3 py-2 uppercase tracking-wider">
          Send Invoice
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={handleSendEmail}
          disabled={isSendingEmail}
          className="cursor-pointer rounded-xl h-16 px-3 my-1 focus:bg-blue-500/10 touch-manipulation"
        >
          <div className="h-10 w-10 rounded-xl bg-blue-500/15 flex items-center justify-center mr-3 flex-shrink-0">
            {isSendingEmail ? (
              <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
            ) : (
              <Mail className="h-5 w-5 text-blue-500" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Send via Email</span>
            <span className="text-xs text-muted-foreground">Sends with PDF attachment</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleShareWhatsApp}
          disabled={isSharingWhatsApp}
          className="cursor-pointer rounded-xl h-16 px-3 my-1 focus:bg-green-500/10 touch-manipulation"
        >
          <div className="h-10 w-10 rounded-xl bg-green-500/15 flex items-center justify-center mr-3 flex-shrink-0">
            {isSharingWhatsApp ? (
              <Loader2 className="h-5 w-5 text-green-500 animate-spin" />
            ) : (
              <MessageCircle className="h-5 w-5 text-green-500" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Share via WhatsApp</span>
            <span className="text-xs text-muted-foreground">Send with PDF link</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};