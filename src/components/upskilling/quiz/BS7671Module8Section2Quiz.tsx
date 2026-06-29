import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const BS7671Module8Section2Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: 'What is a Minor Electrical Installation Works Certificate (MEIWC) used for?',
      options: [
        'A complete new consumer unit or installation',
        'Additions or alterations to an existing circuit',
        'A periodic inspection of an existing installation',
        'Major rewiring and structural alterations',
      ],
      correct: 1,
      explanation:
        'An MEIWC covers minor work that does not include a new circuit, such as adding a socket or lighting point to an existing circuit.',
    },
    {
      question: 'When would you use a protective device time/current (disconnection time) chart?',
      options: [
        'To check the voltage drop on a circuit',
        'To select the cable cross-sectional area',
        'To carry out maximum demand calculations',
        'To verify the device disconnects within the required time',
      ],
      correct: 3,
      explanation:
        'Time/current characteristics confirm a protective device will operate within the required disconnection time for the measured fault loop impedance.',
    },
    {
      question: 'What is typically listed on a visual inspection checklist?',
      options: [
        'Only the recorded test results',
        'Equipment condition and compliance items',
        'Detailed load calculations',
        'Full cable specifications',
      ],
      correct: 1,
      explanation:
        'A visual inspection checklist covers items such as equipment condition, correct installation, secure connections, labelling and regulatory compliance.',
    },
    {
      question: 'Which factor is applied to derate a cable’s current-carrying capacity?',
      options: [
        'The earth fault loop impedance (Zs)',
        'The voltage drop allowance',
        'The grouping factor (Cg)',
        'The device time/current curve',
      ],
      correct: 2,
      explanation:
        'The grouping factor (Cg) reduces a cable’s rating where several loaded cables are bunched together, because mutual heating limits how much current each can carry.',
    },
    {
      question: 'How do checklists help during an audit?',
      options: [
        'They remove the need to carry out testing',
        'They mainly serve to reduce labour costs',
        'They speed the job up by skipping steps',
        'They give systematic, repeatable verification',
      ],
      correct: 3,
      explanation:
        'Checklists ensure every required check is completed and recorded the same way each time, making audits more thorough and consistent.',
    },
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
            <div className={`text-xl ${getScoreColor(score)}`}>{percentage}%</div>
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
                      <p
                        className={`text-sm mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}
                      >
                        Your answer: {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-400 mb-2">
                          Correct answer: {question.options[question.correct]}
                        </p>
                      )}
                      <p className="text-xs text-gray-400">{question.explanation}</p>
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
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>
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
            value={selectedAnswers[currentQuestion] || ''}
            onValueChange={handleAnswerSelect}
            className="space-y-3"
          >
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 rounded-md hover:bg-elec-dark transition-colors"
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  className="border-gray-400 text-elec-yellow"
                />
                <Label htmlFor={`option-${index}`} className="text-gray-300 cursor-pointer flex-1">
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

export default BS7671Module8Section2Quiz;
