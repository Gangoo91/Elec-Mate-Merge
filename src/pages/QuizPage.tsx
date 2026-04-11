import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getAssessmentById } from '@/data/quizAssessments';
import { getRandomQuestions } from '@/data/learning-hub-quiz';
import EnhancedQuizInterface from '@/components/learning-hub/quiz/EnhancedQuizInterface';
import EnhancedQuizResults from '@/components/learning-hub/quiz/EnhancedQuizResults';
import QuizPassCelebration from '@/components/learning-hub/quiz/QuizPassCelebration';
import { QuizResult, QuizAnswer, QuizQuestion, Assessment } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertCircle, Loader2, BookOpen, Clock, Target } from 'lucide-react';
import { useQuizCompletion } from '@/hooks/useQuizCompletion';

type QuizState = 'loading' | 'ready' | 'in-progress' | 'results' | 'review' | 'error';

const QuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { completeQuiz } = useQuizCompletion();

  const [quizState, setQuizState] = useState<QuizState>('loading');
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const getBackPath = (): string => {
    const fromPath = (location.state as { from?: string })?.from;
    if (fromPath) return fromPath;
    return '/apprentice/inspection-testing-hub';
  };

  useEffect(() => {
    const loadQuiz = async () => {
      if (!id) { setError('No quiz ID provided'); setQuizState('error'); return; }
      try {
        const assessmentData = getAssessmentById(id);
        if (!assessmentData) { setError(`Quiz "${id}" not found`); setQuizState('error'); return; }
        setAssessment(assessmentData);
        const questionData = getRandomQuestions(id, 20);
        if (!questionData || questionData.length === 0) { setError(`No questions available for "${assessmentData.title}".`); setQuizState('error'); return; }
        setQuestions(questionData);
        setQuizState('ready');
      } catch (err) {
        setError('Failed to load quiz. Please try again.');
        setQuizState('error');
      }
    };
    loadQuiz();
  }, [id]);

  const handleStartQuiz = () => setQuizState('in-progress');

  const handleQuizComplete = async (quizResult: QuizResult, quizAnswers?: QuizAnswer[]) => {
    setResult(quizResult);
    if (quizAnswers) setAnswers(quizAnswers);
    if (assessment) {
      await completeQuiz({ result: quizResult, assessmentId: assessment.id, sessionId: `session-${Date.now()}` });
    }
    if (quizResult.percentage >= 70) { setShowCelebration(true); } else { setQuizState('results'); }
  };

  const handleExit = () => navigate(getBackPath());
  const handleCelebrationComplete = () => { setShowCelebration(false); setQuizState('results'); };

  const handleRetake = () => {
    if (id) { const newQuestions = getRandomQuestions(id, 20); setQuestions(newQuestions); }
    setResult(null); setAnswers([]); setShowCelebration(false); setQuizState('ready');
  };

  const handleBackToHub = () => navigate(getBackPath());

  // Loading
  if (quizState === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
      </div>
    );
  }

  // Error
  if (quizState === 'error') {
    return (
      <div className="min-h-screen bg-background px-4 pt-20">
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 text-center space-y-4 max-w-md mx-auto">
          <AlertCircle className="h-10 w-10 text-red-400 mx-auto" />
          <p className="text-sm text-white">{error}</p>
          <Button onClick={handleBackToHub} className="bg-yellow-400 text-black hover:bg-yellow-300 h-11 rounded-xl touch-manipulation">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Hub
          </Button>
        </div>
      </div>
    );
  }

  // Ready — clean intro
  if (quizState === 'ready' && assessment) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
          <div className="px-4 py-2">
            <div className="flex items-center gap-3 h-11">
              <Button variant="ghost" size="icon" onClick={handleBackToHub} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-base font-semibold text-white">{assessment.title}</h1>
            </div>
          </div>
        </div>

        <div className="px-4 py-6 space-y-5">
          <div className="text-center space-y-3">
            <p className="text-sm text-white">{assessment.description}</p>
            {assessment.regulation && (
              <span className="text-[11px] font-bold text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full">{assessment.regulation}</span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/[0.06] border border-white/[0.12] p-4 text-center">
              <BookOpen className="h-4 w-4 text-yellow-400 mx-auto mb-2" />
              <p className="text-xl font-black text-white">{questions.length}</p>
              <p className="text-[10px] text-white">Questions</p>
            </div>
            <div className="rounded-2xl bg-white/[0.06] border border-white/[0.12] p-4 text-center">
              <Clock className="h-4 w-4 text-yellow-400 mx-auto mb-2" />
              <p className="text-xl font-black text-white">No</p>
              <p className="text-[10px] text-white">Time Limit</p>
            </div>
            <div className="rounded-2xl bg-white/[0.06] border border-white/[0.12] p-4 text-center">
              <Target className="h-4 w-4 text-yellow-400 mx-auto mb-2" />
              <p className="text-xl font-black text-white">70%</p>
              <p className="text-[10px] text-white">Pass Mark</p>
            </div>
          </div>

          <div className="rounded-2xl bg-white/[0.06] border border-white/[0.12] p-4 space-y-2">
            {[
              'Questions randomly selected from a verified bank of 50',
              'Correct answer and explanation shown after each question',
              'Wrong answers reviewed with regulation references at the end',
              'Take as long as you need — this is a learning tool, not an exam',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-xs text-white">{item}</p>
              </div>
            ))}
          </div>

          <Button
            onClick={handleStartQuiz}
            className="w-full h-12 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold rounded-xl touch-manipulation active:scale-[0.98] text-sm"
          >
            Start Quiz
          </Button>
        </div>
      </div>
    );
  }

  // In-progress
  if (quizState === 'in-progress' && assessment) {
    return <EnhancedQuizInterface assessment={assessment} questions={questions} onComplete={handleQuizComplete} onExit={handleExit} />;
  }

  // Celebration
  if (showCelebration && result && result.percentage >= 70) {
    return <QuizPassCelebration score={result.percentage} onContinue={handleCelebrationComplete} />;
  }

  // Results
  if (quizState === 'results' && result && assessment) {
    return (
      <EnhancedQuizResults
        result={result}
        assessment={assessment}
        questions={questions}
        answers={answers}
        onRetake={handleRetake}
        onBackToHub={handleBackToHub}
        onReviewAnswers={() => {}}
        onTakeAnother={handleBackToHub}
        onViewAnalytics={handleBackToHub}
      />
    );
  }

  return null;
};

export default QuizPage;
