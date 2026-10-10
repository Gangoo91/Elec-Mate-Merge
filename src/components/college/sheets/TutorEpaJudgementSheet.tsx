import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  chipOnQuiet as chipOn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
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

const VERDICTS: { value: EpaVerdict; label: string }[] = [
  { value: 'ready', label: 'Ready' },
  { value: 'almost', label: 'Almost' },
  { value: 'not_yet', label: 'Not yet' },
  { value: 'refer', label: 'Refer' },
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
  /** Pass/Merit/Distinction only exist on a graded route (ST0152). */
  showGrades?: boolean;
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
  showGrades = true,
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
          // The AI's actions come across unless the tutor rewrites them later.
          recommended_actions: aiTarget.recommended_actions ?? [],
          cosign_rationale: cosignReason.trim(),
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
    create: `Tutor verdict for ${studentName.split(' ')[0]}`,
    edit: `Update verdict for ${studentName.split(' ')[0]}`,
    cosign: `Co-sign AI verdict for ${studentName.split(' ')[0]}`,
    override: `Override AI verdict for ${studentName.split(' ')[0]}`,
  };

  const descriptionByMode: Record<NonNullable<Props['mode']>, string> = {
    create:
      "Your professional judgement on this learner's EPA readiness, shown alongside the AI and learner verdicts.",
    edit: 'This will replace your previous current verdict; history is preserved.',
    cosign: 'Confirm you agree with the AI assessment. Locks the AI verdict as co-signed.',
    override:
      'Disagree with the AI? Record your version with a reason; the AI verdict is preserved as historical.',
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="EPA judgement"
      title={titleByMode[mode]}
      description={descriptionByMode[mode]}
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-5 lg:grid-cols-2"
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
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || (mode === 'override' && !cosignReason.trim())}
            className={buttonPrimaryCn}
          >
            {saving ? 'Saving…' : mode === 'cosign' ? 'Co-sign' : 'Save verdict'}
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <p className={labelCn}>Verdict</p>
          <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {VERDICTS.map((v) => (
              <button
                key={v.value}
                type="button"
                onClick={() => setVerdict(v.value)}
                aria-pressed={verdict === v.value}
                className={cn(chipBase, verdict === v.value ? chipOn : chipOff)}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Predicted grade — only on a graded route */}
        {showGrades && (
          <div>
            <p className={labelCn}>Predicted grade</p>
            <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {GRADES.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setGrade(g.value === grade ? null : g.value)}
                  aria-pressed={grade === g.value}
                  className={cn(chipBase, grade === g.value ? chipOn : chipOff)}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className={labelCn} htmlFor="epa-judge-confidence">
            How sure you are <span className="ml-2 tabular-nums">{confidence}%</span>
          </label>
          <input
            id="epa-judge-confidence"
            type="range"
            min={0}
            max={100}
            step={5}
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
            className="mt-2 w-full accent-elec-yellow touch-manipulation"
          />
        </div>

        <div>
          <label className={labelCn} htmlFor="epa-judge-rationale">
            Rationale
          </label>
          <textarea
            id="epa-judge-rationale"
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
            rows={5}
            placeholder="What's driving this verdict: evidence base, what's strong, what's holding them back."
            className={textareaCn}
          />
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className={labelCn} htmlFor="epa-judge-strengths">
            Strengths (one per line)
          </label>
          <textarea
            id="epa-judge-strengths"
            value={strengths}
            onChange={(e) => setStrengths(e.target.value)}
            rows={4}
            placeholder={'Confident isolation procedure\nGood with continuity testing'}
            className={textareaCn}
          />
        </div>

        <div>
          <label className={labelCn} htmlFor="epa-judge-blockers">
            Blockers (one per line)
          </label>
          <textarea
            id="epa-judge-blockers"
            value={blockers}
            onChange={(e) => setBlockers(e.target.value)}
            rows={4}
            placeholder={'IR sequencing, last observation marked partial\nOTJ hours below 80%'}
            className={textareaCn}
          />
        </div>

        {(mode === 'cosign' || mode === 'override') && (
          <div>
            <label className={labelCn} htmlFor="epa-judge-reason">
              {mode === 'cosign' ? 'Co-sign note (optional)' : 'Why are you overriding?'}
            </label>
            <textarea
              id="epa-judge-reason"
              value={cosignReason}
              onChange={(e) => setCosignReason(e.target.value)}
              rows={mode === 'cosign' ? 2 : 3}
              placeholder={
                mode === 'cosign'
                  ? 'Optional. Adds a note to the audit trail.'
                  : 'Required. Your reasoning is kept alongside the AI verdict for audit.'
              }
              className={textareaCn}
            />
          </div>
        )}
      </div>
    </FormSheet>
  );
}
