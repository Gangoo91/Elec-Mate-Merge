import { Brain, ChevronRight } from 'lucide-react';

interface DueTodayCardProps {
  dueCount: number;
  onStart: () => void;
}

const DueTodayCard = ({ dueCount, onStart }: DueTodayCardProps) => {
  if (dueCount === 0) return null;

  return (
    <button
      type="button"
      onClick={onStart}
      className="
        w-full flex items-center gap-3 p-3.5
        bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl
        touch-manipulation active:scale-[0.98] transition-transform
        text-left
      "
    >
      <div className="p-2.5 rounded-xl bg-elec-yellow/20 border border-elec-yellow/30 flex-shrink-0">
        <Brain className="h-5 w-5 text-elec-yellow" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white text-sm">Due Today</h3>
        <p className="text-xs text-white">
          {dueCount} {dueCount === 1 ? 'card' : 'cards'} ready for spaced repetition review
        </p>
      </div>
      <ChevronRight className="h-5 w-5 text-elec-yellow flex-shrink-0" />
    </button>
  );
};

export default DueTodayCard;
