import { useEffect, useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  labelCn,
  selectTriggerCn,
} from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { choiceCn } from '@/components/college/teaching/TeachingKit';
import { useCollegeCohorts } from '@/hooks/college/useCollegeCohorts';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  useSchemesOfWork,
  type SchemeOfWorkRow,
  type SchemeStatus,
} from '@/hooks/college/useSchemesOfWork';

const STATUS_OPTIONS: { value: SchemeStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Active' },
  { value: 'archived', label: 'Archived' },
];

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

  const selectedCohort = cohorts.find((c) => c.id === form.cohort_id);
  const selectedQual = qualifications.find((q) => q.code === form.qualification_code);

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Scheme of work"
      title={editing ? 'Edit scheme of work' : 'Create scheme of work'}
      description="A scheme of work plans how a qualification is delivered to one cohort across an academic year."
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-5 lg:grid-cols-2"
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
            disabled={!canSubmit}
            className={buttonPrimaryCn}
          >
            {isSubmitting
              ? editing
                ? 'Saving…'
                : 'Creating…'
              : editing
                ? 'Save changes'
                : 'Create scheme'}
          </button>
        </div>
      }
    >
      <div className="lg:col-span-2">
        <label className={labelCn} htmlFor="sow-title">
          Title
        </label>
        <input
          id="sow-title"
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="e.g. Level 3 Electrical Installation, Year 1"
          className={inputCn}
          required
        />
      </div>

      <div>
        <div className={labelCn} id="sow-cohort-label">
          Cohort
        </div>
        {cohorts.length === 0 ? (
          <p className="py-2 text-[13px] text-white">No cohorts yet. Create a cohort first.</p>
        ) : cohorts.length <= 6 ? (
          <div
            className="mt-1 flex flex-wrap gap-2"
            role="radiogroup"
            aria-labelledby="sow-cohort-label"
          >
            {cohorts.map((c) => (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={form.cohort_id === c.id}
                onClick={() => handleChange('cohort_id', c.id)}
                className={choiceCn(form.cohort_id === c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>
        ) : (
          <MobileSelectPicker
            value={form.cohort_id}
            onValueChange={(v) => handleChange('cohort_id', v)}
            options={cohorts.map((c) => ({ value: c.id, label: c.name }))}
            title="Cohort"
            placeholder="Choose a cohort"
            triggerClassName={selectTriggerCn}
          />
        )}
      </div>

      <div>
        <div className={labelCn}>Qualification</div>
        {qualsLoading ? (
          <p className="py-2 text-[13px] text-white">Loading qualifications…</p>
        ) : qualifications.length === 0 ? (
          <p className="py-2 text-[13px] text-white">No qualifications seeded yet.</p>
        ) : (
          <MobileSelectPicker
            value={form.qualification_code}
            onValueChange={(v) => handleChange('qualification_code', v)}
            options={qualifications.map((q) => ({
              value: q.code,
              label: `L${q.level} · ${q.title}`,
            }))}
            title="Qualification"
            placeholder="Choose a qualification"
            triggerClassName={selectTriggerCn}
          />
        )}
      </div>

      <div>
        <label className={labelCn} htmlFor="sow-year">
          Academic year
        </label>
        <input
          id="sow-year"
          value={form.academic_year}
          onChange={(e) => handleChange('academic_year', e.target.value)}
          placeholder="2026/27"
          className={inputCn}
        />
      </div>

      <div>
        <div className={labelCn} id="sow-status-label">
          Status
        </div>
        <div
          className="mt-1 flex flex-wrap gap-2"
          role="radiogroup"
          aria-labelledby="sow-status-label"
        >
          {STATUS_OPTIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={form.status === o.value}
              onClick={() => handleChange('status', o.value)}
              className={choiceCn(form.status === o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={labelCn} htmlFor="sow-start">
          Start date
        </label>
        <input
          id="sow-start"
          type="date"
          value={form.start_date}
          onChange={(e) => handleChange('start_date', e.target.value)}
          className={inputCn}
        />
      </div>

      <div>
        <label className={labelCn} htmlFor="sow-end">
          End date
        </label>
        <input
          id="sow-end"
          type="date"
          value={form.end_date}
          onChange={(e) => handleChange('end_date', e.target.value)}
          className={inputCn}
        />
      </div>

      {(selectedCohort || selectedQual) && (
        <p className="text-[13px] leading-snug text-white lg:col-span-2">
          {selectedQual ? `L${selectedQual.level} ${selectedQual.title}` : 'A qualification'}
          {' for '}
          {selectedCohort ? selectedCohort.name : 'a cohort'}
          {form.academic_year ? `, ${form.academic_year}` : ''}.
        </p>
      )}
    </FormSheet>
  );
}

// Returns 2026/27 in September onwards, otherwise 2025/26.
function defaultAcademicYear(): string {
  const now = new Date();
  const y = now.getFullYear();
  const startYear = now.getMonth() >= 7 ? y : y - 1; // August onwards = new academic year
  return `${startYear}/${String(startYear + 1).slice(-2)}`;
}
