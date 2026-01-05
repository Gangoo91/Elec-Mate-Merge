import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCreateJobPack } from "@/hooks/useJobPacks";
import { useEmployees } from "@/hooks/useEmployees";
import { useJobs } from "@/hooks/useJobs";
import { toast } from "@/hooks/use-toast";
import { getSuggestedCertifications, COMMON_CERTIFICATIONS } from "@/services/jobPackDocumentService";
import { 
  Package, Plus, X, MapPin, AlertTriangle, Users, Calendar, 
  PoundSterling, Award, FileText, ChevronRight, ChevronLeft,
  CheckCircle2, Briefcase, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const COMMON_HAZARDS = [
  "Working at height",
  "Live testing",
  "Asbestos risk",
  "Confined spaces",
  "Heavy lifting",
  "Traffic management",
  "Underground services",
  "Occupied building",
];

const STEPS = [
  { id: 1, title: "Source", icon: Briefcase },
  { id: 2, title: "Details", icon: Package },
  { id: 3, title: "Hazards", icon: AlertTriangle },
  { id: 4, title: "Team", icon: Users },
  { id: 5, title: "Review", icon: CheckCircle2 },
];

interface AddJobPackDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AddJobPackDialog({ trigger, open: controlledOpen, onOpenChange }: AddJobPackDialogProps) {
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
    title: "",
    client: "",
    location: "",
    scope: "",
    hazards: [] as string[],
    assignedWorkers: [] as string[],
    startDate: "",
    estimatedValue: "",
    requiredCertifications: [] as string[],
    briefingContent: "",
  });

  // Auto-suggest certifications based on hazards
  useEffect(() => {
    const suggested = getSuggestedCertifications(formData.hazards);
    setFormData(prev => ({
      ...prev,
      requiredCertifications: suggested,
    }));
  }, [formData.hazards]);

  // When selecting an existing job, populate form data
  useEffect(() => {
    if (selectedJobId && sourceType === 'existing') {
      const job = jobs.find(j => j.id === selectedJobId);
      if (job) {
        setFormData(prev => ({
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
    setFormData(prev => ({
      ...prev,
      hazards: prev.hazards.includes(hazard)
        ? prev.hazards.filter(h => h !== hazard)
        : [...prev.hazards, hazard],
    }));
  };

  const toggleWorker = (workerId: string) => {
    setFormData(prev => ({
      ...prev,
      assignedWorkers: prev.assignedWorkers.includes(workerId)
        ? prev.assignedWorkers.filter(id => id !== workerId)
        : [...prev.assignedWorkers, workerId],
    }));
  };

  const toggleCertification = (cert: string) => {
    setFormData(prev => ({
      ...prev,
      requiredCertifications: prev.requiredCertifications.includes(cert)
        ? prev.requiredCertifications.filter(c => c !== cert)
        : [...prev.requiredCertifications, cert],
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.client || !formData.location) {
      toast({
        title: "Missing Fields",
        description: "Please fill in title, client and location.",
        variant: "destructive",
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
        status: "Draft",
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
        title: "Job Pack Created",
        description: `${formData.title} has been created successfully.`,
      });

      resetForm();
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create job pack. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSourceType('new');
    setSelectedJobId(null);
    setFormData({
      title: "",
      client: "",
      location: "",
      scope: "",
      hazards: [],
      assignedWorkers: [],
      startDate: "",
      estimatedValue: "",
      requiredCertifications: [],
      briefingContent: "",
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return sourceType === 'new' || selectedJobId !== null;
      case 2: return formData.title && formData.client && formData.location;
      case 3: return true;
      case 4: return true;
      case 5: return true;
      default: return false;
    }
  };

  const activeEmployees = employees.filter(e => e.status === "Active");
  const activeJobs = jobs.filter(j => j.status === "Active" || j.status === "Pending");

  // Get assigned employee names for review step
  const assignedEmployeeNames = activeEmployees
    .filter(e => formData.assignedWorkers.includes(e.id))
    .map(e => e.name);

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
                "flex flex-col items-center cursor-pointer transition-all duration-200",
                isActive && "scale-105"
              )}
              onClick={() => step.id < currentStep && setCurrentStep(step.id)}
            >
              <div className={cn(
                "w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200",
                isComplete && "bg-success text-success-foreground",
                isActive && "bg-elec-yellow text-elec-dark ring-2 ring-elec-yellow/25",
                !isComplete && !isActive && "bg-muted text-muted-foreground"
              )}>
                {isComplete ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <StepIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </div>
              <span className={cn(
                "text-[10px] sm:text-xs mt-1 font-medium transition-colors",
                isActive && "text-elec-yellow",
                isComplete && "text-success",
                !isComplete && !isActive && "text-muted-foreground"
              )}>
                {step.title}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div className={cn(
                "w-3 sm:w-5 h-0.5 mx-0.5 sm:mx-1 rounded-full transition-colors",
                isComplete ? "bg-success" : "bg-muted"
              )} />
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
        <Button 
          type="button" 
          variant="outline" 
          className="flex-1 h-14 text-base"
          onClick={() => setCurrentStep(prev => prev - 1)}
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back
        </Button>
      ) : (
        <Button 
          type="button" 
          variant="ghost" 
          className="flex-1 h-14 text-base text-muted-foreground"
          onClick={() => { resetForm(); setOpen(false); }}
        >
          Cancel
        </Button>
      )}

      {currentStep < 5 ? (
        <Button 
          className="flex-1 h-14 text-base font-semibold"
          onClick={() => setCurrentStep(prev => prev + 1)}
          disabled={!canProceed()}
        >
          Next
          <ChevronRight className="h-5 w-5 ml-1" />
        </Button>
      ) : (
        <Button 
          className="flex-1 h-14 text-base font-semibold gap-2"
          onClick={handleSubmit}
          disabled={createJobPack.isPending}
        >
          {createJobPack.isPending ? (
            <>Creating...</>
          ) : (
            <>
              <Zap className="h-5 w-5" />
              Create Pack
            </>
          )}
        </Button>
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
              <h2 className="text-lg font-semibold text-foreground">Create Job Pack</h2>
              <p className="text-sm text-muted-foreground">Start from scratch or import from an existing job</p>
            </div>

            <div className="grid gap-3">
              <div
                className={cn(
                  "p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 active:scale-[0.98]",
                  sourceType === 'new' 
                    ? "border-elec-yellow bg-elec-yellow/10" 
                    : "border-border hover:border-elec-yellow/50 hover:bg-muted/30"
                )}
                onClick={() => {
                  setSourceType('new');
                  setSelectedJobId(null);
                  setFormData({
                    title: "", client: "", location: "", scope: "",
                    hazards: [], assignedWorkers: [], startDate: "",
                    estimatedValue: "", requiredCertifications: [], briefingContent: "",
                  });
                }}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-3 rounded-xl transition-colors",
                    sourceType === 'new' ? "bg-elec-yellow text-elec-dark" : "bg-muted"
                  )}>
                    <Plus className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">New Job Pack</p>
                    <p className="text-sm text-muted-foreground">Create from scratch</p>
                  </div>
                  {sourceType === 'new' && <CheckCircle2 className="h-6 w-6 text-elec-yellow" />}
                </div>
              </div>

              <div
                className={cn(
                  "p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 active:scale-[0.98]",
                  sourceType === 'existing' 
                    ? "border-elec-yellow bg-elec-yellow/10" 
                    : "border-border hover:border-elec-yellow/50 hover:bg-muted/30"
                )}
                onClick={() => setSourceType('existing')}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-3 rounded-xl transition-colors",
                    sourceType === 'existing' ? "bg-elec-yellow text-elec-dark" : "bg-muted"
                  )}>
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">From Existing Job</p>
                    <p className="text-sm text-muted-foreground">Import job details</p>
                  </div>
                  {sourceType === 'existing' && <CheckCircle2 className="h-6 w-6 text-elec-yellow" />}
                </div>
              </div>
            </div>

            {sourceType === 'existing' && (
              <div className="mt-4 space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Select Job</Label>
                <ScrollArea className="h-48 rounded-xl border border-border">
                  <div className="p-2 space-y-2">
                    {activeJobs.length === 0 ? (
                      <p className="text-center py-6 text-muted-foreground text-sm">No active jobs found</p>
                    ) : (
                      activeJobs.map(job => (
                        <div
                          key={job.id}
                          className={cn(
                            "p-3 rounded-lg cursor-pointer transition-all",
                            selectedJobId === job.id 
                              ? "bg-elec-yellow/10 border border-elec-yellow" 
                              : "bg-muted/30 hover:bg-muted/50"
                          )}
                          onClick={() => setSelectedJobId(job.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-foreground truncate">{job.title}</p>
                              <p className="text-xs text-muted-foreground truncate">{job.client} • {job.location}</p>
                            </div>
                            {selectedJobId === job.id && <CheckCircle2 className="h-4 w-4 text-elec-yellow shrink-0" />}
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
        // Step 2: Basic Details - Improved mobile layout
        return (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Job Pack Title <span className="text-destructive">*</span>
              </Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Commercial Rewiring"
                className="h-14 text-base"
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Client <span className="text-destructive">*</span>
              </Label>
              <Input
                value={formData.client}
                onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                placeholder="e.g. Tesco"
                className="h-14 text-base"
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> Location <span className="text-destructive">*</span>
              </Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g. Manchester"
                className="h-14 text-base"
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Scope of Works</Label>
              <Textarea
                value={formData.scope}
                onChange={(e) => setFormData(prev => ({ ...prev, scope: e.target.value }))}
                placeholder="Describe the scope..."
                rows={4}
                className="resize-none text-base min-h-[120px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" /> Start Date
                </Label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  className="h-14 text-base"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-1.5">
                  <PoundSterling className="h-4 w-4" /> Est. Value
                </Label>
                <Input
                  type="number"
                  value={formData.estimatedValue}
                  onChange={(e) => setFormData(prev => ({ ...prev, estimatedValue: e.target.value }))}
                  placeholder="50000"
                  className="h-14 text-base"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        // Step 3: Hazards & Certifications
        return (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-warning/10 border border-warning/30">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <Label className="font-semibold text-foreground">Site Hazards</Label>
              </div>
              <div className="flex flex-wrap gap-2">
                {COMMON_HAZARDS.map(hazard => (
                  <Badge
                    key={hazard}
                    variant={formData.hazards.includes(hazard) ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer py-2 px-3",
                      formData.hazards.includes(hazard) 
                        ? "bg-warning text-warning-foreground" 
                        : "text-foreground"
                    )}
                    onClick={() => toggleHazard(hazard)}
                  >
                    {hazard}
                    {formData.hazards.includes(hazard) && <X className="h-3 w-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-info/10 border border-info/30">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-info" />
                <Label className="font-semibold text-foreground">Required Certifications</Label>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Auto-suggested based on hazards</p>
              <div className="flex flex-wrap gap-2">
                {COMMON_CERTIFICATIONS.map(cert => (
                  <Badge
                    key={cert.name}
                    variant={formData.requiredCertifications.includes(cert.name) ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer py-2 px-3",
                      formData.requiredCertifications.includes(cert.name) 
                        ? "bg-info text-info-foreground" 
                        : "text-foreground"
                    )}
                    onClick={() => toggleCertification(cert.name)}
                  >
                    {cert.name}
                    {formData.requiredCertifications.includes(cert.name) && <X className="h-3 w-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1.5">
                <FileText className="h-4 w-4" /> Briefing Notes
              </Label>
              <Textarea
                value={formData.briefingContent}
                onChange={(e) => setFormData(prev => ({ ...prev, briefingContent: e.target.value }))}
                placeholder="Access arrangements, PPE requirements, site-specific notes..."
                rows={4}
                className="resize-none text-base min-h-[120px]"
              />
            </div>
          </div>
        );

      case 4:
        // Step 4: Assign Workers
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-elec-yellow" />
                <Label className="font-semibold text-foreground">Assign Workers</Label>
              </div>
              {formData.assignedWorkers.length > 0 && (
                <Badge variant="secondary">{formData.assignedWorkers.length} selected</Badge>
              )}
            </div>

            <div className="space-y-2">
              {activeEmployees.map((employee) => (
                <div 
                  key={employee.id} 
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl transition-all cursor-pointer border",
                    formData.assignedWorkers.includes(employee.id)
                      ? "bg-elec-yellow/10 border-elec-yellow/30"
                      : "bg-muted/30 border-transparent hover:bg-muted/50"
                  )}
                  onClick={() => toggleWorker(employee.id)}
                >
                  <div className="w-11 h-11 rounded-full bg-elec-yellow/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-elec-yellow">
                      {employee.avatar_initials || employee.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{employee.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{employee.team_role}</p>
                  </div>
                  <Checkbox 
                    checked={formData.assignedWorkers.includes(employee.id)}
                    onCheckedChange={() => toggleWorker(employee.id)}
                    className="pointer-events-none h-5 w-5"
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
              <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Ready to Create</h2>
              <p className="text-sm text-muted-foreground">Review the details below</p>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                <p className="text-xs text-muted-foreground uppercase mb-1">Job Pack</p>
                <p className="font-semibold text-foreground text-lg">{formData.title || 'Untitled'}</p>
                <p className="text-sm text-muted-foreground">{formData.client} • {formData.location}</p>
              </div>

              {formData.hazards.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {formData.hazards.map(h => (
                    <Badge key={h} variant="outline" className="text-xs bg-warning/10 text-warning border-warning/30">
                      <AlertTriangle className="h-3 w-3 mr-1" />{h}
                    </Badge>
                  ))}
                </div>
              )}

              {assignedEmployeeNames.length > 0 && (
                <div className="p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm font-medium text-foreground">Team ({assignedEmployeeNames.length})</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{assignedEmployeeNames.join(', ')}</p>
                </div>
              )}

              {formData.estimatedValue && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground">Estimated Value</span>
                  <span className="font-semibold text-foreground">£{parseFloat(formData.estimatedValue).toLocaleString()}</span>
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
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-elec-yellow/10">
        <Package className="h-5 w-5 text-elec-yellow" />
      </div>
      <span className="text-lg font-semibold">New Job Pack</span>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={(isOpen) => { if (!isOpen) resetForm(); setOpen(isOpen); }}>
        <DrawerTrigger asChild>
          {trigger || (
            <Button className="w-full md:w-auto gap-2">
              <Plus className="h-4 w-4" />
              New Job Pack
            </Button>
          )}
        </DrawerTrigger>
        <DrawerContent className="h-[90vh] flex flex-col">
          <DrawerHeader className="py-3 px-5 border-b border-border/50 shrink-0">
            <DrawerTitle>{header}</DrawerTitle>
          </DrawerHeader>
          <div className="flex-1 px-4 py-3 overflow-hidden">
            {formContent}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) resetForm(); setOpen(isOpen); }}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="w-full md:w-auto gap-2">
            <Plus className="h-4 w-4" />
            New Job Pack
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[85vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b border-border/50 shrink-0">
          <DialogTitle>{header}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 p-6 pt-4 overflow-hidden">
          {formContent}
        </div>
      </DialogContent>
    </Dialog>
  );
}
