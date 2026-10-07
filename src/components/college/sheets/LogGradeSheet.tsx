import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  chipOn,
  grid2Cn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   LogGradeSheet — record a unit grade for one learner.
   Saves to college_grades; tutor / assessor logged automatically.
   ========================================================================== */

// Canonical college_grades.grade values (normalising trigger, 20261008034100).
const GRADES: { value: 'Distinction' | 'Merit' | 'Pass' | 'Fail'; label: string; tone: string }[] =
  [
    {
      value: 'Distinction',
      label: 'Distinction',
      tone: 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200',
    },
    { value: 'Merit', label: 'Merit', tone: 'bg-amber-500/15 border-amber-400/40 text-amber-200' },
    { value: 'Pass', label: 'Pass', tone: 'bg-blue-500/15 border-blue-400/40 text-blue-200' },
    { value: 'Fail', label: 'Fail', tone: 'bg-red-500/15 border-red-400/40 text-red-200' },
  ];

const ASSESSMENT_TYPES = [
  'knowledge_test',
  'assignment',
  'practical',
  'presentation',
  'observation',
  'professional_discussion',
  'portfolio',
  'mock_exam',
] as const;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string;
  studentName: string;
  courseId: string | null;
  /** Suggested unit codes from qualification_requirements (auto-fetched) */
  onSaved?: () => void;
}

interface UnitOption {
  unit_code: string;
  unit_title: string | null;
}

// Today's date in the UK (Europe/London), as YYYY-MM-DD. toISOString() is UTC,
// which reads as yesterday between midnight and 1am in BST.
function londonToday(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());
}

export function LogGradeSheet({
  open,
  onOpenChange,
  studentId,
  studentName,
  courseId,
  onSaved,
}: Props) {
  const { toast } = useToast();
  const [unitName, setUnitName] = useState('');
  const [unitOptions, setUnitOptions] = useState<UnitOption[]>([]);
  const [assessmentType, setAssessmentType] =
    useState<(typeof ASSESSMENT_TYPES)[number]>('practical');
  const [grade, setGrade] = useState<(typeof GRADES)[number]['value']>('Pass');
  const [score, setScore] = useState<string>('');
  const [feedback, setFeedback] = useState('');
  const [date, setDate] = useState(londonToday);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setUnitName('');
    setAssessmentType('practical');
    setGrade('Pass');
    setScore('');
    setFeedback('');
    setDate(londonToday());
  }, [open]);

  // Fetch unit suggestions from qualification_requirements via the course code
  useEffect(() => {
    if (!open || !courseId) {
      setUnitOptions([]);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data: course } = await supabase
        .from('college_courses')
        .select('code')
        .eq('id', courseId)
        .maybeSingle();
      const code = (course as { code?: string | null } | null)?.code;
      if (!code) return;
      const { data } = await supabase
        .from('qualification_requirements')
        .select('unit_code, unit_title')
        .eq('qualification_code', code);
      if (cancelled) return;
      const seen = new Set<string>();
      const list = ((data ?? []) as UnitOption[]).filter((u) => {
        if (seen.has(u.unit_code)) return false;
        seen.add(u.unit_code);
        return true;
      });
      setUnitOptions(list);
    })();
    return () => {
      cancelled = true;
    };
  }, [open, courseId]);

  const handleSave = async () => {
    if (!unitName.trim()) {
      toast({
        title: 'Unit required',
        description: 'Pick a unit or enter the unit name.',
        variant: 'destructive',
      });
      return;
    }
    setSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      const parsedScore = score.trim() ? Number(score) : null;
      if (parsedScore != null && (isNaN(parsedScore) || parsedScore < 0 || parsedScore > 100)) {
        throw new Error('Score must be 0–100');
      }

      const { error } = await supabase.from('college_grades').insert({
        student_id: studentId,
        course_id: courseId,
        unit_name: unitName.trim(),
        assessment_type: assessmentType,
        grade,
        score: parsedScore,
        feedback: feedback.trim() || null,
        assessed_by: user.id,
        assessed_at: new Date(date).toISOString(),
        status: 'Graded',
      });
      if (error) throw new Error(error.message || 'Could not save grade');

      toast({
        title: 'Grade logged',
        description: `${unitName.trim()} → ${grade}${parsedScore != null ? ` (${parsedScore}%)` : ''} for ${studentName.split(' ')[0]}.`,
      });
      onSaved?.();
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Could not save',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const first = studentName.split(' ')[0];

  return (
    <FormSheet
      width="wide"
      bodyClassName="grid items-start gap-x-10 gap-y-6 lg:grid-cols-2"
      open={open}
      onOpenChange={onOpenChange}
      eyebrow={`Grade · ${studentName}`}
      title={`Log a grade for ${first}`}
      description="Record a unit grade with its score and feedback. It saves to the learner's grade record, logged as assessed by you."
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={saving}
            className={buttonSecondaryCn}
          >
            Cancel
          </button>
          <button type="button" onClick={handleSave} disabled={saving} className={buttonPrimaryCn}>
            {saving ? 'Saving…' : 'Save grade'}
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <label className={labelCn} htmlFor="lg-unit">
            Unit
          </label>
          <input
            id="lg-unit"
            list="unit-suggestions"
            type="text"
            value={unitName}
            onChange={(e) => setUnitName(e.target.value)}
            placeholder="e.g. ELC2-005 Containment"
            className={inputCn}
          />
          {unitOptions.length > 0 && (
            <datalist id="unit-suggestions">
              {unitOptions.map((u) => (
                <option
                  key={u.unit_code}
                  value={u.unit_title ? `${u.unit_code} — ${u.unit_title}` : u.unit_code}
                />
              ))}
            </datalist>
          )}
          {unitOptions.length > 0 && (
            <p className="mt-2 text-[12px] text-white">
              {unitOptions.length} units on this course. Start typing to filter.
            </p>
          )}
        </div>

        <div>
          <p className={labelCn}>Assessment type</p>
          <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {ASSESSMENT_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={assessmentType === t}
                onClick={() => setAssessmentType(t)}
                className={cn(
                  chipBase,
                  'px-2 text-[12.5px] capitalize',
                  assessmentType === t ? chipOn : chipOff
                )}
              >
                {t.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <p className={labelCn}>Grade</p>
          <div className="mt-1 grid grid-cols-4 gap-2">
            {GRADES.map((g) => (
              <button
                key={g.value}
                type="button"
                aria-pressed={grade === g.value}
                onClick={() => setGrade(g.value)}
                className={cn(chipBase, 'px-1 text-[13px]', grade === g.value ? chipOn : chipOff)}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div className={grid2Cn}>
          <div>
            <label className={labelCn} htmlFor="lg-score">
              Score (0–100)
            </label>
            <input
              id="lg-score"
              type="number"
              inputMode="numeric"
              min={0}
              max={100}
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="Optional"
              className={inputCn}
            />
          </div>
          <div>
            <label className={labelCn} htmlFor="lg-date">
              Date assessed
            </label>
            <input
              id="lg-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputCn}
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <label className={labelCn} htmlFor="lg-feedback">
          Feedback
        </label>
        <textarea
          id="lg-feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
          placeholder="What went well, what to improve…"
          className={textareaCn}
        />
      </div>
    </FormSheet>
  );
}
