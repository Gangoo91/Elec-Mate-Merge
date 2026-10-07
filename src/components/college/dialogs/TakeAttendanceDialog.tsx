import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { cn } from '@/lib/utils';
import { Under18Badge } from '@/components/college/people/Under18Badge';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn, inputCn, labelCn } from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { REGISTER_SESSIONS, currentSession, type RegisterSession } from '@/lib/college/attendanceSession';

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

const SESSION_TYPE_LABEL: Record<string, string> = { 'EPA Prep': 'EPA prep', 'Self-Study': 'Self-study' };

const ATTENDANCE_STATUSES: { value: AttendanceStatus; label: string; short: string }[] = [
  { value: 'Present', label: 'Present', short: 'P' },
  { value: 'Absent', label: 'Absent', short: 'A' },
  { value: 'Late', label: 'Late', short: 'L' },
  { value: 'Authorised', label: 'Authorised absence', short: 'AA' },
];

const STATUS_ON: Record<AttendanceStatus, string> = {
  Present: 'border-emerald-400 bg-emerald-400 text-black font-semibold',
  Absent: 'border-red-400 bg-red-400 text-black font-semibold',
  Late: 'border-orange-300 bg-orange-300 text-black font-semibold',
  Authorised: 'border-white bg-white text-black font-semibold',
};

