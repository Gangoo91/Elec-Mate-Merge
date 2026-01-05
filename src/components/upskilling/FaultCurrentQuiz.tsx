import { useState } from 'react';
import { Brain, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export const FaultCurrentQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What does PEFC measure?",
      options: [
        "Power factor correction",
        "The fault current in a line-to-earth fault",
        "Protective equipment fault current",
        "Peak electrical fault current"
      ],
      correctAnswer: 1,
      explanation: "PEFC (Prospective Earth Fault Current) measures the maximum current that would flow in a line-to-earth fault condition."
    },
    {
      id: 2,
      question: "What must PFC not exceed?",
      options: [
        "The supply voltage",
        "Protective device breaking capacity",
        "Circuit design current",
        "Installation power rating"
      ],
      correctAnswer: 1,
      explanation: "Prospective fault current must not exceed the breaking capacity of the protective device, or the device may fail catastrophically."
    },
    {
      id: 3,
      question: "When would you expect the highest PEFC values?",
      options: [
        "At the end of long circuits",
        "Close to the supply transformer",
        "In lighting circuits only",
        "During low demand periods"
      ],
      correctAnswer: 1,
      explanation: "PEFC is highest close to the supply source where impedance is lowest, allowing maximum fault current to flow."
    },
    {
      id: 4,
      question: "What happens if a protective device cannot handle the prospective fault current?",
      options: [
        "It will operate more slowly",
        "It may fail to clear the fault safely",
        "It will just make a louder noise",
        "Nothing - all devices can handle any current"
      ],
      correctAnswer: 1,
      explanation: "If PFC exceeds the device's breaking capacity, it may fail catastrophically, potentially causing fire or explosion."
    },
    {
      id: 5,
      question: "Why must both PFC and PEFC be measured?",
      options: [
        "They are the same measurement",
        "One verifies the other",
        "They cover different fault scenarios (line-to-line vs line-to-earth)",
        "Only for redundancy"
      ],
      correctAnswer: 2,
      explanation: "PFC measures line-to-line faults while PEFC measures line-to-earth faults - both scenarios must be considered for safety."
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
              <p className="text-foreground">
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
                        <p className="text-foreground text-sm mt-1">
                          Your answer: {question.options[userAnswer]}
                        </p>
                        {!isCorrect && (
                          <p className="text-green-400 text-sm">
                            Correct answer: {question.options[question.correctAnswer]}
                          </p>
                        )}
                        <p className="text-foreground text-sm mt-2">{question.explanation}</p>
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
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-elec-dark p-3 sm:p-4 rounded-md">
            <h3 className="text-foreground font-medium mb-3 sm:mb-4 text-base sm:text-lg">{currentQ.question}</h3>
            
            <RadioGroup
              value={selectedAnswers[currentQuestion] || ""}
              onValueChange={handleAnswerSelect}
              className="space-y-2 sm:space-y-3"
            >
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700/50 transition-colors">
                  <RadioGroupItem 
                    value={index.toString()} 
                    id={`option-${index}`}
                    className="border-gray-400 text-elec-yellow min-w-[16px] min-h-[16px]"
                  />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="text-foreground cursor-pointer flex-1 py-2 px-1 text-sm sm:text-base leading-relaxed"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
              className="w-full sm:w-auto bg-transparent border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-elec-dark py-3 px-6 text-sm sm:text-base min-h-[44px]"
            >
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!selectedAnswers[currentQuestion]}
              className="w-full sm:w-auto bg-elec-yellow text-elec-dark hover:bg-yellow-500 py-3 px-6 text-sm sm:text-base min-h-[44px]"
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};