/**
 * Worker Tools › My jobs: "Start a certificate" (ELE-1832, gap #3).
 *
 * Creates the certificate already filled in from the job (customer, site
 * address and, for an EIC, the circuits from the job's design), links it to
 * this firm job, and opens the normal editor. Its Back comes back to the job
 * (and Job done, when started from there).
 *
 * With no signal it still starts: the start is queued in the worker outbox
 * (note_cert_start_offline, at the phone's time) and the editor opens with the
 * same details, so the finished certificate is matched to this job when it
 * syncs. Nothing in the certificate forms changes beyond reading those details.
 */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ClipboardCheck, CloudOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { reportCloud } from '@/utils/reportCloud';
import { certificateHref, certificateNewHref } from '@/utils/certificate-href';
import {
  designCircuitsToEicSchedule,
  stashCertificateCircuits,
  type DesignCircuit,
} from '@/utils/certificatePrefill';
import { useCreateReportKey } from '@/hooks/useCreateReportKey';
import { OFFLINE_FIRST, offlineSnapshot, isOfflineError } from '@/lib/workerOfflineCache';
import { enqueue, newClientId } from '@/lib/workerOutbox';

const TYPES = [
  { type: 'eicr', label: 'EICR', sub: 'Periodic inspection of an existing installation' },
  { type: 'eic', label: 'EIC', sub: 'New circuits, rewires, consumer unit changes' },
  {
    type: 'minor-works',
    label: 'Minor Works',
    sub: 'An addition or alteration that is not a new circuit',
  },
] as const;
type CertType = (typeof TYPES)[number]['type'];

interface Props {
  jobId: string;
  clientName?: string | null;
  address?: string | null;
  phone?: string | null;
  /** Where the certificate's Back goes. Defaults to this job's page. */
  returnTo?: string | null;
}

/**
 * The circuits of the job's latest finished design, kept on the phone so an
 * EIC started in a basement still has them.
 */
function useJobDesignCircuits(jobId: string | null) {
  return useQuery<DesignCircuit[]>({
    queryKey: ['job-cert-circuits', jobId],
    enabled: !!jobId,
    staleTime: 5 * 60 * 1000,
    retry: false,
    ...OFFLINE_FIRST,
    queryFn: () =>
      offlineSnapshot(`job-cert-circuits:${jobId}`, async () => {
        const { data: list, error } = await supabase.rpc(
          'get_job_designs' as never,
          { p_job: jobId } as never
        );
        if (error) throw error;
        const latest = ((list as unknown as { id: string; circuits: number }[] | null) ?? []).find(
          (d) => d.circuits > 0
        );
        if (!latest) return [];
        const { data: detail, error: dErr } = await supabase.rpc(
          'get_design_detail' as never,
          { p_design: latest.id } as never
        );
        if (dErr) throw dErr;
        const circuits = ((
          detail as unknown as { design_data?: { circuits?: DesignCircuit[] } } | null
        )?.design_data?.circuits ?? []) as DesignCircuit[];
        return [...circuits].sort(
          (a, b) => Number(a.circuitNumber ?? 0) - Number(b.circuitNumber ?? 0)
        );
      }),
  });
}

const withParams = (href: string, params: Record<string, string | null | undefined>) => {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v) q.set(k, v);
  const s = q.toString();
  return s ? `${href}${href.includes('?') ? '&' : '?'}${s}` : href;
};

const noSignal = () => typeof navigator !== 'undefined' && navigator.onLine === false;

