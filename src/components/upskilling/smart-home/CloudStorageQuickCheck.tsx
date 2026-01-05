import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

export const CloudStorageQuickCheck = () => {
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
    <Card className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-cyan-400" />
          Quick Check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-cyan-100 font-medium">
          Give one advantage and one disadvantage of cloud storage.
        </p>
        
        {!showFeedback ? (
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start text-left border-gray-600 hover:border-cyan-400 hover:bg-cyan-900/20"
              onClick={() => handleAnswer('faster-cheaper')}
            >
              Advantage: Faster access; Disadvantage: More expensive than local
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start text-left border-gray-600 hover:border-cyan-400 hover:bg-cyan-900/20"
              onClick={() => handleAnswer('remote-subscription')}
            >
              Advantage: Remote access anywhere; Disadvantage: Requires internet and subscription fees
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start text-left border-gray-600 hover:border-cyan-400 hover:bg-cyan-900/20"
              onClick={() => handleAnswer('unlimited-slower')}
            >
              Advantage: Unlimited storage; Disadvantage: Slower than local storage
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border-2 ${
              selectedAnswer === 'remote-subscription' 
                ? 'border-green-500 bg-green-900/20' 
                : 'border-red-500 bg-red-900/20'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === 'remote-subscription' ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400" />
                )}
                <span className={`font-semibold ${
                  selectedAnswer === 'remote-subscription' ? 'text-green-300' : 'text-red-300'
                }`}>
                  {selectedAnswer === 'remote-subscription' ? 'Correct!' : 'Not quite right'}
                </span>
              </div>
              <p className="text-gray-300 text-sm">
                <strong>Cloud storage advantages:</strong> Access footage from anywhere, secure offsite backup, automatic updates. <strong>Disadvantages:</strong> Requires reliable internet, ongoing subscription costs, potential privacy concerns.
              </p>
            </div>
            
            <Button 
              onClick={resetQuiz}
              variant="ghost"
              className="text-cyan-400 hover:text-cyan-300"
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};