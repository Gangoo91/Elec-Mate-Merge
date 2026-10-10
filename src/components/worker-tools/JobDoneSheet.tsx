/**
 * Worker Tools › My jobs › "Job done" (ELE-2068).
 *
 * Finishing the job on site in one go, so nothing is left for the evening:
 *   1. the job's completion checks (ELE-1826, answered here, queued offline);
 *   2. photos of the finished work (kept on the phone until sent);
 *   3. the certificate (start one, or say where it is; ELE-1832);
 *   4. extras done on the day, priced from the firm's price book;
 *   5. the customer signs on the phone, agreeing the extras;
 *   6. Job done.
 *
 * Step 6 is ONE outbox op ('job_done'). With no signal it waits on the phone
 * and sends itself; the server takes it once (the op id is the completion id)
 * and closes the job, which drafts the invoice and asks for a review through
 * the firm's own automations. The half-done flow is kept on the phone too, so
 * leaving to fill in a certificate loses nothing.
 */
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { openDB } from 'idb';
import {
  Camera,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Loader2,
  Mail,
  Minus,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  inputCn,
  labelCn,
  textareaCn,
  buttonPrimaryCn,
  buttonSecondaryCn,
} from '@/components/forms/fieldStyles';
import { WorkerPanel, SolidBadge } from '@/components/worker-tools/WorkerUi';
import { JobChecklistsPanel } from '@/components/worker-tools/JobChecklistsPanel';
import { StartCertificateSheet } from '@/components/worker-tools/StartCertificateSheet';
import { DictateButton } from '@/components/worker-tools/DictateButton';
import { queuedToast } from '@/components/worker-tools/outboxToast';
import { useMyJobChecks, findResponse } from '@/hooks/usePrestartChecklists';
import {
  useJobDoneContext,
  useSubmitJobDone,
  customerMessageApplies,
  extrasTotal,
  gbp,
  type CertificateChoice,
  type JobDoneExtra,
  type JobDoneCertificate,
} from '@/hooks/useJobDone';
import { holdPhoto, newClientId, OutboxRefusedError, type OutboxPhoto } from '@/lib/workerOutbox';
import { useWorkerOutbox } from '@/hooks/useWorkerOutbox';
import { useClockState, captureClockFix, type ClockFix } from '@/hooks/useClockState';

const STEPS = [
  { key: 'checks', label: 'Checks' },
  { key: 'photos', label: 'Photos' },
  { key: 'certificate', label: 'Certificate' },
  { key: 'extras', label: 'Extras' },
  { key: 'sign', label: 'Customer signs' },
  { key: 'done', label: 'Done' },
] as const;
type StepKey = (typeof STEPS)[number]['key'];

const MAX_PHOTOS = 20;
/** Photos that can go in the customer's email. */
const MAX_CUSTOMER_PHOTOS = 6;

/* ── The half-done flow, kept on the phone ─────────────────────────────── */

interface Draft {
  step: number;
  note: string;
  photos: OutboxPhoto[];
  certificate: CertificateChoice | null;
  extras: JobDoneExtra[];
  customerName: string;
  absent: boolean;
  absentReason: string;
  /** Gap #3: the customer's summary (when the firm sends one). */
  cmSend?: boolean;
  cmSummary?: string;
  cmPhotos?: number[];
  /** Gap #3: clock out of this job on Job done. */
  clockOut?: boolean;
}

const draftDb = () =>
  openDB('elec-mate-job-done-drafts', 1, {
    upgrade(d) {
      if (!d.objectStoreNames.contains('drafts')) d.createObjectStore('drafts');
    },
  });

async function readDraft(key: string): Promise<Draft | null> {
  try {
    return ((await (await draftDb()).get('drafts', key)) as Draft | undefined) ?? null;
  } catch {
    return null;
  }
}
async function writeDraft(key: string, d: Draft) {
  try {
    await (await draftDb()).put('drafts', d, key);
  } catch {
    /* in memory only */
  }
}
export async function clearJobDoneDraft(key: string) {
  try {
    await (await draftDb()).delete('drafts', key);
  } catch {
    /* ignore */
  }
}

const CERT_LABEL: Record<string, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'Minor Works',
};

function certLine(c: JobDoneCertificate): string {
  const qs =
    c.qs_status === 'approved'
      ? 'Signed off by the QS'
      : c.qs_status === 'pending'
        ? 'Waiting for QS review'
        : c.qs_status === 'returned'
          ? 'Returned by the QS to fix'
          : c.status === 'completed'
            ? c.mine
              ? 'Goes to QS review when you finish'
              : 'Completed'
            : 'Not finished yet';
  return qs;
}

/* ── The sheet ─────────────────────────────────────────────────────────── */

