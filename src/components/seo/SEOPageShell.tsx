import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOBreadcrumbs, type BreadcrumbItem } from '@/components/seo/SEOBreadcrumbs';
import { SEOTableOfContents, type TOCItem } from '@/components/seo/SEOTableOfContents';
import { SEODesktopTOC } from '@/components/seo/SEODesktopTOC';
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

      {/* Jump nav — horizontal sticky TOC on mobile/tablet only; desktop uses
          the sticky "On this page" sidebar instead (hidden lg+ to avoid dupes) */}
      <div className="lg:hidden">
        <SEOJumpNav items={jumpNavItems} />
      </div>

      {/* Content — single column on mobile/tablet; on desktop (lg+) a 2-column
          grid puts the article beside a sticky "On this page" TOC, using what
          was previously dead right-hand space. 1152px matches the nav container. */}
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_232px] lg:gap-12">
          <div className="min-w-0">{children}</div>
          <aside className="hidden lg:block">
            <SEODesktopTOC items={tocItems} />
          </aside>
        </div>
      </div>

      {/* Floating Contents bottom sheet — mobile/tablet only */}
      <div className="lg:hidden">
        <SEOTableOfContents items={tocItems} />
      </div>
    </PublicPageLayout>
  );
}
