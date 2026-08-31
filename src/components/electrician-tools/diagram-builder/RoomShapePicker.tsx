import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useHaptic } from '@/hooks/useHaptic';
import type { CanvasObject } from '@/pages/electrician-tools/ai-tools/DiagramBuilderPage';
import { cn } from '@/lib/utils';
import { SCALE, SNAP_STEP } from './constants';



interface WallDef {
  label: string;
  defaultLength: number;
  /** Direction: 'right' | 'down' | 'left' | 'up' — determines how the wall extends from the previous point */
  direction: 'right' | 'down' | 'left' | 'up';
}

interface RoomShape {
  id: string;
  name: string;
  walls: WallDef[];
  previewPath: string;
}

const roomShapes: RoomShape[] = [
  {
    id: 'rectangle',
    name: 'Rectangle',
    walls: [
      { label: 'Top', defaultLength: 4, direction: 'right' },
      { label: 'Right', defaultLength: 3, direction: 'down' },
      { label: 'Bottom', defaultLength: 4, direction: 'left' },
      { label: 'Left', defaultLength: 3, direction: 'up' },
    ],
    previewPath: 'M 10 15 L 50 15 L 50 45 L 10 45 Z',
  },
  {
    id: 'l-shape-right',
    name: 'L-Shape (R)',
    walls: [
      { label: 'Top', defaultLength: 5, direction: 'right' },
      { label: 'Right upper', defaultLength: 2.4, direction: 'down' },
      { label: 'Step across', defaultLength: 2.5, direction: 'left' },
      { label: 'Step down', defaultLength: 1.6, direction: 'down' },
      { label: 'Bottom', defaultLength: 2.5, direction: 'left' },
      { label: 'Left', defaultLength: 4, direction: 'up' },
    ],
    previewPath: 'M 10 10 L 50 10 L 50 32 L 30 32 L 30 50 L 10 50 Z',
  },
  {
    id: 'l-shape-left',
    name: 'L-Shape (L)',
    walls: [
      { label: 'Top', defaultLength: 5, direction: 'right' },
      { label: 'Right', defaultLength: 4, direction: 'down' },
      { label: 'Bottom', defaultLength: 2.5, direction: 'left' },
      { label: 'Step up', defaultLength: 1.6, direction: 'up' },
      { label: 'Step across', defaultLength: 2.5, direction: 'left' },
      { label: 'Left upper', defaultLength: 2.4, direction: 'up' },
    ],
    previewPath: 'M 10 10 L 50 10 L 50 50 L 30 50 L 30 32 L 10 32 Z',
  },
  {
    id: 'u-shape',
    name: 'U-Shape',
    walls: [
      { label: 'Left arm top', defaultLength: 1.5, direction: 'right' },
      { label: 'Left arm inner', defaultLength: 2, direction: 'down' },
      { label: 'Inner bottom', defaultLength: 2, direction: 'right' },
      { label: 'Right arm inner', defaultLength: 2, direction: 'up' },
      { label: 'Right arm top', defaultLength: 1.5, direction: 'right' },
      { label: 'Right', defaultLength: 4, direction: 'down' },
      { label: 'Bottom', defaultLength: 5, direction: 'left' },
      { label: 'Left', defaultLength: 4, direction: 'up' },
    ],
    previewPath: 'M 10 10 L 22 10 L 22 30 L 38 30 L 38 10 L 50 10 L 50 50 L 10 50 Z',
  },
  {
    id: 't-shape',
    name: 'T-Shape',
    walls: [
      { label: 'Top', defaultLength: 5, direction: 'right' },
      { label: 'Right shoulder', defaultLength: 1.6, direction: 'down' },
      { label: 'Leg right', defaultLength: 1.5, direction: 'left' },
      { label: 'Leg down', defaultLength: 2.4, direction: 'down' },
      { label: 'Leg bottom', defaultLength: 2, direction: 'left' },
      { label: 'Leg up', defaultLength: 2.4, direction: 'up' },
      { label: 'Left shoulder', defaultLength: 1.5, direction: 'left' },
      { label: 'Left', defaultLength: 1.6, direction: 'up' },
    ],
    previewPath: 'M 10 10 L 50 10 L 50 26 L 38 26 L 38 50 L 22 50 L 22 26 L 10 26 Z',
  },
  {
    id: 'bay-window',
    name: 'Bay Window',
    walls: [
      { label: 'Top left', defaultLength: 1.2, direction: 'right' },
      { label: 'Bay side left', defaultLength: 0.6, direction: 'up' },
      { label: 'Bay front', defaultLength: 1.6, direction: 'right' },
      { label: 'Bay side right', defaultLength: 0.6, direction: 'down' },
      { label: 'Top right', defaultLength: 1.2, direction: 'right' },
      { label: 'Right', defaultLength: 3, direction: 'down' },
      { label: 'Bottom', defaultLength: 4, direction: 'left' },
      { label: 'Left', defaultLength: 3, direction: 'up' },
    ],
    previewPath: 'M 10 20 L 22 20 L 22 10 L 38 10 L 38 20 L 50 20 L 50 48 L 10 48 Z',
  },
  {
    id: 'corridor',
    name: 'Corridor',
    walls: [
      { label: 'Top (length)', defaultLength: 6, direction: 'right' },
      { label: 'Right', defaultLength: 1.2, direction: 'down' },
      { label: 'Bottom (length)', defaultLength: 6, direction: 'left' },
      { label: 'Left', defaultLength: 1.2, direction: 'up' },
    ],
    previewPath: 'M 5 24 L 55 24 L 55 36 L 5 36 Z',
  },
  {
    id: 'l-shape-wide',
    name: 'Wide L',
    walls: [
      { label: 'Top', defaultLength: 6, direction: 'right' },
      { label: 'Right upper', defaultLength: 2, direction: 'down' },
      { label: 'Step across', defaultLength: 3, direction: 'left' },
      { label: 'Step down', defaultLength: 3, direction: 'down' },
      { label: 'Bottom', defaultLength: 3, direction: 'left' },
      { label: 'Left', defaultLength: 5, direction: 'up' },
    ],
    previewPath: 'M 10 10 L 50 10 L 50 22 L 30 22 L 30 48 L 10 48 Z',
  },
  {
    id: 'en-suite',
    name: 'En-Suite',
    walls: [
      { label: 'Width', defaultLength: 2, direction: 'right' },
      { label: 'Height', defaultLength: 2.5, direction: 'down' },
      { label: 'Bottom', defaultLength: 2, direction: 'left' },
      { label: 'Left', defaultLength: 2.5, direction: 'up' },
    ],
    previewPath: 'M 15 12 L 45 12 L 45 48 L 15 48 Z',
  },
  {
    id: 'wc',
    name: 'WC',
    walls: [
      { label: 'Width', defaultLength: 1.5, direction: 'right' },
      { label: 'Height', defaultLength: 2, direction: 'down' },
      { label: 'Bottom', defaultLength: 1.5, direction: 'left' },
      { label: 'Left', defaultLength: 2, direction: 'up' },
    ],
    previewPath: 'M 18 14 L 42 14 L 42 46 L 18 46 Z',
  },
  {
    id: 'garage',
    name: 'Garage',
    walls: [
      { label: 'Width', defaultLength: 6, direction: 'right' },
      { label: 'Depth', defaultLength: 3, direction: 'down' },
      { label: 'Bottom', defaultLength: 6, direction: 'left' },
      { label: 'Left', defaultLength: 3, direction: 'up' },
    ],
    previewPath: 'M 5 18 L 55 18 L 55 42 L 5 42 Z',
  },
  {
    id: 'open-plan',
    name: 'Open Plan',
    walls: [
      { label: 'Width', defaultLength: 8, direction: 'right' },
      { label: 'Depth', defaultLength: 5, direction: 'down' },
      { label: 'Bottom', defaultLength: 8, direction: 'left' },
      { label: 'Left', defaultLength: 5, direction: 'up' },
    ],
    previewPath: 'M 5 14 L 55 14 L 55 46 L 5 46 Z',
  },
  {
    id: 'step-room',
    name: 'Stepped',
    walls: [
      { label: 'Top left', defaultLength: 3, direction: 'right' },
      { label: 'Step down', defaultLength: 1, direction: 'down' },
      { label: 'Top right', defaultLength: 3, direction: 'right' },
      { label: 'Right', defaultLength: 3, direction: 'down' },
      { label: 'Bottom', defaultLength: 6, direction: 'left' },
      { label: 'Left', defaultLength: 4, direction: 'up' },
    ],
    previewPath: 'M 10 15 L 30 15 L 30 25 L 50 25 L 50 48 L 10 48 Z',
  },
];

