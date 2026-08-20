/**
 * JsonLd — render JSON-LD structured data as an inline <script> in the BODY.
 *
 * 🔴 WHY THIS EXISTS: react-helmet is only half-alive in this app (verified
 * empirically 2026-08-20):
 *   • In dev it renders NOTHING (StrictMode double-mount breaks v6), so
 *     Helmet-emitted schemas can't be seen or tested locally.
 *   • In production its tags land in the prerendered static HTML of SEO
 *     routes, but do NOT survive into the hydrated runtime DOM — which is
 *     what Googlebot's JS rendering pass sees.
 *   • Routes that are never prerendered (the landing page) got nothing at
 *     all: its entire Helmet block — meta, canonical, three schemas, the
 *     hero LCP preload — never reached anyone.
 *
 * JSON-LD is valid anywhere in the document per Google's structured-data
 * guidelines, so a body script is equivalent to a head script — and it is
 * present in dev, in the prerender capture, AND in the hydrated runtime DOM.
 *
 * NEVER emit JSON-LD via <Helmet>. Use this component, or useSEO({schema})
 * where a page already calls useSEO.
 */
interface JsonLdProps {
  /** A schema object, or an array of schema objects (emitted as one script). */
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
