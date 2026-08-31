/**
 * Tip of the day, expanding to the full list (ELE-1655).
 *
 * Was `bg-white/[0.02]` under a `/[0.06]` edge with `text-white/55` labels and
 * `/85` body — a grey panel of grey text. Now the shared card surface with
 * every piece of type full white; the numbers down the expanded list recede
 * with `opacity` on the element rather than a dimmer text colour, so they stay
 * legible while the tips stay dominant.
 */
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { eyebrowCn } from '@/components/shared/surfaceStyles';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const tips = [
  'Study 10–15 minutes daily — consistency beats cramming.',
  'Use spaced repetition to boost long-term retention.',
  'Try to recall the answer before flipping — active recall strengthens memory.',
  'Mix up different flashcard sets for better learning.',
  'Focus extra time on cards you find challenging.',
  'Link flashcard content to your real on-site experience.',
  'Study at the same time each day to build a habit.',
  'Take strategic breaks — 25 minutes study, 5 minutes rest.',
  'Find a quiet space and minimise distractions.',
];

const StudyTipsCard = () => {
  const [expanded, setExpanded] = useState(false);
  const dailyIndex = new Date().getDate() % tips.length;
  const todayTip = tips[dailyIndex];

  return (
    <div className={cn('rounded-2xl border border-elec-yellow/35', CARD_SURFACE)}>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="flex w-full touch-manipulation items-center gap-3 p-4 text-left transition-colors active:bg-white/[0.04]"
      >
        <div className="min-w-0 flex-1 space-y-1.5">
          <span className={cn(eyebrowCn, 'block')}>Tip of the day</span>
          <p className="text-[14px] leading-relaxed text-white">{todayTip}</p>
        </div>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-white transition-transform',
            expanded && 'rotate-180'
          )}
        />
      </button>

      {expanded && (
        <div className="space-y-2.5 border-t border-white/[0.14] px-4 pb-4 pt-3">
          {tips.map((tip, i) => (
            <div
              key={tip}
              className={cn(
                'flex items-start gap-2.5 text-[14px] leading-relaxed',
                i === dailyIndex ? 'text-elec-yellow' : 'text-white'
              )}
            >
              <span className="w-5 shrink-0 text-[12px] font-semibold tabular-nums text-white opacity-60">
                {i + 1}
              </span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyTipsCard;
