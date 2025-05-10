
import { useState } from "react";
import { Bot, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface QuizButtonProps {
  isGenerating: boolean;
  onClick: () => void;
}

const QuizButton = ({ isGenerating, onClick }: QuizButtonProps) => {
  return (
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
  );
};

export default QuizButton;
