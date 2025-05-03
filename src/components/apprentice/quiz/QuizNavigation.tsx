
import { QuizNavigationProps } from "@/types/quiz";

const QuizNavigation = ({ 
  questionsCount, 
  activeQuestion, 
  userAnswers, 
  onNavigate 
}: QuizNavigationProps) => {
  return (
    <div className="flex flex-wrap gap-2 py-2">
      {Array.from({ length: questionsCount }).map((_, index) => (
        <div
          key={index}
          className={`
            cursor-pointer w-8 h-8 rounded-full flex items-center justify-center text-sm
            ${index === activeQuestion ? 'bg-elec-yellow text-elec-dark' : ''}
            ${userAnswers[index] !== null && index !== activeQuestion ? 'bg-elec-yellow/20 text-elec-yellow' : ''}
            ${userAnswers[index] === null && index !== activeQuestion ? 'border border-elec-yellow/30' : ''}
          `}
          onClick={() => onNavigate(index)}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default QuizNavigation;
