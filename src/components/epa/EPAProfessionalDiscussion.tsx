/**
 * EPAProfessionalDiscussion
 *
 * Editorial-style EPA mock professional discussion. Questions are grounded
 * in the apprentice's actual portfolio entries; each question surfaces the
 * portfolio context it came from, plus the LO/AC it's testing. Responses
 * are scored against EPA grade descriptors with strengths and areas to
 * improve called out.
 */

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Loader2,
  ChevronDown,
  Send,
  CheckCircle2,
  RotateCcw,
  Mic,
  MicOff,
} from 'lucide-react';
import {
  useEPAProfessionalDiscussion,
  type ResponseScore,
} from '@/hooks/epa/useEPAProfessionalDiscussion';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import type { PortfolioEntry } from '@/types/portfolio';

interface EPAProfessionalDiscussionProps {
  portfolioEntries: PortfolioEntry[];
  qualificationCode: string;
  onSessionComplete?: () => void;
}

const GRADE_LABELS: Record<string, string> = {
  distinction: 'Distinction',
  pass: 'Pass',
  fail: 'Fail',
};

const Eyebrow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      'text-[10px] font-medium uppercase tracking-[0.18em] text-white/55',
      className
    )}
  >
    {children}
  </span>
);

const ComponentBar = ({ label, score }: { label: string; score: number }) => {
  const fillClass = score >= 70 ? 'bg-elec-yellow' : score >= 40 ? 'bg-white/55' : 'bg-white/30';
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <span className="text-[12px] text-white/85">{label}</span>
        <span className="text-[12px] font-mono text-white/85 tabular-nums">{score}</span>
      </div>
      <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-700', fillClass)}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

export function EPAProfessionalDiscussion({
  portfolioEntries,
  qualificationCode,
  onSessionComplete,
}: EPAProfessionalDiscussionProps) {
  const {
    questions,
    responses,
    currentQuestionIndex,
    isGenerating,
    isScoring,
    sessionResult,
    generateQuestions,
    submitResponse,
    nextQuestion,
    previousQuestion,
    finishSession,
    reset,
    currentQuestion,
    isSessionActive,
    answeredCount,
    totalCount,
  } = useEPAProfessionalDiscussion();

  void questions;

  const [responseText, setResponseText] = useState('');
  const [currentScore, setCurrentScore] = useState<ResponseScore | null>(null);
  const [isFinishing, setIsFinishing] = useState(false);
  const [descriptorsOpen, setDescriptorsOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    isSupported: speechSupported,
    isListening,
    transcript: speechTranscript,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechToText({ continuous: true });

  const prevTranscriptRef = useRef('');
  useEffect(() => {
    if (speechTranscript && speechTranscript !== prevTranscriptRef.current) {
      const newText = speechTranscript.slice(prevTranscriptRef.current.length);
      if (newText) {
        setResponseText((prev) => prev + (prev && !prev.endsWith(' ') ? ' ' : '') + newText.trim());
      }
      prevTranscriptRef.current = speechTranscript;
    }
  }, [speechTranscript]);

  const handleStart = () => generateQuestions(portfolioEntries, qualificationCode);

  const handleSubmit = async () => {
    if (!currentQuestion || !responseText.trim()) return;
    setCurrentScore(null);
    const score = await submitResponse(currentQuestion.id, responseText.trim(), qualificationCode);
    if (score) setCurrentScore(score);
  };

  const handleNext = () => {
    if (nextQuestion()) {
      stopListening();
      resetTranscript();
      prevTranscriptRef.current = '';
      setResponseText('');
      setCurrentScore(null);
      setDescriptorsOpen(false);
      textareaRef.current?.focus();
    }
  };

  const handleFinish = async () => {
    setIsFinishing(true);
    await finishSession();
    setIsFinishing(false);
    onSessionComplete?.();
  };

  const handleReset = () => {
    reset();
    setResponseText('');
    setCurrentScore(null);
    setDescriptorsOpen(false);
  };

  const existingResponse = currentQuestion
    ? responses.find((r) => r.questionId === currentQuestion.id)
    : null;

  /* ─── SETUP STATE ──────────────────────────────────────────── */
  if (!isSessionActive && !sessionResult) {
    return (
      <div className="px-4 sm:px-6 py-6 space-y-6">
        <div className="space-y-2">
          <Eyebrow>Mock professional discussion</Eyebrow>
          <h2 className="text-[24px] sm:text-[28px] font-semibold text-white tracking-tight leading-tight">
            Practise EPA-style questions on your real work
          </h2>
          <p className="text-[14px] text-white/70 leading-relaxed max-w-xl">
            AI reads your portfolio evidence and generates 5–8 EPA-style discussion questions
            grounded in your actual jobs. Type or speak each answer; you'll be scored against the
            real grade descriptors.
          </p>
        </div>

        {/* What's assessed */}
        <div className="space-y-2">
          <Eyebrow>What's assessed</Eyebrow>
          <div className="flex flex-wrap gap-1.5">
            {[
              'Technical knowledge',
              'Practical application',
              'Communication',
              'Reflection',
              'Problem solving',
            ].map((skill) => (
              <span
                key={skill}
                className="text-[12px] text-white/85 px-2.5 py-0.5 rounded-md border border-white/[0.08] bg-white/[0.02]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Flow */}
        <div className="space-y-2">
          <Eyebrow>How it works</Eyebrow>
          <ol className="space-y-2">
            {[
              { title: 'Portfolio scan', desc: 'AI reads your portfolio evidence to personalise the session' },
              { title: 'Question generation', desc: 'Creates 5–8 questions tailored to your actual jobs' },
              { title: 'Your response', desc: 'Type or speak — voice transcription is supported' },
              { title: 'AI scoring', desc: 'Marked against EPA grade descriptors with subscore breakdown' },
              { title: 'Result', desc: 'Predicted grade, strengths, and targeted improvements' },
            ].map((step, i) => (
              <li
                key={i}
                className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-4 py-3 sm:px-5 sm:py-4"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-[11px] font-mono text-elec-yellow/85 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[14px] font-medium text-white block">{step.title}</span>
                    <span className="text-[13px] text-white/70 leading-relaxed">{step.desc}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Action */}
        {portfolioEntries.length === 0 ? (
          <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-1.5">
            <Eyebrow className="text-elec-yellow">Add portfolio evidence first</Eyebrow>
            <p className="text-[13px] text-white/85 leading-relaxed">
              The discussion is grounded in your actual portfolio entries. Add at least one piece
              of evidence first — questions get richer the more you've logged.
            </p>
            <a
              href="/apprentice/hub"
              className="inline-flex items-center h-9 px-3 mt-1 rounded-md bg-elec-yellow text-black text-[12px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation"
            >
              Go to portfolio →
            </a>
          </div>
        ) : (
          <div className="space-y-2">
            <button
              onClick={handleStart}
              disabled={isGenerating}
              className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:opacity-50 inline-flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating questions from your portfolio…
                </>
              ) : (
                <>Start mock discussion →</>
              )}
            </button>
            <div className="flex items-baseline gap-2 text-[10px] uppercase tracking-[0.18em] text-white/40">
              <span>{portfolioEntries.length} portfolio entries</span>
              <span>·</span>
              <span>~15 min session</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ─── RESULTS STATE ────────────────────────────────────────── */
  if (sessionResult) {
    const grade = sessionResult.predictedGrade;
    const gradeText =
      grade === 'distinction'
        ? 'text-elec-yellow'
        : grade === 'pass'
          ? 'text-white/85'
          : 'text-red-300';

    const strengths = sessionResult.responses
      .flatMap((r) => r.score?.strengthsShown || [])
      .filter((v, i, a) => a.indexOf(v) === i)
      .slice(0, 6);

    return (
      <div className="px-4 sm:px-6 py-6 space-y-6">
        {/* Score */}
        <section className="space-y-2">
          <Eyebrow>Result · {GRADE_LABELS[grade]}</Eyebrow>
          <div className="flex items-baseline gap-2">
            <span
              className={cn(
                'text-[64px] sm:text-[72px] font-mono font-semibold leading-none tabular-nums',
                gradeText
              )}
            >
              {sessionResult.overallScore}
            </span>
            <span className="text-[18px] text-white/40 font-mono">/ 100</span>
          </div>
          <p className="text-[14px] text-white/70 leading-relaxed">
            {sessionResult.responses.filter((r) => r.score).length} of{' '}
            {sessionResult.questions.length} questions answered ·{' '}
            {Math.floor(sessionResult.timeSpentSeconds / 60)} min{' '}
            {sessionResult.timeSpentSeconds % 60}s.
          </p>
        </section>

        {/* Component scores */}
        <section className="space-y-3">
          <Eyebrow>Component scores</Eyebrow>
          <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
            <ComponentBar label="Technical knowledge" score={sessionResult.componentScores.technicalKnowledge} />
            <ComponentBar label="Practical application" score={sessionResult.componentScores.practicalApplication} />
            <ComponentBar label="Communication" score={sessionResult.componentScores.communication} />
            <ComponentBar label="Reflection" score={sessionResult.componentScores.reflection} />
            <ComponentBar label="Problem solving" score={sessionResult.componentScores.problemSolving} />
          </div>
        </section>

        {/* Strengths */}
        {strengths.length > 0 && (
          <section className="space-y-2">
            <Eyebrow>Strengths</Eyebrow>
            <ul className="space-y-1.5">
              {strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Improvements */}
        {sessionResult.improvementSuggestions.length > 0 && (
          <section className="space-y-2">
            <Eyebrow>Areas to improve</Eyebrow>
            <ul className="space-y-2">
              {sessionResult.improvementSuggestions.map((suggestion, i) => (
                <li
                  key={i}
                  className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.03] px-4 py-3 sm:px-5 sm:py-4"
                >
                  <p className="text-[14px] text-white/85 leading-relaxed">{suggestion}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Per-question */}
        <section className="space-y-3">
          <Eyebrow>Per-question results</Eyebrow>
          <ul className="space-y-2">
            {sessionResult.questions.map((q, i) => {
              const resp = sessionResult.responses.find((r) => r.questionId === q.id);
              const score = resp?.score;
              const qGradeClass =
                score?.grade === 'distinction'
                  ? 'text-elec-yellow border-elec-yellow/30 bg-elec-yellow/[0.06]'
                  : score?.grade === 'pass'
                    ? 'text-white/85 border-white/[0.08] bg-white/[0.03]'
                    : 'text-red-300 border-red-500/30 bg-red-500/[0.05]';
              return (
                <li
                  key={q.id}
                  className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-4 py-3 sm:px-5 sm:py-4 space-y-2"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-[11px] font-mono text-white/40 flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[14px] text-white leading-snug flex-1">{q.question}</p>
                    {score && (
                      <span
                        className={cn(
                          'text-[11px] font-mono px-1.5 py-0.5 rounded-md border flex-shrink-0',
                          qGradeClass
                        )}
                      >
                        {score.score}
                      </span>
                    )}
                  </div>
                  {q.portfolioContext && (
                    <p className="text-[12px] text-white/55 italic pl-7">
                      Drawn from: {q.portfolioContext}
                    </p>
                  )}
                  {score && (
                    <p className="text-[12px] text-white/70 leading-relaxed pl-7">{score.feedback}</p>
                  )}
                  {!score && <p className="text-[12px] text-white/40 italic pl-7">Not answered</p>}
                </li>
              );
            })}
          </ul>
        </section>

        <button
          onClick={handleReset}
          className="w-full h-12 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white text-[14px] font-semibold hover:bg-white/[0.04] transition-colors touch-manipulation inline-flex items-center justify-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Start new discussion
        </button>
      </div>
    );
  }

  /* ─── IN-PROGRESS STATE ─────────────────────────────────────── */
  return (
    <div className="flex flex-col min-h-[60vh]">
      {/* Progress strip */}
      <div className="px-4 sm:px-6 pt-4 pb-3 space-y-2">
        <div className="flex items-baseline justify-between gap-3">
          <Eyebrow>
            Question {currentQuestionIndex + 1} / {totalCount}
          </Eyebrow>
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.18em]">
            {answeredCount} answered
          </span>
        </div>
        <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-elec-yellow transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-4 sm:px-6 py-4 space-y-4">
        {currentQuestion && (
          <>
            {/* Portfolio source — surfaced prominently */}
            {currentQuestion.portfolioContext && (
              <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.03] px-4 py-3 sm:px-5 sm:py-4 space-y-1.5">
                <Eyebrow className="text-elec-yellow">Drawn from your portfolio</Eyebrow>
                <p className="text-[13px] text-white/85 leading-relaxed italic">
                  {currentQuestion.portfolioContext}
                </p>
              </div>
            )}

            {/* The question */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-2 flex-wrap">
                <Eyebrow>Assessor question</Eyebrow>
                {currentQuestion.targetLO && (
                  <span className="text-[10px] font-mono text-white/55 uppercase tracking-[0.14em]">
                    LO {currentQuestion.targetLO}
                  </span>
                )}
                {currentQuestion.targetAC && (
                  <span className="text-[10px] font-mono text-elec-yellow/85 uppercase tracking-[0.14em]">
                    {currentQuestion.targetAC}
                  </span>
                )}
                {currentQuestion.questionType && (
                  <span className="text-[10px] uppercase tracking-[0.14em] text-white/40">
                    {currentQuestion.questionType}
                  </span>
                )}
              </div>
              <p className="text-[16px] sm:text-[18px] text-white leading-relaxed">
                {currentQuestion.question}
              </p>
            </div>

            {/* Grade descriptors — collapsible */}
            <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
              <button
                onClick={() => setDescriptorsOpen(!descriptorsOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-left touch-manipulation h-11"
              >
                <Eyebrow>Grade descriptors</Eyebrow>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-white/55 transition-transform',
                    descriptorsOpen && 'rotate-180'
                  )}
                />
              </button>
              {descriptorsOpen && (
                <div className="px-4 pb-4 space-y-2">
                  <div className="rounded-lg border border-white/[0.06] bg-[hsl(0_0%_10%)] p-3 space-y-1">
                    <Eyebrow>Pass</Eyebrow>
                    <p className="text-[13px] text-white/85 leading-relaxed">
                      {currentQuestion.gradeDescriptors.pass}
                    </p>
                  </div>
                  <div className="rounded-lg border border-elec-yellow/20 bg-elec-yellow/[0.03] p-3 space-y-1">
                    <Eyebrow className="text-elec-yellow">Distinction</Eyebrow>
                    <p className="text-[13px] text-white/85 leading-relaxed">
                      {currentQuestion.gradeDescriptors.distinction}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Response area */}
            {existingResponse?.score ? (
              <div className="space-y-3">
                <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 space-y-1.5">
                  <Eyebrow>Your response</Eyebrow>
                  <p className="text-[13px] text-white/85 leading-relaxed whitespace-pre-wrap">
                    {existingResponse.responseText}
                  </p>
                </div>
                <ScoreFeedback score={existingResponse.score} />
              </div>
            ) : (
              <div className="space-y-3">
                <textarea
                  ref={textareaRef}
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Type or speak your response. Aim for 3–5 paragraphs covering your experience, reasoning, and reflection…"
                  className="w-full min-h-[200px] p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-[14px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20 touch-manipulation resize-none leading-relaxed"
                  disabled={isScoring}
                />

                {interimTranscript && (
                  <p className="text-[12px] text-elec-yellow/85 italic px-2">
                    {interimTranscript}…
                  </p>
                )}

                {speechSupported && (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={isListening ? stopListening : startListening}
                      disabled={isScoring}
                      className={cn(
                        'h-11 w-11 rounded-lg flex items-center justify-center touch-manipulation transition-colors shrink-0 border',
                        isListening
                          ? 'bg-red-500/[0.08] border-red-500/40 text-red-300 animate-pulse'
                          : 'bg-white/[0.02] border-white/[0.08] text-white/85 hover:bg-white/[0.04]'
                      )}
                      aria-label={isListening ? 'Stop recording' : 'Start voice input'}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </button>
                    <span className="text-[13px] text-white/70">
                      {isListening ? (
                        <span className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-300 animate-pulse" />
                          Listening…
                        </span>
                      ) : (
                        'Tap to speak'
                      )}
                    </span>
                    <span className="ml-auto text-[10px] font-mono text-white/40 uppercase tracking-[0.14em]">
                      {responseText.length} chars
                    </span>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={!responseText.trim() || isScoring}
                  className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  {isScoring ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Scoring…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit response
                    </>
                  )}
                </button>

                {currentScore && <ScoreFeedback score={currentScore} />}
              </div>
            )}
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="px-4 sm:px-6 py-3 border-t border-white/[0.06] flex items-center justify-between gap-3">
        <button
          onClick={() => {
            previousQuestion();
            stopListening();
            resetTranscript();
            prevTranscriptRef.current = '';
            setResponseText('');
            setCurrentScore(null);
            setDescriptorsOpen(false);
          }}
          disabled={currentQuestionIndex === 0}
          className="h-11 px-4 rounded-lg border border-white/[0.08] bg-white/[0.02] text-white text-[13px] font-medium hover:bg-white/[0.04] transition-colors touch-manipulation disabled:opacity-30"
        >
          ← Previous
        </button>

        {currentQuestionIndex < totalCount - 1 ? (
          <button
            onClick={handleNext}
            className="h-11 px-4 rounded-lg border border-white/[0.08] bg-white/[0.02] text-white text-[13px] font-medium hover:bg-white/[0.04] transition-colors touch-manipulation"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleFinish}
            disabled={answeredCount === 0 || isFinishing}
            className="h-11 px-5 rounded-lg bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:opacity-50 inline-flex items-center gap-1.5"
          >
            {isFinishing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )}
            Finish discussion
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── ScoreFeedback ────────────────────────────────────────── */

function ScoreFeedback({ score }: { score: ResponseScore }) {
  const gradeText =
    score.grade === 'distinction'
      ? 'text-elec-yellow'
      : score.grade === 'pass'
        ? 'text-white/85'
        : 'text-red-300';

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
      {/* Score + grade */}
      <div className="space-y-1">
        <Eyebrow>Score · {GRADE_LABELS[score.grade]}</Eyebrow>
        <div className="flex items-baseline gap-2">
          <span
            className={cn(
              'text-[40px] font-mono font-semibold leading-none tabular-nums',
              gradeText
            )}
          >
            {score.score}
          </span>
          <span className="text-[12px] text-white/40 font-mono">/ 100</span>
        </div>
        <p className="text-[13px] text-white/85 leading-relaxed">{score.feedback}</p>
      </div>

      {/* Subscores */}
      <div className="space-y-2">
        <ComponentBar label="Technical knowledge" score={score.subscores.technicalKnowledge} />
        <ComponentBar label="Practical application" score={score.subscores.practicalApplication} />
        <ComponentBar label="Communication" score={score.subscores.communication} />
        <ComponentBar label="Reflection" score={score.subscores.reflection} />
        <ComponentBar label="Problem solving" score={score.subscores.problemSolving} />
      </div>

      {/* Strengths */}
      {score.strengthsShown.length > 0 && (
        <div className="space-y-1.5 pt-3 border-t border-white/[0.04]">
          <Eyebrow>Strengths</Eyebrow>
          <ul className="space-y-1.5">
            {score.strengthsShown.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[13px] text-white/85 leading-relaxed"
              >
                <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Areas to improve */}
      {score.areasToImprove.length > 0 && (
        <div className="space-y-1.5 pt-3 border-t border-white/[0.04]">
          <Eyebrow>Areas to improve</Eyebrow>
          <ul className="space-y-1.5">
            {score.areasToImprove.map((a, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[13px] text-white/85 leading-relaxed"
              >
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EPAProfessionalDiscussion;
