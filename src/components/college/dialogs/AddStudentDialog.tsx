import { useState, type ReactNode } from 'react';
import { runRoster } from '@/lib/collegeRoster';
import { useToast } from '@/hooks/use-toast';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { cn } from '@/lib/utils';

interface AddStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Common SEND categories (UK). Stored as a free text[] so this list can grow
// without a migration. Captured here so Student 360 + the cohort-aware lesson
// planner and ILP tailoring have the real picture from day one.
const SEND_OPTIONS = [
  'Dyslexia',
  'Dyscalculia',
  'Dyspraxia',
  'ADHD',
  'Autism / ASD',
  'SEMH',
  'Hearing impairment',
  'Visual impairment',
  'Physical disability',
  'Speech & language',
];

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="border-b border-white/[0.08] pb-2 text-[15px] font-semibold text-white">
      {children}
    </h3>
  );
}

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  uln: '',
  cohort_id: '',
  course_id: '',
  expected_end_date: '',
  ehcp_ref: '',
  first_language: '',
  pronouns: '',
  accessibility_notes: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const norm = (s: string | null | undefined) => (s ?? '').trim().toLowerCase();

/*
 * 8 Oct 2026: the sheet now checks what it can before saving (email shape,
 * an email already on the roll, a ULN that is not 10 digits), says which
 * fields are required, fills the course and end date from the cohort, and
 * ends on a success screen that says what happens next (the learner has no
 * login until they use the join code). The "Generate" ULN button is gone: a
 * ULN is issued by the Learning Records Service, and a random one is a
 * made-up record.
 */
