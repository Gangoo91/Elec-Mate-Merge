import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, RotateCcw, HelpCircle } from 'lucide-react';

interface BMSModule5Section6InlineChecksProps {
  checkNumber: number;
}

export const BMSModule5Section6InlineChecks = ({
  checkNumber,
}: BMSModule5Section6InlineChecksProps) => {
  const [answer, setAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const questions = [
    {
      id: 'q1',
      question: 'What is the maximum recommended cable length for an RS-485 Modbus RTU segment?',
      options: ['1200m', '300m', '600m', '2500m'],
      correct: 0,
      explanation:
        'RS-485 is specified to roughly 1200m (about 4000ft) per segment at lower data rates before reflections and attenuation degrade the signal. Longer runs need repeaters or fibre to keep communication reliable.',
    },
    {
      id: 'q2',
      question: 'Why is segmentation important in large BACnet MSTP networks?',
      options: [
        'It eliminates the need for termination resistors',
        'It allows an unlimited number of devices per segment',
        'It reduces traffic congestion and improves reliability',
        'It removes the need to set unique device addresses',
      ],
      correct: 2,
      explanation:
        'Segmentation breaks a large network into smaller sections, reducing data traffic on each segment and isolating faults. This improves communication speed and overall system reliability.',
    },
    {
      id: 'q3',
      question: 'What is one common cause of high latency on a BMS network?',
      options: [
        'Using correctly screened cable',
        'Too many devices on a single bus segment',
        'Fitting end-of-line termination resistors',
        'Setting a higher baud rate on the segment',
      ],
      correct: 1,
      explanation:
        'On a shared serial bus, devices must take turns to communicate. Overloading one segment with too many devices creates a polling bottleneck that increases response times and overall latency.',
    },
  ];

  const handleAnswer = (optionIndex: number) => {
    setAnswer(optionIndex);
    setShowFeedback(true);
  };

  const resetQuestion = () => {
    setAnswer(null);
    setShowFeedback(false);
  };

  const currentQuestion = questions[checkNumber - 1];
  if (!currentQuestion) return null;

  return (
    <Card className="bg-elec-gray border-gray-700 my-8">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Check Your Understanding
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground">
        <div className="bg-elec-dark p-6 rounded-lg border border-gray-600">
          <h4 className="font-semibold text-lg mb-4">{currentQuestion.question}</h4>

          <div className="space-y-3 mb-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                  answer === index
                    ? index === currentQuestion.correct
                      ? 'bg-green-500/20 border-green-500/40 text-green-100'
                      : 'bg-red-500/20 border-red-500/40 text-red-100'
                    : showFeedback && index === currentQuestion.correct
                      ? 'bg-green-500/20 border-green-500/40 text-green-100'
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-gray-500'
                } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  {showFeedback && (
                    <>
                      {index === currentQuestion.correct ? (
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                      ) : answer === index ? (
                        <XCircle className="h-5 w-5 text-red-400" />
                      ) : null}
                    </>
                  )}
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg border ${
                  answer === currentQuestion.correct
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                }`}
              >
                <p
                  className={`font-medium ${
                    answer === currentQuestion.correct ? 'text-green-200' : 'text-red-200'
                  }`}
                >
                  {answer === currentQuestion.correct ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-sm text-gray-300 mt-2">{currentQuestion.explanation}</p>
              </div>

              <Button
                onClick={resetQuestion}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-elec-gray"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
