import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuizQuestion {
  id?: number;
  question: string;
  options: string[];
  correctAnswer: number | string; // Support both index (number) and text (string) formats
  explanation?: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  title?: string;
}

export const Quiz: React.FC<QuizProps> = ({ questions, title = 'Quick Quiz' }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Helper to get correct answer index (handles both number and string formats)
  const getCorrectAnswerIndex = (question: QuizQuestion): number => {
    if (typeof question.correctAnswer === 'number') {
      return question.correctAnswer;
    }
    // If it's a string, find the index in options
    const index = question.options.findIndex((opt) => opt === question.correctAnswer);
    return index >= 0 ? index : 0;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowResult(false);
    }
  };

  const handleSubmitAnswer = () => {
    setShowResult(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setQuizCompleted(false);
  };

  const getScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === getCorrectAnswerIndex(questions[index])) {
        correct++;
      }
    });
    return correct;
  };

  const getScorePercentage = () => {
    return Math.round((getScore() / questions.length) * 100);
  };

  const currentQ = questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
  const correctIndex = currentQ ? getCorrectAnswerIndex(currentQ) : -1;
  const isCorrect = selectedAnswers[currentQuestion] === correctIndex;

  if (quizCompleted) {
    const score = getScore();
    const percentage = getScorePercentage();
    const passed = percentage >= 70;

    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-5">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Quiz complete
          </span>
          <h3 className="text-[20px] sm:text-[22px] font-semibold text-white leading-tight">
            Results
          </h3>
        </div>
        <div className="text-center space-y-4">
          <div className={`text-5xl font-bold ${passed ? 'text-elec-yellow' : 'text-red-300'}`}>
            {percentage}%
          </div>
          <p className="text-[14px] text-white/85 leading-relaxed">
            You scored {score} out of {questions.length} questions correctly
          </p>
          <div className="flex items-center justify-center gap-2">
            {passed ? (
              <>
                <CheckCircle className="h-4 w-4 text-elec-yellow" />
                <span className="text-[14px] text-white/85 font-medium">Passed</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-red-300" />
                <span className="text-[14px] text-white/85 font-medium">Review required</span>
              </>
            )}
          </div>
          <Button
            onClick={restartQuiz}
            variant="outline"
            className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          {title}
        </span>
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[12px] text-white/55 font-mono">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <div className="flex gap-1 items-center">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  index < currentQuestion
                    ? 'bg-white/40'
                    : index === currentQuestion
                      ? 'bg-elec-yellow'
                      : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-[16px] font-semibold text-white leading-snug">{currentQ?.question}</h3>
        <div className="space-y-2">
          {currentQ?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full p-3.5 text-left rounded-xl border transition-all duration-200 touch-manipulation ${
                selectedAnswers[currentQuestion] === index
                  ? showResult
                    ? index === correctIndex
                      ? 'bg-elec-yellow/[0.08] border-elec-yellow/40 text-white'
                      : 'bg-red-500/[0.08] border-red-500/40 text-white'
                    : 'bg-elec-yellow/[0.08] border-elec-yellow/40 text-white'
                  : showResult && index === correctIndex
                    ? 'bg-elec-yellow/[0.08] border-elec-yellow/40 text-white'
                    : 'bg-white/[0.02] border-white/[0.06] text-white/85'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                    selectedAnswers[currentQuestion] === index
                      ? showResult
                        ? index === correctIndex
                          ? 'border-elec-yellow bg-elec-yellow'
                          : 'border-red-400 bg-red-400'
                        : 'border-elec-yellow bg-elec-yellow'
                      : showResult && index === correctIndex
                        ? 'border-elec-yellow bg-elec-yellow'
                        : 'border-white/30 bg-transparent'
                  }`}
                >
                  {showResult && (
                    <>
                      {index === correctIndex ? (
                        <CheckCircle className="h-3.5 w-3.5 text-black" />
                      ) : selectedAnswers[currentQuestion] === index ? (
                        <XCircle className="h-3.5 w-3.5 text-white" />
                      ) : null}
                    </>
                  )}
                </div>
                <span className="flex-1 text-[14px]">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {showResult && currentQ?.explanation && (
        <div
          className={`rounded-xl border p-4 space-y-1 ${
            isCorrect
              ? 'border-elec-yellow/20 bg-elec-yellow/[0.04]'
              : 'border-white/[0.06] bg-white/[0.02]'
          }`}
        >
          <span
            className={`text-[10px] font-medium uppercase tracking-[0.18em] ${isCorrect ? 'text-elec-yellow/85' : 'text-white/55'}`}
          >
            {isCorrect ? 'Correct' : 'Explanation'}
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">{currentQ.explanation}</p>
        </div>
      )}

      <div className="flex justify-between gap-3 pt-2">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="outline"
          className="h-11 border-white/15 text-white hover:bg-white/[0.05] disabled:opacity-40 touch-manipulation"
        >
          Previous
        </Button>

        <div className="flex gap-2">
          {!showResult && isAnswered && (
            <Button
              onClick={handleSubmitAnswer}
              className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
            >
              Submit answer
            </Button>
          )}

          {showResult && (
            <Button
              onClick={handleNext}
              className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
            >
              {currentQuestion === questions.length - 1 ? 'Complete quiz' : 'Next question'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
