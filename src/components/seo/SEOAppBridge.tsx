import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { StoreBadges } from '@/components/seo/StoreBadges';
import { trackSeoCtaClicked } from '@/lib/analytics-events';
import { CARD, LABEL, BTN_PRIMARY } from '@/components/seo/seoSurface';

interface SEOAppBridgeProps {
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  /** @deprecated Icons were removed from this surface; accepted so the ~200
   *  call sites that still pass one keep compiling. Ignored. */
  icon?: LucideIcon;
  showStoreBadges?: boolean;
}

/**
 * Mid-article bridge from the content to the product.
 *
 * Was a yellow-washed panel with a 4px yellow left rail and an icon tile —
 * over the near-black ground that wash rendered brown. Now a neutral cert
 * card with a saturated cyan eyebrow; the only yellow left is the button,
 * which is the thing we actually want looked at.
 */
export function SEOAppBridge({
  title,
  description,
  ctaText = 'Try it free for 7 days',
  ctaHref = '/auth/signup',
  showStoreBadges = true,
}: SEOAppBridgeProps) {
  return (
    <div className={`${CARD} my-8 p-5 sm:p-6`}>
      <p className={`${LABEL} text-sky-300`}>In the app</p>
      <h4 className="mt-2.5 text-[18px] font-bold leading-snug tracking-[-0.015em] text-white sm:text-[20px]">
        {title}
      </h4>
      <p className="mt-2 max-w-[58ch] text-[14.5px] leading-relaxed text-white">{description}</p>
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
        <Link
          to={ctaHref}
          onClick={() => trackSeoCtaClicked({ page: window.location.pathname, cta: ctaText })}
          className={`${BTN_PRIMARY} w-full sm:w-auto`}
        >
          {ctaText}
        </Link>
        {showStoreBadges && <StoreBadges size="sm" />}
      </div>
    </div>
  );
}
