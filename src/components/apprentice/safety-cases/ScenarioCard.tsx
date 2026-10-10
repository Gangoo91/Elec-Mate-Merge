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
      className="h-full w-full cursor-pointer rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-4 text-left transition-colors touch-manipulation hover:border-white/[0.18] active:bg-white/[0.06] sm:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0 space-y-2">
          <h3 className="text-[15px] font-semibold leading-snug text-white">{scenario.title}</h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-white">
            <span>{scenario.difficulty}</span>
            <span className="text-white">·</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
              {scenario.estimatedMinutes} min
            </span>
            <span className="text-white">·</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
              {scenario.location.split(',')[1]?.trim() || scenario.location}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 mt-1">
          {isCompleted ? (
            <CheckCircle className="h-5 w-5 text-emerald-400" strokeWidth={1.5} aria-label="Done" />
          ) : (
            <ChevronRight className="h-5 w-5 text-white" />
          )}
        </div>
      </div>
    </button>
  );
};

export default ScenarioCard;
