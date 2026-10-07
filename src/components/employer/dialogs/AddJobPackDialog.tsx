import { useState, useEffect, useRef } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useCreateJobPack } from '@/hooks/useJobPacks';
import { useEmployees } from '@/hooks/useEmployees';
import { useJobs } from '@/hooks/useJobs';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  getSuggestedCertifications,
  COMMON_CERTIFICATIONS,
} from '@/services/jobPackDocumentService';
import {
  X,
  MapPin,
  AlertTriangle,
  Users,
  Calendar,
  PoundSterling,
  Award,
  FileText,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Field,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  Eyebrow,
  Pill,
  inputClass,
  textareaClass,
  checkboxClass,
} from '@/components/employer/editorial';
import { autoCompleteOff } from '@/lib/textEntry';
import {
  StepTabs,
  KeepDraftPrompt,
  readDraft,
  writeDraft,
  clearDraft,
  useDraftWriter,
  timeAgoShort,
} from '@/components/employer/dialogs/formSheetKit';
import { useEmployerRole } from '@/hooks/useEmployerRole';

const COMMON_HAZARDS = [
  'Working at height',
  'Live testing',
  'Asbestos risk',
  'Confined spaces',
  'Heavy lifting',
  'Traffic management',
  'Underground services',
  'Occupied building',
];

const STEPS = [
  { id: 1, title: 'Start' },
  { id: 2, title: 'Details' },
  { id: 3, title: 'Hazards' },
  { id: 4, title: 'Team' },
  { id: 5, title: 'Review' },
];

type SourceType = 'new' | 'existing' | 'document';

interface PackForm {
  title: string;
  client: string;
  location: string;
  scope: string;
  hazards: string[];
  assignedWorkers: string[];
  startDate: string;
  estimatedValue: string;
  requiredCertifications: string[];
  briefingContent: string;
}

/** What is kept in the per-user draft slot (ELE-1818). */
interface PackDraft {
  currentStep: number;
  sourceType: SourceType;
  selectedJobId: string | null;
  formData: PackForm;
}

const BLANK_PACK: PackForm = {
  title: '',
  client: '',
  location: '',
  scope: '',
  hazards: [],
  assignedWorkers: [],
  startDate: '',
  estimatedValue: '',
  requiredCertifications: [],
  briefingContent: '',
};

const packHasInput = (d: PackDraft) => {
  const f = d.formData;
  // Picking a job on step 1 fills the form from that job — nothing typed yet.
  if (d.sourceType === 'existing' && d.currentStep <= 1) return false;
  return !!(
    f.title.trim() ||
    f.client.trim() ||
    f.location.trim() ||
    f.scope.trim() ||
    f.hazards.length ||
    f.assignedWorkers.length ||
    f.startDate ||
    f.estimatedValue.trim() ||
    f.briefingContent.trim() ||
    d.currentStep > 1
  );
};

// A clean, icon-free source choice — radio-style selection, editorial type.
function SourceCard({
  label,
  desc,
  selected,
  onClick,
  tag,
}: {
  label: string;
  desc: string;
  selected: boolean;
  onClick: () => void;
  tag?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 touch-manipulation active:scale-[0.99]',
        selected
          ? 'border-elec-yellow/70 bg-white/[0.06]'
          : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04]'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-[14px] font-semibold text-white">{label}</p>
            {tag && (
              <Pill tone="yellow" className="text-[9px] px-1.5 py-0">
                {tag}
              </Pill>
            )}
          </div>
          <p className="mt-0.5 text-[12px] text-white">{desc}</p>
        </div>
        <span
          className={cn(
            'h-4 w-4 rounded-full border shrink-0 flex items-center justify-center transition-colors',
            selected ? 'border-elec-yellow bg-elec-yellow' : 'border-white/20'
          )}
        >
          {selected && <span className="h-1.5 w-1.5 rounded-full bg-black" />}
        </span>
      </div>
    </button>
  );
}

interface AddJobPackDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Pre-select an existing job (e.g. tapping a "Jobs awaiting pack" row). */
  initialJobId?: string | null;
}

