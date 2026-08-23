/**
 * PdfDownloadCard — free-download block for SEO pages, with optional email capture.
 *
 * Built for /guides/electrical-symbols-chart, whose own GSC query data shows
 * people searching "iec 60617 electrical symbols pdf" — demand nobody was
 * serving. The page is the site's biggest by impressions (21k/28d).
 *
 * TWO MODES
 *   captureSource omitted → straight download link (no friction, max linkability)
 *   captureSource set     → email gate: address first, then the file downloads
 *                           automatically AND a copy is emailed.
 *
 * The gate reuses <EmailCaptureForm>, so downloads land in Brevo through the
 * same `newsletter-subscribe` edge function as the mock exams and calculators,
 * carrying the same attribution/pixel handling. SIGNUP_SOURCE is set from the
 * source string, so symbols-chart leads stay segmentable from every other
 * magnet.
 *
 * After a successful capture the file is fetched to a blob and saved with a
 * synthetic click. A plain <a download> is also shown as a fallback, because a
 * blocked programmatic download must never mean they hand over an address and
 * get nothing.
 *
 * `href` may be cross-origin — the symbols chart is served from the public
 * Supabase `lead-magnets` bucket so that one copy serves both the page and the
 * emailed attachment. Supabase storage sends permissive CORS, so the blob fetch
 * works; if a future asset is hosted somewhere that does not, the fetch fails
 * closed and the visible fallback link still delivers the file.
 *
 * Layout: stacked and full-bleed on mobile with 48px targets; three columns
 * from lg: so it fills a desktop measure without stretching the text.
 */
import { useCallback, useRef, useState } from 'react';
import { Download, FileText, Check } from 'lucide-react';
import { EmailCaptureForm } from '@/components/landing/EmailCaptureForm';
import { trackSeoToolUsed, trackLeadMagnetDownloaded } from '@/lib/analytics-events';
import { saveOrShareFile } from '@/utils/save-or-share-file';

type CaptureSource = 'lead_magnet_symbols_chart';

interface PdfDownloadCardProps {
  /** Public path to the PDF, e.g. /downloads/foo.pdf */
  href: string;
  title: string;
  /** One-line description of what's inside. */
  description: string;
  /** Short facts shown as ticks, e.g. ['114 symbols', 'A4, print-ready']. */
  bullets?: string[];
  /** File size label, e.g. '423 KB'. */
  meta?: string;
  /** Analytics id, e.g. 'symbols_chart_pdf'. */
  trackAs: string;
  /**
   * Set to gate the download behind an email address. Omit for a plain link.
   * The value is passed straight through as the capture `source`, so it must
   * stay in EmailCaptureForm's Source union.
   */
  captureSource?: CaptureSource;
}

/** Suggested filename from the public path, e.g. "…/foo.pdf" → "foo.pdf". */
function fileNameFrom(href: string) {
  return href.split('/').pop() || 'download.pdf';
}

