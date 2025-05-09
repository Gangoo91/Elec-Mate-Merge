
import { Button } from "@/components/ui/button";

interface QuizButtonProps {
  isGenerating: boolean;
  onClick: () => void;
}

const QuizButton = ({ isGenerating, onClick }: QuizButtonProps) => {
  return (
    <Button 
      className="w-full" 
      onClick={onClick}
      disabled={isGenerating}
    >
      {isGenerating ? "Generating Questions..." : "Start Practice Quiz"}
    </Button>
  );
};

export default QuizButton;
