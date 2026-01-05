
import { QuizNavigationProps } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const QuizNavigation = ({ 
  questionsCount, 
  activeQuestion, 
  userAnswers, 
  onNavigate 
}: QuizNavigationProps) => {
  const handlePrevious = () => {
    if (activeQuestion > 0) {
      onNavigate(activeQuestion - 1);
    }
  };

  const handleNext = () => {
    if (activeQuestion < questionsCount - 1) {
      onNavigate(activeQuestion + 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-2 py-3 sm:py-2">
      <Button
        variant="outline"
        onClick={handlePrevious}
        disabled={activeQuestion === 0}
        className="w-full sm:w-auto border-elec-yellow/30 hover:bg-elec-yellow/10"
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> Previous
      </Button>

      <span className="text-sm text-muted-foreground order-first sm:order-none">
        Question {activeQuestion + 1} of {questionsCount}
        {userAnswers[activeQuestion] !== null && " • Answered"}
      </span>

      <Button
        variant="outline"
        onClick={handleNext}
        disabled={activeQuestion === questionsCount - 1}
        className="w-full sm:w-auto border-elec-yellow/30 hover:bg-elec-yellow/10"
      >
        Next <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};

export default QuizNavigation;
