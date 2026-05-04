import { QuizNavigationProps } from '@/types/quiz';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const QuizNavigation = ({
  questionsCount,
  activeQuestion,
  userAnswers,
  onNavigate,
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

  const questionIndices = Array.from({ length: questionsCount }, (_, i) => i);
  const questionGroups = [];
  for (let i = 0; i < questionIndices.length; i += 10) {
    questionGroups.push(questionIndices.slice(i, i + 10));
  }

  return (
    <div className="mb-6 space-y-3">
      <div className="flex justify-between items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={activeQuestion === 0}
          className="h-9 border-white/15 text-white hover:bg-white/[0.05] disabled:opacity-40 touch-manipulation"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>

        <span className="text-[12px] text-white/85 font-mono">
          {activeQuestion + 1}/{questionsCount}
          {userAnswers[activeQuestion] !== null && ' answered'}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={activeQuestion === questionsCount - 1}
          className="h-9 border-white/15 text-white hover:bg-white/[0.05] disabled:opacity-40 touch-manipulation"
        >
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <div className="grid grid-cols-10 gap-1 p-2 rounded-xl border border-white/[0.06] bg-white/[0.02]">
        {questionGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="col-span-10 grid grid-cols-10 gap-1 mb-1 last:mb-0">
            {group.map((index) => {
              const isActive = index === activeQuestion;
              const isAnswered = userAnswers[index] !== null;

              const pillClasses = isActive
                ? 'bg-elec-yellow text-black font-semibold'
                : isAnswered
                  ? 'bg-white/[0.06] text-white'
                  : 'bg-transparent text-white/55 hover:bg-white/[0.04]';

              return (
                <button
                  key={index}
                  className={`w-full p-1 rounded text-xs font-medium transition-colors touch-manipulation ${pillClasses}`}
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
