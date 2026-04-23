import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  PrimaryButton,
  DestructiveButton,
  IconButton,
} from '@/components/employer/editorial';

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
            'bg-[hsl(0_0%_12%)] backdrop-blur-lg',
            'border border-white/[0.08] rounded-2xl',
            'shadow-2xl shadow-black/40',
            'p-4'
          )}
        >
          {/* Selected count header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-elec-yellow/15">
                <Users className="h-4 w-4 text-elec-yellow" />
              </div>
              <span className="text-sm font-medium text-white">
                {selectedCount} candidate{selectedCount !== 1 ? 's' : ''} selected
              </span>
            </div>
            <IconButton
              aria-label="Clear selection"
              onClick={onClearSelection}
              disabled={isProcessing}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </IconButton>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <DestructiveButton
              onClick={onRejectAll}
              disabled={isProcessing}
              fullWidth
              size="lg"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject All
            </DestructiveButton>
            <PrimaryButton
              onClick={onShortlistAll}
              disabled={isProcessing}
              fullWidth
              size="lg"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Shortlist All
            </PrimaryButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