const resolveLength = (raw: number | string | undefined, fallback: number): number => {
  if (typeof raw === 'number') return raw;
  const parsed = parseFloat(raw ?? '');
  return Number.isFinite(parsed) ? parsed : fallback;
};

// Convert wall definitions + lengths into points
function wallsToPoints(walls: WallDef[], lengths: (number | string)[]): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [{ x: 0, y: 0 }];
  let cx = 0;
  let cy = 0;

  for (let i = 0; i < walls.length - 1; i++) {
    const len = resolveLength(lengths[i], walls[i].defaultLength);
    switch (walls[i].direction) {
      case 'right': cx += len; break;
      case 'down': cy += len; break;
      case 'left': cx -= len; break;
      case 'up': cy -= len; break;
    }
    points.push({ x: cx, y: cy });
  }
  // Last wall closes back to origin — no need to add the starting point again

  return points;
}

/**
 * The final wall is always DERIVED: it runs from the last point back to the
 * origin, so its length is whatever the other walls leave over. That only
 * produces a real room if the axis it does NOT run along already balances.
 *
 * A rectangle with Top 4m and Bottom 3m, for example, leaves the closing wall
 * running diagonally from (1,3) back to (0,0) — the picker would happily place
 * a room with a slanted wall and no warning at all. This reports the mismatch
 * instead, naming the wall to change and the value that would close it.
 */