export function TakeAttendanceDialog({ open, onOpenChange, cohortId }: TakeAttendanceDialogProps) {
  const { students, cohorts, staff, bulkRecordAttendance } = useCollegeSupabase();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState(cohortId || '');
  const [sessionType, setSessionType] = useState<(typeof SESSION_TYPES)[number]>('Lecture');
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [daySession, setDaySession] = useState<RegisterSession>(() => currentSession());
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

  // Initialise the register when the cohort changes, or when the cohort's
  // students arrive later than the sheet (they load from context). Keyed on
  // the student ids, and any mark already made for a student is kept, so a
  // context refresh never wipes the tutor's register.
  const rosterKey = selectedCohort ? cohortStudents.map((s) => s.id).join(',') : '';
  useEffect(() => {
    if (selectedCohort && cohortStudents.length > 0) {
      setStudentAttendance((prev) => {
        const byId = new Map(prev.map((sa) => [sa.studentId, sa]));
        return cohortStudents.map(
          (student) =>
            byId.get(student.id) ?? {
              studentId: student.id,
              studentName: student.name,
              status: 'Present' as AttendanceStatus,
              notes: '',
            }
        );
      });
    } else {
      setStudentAttendance([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCohort, rosterKey]);

  // Each time the sheet opens, start from the cohort the caller passed in.
  // (After a save the cohort is cleared, and cohortId alone hasn't changed,
  // so keying on cohortId only left the reopened register empty.)
  useEffect(() => {
    if (open) {
      setSelectedCohort(cohortId || '');
      setDaySession(currentSession());
    }
  }, [open, cohortId]);

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
        session: daySession,
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
  const cohortName = activeCohorts.find((c) => c.id === selectedCohort)?.name;

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow={cohortName ? `Register · ${cohortName}` : 'Register'}
      title="Take register"
      description="Record attendance for a morning or afternoon session. Everyone starts as present. Saving the same session again replaces its marks."
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
            form="take-attendance-form"
            disabled={isSubmitting || !selectedCohort || !tutorId || studentAttendance.length === 0}
            className={buttonPrimaryCn}
          >
            {isSubmitting ? 'Saving…' : 'Save register'}
          </button>
        </div>
      }
    >
      <form
        id="take-attendance-form"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 items-start gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]"
      >
        <section className="min-w-0 space-y-5">
          <h3 className="border-b border-white/[0.08] pb-2 text-[15px] font-semibold text-white">Session</h3>
          <div>
            <p className={labelCn}>Cohort</p>
            {activeCohorts.length === 0 ? (
              <p className="text-[13px] text-white">No active cohorts yet.</p>
            ) : activeCohorts.length <= 6 ? (
              <div className="mt-1 flex flex-wrap gap-2">
                {activeCohorts.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={selectedCohort === c.id}
                    onClick={() => setSelectedCohort(c.id)}
                    className={cn(chipCn(selectedCohort === c.id), 'h-11')}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            ) : (
              <MobileSelectPicker
                value={selectedCohort}
                onValueChange={setSelectedCohort}
                title="Cohort"
                placeholder="Select cohort"
                options={activeCohorts.map((c) => ({ value: c.id, label: c.name }))}
              />
            )}
          </div>
          <div>
            <p className={labelCn}>Morning or afternoon</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {REGISTER_SESSIONS.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  aria-pressed={daySession === s.value}
                  onClick={() => setDaySession(s.value)}
                  className={cn(chipCn(daySession === s.value), 'h-11')}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-6">
            <div>
              <label className={labelCn} htmlFor="ta-date">
                Date
              </label>
              <input
                id="ta-date"
                type="date"
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)}
                required
                className={inputCn}
              />
            </div>
            <div>
              <p className={labelCn}>Session type</p>
              <MobileSelectPicker
                value={sessionType}
                onValueChange={(v) => setSessionType(v as (typeof SESSION_TYPES)[number])}
                title="Session type"
                options={SESSION_TYPES.map((t) => ({ value: t, label: SESSION_TYPE_LABEL[t] ?? t }))}
              />
            </div>
          </div>
          <div>
            <p className={labelCn}>Tutor</p>
            {tutors.length === 0 ? (
              <p className="text-[13px] text-white">No tutors on the staff list yet.</p>
            ) : tutors.length <= 6 ? (
              <div className="mt-1 flex flex-wrap gap-2">
                {tutors.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    aria-pressed={tutorId === t.id}
                    onClick={() => setTutorId(t.id)}
                    className={cn(chipCn(tutorId === t.id), 'h-11')}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            ) : (
              <MobileSelectPicker
                value={tutorId}
                onValueChange={setTutorId}
                title="Tutor"
                placeholder="Select tutor"
                options={tutors.map((t) => ({ value: t.id, label: t.name }))}
              />
            )}
          </div>
        </section>

        <section className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-x-3 border-b border-white/[0.08] pb-2">
            <h3 className="text-[15px] font-semibold text-white">
              Register
              {studentAttendance.length > 0 ? ` (${studentAttendance.length})` : ''}
            </h3>
            {studentAttendance.length > 0 && (
              <div className="flex items-center gap-4 text-[13px]">
                <span className="font-semibold text-emerald-400 tabular-nums">{presentCount} present</span>
                {absentCount > 0 && (
                  <span className="font-semibold text-red-400 tabular-nums">{absentCount} absent</span>
                )}
                <button
                  type="button"
                  onClick={markAllPresent}
                  className="-my-2 inline-flex min-h-11 items-center text-[13px] font-semibold text-elec-yellow touch-manipulation"
                >
                  Mark all present
                </button>
              </div>
            )}
          </div>

          {!selectedCohort && (
            <p className="py-6 text-[14px] text-white">Pick a cohort to load its learners.</p>
          )}

          {selectedCohort && studentAttendance.length === 0 && (
            <p className="py-6 text-[14px] text-white">No active students in this cohort.</p>
          )}

          {selectedCohort && studentAttendance.length > 0 && (
            <ul className="divide-y divide-white/[0.08]">
              {studentAttendance.map((sa) => {
                const student = students.find((s) => s.id === sa.studentId);
                return (
                  <li key={sa.studentId} className="flex items-center gap-3 py-3">
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarImage src={student?.photo_url ?? undefined} />
                      <AvatarFallback className="bg-white/[0.08] text-xs font-semibold text-white">
                        {student?.name
                          .split(' ')
                          .map((n: string) => n[0])
                          .join('') || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <p className="flex min-w-0 flex-1 items-center gap-2 text-[14px] font-medium text-white">
                      <span className="truncate">{sa.studentName}</span>
                      <Under18Badge dob={(student as { date_of_birth?: string | null } | undefined)?.date_of_birth} />
                    </p>
                    <div className="flex shrink-0 items-center gap-1.5">
                      {ATTENDANCE_STATUSES.map((status) => {
                        const isActive = sa.status === status.value;
                        return (
                          <button
                            key={status.value}
                            type="button"
                            aria-pressed={isActive}
                            aria-label={`${sa.studentName}: ${status.label}`}
                            title={status.label}
                            onClick={() => updateStudentStatus(sa.studentId, status.value)}
                            className={cn(
                              'h-10 min-w-10 rounded-full border px-2.5 text-[12.5px] transition-colors touch-manipulation',
                              isActive
                                ? STATUS_ON[status.value]
                                : 'border-white/[0.12] bg-white/[0.06] font-medium text-white hover:border-white/[0.3]'
                            )}
                          >
                            <span className="lg:hidden">{status.short}</span>
                            <span className="hidden lg:inline">{status.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </form>
    </FormSheet>
  );
}
