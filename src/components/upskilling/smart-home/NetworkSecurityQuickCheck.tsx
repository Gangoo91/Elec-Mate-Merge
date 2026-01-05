import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

export const NetworkSecurityQuickCheck = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = "What could happen if a smart home network is not secured?";
  const options = [
    "Nothing serious would happen",
    "Attackers could gain control of devices and steal data",
    "The internet would be slightly slower",
    "Only the router would be affected"
  ];
  const correctAnswer = "Attackers could gain control of devices and steal data";

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <Card className="bg-blue-950/20 border-blue-800/30">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="h-4 w-4 text-blue-400" />
          <h4 className="font-semibold text-blue-400">Quick Check</h4>
        </div>
        
        <p className="text-foreground mb-4 font-medium">{question}</p>
        
        {!showResult ? (
          <div className="space-y-2">
            {options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start text-left h-auto p-3 border-gray-600 text-gray-300 hover:bg-blue-900/30 hover:border-blue-500"
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <div className={`p-3 rounded-lg border ${
              selectedAnswer === correctAnswer 
                ? 'bg-green-950/30 border-green-800/50' 
                : 'bg-red-950/30 border-red-800/50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === correctAnswer ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-400" />
                )}
                <span className={`font-semibold ${
                  selectedAnswer === correctAnswer ? 'text-green-400' : 'text-red-400'
                }`}>
                  {selectedAnswer === correctAnswer ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              
              {selectedAnswer !== correctAnswer && (
                <p className="text-gray-300 text-sm mb-2">
                  <strong>Your answer:</strong> {selectedAnswer}
                </p>
              )}
              
              <p className="text-gray-300 text-sm">
                <strong>Correct answer:</strong> {correctAnswer}
              </p>
              
              <p className="text-gray-300 text-sm mt-2">
                Unsecured networks can expose smart homes to serious security risks including unauthorised 
                device control, data theft, privacy breaches, and surveillance.
              </p>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetQuiz}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};