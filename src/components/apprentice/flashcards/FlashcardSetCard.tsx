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
        'w-full !flex-row items-center gap-3.5 p-4 min-h-[76px]'
      )}
    >
      {Icon && (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-elec-yellow/35">
          <Icon className="h-[18px] w-[18px] text-elec-yellow" />
        </span>
      )}

      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-[14.5px] font-semibold tracking-tight text-white">
            {set.title}
          </h3>
          {set.completed && <CheckCircle className="h-4 w-4 shrink-0 text-elec-yellow" />}
        </div>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white">
          <span>{set.difficulty}</span>
          {levelLabel && (
            <>
              <span className="text-elec-yellow">·</span>
              <span>{levelLabel}</span>
            </>
          )}
          <span className="text-elec-yellow">·</span>
          <span>{set.count} cards</span>
          <span className="text-elec-yellow">·</span>
          <span className="normal-case tracking-normal">{set.estimatedTime}</span>
        </div>
        {set.lastStudied && <p className="text-[12px] text-white">{set.lastStudied}</p>}
      </div>

      <div className="shrink-0">
        <MiniProgressRing score={progress} size={38} strokeWidth={3} />
      </div>
    </button>
  );
};

export default FlashcardSetCard;