export function StartCertificateSheet({
  open,
  onOpenChange,
  jobId,
  clientName,
  address,
  phone,
  returnTo,
}: Props & { open: boolean; onOpenChange: (o: boolean) => void }) {
  const navigate = useNavigate();
  const key = useCreateReportKey('job-cert');
  const [busy, setBusy] = useState<string | null>(null);
  // Read on the job page (not only when the sheet opens), so it is on the
  // phone before the signal goes.
  const { data: circuits = [] } = useJobDesignCircuits(jobId);
  const back = returnTo || `/electrician/worker-tools/jobs?job=${jobId}`;

  // Load the certificate editor while there is signal, so it opens in a basement.
  useEffect(() => {
    if (!open) return;
    void import('@/pages/inspection/InspectionIndex').catch(() => undefined);
  }, [open]);

  /** No signal: queue the start and open the form with the job's details. */
  const startOffline = async (type: CertType) => {
    await enqueue({
      id: newClientId(),
      kind: 'cert_start',
      label: `Certificate started · ${TYPES.find((t) => t.type === type)?.label ?? type}`,
      detail: address || clientName || null,
      jobId,
      payload: { jobId, reportType: type },
    });
    const rows = type === 'eic' ? designCircuitsToEicSchedule(circuits) : [];
    const stash = rows.length ? stashCertificateCircuits(rows) : null;
    onOpenChange(false);
    navigate(
      withParams(certificateNewHref(type), {
        clientName: clientName || null,
        address: address || null,
        prefillCircuits: stash,
        returnTo: back,
      })
    );
    toast.message('Started with no signal', {
      description: 'It is matched to this job when it syncs.',
    });
  };

  const start = async (type: CertType) => {
    setBusy(type);
    try {
      if (noSignal()) {
        await startOffline(type);
        return;
      }
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session?.user;
      if (!user) throw new Error('Sign in again');
      // Recorded first, so even if the link below fails the finished
      // certificate is matched back to this job.
      const { error: startErr } = await supabase.rpc(
        'note_cert_start' as never,
        { p_job: jobId, p_report_type: type } as never
      );
      if (startErr && isOfflineError(startErr)) {
        await startOffline(type);
        return;
      }
      const seed: Record<string, unknown> = {
        clientName: clientName || '',
        installationAddress: address || '',
        // Minor Works keeps the site address here.
        ...(type === 'minor-works' ? { propertyAddress: address || '' } : {}),
        ...(phone ? { clientPhone: phone } : {}),
        ...(type === 'eic' && circuits.length
          ? { scheduleOfTests: designCircuitsToEicSchedule(circuits) }
          : {}),
      };
      let res: Awaited<ReturnType<typeof reportCloud.createReport>>;
      try {
        res = await reportCloud.createReport(
          user.id,
          type,
          seed,
          undefined,
          false,
          key.take(`${jobId}:${type}`)
        );
      } catch (e) {
        if (isOfflineError(e)) {
          await startOffline(type);
          return;
        }
        throw e;
      }
      if (!res.success || !res.reportId) throw new Error('Could not start the certificate');
      key.release(`${jobId}:${type}`);
      const { error } = await supabase.rpc(
        'link_my_certificate_to_job' as never,
        {
          p_report_ref: res.reportId,
          p_job: jobId,
        } as never
      );
      if (error) console.warn('[start-certificate] link deferred to completion:', error.message);
      onOpenChange(false);
      navigate(withParams(certificateHref(type, res.reportId), { returnTo: back }));
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
      width="wide"
      eyebrow="Certificate"
      title="Start a certificate for this job"
      description="The customer and address are filled in from the job, and it shows on the job for the office and the QS."
      footer={
        <div className="flex items-center gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(buttonSecondaryCn, 'flex-1 px-6 sm:flex-none')}
          >
            Cancel
          </button>
        </div>
      }
    >
      {/* Three across on a desktop; a list on a phone. */}
      <div className="grid gap-2 lg:grid-cols-3 lg:gap-3">
        {TYPES.map((t) => (
          <button
            key={t.type}
            type="button"
            disabled={!!busy}
            data-testid={`start-cert-${t.type}`}
            onClick={() => start(t.type)}
            className="flex min-h-16 w-full items-center justify-between gap-3 rounded-2xl border border-white/[0.14] bg-white/[0.05] px-4 py-3 text-left touch-manipulation transition-colors hover:bg-white/[0.08] active:scale-[0.99] disabled:opacity-60 lg:min-h-[120px] lg:items-start lg:px-5 lg:py-4"
          >
            <span className="min-w-0">
              <span className="block text-[16px] font-semibold text-white">{t.label}</span>
              <span className="block text-[13px] text-white">
                {t.sub}
                {t.type === 'eic' && circuits.length > 0
                  ? `. ${circuits.length} ${circuits.length === 1 ? 'circuit' : 'circuits'} from the job design.`
                  : ''}
              </span>
            </span>
            {busy === t.type ? (
              <Loader2 className="h-5 w-5 shrink-0 animate-spin text-elec-yellow" />
            ) : (
              <ClipboardCheck className="h-5 w-5 shrink-0 text-elec-yellow" />
            )}
          </button>
        ))}
      </div>
      <div className="grid gap-3 lg:grid-cols-2 lg:gap-6">
        <div className="flex items-start gap-2.5 rounded-xl border border-white/[0.12] bg-white/[0.04] px-3.5 py-3">
          <CloudOff className="mt-0.5 h-4 w-4 shrink-0 text-white" />
          <p className="text-[13px] leading-snug text-white">
            Works with no signal. Tap Back in the certificate to come straight back here.
          </p>
        </div>
        <p className="text-[13px] leading-snug text-white lg:py-3">
          Other certificates (EV, fire alarm, emergency lighting) start from Inspection &amp;
          Testing. Use the job&rsquo;s address and they are matched to this job when you finish.
        </p>
      </div>
    </FormSheet>
  );
}
