import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the first step when arriving at an EV charging installation site?',
    options: [
      'Conduct a site-specific risk assessment',
      'Start unloading tools and equipment',
      'Begin isolating the existing supply',
      'Measure the incoming supply voltage',
    ],
    correctAnswer: 0,
    explanation:
      'A site-specific risk assessment is carried out first to identify hazards and plan safe systems of work before any physical or electrical work begins.',
  },
  {
    id: 2,
    question:
      'What is the correct method of safe isolation before working on a circuit?',
    options: [
      'Switch off at the consumer unit and begin work',
      'Secure isolation and prove dead with an approved voltage indicator',
      'Remove the main fuse and rely on the open way',
      'Confirm dead using a non-contact voltage detector only',
    ],
    correctAnswer: 1,
    explanation:
      'Safe isolation requires the supply to be securely isolated and locked off, then proven dead on all conductors using an approved voltage indicator checked against a known source.',
  },
  {
    id: 3,
    question: 'What is the minimum PPE expected when working on EV charging installations?',
    options: [
      'Safety glasses and cut-resistant gloves only',
      'A hard hat and high-visibility vest only',
      'Arc-flash clothing rated to 8 cal/cm² at all times',
      'Safety glasses, hard hat and electrical safety footwear',
    ],
    correctAnswer: 3,
    explanation:
      'Minimum PPE typically includes safety glasses, a hard hat and electrical safety footwear; arc-flash PPE is added where a risk assessment identifies the need.',
  },
  {
    id: 4,
    question: 'When must a permit-to-work system be implemented?',
    options: [
      'For every domestic EV charging installation',
      'Only when the installation is in a commercial building',
      'For live working or other high-risk activities',
      'Only when more than one electrician is on site',
    ],
    correctAnswer: 2,
    explanation:
      'Permit-to-work systems are used for live working and other high-risk activities to ensure proper safety controls and authorisation are in place.',
  },
  {
    id: 5,
    question:
      'What is the maximum earth fault loop impedance (Zs) for a 32A Type B MCB protecting an EV charging circuit at 230V?',
    options: ['0.87Ω', '1.37Ω', '1.45Ω', '2.30Ω'],
    correctAnswer: 1,
    explanation:
      'The tabulated maximum Zs for a 32A Type B MCB at 230V is 1.37Ω, ensuring disconnection within the required time under earth fault conditions.',
  },
  {
    id: 6,
    question: 'What residual current protection is required at an EV charging point?',
    options: [
      'A 30mA Type AC RCD is sufficient for the circuit',
      'A 30mA Type A RCD used on its own',
      'A Type B RCD, or a Type A RCD with 6mA DC detection',
      'No RCD where the charger has its own electronics',
    ],
    correctAnswer: 2,
    explanation:
      'EV charging requires protection against smooth DC residual current, achieved with a Type B RCD, or a Type A RCD combined with 6mA DC fault detection.',
  },
  {
    id: 7,
    question: 'What is a commonly specified minimum burial depth for an EV supply cable across a driveway?',
    options: ['150mm', '300mm', '600mm', '900mm'],
    correctAnswer: 2,
    explanation:
      'Around 600mm is commonly specified for cables under driveways, with mechanical protection and marker tape, to reduce the risk of damage from loads above.',
  },
  {
    id: 8,
    question: 'What method should be used when working near buried services?',
    options: [
      'A visual check of the ground surface only',
      'A CAT scan followed by careful hand digging',
      'Mechanical excavation to save time on the route',
      'Relying on utility plans without scanning the route',
    ],
    correctAnswer: 1,
    explanation:
      'A cable avoidance tool (CAT) scan followed by careful hand digging is used to locate and avoid damaging existing buried services; utility plans alone are not reliable enough to dig against.',
  },
  {
    id: 9,
    question: 'What documentation should be in place before installation work starts?',
    options: [
      'The installation certificate on its own',
      'The schedule of test results on its own',
      'A risk assessment, method statement and any required permits',
      'A signed customer agreement on its own',
    ],
    correctAnswer: 2,
    explanation:
      'A risk assessment, method statement and any required permits should be completed before work begins to ensure a safe and controlled system of work.',
  },
  {
    id: 10,
    question: 'How should temporary supply connections be protected during installation?',
    options: [
      'With insulating tape over the joints',
      'With suitable IP-rated enclosures and RCD protection',
      'No protection is needed for short-term use',
      'With plastic sheeting to keep out moisture',
    ],
    correctAnswer: 1,
    explanation:
      'Temporary connections need a suitable IP rating for the environment and RCD protection to keep them safe throughout the installation process.',
  },
];

export function EVChargingModule6Section1Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
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
      return score + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    return 'Needs Improvement';
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground text-center">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}/{quizQuestions.length}
            </div>
            <Badge variant="secondary" className="mt-2">
              {getScoreBadge(score)}
            </Badge>
          </div>

          <div className="space-y-4">
            {quizQuestions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div key={question.id} className="bg-[#323232] p-4 rounded-lg">
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-foreground font-medium mb-2">{question.question}</p>
                      <p className="text-sm text-gray-300 mb-2">
                        Your answer:{' '}
                        <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                          {question.options[userAnswer]}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-gray-300 mb-2">
                          Correct answer:{' '}
                          <span className="text-green-400">
                            {question.options[question.correctAnswer]}
                          </span>
                        </p>
                      )}
                      <p className="text-sm text-gray-400">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Button
              onClick={handleRestart}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-400"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Restart Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-foreground">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </CardTitle>
          <Badge variant="outline" className="border-gray-600 text-gray-300">
            Safe Installation Quiz
          </Badge>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-elec-yellow bg-yellow-600/20 text-foreground'
                    : 'border-gray-600 bg-[#323232] text-gray-300 hover:border-gray-500 hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-elec-yellow'
                        : 'border-gray-500'
                    }`}
                  >
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2 h-2 rounded-full bg-elec-yellow" />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-400 disabled:bg-gray-600 disabled:text-gray-400"
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
