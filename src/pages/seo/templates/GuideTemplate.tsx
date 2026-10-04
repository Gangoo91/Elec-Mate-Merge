import useSEO, { SEOSchemas } from '@/hooks/useSEO';
import { SEOPageShell } from '@/components/seo/SEOPageShell';
import { SEOReadingMeta } from '@/components/seo/SEOReadingMeta';
import { SEOKeyTakeaways } from '@/components/seo/SEOKeyTakeaways';
import { SEOAnswerBox } from '@/components/seo/SEOAnswerBox';
import { accentFor } from '@/components/seo/seoSurface';
import { SEOSectionHeading } from '@/components/seo/SEOSectionHeading';
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
  /**
   * Answer-first block rendered directly under the hero. The `question` is the
   * exact query searchers/AI engines ask; the `answer` is a concise (40-60 word)
   * direct answer. Wins featured snippets + Google AI Overview / LLM citations.
   * Ground the answer in the page's own content — do not introduce new facts.
   */
  answerBox?: { question: string; answer: string; detail?: string };
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
  /**
   * The hero button. Defaults to "Start 7-day free trial", which is a cold ask
   * to someone who came to look up a value. Say what the app does with the
   * thing this page is about instead ("Check every Zs reading automatically") —
   * the free-trial terms still sit directly underneath.
   */
  heroCtaLabel?: string;
  /** Extra schemas beyond Article + FAQ + Breadcrumb */
  extraSchemas?: Array<Record<string, unknown>>;
  /**
   * Override the mid-article lead magnet. Defaults to the BS 7671 A4:2026
   * cheatsheet, which suits most pages — pass a configured
   * <SEOInlineLeadMagnet> where the page has a topic-specific offer, so the
   * reader is not offered an unrelated download at peak intent.
   */
  leadMagnet?: React.ReactNode;
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

/**
 * Intent-matched mid-content CTA copy, keyed off the page badge. One generic
 * pitch per reader intent beats the kitchen-sink pitch repeated three times.
 */
function getMidCta(badge: string) {
  const b = badge.toLowerCase();
  if (b.includes('pricing') || b.includes('cost') || b.includes('business')) {
    return {
      title: 'Price the job in minutes, not evenings',
      description:
        'Professional quotes with the remedial estimator, then invoice from your phone the moment the work is done. From £6.99/mo.',
      ctaText: 'Try the quoting tools free',
    };
  }
  if (
    b.includes('test') ||
    b.includes('eicr') ||
    b.includes('certificat') ||
    b.includes('inspection')
  ) {
    return {
      title: 'Record test results hands-free on site',
      description:
        'AI board scanner, voice test entry, and automatic BS 7671 validation — finish the certificate before you leave the property. From £6.99/mo.',
      ctaText: 'Try the certificate tools free',
    };
  }
  if (
    b.includes('exam') ||
    b.includes('revision') ||
    b.includes('apprentice') ||
    b.includes('training') ||
    b.includes('course')
  ) {
    return {
      title: 'Practise with unlimited mock exams',
      description:
        'AI-generated mocks, instant marking, and explanations on every question — targeted at your weakest topics. From £6.99/mo.',
      ctaText: 'Start practising free',
    };
  }
  if (b.includes('safety') || b.includes('rams')) {
    return {
      title: 'Generate RAMS in minutes',
      description:
        'Site-specific risk assessments and method statements, written to CDM 2015 expectations and ready to send. From £6.99/mo.',
      ctaText: 'Try the safety tools free',
    };
  }
  return {
    title: 'Try Elec-Mate free for 7 days',
    description:
      '19 certificate types, 70+ calculators, RAMS, quoting, invoicing, AI agents, and 46+ training courses — from £6.99/mo.',
    ctaText: 'Start free trial',
  };
}

/**
 * Hero button wording by the page's badge, for pages that don't set
 * `heroCtaLabel` themselves. Only electrician- and apprentice-facing topics:
 * homeowner guides keep the plain free-trial wording, because telling a
 * homeowner to "do your EICRs on your phone" is wrong. Deliberately absent:
 * 'EICR Guide' and 'Solar Guide' (every one is a city page for people hiring),
 * 'Troubleshooting' ("doorbell not working") and 'Safety Guide' ("extension
 * lead safety") — mostly homeowner symptoms. Every line names something the
 * app really does.
 */
