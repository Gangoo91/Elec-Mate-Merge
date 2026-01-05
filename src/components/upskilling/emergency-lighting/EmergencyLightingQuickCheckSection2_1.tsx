import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export const EmergencyLightingQuickCheckSection2_1 = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is the minimum illuminance level for escape routes?",
      options: ["0.2 lux", "0.5 lux", "1 lux", "2 lux"],
      correct: "1 lux",
      explanation: "BS 5266 requires a minimum of 1 lux at floor level on the centre line of escape routes."
    },
    {
      id: 2,
      question: "What is the maximum uniformity ratio for escape lighting?",
      options: ["20:1", "40:1", "60:1", "100:1"],
      correct: "40:1",
      explanation: "The uniformity ratio between maximum and minimum illuminance levels must not exceed 40:1."
    },
    {
      id: 3,
      question: "Where must emergency escape lighting be provided?",
      options: ["Only at exits", "Escape routes only", "All areas", "Escape routes and exits"],
      correct: "Escape routes and exits",
      explanation: "Emergency escape lighting must illuminate all escape routes, exits, and areas leading to places of safety."
    }
  ];

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  return (
    <Card className="bg-elec-gray/30 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Quick Knowledge Check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((question) => (
          <div key={question.id} className="space-y-3">
            <h4 className="text-foreground font-medium">{question.question}</h4>
            <div className="grid grid-cols-2 gap-2">
              {question.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(question.id, option)}
                  className={`p-3 rounded-lg text-left transition-all duration-200 ${
                    selectedAnswers[question.id] === option
                      ? 'bg-elec-yellow/20 border-elec-yellow text-foreground'
                      : 'bg-elec-dark/50 border-gray-600 text-gray-300 hover:bg-elec-dark'
                  } border`}
                >
                  {option}
                </button>
              ))}
            </div>
            {showResults && selectedAnswers[question.id] && (
              <div className={`p-3 rounded-lg ${
                selectedAnswers[question.id] === question.correct 
                  ? 'bg-green-500/20 border-green-500/50' 
                  : 'bg-red-500/20 border-red-500/50'
              } border`}>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className={`h-4 w-4 ${
                    selectedAnswers[question.id] === question.correct ? 'text-green-400' : 'text-red-400'
                  }`} />
                  <span className={`font-medium ${
                    selectedAnswers[question.id] === question.correct ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {selectedAnswers[question.id] === question.correct ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                <p className="text-gray-300 text-sm">{question.explanation}</p>
              </div>
            )}
          </div>
        ))}
        
        {!showResults && Object.keys(selectedAnswers).length === questions.length && (
          <button
            onClick={handleShowResults}
            className="w-full bg-elec-yellow text-black py-2 px-4 rounded-lg hover:bg-elec-yellow/90 transition-colors"
          >
            Show Results
          </button>
        )}
        
        {showResults && (
          <div className="text-center">
            <Badge className="bg-elec-yellow/20 text-elec-yellow">
              Score: {questions.filter(q => selectedAnswers[q.id] === q.correct).length}/{questions.length}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};