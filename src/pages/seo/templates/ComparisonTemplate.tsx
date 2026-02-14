import useSEO, { SEOSchemas } from '@/hooks/useSEO';
import { SEOPageShell } from '@/components/seo/SEOPageShell';
import { SEOReadingMeta } from '@/components/seo/SEOReadingMeta';
import { SEOKeyTakeaways } from '@/components/seo/SEOKeyTakeaways';
import { SEOFAQAccordion } from '@/components/seo/SEOFAQAccordion';
import { SEORelatedPages, type RelatedPage } from '@/components/seo/SEORelatedPages';
import { SEOComparisonTable } from '@/components/seo/SEOComparisonTable';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOSocialShare } from '@/components/seo/SEOSocialShare';
import { SEOSocialFollow } from '@/components/seo/SEOSocialFollow';
import { ArrowRight, Zap, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { TOCItem } from '@/components/seo/SEOTableOfContents';
import type { BreadcrumbItem } from '@/components/seo/SEOBreadcrumbs';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ComparisonRow {
  feature: string;
  values: Array<boolean | string | null>;
}

interface ContentSection {
  id: string;
  heading: string;
  content: React.ReactNode;
}

interface FAQ {
  question: string;
  answer: string;
}

export interface ComparisonTemplateProps {
  /** SEO */
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  /** Navigation */
  breadcrumbs: BreadcrumbItem[];
  tocItems: TOCItem[];
  /** Hero */
  badge?: string;
  badgeIcon?: LucideIcon;
  heroTitle: React.ReactNode;
  heroSubtitle: string;
  readingTime: number;
  /** Comparison table */
  comparisonColumns: string[];
  comparisonRows: ComparisonRow[];
  comparisonHeading?: string;
  /** Content */
  keyTakeaways?: string[];
  sections?: ContentSection[];
  /** Verdict */
  verdictHeading?: string;
  verdictContent?: React.ReactNode;
  /** Features unique to Elec-Mate */
  uniqueFeatures?: Feature[];
  uniqueFeaturesHeading?: string;
  /** FAQ + Related */
  faqs: FAQ[];
  faqHeading?: string;
  relatedPages: RelatedPage[];
  /** CTA */
  ctaHeading?: string;
  ctaSubheading?: string;
  /** Extra schemas */
  extraSchemas?: Array<Record<string, unknown>>;
  /** URL path */
  comparePath: string;
}

export default function ComparisonTemplate({
  title,
  description,
  datePublished,
  dateModified,
  breadcrumbs,
  tocItems,
  badge = 'Comparison',
  badgeIcon: BadgeIcon = Zap,
  heroTitle,
  heroSubtitle,
  readingTime,
  comparisonColumns,
  comparisonRows,
  comparisonHeading = 'Feature Comparison',
  keyTakeaways,
  sections,
  verdictHeading = 'The Verdict',
  verdictContent,
  uniqueFeatures,
  uniqueFeaturesHeading = 'What Only Elec-Mate Offers',
  faqs,
  faqHeading,
  relatedPages,
  ctaHeading,
  ctaSubheading,
  extraSchemas = [],
  comparePath,
}: ComparisonTemplateProps) {
  const articleSchema = SEOSchemas.article(title, description, datePublished, dateModified);
  const faqSchema = faqs.length > 0 ? SEOSchemas.faqPage(faqs) : null;

  const allSchemas = [articleSchema, ...(faqSchema ? [faqSchema] : []), ...extraSchemas];

  useSEO({
    title,
    description,
    schemas: allSchemas,
    breadcrumbs: [
      { name: 'Home', url: '/' },
      ...breadcrumbs.map((b) => ({ name: b.label, url: b.href || '' })),
    ],
    datePublished,
    dateModified,
    author: 'Elec-Mate Technical Team',
  });

  return (
    <SEOPageShell breadcrumbs={breadcrumbs} tocItems={tocItems}>
      {/* Hero */}
      <section className="pb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-5">
          <BadgeIcon className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-yellow-400">{badge}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
          {heroTitle}
        </h1>

        <p className="text-lg text-white leading-relaxed mb-6">{heroSubtitle}</p>

        <div className="flex flex-wrap gap-3 mb-6">
          <a
            href="/auth/signup"
            className="inline-flex items-center gap-2 h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation transition-colors"
          >
            Try Elec-Mate Free <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#comparison"
            className="inline-flex items-center h-14 px-8 border border-white/20 hover:border-yellow-500/40 text-white font-semibold rounded-xl touch-manipulation transition-colors"
          >
            See the Comparison
          </a>
        </div>

        <SEOReadingMeta readingTime={readingTime} dateUpdated={dateModified} />

        <div className="mt-4 flex flex-wrap items-center gap-6">
          <SEOSocialShare url={comparePath} title={title} />
          <SEOSocialFollow />
        </div>
      </section>

      {/* Key Takeaways */}
      {keyTakeaways && keyTakeaways.length > 0 && (
        <section className="pb-10">
          <SEOKeyTakeaways takeaways={keyTakeaways} />
        </section>
      )}

      {/* Content Sections (before comparison) */}
      {sections &&
        sections.map((section) => (
          <section key={section.id} id={section.id} className="pb-10 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">{section.heading}</h2>
            <div className="space-y-4 text-white leading-relaxed">{section.content}</div>
          </section>
        ))}

      {/* Comparison Table */}
      <section id="comparison" className="pb-10 scroll-mt-24">
        <SEOComparisonTable
          columns={comparisonColumns}
          rows={comparisonRows}
          heading={comparisonHeading}
        />
        <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a
            href="/auth/signup"
            className="inline-flex items-center gap-2 h-11 px-6 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation transition-colors"
          >
            Switch to Elec-Mate <ArrowRight className="w-4 h-4" />
          </a>
          <span className="text-sm text-white">7-day free trial. No card required.</span>
        </div>
      </section>

      {/* Verdict */}
      {verdictContent && (
        <section id="verdict" className="pb-10 scroll-mt-24">
          <div className="rounded-2xl bg-gradient-to-br from-yellow-500/10 via-yellow-600/5 to-transparent border border-yellow-500/20 p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/25 mb-5">
              <Check className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">
                Verdict
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{verdictHeading}</h2>
            <div className="space-y-4 text-white leading-relaxed">{verdictContent}</div>
          </div>
        </section>
      )}

      {/* Unique Features */}
      {uniqueFeatures && uniqueFeatures.length > 0 && (
        <section id="unique-features" className="pb-10 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            {uniqueFeaturesHeading}
          </h2>
          <SEOFeatureGrid features={uniqueFeatures} columns={3} />
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section id="faq" className="pb-10 scroll-mt-24">
          <SEOFAQAccordion faqs={faqs} heading={faqHeading} />
        </section>
      )}

      {/* Related Pages */}
      {relatedPages.length > 0 && (
        <section id="related" className="pb-10 scroll-mt-24">
          <SEORelatedPages pages={relatedPages} />
        </section>
      )}

      {/* CTA */}
      <SEOCTASection heading={ctaHeading} subheading={ctaSubheading} />

      <div className="h-16 sm:hidden" />
    </SEOPageShell>
  );
}
