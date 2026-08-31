/**
 * The four numbers that say how study is going (ELE-1655).
 *
 * Rebuilt on the shared card surface as a divided stat strip — the same
 * treatment the rest of the app gives a row of figures — instead of a grey
 * panel with `text-white/55` labels. Labels are the standard eyebrow, values
 * are `statValueCn`, and the whole thing reaches the edges of a phone.
 */
import { cn } from '@/lib/utils';
import { eyebrowCn, statValueCn } from '@/components/shared/surfaceStyles';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

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
    { label: 'Reviewed', value: totalCardsReviewed.toLocaleString() },
    { label: 'Streak', value: String(currentStreak) },
    { label: 'Mastered', value: `${masteredSetsCount}/${totalSets}` },
    { label: 'Overall', value: `${overallProgress}%` },
  ];

  return (
    <div className={cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE)}>
      <div className="grid grid-cols-4 divide-x divide-white/[0.14]">
        {metrics.map((m) => (
          <div key={m.label} className="px-3 py-3.5 sm:px-4">
            <span className={cn(eyebrowCn, 'block leading-tight')}>{m.label}</span>
            <p className={cn(statValueCn, 'text-white')}>{m.value}</p>
          </div>
        ))}
      </div>

      <div className="px-4 pb-4">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.10]">
          <div
            className="h-full rounded-full bg-elec-yellow transition-[width] duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default WeeklyProgressCard;
