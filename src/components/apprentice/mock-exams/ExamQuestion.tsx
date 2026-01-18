
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
    <Card className="border-elec-yellow/30 bg-white/5">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <h2 className="text-xl font-medium">{question.text}</h2>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                type="button"
                className={`w-full text-left p-4 min-h-[52px] rounded-lg border cursor-pointer transition-all touch-manipulation active:scale-[0.98] ${
                  selectedAnswer === index
                    ? 'bg-elec-yellow/20 border-elec-yellow'
                    : 'border-elec-gray-border hover:border-elec-yellow/50 active:border-elec-yellow/70 bg-white/10'
                }`}
                onClick={() => onSelectAnswer(question.id, index)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          disabled={isFirstQuestion}
        >
          Previous
        </Button>
        
        {isLastQuestion ? (
          <Button onClick={onFinish}>
            Finish Exam
          </Button>
        ) : (
          <Button onClick={onNext}>
            Next Question
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ExamQuestion;
