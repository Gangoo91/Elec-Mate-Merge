/**
 * WeeklyRecapSheet — the "your week" moment, shown once per ISO week on the
 * first Today open. Celebratory but honest; only ever appears for a week
 * with real activity (the hook gates a flat week out entirely).
 */

import { ContentSheet } from '@/components/apprentice/ApprenticeHomeUi';
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
          {recap.streak >= 2 && <Flame className="h-5 w-5 text-elec-yellow" strokeWidth={1.75} />}
          {recap.streak}
        </span>
      ),
      label: 'Streak',
    },
  ];

  // Sized to its content (10 Oct): four figures and one button sat at the top
  // of an 85vh FormSheet with half a screen of nothing under them.
  return (
    <ContentSheet
      open={open}
      onOpenChange={(v) => !v && onClose()}
      eyebrow="Your week"
      title={headline(recap)}
      description="What you did in the app this week."
      footer={
        <button
          type="button"
          onClick={onClose}
          className={cn(
            buttonPrimaryCn,
            'w-full lg:ml-auto lg:flex lg:max-w-sm lg:items-center lg:justify-center'
          )}
        >
          Crack on
        </button>
      }
    >
      {/* Status figures: a 2x2 on a phone, one row from sm: */}
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-4">
        {cells.map((c) => (
          <div key={c.label} className="bg-[hsl(0_0%_11%)] px-4 py-3.5">
            <p className="text-[24px] font-semibold leading-none tabular-nums text-white">
              {c.value}
            </p>
            <p className="mt-1.5 text-[13px] font-medium text-white">{c.label}</p>
          </div>
        ))}
      </div>

      {recap.flashcards > 0 && (
        <p className="mt-3 text-[13px] text-white">
          Plus {recap.flashcards} flashcard {recap.flashcards === 1 ? 'session' : 'sessions'} along
          the way.
        </p>
      )}
    </ContentSheet>
  );
}
