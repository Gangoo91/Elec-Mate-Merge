import React from 'react';
import { Button } from '@/components/ui/button';

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
  isLastQuestion,
}) => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-6">
      <h2 className="text-[18px] sm:text-[20px] font-semibold text-white leading-snug">
        {question.text}
      </h2>

      <div className="space-y-2.5">
        {question.options.map((option, index) => (
          <button
            key={index}
            type="button"
            className={`w-full text-left p-4 min-h-[52px] rounded-lg border text-[14px] leading-relaxed transition-all touch-manipulation active:scale-[0.98] ${
              selectedAnswer === index
                ? 'bg-elec-yellow/[0.06] border-elec-yellow text-white'
                : 'bg-white/[0.02] border-white/[0.06] text-white/85 hover:border-white/15'
            }`}
            onClick={() => onSelectAnswer(question.id, index)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex justify-between gap-3 pt-2">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isFirstQuestion}
          className="h-11 border-white/15 text-white hover:bg-white/[0.05] disabled:opacity-40 touch-manipulation"
        >
          Previous
        </Button>

        {isLastQuestion ? (
          <Button
            onClick={onFinish}
            className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
          >
            Finish Exam
          </Button>
        ) : (
          <Button
            onClick={onNext}
            className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
          >
            Next Question
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExamQuestion;
