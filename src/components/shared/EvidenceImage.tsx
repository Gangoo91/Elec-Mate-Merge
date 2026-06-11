import { type ImgHTMLAttributes } from 'react';
import { useEvidenceUrl } from '@/lib/evidenceUrl';

/* ==========================================================================
   EvidenceImage — drop-in <img> for stored evidence references.

   Resolves the stored value (public URL / path) to a signed URL via
   useEvidenceUrl, so display sites don't care whether the bucket is public or
   private. Swap `<img src={file.url} .../>` for `<EvidenceImage src={file.url} .../>`.
   Renders nothing until a URL is available (avoids a flash of a broken/forbidden
   image during the async sign).
   ========================================================================== */

interface EvidenceImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null;
}

export function EvidenceImage({ src, alt = '', ...rest }: EvidenceImageProps) {
  const url = useEvidenceUrl(src);
  if (!url) return null;
  return <img src={url} alt={alt} {...rest} />;
}