interface ClosureCheck {
  ok: boolean;
  /** Index of the wall the user should change to fix it. */
  blameIndex?: number;
  blameLabel?: string;
  /** Value that wall needs for the room to close. */
  requiredLength?: number;
  derivedLabel: string;
  derivedLength: number;
}

function checkClosure(walls: WallDef[], lengths: (number | string)[]): ClosureCheck {
  const points = wallsToPoints(walls, lengths);
  const last = points[points.length - 1];
  const closing = walls[walls.length - 1];
  const closingIsVertical = closing.direction === 'up' || closing.direction === 'down';

  // The closing wall can absorb displacement along its own axis only. The
  // perpendicular axis must already be back at zero.
  const residual = closingIsVertical ? last.x : last.y;
  const derivedLength = Math.abs(closingIsVertical ? last.y : last.x);

  if (Math.abs(residual) < 0.005) {
    return { ok: true, derivedLabel: closing.label, derivedLength };
  }

  // Blame the last user-editable wall on the offending axis — that is the one
  // they most likely just changed, and adjusting it always resolves the gap.
  const axis = closingIsVertical ? ['right', 'left'] : ['down', 'up'];
  let blameIndex = -1;
  for (let i = walls.length - 2; i >= 0; i--) {
    if (axis.includes(walls[i].direction)) { blameIndex = i; break; }
  }
  if (blameIndex === -1) {
    return { ok: false, derivedLabel: closing.label, derivedLength };
  }

  const current = resolveLength(lengths[blameIndex], walls[blameIndex].defaultLength);
  // Moving this wall further along its own direction closes the gap; whether
  // that means adding or subtracting depends on which way it points.
  const sign = walls[blameIndex].direction === 'right' || walls[blameIndex].direction === 'down' ? 1 : -1;
  const requiredLength = current - residual * sign;

  return {
    ok: false,
    blameIndex,
    blameLabel: walls[blameIndex].label,
    requiredLength,
    derivedLabel: closing.label,
    derivedLength,
  };
}

interface RoomShapePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onShapePlaced: (walls: CanvasObject[]) => void;
  getPlacementCenter?: () => { x: number; y: number } | null;
}