const HERO_CTA_BY_BADGE: Record<string, string> = {
  'Testing Guide': 'Record test results straight onto your certificate',
  'Installation Guide': 'Issue the certificate on your phone',
  'Wiring Guide': 'Issue the certificate on your phone',
  'Specialist Installation': 'Issue the certificate on your phone',
  'Symbol Reference': 'Draw plans with these symbols',
  'Business Guide': 'Quote and invoice from your phone',
  'Pricing Guide': 'Quote and invoice from your phone',
  'Finance Guide': 'Quote and invoice from your phone',
  'Apprentice Guide': 'Revise for your exams on your phone',
  'Training Guide': 'Revise for your exams on your phone',
  'Troubleshooting Guide': 'Find the fault faster with AI',
  'Fault Finding Guide': 'Find the fault faster with AI',
  'Regulations Guide': 'Get BS 7671 answers on site',
  Regulations: 'Get BS 7671 answers on site',
  'BS 7671 Guide': 'Get BS 7671 answers on site',
  'Regulation Deep-Dive': 'Get BS 7671 answers on site',
  'Technical Guide': 'Get BS 7671 answers on site',
  'EV Charging Guide': 'Issue EV charger certificates on your phone',
};

/**
 * "Test yourself" link to the matching free mock exam, shown before the FAQ.
 *
 * The mock exams are the site's best lead source, but the guides people read
 * while revising barely linked to them — the first aid and PAT mocks had no
 * in-article links at all. A contextual link from a relevant guide is the
 * internal link that actually moves a page, unlike the sitewide nav.
 * Page path is checked first (a PAT guide wears the generic "Testing Guide"
 * badge), then the badge. No match → nothing rendered.
 */
