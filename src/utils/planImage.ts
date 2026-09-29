/**
 * Turn whatever plan the user has — an architect's PDF (one page or a whole
 * pack), a screenshot, a phone photo — into the JPEG page(s) the floor planner
 * reads (Paddy / Elctric Ltd, 28 Sep 2026).
 *
 * Why not the house `compressImageForUpload`: it caps at 2048px and ~1 MB,
 * which suits a photo of a fuse board but not an A3 CAD sheet of a care home,
 * where room names are a few pixels tall. Measured on Paddy's drawing, a 3000px
 * render gave 32-34 rooms on every run and a steady scale; 2048px gave 29-33
 * and a scale that wandered by a third.
 *
 * Why the dimensions come back: the reader positions rooms from boxes given as
 * fractions of the image, so it needs the true width and height to keep
 * proportions right.
 */
import { isPdf, renderPdfPages } from '@/utils/pdf-to-pages';
import { extractPlanLines, type PlanLine } from '@/utils/pdfVectors';

/** Long edge for a single sheet. */
const PLAN_MAX_EDGE = 3000;
/** Long edge per page in a pack — several pages at 3000px is too big a body for iOS. */
const PACK_MAX_EDGE = 2400;
/** Pages read from a pack. The server takes at most eight. */
const PACK_MAX_PAGES = 8;
/** Above this a single JPEG is re-encoded smaller — a big body is what iOS drops. */
const PLAN_MAX_BYTES = 2.5 * 1024 * 1024;
/** A PDF larger than this is not a set of floor plans. */
const PLAN_MAX_PDF_BYTES = 60 * 1024 * 1024;

export interface PlanPageImage {
  dataUrl: string;
  width: number;
  height: number;
  /**
   * PDFs only: the drawing's own wall lines, in this image's pixels. Used to
   * put rooms exactly on the architect's walls (see underlay.ts). Empty for a
   * scanned PDF, which has no vectors.
   */
  lines?: PlanLine[];
}

export interface PreparedPlan {
  pages: PlanPageImage[];
  /** For a PDF: how many pages it had, which can exceed `pages.length`. */
  pageCount: number;
  source: 'pdf' | 'image';
}

/**
 * Files people will drop in that cannot be read, with what to do instead. Said
 * plainly, so "it didn't work" becomes a thirty-second fix.
 */
export function unsupportedPlanReason(file: File): string | null {
  const name = file.name.toLowerCase();
  if (/\.(dwg|dxf|dwf|rvt|skp|ifc)$/.test(name)) {
    return 'CAD files cannot be read directly. In your CAD program use Plot or Export to PDF, then upload the PDF.';
  }
  if (/\.(docx?|pages|pptx?|xlsx?)$/.test(name)) {
    return 'Save the document as a PDF first, then upload the PDF.';
  }
  if (/\.(zip|rar|7z)$/.test(name)) {
    return 'Unzip it first, then upload the plan PDF or image.';
  }
  if (!isPdf(file) && file.type && !file.type.startsWith('image/')) {
    return 'That file type cannot be read. Upload a PDF, a screenshot or a photo of the plan.';
  }
  return null;
}

const toDataUrl = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });

const loadImage = (file: File) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('That image could not be opened.'));
    };
    img.src = url;
  });

async function encode(canvas: HTMLCanvasElement): Promise<Blob> {
  for (const quality of [0.85, 0.72, 0.6]) {
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/jpeg', quality));
    if (blob && (blob.size <= PLAN_MAX_BYTES || quality === 0.6)) return blob;
  }
  throw new Error('That image could not be prepared.');
}

export async function preparePlan(file: File): Promise<PreparedPlan> {
  const unsupported = unsupportedPlanReason(file);
  if (unsupported) throw new Error(unsupported);

  if (isPdf(file)) {
    if (file.size > PLAN_MAX_PDF_BYTES) {
      throw new Error('That PDF is too large. Export just the floor plan sheets and try again.');
    }
    // Render the first page at full size; if there is more than one page,
    // render the pack at the smaller size so the upload stays reliable.
    const probe = await renderPdfPages(file, { maxEdge: PLAN_MAX_EDGE, maxPages: 1 });
    if (!probe) {
      throw new Error(
        'That PDF could not be opened. Try exporting it again, or upload a screenshot of the plan.'
      );
    }
    const maxEdge = probe.pageCount > 1 ? PACK_MAX_EDGE : PLAN_MAX_EDGE;
    const rendered =
      probe.pageCount > 1
        ? await renderPdfPages(file, { maxEdge, maxPages: PACK_MAX_PAGES })
        : probe;
    if (!rendered) throw new Error('That PDF could not be opened.');
    // One page at a time: each line read parses the whole file, and eight at
    // once held eight copies of a large PDF in memory.
    const pages: PlanPageImage[] = [];
    for (const p of rendered.pages) {
      pages.push({
        dataUrl: await toDataUrl(p.blob),
        width: p.width,
        height: p.height,
        // The same PDF page, at the same size as the image — so the lines sit
        // on it exactly (by page number, not position, in case one was skipped).
        lines: await extractPlanLines(file, { page: p.pageNumber, maxEdge }),
      });
    }
    return {
      pages,
      pageCount: rendered.pageCount,
      source: 'pdf',
    };
  }

  const img = await loadImage(file);
  const longEdge = Math.max(img.naturalWidth, img.naturalHeight);
  const scale = Math.min(1, PLAN_MAX_EDGE / longEdge);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('That image could not be prepared.');
  // White under a transparent PNG screenshot, or it flattens to black.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return {
    pages: [
      {
        dataUrl: await toDataUrl(await encode(canvas)),
        width: canvas.width,
        height: canvas.height,
      },
    ],
    pageCount: 1,
    source: 'image',
  };
}
