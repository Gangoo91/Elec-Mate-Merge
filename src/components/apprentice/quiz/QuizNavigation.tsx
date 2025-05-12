
import { QuizNavigationProps } from "@/types/quiz";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  // Create an array of question indices
  const questionIndices = Array.from({ length: questionsCount }, (_, i) => i);
  
  // Group questions into chunks of 10 for better display
  const questionGroups = [];
  for (let i = 0; i < questionIndices.length; i += 10) {
    questionGroups.push(questionIndices.slice(i, i + 10));
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
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
      
      {/* Question navigation grid */}
      <div className="grid grid-cols-10 gap-1 p-2 bg-elec-dark/50 border border-elec-yellow/20 rounded-lg">
        {questionGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="col-span-10 grid grid-cols-10 gap-1 mb-1 last:mb-0">
            {group.map((index) => {
              const isActive = index === activeQuestion;
              const isAnswered = userAnswers[index] !== null;
              
              return (
                <button
                  key={index}
                  className={`
                    w-full p-1 rounded text-xs font-medium transition-colors
                    ${isActive ? 'bg-elec-yellow text-elec-dark' : ''}
                    ${!isActive && isAnswered ? 'bg-elec-yellow/30 text-white' : ''}
                    ${!isActive && !isAnswered ? 'bg-elec-dark hover:bg-elec-yellow/10' : ''}
                  `}
                  onClick={() => onNavigate(index)}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizNavigation;
