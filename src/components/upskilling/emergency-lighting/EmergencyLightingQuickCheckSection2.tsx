import { CheckCircle2, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export const EmergencyLightingQuickCheckSection2 = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: boolean}>({});

  const questions = [
    {
      id: 1,
      question: "Emergency lighting is only required in areas designated as escape routes",
      correct: false,
      explanation: "Incorrect. Emergency lighting is also required in toilets >8m², plant rooms, areas with high fire risk, and many other locations specified by BS5266."
    },
    {
      id: 2,
      question: "All stairways must have emergency lighting on each flight and half-landing",
      correct: true,
      explanation: "Correct. BS5266 requires emergency lighting to illuminate each flight of stairs and every half-landing with minimum 1 lux on treads."
    },
    {
      id: 3,
      question: "Operating theatres in hospitals require 3-hour emergency lighting duration",
      correct: true,
      explanation: "Correct. Critical healthcare areas like operating theatres require extended 3-hour duration emergency lighting for patient safety."
    }
  ];

  const handleAnswer = (questionId: number, answer: boolean) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  return (
    <Card className="bg-elec-gray border-gray-600 border">
      <CardHeader>
        <CardTitle className="text-elec-yellow">Quick Check: Required Locations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions.map((q) => (
          <div key={q.id} className="space-y-2">
            <p className="text-foreground font-medium">{q.question}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleAnswer(q.id, true)}
                className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                  selectedAnswers[q.id] === true
                    ? 'bg-green-600/20 text-green-400 border border-green-600/40'
                    : 'bg-elec-gray hover:bg-[#323232] text-gray-300'
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                True
              </button>
              <button
                onClick={() => handleAnswer(q.id, false)}
                className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                  selectedAnswers[q.id] === false
                    ? 'bg-red-600/20 text-red-400 border border-red-600/40'
                    : 'bg-elec-gray hover:bg-[#323232] text-gray-300'
                }`}
              >
                <X className="h-4 w-4" />
                False
              </button>
            </div>
            {selectedAnswers[q.id] !== undefined && (
              <p className={`text-sm ${selectedAnswers[q.id] === q.correct ? 'text-green-400' : 'text-red-400'}`}>
                {selectedAnswers[q.id] === q.correct ? '✓ Correct! ' : '✗ Incorrect. '}
                {q.explanation}
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};