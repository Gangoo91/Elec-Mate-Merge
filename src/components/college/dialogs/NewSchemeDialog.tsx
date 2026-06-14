import { useEffect, useState } from 'react';
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
import { useCollegeCohorts } from '@/hooks/college/useCollegeCohorts';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  useSchemesOfWork,
  type SchemeOfWorkRow,
  type SchemeStatus,
} from '@/hooks/college/useSchemesOfWork';
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

interface NewSchemeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing?: SchemeOfWorkRow | null;
}

interface QualOption {
  code: string;
  title: string;
  level: string;
}

export function NewSchemeDialog({ open, onOpenChange, editing }: NewSchemeDialogProps) {
  const { profile } = useAuth();
  const collegeId = profile?.college_id ?? undefined;
  const { data: cohorts = [] } = useCollegeCohorts(collegeId);
  const { create, update } = useSchemesOfWork();
  const { toast } = useToast();

  const [qualifications, setQualifications] = useState<QualOption[]>([]);
  const [qualsLoading, setQualsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    cohort_id: '',
    qualification_code: '',
    academic_year: '',
    start_date: '',
    end_date: '',
    status: 'draft' as SchemeStatus,
  });

  // Load qualifications once when dialog opens.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setQualsLoading(true);
    (async () => {
      const { data, error } = await supabase
        .from('qualifications')
        .select('code, title, level')
        .eq('is_curriculum_seeded', true)
        .order('level')
        .order('title');
      if (cancelled) return;
      setQualsLoading(false);
      if (error) {
        console.error('Load qualifications failed:', error);
        toast({
          title: 'Could not load qualifications',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }
      setQualifications((data ?? []) as QualOption[]);
    })();
    return () => {
      cancelled = true;
    };
  }, [open, toast]);

  // Hydrate the form when editing a scheme; reset when creating fresh.
  useEffect(() => {
    if (!open) return;
    if (editing) {
      setForm({
        title: editing.title,
        cohort_id: editing.cohort_id,
        qualification_code: editing.qualification_code,
        academic_year: editing.academic_year ?? '',
        start_date: editing.start_date ?? '',
        end_date: editing.end_date ?? '',
        status: editing.status,
      });
    } else {
      setForm({
        title: '',
        cohort_id: '',
        qualification_code: '',
        academic_year: defaultAcademicYear(),
        start_date: '',
        end_date: '',
        status: 'draft',
      });
    }
  }, [open, editing]);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canSubmit =
    form.title.trim().length > 1 && form.cohort_id && form.qualification_code && !isSubmitting;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    try {
      if (editing) {
        await update.mutateAsync({
          id: editing.id,
          patch: {
            title: form.title.trim(),
            cohort_id: form.cohort_id,
            qualification_code: form.qualification_code,
            academic_year: form.academic_year || null,
            start_date: form.start_date || null,
            end_date: form.end_date || null,
            status: form.status,
          },
        });
        toast({ title: 'Scheme updated', description: form.title });
      } else {
        await create.mutateAsync({
          title: form.title.trim(),
          cohort_id: form.cohort_id,
          qualification_code: form.qualification_code,
          academic_year: form.academic_year || null,
          start_date: form.start_date || null,
          end_date: form.end_date || null,
          status: form.status,
        });
        toast({ title: 'Scheme created', description: form.title });
      }
      onOpenChange(false);
    } catch (e) {
      toast({
        title: editing ? 'Could not update scheme' : 'Could not create scheme',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent hideCloseButton className="sm:max-w-[600px]">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>
            {editing ? 'Edit scheme of work' : 'Create scheme of work'}
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            A scheme of work plans how a qualification is delivered to one cohort across an
            academic year.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <ResponsiveDialogBody>
          <div className="space-y-4">
            <FormCard eyebrow="Scheme">
              <Field label="Title" required>
                <Input
                  value={form.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g. Level 3 Electrical Installation — Year 1"
                  className={inputClass}
                  required
                />
              </Field>

              <FormGrid cols={2}>
                <Field label="Cohort" required>
                  <Select
                    value={form.cohort_id}
                    onValueChange={(v) => handleChange('cohort_id', v)}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select cohort" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {cohorts.length === 0 ? (
                        <SelectItem value="__none__" disabled>
                          No cohorts yet
                        </SelectItem>
                      ) : (
                        cohorts.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Qualification" required>
                  <Select
                    value={form.qualification_code}
                    onValueChange={(v) => handleChange('qualification_code', v)}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {qualsLoading ? (
                        <SelectItem value="__loading__" disabled>
                          Loading…
                        </SelectItem>
                      ) : qualifications.length === 0 ? (
                        <SelectItem value="__none__" disabled>
                          No qualifications seeded yet
                        </SelectItem>
                      ) : (
                        qualifications.map((q) => (
                          <SelectItem key={q.code} value={q.code}>
                            L{q.level} · {q.title}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </Field>
              </FormGrid>
            </FormCard>

            <FormCard eyebrow="Dates & status">
              <FormGrid cols={2}>
                <Field label="Academic year">
                  <Input
                    value={form.academic_year}
                    onChange={(e) => handleChange('academic_year', e.target.value)}
                    placeholder="2026/27"
                    className={inputClass}
                  />
                </Field>
                <Field label="Status">
                  <Select
                    value={form.status}
                    onValueChange={(v) => handleChange('status', v as SchemeStatus)}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Active</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </FormGrid>

              <FormGrid cols={2}>
                <Field label="Start date">
                  <Input
                    type="date"
                    value={form.start_date}
                    onChange={(e) => handleChange('start_date', e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="End date">
                  <Input
                    type="date"
                    value={form.end_date}
                    onChange={(e) => handleChange('end_date', e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </FormGrid>
            </FormCard>
          </div>
        </ResponsiveDialogBody>

        <ResponsiveDialogFooter>
          <SecondaryButton onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={handleSubmit} disabled={!canSubmit}>
            {isSubmitting
              ? editing
                ? 'Saving…'
                : 'Creating…'
              : editing
                ? 'Save changes'
                : 'Create scheme'}
          </PrimaryButton>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

// Returns 2026/27 in September onwards, otherwise 2025/26.
function defaultAcademicYear(): string {
  const now = new Date();
  const y = now.getFullYear();
  const startYear = now.getMonth() >= 7 ? y : y - 1; // August onwards = new academic year
  return `${startYear}/${String(startYear + 1).slice(-2)}`;
}
