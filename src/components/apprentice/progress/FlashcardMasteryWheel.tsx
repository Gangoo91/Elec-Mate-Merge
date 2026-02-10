/**
 * FlashcardMasteryWheel
 *
 * 12-segment ring, one per flashcard set.
 * Each segment fills based on mastery %.
 */

import { Card, CardContent } from '@/components/ui/card';
import { Layers } from 'lucide-react';

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

const SEGMENT_COLOURS = [
  '#facc15', '#22c55e', '#3b82f6', '#a855f7',
  '#f97316', '#06b6d4', '#ec4899', '#14b8a6',
  '#8b5cf6', '#ef4444', '#84cc16', '#f59e0b',
];

export function FlashcardMasteryWheel({ sets, totalMastered, totalCards }: FlashcardMasteryWheelProps) {
  const overallPercent = totalCards > 0 ? Math.round((totalMastered / totalCards) * 100) : 0;

  return (
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/[0.06]">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-elec-yellow/10">
            <Layers className="h-4 w-4 text-elec-yellow" />
          </div>
          <h3 className="font-semibold text-white text-sm">Flashcard Mastery</h3>
          <span className="ml-auto text-xs text-white/90">
            {totalMastered}/{totalCards} cards
          </span>
        </div>

        {/* Mastery bars */}
        <div className="space-y-2">
          {sets.map((set, i) => (
            <div key={set.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/90 truncate max-w-[60%]">
                  {set.title}
                </span>
                <span className="text-xs font-medium" style={{ color: SEGMENT_COLOURS[i % SEGMENT_COLOURS.length] }}>
                  {set.progressPercent}%
                </span>
              </div>
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${set.progressPercent}%`,
                    backgroundColor: SEGMENT_COLOURS[i % SEGMENT_COLOURS.length],
                    opacity: set.progressPercent > 0 ? 1 : 0.3,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Overall footer */}
        <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-xs text-white/90">Overall mastery</span>
          <span className="text-sm font-bold text-elec-yellow">{overallPercent}%</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default FlashcardMasteryWheel;
