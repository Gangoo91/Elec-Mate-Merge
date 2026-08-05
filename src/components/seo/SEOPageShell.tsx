import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOBreadcrumbs, type BreadcrumbItem } from '@/components/seo/SEOBreadcrumbs';
import { SEOTableOfContents, type TOCItem } from '@/components/seo/SEOTableOfContents';
import { SEOJumpNav, type JumpNavItem } from '@/components/seo/SEOJumpNav';

interface SEOPageShellProps {
  breadcrumbs: BreadcrumbItem[];
  tocItems: TOCItem[];
  children: React.ReactNode;
}

/**
 * Core SEO page layout:
 * - PublicPageLayout wrapper (nav + footer)
 * - Breadcrumbs at top
 * - Sticky jump nav below hero (all breakpoints)
 * - Article column at max-w-6xl, aligned with the nav container now that the
 *   right-hand TOC rail is gone and nothing competes for the width
 * - Floating Contents button → bottom sheet on mobile/tablet
 */
export function SEOPageShell({ breadcrumbs, tocItems, children }: SEOPageShellProps) {
  const jumpNavItems: JumpNavItem[] = tocItems;

  return (
    // overflow-x-clip contains the full-bleed CTA band, whose 100vw width
    // includes the scrollbar and would otherwise give every guide page a
    // horizontal scroll. `clip` NOT `hidden` on purpose: hidden creates a
    // scroll container and would kill the sticky jump nav — the same trap
    // documented on the cert shell header.
    <PublicPageLayout>
      <div className="overflow-x-clip">
        <SEOBreadcrumbs items={breadcrumbs} />

      {/* Jump nav — sticky horizontal TOC at every breakpoint. The right-hand
          "On this page" rail was removed 2026-08-05 (Andrew): it split the
          reader's attention, squeezed the article, and duplicated navigation
          this strip already provides. The article now owns the full column. */}
      <SEOJumpNav items={jumpNavItems} />

      {/* max-w-6xl matches the nav container, so the article lines up with the
          header rather than sitting in a narrow well with dead space either
          side. Individual text blocks set their own measure where a long line
          would hurt readability. */}
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-8 lg:py-12">{children}</div>

        {/* Floating Contents bottom sheet — mobile/tablet only */}
        <div className="lg:hidden">
          <SEOTableOfContents items={tocItems} />
        </div>
      </div>
    </PublicPageLayout>
  );
}
