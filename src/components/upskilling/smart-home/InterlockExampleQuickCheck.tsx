import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, CheckCircle, XCircle } from 'lucide-react';

export const InterlockExampleQuickCheck = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = "Give one example of an interlock.";
  const options = [
    "A timer that turns lights on at sunset",
    "A heating system that cannot run when cooling is active",
    "A motion sensor that detects presence",
    "A smart plug that monitors energy usage"
  ];
  const correctAnswer = 1;
  const explanation = "An interlock between heating and cooling systems ensures they cannot operate simultaneously, preventing energy waste and system conflicts.";

  const handleAnswerSelect = (index: string) => {
    setSelectedAnswer(index);
    setShowResult(true);
  };

  const resetQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const isCorrect = selectedAnswer !== null && parseInt(selectedAnswer) === correctAnswer;

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Quick Check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="text-foreground font-medium">{question}</h3>
        
        {!showResult ? (
          <div className="space-y-2">
            {options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left justify-start p-3 border-gray-600 text-gray-300 hover:bg-[#323232]"
                onClick={() => handleAnswerSelect(index.toString())}
              >
                {option}
              </Button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border ${
              isCorrect 
                ? 'bg-green-950/50 border-green-600' 
                : 'bg-red-950/50 border-red-600'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400" />
                )}
                <span className={`font-semibold ${
                  isCorrect ? 'text-green-200' : 'text-red-200'
                }`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              <p className={`text-sm ${
                isCorrect ? 'text-green-100' : 'text-red-100'
              }`}>
                {explanation}
              </p>
            </div>
            
            <Button 
              onClick={resetQuestion}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};