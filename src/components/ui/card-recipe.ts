import { cn } from '@/lib/utils';

/**
 * The card recipe — one definition for every tappable card in the app.
 *
 * Extracted from the Inspection & Testing hub so the section pages beneath it
 * (Notices & Labels, Certificates, Specialist, My Certificates) can't drift
 * into their own surfaces again. Import these rather than retyping the classes.
 *
 * Brightness: /[0.12]→/[0.06] over a /[0.18] border. Dimmer values look fine on
 * a desktop monitor and read as flat rectangles on a phone in daylight, which
 * is where this app is actually used.
 *
 * Press feel is deliberate for native: scale down slightly, BRIGHTEN rather
 * than dim (a dark UI that dims on press reads as "disabled"), kill the
 * Android/iOS grey tap flash, and keep the transition short enough to feel
 * mechanical rather than animated.
 *
 * ⚠️ Volt is only ever SOLID (`bg-elec-yellow` + `text-black`) or plain text
 * (`text-elec-yellow`). Never `bg-elec-yellow/<opacity>` — every translucent
 * value goes muddy brown on this ground.
 */
export const CARD_BASE = cn(
  'group flex h-full flex-col rounded-2xl border text-left',
  'transition-[background-color,border-color,transform] duration-150 ease-out',
  'touch-manipulation select-none [-webkit-tap-highlight-color:transparent]',
  'active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60'
);

/** The one card in a group that carries the primary action. */
export const CARD_PRIMARY =
  'border-elec-yellow bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85';

export const CARD_NEUTRAL = cn(
  'border-white/[0.18] bg-gradient-to-b from-white/[0.12] to-white/[0.06]',
  'hover:border-elec-yellow/50 hover:from-white/[0.16] active:from-white/[0.18]'
);

/** Not available yet — dimmed, and callers should skip the action word. */
export const CARD_DISABLED = 'border-white/[0.10] bg-white/[0.03] opacity-60';
