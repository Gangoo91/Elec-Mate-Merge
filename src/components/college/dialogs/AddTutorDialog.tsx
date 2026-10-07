import { useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  grid2Cn,
  inputCn,
  labelCn,
  selectTriggerCn,
} from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { StaffRole } from '@/contexts/CollegeSupabaseContext';
import { useCollegeCan } from '@/hooks/useCollegeCan';
import { useToast } from '@/hooks/use-toast';
import { staffWriteMessage } from '@/services/college/collegeStaffService';
import { RoleCapabilitySummary, StaffRolePicker } from '@/components/college/people/StaffRoleFields';

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

const sectionTitleCn = 'text-[15px] font-semibold text-white';

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
  // ELE-1898: admin / head of department only from someone who may grant them.
  const { can } = useCollegeCan();
  const { toast } = useToast();
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

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
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
      // Was silent: a refused add left the sheet open with no word why.
      toast({
        title: 'Not added',
        description: staffWriteMessage(error as { message?: string; code?: string }),
        variant: 'destructive',
      });
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

  const canSubmit = !isSubmitting && !!formData.name && !!formData.email && !!formData.department;

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      bodyClassName="block"
      eyebrow="Staff"
      title="Add new tutor"
      description="Add a new tutor or staff member. Fields marked * are required."
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className={buttonSecondaryCn}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="add-tutor-form"
            disabled={!canSubmit}
            className={buttonPrimaryCn}
          >
            {isSubmitting ? 'Adding…' : 'Add tutor'}
          </button>
        </div>
      }
    >
      <form
        id="add-tutor-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (canSubmit) handleSubmit(e);
        }}
        className="grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-2"
      >
        <div className="space-y-6">
          <section className="space-y-4">
            <h3 className={sectionTitleCn}>Contact</h3>
            <div>
              <label className={labelCn} htmlFor="at-name">
                Full name *
              </label>
              <input
                id="at-name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="John Smith"
                required
                className={inputCn}
              />
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <div>
                <label className={labelCn} htmlFor="at-email">
                  Email *
                </label>
                <input
                  id="at-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="john.smith@college.ac.uk"
                  required
                  className={inputCn}
                />
              </div>
              <div>
                <label className={labelCn} htmlFor="at-phone">
                  Phone
                </label>
                <input
                  id="at-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="07XXX XXXXXX"
                  className={inputCn}
                />
              </div>
            </div>
          </section>

          <section className="space-y-4 border-t border-white/[0.08] pt-5">
            <h3 className={sectionTitleCn}>Role and department</h3>
            <StaffRolePicker
              value={formData.role}
              onChange={(r) => handleChange('role', r)}
              canGrant={can('staff.grant_roles')}
            />
            <RoleCapabilitySummary role={formData.role} />
            <div>
              <p className={labelCn}>Department *</p>
              <MobileSelectPicker
                value={formData.department}
                onValueChange={(value) => handleChange('department', value)}
                options={DEPARTMENTS.map((d) => ({ value: d, label: d }))}
                title="Department"
                placeholder="Select department"
                triggerClassName={selectTriggerCn}
              />
            </div>
          </section>
        </div>

        <section className="space-y-4 border-t border-white/[0.08] pt-5 lg:border-t-0 lg:pt-0">
          <h3 className={sectionTitleCn}>Qualifications</h3>
          <div className={grid2Cn}>
            <div>
              <label className={labelCn} htmlFor="at-hours">
                Max hours a week
              </label>
              <input
                id="at-hours"
                type="number"
                inputMode="numeric"
                min="0"
                max="40"
                value={formData.max_teaching_hours}
                onChange={(e) => handleChange('max_teaching_hours', e.target.value)}
                placeholder="35"
                className={inputCn}
              />
            </div>
            <div>
              <label className={labelCn} htmlFor="at-teaching">
                Teaching qualification
              </label>
              <input
                id="at-teaching"
                value={formData.teaching_qual}
                onChange={(e) => handleChange('teaching_qual', e.target.value)}
                placeholder="PGCE, AET"
                className={inputCn}
              />
            </div>
            <div>
              <label className={labelCn} htmlFor="at-assessor">
                Assessor qualification
              </label>
              <input
                id="at-assessor"
                value={formData.assessor_qual}
                onChange={(e) => handleChange('assessor_qual', e.target.value)}
                placeholder="L3 TAQA"
                className={inputCn}
              />
            </div>
          </div>

          <div className="pt-1">
            <p className={labelCn}>Specialisations</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {SPECIALIZATIONS.map((spec) => {
                const active = formData.specialisations.includes(spec);
                return (
                  <button
                    key={spec}
                    type="button"
                    aria-pressed={active}
                    className={chipCn(active)}
                    onClick={() => toggleSpecialisation(spec)}
                  >
                    {spec}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </form>
    </FormSheet>
  );
}
