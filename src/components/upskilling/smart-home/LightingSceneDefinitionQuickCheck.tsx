import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

export const LightingSceneDefinitionQuickCheck = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = "What is a lighting 'scene' in a smart home system?";
  const options = [
    "A single light switch on the wall",
    "A pre-programmed setting that controls multiple lights at once",
    "A type of LED bulb",
    "A room with lots of windows"
  ];
  const correctAnswer = "A pre-programmed setting that controls multiple lights at once";

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  const resetQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <Card className="bg-blue-600/10 border border-blue-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2 text-base">
          <HelpCircle className="h-5 w-5 text-blue-400" />
          Quick Check: Lighting Scene Definition
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground text-sm font-medium">{question}</p>
        
        <div className="space-y-2">
          {options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={`w-full text-left p-3 h-auto justify-start text-sm ${
                !showResult 
                  ? 'bg-elec-dark text-foreground border-gray-600 hover:bg-gray-700'
                  : selectedAnswer === option && option === correctAnswer
                    ? 'bg-green-600/20 text-green-400 border-green-600/40'
                    : selectedAnswer === option && option !== correctAnswer
                      ? 'bg-red-600/20 text-red-400 border-red-600/40'
                      : option === correctAnswer
                        ? 'bg-green-600/20 text-green-400 border-green-600/40'
                        : 'bg-elec-dark text-gray-400 border-gray-600'
              }`}
              onClick={() => !showResult && handleAnswerSelect(option)}
              disabled={showResult}
            >
              <span className="mr-2 font-bold">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
              {showResult && option === correctAnswer && (
                <CheckCircle className="ml-auto h-4 w-4 text-green-400" />
              )}
              {showResult && selectedAnswer === option && option !== correctAnswer && (
                <XCircle className="ml-auto h-4 w-4 text-red-400" />
              )}
            </Button>
          ))}
        </div>

        {showResult && (
          <div className={`p-3 rounded-lg border text-sm ${
            selectedAnswer === correctAnswer 
              ? 'bg-green-600/10 border-green-600/30' 
              : 'bg-red-600/10 border-red-600/30'
          }`}>
            <div className="flex items-start gap-2 mb-2">
              {selectedAnswer === correctAnswer ? (
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
              )}
              <span className={`font-semibold ${
                selectedAnswer === correctAnswer ? 'text-green-400' : 'text-red-400'
              }`}>
                {selectedAnswer === correctAnswer ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            <p className="text-foreground">
              A lighting scene is a pre-programmed configuration that controls multiple lights simultaneously, 
              allowing instant activation of specific lighting arrangements for different activities or situations.
            </p>
          </div>
        )}

        {showResult && (
          <Button 
            onClick={resetQuestion}
            variant="outline"
            className="bg-transparent border-blue-600 text-blue-400 hover:bg-blue-600/10 text-sm"
          >
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
};