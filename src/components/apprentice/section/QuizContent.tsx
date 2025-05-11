
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface QuizContentProps {
  effectiveCourseSlug: string;
  effectiveUnitSlug: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const QuizContent = ({ 
  effectiveCourseSlug, 
  effectiveUnitSlug, 
  isCompleted, 
  markAsComplete 
}: QuizContentProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-elec-yellow flex items-center justify-center">
            <span className="text-elec-dark font-bold text-xl">Q</span>
          </div>
          <h1 className="text-2xl font-semibold">Unit Assessment Quiz</h1>
        </div>
        
        {isCompleted && (
          <div className="flex items-center text-green-500 gap-2">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm">Completed</span>
          </div>
        )}
      </div>
      
      <div className="mb-8">
        <p className="text-muted-foreground">
          This quiz will test your understanding of the key health and safety concepts 
          covered in this unit. Complete the quiz to demonstrate your knowledge.
        </p>
      </div>
      
      <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-elec-yellow">Quiz Instructions</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• The quiz contains 10 multiple choice questions</li>
          <li>• You need to score at least 70% to pass</li>
          <li>• You can retake the quiz as many times as needed</li>
          <li>• Take your time and read each question carefully</li>
        </ul>
      </div>
      
      <div className="flex justify-between items-center pt-4">
        <Button
          variant="outline"
          className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          onClick={() => navigate(`/apprentice/study/eal/${effectiveCourseSlug}/unit/${effectiveUnitSlug}`)}
        >
          Back to Unit
        </Button>
        
        <Button
          onClick={markAsComplete}
          disabled={isCompleted}
          className={`${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
        >
          {isCompleted ? 'Quiz Completed' : 'Start Quiz'}
          {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default QuizContent;
