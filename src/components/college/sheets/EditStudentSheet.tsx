import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStudent } from '@/contexts/CollegeSupabaseContext';
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

interface EditStudentSheetProps {
  student: CollegeStudent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditStudentSheet({ student, open, onOpenChange }: EditStudentSheetProps) {
  const { updateStudent, cohorts } = useCollegeSupabase();
  const { toast } = useToast();
  const { triggerSuccess } = useHapticFeedback();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    uln: '',
    cohort_id: '',
    start_date: '',
    expected_end_date: '',
    status: '',
    risk_level: '',
    progress_percent: '',
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        phone: student.phone || '',
        uln: student.uln || '',
        cohort_id: student.cohort_id || '',
        start_date: student.start_date || '',
        expected_end_date: student.expected_end_date || '',
        status: student.status || 'Active',
        risk_level: student.risk_level || 'Low',
        progress_percent: String(student.progress_percent ?? 0),
      });
    }
  }, [student]);

  const activeCohorts = cohorts.filter((c) => c.status === 'Active');

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!student) return;
    setIsSubmitting(true);

    try {
      await updateStudent(student.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        uln: formData.uln || null,
        cohort_id: formData.cohort_id || null,
        start_date: formData.start_date || null,
        expected_end_date: formData.expected_end_date || null,
        status: formData.status,
        risk_level: formData.risk_level,
        progress_percent: formData.progress_percent ? parseInt(formData.progress_percent) : 0,
      });

      // Show success animation
      setShowSuccess(true);
      triggerSuccess(true);

      toast({
        title: 'Student Updated',
        description: `${formData.name} has been updated successfully.`,
      });

      setTimeout(() => {
        setShowSuccess(false);
        onOpenChange(false);
      }, 1200);
    } catch (error) {
      console.error('Failed to update student:', error);
      toast({
        title: 'Update Failed',
        description: 'There was an error updating the student. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!student) return null;

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
              <Edit className="h-5 w-5 text-elec-yellow" />
              Edit Student
            </SheetTitle>
            <p className="text-sm text-white text-left">Update details for {student.name}</p>
          </SheetHeader>

          {/* Scrollable Form */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
            {/* Personal Details */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                Personal Details
              </h4>
              <div>
                <Label htmlFor="edit-name">Full Name *</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="h-11 touch-manipulation"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="edit-email">Email *</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="h-11 touch-manipulation"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input
                    id="edit-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="h-11 touch-manipulation"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-uln">ULN</Label>
                <Input
                  id="edit-uln"
                  value={formData.uln}
                  onChange={(e) => handleChange('uln', e.target.value)}
                  className="h-11 touch-manipulation"
                  placeholder="10 digit ULN"
                />
              </div>
            </div>

            {/* Enrolment */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                Enrolment
              </h4>
              <div>
                <Label htmlFor="edit-cohort">Cohort</Label>
                <Select
                  value={formData.cohort_id}
                  onValueChange={(value) => handleChange('cohort_id', value)}
                >
                  <SelectTrigger className="h-11 touch-manipulation">
                    <SelectValue placeholder="Select cohort" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeCohorts.map((cohort) => (
                      <SelectItem key={cohort.id} value={cohort.id}>
                        {cohort.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="edit-start">Start Date</Label>
                  <Input
                    id="edit-start"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => handleChange('start_date', e.target.value)}
                    className="h-11 touch-manipulation"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-end">Expected End</Label>
                  <Input
                    id="edit-end"
                    type="date"
                    value={formData.expected_end_date}
                    onChange={(e) => handleChange('expected_end_date', e.target.value)}
                    className="h-11 touch-manipulation"
                  />
                </div>
              </div>
            </div>

            {/* Status & Progress */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                Status & Progress
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleChange('status', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Withdrawn">Withdrawn</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Suspended">Suspended</SelectItem>
                      <SelectItem value="On Break">On Break</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-risk">Risk Level</Label>
                  <Select
                    value={formData.risk_level}
                    onValueChange={(value) => handleChange('risk_level', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="edit-progress">Progress (%)</Label>
                <Input
                  id="edit-progress"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress_percent}
                  onChange={(e) => handleChange('progress_percent', e.target.value)}
                  className="h-11 touch-manipulation"
                />
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
