import { Badge } from '@/components/ui/badge';
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
  const SetIcon = set.icon;

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return {
          label: 'Beginner',
          className: 'bg-green-500/10 text-green-400 border-green-500/30',
        };
      case 'intermediate':
        return {
          label: 'Intermediate',
          className: 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30',
        };
      case 'advanced':
        return {
          label: 'Advanced',
          className: 'bg-red-500/10 text-red-400 border-red-500/30',
        };
      default:
        return {
          label: 'Standard',
          className: 'bg-white/10 text-white border-white/20',
        };
    }
  };

  const getLevelBadge = (level?: FlashcardLevel) => {
    if (!level || level === 'Both') return null;
    if (level === 'Level 2') {
      return {
        label: 'L2',
        className: 'bg-green-500/10 text-green-400 border-green-500/30',
      };
    }
    return {
      label: 'L3',
      className: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    };
  };

  const diffConfig = getDifficultyLabel(set.difficulty);
  const levelBadge = getLevelBadge(set.level);

  return (
    <button
      type="button"
      onClick={() => onStart(set.id)}
      className="
        w-full flex items-center gap-3 p-3
        bg-white/5 border border-white/10 rounded-xl
        min-h-[72px] touch-manipulation
        active:scale-[0.98] transition-transform
        text-left
      "
    >
      {/* Icon */}
      <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 flex-shrink-0">
        <SetIcon className="h-5 w-5 text-elec-yellow" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="font-semibold text-white text-sm truncate">{set.title}</h3>
          {set.completed && <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />}
        </div>
        <div className="flex items-center gap-2 text-xs text-white">
          <span>{set.count} cards</span>
          <span className="text-white">|</span>
          <span>{set.estimatedTime}</span>
          {set.lastStudied && (
            <>
              <span className="text-white">|</span>
              <span className="text-elec-yellow">{set.lastStudied}</span>
            </>
          )}
        </div>
        <div className="mt-1 flex items-center gap-1.5">
          <Badge variant="outline" className={`text-[10px] px-2 py-0 ${diffConfig.className}`}>
            {diffConfig.label}
          </Badge>
          {levelBadge && (
            <Badge variant="outline" className={`text-[10px] px-2 py-0 ${levelBadge.className}`}>
              {levelBadge.label}
            </Badge>
          )}
        </div>
      </div>

      {/* Progress Ring */}
      <div className="flex-shrink-0">
        <MiniProgressRing score={progress} size={36} strokeWidth={3} />
      </div>
    </button>
  );
};

export default FlashcardSetCard;
