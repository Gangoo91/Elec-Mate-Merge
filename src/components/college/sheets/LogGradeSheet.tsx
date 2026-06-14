import { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
} from '@/components/college/primitives';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   LogGradeSheet — record a unit grade for one learner.
   Saves to college_grades; tutor / assessor logged automatically.
   ========================================================================== */

const GRADES: { value: 'distinction' | 'merit' | 'pass' | 'fail'; label: string; tone: string }[] = [
  { value: 'distinction', label: 'Distinction', tone: 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200' },
  { value: 'merit', label: 'Merit', tone: 'bg-amber-500/15 border-amber-400/40 text-amber-200' },
  { value: 'pass', label: 'Pass', tone: 'bg-blue-500/15 border-blue-400/40 text-blue-200' },
  { value: 'fail', label: 'Fail', tone: 'bg-red-500/15 border-red-400/40 text-red-200' },
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

export function LogGradeSheet({ open, onOpenChange, studentId, studentName, courseId, onSaved }: Props) {
  const { toast } = useToast();
  const [unitName, setUnitName] = useState('');
  const [unitOptions, setUnitOptions] = useState<UnitOption[]>([]);
  const [assessmentType, setAssessmentType] = useState<typeof ASSESSMENT_TYPES[number]>('practical');
  const [grade, setGrade] = useState<typeof GRADES[number]['value']>('pass');
  const [score, setScore] = useState<string>('');
  const [feedback, setFeedback] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setUnitName('');
    setAssessmentType('practical');
    setGrade('pass');
    setScore('');
    setFeedback('');
    setDate(new Date().toISOString().slice(0, 10));
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
      toast({ title: 'Unit required', description: 'Pick a unit or enter the unit name.', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
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
        status: 'final',
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent hideCloseButton
        side="bottom"
        className="h-[92vh] sm:max-w-2xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10"
      >
        <SheetShell
          eyebrow="Grade"
          title={`Log grade — ${studentName.split(' ')[0]}`}
          description="Record a unit grade with score and feedback. Saves to the learner's grade record."
          footer={
            <>
              <SecondaryButton onClick={() => onOpenChange(false)} disabled={saving} fullWidth>
                Cancel
              </SecondaryButton>
              <PrimaryButton onClick={handleSave} disabled={saving} fullWidth>
                <Check className="h-3.5 w-3.5 mr-1.5" strokeWidth={3} />
                {saving ? 'Saving…' : 'Save grade'}
              </PrimaryButton>
            </>
          }
        >
          <div>
            <Label>Unit</Label>
            <input
              list="unit-suggestions"
              type="text"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
              placeholder="e.g. ELC2-005 Containment"
              className="mt-2 w-full h-11 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.08] focus:border-elec-yellow/40 text-[13px] text-white px-3 touch-manipulation"
            />
            {unitOptions.length > 0 && (
              <datalist id="unit-suggestions">
                {unitOptions.map((u) => (
                  <option key={u.unit_code} value={u.unit_title ? `${u.unit_code} — ${u.unit_title}` : u.unit_code} />
                ))}
              </datalist>
            )}
            {unitOptions.length > 0 && (
              <p className="mt-1 text-[10.5px] text-white/45">
                {unitOptions.length} units available — start typing to filter
              </p>
            )}
          </div>

          <div>
            <Label>Assessment type</Label>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ASSESSMENT_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setAssessmentType(t)}
                  className={cn(
                    'h-10 rounded-xl border text-[11.5px] font-medium tracking-tight transition-colors touch-manipulation capitalize',
                    assessmentType === t
                      ? 'bg-elec-yellow/[0.14] border-elec-yellow/40 text-elec-yellow'
                      : 'bg-[hsl(0_0%_12%)] border-white/[0.08] text-white/70 hover:bg-white/[0.04]'
                  )}
                >
                  {t.replace(/_/g, ' ')}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>Grade</Label>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {GRADES.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setGrade(g.value)}
                  className={cn(
                    'h-11 rounded-xl border text-[12.5px] font-semibold tracking-tight transition-colors touch-manipulation',
                    grade === g.value ? g.tone : 'bg-[hsl(0_0%_12%)] border-white/[0.08] text-white/70 hover:bg-white/[0.04]'
                  )}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Score (0–100)</Label>
              <input
                type="number"
                min={0}
                max={100}
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="Optional"
                className="mt-2 w-full h-11 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.08] focus:border-elec-yellow/40 text-[13px] text-white px-3 touch-manipulation"
              />
            </div>
            <div>
              <Label>Date</Label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-2 w-full h-11 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.08] focus:border-elec-yellow/40 text-[13px] text-white px-3 touch-manipulation"
              />
            </div>
          </div>

          <div>
            <Label>Feedback</Label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
              placeholder="What went well, what to improve…"
              className="mt-2 w-full rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.08] focus:border-elec-yellow/40 text-[13px] text-white p-3 leading-snug touch-manipulation"
            />
          </div>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">{children}</div>;
}
