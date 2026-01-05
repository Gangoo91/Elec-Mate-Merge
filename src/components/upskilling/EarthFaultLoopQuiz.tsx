import { useState } from 'react';
import { Brain, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export const EarthFaultLoopQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What does Zs include that Ze does not?",
      options: [
        "Supply transformer impedance",
        "Circuit wiring resistance (R1 + R2)",
        "Earth electrode resistance",
        "Supply cable impedance"
      ],
      correctAnswer: 1,
      explanation: "Zs includes the circuit wiring resistance (R1 + R2) in addition to the external impedance (Ze)."
    },
    {
      id: 2,
      question: "Where should Zs be tested?",
      options: [
        "At the consumer unit only",
        "At the nearest socket to the DB",
        "At the furthest point of the circuit",
        "At any convenient point"
      ],
      correctAnswer: 2,
      explanation: "Zs should be tested at the furthest point of the circuit to ensure worst-case conditions are verified."
    },
    {
      id: 3,
      question: "What does a high Zs value indicate?",
      options: [
        "Good earthing arrangement",
        "Poor fault current path that may not operate protection",
        "Excellent circuit design",
        "Normal test results"
      ],
      correctAnswer: 1,
      explanation: "High Zs values indicate poor fault current paths that may not provide sufficient current to operate protective devices quickly."
    },
    {
      id: 4,
      question: "How do you calculate Zs?",
      options: [
        "Ze + R1 + R2",
        "Ze - R1 - R2",
        "Ze × R1 × R2",
        "Ze only"
      ],
      correctAnswer: 0,
      explanation: "Zs is the sum of external impedance (Ze) plus the circuit conductors' resistance (R1 + R2)."
    },
    {
      id: 5,
      question: "What must Zs values be compared against?",
      options: [
        "Previous test results only",
        "Maximum values in BS7671 for the protective device",
        "Industry averages",
        "Manufacturer suggestions"
      ],
      correctAnswer: 1,
      explanation: "Zs must not exceed the maximum values specified in BS7671 tables for the type and rating of protective device installed."
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
              <p className="text-gray-300">
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
                        <p className="text-gray-300 text-sm mt-1">
                          Your answer: {question.options[userAnswer]}
                        </p>
                        {!isCorrect && (
                          <p className="text-green-400 text-sm">
                            Correct answer: {question.options[question.correctAnswer]}
                          </p>
                        )}
                        <p className="text-gray-400 text-sm mt-2">{question.explanation}</p>
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
                    className="text-gray-300 cursor-pointer flex-1"
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