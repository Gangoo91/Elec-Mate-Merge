import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export const EmergencyLightingQuickCheckSection2_2 = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: "When is anti-panic lighting required?",
      options: ["Areas > 30m²", "Areas > 60m²", "Areas > 100m²", "All areas"],
      correct: "Areas > 60m²",
      explanation: "Anti-panic lighting is required for open areas exceeding 60m² to reduce panic and provide safe movement."
    },
    {
      id: 2,
      question: "What is the minimum illuminance for anti-panic lighting?",
      options: ["0.2 lux", "0.5 lux", "1 lux", "2 lux"],
      correct: "0.5 lux",
      explanation: "BS 5266 requires a minimum of 0.5 lux at floor level for open area (anti-panic) lighting."
    },
    {
      id: 3,
      question: "What is the maximum spacing for anti-panic luminaires?",
      options: ["2 x height", "3 x height", "4 x height", "5 x height"],
      correct: "4 x height",
      explanation: "Anti-panic luminaires should be spaced at maximum intervals of 4 times their mounting height."
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