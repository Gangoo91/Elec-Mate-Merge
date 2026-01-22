import { useState } from 'react';
import { Quote } from '@/types/quote';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Loader2, Mail, MessageCircle, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { format, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';

type ReminderType = 'gentle' | 'firm' | 'final';

interface PaymentReminderButtonProps {
  invoice: Quote;
  onReminderSent?: () => void;
  className?: string;
}

export const PaymentReminderButton = ({
  invoice,
  onReminderSent,
  className = '',
}: PaymentReminderButtonProps) => {
  const [sending, setSending] = useState(false);
  const [selectedType, setSelectedType] = useState<ReminderType | null>(null);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value);

  const totalPaid = (invoice as any).total_paid || 0;
  const remainingBalance = invoice.total - totalPaid;
  const reminderCount = (invoice as any).reminder_count || 0;
  const lastReminderSent = (invoice as any).last_reminder_sent_at;

  const getReminderMessage = (type: ReminderType) => {
    const clientName = invoice.client?.name || 'there';
    const dueDate = invoice.invoice_due_date
      ? format(new Date(invoice.invoice_due_date), 'dd MMMM yyyy')
      : 'as soon as possible';
    const daysOverdue = invoice.invoice_due_date
      ? differenceInDays(new Date(), new Date(invoice.invoice_due_date))
      : 0;

    switch (type) {
      case 'gentle':
        return {
          subject: `Friendly Reminder: Invoice ${invoice.invoice_number} Payment Due`,
          body: `Dear ${clientName},\n\nI hope this email finds you well. I wanted to kindly remind you that payment for Invoice ${invoice.invoice_number} is ${daysOverdue > 0 ? `now ${daysOverdue} days overdue` : `due on ${dueDate}`}.\n\nOutstanding Amount: ${formatCurrency(remainingBalance)}\n\nIf you have already made the payment, please disregard this message. Otherwise, I would appreciate it if you could arrange payment at your earliest convenience.\n\nPlease don't hesitate to contact me if you have any questions or need to discuss payment arrangements.\n\nThank you for your business.`,
          tone: 'Friendly'
        };
      case 'firm':
        return {
          subject: `Second Notice: Invoice ${invoice.invoice_number} - Payment Required`,
          body: `Dear ${clientName},\n\nThis is a follow-up regarding Invoice ${invoice.invoice_number}, which is now ${daysOverdue} days overdue.\n\nOutstanding Amount: ${formatCurrency(remainingBalance)}\nOriginal Due Date: ${dueDate}\n\nI understand that oversights happen, but I must request immediate attention to this matter. Please arrange payment within the next 7 days.\n\nIf there are any issues preventing payment, please contact me immediately so we can discuss a solution.\n\nThank you for your prompt attention.`,
          tone: 'Firm'
        };
      case 'final':
        return {
          subject: `URGENT: Final Notice - Invoice ${invoice.invoice_number}`,
          body: `Dear ${clientName},\n\nDespite previous reminders, Invoice ${invoice.invoice_number} remains unpaid and is now significantly overdue (${daysOverdue} days).\n\nOutstanding Amount: ${formatCurrency(remainingBalance)}\n\nThis is a final notice before I am required to consider further action, which may include:\n• Late payment interest charges\n• Referral to a debt collection agency\n• Legal proceedings\n\nTo avoid these measures, please ensure payment is made within 48 hours.\n\nIf you are experiencing financial difficulties, please contact me immediately to discuss payment arrangements.\n\nThis matter requires your urgent attention.`,
          tone: 'Final Warning'
        };
    }
  };

  const handleSendReminder = async (type: ReminderType) => {
    setSelectedType(type);
    setSending(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('User not authenticated');

      const clientEmail = invoice.client?.email;

      if (!clientEmail) {
        toast({ title: 'No email address', description: 'Client email address is required to send reminders', variant: 'destructive' });
        setSending(false);
        setSelectedType(null);
        return;
      }

      // Call edge function to send reminder email
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL || 'https://jtwygbeceundfgnkirof.supabase.co'}/functions/v1/send-payment-reminder`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            invoiceId: invoice.id,
            reminderType: type,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to send reminder');
      }

      const typeLabels = {
        gentle: 'Friendly',
        firm: 'Firm',
        final: 'Final notice'
      };

      toast({
        title: 'Reminder sent',
        description: `${typeLabels[type]} reminder sent to ${clientEmail}`,
        variant: 'success',
      });

      onReminderSent?.();
    } catch (error: any) {
      console.error('Error sending reminder:', error);
      toast({
        title: 'Error sending reminder',
        description: error.message || 'Failed to send reminder. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setSending(false);
      setSelectedType(null);
    }
  };

  // Don't show for paid invoices
  if (invoice.invoice_status === 'paid') return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          disabled={sending}
          className={cn("gap-2 border-amber-500/30 hover:bg-amber-500/10", className)}
        >
          {sending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Bell className="h-4 w-4 text-amber-500" />
              <span className="hidden sm:inline">Remind</span>
              {reminderCount > 0 && (
                <span className="text-xs bg-amber-500/20 text-amber-500 px-1.5 py-0.5 rounded-full">
                  {reminderCount}
                </span>
              )}
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
          Send Payment Reminder
        </DropdownMenuLabel>

        {lastReminderSent && (
          <div className="px-3 py-2 text-xs text-muted-foreground bg-muted/50 rounded-lg mx-1 mb-2">
            Last sent: {format(new Date(lastReminderSent), 'dd MMM yyyy')}
          </div>
        )}

        <DropdownMenuItem
          onClick={() => handleSendReminder('gentle')}
          disabled={sending && selectedType === 'gentle'}
          className="cursor-pointer rounded-xl h-16 px-3 my-1 focus:bg-blue-500/10 touch-manipulation"
        >
          <div className="h-10 w-10 rounded-xl bg-blue-500/15 flex items-center justify-center mr-3 flex-shrink-0">
            {sending && selectedType === 'gentle' ? (
              <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
            ) : (
              <Mail className="h-5 w-5 text-blue-500" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Gentle Reminder</span>
            <span className="text-xs text-muted-foreground">Friendly first notice</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleSendReminder('firm')}
          disabled={sending && selectedType === 'firm'}
          className="cursor-pointer rounded-xl h-16 px-3 my-1 focus:bg-amber-500/10 touch-manipulation"
        >
          <div className="h-10 w-10 rounded-xl bg-amber-500/15 flex items-center justify-center mr-3 flex-shrink-0">
            {sending && selectedType === 'firm' ? (
              <Loader2 className="h-5 w-5 text-amber-500 animate-spin" />
            ) : (
              <MessageCircle className="h-5 w-5 text-amber-500" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Firm Reminder</span>
            <span className="text-xs text-muted-foreground">Second notice, 7 days</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleSendReminder('final')}
          disabled={sending && selectedType === 'final'}
          className="cursor-pointer rounded-xl h-16 px-3 my-1 focus:bg-red-500/10 touch-manipulation"
        >
          <div className="h-10 w-10 rounded-xl bg-red-500/15 flex items-center justify-center mr-3 flex-shrink-0">
            {sending && selectedType === 'final' ? (
              <Loader2 className="h-5 w-5 text-red-500 animate-spin" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Final Notice</span>
            <span className="text-xs text-muted-foreground">Urgent, 48 hours</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
