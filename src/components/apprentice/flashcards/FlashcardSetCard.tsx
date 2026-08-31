import { CheckCircle } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import MiniProgressRing from './MiniProgressRing';
import { cn } from '@/lib/utils';
import { CARD_BASE, CARD_NEUTRAL } from '@/components/ui/card-recipe';
import type { FlashcardLevel } from '@/data/flashcards';

interface FlashcardSet {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  count: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  category: string;
  level?: FlashcardLevel;
  completed?: boolean;
  progressPercentage?: number;
  lastStudied?: string;
  masteredCards?: number;
}

interface FlashcardSetCardProps {
  set: FlashcardSet;
  onStart: (setId: string) => void;
}

/**
 * One flashcard set in the list.
 *
 * Was `bg-white/[0.02]` behind a `border-white/[0.06]` edge with its metadata
 * at `text-white/55` — on a phone in daylight that is a near-invisible
 * rectangle of grey text, which is exactly how the hub read. Now on the shared
 * card recipe: a lit diagonal surface under a volt edge, with every piece of
 * text at full white.
 */
const FlashcardSetCard = ({ set, onStart }: FlashcardSetCardProps) => {
  const progress = set.progressPercentage || 0;

  const getLevelLabel = (level?: FlashcardLevel) => {
    if (!level || level === 'Both') return null;
    return level === 'Level 2' ? 'L2' : 'L3';
  };

  const levelLabel = getLevelLabel(set.level);
  const Icon = set.icon;

  return (
    <button
      type="button"
      onClick={() => onStart(set.id)}
      className={cn(
        CARD_BASE,
        CARD_NEUTRAL,
        'min-h-[76px] w-full gap-2.5 p-3.5',
        /*
          Stacked on a small phone, side-by-side from 430px.
          These sit two-up, so on a 375px screen each cell is ~166px — after a
          40px icon the title has about 110px, which clamps "Cable Colours &
          Identification" to a truncated two lines. Stacking gives the title
          the full cell width.
        */
        'flex-col items-start',
        'min-[430px]:!flex-row min-[430px]:items-center min-[430px]:gap-3.5 min-[430px]:p-4'
      )}
    >
      {Icon && (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-elec-yellow/35">
          <Icon className="h-[18px] w-[18px] text-elec-yellow" />
        </span>
      )}

      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex items-center gap-2">
          <h3 className="line-clamp-2 text-[14.5px] font-semibold leading-tight tracking-tight text-white">
            {set.title}
          </h3>
          {set.completed && <CheckCircle className="h-4 w-4 shrink-0 text-elec-yellow" />}
        </div>
        {/*
          One text node, not a flex row of spans.
          The separators used to be their own elements, so on a phone — where
          these sit two-up and each cell is ~170px — the row wrapped and left a
          dangling "·" at the end of a line, or a leading one at the start of
          the next. Joined into a single string it wraps like prose and can
          never orphan a separator.
        */}
        <p className="text-[10px] font-medium uppercase leading-relaxed tracking-[0.12em] text-white">
          {[set.difficulty, levelLabel, `${set.count} cards`].filter(Boolean).join(' · ')}
          <span className="normal-case tracking-normal"> · {set.estimatedTime}</span>
        </p>
        {set.lastStudied && <p className="text-[12px] text-white">{set.lastStudied}</p>}
      </div>

      {/*
        Only once there is progress to report.
        An empty ring with a "0" in it on every un-started set is 26 pieces of
        noise saying nothing — the absence of a ring already says "not started".
      */}
      {progress > 0 && (
        <div className="shrink-0">
          <MiniProgressRing score={progress} size={38} strokeWidth={3} />
        </div>
      )}
    </button>
  );
};

export default FlashcardSetCard;
