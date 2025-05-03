
import { Button } from "@/components/ui/button";
import { QuizResultsProps } from "@/types/quiz";
import { Check, HelpCircle, AlertCircle } from "lucide-react";

const QuizResults = ({ 
  score, 
  totalQuestions, 
  questions, 
  userAnswers, 
  onRetry 
}: QuizResultsProps) => {
  const percentage = (score / totalQuestions) * 100;
  
  return (
    <div className="bg-elec-gray p-6 rounded-lg border border-elec-yellow/20 space-y-4 animate-fade-in">
      <h3 className="text-xl font-bold text-center">Quiz Complete!</h3>
      <div className="flex flex-col items-center justify-center py-4">
        <div className="w-32 h-32 rounded-full border-4 border-elec-yellow flex items-center justify-center mb-4">
          <span className="text-3xl font-bold">{percentage}%</span>
        </div>
        <p className="text-center text-lg">
          You scored <span className="font-bold text-elec-yellow">{score}</span> out of <span className="font-bold">{totalQuestions}</span>
        </p>
        {percentage >= 70 ? (
          <div className="mt-4 flex items-center gap-2 text-green-500">
            <Check className="h-5 w-5" /> 
            <span>Well done! You've passed this unit quiz.</span>
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-2 text-amber-500">
            <HelpCircle className="h-5 w-5" /> 
            <span>You might want to review this unit again.</span>
          </div>
        )}
      </div>

      <div className="mt-8 space-y-6">
        <h4 className="font-semibold text-lg">Review Your Answers</h4>
        
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} className="p-4 border border-elec-yellow/20 rounded-lg">
              <div className="flex gap-2 mb-3">
                <span className="font-medium">Question {index + 1}:</span>
                {userAnswers[index] === question.correctAnswer ? (
                  <span className="text-green-500 flex items-center gap-1">
                    <Check className="h-4 w-4" /> Correct
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" /> Incorrect
                  </span>
                )}
              </div>
              
              <p className="mb-2">{question.question}</p>
              
              <div className="ml-4 space-y-1">
                {question.options.map((option, optIndex) => (
                  <div 
                    key={optIndex}
                    className={`
                      p-2 rounded flex items-center gap-2
                      ${optIndex === question.correctAnswer ? 'bg-green-500/10 text-green-500' : ''}
                      ${optIndex === userAnswers[index] && optIndex !== question.correctAnswer ? 'bg-red-500/10 text-red-500' : ''}
                    `}
                  >
                    {optIndex === question.correctAnswer ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (optIndex === userAnswers[index]) ? (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    ) : (
                      <span className="w-4" />
                    )}
                    {option}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-6">
        <Button 
          onClick={onRetry}
          className="bg-elec-yellow hover:bg-elec-yellow/80 text-elec-dark"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;
