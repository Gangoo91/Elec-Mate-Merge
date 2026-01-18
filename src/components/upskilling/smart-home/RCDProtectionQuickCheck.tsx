import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, HelpCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const RCDProtectionQuickCheck = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState(false);

  const question = "What BS 7671 requirement protects circuits from electric shock and fire risk?";
  const options = [
    { id: 'a', text: "Cable colour coding standards", correct: false },
    { id: 'b', text: "RCD (Residual Current Device) protection", correct: true },
    { id: 'c', text: "IP rating requirements for enclosures", correct: false },
    { id: 'd', text: "Maximum cable length restrictions", correct: false }
  ];
  
  const correctAnswer = options.find(opt => opt.correct);

  const handleSubmit = () => {
    setShowAnswer(true);
  };

  return (
    <Card className="bg-blue-600/10 border border-blue-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2 text-lg">
          <HelpCircle className="h-5 w-5 text-blue-400" />
          In-line Check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground font-medium">{question}</p>
        
        <div className="space-y-2">
          {options.map((option) => (
            <label key={option.id} className="flex items-start gap-3 p-3 bg-[#1a1a1a] rounded-lg cursor-pointer hover:bg-[#252525] active:bg-[#303030] transition-all touch-manipulation">
              <input
                type="radio"
                name="rcd-protection"
                value={option.id}
                checked={selectedAnswer === option.id}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="mt-1"
                disabled={showAnswer}
              />
              <span className={`text-sm ${showAnswer 
                ? (option.correct ? 'text-green-300' : selectedAnswer === option.id ? 'text-red-300' : 'text-gray-300')
                : 'text-gray-300'
              }`}>
                {option.text}
              </span>
              {showAnswer && option.correct && (
                <CheckCircle className="h-4 w-4 text-green-400 ml-auto flex-shrink-0" />
              )}
              {showAnswer && selectedAnswer === option.id && !option.correct && (
                <XCircle className="h-4 w-4 text-red-400 ml-auto flex-shrink-0" />
              )}
            </label>
          ))}
        </div>

        {!showAnswer && selectedAnswer && (
          <Button onClick={handleSubmit} className="bg-elec-yellow text-elec-dark hover:bg-yellow-500">
            Check Answer
          </Button>
        )}

        {showAnswer && (
          <div className="p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg">
            <p className="text-elec-yellow font-medium mb-2">
              {selectedAnswer === correctAnswer?.id ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            <p className="text-foreground text-sm">
              <strong>Explanation:</strong> RCD (Residual Current Device) protection is required by BS 7671 for most new circuits. 
              RCDs detect current imbalances that indicate earth faults, quickly disconnecting power to prevent electric shock 
              and reduce fire risk from earth fault currents.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RCDProtectionQuickCheck;