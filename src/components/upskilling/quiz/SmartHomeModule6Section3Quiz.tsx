import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { smartHomeModule6Section3QuizQuestions } from '@/data/upskilling/smartHomeModule6Section3QuizData';

const SmartHomeModule6Section3Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizCompleted) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < smartHomeModule6Section3QuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === smartHomeModule6Section3QuizQuestions[index].correct ? 1 : 0);
    }, 0);
  };

  const currentQ = smartHomeModule6Section3QuizQuestions[currentQuestion];
  const score = calculateScore();
  const totalQuestions = smartHomeModule6Section3QuizQuestions.length;

  if (showResults) {
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Quiz Results</h2>
          
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-elec-yellow mb-2">
              {score}/{totalQuestions}
            </div>
            <div className="text-xl text-foreground mb-4">
              {score >= 8 ? 'Excellent!' : score >= 6 ? 'Good work!' : 'Keep studying!'}
            </div>
            <div className="text-foreground">
              You scored {Math.round((score / totalQuestions) * 100)}%
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {smartHomeModule6Section3QuizQuestions.map((question, index) => (
              <Card key={index} className="bg-elec-dark/50 border-gray-600">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {selectedAnswers[index] === question.correct ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-foreground font-medium mb-2">
                        {index + 1}. {question.question}
                      </p>
                      <p className="text-sm text-elec-yellow mb-2">
                        Correct: {question.options[question.correct]}
                      </p>
                      {selectedAnswers[index] !== question.correct && (
                        <p className="text-sm text-red-300 mb-2">
                          Your answer: {question.options[selectedAnswers[index]]}
                        </p>
                      )}
                      <p className="text-sm text-foreground">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button onClick={handleRestart} className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-500">
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Knowledge Check</h2>
          <div className="text-foreground">
            Question {currentQuestion + 1} of {totalQuestions}
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-elec-dark rounded-full h-2 mb-4">
            <div 
              className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <Card className="bg-elec-dark/50 border-gray-600 mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              {currentQ.question}
            </h3>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded border transition-all duration-200 ${
                    selectedAnswers[currentQuestion] === index
                      ? 'bg-elec-yellow/20 border-elec-yellow text-foreground'
                      : 'bg-elec-gray border-gray-600 text-foreground hover:bg-elec-gray/80 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="flex-1 bg-transparent border-gray-600 text-foreground hover:bg-elec-gray disabled:opacity-50"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="flex-1 bg-elec-yellow text-elec-dark hover:bg-yellow-500 disabled:opacity-50"
          >
            {currentQuestion === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule6Section3Quiz;