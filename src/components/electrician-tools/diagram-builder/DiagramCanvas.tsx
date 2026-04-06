import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Canvas as FabricCanvas, Rect, Line, FabricText, FabricObject, Group, Circle, Point, loadSVGFromString, util } from 'fabric';
import type { CanvasObject } from '@/pages/electrician-tools/ai-tools/DiagramBuilderPage';
import { symbolRegistry } from './symbols/symbolRegistry';
import { electricalSymbols } from './symbols/electricalSymbols';
import { loadSymbolSvg } from './symbols/svgLoader';
import { ZoomIn, ZoomOut, Maximize2, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Scale: 52px = 1 metre
const SCALE = 52;
const WALL_THICKNESS = 8;
const SNAP_DISTANCE = 10; // px for wall endpoint snapping
const AXIS_SNAP_DEGREES = 10; // snap to horizontal/vertical within this angle

interface DiagramCanvasProps {
  activeTool: string;
  selectedSymbolId: string | null;
  objects: CanvasObject[];
  onObjectsChange: (objects: CanvasObject[]) => void;
  gridEnabled: boolean;
  snapEnabled: boolean;
  headerHeight?: number;
  toolbarHeight?: number;
  onWallTapped?: (wallId: string, currentLength: number, screenPos: { x: number; y: number }) => void;
  onRotate?: () => void;
}

/** Convert pixel distance to metres string */
const pxToMetres = (px: number): string => {
  return (Math.abs(px) / SCALE).toFixed(2) + 'm';
};

export const DiagramCanvas = forwardRef<any, DiagramCanvasProps>(
  ({ activeTool, selectedSymbolId, objects, onObjectsChange, gridEnabled, snapEnabled, headerHeight = 48, toolbarHeight = 56, onWallTapped, onRotate }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricCanvasRef = useRef<FabricCanvas | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
    const undoStack = useRef<CanvasObject[][]>([]);
    const redoStack = useRef<CanvasObject[][]>([]);
    // Dimension tool needs two clicks — track first click
    const [dimensionStart, setDimensionStart] = useState<{ x: number; y: number } | null>(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    // Flag to prevent grid redraw from clearing AI-rendered content
    const aiRenderActiveRef = useRef(false);

    // Collect all wall endpoints from current objects for snapping
    const getWallEndpoints = (): { x: number; y: number }[] => {
      const endpoints: { x: number; y: number }[] = [];
      for (const obj of objects) {
        if (obj.type === 'wall' && obj.points && obj.points.length >= 2) {
          endpoints.push(obj.points[0]);
          endpoints.push(obj.points[obj.points.length - 1]);
        }
      }
      return endpoints;
    };

    // Find nearest wall endpoint within SNAP_DISTANCE
    const findSnapEndpoint = (x: number, y: number): { x: number; y: number } | null => {
      const endpoints = getWallEndpoints();
      let closest: { x: number; y: number } | null = null;
      let closestDist = SNAP_DISTANCE;
      for (const ep of endpoints) {
        const dist = Math.hypot(ep.x - x, ep.y - y);
        if (dist < closestDist) {
          closestDist = dist;
          closest = ep;
        }
      }
      return closest;
    };

    // Snap wall direction to horizontal/vertical if within threshold
    const snapWallDirection = (sx: number, sy: number, ex: number, ey: number): { x: number; y: number } => {
      const dx = ex - sx;
      const dy = ey - sy;
      const angle = Math.abs(Math.atan2(dy, dx) * (180 / Math.PI));
      // Near horizontal (0 or 180 degrees)
      if (angle < AXIS_SNAP_DEGREES || angle > (180 - AXIS_SNAP_DEGREES)) {
        return { x: ex, y: sy };
      }
      // Near vertical (90 degrees)
      if (Math.abs(angle - 90) < AXIS_SNAP_DEGREES) {
        return { x: sx, y: ey };
      }
      return { x: ex, y: ey };
    };

    // Zoom canvas to fit all non-grid objects with padding
    const zoomToFit = () => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      const objects = canvas.getObjects().filter((obj) => !(obj as any).isGridLine);
      if (objects.length === 0) return;

      // Calculate bounding box of all objects
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (const obj of objects) {
        const bound = obj.getBoundingRect();
        if (bound.left < minX) minX = bound.left;
        if (bound.top < minY) minY = bound.top;
        if (bound.left + bound.width > maxX) maxX = bound.left + bound.width;
        if (bound.top + bound.height > maxY) maxY = bound.top + bound.height;
      }

      const contentWidth = maxX - minX;
      const contentHeight = maxY - minY;
      const canvasWidth = canvas.width || 400;
      const canvasHeight = canvas.height || 600;
      const padding = 60;

      const zoomX = (canvasWidth - padding * 2) / contentWidth;
      const zoomY = (canvasHeight - padding * 2) / contentHeight;
      const zoom = Math.min(zoomX, zoomY, 2); // Don't zoom in more than 2x

      canvas.setZoom(zoom);
      const vpw = canvasWidth / zoom;
      const vph = canvasHeight / zoom;
      const centreX = minX + contentWidth / 2;
      const centreY = minY + contentHeight / 2;
      canvas.viewportTransform = [zoom, 0, 0, zoom, canvasWidth / 2 - centreX * zoom, canvasHeight / 2 - centreY * zoom];
      setZoomLevel(zoom);
      canvas.renderAll();
    };

    // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
      getCanvasElement: (): HTMLCanvasElement | null => {
        return canvasRef.current;
      },
      undo,
      redo,
      zoomToFit,
      handleRotate,
      deleteSelected: () => {
        const canvas = fabricCanvasRef.current;
        if (!canvas) return;
        const active = canvas.getActiveObject();
        if (active) {
          const customData = (active as any).customData;
          if (customData?.id) {
            saveState();
            // Remove wall labels too
            if (customData.type === 'wall') {
              const labels = canvas.getObjects().filter(o => (o as any).customData?.parentId === customData.id);
              labels.forEach(l => canvas.remove(l));
            }
            canvas.remove(active);
            renderedObjectIds.current.delete(customData.id);
            canvas.discardActiveObject();
            canvas.renderAll();
            onObjectsChange(objects.filter(o => o.id !== customData.id));
          }
        }
      },
      forceFullRedraw: () => {
        // Clear rendered IDs + clear all non-grid objects from canvas
        const canvas = fabricCanvasRef.current;
        if (!canvas) return;
        const nonGrid = canvas.getObjects().filter((obj) => !(obj as any).isGridLine);
        nonGrid.forEach((obj) => canvas.remove(obj));
        renderedObjectIds.current.clear();
        canvas.renderAll();
      },
      renderAIRoom: async (roomData: any) => {
        if (!fabricCanvasRef.current) return;

        aiRenderActiveRef.current = true;
        const canvas = fabricCanvasRef.current;
        const scale = SCALE;
        const offsetX = 100;
        const offsetY = 100;

        // Clear existing objects but redraw grid
        canvas.clear();
        canvas.backgroundColor = '#FFFFFF';

        // Redraw grid after clear
        if (gridEnabled) {
          const gridSize = 20;
          const gw = canvas.width || 1200;
          const gh = canvas.height || 600;
          for (let i = 0; i < gw / gridSize; i++) {
            const isMajor = i % 5 === 0;
            canvas.add(new Line([i * gridSize, 0, i * gridSize, gh], {
              stroke: isMajor ? '#999999' : '#CCCCCC', strokeWidth: isMajor ? 1 : 0.5, selectable: false, evented: false,
            }));
          }
          for (let i = 0; i < gh / gridSize; i++) {
            const isMajor = i % 5 === 0;
            canvas.add(new Line([0, i * gridSize, gw, i * gridSize], {
              stroke: isMajor ? '#999999' : '#CCCCCC', strokeWidth: isMajor ? 1 : 0.5, selectable: false, evented: false,
            }));
          }
        }

        // Draw walls as lines
        const walls = roomData.walls || [];
        let currentX = offsetX;
        let currentY = offsetY;

        walls.forEach((wall: any) => {
          const length = wall.length * scale;
          let endX = currentX;
          let endY = currentY;

          if (wall.id === 'north') endX = currentX + length;
          else if (wall.id === 'east') endY = currentY + length;
          else if (wall.id === 'south') endX = currentX - length;
          else if (wall.id === 'west') endY = currentY - length;

          const wallThickness = WALL_THICKNESS;
          const isVertical = Math.abs(endX - currentX) < Math.abs(endY - currentY);

          if (isVertical) {
            const wallRect = new Rect({
              left: currentX - wallThickness / 2,
              top: Math.min(currentY, endY),
              width: wallThickness,
              height: Math.abs(endY - currentY),
              fill: '#000000',
              stroke: '#000000',
              strokeWidth: 1,
              selectable: false,
            });
            canvas.add(wallRect);
          } else {
            const wallRect = new Rect({
              left: Math.min(currentX, endX),
              top: currentY - wallThickness / 2,
              width: Math.abs(endX - currentX),
              height: wallThickness,
              fill: '#000000',
              stroke: '#000000',
              strokeWidth: 1,
              selectable: false,
            });
            canvas.add(wallRect);
          }

          const midX = (currentX + endX) / 2;
          const midY = (currentY + endY) / 2;
          const label = new FabricText(`${wall.length}m`, {
            left: midX,
            top: midY - 20,
            fontSize: 12,
            fill: '#000000',
            fontFamily: 'Arial',
            fontWeight: '500',
            selectable: false,
          });
          canvas.add(label);

          currentX = endX;
          currentY = endY;
        });

        // Place electrical symbols (async)
        const SYMBOL_INSET = 4;
        const roomWidth = walls[0]?.length * scale || 200;
        const roomHeight = walls[1]?.length * scale || 200;

        const symbols = roomData.symbols || [];
        const symbolPromises = symbols.map(async (symbol: any) => {
          // ELE-604: Strip -bs7671 suffix from AI-generated symbol IDs
          const symbolId = symbol.type.replace(/-bs7671$/, '');

          // Try symbolRegistry first, then fall back to legacy electricalSymbols
          const registrySymbol = symbolRegistry.find((s) => s.id === symbolId);
          const legacySymbol = electricalSymbols.find((s) => s.id === symbolId);

          if (!registrySymbol && !legacySymbol) {
            console.warn(`Symbol not found: ${symbol.type} (resolved: ${symbolId})`);
            return;
          }

          let symbolX = offsetX + 20;
          let symbolY = offsetY + 20;

          // ELE-589: Calculate symbol position INSIDE the room
          if (symbol.position === 'center') {
            symbolX = offsetX + roomWidth / 2;
            symbolY = offsetY + roomHeight / 2;
          } else if (symbol.wall) {
            const positionOnWall = (symbol.position || 0) * scale;

            if (symbol.wall === 'north') {
              symbolX = offsetX + positionOnWall;
              symbolY = offsetY + WALL_THICKNESS + SYMBOL_INSET;
            } else if (symbol.wall === 'south') {
              symbolX = offsetX + positionOnWall;
              symbolY = offsetY + roomHeight - WALL_THICKNESS - SYMBOL_INSET - 20;
            } else if (symbol.wall === 'east') {
              symbolX = offsetX + roomWidth - WALL_THICKNESS - SYMBOL_INSET - 20;
              symbolY = offsetY + positionOnWall;
            } else if (symbol.wall === 'west') {
              symbolX = offsetX + WALL_THICKNESS + SYMBOL_INSET;
              symbolY = offsetY + positionOnWall;
            }
          }

          // Load SVG via the new loader
          try {
            const svgString = await loadSymbolSvg(symbolId);
            const { objects: svgObjects } = await loadSVGFromString(svgString);
            const validObjects = svgObjects.filter((o): o is FabricObject => o !== null);
            if (validObjects.length > 0) {
              const group = util.groupSVGElements(validObjects, {
                left: symbolX,
                top: symbolY,
                scaleX: 1.5,
                scaleY: 1.5,
                selectable: true,
                originX: 'center',
                originY: 'center',
              });
              group.set({ fill: '#000000', stroke: '#000000' });
              canvas.add(group);
            }
          } catch (err) {
            console.warn('Failed to load SVG for AI symbol:', symbolId, err);
          }
        });

        await Promise.all(symbolPromises);

        // Add room title
        if (roomData.room?.name) {
          const title = new FabricText(roomData.room.name, {
            left: offsetX,
            top: offsetY - 50,
            fontSize: 18,
            fill: '#000000',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            selectable: false,
          });
          canvas.add(title);
        }

        // Scale bar in bottom-left
        const scaleBarMetres = 1;
        const scaleBarPx = scaleBarMetres * scale;
        const scaleBarX = 20;
        const scaleBarY = (canvas.height || 600) - 30;

        const scaleBarLine = new Line([scaleBarX, scaleBarY, scaleBarX + scaleBarPx, scaleBarY], {
          stroke: '#000000', strokeWidth: 2, selectable: false, evented: false,
        });
        canvas.add(scaleBarLine);

        const tickLeft = new Line([scaleBarX, scaleBarY - 5, scaleBarX, scaleBarY + 5], {
          stroke: '#000000', strokeWidth: 2, selectable: false, evented: false,
        });
        canvas.add(tickLeft);

        const tickRight = new Line([scaleBarX + scaleBarPx, scaleBarY - 5, scaleBarX + scaleBarPx, scaleBarY + 5], {
          stroke: '#000000', strokeWidth: 2, selectable: false, evented: false,
        });
        canvas.add(tickRight);

        const scaleLabel = new FabricText(`${scaleBarMetres}m`, {
          left: scaleBarX + scaleBarPx / 2,
          top: scaleBarY - 18,
          fontSize: 11,
          fill: '#000000',
          fontFamily: 'Arial',
          fontWeight: '500',
          selectable: false,
          originX: 'center',
        });
        canvas.add(scaleLabel);

        canvas.renderAll();

        // Auto-zoom to fit the generated room on screen
        setTimeout(() => zoomToFit(), 100);
      },
    }));

    // Initialize Fabric.js canvas
    useEffect(() => {
      if (!canvasRef.current) return;

      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight - headerHeight - toolbarHeight;

      const canvas = new FabricCanvas(canvasRef.current, {
        width: canvasWidth,
        height: canvasHeight,
        backgroundColor: '#FFFFFF',
        selection: activeTool === 'select',
        allowTouchScrolling: false,
      });

      fabricCanvasRef.current = canvas;
      console.log('[DiagramCanvas] Canvas created:', canvasWidth, 'x', canvasHeight, 'grid:', gridEnabled);

      // Draw initial grid immediately
      if (gridEnabled) {
        const gridSize = 20;
        for (let i = 0; i <= canvasWidth / gridSize; i++) {
          const isMajor = i % 5 === 0;
          canvas.add(new Line([i * gridSize, 0, i * gridSize, canvasHeight], {
            stroke: isMajor ? '#999999' : '#CCCCCC', strokeWidth: isMajor ? 1 : 0.5, selectable: false, evented: false,
          }));
        }
        for (let i = 0; i <= canvasHeight / gridSize; i++) {
          const isMajor = i % 5 === 0;
          canvas.add(new Line([0, i * gridSize, canvasWidth, i * gridSize], {
            stroke: isMajor ? '#999999' : '#CCCCCC', strokeWidth: isMajor ? 1 : 0.5, selectable: false, evented: false,
          }));
        }
        canvas.renderAll();
        console.log('[DiagramCanvas] Grid drawn:', canvas.getObjects().length, 'lines');
      }

      // Pinch-to-zoom handler
      let lastPinchDistance = 0;
      const handleTouchGesture = (e: any) => {
        if (e.e?.touches?.length === 2) {
          const touch1 = e.e.touches[0];
          const touch2 = e.e.touches[1];
          const distance = Math.hypot(
            touch1.clientX - touch2.clientX,
            touch1.clientY - touch2.clientY
          );

          if (lastPinchDistance > 0) {
            const zoomFactor = distance / lastPinchDistance;
            const currentZoom = canvas.getZoom();
            const newZoom = Math.min(Math.max(currentZoom * zoomFactor, 0.1), 5);

            const midX = (touch1.clientX + touch2.clientX) / 2;
            const midY = (touch1.clientY + touch2.clientY) / 2;
            const canvasRect = canvasRef.current?.getBoundingClientRect();
            if (canvasRect) {
              const pointX = midX - canvasRect.left;
              const pointY = midY - canvasRect.top;
              canvas.zoomToPoint(new Point(pointX, pointY), newZoom);
              setZoomLevel(newZoom);
            }
          }
          lastPinchDistance = distance;
          e.e.preventDefault();
        }
      };

      const handleTouchEnd = () => {
        lastPinchDistance = 0;
      };

      canvas.on('mouse:move', handleTouchGesture);
      canvas.upperCanvasEl?.addEventListener('touchend', handleTouchEnd, { passive: true });

      // Handle window resize — fill available space
      const handleResize = () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight - headerHeight - toolbarHeight;
        canvas.setDimensions({ width: newWidth, height: newHeight });
        canvas.renderAll();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        canvas.off('mouse:move', handleTouchGesture);
        canvas.upperCanvasEl?.removeEventListener('touchend', handleTouchEnd);
        canvas.dispose();
      };
    }, []);

    // Track which object IDs are already on the Fabric canvas
    const renderedObjectIds = useRef<Set<string>>(new Set());

    // Draw grid only when gridEnabled changes
    useEffect(() => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      // Remove existing grid lines
      const gridObjects = canvas.getObjects().filter((obj) => (obj as any).isGridLine);
      gridObjects.forEach((obj) => canvas.remove(obj));

      if (gridEnabled) {
        const gridSize = 20;
        const width = canvas.width || 1200;
        const height = canvas.height || 600;

        for (let i = 0; i <= width / gridSize; i++) {
          const isMajor = i % 5 === 0;
          const line = new Line([i * gridSize, 0, i * gridSize, height], {
            stroke: isMajor ? '#999999' : '#CCCCCC',
            strokeWidth: isMajor ? 1 : 0.5,
            selectable: false,
            evented: false,
          });
          (line as any).isGridLine = true;
          canvas.add(line);
          canvas.sendObjectToBack(line);
        }

        for (let i = 0; i <= height / gridSize; i++) {
          const isMajor = i % 5 === 0;
          const line = new Line([0, i * gridSize, width, i * gridSize], {
            stroke: isMajor ? '#999999' : '#CCCCCC',
            strokeWidth: isMajor ? 1 : 0.5,
            selectable: false,
            evented: false,
          });
          (line as any).isGridLine = true;
          canvas.add(line);
          canvas.sendObjectToBack(line);
        }
      }

      canvas.renderAll();
    }, [gridEnabled]);

    // Sync new objects from React state to Fabric canvas (add only, no clear/rebuild)
    useEffect(() => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      // Skip if AI render is active
      if (aiRenderActiveRef.current) {
        aiRenderActiveRef.current = false;
        return;
      }

      // Find objects in state that aren't on the canvas yet
      const newObjects = objects.filter((obj) => !renderedObjectIds.current.has(obj.id));

      // Find objects removed from state that are still on canvas
      const stateIds = new Set(objects.map((o) => o.id));
      const toRemove = canvas.getObjects().filter((fObj) => {
        const customData = (fObj as any).customData;
        if (!customData?.id) return false;
        // Don't remove wall labels — they're tied to their parent wall
        if (customData.type === 'wall-label') {
          return !stateIds.has(customData.parentId);
        }
        return !stateIds.has(customData.id);
      });

      // Remove deleted objects from canvas
      toRemove.forEach((fObj) => {
        const id = (fObj as any).customData?.id;
        if (id) renderedObjectIds.current.delete(id);
        canvas.remove(fObj);
      });

      // Add new objects
      const addNewObjects = async () => {
        for (const obj of newObjects) {
          await addObjectToCanvas(obj);
          renderedObjectIds.current.add(obj.id);
        }
        if (newObjects.length > 0 || toRemove.length > 0) {
          canvas.renderAll();
        }
      };
      addNewObjects();
    }, [objects]);

    // Snap to grid helper
    const snapToGrid = (value: number) => {
      if (!snapEnabled) return value;
      const gridSize = 20;
      return Math.round(value / gridSize) * gridSize;
    };

    // Create a dimension line group from two points
    const createDimensionGroup = (x1: number, y1: number, x2: number, y2: number): Group => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.hypot(dx, dy);
      const label = pxToMetres(dist);
      const isHorizontal = Math.abs(dx) >= Math.abs(dy);
      const tickLen = 8;
      const arrowSize = 5;

      const elements: FabricObject[] = [];

      // Main line
      const mainLine = new Line([x1, y1, x2, y2], {
        stroke: '#333333',
        strokeWidth: 1,
        selectable: false,
      });
      elements.push(mainLine as unknown as FabricObject);

      // Tick marks (perpendicular end lines)
      if (isHorizontal) {
        elements.push(new Line([x1, y1 - tickLen, x1, y1 + tickLen], {
          stroke: '#333333', strokeWidth: 1, selectable: false,
        }) as unknown as FabricObject);
        elements.push(new Line([x2, y2 - tickLen, x2, y2 + tickLen], {
          stroke: '#333333', strokeWidth: 1, selectable: false,
        }) as unknown as FabricObject);
      } else {
        elements.push(new Line([x1 - tickLen, y1, x1 + tickLen, y1], {
          stroke: '#333333', strokeWidth: 1, selectable: false,
        }) as unknown as FabricObject);
        elements.push(new Line([x2 - tickLen, y2, x2 + tickLen, y2], {
          stroke: '#333333', strokeWidth: 1, selectable: false,
        }) as unknown as FabricObject);
      }

      // Arrowheads
      const angle = Math.atan2(dy, dx);
      const addArrow = (tipX: number, tipY: number, pointAngle: number) => {
        const a1x = tipX - arrowSize * Math.cos(pointAngle - Math.PI / 6);
        const a1y = tipY - arrowSize * Math.sin(pointAngle - Math.PI / 6);
        const a2x = tipX - arrowSize * Math.cos(pointAngle + Math.PI / 6);
        const a2y = tipY - arrowSize * Math.sin(pointAngle + Math.PI / 6);
        elements.push(new Line([tipX, tipY, a1x, a1y], {
          stroke: '#333333', strokeWidth: 1, selectable: false,
        }) as unknown as FabricObject);
        elements.push(new Line([tipX, tipY, a2x, a2y], {
          stroke: '#333333', strokeWidth: 1, selectable: false,
        }) as unknown as FabricObject);
      };

      addArrow(x1, y1, angle + Math.PI); // arrow pointing away from start towards start
      addArrow(x2, y2, angle); // arrow pointing away from end towards end

      // Wait — arrows should point outward from the line ends.
      // Actually for dimension lines: arrows point INWARD. Let me fix:
      // Arrow at start points toward end (angle), arrow at end points toward start (angle + PI)
      // Let me redo:
      elements.length = 0; // clear and redo

      // Main line
      elements.push(new Line([x1, y1, x2, y2], {
        stroke: '#333333', strokeWidth: 1, selectable: false,
      }) as unknown as FabricObject);

      // Tick marks
      if (isHorizontal) {
        elements.push(new Line([x1, y1 - tickLen, x1, y1 + tickLen], {
          stroke: '#333333', strokeWidth: 1, selectable: false,
        }) as unknown as FabricObject);
        elements.push(new Line([x2, y2 - tickLen, x2, y2 + tickLen], {
          stroke: '#333333', strokeWidth: 1, selectable: false,
        }) as unknown as FabricObject);
      } else {
        elements.push(new Line([x1 - tickLen, y1, x1 + tickLen, y1], {
          stroke: '#333333', strokeWidth: 1, selectable: false,
        }) as unknown as FabricObject);
        elements.push(new Line([x2 - tickLen, y2, x2 + tickLen, y2], {
          stroke: '#333333', strokeWidth: 1, selectable: false,
        }) as unknown as FabricObject);
      }

      // Arrowhead at start (pointing toward end)
      const a1x1 = x1 + arrowSize * Math.cos(angle - Math.PI / 6);
      const a1y1 = y1 + arrowSize * Math.sin(angle - Math.PI / 6);
      const a1x2 = x1 + arrowSize * Math.cos(angle + Math.PI / 6);
      const a1y2 = y1 + arrowSize * Math.sin(angle + Math.PI / 6);
      elements.push(new Line([x1, y1, a1x1, a1y1], {
        stroke: '#333333', strokeWidth: 1, selectable: false,
      }) as unknown as FabricObject);
      elements.push(new Line([x1, y1, a1x2, a1y2], {
        stroke: '#333333', strokeWidth: 1, selectable: false,
      }) as unknown as FabricObject);

      // Arrowhead at end (pointing toward start)
      const reverseAngle = angle + Math.PI;
      const a2x1 = x2 + arrowSize * Math.cos(reverseAngle - Math.PI / 6);
      const a2y1 = y2 + arrowSize * Math.sin(reverseAngle - Math.PI / 6);
      const a2x2 = x2 + arrowSize * Math.cos(reverseAngle + Math.PI / 6);
      const a2y2 = y2 + arrowSize * Math.sin(reverseAngle + Math.PI / 6);
      elements.push(new Line([x2, y2, a2x1, a2y1], {
        stroke: '#333333', strokeWidth: 1, selectable: false,
      }) as unknown as FabricObject);
      elements.push(new Line([x2, y2, a2x2, a2y2], {
        stroke: '#333333', strokeWidth: 1, selectable: false,
      }) as unknown as FabricObject);

      // Label background + text
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const labelOffsetY = isHorizontal ? -14 : 0;
      const labelOffsetX = isHorizontal ? 0 : 14;

      const labelBg = new Rect({
        left: midX + labelOffsetX - 20,
        top: midY + labelOffsetY - 7,
        width: 40,
        height: 14,
        fill: '#FFFFFF',
        stroke: 'transparent',
        strokeWidth: 0,
        selectable: false,
      });
      elements.push(labelBg as unknown as FabricObject);

      const labelText = new FabricText(label, {
        left: midX + labelOffsetX,
        top: midY + labelOffsetY - 6,
        fontSize: 10,
        fill: '#000000',
        fontFamily: 'Arial',
        fontWeight: '500',
        originX: 'center',
        selectable: false,
      });
      elements.push(labelText as unknown as FabricObject);

      const group = new Group(elements, {
        selectable: true,
        hasControls: true,
        hasBorders: true,
      });

      return group;
    };

    // Add object to canvas (async for SVG symbol loading)
    const addObjectToCanvas = async (obj: CanvasObject) => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      let fabricObj: FabricObject | null = null;

      if (obj.type === 'symbol' && obj.symbolId) {
        try {
          const svgString = await loadSymbolSvg(obj.symbolId);
          console.log('[Symbol] Loading:', obj.symbolId, 'SVG length:', svgString.length, 'starts:', svgString.substring(0, 60));
          const result = await loadSVGFromString(svgString);
          const svgObjects = result.objects;
          console.log('[Symbol] Parsed objects:', svgObjects?.length, 'from', obj.symbolId);
          const validObjects = (svgObjects || []).filter((o): o is FabricObject => o !== null);
          if (validObjects.length > 0) {
            fabricObj = util.groupSVGElements(validObjects, {
              left: obj.x,
              top: obj.y,
              scaleX: (obj.width || 40) / 40,
              scaleY: (obj.height || 40) / 40,
              angle: obj.rotation || 0,
              selectable: true,
              hasControls: false,
              lockScalingX: true,
              lockScalingY: true,
              originX: 'center',
              originY: 'center',
            });
            // SVG elements already have correct fill/stroke from resolveCurrentColor
            (fabricObj as any).customData = { id: obj.id, type: 'symbol', symbolId: obj.symbolId };
          }
        } catch (err) {
          console.error('[Symbol] FAILED to load SVG for:', obj.symbolId, err);
        }
      } else if (obj.type === 'rectangle') {
        fabricObj = new Rect({
          left: obj.x,
          top: obj.y,
          width: obj.width || 100,
          height: obj.height || 100,
          fill: 'transparent',
          stroke: '#000000',
          strokeWidth: 2,
          angle: obj.rotation || 0,
          selectable: true,
          hasControls: true,
        });
        (fabricObj as any).customData = { id: obj.id, type: 'rectangle' };
      } else if (obj.type === 'line' && obj.points && obj.points.length >= 2) {
        const points = obj.points;
        fabricObj = new Line(
          [points[0].x, points[0].y, points[points.length - 1].x, points[points.length - 1].y],
          {
            stroke: '#000000',
            strokeWidth: 2,
            selectable: true,
            hasControls: true,
          }
        );
        (fabricObj as any).customData = { id: obj.id, type: 'line' };
      } else if (obj.type === 'text') {
        fabricObj = new FabricText(obj.text || 'Text', {
          left: obj.x,
          top: obj.y,
          fill: '#000000',
          fontSize: 16,
          fontFamily: 'Arial',
          angle: obj.rotation || 0,
          selectable: true,
          hasControls: true,
        });
        (fabricObj as any).customData = { id: obj.id, type: 'text' };
      } else if (obj.type === 'wall' && obj.points && obj.points.length >= 2) {
        const p1 = obj.points[0];
        const p2 = obj.points[1];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const isVertical = Math.abs(dy) > Math.abs(dx);
        const dist = Math.hypot(dx, dy);

        // Wall as a filled rect
        if (isVertical) {
          const wallRect = new Rect({
            left: p1.x - WALL_THICKNESS / 2,
            top: Math.min(p1.y, p2.y),
            width: WALL_THICKNESS,
            height: Math.abs(dy),
            fill: '#000000',
            stroke: '#000000',
            strokeWidth: 1,
            selectable: false,
            hasControls: false,
            evented: true,
          });
          (wallRect as any).customData = { id: obj.id, type: 'wall' };
          canvas.add(wallRect);
        } else {
          const wallRect = new Rect({
            left: Math.min(p1.x, p2.x),
            top: p1.y - WALL_THICKNESS / 2,
            width: Math.abs(dx),
            height: WALL_THICKNESS,
            fill: '#000000',
            stroke: '#000000',
            strokeWidth: 1,
            selectable: false,
            hasControls: false,
            evented: true,
          });
          (wallRect as any).customData = { id: obj.id, type: 'wall' };
          canvas.add(wallRect);
        }

        // Auto dimension label
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        const labelText = pxToMetres(dist);
        const label = new FabricText(labelText, {
          left: isVertical ? midX + WALL_THICKNESS / 2 + 6 : midX,
          top: isVertical ? midY : midY - WALL_THICKNESS / 2 - 16,
          fontSize: 10,
          fill: '#000000',
          fontFamily: 'Arial',
          fontWeight: '500',
          selectable: false,
          evented: false,
          originX: isVertical ? 'left' : 'center',
        });
        (label as any).customData = { id: obj.id + '-label', type: 'wall-label', parentId: obj.id };
        canvas.add(label);

        return; // Already added manually
      } else if (obj.type === 'dimension' && obj.points && obj.points.length >= 2) {
        const p1 = obj.points[0];
        const p2 = obj.points[1];
        const group = createDimensionGroup(p1.x, p1.y, p2.x, p2.y);
        (group as any).customData = { id: obj.id, type: 'dimension' };
        canvas.add(group);
        return; // Already added manually
      }

      if (fabricObj) {
        canvas.add(fabricObj);
      }
    };

    // Save state for undo
    const saveState = () => {
      undoStack.current.push([...objects]);
      if (undoStack.current.length > 50) {
        undoStack.current.shift();
      }
      redoStack.current = [];
    };

    const undo = () => {
      if (undoStack.current.length === 0) return;
      const prevState = undoStack.current.pop();
      if (prevState) {
        redoStack.current.push([...objects]);
        onObjectsChange(prevState);
      }
    };

    const redo = () => {
      if (redoStack.current.length === 0) return;
      const nextState = redoStack.current.pop();
      if (nextState) {
        undoStack.current.push([...objects]);
        onObjectsChange(nextState);
      }
    };

    // Keyboard shortcuts
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        const canvas = fabricCanvasRef.current;
        if (!canvas) return;

        if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
          e.preventDefault();
          undo();
        }
        if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
          e.preventDefault();
          redo();
        }
        if (e.key === 'Delete' || e.key === 'Backspace') {
          const activeObjects = canvas.getActiveObjects();
          if (activeObjects.length > 0) {
            saveState();
            activeObjects.forEach((obj) => canvas.remove(obj));
            const updatedObjects = objects.filter(
              (o) => !activeObjects.some((ao) => (ao as any).customData?.id === o.id)
            );
            onObjectsChange(updatedObjects);
            canvas.discardActiveObject();
            canvas.renderAll();
          }
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
          const activeObject = canvas.getActiveObject();
          if (activeObject) {
            (window as any).clipboard = activeObject;
          }
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
          const clipboardObj = (window as any).clipboard;
          if (clipboardObj) {
            clipboardObj.clone((cloned: FabricObject) => {
              cloned.set({
                left: (cloned.left || 0) + 20,
                top: (cloned.top || 0) + 20,
              });
              canvas.add(cloned);
              canvas.setActiveObject(cloned);
              canvas.renderAll();

              saveState();
              const newObj: CanvasObject = {
                id: `obj-${Date.now()}`,
                type: (cloned as any).customData?.type || 'rectangle',
                x: cloned.left || 0,
                y: cloned.top || 0,
                width: (cloned as any).width || 100,
                height: (cloned as any).height || 100,
                rotation: cloned.angle || 0,
              };
              onObjectsChange([...objects, newObj]);
            });
          }
        }
        // Escape clears dimension tool first-click
        if (e.key === 'Escape') {
          setDimensionStart(null);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [objects]);

    // Clear dimension start when tool changes away from dimension
    useEffect(() => {
      if (activeTool !== 'dimension') {
        setDimensionStart(null);
      }
    }, [activeTool]);

    // Handle mouse events for drawing
    useEffect(() => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      canvas.selection = activeTool === 'select';

      const handleMouseDown = (e: any) => {
        if (activeTool === 'select') {
          // Check if user tapped a wall object — emit onWallTapped
          if (onWallTapped && e.target) {
            const tapped = e.target as any;
            const customData = tapped.customData;
            if (customData?.type === 'wall') {
              const wallObj = objects.find((o) => o.id === customData.id);
              if (wallObj?.points && wallObj.points.length >= 2) {
                const p1 = wallObj.points[0];
                const p2 = wallObj.points[1];
                const lengthPx = Math.hypot(p2.x - p1.x, p2.y - p1.y);
                const lengthMetres = lengthPx / SCALE;

                // Get screen position from the raw event
                const rawEvent = e.e as MouseEvent | TouchEvent;
                let screenX = 0;
                let screenY = 0;
                if ('touches' in rawEvent && rawEvent.touches.length > 0) {
                  screenX = rawEvent.touches[0].clientX;
                  screenY = rawEvent.touches[0].clientY;
                } else if ('clientX' in rawEvent) {
                  screenX = (rawEvent as MouseEvent).clientX;
                  screenY = (rawEvent as MouseEvent).clientY;
                }

                onWallTapped(customData.id, lengthMetres, { x: screenX, y: screenY });
              }
            }
          }
          return;
        }

        // Eraser tool — tap to delete objects
        if (activeTool === 'eraser' && e.target) {
          const tapped = e.target as any;
          const customData = tapped.customData;
          if (customData?.id) {
            saveState();
            // Also remove wall label if this is a wall
            if (customData.type === 'wall') {
              const labels = canvas.getObjects().filter(
                (o) => (o as any).customData?.parentId === customData.id
              );
              labels.forEach((l) => canvas.remove(l));
            }
            canvas.remove(e.target);
            renderedObjectIds.current.delete(customData.id);
            canvas.renderAll();
            onObjectsChange(objects.filter((o) => o.id !== customData.id));
          }
          return;
        }

        // Always allow tapping existing objects to select them (except in eraser mode)
        if (activeTool !== 'eraser' && activeTool !== 'select' && e.target && (e.target as any).customData) {
          canvas.setActiveObject(e.target);
          canvas.renderAll();
          return;
        }

        const pointer = canvas.getPointer(e.e);
        let x = snapToGrid(pointer.x);
        let y = snapToGrid(pointer.y);

        // Dimension tool uses click-click, not drag
        if (activeTool === 'dimension') {
          if (!dimensionStart) {
            // First click — set start
            setDimensionStart({ x, y });

            // Show a small dot at the start point
            const dot = new Circle({
              left: x,
              top: y,
              radius: 3,
              fill: '#333333',
              originX: 'center',
              originY: 'center',
              selectable: false,
              evented: false,
            });
            (dot as any).isTemp = true;
            (dot as any).isDimensionDot = true;
            canvas.add(dot);
            canvas.renderAll();
          } else {
            // Second click — create dimension
            saveState();

            // Remove temp dot
            const tempDots = canvas.getObjects().filter((obj) => (obj as any).isDimensionDot);
            tempDots.forEach((obj) => canvas.remove(obj));

            const newObj: CanvasObject = {
              id: `obj-${Date.now()}`,
              type: 'dimension',
              x: dimensionStart.x,
              y: dimensionStart.y,
              points: [{ x: dimensionStart.x, y: dimensionStart.y }, { x, y }],
            };
            onObjectsChange([...objects, newObj]);
            setDimensionStart(null); // Reset for next measurement (stays in dimension tool)
          }
          return;
        }

        // Wall tool: snap to existing wall endpoints
        if (activeTool === 'wall') {
          const snapPoint = findSnapEndpoint(x, y);
          if (snapPoint) {
            x = snapPoint.x;
            y = snapPoint.y;
          }
        }

        setIsDrawing(true);
        setStartPoint({ x, y });

        if (activeTool === 'symbol' && selectedSymbolId) {
          saveState();
          const found = symbolRegistry.find((s) => s.id === selectedSymbolId) ||
                        electricalSymbols.find((s) => s.id === selectedSymbolId);
          if (found) {
            const newObj: CanvasObject = {
              id: `obj-${Date.now()}`,
              type: 'symbol',
              x,
              y,
              width: 40,
              height: 40,
              rotation: 0,
              symbolId: selectedSymbolId,
            };
            onObjectsChange([...objects, newObj]);
          }
          setIsDrawing(false);
        } else if (activeTool === 'text') {
          saveState();
          const newObj: CanvasObject = {
            id: `obj-${Date.now()}`,
            type: 'text',
            x,
            y,
            text: 'Label',
          };
          onObjectsChange([...objects, newObj]);
          setIsDrawing(false);
        }
      };

      const handleMouseMove = (e: any) => {
        const pointer = canvas.getPointer(e.e);
        let x = snapToGrid(pointer.x);
        let y = snapToGrid(pointer.y);

        // Dimension tool preview line from first click to cursor
        if (activeTool === 'dimension' && dimensionStart) {
          const tempPreviews = canvas.getObjects().filter((obj) => (obj as any).isDimensionPreview);
          tempPreviews.forEach((obj) => canvas.remove(obj));

          const previewLine = new Line([dimensionStart.x, dimensionStart.y, x, y], {
            stroke: '#666666',
            strokeWidth: 1,
            strokeDashArray: [4, 4],
            selectable: false,
            evented: false,
          });
          (previewLine as any).isTemp = true;
          (previewLine as any).isDimensionPreview = true;
          canvas.add(previewLine);

          // Live dimension label
          const dist = Math.hypot(x - dimensionStart.x, y - dimensionStart.y);
          const midX = (dimensionStart.x + x) / 2;
          const midY = (dimensionStart.y + y) / 2;
          const liveLabel = new FabricText(pxToMetres(dist), {
            left: midX,
            top: midY - 16,
            fontSize: 10,
            fill: '#333333',
            fontFamily: 'Arial',
            fontWeight: '500',
            originX: 'center',
            selectable: false,
            evented: false,
          });
          (liveLabel as any).isTemp = true;
          (liveLabel as any).isDimensionPreview = true;
          canvas.add(liveLabel);

          canvas.renderAll();
          return;
        }

        if (!isDrawing || !startPoint || activeTool === 'symbol' || activeTool === 'text') return;

        const tempObjects = canvas.getObjects().filter((obj) => (obj as any).isTemp);
        tempObjects.forEach((obj) => canvas.remove(obj));

        if (activeTool === 'line') {
          const line = new Line([startPoint.x, startPoint.y, x, y], {
            stroke: '#000000', strokeWidth: 2, selectable: false,
          });
          (line as any).isTemp = true;
          canvas.add(line);
        } else if (activeTool === 'rectangle') {
          const w = Math.abs(x - startPoint.x);
          const h = Math.abs(y - startPoint.y);
          const rect = new Rect({
            left: Math.min(startPoint.x, x),
            top: Math.min(startPoint.y, y),
            width: w,
            height: h,
            fill: 'transparent',
            stroke: '#000000',
            strokeWidth: 2,
            selectable: false,
          });
          (rect as any).isTemp = true;
          canvas.add(rect);

          // Live dimensions label for rectangle
          const dimLabel = new FabricText(`${pxToMetres(w)} \u00d7 ${pxToMetres(h)}`, {
            left: x + 8,
            top: y + 8,
            fontSize: 10,
            fill: '#333333',
            fontFamily: 'Arial',
            fontWeight: '500',
            backgroundColor: 'rgba(255,255,255,0.8)',
            selectable: false,
            evented: false,
          });
          (dimLabel as any).isTemp = true;
          canvas.add(dimLabel);
        } else if (activeTool === 'wall') {
          // Snap direction to axis
          const snapped = snapWallDirection(startPoint.x, startPoint.y, x, y);
          let endX = snapped.x;
          let endY = snapped.y;

          // Snap endpoint to existing walls
          const snapEnd = findSnapEndpoint(endX, endY);
          if (snapEnd) {
            endX = snapEnd.x;
            endY = snapEnd.y;
          }

          // Preview wall (semi-transparent thick line)
          const previewLine = new Line([startPoint.x, startPoint.y, endX, endY], {
            stroke: 'rgba(0,0,0,0.4)',
            strokeWidth: WALL_THICKNESS,
            selectable: false,
            evented: false,
          });
          (previewLine as any).isTemp = true;
          canvas.add(previewLine);

          // Live dimension label
          const dist = Math.hypot(endX - startPoint.x, endY - startPoint.y);
          const isVertical = Math.abs(endY - startPoint.y) > Math.abs(endX - startPoint.x);
          const midX = (startPoint.x + endX) / 2;
          const midY = (startPoint.y + endY) / 2;
          const liveLabel = new FabricText(pxToMetres(dist), {
            left: isVertical ? midX + WALL_THICKNESS / 2 + 6 : midX,
            top: isVertical ? midY : midY - WALL_THICKNESS / 2 - 16,
            fontSize: 10,
            fill: '#333333',
            fontFamily: 'Arial',
            fontWeight: '500',
            originX: isVertical ? 'left' : 'center',
            backgroundColor: 'rgba(255,255,255,0.8)',
            selectable: false,
            evented: false,
          });
          (liveLabel as any).isTemp = true;
          canvas.add(liveLabel);

          // Snap indicator (yellow circle at snap point)
          if (snapEnd) {
            const snapIndicator = new Circle({
              left: snapEnd.x,
              top: snapEnd.y,
              radius: 5,
              fill: 'rgba(250,204,21,0.7)',
              stroke: '#EAB308',
              strokeWidth: 1,
              originX: 'center',
              originY: 'center',
              selectable: false,
              evented: false,
            });
            (snapIndicator as any).isTemp = true;
            canvas.add(snapIndicator);
          }

          // Also show snap indicator at start if it snapped
          const snapStart = findSnapEndpoint(startPoint.x, startPoint.y);
          if (snapStart && (snapStart.x === startPoint.x && snapStart.y === startPoint.y)) {
            const snapIndicator = new Circle({
              left: snapStart.x,
              top: snapStart.y,
              radius: 5,
              fill: 'rgba(250,204,21,0.7)',
              stroke: '#EAB308',
              strokeWidth: 1,
              originX: 'center',
              originY: 'center',
              selectable: false,
              evented: false,
            });
            (snapIndicator as any).isTemp = true;
            canvas.add(snapIndicator);
          }
        }

        canvas.renderAll();
      };

      const handleMouseUp = (e: any) => {
        if (!isDrawing || !startPoint) return;
        if (activeTool === 'symbol' || activeTool === 'text' || activeTool === 'dimension') return;

        const pointer = canvas.getPointer(e.e);
        let x = snapToGrid(pointer.x);
        let y = snapToGrid(pointer.y);

        saveState();

        const tempObjects = canvas.getObjects().filter((obj) => (obj as any).isTemp);
        tempObjects.forEach((obj) => canvas.remove(obj));

        if (activeTool === 'line') {
          const newObj: CanvasObject = {
            id: `obj-${Date.now()}`,
            type: 'line',
            x: startPoint.x,
            y: startPoint.y,
            points: [{ x: startPoint.x, y: startPoint.y }, { x, y }],
          };
          onObjectsChange([...objects, newObj]);
        } else if (activeTool === 'rectangle') {
          const newObj: CanvasObject = {
            id: `obj-${Date.now()}`,
            type: 'rectangle',
            x: Math.min(startPoint.x, x),
            y: Math.min(startPoint.y, y),
            width: Math.abs(x - startPoint.x),
            height: Math.abs(y - startPoint.y),
            rotation: 0,
          };
          onObjectsChange([...objects, newObj]);
        } else if (activeTool === 'wall') {
          // Snap direction
          const snapped = snapWallDirection(startPoint.x, startPoint.y, x, y);
          let endX = snapped.x;
          let endY = snapped.y;

          // Snap endpoint to existing walls
          const snapEnd = findSnapEndpoint(endX, endY);
          if (snapEnd) {
            endX = snapEnd.x;
            endY = snapEnd.y;
          }

          // Only create wall if it has some length
          const dist = Math.hypot(endX - startPoint.x, endY - startPoint.y);
          if (dist > 5) {
            const newObj: CanvasObject = {
              id: `obj-${Date.now()}`,
              type: 'wall',
              x: startPoint.x,
              y: startPoint.y,
              points: [{ x: startPoint.x, y: startPoint.y }, { x: endX, y: endY }],
            };
            onObjectsChange([...objects, newObj]);
          }
        }

        setIsDrawing(false);
        setStartPoint(null);
      };

      canvas.on('mouse:down', handleMouseDown);
      canvas.on('mouse:move', handleMouseMove);
      canvas.on('mouse:up', handleMouseUp);

      return () => {
        canvas.off('mouse:down', handleMouseDown);
        canvas.off('mouse:move', handleMouseMove);
        canvas.off('mouse:up', handleMouseUp);
      };
    }, [activeTool, selectedSymbolId, isDrawing, startPoint, objects, snapEnabled, dimensionStart, onWallTapped]);

    // Handle object modifications
    useEffect(() => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      const handleObjectModified = (e: any) => {
        const modifiedObj = e.target;
        const customData = (modifiedObj as any).customData;
        if (!customData) return;

        saveState();

        const updatedObjects = objects.map((obj) => {
          if (obj.id === customData.id) {
            return {
              ...obj,
              x: modifiedObj.left || obj.x,
              y: modifiedObj.top || obj.y,
              width: (modifiedObj.width || obj.width || 100) * (modifiedObj.scaleX || 1),
              height: (modifiedObj.height || obj.height || 100) * (modifiedObj.scaleY || 1),
              rotation: modifiedObj.angle || obj.rotation || 0,
            };
          }
          return obj;
        });

        onObjectsChange(updatedObjects);
      };

      canvas.on('object:modified', handleObjectModified);
      return () => { canvas.off('object:modified', handleObjectModified); };
    }, [objects]);

    // Rotate selected object 90° or rotate all if nothing selected
    const handleRotate = () => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      const active = canvas.getActiveObject();
      if (active) {
        // Rotate just the selected object
        const currentAngle = active.angle || 0;
        active.rotate(currentAngle + 90);
        canvas.renderAll();

        // Update React state
        const customData = (active as any).customData;
        if (customData?.id) {
          const updated = objects.map((obj) =>
            obj.id === customData.id ? { ...obj, rotation: (obj.rotation || 0) + 90 } : obj
          );
          onObjectsChange(updated);
        }
      } else if (onRotate) {
        // No selection — rotate everything
        onRotate();
      }
    };

    // Zoom controls
    const handleZoomIn = () => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;
      const newZoom = Math.min(canvas.getZoom() * 1.2, 5);
      canvas.setZoom(newZoom);
      setZoomLevel(newZoom);
    };

    const handleZoomOut = () => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;
      const newZoom = Math.max(canvas.getZoom() * 0.8, 0.1);
      canvas.setZoom(newZoom);
      setZoomLevel(newZoom);
    };

    const handleResetView = () => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;
      canvas.setZoom(1);
      setZoomLevel(1);
      canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
      canvas.renderAll();
    };

    // Calculate scale bar width based on zoom
    const scaleBarWidth = Math.round(SCALE * zoomLevel);

    return (
      <div className="w-full h-full overflow-hidden relative">
        <canvas ref={canvasRef} />

        {/* Scale Bar Overlay — bottom-left */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1 bg-black/60 backdrop-blur px-2 py-1 rounded text-white text-[10px]">
          <div className="h-3 border-l border-white/80" />
          <div style={{ width: `${scaleBarWidth}px` }} className="border-t border-white/80" />
          <div className="h-3 border-l border-white/80" />
          <span className="ml-1">1m</span>
        </div>

        {/* Zoom Controls - Floating top-right */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <Button
            size="icon"
            variant="outline"
            onClick={handleZoomIn}
            className="h-9 w-9 bg-black/60 backdrop-blur border-white/10 text-white hover:bg-black/80 touch-manipulation"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={handleZoomOut}
            className="h-9 w-9 bg-black/60 backdrop-blur border-white/10 text-white hover:bg-black/80 touch-manipulation"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={handleResetView}
            className="h-9 w-9 bg-black/60 backdrop-blur border-white/10 text-white hover:bg-black/80 touch-manipulation"
            title="Reset View"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={handleRotate}
            className="h-9 w-9 bg-black/60 backdrop-blur border-white/10 text-white hover:bg-black/80 touch-manipulation"
            title="Rotate 90°"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }
);

DiagramCanvas.displayName = 'DiagramCanvas';
