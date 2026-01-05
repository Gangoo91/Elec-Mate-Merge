import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

export const FirmwareUpdateQuickCheck = () => {
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
    <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-purple-400" />
          Quick Check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-purple-100 font-medium">
          Why should firmware updates be applied regularly?
        </p>
        
        {!showFeedback ? (
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start text-left border-gray-600 hover:border-purple-400 hover:bg-purple-900/20"
              onClick={() => handleAnswer('new-features')}
            >
              To add new features and improve user interface
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start text-left border-gray-600 hover:border-purple-400 hover:bg-purple-900/20"
              onClick={() => handleAnswer('patch-vulnerabilities')}
            >
              To patch security vulnerabilities and fix bugs
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start text-left border-gray-600 hover:border-purple-400 hover:bg-purple-900/20"
              onClick={() => handleAnswer('battery-life')}
            >
              To improve battery life and reduce power consumption
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border-2 ${
              selectedAnswer === 'patch-vulnerabilities' 
                ? 'border-green-500 bg-green-900/20' 
                : 'border-red-500 bg-red-900/20'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === 'patch-vulnerabilities' ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400" />
                )}
                <span className={`font-semibold ${
                  selectedAnswer === 'patch-vulnerabilities' ? 'text-green-300' : 'text-red-300'
                }`}>
                  {selectedAnswer === 'patch-vulnerabilities' ? 'Correct!' : 'Not quite right'}
                </span>
              </div>
              <p className="text-gray-300 text-sm">
                The primary reason for regular firmware updates is to <strong>patch security vulnerabilities</strong> and fix bugs. As new threats are discovered, manufacturers release updates to protect against them. Delaying updates leaves locks vulnerable to known exploits.
              </p>
            </div>
            
            <Button 
              onClick={resetQuiz}
              variant="ghost"
              className="text-purple-400 hover:text-purple-300"
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};