export function AddJobPackDialog({
  trigger,
  open: controlledOpen,
  onOpenChange,
  initialJobId,
}: AddJobPackDialogProps) {
  const { data: roleInfo } = useEmployerRole();
  const canSeeMoney = !!roleInfo?.canSeeMoney;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const { user } = useAuth();
  const userId = user?.id ?? null;
  const createJobPack = useCreateJobPack();
  const { data: employees = [] } = useEmployees();
  const { data: jobs = [] } = useJobs();

  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<'fwd' | 'back'>('fwd');
  const [sourceType, setSourceType] = useState<SourceType>('new');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractError, setExtractError] = useState<string | null>(null);
  const [confirmClose, setConfirmClose] = useState(false);
  const [restoredAt, setRestoredAt] = useState<number | null>(null);
  const [clash, setClash] = useState<string | null>(null);

  const [formData, setFormData] = useState<PackForm>(BLANK_PACK);

  // The job whose details are already in the form — so restoring a draft (or
  // the jobs list arriving late) never re-fills over what was typed.
  const prefilledJobRef = useRef<string | null>(null);

  // On open: restore the per-user draft (same step, same answers). Opened
  // from a specific job while a draft for another pack exists → ask first.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (!open) {
      wasOpen.current = false;
      return;
    }
    if (wasOpen.current) return;
    wasOpen.current = true;
    setConfirmClose(false);
    const saved = readDraft<PackDraft>('new-job-pack', userId);
    const savedReal = saved && saved.v.formData ? packHasInput(saved.v) : false;
    if (saved && savedReal) {
      if (initialJobId && saved.v.selectedJobId !== initialJobId) {
        setClash(saved.v.formData.title || 'Untitled pack');
        setSourceType('existing');
        setSelectedJobId(initialJobId);
        return;
      }
      prefilledJobRef.current = saved.v.selectedJobId;
      setFormData({ ...BLANK_PACK, ...saved.v.formData });
      setSourceType(saved.v.sourceType ?? 'new');
      setSelectedJobId(saved.v.selectedJobId ?? null);
      setCurrentStep(Math.min(Math.max(saved.v.currentStep ?? 1, 1), STEPS.length));
      setRestoredAt(saved.savedAt);
      setClash(null);
      return;
    }
    setClash(null);
    // Deep-link prefill: opening from a job lands on the wizard with that job
    // already selected instead of a blank form.
    if (initialJobId) {
      setSourceType('existing');
      setSelectedJobId(initialJobId);
    }
  }, [open, initialJobId, userId]);

  // When selecting an existing job, populate form data
  useEffect(() => {
    if (!selectedJobId || sourceType !== 'existing') return;
    if (prefilledJobRef.current === selectedJobId) return;
    const job = jobs.find((j) => j.id === selectedJobId);
    if (!job) return;
    prefilledJobRef.current = selectedJobId;
    setFormData((prev) => ({
      ...prev,
      title: job.title,
      client: job.client,
      location: job.location,
      scope: job.description || '',
      estimatedValue: job.value ? job.value.toString() : '',
      startDate: job.start_date || '',
    }));
    // The people already booked on the job are the pack's audience — start
    // the Team step with them ticked instead of asking the office to pick
    // the same names again.
    let cancelled = false;
    void (async () => {
      const { data } = await supabase
        .from('employer_job_assignments')
        .select('employee_id, status')
        .eq('job_id', selectedJobId);
      if (cancelled || !data) return;
      const ids = data
        .filter(
          (a) =>
            !['completed', 'cancelled', 'removed', 'ended'].includes(
              String(a.status || '').toLowerCase()
            )
        )
        .map((a) => a.employee_id as string);
      if (ids.length === 0) return;
      setFormData((prev) => ({
        ...prev,
        assignedWorkers: Array.from(new Set([...prev.assignedWorkers, ...ids])),
      }));
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedJobId, sourceType, jobs]);

  const draftValue: PackDraft = { currentStep, sourceType, selectedJobId, formData };
  const dirty = packHasInput(draftValue);
  const { savedAt, reset: resetSaved } = useDraftWriter(
    'new-job-pack',
    userId,
    draftValue,
    currentStep,
    open && dirty && !clash
  );

  const goToStep = (next: number) => {
    if (next === currentStep) return;
    setDirection(next > currentStep ? 'fwd' : 'back');
    setCurrentStep(next);
  };

  const closeNow = (keepDraft: boolean) => {
    // The debounced writer is cancelled on close — flush the last keystrokes.
    if (keepDraft && dirty && !clash && userId) {
      writeDraft('new-job-pack', userId, draftValue, currentStep);
    }
    setConfirmClose(false);
    setOpen(false);
  };

  // Outside tap, Escape, Android back and Cancel all land here.
  const requestClose = () => {
    if (dirty && !clash) {
      setConfirmClose(true);
      return;
    }
    if (!dirty) resetForm();
    closeNow(false);
  };

  const toggleHazard = (hazard: string) => {
    setFormData((prev) => {
      const hazards = prev.hazards.includes(hazard)
        ? prev.hazards.filter((h) => h !== hazard)
        : [...prev.hazards, hazard];
      // Auto-suggest certifications from the hazards — done here rather than
      // in an effect so a restored draft keeps the certs that were chosen.
      return { ...prev, hazards, requiredCertifications: getSuggestedCertifications(hazards) };
    });
  };

  const toggleWorker = (workerId: string) => {
    setFormData((prev) => ({
      ...prev,
      assignedWorkers: prev.assignedWorkers.includes(workerId)
        ? prev.assignedWorkers.filter((id) => id !== workerId)
        : [...prev.assignedWorkers, workerId],
    }));
  };

  const toggleCertification = (cert: string) => {
    setFormData((prev) => ({
      ...prev,
      requiredCertifications: prev.requiredCertifications.includes(cert)
        ? prev.requiredCertifications.filter((c) => c !== cert)
        : [...prev.requiredCertifications, cert],
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.client || !formData.location) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in title, client and location.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createJobPack.mutateAsync({
        // Real FK link to the job — awaiting-pack logic keys off this, with
        // title-matching kept only for legacy rows created before the column.
        job_id: sourceType === 'existing' ? selectedJobId : null,
        title: formData.title,
        client: formData.client,
        location: formData.location,
        scope: formData.scope || null,
        hazards: formData.hazards,
        assigned_workers: formData.assignedWorkers,
        status: 'Draft',
        rams_generated: false,
        method_statement_generated: false,
        briefing_pack_generated: false,
        start_date: formData.startDate || null,
        estimated_value: formData.estimatedValue ? parseFloat(formData.estimatedValue) : null,
        sent_to_workers_at: null,
        briefing_content: formData.briefingContent || null,
        required_certifications: formData.requiredCertifications,
      });

      toast({
        title: 'Job Pack Created',
        description: `${formData.title} has been created successfully.`,
      });

      clearDraft('new-job-pack', userId);
      resetForm();
      setOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create job pack. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setDirection('fwd');
    setSourceType('new');
    setSelectedJobId(null);
    setFormData(BLANK_PACK);
    setRestoredAt(null);
    prefilledJobRef.current = null;
    resetSaved();
  };

  // Read a job sheet (photo or PDF) and pre-fill the pack for review.
  const handleDocumentUpload = async (file: File) => {
    setExtractError(null);
    setIsExtracting(true);
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '');
        reader.onerror = () => reject(new Error('Could not read that file'));
        reader.readAsDataURL(file);
      });

      const { data, error } = await supabase.functions.invoke('parse-job-sheet', {
        body: { file_base64: base64, file_type: file.type },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = data as any;
      if (error || !res?.success) {
        throw error || new Error(res?.error || 'Could not read that document');
      }

      const e = res.extracted;
      setFormData((prev) => ({
        ...prev,
        title: e.title || prev.title,
        client: e.client || prev.client,
        location: e.location || prev.location,
        scope: e.scope || prev.scope,
        hazards: e.hazards?.length ? e.hazards : prev.hazards,
        requiredCertifications: e.requiredCertifications?.length
          ? e.requiredCertifications
          : prev.requiredCertifications,
        estimatedValue: e.estimatedValue ? String(e.estimatedValue) : prev.estimatedValue,
        startDate: e.startDate || prev.startDate,
      }));
      setSourceType('document');
      toast({
        title: 'Job sheet read',
        description: 'Review the extracted details and adjust anything before saving.',
      });
      setCurrentStep(2);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not read that document';
      setExtractError(message);
      toast({
        title: "Couldn't read the sheet",
        description: 'Try a clearer photo or a PDF.',
        variant: 'destructive',
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          sourceType === 'new' ||
          (sourceType === 'existing' && selectedJobId !== null) ||
          (sourceType === 'document' && !!formData.title)
        );
      case 2:
        return formData.title && formData.client && formData.location;
      case 3:
        return true;
      case 4:
        return true;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const activeEmployees = employees.filter((e) => e.status === 'Active');
  const activeJobs = jobs.filter((j) => j.status === 'Active' || j.status === 'Pending');

  // Get assigned employee names for review step
  const assignedEmployeeNames = activeEmployees
    .filter((e) => formData.assignedWorkers.includes(e.id))
    .map((e) => e.name);

  const sourceReady =
    sourceType === 'new' ||
    (sourceType === 'existing' && selectedJobId !== null) ||
    (sourceType === 'document' && !!formData.title);
  const detailsReady = !!(formData.title && formData.client && formData.location);
  const stepDone = [
    sourceReady && currentStep > 1,
    detailsReady,
    formData.hazards.length > 0 || (currentStep > 3 && detailsReady),
    formData.assignedWorkers.length > 0,
    false,
  ];
  // A tab is reachable once everything before it that is required is filled.
  const canReach = (id: number) => id <= 1 || (sourceReady && (id <= 2 || detailsReady));

  const NavigationButtons = () => (
    <div className="mx-auto flex w-full max-w-2xl gap-2">
      {currentStep > 1 ? (
        <SecondaryButton onClick={() => goToStep(currentStep - 1)} fullWidth>
          Back
        </SecondaryButton>
      ) : (
        <SecondaryButton onClick={requestClose} fullWidth>
          Cancel
        </SecondaryButton>
      )}

      {currentStep < 5 ? (
        <PrimaryButton
          onClick={() => goToStep(currentStep + 1)}
          disabled={!canProceed()}
          fullWidth
        >
          Next
        </PrimaryButton>
      ) : (
        <PrimaryButton onClick={handleSubmit} disabled={createJobPack.isPending} fullWidth>
          {createJobPack.isPending ? 'Creating…' : 'Create pack'}
        </PrimaryButton>
      )}
    </div>
  );

  // Render step content inline to prevent input focus loss
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        // Step 1: Source Selection
        return (
          <div className="space-y-5">
            <div>
              <h2 className="text-[19px] font-semibold text-white tracking-tight">
                How do you want to start?
              </h2>
              <p className="mt-1 text-[12.5px] text-white">
                From scratch, an existing job, or read it straight off a job sheet.
              </p>
            </div>

            <div className="space-y-2.5">
              <SourceCard
                label="Start from scratch"
                desc="Build the pack step by step"
                selected={sourceType === 'new'}
                onClick={() => {
                  setSourceType('new');
                  setSelectedJobId(null);
                  setFormData({
                    title: '',
                    client: '',
                    location: '',
                    scope: '',
                    hazards: [],
                    assignedWorkers: [],
                    startDate: '',
                    estimatedValue: '',
                    requiredCertifications: [],
                    briefingContent: '',
                  });
                }}
              />
              <SourceCard
                label="From an existing job"
                desc="Pull in a job you've already created"
                selected={sourceType === 'existing'}
                onClick={() => setSourceType('existing')}
              />
              <SourceCard
                label="From a job sheet"
                desc="Upload a spec or description. We read it for you"
                tag="AI"
                selected={sourceType === 'document'}
                onClick={() => {
                  setSourceType('document');
                  setExtractError(null);
                }}
              />
            </div>

            {sourceType === 'document' && (
              <div>
                <label
                  className={cn(
                    'flex flex-col items-center justify-center gap-2 px-4 py-8 rounded-xl border border-dashed text-center transition-colors',
                    isExtracting
                      ? 'border-elec-yellow/40 bg-white/[0.06] cursor-wait'
                      : 'border-white/15 bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer'
                  )}
                >
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    disabled={isExtracting}
                    onChange={(ev) => {
                      const f = ev.target.files?.[0];
                      if (f) handleDocumentUpload(f);
                      ev.target.value = '';
                    }}
                  />
                  {isExtracting ? (
                    <>
                      <Loader2 className="h-5 w-5 text-elec-yellow animate-spin" />
                      <p className="text-[12.5px] text-white">Reading the job sheet…</p>
                    </>
                  ) : (
                    <>
                      <p className="text-[13px] font-medium text-white">Tap to upload a job sheet</p>
                      <p className="text-[11.5px] text-white">
                        Photo or PDF — spec, scope of works, or description
                      </p>
                    </>
                  )}
                </label>
                {extractError && <p className="mt-2 text-[11.5px] text-red-400">{extractError}</p>}
              </div>
            )}

            {sourceType === 'existing' && (
              <div className="mt-4 space-y-2">
                <label className="text-[11.5px] text-white mb-1.5 block">Select Job</label>
                <div className="max-h-60 overflow-y-auto overscroll-contain rounded-xl border border-white/[0.08] bg-[hsl(0_0%_9%)]">
                  <div className="p-2 space-y-2">
                    {activeJobs.length === 0 ? (
                      <p className="text-center py-6 text-white text-[12.5px]">
                        No active jobs found
                      </p>
                    ) : (
                      activeJobs.map((job) => (
                        <div
                          key={job.id}
                          role="button"
                          tabIndex={0}
                          className={cn(
                            'p-3 min-h-[44px] rounded-lg cursor-pointer transition-all border touch-manipulation',
                            selectedJobId === job.id
                              ? 'bg-white/[0.06] border-elec-yellow'
                              : 'bg-white/[0.04] border-transparent hover:bg-white/[0.08]'
                          )}
                          onClick={() => setSelectedJobId(job.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-white truncate">{job.title}</p>
                              <p className="text-[11px] text-white truncate">
                                {job.client} • {job.location}
                              </p>
                            </div>
                            {selectedJobId === job.id && (
                              <CheckCircle2 className="h-4 w-4 text-elec-yellow shrink-0" />
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        // Step 2: Basic Details
        return (
          <div className="space-y-4">
            <FormCard bleed eyebrow="Pack details">
              <Field label="Job pack title" required>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Commercial Rewiring"
                  className={inputClass}
                  autoComplete={autoCompleteOff}
                />
              </Field>
              <FormGrid cols={2}>
                <Field label="Client" required>
                  <Input
                    value={formData.client}
                    onChange={(e) => setFormData((prev) => ({ ...prev, client: e.target.value }))}
                    placeholder="e.g. Tesco"
                    className={inputClass}
                    autoComplete={autoCompleteOff}
                  />
                </Field>
                <Field label="Location" required>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g. Manchester"
                    className={inputClass}
                    autoComplete={autoCompleteOff}
                  />
                </Field>
              </FormGrid>
              <Field label="Scope of works">
                <Textarea
                  value={formData.scope}
                  onChange={(e) => setFormData((prev) => ({ ...prev, scope: e.target.value }))}
                  placeholder="Describe the scope..."
                  rows={4}
                  className={textareaClass}
                />
              </Field>
              <FormGrid cols={2}>
                <Field label="Start date">
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                    className={inputClass}
                  />
                </Field>
                {canSeeMoney && (
                <Field label="Estimated value (£)">
                  <Input
                    type="number"
                            inputMode="decimal"
                    value={formData.estimatedValue}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, estimatedValue: e.target.value }))
                    }
                    placeholder="50000"
                    className={inputClass}
                    autoComplete={autoCompleteOff}
                  />
                </Field>
                )}
              </FormGrid>
            </FormCard>
          </div>
        );

      case 3:
        // Step 3: Hazards & Certifications
        return (
          <div className="space-y-4">
            <FormCard bleed eyebrow="Site hazards">
              <div className="flex items-center gap-2 -mt-1">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span className="text-[12.5px] text-white">Select applicable hazards</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {COMMON_HAZARDS.map((hazard) => (
                  <Badge
                    key={hazard}
                    variant={formData.hazards.includes(hazard) ? 'default' : 'outline'}
                    className={cn(
                      'cursor-pointer min-h-[44px] py-2 px-3.5 border touch-manipulation text-[12.5px]',
                      formData.hazards.includes(hazard)
                        ? 'bg-white/[0.06] text-amber-300 border-amber-500/40'
                        : 'text-white border-white/[0.08] bg-white/[0.04]'
                    )}
                    onClick={() => toggleHazard(hazard)}
                  >
                    {hazard}
                    {formData.hazards.includes(hazard) && <X className="h-3 w-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </FormCard>

            <FormCard bleed eyebrow="Required certifications">
              <div className="flex items-center gap-2 -mt-1">
                <Award className="h-4 w-4 text-blue-400" />
                <span className="text-[12.5px] text-white">Auto-suggested based on hazards</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {COMMON_CERTIFICATIONS.map((cert) => (
                  <Badge
                    key={cert.name}
                    variant={
                      formData.requiredCertifications.includes(cert.name) ? 'default' : 'outline'
                    }
                    className={cn(
                      'cursor-pointer min-h-[44px] py-2 px-3.5 border touch-manipulation text-[12.5px]',
                      formData.requiredCertifications.includes(cert.name)
                        ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                        : 'text-white border-white/[0.08] bg-white/[0.04]'
                    )}
                    onClick={() => toggleCertification(cert.name)}
                  >
                    {cert.name}
                    {formData.requiredCertifications.includes(cert.name) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </FormCard>

            <FormCard bleed eyebrow="Briefing notes">
              <Field label={undefined}>
                <Textarea
                  value={formData.briefingContent}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, briefingContent: e.target.value }))
                  }
                  placeholder="Access arrangements, PPE requirements, site-specific notes..."
                  rows={4}
                  className={textareaClass}
                />
              </Field>
            </FormCard>
          </div>
        );

      case 4:
        // Step 4: Assign Workers
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-elec-yellow" />
                <span className="text-[13px] font-semibold text-white">Assign Workers</span>
              </div>
              {formData.assignedWorkers.length > 0 && (
                <Badge variant="secondary" className="bg-white/[0.06] text-white border-white/[0.08]">
                  {formData.assignedWorkers.length} selected
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              {activeEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className={cn(
                    'flex items-center gap-3 p-4 rounded-xl transition-all cursor-pointer border',
                    formData.assignedWorkers.includes(employee.id)
                      ? 'bg-white/[0.06] border-elec-yellow/40'
                      : 'bg-[hsl(0_0%_12%)] border-white/[0.08] hover:bg-[hsl(0_0%_15%)]'
                  )}
                  onClick={() => toggleWorker(employee.id)}
                >
                  <div className="w-11 h-11 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0">
                    <span className="text-[13px] font-bold text-elec-yellow">
                      {employee.avatar_initials || employee.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{employee.name}</p>
                    <p className="text-[12.5px] text-white truncate">{employee.team_role}</p>
                  </div>
                  <Checkbox
                    checked={formData.assignedWorkers.includes(employee.id)}
                    onCheckedChange={() => toggleWorker(employee.id)}
                    className={cn(checkboxClass, 'pointer-events-none')}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        // Step 5: Review
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Ready to Create</h2>
              <p className="text-[12.5px] text-white">Review the details below</p>
            </div>

            <div className="space-y-3">
              <FormCard bleed eyebrow="Job pack">
                <p className="font-semibold text-white text-lg -mt-1">
                  {formData.title || 'Untitled'}
                </p>
                <p className="text-[12.5px] text-white">
                  {formData.client} • {formData.location}
                </p>
              </FormCard>

              {formData.hazards.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {formData.hazards.map((h) => (
                    <Badge
                      key={h}
                      variant="outline"
                      className="text-[11px] bg-white/[0.06] text-amber-300 border-amber-500/30"
                    >
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {h}
                    </Badge>
                  ))}
                </div>
              )}

              {assignedEmployeeNames.length > 0 && (
                <FormCard bleed eyebrow={`Team (${assignedEmployeeNames.length})`}>
                  <div className="flex items-center gap-2 -mt-1">
                    <Users className="h-4 w-4 text-elec-yellow" />
                    <span className="text-[12.5px] text-white truncate">
                      {assignedEmployeeNames.join(', ')}
                    </span>
                  </div>
                </FormCard>
              )}

              {canSeeMoney && formData.estimatedValue && (
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                  <span className="text-[12.5px] text-white">Estimated Value</span>
                  <span className="font-semibold text-white tabular-nums">
                    £{parseFloat(formData.estimatedValue).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const draftWord = savedAt
    ? `Draft saved ${timeAgoShort(savedAt)}`
    : restoredAt
      ? `Draft from ${timeAgoShort(restoredAt)}`
      : null;

  return (
    <Sheet
      open={open}
      onOpenChange={(isOpen) => {
        if (isOpen) setOpen(true);
        else requestClose();
      }}
    >
      {trigger && (
        <span
          onClick={() => setOpen(true)}
          className="contents"
        >
          {trigger}
        </span>
      )}
      <SheetContent
        side="bottom"
        hideCloseButton
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08] bg-[hsl(0_0%_8%)]"
      >
        <SheetTitle className="sr-only">New job pack</SheetTitle>
        <div className="relative flex h-full flex-col">
          <div className="flex justify-center pt-2.5 pb-1 shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>
          <div className="shrink-0 border-b border-white/[0.06] px-4 sm:px-5 pb-3">
            <div className="mx-auto w-full max-w-2xl">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Eyebrow>New job pack</Eyebrow>
                  <p className="mt-0.5 text-[19px] font-semibold text-white leading-tight truncate">
                    {formData.title.trim() || 'Untitled pack'}
                  </p>
                </div>
                {draftWord && (
                  <span className="mt-1 shrink-0 text-[11.5px] text-white tabular-nums">
                    {draftWord}
                  </span>
                )}
              </div>
              <div className="mt-3">
                <StepTabs
                  steps={STEPS.map((st, i) => ({ label: st.title, done: stepDone[i] }))}
                  current={currentStep - 1}
                  onSelect={(i) => {
                    if (canReach(i + 1)) goToStep(i + 1);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-5 py-4">
            <div className="mx-auto w-full max-w-2xl space-y-4">
              {clash && (
                <div className="-mx-4 sm:mx-0 border-y sm:border sm:rounded-2xl border-elec-yellow/40 bg-white/[0.03] p-4 space-y-3">
                  <p className="text-[13.5px] text-white leading-snug">
                    You have an unsaved pack draft, <span className="font-semibold">{clash}</span>.
                    Starting a pack for this job will replace it.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <SecondaryButton
                      fullWidth
                      onClick={() => {
                        const saved = readDraft<PackDraft>('new-job-pack', userId);
                        if (saved) {
                          prefilledJobRef.current = saved.v.selectedJobId;
                          setFormData({ ...BLANK_PACK, ...saved.v.formData });
                          setSourceType(saved.v.sourceType ?? 'new');
                          setSelectedJobId(saved.v.selectedJobId ?? null);
                          setCurrentStep(
                            Math.min(Math.max(saved.v.currentStep ?? 1, 1), STEPS.length)
                          );
                          setRestoredAt(saved.savedAt);
                        }
                        setClash(null);
                      }}
                    >
                      Resume draft
                    </SecondaryButton>
                    <PrimaryButton fullWidth onClick={() => setClash(null)}>
                      Start new
                    </PrimaryButton>
                  </div>
                </div>
              )}
              <div
                key={currentStep}
                className={direction === 'fwd' ? 'animate-mw-step-in' : 'animate-mw-step-back'}
              >
                {renderStepContent()}
              </div>
            </div>
          </div>

          <div className="shrink-0 border-t border-white/[0.06] px-4 sm:px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <NavigationButtons />
          </div>

          <KeepDraftPrompt
            open={confirmClose}
            what={formData.title.trim() ? `“${formData.title.trim()}”` : 'a new job pack'}
            onKeep={() => closeNow(true)}
            onCancel={() => setConfirmClose(false)}
            onDiscard={() => {
              clearDraft('new-job-pack', userId);
              resetForm();
              closeNow(false);
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
