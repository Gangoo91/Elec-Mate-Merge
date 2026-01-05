import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

export const BridgeLatencyQuickCheck = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);

  const question = "Why might bridges add latency to smart home systems?";
  const options = [
    { id: 'a', text: 'They make devices more expensive', correct: false },
    { id: 'b', text: 'They add an extra step in communication', correct: true },
    { id: 'c', text: 'They use more electricity', correct: false },
    { id: 'd', text: 'They require larger cables', correct: false }
  ];

  const handleSubmit = () => {
    setShowResult(true);
  };

  const handleReset = () => {
    setSelectedAnswer('');
    setShowResult(false);
  };

  return (
    <Card className="bg-gradient-to-br from-amber-900/10 to-orange-900/10 border-amber-600/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-amber-400" />
          Quick Check: Bridge Latency
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 font-medium">{question}</p>
        
        <div className="space-y-2">
          {options.map((option) => (
            <div
              key={option.id}
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                selectedAnswer === option.id
                  ? showResult
                    ? option.correct
                      ? 'border-green-500 bg-green-900/20'
                      : 'border-red-500 bg-red-900/20'
                    : 'border-amber-500 bg-amber-900/20'
                  : 'border-gray-600 bg-gray-800/30 hover:bg-gray-700/30'
              }`}
              onClick={() => !showResult && setSelectedAnswer(option.id)}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-300">{option.text}</span>
                {showResult && selectedAnswer === option.id && (
                  option.correct ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {showResult && (
          <div className="mt-4 p-4 bg-amber-900/10 border border-amber-600/20 rounded-lg">
            <p className="text-amber-200 text-sm">
              <strong>Explanation:</strong> Bridges add latency because they introduce an additional step in the communication process. Commands must be translated between protocols and routed through the bridge, increasing total response time.
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            onClick={selectedAnswer ? handleSubmit : undefined}
            disabled={!selectedAnswer || showResult}
            className="bg-amber-600 hover:bg-amber-700 text-foreground"
          >
            Submit Answer
          </Button>
          {showResult && (
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Try Again
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};