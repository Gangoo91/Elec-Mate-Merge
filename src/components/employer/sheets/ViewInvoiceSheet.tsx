import { useState } from 'react';
import { copyToClipboard } from '@/utils/clipboard';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import {
  FileText,
  Send,
  Check,
  Phone,
  Mail,
  Calendar,
  Clock,
  AlertTriangle,
  PoundSterling,
  Download,
  Copy,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { useMarkInvoicePaid, useSendInvoice, useGenerateInvoicePdf } from '@/hooks/useFinance';
import { toast } from 'sonner';
import type { Invoice } from '@/services/financeService';
import {
  SheetShell,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  Pill,
  Eyebrow,
} from '@/components/employer/editorial';

interface ViewInvoiceSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: Invoice | null;
}

export function ViewInvoiceSheet({ open, onOpenChange, invoice }: ViewInvoiceSheetProps) {
  const markPaidMutation = useMarkInvoicePaid();
  const sendInvoiceMutation = useSendInvoice();
  const generatePdfMutation = useGenerateInvoicePdf();
  const [invoiceLink, setInvoiceLink] = useState<string | null>(null);

  if (!invoice) return null;

  const lineItems = Array.isArray(invoice.line_items) ? invoice.line_items : [];
  const isOverdue = invoice.status === 'Overdue';
  const isPaid = invoice.status === 'Paid';

  const statusTone: Record<string, 'amber' | 'blue' | 'emerald' | 'red' | 'yellow'> = {
    Draft: 'amber',
    Pending: 'amber',
    Sent: 'blue',
    Paid: 'emerald',
    Overdue: 'red',
  };

  const handleMarkPaid = () => {
    markPaidMutation.mutate(invoice.id);
  };

  const handleSendInvoice = async () => {
    sendInvoiceMutation.mutate(invoice.id, {
      onSuccess: (data) => {
        if (data?.portalUrl) {
          setInvoiceLink(data.portalUrl);
        }
      },
    });
  };

  const handleCopyLink = async () => {
    if (invoiceLink) {
      await copyToClipboard(invoiceLink);
      toast.success('Invoice link copied to clipboard');
    }
  };

  const handleDownloadPdf = () => {
    generatePdfMutation.mutate(invoice.id);
  };

  const daysUntilDue = invoice.due_date
    ? Math.ceil(
        (new Date(invoice.due_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      )
    : 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow={invoice.invoice_number}
          title={invoice.client}
          description={
            <span className="flex items-center gap-2">
              <Pill tone={statusTone[invoice.status] ?? 'amber'}>{invoice.status}</Pill>
              <span>Invoice amount £{Number(invoice.amount).toLocaleString()}</span>
            </span>
          }
          footer={
            !isPaid ? (
              <>
                <SecondaryButton
                  onClick={handleDownloadPdf}
                  disabled={generatePdfMutation.isPending}
                  fullWidth
                >
                  {generatePdfMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  PDF
                </SecondaryButton>
                <PrimaryButton
                  onClick={handleMarkPaid}
                  disabled={markPaidMutation.isPending}
                  fullWidth
                >
                  {markPaidMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <PoundSterling className="h-4 w-4 mr-2" />
                  )}
                  Mark paid
                </PrimaryButton>
              </>
            ) : (
              <SecondaryButton
                onClick={handleDownloadPdf}
                disabled={generatePdfMutation.isPending}
                fullWidth
              >
                {generatePdfMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <FileText className="h-4 w-4 mr-2" />
                )}
                Download PDF
              </SecondaryButton>
            )
          }
        >
          {/* Payment status block */}
          {!isPaid && (
            <div
              className={`rounded-2xl p-4 border ${
                isOverdue
                  ? 'bg-red-500/10 border-red-500/25'
                  : 'bg-amber-400/10 border-amber-400/25'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-sm font-medium ${
                    isOverdue ? 'text-red-400' : 'text-amber-400'
                  }`}
                >
                  {isOverdue
                    ? `${Math.abs(daysUntilDue)} days overdue`
                    : daysUntilDue === 0
                      ? 'Due today'
                      : `Due in ${daysUntilDue} days`}
                </span>
                <span className="text-lg font-bold text-white">
                  £{Number(invoice.amount).toLocaleString()}
                </span>
              </div>
              <Progress
                value={0}
                className={`h-2 ${isOverdue ? 'bg-red-500/20' : 'bg-amber-400/20'}`}
              />
            </div>
          )}

          {isPaid && (
            <div className="rounded-2xl p-4 bg-emerald-500/10 border border-emerald-500/25">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-emerald-400" />
                  <span className="font-medium text-emerald-400">Paid in full</span>
                </div>
                <span className="text-lg font-bold text-emerald-400">
                  £{Number(invoice.amount).toLocaleString()}
                </span>
              </div>
              {invoice.paid_date && (
                <p className="text-sm text-white mt-1">
                  Paid on {new Date(invoice.paid_date).toLocaleDateString('en-GB')}
                </p>
              )}
            </div>
          )}

          {invoiceLink && (
            <div className="rounded-2xl p-4 bg-blue-500/10 border border-blue-500/25">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <ExternalLink className="h-4 w-4 text-blue-400 shrink-0" />
                  <span className="text-sm text-blue-400 truncate">{invoiceLink}</span>
                </div>
                <SecondaryButton size="sm" onClick={handleCopyLink}>
                  <Copy className="h-4 w-4" />
                </SecondaryButton>
              </div>
            </div>
          )}

          <FormCard eyebrow="Details">
            {invoice.project && (
              <div>
                <Eyebrow>Project</Eyebrow>
                <p className="font-medium text-white mt-0.5">{invoice.project}</p>
              </div>
            )}
            <FormGrid cols={2}>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-white" />
                <div>
                  <Eyebrow>Created</Eyebrow>
                  <p className="font-medium text-white mt-0.5">
                    {new Date(invoice.created_at).toLocaleDateString('en-GB')}
                  </p>
                </div>
              </div>
              {invoice.due_date && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-white" />
                  <div>
                    <Eyebrow>Due</Eyebrow>
                    <p
                      className={`font-medium mt-0.5 ${
                        isOverdue ? 'text-red-400' : 'text-white'
                      }`}
                    >
                      {new Date(invoice.due_date).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                </div>
              )}
            </FormGrid>
          </FormCard>

          {lineItems.length > 0 && (
            <FormCard eyebrow="Line items">
              <div className="divide-y divide-white/[0.06] -mx-1">
                {lineItems.map((item: any, idx: number) => (
                  <div
                    key={item.id || idx}
                    className="flex justify-between items-center px-1 py-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-[13px] text-white truncate">
                        {item.description}
                      </p>
                      <p className="text-[11.5px] text-white mt-0.5">
                        {item.quantity} {item.unit} × £{item.unitPrice?.toFixed(2)}
                      </p>
                    </div>
                    <span className="font-bold text-white shrink-0 tabular-nums">
                      £{item.total?.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </FormCard>
          )}

          <div className="rounded-2xl p-4 bg-elec-yellow/10 border border-elec-yellow/30">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-white">Total amount</span>
              <span className="text-2xl font-bold text-elec-yellow tabular-nums">
                £{Number(invoice.amount).toLocaleString()}
              </span>
            </div>
          </div>

          {invoice.notes && (
            <FormCard eyebrow="Payment details / notes">
              <p className="text-sm text-white whitespace-pre-wrap">{invoice.notes}</p>
            </FormCard>
          )}

          {!isPaid && (
            <FormGrid cols={2}>
              <SecondaryButton
                onClick={handleSendInvoice}
                disabled={sendInvoiceMutation.isPending}
                fullWidth
              >
                {sendInvoiceMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Send email
              </SecondaryButton>
              <SecondaryButton fullWidth>
                <Phone className="h-4 w-4 mr-2" />
                Call client
              </SecondaryButton>
            </FormGrid>
          )}

          <SecondaryButton fullWidth>
            <Mail className="h-4 w-4 mr-2" />
            Email client
          </SecondaryButton>

          {isOverdue && (
            <div className="flex items-center gap-2 text-xs text-red-400">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>This invoice is past its due date.</span>
            </div>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
