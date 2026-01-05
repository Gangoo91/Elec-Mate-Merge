import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

const EcosystemSymptomsQuickCheck = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = "What is one symptom that suggests an ecosystem conflict?";
  const options = [
    "Devices use more electricity than normal",
    "Devices fail to respond consistently to commands",
    "Devices become physically warm",
    "Devices show low battery warnings"
  ];
  const correctAnswer = 1;
  const explanation = "Inconsistent device responses or partial routine failures, where only some devices respond while others don't, are classic signs of ecosystem conflicts between different platforms.";

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <Card className="bg-blue-500/10 border border-blue-500/30">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <HelpCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="text-blue-400 font-semibold mb-3">Quick Check</h4>
            <p className="text-foreground text-sm mb-4">
              <strong>Question:</strong> {question}
            </p>
            
            {!showResult ? (
              <div className="space-y-2">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className="w-full text-left p-3 rounded-lg bg-elec-dark/50 hover:bg-elec-gray/30 transition-colors duration-200 text-foreground text-sm border border-transparent hover:border-blue-400/30"
                  >
                    <span className="font-medium text-blue-300 mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg text-sm border ${
                        index === correctAnswer
                          ? 'bg-green-500/20 border-green-500/50 text-green-300'
                          : index === selectedAnswer && index !== correctAnswer
                          ? 'bg-red-500/20 border-red-500/50 text-red-300'
                          : 'bg-elec-dark/30 border-transparent text-gray-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {index === correctAnswer ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : index === selectedAnswer && index !== correctAnswer ? (
                          <XCircle className="h-4 w-4 text-red-400" />
                        ) : null}
                        <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <p className="text-blue-300 text-sm">
                    <strong>Explanation:</strong> {explanation}
                  </p>
                </div>
                
                <button
                  onClick={resetQuiz}
                  className="text-blue-400 text-sm hover:text-blue-300 transition-colors duration-200"
                >
                  Try again
                </button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EcosystemSymptomsQuickCheck;