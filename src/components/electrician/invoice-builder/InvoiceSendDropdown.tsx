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

      // Create invoice metadata for link
      const invoiceData = {
        number: invoice.invoice_number,
        client: invoice.client?.name,
        total: invoice.total,
        dueDate: invoice.invoice_due_date,
      };

      // Base64 encode invoice data
      const encodedData = btoa(JSON.stringify(invoiceData));
      const invoiceLink = `${window.location.origin}/electrician/invoices/${invoice.id}/view`;

      // Format WhatsApp message
      const message = `💼 *Invoice #${invoice.invoice_number}*

From: ${invoice.client?.name || 'Client'}
Amount: ${formatCurrency(invoice.total)}
${invoice.invoice_due_date ? `Due: ${new Date(invoice.invoice_due_date).toLocaleDateString('en-GB')}` : ''}

View full invoice details:
${invoiceLink}

_Generated by ElecMate Professional Suite_`;

      // Get client phone number if available
      const clientPhone = invoice.client?.phone?.replace(/\s/g, '') || '';
      
      // Open WhatsApp with pre-filled message
      const whatsappUrl = clientPhone && clientPhone.startsWith('+44')
        ? `https://wa.me/${clientPhone}?text=${encodeURIComponent(message)}`
        : `https://wa.me/?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, '_blank');

      toast({
        title: 'Opening WhatsApp',
        description: 'Invoice details ready to share',
        variant: 'success',
      });

      onSuccess?.();
    } catch (error) {
      console.error('Error sharing via WhatsApp:', error);
      toast({
        title: 'Error',
        description: 'Failed to prepare WhatsApp share. Please try again.',
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
      <DropdownMenuContent align="end" className="w-64 bg-background border-border">
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