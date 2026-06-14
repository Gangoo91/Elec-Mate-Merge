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
import type {
  EpaJudgement,
  EpaVerdict,
  EpaGrade,
  TutorJudgementInput,
  UseEpaReadiness,
} from '@/hooks/useEpaReadiness';

/* ==========================================================================
   TutorEpaJudgementSheet — record / update tutor verdict.
   When `cosignTarget` is provided it represents an AI judgement we are
   either co-signing or overriding; the form pre-fills from the AI verdict.
   ========================================================================== */

const VERDICTS: { value: EpaVerdict; label: string; tone: string }[] = [
  { value: 'ready', label: 'Ready', tone: 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200' },
  { value: 'almost', label: 'Almost', tone: 'bg-amber-500/15 border-amber-400/40 text-amber-200' },
  { value: 'not_yet', label: 'Not yet', tone: 'bg-orange-500/15 border-orange-400/40 text-orange-200' },
  { value: 'refer', label: 'Refer', tone: 'bg-red-500/15 border-red-400/40 text-red-200' },
];

const GRADES: { value: EpaGrade; label: string }[] = [
  { value: 'distinction', label: 'Distinction' },
  { value: 'merit', label: 'Merit' },
  { value: 'pass', label: 'Pass' },
  { value: 'fail', label: 'Fail' },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  hookActions: Pick<UseEpaReadiness, 'saveTutorJudgement' | 'cosignAi' | 'overrideAi'>;
  /** Existing tutor judgement to edit (creates new version) */
  existing?: EpaJudgement | null;
  /** AI judgement we are co-signing or overriding (mode = 'cosign' | 'override') */
  aiTarget?: EpaJudgement | null;
  mode?: 'create' | 'edit' | 'cosign' | 'override';
  onSaved?: () => void;
}

export function TutorEpaJudgementSheet({
  open,
  onOpenChange,
  studentName,
  hookActions,
  existing,
  aiTarget,
  mode = 'create',
  onSaved,
}: Props) {
  const { toast } = useToast();
  const [verdict, setVerdict] = useState<EpaVerdict>('almost');
  const [grade, setGrade] = useState<EpaGrade | null>(null);
  const [confidence, setConfidence] = useState(60);
  const [rationale, setRationale] = useState('');
  const [strengths, setStrengths] = useState('');
  const [blockers, setBlockers] = useState('');
  const [cosignReason, setCosignReason] = useState('');
  const [saving, setSaving] = useState(false);

  // Pre-fill when sheet opens
  useEffect(() => {
    if (!open) return;
    if (mode === 'edit' && existing) {
      setVerdict(existing.verdict);
      setGrade(existing.predicted_grade);
      setConfidence(existing.confidence ?? 60);
      setRationale(existing.rationale ?? '');
      setStrengths((existing.strengths ?? []).join('\n'));
      setBlockers((existing.blockers ?? []).join('\n'));
    } else if ((mode === 'cosign' || mode === 'override') && aiTarget) {
      setVerdict(aiTarget.verdict);
      setGrade(aiTarget.predicted_grade);
      setConfidence(aiTarget.confidence ?? 70);
      setRationale(aiTarget.rationale ?? '');
      setStrengths((aiTarget.strengths ?? []).join('\n'));
      setBlockers((aiTarget.blockers ?? []).join('\n'));
      setCosignReason('');
    } else {
      setVerdict('almost');
      setGrade(null);
      setConfidence(60);
      setRationale('');
      setStrengths('');
      setBlockers('');
      setCosignReason('');
    }
  }, [open, mode, existing, aiTarget]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload: TutorJudgementInput = {
        verdict,
        predicted_grade: grade,
        confidence,
        rationale: rationale.trim() || null,
        strengths: strengths
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        blockers: blockers
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
      };
      let result: EpaJudgement | null;
      if (mode === 'cosign' && aiTarget) {
        result = await hookActions.cosignAi(aiTarget.id, cosignReason || undefined);
      } else if (mode === 'override' && aiTarget) {
        result = await hookActions.overrideAi(aiTarget.id, {
          ...payload,
          cosign_rationale: cosignReason.trim() || 'Tutor overrides AI verdict.',
        });
      } else {
        result = await hookActions.saveTutorJudgement(payload);
      }
      if (!result) throw new Error('Could not save judgement');
      toast({
        title: 'Judgement saved',
        description: `Recorded ${verdict.replace('_', ' ')} verdict for ${studentName.split(' ')[0]}.`,
      });
      onSaved?.();
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Could not save',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const titleByMode: Record<NonNullable<Props['mode']>, string> = {
    create: `Tutor verdict — ${studentName.split(' ')[0]}`,
    edit: `Update verdict — ${studentName.split(' ')[0]}`,
    cosign: `Co-sign AI verdict — ${studentName.split(' ')[0]}`,
    override: `Override AI verdict — ${studentName.split(' ')[0]}`,
  };

  const descriptionByMode: Record<NonNullable<Props['mode']>, string> = {
    create: "Your professional judgement on this learner's EPA readiness — visible alongside the AI and learner verdicts.",
    edit: 'This will replace your previous current verdict; history is preserved.',
    cosign: 'Confirm you agree with the AI assessment. Locks the AI verdict as co-signed.',
    override: 'Disagree with the AI? Record your version with a reason; the AI verdict is preserved as historical.',
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent hideCloseButton
        side="bottom"
        className="h-[92vh] sm:max-w-2xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10"
      >
        <SheetShell
          eyebrow="EPA judgement"
          title={titleByMode[mode]}
          description={descriptionByMode[mode]}
          footer={
            <>
              <SecondaryButton onClick={() => onOpenChange(false)} disabled={saving} fullWidth>
                Cancel
              </SecondaryButton>
              <PrimaryButton onClick={handleSave} disabled={saving} fullWidth>
                <Check className="h-3.5 w-3.5 mr-1.5" strokeWidth={3} />
                {saving ? 'Saving…' : mode === 'cosign' ? 'Co-sign' : 'Save verdict'}
              </PrimaryButton>
            </>
          }
        >
          {/* Verdict pills */}
          <div>
            <Label>Verdict</Label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {VERDICTS.map((v) => (
                <button
                  key={v.value}
                  type="button"
                  onClick={() => setVerdict(v.value)}
                  className={cn(
                    'h-11 rounded-xl border text-[12.5px] font-semibold tracking-tight transition-colors touch-manipulation',
                    verdict === v.value
                      ? v.tone
                      : 'bg-[hsl(0_0%_12%)] border-white/[0.08] text-white/70 hover:bg-white/[0.04]'
                  )}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Predicted grade */}
          <div>
            <Label>Predicted grade</Label>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {GRADES.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setGrade(g.value === grade ? null : g.value)}
                  className={cn(
                    'h-10 rounded-xl border text-[11.5px] font-medium transition-colors touch-manipulation',
                    grade === g.value
                      ? 'bg-elec-yellow/[0.14] border-elec-yellow/40 text-elec-yellow'
                      : 'bg-[hsl(0_0%_12%)] border-white/[0.08] text-white/70 hover:bg-white/[0.04]'
                  )}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Confidence */}
          <div>
            <Label>
              Confidence <span className="ml-2 text-white/55 tabular-nums">{confidence}%</span>
            </Label>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={confidence}
              onChange={(e) => setConfidence(Number(e.target.value))}
              className="mt-2 w-full accent-elec-yellow"
            />
          </div>

          {/* Rationale */}
          <div>
            <Label>Rationale</Label>
            <textarea
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              rows={4}
              placeholder="What's driving this verdict — evidence base, what's strong, what's holding them back."
              className="mt-2 w-full rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.08] focus:border-elec-yellow/40 text-[13px] text-white p-3 leading-snug touch-manipulation"
            />
          </div>

          {/* Strengths */}
          <div>
            <Label>Strengths (one per line)</Label>
            <textarea
              value={strengths}
              onChange={(e) => setStrengths(e.target.value)}
              rows={3}
              placeholder={'Confident isolation procedure\nGood with continuity testing'}
              className="mt-2 w-full rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.08] focus:border-elec-yellow/40 text-[13px] text-white p-3 leading-snug touch-manipulation"
            />
          </div>

          {/* Blockers */}
          <div>
            <Label>Blockers (one per line)</Label>
            <textarea
              value={blockers}
              onChange={(e) => setBlockers(e.target.value)}
              rows={3}
              placeholder={'IR sequencing — last observation marked partial\nOTJ hours below 80%'}
              className="mt-2 w-full rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.08] focus:border-elec-yellow/40 text-[13px] text-white p-3 leading-snug touch-manipulation"
            />
          </div>

          {(mode === 'cosign' || mode === 'override') && (
            <div>
              <Label>{mode === 'cosign' ? 'Optional co-sign note' : 'Why are you overriding?'}</Label>
              <textarea
                value={cosignReason}
                onChange={(e) => setCosignReason(e.target.value)}
                rows={mode === 'cosign' ? 2 : 3}
                placeholder={
                  mode === 'cosign'
                    ? 'Optional — adds a note to the audit trail.'
                    : 'Required — your reasoning will be locked alongside the AI verdict for audit.'
                }
                className="mt-2 w-full rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.08] focus:border-elec-yellow/40 text-[13px] text-white p-3 leading-snug touch-manipulation"
              />
            </div>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">{children}</div>
  );
}
