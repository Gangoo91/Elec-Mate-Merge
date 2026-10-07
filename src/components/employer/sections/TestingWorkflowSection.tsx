import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CertNextSteps } from '@/components/employer/jobs/CertNextSteps';
import { RefreshCw, Briefcase, Link2, Search, ShieldCheck, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useJobContext } from '@/hooks/useJobContext';
import { useJobs } from '@/hooks/useJobs';
import { JobContextBar } from '@/components/employer/JobContextBar';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { TESTING_HELP } from '@/components/employer/help/jobs-quality';
import { FormSheet } from '@/components/forms/FormSheet';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { ReportPdfViewer } from '@/components/reports/ReportPdfViewer';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  EmptyState,
  LoadingBlocks,
  IconButton,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  inputClass,
} from '@/components/employer/editorial';
import {
  useJobCertificates,
  useLinkableCertificates,
  useLinkCertificate,
  useUnlinkCertificate,
  type JobCertificate,
} from '@/hooks/useJobCertificates';
import { summariseCertTests, type CertTestSummary } from '@/utils/certTestSummary';
import { QsStatusBadge, ReturnReasonList } from '@/components/employer/qs/returnReasons';
import { formatUKDate } from '@/utils/collegeHelpers';

/* ==========================================================================
   Testing (ELE-1973)

   The certificates raised on each job, read straight from the certificate:
   circuits, readings, and every reading judged by the cert's own BS 7671
   checks (certTestSummary → testValidation). The office links a team
   certificate to a job here or from the job sheet; the electrician keeps
   testing on the certificate in the Electrical Hub as before. The old
   hand-typed test log (job_tests, never used) is retired.
   ========================================================================== */

const TYPE_LABEL: Record<string, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'Minor Works',
};

const CERT_STATUS: Record<string, string> = {
  completed: 'Completed',
  'in-progress': 'In progress',
  draft: 'Draft',
  'auto-draft': 'Draft',
};

type Filter = 'all' | 'attention' | 'waiting' | 'approved';

interface Row {
  cert: JobCertificate;
  summary: CertTestSummary;
  attention: boolean;
}

const cardCn =
  'rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03]';

function calibrationLine(cert: JobCertificate): { text: string; overdue: boolean } | null {
  if (!cert.kit) return null;
  const due = cert.kit.next_calibration;
  if (!due) return { text: `${cert.kit.name} in the kit register. No calibration date.`, overdue: false };
  const overdue = new Date(due).getTime() < Date.now();
  return {
    text: `${cert.kit.name} in the kit register. Calibration ${overdue ? 'was due' : 'due'} ${formatUKDate(due)}.`,
    overdue,
  };
}

/* ── Summary line + failing circuits on a card ────────────────────────── */

function SummaryLine({ s }: { s: CertTestSummary }) {
  if (s.circuits === 0) {
    return <p className="text-[13px] text-white">No circuits recorded on the schedule yet.</p>;
  }
  return (
    <div className="grid grid-cols-3 gap-2">
      {[
        { label: 'Circuits', value: s.circuits },
        { label: 'Fully tested', value: `${s.tested}/${s.circuits}` },
        { label: 'Out of limit', value: s.failed },
      ].map((t) => (
        <div
          key={t.label}
          className={cn(
            'rounded-xl border px-3 py-2.5',
            t.label === 'Out of limit' && s.failed > 0
              ? 'border-red-500/50 bg-red-500/10'
              : 'border-white/[0.1] bg-white/[0.03]'
          )}
        >
          <p className="text-[18px] font-semibold tabular-nums text-white leading-none">{t.value}</p>
          <p className="mt-1.5 text-[11px] font-medium text-white">{t.label}</p>
        </div>
      ))}
    </div>
  );
}

