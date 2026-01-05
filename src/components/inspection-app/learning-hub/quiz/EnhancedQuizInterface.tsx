import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  X,
  CheckCircle2,
  Circle,
  BookOpen,
  AlertCircle
} from 'lucide-react';
import { QuizQuestion, Assessment } from '@/types/quiz';
import { useQuizSession } from '@/hooks/useQuizSession';
import CategoryIcon from './CategoryIcon';

interface EnhancedQuizInterfaceProps {
  assessment: Assessment;
  questions: QuizQuestion[];
  onComplete: (result: any) => void;
  onExit: () => void;
}

const EnhancedQuizInterface = ({ 
  assessment, 
  questions, 
  onComplete, 
  onExit 
}: EnhancedQuizInterfaceProps) => {
  const {
    currentSession,
    startQuiz,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    finishQuiz,
    getCurrentQuestion,
    getProgress,
    setTimeElapsed
  } = useQuizSession();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Start quiz on mount
  useEffect(() => {
    startQuiz(assessment.id, questions);
    setQuestionStartTime(Date.now());
  }, []);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTotalElapsed(prev => prev + 1);
      setTimeElapsed(totalElapsed);
    }, 1000);
    return () => clearInterval(timer);
  }, [totalElapsed]);

  // Reset answer on question change
  useEffect(() => {
    setSelectedAnswer(null);
    setQuestionStartTime(Date.now());
  }, [getProgress().current]);

  const currentQuestion = getCurrentQuestion();
  const progress = getProgress();

  if (!currentQuestion || !currentSession) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-elec-yellow" />
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const timeSpent = Date.now() - questionStartTime;
    submitAnswer(currentQuestion.id, selectedAnswer, timeSpent);

    const hasNext = nextQuestion();
    if (!hasNext) {
      const result = finishQuiz();
      if (result) {
        onComplete(result);
      }
    }
  };

  const handlePrevious = () => {
    previousQuestion();
  };

  const handleExit = () => {
    if (showExitConfirm) {
      onExit();
    } else {
      setShowExitConfirm(true);
      setTimeout(() => setShowExitConfirm(false), 3000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-bs7671-safe bg-bs7671-safe/10 border-bs7671-safe/30';
      case 'Intermediate': return 'text-bs7671-warning bg-bs7671-warning/10 border-bs7671-warning/30';
      case 'Advanced': return 'text-bs7671-danger bg-bs7671-danger/10 border-bs7671-danger/30';
      default: return 'text-muted-foreground bg-muted/10 border-muted/30';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="bg-card border-b border-border shadow-lg">
        <div className="max-w-4xl mx-auto p-4">
          {/* Title Row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <CategoryIcon category={assessment.category} className="h-5 w-5 text-elec-yellow flex-shrink-0" />
              <h1 className="text-base sm:text-lg font-bold text-foreground truncate">
                {assessment.title}
              </h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExit}
              className={`flex-shrink-0 ${showExitConfirm ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}`}
            >
              <X className="h-4 w-4" />
              {showExitConfirm ? 'Confirm Exit' : ''}
            </Button>
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-between text-sm mb-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="font-mono font-medium">{formatTime(totalElapsed)}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${getDifficultyColor(currentQuestion.difficulty)}`}>
                  {currentQuestion.difficulty}
                </span>
              </div>
            </div>
            <div className="text-muted-foreground font-medium">
              <span className="text-elec-yellow">{progress.current}</span>
              <span className="mx-1">/</span>
              <span>{progress.total}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <Progress value={progress.percentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{progress.percentage}% Complete</span>
              <span>{progress.total - progress.current} remaining</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 pb-24">
        {/* Question Card */}
        <Card className="border-2 shadow-xl">
          <CardContent className="p-4 sm:p-8 space-y-5 sm:space-y-6">
            {/* Question Header */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow text-black flex items-center justify-center font-bold text-base">
                  {progress.current}
                </div>
                <div className="flex-1 space-y-2">
                  <h2 className="text-base sm:text-xl font-semibold text-foreground leading-relaxed">
                    {currentQuestion.question}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CategoryIcon category={currentQuestion.category} className="h-3.5 w-3.5" />
                      {currentQuestion.category}
                    </span>
                    {currentQuestion.regulation && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-mono text-elec-yellow/90">
                          <BookOpen className="h-3.5 w-3.5" />
                          {currentQuestion.regulation}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const optionLabels = ['A', 'B', 'C', 'D'];
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-3.5 sm:p-5 rounded-xl border-2 transition-all duration-200 group min-h-[60px] sm:min-h-[56px] active:scale-[0.98] ${
                      isSelected
                        ? 'border-elec-yellow bg-elec-yellow/5 shadow-lg scale-[1.02]'
                        : 'border-border hover:border-elec-yellow/50 hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Radio Button */}
                      <div className={`relative flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all ${
                        isSelected 
                          ? 'border-elec-yellow bg-elec-yellow' 
                          : 'border-muted-foreground group-hover:border-elec-yellow/70'
                      }`}>
                        {isSelected && (
                          <CheckCircle2 className="absolute inset-0 w-full h-full text-black" />
                        )}
                        {!isSelected && (
                          <Circle className="absolute inset-0 w-full h-full text-transparent" />
                        )}
                      </div>
                      
                      {/* Option Label & Text */}
                      <div className="flex-1 flex items-center gap-3">
                        <span className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-bold text-base ${
                          isSelected 
                            ? 'bg-elec-yellow text-black' 
                            : 'bg-muted text-muted-foreground group-hover:bg-elec-yellow/20 group-hover:text-elec-yellow'
                        }`}>
                          {optionLabels[index]}
                        </span>
                        <span className={`text-sm sm:text-base ${
                          isSelected ? 'text-foreground font-medium' : 'text-foreground'
                        }`}>
                          {option}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Help Text */}
            {selectedAnswer === null && (
              <div className="flex items-start gap-2 p-4 rounded-lg bg-muted/50 border border-border">
                <AlertCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Select an answer to continue to the next question
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border shadow-2xl pb-safe">
        <div className="max-w-4xl mx-auto p-3 sm:p-4">
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={progress.current === 1}
              className="flex-1 sm:flex-initial min-h-[52px] font-semibold px-4 sm:px-6"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Back</span>
            </Button>

            <Button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="flex-1 sm:flex-initial min-h-[52px] bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold disabled:opacity-50 shadow-lg px-4 sm:px-6"
            >
              {progress.current === progress.total ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Finish Quiz
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Next Question</span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedQuizInterface;
