import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  Package,
  Plus,
  X,
  MapPin,
  AlertTriangle,
  Users,
  Calendar,
  PoundSterling,
  Award,
  FileText,
  CheckCircle2,
  Briefcase,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
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
  { id: 1, title: 'Source' },
  { id: 2, title: 'Details' },
  { id: 3, title: 'Hazards' },
  { id: 4, title: 'Team' },
  { id: 5, title: 'Review' },
];

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
          ? 'border-elec-yellow/70 bg-elec-yellow/[0.07]'
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
          <p className="mt-0.5 text-[12px] text-white/55">{desc}</p>
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
}

export function AddJobPackDialog({
  trigger,
  open: controlledOpen,
  onOpenChange,
}: AddJobPackDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const isMobile = useIsMobile();
  const createJobPack = useCreateJobPack();
  const { data: employees = [] } = useEmployees();
  const { data: jobs = [] } = useJobs();

  const [currentStep, setCurrentStep] = useState(1);
  const [sourceType, setSourceType] = useState<'new' | 'existing' | 'document'>('new');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractError, setExtractError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    client: '',
    location: '',
    scope: '',
    hazards: [] as string[],
    assignedWorkers: [] as string[],
    startDate: '',
    estimatedValue: '',
    requiredCertifications: [] as string[],
    briefingContent: '',
  });

  // Auto-suggest certifications based on hazards
  useEffect(() => {
    const suggested = getSuggestedCertifications(formData.hazards);
    setFormData((prev) => ({
      ...prev,
      requiredCertifications: suggested,
    }));
  }, [formData.hazards]);

  // When selecting an existing job, populate form data
  useEffect(() => {
    if (selectedJobId && sourceType === 'existing') {
      const job = jobs.find((j) => j.id === selectedJobId);
      if (job) {
        setFormData((prev) => ({
          ...prev,
          title: job.title,
          client: job.client,
          location: job.location,
          scope: job.description || '',
          estimatedValue: job.value?.toString() || '',
          startDate: job.start_date || '',
        }));
      }
    }
  }, [selectedJobId, sourceType, jobs]);

  const toggleHazard = (hazard: string) => {
    setFormData((prev) => ({
      ...prev,
      hazards: prev.hazards.includes(hazard)
        ? prev.hazards.filter((h) => h !== hazard)
        : [...prev.hazards, hazard],
    }));
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

  // Step progress — segmented bar + "Step 02 / 05 · Title", no icons.
  const ProgressIndicator = () => (
    <div className="px-1 sm:px-2 pt-1 pb-4">
      <div className="flex items-center justify-between mb-2.5">
        <Eyebrow>
          Step {String(currentStep).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
        </Eyebrow>
        <span className="text-[11px] font-medium text-white/55">
          {STEPS[currentStep - 1].title}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        {STEPS.map((step) => {
          const isDone = currentStep > step.id;
          const isActive = currentStep === step.id;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => step.id < currentStep && setCurrentStep(step.id)}
              disabled={step.id >= currentStep}
              aria-label={step.title}
              className={cn(
                'h-1 flex-1 rounded-full transition-colors duration-300 touch-manipulation',
                isDone && 'bg-elec-yellow',
                isActive && 'bg-elec-yellow/90',
                !isDone && !isActive && 'bg-white/[0.08]'
              )}
            />
          );
        })}
      </div>
    </div>
  );

  // Navigation buttons component
  const NavigationButtons = () => (
    <div className="flex gap-3 mt-6 pt-4">
      {currentStep > 1 ? (
        <SecondaryButton onClick={() => setCurrentStep((prev) => prev - 1)} fullWidth>
          Back
        </SecondaryButton>
      ) : (
        <SecondaryButton
          onClick={() => {
            resetForm();
            setOpen(false);
          }}
          fullWidth
        >
          Cancel
        </SecondaryButton>
      )}

      {currentStep < 5 ? (
        <PrimaryButton
          onClick={() => setCurrentStep((prev) => prev + 1)}
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
              <Eyebrow>New job pack</Eyebrow>
              <h2 className="mt-1.5 text-[19px] font-semibold text-white tracking-tight">
                How do you want to start?
              </h2>
              <p className="mt-1 text-[12.5px] text-white/55">
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
                desc="Upload a spec or description — we read it for you"
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
                      ? 'border-elec-yellow/40 bg-elec-yellow/[0.04] cursor-wait'
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
                      <p className="text-[11.5px] text-white/55">
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
                <ScrollArea className="h-48 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_9%)]">
                  <div className="p-2 space-y-2">
                    {activeJobs.length === 0 ? (
                      <p className="text-center py-6 text-white text-[12.5px]">
                        No active jobs found
                      </p>
                    ) : (
                      activeJobs.map((job) => (
                        <div
                          key={job.id}
                          className={cn(
                            'p-3 rounded-lg cursor-pointer transition-all border',
                            selectedJobId === job.id
                              ? 'bg-elec-yellow/10 border-elec-yellow'
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
                </ScrollArea>
              </div>
            )}
          </div>
        );

      case 2:
        // Step 2: Basic Details
        return (
          <div className="space-y-4">
            <FormCard eyebrow="Pack details">
              <Field label="Job pack title" required>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Commercial Rewiring"
                  className={inputClass}
                  autoComplete="off"
                />
              </Field>
              <FormGrid cols={2}>
                <Field label="Client" required>
                  <Input
                    value={formData.client}
                    onChange={(e) => setFormData((prev) => ({ ...prev, client: e.target.value }))}
                    placeholder="e.g. Tesco"
                    className={inputClass}
                    autoComplete="off"
                  />
                </Field>
                <Field label="Location" required>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g. Manchester"
                    className={inputClass}
                    autoComplete="off"
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
                <Field label="Estimated value (£)">
                  <Input
                    type="number"
                    value={formData.estimatedValue}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, estimatedValue: e.target.value }))
                    }
                    placeholder="50000"
                    className={inputClass}
                    autoComplete="off"
                  />
                </Field>
              </FormGrid>
            </FormCard>
          </div>
        );

      case 3:
        // Step 3: Hazards & Certifications
        return (
          <div className="space-y-4">
            <FormCard eyebrow="Site hazards">
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
                      'cursor-pointer py-2 px-3 border',
                      formData.hazards.includes(hazard)
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
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

            <FormCard eyebrow="Required certifications">
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
                      'cursor-pointer py-2 px-3 border',
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

            <FormCard eyebrow="Briefing notes">
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
                      ? 'bg-elec-yellow/10 border-elec-yellow/40'
                      : 'bg-[hsl(0_0%_12%)] border-white/[0.08] hover:bg-[hsl(0_0%_15%)]'
                  )}
                  onClick={() => toggleWorker(employee.id)}
                >
                  <div className="w-11 h-11 rounded-full bg-elec-yellow/20 flex items-center justify-center shrink-0">
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
              <FormCard eyebrow="Job pack">
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
                      className="text-[11px] bg-amber-500/10 text-amber-300 border-amber-500/30"
                    >
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {h}
                    </Badge>
                  ))}
                </div>
              )}

              {assignedEmployeeNames.length > 0 && (
                <FormCard eyebrow={`Team (${assignedEmployeeNames.length})`}>
                  <div className="flex items-center gap-2 -mt-1">
                    <Users className="h-4 w-4 text-elec-yellow" />
                    <span className="text-[12.5px] text-white truncate">
                      {assignedEmployeeNames.join(', ')}
                    </span>
                  </div>
                </FormCard>
              )}

              {formData.estimatedValue && (
                <div className="flex items-center justify-between p-4 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
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

  const formContent = (
    <div className="flex flex-col h-full">
      <ProgressIndicator />

      <ScrollArea className="flex-1">
        <div className="px-1 pb-8">
          {renderStepContent()}
          <NavigationButtons />
        </div>
      </ScrollArea>
    </div>
  );

  const header = (
    <div className="flex items-center gap-3 text-white">
      <div className="p-2 rounded-lg bg-elec-yellow/10">
        <Package className="h-5 w-5 text-elec-yellow" />
      </div>
      <span className="text-lg font-semibold">New Job Pack</span>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) resetForm();
          setOpen(isOpen);
        }}
      >
        <DrawerTrigger asChild>
          {trigger || (
            <Button className="w-full md:w-auto gap-2">
              <Plus className="h-4 w-4" />
              New Job Pack
            </Button>
          )}
        </DrawerTrigger>
        <DrawerContent className="h-[90vh] flex flex-col bg-[hsl(0_0%_8%)] border-white/[0.08]">
          <DrawerHeader className="py-3 px-5 border-b border-white/[0.06] shrink-0">
            <DrawerTitle>{header}</DrawerTitle>
          </DrawerHeader>
          <div className="flex-1 px-4 py-3 overflow-hidden">{formContent}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) resetForm();
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        {trigger || (
          <Button className="w-full md:w-auto gap-2">
            <Plus className="h-4 w-4" />
            New Job Pack
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[85vh] flex flex-col p-0 bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <DialogHeader className="p-6 pb-4 border-b border-white/[0.06] shrink-0">
          <DialogTitle>{header}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 p-6 pt-4 overflow-hidden">{formContent}</div>
      </DialogContent>
    </Dialog>
  );
}
