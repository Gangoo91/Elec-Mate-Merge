import { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const EmergencyLightingQuickCheckSection4 = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: boolean | null}>({});

  const questions = [
    {
      id: 1,
      question: "BS 5266-1:2016 is the primary British Standard for emergency lighting design and installation.",
      correctAnswer: true,
      explanation: "BS 5266-1:2016 is indeed the comprehensive British Standard providing guidance on emergency lighting for all non-domestic premises, covering design, installation, and maintenance."
    },
    {
      id: 2,
      question: "BS EN 1838:2013 covers the testing and maintenance procedures for emergency lighting systems.",
      correctAnswer: false,
      explanation: "BS EN 1838:2013 covers photometric requirements and measurement methods. Testing and maintenance procedures are covered by BS 5266-8:2004 and BS EN 50172:2004."
    },
    {
      id: 3,
      question: "The Fire Safety Order 2005 places legal duties on responsible persons to provide adequate emergency lighting.",
      correctAnswer: true,
      explanation: "The Regulatory Reform (Fire Safety) Order 2005 creates statutory duties for responsible persons to conduct risk assessments and provide adequate fire safety measures, including emergency lighting."
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
          Quick Check: Standards & Regulations
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p className="text-gray-400">Test your understanding of emergency lighting standards:</p>
        
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