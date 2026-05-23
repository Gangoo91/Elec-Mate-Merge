/**
 * SEOMockExam — public, SEO-friendly mock exam component.
 *
 * Differs from the in-app StandardMockExam: no auth dependency, simpler UI,
 * renders sample questions in the initial HTML so Googlebot indexes the
 * actual question content, and emits LearningResource + Quiz JSON-LD.
 *
 * Soft-gate philosophy: the full exam is free and unauthenticated; full
 * explanations show on submit; the sign-up CTA at the bottom is a nudge,
 * not a paywall. This maximises share-ability and dwell time (both SEO
 * positive) at the cost of some conversion friction.
 *
 * Takes any question array shaped { id, question, options, correctAnswer,
 * explanation? } — works across StandardMockQuestion, QuizQuestion, AM2Question,
 * Level 2/3 QuestionBank rows without adapters.
 */
import { useState, useMemo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Play,
  Award,
  BookOpen,
  AlertTriangle,
  Target,
  TrendingUp,
} from 'lucide-react';

export interface SEOMockExamQuestion {
  id: number | string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  topic?: string;
  section?: string;
  category?: string;
}

interface SEOMockExamProps {
  /** Page-level: shown in the LearningResource schema + above-the-fold heading. */
  examName: string;
  /** Short description for schema + the intro paragraph the user reads. */
  examDescription: string;
  /** The full question bank — must contain at least `questionsPerExam` entries. */
  questionBank: SEOMockExamQuestion[];
  /** How many questions the user gets per attempt. Default 25. */
  questionsPerExam?: number;
  /** Time limit per attempt (minutes). Default 30. */
  timeLimitMinutes?: number;
  /** Pass threshold (%). Default 70. */
  passThreshold?: number;
  /** Canonical URL — used in schema + share links. */
  canonicalUrl: string;
  /** Sign-up CTA target (e.g. /auth/signup?ref=mock-exam-first-aid). */
  signupCta?: { label: string; href: string; subline?: string };
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function SEOMockExam({
  examName,
  examDescription,
  questionBank,
  questionsPerExam = 25,
  timeLimitMinutes = 30,
  passThreshold = 70,
  canonicalUrl,
  signupCta,
}: SEOMockExamProps) {
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [questions, setQuestions] = useState<SEOMockExamQuestion[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(timeLimitMinutes * 60);
  const [attempt, setAttempt] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);

  // Stable sample of first 5 questions rendered server-side for SEO.
  // Picks deterministically so HTML is consistent across crawls.
  const sampleQuestions = useMemo(
    () => questionBank.slice(0, Math.min(5, questionBank.length)),
    [questionBank]
  );

  const start = useCallback(() => {
    const picked = shuffle(questionBank).slice(0, questionsPerExam);
    setQuestions(picked);
    setAnswers(new Array(picked.length).fill(null));
    setCurrent(0);
    setSecondsLeft(timeLimitMinutes * 60);
    setSubmitted(false);
    setStarted(true);
    setAttempt((n) => n + 1);
    setStartedAt(Date.now());
    setFinishedAt(null);
  }, [questionBank, questionsPerExam, timeLimitMinutes]);

  const submit = useCallback(() => {
    setSubmitted(true);
    setStarted(false);
    setFinishedAt(Date.now());
  }, []);

  // Timer
  useEffect(() => {
    if (!started || submitted) return;
    if (secondsLeft <= 0) {
      submit();
      return;
    }
    const t = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [started, submitted, secondsLeft, submit]);

  const correctCount = useMemo(
    () =>
      questions.reduce(
        (n, q, i) => (answers[i] !== null && answers[i] === q.correctAnswer ? n + 1 : n),
        0
      ),
    [questions, answers]
  );
  const percent = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
  const passed = percent >= passThreshold;

  // Per-category breakdown — group answered questions by `category` or `topic`,
  // count correct / total per group. Skip if neither field exists across the
  // exam (e.g. L2 module 1 uses a plain Question shape with no taxonomy).
  const categoryBreakdown = useMemo(() => {
    const bucketKey = (q: SEOMockExamQuestion) => q.category || q.topic || '';
    const buckets = new Map<string, { correct: number; total: number }>();
    let hasAny = false;
    questions.forEach((q, i) => {
      const k = bucketKey(q);
      if (!k) return;
      hasAny = true;
      const b = buckets.get(k) ?? { correct: 0, total: 0 };
      b.total += 1;
      if (answers[i] !== null && answers[i] === q.correctAnswer) b.correct += 1;
      buckets.set(k, b);
    });
    if (!hasAny) return [];
    return [...buckets.entries()]
      .map(([name, v]) => ({
        name,
        correct: v.correct,
        total: v.total,
        percent: Math.round((v.correct / v.total) * 100),
      }))
      .sort((a, b) => a.percent - b.percent);
  }, [questions, answers]);

  // Topics scored < 60% are flagged as "weak" — actionable feedback.
  const weakAreas = useMemo(
    () => categoryBreakdown.filter((c) => c.total >= 2 && c.percent < 60),
    [categoryBreakdown]
  );

  // Time taken (only meaningful after submit).
  const timeTakenSec = startedAt && finishedAt ? Math.round((finishedAt - startedAt) / 1000) : 0;
  const formatDuration = (s: number) => {
    const mm = Math.floor(s / 60);
    const ss = s % 60;
    return `${mm}m ${String(ss).padStart(2, '0')}s`;
  };

  // ----- JSON-LD: LearningResource + Quiz (rich snippet hints) -----
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: examName,
      description: examDescription,
      url: canonicalUrl,
      educationalLevel: 'professional',
      learningResourceType: 'Quiz',
      teaches: examName,
      isAccessibleForFree: true,
      inLanguage: 'en-GB',
      provider: {
        '@type': 'Organization',
        name: 'Elec-Mate',
        url: 'https://www.elec-mate.com',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Quiz',
      name: examName,
      about: examDescription,
      educationalAlignment: { '@type': 'AlignmentObject', alignmentType: 'assesses' },
      hasPart: sampleQuestions.map((q) => ({
        '@type': 'Question',
        name: q.question,
        suggestedAnswer: q.options.map((opt, i) => ({
          '@type': 'Answer',
          text: opt,
          ...(i === q.correctAnswer ? { acceptedAnswer: true } : {}),
        })),
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.options[q.correctAnswer],
          ...(q.explanation ? { encodingFormat: 'text/plain', text: q.explanation } : {}),
        },
      })),
    },
  ];

