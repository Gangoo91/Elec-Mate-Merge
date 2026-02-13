import { TrendingUp, Flame, Target, Brain } from 'lucide-react';

interface WeeklyProgressCardProps {
  totalCardsReviewed: number;
  currentStreak: number;
  masteredSetsCount: number;
  totalSets: number;
  overallProgress: number;
}

const WeeklyProgressCard = ({
  totalCardsReviewed,
  currentStreak,
  masteredSetsCount,
  totalSets,
  overallProgress,
}: WeeklyProgressCardProps) => {
  const metrics = [
    {
      icon: Target,
      label: 'Cards Reviewed',
      value: totalCardsReviewed.toLocaleString(),
      colour: 'text-blue-400',
    },
    {
      icon: Flame,
      label: 'Day Streak',
      value: String(currentStreak),
      colour: currentStreak > 0 ? 'text-orange-400' : 'text-white',
    },
    {
      icon: Brain,
      label: 'Sets Mastered',
      value: `${masteredSetsCount}/${totalSets}`,
      colour: 'text-green-400',
    },
    {
      icon: TrendingUp,
      label: 'Overall',
      value: `${overallProgress}%`,
      colour: 'text-elec-yellow',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-elec-yellow/10 to-amber-600/5 border border-elec-yellow/20 rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-elec-yellow" />
        <h3 className="text-sm font-bold text-white">Your Progress</h3>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {metrics.map((m) => {
          const MetricIcon = m.icon;
          return (
            <div key={m.label} className="text-center">
              <MetricIcon className={`h-4 w-4 mx-auto mb-1 ${m.colour}`} />
              <div className={`text-sm font-bold ${m.colour}`}>{m.value}</div>
              <div className="text-[9px] text-white leading-tight">{m.label}</div>
            </div>
          );
        })}
      </div>

      {/* Overall progress bar */}
      <div className="space-y-1">
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-elec-yellow to-amber-500 transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <p className="text-[10px] text-white text-right">{overallProgress}% total mastery</p>
      </div>
    </div>
  );
};

export default WeeklyProgressCard;
