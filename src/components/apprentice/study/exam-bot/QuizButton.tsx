
import { Bot, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface QuizButtonProps {
  isGenerating: boolean;
  loadingProgress: number;
  onClick: () => void;
}

const QuizButton = ({ isGenerating, loadingProgress, onClick }: QuizButtonProps) => {
  return (
    <div className="space-y-2">
      <Button className="w-full relative" onClick={onClick} disabled={isGenerating}>
        <div className={`flex items-center justify-center gap-2 transition-opacity duration-300 ${isGenerating ? 'opacity-0' : 'opacity-100'}`}>
          <Bot className="h-4 w-4" />
          Start Quiz Session
        </div>
        
        {isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center gap-2">
            <Loader className="h-4 w-4 animate-spin" />
            Generating Questions...
          </div>
        )}
      </Button>

      {isGenerating && (
        <div className="space-y-1">
          <Progress value={loadingProgress} className="h-2" />
          <p className="text-xs text-center text-muted-foreground">
            {loadingProgress < 60 ? "Requesting questions..." : 
             loadingProgress < 90 ? "Processing response..." : 
             "Preparing quiz..."}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizButton;
