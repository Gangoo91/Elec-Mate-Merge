import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

export const CompatibilityMeaningQuickCheck = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);

  const question = "What does 'compatibility' mean in smart homes?";
  const options = [
    { id: 'a', text: 'Devices using the same brand', correct: false },
    { id: 'b', text: 'Ability of devices to work together within an ecosystem', correct: true },
    { id: 'c', text: 'Devices having the same price range', correct: false },
    { id: 'd', text: 'Devices being installed at the same time', correct: false }
  ];

  const handleSubmit = () => {
    setShowResult(true);
  };

  const handleReset = () => {
    setSelectedAnswer('');
    setShowResult(false);
  };

  return (
    <Card className="bg-gradient-to-br from-blue-900/10 to-purple-900/10 border-blue-600/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-400" />
          Quick Check: Compatibility Definition
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
                    : 'border-blue-500 bg-blue-900/20'
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
          <div className="mt-4 p-4 bg-blue-900/10 border border-blue-600/20 rounded-lg">
            <p className="text-blue-200 text-sm">
              <strong>Explanation:</strong> Compatibility in smart homes refers to the ability of devices to work together within an ecosystem, sharing data and responding to commands from the same control interface, regardless of brand or protocol.
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            onClick={selectedAnswer ? handleSubmit : undefined}
            disabled={!selectedAnswer || showResult}
            className="bg-blue-600 hover:bg-blue-700 text-foreground"
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