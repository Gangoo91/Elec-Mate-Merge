
import React from "react";
import { AlertTriangle, CheckCircle, Info, XCircle, Lightbulb } from "lucide-react";

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
  const handleClick = () => {
    try {
      onClick();
    } catch (error) {
      console.error('ScenarioOption - Error in onClick handler:', error);
    }
  };

  const getOptionStyles = () => {
    if (!showFeedback) {
      return isSelected
        ? 'border-elec-yellow bg-elec-yellow/10'
        : 'border-white/10 hover:border-white/20 bg-white/10';
    }

    if (isCorrect) {
      return 'border-green-500/50 bg-green-500/10';
    }

    if (isSelected && !isCorrect) {
      return 'border-red-500/50 bg-red-500/10';
    }

    return 'border-white/10 bg-white/10 opacity-50';
  };

  const getIndicatorStyles = () => {
    if (!showFeedback) {
      return isSelected
        ? 'bg-elec-yellow text-black'
        : 'bg-white/10 text-white/70';
    }

    if (isCorrect) {
      return 'bg-green-500 text-white';
    }

    if (isSelected && !isCorrect) {
      return 'bg-red-500 text-white';
    }

    return 'bg-white/10 text-white/80';
  };

  return (
    <div
      onClick={!showFeedback ? handleClick : undefined}
      className={`
        p-4 rounded-xl border transition-all
        ${!showFeedback ? 'cursor-pointer touch-manipulation active:scale-[0.98]' : 'cursor-default'}
        ${getOptionStyles()}
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`
          w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0
          ${getIndicatorStyles()}
        `}>
          {showFeedback && isCorrect ? (
            <CheckCircle className="h-4 w-4" />
          ) : showFeedback && isSelected && !isCorrect ? (
            <XCircle className="h-4 w-4" />
          ) : (
            optionId
          )}
        </div>
        <p className={`text-sm ${showFeedback && !isCorrect && !isSelected ? 'text-white/80' : 'text-white/90'}`}>
          {text}
        </p>
      </div>

      {showFeedback && (isCorrect || isSelected) && (
        <div className="mt-4 ml-10 space-y-3">
          {/* Feedback */}
          <div className={`p-3 rounded-lg ${isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-orange-500/10 border border-orange-500/30'}`}>
            <div className="flex items-start gap-2">
              <div className={`p-1.5 rounded-lg ${isCorrect ? 'bg-green-500/20' : 'bg-orange-500/20'}`}>
                <AlertTriangle className={`h-4 w-4 ${isCorrect ? 'text-green-400' : 'text-orange-400'}`} />
              </div>
              <p className={`text-sm ${isCorrect ? 'text-green-300' : 'text-orange-300'}`}>{feedback}</p>
            </div>
          </div>

          {/* Regulation Reference */}
          {regulation && (
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-start gap-2">
                <div className="p-1.5 rounded-lg bg-blue-500/20">
                  <Info className="h-4 w-4 text-blue-400" />
                </div>
                <p className="text-sm text-blue-300">{regulation}</p>
              </div>
            </div>
          )}

          {/* Outcome */}
          <div className="p-3 rounded-lg bg-white/10 border border-white/10">
            <div className="flex items-start gap-2">
              <div className="p-1.5 rounded-lg bg-elec-yellow/20">
                <Lightbulb className="h-4 w-4 text-elec-yellow" />
              </div>
              <div>
                <p className="text-xs text-white/80 mb-1">Outcome</p>
                <p className="text-sm text-white/80">{outcome}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioOption;
