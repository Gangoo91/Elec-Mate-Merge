
import { Button } from "@/components/ui/button";
import { QuizControlsProps } from "@/types/quiz";

const QuizControls = ({
  isAnswered,
  isLastQuestion,
  answeredCount,
  totalQuestions,
  onNext,
  onSubmit
}: QuizControlsProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <span className="text-sm text-white">
          {answeredCount} of {totalQuestions} questions answered
        </span>
      </div>
      <div className="flex gap-2">
        {!isLastQuestion ? (
          <Button 
            onClick={onNext}
            disabled={!isAnswered}
            className={`
              ${isAnswered ? 'bg-elec-yellow hover:bg-elec-yellow/80 text-elec-dark' : 'bg-muted text-white'}
            `}
          >
            Next Question
          </Button>
        ) : (
          <Button 
            onClick={onNext}
            disabled={!isAnswered}
            className={`
              ${isAnswered ? 'bg-elec-yellow hover:bg-elec-yellow/80 text-elec-dark' : 'bg-muted text-white'}
            `}
          >
            See Results
          </Button>
        )}
        
        {answeredCount > 0 && (
          <Button 
            onClick={onSubmit}
            variant="outline"
            className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            Submit Quiz
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizControls;
