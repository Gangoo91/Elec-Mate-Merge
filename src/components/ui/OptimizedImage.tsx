/**
 * OptimizedImage - Performance-optimized image component
 *
 * Features:
 * - Native lazy loading (loading="lazy")
 * - Async decoding (decoding="async")
 * - Skeleton placeholder while loading
 * - Smooth fade-in transition
 * - Proper aspect ratio preservation
 * - Error state handling
 */

import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageOff } from 'lucide-react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Additional CSS classes */
  className?: string;
  /** Container className for the wrapper div */
  containerClassName?: string;
  /** Width for aspect ratio calculation */
  width?: number;
  /** Height for aspect ratio calculation */
  height?: number;
  /** Whether to show skeleton while loading */
  showSkeleton?: boolean;
  /** Whether to show error state on failure */
  showErrorState?: boolean;
  /** Custom fallback element */
  fallback?: React.ReactNode;
  /** Callback when image loads */
  onLoadComplete?: () => void;
  /** Callback when image fails to load */
  onError?: () => void;
}

/**
 * OptimizedImage component with lazy loading and smooth transitions
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  containerClassName,
  width,
  height,
  showSkeleton = true,
  showErrorState = true,
  fallback,
  onLoadComplete,
  onError,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
    setError(false);
    onLoadComplete?.();
  }, [onLoadComplete]);

  const handleError = useCallback(() => {
    setError(true);
    setLoaded(true); // Still set loaded to hide skeleton
    onError?.();
  }, [onError]);

  // Calculate aspect ratio for proper placeholder sizing
  const aspectRatio = width && height ? `${width} / ${height}` : undefined;

  // Show error state
  if (error && showErrorState) {
    return (
      <div
        className={cn(
          'relative flex items-center justify-center bg-muted/50 rounded',
          containerClassName
        )}
        style={{ aspectRatio }}
      >
        {fallback || (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <ImageOff className="h-6 w-6" />
            <span className="text-xs">Failed to load</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn('relative overflow-hidden', containerClassName)}
      style={{ aspectRatio }}
    >
      {/* Skeleton placeholder */}
      {!loaded && showSkeleton && (
        <Skeleton className="absolute inset-0 rounded" />
      )}

      {/* Optimized image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        width={width}
        height={height}
        {...props}
      />
    </div>
  );
};

interface OptimizedAvatarProps {
  /** Image source URL */
  src?: string | null;
  /** Alt text for accessibility */
  alt: string;
  /** Fallback initials to show if no image */
  initials?: string;
  /** Size of the avatar */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Additional CSS classes */
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

/**
 * OptimizedAvatar - Performance-optimized avatar with fallback initials
 */
export const OptimizedAvatar: React.FC<OptimizedAvatarProps> = ({
  src,
  alt,
  initials,
  size = 'md',
  className,
}) => {
  const [error, setError] = useState(false);

  // Generate initials from alt text if not provided
  const displayInitials = initials || alt
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (!src || error) {
    return (
      <div
        className={cn(
          'rounded-full bg-primary/10 flex items-center justify-center font-medium text-primary',
          sizeClasses[size],
          className
        )}
      >
        {displayInitials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setError(true)}
      className={cn('rounded-full object-cover', sizeClasses[size], className)}
    />
  );
};

export default OptimizedImage;
