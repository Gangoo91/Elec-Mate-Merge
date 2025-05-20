
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
    <Card className="border-elec-yellow/30 bg-elec-gray">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <h2 className="text-xl font-medium">{question.text}</h2>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`p-3 rounded-md border cursor-pointer transition-colors ${
                  selectedAnswer === index
                    ? 'bg-elec-yellow/20 border-elec-yellow'
                    : 'border-elec-gray-border hover:border-elec-yellow/50 bg-elec-dark/30'
                }`}
                onClick={() => onSelectAnswer(question.id, index)}
              >
                {option}
              </div>
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
