import React from 'react';

interface ProgressCardProps {
  completedCount: number;
  totalScenarios: number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ completedCount, totalScenarios }) => {
  const progressPercentage =
    totalScenarios > 0 ? Math.round((completedCount / totalScenarios) * 100) : 0;

  const getProgressMessage = () => {
    if (progressPercentage === 100) return 'All scenarios completed';
    if (progressPercentage >= 75) return 'Almost there';
    if (progressPercentage >= 50) return 'Halfway through';
    if (progressPercentage >= 25) return 'Good start';
    return 'Begin your safety journey';
  };

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3 animate-fade-in">
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Progress
        </span>
        <span className="text-[12px] text-white/85 font-mono">
          {completedCount}/{totalScenarios} · {progressPercentage}%
        </span>
      </div>

      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-elec-yellow transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="space-y-1 pt-1">
        <p className="text-[14px] text-white/85 leading-relaxed">{getProgressMessage()}</p>
        {progressPercentage < 100 && (
          <p className="text-[12px] text-white/55">
            {totalScenarios - completedCount} scenarios remaining
          </p>
        )}
      </div>

      <p className="text-[12px] text-white/55 leading-relaxed pt-1 border-t border-white/[0.06]">
        Complete all scenarios to improve your understanding of electrical safety regulations and
        decision-making in the workplace.
      </p>
    </div>
  );
};

export default ProgressCard;
