import { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Check, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
} from '@/components/college/primitives';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { EpaJudgement } from '@/hooks/useEpaReadiness';

/* ==========================================================================
   RecordEpaOutcomeSheet — captures the actual EPA outcome for calibration.
   Stamps actual_outcome on EVERY current judgement for this learner so the
   AI's accuracy can later be computed across all sources.
   ========================================================================== */

const OUTCOMES: { value: NonNullable<EpaJudgement['actual_outcome']>; label: string; tone: string }[] = [
  { value: 'distinction', label: 'Distinction', tone: 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200' },
  { value: 'merit', label: 'Merit', tone: 'bg-amber-500/15 border-amber-400/40 text-amber-200' },
  { value: 'pass', label: 'Pass', tone: 'bg-blue-500/15 border-blue-400/40 text-blue-200' },
  { value: 'fail', label: 'Fail', tone: 'bg-red-500/15 border-red-400/40 text-red-200' },
  { value: 'referred', label: 'Referred', tone: 'bg-orange-500/15 border-orange-400/40 text-orange-200' },
  { value: 'withdrew', label: 'Withdrew', tone: 'bg-white/[0.05] border-white/[0.12] text-white/65' },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collegeStudentId: string;
  studentName: string;
  /** Current judgement rows so we can show what the AI / tutor predicted next to the actual */
  current: { learner: EpaJudgement | null; tutor: EpaJudgement | null; ai: EpaJudgement | null };
  onSaved?: () => void;
}

export function RecordEpaOutcomeSheet({
  open,
  onOpenChange,
  collegeStudentId,
  studentName,
  current,
  onSaved,
}: Props) {
  const { toast } = useToast();
  const [outcome, setOutcome] = useState<EpaJudgement['actual_outcome']>(null);
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  // Pre-fill if any judgement already has an outcome
  useEffect(() => {
    if (!open) return;
    const existing = [current.tutor, current.ai, current.learner].find((j) => j?.actual_outcome) ?? null;
    setOutcome(existing?.actual_outcome ?? null);
    setDate(
      existing?.actual_recorded_at?.slice(0, 10) ?? new Date().toISOString().slice(0, 10)
    );
    setNotes('');
  }, [open, current]);

  const handleSave = async () => {
    if (!outcome) return;
    setSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      const ids = [current.learner?.id, current.tutor?.id, current.ai?.id].filter(Boolean) as string[];
      if (ids.length === 0) throw new Error('No verdicts on file to seal');

      const { error } = await supabase
        .from('college_epa_judgements')
        .update({
          actual_outcome: outcome,
          actual_recorded_at: new Date(date).toISOString(),
          actual_recorded_by: user.id,
        })
        .in('id', ids);
      if (error) throw new Error(error.message || 'Could not record outcome');

      // Optional pastoral note for the timeline
      if (notes.trim()) {
        const { data: student } = await supabase
          .from('college_students')
          .select('college_id')
          .eq('id', collegeStudentId)
          .maybeSingle();
        if (student?.college_id) {
          await supabase.from('pastoral_notes').insert({
            student_id: collegeStudentId,
            college_id: student.college_id,
            author_id: user.id,
            kind: 'note',
            visibility: 'tutors',
            title: `EPA outcome: ${outcome}`,
            body: notes.trim(),
          });
        }
      }

      toast({
        title: 'EPA outcome recorded',
        description: `${studentName.split(' ')[0]} graded ${outcome}. Sealed across ${ids.length} verdict${ids.length === 1 ? '' : 's'}.`,
      });
      onSaved?.();
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Could not record outcome',
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
        className="h-[88vh] sm:max-w-2xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10"
      >
        <SheetShell
          eyebrow="Calibration capture"
          title={`Record EPA outcome — ${studentName.split(' ')[0]}`}
          description="Once the actual EPA has been graded, capture the outcome here. We seal it onto every current verdict so the AI's track record can be measured over time."
          footer={
            <>
              <SecondaryButton onClick={() => onOpenChange(false)} disabled={saving} fullWidth>
                Cancel
              </SecondaryButton>
              <PrimaryButton onClick={handleSave} disabled={saving || !outcome} fullWidth>
                <Check className="h-3.5 w-3.5 mr-1.5" strokeWidth={3} />
                {saving ? 'Saving…' : 'Record outcome'}
              </PrimaryButton>
            </>
          }
        >
          {/* What was predicted vs actual preview */}
          <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-4">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mb-2 inline-flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-elec-yellow" />
              On the record
            </div>
            <ul className="space-y-1.5 text-[12px]">
              <PredictionRow label="Learner self-assessed" judgement={current.learner} />
              <PredictionRow label="Tutor predicted" judgement={current.tutor} />
              <PredictionRow label="AI predicted" judgement={current.ai} />
            </ul>
          </div>

          <div>
            <Label>Actual outcome</Label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {OUTCOMES.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setOutcome(o.value)}
                  className={cn(
                    'h-11 rounded-xl border text-[12.5px] font-semibold tracking-tight transition-colors touch-manipulation',
                    outcome === o.value
                      ? o.tone
                      : 'bg-[hsl(0_0%_12%)] border-white/[0.08] text-white/70 hover:bg-white/[0.04]'
                  )}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>Date EPA completed</Label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 w-full h-11 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.08] focus:border-elec-yellow/40 text-[13px] text-white px-3 touch-manipulation"
            />
          </div>

          <div>
            <Label>Notes (optional)</Label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Anything notable from the assessment — feedback, surprises, areas for cohort review."
              className="mt-2 w-full rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.08] focus:border-elec-yellow/40 text-[13px] text-white p-3 leading-snug touch-manipulation"
            />
            <p className="mt-1 text-[10.5px] text-white/45">
              Saved as a tutor-visible pastoral note alongside the calibration record.
            </p>
          </div>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

function PredictionRow({ label, judgement }: { label: string; judgement: EpaJudgement | null }) {
  return (
    <li className="flex items-center justify-between gap-3">
      <span className="text-white/65">{label}</span>
      <span className="text-white capitalize tabular-nums">
        {judgement?.predicted_grade ?? '—'}
        {judgement?.confidence != null && (
          <span className="ml-1.5 text-[10.5px] text-white/45">({judgement.confidence}%)</span>
        )}
      </span>
    </li>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">{children}</div>
  );
}
