import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const quizData = [
  {
    question:
      'Which SPD type is specifically designed to handle the energy of a direct lightning strike?',
    answers: ['Type 1 SPD', 'Type 2 SPD', 'Type 3 SPD', 'Type 4 SPD'],
    correctAnswer: 0,
    explanation:
      'Type 1 SPDs are designed for partial direct lightning current, tested with the 10/350μs waveform and capable of handling the high energy of a direct strike.',
  },
  {
    question: 'What is the maximum recommended total connecting lead length for an SPD?',
    answers: ['0.25 metres', '1.5 metres', '0.5 metres', '1.0 metre'],
    correctAnswer: 2,
    explanation:
      'SPD connecting leads should be as short as possible, ideally a total of 0.5m or less, to minimise added inductance that would raise the protective voltage level.',
  },
  {
    question: 'Which current waveform is used to test Type 2 SPDs?',
    answers: [
      '10/350μs impulse current',
      'Combination wave 1.2/50μs – 8/20μs',
      '1.2/50μs voltage wave',
      '8/20μs impulse current',
    ],
    correctAnswer: 3,
    explanation:
      'Type 2 SPDs are tested with the 8/20μs impulse current waveform, representing indirect lightning effects and switching surges within an installation.',
  },
  {
    question:
      'What is the minimum separation between SPD protection stages required for proper coordination (without decoupling)?',
    answers: ['10 metres', '5 metres', '15 metres', '20 metres'],
    correctAnswer: 0,
    explanation:
      'Around 10m of cable is needed between SPD stages for proper energy coordination, unless a decoupling inductor is fitted to provide the equivalent impedance.',
  },
  {
    question:
      'BS 7671 bases the need for surge protection on the rated impulse withstand voltage of the equipment supplied. What is the Category II value for 230/400V equipment?',
    answers: [
      '1.5kV',
      '4.0kV',
      '2.5kV',
      '6.0kV',
    ],
    correctAnswer: 2,
    explanation:
      'Equipment in overvoltage Category II at 230/400V has a rated impulse withstand voltage of 2.5kV, the benchmark used when assessing the need for surge protection.',
  },
  {
    question: 'Which technology is most commonly used in Type 2 SPDs for EV charging applications?',
    answers: [
      'Spark gaps',
      'Metal oxide varistors (MOVs)',
      'Gas discharge tubes',
      'Silicon avalanche diodes',
    ],
    correctAnswer: 1,
    explanation:
      'Type 2 SPDs commonly use metal oxide varistor (MOV) technology, giving fast response and suitable energy handling for indirect lightning and switching surges.',
  },
  {
    question:
      'Which additional protection is specifically important for EV charging control circuits?',
    answers: [
      'DC surge protection of the supply only',
      'Harmonic filtering on the AC supply',
      'Control pilot signal (CP/PP line) protection',
      'Motor protection of the charger fan',
    ],
    correctAnswer: 2,
    explanation:
      'The control pilot and proximity pilot (CP/PP) signal lines manage safe charging communication, so they benefit from dedicated surge protection of these low-voltage circuits.',
  },
  {
    question:
      'What is a primary consideration when selecting SPDs for DC rapid charging stations?',
    answers: [
      'Only the reduced voltage of the DC side',
      'Enhanced AC-side protection plus dedicated DC output surge protection',
      'Lower current handling than for AC chargers',
      'Simplified single-stage protection only',
    ],
    correctAnswer: 1,
    explanation:
      'DC rapid chargers need enhanced AC-side protection for the higher power level and dedicated DC output surge protection for the high-voltage DC circuits.',
  },
  {
    question: 'How should backup protection for an SPD normally be provided?',
    answers: [
      'A dedicated overcurrent device for each SPD',
      'The same MCB shared with other final circuits',
      'No backup overcurrent protection is needed',
      'Protection shared with the lighting circuits',
    ],
    correctAnswer: 0,
    explanation:
      'Each SPD should have its own backup overcurrent device, not shared with other circuits, so a failed SPD can be isolated without losing other protection.',
  },
  {
    question:
      'What must be considered about SPDs in relation to RCD selection for EV charging?',
    answers: [
      'SPDs remove the need for an RCD',
      'Only Type AC RCDs may be used alongside SPDs',
      'The RCD should be bypassed where an SPD is fitted',
      'SPD earth leakage characteristics must inform the RCD type chosen',
    ],
    correctAnswer: 3,
    explanation:
      'SPDs can briefly divert current to earth, so their leakage behaviour must be considered when selecting an RCD type (such as Type A or Type B) for EV charging.',
  },
];

export const EVChargingModule4Section5Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizCompleted) return;

    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
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
      return score + (answer === quizData[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    const percentage = (score / quizData.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / quizData.length) * 100;

    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {score}/{quizData.length}
            </div>
            <div className="text-gray-400 text-lg">{percentage.toFixed(0)}% Correct</div>
          </div>

          <div className="space-y-4">
            {quizData.map((question, index) => {
              const isCorrect = selectedAnswers[index] === question.correctAnswer;
              return (
                <div key={index} className="border border-gray-600 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-foreground mb-2">{question.question}</div>
                      <div className="text-sm text-gray-400 mb-2">
                        Your answer: {question.answers[selectedAnswers[index]]}
                      </div>
                      {!isCorrect && (
                        <div className="text-sm text-green-400 mb-2">
                          Correct answer: {question.answers[question.correctAnswer]}
                        </div>
                      )}
                      <div className="text-sm text-gray-300">{question.explanation}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleRestart}
              className="bg-elec-yellow text-black hover:bg-yellow-600"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = quizData[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">Knowledge Check</CardTitle>
          <Badge variant="outline" className="border-gray-600 text-gray-300">
            {currentQuestion + 1} of {quizData.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">{currentQ.question}</h3>

          <div className="space-y-3">
            {currentQ.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-elec-yellow bg-yellow-600/10 text-foreground'
                    : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                }`}
                disabled={quizCompleted}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-elec-yellow bg-elec-yellow text-black'
                        : 'border-gray-500'
                    }`}
                  >
                    {selectedAnswers[currentQuestion] === index && (
                      <CheckCircle className="h-4 w-4" />
                    )}
                  </div>
                  <span>{answer}</span>
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
            className="bg-elec-gray border-gray-600 text-foreground hover:bg-gray-700"
          >
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            className="bg-elec-yellow text-black hover:bg-yellow-600"
          >
            {currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
