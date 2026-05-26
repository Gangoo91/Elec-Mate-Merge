import useSEO, { SEOSchemas } from '@/hooks/useSEO';
import { SEOPageShell } from '@/components/seo/SEOPageShell';
import { SEOReadingMeta } from '@/components/seo/SEOReadingMeta';
import { SEOKeyTakeaways } from '@/components/seo/SEOKeyTakeaways';
import { SEOFAQAccordion } from '@/components/seo/SEOFAQAccordion';
import { type RelatedPage } from '@/components/seo/SEORelatedPages';
import { RecentReviews } from '@/components/seo/RecentReviews';
import { SEOStickyMobileCTA } from '@/components/seo/SEOStickyMobileCTA';
import { SEOInlineLeadMagnet } from '@/components/seo/SEOInlineLeadMagnet';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOSocialShare } from '@/components/seo/SEOSocialShare';
import { SEOSocialFollow } from '@/components/seo/SEOSocialFollow';
import { SEOHowToSteps } from '@/components/seo/SEOHowToSteps';
import { SEOSocialProofBar } from '@/components/seo/SEOSocialProofBar';
import { SEOTestimonialStrip } from '@/components/seo/SEOTestimonialStrip';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import type { TOCItem } from '@/components/seo/SEOTableOfContents';
import type { BreadcrumbItem } from '@/components/seo/SEOBreadcrumbs';
import { PageHero, Eyebrow, HubGrid, SectionHeader } from '@/components/college/primitives';

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
  /**
   * Optional embedded tool / calculator rendered directly under the hero.
   * Guides that explain a calculation should ship the actual calc — users
   * search for "voltage drop calculator", they should land on a working tool,
   * not a wall of text.
   */
  embeddedTool?: React.ReactNode;
  /**
   * If true, emits <meta name="robots" content="noindex, nofollow">.
   * Use for cannibalisation losers + thin pages awaiting deletion. The
   * 301 redirect in public/_redirects handles user traffic; noindex tells
   * Google to drop the URL from the index faster.
   */
  noindex?: boolean;
  /**
   * Set to the city/area name (e.g. "Swindon") on local hub pages to emit
   * Service schema with `areaServed`. Wins local-pack visibility on
   * "electrician in {city}" searches.
   */
  localArea?: string;
}

