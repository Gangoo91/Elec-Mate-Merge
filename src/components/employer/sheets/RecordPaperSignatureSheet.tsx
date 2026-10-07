import { useEffect, useState } from 'react';
import { FileSignature, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { FormSheet } from '@/components/forms/FormSheet';
import { PrimaryButton, SecondaryButton } from '@/components/employer/editorial';
import { SignableDocumentView } from '@/components/signature/SignableDocumentView';
import {
  PaperSignatureFields,
  usePaperForm,
} from '@/components/employer/signatures/PaperSignatureFields';
import { useRecordPaperSignature, type SignatureRequest } from '@/hooks/useSignatureRequests';

/**
 * Record a paper signature against an open request (Link ready, Sent or
 * Opened). The office uploads the signed paper, says who signed and when, and
 * ticks the declaration. The server freezes it like a digital signature, and
 * the register and signed copy say "Signed on paper".
 */
export function RecordPaperSignatureSheet({
  request: r,
  open,
  onOpenChange,
  onRecorded,
}: {
  request: SignatureRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRecorded?: (id: string) => void;
}) {
  const form = usePaperForm(open, r?.signer_name ?? '');
  const record = useRecordPaperSignature();
  const [error, setError] = useState<{ code: string | null; message: string } | null>(null);

  useEffect(() => {
    if (open) setError(null);
  }, [open]);

  if (!r) return null;

  const submit = async (fromDocument = false) => {
    if (!form.ready || !form.state.file) return;
    setError(null);
    try {
      const res = await record.mutateAsync({
        requestId: fromDocument ? null : r.id,
        documentType: fromDocument ? (r.document_type ?? null) : null,
        documentId: fromDocument ? (r.document_id ?? null) : null,
        options: fromDocument
          ? { ...(r.document_refs ?? {}), ...(r.job_id ? { job_id: r.job_id } : {}) }
          : undefined,
        signerName: form.state.name,
        signedOn: form.state.signedOn,
        file: form.state.file,
        declaration: form.state.declared,
      });
      toast.success('Paper signature recorded', {
        description: `${form.state.name.trim()} signed ${res.document_title} on paper. The scan is on the signed copy.`,
      });
      onOpenChange(false);
      onRecorded?.(res.id);
    } catch (e) {
      const err = e as Error & { code?: string | null };
      setError({ code: err.code ?? null, message: err.message });
    }
  };

  const canFromDocument = error?.code === 'changed' && !!r.document_type && !!r.document_id;

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Signatures · paper"
      title="Record a paper signature"
      description={`${r.document_title}. For when the client signed a printed copy instead of the link.`}
      width="wide"
      footer={
        <div className="flex gap-2">
          <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
            Cancel
          </SecondaryButton>
          <PrimaryButton
            data-help="signatures.paper-save"
            onClick={() => submit(false)}
            disabled={!form.ready || record.isPending}
            fullWidth
            size="lg"
          >
            {record.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FileSignature className="mr-2 h-4 w-4" />
            )}
            Record paper signature
          </PrimaryButton>
        </div>
      }
    >
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10 space-y-6 lg:space-y-0">
        <div className="space-y-5">
          {error ? (
            <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4">
              <p className="text-[14px] leading-relaxed text-white">{error.message}</p>
              {canFromDocument ? (
                <PrimaryButton
                  onClick={() => submit(true)}
                  disabled={record.isPending}
                  className="mt-3 h-11 w-full sm:w-auto"
                >
                  Record against the current version
                </PrimaryButton>
              ) : null}
            </div>
          ) : null}
          <PaperSignatureFields form={form} />
          <p className="text-[12.5px] leading-relaxed text-white">
            The register and the signed copy will say Signed on paper, recorded by you today, with
            the scan attached. It is never shown as a digital signature, and once recorded it cannot
            be changed or deleted.
          </p>
        </div>

        <section className="space-y-3 lg:sticky lg:top-0 lg:self-start">
          <h3 className="text-[15px] font-semibold text-white">The document they signed</h3>
          {r.document_snapshot ? (
            <SignableDocumentView document={r.document_snapshot} tone="dark" />
          ) : (
            <div className="rounded-2xl border border-dashed border-white/[0.16] p-5 text-[14px] text-white">
              This request has no copy of the document attached.
            </div>
          )}
          <p className="text-[12.5px] leading-relaxed text-white">
            Check the paper matches this version. If the document has changed since the link was
            made, you will be asked to record it against the current version.
          </p>
        </section>
      </div>
    </FormSheet>
  );
}

export default RecordPaperSignatureSheet;
