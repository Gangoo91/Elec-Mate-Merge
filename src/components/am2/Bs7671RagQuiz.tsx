/**
 * Bs7671RagQuiz — the BS 7671 spot check.
 *
 * Rebuilt 5 Oct 2026 as a navigation tool, not a memory test. The AM2
 * knowledge paper is open book, so the skill worth practising is knowing
 * WHERE in BS 7671 a requirement lives. Every option now carries its section
 * title from the printed book (bs7671Sections), so "411 · Protective
 * measure: automatic disconnection of supply" can be reasoned to; the old
 * four bare numbers could only be remembered.
 *
 *   Setup    focus (all / Part 4 / 5 / 6 / 7) and length (8 or 15)
 *   Question the requirement (reg numbers redacted) → pick a regulation →
 *            say how sure you are → see the regulation's own text, where it
 *            sits in the book, and the facet it came from
 *   Results  score, the confidence split, every question with its answer,
 *            and a route into the drill for the ones you missed
 *
 * Keyboard: 1–4 answer, then 1–3 for how sure, Enter for next.
 *
 * Questions come from bs7671QuizPool: real BS 7671 regs only, a facet that
 * matches its regulation's printed text, distractors from the same Part but
 * different sections. Each answer is recorded for the adaptive drill.
 */
import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { CARD_BASE, CARD_NEUTRAL, CARD_PRIMARY, CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubKpi, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { motion } from 'framer-motion';
import { containerVariants } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useRegAttempts } from '@/hooks/am2/useRegAttempts';
import { type Confidence } from './confidence';
import { RegQuestionScreen, RegResultsScreen, type RegQuestionData } from './RegQuestion';
import {
  buildRegOptions,
  chooseCandidates,
  loadRealRegs,
  pickFacets,
  redactRegNumbers,
  sectionOf,
  tidyRegText,
} from './bs7671QuizPool';

type RagQuestion = RegQuestionData;

type Focus = 'all' | 4 | 5 | 6 | 7;

interface Bs7671RagQuizProps {
  onExit?: () => void;
  onSessionComplete?: () => void;
}

