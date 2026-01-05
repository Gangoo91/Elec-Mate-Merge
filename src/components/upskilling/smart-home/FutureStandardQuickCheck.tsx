import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

export const FutureStandardQuickCheck = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = "What future standard may reduce the need for hubs?";
  const options = [
    { id: 'a', text: 'Wi-Fi 7', correct: false },
    { id: 'b', text: 'Matter', correct: true },
    { id: 'c', text: 'Bluetooth 6.0', correct: false },
    { id: 'd', text: '5G Cellular', correct: false }
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
          Quick Check: Future Standards
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
                ? 'Perfect! Matter is the new connectivity standard that enables direct device interoperability across different ecosystems, potentially reducing the need for traditional protocol-bridging hubs.'
                : 'Matter is the emerging standard that may reduce hub dependency. It enables devices from different manufacturers to communicate directly, using Thread networking for mesh capabilities without traditional hubs.'
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