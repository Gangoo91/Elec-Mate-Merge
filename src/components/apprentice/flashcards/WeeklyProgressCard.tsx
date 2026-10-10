/**
 * "Your progress" on the flashcards page (10 Oct 2026 redesign).
 *
 * The streak and cards due are already at the top of the page, so this is the
 * long view: how many cards you've reviewed, how many decks you've fully
 * mastered, and how much of everything you know. One panel, plain labels,
 * one bar.
 */
interface WeeklyProgressCardProps {
  totalCardsReviewed: number;
  currentStreak: number;
  masteredSetsCount: number;
  totalSets: number;
  overallProgress: number;
}

const WeeklyProgressCard = ({
  totalCardsReviewed,
  masteredSetsCount,
  totalSets,
  overallProgress,
}: WeeklyProgressCardProps) => (
  <section className="space-y-3" aria-labelledby="fc-progress">
    <h2 id="fc-progress" className="text-[18px] font-bold tracking-tight text-white sm:text-[20px]">
      Your progress
    </h2>
    <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5">
      <dl className="grid grid-cols-2 gap-4">
        <div>
          <dt className="text-[12.5px] font-medium text-white">Cards reviewed</dt>
          <dd className="mt-1 text-[24px] font-bold tabular-nums text-white">
            {totalCardsReviewed.toLocaleString()}
          </dd>
        </div>
        <div>
          <dt className="text-[12.5px] font-medium text-white">Decks mastered</dt>
          <dd className="mt-1 text-[24px] font-bold tabular-nums text-white">
            {masteredSetsCount}
            <span className="ml-1 text-[14px] font-medium">of {totalSets}</span>
          </dd>
        </div>
      </dl>
      <div className="mt-5">
        <p className="flex items-baseline justify-between text-[13px] font-medium text-white">
          <span>Everything mastered so far</span>
          <span className="font-semibold tabular-nums">{overallProgress}%</span>
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.1]">
          <div
            className="h-full rounded-full bg-emerald-400 transition-[width] duration-500"
            style={{ width: `${Math.max(overallProgress, overallProgress > 0 ? 2 : 0)}%` }}
          />
        </div>
      </div>
    </div>
  </section>
);

export default WeeklyProgressCard;