function CertCard({ row, onOpen }: { row: Row; onOpen: () => void }) {
  const { cert, summary } = row;
  const failing = summary.checks.filter((c) => c.status === 'fail');
  const qs = cert.qs?.status ?? 'none';
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        cardCn,
        'w-full text-left p-4 space-y-3 touch-manipulation transition-colors hover:border-white/[0.3] focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
        row.attention && 'border-red-500/40'
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="shrink-0 rounded-md border border-white/[0.2] px-1.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white">
          {TYPE_LABEL[cert.report_type] || cert.report_type}
        </span>
        {cert.certificate_number && (
          <span className="min-w-0 truncate font-mono text-[11.5px] text-white">{cert.certificate_number}</span>
        )}
        <span className="ml-auto flex items-center gap-1.5">
          <QsStatusBadge status={qs} />
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-[15px] font-semibold tracking-tight text-white truncate">
          {cert.client_name || cert.job_client || 'No client name'}
        </p>
        <p className="text-[12.5px] text-white truncate">{cert.installation_address || 'No address'}</p>
      </div>
      <SummaryLine s={summary} />
      {failing.length > 0 && (
        <ul className="space-y-1.5">
          {failing.slice(0, 3).map((c) => (
            <li key={c.key} className="flex items-start gap-2 text-[12.5px] text-white">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" aria-hidden />
              <span className="min-w-0">
                <span className="font-semibold">{c.label}.</span> {c.fails[0]}
              </span>
            </li>
          ))}
          {failing.length > 3 && (
            <li className="text-[12.5px] text-white">And {failing.length - 3} more out of limit.</li>
          )}
        </ul>
      )}
      {qs === 'returned' && <ReturnReasonList codes={cert.qs?.return_reasons} />}
      <div className="flex items-center justify-between gap-2 border-t border-white/[0.08] pt-3">
        <span className="min-w-0 truncate text-[12px] text-white">
          {cert.owner_name} · {CERT_STATUS[cert.status] ?? cert.status}
          {cert.inspection_date ? ` · ${formatUKDate(cert.inspection_date)}` : ''}
        </span>
        <span className="shrink-0 text-[12.5px] font-semibold text-elec-yellow">Open</span>
      </div>
    </button>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */

export function TestingWorkflowSection() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { jobId, job } = useJobContext();
  const { data: certs = [], isLoading, isError, refetch, isFetching } = useJobCertificates(jobId);
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const [linkOpen, setLinkOpen] = useState(false);
  // ELE-1832: ?cert=<report uuid> (the "signed off" bell) opens that certificate.
  const [params, setParams] = useSearchParams();
  const certParam = params.get('cert');
  useEffect(() => {
    if (!certParam || !certs.some((c) => c.report_uuid === certParam)) return;
    setOpenId(certParam);
    const next = new URLSearchParams(params);
    next.delete('cert');
    setParams(next, { replace: true });
  }, [certParam, certs, params, setParams]);

  const rows: Row[] = useMemo(
    () =>
      certs.map((cert) => {
        const summary = summariseCertTests(cert.report_type, cert.data);
        const attention =
          summary.failed > 0 || cert.qs?.status === 'returned' || (summary.circuits > 0 && summary.incomplete > 0);
        return { cert, summary, attention };
      }),
    [certs]
  );

  const totals = useMemo(() => {
    let circuits = 0;
    let tested = 0;
    let failed = 0;
    for (const r of rows) {
      circuits += r.summary.circuits;
      tested += r.summary.tested;
      failed += r.summary.failed;
    }
    return {
      circuits,
      tested,
      failed,
      attention: rows.filter((r) => r.attention).length,
      waiting: rows.filter((r) => r.cert.qs?.status === 'pending' || (!r.cert.qs && r.cert.status !== 'completed')).length,
      approved: rows.filter((r) => r.cert.qs?.status === 'approved').length,
    };
  }, [rows]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter === 'attention' && !r.attention) return false;
      if (filter === 'waiting' && !(r.cert.qs?.status === 'pending' || (!r.cert.qs && r.cert.status !== 'completed')))
        return false;
      if (filter === 'approved' && r.cert.qs?.status !== 'approved') return false;
      if (!q) return true;
      return [r.cert.client_name, r.cert.installation_address, r.cert.certificate_number, r.cert.owner_name, r.cert.job_title]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    });
  }, [rows, filter, search]);

  // Group by job when looking across every job.
  const groups = useMemo(() => {
    if (jobId) return [{ jobId, title: job?.title ?? 'This job', rows: filtered }];
    const map = new Map<string, { jobId: string; title: string; rows: Row[] }>();
    for (const r of filtered) {
      const g = map.get(r.cert.job_id) ?? { jobId: r.cert.job_id, title: r.cert.job_title || 'Job', rows: [] };
      g.rows.push(r);
      map.set(r.cert.job_id, g);
    }
    return [...map.values()];
  }, [filtered, jobId, job?.title]);

  const openRow = rows.find((r) => r.cert.report_uuid === openId) ?? null;

  const helpBlockers: HelpBlocker[] = [];
  if (!isLoading && !isError && certs.length === 0) {
    helpBlockers.push({
      text: jobId
        ? 'No certificates are on this job yet. Link the one your electrician made for it.'
        : 'No certificates are linked to a job yet. Open a job and link its certificate.',
      fixLabel: 'Link a certificate',
      onFix: () => setLinkOpen(true),
    });
  }

  const refresh = () => {
    refetch();
    queryClient.invalidateQueries({ queryKey: ['linkable-certificates'] });
  };

  return (
    <PageFrame>
      <PageHero
        eyebrow="Jobs"
        title="Testing"
        description="The certificates on each job, with every reading checked against the certificate's own BS 7671 limits."
        actions={
          <>
            <PrimaryButton data-help="testing.link" onClick={() => setLinkOpen(true)}>
              <Link2 className="h-4 w-4 mr-2" />
              Link a certificate
            </PrimaryButton>
            <IconButton onClick={refresh} aria-label="Refresh">
              <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
            </IconButton>
            <PageHelpButton help={TESTING_HELP} blockers={helpBlockers} askContext={{ page: 'testing', tab: filter }} />
          </>
        }
      />

      <HowItWorks help={TESTING_HELP} blockers={helpBlockers} askContext={{ page: 'testing', tab: filter }} />

      <JobContextBar what="Certificates" />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Certificates', value: certs.length, sub: jobId ? 'On this job' : 'Across your jobs', onClick: () => setFilter('all') },
          {
            label: 'Circuits tested',
            value: totals.circuits ? `${totals.tested}/${totals.circuits}` : 0,
            sub: 'All core tests recorded',
          },
          {
            label: 'Out of limit',
            value: totals.failed,
            sub: totals.failed ? 'Circuits failing a check' : 'Nothing failing',
            onClick: () => setFilter('attention'),
          },
          {
            label: 'Waiting',
            value: totals.waiting,
            sub: 'Not finished or with the QS',
            onClick: () => setFilter('waiting'),
          },
        ]}
      />

      <div className="space-y-5">
        {isError && (
          <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 px-4 py-4 space-y-3">
            <p className="text-sm text-white">Couldn&apos;t load the certificates. Check your connection and try again.</p>
            <SecondaryButton onClick={() => refetch()}>Try again</SecondaryButton>
          </div>
        )}

        <div data-help="testing.tabs">
          <FilterBar
            tabs={[
              { value: 'all', label: 'All', count: rows.length },
              { value: 'attention', label: 'Needs attention', count: totals.attention },
              { value: 'waiting', label: 'Waiting', count: totals.waiting },
              { value: 'approved', label: 'QS approved', count: totals.approved },
            ]}
            activeTab={filter}
            onTabChange={(v) => setFilter(v as Filter)}
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search client, address, certificate, job"
          />
        </div>

        {isLoading ? (
          <LoadingBlocks />
        ) : isError ? null : rows.length === 0 ? (
          <EmptyState
            title={jobId ? 'No certificates on this job yet' : 'No certificates on any job yet'}
            description="Your electricians test on the certificate in the Electrical Hub as normal. Link the certificate to its job here and its results show up, checked against BS 7671."
            action="Link a certificate"
            onAction={() => setLinkOpen(true)}
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="Nothing matches"
            description={search.trim() ? 'Try another client, address or certificate number.' : 'No certificates in this view.'}
          />
        ) : (
          <div className="space-y-8" data-help="testing.list">
            {groups.map((g) => (
              <section key={g.jobId} className="space-y-3">
                {!jobId && (
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="min-w-0 truncate text-[15px] font-semibold tracking-tight text-white">{g.title}</h2>
                    <button
                      type="button"
                      onClick={() => navigate(`/employer?section=jobs&job=${g.jobId}`)}
                      className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
                    >
                      <Briefcase className="h-3.5 w-3.5" />
                      Open job
                    </button>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {g.rows.map((r) => (
                    <CertCard key={r.cert.report_uuid} row={r} onOpen={() => setOpenId(r.cert.report_uuid)} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      <CertDetailSheet row={openRow} onClose={() => setOpenId(null)} />
      <LinkCertificateSheet open={linkOpen} onOpenChange={setLinkOpen} presetJobId={jobId} />
    </PageFrame>
  );
}

/* ── Certificate detail ───────────────────────────────────────────────── */

function CertDetailSheet({ row, onClose }: { row: Row | null; onClose: () => void }) {
  const navigate = useNavigate();
  const unlink = useUnlinkCertificate();
  const [pdfOpen, setPdfOpen] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const cert = row?.cert;
  const s = row?.summary;
  const cal = cert ? calibrationLine(cert) : null;

  const close = () => {
    setConfirmRemove(false);
    setShowAll(false);
    onClose();
  };

  const ordered = s
    ? [...s.checks].sort((a, b) => {
        const rank = (c: typeof a) => (c.status === 'fail' ? 0 : c.missing.length ? 1 : c.status === 'warning' ? 2 : 3);
        return rank(a) - rank(b);
      })
    : [];
  const needsLook = ordered.filter((c) => c.status === 'fail' || c.missing.length > 0);
  const visible = showAll || needsLook.length === 0 ? ordered : needsLook;

  return (
    <FormSheet
      open={!!row}
      onOpenChange={(o) => !o && close()}
      width="wide"
      eyebrow={cert ? `${TYPE_LABEL[cert.report_type] || cert.report_type}${cert.certificate_number ? ` ${cert.certificate_number}` : ''}` : undefined}
      title={cert?.client_name || cert?.job_client || 'Certificate'}
      description={cert?.installation_address || undefined}
    >
      {cert && s && (
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8 space-y-5 lg:space-y-0">
          <div className="space-y-4 min-w-0">
            <SummaryLine s={s} />
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[15px] font-semibold tracking-tight text-white">
                {needsLook.length > 0 && !showAll ? 'Circuits to look at' : 'Every circuit'}
              </h3>
              {needsLook.length > 0 && needsLook.length < ordered.length && (
                <button
                  type="button"
                  onClick={() => setShowAll((v) => !v)}
                  className="h-11 px-2 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
                >
                  {showAll ? 'Only the ones to look at' : `Show all ${ordered.length}`}
                </button>
              )}
            </div>
            {ordered.length === 0 ? (
              <p className="text-[13px] text-white">No circuits on the schedule yet.</p>
            ) : (
              <ul className="space-y-2" data-help="testing.circuits">
                {visible.map((c) => (
                  <li
                    key={c.key}
                    className={cn(
                      'rounded-xl border p-3 space-y-2',
                      c.status === 'fail' ? 'border-red-500/50 bg-red-500/[0.08]' : 'border-white/[0.1] bg-white/[0.03]'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="min-w-0 text-[13.5px] font-semibold text-white">{c.label}</p>
                      <span
                        className={cn(
                          'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold text-white',
                          c.status === 'fail'
                            ? 'border-red-400/60'
                            : c.missing.length
                              ? 'border-amber-400/60'
                              : 'border-emerald-400/60'
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            'h-1.5 w-1.5 rounded-full',
                            c.status === 'fail' ? 'bg-red-400' : c.missing.length ? 'bg-amber-400' : 'bg-emerald-400'
                          )}
                        />
                        {c.status === 'fail' ? 'Out of limit' : c.missing.length ? 'Incomplete' : 'Within limits'}
                      </span>
                    </div>
                    {c.readings.length > 0 && (
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {c.readings.map((r) => (
                          <span key={r.label} className="text-[12px] text-white tabular-nums">
                            <span className="font-semibold">{r.label}</span> {r.value}
                          </span>
                        ))}
                      </div>
                    )}
                    {c.fails.map((f) => (
                      <p key={f} className="text-[12.5px] text-white">
                        {f}
                      </p>
                    ))}
                    {c.missing.length > 0 && (
                      <p className="text-[12.5px] text-white">Not recorded: {c.missing.join(', ')}.</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-4 lg:sticky lg:top-0 lg:self-start">
            <CertNextSteps cert={cert} />
            <div className={cn(cardCn, 'p-4 space-y-3')}>
              <h3 className="text-[15px] font-semibold text-white">QS sign-off</h3>
              <QsStatusBadge status={cert.qs?.status ?? 'none'} />
              {cert.qs?.reviewer_name && cert.qs.status !== 'pending' && (
                <p className="text-[13px] text-white">
                  {cert.qs.status === 'approved' ? 'Approved' : 'Returned'} by {cert.qs.reviewer_name}
                  {cert.qs.reviewed_at ? ` on ${formatUKDate(cert.qs.reviewed_at)}` : ''}.
                </p>
              )}
              <ReturnReasonList codes={cert.qs?.return_reasons} />
              {cert.qs ? (
                <SecondaryButton
                  fullWidth
                  onClick={() => {
                    close();
                    navigate(`/employer?section=qsreviews&review=${cert.qs!.review_id}`);
                  }}
                >
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Open in QS reviews
                </SecondaryButton>
              ) : (
                <p className="text-[13px] text-white">
                  Not sent for QS sign-off. The electrician sends it from the certificate.
                </p>
              )}
            </div>

            <div className={cn(cardCn, 'p-4 space-y-2')}>
              <h3 className="text-[15px] font-semibold text-white">Instrument</h3>
              {s.instrument ? (
                <p className="text-[13px] text-white">
                  {[s.instrument.make, s.instrument.serial ? `serial ${s.instrument.serial}` : null]
                    .filter(Boolean)
                    .join(', ')}
                </p>
              ) : (
                <p className="text-[13px] text-white">No instrument recorded on the certificate.</p>
              )}
              {cal ? (
                <p className={cn('text-[13px] text-white', cal.overdue && 'font-semibold')}>
                  {cal.overdue ? 'Calibration overdue. ' : ''}
                  {cal.text}
                </p>
              ) : s.instrument?.serial ? (
                <p className="text-[13px] text-white">That serial is not in your kit register.</p>
              ) : null}
              {s.earthing && <p className="text-[13px] text-white">Earthing: {s.earthing.toUpperCase()}</p>}
            </div>

            <div className={cn(cardCn, 'p-4 space-y-3')}>
              <p className="text-[13px] text-white">
                Made by {cert.owner_name}
                {cert.inspection_date ? ` on ${formatUKDate(cert.inspection_date)}` : ''}. Linked to{' '}
                {cert.job_title || 'this job'} by {cert.linked_by_name}.
              </p>
              <div className="flex flex-col gap-2">
                <SecondaryButton fullWidth onClick={() => setPdfOpen(true)}>
                  View PDF
                </SecondaryButton>
                {!confirmRemove ? (
                  <SecondaryButton fullWidth onClick={() => setConfirmRemove(true)}>
                    Remove from this job
                  </SecondaryButton>
                ) : (
                  <DestructiveButton
                    fullWidth
                    disabled={unlink.isPending}
                    onClick={async () => {
                      try {
                        await unlink.mutateAsync({ reportUuid: cert.report_uuid });
                        toast({ title: 'Removed from the job', description: 'The certificate itself is unchanged.' });
                        close();
                      } catch (e) {
                        toast({
                          title: 'Could not remove it',
                          description: e instanceof Error ? e.message : 'Please try again.',
                          variant: 'destructive',
                        });
                      }
                    }}
                  >
                    Yes, remove it from the job
                  </DestructiveButton>
                )}
              </div>
              <ReportPdfViewer reportId={cert.report_id} open={pdfOpen} onOpenChange={setPdfOpen} />
            </div>
          </div>
        </div>
      )}
    </FormSheet>
  );
}

/* ── Link a certificate ───────────────────────────────────────────────── */

function LinkCertificateSheet({
  open,
  onOpenChange,
  presetJobId,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  presetJobId: string | null;
}) {
  const { data: jobs = [] } = useJobs();
  const [pickedJob, setPickedJob] = useState('');
  const jobId = presetJobId ?? (pickedJob || null);
  const [search, setSearch] = useState('');
  const { data: options = [], isLoading } = useLinkableCertificates(jobId, search, open);
  const link = useLinkCertificate();
  const job = jobs.find((j) => j.id === jobId);

  const jobOptions = useMemo(
    () =>
      jobs
        .filter((j) => !j.archived_at && !j.is_template)
        .map((j) => ({ value: j.id, label: j.title || 'Untitled job', description: [j.client, j.location].filter(Boolean).join(' · ') })),
    [jobs]
  );

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Testing"
      title="Link a certificate"
      description={
        job
          ? `To ${job.title}. Certificates your team made that are not on a job yet, best match first.`
          : 'Pick the job, then the certificate your electrician made for it.'
      }
    >
      <div className="lg:grid lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-8 space-y-5 lg:space-y-0">
        <div className="space-y-4">
          {!presetJobId && (
            <div className="space-y-1.5" data-help="testing.link-job">
              <label className="text-[12px] font-medium text-white block">Job</label>
              <MobileSelectPicker
                value={pickedJob}
                onValueChange={setPickedJob}
                options={jobOptions}
                placeholder="Choose a job"
                title="Choose a job"
              />
            </div>
          )}
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-white block">Search</label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white" aria-hidden />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Client, address or certificate number"
                className={cn(inputClass, 'pl-7')}
              />
            </div>
          </div>
          <p className="text-[12.5px] text-white">
            Only EICR, EIC and Minor Works made by you or your team in the last 18 months show here.
            Linking does not change the certificate.
          </p>
        </div>

        <div className="space-y-2" data-help="testing.link-list">
          {!jobId ? (
            <EmptyState title="Choose a job first" description="Then pick the certificate for it." />
          ) : isLoading ? (
            <LoadingBlocks />
          ) : options.length === 0 ? (
            <EmptyState
              title="No certificates to link"
              description={
                search.trim()
                  ? 'Nothing matches that search.'
                  : 'Every recent team certificate is already on a job, or none has been started yet.'
              }
            />
          ) : (
            options.map((o) => (
              <div key={o.report_uuid} className={cn(cardCn, 'flex items-center gap-3 p-3.5')}>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md border border-white/[0.2] px-1.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white">
                      {TYPE_LABEL[o.report_type] || o.report_type}
                    </span>
                    {o.score > 0 && (
                      <span className="rounded-full bg-elec-yellow px-2 py-0.5 text-[11px] font-semibold text-black">
                        Best match
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 truncate text-[14px] font-semibold text-white">{o.client_name || 'No client name'}</p>
                  <p className="truncate text-[12.5px] text-white">{o.installation_address || 'No address'}</p>
                  <p className="truncate text-[12px] text-white">
                    {o.owner_name} · {CERT_STATUS[o.status] ?? o.status}
                    {o.certificate_number ? ` · ${o.certificate_number}` : ''}
                  </p>
                </div>
                <PrimaryButton
                  className="shrink-0"
                  disabled={link.isPending}
                  onClick={async () => {
                    try {
                      await link.mutateAsync({ reportUuid: o.report_uuid, jobId: jobId! });
                      toast({ title: 'Certificate linked', description: 'Its results now show on the job.' });
                      onOpenChange(false);
                    } catch (e) {
                      toast({
                        title: 'Could not link it',
                        description: e instanceof Error ? e.message : 'Please try again.',
                        variant: 'destructive',
                      });
                    }
                  }}
                >
                  Link
                </PrimaryButton>
              </div>
            ))
          )}
        </div>
      </div>
    </FormSheet>
  );
}
