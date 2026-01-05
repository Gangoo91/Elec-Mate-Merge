
interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

const QuizProgress = ({ currentQuestion, totalQuestions }: QuizProgressProps) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="space-y-2">
      {/* Progress Bar */}
      <div className="w-full bg-white/20 rounded-full h-2">
        <div 
          className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Question Counter */}
      <div className="text-center text-foreground text-sm">
        Question {currentQuestion + 1} of {totalQuestions}
      </div>
    </div>
  );
};

export default QuizProgress;
