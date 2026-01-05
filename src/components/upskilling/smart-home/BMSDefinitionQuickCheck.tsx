import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

export const BMSDefinitionQuickCheck = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = "What does BMS stand for?";
  const options = [
    { id: 'a', text: 'Building Monitoring System', correct: false },
    { id: 'b', text: 'Building Management System', correct: true },
    { id: 'c', text: 'Boiler Management System', correct: false },
    { id: 'd', text: 'Basic Maintenance System', correct: false }
  ];

  const handleAnswerSelect = (optionId: string) => {
    setSelectedAnswer(optionId);
    setShowResult(true);
  };

  const correctAnswer = options.find(option => option.correct);
  const isCorrect = selectedAnswer === correctAnswer?.id;

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Quick Check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 font-medium">{question}</p>
        
        <div className="grid gap-3">
          {options.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              onClick={() => handleAnswerSelect(option.id)}
              disabled={showResult}
              className={`justify-start text-left h-auto p-3 border-gray-600 text-gray-300 hover:bg-elec-gray hover:text-foreground ${
                showResult
                  ? option.correct
                    ? 'border-green-500 bg-green-500/10'
                    : selectedAnswer === option.id
                    ? 'border-red-500 bg-red-500/10'
                    : 'border-gray-600'
                  : ''
              }`}
            >
              <div className="flex items-center gap-2">
                {showResult && (
                  option.correct ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : selectedAnswer === option.id ? (
                    <XCircle className="h-4 w-4 text-red-400" />
                  ) : null
                )}
                <span>{option.text}</span>
              </div>
            </Button>
          ))}
        </div>

        {showResult && (
          <div className={`p-3 rounded-lg ${isCorrect ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
            <p className={`font-medium ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </p>
            <p className="text-gray-300 text-sm mt-1">
              {isCorrect 
                ? 'BMS stands for Building Management System - a centralised platform for controlling building services.'
                : `The correct answer is "${correctAnswer?.text}". BMS is a centralised platform for controlling HVAC, lighting, security, and energy systems.`
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};