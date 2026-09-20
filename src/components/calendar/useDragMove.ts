/**
 * Drag a booking to a new time (and, on the week grid, a new day).
 *
 * Mouse and pen only. On a phone a finger on a block is a scroll or a swipe,
 * and hijacking it for a drag would break both; the phone moves a booking
 * from Edit, where the time picker is.
 *
 * Snaps to 15 minutes vertically and to whole columns horizontally. A press
 * that moves less than six pixels is a click and is left alone — the block's
 * onClick still opens the sheet — and a drag suppresses the click that the
 * browser fires after pointerup.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { CalendarEvent } from '@/types/calendar';

const CLICK_SLOP_PX = 6;
const SNAP_MINUTES = 15;

export interface DragState {
  id: string;
  /** Snapped pixel offsets applied to the block while dragging. */
  dx: number;
  dy: number;
  /** Whole columns moved (week grid only). */
  dayShift: number;
  /** Minutes moved, snapped. */
  minuteShift: number;
}

interface UseDragMoveOptions {
  hourHeight: number;
  /** Pixel width of one day column, or null on the single-column day rail. */
  columnWidth: number | null;
  /** How many columns exist (7 on the week grid), for clamping. */
  columns?: number;
  onMove: (event: CalendarEvent, minuteShift: number, dayShift: number) => void;
  enabled?: boolean;
}

export function useDragMove({
  hourHeight,
  columnWidth,
  columns = 1,
  onMove,
  enabled = true,
}: UseDragMoveOptions) {
  const [drag, setDrag] = useState<DragState | null>(null);
  // The latest snapped position, readable synchronously. A fast release can
  // fire pointerup before React has re-rendered with the last pointermove's
  // state, and committing the render's `drag` would drop the final snap.
  const latest = useRef<DragState | null>(null);
  const origin = useRef<{
    event: CalendarEvent;
    startX: number;
    startY: number;
    column: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);

  // Escape abandons a drag in progress; the block snaps home.
  useEffect(() => {
    if (!drag) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        origin.current = null;
        latest.current = null;
        suppressClick.current = true;
        setTimeout(() => {
          suppressClick.current = false;
        }, 0);
        setDrag(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drag]);

  const onPointerDown = useCallback(
    (event: CalendarEvent, column: number) => (e: React.PointerEvent<HTMLElement>) => {
      if (!enabled) return;
      if (e.pointerType === 'touch') return;
      if (e.button !== 0) return;
      origin.current = { event, startX: e.clientX, startY: e.clientY, column, moved: false };
      e.currentTarget.setPointerCapture?.(e.pointerId);
    },
    [enabled]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const o = origin.current;
      if (!o) return;
      const rawDx = e.clientX - o.startX;
      const rawDy = e.clientY - o.startY;
      if (!o.moved && Math.abs(rawDx) < CLICK_SLOP_PX && Math.abs(rawDy) < CLICK_SLOP_PX) return;
      o.moved = true;
      const snapPx = (hourHeight * SNAP_MINUTES) / 60;
      const minuteShift = Math.round(rawDy / snapPx) * SNAP_MINUTES;
      let dayShift = 0;
      if (columnWidth && columnWidth > 0) {
        dayShift = Math.round(rawDx / columnWidth);
        dayShift = Math.max(-o.column, Math.min(columns - 1 - o.column, dayShift));
      }
      const next: DragState = {
        id: o.event.id,
        dx: columnWidth ? dayShift * columnWidth : 0,
        dy: (minuteShift / 60) * hourHeight,
        dayShift,
        minuteShift,
      };
      latest.current = next;
      setDrag(next);
    },
    [hourHeight, columnWidth, columns]
  );

  const finish = useCallback(
    (commit: boolean) => {
      const o = origin.current;
      origin.current = null;
      if (!o) return;
      if (o.moved) {
        suppressClick.current = true;
        // Let the click that follows pointerup pass through the guard first.
        setTimeout(() => {
          suppressClick.current = false;
        }, 0);
        const last = latest.current;
        if (commit && last && (last.minuteShift !== 0 || last.dayShift !== 0)) {
          onMove(o.event, last.minuteShift, last.dayShift);
        }
      }
      latest.current = null;
      setDrag(null);
    },
    [onMove]
  );

  const onPointerUp = useCallback(() => finish(true), [finish]);
  const onPointerCancel = useCallback(() => finish(false), [finish]);

  /** Wrap a block's onClick so a drag does not also open it. */
  const guardClick = useCallback(
    (fn: () => void) => () => {
      if (suppressClick.current) return;
      fn();
    },
    []
  );

  return { drag, onPointerDown, onPointerMove, onPointerUp, onPointerCancel, guardClick };
}
