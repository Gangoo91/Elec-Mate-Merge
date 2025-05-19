
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ExamQuestionProps {
  question: {
    id: number;
    text: string;
    options: string[];
  };
  selectedAnswer: number | undefined;
  onSelectAnswer: (questionId: number, optionIndex: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
}

const ExamQuestion: React.FC<ExamQuestionProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  onPrevious,
  onNext,
  onFinish,
  isFirstQuestion,
  isLastQuestion
}) => {
  return (
    <Card className="border-elec-yellow/30 bg-elec-gray animate-fade-in">
      <CardContent className="pt-4 sm:pt-6">
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-base sm:text-xl font-medium">{question.text}</h2>
          
          <div className="space-y-2 sm:space-y-3">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`p-2 sm:p-3 rounded-md border cursor-pointer transition-colors ${
                  selectedAnswer === index
                    ? 'bg-elec-yellow/20 border-elec-yellow'
                    : 'border-elec-gray-border hover:border-elec-yellow/50 bg-elec-dark/30'
                }`}
                onClick={() => onSelectAnswer(question.id, index)}
              >
                <span className="text-sm sm:text-base">{option}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between mt-4 sm:mt-6 pb-4 sm:pb-6 pt-2 sm:pt-0">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          disabled={isFirstQuestion}
          size="sm"
          className="text-xs sm:text-sm h-8 sm:h-10"
        >
          Previous
        </Button>
        
        {isLastQuestion ? (
          <Button 
            onClick={onFinish}
            size="sm"
            className="text-xs sm:text-sm h-8 sm:h-10 bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            Finish Exam
          </Button>
        ) : (
          <Button 
            onClick={onNext}
            size="sm"
            className="text-xs sm:text-sm h-8 sm:h-10 bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            Next Question
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ExamQuestion;
