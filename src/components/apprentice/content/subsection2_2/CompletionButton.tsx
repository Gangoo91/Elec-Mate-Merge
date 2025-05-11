
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface CompletionButtonProps {
  isCompleted: boolean;
  markAsComplete: () => void;
}

const CompletionButton: React.FC<CompletionButtonProps> = ({ 
  isCompleted, 
  markAsComplete 
}) => {
  return (
    <div className="pt-6 border-t border-elec-yellow/20 flex justify-end">
      {!isCompleted ? (
        <Button 
          onClick={markAsComplete}
          className="hover:bg-elec-yellow hover:text-elec-dark"
        >
          Mark as Complete
        </Button>
      ) : (
        <div className="flex items-center text-green-500 gap-2">
          <CheckCircle className="h-5 w-5" />
          <span>Completed</span>
        </div>
      )}
    </div>
  );
};

export default CompletionButton;
