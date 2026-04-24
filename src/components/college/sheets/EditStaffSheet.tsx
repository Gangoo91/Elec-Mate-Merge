import { useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStaff, StaffRole } from '@/contexts/CollegeSupabaseContext';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  SheetShell,
  FormCard,
  FormGrid,
  Field,
  PrimaryButton,
  SecondaryButton,
  SuccessCheckmark,
  inputClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/college/primitives';

interface EditStaffSheetProps {
  staff: CollegeStaff | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DEPARTMENTS = [
  'Electrical Installation',
  'Electrical Engineering',
  'Building Services',
  'Plumbing',
  'Construction',
  'Health & Safety',
  'General Studies',
];

const SPECIALISATIONS = [
  '18th Edition',
  'Inspection & Testing',
  'Installation',
  'Domestic',
  'Commercial',
  'Industrial',
  'Solar PV',
  'EV Charging',
  'Fire Alarms',
  'Emergency Lighting',
  'PAT Testing',
];

export function EditStaffSheet({ staff, open, onOpenChange }: EditStaffSheetProps) {
  const { updateStaff } = useCollegeSupabase();
  const { toast } = useToast();
  const { triggerSuccess } = useHapticFeedback();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'tutor' as StaffRole,
    department: '',
    max_teaching_hours: '',
    teaching_qual: '',
    assessor_qual: '',
    iqa_qual: '',
    specialisations: [] as string[],
    status: '',
  });

  useEffect(() => {
    if (staff) {
      setFormData({
        name: staff.name || '',
        email: staff.email || '',
        phone: staff.phone || '',
        role: staff.role as StaffRole,
        department: staff.department || '',
        max_teaching_hours: staff.max_teaching_hours ? String(staff.max_teaching_hours) : '',
        teaching_qual: staff.teaching_qual || '',
        assessor_qual: staff.assessor_qual || '',
        iqa_qual: staff.iqa_qual || '',
        specialisations: staff.specialisations || [],
        status: staff.status || 'Active',
      });
    }
  }, [staff]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSpecialisation = (spec: string) => {
    setFormData((prev) => ({
      ...prev,
      specialisations: prev.specialisations.includes(spec)
        ? prev.specialisations.filter((s) => s !== spec)
        : [...prev.specialisations, spec],
    }));
  };

  const handleSubmit = async () => {
    if (!staff) return;
    setIsSubmitting(true);

    try {
      await updateStaff(staff.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        role: formData.role,
        department: formData.department || null,
        max_teaching_hours: formData.max_teaching_hours
          ? parseInt(formData.max_teaching_hours)
          : null,
        teaching_qual: formData.teaching_qual || null,
        assessor_qual: formData.assessor_qual || null,
        iqa_qual: formData.iqa_qual || null,
        specialisations: formData.specialisations,
        status: formData.status,
      });

      setShowSuccess(true);
      triggerSuccess(true);

      toast({
        title: 'Staff Updated',
        description: `${formData.name} has been updated successfully.`,
      });

      setTimeout(() => {
        setShowSuccess(false);
        onOpenChange(false);
      }, 700);
    } catch (error) {
      console.error('Failed to update staff:', error);
      toast({
        title: 'Update Failed',
        description: 'There was an error updating the staff member. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!staff) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow="Edit Staff Member"
          title={staff.name}
          description={`Update details for ${staff.name}`}
          footer={
            <>
              <SecondaryButton
                fullWidth
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                fullWidth
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.name || !formData.email}
              >
                {isSubmitting ? 'Saving…' : 'Save Changes →'}
              </PrimaryButton>
            </>
          }
        >
          <FormCard eyebrow="Personal Details">
            <Field label="Full Name" required>
              <input
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={inputClass}
              />
            </Field>
            <FormGrid cols={2}>
              <Field label="Email" required>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Phone">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
          </FormCard>

          <FormCard eyebrow="Role & Department">
            <FormGrid cols={2}>
              <Field label="Role" required>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleChange('role', value)}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="tutor">Tutor</SelectItem>
                    <SelectItem value="head_of_department">Head of Department</SelectItem>
                    <SelectItem value="support">Support Staff</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Department">
                <Select
                  value={formData.department}
                  onValueChange={(value) => handleChange('department', value)}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FormGrid>
            <Field label="Status">
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange('status', value)}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </FormCard>

          <FormCard eyebrow="Qualifications">
            <FormGrid cols={2}>
              <Field label="Max Hours/Week">
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={formData.max_teaching_hours}
                  onChange={(e) => handleChange('max_teaching_hours', e.target.value)}
                  className={inputClass}
                  placeholder="35"
                />
              </Field>
              <Field label="Teaching Qual">
                <input
                  value={formData.teaching_qual}
                  onChange={(e) => handleChange('teaching_qual', e.target.value)}
                  className={inputClass}
                  placeholder="PGCE, AET"
                />
              </Field>
            </FormGrid>
            <FormGrid cols={2}>
              <Field label="Assessor Qual">
                <input
                  value={formData.assessor_qual}
                  onChange={(e) => handleChange('assessor_qual', e.target.value)}
                  className={inputClass}
                  placeholder="L3 TAQA"
                />
              </Field>
              <Field label="IQA Qual">
                <input
                  value={formData.iqa_qual}
                  onChange={(e) => handleChange('iqa_qual', e.target.value)}
                  className={inputClass}
                  placeholder="L4 IQA"
                />
              </Field>
            </FormGrid>
          </FormCard>

          <FormCard eyebrow="Specialisations">
            <div className="flex flex-wrap gap-2">
              {SPECIALISATIONS.map((spec) => {
                const active = formData.specialisations.includes(spec);
                return (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => toggleSpecialisation(spec)}
                    className={`h-9 px-3.5 rounded-full text-[12px] font-medium touch-manipulation transition-colors border ${
                      active
                        ? 'bg-elec-yellow text-black border-elec-yellow'
                        : 'bg-[hsl(0_0%_9%)] text-white border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    {spec}
                  </button>
                );
              })}
            </div>
          </FormCard>
        </SheetShell>
        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
  );
}
