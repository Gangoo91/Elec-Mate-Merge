/** What a Diary drag carries (desktop only; phones use the sheets). */
import type { DragEvent } from 'react';

export type DragPayload =
  | { type: 'booking'; id: string; fromDay: string }
  | { type: 'job'; id: string; fromDay: string | null };

export const DRAG_MIME = 'application/x-elecmate-dispatch';

export function readDrag(e: DragEvent): DragPayload | null {
  try {
    const raw = e.dataTransfer.getData(DRAG_MIME) || e.dataTransfer.getData('text/plain');
    const p = JSON.parse(raw) as DragPayload;
    return p && (p.type === 'booking' || p.type === 'job') ? p : null;
  } catch {
    return null;
  }
}

