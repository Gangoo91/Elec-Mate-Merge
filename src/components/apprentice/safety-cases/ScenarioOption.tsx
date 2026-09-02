import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

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
        ? 'border-elec-yellow/50 bg-white/[0.06]'
        : 'border-white/[0.10] hover:border-white/15 bg-white/[0.06]';
    }
    if (isCorrect) return 'border-elec-yellow/40 bg-white/[0.06]';
    if (isSelected && !isCorrect) return 'border-red-500/30 bg-white/[0.06]';
    return 'border-white/[0.10] bg-white/[0.06] opacity-60';
  };

  const getIndicatorStyles = () => {
    if (!showFeedback) {
      return isSelected
        ? 'bg-elec-yellow text-black'
        : 'bg-white/[0.04] text-white border border-white/10';
    }
    if (isCorrect) return 'bg-elec-yellow text-black';
    if (isSelected && !isCorrect) return 'bg-white/[0.06] text-red-300 border border-red-500/30';
    return 'bg-white/[0.04] text-white border border-white/10';
  };

  return (
    <div
      onClick={!showFeedback ? onClick : undefined}
      className={`
        p-4 rounded-xl border transition-all
        ${!showFeedback ? 'cursor-pointer touch-manipulation active:scale-[0.98]' : 'cursor-default'}
        ${getOptionStyles()}
      `}
    >
      <div className="flex items-start gap-3">
        <div
          className={`
          w-7 h-7 rounded-lg flex items-center justify-center text-[13px] font-semibold flex-shrink-0
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
        <p className="text-[14px] text-white leading-relaxed">{text}</p>
      </div>

      {showFeedback && (isCorrect || isSelected) && (
        <div className="mt-4 ml-10 space-y-3">
          <div className="rounded-xl border border-white/[0.10] bg-white/[0.06] p-3 sm:p-4 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
              Feedback
            </span>
            <p className="text-[14px] text-white leading-relaxed">{feedback}</p>
          </div>

          {regulation && (
            <div className="rounded-xl border border-white/[0.10] bg-white/[0.06] p-3 sm:p-4 space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                Regulation
              </span>
              <p className="text-[14px] text-white leading-relaxed">{regulation}</p>
            </div>
          )}

          <div className="rounded-xl border border-elec-yellow/20 bg-white/[0.06] p-3 sm:p-4 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              Outcome
            </span>
            <p className="text-[14px] text-white leading-relaxed">{outcome}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioOption;
