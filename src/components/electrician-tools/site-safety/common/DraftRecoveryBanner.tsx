import { motion } from "framer-motion";
import { RotateCcw, X } from "lucide-react";

interface DraftRecoveryBannerProps {
  onRestore: () => void;
  onDismiss: () => void;
}

export function DraftRecoveryBanner({
  onRestore,
  onDismiss,
}: DraftRecoveryBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 flex items-center gap-3"
    >
      <RotateCcw className="h-4 w-4 text-amber-400 shrink-0" />
      <p className="text-sm text-white flex-1">
        Unsaved draft found. Restore it?
      </p>
      <button
        onClick={onRestore}
        className="h-11 px-4 rounded-lg bg-amber-500/20 text-amber-400 text-xs font-semibold touch-manipulation active:scale-[0.95] transition-transform"
      >
        Restore
      </button>
      <button
        onClick={onDismiss}
        className="h-11 w-11 rounded-lg flex items-center justify-center touch-manipulation active:scale-[0.90] transition-transform"
      >
        <X className="h-4 w-4 text-white" />
      </button>
    </motion.div>
  );
}

export default DraftRecoveryBanner;