export function JobDoneSheet({
  open,
  onOpenChange,
  jobId,
  jobTitle,
  clientName,
  address,
  phone,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  jobId: string;
  jobTitle: string;
  clientName?: string | null;
  address?: string | null;
  phone?: string | null;
}) {
  const { data: ctx } = useJobDoneContext(open ? jobId : null);
  const checks = useMyJobChecks(open ? jobId : null);
  const submit = useSubmitJobDone();
  const draftKey = `job-done:${jobId}`;

  const [loaded, setLoaded] = useState(false);
  const [stepKey, setStepKey] = useState<StepKey>('checks');
  const [note, setNote] = useState('');
  const [photos, setPhotos] = useState<OutboxPhoto[]>([]);
  const [certificate, setCertificate] = useState<CertificateChoice | null>(null);
  const [extras, setExtras] = useState<JobDoneExtra[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [absent, setAbsent] = useState(false);
  const [absentReason, setAbsentReason] = useState('');
  const [signature, setSignature] = useState<string | null>(null);
  const [certOpen, setCertOpen] = useState(false);
  const [busyPhotos, setBusyPhotos] = useState(false);
  // Gap #3: the customer's summary and the clock-out.
  const [cmSend, setCmSend] = useState(true);
  const [cmSummary, setCmSummary] = useState('');
  const [cmPhotos, setCmPhotos] = useState<number[] | null>(null);
  const [clockOutToo, setClockOutToo] = useState(true);
  const clock = useClockState();
  const clockedInHere = !!clock.clockState && clock.clockState.jobId === jobId;
  const fixRef = useRef<Promise<ClockFix> | null>(null);

  // Open: pick up where the phone left off.
  useEffect(() => {
    if (!open) return;
    let alive = true;
    setLoaded(false);
    void readDraft(draftKey).then((d) => {
      if (!alive) return;
      setStepKey(STEPS[d?.step ?? 0]?.key ?? 'checks');
      setNote(d?.note ?? '');
      setPhotos(d?.photos ?? []);
      setCertificate(d?.certificate ?? null);
      setExtras(d?.extras ?? []);
      setCustomerName(d?.customerName ?? (clientName || ''));
      setAbsent(d?.absent ?? false);
      setAbsentReason(d?.absentReason ?? '');
      setCmSend(d?.cmSend ?? true);
      setCmSummary(d?.cmSummary ?? '');
      setCmPhotos(d?.cmPhotos ?? null);
      setClockOutToo(d?.clockOut ?? true);
      // A signature is for what the customer saw: never kept across sessions.
      setSignature(null);
      setLoaded(true);
    });
    return () => {
      alive = false;
    };
  }, [open, draftKey, clientName]);

  // Keep the half-done flow on the phone.
  useEffect(() => {
    if (!open || !loaded) return;
    void writeDraft(draftKey, {
      step: STEPS.findIndex((s) => s.key === stepKey),
      note,
      photos,
      certificate,
      extras,
      customerName,
      absent,
      absentReason,
      cmSend,
      cmSummary,
      cmPhotos: cmPhotos ?? undefined,
      clockOut: clockOutToo,
    });
  }, [
    open,
    loaded,
    draftKey,
    stepKey,
    note,
    photos,
    certificate,
    extras,
    customerName,
    absent,
    absentReason,
    cmSend,
    cmSummary,
    cmPhotos,
    clockOutToo,
  ]);

  // The customer signs for a total; change the extras and they sign again.
  const extrasSig = JSON.stringify(extras.map((x) => [x.description, x.quantity, x.unit_price]));
  const lastExtras = useRef(extrasSig);
  useEffect(() => {
    if (lastExtras.current !== extrasSig) {
      lastExtras.current = extrasSig;
      setSignature(null);
    }
  }, [extrasSig]);

  const certs = ctx?.certificates ?? [];
  const certChoice: CertificateChoice | null = certificate ?? (certs.length > 0 ? 'linked' : null);

  // Completion checks still open, with answers waiting on this phone counted.
  const afterOpen = useMemo(() => {
    const d = checks.data;
    if (!d) return [] as string[];
    const out: string[] = [];
    for (const c of d.checklists) {
      for (const item of c.items) {
        if (item.phase !== 'after' || !item.required) continue;
        const p = checks.pendingChecks.get(`${c.id}:${item.key}`);
        const done = p ? p.satisfied : !!findResponse(d, c.id, item, null)?.satisfied;
        if (!done) out.push(item.label);
      }
    }
    return out;
  }, [checks.data, checks.pendingChecks]);
  const hasChecks = (checks.data?.checklists ?? []).some((c) =>
    c.items.some((i) => i.phase === 'after')
  );

  const net = extrasTotal(extras);
  // The rate the extras go on the invoice at (the server works it out the same
  // way complete_job_on_site does), so the customer signs the invoiced figure.
  const vatRate = Number(ctx?.vat_basis?.rate ?? (ctx?.vat_registered ? 20 : 0)) || 0;
  const reverseCharge = !!ctx?.vat_basis?.reverse_charge;
  const vat = Math.round(net * vatRate) / 100;

  // No completion checks on this job: no checks step.
  const steps = STEPS.filter((s) => s.key !== 'checks' || hasChecks || !checks.data);
  const step = Math.max(
    steps.findIndex((s) => s.key === stepKey),
    0
  );
  const setStep = (n: number) => setStepKey(steps[n]?.key ?? steps[0].key);
  const current: StepKey = steps[step].key;

  // Gap #3: does this Job done write to the customer, and with which photos?
  const cm = ctx?.customer_message;
  const cmOn = customerMessageApplies(ctx);
  const cmPhotosAllowed = cmOn && cm?.photos !== false;
  const chosenPhotos = (cmPhotos ?? photos.map((_, i) => i).slice(0, MAX_CUSTOMER_PHOTOS)).filter(
    (i) => i < photos.length
  );
  // The summary starts as the worker's note, in their words; they can change it.
  useEffect(() => {
    if (current === 'done' && cmOn && !cmSummary && note.trim()) setCmSummary(note.trim());
  }, [current, cmOn, cmSummary, note]);
  // Take the clock-out location while they read the last step, never at the tap.
  useEffect(() => {
    if (current === 'done' && clockedInHere && clockOutToo && !fixRef.current) {
      fixRef.current = captureClockFix(6000);
    }
  }, [current, clockedInHere, clockOutToo]);

  const blocked: string | null =
    current === 'checks' && afterOpen.length > 0
      ? `${afterOpen.length === 1 ? '1 check' : `${afterOpen.length} checks`} still to do`
      : current === 'certificate' && !certChoice
        ? 'Choose where the certificate is'
        : current === 'sign' && !absent && (!signature || !customerName.trim())
          ? !customerName.trim()
            ? 'Add the customer’s name'
            : 'The customer signs above'
          : current === 'sign' && absent && extras.length > 0
            ? 'Extras need the customer’s signature'
            : current === 'sign' && absent && !absentReason.trim()
              ? 'Say why the customer could not sign'
              : null;

  const addPhotos = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusyPhotos(true);
    try {
      const room = MAX_PHOTOS - photos.length;
      const held = await Promise.all(
        Array.from(files)
          .slice(0, room)
          .map((f) => holdPhoto(f))
      );
      setPhotos((p) => [...p, ...held]);
      if (files.length > room) toast.info(`Up to ${MAX_PHOTOS} photos`);
    } catch (e) {
      toast.error((e as Error).message || 'That photo could not be added');
    } finally {
      setBusyPhotos(false);
    }
  };

  const finish = async () => {
    // mutateAsync, not mutate(cb): the job page swaps this block for "saved on
    // this phone" the moment the op is queued, and callbacks given to mutate()
    // are dropped once the component that called it has gone.
    try {
      const r = await submit.mutateAsync({
        jobId,
        jobTitle,
        note,
        photos,
        certificate: certChoice ?? 'later',
        customer: {
          name: customerName,
          signature: absent ? null : signature,
          absentReason: absent ? absentReason : null,
        },
        extras,
        customerMessage: cmOn
          ? {
              send: cmSend,
              summary: cmSummary,
              photoIndexes: cmPhotosAllowed ? chosenPhotos : [],
            }
          : null,
      });
      await clearJobDoneDraft(draftKey);
      if (r === 'queued') queuedToast('Job done saved');
      else toast.success('Job done. The office has it');
      onOpenChange(false);
      // Gap #3: clocked in to this job? Clock out through the timesheet's own
      // path (the outbox, so it works with no signal), with Undo.
      if (clockedInHere && clockOutToo) {
        const fix = await Promise.race([
          fixRef.current ?? Promise.resolve<ClockFix | null>(null),
          new Promise<null>((res) => setTimeout(() => res(null), 1500)),
        ]);
        const since = clock.clockState?.clockInTime;
        const ok = await clock.clockOut(undefined, fix, { offline: true, quiet: true });
        if (ok) {
          toast.success('Clocked out of this job', {
            description: since
              ? `On the clock from ${new Date(since).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}.`
              : undefined,
            duration: 10000,
            action: {
              label: 'Undo',
              onClick: () => {
                void clock
                  .undoClockOut()
                  .then((back) =>
                    back
                      ? toast.success('Back on the clock')
                      : toast.error(
                          'Couldn’t undo it. The office may have changed the day, or there’s no signal.'
                        )
                  );
              },
            },
          });
        }
      }
    } catch (e) {
      toast.error(e instanceof OutboxRefusedError ? e.message : 'Couldn’t save that. Try again');
    }
  };

  const next = () => (step < steps.length - 1 ? setStep(step + 1) : void finish());

  /* ── Step bodies ─────────────────────────────────────────────────────── */

  // Clock-out and "what happens next": under the summary on a phone, in the
  // right-hand column on a desktop (instead of repeating the summary there).
  const finishExtras = (
    <>
      {clockedInHere && (
        <button
          type="button"
          role="switch"
          aria-checked={clockOutToo}
          data-testid="job-done-clock-out"
          onClick={() => setClockOutToo((v) => !v)}
          className="flex min-h-[56px] w-full items-center gap-3 rounded-xl border border-white/[0.12] bg-white/[0.03] px-4 py-3 text-left touch-manipulation"
        >
          <Clock className="h-5 w-5 shrink-0 text-white" />
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-semibold text-white">
              Clock me out of this job
            </span>
            <span className="block text-[12.5px] text-white">
              On the clock since{' '}
              {new Date(clock.clockState!.clockInTime).toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              })}
              . You can undo it straight after.
            </span>
          </span>
          <span
            className={cn(
              'flex h-6 w-6 shrink-0 items-center justify-center rounded-md border',
              clockOutToo ? 'border-white bg-white text-black' : 'border-white/[0.3]'
            )}
          >
            {clockOutToo && <Check className="h-4 w-4" />}
          </span>
        </button>
      )}
      <WorkerPanel className="px-4 py-4 sm:px-5">
        <p className="text-[14px] font-semibold text-white">What happens next</p>
        <ul className="mt-2 space-y-1.5 text-[13.5px] leading-snug text-white">
          <li>The job is closed and the office is told.</li>
          <li>
            {ctx?.draft_invoice_on
              ? 'The invoice is drafted for the office to check and send'
              : extras.length > 0
                ? 'The extras go on a draft invoice for the office to check and send'
                : 'The office invoices it'}
            {extras.length > 0 && ctx?.draft_invoice_on
              ? ', with the extras on it as a variation.'
              : '.'}
          </li>
          {certs.some((c) => c.mine && c.status === 'completed' && !c.qs_status) && (
            <li>Your certificate goes to QS review.</li>
          )}
          {cmOn && cmSend && (
            <li>
              {cm?.mode === 'office_checks'
                ? 'The office checks the customer’s summary, then it is emailed.'
                : 'The customer is emailed the summary.'}
            </li>
          )}
          {cm && cm.mode !== 'off' && !cm.has_email && !cm.imported && (
            <li>No email on the job, so the customer isn’t sent a summary.</li>
          )}
          {clockedInHere && clockOutToo && <li>You’re clocked out of this job.</li>}
          {ctx?.review_request_on && ctx.job?.has_client_email && (
            <li>The customer is asked for a review.</li>
          )}
        </ul>
      </WorkerPanel>
    </>
  );

  const body = (() => {
    switch (current) {
      case 'checks':
        return (
          <div className="space-y-4">
            <StepIntro
              title="Completion checks"
              text={
                hasChecks
                  ? 'Your firm’s checks for the end of the job. Each one records your name, the time and where your phone is.'
                  : 'Getting your firm’s checks for this job.'
              }
            />
            {hasChecks && <JobChecklistsPanel jobId={jobId} phase="after" />}
          </div>
        );
      case 'photos':
        return (
          <div className="space-y-4">
            <StepIntro
              title="Photos of the finished work"
              text="They go on the job for the office and the customer’s record. With no signal they stay on this phone and send later."
            />
            <label
              className={cn(
                buttonSecondaryCn,
                'flex w-full cursor-pointer items-center justify-center gap-2',
                (busyPhotos || photos.length >= MAX_PHOTOS) && 'pointer-events-none opacity-60'
              )}
            >
              {busyPhotos ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Camera className="h-5 w-5" />
              )}
              Take or add photos
              <input
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                data-testid="job-done-photos"
                onChange={(e) => {
                  void addPhotos(e.target.files);
                  e.target.value = '';
                }}
              />
            </label>
            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {photos.map((p, i) => (
                  <HeldThumb
                    key={i}
                    photo={p}
                    onRemove={() => setPhotos((all) => all.filter((_, j) => j !== i))}
                  />
                ))}
              </div>
            )}
            <div>
              <label className={labelCn}>What’s done, anything left (optional)</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={4000}
                placeholder="e.g. Board changed and labelled, all circuits tested. Old board left by the bins."
                className={cn(textareaCn, 'min-h-[110px]')}
              />
              <DictateButton
                className="mt-2 w-full"
                onText={(t) => setNote((n) => (n ? `${n.trimEnd()} ${t}` : t))}
              />
            </div>
          </div>
        );
      case 'certificate':
        return (
          <div className="space-y-4">
            <StepIntro
              title="Certificate"
              text="Finished certificates of yours on this job go to QS review when you tap Job done."
            />
            {certs.length > 0 && (
              <WorkerPanel className="divide-y divide-white/[0.07]">
                {certs.map((c) => (
                  <div key={c.report_uuid} className="flex items-start gap-3 px-4 py-3.5 sm:px-5">
                    <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-elec-yellow" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-semibold text-white">
                        {CERT_LABEL[c.report_type] ?? c.report_type}{' '}
                        {c.certificate_number ? `· ${c.certificate_number}` : ''}
                      </p>
                      <p className="mt-0.5 text-[13px] text-white">{certLine(c)}</p>
                    </div>
                    {c.qs_status === 'approved' ? (
                      <SolidBadge tone="green">Signed off</SolidBadge>
                    ) : c.status === 'completed' ? (
                      <SolidBadge tone="neutral">Completed</SolidBadge>
                    ) : (
                      <SolidBadge tone="yellow">Draft</SolidBadge>
                    )}
                  </div>
                ))}
              </WorkerPanel>
            )}
            <div className="grid gap-2">
              {(
                [
                  certs.length > 0 && {
                    v: 'linked',
                    t: 'Done, it’s on this job',
                    s: 'The certificate above is the one for this work',
                  },
                  {
                    v: 'started',
                    t: 'Started, I’ll finish it later',
                    s: 'The office sees it is on its way',
                  },
                  {
                    v: 'later',
                    t: 'I’ll do it later',
                    s: 'The office is told one is still to come',
                  },
                  {
                    v: 'not_needed',
                    t: 'Not needed for this job',
                    s: 'No notifiable or certifiable work',
                  },
                ].filter(Boolean) as { v: CertificateChoice; t: string; s: string }[]
              ).map((o) => (
                <button
                  key={o.v}
                  type="button"
                  onClick={() => setCertificate(o.v)}
                  className={cn(
                    'flex min-h-[56px] w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left touch-manipulation',
                    certChoice === o.v
                      ? 'border-elec-yellow bg-white/[0.06]'
                      : 'border-white/[0.12] bg-white/[0.03]'
                  )}
                >
                  <span>
                    <span className="block text-[15px] font-semibold text-white">{o.t}</span>
                    <span className="block text-[12.5px] text-white">{o.s}</span>
                  </span>
                  {certChoice === o.v && (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-elec-yellow" />
                  )}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setCertOpen(true)}
              className={cn(buttonSecondaryCn, 'flex w-full items-center justify-center gap-2')}
            >
              <ClipboardCheck className="h-5 w-5" />
              Start a certificate now
            </button>
            <p className="text-[12.5px] leading-snug text-white">
              Starting one opens the certificate, filled in from the job, even with no signal. Tap
              Back in the certificate to come straight back to Job done. Everything here is kept on
              this phone.
            </p>
          </div>
        );
      case 'extras':
        return (
          <ExtrasStep
            extras={extras}
            setExtras={setExtras}
            priceList={ctx?.price_list ?? []}
            vatRegistered={vatRate > 0}
          />
        );
      case 'sign':
        return (
          <div className="space-y-4">
            <StepIntro
              title="Customer signs"
              text="Hand the phone over. They sign to say the work is done and to agree any extras."
            />
            <WorkerPanel className="px-4 py-4 sm:px-5">
              <p className="text-[15px] font-semibold text-white">{jobTitle}</p>
              <p className="mt-1 text-[13.5px] leading-snug text-white">
                I confirm the work has been completed
                {extras.length > 0
                  ? ` and I agree the extra work below, ${gbp(net)}${
                      vat > 0
                        ? ` plus VAT at ${vatRate}% (${gbp(net + vat)} in all)`
                        : reverseCharge
                          ? ', no VAT charged (reverse charge: you account for the VAT to HMRC)'
                          : ''
                    }.`
                  : '.'}
              </p>
              {extras.length > 0 && (
                <ul className="mt-3 divide-y divide-white/[0.07] border-t border-white/[0.07]">
                  {extras.map((x) => (
                    <li
                      key={x.key}
                      className="flex justify-between gap-3 py-2 text-[13.5px] text-white"
                    >
                      <span className="min-w-0">
                        {x.description}
                        {x.quantity !== 1 && ` × ${x.quantity}`}
                      </span>
                      <span className="shrink-0 tabular-nums">
                        {gbp(x.quantity * x.unit_price)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </WorkerPanel>
            {!absent ? (
              <>
                <div>
                  <label className={labelCn} htmlFor="jd-customer-name">
                    Customer’s name
                  </label>
                  <input
                    id="jd-customer-name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={inputCn}
                    autoComplete="off"
                  />
                </div>
                <SignatureBox onChange={setSignature} />
                <button
                  type="button"
                  onClick={() => setAbsent(true)}
                  className="h-11 w-full text-[14px] font-semibold text-white underline underline-offset-4 touch-manipulation"
                >
                  The customer isn’t here
                </button>
              </>
            ) : (
              <>
                <div>
                  <label className={labelCn} htmlFor="jd-absent">
                    Why couldn’t they sign?
                  </label>
                  <input
                    id="jd-absent"
                    value={absentReason}
                    onChange={(e) => setAbsentReason(e.target.value)}
                    placeholder="e.g. Out at work, key left with a neighbour"
                    className={inputCn}
                  />
                </div>
                {extras.length > 0 && (
                  <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-[13.5px] text-white">
                    Extras need the customer to agree them. Take them off, or ask the office to send
                    them for signature.
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setAbsent(false)}
                  className="h-11 w-full text-[14px] font-semibold text-white underline underline-offset-4 touch-manipulation"
                >
                  The customer is here to sign
                </button>
              </>
            )}
          </div>
        );
      case 'done':
        return (
          <div className="space-y-4">
            <StepIntro
              title="Ready to finish"
              text="One tap. If there’s no signal it is saved on this phone and goes by itself."
            />
            <Summary
              hasChecks={hasChecks}
              photos={photos.length}
              cert={certChoice}
              certs={certs.length}
              extras={extras.length}
              net={net}
              vat={vat}
              signedBy={absent ? null : customerName}
              absentReason={absent ? absentReason : null}
            />
            {cmOn && (
              <CustomerMessagePanel
                send={cmSend}
                onSend={setCmSend}
                summary={cmSummary}
                onSummary={setCmSummary}
                photos={photos}
                photosAllowed={cmPhotosAllowed}
                chosen={chosenPhotos}
                onToggle={(i) =>
                  setCmPhotos(() => {
                    const has = chosenPhotos.includes(i);
                    if (has) return chosenPhotos.filter((x) => x !== i);
                    if (chosenPhotos.length >= MAX_CUSTOMER_PHOTOS) {
                      toast.info(`Up to ${MAX_CUSTOMER_PHOTOS} photos in the email`);
                      return chosenPhotos;
                    }
                    return [...chosenPhotos, i].sort((a, b) => a - b);
                  })
                }
                officeChecks={cm?.mode === 'office_checks'}
                customerName={clientName || customerName || null}
                hasCertificate={certChoice !== 'not_needed'}
                invoice={cm?.invoice ?? 'none'}
              />
            )}
            <div className="space-y-4 lg:hidden">{finishExtras}</div>
          </div>
        );
    }
  })();

  const side =
    current === 'done' ? (
      <div className="hidden space-y-4 lg:block">{finishExtras}</div>
    ) : (
      <div className="hidden lg:block">
        <p className="mb-2 text-[13px] font-semibold text-white">So far</p>
        <Summary
          hasChecks={hasChecks}
          photos={photos.length}
          cert={certChoice}
          certs={certs.length}
          extras={extras.length}
          net={net}
          vat={vat}
          signedBy={absent ? null : signature ? customerName : null}
          absentReason={absent ? absentReason : null}
        />
      </div>
    );

  const notAllowed = ctx && !ctx.allowed;

  return (
    <>
      <FormSheet
        open={open}
        onOpenChange={onOpenChange}
        width="wide"
        eyebrow={`Step ${step + 1} of ${steps.length} · ${steps[step].label}`}
        title="Job done"
        description={jobTitle}
        subheader={
          <div className="flex gap-1 pb-3" aria-hidden>
            {steps.map((s, i) => (
              <span
                key={s.key}
                className={cn(
                  'h-1 flex-1 rounded-full',
                  i <= step ? 'bg-elec-yellow' : 'bg-white/[0.12]'
                )}
              />
            ))}
          </div>
        }
        bodyClassName="lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-10 space-y-5 lg:space-y-0"
        footer={
          notAllowed ? (
            <div className="flex items-center gap-2 sm:justify-end">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={cn(buttonSecondaryCn, 'flex-1 px-6 sm:flex-none')}
              >
                Close
              </button>
            </div>
          ) : (
            // The house footer: one row on a phone too, the secondary on the
            // left, the one yellow on the right; natural widths on a desktop.
            <div className="flex items-center gap-2 sm:justify-end">
              <button
                type="button"
                onClick={() => (step > 0 ? setStep(step - 1) : onOpenChange(false))}
                className={cn(buttonSecondaryCn, 'shrink-0 px-5 sm:px-6')}
              >
                {step > 0 ? 'Back' : 'Cancel'}
              </button>
              <button
                type="button"
                data-testid="job-done-next"
                onClick={next}
                disabled={!!blocked || submit.isPending || busyPhotos}
                className={cn(
                  buttonPrimaryCn,
                  'flex min-w-0 flex-1 items-center justify-center gap-2 px-4 sm:min-w-[220px] sm:flex-none sm:px-6'
                )}
              >
                {submit.isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : blocked ? (
                  blocked
                ) : current === 'done' ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    Job done
                  </>
                ) : current === 'extras' && extras.length === 0 ? (
                  'No extras, next'
                ) : current === 'photos' && photos.length === 0 ? (
                  'No photos, next'
                ) : (
                  'Next'
                )}
              </button>
            </div>
          )
        }
      >
        {notAllowed ? (
          <WorkerPanel className="px-4 py-5 sm:px-5">
            <p className="text-[15px] font-semibold text-white">You can’t close this job</p>
            <p className="mt-1 text-[13.5px] text-white">{ctx?.reason}</p>
          </WorkerPanel>
        ) : !loaded ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
        ) : (
          <>
            <div className="min-w-0 pt-4">{body}</div>
            <div className="lg:pt-4">{side}</div>
          </>
        )}
      </FormSheet>
      <StartCertificateSheet
        open={certOpen}
        onOpenChange={(o) => {
          setCertOpen(o);
          if (!o) setCertificate((c) => c ?? 'started');
        }}
        jobId={jobId}
        clientName={clientName}
        address={address}
        phone={phone}
        returnTo={`/electrician/worker-tools/jobs?job=${jobId}&jobdone=resume`}
      />
    </>
  );
}

/* ── Pieces ────────────────────────────────────────────────────────────── */

function StepIntro({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <p className="text-[17px] font-semibold text-white">{title}</p>
      <p className="mt-1 text-[13.5px] leading-snug text-white">{text}</p>
    </div>
  );
}

function HeldThumb({ photo, onRemove }: { photo: OutboxPhoto; onRemove: () => void }) {
  const url = useMemo(() => URL.createObjectURL(photo.blob), [photo.blob]);
  useEffect(() => () => URL.revokeObjectURL(url), [url]);
  return (
    <div className="relative aspect-square overflow-hidden rounded-xl border border-white/[0.12]">
      <img src={url} alt="" className="h-full w-full object-cover" />
      <button
        type="button"
        aria-label="Remove photo"
        onClick={onRemove}
        className="absolute right-1 top-1 flex h-11 w-11 items-center justify-center touch-manipulation"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/70">
          <X className="h-4 w-4 text-white" />
        </span>
      </button>
    </div>
  );
}

/**
 * The customer's signature: one white pad, full width, with Clear inside it so
 * it is never hidden under the footer. A PNG on white, like the old pad gave.
 */
function SignatureBox({ onChange }: { onChange: (dataUrl: string | null) => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [hasInk, setHasInk] = useState(false);
  const inkRef = useRef(false);
  inkRef.current = hasInk;

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    if (!rect.width) return;
    const dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);
    if (canvas.width === w && canvas.height === h) return;
    const prev = inkRef.current ? canvas.toDataURL('image/png') : null;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.4;
    if (prev) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
      img.src = prev;
    }
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(setup);
    const ro = new ResizeObserver(() => setup());
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => {
      cancelAnimationFrame(id);
      ro.disconnect();
    };
  }, [setup]);

  const point = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const onDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture?.(e.pointerId);
    drawing.current = true;
    last.current = point(e);
  };
  const onMove = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current?.getContext('2d');
    const p = point(e);
    if (ctx && last.current) {
      ctx.beginPath();
      ctx.moveTo(last.current.x, last.current.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      if (!inkRef.current) setHasInk(true);
    }
    last.current = p;
  };
  const onUp = () => {
    if (!drawing.current) return;
    drawing.current = false;
    last.current = null;
    if (inkRef.current && canvasRef.current) onChange(canvasRef.current.toDataURL('image/png'));
  };
  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
    setHasInk(false);
    onChange(null);
  };

  return (
    <div>
      <p className={labelCn}>Customer’s signature</p>
      <div
        ref={wrapRef}
        className="relative h-[180px] w-full overflow-hidden rounded-xl bg-white sm:h-[200px]"
      >
        <canvas
          ref={canvasRef}
          data-testid="job-done-signature"
          aria-label="Signature pad. The customer signs here with a finger."
          className="absolute inset-0 h-full w-full"
          style={{ touchAction: 'none' }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onPointerLeave={onUp}
        />
        {!hasInk && (
          <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-[15px] text-slate-500">
            Sign here with a finger
          </p>
        )}
        <div className="pointer-events-none absolute bottom-10 left-5 right-5 border-b border-slate-300" />
        <button
          type="button"
          onClick={clear}
          disabled={!hasInk}
          className="absolute right-1 top-1 h-11 rounded-lg px-3 text-[14px] font-semibold text-slate-800 touch-manipulation disabled:opacity-0"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

/** Gap #3: what the customer is emailed, chosen by the worker on the last step. */
function CustomerMessagePanel({
  send,
  onSend,
  summary,
  onSummary,
  photos,
  photosAllowed,
  chosen,
  onToggle,
  officeChecks,
  customerName,
  hasCertificate,
  invoice,
}: {
  send: boolean;
  onSend: (v: boolean) => void;
  summary: string;
  onSummary: (v: string) => void;
  photos: OutboxPhoto[];
  photosAllowed: boolean;
  chosen: number[];
  onToggle: (i: number) => void;
  officeChecks: boolean;
  customerName: string | null;
  hasCertificate: boolean;
  invoice: 'none' | 'invoice' | 'pay_link';
}) {
  return (
    <WorkerPanel className="space-y-4 px-4 py-4 sm:px-5">
      <div className="flex items-start gap-3" data-testid="job-done-customer-message">
        <Mail className="mt-0.5 h-5 w-5 shrink-0 text-white" />
        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-white">Email the customer a summary</p>
          {customerName && <p className="text-[13px] text-white">To {customerName}</p>}
          <p className="mt-1 text-[13px] leading-snug text-white">
            {officeChecks
              ? 'Your firm checks it in the office before it goes.'
              : 'It goes when this reaches the office, even if you have no signal now.'}
            {hasCertificate ? ' The certificate is added once it is issued.' : ''}
            {invoice !== 'none' ? ' The invoice is added once the office has sent it.' : ''}
          </p>
        </div>
      </div>
      {/* A neutral choice: Job done in the footer is the only yellow on this step. */}
      <div role="radiogroup" aria-label="Email the customer" className="grid grid-cols-2 gap-2">
        {[
          { v: true, l: 'Send it' },
          { v: false, l: 'Don’t send' },
        ].map((o) => {
          const on = send === o.v;
          return (
            <button
              key={String(o.v)}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onSend(o.v)}
              className={cn(
                'flex h-11 items-center justify-center gap-2 rounded-xl border text-[14px] text-white touch-manipulation transition-colors',
                on
                  ? 'border-white/60 bg-white/[0.1] font-semibold'
                  : 'border-white/[0.12] bg-white/[0.03] font-medium hover:bg-white/[0.06]'
              )}
            >
              {on && <Check className="h-4 w-4 shrink-0" aria-hidden />}
              {o.l}
            </button>
          );
        })}
      </div>
      {send && (
        <>
          <div>
            <label className={labelCn} htmlFor="jd-cm-summary">
              What you did, for the customer
            </label>
            <textarea
              id="jd-cm-summary"
              value={summary}
              onChange={(e) => onSummary(e.target.value)}
              maxLength={2000}
              placeholder="e.g. Replaced your consumer unit with a new RCBO board, labelled every circuit and tested the lot. All safe."
              className={cn(textareaCn, 'min-h-[96px]')}
            />
          </div>
          {photosAllowed && photos.length > 0 && (
            <div>
              <p className="mb-2 text-[13px] font-semibold text-white">
                Photos in the email{' '}
                <span className="font-normal">
                  ({chosen.length} chosen, up to {MAX_CUSTOMER_PHOTOS})
                </span>
              </p>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {photos.map((p, i) => (
                  <PickThumb
                    key={i}
                    photo={p}
                    on={chosen.includes(i)}
                    onToggle={() => onToggle(i)}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </WorkerPanel>
  );
}

function PickThumb({
  photo,
  on,
  onToggle,
}: {
  photo: OutboxPhoto;
  on: boolean;
  onToggle: () => void;
}) {
  const url = useMemo(() => URL.createObjectURL(photo.blob), [photo.blob]);
  useEffect(() => () => URL.revokeObjectURL(url), [url]);
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? 'In the email. Tap to leave out' : 'Not in the email. Tap to add'}
      onClick={onToggle}
      className={cn(
        'relative aspect-square overflow-hidden rounded-xl border-2 touch-manipulation',
        on ? 'border-white' : 'border-transparent opacity-50'
      )}
    >
      <img src={url} alt="" className="h-full w-full object-cover" />
      {on && (
        <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-black">
          <Check className="h-3.5 w-3.5" />
        </span>
      )}
    </button>
  );
}

function Summary({
  hasChecks,
  photos,
  cert,
  certs,
  extras,
  net,
  vat,
  signedBy,
  absentReason,
}: {
  hasChecks: boolean;
  photos: number;
  cert: CertificateChoice | null;
  certs: number;
  extras: number;
  net: number;
  vat: number;
  signedBy: string | null;
  absentReason: string | null;
}) {
  const rows: [string, string][] = [
    ['Completion checks', hasChecks ? 'Done' : 'None on this job'],
    ['Photos', photos === 0 ? 'None' : photos === 1 ? '1 photo' : `${photos} photos`],
    [
      'Certificate',
      cert === 'linked'
        ? certs === 1
          ? 'On the job'
          : `${certs} on the job`
        : cert === 'started'
          ? 'Started, finishing later'
          : cert === 'later'
            ? 'To do later'
            : cert === 'not_needed'
              ? 'Not needed'
              : 'Not chosen yet',
    ],
    [
      'Extras',
      extras === 0
        ? 'None'
        : `${extras === 1 ? '1 item' : `${extras} items`}, ${gbp(net)}${vat > 0 ? ' + VAT' : ''}`,
    ],
    [
      'Customer',
      signedBy
        ? `Signed by ${signedBy}`
        : absentReason
          ? `Not signed: ${absentReason}`
          : 'Not signed yet',
    ],
  ];
  return (
    <WorkerPanel className="divide-y divide-white/[0.07]">
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-start justify-between gap-3 px-4 py-3 sm:px-5">
          <span className="text-[13.5px] text-white">{k}</span>
          <span className="text-right text-[13.5px] font-semibold text-white">{v}</span>
        </div>
      ))}
    </WorkerPanel>
  );
}

function ExtrasStep({
  extras,
  setExtras,
  priceList,
  vatRegistered,
}: {
  extras: JobDoneExtra[];
  setExtras: (fn: (x: JobDoneExtra[]) => JobDoneExtra[]) => void;
  priceList: { item_id: string; name: string; unit: string; price: number }[];
  vatRegistered: boolean;
}) {
  const [q, setQ] = useState('');
  const [custom, setCustom] = useState(false);
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const matches = useMemo(() => {
    const t = q.trim().toLowerCase();
    const list = t ? priceList.filter((p) => p.name.toLowerCase().includes(t)) : priceList;
    return list.slice(0, 8);
  }, [q, priceList]);
  const net = extrasTotal(extras);

  const add = (x: Omit<JobDoneExtra, 'key'>) =>
    setExtras((all) => {
      const same = x.item_id ? all.find((a) => a.item_id === x.item_id) : null;
      if (same) return all.map((a) => (a === same ? { ...a, quantity: a.quantity + 1 } : a));
      return [...all, { ...x, key: newClientId() }];
    });
  const setQty = (key: string, qty: number) =>
    setExtras((all) =>
      qty <= 0
        ? all.filter((a) => a.key !== key)
        : all.map((a) => (a.key === key ? { ...a, quantity: qty } : a))
    );

  return (
    <div className="space-y-4">
      <StepIntro
        title="Extras done today"
        text={`Anything the customer asked for on the day. Prices come from your firm’s price book${vatRegistered ? ' and are before VAT' : ''}. The customer agrees them when they sign.`}
      />

      {extras.length > 0 && (
        <WorkerPanel className="divide-y divide-white/[0.07]">
          {extras.map((x) => (
            <div key={x.key} className="flex items-center gap-3 px-4 py-3 sm:px-5">
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-semibold leading-snug text-white">{x.description}</p>
                <p className="mt-0.5 text-[13px] text-white">
                  {gbp(x.unit_price)} {x.unit !== 'each' ? `per ${x.unit}` : 'each'} ·{' '}
                  {gbp(x.quantity * x.unit_price)}
                </p>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  aria-label="One fewer"
                  onClick={() => setQty(x.key, x.quantity - 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.12] touch-manipulation"
                >
                  {x.quantity <= 1 ? (
                    <Trash2 className="h-4 w-4 text-white" />
                  ) : (
                    <Minus className="h-4 w-4 text-white" />
                  )}
                </button>
                <span className="w-9 text-center text-[15px] font-semibold tabular-nums text-white">
                  {x.quantity}
                </span>
                <button
                  type="button"
                  aria-label="One more"
                  onClick={() => setQty(x.key, x.quantity + 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.12] touch-manipulation"
                >
                  <Plus className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between px-4 py-3 sm:px-5">
            <span className="text-[14px] font-semibold text-white">Extras</span>
            <span className="text-[15px] font-semibold tabular-nums text-white">
              {gbp(net)}
              {vatRegistered ? ' + VAT' : ''}
            </span>
          </div>
        </WorkerPanel>
      )}

      {priceList.length > 0 && (
        <div>
          <label className={labelCn} htmlFor="jd-search">
            Add from the price book
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-1 top-3 h-5 w-5 text-white" />
            <input
              id="jd-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search, e.g. socket, RCBO"
              className={cn(inputCn, 'pl-8')}
              autoComplete="off"
            />
          </div>
          <WorkerPanel className="mt-2 divide-y divide-white/[0.07]">
            {matches.length === 0 ? (
              <p className="px-4 py-3 text-[13.5px] text-white sm:px-5">Nothing matches.</p>
            ) : (
              matches.map((p) => (
                <button
                  key={p.item_id}
                  type="button"
                  onClick={() =>
                    add({
                      item_id: p.item_id,
                      description: p.name,
                      quantity: 1,
                      unit: p.unit,
                      unit_price: p.price,
                    })
                  }
                  className="flex min-h-[52px] w-full items-center gap-3 px-4 py-2.5 text-left touch-manipulation sm:px-5"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14.5px] font-semibold leading-snug text-white">
                      {p.name}
                    </span>
                    <span className="block text-[12.5px] text-white">
                      {gbp(p.price)} {p.unit !== 'each' ? `per ${p.unit}` : 'each'}
                    </span>
                  </span>
                  <Plus className="h-5 w-5 shrink-0 text-elec-yellow" />
                </button>
              ))
            )}
          </WorkerPanel>
        </div>
      )}

      {!custom ? (
        <button
          type="button"
          onClick={() => setCustom(true)}
          className={cn(buttonSecondaryCn, 'flex w-full items-center justify-center gap-2')}
        >
          <Plus className="h-5 w-5" />
          Something not in the price book
        </button>
      ) : (
        <WorkerPanel className="space-y-3 px-4 py-4 sm:px-5">
          <div>
            <label className={labelCn} htmlFor="jd-desc">
              What was done
            </label>
            <input
              id="jd-desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              maxLength={200}
              placeholder="e.g. Move the doorbell transformer"
              className={inputCn}
            />
          </div>
          <div>
            <label className={labelCn} htmlFor="jd-price">
              Price{vatRegistered ? ' before VAT' : ''} (£)
            </label>
            <input
              id="jd-price"
              value={price}
              onChange={(e) => setPrice(e.target.value.replace(/[^\d.]/g, ''))}
              inputMode="decimal"
              placeholder="0.00"
              className={inputCn}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setCustom(false)}
              className={cn(buttonSecondaryCn, 'px-5')}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!desc.trim() || !(Number(price) > 0)}
              onClick={() => {
                add({
                  item_id: null,
                  description: desc.trim(),
                  quantity: 1,
                  unit: 'each',
                  unit_price: Math.round(Number(price) * 100) / 100,
                });
                setDesc('');
                setPrice('');
                setCustom(false);
              }}
              className={cn(buttonPrimaryCn, 'flex-1')}
            >
              Add it
            </button>
          </div>
        </WorkerPanel>
      )}
    </div>
  );
}

/* ── On the job page ───────────────────────────────────────────────────── */

/** Whether "Job done" is open to this person on this job (for the page's buttons). */
export function useJobDoneAvailable(jobId: string) {
  const { data: ctx } = useJobDoneContext(jobId);
  const { pending } = useWorkerOutbox();
  const queued = pending.find((o) => o.kind === 'job_done' && o.jobId === jobId) ?? null;
  return {
    ctx,
    queued,
    available: !!ctx?.allowed && !ctx.closed && !queued,
  };
}

/**
 * The job page's "Job done" block: the button, or "saved on this phone" while
 * it waits for signal, or who finished it and when.
 */
export function JobDonePanel({
  jobId,
  jobTitle,
  clientName,
  address,
  phone,
}: {
  jobId: string;
  jobTitle: string;
  clientName?: string | null;
  address?: string | null;
  phone?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const { ctx, queued, available } = useJobDoneAvailable(jobId);
  // Gap #3 (#20): back from a certificate started in Job done: carry on.
  const [params, setParams] = useSearchParams();
  const resume = params.get('jobdone') === 'resume';
  // My jobs renders the job twice (phone and desktop layouts, one hidden):
  // only the one on screen reopens.
  const probe = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Wait for the job's Job done details (from the phone's copy with no signal).
    if (!resume || !ctx) return;
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('jobdone');
        return next;
      },
      { replace: true }
    );
    if (available && probe.current && probe.current.offsetParent !== null) {
      setOpen(true);
      toast.message('Back in Job done', { description: 'Everything you did is still here.' });
    }
  }, [resume, ctx, available, setParams]);
  // Always mounted, so the flow can finish (and close) after the block swaps.
  const sheet = (
    <JobDoneSheet
      open={open}
      onOpenChange={setOpen}
      jobId={jobId}
      jobTitle={jobTitle}
      clientName={clientName}
      address={address}
      phone={phone}
    />
  );

  let block: ReactNode = null;
  if (queued) {
    block = (
      <WorkerPanel className="px-4 py-4 sm:px-5">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-elec-yellow text-black">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-white">Job done is saved on this phone</p>
            <p className="mt-0.5 text-[13px] leading-snug text-white">
              It sends by itself when you have signal, once. No need to do it again.
            </p>
          </div>
        </div>
      </WorkerPanel>
    );
  } else if (ctx?.closed && ctx.last_completion) {
    const at = new Date(ctx.last_completion.completed_at);
    block = (
      <WorkerPanel className="px-4 py-4 sm:px-5">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-black">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-white">Job done</p>
            <p className="mt-0.5 text-[13px] leading-snug text-white">
              Finished on site by {ctx.last_completion.by || 'the crew'} at{' '}
              {at.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} on{' '}
              {at.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}. The office has
              it.
            </p>
          </div>
        </div>
      </WorkerPanel>
    );
  } else if (available) {
    block = (
      <button
        type="button"
        data-testid="job-done-open"
        data-help="wt-jobs.jobdone"
        onClick={() => setOpen(true)}
        className={cn(
          buttonPrimaryCn,
          'flex h-auto min-h-[64px] w-full flex-col items-center justify-center rounded-2xl px-4 py-3'
        )}
      >
        <span className="flex items-center gap-2 text-[16px] font-bold">
          <CheckCircle2 className="h-5 w-5" />
          Job done
        </span>
        <span className="text-[12.5px] font-medium">
          Checks, photos, certificate, signature and extras in one go
        </span>
      </button>
    );
  }
  if (!block && !open) return null;
  return (
    <>
      {block && <div ref={probe}>{block}</div>}
      {sheet}
    </>
  );
}
