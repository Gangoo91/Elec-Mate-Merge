import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
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
      if (answer === questions[index]?.correctAnswer) {
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
  const isCorrect = selectedAnswers[currentQuestion] === currentQ?.correctAnswer;

  if (quizCompleted) {
    const score = getScore();
    const percentage = getScorePercentage();
    const passed = percentage >= 70;

    return (
      <Card className="bg-elec-card border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <Target className="h-5 w-5" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className={`text-6xl font-bold ${passed ? 'text-green-400' : 'text-red-400'}`}>
            {percentage}%
          </div>
          <div>
            <p className="text-lg text-gray-300 mb-2">
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
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-card border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-elec-yellow">
          <Target className="h-5 w-5" />
          {title}
        </CardTitle>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <div className="flex gap-1 items-center">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  index < currentQuestion 
                    ? 'bg-green-400' 
                    : index === currentQuestion 
                    ? 'bg-elec-yellow' 
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-4">
            {currentQ?.question}
          </h3>
          <div className="space-y-3">
            {currentQ?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? showResult
                      ? index === currentQ.correctAnswer
                        ? 'bg-green-500/20 border-green-400/50 text-green-300'
                        : 'bg-red-500/20 border-red-400/50 text-red-300'
                      : 'bg-elec-yellow/20 border-elec-yellow/50 text-elec-yellow'
                    : showResult && index === currentQ.correctAnswer
                    ? 'bg-green-500/20 border-green-400/50 text-green-300'
                    : 'bg-elec-gray/30 border-elec-gray hover:border-elec-yellow/30 text-gray-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedAnswers[currentQuestion] === index
                      ? showResult
                        ? index === currentQ.correctAnswer
                          ? 'border-green-400 bg-green-400'
                          : 'border-red-400 bg-red-400'
                        : 'border-elec-yellow bg-elec-yellow'
                      : showResult && index === currentQ.correctAnswer
                      ? 'border-green-400 bg-green-400'
                      : 'border-gray-400 bg-transparent'
                   }`}>
                    {selectedAnswers[currentQuestion] === index && !showResult && (
                      <div className="w-3 h-3 rounded-full bg-elec-dark"></div>
                    )}
                    {showResult && (
                      <>
                        {index === currentQ.correctAnswer ? (
                          <CheckCircle className="h-4 w-4 text-white" />
                        ) : selectedAnswers[currentQuestion] === index ? (
                          <XCircle className="h-4 w-4 text-white" />
                        ) : null}
                      </>
                    )}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {showResult && currentQ?.explanation && (
          <div className={`p-4 rounded-lg border ${
            isCorrect 
              ? 'bg-green-500/10 border-green-400/30 text-green-300' 
              : 'bg-blue-500/10 border-blue-400/30 text-blue-300'
          }`}>
            <p className="font-medium mb-2">
              {isCorrect ? '✓ Correct!' : 'ℹ Explanation:'}
            </p>
            <p className="text-sm">{currentQ.explanation}</p>
          </div>
        )}

        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow hover:text-elec-dark disabled:opacity-50"
          >
            Previous
          </Button>
          
          <div className="flex gap-2">
            {!showResult && isAnswered && (
              <Button
                onClick={handleSubmitAnswer}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Submit Answer
              </Button>
            )}
            
            {showResult && (
              <Button
                onClick={handleNext}
                className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
              >
                {currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next Question'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};