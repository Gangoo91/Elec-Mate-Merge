
import { Check, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "./types";

interface QuizQuestionDisplayProps {
  currentQuestion: QuizQuestion;
  currentIndex: number;
  questionsLength: number;
  userAnswer: number | undefined;
  showingExplanation: boolean;
  onAnswer: (optionIndex: number) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

const QuizQuestionDisplay = ({
  currentQuestion,
  currentIndex,
  questionsLength,
  userAnswer,
  showingExplanation,
  onAnswer,
  onNext,
  isLastQuestion,
}: QuizQuestionDisplayProps) => {
  const hasAnswered = userAnswer !== undefined;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Question {currentIndex + 1} of {questionsLength}</span>
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          Practice Mode
        </span>
      </div>
      
      <div className="bg-elec-dark p-4 rounded-lg">
        <p className="font-medium mb-6 text-lg border-b border-elec-yellow/20 pb-3">{currentQuestion.question}</p>
        
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => {
            const isCorrect = index === currentQuestion.correctAnswer;
            const isSelected = index === userAnswer;
            
            let optionClasses = "relative flex items-center p-4 rounded-md border transition-all";
            
            if (hasAnswered) {
              if (isSelected && isCorrect) {
                optionClasses += " border-green-500 bg-green-500/10";
              } else if (isSelected && !isCorrect) {
                optionClasses += " border-red-500 bg-red-500/10";
              } else if (isCorrect) {
                optionClasses += " border-green-500 bg-green-500/10";
              } else {
                optionClasses += " border-elec-gray/30 bg-elec-gray/5";
              }
            } else {
              optionClasses += " border-elec-gray/30 hover:border-elec-yellow/50 hover:bg-elec-yellow/5 cursor-pointer";
            }
            
            return (
              <div key={index} className={optionClasses} onClick={() => !hasAnswered && onAnswer(index)}>
                <div className="flex items-center w-full">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 ${!hasAnswered ? 'border border-elec-gray/50' : (isSelected ? (isCorrect ? 'bg-green-500' : 'bg-red-500') : '')}`}>
                    {hasAnswered && isSelected && (isCorrect ? 
                      <Check className="h-3 w-3 text-white" /> : 
                      <X className="h-3 w-3 text-white" />)}
                  </div>
                  <span className="flex-grow cursor-pointer">{option}</span>
                  {hasAnswered && isCorrect && !isSelected && (
                    <div className="ml-2 flex items-center justify-center w-6 h-6 rounded-full bg-green-500">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {showingExplanation && (
          <div className="mt-6 pt-4 border-t border-elec-yellow/20">
            <h4 className="text-elec-yellow font-medium mb-2">Explanation:</h4>
            <p className="text-sm bg-elec-yellow/5 p-4 rounded-md border border-elec-yellow/10">{currentQuestion.explanation}</p>
          </div>
        )}
      </div>
      
      {hasAnswered && (
        <Button className="w-full bg-elec-yellow hover:bg-elec-yellow/80 text-elec-dark" onClick={onNext}>
          {!isLastQuestion ? 'Next Question' : 'See Results'}
        </Button>
      )}
    </div>
  );
};

export default QuizQuestionDisplay;
