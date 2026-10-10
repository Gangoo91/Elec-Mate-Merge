import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconButton } from '@/components/employer/editorial';
import { rowBtn, rowBtnPrimary } from '@/components/employer/pageParts/PageParts';

interface BulkActionBarProps {
  selectedCount: number;
  onShortlistAll: () => void;
  onRejectAll: () => void;
  onClearSelection: () => void;
  isProcessing?: boolean;
}

export function BulkActionBar({
  selectedCount,
  onShortlistAll,
  onRejectAll,
  onClearSelection,
  isProcessing = false,
}: BulkActionBarProps) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={cn(
            'fixed bottom-20 sm:bottom-4 left-4 right-4 z-50',
            'max-w-lg mx-auto',
            'bg-[hsl(0_0%_12%)]',
            'border border-white/[0.08] rounded-2xl',
            'shadow-2xl shadow-black/40',
            'p-4'
          )}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-[15px] font-semibold text-white">
              {selectedCount} candidate{selectedCount !== 1 ? 's' : ''} selected
            </span>
            <IconButton
              aria-label="Clear selection"
              onClick={onClearSelection}
              disabled={isProcessing}
            >
              <X className="h-4 w-4" />
            </IconButton>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onRejectAll}
              disabled={isProcessing}
              className={cn(
                rowBtn,
                'flex-1 border border-red-500/40 text-red-400 hover:bg-red-500/10'
              )}
            >
              Reject all
            </button>
            <button
              type="button"
              onClick={onShortlistAll}
              disabled={isProcessing}
              className={cn(rowBtnPrimary, 'flex-1')}
            >
              Shortlist all
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
