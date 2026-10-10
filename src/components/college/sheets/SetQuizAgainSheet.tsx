import { useEffect, useMemo, useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  labelCn,
} from '@/components/forms/fieldStyles';
import { choiceCn } from '@/components/college/teaching/TeachingKit';
import { useTutorTargets } from '@/hooks/useTutorTargets';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   SetQuizAgainSheet (ELE-1895) — "Set this quiz again": copy a quiz, with all
   its questions, to a cohort with a new due date. reissue_tutor_quiz() does
   the copy server-side and publishes it; the publish trigger pushes every
   learner in the cohort with a link straight to the quiz.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quizId: string;
  quizTitle: string;
  /** The cohort the quiz was set to first, preselected. */
  cohortId: string | null;
  /** Set to named learners rather than a cohort: offer "the same learners". */
  hasNamedLearners: boolean;
  onDone?: (newQuizId: string) => void;
}

function londonToday(offsetDays = 0): string {
  const d = new Date(Date.now() + offsetDays * 86_400_000);
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(d);
}

export function SetQuizAgainSheet({
  open,
  onOpenChange,
  quizId,
  quizTitle,
  cohortId,
  hasNamedLearners,
  onDone,
}: Props) {
  const { toast } = useToast();
  const { cohorts, loading } = useTutorTargets();
  const SAME = '__same__';
  const [target, setTarget] = useState<string | null>(cohortId ?? (hasNamedLearners ? SAME : null));
  const [due, setDue] = useState<string>(londonToday(7));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setTarget(cohortId ?? (hasNamedLearners ? SAME : null));
      setDue(londonToday(7));
    }
  }, [open, cohortId, hasNamedLearners]);

  const chosen = useMemo(() => cohorts.find((c) => c.id === target) ?? null, [cohorts, target]);
  const today = londonToday(0);
  const dueOk = !due || due >= today;
  const canSave = !!target && dueOk && !saving;

  const handleSave = async () => {
    if (!canSave) return;
    setSaving(true);
    try {
      const { data, error } = await supabase.rpc(
        'reissue_tutor_quiz' as never,
        {
          p_quiz_id: quizId,
          p_cohort_id: target === SAME ? null : target,
          p_due_date: due || null,
        } as never
      );
      if (error) throw new Error(error.message);
      const newId = data as unknown as string;
      toast({
        title: 'Quiz set again',
        description: chosen
          ? `${chosen.name} has it now${due ? `, due ${new Date(due).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}` : ''}. Each learner gets a notification.`
          : 'The same learners have it now. Each gets a notification.',
      });
      onOpenChange(false);
      onDone?.(newId);
    } catch (e) {
      toast({
        title: 'Could not set it again',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Set this quiz again"
      title={quizTitle}
      description="A fresh copy with the same questions goes to the group you pick. Earlier attempts stay on the original."
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-2"
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
            Cancel
          </button>
          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={!canSave}
            className={buttonPrimaryCn}
          >
            {saving ? 'Setting…' : 'Set it and notify'}
          </button>
        </div>
      }
    >
      <section className="space-y-3">
        <h3 className="text-[15px] font-semibold tracking-tight text-white">Who gets it</h3>
        {loading ? (
          <p className="text-[13px] text-white">Loading your cohorts…</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {hasNamedLearners && !cohortId && (
              <button
                type="button"
                onClick={() => setTarget(SAME)}
                className={choiceCn(target === SAME)}
              >
                The same learners
              </button>
            )}
            {cohorts.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setTarget(c.id)}
                className={choiceCn(target === c.id)}
              >
                {c.name} · {c.member_count}
              </button>
            ))}
            {cohorts.length === 0 && !hasNamedLearners && (
              <p className="text-[13px] text-white">No cohorts in your college yet.</p>
            )}
          </div>
        )}
        <p className="text-[12.5px] text-white">
          {chosen
            ? `Every active learner in ${chosen.name} sees it on their college page and gets a notification.`
            : target === SAME
              ? 'The learners it was set to before see it again and get a notification.'
              : 'Pick a cohort.'}
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-[15px] font-semibold tracking-tight text-white">When it is due</h3>
        <div>
          <label htmlFor="sqa-due" className={labelCn}>
            Due date
          </label>
          <input
            id="sqa-due"
            type="date"
            min={today}
            value={due}
            onChange={(e) => setDue(e.target.value)}
            className={inputCn}
          />
        </div>
        <p className="text-[12.5px] text-white">
          {dueOk
            ? 'Learners see it as overdue after this date. Leave it blank for no deadline.'
            : 'Pick today or a later date.'}
        </p>
      </section>
    </FormSheet>
  );
}
