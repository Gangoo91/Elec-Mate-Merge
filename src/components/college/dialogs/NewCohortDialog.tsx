import { useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useAuth } from '@/contexts/AuthContext';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  labelCn,
} from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { cn } from '@/lib/utils';

interface NewCohortDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The college the cohort belongs to. Defaults to the signed-in staff member's own. */
  collegeId?: string | null;
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

const STATUSES = ['Planning', 'Active'];

const DELIVERY_MODES = [
  { value: 'Day Release', label: 'Day release' },
  { value: 'Block Release', label: 'Block release' },
  { value: 'In-person', label: 'In-person (full-time)' },
  { value: 'Online', label: 'Online' },
  { value: 'Hybrid', label: 'Hybrid' },
];

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="border-b border-white/[0.08] pb-2 text-[15px] font-semibold text-white">
      {children}
    </h3>
  );
}

function Chips({
  value,
  onChange,
  options,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={cn('mt-1 flex flex-wrap gap-2', className)}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(chipCn(value === o.value), 'h-11')}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const EMPTY_FORM = {
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
};

/*
 * 8 Oct 2026: each missing required field says so under itself on Create
 * (the button used to just stay dim), a college with no course or no tutor
 * is told where to go first, an end date before the start is caught, and a
 * saved cohort ends on a screen with the next two steps (join code, learners).
 */
export function NewCohortDialog({ open, onOpenChange, collegeId }: NewCohortDialogProps) {
  const { courses, staff, cohorts, addCohort } = useCollegeSupabase();
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [done, setDone] = useState<string | null>(null);
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
  const activeCourses = courses.filter((c) => (c.status ?? 'Active').toLowerCase() === 'active');

  // Who can lead a cohort. A college admin counts: in a new college the lead
  // who set it up is often the only member of staff, and the set-up checklist
  // asks for a cohort before staff.
  const tutors = staff.filter(
    (s) =>
      ['tutor', 'head_of_department', 'admin'].includes((s.role ?? '').toLowerCase()) &&
      (s.status ?? 'Active').toLowerCase() === 'active'
  );

  // One course, or one possible lead: choose it for them.
  useEffect(() => {
    if (!open) return;
    setError(null);
    setFormData((prev) => ({
      ...prev,
      courseId: prev.courseId || (activeCourses.length === 1 ? activeCourses[0].id : ''),
      leadTutorId: prev.leadTutorId || (tutors.length === 1 ? tutors[0].id : ''),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, activeCourses.length, tutors.length]);

  // Get selected course details
  const selectedCourse = courses.find((c) => c.id === formData.courseId);

  const errors = {
    courseId: !formData.courseId ? 'Pick the course this cohort is on.' : null,
    name: !formData.name.trim() ? 'Give the cohort a name.' : null,
    code: !formData.code.trim()
      ? 'Type a code, or press Generate.'
      : cohorts.some(
            (c) => (c.code ?? '').trim().toLowerCase() === formData.code.trim().toLowerCase()
          )
        ? 'Another cohort already uses this code.'
        : null,
    leadTutorId: !formData.leadTutorId ? 'Pick who leads it.' : null,
    endDate:
      formData.startDate && formData.endDate && formData.endDate < formData.startDate
        ? 'The end date is before the start date.'
        : null,
  };
  const hasErrors = Object.values(errors).some(Boolean);
  const fieldError = (k: keyof typeof errors) =>
    touched && errors[k] ? (
      <p className="mt-1.5 text-[12.5px] font-medium text-orange-300">{errors[k]}</p>
    ) : null;
  const canSubmit = !isSubmitting;

  const reset = () => {
    setFormData(EMPTY_FORM);
    setTouched(false);
    setError(null);
    setDone(null);
  };
  const close = (o: boolean) => {
    if (!o) reset();
    onOpenChange(o);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (hasErrors) return;
    const college = collegeId ?? profile?.college_id ?? null;
    if (!college) {
      setError('Your account is not linked to a college yet. Reload the page and try again.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await addCohort({
        college_id: college,
        name: formData.name.trim(),
        course_id: formData.courseId,
        tutor_id: formData.leadTutorId,
        start_date: formData.startDate || null,
        end_date: formData.endDate || null,
        max_students: parseInt(formData.maxStudents) || null,
        status: formData.status,
        code: formData.code.trim() || null,
        delivery_mode: formData.deliveryMode || null,
        meeting_day: formData.meetingDay || null,
        meeting_time: formData.meetingTime || null,
        room: formData.room || null,
      });

      setDone(formData.name.trim());
    } catch (err) {
      const m = ((err as { message?: string })?.message ?? '').toLowerCase();
      setError(
        m.includes('duplicate') || m.includes('unique')
          ? 'A cohort with that code already exists. Change the cohort code (or press Generate) and try again.'
          : m.includes('row-level security') || m.includes('permission')
            ? 'Your account cannot add cohorts to this college. Ask your college admin to check your role.'
            : 'The cohort was not created. Check your connection and try again.'
      );
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

  const go = (url: string) => {
    close(false);
    navigate(url);
  };

  if (done) {
    return (
      <FormSheet
        open={open}
        onOpenChange={close}
        width="wide"
        eyebrow="Cohorts"
        title={`${done} is set up`}
        description="The cohort is saved. Two things left before it runs."
        footer={
          <div className="grid grid-cols-2 gap-2.5">
            <button type="button" onClick={reset} className={buttonSecondaryCn}>
              Create another
            </button>
            <button type="button" onClick={() => close(false)} className={buttonPrimaryCn}>
              Done
            </button>
          </div>
        }
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.08] p-4 sm:p-5">
            <h3 className="text-[15px] font-semibold text-white">1. Make its join code</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white">
              Learners type it when they sign up, or open its link, and land in this cohort. One
              code per cohort.
            </p>
            <button
              type="button"
              onClick={() => go('/college/setup')}
              className={cn(buttonSecondaryCn, 'mt-4 w-auto px-5')}
            >
              Open join codes
            </button>
          </div>
          <div className="rounded-2xl border border-white/[0.08] p-4 sm:p-5">
            <h3 className="text-[15px] font-semibold text-white">2. Put learners in it</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white">
              Enrol them one at a time, or paste the class list from your MIS with Bulk enrol.
            </p>
            <button
              type="button"
              onClick={() => go('/college?section=students')}
              className={cn(buttonSecondaryCn, 'mt-4 w-auto px-5')}
            >
              Go to learners
            </button>
          </div>
        </div>
      </FormSheet>
    );
  }

  return (
    <FormSheet
      open={open}
      onOpenChange={close}
      width="wide"
      eyebrow="Cohorts"
      title="Create a cohort"
      description="A group of learners on one course. Fields marked * are required."
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          {error && (
            <p
              role="alert"
              className="col-span-2 rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2.5 text-[13px] text-orange-300"
            >
              {error}
            </p>
          )}
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
            form="new-cohort-form"
            disabled={!canSubmit}
            className={buttonPrimaryCn}
          >
            {isSubmitting ? 'Creating…' : 'Create cohort'}
          </button>
        </div>
      }
    >
      <form
        id="new-cohort-form"
        onSubmit={handleSubmit}
        noValidate
        className="grid grid-cols-1 items-start gap-x-10 gap-y-8 lg:grid-cols-2"
      >
        <div className="min-w-0 space-y-8">
          <section className="space-y-5">
            <SectionHeading>Course</SectionHeading>
            <div>
              <p className={labelCn}>Course *</p>
              {activeCourses.length === 0 ? (
                <div className="space-y-2">
                  <p className="text-[13px] leading-relaxed text-white">
                    No courses yet. A cohort has to be on a course, so add the course first.
                  </p>
                  <button
                    type="button"
                    onClick={() => go('/college?section=coursesetup')}
                    className={cn(buttonSecondaryCn, 'w-auto px-5')}
                  >
                    Go to course setup
                  </button>
                </div>
              ) : (
                <MobileSelectPicker
                  value={formData.courseId}
                  onValueChange={(v) => handleChange('courseId', v)}
                  title="Course"
                  placeholder="Select course"
                  options={activeCourses.map((c) => ({ value: c.id, label: c.name }))}
                />
              )}
              {activeCourses.length > 0 && fieldError('courseId')}
            </div>
            <div>
              <label className={labelCn} htmlFor="nc-name">
                Cohort name *
              </label>
              <input
                id="nc-name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g. Level 3 Sept 2026"
                required
                className={inputCn}
              />
              {fieldError('name')}
            </div>
            <div>
              <label className={labelCn} htmlFor="nc-code">
                Cohort code *
              </label>
              <div className="flex items-end gap-3">
                <input
                  id="nc-code"
                  value={formData.code}
                  onChange={(e) => handleChange('code', e.target.value)}
                  placeholder="Type one or generate"
                  required
                  className={cn(inputCn, 'flex-1')}
                />
                <button
                  type="button"
                  onClick={() => handleChange('code', generateCode())}
                  disabled={!formData.courseId}
                  className={cn(buttonSecondaryCn, 'h-11 shrink-0 px-4')}
                >
                  Generate
                </button>
              </div>
              {fieldError('code')}
            </div>
          </section>

          <section className="space-y-5">
            <SectionHeading>Lead and status</SectionHeading>
            <div>
              <p className={labelCn}>Lead tutor *</p>
              {tutors.length === 0 ? (
                <p className="text-[13px] text-white">
                  Nobody on your staff list can lead a cohort yet. Add a tutor first (College Hub,
                  Tutors), then come back.
                </p>
              ) : null}
              {tutors.length === 0 ? null : tutors.length <= 6 ? (
                <Chips
                  value={formData.leadTutorId}
                  onChange={(v) => handleChange('leadTutorId', v)}
                  options={tutors.map((t) => ({ value: t.id, label: t.name }))}
                />
              ) : (
                <MobileSelectPicker
                  value={formData.leadTutorId}
                  onValueChange={(v) => handleChange('leadTutorId', v)}
                  title="Lead tutor"
                  placeholder="Select tutor"
                  options={tutors.map((t) => ({ value: t.id, label: t.name }))}
                />
              )}
              {tutors.length > 0 && fieldError('leadTutorId')}
            </div>
            <div>
              <p className={labelCn}>Status</p>
              <Chips
                value={formData.status}
                onChange={(v) => handleChange('status', v)}
                options={STATUSES.map((s) => ({ value: s, label: s }))}
              />
            </div>
          </section>
        </div>

        <div className="min-w-0 space-y-8">
          <section className="space-y-5">
            <SectionHeading>Dates and capacity</SectionHeading>
            <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-6">
              <div>
                <label className={labelCn} htmlFor="nc-start">
                  Start date
                </label>
                <input
                  id="nc-start"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                  className={inputCn}
                />
              </div>
              <div>
                <label className={labelCn} htmlFor="nc-end">
                  End date
                </label>
                <input
                  id="nc-end"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                  className={inputCn}
                />
                {fieldError('endDate')}
              </div>
            </div>
            <div className="max-w-[10rem]">
              <label className={labelCn} htmlFor="nc-max">
                Places
              </label>
              <input
                id="nc-max"
                type="number"
                min="1"
                max="30"
                value={formData.maxStudents}
                onChange={(e) => handleChange('maxStudents', e.target.value)}
                className={inputCn}
              />
            </div>
            <div>
              <p className={labelCn}>Delivery mode</p>
              <Chips
                value={formData.deliveryMode}
                onChange={(v) => handleChange('deliveryMode', v)}
                options={DELIVERY_MODES}
              />
            </div>
          </section>

          <section className="space-y-5">
            <SectionHeading>Schedule</SectionHeading>
            <div>
              <p className={labelCn}>Meeting day</p>
              <Chips
                value={formData.meetingDay}
                onChange={(v) => handleChange('meetingDay', v)}
                options={MEETING_DAYS.map((d) => ({ value: d, label: d }))}
              />
            </div>
            <div>
              <p className={labelCn}>Meeting time</p>
              <Chips
                value={formData.meetingTime}
                onChange={(v) => handleChange('meetingTime', v)}
                options={MEETING_TIMES.map((t) => ({ value: t, label: t.replace(' - ', ' to ') }))}
              />
            </div>
            <div>
              <label className={labelCn} htmlFor="nc-room">
                Room
              </label>
              <input
                id="nc-room"
                value={formData.room}
                onChange={(e) => handleChange('room', e.target.value)}
                placeholder="e.g. Workshop A, or Online"
                className={inputCn}
              />
            </div>
          </section>
        </div>
      </form>
    </FormSheet>
  );
}
