/**
 * WeeklyRecapSheet — the "your week" moment, shown once per ISO week on the
 * first Today open. Celebratory but honest; only ever appears for a week
 * with real activity (the hook gates a flat week out entirely).
 */

import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
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
    <FormSheet
      open={open}
      onOpenChange={(v) => !v && onClose()}
      eyebrow="Your week"
      title={headline(recap)}
      footer={
        <button type="button" onClick={onClose} className={cn(buttonPrimaryCn, 'w-full')}>
          Crack on
        </button>
      }
    >
      <div className="grid grid-cols-4 gap-[2px] overflow-hidden rounded-2xl border border-white/[0.08] bg-black">
        {cells.map((c) => (
          <div
            key={c.label}
            className="flex flex-col items-center justify-center gap-1 bg-white/[0.06] px-2 py-4 text-center"
          >
            <span className="text-[20px] font-semibold leading-none tabular-nums text-white">
              {c.value}
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-white">
              {c.label}
            </span>
          </div>
        ))}
      </div>

      {recap.flashcards > 0 && (
        <p className="text-center text-[12px] text-white">
          + {recap.flashcards} flashcard {recap.flashcards === 1 ? 'session' : 'sessions'} along the
          way.
        </p>
      )}
    </FormSheet>
  );
}
