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
    { label: 'Cards reviewed', value: totalCardsReviewed.toLocaleString() },
    { label: 'Day streak', value: String(currentStreak) },
    { label: 'Sets mastered', value: `${masteredSetsCount}/${totalSets}` },
    { label: 'Overall', value: `${overallProgress}%` },
  ];

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Your progress
        </span>
        <span className="text-[12px] text-white/85 font-mono">{overallProgress}%</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-1">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 leading-tight">
              {m.label}
            </p>
            <p className="text-[16px] font-semibold text-white font-mono leading-tight">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-elec-yellow transition-all duration-500"
          style={{ width: `${overallProgress}%` }}
        />
      </div>
    </div>
  );
};

export default WeeklyProgressCard;
