import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Zap, X } from 'lucide-react';

interface ImportedContextBannerProps {
  source: string;
  circuitCount: number;
  onUseContext: () => void;
  onDismiss: () => void;
}

export const ImportedContextBanner = ({
  source,
  circuitCount,
  onUseContext,
  onDismiss,
}: ImportedContextBannerProps) => (
  <motion.div
    initial={{ opacity: 0, y: -16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.2 }}
    className="relative mb-4 overflow-hidden rounded-2xl border border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/[0.08] via-elec-yellow/[0.04] to-transparent"
  >
    <button
      type="button"
      onClick={onDismiss}
      aria-label="Dismiss"
      className="absolute right-2 top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md text-white/50 transition-colors hover:bg-white/10 hover:text-white touch-manipulation"
    >
      <X className="h-4 w-4" />
    </button>

    <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
      <div className="flex min-w-0 flex-1 items-start gap-3 pr-10 sm:pr-0">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-elec-yellow/20 ring-1 ring-elec-yellow/30">
          <Zap className="h-5 w-5 text-elec-yellow" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-tight text-white sm:text-base">
            {circuitCount} circuit{circuitCount !== 1 ? 's' : ''} imported
          </p>
          <p className="mt-0.5 truncate text-xs text-white/60 sm:text-sm">
            From {source} &middot; tap to populate
          </p>
        </div>
      </div>

      <Button
        size="sm"
        onClick={onUseContext}
        className="h-11 w-full flex-shrink-0 bg-elec-yellow font-semibold text-black hover:bg-elec-yellow/90 sm:h-9 sm:w-auto touch-manipulation"
      >
        Use Context
      </Button>
    </div>
  </motion.div>
);
