import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useEmployer } from "@/contexts/EmployerContext";
import { toast } from "@/hooks/use-toast";
import { Briefcase, Plus, X } from "lucide-react";
import { useOptionalVoiceFormContext } from "@/contexts/VoiceFormContext";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Temporary"];
const SALARY_PERIODS = ["per annum", "per day", "per hour"];
const COMMON_REQUIREMENTS = [
  "18th Edition",
  "ECS Gold Card",
  "Full UK Driving Licence",
  "Own Tools",
  "Part P Qualified",
  "3+ Years Experience",
  "Commercial Experience",
  "Domestic Experience",
  "EV Installation Experience",
];
const COMMON_BENEFITS = [
  "Company Van",
  "Fuel Card",
  "Pension",
  "25 Days Holiday",
  "Training Budget",
  "Tool Allowance",
  "Overtime Available",
  "Flexible Hours",
];

interface PostVacancyDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function PostVacancyDialog({ trigger, open: controlledOpen, onOpenChange }: PostVacancyDialogProps) {
  const { addVacancy } = useEmployer();
  const [internalOpen, setInternalOpen] = useState(false);
  
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "Full-time",
    salaryMin: "",
    salaryMax: "",
    salaryPeriod: "per annum",
    description: "",
    requirements: [] as string[],
    benefits: [] as string[],
    closingDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.location || !formData.salaryMin || !formData.closingDate) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    addVacancy({
      title: formData.title,
      location: formData.location,
      type: formData.type,
      status: "Open",
      salary: {
        min: parseInt(formData.salaryMin),
        max: parseInt(formData.salaryMax) || parseInt(formData.salaryMin),
        period: formData.salaryPeriod,
      },
      description: formData.description,
      requirements: formData.requirements,
      benefits: formData.benefits,
      closingDate: formData.closingDate,
    });

    toast({
      title: "Vacancy Posted",
      description: `${formData.title} has been posted successfully.`,
    });

    setFormData({
      title: "",
      location: "",
      type: "Full-time",
      salaryMin: "",
      salaryMax: "",
      salaryPeriod: "per annum",
      description: "",
      requirements: [],
      benefits: [],
      closingDate: "",
    });
    setOpen(false);
  };

  // Voice form registration
  const voiceContext = useOptionalVoiceFormContext();
  
  useEffect(() => {
    if (!open || !voiceContext) return;
    
    voiceContext.registerForm({
      formId: 'post-vacancy',
      formName: 'Post Vacancy',
      fields: [
        { name: 'title', label: 'Job Title', type: 'text', required: true },
        { name: 'location', label: 'Location', type: 'text', required: true },
        { name: 'type', label: 'Job Type', type: 'text' },
        { name: 'salaryMin', label: 'Minimum Salary', type: 'text', required: true },
        { name: 'salaryMax', label: 'Maximum Salary', type: 'text' },
        { name: 'salaryPeriod', label: 'Salary Period', type: 'text' },
        { name: 'description', label: 'Job Description', type: 'text' },
        { name: 'closingDate', label: 'Closing Date', type: 'text', required: true },
      ],
      onFillField: (field, value) => {
        const strValue = String(value);
        setFormData(prev => ({ ...prev, [field]: strValue }));
      },
      onSubmit: () => {
        const form = document.getElementById('vacancy-form') as HTMLFormElement;
        if (form) form.requestSubmit();
      },
      onCancel: () => setOpen(false),
    });
    
    return () => voiceContext.unregisterForm('post-vacancy');
  }, [open, voiceContext]);

  const toggleItem = (field: 'requirements' | 'benefits', item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger !== null && (
        <DialogTrigger asChild>
          {trigger || (
            <Button className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Post New Vacancy
            </Button>
          )}
        </DialogTrigger>
      )}
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4 border-b border-border/50">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-lg bg-elec-yellow/10">
              <Briefcase className="h-5 w-5 text-elec-yellow" />
            </div>
            Post Job Vacancy
          </DialogTitle>
        </DialogHeader>
        <form id="vacancy-form" onSubmit={handleSubmit} className="space-y-5 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Electrician"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g. Manchester, M1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Job Type</Label>
              <Select value={formData.type} onValueChange={(val) => setFormData(prev => ({ ...prev, type: val }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {JOB_TYPES.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="salaryMin">Min Salary *</Label>
              <Input
                id="salaryMin"
                type="number"
                value={formData.salaryMin}
                onChange={(e) => setFormData(prev => ({ ...prev, salaryMin: e.target.value }))}
                placeholder="35000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salaryMax">Max Salary</Label>
              <Input
                id="salaryMax"
                type="number"
                value={formData.salaryMax}
                onChange={(e) => setFormData(prev => ({ ...prev, salaryMax: e.target.value }))}
                placeholder="45000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salaryPeriod">Period</Label>
              <Select value={formData.salaryPeriod} onValueChange={(val) => setFormData(prev => ({ ...prev, salaryPeriod: val }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SALARY_PERIODS.map(period => (
                    <SelectItem key={period} value={period}>{period}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the role and responsibilities..."
              rows={3}
            />
          </div>

          <div className="space-y-3 p-4 rounded-lg bg-surface border border-border/50">
            <Label className="text-sm font-semibold text-foreground">Requirements</Label>
            <div className="flex flex-wrap gap-2">
              {COMMON_REQUIREMENTS.map(req => (
                <Badge
                  key={req}
                  variant={formData.requirements.includes(req) ? "default" : "outline"}
                  className={`cursor-pointer touch-feedback transition-all ${
                    formData.requirements.includes(req) 
                      ? "bg-elec-yellow text-elec-dark shadow-sm" 
                      : "bg-elec-gray hover:bg-secondary hover:border-elec-yellow/30"
                  }`}
                  onClick={() => toggleItem('requirements', req)}
                >
                  {req}
                  {formData.requirements.includes(req) && <X className="h-3 w-3 ml-1" />}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3 p-4 rounded-lg bg-surface border border-border/50">
            <Label className="text-sm font-semibold text-foreground">Benefits</Label>
            <div className="flex flex-wrap gap-2">
              {COMMON_BENEFITS.map(ben => (
                <Badge
                  key={ben}
                  variant={formData.benefits.includes(ben) ? "default" : "outline"}
                  className={`cursor-pointer touch-feedback transition-all ${
                    formData.benefits.includes(ben) 
                      ? "bg-success/20 text-success border-success/30 shadow-sm" 
                      : "bg-elec-gray hover:bg-secondary hover:border-success/30"
                  }`}
                  onClick={() => toggleItem('benefits', ben)}
                >
                  {ben}
                  {formData.benefits.includes(ben) && <X className="h-3 w-3 ml-1" />}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="closingDate">Closing Date *</Label>
            <Input
              id="closingDate"
              type="date"
              value={formData.closingDate}
              onChange={(e) => setFormData(prev => ({ ...prev, closingDate: e.target.value }))}
            />
          </div>

          <div className="flex gap-3 pt-6 border-t border-border/50">
            <Button type="button" variant="outline" className="flex-1 h-11" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 h-11 font-semibold">
              Post Vacancy
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
