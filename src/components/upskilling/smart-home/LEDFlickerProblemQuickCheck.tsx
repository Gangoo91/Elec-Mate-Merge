import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

export const LEDFlickerProblemQuickCheck = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = "What problem occurs if the wrong dimmer is used with LEDs?";
  const options = [
    { id: 'a', text: 'They become too bright', correct: false },
    { id: 'b', text: 'They use more energy', correct: false },
    { id: 'c', text: 'They flicker and buzz', correct: true },
    { id: 'd', text: 'They change colour randomly', correct: false }
  ];

  const handleSubmit = () => {
    setShowResult(true);
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Quick Check
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">{question}</h3>
          
          <div className="grid gap-2">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => !showResult && setSelectedAnswer(option.id)}
                disabled={showResult}
                className={`p-3 text-left rounded-lg border transition-all ${
                  showResult
                    ? option.correct
                      ? 'bg-green-900/30 border-green-600 text-green-200'
                      : selectedAnswer === option.id
                      ? 'bg-red-900/30 border-red-600 text-red-200'
                      : 'bg-elec-dark border-gray-600 text-gray-400'
                    : selectedAnswer === option.id
                    ? 'bg-elec-yellow/20 border-elec-yellow text-foreground'
                    : 'bg-elec-dark border-gray-600 text-gray-300 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{option.id.toUpperCase()})</span>
                  <span>{option.text}</span>
                  {showResult && option.correct && (
                    <CheckCircle className="h-4 w-4 text-green-400 ml-auto" />
                  )}
                  {showResult && !option.correct && selectedAnswer === option.id && (
                    <XCircle className="h-4 w-4 text-red-400 ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {!showResult ? (
            <Button 
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-400"
            >
              Check Answer
            </Button>
          ) : (
            <div className="space-y-3">
              {selectedAnswer === 'c' ? (
                <div className="bg-green-900/20 border border-green-600/50 p-3 rounded-lg">
                  <p className="text-green-200 text-sm">
                    ✓ Correct! Wrong dimmer types cause LEDs to flicker, buzz, or hum because of 
                    incompatible control methods with the LED driver electronics.
                  </p>
                </div>
              ) : (
                <div className="bg-red-900/20 border border-red-600/50 p-3 rounded-lg">
                  <p className="text-red-200 text-sm">
                    ✗ Incorrect. The main problem with wrong dimmers is flickering and buzzing, 
                    caused by the dimmer's control method being incompatible with LED drivers.
                  </p>
                </div>
              )}
              <Button 
                onClick={handleReset}
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};