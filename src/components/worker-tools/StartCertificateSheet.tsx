/**
 * Worker Tools › My jobs: "Start a certificate" (ELE-1832).
 *
 * Creates the certificate already filled in from the job (customer and site
 * address), links it to this firm job straight away, and opens the normal
 * editor. Nothing in the certificate forms changes: the link is made here, and
 * if it can't be (no signal at the wrong moment), the server still matches it
 * to this job when it is completed, from the start recorded here.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { FormSheet } from '@/components/forms/FormSheet';
import { reportCloud } from '@/utils/reportCloud';
import { certificateHref } from '@/utils/certificate-href';
import { useCreateReportKey } from '@/hooks/useCreateReportKey';

const TYPES = [
  { type: 'eicr', label: 'EICR', sub: 'Periodic inspection of an existing installation' },
  { type: 'eic', label: 'EIC', sub: 'New circuits, rewires, consumer unit changes' },
  { type: 'minor-works', label: 'Minor Works', sub: 'An addition or alteration that is not a new circuit' },
] as const;

interface Props {
  jobId: string;
  clientName?: string | null;
  address?: string | null;
  phone?: string | null;
}

export function StartCertificateSheet({
  open,
  onOpenChange,
  jobId,
  clientName,
  address,
  phone,
}: Props & { open: boolean; onOpenChange: (o: boolean) => void }) {
  const navigate = useNavigate();
  const key = useCreateReportKey('job-cert');
  const [busy, setBusy] = useState<string | null>(null);

  const start = async (type: (typeof TYPES)[number]['type']) => {
    setBusy(type);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Sign in again');
      // Recorded first, so even if the link below fails the finished
      // certificate is matched back to this job.
      await supabase.rpc('note_cert_start' as never, { p_job: jobId, p_report_type: type } as never);
      const seed: Record<string, unknown> = {
        clientName: clientName || '',
        installationAddress: address || '',
        // Minor Works keeps the site address here.
        ...(type === 'minor-works' ? { propertyAddress: address || '' } : {}),
        ...(phone ? { clientPhone: phone } : {}),
      };
      const res = await reportCloud.createReport(user.id, type, seed, undefined, false, key.take(`${jobId}:${type}`));
      if (!res.success || !res.reportId) throw new Error('Could not start the certificate');
      key.release(`${jobId}:${type}`);
      const { error } = await supabase.rpc('link_my_certificate_to_job' as never, {
        p_report_ref: res.reportId,
        p_job: jobId,
      } as never);
      if (error) console.warn('[start-certificate] link deferred to completion:', error.message);
      onOpenChange(false);
      navigate(certificateHref(type, res.reportId));
    } catch (e) {
      toast.error((e as Error).message || 'Could not start the certificate');
    } finally {
      setBusy(null);
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Certificate"
      title="Start a certificate for this job"
      description="The customer and address are filled in from the job, and it shows on the job for the office and the QS."
    >
      <div className="space-y-2">
        {TYPES.map((t) => (
          <button
            key={t.type}
            type="button"
            disabled={!!busy}
            onClick={() => start(t.type)}
            className="flex min-h-16 w-full items-center justify-between gap-3 rounded-2xl border border-white/[0.14] bg-white/[0.05] px-4 py-3 text-left touch-manipulation active:scale-[0.99] disabled:opacity-60"
          >
            <span className="min-w-0">
              <span className="block text-[16px] font-semibold text-white">{t.label}</span>
              <span className="block text-[13px] text-white">{t.sub}</span>
            </span>
            {busy === t.type ? (
              <Loader2 className="h-5 w-5 shrink-0 animate-spin text-elec-yellow" />
            ) : (
              <ClipboardCheck className="h-5 w-5 shrink-0 text-elec-yellow" />
            )}
          </button>
        ))}
      </div>
      <p className="text-[13px] text-white">
        Other certificates (EV, fire alarm, emergency lighting) start from Inspection &amp; Testing. Use the job&rsquo;s
        address and they are matched to this job when you finish.
      </p>
    </FormSheet>
  );
}
