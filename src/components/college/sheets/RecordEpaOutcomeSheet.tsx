import { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Check, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SheetShell, PrimaryButton, SecondaryButton } from '@/components/college/primitives';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { EpaJudgement } from '@/hooks/useEpaReadiness';

/* ==========================================================================
   RecordEpaOutcomeSheet — captures the actual EPA outcome.
   Stamps actual_outcome on every current judgement for this learner (so the
   AI's accuracy can be measured), AND writes it to college_epa — the record
   Reports, the pass-rate roll-up (Ofsted source data) and the EPA tracker
   read. Before 6 Oct 2026 it only did the first, so an outcome recorded here
   never reached a report. The EPA date goes in its own field
   (actual_epa_date / college_epa.epa_date); actual_recorded_at is when it
   was recorded.
   ========================================================================== */

type Outcome = NonNullable<EpaJudgement['actual_outcome']>;

const OUTCOMES: { value: Outcome; label: string }[] = [
  { value: 'distinction', label: 'Distinction' },
  { value: 'merit', label: 'Merit' },
  { value: 'pass', label: 'Pass' },
  { value: 'fail', label: 'Fail' },
  { value: 'referred', label: 'Referred' },
  { value: 'withdrew', label: 'Withdrew' },
];

/** college_epa.result as the tracker and reports read it (lower-cased there). */
const RESULT_FOR: Partial<Record<Outcome, string>> = {
  distinction: 'Distinction',
  merit: 'Merit',
  pass: 'Pass',
  fail: 'Fail',
  referred: 'Fail',
};

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
    const existing =
      [current.tutor, current.ai, current.learner].find((j) => j?.actual_outcome) ?? null;
    setOutcome(existing?.actual_outcome ?? null);
    setDate(
      (existing as (EpaJudgement & { actual_epa_date?: string | null }) | null)?.actual_epa_date ??
        existing?.actual_recorded_at?.slice(0, 10) ??
        new Date().toISOString().slice(0, 10)
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

      const ids = [current.learner?.id, current.tutor?.id, current.ai?.id].filter(
        Boolean
      ) as string[];

      if (ids.length > 0) {
        const base = {
          actual_outcome: outcome,
          actual_recorded_at: new Date().toISOString(),
          actual_recorded_by: user.id,
        };
        let { error } = await supabase
          .from('college_epa_judgements')
          .update({ ...base, actual_epa_date: date } as never)
          .in('id', ids);
        // actual_epa_date arrives with migration 20261006190000; until it's
        // applied, save without it (the date still lands on college_epa).
        if (error && /actual_epa_date/.test(error.message ?? '')) {
          ({ error } = await supabase.from('college_epa_judgements').update(base).in('id', ids));
        }
        if (error) throw new Error(error.message || 'Could not record outcome');
      }

      // The EPA record reports read. A withdrawal isn't a result.
      const result = RESULT_FOR[outcome];
      if (result) {
        const { data: existing, error: readErr } = await supabase
          .from('college_epa')
          .select('id')
          .eq('student_id', collegeStudentId)
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        if (readErr) throw new Error(readErr.message);
        const row = {
          status: 'Complete',
          result,
          epa_date: date,
          updated_by: user.id,
          updated_at: new Date().toISOString(),
        };
        const { error: epaErr } = existing
          ? await supabase
              .from('college_epa')
              .update(row)
              .eq('id', (existing as { id: string }).id)
          : await supabase.from('college_epa').insert({ ...row, student_id: collegeStudentId });
        if (epaErr)
          throw new Error(`Saved on the verdicts, but not the EPA record: ${epaErr.message}`);
      }

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
        description: `${studentName.split(' ')[0]}: ${OUTCOMES.find((o) => o.value === outcome)?.label ?? outcome}. Saved to the EPA record${ids.length ? ` and ${ids.length} verdict${ids.length === 1 ? '' : 's'}` : ''}.`,
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
      <SheetContent
        hideCloseButton
        side="bottom"
        className="h-[85vh] sm:max-w-2xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10"
      >
        <SheetShell
          eyebrow="EPA outcome"
          title={`Record EPA outcome — ${studentName.split(' ')[0]}`}
          description="Once the EPA has been graded, record the result. It goes on the learner's EPA record (Reports read this) and on every current verdict, so predictions can be checked against what happened."
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
          <div className="rounded-2xl border border-white/[0.12] bg-[hsl(0_0%_12%)] px-5 py-4">
            <div className="text-[12px] font-medium text-white mb-2 inline-flex items-center gap-1.5">
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
                  aria-pressed={outcome === o.value}
                  className={cn(
                    'h-11 rounded-xl border text-[13px] tracking-tight touch-manipulation',
                    outcome === o.value
                      ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                      : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
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
              className="mt-2 w-full h-11 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base text-white caret-elec-yellow focus:border-elec-yellow focus:outline-none [color-scheme:dark] touch-manipulation"
            />
          </div>

          <div>
            <Label>Notes (optional)</Label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Anything notable from the assessment — feedback, surprises, areas for cohort review."
              className="mt-2 w-full rounded-xl border border-white/[0.15] bg-[hsl(0_0%_12%)] p-3 text-base leading-snug text-white caret-elec-yellow focus:border-elec-yellow focus:outline-none touch-manipulation"
            />
            <p className="mt-1 text-[12px] text-white">
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
      <span className="text-white">{label}</span>
      <span className="text-white capitalize tabular-nums">
        {judgement?.predicted_grade ?? '—'}
        {judgement?.confidence != null && (
          <span className="ml-1.5 text-[12px] text-white">({judgement.confidence}% sure)</span>
        )}
      </span>
    </li>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[12px] font-medium text-white">{children}</div>;
}
