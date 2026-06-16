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

import { useMemo, useState } from 'react';
import { Camera, Loader2, Send, MapPin, AlertTriangle, ShieldAlert, Wrench } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useMyJobs, useSnagReports } from '@/hooks/useWorkerSelfService';
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
  textareaClass,
  selectTriggerClass,
  selectContentClass,
  type Tone,
} from '@/components/employer/editorial';

const SEVERITY_OPTIONS = [
  { value: 'minor', label: 'Minor', tone: 'blue' as Tone },
  { value: 'moderate', label: 'Moderate', tone: 'amber' as Tone },
  { value: 'critical', label: 'Critical', tone: 'red' as Tone },
];

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
  const [reportType, setReportType] = useState<'snag' | 'near_miss' | 'incident'>('snag');
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [severity, setSeverity] = useState<string>('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [historyFilter, setHistoryFilter] = useState<HistoryFilter>('all');

  const { data: jobs, isLoading: jobsLoading } = useMyJobs('active');
  const {
    recentSnags,
    isLoading: recentLoading,
    submitSnag,
    isSubmitting,
    submitIncident,
    isSubmittingIncident,
  } = useSnagReports(selectedJobId);
  const submitting = isSubmitting || isSubmittingIncident;

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
    [['snag-reports']],
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

  // Glanceable summary of the chosen job's history — open vs resolved.
  const summary = useMemo(() => {
    const list = recentSnags ?? [];
    const open = list.filter((s) => !isResolved(s.status)).length;
    return { total: list.length, open, resolved: list.length - open };
  }, [recentSnags]);

  // Group recent reports: open first, then resolved (newest already from query).
  const grouped = useMemo(() => {
    const list = recentSnags ?? [];
    const openItems = list.filter((s) => !isResolved(s.status));
    const resolvedItems = list.filter((s) => isResolved(s.status));
    return { openItems, resolvedItems };
  }, [recentSnags]);

  const showOpen = historyFilter !== 'resolved' && grouped.openItems.length > 0;
  const showResolved = historyFilter !== 'open' && grouped.resolvedItems.length > 0;

  const resetForm = () => {
    setSelectedJobId('');
    setSeverity('');
    setDescription('');
    setLocation('');
    setHistoryFilter('all');
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
      if (isSafety) {
        await submitIncident({
          jobId: selectedJobId,
          severity,
          description: description.trim(),
          location: location.trim() || undefined,
          incidentType: reportType,
        });
      } else {
        await submitSnag({
          jobId: selectedJobId,
          severity,
          description: description.trim(),
          location: location.trim() || undefined,
        });
      }
      setJustSubmitted(true);
      window.setTimeout(() => setJustSubmitted(false), 1400);
      toast.success(`${label} submitted`);
      resetForm();
    } catch {
      toast.error(`Failed to submit ${label.toLowerCase()}`);
    }
  };

  const getSeverityPill = (sev: string) => {
    const option = SEVERITY_OPTIONS.find((o) => o.value === sev);
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
    >
      <SuccessCheckmark show={justSubmitted} />

      <SplitLayout
        ratio="3-2"
        primary={
          /* ── Form ─────────────────────────────────────────── */
          <div className="space-y-5">
            {/* Report type — snag (quality) vs near-miss / incident (safety) */}
            <div className="space-y-2.5">
              <Eyebrow>What are you reporting</Eyebrow>
              <div className="grid grid-cols-3 gap-2">
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
                <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-3 flex items-start gap-2.5">
                  <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-[12.5px] text-white leading-snug">
                    Safety reports go straight to your employer's Incidents log (RIDDOR / H&amp;S).
                  </p>
                </div>
              )}
            </div>

            {/* Job selector */}
            <Field label="Job" required>
              <Select value={selectedJobId} onValueChange={setSelectedJobId} disabled={jobsLoading}>
                <SelectTrigger className={selectTriggerClass}>
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
                <p className="text-[11.5px] text-white/50 leading-snug">
                  No active jobs on your name yet.
                </p>
              )}
            </Field>

            {/* Severity */}
            <Field label="Severity" required>
              <div className="grid grid-cols-3 gap-2">
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
                  ? 'Be factual — what you saw and what was affected.'
                  : 'Be specific so it can be put right quickly.'
              }
            >
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={
                  isSafety
                    ? 'Describe the near-miss or incident…'
                    : 'What is the snag or quality issue?'
                }
                className={cn(textareaClass, 'min-h-[110px]')}
              />
            </Field>

            {/* Location within site */}
            <Field label="Location on site" hint="Optional">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 pointer-events-none" />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Kitchen DB, first floor landing…"
                  className={cn(inputClass, 'pl-10')}
                />
              </div>
            </Field>

            {/* Photo upload placeholder */}
            <button
              type="button"
              disabled
              className="w-full min-h-[48px] rounded-xl border border-dashed border-white/[0.12] bg-white/[0.02] text-white/50 flex items-center justify-center gap-2 touch-manipulation cursor-not-allowed"
            >
              <Camera className="h-5 w-5" />
              <span className="text-sm font-medium">Add photo</span>
              <span className="text-[11px] text-white/40">· coming soon</span>
            </button>

            {/* Submit — in-page (was the sheet footer) */}
            <div className="flex flex-col gap-2 pt-1">
              {validationHint && (
                <p className="text-[11.5px] text-white/50 text-center leading-snug">
                  {validationHint}
                </p>
              )}
              <div className="flex flex-row gap-2">
                <SecondaryButton size="lg" onClick={resetForm} disabled={submitting}>
                  Clear
                </SecondaryButton>
                <PrimaryButton
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
          /* ── History on this job ──────────────────────────── */
          selectedJobId ? (
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
                            ? 'border-elec-yellow/40 bg-elec-yellow/[0.10] text-elec-yellow'
                            : 'border-white/[0.08] bg-white/[0.04] text-white/80 hover:bg-white/[0.08] hover:border-white/[0.14]'
                        )}
                      >
                        {f.label}
                        <span className="tabular-nums text-[11px] opacity-70">{f.count}</span>
                      </button>
                    ))}
                  </div>

                  {!showOpen && !showResolved && (
                    <EmptyState
                      title={`No ${historyFilter} reports`}
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
                            accent={snag.severity === 'critical' ? 'red' : undefined}
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
                                    <span className="text-white/30">·</span>
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
                              <span className="tabular-nums">{relativeTime(snag.created_at)}</span>
                            }
                            trailing={<Pill tone="emerald">{snag.status ?? 'Resolved'}</Pill>}
                          />
                        ))}
                      </ListBody>
                    </ListCard>
                  )}
                </>
              )}
            </div>
          ) : (
            /* Prompt before a job is chosen */
            <div className="flex items-start gap-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3">
              <Wrench className="h-4 w-4 text-white/40 shrink-0 mt-0.5" />
              <p className="text-[12px] text-white/60 leading-snug">
                Choose a job to see what's already been reported there.
              </p>
            </div>
          )
        }
      />
    </WorkerToolPage>
  );
}
