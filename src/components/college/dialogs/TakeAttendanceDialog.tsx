import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Pill } from '@/components/college/primitives';
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

type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Authorised';

interface TakeAttendanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cohortId?: string; // If provided, pre-select this cohort
}

type StudentAttendance = {
  studentId: string;
  studentName: string;
  status: AttendanceStatus;
  notes: string;
  minutesLate?: number;
};

const SESSION_TYPES = [
  'Lecture',
  'Workshop',
  'Tutorial',
  'EPA Prep',
  'Assessment',
  'Practical',
  'Online',
  'Self-Study',
] as const;

const ATTENDANCE_STATUSES: { value: AttendanceStatus; label: string; short: string }[] = [
  { value: 'Present', label: 'Present', short: 'P' },
  { value: 'Absent', label: 'Absent', short: 'A' },
  { value: 'Late', label: 'Late', short: 'L' },
  { value: 'Authorised', label: 'Auth. Absence', short: 'AA' },
];

export function TakeAttendanceDialog({ open, onOpenChange, cohortId }: TakeAttendanceDialogProps) {
  const { students, cohorts, staff, bulkRecordAttendance } = useCollegeSupabase();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState(cohortId || '');
  const [sessionType, setSessionType] = useState<(typeof SESSION_TYPES)[number]>('Lecture');
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [tutorId, setTutorId] = useState('');
  const [studentAttendance, setStudentAttendance] = useState<StudentAttendance[]>([]);

  // Get active cohorts
  const activeCohorts = cohorts.filter((c) => c.status === 'Active');

  // Get tutors
  const tutors = staff.filter((s) => s.role === 'tutor');

  // Get students for selected cohort
  const cohortStudents = students.filter(
    (s) => s.cohort_id === selectedCohort && s.status === 'Active'
  );

  // Initialize student attendance when cohort changes
  useEffect(() => {
    if (selectedCohort && cohortStudents.length > 0) {
      setStudentAttendance(
        cohortStudents.map((student) => ({
          studentId: student.id,
          studentName: student.name,
          status: 'Present' as AttendanceStatus,
          notes: '',
        }))
      );
    } else {
      setStudentAttendance([]);
    }
  }, [selectedCohort]);

  // Update form when cohortId prop changes
  useEffect(() => {
    if (cohortId) {
      setSelectedCohort(cohortId);
    }
  }, [cohortId]);

  const updateStudentStatus = (studentId: string, status: AttendanceStatus) => {
    setStudentAttendance((prev) =>
      prev.map((sa) => (sa.studentId === studentId ? { ...sa, status } : sa))
    );
  };

  const markAllPresent = () => {
    setStudentAttendance((prev) =>
      prev.map((sa) => ({ ...sa, status: 'Present' as AttendanceStatus }))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCohort || !tutorId || studentAttendance.length === 0) return;

    setIsSubmitting(true);

    try {
      const records = studentAttendance.map((sa) => ({
        student_id: sa.studentId,
        cohort_id: selectedCohort,
        date: sessionDate,
        status: sa.status as AttendanceStatus,
        notes: sa.notes || null,
        recorded_by: tutorId,
      }));

      await bulkRecordAttendance(records);

      // Reset and close
      setSelectedCohort('');
      setStudentAttendance([]);
      setTutorId('');
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to record attendance:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const presentCount = studentAttendance.filter((s) => s.status === 'Present').length;
  const absentCount = studentAttendance.filter((s) => s.status === 'Absent').length;

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="sm:max-w-[600px]">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Take register</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Record attendance for a cohort session.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <ResponsiveDialogBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormCard eyebrow="Session">
              <FormGrid cols={2}>
                <Field label="Cohort" required>
                  <Select value={selectedCohort} onValueChange={setSelectedCohort}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select cohort" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {activeCohorts.map((cohort) => (
                        <SelectItem key={cohort.id} value={cohort.id}>
                          {cohort.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Date" required>
                  <Input
                    id="sessionDate"
                    type="date"
                    value={sessionDate}
                    onChange={(e) => setSessionDate(e.target.value)}
                    required
                    className={inputClass}
                  />
                </Field>
              </FormGrid>

              <FormGrid cols={2}>
                <Field label="Session type" required>
                  <Select
                    value={sessionType}
                    onValueChange={(value) => setSessionType(value as (typeof SESSION_TYPES)[number])}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {SESSION_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Tutor" required>
                  <Select value={tutorId} onValueChange={setTutorId}>
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
              </FormGrid>
            </FormCard>

            {/* Students List */}
            {selectedCohort && studentAttendance.length > 0 && (
              <FormCard eyebrow="Register">
                <div className="flex items-center justify-between">
                  <label className={fieldLabelClass}>Students ({studentAttendance.length})</label>
                  <div className="flex items-center gap-2">
                    <Pill tone="green">{presentCount} Present</Pill>
                    {absentCount > 0 && <Pill tone="red">{absentCount} Absent</Pill>}
                    <SecondaryButton size="sm" onClick={markAllPresent}>
                      Mark all present
                    </SecondaryButton>
                  </div>
                </div>

                <div className="border border-white/[0.08] rounded-xl divide-y divide-white/[0.06] max-h-[300px] overflow-y-auto">
                  {studentAttendance.map((sa) => {
                    const student = students.find((s) => s.id === sa.studentId);
                    return (
                      <div key={sa.studentId} className="p-3 flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student?.photo_url} />
                          <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-xs">
                            {student?.name
                              .split(' ')
                              .map((n: string) => n[0])
                              .join('') || '?'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate text-white">{sa.studentName}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {ATTENDANCE_STATUSES.map((status) => {
                            const isActive = sa.status === status.value;
                            return (
                              <button
                                key={status.value}
                                type="button"
                                className={cn(
                                  'h-8 px-2 rounded-full text-xs font-medium transition-colors touch-manipulation border',
                                  isActive
                                    ? status.value === 'Present'
                                      ? 'bg-emerald-500 border-emerald-500 text-black'
                                      : status.value === 'Absent'
                                        ? 'bg-red-500 border-red-500 text-white'
                                        : status.value === 'Late'
                                          ? 'bg-amber-500 border-amber-500 text-black'
                                          : 'bg-blue-500 border-blue-500 text-white'
                                    : 'bg-[hsl(0_0%_13%)] border-white/[0.08] text-white hover:border-white/[0.18]'
                                )}
                                onClick={() => updateStudentStatus(sa.studentId, status.value)}
                                title={status.label}
                              >
                                {status.short}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </FormCard>
            )}

            {selectedCohort && studentAttendance.length === 0 && (
              <div className="text-center p-8 text-white">
                No active students in this cohort.
              </div>
            )}
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
            disabled={isSubmitting || !selectedCohort || !tutorId || studentAttendance.length === 0}
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Saving…' : 'Save register'}
          </PrimaryButton>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
