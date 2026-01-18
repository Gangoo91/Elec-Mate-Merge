import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getAssessmentById } from '@/data/quizAssessments';
import { getRandomQuestions } from '@/data/learning-hub-quiz';
import EnhancedQuizInterface from '@/components/learning-hub/quiz/EnhancedQuizInterface';
import EnhancedQuizResults from '@/components/learning-hub/quiz/EnhancedQuizResults';
import QuizPassCelebration from '@/components/learning-hub/quiz/QuizPassCelebration';
import { QuizResult, QuizAnswer, QuizQuestion, Assessment } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, AlertCircle, Loader2, BookOpen, Clock, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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

  // Determine where to navigate back to
  const getBackPath = (): string => {
    const fromPath = (location.state as { from?: string })?.from;
    if (fromPath) return fromPath;
    return '/apprentice/inspection-testing-hub';
  };

  const getBackText = (): string => {
    return 'Back to Learning Hub';
  };

  useEffect(() => {
    const loadQuiz = async () => {
      if (!id) {
        setError('No quiz ID provided');
        setQuizState('error');
        return;
      }

      try {
        // Load assessment metadata
        const assessmentData = getAssessmentById(id);
        if (!assessmentData) {
          setError(`Quiz "${id}" not found`);
          setQuizState('error');
          return;
        }
        setAssessment(assessmentData);

        // Load questions from question bank
        const questionData = getRandomQuestions(id, 20);
        if (!questionData || questionData.length === 0) {
          setError(`No questions available for "${assessmentData.title}". Question bank is being developed.`);
          setQuizState('error');
          return;
        }

        setQuestions(questionData);
        setQuizState('ready');
      } catch (err) {
        console.error('Error loading quiz:', err);
        setError('Failed to load quiz. Please try again.');
        setQuizState('error');
      }
    };

    loadQuiz();
  }, [id]);

  const handleStartQuiz = () => {
    setQuizState('in-progress');
  };

  const handleQuizComplete = async (quizResult: QuizResult, quizAnswers?: QuizAnswer[]) => {
    setResult(quizResult);
    if (quizAnswers) {
      setAnswers(quizAnswers);
    }

    // Track quiz completion in learning system (streak, XP, achievements)
    if (assessment) {
      await completeQuiz({
        result: quizResult,
        assessmentId: assessment.id,
        sessionId: `session-${Date.now()}`
      });
    }

    // Show celebration for passing scores (70%+)
    if (quizResult.percentage >= 70) {
      setShowCelebration(true);
    } else {
      setQuizState('results');
    }
  };

  const handleExit = () => {
    navigate(getBackPath());
  };

  const handleCelebrationComplete = () => {
    setShowCelebration(false);
    setQuizState('results');
  };

  const handleRetake = () => {
    if (id) {
      const newQuestions = getRandomQuestions(id, 20);
      setQuestions(newQuestions);
    }
    setResult(null);
    setAnswers([]);
    setShowCelebration(false);
    setQuizState('ready');
  };

  const handleBackToHub = () => {
    navigate(getBackPath());
  };

  const handleReviewAnswers = () => {
    setQuizState('review');
  };

  const handleTakeAnother = () => {
    navigate(getBackPath());
  };

  const handleViewAnalytics = () => {
    navigate(getBackPath());
  };

  const handleBackFromReview = () => {
    setQuizState('results');
  };

  // Loading state
  if (quizState === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-elec-yellow" />
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (quizState === 'error') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto pt-20">
          <Card className="border-destructive/50">
            <CardContent className="p-6 text-center space-y-4">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
              <h2 className="text-xl font-semibold">Quiz Not Available</h2>
              <p className="text-muted-foreground">{error}</p>
              <Button
                onClick={handleBackToHub}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {getBackText()}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Ready state - show start screen
  if (quizState === 'ready' && assessment) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto pt-8 sm:pt-16 space-y-6">
          {/* Back button */}
          <Button
            variant="outline"
            onClick={handleBackToHub}
            className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black min-h-[44px] touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {getBackText()}
          </Button>

          {/* Quiz info card */}
          <Card className="border-2 overflow-hidden">
            <div className="bg-gradient-to-r from-elec-yellow/10 to-amber-600/10 p-6 sm:p-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-elec-yellow/20 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-elec-yellow" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {assessment.title}
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto">
                  {assessment.description}
                </p>
                {assessment.regulation && (
                  <Badge variant="outline" className="border-elec-yellow/50 text-elec-yellow">
                    {assessment.regulation}
                  </Badge>
                )}
              </div>
            </div>

            <CardContent className="p-6 sm:p-8 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <BookOpen className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-2xl font-bold text-foreground">{questions.length}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Questions</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Clock className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-2xl font-bold text-foreground">{assessment.duration}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Minutes</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Target className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-2xl font-bold text-foreground">70%</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Pass Mark</p>
                </div>
              </div>

              {/* Info points */}
              <div className="space-y-3 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-elec-yellow"></span>
                  Questions are randomly selected from our verified GN3 question bank
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-elec-yellow"></span>
                  Detailed explanations provided with BS 7671 regulation references
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-elec-yellow"></span>
                  Review your answers and learn from any mistakes
                </p>
              </div>

              {/* Start button */}
              <Button
                onClick={handleStartQuiz}
                size="lg"
                className="w-full min-h-[56px] bg-elec-yellow text-black hover:bg-elec-yellow/90 text-lg font-semibold touch-manipulation active:scale-[0.98] transition-transform"
              >
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // In-progress state
  if (quizState === 'in-progress' && assessment) {
    return (
      <EnhancedQuizInterface
        assessment={assessment}
        questions={questions}
        onComplete={handleQuizComplete}
        onExit={handleExit}
      />
    );
  }

  // Celebration state (shown before results for passing scores)
  if (showCelebration && result && result.percentage >= 70) {
    return (
      <QuizPassCelebration
        score={result.percentage}
        onContinue={handleCelebrationComplete}
      />
    );
  }

  // Results state
  if (quizState === 'results' && result && assessment) {
    return (
      <div className="min-h-screen bg-background py-4 sm:py-8">
        <EnhancedQuizResults
          result={result}
          assessment={assessment}
          questions={questions}
          answers={answers}
          onRetake={handleRetake}
          onBackToHub={handleBackToHub}
          onReviewAnswers={handleReviewAnswers}
          onTakeAnother={handleTakeAnother}
          onViewAnalytics={handleViewAnalytics}
        />
      </div>
    );
  }

  // Review state - simple review for now
  if (quizState === 'review' && assessment) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <Button
            variant="outline"
            onClick={handleBackFromReview}
            className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black min-h-[44px] touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Results
          </Button>

          <h2 className="text-2xl font-bold">Review Your Answers</h2>

          <div className="space-y-4">
            {questions.map((question, index) => {
              const answer = answers.find(a => a.questionId === question.id);
              const isCorrect = answer?.isCorrect;

              return (
                <Card key={question.id} className={`border-2 ${isCorrect ? 'border-green-500/30' : 'border-red-500/30'}`}>
                  <CardContent className="p-4 sm:p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {index + 1}
                      </span>
                      <div className="space-y-3 flex-1">
                        <p className="font-medium">{question.question}</p>

                        <div className="space-y-2">
                          {question.options.map((option, optIndex) => {
                            const isSelected = answer?.selectedAnswer === optIndex;
                            const isCorrectOption = optIndex === question.correctAnswer;

                            return (
                              <div
                                key={optIndex}
                                className={`p-3 rounded-lg text-sm ${
                                  isCorrectOption
                                    ? 'bg-green-500/20 border border-green-500/30'
                                    : isSelected && !isCorrectOption
                                      ? 'bg-red-500/20 border border-red-500/30'
                                      : 'bg-muted/30'
                                }`}
                              >
                                {option}
                                {isCorrectOption && <span className="ml-2 text-green-400">(Correct)</span>}
                                {isSelected && !isCorrectOption && <span className="ml-2 text-red-400">(Your answer)</span>}
                              </div>
                            );
                          })}
                        </div>

                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                          {question.regulation && (
                            <p className="text-xs text-elec-yellow mt-2">
                              Reference: {question.regulation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="h-8" />
        </div>
      </div>
    );
  }

  return null;
};

export default QuizPage;
