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
import {
  Field,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  selectContentClass,
  selectTriggerClass,
} from '@/components/college/primitives';

interface NewCohortDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MEETING_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const MEETING_TIMES = [
  '08:00 - 12:00',
  '09:00 - 13:00',
  '09:00 - 17:00',
  '13:00 - 17:00',
  '14:00 - 18:00',
  '17:30 - 21:00',
];

const ROOMS = [
  'EW101',
  'EW102',
  'EW103',
  'Workshop A',
  'Workshop B',
  'IT Lab 1',
  'IT Lab 2',
  'Online',
];

export function NewCohortDialog({ open, onOpenChange }: NewCohortDialogProps) {
  const { courses, staff, addCohort } = useCollegeSupabase();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    courseId: '',
    leadTutorId: '',
    startDate: '',
    endDate: '',
    maxStudents: '16',
    status: 'Planning' as string,
    deliveryMode: 'Day Release',
    meetingDay: '',
    meetingTime: '',
    room: '',
  });

  // Get active courses
  const activeCourses = courses.filter((c) => c.status === 'Active');

  // Get tutors who can lead cohorts
  const tutors = staff.filter(
    (s) => (s.role === 'tutor' || s.role === 'head_of_department') && s.status === 'Active'
  );

  // Get selected course details
  const selectedCourse = courses.find((c) => c.id === formData.courseId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.courseId || !formData.leadTutorId) return;

    setIsSubmitting(true);

    try {
      await addCohort({
        college_id: null,
        name: formData.name,
        course_id: formData.courseId,
        tutor_id: formData.leadTutorId,
        start_date: formData.startDate || null,
        end_date: formData.endDate || null,
        max_students: parseInt(formData.maxStudents) || null,
        status: formData.status,
      });

      // Reset form and close dialog
      setFormData({
        name: '',
        code: '',
        courseId: '',
        leadTutorId: '',
        startDate: '',
        endDate: '',
        maxStudents: '16',
        status: 'Planning',
        deliveryMode: 'Day Release',
        meetingDay: '',
        meetingTime: '',
        room: '',
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to create cohort:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Auto-generate cohort code when course is selected
  const generateCode = () => {
    if (selectedCourse) {
      const year = new Date().getFullYear().toString().slice(-2);
      const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
      const random = Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, '0');
      return `${selectedCourse?.code?.substring(0, 4) || 'COH'}${year}${month}${random}`;
    }
    return '';
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="sm:max-w-[550px]">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Create new cohort</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Set up a new cohort for a course. All fields marked with * are required.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <ResponsiveDialogBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormCard eyebrow="Course">
              <Field label="Course" required>
                <Select
                  value={formData.courseId}
                  onValueChange={(value) => handleChange('courseId', value)}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {activeCourses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <FormGrid cols={2}>
                <Field label="Cohort name" required>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="e.g., Level 3 Sept 2024"
                    required
                    className={inputClass}
                  />
                </Field>
                <Field label="Cohort code" required>
                  <div className="flex gap-2">
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => handleChange('code', e.target.value)}
                      placeholder="AUTO-GEN"
                      required
                      className={`${inputClass} flex-1`}
                    />
                    <SecondaryButton
                      size="sm"
                      onClick={() => handleChange('code', generateCode())}
                      disabled={!formData.courseId}
                    >
                      Generate
                    </SecondaryButton>
                  </div>
                </Field>
              </FormGrid>
            </FormCard>

            <FormCard eyebrow="Lead & status">
              <FormGrid cols={2}>
                <Field label="Lead tutor" required>
                  <Select
                    value={formData.leadTutorId}
                    onValueChange={(value) => handleChange('leadTutorId', value)}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select tutor" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {tutors.map((tutor) => (
                        <SelectItem key={tutor.id} value={tutor.id}>
                          {tutor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Status" required>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleChange('status', value)}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </FormGrid>
            </FormCard>

            <FormCard eyebrow="Dates & capacity">
              <FormGrid cols={2}>
                <Field label="Start date" required>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    required
                    className={inputClass}
                  />
                </Field>
                <Field label="End date" required>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                    required
                    className={inputClass}
                  />
                </Field>
              </FormGrid>

              <FormGrid cols={2}>
                <Field label="Delivery mode" required>
                  <Select
                    value={formData.deliveryMode}
                    onValueChange={(value) => handleChange('deliveryMode', value)}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      <SelectItem value="Day Release">Day Release</SelectItem>
                      <SelectItem value="Block Release">Block Release</SelectItem>
                      <SelectItem value="In-person">In-person (Full-time)</SelectItem>
                      <SelectItem value="Online">Online</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Max students" required>
                  <Input
                    id="maxStudents"
                    type="number"
                    min="1"
                    max="30"
                    value={formData.maxStudents}
                    onChange={(e) => handleChange('maxStudents', e.target.value)}
                    required
                    className={inputClass}
                  />
                </Field>
              </FormGrid>
            </FormCard>

            <FormCard eyebrow="Schedule">
              <FormGrid cols={3}>
                <Field label="Meeting day">
                  <Select
                    value={formData.meetingDay}
                    onValueChange={(value) => handleChange('meetingDay', value)}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {MEETING_DAYS.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Meeting time">
                  <Select
                    value={formData.meetingTime}
                    onValueChange={(value) => handleChange('meetingTime', value)}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {MEETING_TIMES.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Room">
                  <Select
                    value={formData.room}
                    onValueChange={(value) => handleChange('room', value)}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select room" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {ROOMS.map((room) => (
                        <SelectItem key={room} value={room}>
                          {room}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </FormGrid>
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
            disabled={
              isSubmitting ||
              !formData.name ||
              !formData.code ||
              !formData.courseId ||
              !formData.leadTutorId
            }
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Creating…' : 'Create cohort'}
          </PrimaryButton>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
