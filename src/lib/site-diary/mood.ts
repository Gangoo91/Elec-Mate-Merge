/**
 * Mood presentation for the site diary — one definition, four call sites.
 *
 * The emoji map and the mood→colour function were copy-pasted into
 * DiaryEntryCard, DiaryEntryDetailSheet, DiaryCalendarView and
 * DiaryWeeklySummary, so a change had to be made four times and they had
 * already drifted (some returned a bar colour, some a full chip class).
 *
 * Colour: every copy used green / amber / red. On a page that is otherwise
 * volt and white that painted a traffic-light down the feed and the calendar,
 * and red for "had a rough day" reads as an error in an app where red means
 * danger. A mood is not a fault. The scale now runs on the accent for a good
 * day and plain white below it — and the emoji, which is always shown
 * alongside, carries the precise value.
 */

export const MOOD_EMOJI: Record<number, string> = {
  1: '😢',
  2: '😔',
  3: '😐',
  4: '🙂',
  5: '😊',
};

export const MOOD_LABEL: Record<number, string> = {
  1: 'Tough day',
  2: 'Hard going',
  3: 'Steady',
  4: 'Good day',
  5: 'Great day',
};

/** Solid fill for a bar or dot. */
export function moodFill(mood: number | null | undefined): string {
  if (!mood) return 'bg-white/[0.12]';
  if (mood >= 4) return 'bg-elec-yellow';
  if (mood === 3) return 'bg-white/40';
  return 'bg-white/20';
}

/** Chip treatment — edge and text only, never a translucent fill. */
export function moodChip(mood: number | null | undefined): string {
  if (!mood) return 'border-white/[0.14] text-white/85';
  if (mood >= 4) return 'border-elec-yellow/50 text-elec-yellow';
  return 'border-white/[0.20] text-white';
}

export function moodLabel(mood: number | null | undefined): string {
  return mood ? (MOOD_LABEL[mood] ?? '') : '';
}
