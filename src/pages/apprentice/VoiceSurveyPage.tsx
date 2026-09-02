import { useState } from 'react';
import { motion } from 'framer-motion';
import useSEO from '@/hooks/useSEO';
import { useApprenticeVoiceSurvey, type SurveyQuestion } from '@/hooks/useApprenticeVoiceSurvey';
import { useToast } from '@/hooks/use-toast';
import { HubSubPage } from '@/components/hub/HubSubPage';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import {
  buttonPrimaryCn,
  chipBase,
  chipOff,
  chipOn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';

/* ==========================================================================
   VoiceSurveyPage — /apprentice/voice-survey
   ELE-936 (L1). Anonymous monthly check-in. The college never sees who
   said what — only an aggregate sentiment + theme rollup once at least
   5 learners have responded (k-anon at the RLS layer).
   ========================================================================== */

export default function VoiceSurveyPage() {
  useSEO({
    title: 'Your voice — Elec-Mate',
    description: 'Anonymous monthly feedback on your college experience.',
    noindex: true,
  });

  const { survey, alreadySubmitted, loading, submitting, error, submit } =
    useApprenticeVoiceSurvey();
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Record<string, string | number>>({});

  const setAnswer = (key: string, value: string | number) => {
    setAnswers((s) => ({ ...s, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!survey) return;
    const required = survey.questions.filter((q) => q.kind === 'scale_1_5');
    for (const q of required) {
      if (answers[q.key] === undefined || answers[q.key] === '') {
        toast({ title: 'Please answer every rating', variant: 'destructive' });
        return;
      }
    }
    try {
      await submit(answers);
      toast({
        title: 'Thanks for your feedback',
        description: 'Anonymous and aggregated — your college will see themes, not individuals.',
      });
      setAnswers({});
    } catch (e) {
      toast({
        title: 'Could not submit',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    }
  };

  return (
    <HubSubPage
      section="College"
      title="Your voice"
      backTo="/apprentice/college-plan"
      description="Anonymous monthly check-in. Your college reads themes and overall sentiment — they never see who said what, and results only show once five or more apprentices have answered."
    >
      <div className="mx-auto w-full max-w-3xl">
        {loading && <div className="mt-8 text-sm text-white">Loading…</div>}

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {!loading && !survey && (
          <div className="mt-8 rounded-2xl border border-dashed border-white/[0.14] px-5 py-8 text-center text-sm text-white">
            No active survey this month. Check back next month — or speak directly to your tutor if
            anything's on your mind.
          </div>
        )}

        {!loading && survey && alreadySubmitted && (
          <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-6 text-sm text-emerald-200">
            You've already submitted this month's check-in. Thank you — your input is part of the
            anonymised pool your college uses to improve.
          </div>
        )}

        {!loading && survey && !alreadySubmitted && (
          <motion.form
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              void handleSubmit();
            }}
          >
            {survey.questions.map((q) => (
              <QuestionBlock key={q.key} q={q} value={answers[q.key]} onChange={setAnswer} />
            ))}

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className={cn(buttonPrimaryCn, 'w-full sm:w-auto sm:px-8')}
              >
                {submitting ? 'Submitting…' : 'Submit anonymously'}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </HubSubPage>
  );
}

function QuestionBlock({
  q,
  value,
  onChange,
}: {
  q: SurveyQuestion;
  value: string | number | undefined;
  onChange: (key: string, value: string | number) => void;
}) {
  if (q.kind === 'scale_1_5') {
    return (
      <div className={cn('rounded-2xl border border-elec-yellow/35 p-5', CARD_SURFACE)}>
        <label className="text-sm font-medium text-white">{q.label}</label>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((n) => {
            const active = value === n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => onChange(q.key, n)}
                className={cn(chipBase, 'h-12 font-semibold', active ? chipOn : chipOff)}
              >
                {n}
              </button>
            );
          })}
        </div>
        <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-white">
          <span>Disagree</span>
          <span>Agree</span>
        </div>
      </div>
    );
  }
  if (q.kind === 'free_text') {
    return (
      <div className={cn('rounded-2xl border border-elec-yellow/35 p-5', CARD_SURFACE)}>
        <label className="text-sm font-medium text-white">{q.label}</label>
        <textarea
          rows={4}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(q.key, e.target.value)}
          placeholder="Optional — write as much or as little as you want."
          className={cn(textareaCn, 'mt-3 w-full resize-none')}
        />
      </div>
    );
  }
  if (q.kind === 'multi_choice') {
    return (
      <div className={cn('rounded-2xl border border-elec-yellow/35 p-5', CARD_SURFACE)}>
        <label className="text-sm font-medium text-white">{q.label}</label>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {(q.options ?? []).map((opt) => {
            const active = value === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(q.key, opt)}
                className={cn(
                  chipBase,
                  'min-h-11 h-auto px-3 py-2.5 text-left',
                  active ? chipOn : chipOff
                )}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
}
