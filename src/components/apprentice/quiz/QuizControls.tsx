import { Button } from '@/components/ui/button';
import { QuizControlsProps } from '@/types/quiz';

const QuizControls = ({
  isAnswered,
  isLastQuestion,
  answeredCount,
  totalQuestions,
  onNext,
  onSubmit,
}: QuizControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <span className="text-[12px] text-white/85 font-mono">
        {answeredCount}/{totalQuestions} answered
      </span>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          onClick={onNext}
          disabled={!isAnswered}
          className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-40"
        >
          {isLastQuestion ? 'See Results' : 'Next Question'}
        </Button>

        {answeredCount > 0 && (
          <Button
            onClick={onSubmit}
            variant="outline"
            className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
          >
            Submit Quiz
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizControls;
