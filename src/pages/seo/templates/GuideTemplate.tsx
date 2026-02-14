import useSEO, { SEOSchemas } from '@/hooks/useSEO';
import { SEOPageShell } from '@/components/seo/SEOPageShell';
import { SEOReadingMeta } from '@/components/seo/SEOReadingMeta';
import { SEOKeyTakeaways } from '@/components/seo/SEOKeyTakeaways';
import { SEOFAQAccordion } from '@/components/seo/SEOFAQAccordion';
import { SEORelatedPages, type RelatedPage } from '@/components/seo/SEORelatedPages';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOSocialShare } from '@/components/seo/SEOSocialShare';
import { SEOSocialFollow } from '@/components/seo/SEOSocialFollow';
import { SEOHowToSteps } from '@/components/seo/SEOHowToSteps';
import { ArrowRight, FileCheck2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { TOCItem } from '@/components/seo/SEOTableOfContents';
import type { BreadcrumbItem } from '@/components/seo/SEOBreadcrumbs';

interface ContentSection {
  id: string;
  heading: string;
  content: React.ReactNode;
}

interface HowToStep {
  name: string;
  text: string;
}

interface FAQ {
  question: string;
  answer: string;
}

export interface GuideTemplateProps {
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
  /** Content */
  keyTakeaways?: string[];
  sections: ContentSection[];
  howToSteps?: HowToStep[];
  howToHeading?: string;
  howToDescription?: string;
  /** FAQ + Related */
  faqs: FAQ[];
  faqHeading?: string;
  relatedPages: RelatedPage[];
  /** CTA */
  ctaHeading?: string;
  ctaSubheading?: string;
  /** Extra schemas beyond Article + FAQ + Breadcrumb */
  extraSchemas?: Array<Record<string, unknown>>;
}

export default function GuideTemplate({
  title,
  description,
  datePublished,
  dateModified,
  breadcrumbs,
  tocItems,
  badge = 'Guide',
  badgeIcon: BadgeIcon = FileCheck2,
  heroTitle,
  heroSubtitle,
  readingTime,
  keyTakeaways,
  sections,
  howToSteps,
  howToHeading,
  howToDescription,
  faqs,
  faqHeading,
  relatedPages,
  ctaHeading,
  ctaSubheading,
  extraSchemas = [],
}: GuideTemplateProps) {
  const articleSchema = SEOSchemas.article(title, description, datePublished, dateModified);
  const faqSchema = faqs.length > 0 ? SEOSchemas.faqPage(faqs) : null;
  const howToSchema =
    howToSteps && howToSteps.length > 0
      ? SEOSchemas.howTo(howToHeading || title, howToDescription || description, howToSteps)
      : null;

  const allSchemas = [
    articleSchema,
    ...(faqSchema ? [faqSchema] : []),
    ...(howToSchema ? [howToSchema] : []),
    ...extraSchemas,
  ];

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
            Start 7-Day Free Trial <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <SEOReadingMeta readingTime={readingTime} dateUpdated={dateModified} />

        <div className="mt-4 flex flex-wrap items-center gap-6">
          <SEOSocialShare url={breadcrumbs[breadcrumbs.length - 1]?.href || '/'} title={title} />
          <SEOSocialFollow />
        </div>
      </section>

      {/* Key Takeaways */}
      {keyTakeaways && keyTakeaways.length > 0 && (
        <section className="pb-10">
          <SEOKeyTakeaways takeaways={keyTakeaways} />
        </section>
      )}

      {/* Content Sections */}
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="pb-10 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">{section.heading}</h2>
          <div className="space-y-4 text-white leading-relaxed">{section.content}</div>
        </section>
      ))}

      {/* How-To Steps */}
      {howToSteps && howToSteps.length > 0 && (
        <section id="how-to" className="pb-10 scroll-mt-24">
          <SEOHowToSteps steps={howToSteps} heading={howToHeading} description={howToDescription} />
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
