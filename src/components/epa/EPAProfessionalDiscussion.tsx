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
  Lightbulb,
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

const GRADE_COLOURS: Record<string, { bg: string; text: string; border: string }> = {
  distinction: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  pass: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  fail: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
};

const GRADE_LABELS: Record<string, string> = {
  distinction: 'Distinction',
  pass: 'Pass',
  fail: 'Fail',
};

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
            <h2 className="text-xl font-bold text-foreground">
              Mock Professional Discussion
            </h2>
            <p className="text-sm text-white/90 mt-0.5">
              AI will generate 5-8 EPA-style questions based on your actual
              portfolio evidence. Type your responses and receive instant
              feedback and scoring.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-3">
          <p className="text-xs font-semibold text-white/80 uppercase tracking-wider">
            How it works
          </p>
          {[
            'AI reads your portfolio evidence',
            'Generates personalised discussion questions',
            'You type your response to each question',
            'AI scores your answer against grade descriptors',
            'Get a predicted grade and improvement tips',
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3 text-sm">
              <span className="h-5 w-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-white/90">{step}</span>
            </div>
          ))}
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
              className="w-full h-14 rounded-xl bg-purple-500 text-white font-semibold text-base touch-manipulation active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
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
            <p className="text-[10px] text-white/80">
              {portfolioEntries.length} portfolio entries available
            </p>
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
        {/* Grade Hero */}
        <div className="flex items-center gap-4">
          <div
            className={cn(
              'h-20 w-20 rounded-2xl flex flex-col items-center justify-center border',
              gradeColour.bg,
              gradeColour.border
            )}
          >
            <span className={cn('text-2xl font-bold', gradeColour.text)}>
              {sessionResult.overallScore}
            </span>
            <span className="text-[10px] text-white/70">/100</span>
          </div>
          <div>
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
            <p className="text-sm text-white/90 mt-1">
              {sessionResult.responses.filter((r) => r.score).length} of{' '}
              {sessionResult.questions.length} questions answered
            </p>
            <div className="flex items-center gap-1 text-xs text-white/70 mt-0.5">
              <Clock className="h-3 w-3" />
              {Math.floor(sessionResult.timeSpentSeconds / 60)}m{' '}
              {sessionResult.timeSpentSeconds % 60}s
            </div>
          </div>
        </div>

        {/* Component Scores */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Technical Knowledge', score: sessionResult.componentScores.technicalKnowledge, icon: Target },
            { label: 'Practical Application', score: sessionResult.componentScores.practicalApplication, icon: Award },
            { label: 'Communication', score: sessionResult.componentScores.communication, icon: MessageSquare },
            { label: 'Reflection', score: sessionResult.componentScores.reflection, icon: Star },
            { label: 'Problem Solving', score: sessionResult.componentScores.problemSolving, icon: Brain },
          ].map((comp) => (
            <Card key={comp.label} className="border-white/10">
              <CardContent className="p-3 flex items-center gap-2">
                <comp.icon className="h-4 w-4 text-white/70 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/80 truncate">{comp.label}</p>
                  <p className="text-sm font-semibold text-foreground">
                    {comp.score}/100
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Per-question Results */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
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
                    <p className="text-sm text-foreground line-clamp-2 flex-1">
                      {i + 1}. {q.question}
                    </p>
                    {score && (
                      <Badge
                        className={cn(
                          'text-[10px] shrink-0',
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
                    <p className="text-xs text-white/90">{score.feedback}</p>
                  )}
                  {!score && (
                    <p className="text-xs text-white/70 italic">Not answered</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Improvement Suggestions */}
        {sessionResult.improvementSuggestions.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
              Areas to Improve
            </h3>
            {sessionResult.improvementSuggestions.map((suggestion, i) => (
              <div
                key={i}
                className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10"
              >
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-white/90">{suggestion}</p>
              </div>
            ))}
          </div>
        )}

        {/* Reset */}
        <button
          onClick={handleReset}
          className="w-full h-11 rounded-xl bg-white/[0.06] border border-white/10 text-white/90 font-medium text-sm touch-manipulation active:scale-95 flex items-center justify-center gap-2"
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
        <div className="flex items-center justify-between text-xs text-white/70 mb-1.5">
          <span>
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
                <p className="text-base text-foreground leading-relaxed">
                  {currentQuestion.question}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {currentQuestion.targetLO && (
                    <Badge
                      variant="outline"
                      className="text-[10px] text-white/80"
                    >
                      LO: {currentQuestion.targetLO}
                    </Badge>
                  )}
                  {currentQuestion.portfolioContext && (
                    <Badge
                      variant="outline"
                      className="text-[10px] text-white/80"
                    >
                      {currentQuestion.portfolioContext}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Grade Descriptors */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
              <p className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">
                Grade Descriptors
              </p>
              {(['pass', 'distinction'] as const).map((grade) => (
                <div key={grade} className="flex items-start gap-2 text-xs">
                  <Badge
                    className={cn(
                      'text-[8px] w-12 justify-center shrink-0',
                      GRADE_COLOURS[grade].bg,
                      GRADE_COLOURS[grade].text,
                      GRADE_COLOURS[grade].border
                    )}
                  >
                    {GRADE_LABELS[grade]}
                  </Badge>
                  <span className="text-white/80">
                    {currentQuestion.gradeDescriptors[grade]}
                  </span>
                </div>
              ))}
            </div>

            {/* Response Area */}
            {existingResponse?.score ? (
              // Show scored feedback
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <p className="text-xs text-white/70 mb-1">Your response:</p>
                  <p className="text-sm text-white/90">
                    {existingResponse.responseText}
                  </p>
                </div>

                <ScoreFeedback score={existingResponse.score} />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Type or speak your response. Aim for 3-5 paragraphs covering your experience, reasoning, and reflection..."
                    className="w-full min-h-[200px] p-4 pr-14 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-foreground placeholder:text-white/20 focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 touch-manipulation resize-none"
                    disabled={isScoring}
                  />
                  {/* Mic toggle button */}
                  {speechSupported && (
                    <button
                      type="button"
                      onClick={isListening ? stopListening : startListening}
                      disabled={isScoring}
                      className={cn(
                        'absolute top-3 right-3 h-10 w-10 rounded-lg flex items-center justify-center touch-manipulation transition-all',
                        isListening
                          ? 'bg-red-500/20 border border-red-500/40 text-red-400 animate-pulse'
                          : 'bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20'
                      )}
                      aria-label={isListening ? 'Stop recording' : 'Start voice input'}
                    >
                      {isListening ? (
                        <MicOff className="h-4 w-4" />
                      ) : (
                        <Mic className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>

                {/* Interim speech preview */}
                {interimTranscript && (
                  <div className="p-2 rounded-lg bg-purple-500/5 border border-purple-500/10">
                    <p className="text-xs text-purple-300/70 italic">
                      {interimTranscript}...
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] text-white/70">
                      {responseText.length} characters
                    </p>
                    {isListening && (
                      <span className="text-[10px] text-red-400 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                        Listening...
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={!responseText.trim() || isScoring}
                    className="h-11 px-6 rounded-xl bg-purple-500 text-white font-medium text-sm touch-manipulation active:scale-95 disabled:opacity-50 flex items-center gap-2"
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
                </div>
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
          }}
          disabled={currentQuestionIndex === 0}
          className="h-11 px-4 rounded-xl border border-white/10 text-white/90 text-sm touch-manipulation active:scale-95 disabled:opacity-30 flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        {currentQuestionIndex < totalCount - 1 ? (
          <button
            onClick={handleNext}
            className="h-11 px-4 rounded-xl bg-white/[0.06] border border-white/10 text-white/80 text-sm font-medium touch-manipulation active:scale-95 flex items-center gap-1"
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

// Score Feedback sub-component
function ScoreFeedback({ score }: { score: ResponseScore }) {
  const gradeColour =
    GRADE_COLOURS[score.grade] || GRADE_COLOURS.fail;

  return (
    <div className="space-y-3">
      {/* Score + Grade */}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'h-14 w-14 rounded-xl flex flex-col items-center justify-center border',
            gradeColour.bg,
            gradeColour.border
          )}
        >
          <span className={cn('text-lg font-bold', gradeColour.text)}>
            {score.score}
          </span>
          <span className="text-[8px] text-white/70">/100</span>
        </div>
        <div>
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
          <p className="text-sm text-white/90 mt-1">{score.feedback}</p>
        </div>
      </div>

      {/* Subscores */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Technical', value: score.subscores.technicalKnowledge },
          { label: 'Application', value: score.subscores.practicalApplication },
          { label: 'Communication', value: score.subscores.communication },
          { label: 'Reflection', value: score.subscores.reflection },
          { label: 'Problem Solving', value: score.subscores.problemSolving },
        ].map((sub) => (
          <div
            key={sub.label}
            className="p-2 rounded-lg bg-white/[0.03] border border-white/5 text-center"
          >
            <p className="text-lg font-semibold text-foreground">
              {sub.value}
            </p>
            <p className="text-[10px] text-white/70">{sub.label}</p>
          </div>
        ))}
      </div>

      {/* Strengths */}
      {score.strengthsShown.length > 0 && (
        <div className="space-y-1">
          <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
            Strengths
          </p>
          {score.strengthsShown.map((s, i) => (
            <div key={i} className="flex items-start gap-1.5 text-xs text-white/90">
              <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" />
              {s}
            </div>
          ))}
        </div>
      )}

      {/* Areas to Improve */}
      {score.areasToImprove.length > 0 && (
        <div className="space-y-1">
          <p className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
            Areas to Improve
          </p>
          {score.areasToImprove.map((a, i) => (
            <div key={i} className="flex items-start gap-1.5 text-xs text-white/90">
              <AlertTriangle className="h-3 w-3 text-amber-400 shrink-0 mt-0.5" />
              {a}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EPAProfessionalDiscussion;
