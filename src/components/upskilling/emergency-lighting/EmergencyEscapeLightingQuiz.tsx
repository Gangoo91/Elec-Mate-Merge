import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const EmergencyEscapeLightingQuiz = () => {
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question:
        'What is the minimum horizontal illuminance required on an escape route under BS 5266-1?',
      options: ['0.5 lux', '1 lux', '1.5 lux', '2 lux'],
      correctAnswer: 1,
      explanation:
        'BS 5266-1 specifies a minimum of 1 lux horizontal illuminance along the centre line of an escape route to allow safe movement during evacuation.',
    },
    {
      id: 2,
      question: 'What is the maximum diversity (uniformity) ratio allowed on an escape route?',
      options: ['20:1', '30:1', '40:1', '50:1'],
      correctAnswer: 2,
      explanation:
        'The maximum ratio of maximum to minimum illuminance on an escape route is 40:1, avoiding excessively dark areas that could impede evacuation.',
    },
    {
      id: 3,
      question:
        'For corridors, what is the maximum luminaire spacing relative to the mounting height?',
      options: [
        'One times the mounting height',
        'Two times the mounting height',
        'Three times the mounting height',
        'Four times the mounting height',
      ],
      correctAnswer: 1,
      explanation:
        'As a general guide for corridors, luminaires are spaced at no more than twice the mounting height to maintain adequate coverage between fittings.',
    },
    {
      id: 4,
      question: 'At which doors must emergency lighting be provided?',
      options: [
        'Only at final exits',
        'At main entrances only',
        'At all exit doors on escape routes',
        'At fire-rated doors only',
      ],
      correctAnswer: 2,
      explanation:
        'Emergency lighting must be provided at all exit doors on escape routes so they remain clearly visible and usable in an emergency.',
    },
    {
      id: 5,
      question: 'Which type of emergency lighting is specifically intended for escape routes?',
      options: [
        'Standby lighting',
        'Anti-panic (open area) lighting',
        'High-risk task area lighting',
        'Escape route lighting',
      ],
      correctAnswer: 3,
      explanation:
        'Escape route lighting is the category specifically designed to illuminate escape routes and exits for safe evacuation.',
    },
    {
      id: 6,
      question:
        'At what height is the illuminance of emergency escape lighting normally measured?',
      options: ['At floor level', '0.5m above the floor', '1m above the floor', '2m above the floor'],
      correctAnswer: 0,
      explanation:
        'Illuminance for emergency escape lighting is measured at floor level, where people will be walking during evacuation.',
    },
    {
      id: 7,
      question:
        'What is the minimum emergency escape lighting duration for most general buildings?',
      options: ['1 hour', '1.5 hours', '2 hours', '4 hours'],
      correctAnswer: 0,
      explanation:
        'BS 5266-1 sets a minimum of 1 hour for most general premises, increasing to 3 hours for premises such as those with sleeping accommodation.',
    },
    {
      id: 8,
      question: 'At which points must emergency lighting always be provided on an escape route?',
      options: [
        'Only at changes of direction',
        'Only at changes of level',
        'Only at the final exit door',
        'At each change of direction and change of level',
      ],
      correctAnswer: 3,
      explanation:
        'Emergency lighting must be sited at each change of direction and each change of level (such as stairs), and at exits and fire-fighting equipment, to guide occupants safely.',
    },
    {
      id: 9,
      question: 'What is the primary purpose of emergency escape lighting?',
      options: [
        'To provide normal working light',
        'To illuminate escape routes for safe evacuation',
        'To reduce energy consumption',
        'To deter intruders during an outage',
      ],
      correctAnswer: 1,
      explanation:
        'The primary purpose of emergency escape lighting is to illuminate escape routes and exits so occupants can leave safely when the mains supply fails.',
    },
    {
      id: 10,
      question: 'According to guidance, from how far should a standard exit sign be readable?',
      options: ['5 metres', '10 metres', '15 metres', '20 metres'],
      correctAnswer: 2,
      explanation:
        'A standard exit sign should be readable from up to 15 metres (giving a viewing distance of about 100 times the pictogram height for an externally lit sign).',
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    new Array(questions.length).fill(-1)
  );
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
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
    setSelectedAnswers(new Array(questions.length).fill(-1));
    setShowResults(false);
  };

  const calculateScore = () => {
    return selectedAnswers.filter((answer, index) => answer === questions[index].correctAnswer)
      .length;
  };

  const getScoreColor = (score: number) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = (score: number) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80)
      return 'Excellent! You have a strong understanding of emergency escape lighting.';
    if (percentage >= 60)
      return 'Good work! Review the areas you missed to strengthen your knowledge.';
    return 'Keep studying! Focus on the explanations to improve your understanding.';
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader className="text-center">
          <CardTitle className="text-foreground text-2xl">Quiz Results</CardTitle>
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}/{questions.length}
            </div>
            <div className={`text-xl ${getScoreColor(score)}`}>{percentage}%</div>
            <p className="text-gray-300 mt-2">{getScoreMessage(score)}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {questions.map((question, index) => (
              <div key={question.id} className="bg-elec-dark rounded-lg p-4 border border-gray-600">
                <div className="flex items-start gap-3">
                  {selectedAnswers[index] === question.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-foreground font-medium text-sm mb-2">
                      {question.id}. {question.question}
                    </p>
                    <p className="text-gray-300 text-sm mb-1">
                      <span className="font-medium">Your answer:</span>{' '}
                      {question.options[selectedAnswers[index]]}
                    </p>
                    <p className="text-gray-300 text-sm mb-2">
                      <span className="font-medium">Correct answer:</span>{' '}
                      {question.options[question.correctAnswer]}
                    </p>
                    <p className="text-gray-400 text-xs">{question.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Button
              onClick={resetQuiz}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="text-foreground">Emergency Escape Lighting Quiz</CardTitle>
          <Badge
            variant="secondary"
            className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30"
          >
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">{question.question}</h3>
          <RadioGroup
            value={selectedAnswers[currentQuestion].toString()}
            onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            className="space-y-3"
          >
            {question.options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-3 rounded-lg bg-elec-dark border border-gray-600 hover:border-gray-500 transition-colors"
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  className="text-elec-yellow"
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
            className="border-gray-600 text-gray-300 hover:bg-elec-gray"
          >
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === -1}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
