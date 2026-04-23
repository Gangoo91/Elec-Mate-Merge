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
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Briefcase,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Field,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
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
  { id: 1, title: 'Source', icon: Briefcase },
  { id: 2, title: 'Details', icon: Package },
  { id: 3, title: 'Hazards', icon: AlertTriangle },
  { id: 4, title: 'Team', icon: Users },
  { id: 5, title: 'Review', icon: CheckCircle2 },
];

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
  const [sourceType, setSourceType] = useState<'new' | 'existing'>('new');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

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

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return sourceType === 'new' || selectedJobId !== null;
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

  // Step Progress Indicator
  const ProgressIndicator = () => (
    <div className="flex items-center justify-between px-1 sm:px-2 py-3 mb-3">
      {STEPS.map((step, index) => {
        const StepIcon = step.icon;
        const isActive = currentStep === step.id;
        const isComplete = currentStep > step.id;

        return (
          <div key={step.id} className="flex items-center">
            <div
              className={cn(
                'flex flex-col items-center cursor-pointer transition-all duration-200',
                isActive && 'scale-105'
              )}
              onClick={() => step.id < currentStep && setCurrentStep(step.id)}
            >
              <div
                className={cn(
                  'w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200',
                  isComplete && 'bg-emerald-500 text-black',
                  isActive && 'bg-elec-yellow text-black ring-2 ring-elec-yellow/25',
                  !isComplete && !isActive && 'bg-white/[0.06] text-white'
                )}
              >
                {isComplete ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <StepIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </div>
              <span
                className={cn(
                  'text-[10px] sm:text-xs mt-1 font-medium transition-colors',
                  isActive && 'text-elec-yellow',
                  isComplete && 'text-emerald-400',
                  !isComplete && !isActive && 'text-white'
                )}
              >
                {step.title}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  'w-3 sm:w-5 h-0.5 mx-0.5 sm:mx-1 rounded-full transition-colors',
                  isComplete ? 'bg-emerald-500' : 'bg-white/[0.06]'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  // Navigation buttons component
  const NavigationButtons = () => (
    <div className="flex gap-3 mt-6 pt-4">
      {currentStep > 1 ? (
        <SecondaryButton onClick={() => setCurrentStep((prev) => prev - 1)} fullWidth>
          <ChevronLeft className="h-4 w-4 mr-1" />
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
          <ChevronRight className="h-4 w-4 ml-1" />
        </PrimaryButton>
      ) : (
        <PrimaryButton
          onClick={handleSubmit}
          disabled={createJobPack.isPending}
          fullWidth
        >
          {createJobPack.isPending ? (
            'Creating...'
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              Create Pack
            </>
          )}
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
          <div className="space-y-4">
            <div className="text-center mb-5">
              <h2 className="text-lg font-semibold text-white">Create Job Pack</h2>
              <p className="text-[12.5px] text-white">
                Start from scratch or import from an existing job
              </p>
            </div>

            <div className="grid gap-3">
              <div
                className={cn(
                  'p-5 rounded-2xl border cursor-pointer transition-all duration-200 active:scale-[0.98]',
                  sourceType === 'new'
                    ? 'border-elec-yellow bg-elec-yellow/10'
                    : 'border-white/[0.08] bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)]'
                )}
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
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'p-3 rounded-xl transition-colors',
                      sourceType === 'new' ? 'bg-elec-yellow text-black' : 'bg-white/[0.06] text-white'
                    )}
                  >
                    <Plus className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">New Job Pack</p>
                    <p className="text-[12.5px] text-white">Create from scratch</p>
                  </div>
                  {sourceType === 'new' && <CheckCircle2 className="h-6 w-6 text-elec-yellow" />}
                </div>
              </div>

              <div
                className={cn(
                  'p-5 rounded-2xl border cursor-pointer transition-all duration-200 active:scale-[0.98]',
                  sourceType === 'existing'
                    ? 'border-elec-yellow bg-elec-yellow/10'
                    : 'border-white/[0.08] bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)]'
                )}
                onClick={() => setSourceType('existing')}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'p-3 rounded-xl transition-colors',
                      sourceType === 'existing' ? 'bg-elec-yellow text-black' : 'bg-white/[0.06] text-white'
                    )}
                  >
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">From Existing Job</p>
                    <p className="text-[12.5px] text-white">Import job details</p>
                  </div>
                  {sourceType === 'existing' && (
                    <CheckCircle2 className="h-6 w-6 text-elec-yellow" />
                  )}
                </div>
              </div>
            </div>

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
