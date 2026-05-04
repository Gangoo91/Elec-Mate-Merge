/**
 * FlashcardMasteryWheel
 *
 * 12-segment ring, one per flashcard set.
 * Each segment fills based on mastery %.
 */

interface FlashcardSetData {
  id: string;
  title: string;
  progressPercent: number;
  masteredCards: number;
  totalCards: number;
}

interface FlashcardMasteryWheelProps {
  sets: FlashcardSetData[];
  totalMastered: number;
  totalCards: number;
}

export function FlashcardMasteryWheel({
  sets,
  totalMastered,
  totalCards,
}: FlashcardMasteryWheelProps) {
  const overallPercent = totalCards > 0 ? Math.round((totalMastered / totalCards) * 100) : 0;

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Flashcard mastery
        </span>
        <span className="text-[12px] text-white/85 font-mono">
          {totalMastered}/{totalCards} cards
        </span>
      </div>

      <div className="space-y-2">
        {sets.map((set) => (
          <div key={set.id} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-white/85 truncate max-w-[60%]">{set.title}</span>
              <span className="text-[12px] text-white/85 font-mono">{set.progressPercent}%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-elec-yellow rounded-full transition-all duration-500"
                style={{
                  width: `${set.progressPercent}%`,
                  opacity: set.progressPercent > 0 ? 1 : 0.3,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-[12px] text-white/55">Overall mastery</span>
        <span className="text-[14px] text-elec-yellow font-mono">{overallPercent}%</span>
      </div>
    </div>
  );
}

export default FlashcardMasteryWheel;
