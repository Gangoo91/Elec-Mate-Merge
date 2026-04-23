import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStaff, StaffRole } from '@/contexts/CollegeSupabaseContext';
import { useHapticFeedback, SuccessCheckmark } from '@/components/college/ui/HapticFeedback';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

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

const inputClass =
  'h-11 w-full px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/65 focus:outline-none focus:border-elec-yellow/60 touch-manipulation';

const selectTriggerClass =
  'h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] focus:outline-none focus:border-elec-yellow/60 touch-manipulation data-[state=open]:border-elec-yellow/60';

const selectContentClass =
  'z-[100] max-w-[calc(100vw-2rem)] bg-[hsl(0_0%_12%)] border border-white/[0.08] text-white';

const eyebrow = 'text-[10px] font-medium uppercase tracking-[0.16em] text-white/55';
const fieldLabel = 'text-[11.5px] text-white/60';

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
      }, 1200);
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
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)]">
        <div className="flex flex-col h-full">
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          <SheetHeader className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-4">
            <div className={eyebrow}>Edit Staff Member</div>
            <SheetTitle className="text-[20px] font-semibold text-white mt-1 text-left">
              {staff.name}
            </SheetTitle>
            <p className="text-[12.5px] text-white/55 mt-1 text-left">
              Update details for {staff.name}
            </p>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-4">
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
              <div className={eyebrow}>Personal Details</div>
              <div className="space-y-1.5">
                <div className={fieldLabel}>Full Name *</div>
                <input
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <div className={fieldLabel}>Email *</div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <div className={fieldLabel}>Phone</div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
              <div className={eyebrow}>Role & Department</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <div className={fieldLabel}>Role *</div>
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
                </div>
                <div className="space-y-1.5">
                  <div className={fieldLabel}>Department</div>
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
                </div>
              </div>
              <div className="space-y-1.5">
                <div className={fieldLabel}>Status</div>
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
              </div>
            </div>

            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
              <div className={eyebrow}>Qualifications</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <div className={fieldLabel}>Max Hours/Week</div>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={formData.max_teaching_hours}
                    onChange={(e) => handleChange('max_teaching_hours', e.target.value)}
                    className={inputClass}
                    placeholder="35"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className={fieldLabel}>Teaching Qual</div>
                  <input
                    value={formData.teaching_qual}
                    onChange={(e) => handleChange('teaching_qual', e.target.value)}
                    className={inputClass}
                    placeholder="PGCE, AET"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <div className={fieldLabel}>Assessor Qual</div>
                  <input
                    value={formData.assessor_qual}
                    onChange={(e) => handleChange('assessor_qual', e.target.value)}
                    className={inputClass}
                    placeholder="L3 TAQA"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className={fieldLabel}>IQA Qual</div>
                  <input
                    value={formData.iqa_qual}
                    onChange={(e) => handleChange('iqa_qual', e.target.value)}
                    className={inputClass}
                    placeholder="L4 IQA"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
              <div className={eyebrow}>Specialisations</div>
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
                          : 'bg-[hsl(0_0%_9%)] text-white/70 border-white/[0.08] hover:border-white/20'
                      }`}
                    >
                      {spec}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <SheetFooter className="flex-shrink-0 border-t border-white/[0.06] p-4 flex-row gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="flex-1 h-11 text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation border border-white/[0.08] rounded-full"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.name || !formData.email}
              className="flex-1 h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
            >
              {isSubmitting ? 'Saving…' : 'Save Changes →'}
            </button>
          </SheetFooter>
        </div>

        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
  );
}
