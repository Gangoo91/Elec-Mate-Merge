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
      className={cn('w-full max-w-4xl space-y-3', className)}
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

const toneText: Record<'yellow' | 'emerald' | 'blue' | 'purple', string> = {
  yellow: 'text-elec-yellow',
  emerald: 'text-emerald-400',
  blue: 'text-blue-400',
  purple: 'text-purple-400',
};

/**
 * SearchingSkeleton — "Searching knowledge bases" preamble.
 *
 * Shown while the backend is resolving which regs to cite.
 * Editorial eyebrow + inline tone-coloured source names.
 */
export const SearchingSkeleton = memo(function SearchingSkeleton({
  className,
  sources = [
    { name: 'BS 7671 Regulations', tone: 'blue' },
    { name: 'Practical Guides', tone: 'emerald' },
    { name: 'Design Knowledge', tone: 'purple' },
  ],
}: SearchingSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className={cn('w-full max-w-4xl', className)}
    >
      <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white">
        Searching knowledge bases
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
        {sources.map((source, idx) => (
          <motion.span
            key={source.name}
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className={cn(
              'font-medium',
              source.complete ? toneText[source.tone ?? 'yellow'] : 'text-white',
              !source.complete && 'animate-pulse'
            )}
          >
            {source.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
});

export default MessageSkeleton;
