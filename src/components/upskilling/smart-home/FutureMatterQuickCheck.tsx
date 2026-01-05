import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

export const FutureMatterQuickCheck = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);

  const question = "What future standard aims to reduce the need for bridges?";
  const options = [
    { id: 'a', text: 'Zigbee 4.0', correct: false },
    { id: 'b', text: 'Matter protocol', correct: true },
    { id: 'c', text: 'Wi-Fi 7', correct: false },
    { id: 'd', text: 'Bluetooth 6.0', correct: false }
  ];

  const handleSubmit = () => {
    setShowResult(true);
  };

  const handleReset = () => {
    setSelectedAnswer('');
    setShowResult(false);
  };

  return (
    <Card className="bg-gradient-to-br from-purple-900/10 to-blue-900/10 border-purple-600/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-purple-400" />
          Quick Check: Future Standards
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
                    : 'border-purple-500 bg-purple-900/20'
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
          <div className="mt-4 p-4 bg-purple-900/10 border border-purple-600/20 rounded-lg">
            <p className="text-purple-200 text-sm">
              <strong>Explanation:</strong> Matter (formerly Project CHIP) is the emerging standard designed to create universal compatibility across smart home ecosystems, reducing the need for bridges by enabling direct device-to-platform communication.
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            onClick={selectedAnswer ? handleSubmit : undefined}
            disabled={!selectedAnswer || showResult}
            className="bg-purple-600 hover:bg-purple-700 text-foreground"
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