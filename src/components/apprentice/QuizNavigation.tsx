
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
    <div className="flex justify-between items-center py-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrevious}
        disabled={activeQuestion === 0}
        className="border-elec-yellow/30 hover:bg-elec-yellow/10"
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> Previous
      </Button>
      
      <span className="text-sm">
        Question {activeQuestion + 1} of {questionsCount}
        {userAnswers[activeQuestion] !== null && " • Answered"}
      </span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleNext}
        disabled={activeQuestion === questionsCount - 1}
        className="border-elec-yellow/30 hover:bg-elec-yellow/10"
      >
        Next <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};

export default QuizNavigation;
