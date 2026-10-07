/**
 * ReportsPage — Worker Tools › Reports
 *
 * Routed page (replaces the old SnagReportSheet bottom sheet). Lets a worker
 * raise a report on a job — a quality snag, a near-miss or a safety incident.
 * Snags land in the snag log; near-miss / incident route to the employer's
 * Incidents log (RIDDOR / H&S).
 *
 * Data layer carried over unchanged from SnagReportSheet: useMyJobs('active'),
 * useSnagReports(selectedJobId), both submit paths (submitSnag vs
 * submitIncident), the validation gate and the recent-reports history.
 */

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { WT_REPORTS_HELP } from '@/components/worker-tools/help/worker-help-2';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import {
  Camera,
  Check,
  Loader2,
  Send,
  MapPin,
  AlertTriangle,
  ShieldAlert,
  Wrench,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  useMyIncidentActions,
  useMyJobs,
  useSnagReports,
  uploadReportPhoto,
} from '@/hooks/useWorkerSelfService';
import { useMyEmployeeRecord } from '@/hooks/useWorkerLocations';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import {
  Eyebrow,
  Field,
  Pill,
  Dot,
  Divider,
  OptionTile,
  StatStrip,
  ListCard,
  ListBody,
  ListRow,
  PrimaryButton,
  SecondaryButton,
  EmptyState,
  LoadingState,
  SuccessCheckmark,
  SplitLayout,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  type Tone,
} from '@/components/employer/editorial';
import { workerTextareaCn } from '@/components/worker-tools/WorkerUi';

const SEVERITY_OPTIONS = [
  { value: 'minor', label: 'Minor', tone: 'blue' as Tone },
  { value: 'moderate', label: 'Moderate', tone: 'amber' as Tone },
  { value: 'critical', label: 'Critical', tone: 'red' as Tone },
];

/** Stored severities come back in the employer's vocabulary ('Low', 'medium',
 *  'Critical'…) — map any spelling onto the three tiles above. */
const severityOption = (sev?: string | null) => {
  const s = (sev || '').toLowerCase();
  if (s === 'critical' || s === 'high') return SEVERITY_OPTIONS[2];
  if (s === 'moderate' || s === 'medium') return SEVERITY_OPTIONS[1];
  if (s === 'minor' || s === 'low') return SEVERITY_OPTIONS[0];
  return null;
};

const RESOLVED_STATUSES = ['resolved', 'closed', 'done', 'fixed'];

type HistoryFilter = 'all' | 'open' | 'resolved';

