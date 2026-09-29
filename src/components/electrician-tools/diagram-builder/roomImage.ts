/**
 * Room images — the thumbnail and full-size render saved with each sheet.
 *
 * Moved out of DiagramBuilderPage unchanged so the same code can render a sheet
 * outside the page (preparing a plan for a customer, 28 Sep 2026) rather than a
 * second, drifting copy of it.
 */
import type { CanvasObject } from '@/pages/electrician-tools/ai-tools/DiagramBuilderPage';

export const ROOM_IMAGE_PADDING = 64;
export const ROOM_THUMBNAIL_SIZE = { width: 120, height: 90 };
export const ROOM_EXPORT_SIZE = { width: 1800, height: 1350 };

export const getObjectBounds = (items: CanvasObject[]) => {
  if (items.length === 0) return null;

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const obj of items) {
    if (obj.points && obj.points.length > 0) {
      for (const point of obj.points) {
        minX = Math.min(minX, point.x);
        minY = Math.min(minY, point.y);
        maxX = Math.max(maxX, point.x);
        maxY = Math.max(maxY, point.y);
      }
      continue;
    }

    const width = obj.width || 40;
    const height = obj.height || 40;
    minX = Math.min(minX, obj.x);
    minY = Math.min(minY, obj.y);
    maxX = Math.max(maxX, obj.x + width);
    maxY = Math.max(maxY, obj.y + height);
  }

  if (!isFinite(minX)) return null;
  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
    centreX: (minX + maxX) / 2,
    centreY: (minY + maxY) / 2,
  };
};

/**
 * Render the room to a centred image at `targetSize` with `padding` margin.
 *
 * Uses Fabric's `toCanvasElement(multiplier, { left, top, width, height })`
 * which renders objects at their NATIVE coordinates regardless of the current
 * viewport pan/zoom. The previous implementation cropped pixels off the
 * displayed HTML canvas, which produced blank images whenever the user had
 * panned/zoomed so the room sat outside the visible canvas pixel bounds.
 */
export type ExportableCanvas = {
  toCanvasElement: (
    multiplier: number,
    options?: { left: number; top: number; width: number; height: number }
  ) => HTMLCanvasElement;
  getObjects?: () => {
    visible?: boolean;
    isGridLine?: boolean;
    isCircuitTag?: boolean;
    isHighlight?: boolean;
  }[];
  renderAll?: () => unknown;
  getZoom?: () => number;
  viewportTransform?: number[];
  setViewportTransform?: (vpt: number[]) => unknown;
};

export const renderCenteredRoomImage = (
  fabricCanvas: ExportableCanvas | null | undefined,
  bounds: ReturnType<typeof getObjectBounds>,
  targetSize: { width: number; height: number },
  padding: number,
  quality = 1
) => {
  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = targetSize.width;
  outputCanvas.height = targetSize.height;
  const ctx = outputCanvas.getContext('2d');
  if (!ctx) return '';

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);

  if (!fabricCanvas || !bounds || bounds.width <= 0 || bounds.height <= 0) {
    return outputCanvas.toDataURL('image/png', quality);
  }

  const cropPad = 24;
  const cropL = bounds.minX - cropPad;
  const cropT = bounds.minY - cropPad;
  const cropW = bounds.width + cropPad * 2;
  const cropH = bounds.height + cropPad * 2;
  const multiplier = 2;

  // The on-screen grid is a drawing aid, not drawing content — it has no place
  // on a document handed to a client. Hide the grid lines for the capture and
  // put them straight back, so the export is the drawing alone.
  // The grid, and any "show on plan" rings still fading out.
  const gridLines = (fabricCanvas.getObjects?.() ?? []).filter(
    (o) => o.isGridLine || o.isHighlight
  );
  const gridWasVisible = gridLines.map((o) => o.visible !== false);
  gridLines.forEach((o) => {
    o.visible = false;
  });
  // Circuit tags hide on screen when zoomed out; the drawing always carries them.
  const tags = (fabricCanvas.getObjects?.() ?? []).filter((o) => o.isCircuitTag);
  const tagsWereVisible = tags.map((o) => o.visible !== false);
  tags.forEach((o) => {
    o.visible = true;
  });

  // Capture at identity viewport.
  //
  // Fabric v6's toCanvasElement does NOT ignore the viewport — it computes
  // newZoom = zoom * multiplier and offsets the crop by the current pan. The
  // crop rect here is in world coordinates, so any zoom other than 1 aimed it
  // somewhere other than the drawing and produced a blank white sheet. This
  // silently worked only because the canvas happened to sit at zoom 1 until
  // fit-to-view started setting it. Neutralise the viewport for the capture
  // and restore it after, so the image is correct at any zoom or pan.
  const savedVpt = fabricCanvas.viewportTransform ? [...fabricCanvas.viewportTransform] : null;
  const canResetViewport = typeof fabricCanvas.setViewportTransform === 'function';

  let tightCanvas: HTMLCanvasElement;
  try {
    if (canResetViewport) fabricCanvas.setViewportTransform!([1, 0, 0, 1, 0, 0]);
    tightCanvas = fabricCanvas.toCanvasElement(multiplier, {
      left: cropL,
      top: cropT,
      width: cropW,
      height: cropH,
    });
  } catch {
    return outputCanvas.toDataURL('image/png', quality);
  } finally {
    if (savedVpt && canResetViewport) fabricCanvas.setViewportTransform!(savedVpt);
    gridLines.forEach((o, i) => {
      o.visible = gridWasVisible[i];
    });
    tags.forEach((o, i) => {
      o.visible = tagsWereVisible[i];
    });
    fabricCanvas.renderAll?.();
  }

  const scale = Math.min(
    (outputCanvas.width - padding * 2) / tightCanvas.width,
    (outputCanvas.height - padding * 2) / tightCanvas.height
  );
  const drawWidth = tightCanvas.width * scale;
  const drawHeight = tightCanvas.height * scale;
  const drawX = (outputCanvas.width - drawWidth) / 2;
  const drawY = (outputCanvas.height - drawHeight) / 2;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(tightCanvas, drawX, drawY, drawWidth, drawHeight);

  return outputCanvas.toDataURL('image/png', quality);
};
