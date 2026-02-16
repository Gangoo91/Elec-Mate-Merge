import React from 'react';
import { CheckCircle, ChevronRight, Clock, MapPin } from 'lucide-react';
import { SafetyScenario } from './safetyScenarios';

interface ScenarioCardProps {
  scenario: SafetyScenario;
  onClick: () => void;
  isCompleted?: boolean;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, onClick, isCompleted = false }) => {
  const getDifficultyBorder = () => {
    switch (scenario.difficulty) {
      case 'Beginner':
        return 'border-l-green-500';
      case 'Intermediate':
        return 'border-l-elec-yellow';
      case 'Advanced':
        return 'border-l-red-500';
    }
  };

  const getDifficultyDot = () => {
    switch (scenario.difficulty) {
      case 'Beginner':
        return 'bg-green-500';
      case 'Intermediate':
        return 'bg-elec-yellow';
      case 'Advanced':
        return 'bg-red-500';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        p-4 rounded-xl border border-white/10 border-l-4 ${getDifficultyBorder()}
        bg-white/5 cursor-pointer touch-manipulation
        active:scale-[0.98] active:bg-white/10 transition-all
        ${isCompleted ? 'ring-1 ring-green-500/30' : ''}
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-[15px] leading-snug">{scenario.title}</h3>
          <div className="flex items-center gap-3 mt-2 text-xs text-white">
            <span className="flex items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${getDifficultyDot()}`} />
              {scenario.difficulty}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {scenario.estimatedMinutes} min
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {scenario.location.split(',')[1]?.trim() || scenario.location}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 mt-1">
          {isCompleted ? (
            <CheckCircle className="h-5 w-5 text-green-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-white" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ScenarioCard;
