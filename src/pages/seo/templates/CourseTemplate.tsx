import useSEO, { SEOSchemas } from '@/hooks/useSEO';
import { SEOPageShell } from '@/components/seo/SEOPageShell';
import { SEOReadingMeta } from '@/components/seo/SEOReadingMeta';
import { SEOKeyTakeaways } from '@/components/seo/SEOKeyTakeaways';
import { SEOFAQAccordion } from '@/components/seo/SEOFAQAccordion';
import { SEORelatedPages, type RelatedPage } from '@/components/seo/SEORelatedPages';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import { SEOCourseOverview } from '@/components/seo/SEOCourseOverview';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOSocialShare } from '@/components/seo/SEOSocialShare';
import { SEOSocialFollow } from '@/components/seo/SEOSocialFollow';
import { ArrowRight, GraduationCap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { TOCItem } from '@/components/seo/SEOTableOfContents';
import type { BreadcrumbItem } from '@/components/seo/SEOBreadcrumbs';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ContentSection {
  id: string;
  heading: string;
  content: React.ReactNode;
}

interface ModuleItem {
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

export interface CourseTemplateProps {
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
  /** Course overview */
  courseDuration: string;
  courseLevel: string;
  coursePrerequisites?: string;
  courseModules?: number;
  courseCertification?: string;
  courseWhoIsItFor?: string;
  /** Content */
  keyTakeaways?: string[];
  sections: ContentSection[];
  modules?: ModuleItem[];
  features?: Feature[];
  featuresHeading?: string;
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
  coursePath: string;
}

export default function CourseTemplate({
  title,
  description,
  datePublished,
  dateModified,
  breadcrumbs,
  tocItems,
  badge = 'Training Course',
  badgeIcon: BadgeIcon = GraduationCap,
  heroTitle,
  heroSubtitle,
  readingTime,
  courseDuration,
  courseLevel,
  coursePrerequisites,
  courseModules,
  courseCertification,
  courseWhoIsItFor,
  keyTakeaways,
  sections,
  modules,
  features,
  featuresHeading = 'What You Get With Elec-Mate',
  faqs,
  faqHeading,
  relatedPages,
  ctaHeading,
  ctaSubheading,
  extraSchemas = [],
  coursePath,
}: CourseTemplateProps) {
  const courseSchema = SEOSchemas.course(title, description);
  const faqSchema = faqs.length > 0 ? SEOSchemas.faqPage(faqs) : null;

  const allSchemas = [courseSchema, ...(faqSchema ? [faqSchema] : []), ...extraSchemas];

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
          <a
            href="#modules"
            className="inline-flex items-center h-14 px-8 border border-white/20 hover:border-yellow-500/40 text-white font-semibold rounded-xl touch-manipulation transition-colors"
          >
            See the Modules
          </a>
        </div>

        <SEOReadingMeta readingTime={readingTime} dateUpdated={dateModified} />

        <div className="mt-4 flex flex-wrap items-center gap-6">
          <SEOSocialShare url={coursePath} title={title} />
          <SEOSocialFollow />
        </div>
      </section>

      {/* Course Overview Panel */}
      <section className="pb-10">
        <SEOCourseOverview
          duration={courseDuration}
          level={courseLevel}
          prerequisites={coursePrerequisites}
          modules={courseModules}
          certification={courseCertification}
          whoIsItFor={courseWhoIsItFor}
        />
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

      {/* Module List */}
      {modules && modules.length > 0 && (
        <section id="modules" className="pb-10 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Course Modules</h2>
          <div className="space-y-3">
            {modules.map((mod, index) => (
              <div
                key={mod.title}
                className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">{mod.title}</h3>
                  <p className="text-white text-sm leading-relaxed">{mod.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      {features && features.length > 0 && (
        <section id="features" className="pb-10 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">{featuresHeading}</h2>
          <SEOFeatureGrid features={features} columns={3} />
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
