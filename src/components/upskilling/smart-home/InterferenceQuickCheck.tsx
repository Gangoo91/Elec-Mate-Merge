import { useState } from 'react';
import { CheckCircle, X, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const InterferenceQuickCheck = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const options = [
    { id: 'a', text: 'Different radio signals competing for the same frequency space', correct: true },
    { id: 'b', text: 'Devices connecting to the wrong network', correct: false },
    { id: 'c', text: 'Poor internet connection', correct: false },
    { id: 'd', text: 'Low battery in devices', correct: false }
  ];

  const handleSubmit = () => {
    setShowFeedback(true);
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-elec-yellow" />
          Quick Check: Interference Basics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-foreground">
        <p className="text-foreground font-medium">What is wireless interference?</p>
        
        <div className="space-y-2">
          {options.map((option) => (
            <label
              key={option.id}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                selectedAnswer === option.id
                  ? 'border-elec-yellow bg-elec-yellow/10'
                  : 'border-gray-600 hover:border-gray-500'
              } ${
                showFeedback && option.correct
                  ? 'border-green-400 bg-green-400/10'
                  : showFeedback && selectedAnswer === option.id && !option.correct
                  ? 'border-red-400 bg-red-400/10'
                  : ''
              }`}
            >
              <input
                type="radio"
                name="interference"
                value={option.id}
                checked={selectedAnswer === option.id}
                onChange={() => setSelectedAnswer(option.id)}
                disabled={showFeedback}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selectedAnswer === option.id ? 'border-elec-yellow bg-elec-yellow' : 'border-gray-400'
              }`}>
                {selectedAnswer === option.id && <div className="w-2 h-2 rounded-full bg-elec-dark" />}
              </div>
              <span className="text-foreground">{option.text}</span>
              {showFeedback && option.correct && <Check className="h-4 w-4 text-green-400 ml-auto" />}
              {showFeedback && selectedAnswer === option.id && !option.correct && <X className="h-4 w-4 text-red-400 ml-auto" />}
            </label>
          ))}
        </div>

        {!showFeedback && selectedAnswer && (
          <Button 
            onClick={handleSubmit}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
          >
            Check Answer
          </Button>
        )}

        {showFeedback && (
          <div className="space-y-3">
            <div className={`p-3 rounded-lg border ${
              selectedAnswer === 'a' 
                ? 'border-green-400 bg-green-400/10' 
                : 'border-red-400 bg-red-400/10'
            }`}>
              <p className={`text-sm font-medium ${
                selectedAnswer === 'a' ? 'text-green-400' : 'text-red-400'
              }`}>
                {selectedAnswer === 'a' ? 'Correct!' : 'Incorrect'}
              </p>
              <p className="text-sm text-foreground mt-1">
                Interference occurs when multiple radio signals occupy overlapping frequency ranges, 
                causing signal degradation and communication failures.
              </p>
            </div>
            <Button 
              onClick={handleReset}
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-[#323232]"
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};