/**
 * WeeklyRecapSheet — the "your week" moment, shown once per ISO week on the
 * first Today open. Celebratory but honest; only ever appears for a week
 * with real activity (the hook gates a flat week out entirely).
 */

import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Flame } from 'lucide-react';
import type { WeeklyRecap } from '@/hooks/useWeeklyRecap';

interface Props {
  open: boolean;
  onClose: () => void;
  recap: WeeklyRecap | null;
}

function fmtTime(min: number): string {
  if (min < 60) return `${min}m`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

/** One supportive line that fits what they actually did — no hollow praise. */
function headline(r: WeeklyRecap): string {
  if (r.streak >= 5) return "You're on a proper run.";
  if (r.activeDays >= 4) return 'Showing up — that’s how it sticks.';
  if (r.quizzes >= 3) return 'Plenty of practice banked.';
  if (r.studyMinutes >= 120) return 'Solid hours in this week.';
  return 'Every bit counts — keep it going.';
}

export function WeeklyRecapSheet({ open, onClose, recap }: Props) {
  if (!recap) return null;

  const cells = [
    { value: fmtTime(recap.studyMinutes), label: 'Studied' },
    { value: `${recap.activeDays}`, label: recap.activeDays === 1 ? 'Active day' : 'Active days' },
    { value: `${recap.quizzes}`, label: recap.quizzes === 1 ? 'Quiz' : 'Quizzes' },
    {
      value: (
        <span className="inline-flex items-center gap-1">
          {recap.streak >= 2 && <Flame className="h-4 w-4 text-elec-yellow" />}
          {recap.streak}
        </span>
      ),
      label: 'Streak',
    },
  ];

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="bottom"
        className="rounded-t-2xl p-0 h-auto max-h-[80vh] overflow-y-auto border-white/[0.08] bg-[hsl(0_0%_10%)]"
      >
        <div className="w-12 h-1 bg-white/15 rounded-full mx-auto mt-3 mb-1" />
        <SheetTitle className="sr-only">Your week in review</SheetTitle>

        <div className="relative px-5 pt-4 pb-6">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none" />

          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
            Your week
          </span>
          <h2 className="mt-1 text-[22px] font-semibold tracking-tight leading-snug">
            {headline(recap)}
          </h2>

          <div className="mt-5 grid grid-cols-4 gap-[2px] bg-black border border-white/[0.08] rounded-2xl overflow-hidden">
            {cells.map((c) => (
              <div
                key={c.label}
                className="bg-[hsl(0_0%_10%)] px-2 py-4 flex flex-col items-center justify-center gap-1 text-center"
              >
                <span className="text-[20px] font-semibold tabular-nums leading-none text-white">
                  {c.value}
                </span>
                <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/55">
                  {c.label}
                </span>
              </div>
            ))}
          </div>

          {recap.flashcards > 0 && (
            <p className="mt-3 text-[12px] text-white/45 text-center">
              + {recap.flashcards} flashcard {recap.flashcards === 1 ? 'session' : 'sessions'} along
              the way.
            </p>
          )}

          <button
            type="button"
            onClick={onClose}
            className="mt-5 w-full h-11 rounded-xl bg-elec-yellow text-black text-[14px] font-semibold touch-manipulation active:scale-[0.98] transition-transform"
          >
            Crack on
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default WeeklyRecapSheet;
