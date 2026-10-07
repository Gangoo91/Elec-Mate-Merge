import { useState, useEffect, useMemo } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  grid2Cn,
  fieldFullCn,
  inputCn,
  labelCn,
  selectTriggerCn,
} from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStaff, StaffRole } from '@/contexts/CollegeSupabaseContext';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import { useToast } from '@/hooks/use-toast';
import { SuccessCheckmark } from '@/components/college/primitives';
import { useCollegeCan, PRIVILEGED_COLLEGE_ROLES, type CollegeStaffRoleKey } from '@/hooks/useCollegeCan';
import {
  RoleCapabilitySummary,
  StaffDutyToggles,
  StaffRolePicker,
  STAFF_DUTIES,
  type StaffDutyKey,
} from '@/components/college/people/StaffRoleFields';

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

const STATUSES = [
  { value: 'Active', label: 'Active' },
  { value: 'On Leave', label: 'On leave' },
  { value: 'Archived', label: 'Archived' },
];

const sectionTitleCn = 'text-[15px] font-semibold text-white';

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
  const { updateStaff, staff: allStaff } = useCollegeSupabase();
  // ELE-1898: what the signed-in person may do comes from the database matrix.
  const { can, staffId: myStaffId } = useCollegeCan();
  const canManage = can('staff.manage');
  const canGrant = can('staff.grant_roles');
  const isSelf = !!staff && staff.id === myStaffId;
  const [duties, setDuties] = useState<Partial<Record<StaffDutyKey, boolean>>>({});
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
      setDuties(
        Object.fromEntries(STAFF_DUTIES.map((d) => [d.key, Boolean(staff[d.key])])) as Partial<
          Record<StaffDutyKey, boolean>
        >
      );
    }
  }, [staff]);

  // The database refuses to lose the college's last signed-in admin or head
  // of department; say so before Save rather than after.
  const isManagerRole = (r: string | null | undefined) =>
    PRIVILEGED_COLLEGE_ROLES.includes((r ?? '') as CollegeStaffRoleKey);
  const lastManager = useMemo(() => {
    if (!staff || !staff.user_id || !isManagerRole(staff.role)) return false;
    const managers = allStaff.filter(
      (m) =>
        m.user_id &&
        !m.archived_at &&
        (m.status ?? 'active').toLowerCase() !== 'archived' &&
        isManagerRole(m.role)
    );
    return managers.length === 1 && managers[0].id === staff.id;
  }, [staff, allStaff]);
  // A manager or a named lead can only be changed by someone who may grant
  // those roles (the role guard trigger refuses anyone else).
  const targetPrivileged =
    !!staff && (isManagerRole(staff.role) || STAFF_DUTIES.some((d) => Boolean(staff[d.key])));
  const roleLocked = isSelf || !canManage || (targetPrivileged && !canGrant);
  const removesLastManager =
    lastManager && (!isManagerRole(formData.role) || formData.status.toLowerCase() === 'archived');

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
      // Role, status and duties go only when this person may change them;
      // your own row keeps them (the database refuses a self-promotion).
      const roleChanges =
        !roleLocked
          ? {
              role: formData.role,
              status: formData.status,
              ...(canGrant
                ? Object.fromEntries(STAFF_DUTIES.map((d) => [d.key, Boolean(duties[d.key])]))
                : {}),
            }
          : {};
      await updateStaff(staff.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        department: formData.department || null,
        max_teaching_hours: formData.max_teaching_hours
          ? parseInt(formData.max_teaching_hours)
          : null,
        teaching_qual: formData.teaching_qual || null,
        assessor_qual: formData.assessor_qual || null,
        iqa_qual: formData.iqa_qual || null,
        specialisations: formData.specialisations,
        ...roleChanges,
      });

      setShowSuccess(true);
      triggerSuccess(true);

      toast({
        title: 'Staff updated',
        description: `${formData.name} has been updated successfully.`,
      });

      setTimeout(() => {
        setShowSuccess(false);
        onOpenChange(false);
      }, 700);
    } catch (error) {
      console.error('Failed to update staff:', error);
      toast({
        title: 'Not saved',
        description:
          error instanceof Error && error.message
            ? error.message
            : 'There was an error updating the staff member. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!staff) return null;

  const departmentOptions = [
    ...DEPARTMENTS,
    ...(formData.department && !DEPARTMENTS.includes(formData.department) ? [formData.department] : []),
  ].map((d) => ({ value: d, label: d }));

  return (
    <>
      <FormSheet
        open={open}
        onOpenChange={onOpenChange}
        width="wide"
        bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-2"
        eyebrow="Edit staff member"
        title={staff.name}
        description={`Update details for ${staff.name}.`}
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
              type="button"
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                !formData.name ||
                !formData.email ||
                removesLastManager ||
                (!canManage && !isSelf)
              }
              className={buttonPrimaryCn}
            >
              {isSubmitting ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        }
      >
        <div className="space-y-6">
          <section className="space-y-4">
            <h3 className={sectionTitleCn}>Personal details</h3>
            <div>
              <label className={labelCn} htmlFor="es-name">
                Full name *
              </label>
              <input
                id="es-name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={inputCn}
              />
            </div>
            <div className={grid2Cn}>
              <div className={fieldFullCn + ' sm:col-span-1'}>
                <label className={labelCn} htmlFor="es-email">
                  Email *
                </label>
                <input
                  id="es-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={inputCn}
                />
              </div>
              <div className={fieldFullCn + ' sm:col-span-1'}>
                <label className={labelCn} htmlFor="es-phone">
                  Phone
                </label>
                <input
                  id="es-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
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
              canGrant={canGrant}
              locked={roleLocked}
              lockedReason={
                isSelf
                  ? 'You cannot change your own role. Ask another admin or head of department.'
                  : targetPrivileged && canManage
                    ? 'Only a college admin or head of department can change an admin, a head of department or a named lead. Until your college has one signed in, ask Elec-Mate.'
                    : 'Only a college admin or head of department can change roles.'
              }
            />
            {removesLastManager ? (
              <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-3 text-[12.5px] leading-relaxed text-white">
                {staff.name} is the college&apos;s only signed-in admin or head of department. Give
                someone else that role first, or nobody will be able to manage staff.
              </p>
            ) : null}
            <RoleCapabilitySummary role={formData.role} />
            <div>
              <p className={labelCn}>Department</p>
              <MobileSelectPicker
                value={formData.department}
                onValueChange={(value) => handleChange('department', value)}
                options={departmentOptions}
                title="Department"
                placeholder="Select department"
                triggerClassName={selectTriggerCn}
              />
            </div>
            <div>
              <p className={labelCn}>Status</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Status">
                {STATUSES.map((st) => (
                  <button
                    key={st.value}
                    type="button"
                    aria-pressed={formData.status === st.value}
                    disabled={roleLocked}
                    onClick={() => handleChange('status', st.value)}
                    className={chipCn(formData.status === st.value)}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="border-t border-white/[0.08] pt-5 lg:border-t-0 lg:pt-0">
            <StaffDutyToggles
              values={duties}
              onToggle={(key, on) => setDuties((prev) => ({ ...prev, [key]: on }))}
              canGrant={canGrant && canManage}
              locked={isSelf}
            />
          </div>
          <section className="space-y-4 border-t border-white/[0.08] pt-5">
            <h3 className={sectionTitleCn}>Qualifications</h3>
            <div className={grid2Cn}>
              <div>
                <label className={labelCn} htmlFor="es-hours">
                  Max hours a week
                </label>
                <input
                  id="es-hours"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="40"
                  value={formData.max_teaching_hours}
                  onChange={(e) => handleChange('max_teaching_hours', e.target.value)}
                  className={inputCn}
                  placeholder="35"
                />
              </div>
              <div>
                <label className={labelCn} htmlFor="es-teaching">
                  Teaching qualification
                </label>
                <input
                  id="es-teaching"
                  value={formData.teaching_qual}
                  onChange={(e) => handleChange('teaching_qual', e.target.value)}
                  className={inputCn}
                  placeholder="PGCE, AET"
                />
              </div>
              <div>
                <label className={labelCn} htmlFor="es-assessor">
                  Assessor qualification
                </label>
                <input
                  id="es-assessor"
                  value={formData.assessor_qual}
                  onChange={(e) => handleChange('assessor_qual', e.target.value)}
                  className={inputCn}
                  placeholder="L3 TAQA"
                />
              </div>
              <div>
                <label className={labelCn} htmlFor="es-iqa">
                  IQA qualification
                </label>
                <input
                  id="es-iqa"
                  value={formData.iqa_qual}
                  onChange={(e) => handleChange('iqa_qual', e.target.value)}
                  className={inputCn}
                  placeholder="L4 IQA"
                />
              </div>
            </div>
          </section>

          <section className="space-y-3 border-t border-white/[0.08] pt-5">
            <h3 className={sectionTitleCn}>Specialisations</h3>
            <div className="flex flex-wrap gap-2">
              {SPECIALISATIONS.map((spec) => {
                const active = formData.specialisations.includes(spec);
                return (
                  <button
                    key={spec}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleSpecialisation(spec)}
                    className={chipCn(active)}
                  >
                    {spec}
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </FormSheet>
      <SuccessCheckmark show={showSuccess} />
    </>
  );
}
