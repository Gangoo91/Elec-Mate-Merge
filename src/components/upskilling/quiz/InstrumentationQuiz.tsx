import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface InstrumentationQuizProps {
  questions: QuizQuestion[];
  title?: string;
}

const InstrumentationQuiz: React.FC<InstrumentationQuizProps> = ({ 
  questions, 
  title = "Knowledge Check" 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = selectedAnswer;
    setUserAnswers(newAnswers);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsQuizComplete(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setUserAnswers([]);
    setIsQuizComplete(false);
  };

  const getScore = () => {
    return userAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length;
  };

  const getScorePercentage = () => {
    return Math.round((getScore() / questions.length) * 100);
  };

  if (isQuizComplete) {
    const score = getScore();
    const percentage = getScorePercentage();
    
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div className="text-center space-y-4">
            <div className="text-3xl font-bold text-elec-yellow">
              {score}/{questions.length}
            </div>
            <div className="text-xl">
              {percentage}% Score
            </div>
            <div className="text-lg">
              {percentage >= 80 ? (
                <span className="text-green-400">Excellent work! 🎉</span>
              ) : percentage >= 60 ? (
                <span className="text-yellow-400">Good effort! 👍</span>
              ) : (
                <span className="text-red-400">Keep studying! 📚</span>
              )}
            </div>
            <Button 
              onClick={handleRestartQuiz}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
          
          <div className="space-y-3 mt-6">
            <h4 className="text-foreground font-semibold">Review Your Answers:</h4>
            {questions.map((question, index) => (
              <div key={question.id} className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="font-semibold mb-2">{index + 1}. {question.question}</p>
                <div className="text-sm space-y-1">
                  <div className={`flex items-center gap-2 ${
                    userAnswers[index] === question.correctAnswer ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {userAnswers[index] === question.correctAnswer ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    Your answer: {question.options[userAnswers[index]]}
                  </div>
                  {userAnswers[index] !== question.correctAnswer && (
                    <div className="text-green-400 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Correct answer: {question.options[question.correctAnswer]}
                    </div>
                  )}
                  <p className="text-gray-400 mt-2">{question.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
          {title}
        </CardTitle>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <div className="w-full max-w-xs bg-gray-600 rounded-full h-2 ml-4">
            <div 
              className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">{question.question}</h3>
          
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-3 text-left rounded border transition-all duration-200 ${
                  selectedAnswer === index
                    ? showResult
                      ? index === question.correctAnswer
                        ? 'bg-green-900/50 border-green-500 text-green-300'
                        : 'bg-red-900/50 border-red-500 text-red-300'
                      : 'bg-elec-yellow/20 border-elec-yellow text-foreground'
                    : showResult && index === question.correctAnswer
                      ? 'bg-green-900/50 border-green-500 text-green-300'
                      : 'bg-elec-dark border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                  {showResult && (
                    <div className="ml-auto">
                      {index === question.correctAnswer ? (
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                      ) : selectedAnswer === index ? (
                        <XCircle className="h-5 w-5 text-red-400" />
                      ) : null}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className="bg-blue-900/20 p-4 rounded border border-blue-600/30">
              <h4 className="text-elec-yellow font-semibold mb-2">Explanation:</h4>
              <p className="text-sm">{question.explanation}</p>
            </div>
          )}

          <div className="flex justify-between">
            <div className="text-sm text-gray-400">
              {showResult && selectedAnswer === question.correctAnswer ? (
                <span className="text-green-400">✓ Correct!</span>
              ) : showResult && selectedAnswer !== question.correctAnswer ? (
                <span className="text-red-400">✗ Incorrect</span>
              ) : (
                <span>Select your answer</span>
              )}
            </div>
            <div className="space-x-2">
              {!showResult ? (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-elec-yellow text-elec-dark hover:bg-yellow-600 disabled:opacity-50"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  onClick={handleNextQuestion}
                  className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstrumentationQuiz;