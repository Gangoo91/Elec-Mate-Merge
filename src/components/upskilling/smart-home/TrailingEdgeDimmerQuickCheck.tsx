import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, HelpCircle } from 'lucide-react';

export const TrailingEdgeDimmerQuickCheck = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const options = [
    { text: "They are cheaper to buy", correct: false },
    { text: "They provide smoother dimming with LEDs and reduce flicker", correct: true },
    { text: "They work without electricity", correct: false },
    { text: "They only work with halogen bulbs", correct: false }
  ];

  const handleSubmit = () => {
    setShowFeedback(true);
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Quick Check: Trailing-Edge Dimmers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground font-medium">Q2: What is the main advantage of trailing-edge dimmers with LEDs?</p>
        
        <div className="space-y-2">
          {options.map((option, index) => (
            <div key={index} className="space-y-2">
              <label
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedAnswer === index
                    ? showFeedback
                      ? option.correct
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-red-500 bg-red-500/10'
                      : 'border-elec-yellow bg-elec-yellow/10'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <input
                  type="radio"
                  name="trailing-edge-question"
                  value={index}
                  checked={selectedAnswer === index}
                  onChange={() => setSelectedAnswer(index)}
                  className="sr-only"
                />
                <span className="text-foreground">{option.text}</span>
                {showFeedback && selectedAnswer === index && (
                  <CheckCircle2 className={`ml-auto h-4 w-4 ${option.correct ? 'text-green-400' : 'text-red-400'}`} />
                )}
              </label>
            </div>
          ))}
        </div>

        {showFeedback && (
          <div className="p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
            <p className="text-blue-100 text-sm">
              <strong>Correct:</strong> Trailing-edge dimmers are designed for modern LED loads and provide smoother dimming operation with reduced flicker compared to traditional leading-edge dimmers.
            </p>
          </div>
        )}

        <div className="flex gap-2">
          {!showFeedback ? (
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-400"
            >
              Check Answer
            </Button>
          ) : (
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-gray-600 text-foreground hover:bg-[#323232] hover:text-foreground"
            >
              Try Again
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};