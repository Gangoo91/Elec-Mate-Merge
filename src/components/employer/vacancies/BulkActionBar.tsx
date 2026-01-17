import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={cn(
            "fixed bottom-20 sm:bottom-4 left-4 right-4 z-50",
            "max-w-lg mx-auto",
            "bg-elec-gray/95 backdrop-blur-lg",
            "border border-white/20 rounded-2xl",
            "shadow-2xl shadow-black/30",
            "p-4"
          )}
        >
          {/* Selected count header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-elec-yellow/20">
                <Users className="h-4 w-4 text-elec-yellow" />
              </div>
              <span className="text-sm font-medium text-white">
                {selectedCount} candidate{selectedCount !== 1 ? "s" : ""} selected
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
              onClick={onClearSelection}
              disabled={isProcessing}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className={cn(
                "flex-1 h-12 text-sm font-medium",
                "bg-red-500/10 border-red-500/30 text-red-400",
                "hover:bg-red-500/20 hover:border-red-500/50",
                "touch-manipulation"
              )}
              onClick={onRejectAll}
              disabled={isProcessing}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject All
            </Button>
            <Button
              className={cn(
                "flex-1 h-12 text-sm font-medium",
                "bg-purple-500 hover:bg-purple-500/90 text-white",
                "touch-manipulation"
              )}
              onClick={onShortlistAll}
              disabled={isProcessing}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Shortlist All
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
