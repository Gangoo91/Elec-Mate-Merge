import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Edit, Loader2, Save } from 'lucide-react';
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

      // Show success animation
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
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Drag Handle */}
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <SheetHeader className="flex-shrink-0 border-b border-border px-4 pb-4">
            <SheetTitle className="text-xl text-left flex items-center gap-2">
              <Edit className="h-5 w-5 text-info" />
              Edit Staff Member
            </SheetTitle>
            <p className="text-sm text-white text-left">Update details for {staff.name}</p>
          </SheetHeader>

          {/* Scrollable Form */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
            {/* Personal Details */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-info" />
                Personal Details
              </h4>
              <div>
                <Label htmlFor="staff-name">Full Name *</Label>
                <Input
                  id="staff-name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="h-11 touch-manipulation"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="staff-email">Email *</Label>
                  <Input
                    id="staff-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="h-11 touch-manipulation"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="staff-phone">Phone</Label>
                  <Input
                    id="staff-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="h-11 touch-manipulation"
                  />
                </div>
              </div>
            </div>

            {/* Role & Department */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-info" />
                Role & Department
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="staff-role">Role *</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleChange('role', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tutor">Tutor</SelectItem>
                      <SelectItem value="head_of_department">Head of Department</SelectItem>
                      <SelectItem value="support">Support Staff</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="staff-dept">Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => handleChange('department', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEPARTMENTS.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="staff-status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange('status', value)}
                >
                  <SelectTrigger className="h-11 touch-manipulation">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Qualifications & Hours */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-info" />
                Qualifications
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="staff-max-hours">Max Hours/Week</Label>
                  <Input
                    id="staff-max-hours"
                    type="number"
                    min="0"
                    max="40"
                    value={formData.max_teaching_hours}
                    onChange={(e) => handleChange('max_teaching_hours', e.target.value)}
                    className="h-11 touch-manipulation"
                    placeholder="35"
                  />
                </div>
                <div>
                  <Label htmlFor="staff-teaching">Teaching Qual</Label>
                  <Input
                    id="staff-teaching"
                    value={formData.teaching_qual}
                    onChange={(e) => handleChange('teaching_qual', e.target.value)}
                    className="h-11 touch-manipulation"
                    placeholder="PGCE, AET"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="staff-assessor">Assessor Qual</Label>
                  <Input
                    id="staff-assessor"
                    value={formData.assessor_qual}
                    onChange={(e) => handleChange('assessor_qual', e.target.value)}
                    className="h-11 touch-manipulation"
                    placeholder="L3 TAQA"
                  />
                </div>
                <div>
                  <Label htmlFor="staff-iqa">IQA Qual</Label>
                  <Input
                    id="staff-iqa"
                    value={formData.iqa_qual}
                    onChange={(e) => handleChange('iqa_qual', e.target.value)}
                    className="h-11 touch-manipulation"
                    placeholder="L4 IQA"
                  />
                </div>
              </div>
            </div>

            {/* Specialisations */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-info" />
                Specialisations
              </h4>
              <div className="flex flex-wrap gap-2">
                {SPECIALISATIONS.map((spec) => (
                  <Button
                    key={spec}
                    type="button"
                    variant={formData.specialisations.includes(spec) ? 'default' : 'outline'}
                    size="sm"
                    className={`h-11 touch-manipulation ${formData.specialisations.includes(spec) ? 'bg-info hover:bg-info/90 text-white' : ''}`}
                    onClick={() => toggleSpecialisation(spec)}
                  >
                    {spec}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <SheetFooter className="flex-shrink-0 border-t border-border p-4 flex-row gap-2">
            <Button
              variant="outline"
              className="flex-1 h-11 touch-manipulation"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 h-11 touch-manipulation gap-2"
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.name || !formData.email}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </SheetFooter>
        </div>

        {/* Success overlay */}
        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
  );
}
