import React from "react";
import { CheckCircle, Info, XCircle, Lightbulb, MessageSquare } from "lucide-react";

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
  const getOptionStyles = () => {
    if (!showFeedback) {
      return isSelected
        ? "border-elec-yellow bg-elec-yellow/10"
        : "border-white/10 hover:border-white/20 bg-white/10";
    }
    if (isCorrect) return "border-green-500/50 bg-green-500/10";
    if (isSelected && !isCorrect) return "border-red-500/50 bg-red-500/10";
    return "border-white/10 bg-white/10 opacity-50";
  };

  const getIndicatorStyles = () => {
    if (!showFeedback) {
      return isSelected
        ? "bg-elec-yellow text-black"
        : "bg-white/10 text-white";
    }
    if (isCorrect) return "bg-green-500 text-white";
    if (isSelected && !isCorrect) return "bg-red-500 text-white";
    return "bg-white/10 text-white";
  };

  return (
    <div
      onClick={!showFeedback ? onClick : undefined}
      className={`
        p-4 rounded-xl border transition-all
        ${!showFeedback ? "cursor-pointer touch-manipulation active:scale-[0.98]" : "cursor-default"}
        ${getOptionStyles()}
      `}
    >
      <div className="flex items-start gap-3">
        <div
          className={`
          w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0
          ${getIndicatorStyles()}
        `}
        >
          {showFeedback && isCorrect ? (
            <CheckCircle className="h-4 w-4" />
          ) : showFeedback && isSelected && !isCorrect ? (
            <XCircle className="h-4 w-4" />
          ) : (
            optionId
          )}
        </div>
        <p
          className={`text-sm ${showFeedback && !isCorrect && !isSelected ? "text-white opacity-50" : "text-white"}`}
        >
          {text}
        </p>
      </div>

      {showFeedback && (isCorrect || isSelected) && (
        <div className="mt-4 ml-10 space-y-2.5">
          {/* Feedback */}
          <div
            className={`p-3 rounded-lg bg-white/5 border-l-4 ${
              isCorrect ? "border-l-green-500" : "border-l-orange-500"
            } border border-white/10`}
          >
            <div className="flex items-start gap-2">
              <MessageSquare
                className={`h-3.5 w-3.5 flex-shrink-0 mt-0.5 ${
                  isCorrect ? "text-green-400" : "text-orange-400"
                }`}
              />
              <p className="text-sm text-white">{feedback}</p>
            </div>
          </div>

          {/* Regulation Reference */}
          {regulation && (
            <div className="p-3 rounded-lg bg-white/5 border-l-4 border-l-blue-500 border border-white/10">
              <div className="flex items-start gap-2">
                <Info className="h-3.5 w-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-white">{regulation}</p>
              </div>
            </div>
          )}

          {/* Outcome */}
          <div className="p-3 rounded-lg bg-white/5 border-l-4 border-l-elec-yellow border border-white/10">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-3.5 w-3.5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-white font-medium mb-0.5">
                  Outcome
                </p>
                <p className="text-sm text-white">{outcome}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioOption;
