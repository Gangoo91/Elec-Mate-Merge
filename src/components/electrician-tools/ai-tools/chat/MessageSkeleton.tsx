import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageSkeletonProps {
  /** Number of lines to show (default: 3) */
  lines?: number;
  /** Custom className */
  className?: string;
  /** Show the avatar */
  showAvatar?: boolean;
}

/**
 * MessageSkeleton - Shimmer loading state for messages
 *
 * Features:
 * - Smooth shimmer animation
 * - Varying line widths for natural look
 * - Instant display while waiting for first token
 * - Smooth crossfade to actual content
 */
export const MessageSkeleton = memo(function MessageSkeleton({
  lines = 3,
  className,
  showAvatar = true,
}: MessageSkeletonProps) {
  // Generate varying widths for natural appearance
  const lineWidths = [100, 85, 60, 90, 70];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={cn('flex items-start gap-3', className)}
    >
      {/* Avatar skeleton */}
      {showAvatar && (
        <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-elec-yellow/30 to-elec-yellow/20 flex items-center justify-center animate-pulse">
          <Zap className="w-4 h-4 text-elec-yellow/50" />
        </div>
      )}

      <div className="flex-1 space-y-2">
        {/* Name skeleton */}
        <div className="h-3 w-24 rounded bg-muted/50 animate-shimmer" />

        {/* Message bubble skeleton */}
        <div
          className={cn(
            "rounded-2xl rounded-tl-sm px-4 py-4",
            "bg-card/50 backdrop-blur-sm",
            "border border-border/30",
            "space-y-2.5"
          )}
        >
          {Array.from({ length: lines }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="h-3.5 rounded-full bg-gradient-to-r from-muted/60 via-muted/30 to-muted/60 animate-shimmer"
              style={{
                width: `${lineWidths[i % lineWidths.length]}%`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
});

interface SearchingSkeletonProps {
  /** Custom className */
  className?: string;
  /** Knowledge bases being searched */
  sources?: Array<{
    name: string;
    color: string;
    searching: boolean;
    complete: boolean;
  }>;
}

/**
 * SearchingSkeleton - Shows which knowledge bases are being searched
 */
export const SearchingSkeleton = memo(function SearchingSkeleton({
  className,
  sources = [
    { name: 'BS 7671 Regulations', color: 'bg-blue-500/20 text-blue-400', searching: true, complete: false },
    { name: 'Practical Guides', color: 'bg-green-500/20 text-green-400', searching: true, complete: false },
    { name: 'Design Knowledge', color: 'bg-purple-500/20 text-purple-400', searching: true, complete: false },
  ],
}: SearchingSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn(
        'flex items-start gap-3',
        className
      )}
    >
      {/* Avatar */}
      <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-elec-yellow to-elec-yellow/80 flex items-center justify-center shadow-sm">
        <Zap className="w-4 h-4 text-elec-dark animate-pulse" />
      </div>

      <div className="flex-1">
        {/* Name */}
        <div className="text-xs text-muted-foreground mb-2 font-medium">
          BS 7671 Assistant
        </div>

        {/* Search card */}
        <div
          className={cn(
            "rounded-2xl rounded-tl-sm px-4 py-3",
            "bg-card/80 backdrop-blur-sm",
            "border border-border/50",
            "shadow-sm"
          )}
        >
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-elec-yellow border-t-transparent rounded-full"
            />
            <span className="text-sm font-medium text-foreground/90">
              Searching knowledge bases...
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {sources.map((source, idx) => (
              <motion.span
                key={source.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-medium",
                  "flex items-center gap-1.5",
                  source.color
                )}
              >
                {source.complete ? (
                  <span className="text-green-400">✓</span>
                ) : source.searching ? (
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-current"
                  />
                ) : null}
                {source.name}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default MessageSkeleton;
