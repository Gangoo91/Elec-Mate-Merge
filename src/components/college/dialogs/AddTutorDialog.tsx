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
import {
  RoleCapabilitySummary,
  StaffRolePicker,
} from '@/components/college/people/StaffRoleFields';

interface AddTutorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /**
   * 'support' when opened from Support staff: the sheet is titled for a
   * staff member and starts on Assessor instead of Tutor.
   */
  variant?: 'teaching' | 'support';
  /** Called after a save, to open the logins sheet from the success screen. */
  onGiveLogin?: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

/*
 * 8 Oct 2026: says why it will not save (each missing field under itself,
 * instead of a dead button), is titled for who it is adding, checks the
 * email is not already on the staff list, and ends on a success screen that
 * is honest about logins: a staff row added here has none until they are
 * given one through the roster (Add several with logins).
 */
export function AddTutorDialog({
  open,
  onOpenChange,
  variant = 'teaching',
  onGiveLogin,
}: AddTutorDialogProps) {
  const { addStaff, staff } = useCollegeSupabase();
  const support = variant === 'support';
  const startRole: StaffRole = support ? ('assessor' as StaffRole) : 'tutor';
  const [touched, setTouched] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  // ELE-1898: admin / head of department only from someone who may grant them.
  const { can } = useCollegeCan();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: startRole,
    department: '',
    max_teaching_hours: '',
    teaching_qual: '',
    assessor_qual: '',
    specialisations: [] as string[],
  });

  const email = formData.email.trim();
  const errors = {
    name: !formData.name.trim() ? 'Enter their full name.' : null,
    email: !email
      ? 'Enter their work email.'
      : !EMAIL_RE.test(email)
        ? 'That does not look like an email address.'
        : staff.some((m) => (m.email ?? '').trim().toLowerCase() === email.toLowerCase())
          ? 'Someone with this email is already on the staff list.'
          : null,
    department: !formData.department ? 'Pick their department.' : null,
  };
  const hasErrors = !!(errors.name || errors.email || errors.department);
  const err = (k: keyof typeof errors) =>
    touched && errors[k] ? (
      <p className="mt-1.5 text-[12.5px] font-medium text-orange-300">{errors[k]}</p>
    ) : null;

  const reset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: startRole,
      department: '',
      max_teaching_hours: '',
      teaching_qual: '',
      assessor_qual: '',
      specialisations: [],
    });
    setTouched(false);
    setDone(null);
  };
  const close = (o: boolean) => {
    if (!o) reset();
    onOpenChange(o);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setTouched(true);
    if (hasErrors) return;
    setIsSubmitting(true);

    try {
      await addStaff({
        name: formData.name.trim(),
        email,
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

      setDone(formData.name.trim());
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

  const canSubmit = !isSubmitting;

  if (done) {
    return (
      <FormSheet
        open={open}
        onOpenChange={close}
        width="wide"
        eyebrow="Staff"
        title={`${done} is on the staff list`}
        description="Their record is saved. They do not have a login yet."
        footer={
          <div className="grid grid-cols-2 gap-2.5">
            <button type="button" onClick={reset} className={buttonSecondaryCn}>
              Add another
            </button>
            <button type="button" onClick={() => close(false)} className={buttonPrimaryCn}>
              Done
            </button>
          </div>
        }
      >
        <div className="rounded-2xl border border-white/[0.08] p-4 sm:p-5">
          <h3 className="text-[15px] font-semibold text-white">Giving them a login</h3>
          <p className="mt-2 max-w-3xl text-[13.5px] leading-relaxed text-white">
            Add several with logins (on the Tutors page) takes one line or fifty. It makes a login
            for anyone new, or emails a staff join link to someone who already has an Elec-Mate
            account, and links it to this record. Until then they can be named on cohorts but cannot
            sign in to the College Hub.
          </p>
          {onGiveLogin && (
            <button
              type="button"
              onClick={() => {
                close(false);
                onGiveLogin();
              }}
              className={`${buttonSecondaryCn} mt-4 w-auto px-5`}
            >
              Give them a login now
            </button>
          )}
        </div>
      </FormSheet>
    );
  }

  return (
    <FormSheet
      open={open}
      onOpenChange={close}
      width="wide"
      bodyClassName="block"
      eyebrow="Staff"
      title={support ? 'Add a staff member' : 'Add a tutor'}
      description={
        support
          ? 'Assessors, IQA, admin and learner support. Fields marked * are required.'
          : 'Someone who teaches. Fields marked * are required.'
      }
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => close(false)}
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
            {isSubmitting ? 'Adding…' : support ? 'Add staff member' : 'Add tutor'}
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
        noValidate
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
                aria-invalid={touched && !!errors.name}
                className={inputCn}
              />
              {err('name')}
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
                  aria-invalid={touched && !!errors.email}
                  className={inputCn}
                />
                {err('email')}
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
              {err('department')}
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