  return (
    <>
      <Helmet>
        {schemas.map((s, i) => (
          <script key={`seo-mock-schema-${i}`} type="application/ld+json">
            {JSON.stringify(s)}
          </script>
        ))}
      </Helmet>

      {/* PRE-START — intro + sample questions (visible to crawlers + first-time visitors). */}
      {!started && !submitted && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-gradient-to-br from-yellow-500/[0.08] to-transparent border border-yellow-500/20 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-yellow-400 mb-3">
              <BookOpen className="w-4 h-4" />
              Free mock exam
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">{examName}</h2>
            <p className="mt-3 text-white/80 leading-relaxed">{examDescription}</p>
            <ul className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-white/85">
              <li className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
                <div className="text-yellow-400 font-bold text-lg">{questionsPerExam}</div>
                <div className="text-white/65 text-xs uppercase tracking-wider">questions</div>
              </li>
              <li className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
                <div className="text-yellow-400 font-bold text-lg">{timeLimitMinutes} min</div>
                <div className="text-white/65 text-xs uppercase tracking-wider">time limit</div>
              </li>
              <li className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
                <div className="text-yellow-400 font-bold text-lg">{passThreshold}%</div>
                <div className="text-white/65 text-xs uppercase tracking-wider">to pass</div>
              </li>
              <li className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
                <div className="text-yellow-400 font-bold text-lg">{questionBank.length}</div>
                <div className="text-white/65 text-xs uppercase tracking-wider">question bank</div>
              </li>
            </ul>
            <button
              type="button"
              onClick={start}
              className="mt-6 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-base touch-manipulation transition-colors"
            >
              <Play className="w-5 h-5" />
              Start the mock exam
            </button>
            <p className="mt-3 text-white/55 text-xs">
              Free, no sign-up needed. Questions randomly selected on each attempt. Your answers
              stay in your browser.
            </p>
          </div>

          {/* SAMPLE QUESTIONS — visible to crawlers; gives Google real exam content to index. */}
          <section aria-labelledby="sample-q-heading">
            <h2
              id="sample-q-heading"
              className="text-xl sm:text-2xl font-bold text-white mb-4 mt-8"
            >
              Sample questions from this mock exam
            </h2>
            <p className="text-white/65 text-sm mb-6">
              Here are 5 example questions from the bank. The full mock exam picks{' '}
              {questionsPerExam} at random from {questionBank.length} questions each time you start.
            </p>
            <ol className="space-y-6">
              {sampleQuestions.map((q, idx) => (
                <li key={q.id} className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-yellow-400 mb-2">
                    Question {idx + 1}
                    {q.topic ? ` · ${q.topic}` : ''}
                  </div>
                  <p className="text-white font-semibold leading-relaxed">{q.question}</p>
                  <ul className="mt-3 space-y-2">
                    {q.options.map((opt, i) => (
                      <li
                        key={i}
                        className={`rounded-lg px-3 py-2 text-sm ${
                          i === q.correctAnswer
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-200'
                            : 'bg-white/[0.03] border border-white/[0.06] text-white/80'
                        }`}
                      >
                        <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                        {i === q.correctAnswer && (
                          <CheckCircle2 className="w-4 h-4 inline ml-2 text-emerald-300" />
                        )}
                      </li>
                    ))}
                  </ul>
                  {q.explanation && (
                    <p className="mt-3 text-sm text-white/70 italic">
                      <strong className="not-italic text-white/85">Why:</strong> {q.explanation}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </section>
        </div>
      )}

      {/* IN-EXAM */}
      {started && questions.length > 0 && (
        <div className="space-y-4">
          <div className="sticky top-2 z-10 rounded-xl bg-elec-dark/95 backdrop-blur border border-white/15 p-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="tabular-nums font-semibold">
                {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
              </span>
            </div>
            <div className="text-white/65 text-sm tabular-nums">
              Question {current + 1} of {questions.length}
            </div>
            <button
              type="button"
              onClick={submit}
              className="text-xs font-medium text-yellow-400 hover:text-yellow-300"
            >
              Submit early
            </button>
          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <p className="text-white font-semibold leading-relaxed">
              {questions[current].question}
            </p>
            <ul className="mt-4 space-y-2">
              {questions[current].options.map((opt, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => {
                      const a = [...answers];
                      a[current] = i;
                      setAnswers(a);
                    }}
                    className={`w-full text-left rounded-lg px-3 py-3 text-sm transition-colors touch-manipulation ${
                      answers[current] === i
                        ? 'bg-yellow-500/15 border border-yellow-500/40 text-white'
                        : 'bg-white/[0.03] border border-white/[0.06] text-white/85 hover:bg-white/[0.06]'
                    }`}
                  >
                    <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className="h-11 px-4 rounded-xl border border-white/15 text-white/85 hover:bg-white/[0.06] disabled:opacity-40 touch-manipulation"
            >
              ← Previous
            </button>
            {current < questions.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}
                className="h-11 px-5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation"
              >
                Next →
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                className="h-11 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold touch-manipulation"
              >
                Submit answers
              </button>
            )}
          </div>
        </div>
      )}

      {/* RESULTS */}
      {submitted && (
        <div className="space-y-6">
          <div
            className={`rounded-2xl border p-6 sm:p-8 ${
              passed
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-orange-500/10 border-orange-500/30'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              {passed ? (
                <Award className="w-8 h-8 text-emerald-400" />
              ) : (
                <RotateCcw className="w-8 h-8 text-orange-400" />
              )}
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {passed ? 'Pass' : 'Not yet'} — {percent}%
              </h2>
            </div>
            <p className="text-white/85 leading-relaxed">
              You got <strong>{correctCount}</strong> out of {questions.length} correct. Pass
              threshold for this exam is {passThreshold}%.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 sm:max-w-md">
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
                <div className="text-xl font-bold text-white tabular-nums">{percent}%</div>
                <div className="text-[10px] uppercase tracking-wider text-white/65">score</div>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
                <div className="text-xl font-bold text-white tabular-nums">
                  {correctCount}/{questions.length}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-white/65">correct</div>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
                <div className="text-xl font-bold text-white tabular-nums">
                  {formatDuration(timeTakenSec)}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-white/65">time</div>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={start}
                className="h-11 px-5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation"
              >
                <RotateCcw className="w-4 h-4 inline mr-2" />
                Try again with fresh questions
              </button>
              {signupCta && (
                <Link
                  to={signupCta.href}
                  className="h-11 px-5 rounded-xl border border-yellow-500/40 hover:bg-yellow-500/10 text-yellow-400 font-semibold inline-flex items-center touch-manipulation"
                >
                  {signupCta.label}
                </Link>
              )}
            </div>
            {signupCta?.subline && (
              <p className="mt-2 text-white/55 text-xs">{signupCta.subline}</p>
            )}
          </div>

          {/* Weak-areas callout — actionable feedback. Only shown if there are
              categories scored < 60% with at least 2 questions in the set. */}
          {weakAreas.length > 0 && (
            <div className="rounded-2xl bg-orange-500/[0.08] border border-orange-500/30 p-5 sm:p-6">
              <h3 className="text-white font-bold flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                Topics to revise before your next attempt
              </h3>
              <ul className="space-y-2">
                {weakAreas.map((c) => (
                  <li key={c.name} className="flex items-center justify-between gap-3">
                    <span className="text-white/85 text-sm">{c.name}</span>
                    <span className="text-orange-300 text-sm font-semibold tabular-nums">
                      {c.correct}/{c.total} · {c.percent}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Per-category breakdown — visible bar-chart style. Skipped only if
              question bank has neither `category` nor `topic` fields. */}
          {categoryBreakdown.length > 0 && (
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 sm:p-6">
              <h3 className="text-white font-bold flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-yellow-400" />
                Score by topic
              </h3>
              <ul className="space-y-3">
                {categoryBreakdown.map((c) => {
                  const tone =
                    c.percent >= passThreshold
                      ? 'bg-emerald-500'
                      : c.percent >= 50
                        ? 'bg-yellow-500'
                        : 'bg-orange-500';
                  return (
                    <li key={c.name}>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="text-white/85">{c.name}</span>
                        <span className="text-white/65 tabular-nums">
                          {c.correct}/{c.total} · {c.percent}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                        <div className={`h-full ${tone}`} style={{ width: `${c.percent}%` }} />
                      </div>
                    </li>
                  );
                })}
              </ul>
              {passed && (
                <p className="mt-4 text-emerald-300/85 text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Pass mark hit. Re-take for a different set of questions to confirm consistency.
                </p>
              )}
            </div>
          )}

          <section aria-labelledby="review-heading">
            <h2 id="review-heading" className="text-xl sm:text-2xl font-bold text-white mb-4">
              Review your answers
            </h2>
            <ol className="space-y-4">
              {questions.map((q, idx) => {
                const userAnswer = answers[idx];
                const isCorrect = userAnswer === q.correctAnswer;
                return (
                  <li
                    key={`${attempt}-${q.id}`}
                    className={`rounded-2xl border p-5 ${
                      userAnswer === null
                        ? 'bg-white/[0.04] border-white/10'
                        : isCorrect
                          ? 'bg-emerald-500/[0.06] border-emerald-500/20'
                          : 'bg-red-500/[0.06] border-red-500/20'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2">
                      <span className="text-white/55">Q{idx + 1}</span>
                      {userAnswer === null ? (
                        <span className="text-white/65">Skipped</span>
                      ) : isCorrect ? (
                        <span className="text-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Correct
                        </span>
                      ) : (
                        <span className="text-red-300 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" />
                          Incorrect
                        </span>
                      )}
                    </div>
                    <p className="text-white font-semibold leading-relaxed">{q.question}</p>
                    <ul className="mt-3 space-y-1.5 text-sm">
                      {q.options.map((opt, i) => {
                        const isUserPick = userAnswer === i;
                        const isCorrectOpt = i === q.correctAnswer;
                        return (
                          <li
                            key={i}
                            className={`rounded-lg px-3 py-2 ${
                              isCorrectOpt
                                ? 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/30'
                                : isUserPick
                                  ? 'bg-red-500/10 text-red-200 border border-red-500/30'
                                  : 'bg-white/[0.03] text-white/65 border border-white/[0.05]'
                            }`}
                          >
                            <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                            {opt}
                            {isCorrectOpt && (
                              <span className="ml-2 text-emerald-300 text-xs font-medium">
                                ← correct
                              </span>
                            )}
                            {isUserPick && !isCorrectOpt && (
                              <span className="ml-2 text-red-300 text-xs font-medium">
                                ← your answer
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                    {q.explanation && (
                      <p className="mt-3 text-sm text-white/70 italic">
                        <strong className="not-italic text-white/85">Why:</strong> {q.explanation}
                      </p>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        </div>
      )}
    </>
  );
}

export default SEOMockExam;
