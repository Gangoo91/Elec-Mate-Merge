import { CheckCircle2, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export const EmergencyLightingQuickCheck = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: boolean}>({});

  const questions = [
    {
      id: 1,
      question: "Emergency lighting is only required in buildings over 500m²",
      correct: false,
      explanation: "Emergency lighting is typically required in buildings over 200m² or based on risk assessment."
    },
    {
      id: 2,
      question: "The RRO places fire safety duties on the responsible person",
      correct: true,
      explanation: "Correct. The Regulatory Reform (Fire Safety) Order 2005 defines the responsible person's duties."
    },
    {
      id: 3,
      question: "BS 5266-1 is the primary standard for emergency lighting in the UK",
      correct: true,
      explanation: "Correct. BS 5266-1:2016 is the main code of practice for emergency lighting."
    },
    {
      id: 4,
      question: "Emergency lighting must provide illumination for a minimum of 3 hours",
      correct: true,
      explanation: "Correct. BS 5266-1 requires a minimum duration of 3 hours for emergency lighting systems."
    },
    {
      id: 5,
      question: "Only qualified electricians can design emergency lighting systems",
      correct: false,
      explanation: "While installation requires qualified electricians, design can be done by competent fire safety engineers or consultants."
    },
    {
      id: 6,
      question: "Emergency lighting is required in all escape routes",
      correct: true,
      explanation: "Correct. All escape routes must have adequate emergency lighting to ensure safe evacuation."
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
        <CardTitle className="text-elec-yellow">Quick Check: Legal Framework</CardTitle>
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