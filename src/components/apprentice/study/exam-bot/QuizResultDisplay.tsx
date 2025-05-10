
import { Button } from "@/components/ui/button";
import { QuizResult } from "./types";

interface QuizResultDisplayProps {
  quizResult: QuizResult;
  onRestart: () => void;
}

const QuizResultDisplay = ({ quizResult, onRestart }: QuizResultDisplayProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-elec-dark p-6 rounded-lg text-center">
        <h3 className="text-xl font-semibold mb-2">Quiz Complete!</h3>
        <div className="text-4xl font-bold mb-4 text-elec-yellow">{quizResult.percentage}%</div>
        <p className="text-lg">
          You got <span className="font-bold text-elec-yellow">{quizResult.correct}</span> out of <span className="font-bold">{quizResult.total}</span> questions correct
        </p>
      </div>
      
      <Button className="w-full" onClick={onRestart}>
        Try Another Quiz
      </Button>
    </div>
  );
};

export default QuizResultDisplay;
