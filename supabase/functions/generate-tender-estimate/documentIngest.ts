/**
 * Tender document ingestion.
 *
 * The FE (TenderSection → useUploadTenderDocument) uploads tender docs to the
 * private `tender-documents` bucket and passes 12-month signed URLs in
 * `documentUrls`. This module fetches each URL server-side and extracts text
 * so the estimate is grounded in what the documents actually say, not just
 * how many there are.
 *
 *   - PDFs → text via `npm:pdf-parse@1.1.1` (same library already proven in
 *     the edge runtime by `_shared/attachment-ingest.ts` / Cost Engineer).
 *     First pages only — scope/spec usually leads.
 *   - text/plain, text/csv → read directly.
 *   - Everything else (docx/xlsx/images) → recorded as unreadable so the
 *     estimate can be honest about it.
 *
 * NEVER throws — any per-document failure becomes a `failures` entry and the
 * estimate proceeds without that document.
 */

import pdfParse from 'npm:pdf-parse@1.1.1';

export interface DocumentIngestResult {
  /** Labelled, delimited text blocks ready to inject into the prompt. */
  textBlocks: string[];
  /** Documents whose text was successfully extracted. */
  read: number;
  /** Documents we attempted (≤ MAX_DOCS). */
  attempted: number;
  /** Documents supplied by the caller. */
  total: number;
  /** Human-readable notes for every document we could NOT read. */
  failures: string[];
}

const MAX_DOCS = 3; // bound cost/time per estimate
const MAX_PDF_PAGES = 25; // bias to the front of the document
const MAX_CHARS_PER_DOC = 15_000;
const MAX_TOTAL_CHARS = 30_000;
const FETCH_TIMEOUT_MS = 10_000;
const MAX_DOWNLOAD_BYTES = 25 * 1024 * 1024; // 25MB — refuse to buffer more

/** Derive a readable label from a signed storage URL. */
function fileNameFromUrl(url: string, index: number): string {
  try {
    const path = new URL(url).pathname;
    const last = decodeURIComponent(path.split('/').pop() || '');
    return last || `Document ${index + 1}`;
  } catch {
    return `Document ${index + 1}`;
  }
}

function isPdf(contentType: string, name: string): boolean {
  return contentType.includes('pdf') || name.toLowerCase().endsWith('.pdf');
}

function isPlainText(contentType: string, name: string): boolean {
  if (contentType.startsWith('text/')) return true;
  const lower = name.toLowerCase();
  return lower.endsWith('.txt') || lower.endsWith('.csv');
}

async function extractOne(
  url: string,
  index: number
): Promise<{ name: string; text?: string; failure?: string }> {
  const name = fileNameFromUrl(url, index);
  const label = `Document ${index + 1} (${name})`;

  let response: Response;
  try {
    response = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  } catch (err: any) {
    const timedOut = err?.name === 'TimeoutError' || err?.name === 'AbortError';
    return {
      name,
      failure: `${label} could not be read — ${timedOut ? 'download timed out' : 'download failed'}.`,
    };
  }

  if (!response.ok) {
    return {
      name,
      failure: `${label} could not be read — download failed (HTTP ${response.status}).`,
    };
  }

  const contentType = (response.headers.get('content-type') || '').toLowerCase();
  const contentLength = Number(response.headers.get('content-length') || '0');
  if (contentLength > MAX_DOWNLOAD_BYTES) {
    await response.body?.cancel();
    return { name, failure: `${label} could not be read — file too large to process.` };
  }

  try {
    if (isPlainText(contentType, name)) {
      const text = (await response.text()).trim();
      if (!text) return { name, failure: `${label} could not be read — file was empty.` };
      return { name, text };
    }

    if (isPdf(contentType, name)) {
      const buffer = new Uint8Array(await response.arrayBuffer());
      if (buffer.byteLength > MAX_DOWNLOAD_BYTES) {
        return { name, failure: `${label} could not be read — file too large to process.` };
      }
      // `max` caps how many pages pdf-parse renders — first pages only.
      const parsed = await pdfParse(buffer, { max: MAX_PDF_PAGES });
      const text = (parsed?.text ?? '').replace(/\s+\n/g, '\n').trim();
      if (!text) {
        return {
          name,
          failure: `${label} contained no extractable text — it looks like a scanned (image-only) PDF, so the AI could not read it.`,
        };
      }
      return { name, text };
    }

    // docx / xlsx / images etc. — be honest rather than pretend.
    await response.body?.cancel();
    return {
      name,
      failure: `${label} is in a format the estimator cannot read yet (${contentType || 'unknown type'}) — upload a PDF version for a document-grounded estimate.`,
    };
  } catch (err: any) {
    console.error(`[DOC-INGEST] Failed to extract ${name}:`, err);
    return { name, failure: `${label} could not be read — text extraction failed.` };
  }
}

/**
 * Fetch + extract text from up to MAX_DOCS tender document URLs.
 * Guaranteed not to throw.
 */
export async function ingestTenderDocuments(urls: string[]): Promise<DocumentIngestResult> {
  const result: DocumentIngestResult = {
    textBlocks: [],
    read: 0,
    attempted: 0,
    total: urls.length,
    failures: [],
  };
  if (urls.length === 0) return result;

  try {
    const toProcess = urls.slice(0, MAX_DOCS);
    result.attempted = toProcess.length;

    // Sequential on purpose: keeps memory bounded and lets the total-chars
    // budget short-circuit later documents.
    let totalChars = 0;
    for (let i = 0; i < toProcess.length; i++) {
      if (totalChars >= MAX_TOTAL_CHARS) {
        result.failures.push(
          `Document ${i + 1} (${fileNameFromUrl(toProcess[i], i)}) not read — extracted-text budget for this estimate was already full.`
        );
        continue;
      }

      const { name, text, failure } = await extractOne(toProcess[i], i);
      if (failure || !text) {
        result.failures.push(failure ?? `Document ${i + 1} (${name}) could not be read.`);
        continue;
      }

      const budget = Math.min(MAX_CHARS_PER_DOC, MAX_TOTAL_CHARS - totalChars);
      const trimmed = text.slice(0, budget);
      totalChars += trimmed.length;

      const truncatedNote =
        trimmed.length < text.length
          ? `\n[Truncated — showing the first ${trimmed.length.toLocaleString()} of ${text.length.toLocaleString()} characters. Later sections (e.g. appendices) were not read.]`
          : '';
      result.textBlocks.push(
        `--- TENDER DOCUMENT ${i + 1}: ${name} ---\n${trimmed}${truncatedNote}`
      );
      result.read += 1;
    }

    if (urls.length > MAX_DOCS) {
      result.failures.push(
        `${urls.length - MAX_DOCS} additional document(s) were not read — the estimator reads up to ${MAX_DOCS} documents per estimate.`
      );
    }
  } catch (err) {
    // Belt-and-braces: never let document reading kill the estimate.
    console.error('[DOC-INGEST] Unexpected ingest failure:', err);
    if (result.failures.length === 0) {
      result.failures.push('Uploaded documents could not be read due to an unexpected error.');
    }
  }

  console.log(
    `[DOC-INGEST] Read ${result.read}/${result.total} documents (${result.failures.length} issue(s))`
  );
  return result;
}
