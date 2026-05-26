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
 * - Sticky jump nav below hero
 * - Full-width content column (max-w-6xl — matches the nav width so the
 *   page feels harmonious on desktop. Individual sections constrain text
 *   columns to ~3xl inside this for readability where needed.)
 * - Mobile: floating Contents button → bottom sheet
 */
export function SEOPageShell({ breadcrumbs, tocItems, children }: SEOPageShellProps) {
  const jumpNavItems: JumpNavItem[] = tocItems;

  return (
    <PublicPageLayout>
      <SEOBreadcrumbs items={breadcrumbs} />

      {/* Jump nav — sticks below the main nav on scroll */}
      <SEOJumpNav items={jumpNavItems} />

      {/* Full-width content — 1152px matches the nav container */}
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-8 lg:py-12">{children}</div>

      {/* Mobile TOC bottom sheet */}
      <SEOTableOfContents items={tocItems} />
    </PublicPageLayout>
  );
}
