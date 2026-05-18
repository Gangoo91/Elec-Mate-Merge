import { Download, FileText, ShieldCheck } from 'lucide-react';
import { EmailCaptureForm } from '@/components/landing/EmailCaptureForm';

interface SEOInlineLeadMagnetProps {
  /** Headline above the form. Defaults to the BS 7671 A4:2026 cheatsheet offer. */
  headline?: string;
  /** Supporting copy. */
  description?: string;
  /** Brief bullet list of what they get. */
  bullets?: string[];
}

/**
 * SEOInlineLeadMagnet — mid-content email capture block.
 *
 * Sits after the first major content section on guide pages to convert reader
 * intent into emails. Uses the same EmailCaptureForm + Brevo + attribution
 * pipeline as the landing-page LeadMagnetSection, just compact.
 *
 * Default offer: BS 7671 A4:2026 cheatsheet (universally relevant to UK
 * electricians). Override props per page for topic-specific lead magnets
 * later (e.g. "RAMS template", "EICR checklist", "Cable size cheat sheet").
 */
export function SEOInlineLeadMagnet({
  headline = 'Get the BS 7671 A4:2026 Cheat Sheet — free',
  description = 'Every key change in the 2026 amendment on one page. AFDDs, TN-C-S protection, new schedule columns, model forms. Pinned on your van dash.',
  bullets = [
    'Every regulation change summarised',
    'New model forms (EIC + MEIWC)',
    'Free PDF — no subscription',
  ],
}: SEOInlineLeadMagnetProps) {
  const handleSuccess = ({ downloadUrl }: { downloadUrl: string | null }) => {
    if (!downloadUrl) return;
    window.open(downloadUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      aria-labelledby="seo-lead-magnet-heading"
      className="my-10 rounded-2xl border border-yellow-500/25 bg-gradient-to-br from-yellow-500/[0.06] via-white/[0.02] to-yellow-500/[0.04] p-5 sm:p-7"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-500/15 border border-yellow-500/30">
          <FileText className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-2 mb-2 text-[11px] font-medium uppercase tracking-wider text-yellow-300">
            <Download className="h-3 w-3" />
            Free download
          </div>
          <h3
            id="seo-lead-magnet-heading"
            className="text-lg sm:text-xl font-bold text-white leading-snug mb-2"
          >
            {headline}
          </h3>
          <p className="text-sm text-white/80 leading-relaxed mb-3">{description}</p>
          <ul className="space-y-1 mb-4">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-white/80">
                <ShieldCheck className="h-3.5 w-3.5 text-yellow-400 mt-0.5 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <EmailCaptureForm
            source="lead_magnet_cheatsheet"
            placeholder="you@email.com"
            buttonLabel="Send me the PDF"
            successMessage="Check your email — the PDF is on its way."
            onSuccess={handleSuccess}
            compact
          />
        </div>
      </div>
    </section>
  );
}
