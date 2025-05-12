
import { Button } from "@/components/ui/button";
import { AlertTriangle, Play, CheckCircle } from "lucide-react";

interface StartQuizPanelProps {
  isCompleted: boolean;
  onStartQuiz: () => void;
  onBack: () => void;
}

const StartQuizPanel = ({ isCompleted, onStartQuiz, onBack }: StartQuizPanelProps) => {
  return (
    <>
      <div className="mb-8">
        <p className="text-muted-foreground">
          This quiz will test your understanding of the key health and safety concepts 
          covered in this unit. Complete the quiz to demonstrate your knowledge.
        </p>
        {isCompleted && (
          <div className="flex items-center gap-2 mt-4 p-3 bg-green-950/30 border border-green-600/30 rounded-md">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <p className="text-green-400">
              You have already completed this quiz. You can retake it to improve your score.
            </p>
          </div>
        )}
      </div>
      
      <div className="space-y-6 p-4 border border-elec-yellow/20 rounded-lg">
        <div className="flex items-center gap-2">
          <Play className="h-5 w-5 text-elec-yellow" />
          <h3 className="font-semibold">Timed Assessment - 45 Minutes</h3>
        </div>
        
        <div className="space-y-4">
          <p>This quiz consists of 30 questions randomly selected from a large question pool.</p>
          <p>Once started, you'll have 45 minutes to complete the quiz. Your results will be recorded as part of your off-the-job training hours.</p>
          <div className="flex items-start gap-3 bg-amber-950/30 p-4 rounded-lg border border-amber-500/30">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <p className="font-medium text-amber-500">Important</p>
              <p className="text-sm text-muted-foreground">Make sure you have enough time to complete the quiz before starting. If you leave the page, your progress may be lost.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-4">
        <Button
          variant="outline"
          className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          onClick={onBack}
        >
          Back to Unit
        </Button>
        
        <Button 
          onClick={onStartQuiz}
          className="bg-elec-yellow hover:bg-elec-yellow/80 text-elec-dark flex items-center gap-2"
        >
          <Play className="h-4 w-4" />
          {isCompleted ? "Retake Quiz" : "Start Quiz"}
        </Button>
      </div>
    </>
  );
};

export default StartQuizPanel;
