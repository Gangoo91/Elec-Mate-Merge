/**
 * The straight lines a CAD PDF is actually drawn with (28 Sep 2026).
 *
 * A PDF exported from AutoCAD is not a picture of a building: it carries the
 * exact geometry — every wall face as a line, to the millimetre. Paddy's care
 * home sheet holds ~59,000 segments. The plan reader boxes rooms by eye, which
 * lands within 0.1–0.3 m; these lines are what turn "about right" into "on the
 * wall", by snapping each room edge to the real wall face beside it.
 *
 * Coordinates come back in the same pixel space as `renderPdfPages` at the same
 * `maxEdge`, so they line up with the image the reader was shown.
 */

export interface PlanLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/** Only horizontal and vertical lines at least this long (px at the render size). */
const MIN_LENGTH_PX = 10;

type Matrix = [number, number, number, number, number, number];
const mul = (m: Matrix, n: Matrix): Matrix => [
  m[0] * n[0] + m[2] * n[1],
  m[1] * n[0] + m[3] * n[1],
  m[0] * n[2] + m[2] * n[3],
  m[1] * n[2] + m[3] * n[3],
  m[0] * n[4] + m[2] * n[5] + m[4],
  m[1] * n[4] + m[3] * n[5] + m[5],
];
const apply = (m: Matrix, x: number, y: number): [number, number] => [
  m[0] * x + m[2] * y + m[4],
  m[1] * x + m[3] * y + m[5],
];

/**
 * Axis-aligned lines on one page, in render pixels. Returns [] if the PDF has
 * no usable vectors (a scanned drawing is one big image) — callers then keep
 * the reader's own boxes.
 */
export async function extractPlanLines(
  file: File,
  options: { page?: number; maxEdge: number }
): Promise<PlanLine[]> {
  let task: { destroy: () => Promise<void> } | null = null;
  try {
    const pdfjs = await import('pdfjs-dist');
    const workerSrc = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

    const loading = pdfjs.getDocument({ data: await file.arrayBuffer() });
    task = loading;
    const loaded = await loading.promise;
    const page = await loaded.getPage(Math.min(Math.max(options.page ?? 1, 1), loaded.numPages));
    const base = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({
      scale: options.maxEdge / Math.max(base.width, base.height),
    });
    const toView = viewport.transform as Matrix;

    // Same intent as the render, so the same layers are in both.
    const ops = await page.getOperatorList({ intent: 'print' });
    const O = pdfjs.OPS;
    let ctm: Matrix = [1, 0, 0, 1, 0, 0];
    const stack: Matrix[] = [];
    const out: PlanLine[] = [];

    const push = (ax: number, ay: number, bx: number, by: number) => {
      const [x1, y1] = apply(toView, ...apply(ctm, ax, ay));
      const [x2, y2] = apply(toView, ...apply(ctm, bx, by));
      const horizontal = Math.abs(y1 - y2) < 0.75;
      const vertical = Math.abs(x1 - x2) < 0.75;
      if (!horizontal && !vertical) return;
      if (Math.hypot(x2 - x1, y2 - y1) < MIN_LENGTH_PX) return;
      out.push({ x1, y1, x2, y2 });
    };

    ops.fnArray.forEach((fn, i) => {
      const args = ops.argsArray[i];
      if (fn === O.save) stack.push(ctm);
      else if (fn === O.restore) ctm = stack.pop() ?? ctm;
      else if (fn === O.transform) ctm = mul(ctm, args as Matrix);
      // CAD exports often wrap the drawing in form XObjects, each with its own
      // matrix; ignoring it put their lines in the wrong place.
      else if (fn === O.paintFormXObjectBegin) {
        stack.push(ctm);
        const m = (args as unknown[])[0] as Matrix | null | undefined;
        if (Array.isArray(m) && m.length === 6) ctm = mul(ctm, m);
      } else if (fn === O.paintFormXObjectEnd) ctm = stack.pop() ?? ctm;
      else if (fn === O.constructPath) {
        // pdf.js 6: [drawOp, [Float32Array of opcodes and coordinates], bbox].
        // Opcodes: 0 moveTo(x,y) · 1 lineTo(x,y) · 2 curveTo(6) · 3 quad(4) · 4 close.
        const data = (args as unknown[])[1] as ArrayLike<number>[] | undefined;
        const d = data?.[0];
        if (!d) return;
        let k = 0;
        let cx = 0;
        let cy = 0;
        let sx = 0;
        let sy = 0;
        while (k < d.length) {
          const op = d[k++];
          if (op === 0) {
            cx = d[k++];
            cy = d[k++];
            sx = cx;
            sy = cy;
          } else if (op === 1) {
            const x = d[k++];
            const y = d[k++];
            push(cx, cy, x, y);
            cx = x;
            cy = y;
          } else if (op === 2) {
            // A curve (a door swing): not a wall, but the pen ends at its far
            // end — without moving it, the next line was drawn from the
            // curve's start, inventing a wall that rooms then snapped to.
            cx = d[k + 4];
            cy = d[k + 5];
            k += 6;
          } else if (op === 3) {
            cx = d[k + 2];
            cy = d[k + 3];
            k += 4;
          } else if (op === 4) {
            if (cx !== sx || cy !== sy) push(cx, cy, sx, sy);
            cx = sx;
            cy = sy;
          } else break;
        }
      }
    });
    return out;
  } catch (err) {
    console.warn('[pdfVectors] could not read lines, keeping the reader boxes:', err);
    return [];
  } finally {
    await task?.destroy().catch(() => undefined);
  }
}
