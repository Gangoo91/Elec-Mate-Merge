import { useState } from 'react';
import { Brain, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export const ResultsDocumentationQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What must Zs values be compared against?",
      options: [
        "Previous test results",
        "The maximums listed in BS7671 Appendix 3",
        "Industry average values",
        "Manufacturer recommendations only"
      ],
      correctAnswer: 1,
      explanation: "Zs values must be compared against the maximum values specified in BS7671 Appendix 3 for the type and rating of protective device installed."
    },
    {
      id: 2,
      question: "True or False: It's acceptable to write 'pass' instead of the test value on a certificate.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False. You must always record actual test values with units. Writing 'pass' or 'OK' is unacceptable and potentially illegal."
    },
    {
      id: 3,
      question: "What information must be recorded for every test result?",
      options: [
        "Just the numerical value",
        "Value, units, test method, and environmental conditions",
        "Only pass or fail",
        "Just the date tested"
      ],
      correctAnswer: 1,
      explanation: "Complete documentation requires actual values with units, test methods used, and relevant environmental conditions."
    },
    {
      id: 4,
      question: "How long must test records be retained?",
      options: [
        "1 year minimum",
        "Until the next inspection",
        "Permanently for legal protection",
        "6 months only"
      ],
      correctAnswer: 2,
      explanation: "Test records should be retained permanently as they provide legal evidence of due diligence and proper testing."
    },
    {
      id: 5,
      question: "What should you do if a test result appears unusually high or low?",
      options: [
        "Record it without question",
        "Change it to a normal value",
        "Investigate and retest to verify accuracy",
        "Ignore the unusual reading"
      ],
      correctAnswer: 2,
      explanation: "Unusual readings should always be investigated and verified through retesting to ensure accuracy and identify potential issues."
    }
  ];

  const handleAnswerSelect = (answerIndex: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
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

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (parseInt(answer) === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Brain className="h-5 w-5 text-elec-yellow" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="bg-elec-dark p-6 rounded-md">
              <h3 className="text-2xl font-bold text-elec-yellow mb-2">
                {score} out of {questions.length}
              </h3>
              <p className="text-foreground text-sm sm:text-base leading-relaxed">
                You scored {percentage.toFixed(0)}%
              </p>
            </div>

            <div className="space-y-4">
              {questions.map((question, index) => {
                const userAnswer = parseInt(selectedAnswers[index]);
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <div key={question.id} className="bg-elec-dark p-4 rounded-md text-left">
                    <div className="flex items-start gap-2 mb-2">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
                      )}
                      <div>
                        <p className="text-foreground font-medium">{question.question}</p>
                        <p className="text-foreground text-sm mt-1 sm:text-base">
                          Your answer: {question.options[userAnswer]}
                        </p>
                        {!isCorrect && (
                          <p className="text-green-400 text-sm">
                            Correct answer: {question.options[question.correctAnswer]}
                          </p>
                        )}
                        <p className="text-foreground text-sm mt-2 sm:text-base">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button 
              onClick={resetQuiz}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-500"
            >
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Brain className="h-5 w-5 text-elec-yellow" />
          Quick Quiz - Question {currentQuestion + 1} of {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-elec-dark p-4 rounded-md">
            <h3 className="text-foreground font-medium mb-4">{currentQ.question}</h3>
            
            <RadioGroup
              value={selectedAnswers[currentQuestion] || ""}
              onValueChange={handleAnswerSelect}
              className="space-y-3"
            >
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={index.toString()} 
                    id={`option-${index}`}
                    className="border-gray-400 text-elec-yellow"
                  />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="text-foreground cursor-pointer flex-1 text-sm sm:text-base"
                  >
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
              className="bg-transparent border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-elec-dark"
            >
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!selectedAnswers[currentQuestion]}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-500"
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};