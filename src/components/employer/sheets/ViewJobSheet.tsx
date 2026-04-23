import { useState, useEffect } from 'react';
import { openExternalUrl } from '@/utils/open-external-url';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { JobChecklist } from '@/components/employer/JobChecklist';
import { JobActivityFeed } from '@/components/employer/JobActivityFeed';
import { DueDateBadge } from '@/components/employer/DueDateBadge';
import { toast } from '@/hooks/use-toast';
import { useUpdateJob, useDeleteJob, useArchiveJob, useSetJobAsTemplate } from '@/hooks/useJobs';
import { useJobAssignments, useRemoveWorkerFromJob } from '@/hooks/useJobAssignments';
import { useLogJobActivity } from '@/hooks/useJobComments';
import { Job, JobStatus } from '@/services/jobService';
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
  FileText,
  Clock,
  Camera,
  FolderOpen,
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
  selectTriggerClass,
  selectContentClass,
  textareaClass,
  SuccessCheckmark,
} from '@/components/employer/editorial';

interface ViewJobSheetProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewJobSheet({ job, open, onOpenChange }: ViewJobSheetProps) {
  const updateJob = useUpdateJob();
  const deleteJob = useDeleteJob();
  const archiveJob = useArchiveJob();
  const setAsTemplate = useSetJobAsTemplate();
  const removeWorker = useRemoveWorkerFromJob();
  const logActivity = useLogJobActivity();

  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<JobStatus>('Active');
  const [progress, setProgress] = useState(0);
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showAssignSheet, setShowAssignSheet] = useState(false);
  const [showCopySheet, setShowCopySheet] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [checklistOpen, setChecklistOpen] = useState(true);
  const [activityOpen, setActivityOpen] = useState(false);
  const [workersOpen, setWorkersOpen] = useState(true);

  const { data: assignments = [], isLoading: loadingAssignments } = useJobAssignments(
    job?.id || ''
  );

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
          location,
          status,
          progress,
          value: value ? parseFloat(value) : 0,
          description,
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

  const handleProgressChange = async (newProgress: number[]) => {
    if (!job) return;
    const oldProgress = progress;
    setProgress(newProgress[0]);

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

  const handleNavigate = () => {
    if (!job) return;
    const query = encodeURIComponent(job.location);
    openExternalUrl(`https://www.google.com/maps/search/?api=1&query=${query}`);
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
    const months = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
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
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
        >
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
                  <PrimaryButton
                    onClick={handleSave}
                    disabled={updateJob.isPending}
                    fullWidth
                  >
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

              <FormCard eyebrow="Status & value">
                <FormGrid cols={2}>
                  <Field label="Status">
                    <Select value={status} onValueChange={(v) => setStatus(v as JobStatus)}>
                      <SelectTrigger className={selectTriggerClass}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Value (£)">
                    <Input
                      type="number"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className={inputClass}
                    />
                  </Field>
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
                  <DueDateBadge
                    endDate={job.end_date}
                    isCompleted={job.status === 'Completed'}
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="h-7 w-7 rounded-full bg-white/[0.04] border border-white/[0.08] text-white flex items-center justify-center hover:bg-white/[0.08]"
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
                  <PrimaryButton onClick={() => setIsEditing(true)} fullWidth>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit job
                  </PrimaryButton>
                </>
              }
            >
              <JobLabelPicker jobId={job.id} />

              <FormGrid cols={3}>
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
              </FormGrid>

              <FormCard eyebrow="Progress">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-white">Job progress</span>
                  <span className="text-2xl font-bold text-elec-yellow tabular-nums">
                    {progress}%
                  </span>
                </div>
                <Slider
                  value={[progress]}
                  onValueChange={handleProgressChange}
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
                <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-4 flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-elec-yellow" />
                  <div className="min-w-0">
                    <Eyebrow>Location</Eyebrow>
                    <p className="text-sm font-medium text-white truncate">{job.location}</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-4 flex items-center gap-3">
                  <PoundSterling className="h-5 w-5 text-emerald-400" />
                  <div>
                    <Eyebrow>Value</Eyebrow>
                    <p className="text-sm font-bold text-emerald-400 tabular-nums">
                      £{(job.value || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-4 flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  <div>
                    <Eyebrow>Duration</Eyebrow>
                    <p className="text-sm font-medium text-white">
                      {calculateDuration() || '-'}
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-4 flex items-center gap-3">
                  <Users className="h-5 w-5 text-amber-400" />
                  <div>
                    <Eyebrow>Workers</Eyebrow>
                    <p className="text-sm font-medium text-white">
                      {assignments.length} assigned
                    </p>
                  </div>
                </div>
              </FormGrid>

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
              </FormCard>

              {job.description && (
                <FormCard eyebrow="Description">
                  <p className="text-sm text-white leading-relaxed">{job.description}</p>
                </FormCard>
              )}

              <Collapsible open={workersOpen} onOpenChange={setWorkersOpen}>
                <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
                  <CollapsibleTrigger asChild>
                    <button className="w-full p-4 flex items-center justify-between touch-manipulation">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-white" />
                        <span className="text-sm font-medium text-white">
                          Assigned workers
                        </span>
                        <Pill tone="yellow">{assignments.length}</Pill>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="text-[12px] font-medium text-elec-yellow flex items-center gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowAssignSheet(true);
                          }}
                        >
                          <UserPlus className="h-3.5 w-3.5" />
                          Assign
                        </button>
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
                            <Avatar className="h-8 w-8 bg-elec-yellow/10">
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
                            </div>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <button
                                  className="h-7 w-7 rounded-full bg-white/[0.04] hover:bg-red-500/15 text-white hover:text-red-400 transition-colors flex items-center justify-center"
                                  aria-label="Remove worker"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Remove worker?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to remove {assignment.employee?.name}{' '}
                                    from this job?
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

              <Collapsible open={checklistOpen} onOpenChange={setChecklistOpen}>
                <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
                  <CollapsibleTrigger asChild>
                    <button className="w-full p-4 flex items-center justify-between touch-manipulation">
                      <div className="flex items-center gap-2">
                        <ListChecks className="h-4 w-4 text-white" />
                        <span className="text-sm font-medium text-white">Checklist</span>
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
                      <JobChecklist jobId={job.id} />
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>

              <Collapsible open={activityOpen} onOpenChange={setActivityOpen}>
                <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
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

              <FormCard eyebrow="Quick links">
                <FormGrid cols={2}>
                  <SecondaryButton
                    onClick={() =>
                      toast({ title: 'Job pack', description: 'Job pack generation coming soon' })
                    }
                    fullWidth
                  >
                    <FileText className="h-4 w-4 mr-1 text-elec-yellow" />
                    Job pack
                  </SecondaryButton>
                  <SecondaryButton
                    onClick={() =>
                      toast({
                        title: 'Timesheets',
                        description: 'View timesheets in the Timesheets section',
                      })
                    }
                    fullWidth
                  >
                    <Clock className="h-4 w-4 mr-1 text-elec-yellow" />
                    Timesheets
                  </SecondaryButton>
                  <SecondaryButton
                    onClick={() =>
                      toast({
                        title: 'Photos',
                        description: 'View photos in the Photo Gallery section',
                      })
                    }
                    fullWidth
                  >
                    <Camera className="h-4 w-4 mr-1 text-elec-yellow" />
                    Photos
                  </SecondaryButton>
                  <SecondaryButton
                    onClick={() =>
                      toast({ title: 'Documents', description: 'Document management coming soon' })
                    }
                    fullWidth
                  >
                    <FolderOpen className="h-4 w-4 mr-1 text-elec-yellow" />
                    Documents
                  </SecondaryButton>
                </FormGrid>
              </FormCard>

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
                      Are you sure you want to delete "{job.title}"? This action cannot be
                      undone.
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