export function AddStudentDialog({ open, onOpenChange }: AddStudentDialogProps) {
  const { cohorts, courses, students, addStudent } = useCollegeSupabase();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(EMPTY);
  const [touched, setTouched] = useState(false);
  const [done, setDone] = useState<{
    name: string;
    email: string;
    cohortId: string | null;
    cohort: string | null;
  } | null>(null);
  // "Email them a login now": the same route as bulk enrol, for this one learner.
  const [login, setLogin] = useState<{ state: 'idle' | 'busy' | 'done' | 'error'; text?: string }>({
    state: 'idle',
  });
  const sendLogin = async () => {
    if (!done) return;
    setLogin({ state: 'busy' });
    try {
      const res = await runRoster({
        kind: 'learners',
        rows: [{ index: 0, name: done.name, email: done.email, cohort_id: done.cohortId }],
        send_email: true,
      });
      const item = res.items[0];
      const text = !item
        ? 'Nothing came back. Try bulk enrol instead.'
        : item.outcome === 'failed'
          ? `Could not make a login: ${item.detail ?? 'unknown reason'}.`
          : item.emailed
            ? `Done. ${done.name} has a login and the join link is in their inbox (${done.email}).`
            : item.outcome === 'matched' || item.outcome === 'already'
              ? `${done.name} already has an Elec-Mate account, now linked to this record.`
              : item.email_error
                ? `Login made, but the email did not send (${item.email_error}). Give them the join code instead.`
                : `Login made for ${done.name}.`;
      setLogin({ state: item && item.outcome !== 'failed' ? 'done' : 'error', text });
    } catch (e) {
      setLogin({ state: 'error', text: `Could not make a login: ${(e as Error).message}` });
    }
  };
  const [sendFlags, setSendFlags] = useState<string[]>([]);
  const [eal, setEal] = useState(false);

  const toggleSend = (flag: string) =>
    setSendFlags((prev) =>
      prev.includes(flag) ? prev.filter((f) => f !== flag) : [...prev, flag]
    );

  const activeCohorts = cohorts.filter((c) => norm(c.status) === 'active');
  const activeCourses = courses.filter((c) => norm(c.status) === 'active');

  const email = formData.email.trim();
  const uln = formData.uln.replace(/\s/g, '');
  const errors = {
    name: !formData.name.trim() ? 'Enter their full name.' : null,
    email: !email
      ? 'Enter their email. It is how their account links to this record.'
      : !EMAIL_RE.test(email)
        ? 'That does not look like an email address.'
        : students.some((s) => norm(s.email) === norm(email))
          ? 'Someone with this email is already on the roll.'
          : null,
    uln: uln && !/^\d{10}$/.test(uln) ? 'A ULN is 10 digits.' : null,
  };
  const hasErrors = !!(errors.name || errors.email || errors.uln);
  const canSubmit = !isSubmitting;

  const reset = () => {
    setFormData(EMPTY);
    setSendFlags([]);
    setEal(false);
    setTouched(false);
    setDone(null);
  };

  const close = (o: boolean) => {
    if (!o) reset();
    onOpenChange(o);
  };

  const pickCohort = (id: string) => {
    const c = cohorts.find((x) => x.id === id);
    setFormData((prev) => ({
      ...prev,
      cohort_id: id,
      // The cohort already knows its course and end date; fill them if blank.
      course_id: prev.course_id || c?.course_id || '',
      expected_end_date: prev.expected_end_date || c?.end_date || '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit || hasErrors) return;
    setIsSubmitting(true);

    try {
      await addStudent({
        name: formData.name.trim(),
        email,
        phone: formData.phone.trim() || null,
        uln: uln || null,
        cohort_id: formData.cohort_id || null,
        expected_end_date: formData.expected_end_date || null,
        college_id: null,
        user_id: null,
        employer_id: null,
        course_id: formData.course_id || null,
        start_date: new Date().toISOString().split('T')[0],
        status: 'Active',
        progress_percent: 0,
        risk_level: 'Low',
        photo_url: null,
        send_flags: sendFlags.length ? sendFlags : null,
        eal,
        ehcp_ref: formData.ehcp_ref || null,
        first_language: formData.first_language || null,
        pronouns: formData.pronouns || null,
        accessibility_notes: formData.accessibility_notes || null,
      });

      setLogin({ state: 'idle' });
      setDone({
        name: formData.name.trim(),
        email: formData.email.trim(),
        cohortId: formData.cohort_id || null,
        cohort: cohorts.find((c) => c.id === formData.cohort_id)?.name ?? null,
      });
    } catch (error) {
      // ELE-1375 — was a silent console.error; surface it so the user knows.
      console.error('Failed to add student:', error);
      toast({
        title: 'Could not enrol this learner',
        description:
          (error as { message?: string })?.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const err = (k: keyof typeof errors) =>
    touched && errors[k] ? (
      <p className="mt-1.5 text-[12.5px] font-medium text-orange-300">{errors[k]}</p>
    ) : null;

  if (done) {
    return (
      <FormSheet
        open={open}
        onOpenChange={close}
        width="wide"
        eyebrow="Learners"
        title={`${done.name} is on the roll`}
        description={
          done.cohort
            ? `Enrolled in ${done.cohort}.`
            : 'Enrolled with no cohort yet. Move them into one from the roster.'
        }
        footer={
          <div className="grid grid-cols-2 gap-2.5">
            <button type="button" onClick={reset} className={buttonSecondaryCn}>
              Enrol another
            </button>
            <button type="button" onClick={() => close(false)} className={buttonPrimaryCn}>
              Done
            </button>
          </div>
        }
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.08] p-4 sm:p-5">
            <h3 className="text-[15px] font-semibold text-white">What happens next</h3>
            {login.state === 'done' ? (
              <p className="mt-3 text-[13.5px] font-semibold leading-relaxed text-emerald-300">
                {login.text}
              </p>
            ) : (
              <>
                <p className="mt-3 text-[13.5px] leading-relaxed text-white">
                  They do not have a login yet. Make one now and email them the join link, or give
                  them the join code yourself.
                </p>
                <button
                  type="button"
                  onClick={() => void sendLogin()}
                  disabled={login.state === 'busy'}
                  className={`${buttonSecondaryCn} mt-3 w-auto px-5`}
                >
                  {login.state === 'busy' ? 'Making the login…' : 'Email them a login now'}
                </button>
                {login.state === 'error' && (
                  <p className="mt-2 text-[12.5px] font-medium text-orange-300">{login.text}</p>
                )}
              </>
            )}
            <ol className="mt-4 space-y-2.5 text-[13.5px] leading-relaxed text-white">
              <li>1. Until they have a login, the roster shows them as not joined.</li>
              <li>
                2. Give them the join code for their cohort (Invite by code on the Learners page).
                When they sign up with it, or sign in and enter it, their account links to this
                record.
              </li>
              <li>
                3. From then on their hours, evidence and criteria show on the roster and in Student
                360.
              </li>
            </ol>
          </div>
          <div className="rounded-2xl border border-white/[0.08] p-4 sm:p-5">
            <h3 className="text-[15px] font-semibold text-white">A whole class to add?</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white">
              Bulk enrol on the Learners page takes a pasted list or a CSV from your MIS, checks
              every row before anything is saved, and can make each learner a login.
            </p>
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
      eyebrow="Learners"
      title="Enrol a learner"
      description="Name and email are required (marked *). Everything else can be added later from Student 360."
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
            form="add-student-form"
            disabled={!canSubmit}
            className={buttonPrimaryCn}
          >
            {isSubmitting ? 'Enrolling…' : 'Enrol learner'}
          </button>
        </div>
      }
    >
      <form
        id="add-student-form"
        onSubmit={handleSubmit}
        noValidate
        className="grid grid-cols-1 items-start gap-x-10 gap-y-8 lg:grid-cols-2"
      >
        <section className="min-w-0 space-y-5">
          <SectionHeading>Learner details</SectionHeading>
          <div>
            <label className={labelCn} htmlFor="as-name">
              Full name *
            </label>
            <input
              id="as-name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="John Smith"
              required
              aria-invalid={touched && !!errors.name}
              className={inputCn}
            />
            {err('name')}
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <div>
              <label className={labelCn} htmlFor="as-email">
                Email *
              </label>
              <input
                id="as-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="john.smith@email.com"
                required
                aria-invalid={touched && !!errors.email}
                className={inputCn}
              />
              {err('email')}
            </div>
            <div>
              <label className={labelCn} htmlFor="as-phone">
                Phone
              </label>
              <input
                id="as-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="07XXX XXXXXX"
                className={inputCn}
              />
            </div>
          </div>
          <div>
            <label className={labelCn} htmlFor="as-uln">
              ULN
            </label>
            <input
              id="as-uln"
              inputMode="numeric"
              value={formData.uln}
              onChange={(e) => handleChange('uln', e.target.value)}
              placeholder="10 digits, from your MIS or the Learning Records Service"
              aria-invalid={touched && !!errors.uln}
              className={inputCn}
            />
            {err('uln')}
          </div>
          <div>
            <p className={labelCn}>Cohort</p>
            {activeCohorts.length === 0 ? (
              <p className="text-[13px] text-white">
                No active cohorts yet. Enrol them now and move them into a cohort once you have
                created one.
              </p>
            ) : activeCohorts.length <= 6 ? (
              <div className="mt-1 flex flex-wrap gap-2">
                {activeCohorts.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={formData.cohort_id === c.id}
                    onClick={() => pickCohort(c.id)}
                    className={cn(chipCn(formData.cohort_id === c.id), 'h-11')}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            ) : (
              <MobileSelectPicker
                value={formData.cohort_id}
                onValueChange={pickCohort}
                title="Cohort"
                placeholder="Select cohort"
                options={activeCohorts.map((c) => ({ value: c.id, label: c.name }))}
              />
            )}
          </div>
          <div>
            <p className={labelCn}>Course</p>
            <MobileSelectPicker
              value={formData.course_id}
              onValueChange={(v) => handleChange('course_id', v)}
              title="Course"
              placeholder="Select course"
              options={activeCourses.map((c) => ({ value: c.id, label: c.name }))}
            />
          </div>
          <div className="max-w-xs">
            <label className={labelCn} htmlFor="as-end">
              Expected completion
            </label>
            <input
              id="as-end"
              type="date"
              value={formData.expected_end_date}
              onChange={(e) => handleChange('expected_end_date', e.target.value)}
              className={inputCn}
            />
          </div>
        </section>

        <section className="min-w-0 space-y-5">
          <SectionHeading>Support and needs</SectionHeading>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <div>
              <label className={labelCn} htmlFor="as-lang">
                First language
              </label>
              <input
                id="as-lang"
                value={formData.first_language}
                onChange={(e) => handleChange('first_language', e.target.value)}
                placeholder="English"
                className={inputCn}
              />
            </div>
            <div>
              <label className={labelCn} htmlFor="as-pronouns">
                Pronouns
              </label>
              <input
                id="as-pronouns"
                value={formData.pronouns}
                onChange={(e) => handleChange('pronouns', e.target.value)}
                placeholder="e.g. they/them"
                className={inputCn}
              />
            </div>
          </div>
          <div>
            <p className={labelCn}>SEND</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {SEND_OPTIONS.map((opt) => {
                const on = sendFlags.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleSend(opt)}
                    className={cn(chipCn(on), 'h-11')}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p className={labelCn}>English as an additional language</p>
            <div className="mt-1 grid max-w-sm grid-cols-2 gap-2">
              {[
                { v: false, label: 'No' },
                { v: true, label: 'Yes (EAL)' },
              ].map((o) => (
                <button
                  key={o.label}
                  type="button"
                  aria-pressed={eal === o.v}
                  onClick={() => setEal(o.v)}
                  className={cn(chipCn(eal === o.v), 'h-11')}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={labelCn} htmlFor="as-ehcp">
              EHCP reference
            </label>
            <input
              id="as-ehcp"
              value={formData.ehcp_ref}
              onChange={(e) => handleChange('ehcp_ref', e.target.value)}
              placeholder="EHCP number (if any)"
              className={inputCn}
            />
          </div>
          <div>
            <label className={labelCn} htmlFor="as-access">
              Access arrangements and notes
            </label>
            <textarea
              id="as-access"
              value={formData.accessibility_notes}
              onChange={(e) => handleChange('accessibility_notes', e.target.value)}
              placeholder="Extra time, reader, rest breaks, assistive tech…"
              rows={4}
              className={textareaCn}
            />
          </div>
        </section>
      </form>
    </FormSheet>
  );
}
