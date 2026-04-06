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

const SCALE = 70; // 70px per metre

interface RoomShape {
  id: string;
  name: string;
  /** Points defining the room outline (in metres, clockwise from top-left) */
  getWalls: (w: number, h: number) => { x: number; y: number }[];
  defaultWidth: number;
  defaultHeight: number;
  /** SVG path for the preview thumbnail (viewBox 0 0 60 60) */
  previewPath: string;
}

const roomShapes: RoomShape[] = [
  {
    id: 'rectangle',
    name: 'Rectangle',
    defaultWidth: 4,
    defaultHeight: 3,
    getWalls: (w, h) => [
      { x: 0, y: 0 },
      { x: w, y: 0 },
      { x: w, y: h },
      { x: 0, y: h },
    ],
    previewPath: 'M 10 15 L 50 15 L 50 45 L 10 45 Z',
  },
  {
    id: 'l-shape-right',
    name: 'L-Shape (R)',
    defaultWidth: 5,
    defaultHeight: 4,
    getWalls: (w, h) => [
      { x: 0, y: 0 },
      { x: w, y: 0 },
      { x: w, y: h * 0.6 },
      { x: w * 0.5, y: h * 0.6 },
      { x: w * 0.5, y: h },
      { x: 0, y: h },
    ],
    previewPath: 'M 10 10 L 50 10 L 50 32 L 30 32 L 30 50 L 10 50 Z',
  },
  {
    id: 'l-shape-left',
    name: 'L-Shape (L)',
    defaultWidth: 5,
    defaultHeight: 4,
    getWalls: (w, h) => [
      { x: 0, y: 0 },
      { x: w, y: 0 },
      { x: w, y: h },
      { x: w * 0.5, y: h },
      { x: w * 0.5, y: h * 0.6 },
      { x: 0, y: h * 0.6 },
    ],
    previewPath: 'M 10 10 L 50 10 L 50 50 L 30 50 L 30 32 L 10 32 Z',
  },
  {
    id: 'u-shape',
    name: 'U-Shape',
    defaultWidth: 5,
    defaultHeight: 4,
    getWalls: (w, h) => [
      { x: 0, y: 0 },
      { x: w * 0.3, y: 0 },
      { x: w * 0.3, y: h * 0.5 },
      { x: w * 0.7, y: h * 0.5 },
      { x: w * 0.7, y: 0 },
      { x: w, y: 0 },
      { x: w, y: h },
      { x: 0, y: h },
    ],
    previewPath: 'M 10 10 L 22 10 L 22 30 L 38 30 L 38 10 L 50 10 L 50 50 L 10 50 Z',
  },
  {
    id: 't-shape',
    name: 'T-Shape',
    defaultWidth: 5,
    defaultHeight: 4,
    getWalls: (w, h) => [
      { x: 0, y: 0 },
      { x: w, y: 0 },
      { x: w, y: h * 0.4 },
      { x: w * 0.7, y: h * 0.4 },
      { x: w * 0.7, y: h },
      { x: w * 0.3, y: h },
      { x: w * 0.3, y: h * 0.4 },
      { x: 0, y: h * 0.4 },
    ],
    previewPath: 'M 10 10 L 50 10 L 50 26 L 38 26 L 38 50 L 22 50 L 22 26 L 10 26 Z',
  },
  {
    id: 'bay-window',
    name: 'Bay Window',
    defaultWidth: 4,
    defaultHeight: 3,
    getWalls: (w, h) => [
      { x: w * 0.3, y: -h * 0.15 },
      { x: w * 0.7, y: -h * 0.15 },
      { x: w, y: 0 },
      { x: w, y: h },
      { x: 0, y: h },
      { x: 0, y: 0 },
    ],
    previewPath: 'M 22 8 L 38 8 L 50 18 L 50 48 L 10 48 L 10 18 Z',
  },
  {
    id: 'alcove',
    name: 'Alcove',
    defaultWidth: 4,
    defaultHeight: 3,
    getWalls: (w, h) => [
      { x: 0, y: 0 },
      { x: w * 0.3, y: 0 },
      { x: w * 0.3, y: -h * 0.25 },
      { x: w * 0.7, y: -h * 0.25 },
      { x: w * 0.7, y: 0 },
      { x: w, y: 0 },
      { x: w, y: h },
      { x: 0, y: h },
    ],
    previewPath: 'M 10 20 L 22 20 L 22 8 L 38 8 L 38 20 L 50 20 L 50 48 L 10 48 Z',
  },
  {
    id: 'corridor',
    name: 'Corridor',
    defaultWidth: 6,
    defaultHeight: 1.2,
    getWalls: (w, h) => [
      { x: 0, y: 0 },
      { x: w, y: 0 },
      { x: w, y: h },
      { x: 0, y: h },
    ],
    previewPath: 'M 5 24 L 55 24 L 55 36 L 5 36 Z',
  },
];

