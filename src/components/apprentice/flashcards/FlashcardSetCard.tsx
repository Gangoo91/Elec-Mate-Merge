import { CheckCircle } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import MiniProgressRing from './MiniProgressRing';
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

const FlashcardSetCard = ({ set, onStart }: FlashcardSetCardProps) => {
  const progress = set.progressPercentage || 0;

  const getLevelLabel = (level?: FlashcardLevel) => {
    if (!level || level === 'Both') return null;
    return level === 'Level 2' ? 'L2' : 'L3';
  };

  const levelLabel = getLevelLabel(set.level);

  return (
    <button
      type="button"
      onClick={() => onStart(set.id)}
      className="
        w-full flex items-center gap-3 p-4
        bg-white/[0.02] border border-white/[0.06] rounded-xl
        min-h-[72px] touch-manipulation
        active:scale-[0.98] transition-transform
        text-left
      "
    >
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-white text-[14px] truncate">{set.title}</h3>
          {set.completed && <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0" />}
        </div>
        <div className="flex items-baseline gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 flex-wrap">
          <span>{set.difficulty}</span>
          {levelLabel && (
            <>
              <span className="text-white/25">·</span>
              <span>{levelLabel}</span>
            </>
          )}
          <span className="text-white/25">·</span>
          <span>{set.count} cards</span>
          <span className="text-white/25">·</span>
          <span className="normal-case tracking-normal">{set.estimatedTime}</span>
        </div>
        {set.lastStudied && (
          <p className="text-[12px] text-white/55">{set.lastStudied}</p>
        )}
      </div>

      <div className="flex-shrink-0">
        <MiniProgressRing score={progress} size={36} strokeWidth={3} />
      </div>
    </button>
  );
};

export default FlashcardSetCard;
