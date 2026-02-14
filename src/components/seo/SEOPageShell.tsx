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
 * - Full-width content column (max-w-4xl)
 * - Mobile: floating Contents button → bottom sheet
 */
export function SEOPageShell({ breadcrumbs, tocItems, children }: SEOPageShellProps) {
  const jumpNavItems: JumpNavItem[] = tocItems;

  return (
    <PublicPageLayout>
      <SEOBreadcrumbs items={breadcrumbs} />

      {/* Jump nav — sticks below the main nav on scroll */}
      <SEOJumpNav items={jumpNavItems} />

      {/* Full-width content */}
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 py-8">{children}</div>

      {/* Mobile TOC bottom sheet */}
      <SEOTableOfContents items={tocItems} />
    </PublicPageLayout>
  );
}
