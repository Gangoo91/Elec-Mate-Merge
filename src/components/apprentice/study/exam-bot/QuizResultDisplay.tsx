
import { Button } from "@/components/ui/button";
import { QuizResult } from "./types";

interface QuizResultDisplayProps {
  quizResult: QuizResult;
  onRestart: () => void;
}

const QuizResultDisplay = ({ quizResult, onRestart }: QuizResultDisplayProps) => {
  // Calculate pass/fail status based on industry standard passing rate
  const isPassed = quizResult.percentage >= 70;

  return (
    <div className="space-y-6">
      <div className="bg-elec-dark p-6 rounded-lg text-center">
        <h3 className="text-xl font-semibold mb-2">Quiz Complete!</h3>
        <div className={`text-4xl font-bold mb-4 ${isPassed ? 'text-green-500' : 'text-elec-yellow'}`}>
          {quizResult.percentage}%
        </div>
        <p className="text-lg mb-4">
          You got <span className="font-bold text-elec-yellow">{quizResult.correct}</span> out of <span className="font-bold">{quizResult.total}</span> questions correct
        </p>
        
        {isPassed ? (
          <div className="p-3 bg-green-500/20 border border-green-500 rounded-md text-green-500">
            <p className="font-medium">Congratulations! You've passed this assessment.</p>
          </div>
        ) : (
          <div className="p-3 bg-amber-500/20 border border-amber-500 rounded-md text-amber-500">
            <p className="font-medium">Keep practicing! 70% is required to pass UK electrical assessments.</p>
          </div>
        )}
      </div>
      
      <Button className="w-full" onClick={onRestart}>
        Try Another Quiz
      </Button>
    </div>
  );
};

export default QuizResultDisplay;
