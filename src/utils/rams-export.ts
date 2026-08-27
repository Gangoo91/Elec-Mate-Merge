/**
 * RAMS export — the three buttons on the Issue tab, actually delivered.
 *
 * 🔴 PDFMONKEY IS THE ONLY PATH. The RAMS document is a PDFMonkey template,
 * rendered by one edge function per button:
 *
 *   Download full RAMS      → generate-combined-rams-pdf
 *   Risk assessment only    → generate-rams-pdf
 *   Method statement only   → generate-method-statement-pdf
 *
 * Each returns `{ success, downloadUrl }`. There is deliberately **no
 * client-side fallback**: the jsPDF generators in `rams-pdf-professional.ts`
 * produce a different, unbranded document, and silently handing someone that
 * instead means two different-looking RAMS go out to sites under one name. If
 * PDFMonkey cannot serve, this throws and the caller shows the error.
 *
 * 🔴 WHY THIS FILE EXISTS
 * `RAMSResultsPage` called the jsPDF *generators* directly and discarded what
 * they returned:
 *
 *   await generateRAMSPDF(doc.rams, kind === 'combined' ? (doc.method as never) : undefined);
 *
 * `generateRAMSPDF` returns a data-URI **string**; `generateMethodStatementPDF`
 * returns a **Uint8Array**. Neither writes a file or opens anything, so every
 * button on that tab did nothing at all, on every platform, from the day the
 * screen shipped (a152dc649, 12 Aug) — and it was reaching for the wrong
 * generator in the first place. The only later change to the component was a
 * `min-w-0` on a heading; it was never working.
 *
 * Two further faults that one line was hiding:
 *  1. The second parameter is `PDFOptions`, not method-statement data. `as never`
 *     silenced the type error, so the combined export passed the method statement
 *     in as an options object and never contained it.
 *  2. Delivery must go through `saveOrShareFile` (`openOrDownloadPdf`). A plain
 *     `<a download>` is ignored by WKWebView — the trap already documented on
 *     `downloadMethodStatementPDF`.
 */
import { supabase } from '@/integrations/supabase/client';
import { openOrDownloadBlobPdf } from './pdf-download';
import { saveRAMSPDFToStorage } from './rams-pdf-storage';
import { safeFileName } from './rams-pdf-helpers';
import type { RAMSData } from '@/types/rams';
import type { MethodStatementData } from '@/types/method-statement';

export type RAMSExportKind = 'combined' | 'rams' | 'method';

const FUNCTION_FOR: Record<RAMSExportKind, string> = {
  combined: 'generate-combined-rams-pdf',
  rams: 'generate-rams-pdf',
  method: 'generate-method-statement-pdf',
};

/** `ddMMyyyy`, matching the existing method-statement filenames. */
const stamp = (): string => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}${pad(d.getMonth() + 1)}${d.getFullYear()}`;
};

const fileNameFor = (
  kind: RAMSExportKind,
  rams?: RAMSData,
  method?: MethodStatementData
): string => {
  const base = safeFileName(rams?.projectName || method?.jobTitle || 'RAMS');
  const suffix =
    kind === 'combined' ? 'RAMS' : kind === 'rams' ? 'Risk_Assessment' : 'Method_Statement';
  return `${base}_${suffix}_${stamp()}.pdf`;
};

/**
 * Highest-risk first, the order the template prints them in. Lives here rather
 * than at the call site so this screen and `RAMSReviewEditor` cannot drift into
 * issuing differently ordered documents.
 */
const sortedRisks = (rams: RAMSData): RAMSData => ({
  ...rams,
  risks: [...(rams.risks || [])].sort((a, b) => (b.riskRating || 0) - (a.riskRating || 0)),
});

export interface RAMSExportResult {
  /** True when the document was filed under Site Safety → RAMS documents. */
  filed: boolean;
  /** Why it wasn't filed, when it wasn't. Not an error — the file still saved. */
  fileReason?: string;
}

/**
 * Render through PDFMonkey, file it under Site Safety, and hand it to the user.
 * Throws only if the document could not be produced or delivered.
 */
export async function exportRAMS(
  kind: RAMSExportKind,
  rams?: RAMSData,
  method?: MethodStatementData
): Promise<RAMSExportResult> {
  const fn = FUNCTION_FOR[kind];
  const { data, error } = await supabase.functions.invoke(fn, {
    body: {
      // Each function reads the key it needs and ignores the rest, so one body
      // shape covers all three.
      ...(rams ? { ramsData: sortedRisks(rams) } : {}),
      ...(method ? { methodData: method } : {}),
    },
  });

  if (error) throw new Error(error.message || `${fn} failed.`);

  if (!data?.success || !data?.downloadUrl) {
    // The function reports its own reason — surface it rather than a generic
    // failure, because "stuck in draft" and "key not configured" need very
    // different responses from us.
    console.error('[rams-export] PDFMonkey did not return a document', {
      fn,
      status: data?.status,
      message: data?.message,
      hint: data?.hint,
      templateId: data?.templateId,
      error: data?.error,
    });
    throw new Error(
      data?.message || data?.error || 'The RAMS document could not be generated. Please try again.'
    );
  }

  const filename = fileNameFor(kind, rams, method);

  // Fetch ONCE and use the bytes twice — filing and delivery. PDFMonkey's S3
  // sends `access-control-allow-origin: *` (verified 27 Aug), so this is
  // readable from both the browser and the Capacitor WebView.
  // 🔴 PDFMonkey download URLs EXPIRE (7 days), which is why the copy that goes
  // into Site Safety has to be our own — same reason the certificates copy
  // theirs into the `certificates` bucket rather than storing the PDFMonkey URL.
  const res = await fetch(data.downloadUrl);
  if (!res.ok) throw new Error(`Could not retrieve the generated PDF (${res.status}).`);
  const blob = await res.blob();

  let filed = false;
  let fileReason: string | undefined;
  if (rams) {
    // Filing must never cost the user their download — a storage or RLS failure
    // is reported, not thrown.
    try {
      const saved = await saveRAMSPDFToStorage(blob, rams, method ?? {}, 'issued');
      // `saveRAMSPDFToStorage` returns success:false for its same-day duplicate
      // guard. That is not a failure — the document IS filed, from the earlier
      // export — and reporting it as one makes a second download look broken.
      const alreadyFiled = !saved.success && /already saved/i.test(saved.error ?? '');
      filed = saved.success || alreadyFiled;
      if (!filed) fileReason = saved.error;
    } catch (err) {
      fileReason = err instanceof Error ? err.message : 'Could not file the document.';
      console.error('[rams-export] filing to Site Safety failed', err);
    }
  } else {
    fileReason = 'Method statement exported on its own — nothing to file against.';
  }

  await openOrDownloadBlobPdf(blob, filename);
  return { filed, fileReason };
}
