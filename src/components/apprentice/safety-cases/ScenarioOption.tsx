
import React from "react";
import { AlertTriangle, Check, Info } from "lucide-react";

interface ScenarioOptionProps {
  optionId: string;
  text: string;
  isSelected: boolean;
  isCorrect?: boolean;
  feedback?: string;
  outcome?: string;
  regulation?: string;
  showFeedback: boolean;
  onClick: () => void;
}

const ScenarioOption = ({
  optionId,
  text,
  isSelected,
  isCorrect,
  feedback,
  outcome,
  regulation,
  showFeedback,
  onClick,
}: ScenarioOptionProps) => {
  console.log('ScenarioOption - Rendering option:', {
    optionId,
    isSelected,
    isCorrect,
    showFeedback
  });

  const handleClick = () => {
    console.log('ScenarioOption - Option clicked:', optionId);
    try {
      onClick();
    } catch (error) {
      console.error('ScenarioOption - Error in onClick handler:', error);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        p-4 rounded-md border cursor-pointer transition-colors
        ${isSelected ? 'border-elec-yellow bg-elec-yellow/10' : 'border-elec-gray/30 hover:border-elec-yellow/30'}
        ${showFeedback && isCorrect ? 'bg-green-900/20 border-green-500/40' : ''}
        ${showFeedback && isSelected && !isCorrect ? 'bg-red-900/20 border-red-500/40' : ''}
      `}
    >
      <div className="flex items-center gap-3">
        <div className={`
          w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium
          ${isSelected ? 'bg-elec-yellow text-elec-dark' : 'bg-elec-gray/40'}
          ${showFeedback && isCorrect ? 'bg-green-500' : ''}
          ${showFeedback && isSelected && !isCorrect ? 'bg-red-500' : ''}
        `}>
          {optionId}
        </div>
        <p>{text}</p>
      </div>
      
      {showFeedback && (isCorrect || isSelected) && (
        <div className="mt-3 pl-9 space-y-3">
          <div className="flex items-start gap-2 text-amber-300">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p>{feedback}</p>
          </div>
          {regulation && (
            <div className="flex items-start gap-2 text-blue-300">
              <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p>{regulation}</p>
            </div>
          )}
          <div className="flex items-start gap-2 text-white">
            <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p><strong>Outcome:</strong> {outcome}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioOption;
