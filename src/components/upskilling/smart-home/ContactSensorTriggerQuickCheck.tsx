import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

export const ContactSensorTriggerQuickCheck = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = "What happens when a door contact sensor is triggered?";
  const options = [
    "The circuit opens when magnet separates from the reed switch",
    "The camera starts recording via Wi-Fi automatically", 
    "The sensor detects sound waves from the door"
  ];
  const correctAnswer = 0;
  const explanation = "Contact sensors work by magnetic separation - when the door opens, the magnet moves away from the reed switch, opening the circuit and triggering an alert.";

  const handleAnswerSelect = (answerIndex: string) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const isCorrect = selectedAnswer !== null && parseInt(selectedAnswer) === correctAnswer;

  return (
    <div className="w-full">
      <Card className="bg-elec-gray border-transparent">
        <CardContent className="p-6">
          <h3 className="text-foreground font-semibold text-base sm:text-lg mb-4 flex items-start sm:items-center gap-2 flex-wrap">
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0 mt-0.5 sm:mt-0" />
            <span className="break-words">Quick Check: Contact Sensor Trigger</span>
          </h3>

          <div className="space-y-4">
            <p className="text-foreground font-medium text-sm sm:text-base break-words">{question}</p>
            
            {!showResult ? (
              <div className="space-y-3">
                {options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full justify-start text-left p-3 sm:p-4 h-auto min-h-[60px] border transition-all ${
                      selectedAnswer === index.toString() 
                        ? 'border-elec-yellow bg-elec-dark text-foreground' 
                        : 'border-gray-600 bg-elec-dark text-foreground hover:border-gray-500'
                    }`}
                    onClick={() => handleAnswerSelect(index.toString())}
                  >
                    <div className="flex items-start gap-2 sm:gap-3 w-full">
                      <span className="font-medium flex-shrink-0 text-sm sm:text-base mt-1">{String.fromCharCode(65 + index)}.</span>
                      <span className="text-left break-words hyphens-auto text-sm sm:text-base leading-relaxed flex-1">{option}</span>
                    </div>
                  </Button>
                ))}
                
                <div className="flex justify-center sm:justify-end">
                  <Button
                    onClick={handleSubmit}
                    disabled={selectedAnswer === null}
                    className="bg-elec-yellow text-elec-dark hover:bg-yellow-500 w-full sm:w-auto text-sm sm:text-base"
                  >
                    Submit Answer
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className={`p-3 sm:p-4 rounded-lg border ${isCorrect ? 'border-green-600 bg-green-900/20' : 'border-red-600 bg-red-900/20'}`}>
                  <div className="flex items-start gap-2 sm:gap-3">
                    {isCorrect ? (
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium mb-2 text-sm sm:text-base ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                        {isCorrect ? 'Correct!' : 'Incorrect'}
                      </p>
                      <p className="text-xs sm:text-sm text-foreground mb-2 break-words hyphens-auto">
                        <strong>Correct answer:</strong> {options[correctAnswer]}
                      </p>
                      <p className="text-xs sm:text-sm text-foreground break-words hyphens-auto leading-relaxed">
                        {explanation}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center sm:justify-end">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="border-gray-600 text-foreground hover:border-gray-500 w-full sm:w-auto text-sm sm:text-base"
                  >
                    <RotateCcw className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};