import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { proxyImageUrl } from '@/lib/proxyImage';

interface ProductImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  /** Shown in the fallback so a missing photo still identifies the product. */
  fallbackLabel?: string | null;
  sizeClassName?: string;
}

/**
 * A product photo that never renders as a broken image.
 *
 * There were three copies of this markup with three different behaviours:
 * `MarketplaceProductCard` handled load failures, `SearchResultCard` had no
 * `onError` at all, and `DealOfTheDay` had neither an error handler nor a
 * check — so a dead URL left the browser's broken-image glyph with the alt
 * text spilling out across the card. That is the single most prominent thing
 * on the marketplace when it happens.
 *
 * It happens often: 1,166 of the 13,631 products carry no `image_url`, and
 * scraped URLs go stale on top of that. So the absent state is a normal state,
 * not an edge case, and it gets a designed treatment rather than a glyph.
 */
const ProductImage = ({
  src,
  alt,
  className,
  fallbackLabel,
  sizeClassName = 'h-full w-full',
}: ProductImageProps) => {
  const proxied = proxyImageUrl(src ?? undefined);
  const [failed, setFailed] = useState(false);

  // A card can be recycled onto a different product as a list re-renders; the
  // previous product's failure must not blank out the new one's photo.
  useEffect(() => {
    setFailed(false);
  }, [proxied]);

  const showFallback = !proxied || failed;

  return (
    <div className={cn('relative overflow-hidden bg-white', sizeClassName, className)}>
      {showFallback ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-white/[0.10] to-white/[0.04] p-3">
          {/* The product's own words, not a generic box glyph — with no photo
              this is the only thing that tells you what you are looking at. */}
          <span className="line-clamp-3 text-center text-[11px] font-medium leading-snug text-white">
            {fallbackLabel || alt}
          </span>
        </div>
      ) : (
        <img
          src={proxied}
          alt={alt}
          className="h-full w-full object-contain p-3"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
};

export default ProductImage;
