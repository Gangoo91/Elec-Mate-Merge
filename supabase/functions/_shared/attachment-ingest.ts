/**
 * Cost Engineer attachment ingestion.
 *
 * Reads user-uploaded floor plans, specs and photos out of the
 * `cost-engineer-attachments` storage bucket and prepares them for the AI:
 *
 *   - PDFs → text extraction via pdf-parse, returned as labelled text blocks.
 *   - Images → 10-min signed URLs, returned as `image_url` content blocks.
 *
 * The caller injects `textBlocks` into the prompt and appends `imageBlocks`
 * to the multimodal user message. Bytes never travel through the AI request
 * body — we hand OpenAI signed URLs.
 */

import pdfParse from 'npm:pdf-parse@1.1.1';

export interface AttachmentInput {
  id?: string;
  fileName: string;
  fileType: string;
  fileSize?: number;
  storagePath: string;
  kind?: 'floor-plan' | 'specification' | 'photo' | 'other';
}

export interface IngestedAttachments {
  textBlocks: string[];
  imageBlocks: Array<{
    type: 'image_url';
    image_url: { url: string; detail: 'low' | 'high' };
  }>;
  errors: Array<{ fileName: string; reason: string }>;
}

const BUCKET = 'cost-engineer-attachments';
const SIGNED_URL_TTL_SEC = 600; // 10 minutes
const MAX_PDF_TEXT_CHARS = 12_000; // per file — keeps prompt size sane
const MAX_TOTAL_PDF_CHARS = 28_000; // across all PDFs

const KIND_LABEL: Record<string, string> = {
  'floor-plan': 'Floor plan',
  specification: 'Specification',
  photo: 'Site photo',
  other: 'Document',
};

const isImage = (mime: string) => mime.startsWith('image/');
const isPdf = (mime: string) => mime === 'application/pdf';

export async function ingestAttachments(
  supabase: any,
  attachments: AttachmentInput[] | undefined | null
): Promise<IngestedAttachments> {
  const out: IngestedAttachments = { textBlocks: [], imageBlocks: [], errors: [] };
  if (!attachments || attachments.length === 0) return out;

  let totalPdfChars = 0;

  for (const att of attachments) {
    try {
      if (isPdf(att.fileType)) {
        if (totalPdfChars >= MAX_TOTAL_PDF_CHARS) {
          out.errors.push({
            fileName: att.fileName,
            reason: 'Skipped — total extracted PDF text budget reached.',
          });
          continue;
        }
        const text = await extractPdfText(supabase, att.storagePath);
        // Surface scanned-PDFs as a soft warning so the UI can flag
        // them. The AI still sees the placeholder text block, but the
        // user needs to know we couldn't actually read the document.
        if (text.length === 0) {
          out.errors.push({
            fileName: att.fileName,
            reason:
              'No extractable text — looks like a scanned PDF (image-only). The AI could not read this document; consider re-uploading a text-based PDF or photographing each page individually.',
          });
        }
        const remaining = MAX_TOTAL_PDF_CHARS - totalPdfChars;
        const trimmed = text.slice(0, Math.min(MAX_PDF_TEXT_CHARS, remaining));
        totalPdfChars += trimmed.length;
        out.textBlocks.push(formatTextBlock(att, trimmed, text.length));
      } else if (isImage(att.fileType)) {
        const url = await signedUrl(supabase, att.storagePath);
        if (url) {
          out.imageBlocks.push({
            type: 'image_url',
            image_url: { url, detail: 'high' },
          });
          // Also note the image in the text prompt so the model knows what it's looking at.
          out.textBlocks.push(
            `[${KIND_LABEL[att.kind ?? 'other']}: ${att.fileName} — see attached image ${out.imageBlocks.length}]`
          );
        } else {
          out.errors.push({ fileName: att.fileName, reason: 'Could not sign URL.' });
        }
      } else {
        out.errors.push({
          fileName: att.fileName,
          reason: `Unsupported MIME type: ${att.fileType}`,
        });
      }
    } catch (error: any) {
      console.error(`[attachment-ingest] Failed to process ${att.fileName}:`, error);
      out.errors.push({
        fileName: att.fileName,
        reason: error?.message ?? 'Unknown error processing attachment.',
      });
    }
  }

  return out;
}

async function extractPdfText(supabase: any, storagePath: string): Promise<string> {
  const { data, error } = await supabase.storage.from(BUCKET).download(storagePath);
  if (error || !data) {
    throw new Error(`Could not download PDF: ${error?.message ?? 'no data'}`);
  }
  const buffer = new Uint8Array(await data.arrayBuffer());
  const parsed = await pdfParse(buffer);
  return (parsed?.text ?? '').replace(/\s+\n/g, '\n').trim();
}

async function signedUrl(supabase: any, storagePath: string): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(storagePath, SIGNED_URL_TTL_SEC);
  if (error) {
    console.warn(`[attachment-ingest] Sign URL failed for ${storagePath}:`, error.message);
    return null;
  }
  return data?.signedUrl ?? null;
}

function formatTextBlock(att: AttachmentInput, text: string, originalLength: number): string {
  const label = KIND_LABEL[att.kind ?? 'other'];
  const truncatedNote =
    text.length < originalLength
      ? `\n[Truncated — full document was ${originalLength.toLocaleString()} chars]`
      : '';
  if (text.length === 0) {
    return `--- ${label}: ${att.fileName} ---\n[No extractable text — likely a scanned PDF or image-only.]\n`;
  }
  return `--- ${label}: ${att.fileName} ---\n${text}${truncatedNote}\n`;
}
