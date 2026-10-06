import { forwardRef, useEffect, useState, type ImgHTMLAttributes } from 'react';
import { cachedSafetyPhoto, resolveSafetyPhoto } from '@/utils/storagePhoto';
import { cn } from '@/lib/utils';

/**
 * <img> for a stored site photo. Drop-in for `<img src={photo.file_url}>`:
 * a safety-photos URL is swapped for a short-lived signed link (see
 * utils/storagePhoto.ts); anything else renders as given.
 *
 * Nothing renders until the link is known, rather than requesting the public
 * URL first — once the bucket is private that request would 400 and flash a
 * broken image.
 */
export const StoragePhoto = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement>>(
  ({ src, ...rest }, ref) => {
    const [url, setUrl] = useState<string | null>(() => cachedSafetyPhoto(src));
    useEffect(() => {
      let live = true;
      const cached = cachedSafetyPhoto(src);
      if (cached) {
        setUrl(cached);
        return;
      }
      setUrl(null);
      void resolveSafetyPhoto(src).then((u) => live && setUrl(u || null));
      return () => {
        live = false;
      };
    }, [src]);
    // eslint-disable-next-line jsx-a11y/alt-text
    return url ? (
      <img ref={ref} src={url} {...rest} />
    ) : (
      <span aria-hidden className={cn('block bg-white/[0.04]', rest.className)} />
    );
  }
);
StoragePhoto.displayName = 'StoragePhoto';

/** Hook form, for places that need the URL itself (a background image, a fetch). */
export function useStoragePhoto(src: string | null | undefined): string | null {
  const [url, setUrl] = useState<string | null>(() => cachedSafetyPhoto(src));
  useEffect(() => {
    let live = true;
    void resolveSafetyPhoto(src).then((u) => live && setUrl(u || null));
    return () => {
      live = false;
    };
  }, [src]);
  return url;
}
