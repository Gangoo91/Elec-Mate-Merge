import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateJob } from "@/hooks/useJobs";
import { toast } from "@/hooks/use-toast";
import { Briefcase, Plus, MapPin, Calendar, Users, PoundSterling } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useOptionalVoiceFormContext } from "@/contexts/VoiceFormContext";

const JOB_STATUSES = ["Active", "Pending", "On Hold"];

interface AddJobDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AddJobDialog({ trigger, open: controlledOpen, onOpenChange }: AddJobDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  
  const isMobile = useIsMobile();
  const createJob = useCreateJob();
  
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    location: "",
    status: "Active",
    value: "",
    startDate: "",
    endDate: "",
    workersCount: "1",
    description: "",
  });

  // Voice form registration
  const voiceContext = useOptionalVoiceFormContext();
  
  useEffect(() => {
    if (!open || !voiceContext) return;
    
    voiceContext.registerForm({
      formId: 'create-job',
      formName: 'Create Job',
      fields: [
        { name: 'title', label: 'Job Title', type: 'text', required: true },
        { name: 'client', label: 'Client', type: 'text', required: true },
        { name: 'location', label: 'Location', type: 'text', required: true },
        { name: 'status', label: 'Status', type: 'text' },
        { name: 'value', label: 'Job Value', type: 'text' },
        { name: 'startDate', label: 'Start Date', type: 'text' },
        { name: 'endDate', label: 'End Date', type: 'text' },
        { name: 'workersCount', label: 'Workers Required', type: 'text' },
        { name: 'description', label: 'Description', type: 'text' },
      ],
      onFillField: (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
      },
      onSubmit: () => {
        const form = document.getElementById('job-form') as HTMLFormElement;
        if (form) form.requestSubmit();
      },
      onCancel: () => setOpen(false),
    });
    
    return () => voiceContext.unregisterForm('create-job');
  }, [open, voiceContext]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.client || !formData.location) {
      toast({
        title: "Missing Fields",
        description: "Please fill in job title, client and location.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createJob.mutateAsync({
        title: formData.title,
        client: formData.client,
        location: formData.location,
        status: formData.status as 'Active' | 'Pending' | 'Completed' | 'On Hold' | 'Cancelled',
        value: formData.value ? parseFloat(formData.value) : 0,
        start_date: formData.startDate || null,
        end_date: formData.endDate || null,
        workers_count: parseInt(formData.workersCount) || 1,
        description: formData.description || null,
        progress: 0,
        lat: null,
        lng: null,
      });

      toast({
        title: "Job Created",
        description: `${formData.title} has been created successfully.`,
      });

      setFormData({
        title: "",
        client: "",
        location: "",
        status: "Active",
        value: "",
        startDate: "",
        endDate: "",
        workersCount: "1",
        description: "",
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create job. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formContent = (
    <form id="job-form" onSubmit={handleSubmit} className="space-y-6 pt-2">
      {/* Basic Details Section */}
      <div className="space-y-4 p-4 rounded-xl bg-muted/30 border border-border/50">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Briefcase className="h-4 w-4 text-elec-yellow" />
          Job Details
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Job Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. Commercial Rewiring"
              className="h-12 bg-background border-border/60 focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Client <span className="text-destructive">*</span>
              </Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                placeholder="e.g. Tesco Express"
                className="h-12 bg-background border-border/60 focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                Location <span className="text-destructive">*</span>
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g. Manchester, M1 4BD"
                className="h-12 bg-background border-border/60 focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Value & Status Section */}
      <div className="space-y-4 p-4 rounded-xl bg-success/5 border border-success/20">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <PoundSterling className="h-4 w-4 text-success" />
          Financial & Status
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="value" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Job Value (£)
            </Label>
            <Input
              id="value"
              type="number"
              value={formData.value}
              onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
              placeholder="50000"
              className="h-12 bg-background border-border/60 focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(val) => setFormData(prev => ({ ...prev, status: val }))}>
              <SelectTrigger className="h-12 bg-background border-border/60 focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {JOB_STATUSES.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Schedule Section */}
      <div className="space-y-4 p-4 rounded-xl bg-info/5 border border-info/20">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Calendar className="h-4 w-4 text-info" />
          Schedule
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Start Date
            </Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              className="h-12 bg-background border-border/60 focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              End Date
            </Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              className="h-12 bg-background border-border/60 focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20"
            />
          </div>
        </div>
      </div>

      {/* Workers Section */}
      <div className="space-y-2">
        <Label htmlFor="workers" className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" />
          Workers Required
        </Label>
        <Input
          id="workers"
          type="number"
          min="1"
          value={formData.workersCount}
          onChange={(e) => setFormData(prev => ({ ...prev, workersCount: e.target.value }))}
          className="h-12 bg-background border-border/60 focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Description
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Describe the scope of work..."
          rows={3}
          className="bg-background border-border/60 focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20 resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-6 border-t border-border/50">
        <Button type="button" variant="outline" className="flex-1 h-12 font-medium" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" className="flex-1 h-12 font-semibold gap-2" disabled={createJob.isPending}>
          {createJob.isPending ? (
            <>Creating...</>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Create Job
            </>
          )}
        </Button>
      </div>
    </form>
  );

  const header = (
    <div className="flex items-center gap-3 text-xl">
      <div className="p-2 rounded-lg bg-elec-yellow/10">
        <Briefcase className="h-5 w-5 text-elec-yellow" />
      </div>
      Create New Job
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        {trigger !== null && (
          <DrawerTrigger asChild>
            {trigger || (
              <Button className="w-full md:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                New Job
              </Button>
            )}
          </DrawerTrigger>
        )}
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="pb-4 border-b border-border/50">
            <DrawerTitle>{header}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6 overflow-y-auto">
            {formContent}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger !== null && (
        <DialogTrigger asChild>
          {trigger || (
            <Button className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              New Job
            </Button>
          )}
        </DialogTrigger>
      )}
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4 border-b border-border/50">
          <DialogTitle>{header}</DialogTitle>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  );
}
