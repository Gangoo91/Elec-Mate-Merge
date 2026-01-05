import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

export const SecurityRisksQuickCheck = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  return (
    <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-red-400" />
          Quick Check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-red-100 font-medium">
          What's the biggest risk of relying only on PIN codes?
        </p>
        
        {!showFeedback ? (
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start text-left border-gray-600 hover:border-red-400 hover:bg-red-900/20"
              onClick={() => handleAnswer('battery-failure')}
            >
              Battery failure making the lock inoperable
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start text-left border-gray-600 hover:border-red-400 hover:bg-red-900/20"
              onClick={() => handleAnswer('code-sharing')}
            >
              Code sharing reduces security when codes aren't managed properly
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start text-left border-gray-600 hover:border-red-400 hover:bg-red-900/20"
              onClick={() => handleAnswer('slower-entry')}
            >
              PIN entry is slower than using physical keys
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border-2 ${
              selectedAnswer === 'code-sharing' 
                ? 'border-green-500 bg-green-900/20' 
                : 'border-red-500 bg-red-900/20'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === 'code-sharing' ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400" />
                )}
                <span className={`font-semibold ${
                  selectedAnswer === 'code-sharing' ? 'text-green-300' : 'text-red-300'
                }`}>
                  {selectedAnswer === 'code-sharing' ? 'Correct!' : 'Not quite right'}
                </span>
              </div>
              <p className="text-gray-300 text-sm">
                <strong>Code sharing</strong> is the biggest security risk. When codes are shared carelessly, given to too many people, or not changed regularly, they can compromise the entire security system. Always use temporary codes and revoke access when no longer needed.
              </p>
            </div>
            
            <Button 
              onClick={resetQuiz}
              variant="ghost"
              className="text-red-400 hover:text-red-300"
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};