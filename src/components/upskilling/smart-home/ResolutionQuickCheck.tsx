import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

export const ResolutionQuickCheck = () => {
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
    <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-orange-400" />
          Quick Check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-orange-100 font-medium">
          What does 1080p resolution mean?
        </p>
        
        {!showFeedback ? (
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start text-left border-gray-600 hover:border-orange-400 hover:bg-orange-900/20"
              onClick={() => handleAnswer('1080-frames')}
            >
              1080 frames per second video recording
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start text-left border-gray-600 hover:border-orange-400 hover:bg-orange-900/20"
              onClick={() => handleAnswer('1920x1080')}
            >
              1920 × 1080 pixels (Full HD resolution)
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start text-left border-gray-600 hover:border-orange-400 hover:bg-orange-900/20"
              onClick={() => handleAnswer('1080-megabytes')}
            >
              1080 megabytes of storage capacity
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border-2 ${
              selectedAnswer === '1920x1080' 
                ? 'border-green-500 bg-green-900/20' 
                : 'border-red-500 bg-red-900/20'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === '1920x1080' ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400" />
                )}
                <span className={`font-semibold ${
                  selectedAnswer === '1920x1080' ? 'text-green-300' : 'text-red-300'
                }`}>
                  {selectedAnswer === '1920x1080' ? 'Correct!' : 'Not quite right'}
                </span>
              </div>
              <p className="text-gray-300 text-sm">
                <strong>1080p</strong> refers to Full HD resolution of 1920 × 1080 pixels. The 'p' stands for progressive scan, meaning all lines are drawn in sequence rather than interlaced.
              </p>
            </div>
            
            <Button 
              onClick={resetQuiz}
              variant="ghost"
              className="text-orange-400 hover:text-orange-300"
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};