import { useState, useEffect, useRef } from 'react';
import { navigateToAddress } from '@/utils/navigate-to-address';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AssignWorkersSheet } from '@/components/employer/sheets/AssignWorkersSheet';
import { CopyJobSheet } from '@/components/employer/sheets/CopyJobSheet';
import { JobLabelPicker } from '@/components/employer/JobLabelPicker';
import { JobTasksPanel } from '@/components/employer/JobTasksPanel';
import { JobActivityFeed } from '@/components/employer/JobActivityFeed';
import JobCostsSection from '@/components/employer/jobs/JobCostsSection';
import { JobHoursFields } from '@/components/employer/jobs/JobHoursFields';
import { JobRecurringCard } from '@/components/employer/jobs/JobRecurringCard';
import { JobCustomerCard } from '@/components/employer/jobs/JobCustomerCard';
import { JobTrainingCard } from '@/components/employer/jobs/JobTrainingCard';
import { DueDateBadge } from '@/components/employer/DueDateBadge';
import { toast } from '@/hooks/use-toast';
import { useSearchParams } from 'react-router-dom';
import { useUpdateJob, useDeleteJob, useArchiveJob, useSetJobAsTemplate } from '@/hooks/useJobs';
import { useJobAssignments, useRemoveWorkerFromJob } from '@/hooks/useJobAssignments';
import { useLogJobActivity } from '@/hooks/useJobComments';
import { Job, JobStatus } from '@/services/jobService';
import { JobAttentionPanel } from '@/components/employer/sheets/JobAttentionPanel';
import { JobControlCentre } from '@/components/employer/sheets/JobControlCentre';
import { JobShortcuts, type JobShortcutTarget } from '@/components/employer/sheets/JobShortcuts';
import {
  SiteAccessFields,
  SiteAccessSummary,
  BLANK_SITE_ACCESS,
  siteAccessFromJob,
  siteAccessToJob,
  type SiteAccessValues,
} from '@/components/employer/jobs/JobSiteAccessFields';
import { JobChecklist } from '@/components/employer/JobChecklist';
import { FirstJobNext } from '@/components/employer/overview/FirstJobNext';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import {
  MapPin,
  Calendar,
  PoundSterling,
  Users,
  Trash2,
  Save,
  Edit3,
  X,
  Phone,
  MessageSquare,
  Navigation,
  UserPlus,
  Loader2,
  Copy,
  Archive,
  LayoutTemplate,
  MoreVertical,
  ChevronDown,
  ListChecks,
  Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SheetShell,
  FormCard,
  FormGrid,
  Field,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  Pill,
  Eyebrow,
  inputClass,
  textareaClass,
  SuccessCheckmark,
} from '@/components/employer/editorial';
import { SelectField } from '@/components/forms';

interface ViewJobSheetProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** "Dan" from "Dan Hughes" — the finished line uses the name, never a pronoun. */
const firstName = (name?: string | null) => name?.trim().split(/\s+/)[0] || 'Worker';

/** "Tue 15:40" within the last 6 days, "12 Sep 15:40" before that. */
function formatFinishedAt(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const ageDays = (Date.now() - d.getTime()) / 86_400_000;
  const today = new Date().toDateString() === d.toDateString();
  if (today) return `today ${time}`;
  if (ageDays < 6) return `${d.toLocaleDateString('en-GB', { weekday: 'short' })} ${time}`;
  return `${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} ${time}`;
}

