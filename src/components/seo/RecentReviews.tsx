import { Star } from 'lucide-react';
import { APP_STORE_REVIEWS } from '@/constants/app-reviews';

interface RecentReviewsProps {
  className?: string;
  /** How many reviews to render. Defaults to 3. */
  count?: number;
  /** Render compact (single-row) vs full card. Defaults to 'card'. */
  variant?: 'card' | 'compact';
  /** Section heading. Defaults to "What electricians say". */
  heading?: string;
}

/**
 * Real Apple App Store reviews — built-time cached from the ASC API.
 *
 * Required wherever a page emits SoftwareApplication / Product schema with an
 * aggregateRating: Google's structured-data policy demands that the
 * individual reviews backing the aggregate are visible on the same page.
 *
 * Doubles as conversion social proof — real names, real text, real platform.
 */
export function RecentReviews({
  className = '',
  count = 3,
  variant = 'card',
  heading = 'What electricians say',
}: RecentReviewsProps) {
  const reviews = APP_STORE_REVIEWS.slice(0, count);
  if (reviews.length === 0) return null;

  if (variant === 'compact') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {reviews.map((r) => (
          <div key={r.id} className="flex items-start gap-3 text-sm">
            <Stars rating={r.rating} small />
            <div className="flex-1">
              <span className="font-medium text-white">{r.reviewerNickname}</span>
              <span className="text-white/70"> — {r.title}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section
      aria-labelledby="recent-reviews-heading"
      className={`py-8 sm:py-12 ${className}`}
    >
      <h2
        id="recent-reviews-heading"
        className="text-2xl sm:text-3xl font-bold text-white mb-2"
      >
        {heading}
      </h2>
      <p className="text-sm text-white/70 mb-6">
        Verified reviews from the UK App Store.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviews.map((r) => (
          <article
            key={r.id}
            // itemtype + itemscope so Google can verify the schema's aggregate
            // is backed by visible reviews on this page.
            itemScope
            itemType="https://schema.org/Review"
            className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col gap-3"
          >
            <Stars rating={r.rating} />
            <h3
              itemProp="name"
              className="text-base font-semibold text-white leading-snug"
            >
              {r.title}
            </h3>
            <p
              itemProp="reviewBody"
              className="text-sm text-white/80 leading-relaxed line-clamp-6"
            >
              {r.body}
            </p>
            <footer className="mt-auto pt-2 flex items-center justify-between text-xs text-white/60">
              <span itemProp="author" itemScope itemType="https://schema.org/Person">
                <span itemProp="name">{r.reviewerNickname}</span>
              </span>
              <span>Apple App Store · {r.territory}</span>
            </footer>
            <meta itemProp="datePublished" content={r.createdDate} />
            <meta itemProp="reviewRating" content={String(r.rating)} />
          </article>
        ))}
      </div>
    </section>
  );
}

function Stars({ rating, small = false }: { rating: number; small?: boolean }) {
  const size = small ? 'w-3.5 h-3.5' : 'w-4 h-4';
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${size} ${
            i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'
          }`}
        />
      ))}
    </div>
  );
}
