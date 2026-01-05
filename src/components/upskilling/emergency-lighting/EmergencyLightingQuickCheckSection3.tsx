import { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const EmergencyLightingQuickCheckSection3 = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: boolean | null}>({});

  const questions = [
    {
      id: 1,
      question: "Central battery systems are more suitable for large commercial installations than self-contained systems.",
      correctAnswer: true,
      explanation: "Central battery systems offer centralised maintenance, monitoring, and typically longer battery life, making them more cost-effective for large installations despite higher initial costs."
    },
    {
      id: 2,
      question: "Maintained emergency lighting operates only during mains power failure.",
      correctAnswer: false,
      explanation: "Maintained emergency lighting operates continuously, providing illumination during normal operation and switching to emergency supply during mains failure. Non-maintained systems only operate during power failure."
    },
    {
      id: 3,
      question: "Lithium Iron Phosphate batteries typically offer longer service life than Lead Acid (VRLA) batteries.",
      correctAnswer: true,
      explanation: "Lithium Iron Phosphate batteries typically last 10-20 years compared to 3-5 years for Lead Acid batteries, offering better long-term value despite higher initial costs."
    }
  ];

  const handleAnswer = (questionId: number, answer: boolean) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer
    });
  };

  return (
    <Card className="bg-elec-gray border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-cyan-400 drop-shadow-md" />
          Quick Check: System Types
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p className="text-gray-400">Test your understanding of emergency lighting system types:</p>
        
        {questions.map((question) => (
          <div key={question.id} className="space-y-3">
            <p className="font-medium">{question.id}. {question.question}</p>
            
            <div className="flex gap-3">
              <Button
                variant={selectedAnswers[question.id] === true ? "default" : "outline"}
                size="sm"
                onClick={() => handleAnswer(question.id, true)}
                className={selectedAnswers[question.id] === true 
                  ? "bg-elec-yellow text-black hover:bg-elec-yellow/90" 
                  : "border-gray-600 text-gray-300 hover:bg-gray-700"
                }
              >
                True
              </Button>
              <Button
                variant={selectedAnswers[question.id] === false ? "default" : "outline"}
                size="sm"
                onClick={() => handleAnswer(question.id, false)}
                className={selectedAnswers[question.id] === false 
                  ? "bg-elec-yellow text-black hover:bg-elec-yellow/90" 
                  : "border-gray-600 text-gray-300 hover:bg-gray-700"
                }
              >
                False
              </Button>
            </div>

            {selectedAnswers[question.id] !== undefined && (
              <div className={`p-3 rounded-lg border-l-4 ${
                selectedAnswers[question.id] === question.correctAnswer
                  ? 'bg-green-500/10 border-green-500'
                  : 'bg-red-500/10 border-red-500'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {selectedAnswers[question.id] === question.correctAnswer ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400" />
                  )}
                  <span className={`font-medium ${
                    selectedAnswers[question.id] === question.correctAnswer
                      ? 'text-green-300'
                      : 'text-red-300'
                  }`}>
                    {selectedAnswers[question.id] === question.correctAnswer ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                <p className="text-sm text-gray-300">{question.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};