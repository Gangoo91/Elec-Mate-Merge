import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const BS7671Module8Section1Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "What appendix lists Zs values?",
      options: [
        "Appendix 3",
        "Appendix 4", 
        "Appendix 12",
        "Appendix 14"
      ],
      correct: 3,
      explanation: "Appendix 14 contains the maximum earth fault loop impedance (Zs) values for different protective devices and disconnection times."
    },
    {
      question: "What is Ca a correction factor for?",
      options: [
        "Cable grouping",
        "Ambient temperature",
        "Installation method",
        "Circuit length"
      ],
      correct: 1,
      explanation: "Ca is the correction factor for ambient temperature, used when the installation temperature differs from the standard 30°C reference."
    },
    {
      question: "Which appendix covers volt drop limits?",
      options: [
        "Appendix 3",
        "Appendix 4",
        "Appendix 12",
        "Appendix 14"
      ],
      correct: 2,
      explanation: "Appendix 12 provides voltage drop limits and calculation methods for different types of circuits."
    },
    {
      question: "What's the consequence of an undersized conductor?",
      options: [
        "Higher installation cost",
        "Overheating and voltage drop",
        "Improved efficiency",
        "Better fault protection"
      ],
      correct: 1,
      explanation: "An undersized conductor will overheat due to excessive current and cause excessive voltage drop, potentially leading to equipment malfunction and fire risk."
    },
    {
      question: "How do you determine cable current capacity?",
      options: [
        "Use Appendix 3 only",
        "Apply design current directly",
        "Use tabulated values with correction factors",
        "Calculate from conductor resistance"
      ],
      correct: 2,
      explanation: "Cable current capacity is determined by finding the tabulated current-carrying capacity from Appendix 4 and applying relevant correction factors (Ca, Cg, Ci, etc.)."
    }
  ];

  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = value;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      setQuizCompleted(true);
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
      return score + (parseInt(answer) === questions[index].correct ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground text-center">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}/{questions.length}
            </div>
            <div className={`text-xl ${getScoreColor(score)}`}>
              {percentage}%
            </div>
            <p className="text-gray-400 mt-2">
              {percentage >= 80 ? 'Excellent work!' : 
               percentage >= 60 ? 'Good effort!' : 
               'Keep studying!'}
            </p>
          </div>

          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = parseInt(selectedAnswers[index]);
              const isCorrect = userAnswer === question.correct;
              
              return (
                <div key={index} className="bg-elec-dark p-4 rounded-md border border-gray-600">
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h4 className="text-foreground font-medium mb-2">
                        Question {index + 1}: {question.question}
                      </h4>
                      <p className={`text-sm mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        Your answer: {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-400 mb-2">
                          Correct answer: {question.options[question.correct]}
                        </p>
                      )}
                      <p className="text-xs text-gray-400">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={handleRestart}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground">Knowledge Check</CardTitle>
        <div className="flex justify-between text-sm text-gray-400">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">
            {questions[currentQuestion].question}
          </h3>
          
          <RadioGroup 
            value={selectedAnswers[currentQuestion] || ""} 
            onValueChange={handleAnswerSelect}
            className="space-y-3"
          >
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-md hover:bg-elec-dark transition-colors">
                <RadioGroupItem 
                  value={index.toString()} 
                  id={`option-${index}`}
                  className="border-gray-400 text-elec-yellow"
                />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="text-gray-300 cursor-pointer flex-1"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-elec-dark"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!selectedAnswers[currentQuestion]}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BS7671Module8Section1Quiz;