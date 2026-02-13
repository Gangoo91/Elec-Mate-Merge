/**
 * EPAProfessionalDiscussion
 *
 * Full-page mock EPA professional discussion component.
 * Three states: Setup → In Progress → Results.
 */

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  MessageSquare,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Send,
  CheckCircle2,
  AlertTriangle,
  Star,
  Clock,
  Target,
  Award,
  RotateCcw,
  Mic,
  MicOff,
  Brain,
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
}

const GRADE_COLOURS: Record<string, { bg: string; text: string; border: string; ring: string }> = {
  distinction: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', ring: 'stroke-emerald-500' },
  pass: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', ring: 'stroke-amber-500' },
  fail: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', ring: 'stroke-red-500' },
};

const GRADE_LABELS: Record<string, string> = {
  distinction: 'Distinction',
  pass: 'Pass',
  fail: 'Fail',
};

/** Radial SVG progress ring */
function RadialRing({
  score,
  size = 140,
  strokeWidth = 10,
  className,
  ringClass,
  children,
}: {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  ringClass?: string;
  children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-white/10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={cn('transition-all duration-1000 ease-out', ringClass)}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export function EPAProfessionalDiscussion({
  portfolioEntries,
  qualificationCode,
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

  const [responseText, setResponseText] = useState('');
  const [currentScore, setCurrentScore] = useState<ResponseScore | null>(null);
  const [isFinishing, setIsFinishing] = useState(false);
  const [descriptorsOpen, setDescriptorsOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Speech-to-text for voice input
  const {
    isSupported: speechSupported,
    isListening,
    transcript: speechTranscript,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechToText({ continuous: true });

  // Append finalised speech transcript to response text
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

  const handleStart = () => {
    generateQuestions(portfolioEntries, qualificationCode);
  };

  const handleSubmit = async () => {
    if (!currentQuestion || !responseText.trim()) return;
    setCurrentScore(null);
    const score = await submitResponse(
      currentQuestion.id,
      responseText.trim(),
      qualificationCode
    );
    if (score) {
      setCurrentScore(score);
    }
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
  };

  const handleReset = () => {
    reset();
    setResponseText('');
    setCurrentScore(null);
    setDescriptorsOpen(false);
  };

  // Get existing response for current question
  const existingResponse = currentQuestion
    ? responses.find((r) => r.questionId === currentQuestion.id)
    : null;

  // --- SETUP STATE ---
  if (!isSessionActive && !sessionResult) {
    return (
      <div className="py-8 px-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
            <MessageSquare className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Mock Professional Discussion
            </h2>
            <p className="text-sm text-white mt-0.5">
              AI will generate 5-8 EPA-style questions based on your actual
              portfolio evidence. Type your responses and receive instant
              feedback and scoring.
            </p>
          </div>
        </div>

        {/* How it works — Vertical stepper */}
        <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
          <p className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
            How it works
          </p>
          <div className="relative pl-8">
            {/* Vertical connector line */}
            <div className="absolute left-[11px] top-1 bottom-1 w-px bg-purple-500/30" />

            {[
              'AI reads your portfolio evidence',
              'Generates personalised discussion questions',
              'You type your response to each question',
              'AI scores your answer against grade descriptors',
              'Get a predicted grade and improvement tips',
            ].map((step, i) => (
              <div key={i} className="relative flex items-start gap-3 pb-4 last:pb-0">
                <span className="absolute -left-8 h-6 w-6 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center text-xs font-bold shrink-0 z-10">
                  {i + 1}
                </span>
                <span className="text-sm text-white leading-6">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action */}
        {portfolioEntries.length === 0 ? (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm text-amber-400 font-medium">
                Add portfolio evidence first to start a discussion
              </p>
              <a
                href="/apprentice/hub"
                className="inline-flex items-center gap-1 text-xs text-purple-400 font-medium touch-manipulation"
              >
                Go to Portfolio Hub
                <ChevronRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <button
              onClick={handleStart}
              disabled={isGenerating}
              className="w-full h-14 rounded-xl bg-purple-500 text-white font-semibold text-base touch-manipulation active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating questions...
                </>
              ) : (
                <>
                  <MessageSquare className="h-5 w-5" />
                  Start Mock Discussion
                </>
              )}
            </button>
            <Badge variant="outline" className="text-xs text-white">
              {portfolioEntries.length} portfolio entries available
            </Badge>
          </div>
        )}
      </div>
    );
  }

  // --- RESULTS STATE ---
  if (sessionResult) {
    const gradeColour =
      GRADE_COLOURS[sessionResult.predictedGrade] || GRADE_COLOURS.fail;

    return (
      <div className="space-y-5 px-4 py-5">
        {/* Grade Hero — Radial Ring */}
        <div className="p-5 rounded-xl bg-white/[0.04] border border-white/10">
          <div className="flex items-center gap-5">
            <RadialRing
              score={sessionResult.overallScore}
              size={120}
              strokeWidth={10}
              ringClass={gradeColour.ring}
            >
              <span className={cn('text-5xl font-bold', gradeColour.text)}>
                {sessionResult.overallScore}
              </span>
              <span className="text-xs text-white">/100</span>
            </RadialRing>

            <div className="flex-1 space-y-2">
              <Badge
                className={cn(
                  'text-xs',
                  gradeColour.bg,
                  gradeColour.text,
                  gradeColour.border
                )}
              >
                {GRADE_LABELS[sessionResult.predictedGrade]}
              </Badge>
              <p className="text-sm text-white">
                {sessionResult.responses.filter((r) => r.score).length} of{' '}
                {sessionResult.questions.length} questions answered
              </p>
              <div className="flex items-center gap-1 text-xs text-white">
                <Clock className="h-3 w-3" />
                {Math.floor(sessionResult.timeSpentSeconds / 60)}m{' '}
                {sessionResult.timeSpentSeconds % 60}s
              </div>
            </div>
          </div>
        </div>

        {/* Component Scores — Full-width horizontal bars */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            Component Scores
          </h3>
          {[
            { label: 'Technical Knowledge', score: sessionResult.componentScores.technicalKnowledge, icon: Target },
            { label: 'Practical Application', score: sessionResult.componentScores.practicalApplication, icon: Award },
            { label: 'Communication', score: sessionResult.componentScores.communication, icon: MessageSquare },
            { label: 'Reflection', score: sessionResult.componentScores.reflection, icon: Star },
            { label: 'Problem Solving', score: sessionResult.componentScores.problemSolving, icon: Brain },
          ].map((comp) => {
            const barColour =
              comp.score >= 70
                ? 'bg-emerald-500'
                : comp.score >= 40
                  ? 'bg-amber-500'
                  : 'bg-red-500';
            return (
              <div
                key={comp.label}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/10"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <comp.icon className="h-4 w-4 text-white shrink-0" />
                    <span className="text-sm text-white">{comp.label}</span>
                  </div>
                  <span className="text-sm font-bold text-white">{comp.score}/100</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all duration-500', barColour)}
                    style={{ width: `${comp.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Strengths */}
        {sessionResult.responses.some((r) => r.score?.strengthsShown?.length) && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Key Strengths
            </h3>
            {sessionResult.responses
              .flatMap((r) => r.score?.strengthsShown || [])
              .filter((v, i, a) => a.indexOf(v) === i)
              .slice(0, 6)
              .map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-white">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  {s}
                </div>
              ))}
          </div>
        )}

        {/* Improvement Suggestions */}
        {sessionResult.improvementSuggestions.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Areas to Improve
            </h3>
            {sessionResult.improvementSuggestions.map((suggestion, i) => (
              <div
                key={i}
                className="flex items-start gap-2 p-3 rounded-xl border border-white/10 border-l-4 border-l-amber-500 bg-amber-500/5"
              >
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-white">{suggestion}</p>
              </div>
            ))}
          </div>
        )}

        {/* Per-question Results */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            Per-Question Results
          </h3>
          {sessionResult.questions.map((q, i) => {
            const resp = sessionResult.responses.find(
              (r) => r.questionId === q.id
            );
            const score = resp?.score;
            const qGrade = score
              ? GRADE_COLOURS[score.grade] || GRADE_COLOURS.fail
              : GRADE_COLOURS.fail;

            return (
              <Card key={q.id} className="border-white/10">
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm text-white line-clamp-2 flex-1">
                      {i + 1}. {q.question}
                    </p>
                    {score && (
                      <Badge
                        className={cn(
                          'text-xs shrink-0',
                          qGrade.bg,
                          qGrade.text,
                          qGrade.border
                        )}
                      >
                        {score.score}/100
                      </Badge>
                    )}
                  </div>
                  {score && (
                    <p className="text-xs text-white">{score.feedback}</p>
                  )}
                  {!score && (
                    <p className="text-xs text-white italic">Not answered</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="w-full h-11 rounded-xl bg-white/[0.06] border border-white/10 text-white font-medium text-sm touch-manipulation active:scale-95 flex items-center justify-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Start New Discussion
        </button>
      </div>
    );
  }

  // --- IN PROGRESS STATE ---
  return (
    <div className="flex flex-col h-full">
      {/* Progress Bar */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between text-xs text-white mb-1.5">
          <span className="font-medium">
            Question {currentQuestionIndex + 1} of {totalCount}
          </span>
          <span>{answeredCount} answered</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-purple-500 transition-all duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / totalCount) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {currentQuestion && (
          <>
            <Card className="border-purple-500/20 bg-purple-500/5">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-purple-400" />
                  <span className="text-xs text-purple-400 font-semibold">
                    Assessor Question
                  </span>
                </div>
                <p className="text-lg text-white leading-relaxed">
                  {currentQuestion.question}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {currentQuestion.targetLO && (
                    <Badge
                      variant="outline"
                      className="text-xs text-white"
                    >
                      LO: {currentQuestion.targetLO}
                    </Badge>
                  )}
                  {currentQuestion.portfolioContext && (
                    <Badge
                      variant="outline"
                      className="text-xs text-white"
                    >
                      {currentQuestion.portfolioContext}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Grade Descriptors — Collapsible */}
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <button
                onClick={() => setDescriptorsOpen(!descriptorsOpen)}
                className="w-full flex items-center justify-between p-3 text-left touch-manipulation h-11"
              >
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                  Grade Descriptors
                </span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-white transition-transform',
                    descriptorsOpen && 'rotate-180'
                  )}
                />
              </button>
              {descriptorsOpen && (
                <div className="px-3 pb-3 space-y-2">
                  {(['pass', 'distinction'] as const).map((grade) => {
                    const gc = GRADE_COLOURS[grade];
                    return (
                      <div
                        key={grade}
                        className={cn(
                          'p-3 rounded-lg border border-white/10 border-l-4',
                          grade === 'pass' ? 'border-l-amber-500' : 'border-l-emerald-500'
                        )}
                      >
                        <p className={cn('text-xs font-semibold mb-1', gc.text)}>
                          {GRADE_LABELS[grade]}
                        </p>
                        <p className="text-sm text-white">
                          {currentQuestion.gradeDescriptors[grade]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Response Area */}
            {existingResponse?.score ? (
              // Show scored feedback
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <p className="text-xs text-white mb-1">Your response:</p>
                  <p className="text-sm text-white">
                    {existingResponse.responseText}
                  </p>
                </div>

                <ScoreFeedback score={existingResponse.score} />
              </div>
            ) : (
              <div className="space-y-3">
                {/* Textarea */}
                <textarea
                  ref={textareaRef}
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Type or speak your response. Aim for 3-5 paragraphs covering your experience, reasoning, and reflection..."
                  className="w-full min-h-[200px] p-4 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-white/90 focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 touch-manipulation resize-none"
                  disabled={isScoring}
                />

                {/* Interim speech preview */}
                {interimTranscript && (
                  <div className="p-2 rounded-lg bg-purple-500/5 border border-purple-500/10">
                    <p className="text-xs text-purple-300 italic">
                      {interimTranscript}...
                    </p>
                  </div>
                )}

                {/* Mic Button — Dedicated row */}
                {speechSupported && (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={isListening ? stopListening : startListening}
                      disabled={isScoring}
                      className={cn(
                        'h-12 w-12 rounded-xl flex items-center justify-center touch-manipulation transition-all shrink-0',
                        isListening
                          ? 'bg-red-500/20 border-2 border-red-500/60 text-red-400 animate-pulse'
                          : 'bg-purple-500/10 border-2 border-purple-500/30 text-purple-400 hover:bg-purple-500/20'
                      )}
                      aria-label={isListening ? 'Stop recording' : 'Start voice input'}
                    >
                      {isListening ? (
                        <MicOff className="h-5 w-5" />
                      ) : (
                        <Mic className="h-5 w-5" />
                      )}
                    </button>
                    <span className="text-sm text-white">
                      {isListening ? (
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                          Listening...
                        </span>
                      ) : (
                        'Tap to speak'
                      )}
                    </span>
                  </div>
                )}

                {/* Character count */}
                <p className="text-xs text-white">
                  {responseText.length} characters
                </p>

                {/* Submit button — full width */}
                <button
                  onClick={handleSubmit}
                  disabled={!responseText.trim() || isScoring}
                  className="w-full h-12 rounded-xl bg-purple-500 text-white font-medium text-sm touch-manipulation active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isScoring ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Scoring...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Response
                    </>
                  )}
                </button>

                {currentScore && <ScoreFeedback score={currentScore} />}
              </div>
            )}
          </>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between">
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
          className="h-11 px-4 rounded-xl border border-white/10 text-white text-sm touch-manipulation active:scale-95 disabled:opacity-30 flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        {currentQuestionIndex < totalCount - 1 ? (
          <button
            onClick={handleNext}
            className="h-11 px-4 rounded-xl bg-white/[0.06] border border-white/10 text-white text-sm font-medium touch-manipulation active:scale-95 flex items-center gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleFinish}
            disabled={answeredCount === 0 || isFinishing}
            className="h-11 px-6 rounded-xl bg-emerald-500 text-white text-sm font-medium touch-manipulation active:scale-95 disabled:opacity-50 flex items-center gap-2"
          >
            {isFinishing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )}
            Finish Discussion
          </button>
        )}
      </div>
    </div>
  );
}

// Score Feedback sub-component — redesigned with radial ring + horizontal bars
function ScoreFeedback({ score }: { score: ResponseScore }) {
  const gradeColour =
    GRADE_COLOURS[score.grade] || GRADE_COLOURS.fail;

  return (
    <div className="space-y-4">
      {/* Score + Grade — Radial ring */}
      <div className="flex items-center gap-4">
        <RadialRing
          score={score.score}
          size={90}
          strokeWidth={8}
          ringClass={gradeColour.ring}
        >
          <span className={cn('text-2xl font-bold', gradeColour.text)}>
            {score.score}
          </span>
        </RadialRing>
        <div className="flex-1">
          <Badge
            className={cn(
              'text-xs',
              gradeColour.bg,
              gradeColour.text,
              gradeColour.border
            )}
          >
            {GRADE_LABELS[score.grade]}
          </Badge>
          <p className="text-sm text-white mt-1">{score.feedback}</p>
        </div>
      </div>

      {/* Subscores — Full-width horizontal bars */}
      <div className="space-y-2">
        {[
          { label: 'Technical Knowledge', value: score.subscores.technicalKnowledge },
          { label: 'Practical Application', value: score.subscores.practicalApplication },
          { label: 'Communication', value: score.subscores.communication },
          { label: 'Reflection', value: score.subscores.reflection },
          { label: 'Problem Solving', value: score.subscores.problemSolving },
        ].map((sub) => {
          const barColour =
            sub.value >= 70
              ? 'bg-emerald-500'
              : sub.value >= 40
                ? 'bg-amber-500'
                : 'bg-red-500';
          return (
            <div key={sub.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-white">{sub.label}</span>
                <span className="text-xs font-bold text-white">{sub.value}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-500', barColour)}
                  style={{ width: `${sub.value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Strengths */}
      {score.strengthsShown.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Strengths
          </p>
          {score.strengthsShown.map((s, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-white">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              {s}
            </div>
          ))}
        </div>
      )}

      {/* Areas to Improve */}
      {score.areasToImprove.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Areas to Improve
          </p>
          {score.areasToImprove.map((a, i) => (
            <div
              key={i}
              className="flex items-start gap-2 p-2.5 rounded-lg border border-white/10 border-l-4 border-l-amber-500 bg-amber-500/5 text-sm text-white"
            >
              <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              {a}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EPAProfessionalDiscussion;
