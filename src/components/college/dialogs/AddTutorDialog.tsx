import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogBody,
} from '@/components/ui/responsive-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { StaffRole } from '@/contexts/CollegeSupabaseContext';
import { cn } from '@/lib/utils';
import {
  Field,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  fieldLabelClass,
  inputClass,
  selectContentClass,
  selectTriggerClass,
} from '@/components/college/primitives';

interface AddTutorDialogProps {
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

const SPECIALIZATIONS = [
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

export function AddTutorDialog({ open, onOpenChange }: AddTutorDialogProps) {
  const { addStaff } = useCollegeSupabase();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'tutor' as StaffRole,
    department: '',
    max_teaching_hours: '',
    teaching_qual: '',
    assessor_qual: '',
    specialisations: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addStaff({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        role: formData.role,
        department: formData.department || null,
        status: 'Active',
        specialisations: formData.specialisations,
        teaching_qual: formData.teaching_qual || null,
        assessor_qual: formData.assessor_qual || null,
        iqa_qual: null,
        max_teaching_hours: formData.max_teaching_hours
          ? parseInt(formData.max_teaching_hours)
          : null,
        college_id: null,
        user_id: null,
        photo_url: null,
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'tutor',
        department: '',
        max_teaching_hours: '',
        teaching_qual: '',
        assessor_qual: '',
        specialisations: [],
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to add tutor:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="sm:max-w-[500px]">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Add new tutor</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Add a new tutor or staff member to the system. All fields marked with * are required.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <ResponsiveDialogBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormCard eyebrow="Contact">
              <Field label="Full name" required>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="John Smith"
                  required
                  className={inputClass}
                />
              </Field>
              <FormGrid cols={2}>
                <Field label="Email" required>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="john.smith@college.ac.uk"
                    required
                    className={inputClass}
                  />
                </Field>
                <Field label="Phone" required>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="07XXX XXXXXX"
                    required
                    className={inputClass}
                  />
                </Field>
              </FormGrid>
            </FormCard>

            <FormCard eyebrow="Role & department">
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
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Department" required>
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
            </FormCard>

            <FormCard eyebrow="Qualifications">
              <FormGrid cols={3}>
                <Field label="Max hours/week">
                  <Input
                    id="max_teaching_hours"
                    type="number"
                    min="0"
                    max="40"
                    value={formData.max_teaching_hours}
                    onChange={(e) => handleChange('max_teaching_hours', e.target.value)}
                    placeholder="35"
                    className={inputClass}
                  />
                </Field>
                <Field label="Teaching qual">
                  <Input
                    id="teaching_qual"
                    value={formData.teaching_qual}
                    onChange={(e) => handleChange('teaching_qual', e.target.value)}
                    placeholder="PGCE, AET"
                    className={inputClass}
                  />
                </Field>
                <Field label="Assessor qual">
                  <Input
                    id="assessor_qual"
                    value={formData.assessor_qual}
                    onChange={(e) => handleChange('assessor_qual', e.target.value)}
                    placeholder="L3 TAQA"
                    className={inputClass}
                  />
                </Field>
              </FormGrid>

              <div>
                <label className={fieldLabelClass}>Specialisations</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {SPECIALIZATIONS.map((spec) => {
                    const active = formData.specialisations.includes(spec);
                    return (
                      <button
                        key={spec}
                        type="button"
                        className={cn(
                          'h-9 px-3 rounded-full text-[12.5px] border transition-colors touch-manipulation',
                          active
                            ? 'bg-elec-yellow border-elec-yellow text-black font-medium'
                            : 'bg-[hsl(0_0%_13%)] border-white/[0.08] text-white hover:border-white/[0.18]'
                        )}
                        onClick={() => toggleSpecialisation(spec)}
                      >
                        {spec}
                      </button>
                    );
                  })}
                </div>
              </div>
            </FormCard>
          </form>
        </ResponsiveDialogBody>

        <ResponsiveDialogFooter>
          <SecondaryButton
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </SecondaryButton>
          <PrimaryButton
            type="submit"
            disabled={isSubmitting || !formData.name || !formData.email || !formData.department}
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Adding…' : 'Add tutor'}
          </PrimaryButton>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
