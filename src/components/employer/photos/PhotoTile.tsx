import { useState, type ReactNode } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * One photo square. Shows the image, or a clear "Photo unavailable" tile when
 * there is no file (url null) or the browser cannot load it. Never a broken
 * image icon (ELE-1970).
 */
export function PhotoTile({
  url,
  alt,
  onClick,
  className,
  children,
  loading,
}: {
  url: string | null | undefined;
  alt: string;
  onClick?: () => void;
  className?: string;
  /** Overlays: badges, captions. */
  children?: ReactNode;
  /** Still signing the URL: show a quiet placeholder, not "unavailable". */
  loading?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const broken = !loading && (!url || failed);
  const body = (
    <>
      {url && !failed ? (
        <img
          src={url}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : broken ? (
        <span
          className={cn(
            'absolute inset-0 flex flex-col items-center gap-1.5 bg-white/[0.04] px-2 text-center',
            // Leave room for a caption overlay along the bottom.
            children ? 'justify-start pt-[18%]' : 'justify-center'
          )}
        >
          <ImageOff className="h-5 w-5 text-white" aria-hidden />
          <span className="text-[11px] font-medium leading-tight text-white">Photo unavailable</span>
        </span>
      ) : (
        <span className="absolute inset-0 animate-pulse bg-white/[0.06]" aria-hidden />
      )}
      {children}
    </>
  );
  const base = cn(
    'relative block aspect-square overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.04]',
    className
  );
  return onClick ? (
    <button
      type="button"
      onClick={onClick}
      aria-label={broken ? `${alt} (photo unavailable)` : alt}
      className={cn(
        base,
        'touch-manipulation transition-colors hover:border-white/[0.2] focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60 active:scale-[0.99]'
      )}
    >
      {body}
    </button>
  ) : (
    <div className={base}>{body}</div>
  );
}
