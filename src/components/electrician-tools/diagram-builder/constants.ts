/**
 * Drawing scale and snapping — the single source of truth for the Room Planner.
 *
 * These numbers were previously duplicated across DiagramCanvas, RoomShapePicker,
 * cableRouter and PropertiesPanel with only comments asking future readers to
 * keep them in step. They drifted: the cable router snapped to a different
 * lattice from the canvas, and the properties panel nudged by an amount that
 * did not correspond to any grid line. Import from here instead.
 */

/** Canvas pixels per metre. Everything on the drawing derives from this. */
export const SCALE = 52;

/**
 * Snapping resolution — 0.1m.
 *
 * Deliberately finer than the visible grid. Snapping used to be a flat 10px,
 * which is 0.192m at this scale, so no dragged wall could land on a round
 * number: aiming for 3m gave 2.88m or 3.08m. A tenth of a metre means every
 * dragged dimension reads as a clean decimal on the drawing.
 */
export const SNAP_STEP = SCALE / 10;

/** Light grid line — 0.5m. */
export const GRID_MINOR = SCALE / 2;

/** Emphasised grid line — exactly 1m, so a major square matches the scale bar. */
export const GRID_MAJOR = SCALE;

/** Snap a value to the nearest 0.1m, rounded to 3dp.
 *
 * The rounding matters: SNAP_STEP (5.2) is not exactly representable in
 * binary floating point, and these coordinates are serialised to JSON, read
 * back, and re-snapped repeatedly. Without it, drift accumulates into the
 * stored geometry over a long editing session.
 */
export const snapToStep = (value: number): number =>
  Math.round((Math.round(value / SNAP_STEP) * SNAP_STEP) * 1000) / 1000;
