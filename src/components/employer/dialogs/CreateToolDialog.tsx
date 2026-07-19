import { useEffect, useState } from 'react';
import {
  ResponsiveFormModal,
  ResponsiveFormModalContent,
  ResponsiveFormModalHeader,
  ResponsiveFormModalTitle,
  ResponsiveFormModalBody,
} from '@/components/ui/responsive-form-modal';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useCreateTool,
  useUpdateTool,
  CreateToolData,
  type UpdateToolData,
  type CompanyTool,
} from '@/hooks/useCompanyTools';
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
  /** Pass a tool to edit it — same form, update path (mirrors CreateSupplierDialog) */
  tool?: CompanyTool | null;
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

const EMPTY_FORM: CreateToolData = {
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
};

export function CreateToolDialog({ open, onOpenChange, tool }: CreateToolDialogProps) {
  const createTool = useCreateTool();
  const updateTool = useUpdateTool();
  const isEdit = !!tool;
  const isPending = createTool.isPending || updateTool.isPending;

  const [formData, setFormData] = useState<CreateToolData>(EMPTY_FORM);

  // Seed the form when opening in edit mode (or reset for create)
  useEffect(() => {
    if (!open) return;
    setFormData(
      tool
        ? {
            name: tool.name,
            category: tool.category,
            serial_number: tool.serial_number || '',
            purchase_date: tool.purchase_date || '',
            purchase_price: Number(tool.purchase_price) || 0,
            assigned_to: tool.assigned_to || '',
            status: tool.status || 'Available',
            pat_date: tool.pat_date || '',
            pat_due: tool.pat_due || '',
            last_calibration: tool.last_calibration || '',
            next_calibration: tool.next_calibration || '',
            notes: tool.notes || '',
          }
        : EMPTY_FORM
    );
  }, [open, tool]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.category) {
      return;
    }

    try {
      if (isEdit && tool) {
        // Edit sends every field — empty means genuinely cleared
        const updates: UpdateToolData = {
          name: formData.name,
          category: formData.category,
          status: formData.status || 'Available',
          serial_number: formData.serial_number?.trim() || null,
          purchase_date: formData.purchase_date || null,
          purchase_price: formData.purchase_price || 0,
          assigned_to: formData.assigned_to?.trim() || null,
          pat_date: formData.pat_date || null,
          pat_due: formData.pat_due || null,
          last_calibration: formData.last_calibration || null,
          next_calibration: formData.next_calibration || null,
          notes: formData.notes?.trim() || null,
        };
        await updateTool.mutateAsync({ id: tool.id, data: updates });
      } else {
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

        await createTool.mutateAsync(cleanedData);
      }
      onOpenChange(false);
      setFormData(EMPTY_FORM);
    } catch (error) {
      // handled by mutation
    }
  };

  const updateField = (field: keyof CreateToolData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ResponsiveFormModal open={open} onOpenChange={onOpenChange}>
      <ResponsiveFormModalContent className="bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <ResponsiveFormModalHeader>
          <ResponsiveFormModalTitle className="text-white">
            {isEdit ? 'Edit equipment' : 'Add equipment'}
          </ResponsiveFormModalTitle>
          <p className="text-[12.5px] text-white/70 text-left">
            {isEdit
              ? 'Update the details, PAT dates and calibration for this equipment.'
              : 'Add a new tool or piece of equipment to the inventory.'}
          </p>
        </ResponsiveFormModalHeader>

        <ResponsiveFormModalBody className="pb-6">
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

          <div className="flex gap-2 pb-2">
            <SecondaryButton onClick={() => onOpenChange(false)} disabled={isPending} fullWidth>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={isPending} fullWidth>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? 'Save changes' : 'Add equipment'}
            </PrimaryButton>
          </div>
          </form>
        </ResponsiveFormModalBody>
      </ResponsiveFormModalContent>
    </ResponsiveFormModal>
  );
}
