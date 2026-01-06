import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, Link as LinkIcon, X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface LinkPreviewData {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  favicon?: string;
}

interface LinkPreviewProps {
  url: string;
  className?: string;
  onRemove?: () => void;
}

// URL regex pattern
const URL_REGEX = /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;

/**
 * Extract URLs from text
 */
export function extractUrls(text: string): string[] {
  const matches = text.match(URL_REGEX);
  return matches ? [...new Set(matches)] : [];
}

/**
 * Check if URL is an image
 */
export function isImageUrl(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
}

/**
 * Link preview component
 */
export function LinkPreview({ url, className, onRemove }: LinkPreviewProps) {
  const [preview, setPreview] = useState<LinkPreviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        setLoading(true);
        setError(false);

        // For now, we'll create a basic preview from the URL
        // In production, you'd want a server-side endpoint to fetch Open Graph data
        const urlObj = new URL(url);

        setPreview({
          url,
          title: urlObj.hostname,
          siteName: urlObj.hostname.replace('www.', ''),
          favicon: `${urlObj.origin}/favicon.ico`,
        });
      } catch (err) {
        console.error('Error fetching link preview:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, [url]);

  // If it's an image URL, show image directly
  if (isImageUrl(url)) {
    return (
      <div className={cn('relative group max-w-sm', className)}>
        <img
          src={url}
          alt="Linked image"
          className="rounded-lg max-h-[200px] object-cover cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => window.open(url, '_blank')}
        />
        {onRemove && (
          <button
            onClick={onRemove}
            className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className={cn('flex gap-3 p-3 rounded-lg border border-border bg-muted/30 max-w-sm', className)}>
        <Skeleton className="w-16 h-16 rounded shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    );
  }

  if (error || !preview) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'flex items-center gap-2 text-sm text-blue-500 hover:underline',
          className
        )}
      >
        <LinkIcon className="h-4 w-4" />
        <span className="truncate">{url}</span>
        <ExternalLink className="h-3 w-3 shrink-0" />
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'block rounded-lg border border-border bg-muted/30 overflow-hidden hover:bg-muted/50 transition-colors max-w-sm group',
        className
      )}
    >
      {preview.image && (
        <div className="w-full h-32 bg-muted">
          <img
            src={preview.image}
            alt={preview.title || 'Link preview'}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          {preview.favicon && (
            <img
              src={preview.favicon}
              alt=""
              className="w-4 h-4"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <span className="text-xs text-muted-foreground truncate">
            {preview.siteName || new URL(url).hostname}
          </span>
          <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-auto shrink-0" />
        </div>
        {preview.title && (
          <h4 className="font-medium text-sm line-clamp-2">{preview.title}</h4>
        )}
        {preview.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
            {preview.description}
          </p>
        )}
      </div>
      {onRemove && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </a>
  );
}

/**
 * Auto-detect and render link previews in text
 */
interface AutoLinkPreviewProps {
  text: string;
  maxPreviews?: number;
  className?: string;
}

export function AutoLinkPreview({ text, maxPreviews = 1, className }: AutoLinkPreviewProps) {
  const urls = extractUrls(text).slice(0, maxPreviews);

  if (urls.length === 0) return null;

  return (
    <div className={cn('space-y-2 mt-2', className)}>
      {urls.map((url, index) => (
        <LinkPreview key={`${url}-${index}`} url={url} />
      ))}
    </div>
  );
}

/**
 * Render text with clickable links
 */
export function TextWithLinks({ text, className }: { text: string; className?: string }) {
  const parts = text.split(URL_REGEX);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (URL_REGEX.test(part)) {
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline break-all"
              onClick={(e) => e.stopPropagation()}
            >
              {part}
            </a>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}
