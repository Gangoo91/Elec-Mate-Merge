import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, RotateCcw, HelpCircle } from 'lucide-react';

interface BMSModule5Section6InlineChecksProps {
  checkNumber: number;
}

export const BMSModule5Section6InlineChecks = ({ checkNumber }: BMSModule5Section6InlineChecksProps) => {
  const [answer, setAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const questions = [
    {
      id: 'q1',
      question: 'What is the maximum recommended cable length for an RS-485 Modbus RTU segment?',
      options: [
        '500m',
        '1200m',
        '2000m',
        '100m'
      ],
      correct: 1,
      explanation: 'RS-485 has a maximum recommended cable length of approximately 1200m per segment before signal loss occurs. Beyond this distance, signal quality degrades and communication becomes unreliable.'
    },
    {
      id: 'q2',
      question: 'Why is segmentation important in large BACnet MSTP networks?',
      options: [
        'It reduces cable costs',
        'It reduces traffic congestion and improves reliability',
        'It eliminates the need for termination resistors',
        'It allows unlimited device connections'
      ],
      correct: 1,
      explanation: 'Segmentation breaks large networks into smaller sections, reducing data traffic on each segment and isolating faults. This improves communication speed and system reliability.'
    },
    {
      id: 'q3',
      question: 'What is one common cause of high latency on a BMS network?',
      options: [
        'Using shielded cables',
        'Proper cable termination',
        'Too many devices on a single bus segment',
        'Regular network maintenance'
      ],
      correct: 2,
      explanation: 'Having too many devices on a single bus segment creates data bottlenecks, where devices must wait their turn to communicate. This increases response times and overall system latency.'
    }
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
              <div className={`p-4 rounded-lg border ${
                answer === currentQuestion.correct
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-red-500/10 border-red-500/30'
              }`}>
                <p className={`font-medium ${
                  answer === currentQuestion.correct
                    ? 'text-green-200'
                    : 'text-red-200'
                }`}>
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