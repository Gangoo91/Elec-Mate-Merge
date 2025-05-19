
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ExamResultsProps {
  examTitle: string;
  questions: Question[];
  selectedAnswers: Record<number, number>;
  onReturn: () => void;
}

const ExamResults: React.FC<ExamResultsProps> = ({
  examTitle,
  questions,
  selectedAnswers,
  onReturn
}) => {
  // Calculate results
  const calculateResults = () => {
    let correctCount = 0;
    
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const percentage = (correctCount / questions.length) * 100;
    
    return {
      correct: correctCount,
      total: questions.length,
      percentage: Math.round(percentage)
    };
  };

  const results = calculateResults();

  return (
    <Card className="border-elec-yellow/30 bg-elec-gray">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-lg sm:text-xl">{examTitle} - Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        <div className="text-center p-4 sm:p-6">
          <div className="text-4xl sm:text-6xl font-bold text-elec-yellow mb-2">{results.percentage}%</div>
          <p className="text-sm sm:text-base text-muted-foreground">
            You got {results.correct} out of {results.total} questions correct
          </p>
        </div>
        
        <div className="space-y-6 sm:space-y-8 mt-4 sm:mt-8">
          <h2 className="text-lg sm:text-xl font-semibold border-b border-elec-yellow/30 pb-2">Review Your Answers</h2>
          
          {questions.slice(0, 5).map((question, index) => (
            <div key={question.id} className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="flex-shrink-0">
                  {selectedAnswers[question.id] === question.correctAnswer ? (
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-1" />
                  ) : (
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mt-1" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base">{index + 1}. {question.text}</p>
                  <div className="mt-2 space-y-1">
                    {question.options.map((option, optionIndex) => (
                      <div 
                        key={optionIndex} 
                        className={`p-2 rounded-md text-xs sm:text-sm ${
                          optionIndex === question.correctAnswer 
                            ? 'bg-green-500/20 border border-green-500/30' 
                            : optionIndex === selectedAnswers[question.id]
                              ? 'bg-red-500/20 border border-red-500/30'
                              : 'bg-elec-dark/30'
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                  {selectedAnswers[question.id] !== question.correctAnswer && (
                    <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-elec-dark/50 rounded-md">
                      <p className="text-xs sm:text-sm font-medium">Explanation:</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{question.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {questions.length > 5 && (
            <p className="text-center text-xs sm:text-sm text-muted-foreground p-3 bg-elec-dark/30 rounded-md">
              Showing 5 out of {questions.length} questions. In the full version, all questions would be displayed.
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="pb-4">
        <Button 
          className="w-full" 
          onClick={onReturn}
        >
          Return to Mock Exams
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExamResults;
