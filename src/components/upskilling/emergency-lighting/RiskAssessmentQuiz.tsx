import { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { riskAssessmentQuizQuestions } from '@/data/upskilling/emergencyLightingModule6Section3QuizData';

export const RiskAssessmentQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(riskAssessmentQuizQuestions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < riskAssessmentQuizQuestions.length - 1) {
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
    setSelectedAnswers(new Array(riskAssessmentQuizQuestions.length).fill(-1));
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === riskAssessmentQuizQuestions[index].correct ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    const percentage = (score / riskAssessmentQuizQuestions.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / riskAssessmentQuizQuestions.length) * 100;

    return (
      <Card className="bg-gradient-to-br from-elec-gray to-[#1a1a1a] border border-gray-600 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-elec-yellow drop-shadow-md" />
            Quiz Results: Emergency Lighting in Risk Assessments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className={`text-4xl font-bold ${getScoreColor(score)} mb-2`}>
              {score}/{riskAssessmentQuizQuestions.length}
            </div>
            <div className={`text-2xl ${getScoreColor(score)} mb-4`}>
              {percentage.toFixed(0)}%
            </div>
            <p className="text-gray-300">
              {percentage >= 80 ? 'Excellent work! You understand how risk assessments drive emergency lighting design.' :
               percentage >= 60 ? 'Good effort! Review the risk assessment principles and try again.' :
               'Keep studying! Review the section content and retake the quiz.'}
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {riskAssessmentQuizQuestions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correct;
              
              return (
                <div key={question.id} className="p-4 bg-gradient-to-br from-gray-700/50 to-gray-800/30 border border-gray-600/50 rounded-lg">
                  <div className="flex items-start gap-3 mb-2">
                    {isCorrect ? 
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" /> : 
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    }
                    <div className="flex-1">
                      <p className="text-foreground font-medium mb-2">{question.question}</p>
                      <p className="text-sm text-gray-300 mb-2">
                        <span className="font-medium">Your answer:</span> {question.options[userAnswer]} 
                        {!isCorrect && (
                          <span className="text-red-400"> ✗</span>
                        )}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-gray-300 mb-2">
                          <span className="font-medium">Correct answer:</span> {question.options[question.correct]} ✓
                        </p>
                      )}
                      <p className="text-sm text-gray-400">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button onClick={handleRestart} className="bg-elec-yellow text-elec-dark hover:bg-yellow-600">
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = riskAssessmentQuizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / riskAssessmentQuizQuestions.length) * 100;

  return (
    <Card className="bg-gradient-to-br from-elec-gray to-[#1a1a1a] border border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow drop-shadow-md" />
          Quiz: Emergency Lighting in Risk Assessments
        </CardTitle>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-gray-300 text-sm">
          Question {currentQuestion + 1} of {riskAssessmentQuizQuestions.length}
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-foreground text-lg font-semibold mb-4">{question.question}</h3>
          
          <RadioGroup 
            value={selectedAnswers[currentQuestion]?.toString()} 
            onValueChange={(value) => handleAnswerSelect(parseInt(value))}
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-700/30 transition-colors">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="text-gray-300 cursor-pointer flex-1">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between">
          <Button 
            onClick={handlePrevious} 
            disabled={currentQuestion === 0}
            variant="outline" 
            className="border-gray-600 text-foreground hover:bg-gray-700"
          >
            Previous
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === -1}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
          >
            {currentQuestion === riskAssessmentQuizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
