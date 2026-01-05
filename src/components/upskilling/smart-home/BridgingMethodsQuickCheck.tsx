import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const BridgingMethodsQuickCheck = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
  };

  const correctAnswer = "Hardware bridges like the Philips Hue Bridge";

  return (
    <Card className="bg-blue-500/10 border-blue-500/30">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="h-5 w-5 text-blue-400" />
          <h4 className="text-lg font-semibold text-foreground">👉 Quick Check</h4>
        </div>
        
        <p className="text-foreground mb-4 font-medium">Name one method of bridging legacy devices with modern smart platforms:</p>
        
        <div className="space-y-2 mb-4">
          {[
            "Installing new wiring throughout the house",
            "Hardware bridges like the Philips Hue Bridge",
            "Replacing all old devices immediately",
            "Using only voice commands"
          ].map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback}
              className={`w-full text-left p-3 rounded border transition-all duration-200 ${
                showFeedback
                  ? option === correctAnswer
                    ? 'bg-green-500/20 border-green-500/50 text-green-300'
                    : option === selectedAnswer
                    ? 'bg-red-500/20 border-red-500/50 text-red-300'
                    : 'bg-elec-gray/50 border-gray-600 text-gray-400'
                  : 'bg-elec-gray/50 border-gray-600 text-foreground hover:bg-elec-gray hover:border-elec-yellow/50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className={`p-3 rounded border ${
            selectedAnswer === correctAnswer
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-red-500/10 border-red-500/30'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {selectedAnswer === correctAnswer ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-400" />
              )}
              <span className={`font-semibold ${
                selectedAnswer === correctAnswer ? 'text-green-400' : 'text-red-400'
              }`}>
                {selectedAnswer === correctAnswer ? 'Correct!' : 'Not quite right'}
              </span>
            </div>
            <p className="text-foreground text-sm">
              Hardware bridges are physical devices that translate between different protocols, like the Hue Bridge connecting Zigbee bulbs to Wi-Fi networks.
            </p>
          </div>
        )}

        {!showFeedback && (
          <p className="text-gray-400 text-sm">Select your answer to see feedback</p>
        )}
      </CardContent>
    </Card>
  );
};

export default BridgingMethodsQuickCheck;