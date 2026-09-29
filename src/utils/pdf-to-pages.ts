/**
 * Split a PDF into one JPEG per page, in the browser (ELE-1368 / ELE-1607).
 *
 * ── 🔴 WHY THIS EXISTS ────────────────────────────────────────────────────
 * The schedule of test results has to be read ONE PAGE AT A TIME. Measured on
 * a real 10-page EICR whose schedule holds five circuits:
 *
 *   • the whole document in one call → **1 row of 5**, and 65 seconds
 *   • the single schedule page       → **5 of 5, nothing truncated, 19s**
 *
 * Handed a long document the model reports what it saw (`rows_seen: 5`) and
 * then emits one row anyway. A photographed certificate is already one image
 * per page, so it does not have this problem — a PDF does, and this is what
 * puts the two on the same footing.
 *
 * Rasterising is deliberately on the CLIENT: Deno's edge runtime has no PDF
 * renderer, `pdfjs-dist` is already a dependency here, and the work is a few
 * hundred milliseconds on a device that is otherwise idle.
 */

/** Above this the pages are downscaled — see the note on `MAX_EDGE`. */
const MAX_EDGE = 2000;

/*
 * 1700px on the long edge, JPEG 0.82.
 *
 * A schedule of test results is a dense grid of small figures, so this is the
 * one place in the app where resolution genuinely buys accuracy — the 1000px /
 * 0.75 used for evidence photos loses the difference between 0.35 and 0.55.
 *
 * 2000 rather than 1700: a direct 170dpi render (≈1400px across A4) read a
 * schedule perfectly, so the earlier 1700-on-the-long-edge — which is only
 * ≈1200px across — was below what the grid needs.
 */
const JPEG_QUALITY = 0.82;

/** Hard stop. A certificate is not a filing cabinet, and the edge function caps at 12. */
const MAX_PAGES = 12;

export interface PdfPage {
  file: File;
  pageNumber: number;
}

export function isPdf(file: File): boolean {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}

/**
 * Renders each page to a JPEG File. Returns `null` if the PDF cannot be read,
 * so the caller can fall back to sending the original — a whole-document read
 * is worse than a per-page one, but far better than an error.
 */
export async function pdfToPageImages(file: File): Promise<PdfPage[] | null> {
  try {
    const pdfjs = await import('pdfjs-dist');
    // Vite serves the worker as a static URL — same pattern as
    // `useParseAssessmentDocument`, which is the working precedent here.
    // (No ts-expect-error: this project's Vite types already cover `?url`.)
    const workerSrc = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

    const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
    const pageCount = Math.min(doc.numPages, MAX_PAGES);
    const out: PdfPage[] = [];

    for (let n = 1; n <= pageCount; n++) {
      const page = await doc.getPage(n);
      const base = page.getViewport({ scale: 1 });
      const scale = Math.min(MAX_EDGE / Math.max(base.width, base.height), 3);
      const viewport = page.getViewport({ scale: scale > 0 ? scale : 1 });

      const canvas = document.createElement('canvas');
      canvas.width = Math.round(viewport.width);
      canvas.height = Math.round(viewport.height);
      const ctx = canvas.getContext('2d');
      if (!ctx) continue;

      /*
       * White first. A PDF page is transparent where nothing is drawn, and a
       * transparent PNG flattened to JPEG comes out BLACK — a perfectly
       * rendered page that reads as a blank photograph.
       */
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      /*
       * intent 'print': the default 'display' intent paces rendering with
       * requestAnimationFrame, which the browser pauses in a hidden tab — so a
       * PDF dropped in and then left for another tab or app sat on "Preparing
       * the plan…" until the page was looked at again. Print intent renders
       * straight through (1ms against a hang, measured 28 Sep 2026).
       */
      await page.render({ canvas, canvasContext: ctx, viewport, intent: 'print' }).promise;

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY)
      );
      if (!blob) continue;

      out.push({
        pageNumber: n,
        // Zero-padded so a plain filename sort keeps page order past page 9.
        file: new File([blob], `page-${String(n).padStart(2, '0')}.jpg`, { type: 'image/jpeg' }),
      });
    }
    return out.length ? out : null;
  } catch (err) {
    console.warn('[pdf-to-pages] Could not split the PDF, sending it whole:', err);
    return null;
  }
}

/**
 * Render pages of a PDF to JPEGs at a chosen size (floor planner, 28 Sep 2026).
 *
 * A floor plan is the opposite of a schedule: a large sheet — often A3 CAD with
 * fine lines and small room names — rather than many dense A4 pages. It needs a
 * bigger render than `MAX_EDGE`. An architect's pack is commonly one floor per
 * page, so several pages can be asked for; the page count always comes back so
 * the caller can say what it did with the rest.
 */
export async function renderPdfPages(
  file: File,
  options: { maxEdge: number; maxPages: number; quality?: number }
): Promise<{
  pages: { blob: Blob; width: number; height: number; pageNumber: number }[];
  pageCount: number;
} | null> {
  let task: { destroy: () => Promise<void> } | null = null;
  try {
    const pdfjs = await import('pdfjs-dist');
    const workerSrc = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

    const loading = pdfjs.getDocument({ data: await file.arrayBuffer() });
    task = loading;
    const loaded = await loading.promise;
    // Each page carries its own number: a page that fails to draw is skipped,
    // and matching by position then paired a page with the next one's walls.
    const pages: { blob: Blob; width: number; height: number; pageNumber: number }[] = [];
    for (let n = 1; n <= Math.min(loaded.numPages, options.maxPages); n++) {
      const page = await loaded.getPage(n);
      // getViewport applies the page's own /Rotate, so a landscape sheet
      // stored rotated comes out the right way up.
      const base = page.getViewport({ scale: 1 });
      const scale = options.maxEdge / Math.max(base.width, base.height);
      const viewport = page.getViewport({ scale: scale > 0 ? scale : 1 });

      const canvas = document.createElement('canvas');
      canvas.width = Math.round(viewport.width);
      canvas.height = Math.round(viewport.height);
      const ctx = canvas.getContext('2d');
      if (!ctx) continue;
      // White first — see pdfToPageImages: transparent flattens to black.
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      /*
       * intent 'print': the default 'display' intent paces rendering with
       * requestAnimationFrame, which the browser pauses in a hidden tab — so a
       * PDF dropped in and then left for another tab or app sat on "Preparing
       * the plan…" until the page was looked at again. Print intent renders
       * straight through (1ms against a hang, measured 28 Sep 2026).
       */
      await page.render({ canvas, canvasContext: ctx, viewport, intent: 'print' }).promise;

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/jpeg', options.quality ?? 0.85)
      );
      if (blob) pages.push({ blob, width: canvas.width, height: canvas.height, pageNumber: n });
      // Hand the pixels back now: several A1 renders held at once is what an
      // iPhone's web view is killed for.
      canvas.width = 0;
      canvas.height = 0;
      page.cleanup();
    }
    return pages.length ? { pages, pageCount: loaded.numPages } : null;
  } catch (err) {
    if ((err as { name?: string })?.name === 'PasswordException') {
      throw new Error(
        'That PDF is password-protected. Open it, print or save it to a new PDF without the password, and upload that.'
      );
    }
    console.warn('[pdf-to-pages] Could not render the PDF:', err);
    return null;
  } finally {
    // Every getDocument starts a worker; never releasing them piled up a
    // worker and a copy of the file per upload.
    await task?.destroy().catch(() => undefined);
  }
}
