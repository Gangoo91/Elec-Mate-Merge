import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { copyToClipboard } from '@/utils/clipboard';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import {
  ResponsiveFormModal,
  ResponsiveFormModalContent,
  ResponsiveFormModalHeader,
  ResponsiveFormModalTitle,
  ResponsiveFormModalBody,
} from '@/components/ui/responsive-form-modal';
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
  Briefcase,
  ChevronRight,
  Signature,
} from 'lucide-react';
import { useMarkInvoicePaid, useSendInvoice, useGenerateInvoicePdf } from '@/hooks/useFinance';
import { toast } from 'sonner';
import type { Invoice } from '@/services/financeService';
import {
  SheetShell,
  FormCard,
  FormGrid,
  Field,
  PrimaryButton,
  SecondaryButton,
  Pill,
  Eyebrow,
  inputClass,
} from '@/components/employer/editorial';
import { RequestSignatureSheet } from '@/components/employer/sheets/RequestSignatureSheet';

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
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [showSignatureRequest, setShowSignatureRequest] = useState(false);
  const [, setSearchParams] = useSearchParams();

  if (!invoice) return null;

  // Pivot to the linked job — JobsSection consumes ?job=<id> and opens it.
  const handleViewJob = () => {
    if (!invoice.job_id) return;
    onOpenChange(false);
    setSearchParams({ section: 'jobs', job: invoice.job_id });
  };

  const lineItems = Array.isArray(invoice.line_items) ? invoice.line_items : [];
  const isPaid = invoice.status === 'Paid';
  // Nothing ever writes status='Overdue' — derive it from due_date, matching
  // the list view (Drafts excluded: the client never received them).
  const isOverdue =
    invoice.status === 'Overdue' ||
    (!isPaid &&
      invoice.status !== 'Draft' &&
      !!invoice.due_date &&
      invoice.due_date < new Date().toISOString().slice(0, 10));

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

  const sendToEmail = (email: string) => {
    sendInvoiceMutation.mutate(
      { id: invoice.id, email },
      {
        onSuccess: (data) => {
          if (data?.portalUrl) {
            setInvoiceLink(data.portalUrl);
          }
        },
      }
    );
  };

  const handleSendInvoice = () => {
    // Invoices need a real client email — stored one wins, otherwise ask
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const email: string | undefined = (invoice as any).client_email || undefined;
    if (!email) {
      setEmailInput('');
      setShowEmailPrompt(true);
      return;
    }
    sendToEmail(email);
  };

  const emailInputValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailInput.trim());

  const handleConfirmEmailPrompt = () => {
    if (!emailInputValid) return;
    setShowEmailPrompt(false);
    sendToEmail(emailInput.trim());
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

  const handleCallClient = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const phone = (invoice as any).client_phone;
    if (phone) {
      window.location.href = `tel:${phone}`;
    } else {
      toast.info('No phone number on file for this client');
    }
  };

  const handleEmailClient = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const email = (invoice as any).client_email;
    if (email) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(
        `Invoice ${invoice.invoice_number}`
      )}`;
    } else {
      toast.info('No email address on file — use Send email to add one');
    }
  };

  const daysUntilDue = invoice.due_date
    ? Math.ceil(
        (new Date(invoice.due_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      )
    : 0;

  return (
    <>
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
            {invoice.job_id && (
              <button
                type="button"
                onClick={handleViewJob}
                className="flex w-full items-center gap-2 min-h-11 rounded-xl bg-white/[0.03] border border-white/[0.06] px-3.5 py-2.5 text-left touch-manipulation transition-colors hover:bg-white/[0.08]"
              >
                <Briefcase className="h-4 w-4 text-elec-yellow shrink-0" />
                <span className="text-[13px] font-medium text-white">View linked job</span>
                <ChevronRight className="ml-auto h-4 w-4 text-white/30 shrink-0" />
              </button>
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

          <div className="rounded-2xl p-4 bg-elec-yellow/10 border border-elec-yellow/30 space-y-2">
            {invoice.subtotal != null && (
              <>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white">Subtotal</span>
                  <span className="font-medium text-white tabular-nums">
                    £{Number(invoice.subtotal).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white">
                    {invoice.reverse_charge
                      ? 'VAT — reverse charge'
                      : `VAT @ ${Number(invoice.vat_rate ?? 20)}%`}
                  </span>
                  <span className="font-medium text-white tabular-nums">
                    £{(Number(invoice.vat_amount) || 0).toFixed(2)}
                  </span>
                </div>
                <div className="h-px w-full bg-white/[0.08] my-2" />
              </>
            )}
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-white">Total amount</span>
              <span className="text-2xl font-bold text-elec-yellow tabular-nums">
                £{Number(invoice.amount).toLocaleString()}
              </span>
            </div>
            {(Number(invoice.cis_amount) || 0) > 0 && (
              <>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white">
                    Less CIS ({Number(invoice.cis_rate ?? 20)}% of labour)
                  </span>
                  <span className="font-medium text-red-400 tabular-nums">
                    −£{Number(invoice.cis_amount).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-white">Due after CIS</span>
                  <span className="text-lg font-semibold text-white tabular-nums">
                    £{(Number(invoice.amount) - Number(invoice.cis_amount)).toFixed(2)}
                  </span>
                </div>
              </>
            )}
            {invoice.reverse_charge && (
              <p className="text-[11px] text-white/50 leading-relaxed pt-1">
                Reverse charge: customer to account to HMRC for the VAT of £
                {(
                  (Number(invoice.subtotal) || 0) *
                  (Number(invoice.vat_rate ?? 20) / 100)
                ).toFixed(2)}{' '}
                ({Number(invoice.vat_rate ?? 20)}%). VAT Act 1994, s.55A.
              </p>
            )}
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
              <SecondaryButton onClick={handleCallClient} fullWidth>
                <Phone className="h-4 w-4 mr-2" />
                Call client
              </SecondaryButton>
            </FormGrid>
          )}

          <SecondaryButton onClick={handleEmailClient} fullWidth>
            <Mail className="h-4 w-4 mr-2" />
            Email client
          </SecondaryButton>

          <SecondaryButton onClick={() => setShowSignatureRequest(true)} fullWidth>
            <Signature className="h-4 w-4 mr-2" />
            Request signature
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

      <ResponsiveFormModal open={showEmailPrompt} onOpenChange={setShowEmailPrompt}>
        <ResponsiveFormModalContent className="bg-[hsl(0_0%_8%)] border-white/[0.08]">
          <ResponsiveFormModalHeader>
            <ResponsiveFormModalTitle className="text-white">
              Send invoice to client
            </ResponsiveFormModalTitle>
          </ResponsiveFormModalHeader>
          <ResponsiveFormModalBody className="pb-6">
            <div className="space-y-4 py-4">
              <Field label={`Email address for ${invoice.client}`} required>
                <Input
                  type="email"
                  placeholder="client@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className={inputClass}
                  autoComplete="off"
                />
              </Field>
              <p className="text-sm text-white">
                Invoice {invoice.invoice_number} for £{Number(invoice.amount).toLocaleString()}{' '}
                will be emailed with a secure payment link.
              </p>
            </div>
            <div className="flex gap-2 pb-2">
              <SecondaryButton onClick={() => setShowEmailPrompt(false)} fullWidth>
                Cancel
              </SecondaryButton>
              <PrimaryButton
                onClick={handleConfirmEmailPrompt}
                disabled={!emailInputValid || sendInvoiceMutation.isPending}
                fullWidth
              >
                <Send className="h-4 w-4 mr-2" />
                Send email
              </PrimaryButton>
            </div>
          </ResponsiveFormModalBody>
        </ResponsiveFormModalContent>
      </ResponsiveFormModal>

      <RequestSignatureSheet
        open={showSignatureRequest}
        onOpenChange={setShowSignatureRequest}
        documentType="Invoice"
        documentId={invoice.id}
        documentTitle={`Invoice ${invoice.invoice_number}`}
        jobId={invoice.job_id}
        defaultName={invoice.client}
        defaultEmail={
          (invoice as Invoice & { client_email?: string | null }).client_email
        }
        defaultPhone={
          (invoice as Invoice & { client_phone?: string | null }).client_phone
        }
      />
    </>
  );
}