export default function PdfDownloadCard({
  href,
  title,
  description,
  bullets = [],
  meta,
  trackAs,
  captureSource,
}: PdfDownloadCardProps) {
  const [captured, setCaptured] = useState(false);
  // The edge function returns a download_url only for magnets it knows about.
  // Null means an older deployment that captured the address but did not send
  // the delivery email — so the success copy must not promise one.
  const [emailed, setEmailed] = useState(false);
  // Whether the automatic save actually started. Drives honest success copy:
  // telling someone "downloading now" when the fetch 404'd is worse than
  // telling them to tap the link.
  const [autoSaved, setAutoSaved] = useState(true);
  // Set when the subscribe call itself fails. The chart is a free public asset —
  // a CRM outage must not mean someone types their address and gets nothing.
  const [captureFailed, setCaptureFailed] = useState(false);
  const startedRef = useRef(false);

  /** Pull the file down and save it, so the user never has to click twice. */
  const startDownload = useCallback(async () => {
    if (startedRef.current) return;
    startedRef.current = true;
    try {
      const res = await fetch(href);
      if (!res.ok) throw new Error(String(res.status));
      // Guard against an SPA rewrite handing back index.html with a 200.
      const type = res.headers.get('content-type') || '';
      if (!type.includes('pdf') && !type.includes('octet-stream')) {
        throw new Error(`unexpected content-type: ${type}`);
      }
      const blob = await res.blob();
      // The content-type guard above is worth keeping — it catches the SPA
      // rewrite returning index.html with a 200. Only the delivery changes:
      // saveOrShareFile handles the app's WebView, where `<a download>` is
      // ignored, and keeps the deferred revoke on the web.
      await saveOrShareFile(blob, fileNameFrom(href));
    } catch {
      // Allow a genuine retry from the visible link, and stop claiming the
      // download is under way when it is not.
      startedRef.current = false;
      setAutoSaved(false);
    }
  }, [href]);

  const onCaptured = useCallback(
    (result: { downloadUrl: string | null }) => {
      trackSeoToolUsed({ tool: trackAs, page: window.location.pathname });
      trackLeadMagnetDownloaded({ magnet: trackAs });
      setEmailed(Boolean(result?.downloadUrl));
      setCaptured(true);
      void startDownload();
    },
    [startDownload, trackAs]
  );

  return (
    <div className="-mx-4 border-y border-elec-yellow/25 bg-gradient-to-br from-elec-yellow/[0.10] via-white/[0.05] to-white/[0.03] p-5 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6 lg:p-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
        {/* Icon */}
        <div className="flex items-center gap-4 lg:shrink-0 lg:flex-col lg:gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-elec-yellow lg:h-20 lg:w-20">
            <FileText className="h-7 w-7 text-black lg:h-10 lg:w-10" aria-hidden />
          </div>
          <div className="lg:text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
              Free download
            </p>
            {meta ? <p className="text-[12px] text-white lg:mt-0.5">PDF · {meta}</p> : null}
          </div>
        </div>

        {/* Copy */}
        <div className="min-w-0 flex-1">
          <h3 className="text-[17px] font-bold leading-snug text-white sm:text-[19px]">{title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-white">{description}</p>
          {bullets.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-1.5 text-[13px] text-white">
                  <Check className="h-3.5 w-3.5 shrink-0 text-elec-yellow" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action */}
        <div className="lg:w-[300px] lg:shrink-0">
          {!captureSource ? (
            <>
              <a
                href={href}
                download
                onClick={() => trackSeoToolUsed({ tool: trackAs, page: window.location.pathname })}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow px-6 text-[15px] font-bold text-black transition-colors hover:brightness-95 touch-manipulation"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download the PDF
              </a>
              <p className="mt-2 text-center text-[12px] text-white">No email needed</p>
            </>
          ) : captured ? (
            <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/[0.08] p-4 text-center">
              <p className="flex items-center justify-center gap-2 text-[15px] font-bold text-white">
                <Check className="h-4 w-4 text-elec-yellow" aria-hidden />
                {autoSaved ? 'Downloading now' : 'Ready to download'}
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-white">
                {emailed
                  ? 'A copy is on its way to your inbox too.'
                  : "You're on the list — we'll be in touch with useful bits for electricians."}
              </p>
              <a
                href={href}
                download
                className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 text-[13.5px] font-semibold text-elec-yellow hover:underline touch-manipulation"
              >
                <Download className="h-4 w-4" aria-hidden />
                {autoSaved ? "Download didn't start? Tap here" : 'Tap to download the PDF'}
              </a>
            </div>
          ) : (
            <>
              <EmailCaptureForm
                source={captureSource}
                placeholder="you@example.com"
                buttonLabel="Send it to me"
                onSuccess={onCaptured}
                onError={() => setCaptureFailed(true)}
                footnote="We'll email the chart and the occasional useful thing for electricians. Unsubscribe any time."
              />
              {captureFailed && (
                <a
                  href={href}
                  download
                  onClick={() =>
                    trackSeoToolUsed({ tool: trackAs, page: window.location.pathname })
                  }
                  className="mt-3 inline-flex min-h-11 items-center gap-2 text-[13.5px] font-semibold text-elec-yellow hover:underline touch-manipulation"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Signup&rsquo;s playing up — download it directly
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
