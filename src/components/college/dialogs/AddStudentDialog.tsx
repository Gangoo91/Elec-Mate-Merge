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

export function AddStudentDialog({ open, onOpenChange }: AddStudentDialogProps) {
  const { cohorts, courses, addStudent } = useCollegeSupabase();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    } catch (error) {
      console.error('Failed to add student:', error);
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
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent hideCloseButton className="sm:max-w-[500px]">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Enrol new student</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Add a new student to the system. All fields marked with * are required.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <ResponsiveDialogBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormCard eyebrow="Learner details">
              <Field label="Full name" required>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="John Smith"
                  required
                  className={inputClass}
                />
              </Field>
              <FormGrid cols={2}>
                <Field label="ULN">
                  <div className="flex gap-2">
                    <Input
                      id="uln"
                      value={formData.uln}
                      onChange={(e) => handleChange('uln', e.target.value)}
                      placeholder="10 digit ULN"
                      className={`${inputClass} flex-1`}
                    />
                    <SecondaryButton
                      size="sm"
                      onClick={() => handleChange('uln', generateULN())}
                    >
                      Generate
                    </SecondaryButton>
                  </div>
                </Field>
                <Field label="Email" required>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="john.smith@email.com"
                    required
                    className={inputClass}
                  />
                </Field>
              </FormGrid>
              <FormGrid cols={2}>
                <Field label="Phone">
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="07XXX XXXXXX"
                    className={inputClass}
                  />
                </Field>
                <Field label="Cohort">
                  <Select
                    value={formData.cohort_id}
                    onValueChange={(value) => handleChange('cohort_id', value)}
                  >
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
              </FormGrid>
              <Field label="Course">
                <Select
                  value={formData.course_id}
                  onValueChange={(value) => handleChange('course_id', value)}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select course — seeds AC coverage" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {activeCourses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Expected completion">
                <Input
                  id="expected_end_date"
                  type="date"
                  value={formData.expected_end_date}
                  onChange={(e) => handleChange('expected_end_date', e.target.value)}
                  className={inputClass}
                />
              </Field>
            </FormCard>

            <FormCard eyebrow="Support & needs">
              <FormGrid cols={2}>
                <Field label="First language">
                  <Input
                    value={formData.first_language}
                    onChange={(e) => handleChange('first_language', e.target.value)}
                    placeholder="English"
                    className={inputClass}
                  />
                </Field>
                <Field label="Pronouns">
                  <Input
                    value={formData.pronouns}
                    onChange={(e) => handleChange('pronouns', e.target.value)}
                    placeholder="e.g. they/them"
                    className={inputClass}
                  />
                </Field>
              </FormGrid>
              <Field label="SEND">
                <div className="flex flex-wrap gap-1.5">
                  {SEND_OPTIONS.map((opt) => {
                    const on = sendFlags.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleSend(opt)}
                        className={`h-8 px-3 rounded-full text-[12px] border transition-colors touch-manipulation ${
                          on
                            ? 'bg-elec-yellow/[0.12] border-elec-yellow/40 text-elec-yellow font-medium'
                            : 'bg-white/[0.03] border-white/[0.10] text-white hover:border-white/[0.22]'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </Field>
              <FormGrid cols={2}>
                <Field label="EHCP reference">
                  <Input
                    value={formData.ehcp_ref}
                    onChange={(e) => handleChange('ehcp_ref', e.target.value)}
                    placeholder="EHCP number (if any)"
                    className={inputClass}
                  />
                </Field>
                <Field label="EAL">
                  <button
                    type="button"
                    onClick={() => setEal((v) => !v)}
                    className={`h-11 px-4 rounded-lg text-[13px] font-medium border transition-colors touch-manipulation ${
                      eal
                        ? 'bg-elec-yellow/[0.12] border-elec-yellow/40 text-elec-yellow'
                        : 'bg-white/[0.03] border-white/[0.10] text-white'
                    }`}
                  >
                    {eal ? 'Yes — English as additional language' : 'No'}
                  </button>
                </Field>
              </FormGrid>
              <Field label="Access arrangements / notes">
                <textarea
                  value={formData.accessibility_notes}
                  onChange={(e) => handleChange('accessibility_notes', e.target.value)}
                  placeholder="Extra time, reader, rest breaks, assistive tech…"
                  rows={3}
                  className={`${inputClass} min-h-[80px] resize-y`}
                />
              </Field>
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
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Enrolling…' : 'Enrol student'}
          </PrimaryButton>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
