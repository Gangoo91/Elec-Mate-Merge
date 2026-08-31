import { useEffect, useState, type ImgHTMLAttributes, type ReactNode } from 'react';
import { ImageOff } from 'lucide-react';
import { useEvidenceUrl } from '@/lib/evidenceUrl';

/* ==========================================================================
   EvidenceImage — drop-in <img> for stored evidence references.

   Resolves the stored value (public URL / path) to a signed URL via
   useEvidenceUrl, so display sites don't care whether the bucket is public or
   private. Swap `<img src={file.url} .../>` for `<EvidenceImage src={file.url} .../>`.
   Renders nothing until a URL is available (avoids a flash of a broken/forbidden
   image during the async sign).

   🔴 It also has to survive the URL signing FINE and the image then failing —
   the file was deleted from the bucket, the path is stale, the network dropped.
   Previously that fell through to the browser's default broken-image
   behaviour: the raw `alt` text, unstyled and unconstrained, painted at full
   font size. On the portfolio grid that meant an entry titled "Site Diary:
   sellafield — 14 Feb 2026" sprawling out of its own tile and over the status
   chips. A missing thumbnail should look deliberate, not broken.
   ========================================================================== */

interface EvidenceImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null;
  /**
   * Shown when the image cannot load. Defaults to a muted icon that fills the
   * space the picture would have taken, so surrounding layout does not jump.
   */
  fallback?: ReactNode;
}

export function EvidenceImage({ src, alt = '', fallback, className, ...rest }: EvidenceImageProps) {
  const url = useEvidenceUrl(src);
  const [failed, setFailed] = useState(false);

  // A new source deserves a fresh attempt — otherwise one bad URL poisons the
  // component for every subsequent entry it is reused for in a list.
  useEffect(() => {
    setFailed(false);
  }, [url]);

  if (!url) return null;

  if (failed) {
    return (
      fallback ?? (
        <div
          className={className}
          // aria-hidden: the alt text is what broke the layout, and the entry's
          // own title is already adjacent in every place this is used.
          aria-hidden
        >
          <div className="flex h-full w-full items-center justify-center bg-white/[0.03]">
            <ImageOff className="h-6 w-6 text-white/40" />
          </div>
        </div>
      )
    );
  }

  return <img src={url} alt={alt} className={className} onError={() => setFailed(true)} {...rest} />;
}
