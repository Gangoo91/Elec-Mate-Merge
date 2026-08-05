import { EmailCaptureForm } from '@/components/landing/EmailCaptureForm';
import { CARD, LABEL, DIVIDE } from '@/components/seo/seoSurface';

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
    <section aria-labelledby="seo-lead-magnet-heading" className={`${CARD} my-10 p-5 sm:p-7`}>
      <p className={`${LABEL} text-amber-300`}>Free download</p>
      <h3
        id="seo-lead-magnet-heading"
        className="mt-2.5 text-[20px] font-bold leading-snug tracking-[-0.015em] text-white sm:text-[23px]"
      >
        {headline}
      </h3>
      <p className="mt-2 max-w-[58ch] text-[14.5px] leading-relaxed text-white">{description}</p>

      {/* What you get — hairline rows, no tick icons. */}
      <ul className={`mt-5 border-y border-white/[0.08] ${DIVIDE}`}>
        {bullets.map((b) => (
          <li key={b} className="py-2.5 text-[14px] leading-relaxed text-white">
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <EmailCaptureForm
          source="lead_magnet_cheatsheet"
          placeholder="you@email.com"
          buttonLabel="Send me the PDF"
          successMessage="Check your email — the PDF is on its way."
          onSuccess={handleSuccess}
          compact
        />
      </div>
    </section>
  );
}
