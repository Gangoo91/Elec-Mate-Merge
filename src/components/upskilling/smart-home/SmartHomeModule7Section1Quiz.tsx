import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Award, RotateCcw } from 'lucide-react';
import { smartHomeModule7Section1QuizData } from '@/data/upskilling/smartHomeModule7Section1QuizData';

const SmartHomeModule7Section1Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = smartHomeModule7Section1QuizData.questions;
  const currentQ = questions[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
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

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  if (showResults) {
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Award className="h-6 w-6 text-elec-yellow" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-elec-yellow">
              {score}/{questions.length}
            </div>
            <div className="text-xl text-foreground">
              {percentage}% Complete
            </div>
            <div className={`text-lg ${percentage >= 80 ? 'text-green-400' : percentage >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
              {percentage >= 80 ? 'Excellent Work!' : percentage >= 60 ? 'Good Effort!' : 'Needs Improvement'}
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={index} className="bg-elec-dark/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-start gap-3">
                  {selectedAnswers[index] === question.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-foreground font-medium mb-2">
                      Question {index + 1}: {question.question}
                    </p>
                    <p className="text-gray-300 text-sm mb-2">
                      Your answer: {question.options[selectedAnswers[index]]}
                    </p>
                    {selectedAnswers[index] !== question.correctAnswer && (
                      <p className="text-green-300 text-sm mb-2">
                        Correct answer: {question.options[question.correctAnswer]}
                      </p>
                    )}
                    <p className="text-gray-400 text-sm">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={resetQuiz}
            className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-500"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Award className="h-6 w-6 text-elec-yellow" />
          Section Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <Progress 
            value={((currentQuestion + 1) / questions.length) * 100} 
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            {currentQ.question}
          </h3>
          
          <div className="space-y-2">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full text-left justify-start p-4 h-auto whitespace-normal transition-all ${
                  selectedAnswers[currentQuestion] === index
                    ? 'bg-elec-yellow/20 border-elec-yellow text-foreground'
                    : 'border-gray-600 text-gray-300 hover:bg-elec-dark hover:text-foreground hover:border-elec-yellow'
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <span className="flex-1">{option}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-elec-gray hover:text-foreground disabled:opacity-50"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-500 disabled:opacity-50"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section1Quiz;