
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface CompletionButtonProps {
  isCompleted: boolean;
  markAsComplete: () => void;
}

const CompletionButton: React.FC<CompletionButtonProps> = ({ isCompleted, markAsComplete }) => {
  return (
    <div className="flex justify-end pt-4 border-t border-elec-yellow/20">
      <Button
        variant="study"
        className={`${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
        onClick={markAsComplete}
        disabled={isCompleted}
      >
        {isCompleted ? 'Completed' : 'Mark as Complete'}
        {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
};

export default CompletionButton;
