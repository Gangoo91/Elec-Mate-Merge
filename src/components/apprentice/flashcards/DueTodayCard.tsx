import { ChevronRight } from 'lucide-react';

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
        w-full flex items-center gap-3 p-4
        bg-elec-yellow/[0.04] border border-elec-yellow/20 rounded-xl
        touch-manipulation active:scale-[0.98] transition-transform
        text-left
      "
    >
      <div className="flex-1 min-w-0 space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
          Due today
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          {dueCount} {dueCount === 1 ? 'card' : 'cards'} ready for spaced repetition review
        </p>
      </div>
      <ChevronRight className="h-5 w-5 text-elec-yellow flex-shrink-0" />
    </button>
  );
};

export default DueTodayCard;
