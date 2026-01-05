import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw, Play } from 'lucide-react';
import { bmsDashboardsQuizData } from '@/data/upskilling/bmsDashboardsQuizData';

const BMSDashboardsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < bmsDashboardsQuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
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
    setQuizStarted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === bmsDashboardsQuizData[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    const percentage = (score / bmsDashboardsQuizData.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (!quizStarted) {
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Play className="h-5 w-5 text-elec-yellow" />
            BMS Dashboards & Visualisation Quiz
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <p>Test your knowledge of BMS dashboard design principles and visualisation platforms.</p>
          <div className="flex gap-4">
            <Badge variant="secondary" className="bg-elec-yellow text-elec-dark">
              10 Questions
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              ~8 minutes
            </Badge>
          </div>
          <Button 
            onClick={() => setQuizStarted(true)}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
          >
            <Play className="mr-2 h-4 w-4" />
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / bmsDashboardsQuizData.length) * 100);

    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}/{bmsDashboardsQuizData.length}
            </div>
            <div className={`text-xl ${getScoreColor(score)}`}>
              {percentage}%
            </div>
          </div>

          <div className="space-y-4">
            {bmsDashboardsQuizData.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="bg-elec-dark p-4 rounded-md border border-gray-600">
                  <div className="flex items-start gap-3 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-foreground font-medium mb-1">
                        Question {index + 1}: {question.question}
                      </p>
                      <p className="text-gray-400 text-sm mb-1">
                        Your answer: {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-green-400 text-sm mb-1">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                      <p className="text-gray-300 text-sm">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Button onClick={handleRestart} className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-600">
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = bmsDashboardsQuizData[currentQuestion];
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-foreground">
            Question {currentQuestion + 1} of {bmsDashboardsQuizData.length}
          </CardTitle>
          <Badge variant="outline" className="border-gray-600 text-gray-300">
            {Math.round(((currentQuestion + 1) / bmsDashboardsQuizData.length) * 100)}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p className="text-lg text-foreground">{question.question}</p>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-md border transition-colors ${
                selectedAnswers[currentQuestion] === index
                  ? 'border-elec-yellow bg-elec-yellow/10 text-foreground'
                  : 'border-gray-600 bg-elec-dark hover:border-gray-500'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-elec-gray disabled:opacity-50"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!hasAnswered}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600 disabled:opacity-50"
          >
            {currentQuestion === bmsDashboardsQuizData.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BMSDashboardsQuiz;