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

const SCALE = 52;

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

// Convert wall definitions + lengths into points
function wallsToPoints(walls: WallDef[], lengths: (number | string)[]): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [{ x: 0, y: 0 }];
  let cx = 0;
  let cy = 0;

  for (let i = 0; i < walls.length - 1; i++) {
    const raw = lengths[i] ?? walls[i].defaultLength;
    const len = typeof raw === 'number' ? raw : (parseFloat(raw) || walls[i].defaultLength);
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

interface RoomShapePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onShapePlaced: (walls: CanvasObject[]) => void;
}

export function RoomShapePicker({ open, onOpenChange, onShapePlaced }: RoomShapePickerProps) {
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [wallLengths, setWallLengths] = useState<(number | string)[]>([]);
  const haptic = useHaptic();

  const selectedShape = roomShapes.find((s) => s.id === selectedShapeId);

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

    const canvasCentreX = window.innerWidth / 2;
    const canvasCentreY = window.innerHeight / 2;
    const offsetX = canvasCentreX - shapeWidthPx / 2 - minX * SCALE;
    const offsetY = canvasCentreY - shapeHeightPx / 2 - minY * SCALE;

    const gridSnap = (v: number) => Math.round(v / 20) * 20;
    const walls: CanvasObject[] = [];

    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % points.length];

      const x1 = gridSnap(p1.x * SCALE + offsetX);
      const y1 = gridSnap(p1.y * SCALE + offsetY);
      const x2 = gridSnap(p2.x * SCALE + offsetX);
      const y2 = gridSnap(p2.y * SCALE + offsetY);

      walls.push({
        id: `wall-${Date.now()}-${i}`,
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
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-background border-t border-white/10 flex flex-col"
      >
        <SheetHeader className="px-4 pt-4 pb-3 border-b border-white/10 shrink-0">
          <SheetTitle className="text-white text-lg font-semibold">Room Shapes</SheetTitle>
        </SheetHeader>

        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-4">
          {/* Shape grid — 4 columns */}
          <div className="grid grid-cols-4 gap-2">
            {roomShapes.map((shape) => {
              const isSelected = selectedShapeId === shape.id;
              return (
                <button
                  key={shape.id}
                  onClick={() => selectShape(shape.id)}
                  className={cn(
                    'flex flex-col items-center justify-center rounded-xl p-2 transition-all touch-manipulation active:scale-95 border',
                    isSelected
                      ? 'border-elec-yellow bg-elec-yellow/10'
                      : 'border-white/10 bg-white/[0.04]'
                  )}
                >
                  <svg viewBox="0 0 60 60" className="w-9 h-9 mb-1" fill="none" stroke={isSelected ? '#EAB308' : 'white'} strokeWidth="1.5">
                    <path d={shape.previewPath} />
                  </svg>
                  <span className={cn('text-[9px] font-medium', isSelected ? 'text-elec-yellow' : 'text-white')}>{shape.name}</span>
                </button>
              );
            })}
          </div>

          {/* Per-wall dimension inputs */}
          {selectedShape && (
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-3">
              <p className="text-[10px] font-medium text-white/50 uppercase tracking-wider">Wall lengths</p>
              <div className="space-y-2">
                {selectedShape.walls.map((wall, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs text-white w-28 shrink-0">{wall.label}</span>
                    <input
                      type="number"
                      step="0.1"
                      min="0.3"
                      max="20"
                      value={wallLengths[i] ?? wall.defaultLength}
                      onChange={(e) => updateWallLength(i, e.target.value)}
                      className="h-10 flex-1 bg-white/10 border border-white/20 rounded-lg text-white text-center text-sm touch-manipulation focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/30 focus:outline-none"
                    />
                    <span className="text-white/40 text-xs w-4">m</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-white/10 bg-background shrink-0">
          {selectedShape ? (
            <Button
              onClick={handlePlaceShape}
              className="w-full h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold text-sm touch-manipulation"
            >
              Place {selectedShape.name}
            </Button>
          ) : (
            <p className="text-white/40 text-sm text-center py-2">Select a shape</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
