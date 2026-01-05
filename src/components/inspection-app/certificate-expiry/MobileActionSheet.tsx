import { ExpiryReminder } from '@/types/expiryTypes';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Phone, Mail, CheckCircle2, Calendar, FileText, X } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MobileActionSheetProps {
  reminder: ExpiryReminder | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMarkContacted: (id: string) => void;
  onMarkBooked: (reminder: ExpiryReminder) => void;
  onGenerateEmail: (reminder: ExpiryReminder) => void;
  onViewCertificate: (reportId: string) => void;
}

export const MobileActionSheet = ({
  reminder,
  open,
  onOpenChange,
  onMarkContacted,
  onMarkBooked,
  onGenerateEmail,
  onViewCertificate,
}: MobileActionSheetProps) => {
  const { toast } = useToast();
  const [clientPhone, setClientPhone] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoadingPhone, setIsLoadingPhone] = useState(false);

  useEffect(() => {
    const fetchReportData = async () => {
      if (!reminder?.report_id) return;
      
      setIsLoadingPhone(true);
      try {
        // Get customer_id and pdf_url from report
        const { data: reportData, error: reportError } = await supabase
          .from('reports')
          .select('customer_id, pdf_url')
          .eq('id', reminder.report_id)
          .single();

        if (reportError) {
          setClientPhone(null);
          setPdfUrl(null);
          return;
        }

        // Set PDF URL
        setPdfUrl(reportData?.pdf_url || null);

        if (!reportData?.customer_id) {
          setClientPhone(null);
          return;
        }

        // Get phone from customer
        const { data: customerData, error: customerError } = await supabase
          .from('customers')
          .select('phone')
          .eq('id', reportData.customer_id)
          .single();

        if (customerError || !customerData?.phone) {
          setClientPhone(null);
          return;
        }

        setClientPhone(customerData.phone);
      } catch (error) {
        setClientPhone(null);
        setPdfUrl(null);
      } finally {
        setIsLoadingPhone(false);
      }
    };

    if (open && reminder) {
      fetchReportData();
    }
  }, [reminder?.report_id, open]);

  if (!reminder) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="h-auto max-h-[80vh] rounded-t-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 border-t-4 border-t-elec-yellow/60 border-x-neutral-700 border-b-neutral-700"
      >
        <SheetHeader className="text-left pb-4 border-b border-elec-yellow/20">
          <SheetTitle className="text-lg font-bold bg-gradient-to-r from-white via-elec-yellow to-white bg-clip-text text-transparent">
            Quick Actions
          </SheetTitle>
          <SheetDescription className="space-y-2">
            <div className="font-semibold text-base text-elec-yellow">{reminder.certificate_number}</div>
            <div className="text-sm text-neutral-300">{reminder.client_name}</div>
            <div className="text-xs text-neutral-400">
              Expires: {format(parseISO(reminder.expiry_date), 'dd MMM yyyy')}
            </div>
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-3 mt-6 pb-safe">
          <Button
            size="lg"
            variant="outline"
            className="w-full min-h-[56px] justify-start gap-3 text-base bg-card border-border text-foreground hover:bg-muted hover:border-elec-yellow hover:shadow-[0_0_15px_rgba(252,211,77,0.3)] active:scale-[0.98] transition-all"
            onClick={() => {
              onGenerateEmail(reminder);
              onOpenChange(false);
            }}
          >
            <Mail className="h-5 w-5 text-elec-yellow" />
            Generate Email Template
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full min-h-[56px] justify-start gap-3 text-base bg-card border-border text-foreground hover:bg-muted hover:border-elec-yellow hover:shadow-[0_0_15px_rgba(252,211,77,0.3)] active:scale-[0.98] transition-all disabled:opacity-50"
            onClick={() => {
              if (clientPhone) {
                window.location.href = `tel:${clientPhone}`;
                onOpenChange(false);
              }
            }}
            disabled={!clientPhone || isLoadingPhone}
          >
            <Phone className="h-5 w-5 text-elec-yellow" />
            {isLoadingPhone ? 'Loading...' : clientPhone ? `Call ${clientPhone}` : 'Call Client (No phone)'}
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full min-h-[56px] justify-start gap-3 text-base bg-card border-border text-foreground hover:bg-muted hover:border-elec-yellow hover:shadow-[0_0_15px_rgba(252,211,77,0.3)] active:scale-[0.98] transition-all disabled:opacity-50"
            onClick={() => {
              onMarkContacted(reminder.id);
              onOpenChange(false);
            }}
            disabled={reminder.reminder_status !== 'pending'}
          >
            <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
            Mark as Contacted
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full min-h-[56px] justify-start gap-3 text-base bg-card border-border text-foreground hover:bg-muted hover:border-elec-yellow hover:shadow-[0_0_15px_rgba(252,211,77,0.3)] active:scale-[0.98] transition-all disabled:opacity-50"
            onClick={() => {
              onMarkBooked(reminder);
              onOpenChange(false);
            }}
            disabled={reminder.reminder_status === 'booked' || reminder.reminder_status === 'completed'}
          >
            <Calendar className="h-5 w-5 text-elec-yellow" />
            Mark as Booked
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full min-h-[56px] justify-start gap-3 text-base bg-card border-border text-foreground hover:bg-muted hover:border-elec-yellow hover:shadow-[0_0_15px_rgba(252,211,77,0.3)] active:scale-[0.98] transition-all"
            onClick={() => {
              if (pdfUrl) {
                window.open(pdfUrl, '_blank');
                toast({
                  title: "Opening Certificate",
                  description: "PDF certificate opened in new tab",
                });
              } else {
                toast({
                  title: "Certificate Not Generated",
                  description: "Redirecting to form to generate certificate",
                });
                onViewCertificate(reminder.report_id);
              }
              onOpenChange(false);
            }}
          >
            <FileText className="h-5 w-5 text-elec-yellow" />
            {pdfUrl ? 'View Certificate PDF' : 'Generate Certificate'}
          </Button>

          <Button
            size="lg"
            variant="ghost"
            className="w-full min-h-[56px] justify-center gap-3 text-base mt-2 text-neutral-300 hover:bg-muted hover:text-elec-yellow active:scale-[0.98] transition-all"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-5 w-5" />
            Cancel
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
