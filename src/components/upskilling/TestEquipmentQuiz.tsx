import { useState } from 'react';
import { Brain, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export const TestEquipmentQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: 'What is the main purpose of GS38-compliant test leads?',
      options: [
        'To prevent contact with live parts during testing',
        'To improve the accuracy of measured readings',
        'To shorten the time taken to complete tests',
        'To satisfy the instrument manufacturer’s warranty',
      ],
      correctAnswer: 0,
      explanation:
        'GS38-compliant leads have finger barriers and fused probes to prevent accidental contact with live parts, protecting the user from electric shock.',
    },
    {
      id: 2,
      question: 'Why use non-trip (no-trip) mode when loop testing an RCD-protected circuit?',
      options: [
        'It increases the test current for accuracy',
        'It physically protects the test instrument',
        'It avoids nuisance tripping of the RCD during the test',
        'It bypasses the RCD so it can be removed',
      ],
      correctAnswer: 2,
      explanation:
        'Non-trip mode keeps the test current below the RCD operating threshold so the RCD does not disconnect during loop impedance testing.',
    },
    {
      id: 3,
      question: 'What does a calibration certificate verify?',
      options: [
        "The equipment manufacturer's warranty is valid",
        "The test equipment's accuracy within specified tolerances",
        "The user's competency to perform testing",
        "The installation's compliance with BS 7671",
      ],
      correctAnswer: 1,
      explanation:
        'Calibration certificates verify that test equipment meets specified accuracy requirements and can provide reliable measurements.',
    },
    {
      id: 4,
      question: 'How often should insulation resistance testers normally be calibrated?',
      options: [
        'Every month without exception',
        'Only once they start giving odd readings',
        'Annually, or per the manufacturer’s recommendation',
        'No more than once every five years',
      ],
      correctAnswer: 2,
      explanation:
        'Test equipment should be calibrated annually or according to manufacturer recommendations to ensure measurement accuracy.',
    },
    {
      id: 5,
      question: 'What should you check before using any test equipment?',
      options: [
        'Only the battery level',
        'Just that the display powers on',
        "Only the manufacturer's label",
        'Calibration date, condition of leads, and correct operation',
      ],
      correctAnswer: 3,
      explanation:
        'Before testing, always verify calibration validity, check leads for damage, and ensure the equipment operates correctly.',
    },
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
              <p className="text-foreground">You scored {percentage.toFixed(0)}%</p>
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
        <div className="space-y-6">
          <div className="bg-elec-dark p-4 rounded-md">
            <h3 className="text-foreground font-medium mb-4">{currentQ.question}</h3>

            <RadioGroup
              value={selectedAnswers[currentQuestion] || ''}
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
