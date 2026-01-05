import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { quizData } from '@/data/upskilling/emergencyLightingModule4Section2QuizData';

export const SystemSelectionQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(quizData.length).fill(''));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(Array(quizData.length).fill(''));
    setShowResults(false);
    setScore(0);
  };

  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  if (showResults) {
    const percentage = (score / quizData.length) * 100;
    const passed = percentage >= 70;

    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${passed ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
              {passed ? (
                <CheckCircle2 className="h-12 w-12 text-green-400" />
              ) : (
                <XCircle className="h-12 w-12 text-red-400" />
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {passed ? 'Congratulations!' : 'Keep Learning'}
              </h3>
              <p className="text-gray-300">
                You scored {score} out of {quizData.length} ({percentage.toFixed(0)}%)
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {quizData.map((question, index) => {
              const isCorrect = selectedAnswers[index] === question.correctAnswer;
              return (
                <div key={index} className={`border rounded-lg p-4 ${isCorrect ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
                  <div className="flex items-start gap-3 mb-2">
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-foreground font-medium mb-2">Question {index + 1}: {question.question}</p>
                      {!isCorrect && (
                        <>
                          <p className="text-red-400 text-sm mb-1">Your answer: {selectedAnswers[index]}</p>
                          <p className="text-green-400 text-sm mb-2">Correct answer: {question.correctAnswer}</p>
                        </>
                      )}
                      <p className="text-gray-300 text-sm">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Button 
            onClick={resetQuiz}
            className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground">Knowledge Check Quiz</CardTitle>
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Question {currentQuestion + 1} of {quizData.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">{question.question}</h3>
          <RadioGroup value={selectedAnswers[currentQuestion]} onValueChange={handleAnswerSelect}>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 bg-elec-dark/50 p-4 rounded-lg border border-gray-700 hover:border-elec-yellow/50 transition-colors">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="text-foreground cursor-pointer flex-1">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-elec-light hover:bg-elec-gray"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedAnswers[currentQuestion]}
            className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          >
            {currentQuestion === quizData.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
