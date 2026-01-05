import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

export const PinCodeQuickCheck = () => {
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
    <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-green-400" />
          Quick Check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-green-100 font-medium">
          Why might one-time PIN codes be useful?
        </p>
        
        {!showFeedback ? (
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start text-left border-gray-600 hover:border-green-400 hover:bg-green-900/20"
              onClick={() => handleAnswer('faster-entry')}
            >
              They allow faster entry than regular codes
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start text-left border-gray-600 hover:border-green-400 hover:bg-green-900/20"
              onClick={() => handleAnswer('secure-temporary')}
            >
              They provide secure temporary access without sharing permanent codes
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start text-left border-gray-600 hover:border-green-400 hover:bg-green-900/20"
              onClick={() => handleAnswer('cheaper-locks')}
            >
              They make smart locks cheaper to manufacture
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border-2 ${
              selectedAnswer === 'secure-temporary' 
                ? 'border-green-500 bg-green-900/20' 
                : 'border-red-500 bg-red-900/20'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === 'secure-temporary' ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400" />
                )}
                <span className={`font-semibold ${
                  selectedAnswer === 'secure-temporary' ? 'text-green-300' : 'text-red-300'
                }`}>
                  {selectedAnswer === 'secure-temporary' ? 'Correct!' : 'Not quite right'}
                </span>
              </div>
              <p className="text-gray-300 text-sm">
                One-time PIN codes are perfect for <strong>temporary access</strong> scenarios like guests, cleaners, or deliveries. They expire automatically, so you don't need to worry about changing permanent codes or collecting physical keys.
              </p>
            </div>
            
            <Button 
              onClick={resetQuiz}
              variant="ghost"
              className="text-green-400 hover:text-green-300"
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};