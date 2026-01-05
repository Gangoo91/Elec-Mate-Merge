import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, CheckCircle, XCircle } from 'lucide-react';

export const ThermostatDifferenceQuickCheck = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = "What's the key difference between a traditional and a smart thermostat?";
  const options = [
    "Smart thermostats are more expensive",
    "Smart thermostats offer remote access and advanced features",
    "Smart thermostats are larger in size",
    "Smart thermostats only work with gas boilers"
  ];
  const correctAnswer = 1;

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index.toString());
    setShowResult(true);
  };

  const resetQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Quick Check 1
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">{question}</h3>
        
        <div className="space-y-3">
          {options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full text-left justify-start p-4 border-gray-600 hover:bg-[#323232] whitespace-normal break-words leading-snug ${
                showResult
                  ? index === correctAnswer
                    ? 'bg-green-600/20 border-green-500 text-green-200'
                    : selectedAnswer === index.toString()
                    ? 'bg-red-600/20 border-red-500 text-red-200'
                    : 'text-gray-400'
                  : selectedAnswer === index.toString()
                  ? 'bg-elec-yellow text-elec-dark border-elec-yellow'
                  : 'text-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                {showResult && index === correctAnswer && (
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                )}
                {showResult && selectedAnswer === index.toString() && index !== correctAnswer && (
                  <XCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                )}
                <span className="flex-1 min-w-0 break-words">{option}</span>
              </div>
            </Button>
          ))}
        </div>

        {showResult && (
          <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
            <p className="text-gray-300 text-sm">
              <strong className="text-foreground">Explanation:</strong> Smart thermostats differ from traditional ones primarily through their connectivity and advanced features like remote access, scheduling, geofencing, and integration with other smart home devices.
            </p>
            <Button
              onClick={resetQuestion}
              variant="outline"
              className="mt-3 border-gray-600 text-gray-300 hover:bg-[#323232]"
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};