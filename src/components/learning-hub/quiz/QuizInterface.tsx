import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { QuizQuestion, Assessment } from '@/types/quiz';
import { useQuizSession } from '@/hooks/useQuizSession';

interface QuizInterfaceProps {
  assessment: Assessment;
  questions: QuizQuestion[];
  onComplete: (result: any) => void;
  onExit: () => void;
}

const QuizInterface = ({ assessment, questions, onComplete, onExit }: QuizInterfaceProps) => {
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

  // Start quiz on component mount
  useEffect(() => {
    startQuiz(assessment.id, questions);
    setQuestionStartTime(Date.now());
  }, [startQuiz, assessment.id, questions]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTotalElapsed(prev => prev + 1);
      setTimeElapsed(totalElapsed);
    }, 1000);

    return () => clearInterval(timer);
  }, [totalElapsed, setTimeElapsed]);

  // Reset selected answer when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setQuestionStartTime(Date.now());
  }, [getProgress().current]);

  const currentQuestion = getCurrentQuestion();
  const progress = getProgress();

  if (!currentQuestion || !currentSession) {
    return null;
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
      // Quiz completed
      const result = finishQuiz();
      if (result) {
        onComplete(result);
      }
    }
  };

  const handlePrevious = () => {
    previousQuestion();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Advanced': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-white/80 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-elec-yellow">{assessment.title}</h1>
            <p className="text-white/80">{assessment.description}</p>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-white">
              <Clock className="h-4 w-4" />
              <span>{formatTime(totalElapsed)}</span>
            </div>
            <Button variant="outline" onClick={onExit} className="border-gray-600 text-white">
              Exit Quiz
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/80">
              Question {progress.current} of {progress.total}
            </span>
            <span className="text-sm text-white/80">
              {progress.percentage}% Complete
            </span>
          </div>
          <Progress value={progress.percentage} className="w-full" />
        </div>

        {/* Question Card */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle className="text-foreground text-lg text-center">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                    selectedAnswer === index
                      ? 'border-elec-yellow bg-elec-yellow/10 text-foreground'
                      : 'border-border bg-muted text-white hover:border-neutral-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? 'border-elec-yellow bg-elec-yellow'
                        : 'border-neutral-500'
                    }`}>
                      {selectedAnswer === index && (
                        <CheckCircle className="h-4 w-4 text-black" />
                      )}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="pt-6 border-t border-border space-y-4">
              <div className="text-center">
                <p className="text-sm text-white/80">
                  Category: <span className="text-foreground">{currentQuestion.category}</span>
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={progress.current === 1}
                  className="border-border text-white disabled:opacity-50 min-w-[100px]"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90 disabled:opacity-50 min-w-[100px]"
                >
                  {progress.current === progress.total ? 'Finish Quiz' : 'Next'}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="text-center text-sm text-white/60">
          <p>Take your time and read each question carefully. You can navigate back to previous questions.</p>
        </div>
      </div>
    </div>
  );
};

export default QuizInterface;