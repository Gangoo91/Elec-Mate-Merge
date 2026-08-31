/**
 * FlashcardMasteryWheel
 *
 * Set-by-set flashcard mastery.
 *
 * ⚠️ Not a wheel — it has been a list for a long time; the name is kept only
 * because two other files import it and renaming buys nothing.
 *
 * 🔴 It used to render EVERY set unconditionally. There are 31, so a learner
 * who had never opened a flashcard deck got thirty-one rows reading "0%",
 * roughly a thousand pixels of nothing, sitting between the topic mastery
 * they came for and the recent activity that actually had content. Sets in
 * progress now lead and sets never started collapse behind one line.
 */

import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { Eyebrow } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

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
  const [showUntouched, setShowUntouched] = useState(false);
  const overallPercent = totalCards > 0 ? Math.round((totalMastered / totalCards) * 100) : 0;

  // Started sets first, strongest at the top — the ordering a learner
  // deciding what to revise actually wants.
  const { started, untouched } = useMemo(() => {
    const s = sets.filter((x) => x.progressPercent > 0).sort((a, b) => b.progressPercent - a.progressPercent);
    return { started: s, untouched: sets.filter((x) => x.progressPercent === 0) };
  }, [sets]);

  return (
    <div className={cn('rounded-2xl border border-white/[0.06] p-4 space-y-3', CARD_SURFACE)}>
      <div className="flex items-center justify-between gap-3">
        <Eyebrow>Flashcard mastery</Eyebrow>
        <span className="text-[12px] text-white font-mono tabular-nums shrink-0">
          {totalMastered}/{totalCards} cards
        </span>
      </div>

      {started.length === 0 ? (
        <p className="text-[13px] text-white leading-relaxed">
          No sets started yet. {sets.length} decks are waiting — mastery here feeds your predicted
          EPA grade alongside quiz scores.
        </p>
      ) : (
        <div className="space-y-2">
          {started.map((set) => (
            <SetRow key={set.id} set={set} />
          ))}
        </div>
      )}

      {untouched.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => setShowUntouched((v) => !v)}
            aria-expanded={showUntouched}
            className="flex w-full items-center justify-between gap-3 h-11 rounded-lg px-1 text-left touch-manipulation transition-colors hover:bg-white/[0.03]"
          >
            <span className="text-[12.5px] text-white">
              {showUntouched
                ? 'Hide sets not started'
                : `${untouched.length} ${untouched.length === 1 ? 'set' : 'sets'} not started`}
            </span>
            <ChevronDown
              className={cn('h-4 w-4 shrink-0 text-white transition-transform', showUntouched && 'rotate-180')}
              strokeWidth={2}
            />
          </button>
          {showUntouched && (
            <div className="space-y-2">
              {untouched.map((set) => (
                <SetRow key={set.id} set={set} />
              ))}
            </div>
          )}
        </>
      )}

      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3">
        <span className="text-[12px] text-white">Overall mastery</span>
        <span className="text-[14px] text-elec-yellow font-mono tabular-nums">{overallPercent}%</span>
      </div>
    </div>
  );
}

function SetRow({ set }: { set: FlashcardSetData }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[12px] text-white truncate">{set.title}</span>
        <span className="text-[12px] text-white font-mono tabular-nums shrink-0">
          {set.progressPercent}%
        </span>
      </div>
      <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-elec-yellow rounded-full transition-all duration-500"
          style={{ width: `${set.progressPercent}%` }}
        />
      </div>
    </div>
  );
}

export default FlashcardMasteryWheel;
