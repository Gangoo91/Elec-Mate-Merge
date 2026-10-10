import { useState } from 'react';
import { motion } from 'framer-motion';
import useSEO from '@/hooks/useSEO';
import { useApprenticeVoiceSurvey, type SurveyQuestion } from '@/hooks/useApprenticeVoiceSurvey';
import { useToast } from '@/hooks/use-toast';
import { HubSubPage } from '@/components/hub/HubSubPage';
import { textareaCn } from '@/components/forms/fieldStyles';
import {
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  CollegeEmpty,
  CollegePageHeader,
} from '@/components/college/ui/CollegeUi';
import { cn } from '@/lib/utils';

/** A 1–5 rating: one joined row, the chosen figure white (10 Oct design language). */
const SEG_GROUP = 'flex w-full rounded-xl border border-white/[0.12] bg-white/[0.03] p-0.5';
const segCn = (on: boolean) =>
  cn(
    'inline-flex h-12 min-w-0 flex-1 items-center justify-center rounded-[10px] text-[15px] font-semibold tabular-nums transition-colors touch-manipulation',
    on ? 'bg-white text-black' : 'text-white hover:bg-white/[0.06] active:bg-white/[0.08]'
  );
/** An answer to pick from a list: a full-width row, white when chosen. */
const optionCn = (on: boolean) =>
  cn(
    'flex min-h-[48px] w-full items-center rounded-xl border px-4 py-2.5 text-left text-[14px] transition-colors touch-manipulation',
    on
      ? 'border-white bg-white font-semibold text-black'
      : 'border-white/[0.12] font-medium text-white hover:border-white/[0.3] active:bg-white/[0.06]'
  );

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
    <HubSubPage section="College" title="Your voice" backTo="/apprentice/college-plan">
      {/* The College masthead drops its title on a phone, so the page carries
          its own header (same as the other college screens). */}
      <CollegePageHeader
        eyebrow="Your college"
        title="Your voice"
        description="An anonymous monthly check-in. Your college reads themes and overall feeling, never who said what, and only once five or more apprentices have answered."
      />

      {loading && <p className="text-[14px] text-white">Loading…</p>}

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-400/40 px-4 py-3 text-[14px] text-red-300"
        >
          {error}
        </p>
      )}

      {!loading && !survey && (
        <CollegeEmpty
          title="No check-in this month"
          body="Check back next month. If something is on your mind now, speak to your tutor."
        />
      )}

      {!loading && survey && alreadySubmitted && (
        <div className={cn(COLLEGE_CARD, '!border-emerald-400/40')}>
          <p className="text-[15px] font-semibold text-emerald-300">Sent. Thank you.</p>
          <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-white">
            You've already answered this month's check-in. It is part of the anonymous pool your
            college uses to improve.
          </p>
        </div>
      )}

      {!loading && survey && !alreadySubmitted && (
        <motion.form
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit();
          }}
        >
          {/* Two columns on a wide screen: no narrow centred column. */}
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
            {survey.questions.map((q) => (
              <QuestionBlock key={q.key} q={q} value={answers[q.key]} onChange={setAnswer} />
            ))}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={cn(COLLEGE_BTN_PRIMARY, 'w-full text-[15px] sm:w-auto sm:px-8')}
          >
            {submitting ? 'Sending…' : 'Send anonymously'}
          </button>
        </motion.form>
      )}
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
      <fieldset className={cn(COLLEGE_CARD, 'flex flex-col')}>
        <legend className="sr-only">{q.label}</legend>
        <p aria-hidden className="text-[15px] font-semibold leading-snug text-white">
          {q.label}
        </p>
        <div className={cn(SEG_GROUP, 'mt-4')}>
          {[1, 2, 3, 4, 5].map((n) => {
            const active = value === n;
            return (
              <button
                key={n}
                type="button"
                aria-pressed={active}
                aria-label={`${n} of 5`}
                onClick={() => onChange(q.key, n)}
                className={segCn(active)}
              >
                {n}
              </button>
            );
          })}
        </div>
        <div className="mt-2 flex justify-between text-[12.5px] text-white">
          <span>Disagree</span>
          <span>Agree</span>
        </div>
      </fieldset>
    );
  }
  if (q.kind === 'free_text') {
    return (
      <div className={COLLEGE_CARD}>
        <label
          htmlFor={`voice-${q.key}`}
          className="text-[15px] font-semibold leading-snug text-white"
        >
          {q.label}
        </label>
        <textarea
          id={`voice-${q.key}`}
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
      <fieldset className={COLLEGE_CARD}>
        <legend className="sr-only">{q.label}</legend>
        <p aria-hidden className="text-[15px] font-semibold leading-snug text-white">
          {q.label}
        </p>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {(q.options ?? []).map((opt) => {
            const active = value === opt;
            return (
              <button
                key={opt}
                type="button"
                aria-pressed={active}
                onClick={() => onChange(q.key, opt)}
                className={optionCn(active)}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </fieldset>
    );
  }
  return null;
}
