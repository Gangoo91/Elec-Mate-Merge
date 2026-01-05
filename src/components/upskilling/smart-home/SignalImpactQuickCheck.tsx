import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, CheckCircle, XCircle } from 'lucide-react';

const SignalImpactQuickCheck = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const question = "What happens when Wi-Fi or RF signals are weak in a smart home system?";
  const options = [
    "Devices work faster",
    "Lower electricity bills",
    "Delays, missed commands, or devices appearing 'offline'",
    "Better security"
  ];
  const correctAnswer = "Delays, missed commands, or devices appearing 'offline'";

  const handleSubmit = () => {
    setShowAnswer(true);
  };

  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-400" />
          Quick Check: Signal Impact
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 font-medium">{question}</p>
        
        <div className="space-y-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(option)}
              disabled={showAnswer}
              className={`w-full text-left p-3 rounded-md border transition-colors ${
                showAnswer
                  ? option === correctAnswer
                    ? 'bg-green-600/20 border-green-600 text-green-100'
                    : option === selectedAnswer && !isCorrect
                    ? 'bg-red-600/20 border-red-600 text-red-100'
                    : 'border-gray-600 text-gray-400'
                  : selectedAnswer === option
                  ? 'bg-blue-600/20 border-blue-600 text-blue-100'
                  : 'border-gray-600 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {!showAnswer && selectedAnswer && (
          <Button onClick={handleSubmit} className="bg-elec-yellow text-black hover:bg-yellow-500">
            Check Answer
          </Button>
        )}

        {showAnswer && (
          <div className={`p-3 rounded-md border ${
            isCorrect 
              ? 'bg-green-600/10 border-green-600/30' 
              : 'bg-red-600/10 border-red-600/30'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <XCircle className="h-4 w-4 text-red-400" />
              )}
              <span className={`font-semibold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              Weak Wi-Fi or RF signals cause delays in response, missed commands, intermittent connectivity, and devices appearing offline in apps. Strong signals are essential for reliable smart home operation.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SignalImpactQuickCheck;