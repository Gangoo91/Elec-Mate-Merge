import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

/*
 * The five Tailwind colour fields that used to live here — colour,
 * borderColour, bgColour, textColour, ringColour — were read by nothing. The
 * shell has rendered a single accent since the editorial rework, so they were
 * dead data that still looked like it drove the design.
 */
export interface ToggleCardDef {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface SafetyNotice {
  title: string;
  points: { title: string; content: string }[];
}
