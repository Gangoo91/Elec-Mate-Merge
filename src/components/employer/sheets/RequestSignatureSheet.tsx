import { useEffect, useState } from 'react';
import { copyToClipboard } from '@/utils/clipboard';
import { Input } from '@/components/ui/input';
import {
  ResponsiveFormModal,
  ResponsiveFormModalContent,
  ResponsiveFormModalHeader,
  ResponsiveFormModalTitle,
  ResponsiveFormModalBody,
} from '@/components/ui/responsive-form-modal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle2, Copy, Loader2, Send } from 'lucide-react';
import {
  useCreateSignatureRequest,
  useLatestDocumentSignatureRequest,
  type DocumentType,
} from '@/hooks/useSignatureRequests';
import {
  Field,
  PrimaryButton,
  SecondaryButton,
  Pill,
  inputClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/employer/editorial';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface RequestSignatureSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** 'Quote' or 'Invoice' — rides the existing signature_requests rail. */
  documentType: Extract<DocumentType, 'Quote' | 'Invoice'>;
  documentId: string;
  /** e.g. "Quote Q-0042" — becomes the document_title on the request. */
  documentTitle: string;
  jobId?: string | null;
  defaultName?: string | null;
  defaultEmail?: string | null;
  defaultPhone?: string | null;
}

const EXPIRY_OPTIONS = [
  { value: '7', label: '7 days' },
  { value: '14', label: '14 days' },
  { value: '30', label: '30 days' },
  { value: '60', label: '60 days' },
  { value: '90', label: '90 days' },
];

/**
 * Bottom-sheet form to send a quote/invoice for digital sign-off via the
 * Signatures rail (signature_requests + the public /sign/:token page).
 * Mirrors the contract flow in useContracts.ts — document_type/document_id
 * link the request back to the source record.
 */
export function RequestSignatureSheet({
  open,
  onOpenChange,
  documentType,
  documentId,
  documentTitle,
  jobId,
  defaultName,
  defaultEmail,
  defaultPhone,
}: RequestSignatureSheetProps) {
  const [signerName, setSignerName] = useState('');
  const [signerEmail, setSignerEmail] = useState('');
  const [message, setMessage] = useState('');
  const [expiryDays, setExpiryDays] = useState('30');

  const createRequest = useCreateSignatureRequest();
  const { data: existingRequest } = useLatestDocumentSignatureRequest(
    open ? documentType : undefined,
    open ? documentId : undefined
  );

  // Prefill from the client fields each time the sheet opens
  useEffect(() => {
    if (open) {
      setSignerName(defaultName || '');
      setSignerEmail(defaultEmail || '');
      setMessage('');
      setExpiryDays('30');
    }
  }, [open, defaultName, defaultEmail]);

  const isAwaiting =
    !!existingRequest && ['Pending', 'Sent', 'Viewed'].includes(existingRequest.status);
  const isSigned = existingRequest?.status === 'Signed';

  const handleCopyExistingLink = async () => {
    if (!existingRequest?.access_token) return;
    await copyToClipboard(`${window.location.origin}/sign/${existingRequest.access_token}`);
    toast.success('Signing link copied to clipboard');
  };

  const handleSend = async () => {
    if (!signerName.trim()) return;
    const expiresAt = new Date(
      Date.now() + Number(expiryDays) * 24 * 60 * 60 * 1000
    ).toISOString();
    try {
      await createRequest.mutateAsync({
        document_title: documentTitle,
        document_type: documentType,
        document_id: documentId,
        job_id: jobId || undefined,
        signer_name: signerName.trim(),
        signer_email: signerEmail.trim() || undefined,
        signer_phone: defaultPhone || undefined,
        message: message.trim() || undefined,
        expires_at: expiresAt,
        status: 'Pending',
      });
      onOpenChange(false);
    } catch {
      // useCreateSignatureRequest surfaces its own toast
    }
  };

  return (
    <ResponsiveFormModal open={open} onOpenChange={onOpenChange}>
      <ResponsiveFormModalContent className="bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <ResponsiveFormModalHeader>
          <ResponsiveFormModalTitle className="text-white">
            Request signature
          </ResponsiveFormModalTitle>
        </ResponsiveFormModalHeader>
        <ResponsiveFormModalBody className="pb-6">
          <div className="space-y-4 py-4">
            {isSigned && (
              <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/25 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="font-semibold text-emerald-400 text-sm">Already signed</p>
                    <p className="text-sm text-white mt-0.5">
                      {existingRequest.signer_name} signed{' '}
                      {existingRequest.signed_at
                        ? format(new Date(existingRequest.signed_at), "d MMM yyyy 'at' HH:mm")
                        : ''}
                      . Sending again creates a fresh request.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {isAwaiting && (
              <div className="rounded-2xl bg-amber-400/10 border border-amber-400/25 p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-amber-400 min-w-0 truncate">
                    Awaiting signature from {existingRequest.signer_name}
                  </p>
                  <Pill tone="amber">{existingRequest.status}</Pill>
                </div>
                {existingRequest.expires_at && (
                  <p className="text-xs text-white/70">
                    Link expires {format(new Date(existingRequest.expires_at), 'd MMM yyyy')}
                  </p>
                )}
                {existingRequest.access_token && (
                  <SecondaryButton onClick={handleCopyExistingLink} fullWidth>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy signing link
                  </SecondaryButton>
                )}
              </div>
            )}

            <Field label="Signer name" required>
              <Input
                placeholder="Client name"
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Signer email">
              <Input
                type="email"
                placeholder="client@example.com"
                value={signerEmail}
                onChange={(e) => setSignerEmail(e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Link valid for">
              <Select value={expiryDays} onValueChange={setExpiryDays}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {EXPIRY_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Message (optional)">
              <Input
                placeholder="Personal message to include"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={inputClass}
              />
            </Field>

            <p className="text-sm text-white/70">
              {signerEmail.trim()
                ? `${documentTitle} will be emailed with a secure signing link.`
                : 'No email — the request is created and you can copy the signing link to share yourself.'}
            </p>
          </div>
          <div className="flex gap-2 pb-2">
            <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
              Cancel
            </SecondaryButton>
            <PrimaryButton
              onClick={handleSend}
              disabled={!signerName.trim() || createRequest.isPending}
              fullWidth
            >
              {createRequest.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Send request
            </PrimaryButton>
          </div>
        </ResponsiveFormModalBody>
      </ResponsiveFormModalContent>
    </ResponsiveFormModal>
  );
}