export function ViewJobSheet({ job, open, onOpenChange }: ViewJobSheetProps) {
  const updateJob = useUpdateJob();
  const deleteJob = useDeleteJob();
  const archiveJob = useArchiveJob();
  const setAsTemplate = useSetJobAsTemplate();
  const removeWorker = useRemoveWorkerFromJob();
  const logActivity = useLogJobActivity();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: roleInfo } = useEmployerRole();
  const canSeeMoney = !!roleInfo?.canSeeMoney;
  const workersRef = useRef<HTMLDivElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);

  // ELE-1960 — every shortcut keeps the job: hub sections open filtered to it
  // (?job=<id>, with a "Back to job" bar), and browser/phone back returns to
  // this sheet because the Jobs page keeps ?job= in the URL while it is open.
  const goToSection = (section: string, params?: Record<string, string>) => {
    if (!job) return;
    onOpenChange(false);
    setSearchParams({ section, ...(params ?? {}), job: job.id });
  };

  const handleShortcut = (target: JobShortcutTarget) => {
    if (target.kind === 'section') {
      goToSection(target.section, target.params);
      return;
    }
    const el = target.kind === 'team' ? workersRef.current : checklistRef.current;
    if (target.kind === 'team') setWorkersOpen(true);
    // Let the collapsible open before scrolling to it.
    window.setTimeout(() => el?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  };

  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<JobStatus>('Active');
  const [progress, setProgress] = useState(0);
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [jobType, setJobType] = useState('');
  const [quotedHours, setQuotedHours] = useState('');
  const quotedHoursRef = useRef<HTMLInputElement>(null);
  const [siteAccess, setSiteAccess] = useState<SiteAccessValues>(BLANK_SITE_ACCESS);
  const [isEditing, setIsEditing] = useState(false);
  const [showAssignSheet, setShowAssignSheet] = useState(false);
  const [showCopySheet, setShowCopySheet] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [checklistOpen, setChecklistOpen] = useState(true);
  // ?task=<id> (task notifications): open Tasks and focus that task.
  const focusTaskId = searchParams.get('task');
  useEffect(() => {
    if (focusTaskId) setChecklistOpen(true);
  }, [focusTaskId]);
  const [activityOpen, setActivityOpen] = useState(false);
  const [workersOpen, setWorkersOpen] = useState(true);

  const { data: assignments = [], isLoading: loadingAssignments } = useJobAssignments(
    job?.id || ''
  );
  const finishedCount = assignments.filter((a) => !!a.finished_at).length;

  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setClient(job.client);
      setClientPhone(job.client_phone || '');
      setClientEmail(job.client_email || '');
      setLocation(job.location);
      setStatus(job.status);
      setProgress(job.progress);
      setValue(job.value?.toString() || '');
      setDescription(job.description || '');
      setJobType(job.job_type || '');
      setQuotedHours(job.quoted_hours != null ? String(job.quoted_hours) : '');
      setSiteAccess(siteAccessFromJob(job));
      setIsEditing(false);
      setChecklistOpen(true);
      setActivityOpen(false);
      setWorkersOpen(true);
    }
  }, [job]);

  const handleSave = async () => {
    if (!job) return;

    const oldStatus = job.status;
    const oldProgress = job.progress;

    try {
      await updateJob.mutateAsync({
        id: job.id,
        updates: {
          title,
          client,
          client_phone: clientPhone || null,
          client_email: clientEmail || null,
          // Only when the address actually changed: updateJob re-geocodes any
          // `location` it is given, and the geocoder's answer for an unchanged
          // address can land kilometres from the pin (seen: 7 km), which moved
          // the job and broke "clocked in N m from site" on timesheets.
          ...(location !== job.location ? { location } : {}),
          status,
          progress,
          value: value ? parseFloat(value) : 0,
          description,
          job_type: jobType || null,
          quoted_hours:
            quotedHours.trim() !== '' && Number.isFinite(parseFloat(quotedHours))
              ? Math.max(0, parseFloat(quotedHours))
              : null,
          ...siteAccessToJob(siteAccess),
        },
      });

      if (oldStatus !== status) {
        logActivity.mutate({
          jobId: job.id,
          content: `Status changed from ${oldStatus} to ${status}`,
          commentType: 'status_change',
        });
      }

      if (oldProgress !== progress) {
        logActivity.mutate({
          jobId: job.id,
          content: `Progress updated to ${progress}%`,
          commentType: 'progress',
        });
      }

      toast({
        title: 'Job updated',
        description: `${title} has been updated.`,
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setIsEditing(false);
      }, 700);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update job.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!job) return;

    try {
      await deleteJob.mutateAsync(job.id);
      toast({
        title: 'Job deleted',
        description: `${job.title} has been deleted.`,
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete job.',
        variant: 'destructive',
      });
    }
  };

  // Persist only on release (onValueCommit) — writing a DB update + activity
  // row for every 5% drag step spammed the audit trail.
  const handleProgressCommit = async (newProgress: number[]) => {
    if (!job) return;
    const oldProgress = job.progress;

    try {
      await updateJob.mutateAsync({
        id: job.id,
        updates: { progress: newProgress[0] },
      });

      if (oldProgress !== newProgress[0]) {
        logActivity.mutate({
          jobId: job.id,
          content: `Progress updated to ${newProgress[0]}%`,
          commentType: 'progress',
        });
      }
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  const handleRemoveWorker = async (employeeId: string, employeeName: string) => {
    if (!job) return;

    try {
      await removeWorker.mutateAsync({ jobId: job.id, employeeId });
      toast({
        title: 'Worker removed',
        description: `${employeeName} has been removed from this job.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove worker.',
        variant: 'destructive',
      });
    }
  };

  // ELE-1520 — onto the shared helper. The URL this built was correct but did
  // not match EXTERNAL_APP_PATTERNS, so it opened a map inside the in-app
  // browser instead of the Maps app. Fixed in open-external-url.ts.
  const handleNavigate = () => {
    if (!job) return;
    navigateToAddress({ address: job.location });
  };

  const handleCall = () => {
    if (!job) return;
    if (job.client_phone) {
      window.location.href = `tel:${job.client_phone}`;
    } else {
      toast({
        title: 'No phone number',
        description: 'Add a client phone number to enable calling.',
        variant: 'destructive',
      });
    }
  };

  const handleMessage = () => {
    if (!job) return;
    if (job.client_email) {
      window.location.href = `mailto:${job.client_email}?subject=Re: ${encodeURIComponent(job.title)}`;
    } else if (job.client_phone) {
      window.location.href = `sms:${job.client_phone}`;
    } else {
      toast({
        title: 'No contact info',
        description: 'Add a client email or phone to enable messaging.',
        variant: 'destructive',
      });
    }
  };

  const handleArchive = async () => {
    if (!job) return;

    try {
      await archiveJob.mutateAsync(job.id);
      toast({
        title: 'Job archived',
        description: `${job.title} has been archived.`,
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to archive job.',
        variant: 'destructive',
      });
    }
  };

  const handleToggleTemplate = async () => {
    if (!job) return;

    const newTemplateStatus = !job.is_template;
    try {
      await setAsTemplate.mutateAsync({ id: job.id, isTemplate: newTemplateStatus });
      toast({
        title: newTemplateStatus ? 'Saved as template' : 'Removed from templates',
        description: newTemplateStatus
          ? `${job.title} is now a template.`
          : `${job.title} is no longer a template.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update template status.',
        variant: 'destructive',
      });
    }
  };

  if (!job) return null;

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const calculateDuration = () => {
    if (!job.start_date || !job.end_date) return null;
    const start = new Date(job.start_date);
    const end = new Date(job.end_date);
    // Inclusive calendar days, then the most natural unit — a two-day job
    // used to read "1 month".
    const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1);
    if (days < 7) return days === 1 ? '1 day' : `${days} days`;
    if (days < 30) {
      const weeks = Math.round(days / 7);
      return weeks === 1 ? '1 week' : `${weeks} weeks`;
    }
    const months = Math.round(days / 30);
    return months === 1 ? '1 month' : `${months} months`;
  };

  const statusTone: Record<string, 'emerald' | 'amber' | 'cyan' | 'red' | 'yellow'> = {
    Active: 'emerald',
    Pending: 'amber',
    Completed: 'yellow',
    'On Hold': 'cyan',
    Cancelled: 'red',
  };

  return (
    <>
      <SuccessCheckmark show={showSuccess} />
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]">
          {isEditing ? (
            <SheetShell
              eyebrow="Edit job"
              title={job.title}
              description="Update job details."
              footer={
                <>
                  <SecondaryButton onClick={() => setIsEditing(false)} fullWidth>
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton onClick={handleSave} disabled={updateJob.isPending} fullWidth>
                    <Save className="h-4 w-4 mr-2" />
                    Save changes
                  </PrimaryButton>
                </>
              }
            >
              <FormCard eyebrow="Job details">
                <Field label="Job title" required>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Client">
                  <Input
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Location">
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Description">
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={cn(textareaClass, 'min-h-[100px]')}
                  />
                </Field>
              </FormCard>

              <FormCard eyebrow="Job type & quoted hours">
                <JobHoursFields
                  ref={quotedHoursRef}
                  jobId={job.id}
                  jobType={jobType}
                  onJobTypeChange={setJobType}
                  quotedHours={quotedHours}
                  onQuotedHoursChange={setQuotedHours}
                />
              </FormCard>

              <FormCard eyebrow="Status & value">
                <FormGrid cols={2}>
                  <Field label="Status">
                    <SelectField
        value={status}
        onValueChange={(v) => setStatus(v as JobStatus)}
        options={[{ value: 'Active', label: 'Active' }, { value: 'Pending', label: 'Pending' }, { value: 'Completed', label: 'Completed' }, { value: 'On Hold', label: 'On Hold' }, { value: 'Cancelled', label: 'Cancelled' }]}
      />
                  </Field>
                  {canSeeMoney && (
                    <Field label="Value (£)">
                      <Input
                        type="number"
                        inputMode="decimal"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  )}
                </FormGrid>
              </FormCard>

              <FormCard eyebrow="Contact">
                <FormGrid cols={2}>
                  <Field label="Client phone">
                    <Input
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Client email">
                    <Input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </FormGrid>
              </FormCard>

              <FormCard eyebrow="On site">
                <SiteAccessFields
                  value={siteAccess}
                  onChange={(k, v) => setSiteAccess((prev) => ({ ...prev, [k]: v }))}
                />
              </FormCard>
            </SheetShell>
          ) : (
            <SheetShell
              eyebrow={job.client}
              title={
                <span className="flex items-center gap-2">
                  <span className="truncate">{job.title}</span>
                  {job.is_template && (
                    <Pill tone="yellow">
                      <LayoutTemplate className="h-3 w-3 mr-1" />
                      Template
                    </Pill>
                  )}
                </span>
              }
              description={
                <span className="flex flex-wrap items-center gap-2">
                  <Pill tone={statusTone[job.status] ?? 'yellow'}>{job.status}</Pill>
                  <DueDateBadge endDate={job.end_date} isCompleted={job.status === 'Completed'} />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="-my-2 h-11 w-11 rounded-full text-white flex items-center justify-center hover:bg-white/[0.08] touch-manipulation"
                        aria-label="More"
                      >
                        <MoreVertical className="h-3.5 w-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setShowCopySheet(true)} className="gap-2">
                        <Copy className="h-4 w-4" />
                        Copy job
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleToggleTemplate} className="gap-2">
                        <LayoutTemplate className="h-4 w-4" />
                        {job.is_template ? 'Remove from templates' : 'Save as template'}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleArchive}
                        className="gap-2 text-amber-400 focus:text-amber-400"
                      >
                        <Archive className="h-4 w-4" />
                        Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </span>
              }
              footer={
                <>
                  <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                    Close
                  </SecondaryButton>
                  <PrimaryButton data-help="jobs.edit" onClick={() => setIsEditing(true)} fullWidth>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit job
                  </PrimaryButton>
                </>
              }
            >
              {/* End of a new firm's guided first job (ELE-1819). */}
              {searchParams.get('firstjob') === job.id && (
                <FirstJobNext
                  booked={assignments.length}
                  onPack={() => goToSection('jobpacks')}
                  onQuote={() => {
                    onOpenChange(false);
                    setSearchParams({
                      section: 'quotes',
                      new: 'quote',
                      job: job.id,
                      ...(job.client ? { client: job.client } : {}),
                      ...(job.location ? { address: job.location } : {}),
                    });
                  }}
                  onDone={() =>
                    setSearchParams(
                      (prev) => {
                        const next = new URLSearchParams(prev);
                        next.delete('firstjob');
                        return next;
                      },
                      { replace: true }
                    )
                  }
                />
              )}

              <JobLabelPicker jobId={job.id} />

              {/* Why this job is flagged — belongs on the screen the manager
                  lands on, not hidden behind Edit. */}
              <JobAttentionPanel jobId={job.id} />

              <div className="grid grid-cols-3 gap-2">
                <SecondaryButton onClick={handleCall} fullWidth>
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </SecondaryButton>
                <SecondaryButton onClick={handleMessage} fullWidth>
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Message
                </SecondaryButton>
                <SecondaryButton onClick={handleNavigate} fullWidth>
                  <Navigation className="h-4 w-4 mr-1" />
                  Navigate
                </SecondaryButton>
              </div>

              {(job.site_contact_name || job.site_contact_phone || job.access_notes ||
                job.share_client_contact_with_crew === false) && (
                <FormCard eyebrow="On site">
                  <SiteAccessSummary
                    name={job.site_contact_name}
                    phone={job.site_contact_phone}
                    notes={job.access_notes}
                  />
                  {job.share_client_contact_with_crew === false && (
                    <p className="text-[12px] text-white leading-snug">
                      The crew can't see the customer's number on this job.
                    </p>
                  )}
                </FormCard>
              )}

              <JobShortcuts jobId={job.id} canSeeMoney={canSeeMoney} onSelect={handleShortcut} />

              {!job.is_template && <JobCustomerCard jobId={job.id} />}

              {!job.is_template && <JobRecurringCard job={job} />}

              {!job.is_template && <JobTrainingCard jobId={job.id} />}

              <FormCard eyebrow="Progress">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-white">Job progress</span>
                  <span className="text-2xl font-bold text-elec-yellow tabular-nums">
                    {progress}%
                  </span>
                </div>
                <Slider
                  value={[progress]}
                  onValueChange={(v) => setProgress(v[0])}
                  onValueCommit={handleProgressCommit}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-white">
                  <span>Start</span>
                  <span>Complete</span>
                </div>
              </FormCard>

              <FormGrid cols={2}>
                <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4 flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-elec-yellow" />
                  <div className="min-w-0">
                    <Eyebrow>Location</Eyebrow>
                    <p className="text-sm font-medium text-white truncate">{job.location}</p>
                  </div>
                </div>
                {/* Job value is money: owner and admins only (ELE-1831). */}
                {canSeeMoney && (
                  <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4 flex items-center gap-3">
                    <PoundSterling className="h-5 w-5 text-emerald-400" />
                    <div>
                      <Eyebrow>Value</Eyebrow>
                      <p className="text-sm font-bold text-emerald-400 tabular-nums">
                        {Number(job.value) > 0
                          ? `£${Number(job.value).toLocaleString('en-GB')}`
                          : 'Not set'}
                      </p>
                    </div>
                  </div>
                )}
                <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4 flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  <div>
                    <Eyebrow>Duration</Eyebrow>
                    <p className="text-sm font-medium text-white">{calculateDuration() || '-'}</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4 flex items-center gap-3">
                  <Users className="h-5 w-5 text-amber-400" />
                  <div>
                    <Eyebrow>Workers</Eyebrow>
                    <p className="text-sm font-medium text-white">{assignments.length} assigned</p>
                  </div>
                </div>
              </FormGrid>

              {/* Money flow + job profit (shared finance model) — in view mode,
                  so the job sheet is the way into the job's financials. */}
              <JobControlCentre
                jobId={job.id}
                jobTitle={job.title}
                jobClient={job.client}
                onOpenFinancials={() => {
                  onOpenChange(false);
                  setSearchParams({ section: 'financials', job: job.id });
                }}
                onSetQuotedHours={() => {
                  setIsEditing(true);
                  window.setTimeout(() => {
                    quotedHoursRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    quotedHoursRef.current?.focus();
                  }, 120);
                }}
              />

              <FormCard eyebrow="Schedule">
                <div className="flex justify-between items-center">
                  <div>
                    <Eyebrow>Start date</Eyebrow>
                    <p className="text-sm font-medium text-white mt-0.5">
                      {formatDate(job.start_date)}
                    </p>
                  </div>
                  <div className="h-px w-8 bg-white/[0.06]" />
                  <div className="text-right">
                    <Eyebrow>End date</Eyebrow>
                    <p className="text-sm font-medium text-white mt-0.5">
                      {formatDate(job.end_date)}
                    </p>
                  </div>
                </div>
                {job.status === 'Completed' && (
                  <p className="border-t border-white/[0.1] pt-3 text-[13px] text-white">
                    <span className="font-semibold text-emerald-400">Completed</span>{' '}
                    {job.completed_at ? formatDate(job.completed_at) : '(date not recorded)'}
                  </p>
                )}
              </FormCard>

              {job.description && (
                <FormCard eyebrow="Description">
                  <p className="text-sm text-white leading-relaxed">{job.description}</p>
                </FormCard>
              )}

              <Collapsible open={workersOpen} onOpenChange={setWorkersOpen}>
                <div
                  ref={workersRef}
                  className="scroll-mt-4 rounded-2xl bg-white/[0.04] border border-white/[0.06]"
                >
                  <CollapsibleTrigger asChild>
                    <button className="w-full p-4 flex items-center justify-between touch-manipulation">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-white" />
                        <span className="text-sm font-medium text-white">Assigned workers</span>
                        <Pill tone="yellow">{assignments.length}</Pill>
                        {finishedCount > 0 && (
                          <span className="hidden sm:inline whitespace-nowrap text-[12px] text-emerald-400 tabular-nums">
                            {finishedCount === assignments.length
                              ? 'All finished'
                              : `${finishedCount} finished`}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {/* span, not button — this sits inside the Collapsible
                            trigger button and nested <button> is invalid DOM */}
                        <span
                          role="button"
                          tabIndex={0}
                          data-help="jobs.assign"
                          className="min-h-[44px] px-2 text-[12px] font-medium text-elec-yellow inline-flex items-center gap-1 touch-manipulation"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowAssignSheet(true);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              e.stopPropagation();
                              setShowAssignSheet(true);
                            }
                          }}
                        >
                          <UserPlus className="h-3.5 w-3.5" />
                          Assign
                        </span>
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 text-white transition-transform',
                            workersOpen && 'rotate-180'
                          )}
                        />
                      </div>
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-4 pt-0 space-y-2">
                      {loadingAssignments ? (
                        <div className="flex items-center justify-center py-4">
                          <Loader2 className="h-5 w-5 animate-spin text-white" />
                        </div>
                      ) : assignments.length === 0 ? (
                        <div className="text-center py-4">
                          <p className="text-sm text-white">No workers assigned yet</p>
                        </div>
                      ) : (
                        assignments.map((assignment) => (
                          <div
                            key={assignment.id}
                            className="flex items-center gap-3 p-3 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06]"
                          >
                            <Avatar className="h-8 w-8 bg-white/[0.06]">
                              <AvatarFallback className="text-elec-yellow text-xs font-medium">
                                {assignment.employee?.avatar_initials || '??'}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-white truncate">
                                {assignment.employee?.name || 'Unknown'}
                              </p>
                              <p className="text-xs text-white">
                                {assignment.role_on_job || assignment.employee?.role || 'Worker'}
                              </p>
                              {assignment.finished_at ? (
                                <p className="mt-1 text-[12px] font-medium text-emerald-400 leading-snug">
                                  {firstName(assignment.employee?.name)} finished ·{' '}
                                  {formatFinishedAt(assignment.finished_at)}
                                </p>
                              ) : assignment.seen_at ? (
                                <p className="mt-1 text-[12px] text-white leading-snug">
                                  Seen {formatFinishedAt(assignment.seen_at)}
                                </p>
                              ) : null}
                              {assignment.finished_at && assignment.finished_note?.trim() && (
                                <p className="mt-0.5 text-[12px] text-white leading-snug break-words">
                                  “{assignment.finished_note.trim()}”
                                </p>
                              )}
                            </div>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <button
                                  className="-mr-1.5 h-11 w-11 shrink-0 rounded-full hover:bg-red-500/15 text-white hover:text-red-400 transition-colors flex items-center justify-center touch-manipulation"
                                  aria-label="Remove worker"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Remove worker?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to remove {assignment.employee?.name} from
                                    this job?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleRemoveWorker(
                                        assignment.employee_id,
                                        assignment.employee?.name || ''
                                      )
                                    }
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Remove
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        ))
                      )}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>

              <div ref={checklistRef} className="scroll-mt-4">
                <JobChecklist jobId={job.id} />
              </div>

              <Collapsible open={checklistOpen} onOpenChange={setChecklistOpen}>
                <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06]">
                  <CollapsibleTrigger asChild>
                    <button className="w-full p-4 flex items-center justify-between touch-manipulation">
                      <div className="flex items-center gap-2">
                        <ListChecks className="h-4 w-4 text-white" />
                        <span className="text-sm font-medium text-white">Tasks</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 text-white transition-transform',
                          checklistOpen && 'rotate-180'
                        )}
                      />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-4 pt-0">
                      <JobTasksPanel jobId={job.id} focusTaskId={focusTaskId} />
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>

              <JobCostsSection jobId={job.id} />

              <Collapsible open={activityOpen} onOpenChange={setActivityOpen}>
                <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06]">
                  <CollapsibleTrigger asChild>
                    <button className="w-full p-4 flex items-center justify-between touch-manipulation">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-white" />
                        <span className="text-sm font-medium text-white">Activity</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 text-white transition-transform',
                          activityOpen && 'rotate-180'
                        )}
                      />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-4 pt-0">
                      <JobActivityFeed jobId={job.id} />
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DestructiveButton fullWidth>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete job
                  </DestructiveButton>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete job?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{job.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </SheetShell>
          )}
        </SheetContent>
      </Sheet>

      {job && (
        <AssignWorkersSheet
          job={job}
          open={showAssignSheet}
          onOpenChange={setShowAssignSheet}
          existingAssignments={assignments}
        />
      )}

      <CopyJobSheet job={job} open={showCopySheet} onOpenChange={setShowCopySheet} />
    </>
  );
}
