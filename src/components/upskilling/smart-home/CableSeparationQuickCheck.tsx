import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw, Zap } from 'lucide-react';

const CableSeparationQuickCheck = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = "Why should power and data cables be routed separately where possible?";
  const options = [
    "To make the installation look more organised",
    "It's easier to identify different cable types",
    "To avoid electromagnetic interference affecting data transmission",
    "Power cables generate more heat than data cables"
  ];
  const correctAnswer = "To avoid electromagnetic interference affecting data transmission";

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          Quick Check: Cable Separation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 font-medium">{question}</p>
        
        <div className="space-y-2">
          {options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={`w-full text-left justify-start p-4 h-auto whitespace-normal border-gray-600 hover:bg-elec-dark transition-all ${
                showResult
                  ? option === correctAnswer
                    ? 'bg-green-900/20 border-green-600 text-green-200'
                    : selectedAnswer === option
                    ? 'bg-red-900/20 border-red-600 text-red-200'
                    : 'bg-gray-800 border-gray-600 text-gray-400'
                  : 'text-gray-300 hover:text-foreground hover:border-elec-yellow'
              }`}
              onClick={() => !showResult && handleAnswerSelect(option)}
              disabled={showResult}
            >
              <div className="flex items-start gap-3 w-full">
                {showResult && (
                  <div className="flex-shrink-0 mt-0.5">
                    {option === correctAnswer ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : selectedAnswer === option ? (
                      <XCircle className="h-4 w-4 text-red-400" />
                    ) : null}
                  </div>
                )}
                <span className="flex-1">{option}</span>
              </div>
            </Button>
          ))}
        </div>

        {showResult && (
          <div className={`p-4 rounded-lg border ${
            isCorrect
              ? 'bg-green-900/20 border-green-600'
              : 'bg-red-900/20 border-red-600'
          }`}>
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className={`font-semibold mb-2 ${
                  isCorrect ? 'text-green-200' : 'text-red-200'
                }`}>
                  {isCorrect ? 'Correct!' : 'Not quite right.'}
                </p>
                <p className={`text-sm ${
                  isCorrect ? 'text-green-100' : 'text-red-100'
                }`}>
                  {isCorrect 
                    ? "Perfect! Power cables generate electromagnetic fields that can interfere with data transmission, causing communication errors, reduced speeds, or connection drops. Separation prevents this interference and ensures reliable smart home system operation."
                    : "The main reason for cable separation is to prevent electromagnetic interference (EMI). Power cables create electromagnetic fields that can disrupt data signals, leading to communication problems, reduced network performance, and unreliable smart home functionality."
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {showResult && (
          <Button
            onClick={resetQuiz}
            variant="outline"
            className="w-full border-gray-600 text-gray-300 hover:bg-elec-gray hover:text-foreground"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CableSeparationQuickCheck;