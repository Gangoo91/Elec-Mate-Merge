import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { useCreateTool, CreateToolData } from '@/hooks/useCompanyTools';
import { Loader2 } from 'lucide-react';
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

interface CreateToolDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CATEGORIES = [
  'Testing',
  'Power Tools',
  'Hand Tools',
  'Access Equipment',
  'Safety Equipment',
  'Site Equipment',
  'Other',
];

const STATUSES = ['Available', 'In Use', 'On Hire', 'Under Repair'];

export function CreateToolDialog({ open, onOpenChange }: CreateToolDialogProps) {
  const createTool = useCreateTool();

  const [formData, setFormData] = useState<CreateToolData>({
    name: '',
    category: '',
    serial_number: '',
    purchase_date: '',
    purchase_price: 0,
    assigned_to: '',
    status: 'Available',
    pat_date: '',
    pat_due: '',
    last_calibration: '',
    next_calibration: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.category) {
      return;
    }

    const cleanedData: CreateToolData = {
      name: formData.name,
      category: formData.category,
      status: formData.status || 'Available',
    };

    if (formData.serial_number?.trim()) cleanedData.serial_number = formData.serial_number;
    if (formData.purchase_date) cleanedData.purchase_date = formData.purchase_date;
    if (formData.purchase_price && formData.purchase_price > 0)
      cleanedData.purchase_price = formData.purchase_price;
    if (formData.assigned_to?.trim()) cleanedData.assigned_to = formData.assigned_to;
    if (formData.pat_date) cleanedData.pat_date = formData.pat_date;
    if (formData.pat_due) cleanedData.pat_due = formData.pat_due;
    if (formData.last_calibration) cleanedData.last_calibration = formData.last_calibration;
    if (formData.next_calibration) cleanedData.next_calibration = formData.next_calibration;
    if (formData.notes?.trim()) cleanedData.notes = formData.notes;

    try {
      await createTool.mutateAsync(cleanedData);
      onOpenChange(false);
      setFormData({
        name: '',
        category: '',
        serial_number: '',
        purchase_date: '',
        purchase_price: 0,
        assigned_to: '',
        status: 'Available',
        pat_date: '',
        pat_due: '',
        last_calibration: '',
        next_calibration: '',
        notes: '',
      });
    } catch (error) {
      // handled by mutation
    }
  };

  const updateField = (field: keyof CreateToolData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <DialogHeader>
          <DialogTitle className="text-white">Add equipment</DialogTitle>
          <DialogDescription className="text-white">
            Add a new tool or piece of equipment to the inventory.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormCard eyebrow="Equipment">
            <Field label="Equipment name" required>
              <Input
                placeholder="e.g. Fluke 1664FC"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                required
                className={inputClass}
              />
            </Field>
            <FormGrid cols={2}>
              <Field label="Category" required>
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
              <Field label="Status">
                <Select
                  value={formData.status}
                  onValueChange={(value) => updateField('status', value)}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FormGrid>
            <FormGrid cols={2}>
              <Field label="Serial number">
                <Input
                  placeholder="e.g. FL-12345678"
                  value={formData.serial_number}
                  onChange={(e) => updateField('serial_number', e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Assigned to">
                <Input
                  placeholder="e.g. James Wilson"
                  value={formData.assigned_to}
                  onChange={(e) => updateField('assigned_to', e.target.value)}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
            <FormGrid cols={2}>
              <Field label="Purchase date">
                <Input
                  type="date"
                  value={formData.purchase_date}
                  onChange={(e) => updateField('purchase_date', e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Purchase price (£)">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.purchase_price || ''}
                  onChange={(e) => updateField('purchase_price', parseFloat(e.target.value) || 0)}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
          </FormCard>

          <FormCard eyebrow="PAT testing">
            <FormGrid cols={2}>
              <Field label="Last PAT date">
                <Input
                  type="date"
                  value={formData.pat_date}
                  onChange={(e) => updateField('pat_date', e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="PAT due date">
                <Input
                  type="date"
                  value={formData.pat_due}
                  onChange={(e) => updateField('pat_due', e.target.value)}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
          </FormCard>

          <FormCard eyebrow="Calibration (if applicable)">
            <FormGrid cols={2}>
              <Field label="Last calibration">
                <Input
                  type="date"
                  value={formData.last_calibration}
                  onChange={(e) => updateField('last_calibration', e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Next calibration due">
                <Input
                  type="date"
                  value={formData.next_calibration}
                  onChange={(e) => updateField('next_calibration', e.target.value)}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
          </FormCard>

          <FormCard eyebrow="Notes">
            <Field label="Notes">
              <Textarea
                placeholder="Any additional notes..."
                value={formData.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                rows={2}
                className={`${textareaClass} min-h-[70px]`}
              />
            </Field>
          </FormCard>

          <DialogFooter className="gap-2 sm:gap-2">
            <SecondaryButton
              onClick={() => onOpenChange(false)}
              disabled={createTool.isPending}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={createTool.isPending}>
              {createTool.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add equipment
            </PrimaryButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
