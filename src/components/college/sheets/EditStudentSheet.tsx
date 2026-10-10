import { useState, useEffect } from 'react';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStudent } from '@/contexts/CollegeSupabaseContext';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import { useToast } from '@/hooks/use-toast';
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
import { SuccessCheckmark } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface EditStudentSheetProps {
  student: CollegeStudent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Canonical college_students.status / risk_level values (normalising trigger, 20261008034000).
const STATUSES = ['Active', 'On Break', 'Suspended', 'Withdrawn', 'Completed'];
const STATUS_LABEL: Record<string, string> = {};
const RISK_LEVELS = ['Low', 'Medium', 'High', 'Critical'];

const SEND_FLAGS = [
  { key: 'dyslexia', label: 'Dyslexia' },
  { key: 'dyscalculia', label: 'Dyscalculia' },
  { key: 'dyspraxia', label: 'Dyspraxia' },
  { key: 'autism', label: 'Autism' },
  { key: 'adhd', label: 'ADHD' },
  { key: 'hearing', label: 'Hearing' },
  { key: 'visual', label: 'Visual' },
  { key: 'physical', label: 'Physical' },
  { key: 'mental_health', label: 'Mental health' },
  { key: 'other', label: 'Other SEND' },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="border-b border-white/[0.08] pb-2 text-[15px] font-semibold text-white">
      {children}
    </h3>
  );
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
    eal: false,
    ehcp_ref: '',
    first_language: '',
    pronouns: '',
    accessibility_notes: '',
    send_flags: [] as string[],
  });

  useEffect(() => {
    if (student) {
      const s = student as typeof student & {
        eal?: boolean | null;
        ehcp_ref?: string | null;
        first_language?: string | null;
        pronouns?: string | null;
        accessibility_notes?: string | null;
        send_flags?: string[] | null;
      };
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
        eal: Boolean(s.eal),
        ehcp_ref: s.ehcp_ref ?? '',
        first_language: s.first_language ?? '',
        pronouns: s.pronouns ?? '',
        accessibility_notes: s.accessibility_notes ?? '',
        send_flags: Array.isArray(s.send_flags) ? s.send_flags : [],
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
        // Inclusion data — used by AI to generate named inclusive strategies.
        send_flags: formData.send_flags,
        eal: formData.eal,
        ehcp_ref: formData.ehcp_ref.trim() || null,
        first_language: formData.first_language.trim() || null,
        pronouns: formData.pronouns.trim() || null,
        accessibility_notes: formData.accessibility_notes.trim() || null,
      } as Parameters<typeof updateStudent>[1]);

      setShowSuccess(true);
      triggerSuccess(true);

      toast({
        title: 'Student updated',
        description: `${formData.name} has been updated.`,
      });

      setTimeout(() => {
        setShowSuccess(false);
        onOpenChange(false);
      }, 700);
    } catch (error) {
      console.error('Failed to update student:', error);
      toast({
        title: 'Update failed',
        description: 'There was an error updating the student. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!student) return null;

  // Keep a cohort that is no longer Active selectable so the current value shows.
  const cohortOptions = activeCohorts.map((c) => ({ value: c.id, label: c.name }));
  const currentCohort = cohorts.find((c) => c.id === formData.cohort_id);
  if (currentCohort && !cohortOptions.some((o) => o.value === currentCohort.id)) {
    cohortOptions.unshift({ value: currentCohort.id, label: currentCohort.name });
  }

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Edit student"
      title={student.name}
      description={`Update details for ${student.name}.`}
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-8 lg:grid-cols-2"
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
            disabled={isSubmitting || !formData.name || !formData.email}
            className={buttonPrimaryCn}
          >
            {isSubmitting ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      }
    >
      <div className="min-w-0 space-y-8">
        <section className="space-y-5">
          <SectionHeading>Personal details</SectionHeading>
          <div>
            <label className={labelCn} htmlFor="es-name">
              Full name
            </label>
            <input
              id="es-name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={inputCn}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <div>
              <label className={labelCn} htmlFor="es-email">
                Email
              </label>
              <input
                id="es-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={inputCn}
              />
            </div>
            <div>
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
          <div>
            <label className={labelCn} htmlFor="es-uln">
              ULN
            </label>
            <input
              id="es-uln"
              value={formData.uln}
              onChange={(e) => handleChange('uln', e.target.value)}
              className={inputCn}
              placeholder="10 digit ULN"
            />
          </div>
        </section>

        <section className="space-y-5">
          <SectionHeading>Enrolment</SectionHeading>
          <div>
            <p className={labelCn}>Cohort</p>
            {cohortOptions.length === 0 ? (
              <p className="text-[13px] text-white">No active cohorts yet.</p>
            ) : cohortOptions.length <= 6 ? (
              <div className="mt-1 flex flex-wrap gap-2">
                {cohortOptions.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    aria-pressed={formData.cohort_id === c.value}
                    onClick={() => handleChange('cohort_id', c.value)}
                    className={cn(chipCn(formData.cohort_id === c.value), 'h-11')}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            ) : (
              <MobileSelectPicker
                value={formData.cohort_id}
                onValueChange={(v) => handleChange('cohort_id', v)}
                title="Cohort"
                placeholder="Select cohort"
                options={cohortOptions}
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-6">
            <div>
              <label className={labelCn} htmlFor="es-start">
                Start date
              </label>
              <input
                id="es-start"
                type="date"
                value={formData.start_date}
                onChange={(e) => handleChange('start_date', e.target.value)}
                className={inputCn}
              />
            </div>
            <div>
              <label className={labelCn} htmlFor="es-end">
                Expected end
              </label>
              <input
                id="es-end"
                type="date"
                value={formData.expected_end_date}
                onChange={(e) => handleChange('expected_end_date', e.target.value)}
                className={inputCn}
              />
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <SectionHeading>Status and progress</SectionHeading>
          <div>
            <p className={labelCn}>Status</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={formData.status === s}
                  onClick={() => handleChange('status', s)}
                  className={cn(chipCn(formData.status === s), 'h-11')}
                >
                  {STATUS_LABEL[s] ?? s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className={labelCn}>Risk level</p>
            <div className="mt-1 grid grid-cols-3 gap-2">
              {RISK_LEVELS.map((r) => (
                <button
                  key={r}
                  type="button"
                  aria-pressed={formData.risk_level === r}
                  onClick={() => handleChange('risk_level', r)}
                  className={cn(chipCn(formData.risk_level === r), 'h-11')}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          {/* 8 Oct 2026: no typed "Progress (%)". Progress is criteria passed,
              worked out from the portfolio (get_portfolio_ac_state). */}
        </section>
      </div>

      <section className="min-w-0 space-y-5">
        <SectionHeading>Inclusion and support</SectionHeading>
        <div>
          <p className={labelCn}>SEND flags (tick all that apply)</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {SEND_FLAGS.map((f) => {
              const on = formData.send_flags.includes(f.key);
              return (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      send_flags: on
                        ? prev.send_flags.filter((x) => x !== f.key)
                        : [...prev.send_flags, f.key],
                    }))
                  }
                  className={cn(chipCn(on), 'h-10')}
                >
                  {f.label}
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
                aria-pressed={formData.eal === o.v}
                onClick={() => setFormData((p) => ({ ...p, eal: o.v }))}
                className={cn(chipCn(formData.eal === o.v), 'h-11')}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div>
            <label className={labelCn} htmlFor="es-lang">
              First language (if EAL)
            </label>
            <input
              id="es-lang"
              value={formData.first_language}
              onChange={(e) => handleChange('first_language', e.target.value)}
              className={inputCn}
              placeholder="e.g. Polish, Urdu, Romanian"
            />
          </div>
          <div>
            <label className={labelCn} htmlFor="es-ehcp">
              EHCP reference
            </label>
            <input
              id="es-ehcp"
              value={formData.ehcp_ref}
              onChange={(e) => handleChange('ehcp_ref', e.target.value)}
              className={inputCn}
              placeholder="e.g. EHCP-2024-1234"
            />
          </div>
          <div>
            <label className={labelCn} htmlFor="es-pronouns">
              Pronouns
            </label>
            <input
              id="es-pronouns"
              value={formData.pronouns}
              onChange={(e) => handleChange('pronouns', e.target.value)}
              className={inputCn}
              placeholder="e.g. she/her, they/them"
            />
          </div>
        </div>
        <div>
          <label className={labelCn} htmlFor="es-access">
            Accessibility and reasonable adjustments
          </label>
          <textarea
            id="es-access"
            value={formData.accessibility_notes}
            onChange={(e) => handleChange('accessibility_notes', e.target.value)}
            rows={4}
            className={textareaCn}
            placeholder="Anything a tutor should know, e.g. coloured overlays, seating near the front, a break every 45 minutes."
          />
        </div>
      </section>
      <SuccessCheckmark show={showSuccess} />
    </FormSheet>
  );
}