/** Compact relative timestamp — "just now", "2h ago", "3d ago", else date. */
function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const diff = Date.now() - then;
  const mins = Math.round(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

const isResolved = (status?: string | null) =>
  Boolean(status && RESOLVED_STATUSES.includes(status.toLowerCase()));

export default function ReportsPage() {
  // ?job=<id> deep link (e.g. from My Jobs "Report an issue") pre-selects that job.
  const [searchParams] = useSearchParams();
  const [reportType, setReportType] = useState<'snag' | 'near_miss' | 'incident'>('snag');
  const [selectedJobId, setSelectedJobId] = useState<string>(searchParams.get('job') ?? '');
  const [severity, setSeverity] = useState<string>('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [historyFilter, setHistoryFilter] = useState<HistoryFilter>('all');
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  // "This job" shows every report on the job; "Mine" only what I raised.
  const [scope, setScope] = useState<'job' | 'mine'>('job');
  const myActions = useMyIncidentActions();
  const openActions = (myActions.data ?? []).filter((a) => !a.done_at);

  const { data: jobs, isLoading: jobsLoading } = useMyJobs('active');
  const {
    recentSnags,
    recentIncidents,
    isLoading: recentLoading,
    submitSnag,
    isSubmitting,
    submitIncident,
    isSubmittingIncident,
  } = useSnagReports(selectedJobId);
  const submitting = isSubmitting || isSubmittingIncident || uploadingPhotos;

  // ?incident=<id> deep link (bell / push: report seen, closed, on your team).
  // The notification also sends ?job=, which picks the job above; once that
  // job's safety reports load, scroll to the report and outline it.
  const focusIncident = searchParams.get('incident');
  useEffect(() => {
    if (!focusIncident || recentLoading) return;
    const el = document.getElementById(`incident-${focusIncident}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [focusIncident, recentLoading, recentIncidents]);

  // Same source useSnagReports uses internally, so reported_by matches the
  // rows this page shows.
  const { data: employee } = useMyEmployeeRecord();
  const employeeId = employee?.id;

  // Live: an employer resolving a snag (job_issues) or a near-miss / incident
  // (employer_incidents) this worker reported updates the recent-reports list
  // instantly — no manual reload. Both tables carry reported_by = this worker's
  // roster id; the snag query key is ['snag-reports', jobId, employeeId], so
  // invalidating the ['snag-reports'] prefix refreshes the visible history.
  useRealtimeInvalidate(
    'worker-reports',
    [
      { table: 'job_issues', filter: `reported_by=eq.${employeeId}` },
      { table: 'employer_incidents', filter: `reported_by=eq.${employeeId}` },
    ],
    [['snag-reports'], ['my-incident-reports'], ['my-incident-actions']],
    Boolean(employeeId)
  );

  const REPORT_TYPES = [
    { value: 'snag' as const, label: 'Snag', hint: 'Quality defect' },
    { value: 'near_miss' as const, label: 'Near-miss', hint: 'Safety close call' },
    { value: 'incident' as const, label: 'Incident', hint: 'Safety event' },
  ];
  const isSafety = reportType !== 'snag';
  const activeType = REPORT_TYPES.find((r) => r.value === reportType);
  const typeLabel = activeType?.label.toLowerCase() ?? 'report';
  // Live "Before you start": a report has to go against one of your jobs.
  const helpBlockers: HelpBlocker[] =
    !jobsLoading && (!jobs || jobs.length === 0)
      ? [{ text: 'No active jobs on your name yet. A report has to go against a job, so ask the office to add you.' }]
      : [];

  // Glanceable summary of the chosen job's history — open vs resolved.
  const scopedSnags = useMemo(
    () => (recentSnags ?? []).filter((s) => scope === 'job' || s.reported_by === employeeId),
    [recentSnags, scope, employeeId]
  );
  const summary = useMemo(() => {
    const list = scopedSnags;
    const open = list.filter((s) => !isResolved(s.status)).length;
    return { total: list.length, open, resolved: list.length - open };
  }, [scopedSnags]);

  // Group recent reports: open first, then resolved (newest already from query).
  const grouped = useMemo(() => {
    const list = scopedSnags;
    const openItems = list.filter((s) => !isResolved(s.status));
    const resolvedItems = list.filter((s) => isResolved(s.status));
    return { openItems, resolvedItems };
  }, [scopedSnags]);

  const showOpen = historyFilter !== 'resolved' && grouped.openItems.length > 0;
  const showResolved = historyFilter !== 'open' && grouped.resolvedItems.length > 0;

  // Keeps the job: after a report the worker almost always wants to see it in
  // the history (or raise another on the same job), not pick the job again.
  const resetForm = (clearJob = false) => {
    if (clearJob) setSelectedJobId('');
    setSeverity('');
    setDescription('');
    setLocation('');
    setHistoryFilter('all');
    setPhotoFiles([]);
  };

  // Inline validation — surfaced under the submit button, not just on press.
  const validationHint = !selectedJobId
    ? 'Choose a job to report against'
    : !severity
      ? 'Pick a severity'
      : !description.trim()
        ? 'Describe what happened'
        : null;
  const canSubmit = !validationHint;

  const handleSubmit = async () => {
    if (!selectedJobId) {
      toast.error('Please select a job');
      return;
    }
    if (!severity) {
      toast.error('Please select severity');
      return;
    }
    if (!description.trim()) {
      toast.error('Please describe what happened');
      return;
    }

    const label = activeType?.label ?? 'Report';
    try {
      let photos: string[] = [];
      if (photoFiles.length > 0) {
        setUploadingPhotos(true);
        try {
          photos = await Promise.all(photoFiles.map((f) => uploadReportPhoto(selectedJobId, f)));
        } finally {
          setUploadingPhotos(false);
        }
      }
      if (isSafety) {
        await submitIncident({
          jobId: selectedJobId,
          severity,
          description: description.trim(),
          location: location.trim() || undefined,
          incidentType: reportType,
          photos,
        });
      } else {
        await submitSnag({
          jobId: selectedJobId,
          severity,
          description: description.trim(),
          location: location.trim() || undefined,
          photos,
        });
      }
      setJustSubmitted(true);
      window.setTimeout(() => setJustSubmitted(false), 1400);
      toast.success(`${label} submitted`, {
        description: isSafety
          ? 'The office has been told. You will hear when they have seen it and when it is closed.'
          : 'It is on the snag list. You will see here when it is put right.',
      });
      resetForm();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : `Failed to submit ${label.toLowerCase()}`);
    }
  };

  const getSeverityPill = (sev: string) => {
    const option = severityOption(sev);
    if (!option) return null;
    return <Pill tone={option.tone}>{option.label}</Pill>;
  };

  const HISTORY_FILTERS: { value: HistoryFilter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: summary.total },
    { value: 'open', label: 'Open', count: summary.open },
    { value: 'resolved', label: 'Resolved', count: summary.resolved },
  ];

  return (
    <WorkerToolPage
      eyebrow="Report"
      title="Reports"
      description="Raise a quality snag, a near-miss or a safety incident on a job."
      actions={<PageHelpButton help={WT_REPORTS_HELP} blockers={helpBlockers} />}
    >
      <HowItWorks help={WT_REPORTS_HELP} blockers={helpBlockers} />
      <SuccessCheckmark show={justSubmitted} />

      {/* Safety actions the office has given me (ELE-1945). Top of the page:
          the push notification lands here, so it must be the first thing seen. */}
      {openActions.length > 0 && (
        <div data-help="wt-reports.actions">
        <ListCard>
          <div className="flex items-center gap-2 px-4 sm:px-5 py-3 border-b border-white/[0.06]">
            <ShieldAlert className="h-3.5 w-3.5 text-red-400" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
              Safety actions for you
            </span>
            <span className="text-[11px] font-semibold tabular-nums text-red-400">
              {openActions.length}
            </span>
          </div>
          <ul className="divide-y divide-white/[0.06]">
            {openActions.map((a) => {
              const overdue = !!a.due_date && a.due_date < new Date().toISOString().slice(0, 10);
              const busy =
                myActions.complete.isPending &&
                myActions.complete.variables?.actionId === a.action_id;
              return (
                <li
                  key={`${a.incident_id}-${a.action_id}`}
                  className="flex items-start gap-3 px-4 sm:px-5 py-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-white">{a.action}</p>
                    <p className="mt-0.5 text-[12px] text-white">
                      From: {a.incident_title}
                      {a.job_title ? ` · ${a.job_title}` : ''}
                    </p>
                    {a.due_date && (
                      <p
                        className={cn(
                          'mt-0.5 text-[12px]',
                          overdue ? 'text-red-300 font-semibold' : 'text-white'
                        )}
                      >
                        {overdue ? 'Overdue · was due ' : 'Due '}
                        {new Date(a.due_date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </p>
                    )}
                  </div>
                  <SecondaryButton
                    onClick={async () => {
                      try {
                        await myActions.complete.mutateAsync({
                          incidentId: a.incident_id,
                          actionId: a.action_id,
                        });
                        toast.success('Done. The office has been told');
                      } catch (err) {
                        toast.error(err instanceof Error ? err.message : 'Could not mark it done');
                      }
                    }}
                    disabled={busy}
                  >
                    {busy ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="h-4 w-4 mr-1.5" />
                    )}
                    {busy ? '' : 'Done'}
                  </SecondaryButton>
                </li>
              );
            })}
          </ul>
        </ListCard>
        </div>
      )}

      <SplitLayout
        ratio="3-2"
        primary={
          /* ── Form ─────────────────────────────────────────── */
          <div className="space-y-5">
            {/* Report type — snag (quality) vs near-miss / incident (safety) */}
            <div className="space-y-2.5">
              <Eyebrow>What are you reporting</Eyebrow>
              <div className="grid grid-cols-3 gap-2" data-help="wt-reports.type">
                {REPORT_TYPES.map((rt) => (
                  <OptionTile
                    key={rt.value}
                    selected={reportType === rt.value}
                    onClick={() => setReportType(rt.value)}
                    vertical
                    label={rt.label}
                    sublabel={rt.hint}
                  />
                ))}
              </div>
              {isSafety && (
                <div className="rounded-xl bg-white/[0.06] border border-amber-500/20 px-4 py-3 flex items-start gap-2.5">
                  <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-[12.5px] text-white leading-snug">
                    Safety reports go straight to the office. Add a photo of the hazard if it is
                    safe to.
                  </p>
                </div>
              )}
            </div>

            {/* Job selector */}
            <Field label="Job" required>
              <Select value={selectedJobId} onValueChange={setSelectedJobId} disabled={jobsLoading}>
                <SelectTrigger className={selectTriggerClass} data-help="wt-reports.job">
                  <SelectValue placeholder={jobsLoading ? 'Loading jobs…' : 'Choose a job…'} />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {jobs?.map((job) => (
                    <SelectItem
                      key={job.id}
                      value={job.id}
                      className="text-white focus:bg-white/10 focus:text-white"
                    >
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!jobsLoading && (!jobs || jobs.length === 0) && (
                <p className="text-[11.5px] text-white leading-snug">
                  No active jobs on your name yet.
                </p>
              )}
            </Field>

            {/* Severity */}
            <Field label="Severity" required>
              <div className="grid grid-cols-3 gap-2" data-help="wt-reports.severity">
                {SEVERITY_OPTIONS.map((option) => (
                  <OptionTile
                    key={option.value}
                    selected={severity === option.value}
                    onClick={() => setSeverity(option.value)}
                    icon={
                      option.value === 'critical' ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : (
                        <Dot tone={option.tone} />
                      )
                    }
                    label={option.label}
                  />
                ))}
              </div>
            </Field>

            {/* Description */}
            <Field
              label={isSafety ? 'What happened' : 'Describe the issue'}
              required
              hint={
                isSafety
                  ? 'Be factual. What you saw and what was affected.'
                  : 'Be specific so it can be put right quickly.'
              }
            >
              <textarea
                data-help="wt-reports.description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={
                  isSafety
                    ? 'Describe the near-miss or incident…'
                    : 'What is the snag or quality issue?'
                }
                className={cn(workerTextareaCn, 'min-h-[110px]')}
              />
            </Field>

            {/* Location within site */}
            <Field label="Location on site" hint="Optional">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white pointer-events-none" />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Kitchen DB, first floor landing…"
                  className={cn(inputClass, 'pl-10')}
                />
              </div>
            </Field>

            {/* Photos — every report type (incidents carry photos since 6 Oct) */}
            {
              <div className="space-y-2">
                <label
                  data-help="wt-reports.photos"
                  className={cn(
                    'w-full min-h-[48px] rounded-xl border border-dashed flex items-center justify-center gap-2 touch-manipulation cursor-pointer px-3 text-sm font-medium transition-colors',
                    photoFiles.length > 0
                      ? 'border-emerald-500/40 bg-emerald-500/[0.08] text-emerald-300'
                      : 'border-white/[0.14] bg-white/[0.03] text-white hover:bg-white/[0.06]'
                  )}
                >
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    multiple
                    className="sr-only"
                    onChange={(e) => {
                      const next = Array.from(e.target.files ?? []).slice(0, 5);
                      setPhotoFiles((prev) => [...prev, ...next].slice(0, 5));
                      e.target.value = '';
                    }}
                  />
                  <Camera className="h-5 w-5 shrink-0" />
                  <span>
                    {photoFiles.length > 0
                      ? `${photoFiles.length} photo${photoFiles.length === 1 ? '' : 's'} attached · add more`
                      : 'Add photos'}
                  </span>
                </label>
                {photoFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {photoFiles.map((f, i) => (
                      <button
                        key={`${f.name}-${i}`}
                        type="button"
                        onClick={() => setPhotoFiles((prev) => prev.filter((_, j) => j !== i))}
                        className="text-[11px] rounded-md border border-white/[0.12] bg-white/[0.04] px-2 py-1 text-white touch-manipulation"
                        aria-label={`Remove ${f.name}`}
                      >
                        {f.name.length > 18 ? `${f.name.slice(0, 15)}…` : f.name} ×
                      </button>
                    ))}
                  </div>
                )}
              </div>
            }

            {/* Submit — in-page (was the sheet footer) */}
            <div className="flex flex-col gap-2 pt-1">
              {validationHint && (
                <p className="text-[11.5px] text-white text-center leading-snug">
                  {validationHint}
                </p>
              )}
              <div className="flex flex-row gap-2">
                <SecondaryButton size="lg" onClick={() => resetForm(true)} disabled={submitting}>
                  Clear
                </SecondaryButton>
                <PrimaryButton
                  data-help="wt-reports.submit"
                  size="lg"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={submitting || !canSubmit}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Submit {typeLabel}
                    </>
                  )}
                </PrimaryButton>
              </div>
            </div>
          </div>
        }
        secondary={
          <div className="space-y-4">
            {/* ── History on this job ──────────────────────────── */}
            {selectedJobId ? (
              <div className="space-y-3">
                <Divider label="History on this job" />

                {recentLoading ? (
                  <LoadingState className="py-10" />
                ) : (recentSnags?.length ?? 0) === 0 ? (
                  <EmptyState
                    title="No reports yet on this job"
                    description="Anything you raise here will show up for your team."
                  />
                ) : (
                  <>
                    {/* Glanceable summary */}
                    <StatStrip
                      columns={3}
                      stats={[
                        { label: 'Total', value: summary.total },
                        { label: 'Open', value: summary.open, tone: 'amber' },
                        { label: 'Resolved', value: summary.resolved, tone: 'emerald' },
                      ]}
                    />

                    {/* Scope: the whole job's history, or only what I raised */}
                    <div className="grid grid-cols-2 gap-2">
                      {(
                        [
                          { value: 'job', label: 'This job' },
                          { value: 'mine', label: 'Mine' },
                        ] as const
                      ).map((o) => (
                        <button
                          key={o.value}
                          type="button"
                          onClick={() => setScope(o.value)}
                          aria-pressed={scope === o.value}
                          className={cn(
                            'h-11 rounded-xl border text-[13px] touch-manipulation transition-colors',
                            scope === o.value
                              ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                              : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
                          )}
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>

                    {/* Filter tabs — improvement, drives off existing summary counts */}
                    <div className="grid grid-cols-3 gap-2">
                      {HISTORY_FILTERS.map((f) => (
                        <button
                          key={f.value}
                          type="button"
                          onClick={() => setHistoryFilter(f.value)}
                          aria-pressed={historyFilter === f.value}
                          className={cn(
                            'min-h-[44px] rounded-xl border text-[12.5px] font-medium transition-all duration-150 touch-manipulation active:scale-[0.98] select-none flex items-center justify-center gap-1.5',
                            historyFilter === f.value
                              ? 'border-elec-yellow/40 bg-white/[0.06] text-elec-yellow'
                              : 'border-white/[0.08] bg-white/[0.04] text-white hover:bg-white/[0.08] hover:border-white/[0.14]'
                          )}
                        >
                          {f.label}
                          <span className="tabular-nums text-[11px] opacity-70">{f.count}</span>
                        </button>
                      ))}
                    </div>

                    {!showOpen && !showResolved && (
                      <EmptyState
                        title={
                          scope === 'mine' && historyFilter === 'all'
                            ? 'You have not reported anything on this job'
                            : `No ${historyFilter === 'all' ? '' : `${historyFilter} `}reports`
                        }
                        description="Try a different filter to see the rest."
                      />
                    )}

                    {showOpen && (
                      <ListCard>
                        <div className="flex items-center gap-2 px-4 sm:px-5 py-3 border-b border-white/[0.06]">
                          <Dot tone="amber" />
                          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                            Open
                          </span>
                          <span className="text-[11px] font-semibold tabular-nums text-amber-400">
                            {grouped.openItems.length}
                          </span>
                        </div>
                        <ListBody>
                          {grouped.openItems.map((snag) => (
                            <ListRow
                              key={snag.id}
                              accent={
                                severityOption(snag.severity)?.value === 'critical'
                                  ? 'red'
                                  : undefined
                              }
                              title={
                                <span className="line-clamp-2 whitespace-normal">
                                  {snag.description}
                                </span>
                              }
                              subtitle={
                                <span className="inline-flex items-center gap-2">
                                  <span className="tabular-nums">
                                    {relativeTime(snag.created_at)}
                                  </span>
                                  {snag.location && (
                                    <>
                                      <span className="text-white">·</span>
                                      <span className="inline-flex items-center gap-1 truncate">
                                        <MapPin className="h-3 w-3 shrink-0" />
                                        {snag.location}
                                      </span>
                                    </>
                                  )}
                                </span>
                              }
                              trailing={getSeverityPill(snag.severity)}
                            />
                          ))}
                        </ListBody>
                      </ListCard>
                    )}

                    {showResolved && (
                      <ListCard>
                        <div className="flex items-center gap-2 px-4 sm:px-5 py-3 border-b border-white/[0.06]">
                          <Dot tone="emerald" />
                          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                            Resolved
                          </span>
                          <span className="text-[11px] font-semibold tabular-nums text-emerald-400">
                            {grouped.resolvedItems.length}
                          </span>
                        </div>
                        <ListBody>
                          {grouped.resolvedItems.map((snag) => (
                            <ListRow
                              key={snag.id}
                              title={
                                <span className="line-clamp-2 whitespace-normal">
                                  {snag.description}
                                </span>
                              }
                              subtitle={
                                <span className="block">
                                  <span className="tabular-nums">
                                    {relativeTime(snag.created_at)}
                                  </span>
                                  {snag.resolution_notes && (
                                    <span className="block mt-0.5 text-emerald-300 whitespace-normal">
                                      Outcome: {snag.resolution_notes}
                                    </span>
                                  )}
                                </span>
                              }
                              trailing={<Pill tone="emerald">{snag.status ?? 'Resolved'}</Pill>}
                            />
                          ))}
                        </ListBody>
                      </ListCard>
                    )}
                  </>
                )}

                {/* Safety reports (near-miss / incident) this worker raised on
                  the job — the employer's Incidents log status comes back here */}
                {(recentIncidents?.length ?? 0) > 0 && (
                  <ListCard>
                    <div className="flex items-center gap-2 px-4 sm:px-5 py-3 border-b border-white/[0.06]">
                      <ShieldAlert className="h-3.5 w-3.5 text-amber-400" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                        Safety reports
                      </span>
                      <span className="text-[11px] font-semibold tabular-nums text-amber-400">
                        {recentIncidents!.length}
                      </span>
                    </div>
                    <ListBody>
                      {recentIncidents!.map((inc) => {
                        const st = (inc.status || 'open').toLowerCase();
                        const closed = ['closed', 'resolved', 'completed'].includes(st);
                        return (
                          <div
                            key={inc.id}
                            id={`incident-${inc.id}`}
                            data-testid={focusIncident === inc.id ? 'focused-incident' : undefined}
                            className={
                              focusIncident === inc.id
                                ? 'ring-2 ring-elec-yellow ring-inset rounded-lg'
                                : undefined
                            }
                          >
                          <ListRow
                            accent={
                              (inc.severity || '').toLowerCase() === 'critical' ? 'red' : undefined
                            }
                            title={
                              <span className="line-clamp-2 whitespace-normal">
                                {inc.description || inc.incident_type}
                              </span>
                            }
                            subtitle={
                              <span className="block">
                                <span className="tabular-nums">
                                  {inc.incident_type === 'near_miss' ? 'Near-miss' : 'Incident'} ·{' '}
                                  {relativeTime(inc.created_at)}
                                </span>
                                {closed && (inc.closeout_summary || inc.actions_taken) && (
                                  <span className="block mt-0.5 text-emerald-300 whitespace-normal">
                                    What was done: {inc.closeout_summary || inc.actions_taken}
                                  </span>
                                )}
                                {!closed && (
                                  <span className="block mt-0.5 text-white whitespace-normal">
                                    {inc.acknowledged_at
                                      ? `Seen by the office ${relativeTime(inc.acknowledged_at)}`
                                      : 'Not seen by the office yet'}
                                  </span>
                                )}
                              </span>
                            }
                            trailing={
                              <Pill
                                tone={
                                  closed ? 'emerald' : st === 'investigating' ? 'blue' : 'amber'
                                }
                              >
                                {closed
                                  ? 'Closed'
                                  : st === 'investigating'
                                    ? 'Investigating'
                                    : 'Open'}
                              </Pill>
                            }
                          />
                          </div>
                        );
                      })}
                    </ListBody>
                  </ListCard>
                )}
              </div>
            ) : (
              /* Prompt before a job is chosen */
              <div className="flex items-start gap-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3">
                <Wrench className="h-4 w-4 text-white shrink-0 mt-0.5" />
                <p className="text-[12px] text-white leading-snug">
                  Choose a job to see what's already been reported there.
                </p>
              </div>
            )}
          </div>
        }
      />
    </WorkerToolPage>
  );
}