interface RoomShapePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onShapePlaced: (walls: CanvasObject[]) => void;
}

export function RoomShapePicker({ open, onOpenChange, onShapePlaced }: RoomShapePickerProps) {
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const haptic = useHaptic();

  const selectedShape = roomShapes.find((s) => s.id === selectedShapeId);

  const handlePlaceShape = () => {
    if (!selectedShape) return;
    haptic.success();

    const points = selectedShape.getWalls(selectedShape.defaultWidth, selectedShape.defaultHeight);

    // Find bounding box to centre the shape on the canvas
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);
    const shapeWidthPx = (maxX - minX) * SCALE;
    const shapeHeightPx = (maxY - minY) * SCALE;

    // Centre on a 400x400 area (typical visible canvas)
    const canvasCentreX = (window.innerWidth / 2);
    const canvasCentreY = (window.innerHeight / 2);
    const offsetX = canvasCentreX - shapeWidthPx / 2 - minX * SCALE;
    const offsetY = canvasCentreY - shapeHeightPx / 2 - minY * SCALE;

    // Create wall objects for each pair of adjacent points (closing the shape)
    const walls: CanvasObject[] = [];
    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % points.length];

      const x1 = p1.x * SCALE + offsetX;
      const y1 = p1.y * SCALE + offsetY;
      const x2 = p2.x * SCALE + offsetX;
      const y2 = p2.y * SCALE + offsetY;

      // Snap to grid (20px)
      const gridSnap = (v: number) => Math.round(v / 20) * 20;

      walls.push({
        id: `wall-${Date.now()}-${i}`,
        type: 'wall',
        x: gridSnap(x1),
        y: gridSnap(y1),
        points: [
          { x: gridSnap(x1), y: gridSnap(y1) },
          { x: gridSnap(x2), y: gridSnap(y2) },
        ],
      });
    }

    onShapePlaced(walls);
    onOpenChange(false);
    setSelectedShapeId(null);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[75vh] p-0 rounded-t-2xl overflow-hidden bg-background border-t border-white/10"
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="px-4 pt-4 pb-3 border-b border-white/10">
            <SheetTitle className="text-white text-lg font-semibold">Room Shapes</SheetTitle>
          </SheetHeader>

          {/* Shape grid */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="grid grid-cols-3 gap-3">
              {roomShapes.map((shape) => {
                const isSelected = selectedShapeId === shape.id;
                return (
                  <button
                    key={shape.id}
                    onClick={() => {
                      haptic.light();
                      setSelectedShapeId(shape.id);
                    }}
                    className={cn(
                      'flex flex-col items-center justify-center rounded-xl p-3 transition-all touch-manipulation active:scale-95',
                      'bg-white/[0.04] border',
                      isSelected
                        ? 'border-elec-yellow bg-elec-yellow/10'
                        : 'border-white/10 hover:border-white/20'
                    )}
                  >
                    <svg
                      viewBox="0 0 60 60"
                      className="w-12 h-12 mb-2"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.5"
                    >
                      <path d={shape.previewPath} />
                    </svg>
                    <span className="text-white text-xs font-medium">{shape.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer with selection info and place button */}
          <div className="px-4 py-4 border-t border-white/10 bg-background">
            {selectedShape ? (
              <div className="space-y-3">
                <p className="text-white text-sm">
                  Default size: {selectedShape.defaultWidth}m x {selectedShape.defaultHeight}m
                </p>
                <Button
                  onClick={handlePlaceShape}
                  className="w-full h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold touch-manipulation"
                >
                  Place on Canvas
                </Button>
              </div>
            ) : (
              <p className="text-white text-sm text-center">
                Select a room shape above
              </p>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
