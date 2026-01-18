import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, HelpCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const IsolationSafetyQuickCheck = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState(false);

  const question = "Why must electricians use lock-off and proving units during isolation?";
  const options = [
    { id: 'a', text: "To comply with health and safety regulations only", correct: false },
    { id: 'b', text: "To prevent accidental re-energisation and verify isolation is effective", correct: true },
    { id: 'c', text: "To show clients that professional equipment is being used", correct: false },
    { id: 'd', text: "To delay the work and increase labour charges", correct: false }
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
                name="isolation-safety"
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
              <strong>Explanation:</strong> Lock-off devices physically prevent breakers from being switched on accidentally, 
              while proving units verify that isolation has been achieved and is maintained. This dual approach ensures 
              maximum safety and compliance with BS 7671 requirements.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IsolationSafetyQuickCheck;