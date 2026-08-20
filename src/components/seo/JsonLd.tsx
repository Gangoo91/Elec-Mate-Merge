/**
 * JsonLd — render JSON-LD structured data as an inline <script> in the BODY.
 *
 * 🔴 WHY THIS EXISTS: react-helmet is silently non-functional in this app —
 * verified empirically 2026-08-20: no script/meta rendered through <Helmet>
 * ever reaches the DOM, in dev or production. Every schema emitted that way
 * (mock exams' Quiz/FAQPage, SymbolGallery's ImageObjects, the landing page's
 * FAQPage, PublicPageLayout's Organization graph) was invisible to crawlers.
 *
 * JSON-LD is valid anywhere in the document per Google's structured-data
 * guidelines, so a body script is equivalent to a head script — and because
 * seo-prerender.mjs captures the fully hydrated DOM, whatever this renders is
 * baked into the static HTML crawlers fetch.
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