const PRACTICE_BY_PATH: Array<[RegExp, { href: string; name: string }]> = [
  [/pat-test/, { href: '/mock-exams/pat-testing', name: 'PAT testing mock exam' }],
  [
    /ev-charg|electric-car|ev-charger/,
    { href: '/mock-exams/ev-charging', name: 'EV charging mock exam' },
  ],
  [/fire-alarm/, { href: '/mock-exams/fire-alarm', name: 'fire alarm mock exam' }],
  [
    /emergency-lighting/,
    { href: '/mock-exams/emergency-lighting', name: 'emergency lighting mock exam' },
  ],
  [/first-aid/, { href: '/mock-exams/first-aid', name: 'first aid mock test' }],
  [/am2/, { href: '/mock-exams/am2-online-knowledge-test', name: 'AM2 mock exam' }],
];
const PRACTICE_BY_BADGE: Record<string, { href: string; name: string }> = {
  'Regulations Guide': { href: '/mock-exams/18th-edition-bs-7671', name: '18th Edition mock exam' },
  Regulations: { href: '/mock-exams/18th-edition-bs-7671', name: '18th Edition mock exam' },
  'BS 7671 Guide': { href: '/mock-exams/18th-edition-bs-7671', name: '18th Edition mock exam' },
  'Regulation Deep-Dive': {
    href: '/mock-exams/18th-edition-bs-7671',
    name: '18th Edition mock exam',
  },
  'Testing Guide': {
    href: '/mock-exams/2391-inspection-testing',
    name: '2391 inspection and testing mock exam',
  },
  'EV Charging Guide': { href: '/mock-exams/ev-charging', name: 'EV charging mock exam' },
  'Apprentice Guide': { href: '/mock-exams', name: 'Level 2, Level 3 and AM2 mock exams' },
  'Training Guide': { href: '/mock-exams', name: 'Level 2, Level 3 and AM2 mock exams' },
};
function getPractice(path: string, badge: string) {
  const hit = PRACTICE_BY_PATH.find(([re]) => re.test(path));
  return hit ? hit[1] : (PRACTICE_BY_BADGE[badge] ?? null);
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
  answerBox,
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
  heroCtaLabel,
  extraSchemas = [],
  embeddedTool,
  noindex = false,
  localArea,
  leadMagnet,
}: GuideTemplateProps) {
  const pageUrl = breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].href : '/';
  const practice = getPractice(pageUrl, badge);

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
      '@type': 'Person',
      name: 'Andrew Moore',
      jobTitle: 'Founder',
      url: 'https://www.elec-mate.com/',
      worksFor: {
        '@type': 'Organization',
        '@id': 'https://www.elec-mate.com/#organization',
        name: 'Elec-Mate',
      },
    },
    reviewedBy: {
      '@type': 'Person',
      name: 'Andrew Moore',
      jobTitle: 'Founder',
      worksFor: {
        '@type': 'Organization',
        '@id': 'https://www.elec-mate.com/#organization',
        name: 'Elec-Mate',
      },
    },
    lastReviewed: dateModified || datePublished,
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
    author: 'Andrew Moore',
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
              {heroCtaLabel ?? HERO_CTA_BY_BADGE[badge] ?? 'Start 7-day free trial'}{' '}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          }
        />
        <p className="mt-3 text-[11.5px] text-white">
          Free for 7 days · No charge until day 8 · Cancel anytime · Used by 2,100+ UK electricians
        </p>

        <div className="mt-6">
          <SEOReadingMeta readingTime={readingTime} dateUpdated={dateModified} />
        </div>

        <p className="mt-3 text-[11.5px] text-white leading-relaxed">
          Written and reviewed by Andrew Moore, founder of Elec-Mate, against BS 7671:2018+A4:2026,
          IET Guidance Note 3 and the IET On-Site Guide.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-6">
          <SEOSocialShare url={breadcrumbs[breadcrumbs.length - 1]?.href || '/'} title={title} />
          <SEOSocialFollow />
        </div>
      </section>

      {/* Answer-first block — direct answer under the H1 for featured snippets + AI citations */}
      {answerBox && (
        <section className="pb-8">
          <SEOAnswerBox {...answerBox} />
        </section>
      )}

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
            <SEOSectionHeading
              eyebrow={`${String(index + 1).padStart(2, '0')} · ${badge}`}
              title={section.heading}
            />
            <div className="mt-6 space-y-4 text-white leading-relaxed">{section.content}</div>
          </section>

          {/* Lead magnet email capture — after the first section, only on
              longer guides (5+ sections) where readers are committed enough
              to give an email. */}
          {index === 0 && sections.length >= 5 && (leadMagnet ?? <SEOInlineLeadMagnet />)}

          {/* Single mid-article CTA, intent-matched to the page type. One
              well-placed pitch converts better than the same generic pitch
              repeated every two sections (CTA fatigue). */}
          {index === Math.min(Math.floor(sections.length / 2), sections.length - 2) &&
            sections.length >= 3 && <SEOAppBridge {...getMidCta(badge)} icon={Zap} />}
        </div>
      ))}

      {/* How-To Steps */}
      {howToSteps && howToSteps.length > 0 && (
        <section id="how-to" className="pb-10 scroll-mt-24">
          <SEOHowToSteps steps={howToSteps} heading={howToHeading} description={howToDescription} />
        </section>
      )}

      {/* Test yourself — contextual link to the matching free mock exam */}
      {practice && practice.href !== pageUrl && (
        <section className="pb-10">
          <a
            href={practice.href}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] px-4 py-4 sm:px-5 touch-manipulation transition-colors hover:border-elec-yellow/50"
          >
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-elec-yellow">
                Test yourself
              </span>
              <span className="mt-1 block text-[15px] font-semibold text-white">
                Try the free {practice.name}
              </span>
              <span className="mt-0.5 block text-[13px] text-white">
                Timed, marked instantly, with an explanation on every question. No sign-up.
              </span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 text-elec-yellow transition-transform group-hover:translate-x-0.5" />
          </a>
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
          <SEOSectionHeading eyebrow="RELATED" title="Continue reading" />
          <div className="mt-6">
            <HubGrid columns={3}>
              {relatedPages.map((page) => {
                const accent = accentFor(page.category);
                return (
                  <Link
                    key={page.href}
                    to={page.href}
                    className="group relative flex min-h-[210px] flex-col bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-6 text-left transition-colors hover:from-white/[0.12] hover:to-white/[0.06] sm:p-7"
                  >
                    {/* Category rule — the one saturated mark on the card, and
                        it encodes what kind of page this is. */}
                    <span className={`h-[3px] w-9 shrink-0 rounded-full ${accent.rule}`} />
                    <p
                      className={`mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] ${accent.text}`}
                    >
                      {page.category}
                    </p>
                    <h3 className="mt-2.5 text-[20px] font-semibold leading-[1.15] tracking-[-0.02em] text-white sm:text-[22px]">
                      {page.title}
                    </h3>
                    <p className="mt-2.5 line-clamp-3 max-w-[34ch] text-[13.5px] leading-relaxed text-white">
                      {page.description}
                    </p>
                    <div className="flex-grow" />
                    <span className="mt-6 text-[13.5px] font-semibold text-elec-yellow">Read</span>
                  </Link>
                );
              })}
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
      <SEOStickyMobileCTA hideWhileVisible="section.bg-elec-yellow" />
    </SEOPageShell>
  );
}
