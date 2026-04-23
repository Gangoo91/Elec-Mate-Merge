import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEmployer } from '@/contexts/EmployerContext';
import { toast } from '@/hooks/use-toast';
import { Briefcase, Plus, X } from 'lucide-react';
import { useOptionalVoiceFormContext } from '@/contexts/VoiceFormContext';
import { cn } from '@/lib/utils';
import {
  FormCard,
  FormGrid,
  Field,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/employer/editorial';

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Temporary'];
const SALARY_PERIODS = ['per annum', 'per day', 'per hour'];
const COMMON_REQUIREMENTS = [
  '18th Edition',
  'ECS Gold Card',
  'Full UK Driving Licence',
  'Own Tools',
  'Part P Qualified',
  '3+ Years Experience',
  'Commercial Experience',
  'Domestic Experience',
  'EV Installation Experience',
];
const COMMON_BENEFITS = [
  'Company Van',
  'Fuel Card',
  'Pension',
  '25 Days Holiday',
  'Training Budget',
  'Tool Allowance',
  'Overtime Available',
  'Flexible Hours',
];

interface PostVacancyDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function PostVacancyDialog({
  trigger,
  open: controlledOpen,
  onOpenChange,
}: PostVacancyDialogProps) {
  const { addVacancy } = useEmployer();
  const [internalOpen, setInternalOpen] = useState(false);

  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'Full-time',
    salaryMin: '',
    salaryMax: '',
    salaryPeriod: 'per annum',
    description: '',
    requirements: [] as string[],
    benefits: [] as string[],
    closingDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.location || !formData.salaryMin || !formData.closingDate) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    addVacancy({
      title: formData.title,
      location: formData.location,
      type: formData.type,
      status: 'Open',
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
      title: 'Vacancy Posted',
      description: `${formData.title} has been posted successfully.`,
    });

    setFormData({
      title: '',
      location: '',
      type: 'Full-time',
      salaryMin: '',
      salaryMax: '',
      salaryPeriod: 'per annum',
      description: '',
      requirements: [],
      benefits: [],
      closingDate: '',
    });
    setOpen(false);
  };

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
        setFormData((prev) => ({ ...prev, [field]: strValue }));
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
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i) => i !== item)
        : [...prev[field], item],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger !== null && (
        <DialogTrigger asChild>
          {trigger || (
            <PrimaryButton>
              <Plus className="h-4 w-4 mr-1.5" />
              Post new vacancy
            </PrimaryButton>
          )}
        </DialogTrigger>
      )}
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto p-6 bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Briefcase className="h-5 w-5 text-elec-yellow" />
            Post job vacancy
          </DialogTitle>
        </DialogHeader>
        <form id="vacancy-form" onSubmit={handleSubmit} className="space-y-4 pt-2">
          <FormCard eyebrow="Role">
            <FormGrid cols={2}>
              <Field label="Job title" required>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Electrician"
                  className={inputClass}
                />
              </Field>
              <Field label="Location" required>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g. Manchester, M1"
                  className={inputClass}
                />
              </Field>
            </FormGrid>
            <FormGrid cols={2}>
              <Field label="Job type">
                <Select
                  value={formData.type}
                  onValueChange={(val) => setFormData((prev) => ({ ...prev, type: val }))}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {JOB_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Closing date" required>
                <Input
                  type="date"
                  value={formData.closingDate}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, closingDate: e.target.value }))
                  }
                  className={inputClass}
                />
              </Field>
            </FormGrid>
          </FormCard>

          <FormCard eyebrow="Salary">
            <FormGrid cols={3}>
              <Field label="Min salary (£)" required>
                <Input
                  type="number"
                  value={formData.salaryMin}
                  onChange={(e) => setFormData((prev) => ({ ...prev, salaryMin: e.target.value }))}
                  placeholder="35000"
                  className={inputClass}
                />
              </Field>
              <Field label="Max salary (£)">
                <Input
                  type="number"
                  value={formData.salaryMax}
                  onChange={(e) => setFormData((prev) => ({ ...prev, salaryMax: e.target.value }))}
                  placeholder="45000"
                  className={inputClass}
                />
              </Field>
              <Field label="Period">
                <Select
                  value={formData.salaryPeriod}
                  onValueChange={(val) =>
                    setFormData((prev) => ({ ...prev, salaryPeriod: val }))
                  }
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {SALARY_PERIODS.map((period) => (
                      <SelectItem key={period} value={period}>
                        {period}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FormGrid>
          </FormCard>

          <FormCard eyebrow="Description">
            <Field label="Job description">
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Describe the role and responsibilities..."
                rows={3}
                className={`${textareaClass} min-h-[100px]`}
              />
            </Field>
          </FormCard>

          <FormCard eyebrow="Requirements">
            <div className="flex flex-wrap gap-2">
              {COMMON_REQUIREMENTS.map((req) => {
                const selected = formData.requirements.includes(req);
                return (
                  <button
                    key={req}
                    type="button"
                    onClick={() => toggleItem('requirements', req)}
                    className={cn(
                      'inline-flex items-center gap-1 h-8 px-3 rounded-full text-[11.5px] font-medium transition-colors touch-manipulation border',
                      selected
                        ? 'bg-elec-yellow text-black border-elec-yellow'
                        : 'bg-white/[0.04] text-white border-white/[0.1] hover:bg-white/[0.08]'
                    )}
                  >
                    {req}
                    {selected && <X className="h-3 w-3 ml-0.5" />}
                  </button>
                );
              })}
            </div>
          </FormCard>

          <FormCard eyebrow="Benefits">
            <div className="flex flex-wrap gap-2">
              {COMMON_BENEFITS.map((ben) => {
                const selected = formData.benefits.includes(ben);
                return (
                  <button
                    key={ben}
                    type="button"
                    onClick={() => toggleItem('benefits', ben)}
                    className={cn(
                      'inline-flex items-center gap-1 h-8 px-3 rounded-full text-[11.5px] font-medium transition-colors touch-manipulation border',
                      selected
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : 'bg-white/[0.04] text-white border-white/[0.1] hover:bg-white/[0.08]'
                    )}
                  >
                    {ben}
                    {selected && <X className="h-3 w-3 ml-0.5" />}
                  </button>
                );
              })}
            </div>
          </FormCard>

          <div className="flex gap-2 pt-1">
            <SecondaryButton onClick={() => setOpen(false)} fullWidth>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" fullWidth>
              Post vacancy
            </PrimaryButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
