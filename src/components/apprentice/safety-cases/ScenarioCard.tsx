import React from 'react';
import { CheckCircle, ChevronRight, Clock, MapPin } from 'lucide-react';
import { SafetyScenario } from './safetyScenarios';

interface ScenarioCardProps {
  scenario: SafetyScenario;
  onClick: () => void;
  isCompleted?: boolean;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, onClick, isCompleted = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-full text-left p-4 rounded-xl border border-white/[0.06]
        bg-white/[0.02] cursor-pointer touch-manipulation
        active:scale-[0.98] active:bg-white/[0.04] transition-all
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0 space-y-2">
          <h3 className="text-white font-medium text-[15px] leading-snug">{scenario.title}</h3>
          <div className="flex items-center gap-3 text-[12px] text-white/55">
            <span>{scenario.difficulty}</span>
            <span className="text-white/25">·</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {scenario.estimatedMinutes} min
            </span>
            <span className="text-white/25">·</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {scenario.location.split(',')[1]?.trim() || scenario.location}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 mt-1">
          {isCompleted ? (
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
          ) : (
            <ChevronRight className="h-5 w-5 text-white/55" />
          )}
        </div>
      </div>
    </button>
  );
};

export default ScenarioCard;