export function Bs7671RagQuiz({ onExit, onSessionComplete }: Bs7671RagQuizProps) {
  const { user } = useAuth();
  const { recordAttempt } = useRegAttempts();

  const [phase, setPhase] = useState<'setup' | 'loading' | 'quiz' | 'results' | 'error'>('setup');
  const [focus, setFocus] = useState<Focus>('all');
  const [count, setCount] = useState(8);
  const [questions, setQuestions] = useState<RagQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [confidences, setConfidences] = useState<Record<number, Confidence>>({});
  const [startedAt, setStartedAt] = useState(Date.now());
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setPhase('loading');
    setError(null);
    try {
      const [regs, recent] = await Promise.all([
        loadRealRegs(),
        user?.id
          ? supabase
              .from('am2_reg_attempts')
              .select('regulation_id')
              .eq('user_id', user.id)
              .gte('last_asked_at', new Date(Date.now() - 3 * 86400000).toISOString())
              .limit(300)
          : Promise.resolve({ data: [] as Array<{ regulation_id: string }> }),
      ]);
      const pool = focus === 'all' ? regs : regs.filter((r) => r.part_number === focus);
      if (pool.length === 0) throw new Error('No regulations available for that focus yet.');
      const avoid = new Set(
        ((recent.data ?? []) as Array<{ regulation_id: string }>).map((r) => r.regulation_id)
      );
      const candidates = chooseCandidates(pool, count * 3, avoid);
      const facetByReg = await pickFacets(candidates);

      const picked: Array<Omit<RagQuestion, 'regText'>> = [];
      const usedSections = new Set<string>();
      for (const reg of candidates) {
        if (picked.length >= count) break;
        const f = facetByReg.get(reg.id);
        if (!f) continue;
        const section = sectionOf(reg.reg_number);
        // One per section where we can; a single-Part focus has fewer sections.
        if (usedSections.has(section) && focus === 'all') continue;
        const options = buildRegOptions(reg, regs);
        if (options.length < 4) continue;
        usedSections.add(section);
        picked.push({
          key: f.id,
          prompt: redactRegNumbers(f.content, reg.reg_number),
          correctReg: reg,
          options,
        });
      }
      if (picked.length === 0) throw new Error('Could not build questions — try again.');

      const { data: texts } = await supabase
        .from('bs7671_regulations')
        .select('id, full_text')
        .in(
          'id',
          picked.map((q) => q.correctReg.id)
        );
      const textById = new Map(
        ((texts ?? []) as Array<{ id: string; full_text: string | null }>).map((r) => [
          r.id,
          r.full_text,
        ])
      );

      setQuestions(
        picked.map((q) => ({
          ...q,
          regText: tidyRegText(textById.get(q.correctReg.id) ?? null, q.correctReg.reg_number),
        }))
      );
      setIndex(0);
      setAnswers({});
      setConfidences({});
      setStartedAt(Date.now());
      setPhase('quiz');
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setPhase('error');
    }
  }, [user?.id, focus, count]);

  const q = questions[index];

  const pickAnswer = useCallback(
    (optionId: string) => {
      if (answers[index] != null) return;
      setAnswers((a) => ({ ...a, [index]: optionId }));
    },
    [answers, index]
  );

  const pickConfidence = useCallback(
    (c: Confidence) => {
      if (!q || answers[index] == null || confidences[index] != null) return;
      setConfidences((prev) => ({ ...prev, [index]: c }));
      void recordAttempt({
        regulationId: q.correctReg.id,
        regNumber: q.correctReg.reg_number,
        correct: answers[index] === q.correctReg.id,
        confidence: c,
      });
    },
    [q, answers, confidences, index, recordAttempt]
  );

  const next = useCallback(() => {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      return;
    }
    // Not saved as the knowledge score: a short drill isn't the 30-question paper,
    // and a best-ever from one would tell the AI coach you're readier than you are.
    setPhase('results');
    onSessionComplete?.();
  }, [index, questions, onSessionComplete]);

  /* ─── Setup ─────────────────────────────────────────────────── */

  if (phase === 'setup') {
    return (
      <SpotCheckSetup
        focus={focus}
        count={count}
        onFocus={setFocus}
        onCount={setCount}
        onStart={() => void load()}
      />
    );
  }

  /* ─── Loading / error ───────────────────────────────────────── */

  if (phase === 'loading') {
    return (
      <div className="flex min-h-[50vh] items-center justify-center gap-3">
        <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
        <span className="text-[14px] text-white">Picking regulations from BS 7671…</span>
      </div>
    );
  }

  if (phase === 'error') {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center gap-4 text-center">
        <p className="text-[15px] font-semibold text-white">Couldn't load questions</p>
        <p className="text-[13px] text-white">{error}</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void load()}
            className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-elec-yellow px-5 text-[14px] font-semibold text-black touch-manipulation"
          >
            <RefreshCw className="h-4 w-4" /> Try again
          </button>
          <button
            type="button"
            onClick={() => setPhase('setup')}
            className="h-11 rounded-xl border border-white/[0.16] px-5 text-[14px] text-white touch-manipulation"
          >
            Change focus
          </button>
        </div>
      </div>
    );
  }

  /* ─── Results ───────────────────────────────────────────────── */

  if (phase === 'results') {
    const missed = questions.filter((qq, i) => answers[i] !== qq.correctReg.id).length;
    return (
      <RegResultsScreen
        title="BS 7671 spot check"
        questions={questions}
        answers={answers}
        confidences={confidences}
        seconds={Math.round((Date.now() - startedAt) / 1000)}
        onAgain={() => void load()}
        onExit={onExit}
        footnote={
          missed > 0
            ? `The ${missed} you missed are now in your drill, so they'll come round again.`
            : undefined
        }
      />
    );
  }

  /* ─── Question ──────────────────────────────────────────────── */

  if (!q) return null;
  return (
    <RegQuestionScreen
      questions={questions}
      index={index}
      answers={answers}
      confidences={confidences}
      onAnswer={pickAnswer}
      onConfidence={pickConfidence}
      onNext={next}
      onExit={onExit}
    />
  );
}

/* ─── Setup screen ──────────────────────────────────────────── */

interface AttemptRow {
  reg_number: string;
  last_correct: boolean;
  last_confidence: Confidence | null;
  next_review_at: string;
}

/** The apprentice's own record from am2_reg_attempts — what they've tried,
 *  how it went, and what's waiting in the drill. */
function useSpotCheckRecord() {
  const { user } = useAuth();
  const [rows, setRows] = useState<AttemptRow[] | null>(null);
  useEffect(() => {
    if (!user?.id) {
      setRows([]);
      return;
    }
    void supabase
      .from('am2_reg_attempts')
      .select('reg_number, last_correct, last_confidence, next_review_at')
      .eq('user_id', user.id)
      .limit(1000)
      .then(({ data }) => setRows((data ?? []) as AttemptRow[]));
  }, [user?.id]);
  return rows;
}

const PART_FOCUS: Array<{ id: Focus; title: string; blurb: string }> = [
  { id: 'all', title: 'Everything', blurb: 'Across the book, weighted to Parts 4–6' },
  { id: 4, title: 'Part 4', blurb: 'Protection for safety' },
  { id: 5, title: 'Part 5', blurb: 'Selection and erection' },
  { id: 6, title: 'Part 6', blurb: 'Inspection and testing' },
  { id: 7, title: 'Part 7', blurb: 'Special installations or locations' },
];

