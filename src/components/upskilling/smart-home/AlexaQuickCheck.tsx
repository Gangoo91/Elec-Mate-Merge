import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

export const AlexaQuickCheck = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = "What is one advantage and one disadvantage of Alexa integration?";
  const options = [
    "Advantage: Works only with Amazon devices; Disadvantage: Limited voice recognition",
    "Advantage: Wide device compatibility; Disadvantage: Heavy cloud dependency",
    "Advantage: Local processing only; Disadvantage: Requires technical setup",
    "Advantage: Apple integration; Disadvantage: Works only with iOS"
  ];
  
  const correctAnswer = 1;
  const explanation = "Alexa's main advantage is its wide compatibility with thousands of devices from different brands. However, it relies heavily on cloud services, which can be a disadvantage during internet outages or for privacy-conscious users.";

  const handleSubmit = () => {
    setShowResult(true);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <Card className="bg-elec-dark/30 border-elec-yellow/30">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="text-elec-yellow">🎯</span>
          Quick Check: Amazon Alexa
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground font-medium">{question}</p>
        
        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && setSelectedAnswer(index)}
              className={`w-full p-3 text-left rounded-lg border transition-all duration-200 ${
                showResult
                  ? index === correctAnswer
                    ? 'border-green-500 bg-green-500/20 text-foreground'
                    : index === selectedAnswer && index !== correctAnswer
                    ? 'border-red-500 bg-red-500/20 text-foreground'
                    : 'border-gray-600 bg-gray-800/50 text-gray-300'
                  : selectedAnswer === index
                  ? 'border-elec-yellow bg-elec-yellow/20 text-foreground'
                  : 'border-gray-600 bg-gray-800/50 text-foreground hover:border-elec-yellow/50 hover:bg-elec-yellow/10'
              }`}
              disabled={showResult}
            >
              <div className="flex items-center gap-3">
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                <span className="text-sm">{option}</span>
                {showResult && index === correctAnswer && (
                  <CheckCircle2 className="h-5 w-5 text-green-400 ml-auto" />
                )}
                {showResult && index === selectedAnswer && index !== correctAnswer && (
                  <XCircle className="h-5 w-5 text-red-400 ml-auto" />
                )}
              </div>
            </button>
          ))}
        </div>

        {!showResult && selectedAnswer !== null && (
          <Button 
            onClick={handleSubmit}
            className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-500"
          >
            Check Answer
          </Button>
        )}

        {showResult && (
          <div className="space-y-3">
            <div className={`p-4 rounded-lg border ${
              selectedAnswer === correctAnswer 
                ? 'border-green-500 bg-green-500/20' 
                : 'border-red-500 bg-red-500/20'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === correctAnswer ? (
                  <Badge variant="secondary" className="bg-green-500 text-foreground">Correct!</Badge>
                ) : (
                  <Badge variant="destructive">Incorrect</Badge>
                )}
              </div>
              <p className="text-foreground text-sm">{explanation}</p>
            </div>
            
            <Button 
              onClick={resetQuiz}
              variant="outline"
              className="w-full border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-elec-dark"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};