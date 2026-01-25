import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Target } from 'lucide-react';
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

export const Quiz: React.FC<QuizProps> = ({ questions, title = "Quick Quiz" }) => {
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
    const index = question.options.findIndex(opt => opt === question.correctAnswer);
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
      <div className="py-8">
        <div className="flex items-center gap-2 text-elec-yellow mb-6">
          <Target className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Quiz Complete!</h2>
        </div>

        <div className="text-center space-y-6">
          <div className={`text-6xl font-bold ${passed ? 'text-green-400' : 'text-red-400'}`}>
            {percentage}%
          </div>
          <div>
            <p className="text-lg text-white mb-3">
              You scored {score} out of {questions.length} questions correctly
            </p>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              passed
                ? 'bg-green-500/20 border border-green-400/30 text-green-300'
                : 'bg-red-500/20 border border-red-400/30 text-red-300'
            }`}>
              {passed ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Passed!</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5" />
                  <span className="font-medium">Review Required</span>
                </>
              )}
            </div>
          </div>
          <Button
            onClick={restartQuiz}
            variant="outline"
            className="border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow hover:text-elec-dark"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-8">
      {/* Header - Stacks on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div className="flex items-center gap-2 text-elec-yellow">
          <Target className="h-5 w-5 sm:h-6 sm:w-6" />
          <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-sm text-white">Question {currentQuestion + 1} of {questions.length}</span>
          <div className="flex gap-1.5 items-center">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0 transition-colors ${
                  index < currentQuestion
                    ? 'bg-green-400'
                    : index === currentQuestion
                    ? 'bg-elec-yellow'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="space-y-5 sm:space-y-6">
        <h3 className="text-base sm:text-lg font-medium text-white leading-relaxed">
          {currentQ?.question}
        </h3>

        {/* Options - Touch-friendly with min 48px height */}
        <div className="space-y-3">
          {currentQ?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full min-h-[52px] p-4 text-left rounded-xl border-2 transition-all duration-200 active:scale-[0.98] touch-manipulation ${
                selectedAnswers[currentQuestion] === index
                  ? showResult
                    ? index === correctIndex
                      ? 'bg-green-500/20 border-green-400/50 text-green-300'
                      : 'bg-red-500/20 border-red-400/50 text-red-300'
                    : 'bg-elec-yellow/20 border-elec-yellow/50 text-elec-yellow'
                  : showResult && index === correctIndex
                  ? 'bg-green-500/20 border-green-400/50 text-green-300'
                  : 'border-white/10 hover:border-elec-yellow/30 active:bg-white/5 text-white'
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`w-7 h-7 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedAnswers[currentQuestion] === index
                    ? showResult
                      ? index === correctIndex
                        ? 'border-green-400 bg-green-400'
                        : 'border-red-400 bg-red-400'
                      : 'border-elec-yellow bg-elec-yellow'
                    : showResult && index === correctIndex
                    ? 'border-green-400 bg-green-400'
                    : 'border-white/40 bg-transparent'
                 }`}>
                  {selectedAnswers[currentQuestion] === index && !showResult && (
                    <div className="w-3 h-3 rounded-full bg-[#1a1a1a]"></div>
                  )}
                  {showResult && (
                    <>
                      {index === correctIndex ? (
                        <CheckCircle className="h-4 w-4 text-white" />
                      ) : selectedAnswers[currentQuestion] === index ? (
                        <XCircle className="h-4 w-4 text-white" />
                      ) : null}
                    </>
                  )}
                </div>
                <span className="flex-1 text-sm sm:text-base leading-snug">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Explanation */}
        {showResult && currentQ?.explanation && (
          <div className={`p-4 rounded-xl border ${
            isCorrect
              ? 'bg-green-500/10 border-green-400/30 text-green-300'
              : 'bg-elec-yellow/10 border-elec-yellow/30 text-white'
          }`}>
            <p className="font-medium mb-2">
              {isCorrect ? '✓ Correct!' : 'Explanation:'}
            </p>
            <p className="text-sm leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}

        {/* Navigation - Full width buttons on mobile */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-4">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-elec-yellow disabled:opacity-50 touch-manipulation"
          >
            Previous
          </Button>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {!showResult && isAnswered && (
              <Button
                onClick={handleSubmitAnswer}
                size="lg"
                className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
              >
                Submit Answer
              </Button>
            )}

            {showResult && (
              <Button
                onClick={handleNext}
                size="lg"
                className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
              >
                {currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next Question'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