export function RoomShapePicker({ open, onOpenChange, onShapePlaced, getPlacementCenter }: RoomShapePickerProps) {
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [wallLengths, setWallLengths] = useState<(number | string)[]>([]);
  const haptic = useHaptic();

  const selectedShape = roomShapes.find((s) => s.id === selectedShapeId);
  const closure =
    selectedShape && wallLengths.length > 0
      ? checkClosure(selectedShape.walls, wallLengths)
      : null;

  /** Set the offending wall to the value that closes the room. */
  const applyClosureFix = () => {
    if (!closure || closure.ok || closure.blameIndex === undefined || closure.requiredLength === undefined) return;
    haptic.light();
    const updated = [...wallLengths];
    updated[closure.blameIndex] = Math.round(closure.requiredLength * 100) / 100;
    setWallLengths(updated);
  };

  const selectShape = (shapeId: string) => {
    haptic.light();
    setSelectedShapeId(shapeId);
    const shape = roomShapes.find((s) => s.id === shapeId);
    if (shape) {
      setWallLengths(shape.walls.map((w) => w.defaultLength));
    }
  };

  const updateWallLength = (index: number, rawValue: string) => {
    const updated = [...wallLengths];
    // Allow empty string while user is typing
    if (rawValue === '' || rawValue === '.') {
      updated[index] = rawValue;
    } else {
      const num = parseFloat(rawValue);
      updated[index] = isNaN(num) ? rawValue : num;
    }
    setWallLengths(updated);
  };

  const handlePlaceShape = () => {
    if (!selectedShape || wallLengths.length === 0) return;
    if (closure && !closure.ok) {
      haptic.error();
      return;
    }
    haptic.success();

    const points = wallsToPoints(selectedShape.walls, wallLengths);

    // Find bounding box to centre
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);
    const shapeWidthPx = (maxX - minX) * SCALE;
    const shapeHeightPx = (maxY - minY) * SCALE;

    const placementCentre = getPlacementCenter?.();
    const canvasCentreX = placementCentre?.x ?? window.innerWidth / 2;
    const canvasCentreY = placementCentre?.y ?? window.innerHeight / 2;
    const offsetX = canvasCentreX - shapeWidthPx / 2 - minX * SCALE;
    const offsetY = canvasCentreY - shapeHeightPx / 2 - minY * SCALE;

    // Snap the ORIGIN once, then lay every point out as an exact offset from
    // it. Snapping each endpoint independently (the previous behaviour) let
    // the two ends of a wall round in opposite directions, so a room typed as
    // 4.00m could be built as 3.85m or 4.04m and the wall label would say so.
    // Anchoring to one snapped origin keeps every typed dimension exact.
    const snapOrigin = (v: number) => Math.round(v / SNAP_STEP) * SNAP_STEP;
    const baseX = snapOrigin(offsetX);
    const baseY = snapOrigin(offsetY);
    // 3dp guards against float dust accumulating in serialised coordinates.
    const at = (v: number, base: number) => Math.round((base + v * SCALE) * 1000) / 1000;

    const stamp = Date.now();
    const walls: CanvasObject[] = [];

    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % points.length];

      const x1 = at(p1.x, baseX);
      const y1 = at(p1.y, baseY);
      const x2 = at(p2.x, baseX);
      const y2 = at(p2.y, baseY);

      walls.push({
        id: `wall-${stamp}-${i}`,
        type: 'wall',
        x: x1,
        y: y1,
        points: [{ x: x1, y: y1 }, { x: x2, y: y2 }],
      });
    }

    onShapePlaced(walls);
    onOpenChange(false);
    setSelectedShapeId(null);
    setWallLengths([]);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] lg:h-auto lg:max-h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-background border-t border-white/10 flex flex-col"
      >
        <SheetHeader className="w-full max-w-3xl mx-auto px-4 pt-4 pb-3 border-b border-white/10 shrink-0">
          <SheetTitle className="text-white text-lg font-semibold">Room Shapes</SheetTitle>
        </SheetHeader>

        <div className="flex-1 min-h-0 overflow-y-auto w-full max-w-3xl mx-auto px-4 py-4 space-y-4">
          {/* Shape grid — 4 columns */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {roomShapes.map((shape) => {
              const isSelected = selectedShapeId === shape.id;
              return (
                <button
                  key={shape.id}
                  onClick={() => selectShape(shape.id)}
                  className={cn(
                    'flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-2xl p-3 transition-colors touch-manipulation active:scale-[0.97] border',
                    isSelected
                      ? 'border-elec-yellow bg-elec-yellow/10'
                      : 'border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.07]'
                  )}
                >
                  <svg viewBox="0 0 60 60" className="w-12 h-12" fill="none" stroke={isSelected ? '#EAB308' : 'white'} strokeWidth="2" strokeLinejoin="round">
                    <path d={shape.previewPath} />
                  </svg>
                  <span className={cn('text-[11px] font-medium leading-none', isSelected ? 'text-elec-yellow' : 'text-white')}>{shape.name}</span>
                </button>
              );
            })}
          </div>

          {/* Per-wall dimension inputs */}
          {selectedShape && (
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-3">
              <p className="text-[10px] font-medium text-white uppercase tracking-wider">Wall lengths</p>
              <div className="space-y-2">
                {selectedShape.walls.map((wall, i) => {
                  // The final wall is always computed from the others — it has
                  // to close the room. Showing it as an editable field implied
                  // it did something; typing in it was silently ignored.
                  const isDerived = i === selectedShape.walls.length - 1;
                  const isBlamed = !closure?.ok && closure?.blameIndex === i;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs text-white w-28 shrink-0">{wall.label}</span>
                      {isDerived ? (
                        <div className="h-10 flex-1 rounded-lg border border-dashed border-white/20 bg-white/[0.03] flex items-center justify-center gap-1.5">
                          <span className="text-sm text-white tabular-nums">
                            {(closure?.derivedLength ?? 0).toFixed(2)}
                          </span>
                          <span className="text-[10px] text-white">closes shape</span>
                        </div>
                      ) : (
                        <input
                          type="number"
                          step="0.1"
                          min="0.3"
                          max="20"
                          inputMode="decimal"
                          aria-label={`${wall.label} length in metres`}
                          value={wallLengths[i] ?? wall.defaultLength}
                          onChange={(e) => updateWallLength(i, e.target.value)}
                          className={cn(
                            'h-11 flex-1 bg-white/10 border rounded-lg text-white text-center text-base touch-manipulation focus:ring-1 focus:outline-none',
                            isBlamed
                              ? 'border-orange-500/60 focus:border-orange-400 focus:ring-orange-400/30'
                              : 'border-white/20 focus:border-elec-yellow focus:ring-elec-yellow/30'
                          )}
                        />
                      )}
                      <span className="text-white text-xs w-4">m</span>
                    </div>
                  );
                })}
              </div>

              {closure && !closure.ok && (
                <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-3 space-y-2">
                  <p className="text-xs text-orange-300 font-medium">These lengths don't close the room</p>
                  <p className="text-[11px] text-white">
                    {closure.blameLabel && closure.requiredLength !== undefined && closure.requiredLength > 0
                      ? `Set "${closure.blameLabel}" to ${closure.requiredLength.toFixed(2)}m, or adjust the others to match.`
                      : 'Adjust the wall lengths so opposite sides balance.'}
                  </p>
                  {closure.blameLabel && closure.requiredLength !== undefined && closure.requiredLength > 0 && (
                    <button
                      type="button"
                      onClick={applyClosureFix}
                      className="h-11 sm:h-9 px-3 rounded-lg bg-orange-500/20 border border-orange-500/40 text-orange-200 text-xs font-semibold touch-manipulation active:scale-95"
                    >
                      Set it to {closure.requiredLength.toFixed(2)}m
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="w-full max-w-3xl mx-auto px-4 py-3 border-t border-white/10 bg-background shrink-0">
          {selectedShape ? (
            <Button
              onClick={handlePlaceShape}
              disabled={!!closure && !closure.ok}
              className="w-full h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold text-sm touch-manipulation disabled:bg-white/[0.08] disabled:text-white/70"
            >
              {closure && !closure.ok ? 'Fix wall lengths to continue' : `Place ${selectedShape.name}`}
            </Button>
          ) : (
            <Button
              disabled
              // Full white, not white/50 — low-opacity white renders as grey,
              // which the design rules disallow. The disabled state reads from
              // the flat background and the missing yellow, not from dim text.
              className="w-full h-12 bg-white/[0.06] text-white font-semibold text-sm disabled:opacity-100"
            >
              Select a shape to continue
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