function SpotCheckSetup({
  focus,
  count,
  onFocus,
  onCount,
  onStart,
}: {
  focus: Focus;
  count: number;
  onFocus: (f: Focus) => void;
  onCount: (n: number) => void;
  onStart: () => void;
}) {
  const rows = useSpotCheckRecord();
  const tried = rows?.length ?? 0;
  const right = rows?.filter((r) => r.last_correct).length ?? 0;
  const overconfident =
    rows?.filter((r) => !r.last_correct && r.last_confidence === 'certain').length ?? 0;
  const inDrill =
    rows?.filter(
      (r) =>
        !r.last_correct ||
        r.last_confidence === 'guess' ||
        new Date(r.next_review_at).getTime() <= Date.now()
    ).length ?? 0;
  const partStats = (part: Focus) => {
    if (!rows || part === 'all') return null;
    const mine = rows.filter((r) => r.reg_number.startsWith(String(part)));
    if (!mine.length) return null;
    return Math.round((mine.filter((r) => r.last_correct).length / mine.length) * 100);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full max-w-[1300px] space-y-8 py-3 sm:space-y-10 sm:py-5"
    >
      {/* Header + record */}
      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-10">
        <div>
          <p className="text-[12px] font-semibold text-white">Revision · Section E</p>
          <h1 className="mt-1 text-[30px] font-bold leading-tight tracking-tight text-white lg:text-[38px]">
            BS 7671 spot check
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white">
            Find your way round the regulations the way you will on the day — the knowledge paper is
            open book. Read a requirement, work out which regulation it comes from, and see the
            book&apos;s own wording.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
          <HubKpi
            accent
            label="Regulations tried"
            value={rows ? String(tried) : '—'}
            verdict={tried ? `${Math.round((right / tried) * 100)}% right last time` : 'None yet'}
          />
          <HubKpi
            label="Waiting in your drill"
            value={rows ? String(inDrill) : '—'}
            verdict={
              overconfident ? `${overconfident} wrong while certain` : 'Nothing risky flagged'
            }
            sentiment={overconfident ? 'bad' : 'neutral'}
          />
        </div>
      </div>

      {/* Focus */}
      <section className="space-y-3">
        <HubSectionHeading>What to practise</HubSectionHeading>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-5">
          {PART_FOCUS.map((p) => {
            const selected = focus === p.id;
            const acc = partStats(p.id);
            return (
              <button
                key={String(p.id)}
                type="button"
                onClick={() => onFocus(p.id)}
                aria-pressed={selected}
                className={cn(
                  CARD_BASE,
                  selected ? CARD_PRIMARY : CARD_NEUTRAL,
                  'min-h-[112px] p-4',
                  p.id === 'all' && 'col-span-2 lg:col-span-1'
                )}
              >
                <span
                  className={cn(
                    'text-[17px] font-bold leading-tight',
                    selected ? 'text-black' : 'text-white'
                  )}
                >
                  {p.title}
                </span>
                <span
                  className={cn(
                    'mt-1 text-[12.5px] leading-snug',
                    selected ? 'text-black' : 'text-white'
                  )}
                >
                  {p.blurb}
                </span>
                <span
                  className={cn(
                    'mt-auto pt-3 text-[12px] font-semibold',
                    selected ? 'text-black' : acc == null ? 'text-white' : 'text-white'
                  )}
                >
                  {acc == null
                    ? p.id === 'all'
                      ? 'Recommended'
                      : 'Not tried yet'
                    : `${acc}% right so far`}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Length + start */}
      <section className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-start lg:gap-10">
        <div className="space-y-3">
          <HubSectionHeading>How long</HubSectionHeading>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { n: 8, t: 'About 5 minutes' },
              { n: 15, t: 'About 10 minutes' },
            ].map((o) => {
              const selected = count === o.n;
              return (
                <button
                  key={o.n}
                  type="button"
                  onClick={() => onCount(o.n)}
                  aria-pressed={selected}
                  className={cn(CARD_BASE, selected ? CARD_PRIMARY : CARD_NEUTRAL, 'p-4')}
                >
                  <span
                    className={cn(
                      'text-[20px] font-bold leading-none',
                      selected ? 'text-black' : 'text-white'
                    )}
                  >
                    {o.n} questions
                  </span>
                  <span
                    className={cn('mt-1.5 text-[12.5px]', selected ? 'text-black' : 'text-white')}
                  >
                    {o.t}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="space-y-3">
          <HubSectionHeading>How it works</HubSectionHeading>
          <ol className="grid gap-2.5 sm:grid-cols-3">
            {[
              ['Read', 'A requirement from BS 7671, with its regulation number hidden.'],
              [
                'Pick',
                'Which regulation it is — each option shows its section — and how sure you are.',
              ],
              ['Learn', "The regulation's own wording and where it sits in the book."],
            ].map(([t, d], i) => (
              // Information, not a control — no press or hover state.
              <li
                key={t}
                className={cn(
                  'flex flex-col rounded-2xl border border-white/[0.14] p-4',
                  CARD_SURFACE
                )}
              >
                <span className="flex items-center gap-2 text-[14px] font-semibold text-white">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-elec-yellow text-[12px] font-bold text-black">
                    {i + 1}
                  </span>
                  {t}
                </span>
                <span className="mt-1.5 text-[12.5px] leading-snug text-white">{d}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onStart}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-elec-yellow px-10 text-[16px] font-bold text-black shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] touch-manipulation active:scale-[0.98]"
        >
          Start {count} questions
          <ArrowRight className="h-5 w-5" />
        </button>
        <p className="text-[12.5px] text-white">
          On a keyboard: 1–4 to answer, 1–3 for how sure, Enter for the next one.
        </p>
      </div>
    </motion.div>
  );
}

export default Bs7671RagQuiz;
