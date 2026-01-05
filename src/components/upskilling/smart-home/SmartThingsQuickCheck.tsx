import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

export const SmartThingsQuickCheck = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = "Why might SmartThings be a good choice for a beginner smart home user?";
  const options = [
    "Because it requires advanced programming knowledge",
    "Because it only works with Samsung devices",
    "Because it's easy to set up with a user-friendly app and broad device compatibility",
    "Because it works completely offline without internet"
  ];
  const correctAnswer = 2;

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <Card className="bg-elec-dark border-elec-yellow/30">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-elec-yellow flex items-center gap-2">
          👉 Quick Check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground font-medium">{question}</p>
        
        <div className="space-y-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                showResult
                  ? index === correctAnswer
                    ? 'bg-green-900/30 border-green-500 text-green-300'
                    : index === selectedAnswer
                    ? 'bg-red-900/30 border-red-500 text-red-300'
                    : 'bg-gray-800/30 border-gray-600 text-gray-400'
                  : 'bg-elec-gray border-gray-600 text-foreground hover:border-elec-yellow/50 hover:bg-elec-yellow/10'
              }`}
            >
              <div className="flex items-center gap-3">
                {showResult && index === correctAnswer && (
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                )}
                {showResult && index === selectedAnswer && index !== correctAnswer && (
                  <XCircle className="h-5 w-5 text-red-400" />
                )}
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className="space-y-3">
            <div className={`p-4 rounded-lg border ${
              selectedAnswer === correctAnswer
                ? 'bg-green-900/20 border-green-500/30'
                : 'bg-red-900/20 border-red-500/30'
            }`}>
              <p className="text-foreground text-sm">
                {selectedAnswer === correctAnswer
                  ? "Correct! SmartThings is designed for beginners with its simple setup process, intuitive mobile app, and broad compatibility with different device brands, making it accessible to users without technical expertise."
                  : "Not quite. SmartThings is ideal for beginners because it offers easy setup, a user-friendly app, and works with many different device brands without requiring technical knowledge."
                }
              </p>
            </div>

            <Button
              onClick={resetQuiz}
              variant="outline"
              size="sm"
              className="bg-transparent border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-elec-dark"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};