export default function GuideTemplate({
  title,
  description,
  datePublished,
  dateModified,
  breadcrumbs,
  tocItems,
  badge = 'Guide',
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
  embeddedTool,
  noindex = false,
  localArea,
}: GuideTemplateProps) {
  const pageUrl = breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].href : '/';

  const articleSchema = SEOSchemas.article(title, description, datePublished, dateModified);

  // WebPage schema — tells Google this is a standalone educational page with clear author/publisher
  const webPageSchema = {
    '@type': 'WebPage',
    '@id': `https://www.elec-mate.com${pageUrl}`,
    url: `https://www.elec-mate.com${pageUrl}`,
    name: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage: 'en-GB',
    isPartOf: { '@id': 'https://www.elec-mate.com/#website' },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.elec-mate.com/#organization',
      name: 'Elec-Mate',
    },
    author: {
      '@type': 'Organization',
      name: 'Elec-Mate Technical Team',
      url: 'https://www.elec-mate.com',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.elec-mate.com/' },
        ...breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 2,
          name: b.label,
          item: `https://www.elec-mate.com${b.href}`,
        })),
      ],
    },
  };

  const faqSchema = faqs.length > 0 ? SEOSchemas.faqPage(faqs) : null;
  const howToSchema =
    howToSteps && howToSteps.length > 0
      ? SEOSchemas.howTo(howToHeading || title, howToDescription || description, howToSteps)
      : null;

  const serviceSchema = localArea
    ? SEOSchemas.service(localArea, `https://www.elec-mate.com${pageUrl}`, description)
    : null;

  const allSchemas = [
    webPageSchema,
    articleSchema,
    ...(faqSchema ? [faqSchema] : []),
    ...(howToSchema ? [howToSchema] : []),
    ...(serviceSchema ? [serviceSchema] : []),
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
    noindex,
  });

  return (
    <SEOPageShell breadcrumbs={breadcrumbs} tocItems={tocItems}>
      {/* Hero — editorial style */}
      <section className="pb-8">
        <PageHero
          eyebrow={badge.toUpperCase()}
          title={heroTitle}
          description={heroSubtitle}
          tone="yellow"
          actions={
            <a
              href="/auth/signup"
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold text-[13px] touch-manipulation transition-colors"
            >
              Start 7-day free trial <ArrowRight className="w-3.5 h-3.5" />
            </a>
          }
        />
        <p className="mt-3 text-[11.5px] text-white/60">
          No card required · Free for 7 days · Cancel anytime · Used by 1,000+ UK electricians
        </p>

        <div className="mt-6">
          <SEOReadingMeta readingTime={readingTime} dateUpdated={dateModified} />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-6">
          <SEOSocialShare url={breadcrumbs[breadcrumbs.length - 1]?.href || '/'} title={title} />
          <SEOSocialFollow />
        </div>
      </section>

      {/* Live embedded tool — free, no signup, BS 7671:2018+A4:2026 compliant.
          Guides about a calculation ship the working calc, not a screenshot. */}
      {embeddedTool && (
        <section id="calculator" className="pb-10 scroll-mt-24">
          {embeddedTool}
        </section>
      )}

      {/* Social Proof Bar */}
      <SEOSocialProofBar />

      {/* Key Takeaways */}
      {keyTakeaways && keyTakeaways.length > 0 && (
        <section className="pb-10">
          <SEOKeyTakeaways takeaways={keyTakeaways} />
        </section>
      )}

      {/* Content Sections — editorial, numbered, with auto mid-content CTAs every 2 sections */}
      {sections.map((section, index) => (
        <div key={section.id}>
          <section id={section.id} className="pb-10 scroll-mt-24">
            <SectionHeader
              eyebrow={`${String(index + 1).padStart(2, '0')} · ${badge}`}
              title={section.heading}
            />
            <div className="mt-6 space-y-4 text-white leading-relaxed">{section.content}</div>
          </section>

          {/* Lead magnet email capture — after the first section, only on
              longer guides (5+ sections) where readers are committed enough
              to give an email. */}
          {index === 0 && sections.length >= 5 && <SEOInlineLeadMagnet />}

          {/* Insert mid-content CTA after every 2nd section (but not the last) */}
          {(index + 1) % 2 === 0 && index < sections.length - 1 && (
            <SEOAppBridge
              title="Try Elec-Mate free for 7 days"
              description="16 certificate types, 70+ calculators, RAMS, quoting, invoicing, AI agents, and 46+ training courses — from £5.99/mo."
              ctaText="Start free trial"
              icon={Zap}
            />
          )}
        </div>
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

      {/* Related Pages — editorial cards with real <a> tags for SEO link equity */}
      {relatedPages.length > 0 && (
        <section id="related" className="pb-10 scroll-mt-24">
          <SectionHeader eyebrow="RELATED" title="Continue reading" />
          <div className="mt-6">
            <HubGrid columns={3}>
              {relatedPages.map((page, i) => (
                <Link
                  key={page.href}
                  to={page.href}
                  className="group relative bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-6 sm:p-7 lg:p-8 text-left min-h-[200px] sm:min-h-[240px] flex flex-col"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/80 via-amber-400/70 to-orange-400/70 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <Eyebrow className="truncate">
                    {String(i + 1).padStart(2, '0')} · {page.category}
                  </Eyebrow>
                  <h3 className="mt-4 text-xl sm:text-2xl lg:text-[26px] font-semibold text-white tracking-tight leading-[1.1]">
                    {page.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-white max-w-[34ch] line-clamp-3">
                    {page.description}
                  </p>
                  <div className="flex-grow" />
                  <div className="mt-6 flex items-center justify-end pt-4 border-t border-white/[0.06]">
                    <span className="text-[13px] font-medium text-elec-yellow/90 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all">
                      Read →
                    </span>
                  </div>
                </Link>
              ))}
            </HubGrid>
          </div>
        </section>
      )}

      {/* Verified App Store reviews — schema-policy compliance + conversion */}
      <RecentReviews />

      {/* Testimonials — social proof before the final CTA */}
      <SEOTestimonialStrip />

      {/* CTA */}
      <SEOCTASection heading={ctaHeading} subheading={ctaSubheading} />

      <div className="h-24 sm:hidden" />
      <SEOStickyMobileCTA />
    </SEOPageShell>
  );
}
