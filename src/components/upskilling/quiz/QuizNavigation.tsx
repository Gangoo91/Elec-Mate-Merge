
import { Button } from '@/components/ui/button';

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswer: number | undefined;
  onPrevious: () => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

const QuizNavigation = ({ 
  currentQuestion, 
  totalQuestions, 
  selectedAnswer, 
  onPrevious, 
  onNext, 
  isLastQuestion 
}: QuizNavigationProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
      <Button
        onClick={onPrevious}
        disabled={currentQuestion === 0}
        variant="outline"
        className="border-white/30 text-foreground hover:bg-[#323232] hover:text-foreground disabled:opacity-50 w-full sm:w-auto"
      >
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Prev</span>
      </Button>
      
      <Button
        onClick={onNext}
        disabled={selectedAnswer === undefined}
        className="bg-elec-yellow text-black hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
      >
        <span className="hidden sm:inline">{isLastQuestion ? 'Finish Quiz' : 'Next'}</span>
        <span className="sm:hidden">{isLastQuestion ? 'Finish' : 'Next'}</span>
      </Button>
    </div>
  );
};

export default QuizNavigation;
