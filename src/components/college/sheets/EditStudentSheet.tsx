import { useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStudent } from '@/contexts/CollegeSupabaseContext';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  SheetShell,
  FormCard,
  FormGrid,
  Field,
  PrimaryButton,
  SecondaryButton,
  SuccessCheckmark,
  inputClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/college/primitives';

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
        progress_percent: formData.progress_percent ? parseInt(formData.progress_percent) : 0,
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
        title: 'Student Updated',
        description: `${formData.name} has been updated successfully.`,
      });

      setTimeout(() => {
        setShowSuccess(false);
        onOpenChange(false);
      }, 700);
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
      <SheetContent side="bottom" className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]">
        <SheetShell
          eyebrow="Edit Student"
          title={student.name}
          description={`Update details for ${student.name}`}
          footer={
            <>
              <SecondaryButton
                fullWidth
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                fullWidth
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.name || !formData.email}
              >
                {isSubmitting ? 'Saving…' : 'Save Changes →'}
              </PrimaryButton>
            </>
          }
        >
          <FormCard eyebrow="Personal Details">
            <Field label="Full Name" required>
              <input
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={inputClass}
              />
            </Field>
            <FormGrid cols={2}>
              <Field label="Email" required>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Phone">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
            <Field label="ULN">
              <input
                value={formData.uln}
                onChange={(e) => handleChange('uln', e.target.value)}
                className={inputClass}
                placeholder="10 digit ULN"
              />
            </Field>
          </FormCard>

          <FormCard eyebrow="Enrolment">
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
            <FormGrid cols={2}>
              <Field label="Start Date">
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => handleChange('start_date', e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Expected End">
                <input
                  type="date"
                  value={formData.expected_end_date}
                  onChange={(e) => handleChange('expected_end_date', e.target.value)}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
          </FormCard>

          <FormCard eyebrow="Status & Progress">
            <FormGrid cols={2}>
              <Field label="Status">
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange('status', value)}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Withdrawn">Withdrawn</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                    <SelectItem value="On Break">On Break</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Risk Level">
                <Select
                  value={formData.risk_level}
                  onValueChange={(value) => handleChange('risk_level', value)}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </FormGrid>
            <Field label="Progress (%)">
              <input
                type="number"
                min="0"
                max="100"
                value={formData.progress_percent}
                onChange={(e) => handleChange('progress_percent', e.target.value)}
                className={inputClass}
              />
            </Field>
          </FormCard>

          <FormCard eyebrow="Inclusion & Support">
            <Field label="SEND flags (tick all that apply)">
              <div className="flex flex-wrap gap-1.5">
                {[
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
                ].map((f) => {
                  const on = formData.send_flags.includes(f.key);
                  return (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          send_flags: on
                            ? prev.send_flags.filter((x) => x !== f.key)
                            : [...prev.send_flags, f.key],
                        }))
                      }
                      className={`h-8 px-3 rounded-full text-[12px] border transition-colors touch-manipulation ${
                        on
                          ? 'bg-elec-yellow/[0.1] border-elec-yellow/40 text-elec-yellow font-medium'
                          : 'bg-[hsl(0_0%_13%)] border-white/[0.08] text-white hover:text-white hover:border-white/[0.18]'
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </Field>
            <FormGrid cols={2}>
              <Field label="EAL">
                <Select
                  value={formData.eal ? 'yes' : 'no'}
                  onValueChange={(value) => setFormData((p) => ({ ...p, eal: value === 'yes' }))}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes (EAL)</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="First language (if EAL)">
                <input
                  value={formData.first_language}
                  onChange={(e) => handleChange('first_language', e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Polish, Urdu, Romanian"
                />
              </Field>
            </FormGrid>
            <FormGrid cols={2}>
              <Field label="EHCP reference">
                <input
                  value={formData.ehcp_ref}
                  onChange={(e) => handleChange('ehcp_ref', e.target.value)}
                  className={inputClass}
                  placeholder="e.g. EHCP-2024-1234"
                />
              </Field>
              <Field label="Pronouns">
                <input
                  value={formData.pronouns}
                  onChange={(e) => handleChange('pronouns', e.target.value)}
                  className={inputClass}
                  placeholder="e.g. she/her, they/them"
                />
              </Field>
            </FormGrid>
            <Field label="Accessibility / reasonable adjustments">
              <textarea
                value={formData.accessibility_notes}
                onChange={(e) => handleChange('accessibility_notes', e.target.value)}
                rows={3}
                className={`${inputClass} min-h-[90px] resize-y`}
                placeholder="Anything a tutor should know — e.g. coloured overlays, seating near front, break every 45 min."
              />
            </Field>
          </FormCard>
        </SheetShell>
        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
  );
}
