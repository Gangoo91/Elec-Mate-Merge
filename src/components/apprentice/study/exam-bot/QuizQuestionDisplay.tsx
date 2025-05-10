
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
        <p className="font-medium mb-4">{currentQuestion.question}</p>
        
        <RadioGroup disabled={hasAnswered}>
          {currentQuestion.options.map((option, index) => {
            const isCorrect = index === currentQuestion.correctAnswer;
            const isSelected = index === userAnswer;
            
            let optionClasses = "relative flex items-center p-3 rounded-md border";
            
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
              optionClasses += " border-elec-gray/30 hover:border-elec-yellow/50 cursor-pointer";
            }
            
            return (
              <div key={index} className={optionClasses} onClick={() => !hasAnswered && onAnswer(index)}>
                <RadioGroupItem 
                  value={index.toString()} 
                  id={`option-${index}`}
                  className="mr-2"
                />
                <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                  {option}
                </Label>
                {hasAnswered && (
                  <div className={`ml-2 flex items-center justify-center w-5 h-5 rounded-full ${isCorrect ? 'bg-green-500' : isSelected ? 'bg-red-500' : ''}`}>
                    {isCorrect ? <Check className="h-3 w-3 text-white" /> : isSelected ? <X className="h-3 w-3 text-white" /> : null}
                  </div>
                )}
              </div>
            );
          })}
        </RadioGroup>
        
        {showingExplanation && (
          <div className="mt-4 pt-4 border-t border-elec-yellow/20">
            <h4 className="text-elec-yellow font-medium mb-2">Explanation:</h4>
            <p className="text-sm">{currentQuestion.explanation}</p>
          </div>
        )}
      </div>
      
      {hasAnswered && (
        <Button className="w-full" onClick={onNext}>
          {!isLastQuestion ? 'Next Question' : 'See Results'}
        </Button>
      )}
    </div>
  );
};

export default QuizQuestionDisplay;
