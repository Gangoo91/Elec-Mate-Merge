import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

export const RetrofitReplacementQuickCheck = () => {
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
    <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-400" />
          Quick Check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-blue-100 font-medium">
          What's the difference between a retrofit and a replacement smart lock?
        </p>
        
        {!showFeedback ? (
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start text-left border-gray-600 hover:border-blue-400 hover:bg-blue-900/20 whitespace-normal break-words leading-snug"
              onClick={() => handleAnswer('retrofit-easier')}
            >
              <span className="flex-1 min-w-0 break-words">Retrofit locks are easier to install but less secure</span>
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start text-left border-gray-600 hover:border-blue-400 hover:bg-blue-900/20 whitespace-normal break-words leading-snug"
              onClick={() => handleAnswer('retrofit-fits-over')}
            >
              <span className="flex-1 min-w-0 break-words">Retrofit locks fit over existing deadbolts; replacement locks fully replace the original lock</span>
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start text-left border-gray-600 hover:border-blue-400 hover:bg-blue-900/20 whitespace-normal break-words leading-snug"
              onClick={() => handleAnswer('replacement-wireless')}
            >
              <span className="flex-1 min-w-0 break-words">Replacement locks are always wireless; retrofit locks are always wired</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border-2 ${
              selectedAnswer === 'retrofit-fits-over' 
                ? 'border-green-500 bg-green-900/20' 
                : 'border-red-500 bg-red-900/20'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === 'retrofit-fits-over' ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400" />
                )}
                <span className={`font-semibold ${
                  selectedAnswer === 'retrofit-fits-over' ? 'text-green-300' : 'text-red-300'
                }`}>
                  {selectedAnswer === 'retrofit-fits-over' ? 'Correct!' : 'Not quite right'}
                </span>
              </div>
              <p className="text-gray-300 text-sm">
                <strong>Retrofit locks</strong> fit over existing deadbolts (like August Smart Lock), making installation easier but keeping the original lock mechanism. <strong>Replacement locks</strong> completely replace the traditional lock with new electronic hardware.
              </p>
            </div>
            
            <Button 
              onClick={resetQuiz}
              variant="ghost"
              className="text-blue-400 hover:text-blue-300"
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};