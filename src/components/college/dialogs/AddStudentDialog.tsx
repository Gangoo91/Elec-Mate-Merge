import { useState, type ReactNode } from 'react';
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
    <h3 className="border-b border-white/[0.08] pb-2 text-[15px] font-semibold text-white">{children}</h3>
  );
}

export function AddStudentDialog({ open, onOpenChange }: AddStudentDialogProps) {
  const { cohorts, courses, addStudent } = useCollegeSupabase();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
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
  });
  const [sendFlags, setSendFlags] = useState<string[]>([]);
  const [eal, setEal] = useState(false);

  const toggleSend = (flag: string) =>
    setSendFlags((prev) => (prev.includes(flag) ? prev.filter((f) => f !== flag) : [...prev, flag]));

  const activeCohorts = cohorts.filter((c) => c.status === 'Active');
  const activeCourses = courses.filter((c) => c.status === 'Active');

  const canSubmit = !isSubmitting && !!formData.name.trim() && !!formData.email.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsSubmitting(true);

    try {
      await addStudent({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        uln: formData.uln || null,
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

      setFormData({
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
      });
      setSendFlags([]);
      setEal(false);
      onOpenChange(false);
      toast({ title: 'Student added', description: `${formData.name} has been added.` });
    } catch (error) {
      // ELE-1375 — was a silent console.error; surface it so the user knows.
      console.error('Failed to add student:', error);
      toast({
        title: "Couldn't add student",
        description:
          (error as { message?: string })?.message ||
          'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateULN = () => {
    const random = Math.floor(Math.random() * 9000000000) + 1000000000;
    return String(random);
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Students"
      title="Enrol new student"
      description="Name and email are required. Everything else can be added later."
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
          <button type="submit" form="add-student-form" disabled={!canSubmit} className={buttonPrimaryCn}>
            {isSubmitting ? 'Enrolling…' : 'Enrol student'}
          </button>
        </div>
      }
    >
      <form
        id="add-student-form"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 items-start gap-x-10 gap-y-8 lg:grid-cols-2"
      >
        <section className="min-w-0 space-y-5">
          <SectionHeading>Learner details</SectionHeading>
          <div>
            <label className={labelCn} htmlFor="as-name">
              Full name
            </label>
            <input
              id="as-name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="John Smith"
              required
              className={inputCn}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <div>
              <label className={labelCn} htmlFor="as-email">
                Email
              </label>
              <input
                id="as-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="john.smith@email.com"
                required
                className={inputCn}
              />
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
            <div className="flex items-end gap-3">
              <input
                id="as-uln"
                value={formData.uln}
                onChange={(e) => handleChange('uln', e.target.value)}
                placeholder="10 digit ULN"
                className={cn(inputCn, 'flex-1')}
              />
              <button
                type="button"
                onClick={() => handleChange('uln', generateULN())}
                className={cn(buttonSecondaryCn, 'h-11 shrink-0 px-4')}
              >
                Generate
              </button>
            </div>
          </div>
          <div>
            <p className={labelCn}>Cohort</p>
            {activeCohorts.length === 0 ? (
              <p className="text-[13px] text-white">No active cohorts yet. You can add them to one later.</p>
            ) : activeCohorts.length <= 6 ? (
              <div className="mt-1 flex flex-wrap gap-2">
                {activeCohorts.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={formData.cohort_id === c.id}
                    onClick={() => handleChange('cohort_id', c.id)}
                    className={cn(chipCn(formData.cohort_id === c.id), 'h-11')}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            ) : (
              <MobileSelectPicker
                value={formData.cohort_id}
                onValueChange={(v) => handleChange('cohort_id', v)}
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
              placeholder="Select course (seeds AC coverage)"
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
                    className={cn(chipCn(on), 'h-10')}
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
