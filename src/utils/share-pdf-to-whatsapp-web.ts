/**
 * share-pdf-to-whatsapp-web.ts
 *
 * Web-only WhatsApp share for PDFs. Native (Capacitor) uses a separate path
 * via openExternalUrl(wa.me/...) which is left untouched.
 *
 * Why this exists: the legacy web flow drops a PDFMonkey signed URL
 * (X-Amz-Expires=3600) into a wa.me text message. After 1 hour the
 * recipient gets an AccessDenied XML page. This helper sends the actual
 * PDF bytes — never a link inside the message body.
 *
 *   - Mobile web (Android Chrome / iOS Safari) with Web Share Level 2:
 *       navigator.share({ files: [pdf] }) → user picks WhatsApp →
 *       PDF attached as a real document.
 *   - Desktop fallback: download the PDF to the user's Downloads folder,
 *       open wa.me/ with the chat text (no URL), and toast a hint to
 *       attach the file manually.
 */
import { supabase } from '@/integrations/supabase/client';

type GenerateLinkResponse = { publicUrl: string };

export type SharePdfToWhatsAppDocumentType =
  | 'quote'
  | 'invoice'
  | 'eicr'
  | 'eic'
  | 'minor-works'
  | 'fire-alarm'
  | 'emergency-lighting'
  | 'solar-pv'
  | 'pat-testing'
  | 'ev-charging';

export interface SharePdfToWhatsAppWebOptions {
  documentId: string;
  documentType: SharePdfToWhatsAppDocumentType;
  filename: string;
  message: string;
  recipientPhone?: string;
  title?: string;
}

export type SharePdfToWhatsAppWebResult =
  | { mode: 'web-share' }
  | { mode: 'download-and-redirect' };

function normaliseUkPhone(phone: string): string {
  let n = phone.replace(/\s+/g, '').replace(/[^\d+]/g, '');
  if (n.startsWith('0')) n = '+44' + n.substring(1);
  if (!n.startsWith('+')) n = '+44' + n;
  return n.replace('+', '');
}

function buildWaMeUrl(phone: string | undefined, message: string): string {
  const encoded = encodeURIComponent(message);
  return phone
    ? `https://wa.me/${normaliseUkPhone(phone)}?text=${encoded}`
    : `https://wa.me/?text=${encoded}`;
}

async function fetchPdfBlob(url: string): Promise<Blob> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`PDF fetch failed: ${res.status} ${res.statusText}`);
  }
  return res.blob();
}

function triggerBlobDownload(blob: Blob, filename: string): void {
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = objectUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}

export async function sharePdfToWhatsAppWeb(
  options: SharePdfToWhatsAppWebOptions
): Promise<SharePdfToWhatsAppWebResult> {
  const safeFilename = options.filename.replace(/[/\\:*?"<>|]/g, '-');

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const { data, error } = await supabase.functions.invoke<GenerateLinkResponse>(
    'generate-temporary-pdf-link',
    {
      body: { documentId: options.documentId, documentType: options.documentType },
      headers: { Authorization: `Bearer ${session.access_token}` },
    }
  );

  if (error || !data?.publicUrl) {
    throw new Error('Failed to generate shareable PDF link');
  }

  return sharePdfBytesFromUrlToWhatsAppWeb({
    pdfUrl: data.publicUrl,
    filename: safeFilename,
    message: options.message,
    recipientPhone: options.recipientPhone,
    title: options.title,
  });
}

export interface SharePdfBytesFromUrlOptions {
  pdfUrl: string;
  filename: string;
  message: string;
  recipientPhone?: string;
  title?: string;
}

/**
 * Lower-level variant for call sites that already have a fresh PDF URL
 * (e.g. just called generate-pdf-monkey directly). Same Web Share Level 2
 * → download-and-redirect branching as the higher-level helper.
 */
export async function sharePdfBytesFromUrlToWhatsAppWeb(
  options: SharePdfBytesFromUrlOptions
): Promise<SharePdfToWhatsAppWebResult> {
  const safeFilename = options.filename.replace(/[/\\:*?"<>|]/g, '-');

  const blob = await fetchPdfBlob(options.pdfUrl);
  const pdfFile = new File([blob], safeFilename, { type: 'application/pdf' });

  const canShareFiles =
    typeof navigator !== 'undefined' &&
    typeof navigator.share === 'function' &&
    typeof navigator.canShare === 'function' &&
    navigator.canShare({ files: [pdfFile] });

  if (canShareFiles) {
    await navigator.share({
      files: [pdfFile],
      text: options.message,
      title: options.title ?? safeFilename,
    });
    return { mode: 'web-share' };
  }

  triggerBlobDownload(blob, safeFilename);
  const waUrl = buildWaMeUrl(options.recipientPhone, options.message);
  window.open(waUrl, '_blank');
  return { mode: 'download-and-redirect' };
}
