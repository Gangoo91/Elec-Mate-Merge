import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

export const GroupingAdvantageQuickCheck = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = "What is the main advantage of grouping lights?";
  const options = [
    { id: 'a', text: 'Reduces electricity consumption', correct: false },
    { id: 'b', text: 'Allows multiple lights to be controlled with a single command', correct: true },
    { id: 'c', text: 'Improves individual light brightness', correct: false },
    { id: 'd', text: 'Prevents lights from failing', correct: false }
  ];

  const handleAnswerSelect = (optionId: string) => {
    if (showResult) return;
    setSelectedAnswer(optionId);
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      setShowResult(true);
    }
  };

  const resetCheck = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const selectedOption = options.find(opt => opt.id === selectedAnswer);
  const isCorrect = selectedOption?.correct || false;

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Quick Check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 font-medium">{question}</p>
        
        <div className="space-y-2">
          {options.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              onClick={() => handleAnswerSelect(option.id)}
              className={`w-full justify-start text-left p-4 h-auto border-gray-600 hover:bg-gray-700 ${
                selectedAnswer === option.id 
                  ? showResult 
                    ? option.correct 
                      ? 'bg-green-900/20 border-green-600 text-green-100' 
                      : 'bg-red-900/20 border-red-600 text-red-100'
                    : 'bg-blue-900/20 border-blue-600 text-blue-100'
                  : 'text-gray-300'
              }`}
              disabled={showResult}
            >
              <span className="mr-3 font-bold">{option.id.toUpperCase()})</span>
              {option.text}
              {showResult && selectedAnswer === option.id && (
                <span className="ml-auto">
                  {option.correct ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                </span>
              )}
            </Button>
          ))}
        </div>

        {!showResult && selectedAnswer && (
          <Button 
            onClick={handleSubmit}
            className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-400"
          >
            Submit Answer
          </Button>
        )}

        {showResult && (
          <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-900/20 border border-green-600' : 'bg-red-900/20 border border-red-600'}`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <XCircle className="h-5 w-5 text-red-400" />
              )}
              <span className={`font-semibold ${isCorrect ? 'text-green-100' : 'text-red-100'}`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            <p className={`text-sm ${isCorrect ? 'text-green-100' : 'text-red-100'}`}>
              {isCorrect 
                ? 'Excellent! Grouping\'s main advantage is convenience - controlling multiple lights simultaneously with a single command, whether via app, voice, or switch.'
                : 'The main advantage of grouping is convenience - being able to control multiple lights together with one command. This simplifies daily routines and whole-home control.'
              }
            </p>
            <Button 
              onClick={resetCheck}
              variant="outline"
              className="mt-3 border-gray-600 text-gray-300 hover:bg-gray-700"
              size="sm"
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};