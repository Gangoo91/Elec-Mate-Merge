/**
 * One colour per diary state, used as SOLID dots, bars and lines only —
 * never as a translucent fill (those go muddy brown on this ground).
 *   done      — training signed off
 *   waiting   — sent, waiting for sign-off
 *   back      — sent back to fix, or didn't send
 *   portfolio — in the portfolio
 *   shared    — shared with college (a plain fact, so plain white)
 */
export type DiaryTone = 'done' | 'waiting' | 'back' | 'portfolio' | 'shared' | 'none';

export const TONE_DOT: Record<DiaryTone, string> = {
  done: 'bg-emerald-400',
  waiting: 'bg-sky-400',
  back: 'bg-orange-400',
  portfolio: 'bg-violet-400',
  shared: 'bg-white',
  none: 'border border-white',
};
