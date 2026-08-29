import { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MessageSkeletonProps {
  /** Number of lines to show (default: 3) */
  lines?: number;
  /** Custom className */
  className?: string;
}

/**
 * MessageSkeleton — Editorial shimmer state for a loading message.
 *
 * Full-width prose-style skeleton — no avatar, no bubble chrome, no icons.
 * Reads as a draft paragraph that's still resolving.
 */
export const MessageSkeleton = memo(function MessageSkeleton({
  lines = 3,
  className,
}: MessageSkeletonProps) {
  const lineWidths = [100, 92, 68, 88, 74];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18 }}
      className={cn('w-full space-y-3', className)}
    >
      <div className="h-2.5 w-24 rounded-full bg-white/[0.06] animate-pulse" />
      <div className="space-y-2.5">
        {Array.from({ length: lines }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.08 }}
            className="h-3.5 rounded-full bg-white/[0.06] animate-pulse"
            style={{
              width: `${lineWidths[i % lineWidths.length]}%`,
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
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
    tone?: 'yellow' | 'emerald' | 'blue' | 'purple';
    searching?: boolean;
    complete?: boolean;
  }>;
}

/**
 * SearchingSkeleton — "Searching knowledge bases" preamble.
 *
 * Shown while the backend is resolving which regs to cite. One live volt dot
 * and the source names in white — the old blue/emerald/purple tones were the
 * only rainbow left in the chat, encoding nothing. (`tone` is kept on the prop
 * type so existing callers still compile; it no longer changes the colour.)
 */
export const SearchingSkeleton = memo(function SearchingSkeleton({
  className,
  sources = [
    { name: 'BS 7671 Regulations' },
    { name: 'Practical Guides' },
    { name: 'Design Knowledge' },
  ],
}: SearchingSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className={cn('w-full', className)}
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-elec-yellow/70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-elec-yellow" />
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white">
          Searching knowledge bases
        </span>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
        {sources.map((source, idx) => (
          <motion.span
            key={source.name}
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className={cn('font-medium text-white', !source.complete && 'animate-pulse')}
          >
            {source.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
});

export default MessageSkeleton;
