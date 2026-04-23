import { useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateTender, CreateTenderData } from '@/hooks/useTenders';
import { Loader2, ExternalLink, Plus } from 'lucide-react';
import { toast } from 'sonner';
import {
  SheetShell,
  FormCard,
  FormGrid,
  Field,
  Pill,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/employer/editorial';

interface CreateTenderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<CreateTenderData> & { fromOpportunity?: boolean };
}

const CATEGORIES = [
  'Commercial',
  'Residential',
  'Industrial',
  'Healthcare',
  'Education',
  'Retail',
  'Public Sector',
  'Other',
];

const emptyFormData: CreateTenderData = {
  title: '',
  client: '',
  value: 0,
  deadline: '',
  category: '',
  description: '',
  contact_name: '',
  contact_email: '',
  notes: '',
};

export function CreateTenderDialog({ open, onOpenChange, initialData }: CreateTenderDialogProps) {
  const createTender = useCreateTender();

  const [formData, setFormData] = useState<CreateTenderData>(emptyFormData);
  const [isFromOpportunity, setIsFromOpportunity] = useState(false);

  useEffect(() => {
    if (open && initialData) {
      setFormData({
        ...emptyFormData,
        ...initialData,
      });
      setIsFromOpportunity(!!initialData.fromOpportunity);
    } else if (!open) {
      setFormData(emptyFormData);
      setIsFromOpportunity(false);
    }
  }, [open, initialData]);

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.client.trim()) {
      toast.error('Title and client are required');
      return;
    }

    try {
      await createTender.mutateAsync(formData);
      toast.success('Tender tracked successfully');
      onOpenChange(false);
      setFormData(emptyFormData);
      setIsFromOpportunity(false);
    } catch (error: any) {
      toast.error(error?.message || 'Failed to track tender. Please try again.');
    }
  };

  const updateField = (field: keyof CreateTenderData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = formData.title.trim() && formData.client.trim();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] p-0 overflow-hidden">
        <SheetShell
          eyebrow="Tenders"
          title={
            <div className="flex items-center gap-2 flex-wrap">
              <span>{isFromOpportunity ? 'Start tender application' : 'Track new tender'}</span>
              {isFromOpportunity && <Pill tone="yellow">From discovery</Pill>}
            </div>
          }
          description={
            isFromOpportunity
              ? 'Review and confirm tender details before tracking.'
              : 'Add a new tender opportunity to track.'
          }
          footer={
            <>
              <SecondaryButton
                onClick={() => onOpenChange(false)}
                disabled={createTender.isPending}
                fullWidth
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                onClick={handleSubmit}
                disabled={createTender.isPending || !isValid}
                fullWidth
              >
                {createTender.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Plus className="h-4 w-4 mr-1.5" />
                )}
                Track tender
              </PrimaryButton>
            </>
          }
        >
          {formData.source_url && (
            <a
              href={formData.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
            >
              <ExternalLink className="h-3 w-3" />
              View original listing
            </a>
          )}

          <FormCard eyebrow="Overview">
            <Field label="Tender title" required>
              <Input
                placeholder="e.g. Office Building Rewire"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Client / organisation" required>
              <Input
                placeholder="e.g. ABC Corporation"
                value={formData.client}
                onChange={(e) => updateField('client', e.target.value)}
                className={inputClass}
              />
            </Field>
            <FormGrid cols={2}>
              <Field label="Estimated value (£)">
                <Input
                  type="number"
                  min="0"
                  step="1000"
                  placeholder="0"
                  value={formData.value || ''}
                  onChange={(e) => updateField('value', parseFloat(e.target.value) || 0)}
                  className={inputClass}
                />
              </Field>
              <Field label="Submission deadline">
                <Input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => updateField('deadline', e.target.value)}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
            <Field label="Category">
              <Select
                value={formData.category}
                onValueChange={(value) => updateField('category', value)}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Description">
              <Textarea
                placeholder="Brief description of the tender scope..."
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                className={`${textareaClass} min-h-[100px]`}
                rows={3}
              />
            </Field>
          </FormCard>

          <FormCard eyebrow="Contact">
            <FormGrid cols={2}>
              <Field label="Contact name">
                <Input
                  placeholder="John Smith"
                  value={formData.contact_name}
                  onChange={(e) => updateField('contact_name', e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Contact email">
                <Input
                  type="email"
                  placeholder="john@company.com"
                  value={formData.contact_email}
                  onChange={(e) => updateField('contact_email', e.target.value)}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
            <Field label="Notes">
              <Textarea
                placeholder="Any additional notes..."
                value={formData.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                className={`${textareaClass} min-h-[70px]`}
                rows={2}
              />
            </Field>
          </FormCard>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
