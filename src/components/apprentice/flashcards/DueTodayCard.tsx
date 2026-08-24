import { ChevronRight, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_BASE, CARD_PRIMARY } from '@/components/ui/card-recipe';

interface DueTodayCardProps {
  dueCount: number;
  onStart: () => void;
}

/**
 * The one thing on the flashcards hub worth doing right now.
 *
 * Was `bg-elec-yellow/[0.04]` under a `/20` edge — a translucent volt wash,
 * which mixes with the near-black ground into sludge and made the page's
 * primary action the dimmest thing on it. Solid volt is the recipe's primary
 * and the only treatment that reads as "do this".
 */
const DueTodayCard = ({ dueCount, onStart }: DueTodayCardProps) => {
  if (dueCount === 0) return null;

  return (
    <button
      type="button"
      onClick={onStart}
      className={cn(CARD_BASE, CARD_PRIMARY, 'w-full !flex-row items-center gap-3 p-4 text-black')}
    >
      <Flame className="h-5 w-5 shrink-0 text-black" />
      <div className="min-w-0 flex-1 space-y-0.5">
        <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-black/70">
          Due today
        </span>
        <p className="text-[14.5px] font-bold leading-snug text-black">
          Review {dueCount} {dueCount === 1 ? 'card' : 'cards'}
        </p>
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-black" />
    </button>
  );
};

export default DueTodayCard;
