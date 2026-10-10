/**
 * Deck achievements on the flashcards page (10 Oct 2026 redesign — "design
 * them good", in the language of the deck cards: no icons, type does the
 * work).
 *
 * What you're closest to comes first, with how far you've got; what you've
 * earned sits underneath as a short list. The four tiers stay, as a word on
 * each row rather than a section each.
 */
import { useState } from 'react';
import { TIER_CONFIG } from '@/data/flashcardAchievements';
import type { FlashcardAchievementStatus } from '@/hooks/useFlashcardAchievements';
import { cn } from '@/lib/utils';

interface FlashcardAchievementsProps {
  achievements: FlashcardAchievementStatus[];
  stats: { total: number; unlocked: number; percentage: number };
}

const FlashcardAchievements = ({ achievements, stats }: FlashcardAchievementsProps) => {
  const [showAll, setShowAll] = useState(false);
  const earned = achievements.filter((a) => a.unlocked);
  const toGo = achievements
    .filter((a) => !a.unlocked)
    .sort((a, b) => b.progress - a.progress || a.target - b.target);
  const shown = showAll ? toGo : toGo.slice(0, 4);

  return (
    <section className="space-y-3" aria-labelledby="fc-achievements">
      <div className="flex items-baseline justify-between gap-3">
        <h2
          id="fc-achievements"
          className="text-[18px] font-bold tracking-tight text-white sm:text-[20px]"
        >
          Deck achievements
        </h2>
        <span className="text-[13px] font-medium tabular-nums text-white">
          {stats.unlocked} of {stats.total} earned
        </span>
      </div>

      {toGo.length > 0 && (
        <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03]">
          <p className="px-5 pb-1 pt-4 text-[13px] font-semibold text-white">Closest to earning</p>
          <ul className="divide-y divide-white/[0.06]">
            {shown.map((a) => (
              <li key={a.def.id} className="px-5 py-3.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[15px] font-semibold leading-snug text-white">
                    {a.def.title}
                  </span>
                  <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
                    {a.current.toLocaleString()} of {a.target.toLocaleString()}
                  </span>
                </div>
                <p className="mt-0.5 text-[13px] leading-snug text-white">
                  {a.def.description} · {TIER_CONFIG[a.def.tier].label}
                </p>
                <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-white/[0.1]">
                  <div
                    className="h-full rounded-full bg-elec-yellow"
                    style={{ width: `${Math.max(a.progress, a.progress > 0 ? 2 : 0)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          {toGo.length > 4 && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="h-11 w-full border-t border-white/[0.06] text-[13.5px] font-semibold text-white touch-manipulation active:bg-white/[0.04]"
            >
              {showAll ? 'Show fewer' : `Show all ${toGo.length} still to earn`}
            </button>
          )}
        </div>
      )}

      {earned.length > 0 && (
        <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] px-5 py-4">
          <p className="text-[13px] font-semibold text-white">Earned</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {earned.map((a) => (
              <li
                key={a.def.id}
                title={a.def.description}
                className={cn(
                  'rounded-full border border-emerald-400/50 px-3 py-1.5 text-[13px] font-semibold text-emerald-300'
                )}
              >
                {a.def.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default FlashcardAchievements;
