/**
 * Mood presentation for the site diary — one definition. Mood is private: it
 * shows in the entry sheet and the entry's own detail, never in history rows,
 * the hub sheet or anything college staff can read.
 *
 * The emoji map and the mood→colour function were copy-pasted into
 * DiaryEntryCard, DiaryEntryDetailSheet, DiaryCalendarView and
 * DiaryWeeklySummary, so a change had to be made four times and they had
 * already drifted (some returned a bar colour, some a full chip class).
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

export function moodLabel(mood: number | null | undefined): string {
  return mood ? (MOOD_LABEL[mood] ?? '') : '';
}
